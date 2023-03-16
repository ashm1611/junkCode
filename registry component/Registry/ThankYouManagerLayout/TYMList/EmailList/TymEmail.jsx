import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import classnames from 'classnames';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import CartEmailFormComponent from '@bbb-app/cart-email-form/CartEmailForm.async';

import {
  TYM_EMAIL_LBL,
  TYM_EMAIL_MODAL_CTA_LBL,
  TYM_EMAIL_MODAL_LBL,
  EMAIL_SENT_RESPONSE_LBL,
  EMAIL_SUBJECT_LBL,
  EMAIL_TITLE_LBL,
  TYM_SAVED_ITEMS_HEADING_LBL,
  TYM_TO_EMAIL_LBL,
} from '../../../constants';

import styles from '../TymList.css';
import '../../../../../../assets/icons/share-registry.svg';

class TymEmail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalMountedState: false,
      checkBoxChecked: false,
      prevPageYOffset: 0,
    };
    this.toggleModalState = this.toggleModalState.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onUserAcceptance = this.onUserAcceptance.bind(this);
    this.emailSubmitForm = this.emailSubmitForm.bind(this);
    this.emailSubmitFormSuccess = this.emailSubmitFormSuccess.bind(this);
    this.emailSubmitFormError = this.emailSubmitFormError.bind(this);
    this.clearSubmitResponse = this.clearSubmitResponse.bind(this);
  }

  /**
   * This will handle checkbox selection
   */
  onUserAcceptance() {
    this.setState({
      checkBoxChecked: !this.state.checkBoxChecked,
    });
  }

  /**
   * trigger API for sending saved cart email and set local state based on response recieved
   */
  emailSubmitForm(formData) {
    const endPoint = getApiEndPointsFromStore('emailRegistry');
    const { checkBoxChecked } = this.state;
    const activeRegistry = this.props.activeRegistryData;
    const apiData = {
      registryURL: window.location.href,
      senderEmail: formData.senderEmail,
      recipientEmail: formData.recipientEmail,
      eventType: activeRegistry.eventType,
      message: formData.message,
      registryEventDate: activeRegistry.eventDate,
      subject: EMAIL_SUBJECT_LBL,
      regFirstName: activeRegistry.primaryRegistrantFirstName,
      regLastName: activeRegistry.primaryRegistrantLastName,
      title: EMAIL_TITLE_LBL,
      coRegFirstName: activeRegistry.coRegistrantFirstName,
      coRegLastName: activeRegistry.coRegistrantLastName,
      registryName: activeRegistry.eventType,
      daysToGo: activeRegistry.daysToGo,
      registryId: activeRegistry.registryId,
      ccFlag: checkBoxChecked,
      sendAttachment: true,
      'EmailHolder.values.eventTypeRegistry': activeRegistry.eventType,
    };
    this.sentEmail = formData.recipientEmail;
    this.setState({
      submitInProgress: true,
    });
    ServiceUtil.triggerServerRequest({
      url: endPoint,
      method: 'POST',
      data: qs.stringify(apiData),
      headers: {
        'atg-rest-depth': 0,
      },
    })
      .then(this.emailSubmitFormSuccess)
      .catch(this.emailSubmitFormError);
  }

  /**
   * submitForm Success handler
   */
  emailSubmitFormSuccess(data) {
    const { body: savedEmailResponse } = data;
    if (savedEmailResponse.data.result) {
      this.setState({
        isSuccess: true,
        emailSentResponse: `${EMAIL_SENT_RESPONSE_LBL}
        ${this.sentEmail}`,
        submitInProgress: false,
      });
    } else {
      this.setState({
        isSuccess: false,
        emailSentResponse: savedEmailResponse.data.component.emailResponse,
        submitInProgress: false,
      });
    }
  }

  /**
   * submitForm Error handler
   */
  emailSubmitFormError(error) {
    const { body: errorEmailResponse } = error;
    this.sentEmail = '';
    this.setState({
      isSuccess: false,
      emailSentResponse:
        errorEmailResponse.response.data.errorMessages[0].message,
      submitInProgress: false,
    });
  }

  /**
   * Clear last submit response
   */
  clearSubmitResponse() {
    this.setState({
      isSuccess: null,
      emailSentResponse: null,
      submitInProgress: false,
      checkBoxChecked: false,
    });
  }

  handleButtonClick = event => {
    event.preventDefault();
    this.setState({
      modalMountedState: !this.state.modalMountedState,
    });
  };

  toggleModalState = state => {
    this.setState({ modalMountedState: state });

    setTimeoutCustom(() => {
      window.scrollTo(0, this.state.prevPageYOffset);
    }, 0);
  };

  openModal(e) {
    e.preventDefault();
    this.clearSubmitResponse();
    this.toggleModalState(true);
    this.setState({ prevPageYOffset: window.pageYOffset });

    /*
      Positions the window to the top of the document to ensure the
      reCaptcha image challenge flyout appears within the viewport.

      This is because the email ModalDialog positions itselft as fixed
      at it's current position of window.
    */

    window.scrollTo(0, 0);
  }

  render() {
    const { globalSwitchConfig, formWrapperData } = this.props;

    return (
      <React.Fragment>
        <PrimaryLink
          href={'/'}
          type={'bold'}
          onClick={this.openModal}
          iconProps={{
            type: 'share-registry',
            width: 23,
            height: 23,
          }}
          className={classnames(styles.downloadTYM)}
        >
          {TYM_EMAIL_LBL}
        </PrimaryLink>
        <ModalDialog
          mountedState={this.state.modalMountedState}
          toggleModalState={this.toggleModalState}
          titleAriaLabel={TYM_EMAIL_MODAL_LBL}
          verticallyCenter
          variation="small"
          scrollDisabled
          closeModal={this.handleButtonClick}
          underlayClickExits={false}
        >
          <CartEmailFormComponent
            labels={{
              ...this.props.labels.registryDetails,
              savedItemsHeadingLabel: TYM_SAVED_ITEMS_HEADING_LBL,
              toEmailLabel: TYM_TO_EMAIL_LBL,
              cartContinueShopping: TYM_EMAIL_MODAL_CTA_LBL,
            }}
            closeModal={this.handleButtonClick}
            submitForm={this.emailSubmitForm}
            variation={'emailRegistry'}
            handleCheckBox={this.onUserAcceptance}
            emailSentResponse={this.state.emailSentResponse}
            checkBoxChecked={this.state.checkBoxChecked}
            globalSwitchConfig={globalSwitchConfig}
            formWrapperData={formWrapperData}
            fromEmail={
              this.props.emailId ||
              this.props.activeRegistryData.primaryRegistrantEmail
            }
          />
        </ModalDialog>
      </React.Fragment>
    );
  }
}

TymEmail.propTypes = {
  activeRegistryData: PropTypes.object,
  labels: PropTypes.object,
  globalSwitchConfig: PropTypes.object,
  formWrapperData: PropTypes.object,
  emailId: PropTypes.string,
};

export default TymEmail;
