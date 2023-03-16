import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import qs from 'qs';
import pathOr from 'lodash/fp/pathOr';
import Image from '@bbb-app/core-ui/image';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import '@bbb-app/assets/icons/inline/caret.svg';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import CartEmailFormComponent from '@bbb-app/cart-email-form/CartEmailForm.async';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import {
  LOCATORS,
  INVITE_HELP_LBL,
  MODALDIALOG_LBL,
  BACK_LINK_LBL,
  INVITATION_REG_LBL,
  INVITE_FRIEND_EMAIL_SENT_RESPONSE,
} from './constants';
import inviteFriendTealiumInfo from '../../SocialRecommendation/SocialRecommendationInviteModal/inviteFriendTealiumInfo';
import styles from './RegistryCollaborationModal.css';

class RegistryCollaborationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSentResponse: null,
      emailSentErrorResponse: null,
      isSubmitInProgress: false,
      isSuccess: false,
      isMailSent: false,
      isHelpModal: false,
    };
    this.howDoesItWorkModal = this.howDoesItWorkModal.bind(this);
    this.renderInviteModal = this.renderInviteModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  emailSubmitFormError = error => {
    const { body: errorEmailResponse } = error;
    const errorMessage = pathOr(
      '',
      'response.data.errorMessages[0].message',
      errorEmailResponse
    );
    this.setState({
      isSuccess: false,
      emailSentErrorResponse: errorMessage,
      isSubmitInProgress: false,
    });
  };
  emailSubmitFormSuccess = data => {
    const { body: savedEmailResponse } = data;
    const { inviteFriendErrorMsg } = this.props.label;
    const result = pathOr('', 'data.result', savedEmailResponse);
    // istanbul ignore else
    if (result && typeof this.props.fireTealiumAction === 'function') {
      const tealiumConstants = inviteFriendTealiumInfo();
      this.props.fireTealiumAction('', tealiumConstants, '');
    }
    this.setState({
      emailSentResponse: result
        ? INVITE_FRIEND_EMAIL_SENT_RESPONSE
        : inviteFriendErrorMsg,
      isSuccess: !!result,
      isSubmitInProgress: !result,
      isMailSent: !!result,
    });
  };

  emailSubmitForm = formData => {
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
    const { recommenderLandingPageURL } = this.props.label;
    let updatedURL = recommenderLandingPageURL.replace(
      '<eventType>',
      eventType || ''
    );
    updatedURL = updatedURL.replace('<registryId>', registryId || '');
    const domainName = window.location.origin;
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
    this.setState({ isSubmitInProgress: true });
    ServiceUtil.triggerServerRequest({
      url: endPoint,
      method: 'POST',
      data: qs.stringify(apiData),
    })
      .then(this.emailSubmitFormSuccess)
      .catch(this.emailSubmitFormError);
  };
  handleClose = () => {
    this.props.closeCollaborationModal();
  };
  inviteMore = () => {
    this.setState({
      isMailSent: false,
    });
  };

  helpModal = () => {
    this.setState({
      isHelpModal: true,
    });
  };
  returntoInvite = () => {
    this.setState({
      isHelpModal: false,
    });
  };

  howDoesItWorkModal(helpContentWeb, helpContentMob) {
    return (
      <GridX className={styles.collaborationContentWrapper}>
        <PrimaryLink
          onClick={this.returntoInvite}
          href="#"
          className={styles.goBack}
        >
          <Icon type="caret" height="16px" width="16px" />
          <span className={styles.goBackText}>{BACK_LINK_LBL}</span>
        </PrimaryLink>
        {this.props.isMobile ? (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: helpContentMob,
            }}
          />
        ) : (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: helpContentWeb,
            }}
          />
        )}
      </GridX>
    );
  }

  collaborationContent = () => {
    let contentStackData;
    if (
      this.props.contentStackSelectors &&
      this.props.contentStackSelectors.length
    ) {
      contentStackData = this.props.contentStackSelectors[0].modules;
    }
    const contentStackSupportData =
      contentStackData && contentStackData[0].support_page;
    const contentStackContentBodyWeb =
      contentStackData && contentStackData[1].support_page;
    const contentStackContentBodyMob =
      contentStackData && contentStackData[2].support_page;
    const image = pathOr('', 'content_body', contentStackSupportData);
    const inviteFrnds = pathOr('', 'title', contentStackSupportData);
    const inviteFrdDesc = pathOr('', 'field_title', contentStackSupportData);
    const helpContentWeb = pathOr(
      '',
      'content_body',
      contentStackContentBodyWeb
    );
    const helpContentMob = pathOr(
      '',
      'content_body',
      contentStackContentBodyMob
    );
    return (
      <div className={styles.collaborationContentMain}>
        {!this.props.isMobile && (
          <Image
            alt={`${this.props.siteId}_image`}
            src={image}
            className={styles.collaborationContentImage}
          />
        )}
        {this.state.isHelpModal
          ? this.howDoesItWorkModal(helpContentWeb, helpContentMob)
          : this.renderInviteModal(inviteFrnds, inviteFrdDesc)}
      </div>
    );
  };

  closeButton = () => {
    return (
      <Button
        theme="ghostDark"
        variation="noPadding"
        onClick={() => {
          this.props.closeCollaborationModal();
        }}
        aria-label="close-modal"
        className={styles.closeBtn}
      >
        <Icon type="close" width="16px" height="16px" />
      </Button>
    );
  };

  renderInviteModal(inviteFrnds, inviteFrdDesc) {
    const { inviteFriendSentModalTitle, inviteMoreFriend } = this.props.label;
    return !this.state.isMailSent ? (
      <GridX className={styles.collaborationContentWrapper}>
        <Cell className={classnames('large-6 small-12', styles.invite)}>
          <div className={styles.registryInviteFrnds}>{inviteFrnds}</div>
          <div className={styles.registryInviteFrndsDesc}>{inviteFrdDesc}</div>
          <PrimaryLink
            className={classnames(
              styles.registryHelp,
              this.props.siteId === 'BedBathUS' ||
                this.props.siteId === 'BedBathCanada'
                ? styles.regHelp
                : styles.regHelpBaby
            )}
            onClick={this.helpModal}
            href="#"
            title={INVITE_HELP_LBL}
          >
            {INVITE_HELP_LBL}
          </PrimaryLink>
          {this.props.isMobile && <div className={styles.line} />}
        </Cell>
        <Cell className={classnames('large-6 small-12', styles.email)}>
          <CartEmailFormComponent
            labels={this.props.label}
            submitForm={this.emailSubmitForm}
            emailSentResponse={null}
            variation={'emailRegistry'}
            shouldHideRecaptcha
            isFromRegistryInvite
            locators={LOCATORS}
            isFromCollaboration
            submitInProgress={this.state.isSubmitInProgress}
            formWrapperData={this.props.formWrapperData}
            isMobile={this.props.isMobile}
            closeModal={this.handleClose}
          />
        </Cell>
      </GridX>
    ) : (
      <GridX className={styles.collaborationContentWrapper}>
        <div className={styles.mailSentSection}>
          <div className={styles.invitationSent}>
            {!this.state.emailSentErrorResponse && inviteFriendSentModalTitle}
          </div>
          <div className={styles.invitationHas}>
            {!this.state.emailSentErrorResponse &&
              INVITE_FRIEND_EMAIL_SENT_RESPONSE}
          </div>
          <div className={styles.invitationBtnDiv}>
            <Button
              className={styles.invitationButton}
              theme="primary"
              variation="fullWidth"
              data-locator={`invite-more`}
              id="addToInviteMoreBtn"
              onClick={this.inviteMore}
            >
              {inviteMoreFriend}
            </Button>
          </div>
          <div className={styles.invitationRegLink}>
            <PrimaryLink
              className={classnames(
                styles.registryReturn,
                this.props.siteId === 'BedBathUS' ||
                  this.props.siteId === 'BedBathCanada'
                  ? styles.regHelp
                  : styles.regHelpBaby
              )}
              onClick={this.props.redirectToRegistry}
              href="#"
              title={INVITATION_REG_LBL}
            >
              {INVITATION_REG_LBL}
            </PrimaryLink>
          </div>
        </div>
      </GridX>
    );
  }

  render() {
    return this.props.isMobile ? (
      <ModalDialog
        className={styles.collaborationContent}
        mountedState
        titleText={MODALDIALOG_LBL}
        toggleModalState={() => {
          this.props.closeCollaborationModal();
        }}
      >
        {this.collaborationContent()}
      </ModalDialog>
    ) : (
      <div
        className={classnames('grid-container', styles.collaborationContent)}
      >
        {this.closeButton()}
        {this.collaborationContent()}
      </div>
    );
  }
}

RegistryCollaborationModal.propTypes = {
  closeCollaborationModal: PropTypes.func,
  siteId: PropTypes.string,
  isMobile: PropTypes.bool,
  contentStackSelectors: PropTypes.array,
  label: PropTypes.object,
  fireTealiumAction: PropTypes.func,
  registryData: PropTypes.object,
  formWrapperData: PropTypes.object,
  redirectToRegistry: PropTypes.func,
};

export default RegistryCollaborationModal;
