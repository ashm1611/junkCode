import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pathOr from 'lodash/fp/pathOr';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import toJS from '@bbb-app/hoc/toJS';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import {
  fetchRegistriesDetails,
  fetchOwnAndRecommendedRegistryDetails,
} from '@bbb-app/get-registry-details/containers/actions';
import { makeSelectCustomerId } from '@bbb-app/selectors/accountSelectors';
import { makeSelectRegistryListFetched } from '@bbb-app/get-registry-details/containers/selectors';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { NotFoundHttpErrorPath } from '@bbb-app/constants/route/route';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import saga from './sagas';
import reducer from './reducer';
import {
  DEACTIVATE_REGISTRY_KEY,
  DEACTIVATE_REGISTRY_CONTENT_KEY,
  DEACTIVATE_REG_CTA_LBL,
} from './constants';
import { makeSelectIsFetching, makeSelectError } from './selectors';
import DeactivateRegistryModalComponent from '../../../../components/Pages/Registry/EditRegistry/Components/DeactivateRegistryModalComponent';
import { deactivateRegistry } from './actions';
import { getRegistryData } from '../RegistryOwner/commonSelectors';

export class DeactivateRegistryModal extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.object,
    referredContent: PropTypes.object,
    toggleModalState: PropTypes.func,
    deactivateReg: PropTypes.func,
    fetchContent: PropTypes.func,
    redirectTo: PropTypes.func,
    fetchRegistries: PropTypes.func,
    getOwnAndRecommendedRegistryDetails: PropTypes.func,
    modalMountedState: PropTypes.bool,
    isFetching: PropTypes.bool,
    registryListFetched: PropTypes.bool,
    registryData: PropTypes.object,
    customerId: PropTypes.string,
    toggleModalDeactivateRegistry: PropTypes.func,
    handleTealiumAction: PropTypes.func,
    error: PropTypes.any,
  };

  static defaultProps = {
    labels: {
      deactivateRegCTA: 'deactivateRegCTA',
    },
  };

  constructor(props) {
    super(props);
    const { registryData, labels, fetchContent } = props;
    this.state = {
      isRegistryDeactivated: false,
      isAllRegistriesCalled: false,
    };

    const referredContent = labels.referredContent;
    this.contentId = [];
    const regType = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      registryData
    );
    const regKey = `${DEACTIVATE_REGISTRY_CONTENT_KEY}${regType}`;
    if (referredContent && regType) {
      referredContent.forEach(obj => {
        /* istanbul ignore else  */
        if (obj.key === regKey) {
          this.contentId[0] = obj.id;
        }
      });
    }
    fetchContent(this.contentId);
    this.tealiumHandler = this.tealiumHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      customerId,
      isFetching,
      redirectTo,
      fetchRegistries,
      registryListFetched,
      getOwnAndRecommendedRegistryDetails,
    } = this.props;
    const { error } = nextProps;
    if (isFetching && !nextProps.isFetching) {
      if (error) {
        redirectTo(NotFoundHttpErrorPath);
      } else {
        this.setState({ isAllRegistriesCalled: true });
        fetchRegistries(customerId);
        getOwnAndRecommendedRegistryDetails(customerId);
        this.props.toggleModalDeactivateRegistry(false);
      }
    }

    if (!registryListFetched && nextProps.registryListFetched) {
      redirectTo('/');
    }
  }

  getReferredContentBody(contentId) {
    let body = '';
    if (
      this.props.referredContent.content &&
      contentId &&
      this.props.referredContent.content[contentId]
    ) {
      body = this.props.referredContent.content[contentId].body;
    }
    return body;
  }

  getRegistryTags(registryData) {
    const registryTags = {
      page_function: 'Registry',
      page_type: 'Registry',
      content_pagetype: '',
      product_pagetype: '',
      navigation_path: 'Registry',
      subnavigation_path: 'Registry',
      channel: 'Registry',
      interactive_checklist_detail: '',
      registrants_name: `${pathOr(
        '',
        'registryResVO.registrySummaryVO.primaryRegistrantFirstName',
        registryData
      )}  ${pathOr(
        '',
        'registryResVO.registrySummaryVO.primaryRegistrantLastName',
        registryData
      )}`,
      registry_event_date: pathOr(
        '',
        'registryResVO.registrySummaryVO.eventDate',
        registryData
      ),
      registry_id: pathOr(
        '',
        'registryResVO.registrySummaryVO.registryId',
        registryData
      ),
      registry_type: pathOr(
        '',
        'registryResVO.registrySummaryVO.eventType',
        registryData
      ),
      registry_favorite_categories_id: pathOr(
        [],
        'favouriteCategoryIdList',
        registryData
      ),
      registry_favorite_categories_name: pathOr(
        [],
        'favouriteCategoryNameList',
        registryData
      ),
      registry_product_name_count_purchased: pathOr(
        '',
        'registryResVO.registrySummaryVO.giftPurchased',
        registryData
      ),
      registry_product_name_count_requested: [
        pathOr(
          '',
          'registryResVO.registrySummaryVO.giftRegistered',
          registryData
        ),
      ],
      registry_total_items: pathOr(
        '',
        'registryResVO.registrySummaryVO.giftRegistered',
        registryData
      ),
      shower_celebration_date: pathOr(
        '',
        'registryResVO.registrySummaryVO.eventVO.showerDateObject.time',
        registryData
      ),
      crossell_page: 'non-cross sell',
      crossell_product: 'non-cross sell',
      product_finding_method: 'Registry',
      internal_search_term: 'non-search',
      internal_campaign: 'non-internal campaign',
      merchandising_category: 'non-browse',
      merchandising_main_level: 'non-browse',
      merchandising_subcategory: 'non-browse',
      product_sku_id: [],
      product_sku_name: [],
      product_id: [],
      product_category: [],
      product_subcategory: [],
      product_sub_sub_category: [],
    };
    return registryTags;
  }

  tealiumHandler(visible) {
    const { registryData } = this.props;
    if (!visible) {
      return null;
    }
    const utagData = this.getRegistryTags(registryData);
    utagData.pagename_breadcrumb = 'deactivate registry';
    utagData.page_name = 'deactivate registry';
    return (
      <TealiumHandler
        utagData={utagData}
        identifier="Deactivate_Registry"
        tealiumPageInfoNotAvailable
      />
    );
  }

  toggleModalState = state => {
    const { toggleModalState } = this.props;
    toggleModalState(state);
  };

  doDeactivateReg = () => {
    const { deactivateReg, registryData } = this.props;
    const regId = pathOr(
      null,
      'registryResVO.registrySummaryVO.registryId',
      registryData
    );
    deactivateReg(regId);
    if (this.props.handleTealiumAction) {
      const utagData = this.getRegistryTags(registryData);
      utagData.pagename_breadcrumb = 'deactivate registry';
      utagData.page_name = 'deactivate registry';
      this.props.handleTealiumAction('', utagData, '');
    }
  };

  render() {
    const { modalMountedState } = this.props;
    return (
      <ErrorBoundary>
        {this.tealiumHandler(modalMountedState)}
        <DeactivateRegistryModalComponent
          modalMountedState={modalMountedState}
          toggleModalState={this.toggleModalState}
          deactivateReg={this.doDeactivateReg}
          modalContent={this.getReferredContentBody(this.contentId[0])}
          buttonLabel={DEACTIVATE_REG_CTA_LBL}
        />
      </ErrorBoundary>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  isFetching: makeSelectIsFetching(),
  error: makeSelectError(),
  registryData: getRegistryData(),
  customerId: makeSelectCustomerId(),
  referredContent: makeSelectContent(),
  registryListFetched: makeSelectRegistryListFetched(),
});

export const mapDispatchToProps = dispatch => ({
  deactivateReg(regId) {
    dispatch(deactivateRegistry(regId));
  },
  redirectTo(path) {
    dispatch(push(path));
  },
  fetchRegistries(customerId) {
    dispatch(fetchRegistriesDetails(customerId));
  },
  fetchContent(contentId) {
    dispatch(fetchReferredContent(contentId));
  },
  getOwnAndRecommendedRegistryDetails(customerId) {
    dispatch(fetchOwnAndRecommendedRegistryDetails(customerId));
  },
  handleTealiumAction(actionType, tealiumInfo, pageName) {
    dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({
  key: DEACTIVATE_REGISTRY_KEY,
  saga,
});
const withReducer = injectReducer({
  key: DEACTIVATE_REGISTRY_KEY,
  reducer,
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(toJS(DeactivateRegistryModal));
