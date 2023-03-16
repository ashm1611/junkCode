import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import qs from 'qs';
import isEqual from 'lodash/fp/isEqual';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import Heading from '@bbb-app/core-ui/heading';
import SEOUtil from '@bbb-app/utils/SEOUtil';
import siteInfo from '@bbb-app/utils/siteInfo';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Image from '@bbb-app/core-ui/image';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import isTbs from '@bbb-app/utils/isTbs';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import CartEmailFormComponent from '@bbb-app/cart-email-form/CartEmailForm.async';
import styles from '../SocialRecommendation.css';
import {
  LOCATORS,
  INVITE_FRIEND_MESSAGE_CONTENT,
  INVITE_FRIEND_MODAL_TITLE_LBL,
  INVITE_FRIEND_MODAL_EMAIL_LBL,
  INVITE_FRIEND_MODAL_MESSAGE_LBL,
  INVITE_FRIEND_MODAL_BUTTON_LBL,
  INVITE_FRIEND_SENT_MODAL_TITLE_LBL,
  INVITE_ANOTHER_BUTTON_LBL,
  INVITE_FRIEND_MODAL_MANAGE_EMAIL_LINK_LBL,
  INVITE_FRIENDS_FAMILY_LBL,
  CREATE_REGISTRY_BANNER_TITLE_US_LBL,
} from './constants';
import inviteFriendTealiumInfo from './inviteFriendTealiumInfo';
import RecommendationInviteModalCTA from './../../../AccountRegistries/RecommendationInviteModalCTA';
import { CANCEL_BTN_LBL } from '../../constants';

class SocialRecommendationInviteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInviteModalMounted: false,
      emailSentResponse: null,
      isSubmitInProgress: false,
      isSuccess: false,
    };
    this.emailSubmitForm = this.emailSubmitForm.bind(this);
    this.emailSubmitFormError = this.emailSubmitFormError.bind(this);
    this.emailSubmitFormSuccess = this.emailSubmitFormSuccess.bind(this);
    this.revealInviteModal = this.revealInviteModal.bind(this);
    this.renderInviteModal = this.renderInviteModal.bind(this);
    this.renderResponse = this.renderResponse.bind(this);
    this.closeInviteModal = this.closeInviteModal.bind(this);
    this.renderFNFInviteModalCTA = this.renderFNFInviteModalCTA.bind(this);
    this.bannerData = null;
  }
  getReferredContentBody(key) {
    if (this.bannerData) {
      return this.bannerData;
    }
    let contentId;
    const { referredContent } = this.props.labels;
    if (referredContent && referredContent.length) {
      referredContent.forEach(obj => {
        if (obj.key === key) contentId = obj.id;
      });
    }
    if (
      this.props.referredContent &&
      this.props.referredContent.content &&
      contentId &&
      this.props.referredContent.content[contentId]
    ) {
      this.bannerData = this.props.referredContent.content[contentId];
      return this.bannerData;
    }
    return null;
  }
  getContentID(labels, contentKey) {
    const { referredContent } = labels;
    let id = null;
    referredContent.forEach(obj => {
      /* istanbul ignore else  */
      if (isEqual(obj.key, contentKey)) {
        id = obj.id;
      }
    });
    return id;
  }
  revealInviteModal(e) {
    e.preventDefault();
    this.setState({
      isInviteModalMounted: true,
      emailSentResponse: null,
      isSubmitInProgress: false,
    });
  }
  closeInviteModal() {
    this.setState({
      isInviteModalMounted: false,
      emailSentResponse: null,
      isSubmitInProgress: false,
    });
  }
  emailSubmitFormSuccess(data) {
    const { body: savedEmailResponse } = data;
    const {
      inviteFriendEmailSentResponse,
      inviteFriendErrorMsg,
    } = this.props.labels;
    const result = pathOr('', 'data.result', savedEmailResponse);

    if (result) {
      const { fireTealiumAction } = this.props;
      // istanbul ignore else
      if (typeof fireTealiumAction === 'function') {
        const tealiumConstants = inviteFriendTealiumInfo();
        fireTealiumAction('', tealiumConstants, '');
      }
      this.setState({
        isSuccess: true,
        emailSentResponse: inviteFriendEmailSentResponse,
        isSubmitInProgress: false,
      });
    } else {
      this.setState({
        isSuccess: false,
        emailSentResponse: inviteFriendErrorMsg,
        isSubmitInProgress: false,
      });
    }
  }
  emailSubmitFormError(error) {
    const { body: errorEmailResponse } = error;
    const errorMessage = pathOr(
      this.props.labels.inviteFriendErrorMsg,
      'response.data.errorMessages[0].message',
      errorEmailResponse
    );
    this.setState({
      isSuccess: false,
      emailSentResponse: errorMessage,
      isSubmitInProgress: false,
    });
  }
  emailSubmitForm(formData) {
    const registryResVO = pathOr(
      null,
      'registryResVO',
      this.props.registryData
    );
    const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);
    const {
      eventType,
      primaryRegistrantFirstName,
      primaryRegistrantLastName,
      registryId,
      eventDate,
    } = registrySummaryVO;
    const { recommenderLandingPageURL } = this.props.labels;
    let updatedURL = recommenderLandingPageURL.replace(
      '<eventType>',
      eventType || ''
    );
    updatedURL = updatedURL.replace('<registryId>', registryId || '');
    let domainName = window.location.origin;
    if (isTbs()) {
      // As isTbs check for TBS_ in siteId
      const siteId = siteInfo.getId().slice(4);
      domainName = SEOUtil.SiteUrlData[siteId];
    }
    const endPoint = getApiEndPointsFromStore('inviteFriend');
    const apiData = {
      recipientEmail: formData.recipientEmail,
      regFirstName: primaryRegistrantFirstName,
      regLastName: primaryRegistrantLastName,
      registryURL: `${domainName}${updatedURL}`,
      registryId,
      registryName: eventType,
      registryEventDate: eventDate,
      eventType,
      message: formData.message,
    };
    this.setState({
      isSubmitInProgress: true,
    });

    ServiceUtil.triggerServerRequest({
      url: endPoint,
      method: 'POST',
      data: qs.stringify(apiData),
    })
      .then(this.emailSubmitFormSuccess)
      .catch(this.emailSubmitFormError);
  }
  renderInviteModal() {
    const { labels, contentState } = this.props;
    const recomModalLabel = {
      savedItemsHeadingLabel: INVITE_FRIEND_MODAL_TITLE_LBL,
      formLabel: null,
      toEmailLabel: INVITE_FRIEND_MODAL_EMAIL_LBL,
      messageLabel: INVITE_FRIEND_MODAL_MESSAGE_LBL,
      submitButtonLabel: INVITE_FRIEND_MODAL_BUTTON_LBL,
      cancelButtonLabel: CANCEL_BTN_LBL,
    };
    const id = this.getContentID(labels, INVITE_FRIEND_MESSAGE_CONTENT);
    let messageContent;
    /* istanbul ignore else  */
    if (contentState && contentState.content) {
      const { content } = contentState;
      messageContent = content[id];
    }
    return (
      <ModalDialog
        mountedState={this.state.isInviteModalMounted}
        toggleModalState={this.toggleModalState}
        titleAriaLabel={'Registry Invite Modal'}
        verticallyCenter
        underlayClickExits={false}
        variation="small"
        scrollDisabled
        onModalClose={this.closeInviteModal}
      >
        <CartEmailFormComponent
          closeModal={this.closeInviteModal}
          {...this.props}
          labels={recomModalLabel}
          submitForm={this.emailSubmitForm}
          emailSentResponse={null}
          variation={'emailRegistry'}
          shouldHideRecaptcha
          isFromRegistryInvite
          locators={LOCATORS}
          message={messageContent}
          submitInProgress={this.state.isSubmitInProgress}
        />
      </ModalDialog>
    );
  }
  renderResponse() {
    const href = pathOr(
      '/store/account/preferences',
      ['endPoints', 'preferences'],
      this.props
    );
    return (
      <React.Fragment>
        <ModalDialog
          mountedState={this.state.isInviteModalMounted}
          toggleModalState={this.toggleModalState}
          titleAriaLabel={'Registry Invite Success Modal'}
          verticallyCenter
          variation="small"
          scrollDisabled
          onModalClose={this.closeInviteModal}
        >
          {this.state.isSuccess ? (
            <Heading level={2} className={classnames(styles.heading)}>
              {INVITE_FRIEND_SENT_MODAL_TITLE_LBL}
            </Heading>
          ) : null}
          <Cell className="small-12 mt3">
            <div className={classnames(styles.formLabel)}>
              {this.state.emailSentResponse}
            </div>
          </Cell>
          {this.state.isSuccess ? (
            <React.Fragment>
              <Cell className="mt2">
                <PrimaryLink href={href} variation="primary" type="bold">
                  {INVITE_FRIEND_MODAL_MANAGE_EMAIL_LINK_LBL}
                </PrimaryLink>
              </Cell>
              <Button
                theme="primary"
                onClick={this.revealInviteModal}
                data-locator={LOCATORS.INVITE_FRIEND_MODAL_INVITE_ANOTHER}
                className="mt3 mb2 pl4 pr4"
              >
                {INVITE_ANOTHER_BUTTON_LBL}
              </Button>
            </React.Fragment>
          ) : null}
          <Cell className="mt2">
            <PrimaryLink
              href="#"
              variation="primary"
              onClick={this.closeInviteModal}
              data-locator={LOCATORS.INVITE_ANOTHER_CANCEL_BTN}
              type="bold"
            >
              {CANCEL_BTN_LBL}
            </PrimaryLink>
          </Cell>
        </ModalDialog>
      </React.Fragment>
    );
  }
  renderFNFInviteModalCTA() {
    return (
      <GridX className={classnames('grid-container')}>
        <Cell className={classnames('cell small-10 mx-auto')}>
          <Button
            theme="secondary"
            className={classnames(styles.inviteBtn)}
            data-locator={LOCATORS.INVITE_FRIEND_BTN}
            onClick={this.props.handleCollaborationModal}
          >
            {INVITE_FRIENDS_FAMILY_LBL}
          </Button>
        </Cell>
      </GridX>
    );
  }
  renderFNFInviteModal(contentStackData) {
    const title = contentStackData.background_color;
    const subTitle = contentStackData.description;
    const iconURL = contentStackData.image_properties;
    return (
      <section
        role="region"
        aria-labelledby="get-recommendations"
        className={styles.recommendationContainer}
      >
        <div
          className={classnames(
            'center',
            styles.socialRecommedationInviteBanner
          )}
        >
          <GridX className="grid-container">
            <Cell
              className={classnames(
                'py3 large-12 small-12 my2 mx1 sm-mx0',
                styles.FNFContainer
              )}
            >
              <Image
                height={'100px'}
                width={'130px'}
                src={iconURL.field_image}
                alt={iconURL.field_image_alt_text}
              />
              <div className={classnames('my1 sm-my2', styles.FNFHeading)}>
                {title}
              </div>
              <GridX className="grid-container">
                <Cell
                  className={classnames(
                    styles.FNFSubHeading,
                    'large-5 small-12 mt1 pb2'
                  )}
                >
                  {subTitle}
                </Cell>
              </GridX>
              {this.renderFNFInviteModalCTA()}
            </Cell>
          </GridX>
        </div>
      </section>
    );
  }

  render() {
    const {
      deviceConfig,
      buttontheme,
      ctaObject,
      eventYetToCome,
      privateRegistry,
      bannerid,
      switchConfig,
      contentStackSelectors,
      ...otherProps
    } = this.props;
    const contentStackData = pathOr(
      '',
      'modules[3].story_title',
      contentStackSelectors && contentStackSelectors[0]
    );
    const enableRegistryCollaboration = pathOr(
      false,
      'enableRegistryCollaboration',
      switchConfig
    );

    const bannerData = bannerid && this.getReferredContentBody(bannerid);

    return (
      <React.Fragment>
        {enableRegistryCollaboration && contentStackData
          ? this.renderFNFInviteModal(contentStackData)
          : bannerid &&
            bannerData && (
              <section
                role="region"
                aria-labelledby="get-recommendations"
                className={styles.recommendationContainer}
              >
                <GridX className="grid-container">
                  <Cell className="small-12 medium-10 medium-offset-1">
                    <ErrorBoundary>
                      <RecommendationInviteModalCTA
                        data={bannerData.components}
                        ctaData={bannerData.cta}
                        deviceConfig={deviceConfig}
                        isSocialRecommedationInviteBanner
                        modalOnclick={this.revealInviteModal}
                        registryBannerLabel={
                          CREATE_REGISTRY_BANNER_TITLE_US_LBL
                        }
                        {...otherProps}
                      />
                    </ErrorBoundary>
                  </Cell>
                </GridX>
              </section>
            )}
        <div>
          {this.props.renderInviteButton && (
            <Button
              className={classnames('sm-mb2 lg-mb0')}
              title={ctaObject.displayName}
              theme={
                eventYetToCome && privateRegistry === '1'
                  ? buttontheme
                  : 'disabled'
              }
              onClick={
                eventYetToCome && privateRegistry === '1'
                  ? this.revealInviteModal
                  : () => {}
              }
              data-locator={`rg-rl-${LOCATORS.INVITE_ANOTHER_CANCEL_BTN}`}
              disabled={!eventYetToCome || privateRegistry !== '1'}
            >
              {ctaObject.displayName}
            </Button>
          )}
        </div>
        {this.state.emailSentResponse
          ? this.renderResponse()
          : this.renderInviteModal()}
      </React.Fragment>
    );
  }
}

SocialRecommendationInviteModal.propTypes = {
  labels: PropTypes.object,
  registryData: PropTypes.object.isRequired,
  fireTealiumAction: PropTypes.func.isRequired,
  contentState: PropTypes.object,
  referredContent: PropTypes.object,
  deviceConfig: PropTypes.object,
  ctaObject: PropTypes.object,
  endPoints: PropTypes.object,
  bannerid: PropTypes.string,
  buttontheme: PropTypes.string,
  renderInviteButton: PropTypes.bool,
  eventYetToCome: PropTypes.bool,
  privateRegistry: PropTypes.string,
  handleCollaborationModal: PropTypes.func,
  switchConfig: PropTypes.object,
  contentStackSelectors: PropTypes.array,
};

SocialRecommendationInviteModal.defaultProps = {
  fireTealiumAction: () => {},
};

export default SocialRecommendationInviteModal;
