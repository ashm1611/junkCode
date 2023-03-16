import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEqual from 'lodash/fp/isEqual';
import { isEmpty } from 'lodash';
import {
  selectDeviceConfig,
  makeSelectGlobalSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { isMobileDevice } from '@bbb-app/utils/common';
import toJS from '@bbb-app/hoc/toJS';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import { makeSelectIsLoggedIn } from '@bbb-app/selectors/accountSelectors';
import { updateStateData } from '@bbb-app/forms/containers/FormWrapper/actions';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import {
  BABY_SOCIAL_RECOMMENDATIONS,
  SOCIAL_RECOMMANDATION_FORM_DATA,
  SOCIAL_RECOMMENDATION_REGISTRY_BANNER,
  REGISTRY_BUILD_CTA_PANEL,
  NEED_HELP_REFERRED_CONTENT_KEY,
  GUIDE_AND_TOOLS,
} from './constants';
import SocialRecommendationComponent from '../../../../components/Pages/Registry/SocialRecommendation';
import SocialRecommendationInviteModal from '../../../../components/Pages/Registry/SocialRecommendation/SocialRecommendationInviteModal/SocialRecommendationInviteModal.async';
import { BuildYourRegistry } from '../../../PureContent/BuildYourRegistry/BuildYourRegistry';
import NeedHelp from '../../../../components/Pages/Registry/NeedHelp/NeedHelp.async';

const propTypes = {
  labels: PropTypes.object,
  contentState: PropTypes.object,
  match: PropTypes.object,
  switchConfig: PropTypes.object,
  getEditRegistryData: PropTypes.func,
  getContent: PropTypes.func,
  renderGuideAndTools: PropTypes.func,
  fetchContentStack: PropTypes.func,
  liveChat: PropTypes.bool,
  bookAppointment: PropTypes.bool,
};

export class SocialRecommendationContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEditRegistryClick = this.handleEditRegistryClick.bind(this);
  }

  componentDidMount() {
    const { referredContent } = this.props.labels;
    const contentId = [];
    /* istanbul ignore else  */
    if (referredContent) {
      referredContent.forEach(obj => {
        if (
          obj.key === SOCIAL_RECOMMENDATION_REGISTRY_BANNER ||
          obj.key === NEED_HELP_REFERRED_CONTENT_KEY ||
          obj.key === REGISTRY_BUILD_CTA_PANEL
        ) {
          contentId.push(obj.id);
        }
      });
      if (contentId.length) {
        this.props.getContent(contentId);
      }
    }
    if (this.props.switchConfig.enableRegistryCollaboration) {
      const dynamicCSURL = `/store/static/collaboration-email-template`;
      this.props.fetchContentStack(false, dynamicCSURL);
    }
  }

  /**
   * Function returning the id with which to identify the referred content data.
   * @param {[object]} labels [Labels object]
   * @returns {[string]} id [Content ID from labels to match with data returned from dynamic content api call]
   */
  getContentID(labels, key) {
    const { referredContent } = labels;
    let id = null;
    referredContent.forEach(obj => {
      /* istanbul ignore else  */
      if (isEqual(obj.key, key)) {
        id = obj.id;
      }
    });
    return id;
  }

  handleEditRegistryClick = () => {
    this.props.getEditRegistryData(this.props.match.params.id, true);
  };
  render() {
    const { contentState, labels } = this.props;
    const id = this.getContentID(labels, BABY_SOCIAL_RECOMMENDATIONS);
    const guideAndToolId = this.getContentID(labels, GUIDE_AND_TOOLS);
    const constentModuleId = this.getContentID(
      labels,
      REGISTRY_BUILD_CTA_PANEL
    );
    let data;
    /* istanbul ignore else */
    if (contentState && contentState.content) {
      const { content } = contentState;
      data = content[id];
    }

    let getHelp = pathOr(
      null,
      this.getContentID(labels, NEED_HELP_REFERRED_CONTENT_KEY),
      contentState.content
    );
    if (getHelp !== null) {
      getHelp = getHelp.components && getHelp.components[0];
    }
    return (
      <ErrorBoundary>
        <SocialRecommendationComponent data={data} {...this.props} />
        {this.props.switchConfig.enableRecommendationsView ? (
          <SocialRecommendationInviteModal
            bannerid={SOCIAL_RECOMMENDATION_REGISTRY_BANNER}
            formWrapperIdentifier={SOCIAL_RECOMMANDATION_FORM_DATA}
            {...this.props}
          />
        ) : null}
        {this.props.renderGuideAndTools(contentState, guideAndToolId)}
        <div className="grid-container pt4">
          <GridX className="grid-margin-x">
            <Cell className="medium-8 small-12">
              {!isEmpty(contentState.content) &&
                contentState.content[constentModuleId] && (
                  <BuildYourRegistry
                    data={contentState.content}
                    contentId={constentModuleId}
                  />
                )}
            </Cell>
            <Cell className="medium-4 small-12">
              {getHelp !== null && (
                <NeedHelp
                  isMobile={isMobileDevice.any()}
                  bookAppointment={this.props.bookAppointment}
                  liveChat={this.props.liveChat}
                  getHelp={getHelp}
                  isSocialRecommendationContent
                />
              )}
            </Cell>
          </GridX>
        </div>
      </ErrorBoundary>
    );
  }
}

SocialRecommendationContent.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  formWrapperData: formWrapperSelector(SOCIAL_RECOMMANDATION_FORM_DATA),
  referredContent: makeSelectContent(),
  deviceConfig: selectDeviceConfig,
  isLoggedIn: makeSelectIsLoggedIn(),
  bookAppointment: makeSelectGlobalSwitchConfig(['enableBookAppointment']),
  liveChat: makeSelectGlobalSwitchConfig(['enableLiveChat']),
});

export const mapDispatchToProps = dispatch => {
  return {
    getContent(contentIdCollection) {
      dispatch(fetchReferredContent(contentIdCollection));
    },
    updateStateData: data => {
      dispatch(updateStateData(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SocialRecommendationContent));
