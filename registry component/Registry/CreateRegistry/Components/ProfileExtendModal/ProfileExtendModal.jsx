import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Checkbox from '@bbb-app/core-ui/checkbox';
import { shouldReCaptchaRender } from '@bbb-app/utils/reCaptcha';
import { getCurrentSiteIdAtBrowser, getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import PasswordValidation from '@bbb-app/forms/components/PasswordValidation';
import FormWrapper from '@bbb-app/forms/containers/FormWrapper/FormWrapper';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import {
  INVALID_ANSWER_CODE,
  ALERT_ERRORS,
  NON_ALERT_ERRORS,
  MY_ACCOUNT,
} from '@bbb-app/constants/accountConstants';
import { ReferredContentModal } from '@bbb-app/referred-content-modal/ReferredContentModal';
import ReCaptcha from '@bbb-app/re-captcha/containers/ReCaptcha.async';
import { CAPTCHA_ERROR_MESSAGE } from '@bbb-app/account-signin/containers/constants';
import PersistantLoginInput from '@bbb-app/account-signin/containers/PersistantLogin.async';
import styles from './ProfileExtendModal.css';
import { BBB_SITE_NAME, BBBY_SITE_NAME } from '../../CreateRegistryUtils';
import {
  REGISTRANT_MODAL_HEADING_LBL,
  REGISTRANT_MODAL_CANCEL_BUTTON_LBL,
  REGISTRANT_MODAL_OK_BUTTON_TEXT_BABY_LBL,
  REGISTRANT_MODAL_OK_BUTTON_TEXT_LBL,
  REGISTRANT_MODAL_CHECK_BOX_BABY_LBL,
  REGISTRANT_MODAL_CHECK_BOX_LBL,
} from './constants';

/**
 *This component displays the modal on the basis of the status of the existence of the profile
 *It uses the ReferredContentModal to display the referred content along with the other components.
 */
let isRecaptchaVisibleOnPage = false;
const isBabySite = getSiteId() === 'BuyBuyBaby';
class ProfileExtendModal extends React.PureComponent {
  /**
   * @param {object} labels all labels required in modal
   * @param {boolean} mountedState a boolean value to modal
   * @param {string} eMailInfo the email id value that needs to trigger login api
   * @param {function} closeModal close handler of modal
   * @param {function} onSubmit submit handler of modal
   * @param {object} errorInfo error object to display inline error
   */
  static propTypes = {
    labels: PropTypes.object,
    personalisedLables: PropTypes.object,
    email: PropTypes.string,
    referredContent: PropTypes.object,
    isModalOpen: PropTypes.bool,
    toggleModalState: PropTypes.func,
    onSubmit: PropTypes.func,
    closeModal: PropTypes.func,
    errorInfo: PropTypes.any,
    uniqueId: PropTypes.string,
    formWrapperData: PropTypes.object,
    deviceConfig: PropTypes.object,
    formWrapperIdentifier: PropTypes.string,
    reCaptchaActivationCount: PropTypes.string,
    hideAccountDetectedModal: PropTypes.bool,
    handleKeepSignedIn: PropTypes.func,
    deviceAutoLogin: PropTypes.bool,
    fireTealiumAction: PropTypes.func,
    enableCSLabels: PropTypes.bool,
  };

  static defaultProps = {
    labels: {},
    mountedState: false,
  };

  /**
   * @constructor
   * @param {*} props [AccountDetected props]
   */
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      signUp: false,
      changedPassword: '',
      changedPasswordError: true,
      resetRecaptcha: false,
      recaptchaError: '',
      isRecaptchaValidated: false,
    };
    this.isPristine = false;
    this.closeModal = this.closeModal.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.passwordErrorPresent = this.passwordErrorPresent.bind(this);
    this.extendPasswordHandler = this.extendPasswordHandler.bind(this);
  }

  /**
   * This method will pass the recaptcha validation status to the recaptcha
   * component which will rerender the recaptcha based on the current error/valid state
   * @param {object} args
   * @returns
   * @memberof ReCaptcha
   */
  onRecaptchaValidation = args => {
    const { isValid } = args;
    if (isValid) {
      this.setState({
        isRecaptchaValidated: isValid,
        recaptchaError: '',
      });
    } else {
      this.setState({
        isRecaptchaValidated: isValid,
      });
    }
  };

  /**
   * This method will update the active component's
   *  recaptcha state once the recaptcha component is reset
   * @memberof ReCaptcha
   */
  onResetRecaptcha = () => {
    this.setState({
      resetRecaptcha: false,
    });
  };

  /**
   * TODO: Check if there is better way to handle this.
   * if referred content automatically handle this i.e. different for different site concept
   * @method - getFeedbackSiteOptions method to get dynamic place holders' value on the basis of site id
   * @return {string} option a string for dynamic place holder's value
   */
  getFeedbackSiteOptions() {
    let option = BBB_SITE_NAME;
    const siteId = getCurrentSiteIdAtBrowser();
    if (siteId && siteId.indexOf('BuyBuyBaby') !== -1) {
      option = BBBY_SITE_NAME;
    }
    return option;
  }

  getReferredContent() {
    const { enableCSLabels, labels } = this.props;
    let body = '';
    let contentId;
    const referredContent = pathOr(
      null,
      enableCSLabels ? 'referredContent' : 'createRegistry.referredContent',
      labels
    );
    if (referredContent && referredContent.length) {
      referredContent.forEach(obj => {
        if (obj.key === 'RegistrantProfileExtend') {
          contentId = obj.id;
          body = this.props.referredContent[contentId].body;
        }
      });
    }
    return body;
  }

  /**
   * @method - passwordErrorPresent method set state for password field
   * @param {boolean} passwordValidationFailed a boolean value that indicates password validation occured or not
   * @param {string} passwordField field type
   * @param {string} passwordFieldValue password field value
   */
  passwordErrorPresent(
    passwordValidationFailed,
    passwordField,
    passwordFieldValue
  ) {
    if (passwordField === 'password') {
      this.setState({
        changedPasswordError: passwordValidationFailed,
        changedPassword: passwordFieldValue,
      });
    }
  }
  /**
   * @method - closeModal method to handle closing modal, on closing reseting state values and propogate parent's closeModal function
   */
  closeModal(e) {
    e.preventDefault();
    this.setState({
      signUp: false,
      changedPassword: '',
      changedPasswordError: true,
    });
    this.isPristine = false;
    this.props.closeModal();
  }

  /**
   * @method - handleSignUp set checkbox selected value in state
   * @param {string} selected check box is selected or not
   */
  handleSignUp = selected => {
    this.setState(() => ({
      signUp: selected,
    }));
  };
  fireAction = deviceAutoLogin => {
    const tealiumConstants = {
      navigation_path: MY_ACCOUNT,
      subnavigation_path: MY_ACCOUNT,
      page_function: MY_ACCOUNT,
      channel: MY_ACCOUNT,
    };
    return (
      deviceAutoLogin &&
      this.props.fireTealiumAction('Click', tealiumConstants, '')
    );
  };
  /**
   * @method - extendPasswordHandler method to handle extend password button
   * @param {object} [e] event object
   */
  extendPasswordHandler(formValidationObj) {
    const { isRecaptchaValidated } = this.state;
    const hasError = Object.keys(formValidationObj).length;
    this.isPristine = true;
    const { email, onSubmit, formWrapperData, deviceAutoLogin } = this.props;
    const password = formWrapperData.password.value;
    const optForEmails = this.state.signUp;
    const triggerFromExtendedAccount = true;
    if (
      isRecaptchaVisibleOnPage ? !hasError && isRecaptchaValidated : !hasError
    ) {
      onSubmit(
        email,
        password,
        optForEmails,
        triggerFromExtendedAccount,
        deviceAutoLogin
      );
      this.fireAction(deviceAutoLogin);
    } else if (isRecaptchaVisibleOnPage && !isRecaptchaValidated) {
      this.setState({
        recaptchaError: CAPTCHA_ERROR_MESSAGE,
      });
    }
  }

  /**
   * isDVErrorMessage : Do not show error on Account Detected Modal in case of
   * Device Verification error
   * @param {*} code - Error Code
   */
  isDVErrorMessage(code) {
    return [
      ...ALERT_ERRORS,
      ...NON_ALERT_ERRORS,
      'ECB05280',
      INVALID_ANSWER_CODE,
    ].some(err => err === code);
  }

  /**
   * This method will render the recaptcha component before login button on login form
   * when the global and page level keys for
   * the feature are true and will be enabled after aconfigured number of failed attempts
   * @param
   * @returns recaptcha component
   * @memberof ReCaptcha
   */
  renderRecaptcha() {
    return (
      isRecaptchaVisibleOnPage && (
        <Cell className="large-12 small-12 mb3 pt1">
          <ReCaptcha
            onValidation={this.onRecaptchaValidation}
            elementID="accountDetected-recaptcha"
            reset={this.state.resetRecaptcha}
            onResetRecaptcha={this.onResetRecaptcha}
            errorMessage={this.state.recaptchaError}
          />
        </Cell>
      )
    );
  }

  /**
   * rendering inline error message
   * It uses errorInfo prop to fetch error message.
   * @return {React.Component} Paragraph display error message with provided style
   */
  renderErrorMessage() {
    const { errorInfo } = this.props;
    if (!errorInfo || (errorInfo && !this.isPristine)) {
      return null;
    }
    const errorData =
      errorInfo && errorInfo.response && errorInfo.response.data;
    const messages =
      errorData && errorData.errorMessages && errorData.errorMessages[0];
    const message = messages && messages.message;
    const code = messages && messages.code;

    if (typeof message !== 'string' || this.isDVErrorMessage(code)) return null;
    return (
      <Cell className="small-12 large-12 mb2 inline-block">
        <Paragraph className="validationErrorMessage">{message}</Paragraph>
      </Cell>
    );
  }

  /**
   * rendering form
   * @param {object} labels all required labels in form
   * @return {Form Object} form element with required password, checkbox, extend password button etc fields
   */
  renderForm(personalisedLables) {
    const { handleKeepSignedIn, deviceAutoLogin } = this.props;
    return (
      <FormWrapper
        id="extendPassword"
        name="extendPasswordForm"
        noValidate
        identifier={this.props.formWrapperIdentifier}
        formWrapperData={this.props.formWrapperData}
        onSubmit={this.extendPasswordHandler}
      >
        <GridX>
          <Cell className={classnames('cell large-8 small-12 my2')}>
            {this.renderPasswordField(personalisedLables)}
          </Cell>
          <PersistantLoginInput
            handleKeepSignedIn={handleKeepSignedIn}
            persistantCheckboxState={deviceAutoLogin}
          />
          <Cell className="small-12 large-12 marb40 inline-block">
            {this.renderCheckBoxElement()}
          </Cell>
          {this.renderErrorMessage()}
        </GridX>
        {this.renderRecaptcha()}
        {this.renderExtendPasswordButton()}
        {this.renderCancelButton()}
      </FormWrapper>
    );
  }

  /**
   * rendering password field
   * @param {object} labels all required labels Password Component
   * @return {React.Component} PasswordValidation component that render password field with client side validations
   */
  renderPasswordField(labels) {
    const {
      uniqueId,
      formWrapperData,
      formWrapperIdentifier,
      deviceConfig,
    } = this.props;
    return (
      <PasswordValidation
        confirmPasswordRequired={false}
        firstNameRequired={false}
        labels={labels}
        passwordErrorPresent={this.passwordErrorPresent}
        uniqueId={uniqueId}
        validationToCheck="required"
        hidePasswordValidationMessages
        formWrapperDataPasswordValidation={formWrapperData}
        formWrapperIdentifier={formWrapperIdentifier}
        deviceConfig={deviceConfig}
      />
    );
  }

  /**
   * rendering check box for opting email options
   * @param {object} labels all required labels of Check Box component
   * @return {React.Component} Checkbox with required props
   */
  renderCheckBoxElement() {
    const labelOption = this.getFeedbackSiteOptions();
    return (
      <Checkbox
        label={LabelsUtil.replacePlaceholderValues(
          isBabySite
            ? REGISTRANT_MODAL_CHECK_BOX_BABY_LBL
            : REGISTRANT_MODAL_CHECK_BOX_LBL,
          [labelOption]
        )}
        checked={this.state.signUp}
        onSelect={this.handleSignUp}
        name="signUp"
      />
    );
  }
  /**
   * rendering extend password button
   * @param {object} labels all required labels of Extend Password Button
   * @return {React.Component} Button component with required props
   */
  renderExtendPasswordButton() {
    return (
      <GridX>
        <Cell className={`small-12 large-6 marb40`}>
          <Button
            id="extendPasswordSubmit"
            type="submit"
            theme="primary"
            variation="fullWidth"
            aria-label="extend-password-submit"
            className={`mb0`}
          >
            {isBabySite
              ? REGISTRANT_MODAL_OK_BUTTON_TEXT_BABY_LBL
              : REGISTRANT_MODAL_OK_BUTTON_TEXT_LBL}
          </Button>
        </Cell>
      </GridX>
    );
  }

  /**
   * rendering cancel button
   * @param {object} labels all required labels of Cancel button
   * @return {React.Component} PrimaryLink component with required props
   */
  renderCancelButton() {
    return (
      <PrimaryLink
        id="cancel"
        variation="primary"
        href="#"
        type="bold"
        onClick={this.closeModal}
      >
        {REGISTRANT_MODAL_CANCEL_BUTTON_LBL}
      </PrimaryLink>
    );
  }

  renderChildElements(personalisedLables) {
    return (
      <GridX className="sm-mt2">
        <Cell>{this.renderForm(personalisedLables)}</Cell>
      </GridX>
    );
  }

  render() {
    const content = this.getReferredContent();
    const {
      isModalOpen,
      email,
      toggleModalState,
      personalisedLables,
      reCaptchaActivationCount,
      hideAccountDetectedModal,
    } = this.props;
    isRecaptchaVisibleOnPage = shouldReCaptchaRender(reCaptchaActivationCount);
    const modalProps = {
      toggleModalState,
      mountedState: isModalOpen,
      contentWrapperClass: styles.accountDetectedBodyText,
      titleAriaLabel: REGISTRANT_MODAL_HEADING_LBL,
      verticallyCenter: true,
      variation: 'medium',
      scrollDisabled: false,
      closeDataLocator: 'registry-modalcloseicon',
      modalDataLocator: 'registry-modaloverlay',
      dialogClass: hideAccountDetectedModal && 'hide',
    };
    let contentWithPlaceHolder;
    if (!isEmpty(content))
      contentWithPlaceHolder = LabelsUtil.replacePlaceholderValues(
        content,
        [email],
        true
      );
    return (
      <ReferredContentModal
        modalProps={modalProps}
        heading={REGISTRANT_MODAL_HEADING_LBL}
        headingClassName={classnames(styles.accountDetectedHeading, 'mb3')}
        headingLevel={2}
        content={contentWithPlaceHolder}
        contentClassName={styles.accountDetectedBodyText}
      >
        {this.renderChildElements(personalisedLables)}
      </ReferredContentModal>
    );
  }
}

export default ProfileExtendModal;
