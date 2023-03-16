/**
 * @Description:
 *  This folder is excluded from test case and added in babelrc.
 *  Since the feature is descoped.
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash';
import { push } from 'connected-react-router';
import toJS from '@bbb-app/hoc/toJS';
import {
  makeSelectPageConfig,
  selectDeviceConfig,
  makeSelectThirdPartyConfig,
  makeSelectEndPoints,
  makeSelectLabels,
  makeSelectSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import { makeTYMSignInModalLabels } from '@bbb-app/selectors/accountSelectors';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { getContentParamsFromRegions } from '@bbb-app/utils/experience';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import consoleLog from '@bbb-app/utils/logger';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { fetchContent } from '@bbb-app/actions/experienceActions';
import injectMultipleSagas from '@bbb-app/hoc/injectMultipleSagas';
import injectMultipleReducers from '@bbb-app/hoc/injectMultipleReducers';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import { fetchContentStack } from '@bbb-app/redux/content-stack/actions';
import contentStackReducer from '@bbb-app/redux/content-stack/reducer';
import contentStackSaga from '@bbb-app/redux/content-stack/sagas';
import { CONTENT_STACK_STATE_KEY } from '@bbb-app/redux/content-stack/constants';
import layouts from '../../../../components/Layouts';
import componentMap from '../../../ExperienceMapping/SocialRecommendationMap';
import { fetchPageExperience } from '../../../Experience/actions';
import isPreviewEnv from '../../../../utils/isPreviewEnv';
import { selectRegistryTemplate } from '../RegistryOwnerHome/selectors';
import RecommendationsLayout from '../../../../components/Pages/Registry/RecommendationsLayout/RecommendationsLayout';
import { SOCIAL_RECOMMANDATION_FORM_DATA } from '../SocialRecommendationContent/constants';
import {
  fetchRecommendations,
  fetchEmailFrequency,
  fetchRecommendationsDateSorted,
  mayBeLaterCall,
  socialRecommendUserBlockUnblock,
  socialRecommendUserBlockUnblockDataReset,
  fetchRecommenderSummary,
  fetchEditRegistryData,
} from './actions';
import {
  getRegistryData,
  selectRecommendationList,
  isFetching,
  selectMayBeLaterFlag,
  selectBlockUnblockSuccess,
  selectBlockUnblockError,
  selectRecommenderSummary,
} from './selectors';
import { REGISTRY_RECOMMENDATIONS_STATE_KEY } from './constants';
import {
  getIsMobile,
  selectActiveRegistryObject,
} from '../ThankYouManager/selectors';
import { selectaddToRegistryRecommendationFlag } from '../../../../containers/AddToRegistry/AddToRegistrySelector';
import reducer from './reducer';
import saga from './sagas';
import { fetchQuizModal } from '../CreateRegistry/actions';
import { fetchQuickViewProductDetails } from '../../../QuickViewModal/ActionWithSagaInjection';
import { makeSelectIsQuickViewOpen } from '../../../QuickViewModal/QuickViewModalSelectors';
import { RECOMMENDATION_SORT_DATE } from '../../../../components/Pages/Registry/RecommendationsLayout/constants';
import {
  getPersonaType,
  getQuickPickId,
} from '../RegistryOwnerHome/Quiz/selectors';

export class Recommendations extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    if (!isEmpty(this.props.registryData)) {
      this.setElements(this.props);
    }
  }
  componentDidMount() {
    const { route, match, regTemplate, getPageExperience } = this.props;
    if (!regTemplate && isPreviewEnv()) {
      try {
        const params = {
          expType: 'publish',
          pagePath: match.url,
          ...match.params,
          ...route.routeData,
        };
        getPageExperience(params);
      } catch (error) {
        /* istanbul ignore next */
        consoleLog.error(`Experience Page Fallback Failed: ${error.message}`);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const paramId = pathOr(null, 'matchParamId', nextProps);
    if (this.state.registryId !== paramId) {
      this.setState({ registryId: paramId });
    }
    if (
      (!this.state.called && !isEmpty(this.props.registryData)) ||
      (!isEqual(nextProps.registryData, this.props.registryData) &&
        !isEmpty(nextProps.registryData))
    ) {
      this.setElements(this.props, nextProps);
      this.setState({ called: true });
    }
  }

  getControllerProps(props, regions) {
    const registryDetailData = pathOr(null, 'registryData', props);
    const labels = props.labels;
    const pageName = props.route.routeData.pageName;

    const categoryId = pathOr(null, 'match.params.categoryId', props);
    const regState = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryState',
      registryDetailData
    );
    const regType = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      registryDetailData
    );
    const regId = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryId',
      registryDetailData
    );

    const mainParams = {
      regState,
      regType,
    };
    const contentParams = getContentParamsFromRegions(
      undefined,
      regions,
      mainParams
    );
    props.fetchDynamicContent(contentParams, mainParams);
    return {
      labels,
      pageName,
      categoryId,
      regState,
      regType,
      regId,
      buttonLayout: 'addToRegistry',
      showAddToRegistryCTA: true,
      showChoseOptionsCTA: true,
      paramsObj: contentParams,
    };
  }
  setElements = (propObj, nextProps = {}) => {
    if (nextProps.regTemplate && nextProps.regTemplate.regions) {
      const layout = layouts[nextProps.regTemplate.layout] || layouts.default;
      const regions = nextProps.regTemplate.regions;
      const controllerProps = this.getControllerProps(nextProps, regions);
      this.elements = layout(regions, controllerProps);
    }
    if (propObj.regTemplate && propObj.regTemplate.regions) {
      const layout = layouts[propObj.regTemplate.layout] || layouts.default;
      const regions = propObj.regTemplate.regions;
      const controllerProps = this.getControllerProps(propObj, regions);
      this.elements = layout(regions, controllerProps, componentMap);
    }
  };
  render() {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <RecommendationsLayout {...this.props} childrens={this.elements} />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}
Recommendations.propTypes = {
  route: PropTypes.any,
  regTemplate: PropTypes.any,
  match: PropTypes.object,
  getPageExperience: PropTypes.func,
  registryData: PropTypes.object,
};
export const mapDispatchToProps = dispatch => {
  return {
    getRecommendations(registryId, tabId, sortOption, eventTypeCode) {
      // getting Recommendations list
      dispatch(
        fetchRecommendations(registryId, tabId, sortOption, eventTypeCode)
      );
    },
    getRecommenderSummary(registryId, tabId) {
      // getting Recommendations list
      dispatch(fetchRecommenderSummary(registryId, tabId));
    },
    getEditRegistryData: (registryId, openEdit) => {
      dispatch(fetchEditRegistryData(registryId, '', openEdit));
    },
    getEmailFrequency(registryId, emailOptionValue) {
      dispatch(fetchEmailFrequency(registryId, emailOptionValue));
    },
    getPageExperience(args) {
      dispatch(fetchPageExperience(args));
    },
    sortRecommendationList(registryId, tabId, sortOption, eventTypeCode) {
      if (sortOption.toLowerCase() === RECOMMENDATION_SORT_DATE.toLowerCase()) {
        dispatch(
          fetchRecommendationsDateSorted(
            registryId,
            tabId,
            sortOption,
            eventTypeCode
          )
        );
      } else {
        dispatch(
          fetchRecommendations(registryId, tabId, sortOption, eventTypeCode)
        );
      }
    },
    mayBeLaterBtnCall(payload) {
      dispatch(mayBeLaterCall(payload));
    },
    socialRecommendUserBlockUnblock(data) {
      dispatch(socialRecommendUserBlockUnblock(data));
    },
    getContent(contentIdCollection) {
      dispatch(fetchReferredContent(contentIdCollection));
    },
    resetBlockUnblockData() {
      dispatch(socialRecommendUserBlockUnblockDataReset());
    },
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    fetchDynamicContent(contentParams, mainParams) {
      dispatch(fetchContent(contentParams, mainParams, false));
    },
    onQuickViewButtonClick( //eslint-disable-line
      productId,
      productVariation,
      productUrl,
      registryProductInfo,
      swatchDetails,
      itemIndex,
      isCompare,
      miniQuickViewMode
    ) {
      dispatch(
        fetchQuickViewProductDetails(
          productId,
          productVariation,
          productUrl,
          registryProductInfo,
          swatchDetails,
          itemIndex,
          isCompare,
          '',
          miniQuickViewMode
        )
      );
    },
    fetchContentStack(args, dynamicCSURL) {
      dispatch(fetchContentStack(args, dynamicCSURL));
    },
    fetchQuizModal: scrollPosition => {
      dispatch(fetchQuizModal(scrollPosition));
    },
    redirectTo: path => {
      dispatch(push(path));
    },
  };
};

export const mapStateToProps = createStructuredSelector({
  deviceConfig: selectDeviceConfig,
  contentState: makeSelectContent(),
  labels: makeSelectLabels(['Registry']),
  loginLabels: makeTYMSignInModalLabels(),
  regTemplate: selectRegistryTemplate(),
  registryData: getRegistryData(),
  switchConfig: makeSelectSwitchConfig(['RegistryOwner']),
  recommendationList: selectRecommendationList(),
  scene7UrlConfig: makeSelectThirdPartyConfig(['scene7'], ''),
  isMobile: getIsMobile(),
  isLoading: isFetching(),
  endPoints: makeSelectEndPoints(),
  addedToRegistryFlag: selectaddToRegistryRecommendationFlag(),
  selectMayBeLaterFlag: selectMayBeLaterFlag(),
  recommendationCommentLimitPageConfig: makeSelectPageConfig([
    'RegistryOwner',
    'recommendationCommentLimit',
  ]),
  formWrapperData: formWrapperSelector(SOCIAL_RECOMMANDATION_FORM_DATA),
  blockUnblockSuccess: selectBlockUnblockSuccess(),
  blockUnblockError: selectBlockUnblockError(),
  recommenderSummary: selectRecommenderSummary(),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  isQuickViewOpen: makeSelectIsQuickViewOpen(),
  personaType: getPersonaType(),
  quickPickId: getQuickPickId(),
  activeRegistry: selectActiveRegistryObject(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectMultipleReducers([
  { key: REGISTRY_RECOMMENDATIONS_STATE_KEY, reducer },
  { key: CONTENT_STACK_STATE_KEY, reducer: contentStackReducer },
]);
const withSaga = injectMultipleSagas([
  { key: REGISTRY_RECOMMENDATIONS_STATE_KEY, saga },
  { key: CONTENT_STACK_STATE_KEY, saga: contentStackSaga },
]);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(toJS(Recommendations));
