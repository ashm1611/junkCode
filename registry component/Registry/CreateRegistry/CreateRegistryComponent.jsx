/* eslint max-lines: ["error", {"max": 1300, "skipComments": true}] */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { Redirect } from 'react-router';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import {
  scrollToElement,
  getElementHeight,
  isTouchDevice,
  isBedBathCanada,
  isMobileDevice,
  getSiteId,
} from '@bbb-app/utils/common';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import {
  PROFILE_STATUS,
  profileStatusLabelMap,
} from '@bbb-app/utils/myAccountUtils/profileStatusMap';
import setFocus from '@bbb-app/utils/setFocus';
import ShowOnTbs from '@bbb-app/core-ui/show-on-tbs/ShowOnTbs';
import { validateAll } from '@bbb-app/forms/validations/validator';
import RegistryTypeModalWrapper from '@bbb-app/registry-type/containers/registry-type-modal/RegistryTypeModalWrapper';
import calculateOffset from '@bbb-app/utils/calculateOffset';
import AssociateSignIn from '@bbb-app/tbs/containers/associate-signin/AssociateSignIn.async';
import { CA_SHIP_RESTRICTION } from '@bbb-app/constants/QasValidation';
import {
  CAPTCHA_ERROR_MESSAGE,
  PROFILE_HARD_LOCKED_ERR_CODE_CHECKLIST_FLOW,
} from '@bbb-app/account-signin/containers/constants';
import {
  PAGE_NAME_CREATE_REGISTRY,
  ROUTE_SHALLOW_PROFILE_REGISTRATION,
} from '@bbb-app/constants/route/route';
import styles from './CreateRegistryFormStyles.css';
import RegistryBanner from './Components/RegistryBanner/RegistryBanner';
import Skeleton from './Skeleton';
import {
  checkForRequired,
  eventTypeConst,
  submitRegistryData,
  registrantTypeConst,
  createRegistryDefaultState,
  getformattedStreet,
  getMoveInValidation,
  getShippingValidation,
  validateBabyMultiples,
} from './CreateRegistryUtils';
import { REGISTRY_FORM_DATA_LOCATOR } from './Datalocators';
import ProfileExtendModal from './Components/ProfileExtendModal/ProfileExtendModal';
import RenderCreateRegistryForm from './Components/RenderCreateRegistryForm/RenderCreateRegistryForm';
import RenderCreateRegistryFormV2 from './Components/RenderCreateRegistryForm/RenderCreateRegistryFormV2';
import RegistryDeviceVerification from './Components/DeviceVerification/RegistryDeviceVerification';
import {
  ENTER_VALID_ADDRESS_LBL,
  PROFILE_EXIST_MSG_LBL,
  PROFILE_STATUS_LBL,
} from './constants';
// Extract 'profileStatusLabels' containing the list of scenarios (and label reference) on PAGE_NAME_CREATE_REGISTRY for profileStatus call.
const {
  [PAGE_NAME_CREATE_REGISTRY]: profileStatusLabels,
} = profileStatusLabelMap;
// TODO- refactor this component to reduce number of lines.Removed js doc lines for now. //
/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {function} changeRegistryType [Labels and strings to be rendered on Create registry page]
 * @param {object} location [Location of current page to fetch regtype]
 * @param {boolean} isFetching [key to manage api response status]
 * @param {object} history [Location history object]
 * @param {object} registryInputs [Form input rules]
 * @param {object} personalisedLables [Personalised Lables for Password Validation]
 * @param {function} createRegistry
 * @param {boolean} isLoggedIn [Is user logged in]
 * @param {object} registryConfig [Registry switch config]
 */
const propTypes = {
  labels: PropTypes.object,
  changeRegistryType: PropTypes.func,
  location: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  createRegistryModalPopUp: PropTypes.bool,
  registryInputs: PropTypes.object,
  checkProfileStatus: PropTypes.func,
  resetProfileStatus: PropTypes.func,
  referredContent: PropTypes.object,
  personalisedLables: PropTypes.object,
  createRegistry: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  accountAddress: PropTypes.object, // eslint-disable-line
  profileData: PropTypes.object, // eslint-disable-line
  onExtendProfileSubmitClick: PropTypes.func,
  extendAccountError: PropTypes.object,
  isRegistryTypeModalOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  updateSubmitStateData: PropTypes.func,
  formWrapperData: PropTypes.object,
  formWrapperIdentifier: PropTypes.string,
  formWrapperDataRegisterOrLogin: PropTypes.object,
  formWrapperIdentifierRegisterOrLogin: PropTypes.string,
  deviceConfig: PropTypes.object,
  addFormField: PropTypes.func,
  globalSwitchConfig: PropTypes.object,
  reCaptchaActivationCount: PropTypes.string,
  pageConfigGlobal: PropTypes.object,
  guestDefault: PropTypes.number,
  isEmailVerRequired: PropTypes.bool,
  thersholdDayForOldRegistry: PropTypes.string,
  deviceVerificationData: PropTypes.object,
  deviceVerificationError: PropTypes.object,
  error: PropTypes.object,
  resetVerType: PropTypes.func,
  fireTealiumAction: PropTypes.func,
  isBabyRegistry: PropTypes.bool,
  enableNewSignUp: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
  fetchContentStack: PropTypes.func,
  enableRegistryQuiz: PropTypes.bool,
  isNewCreateRegForm: PropTypes.bool,
  changePhoneNo: PropTypes.func,
  phoneChangeState: PropTypes.bool,
  signInClicked: PropTypes.func,
  verifyClicked: PropTypes.func,
  verifyPhoneState: PropTypes.bool,
  isNewDashboard: PropTypes.bool,
};
const defaultProps = {
  guestDefault: 100,
};

const defaultState = createRegistryDefaultState;
const propToStateMap = {
  'profileData.firstName': 'firstName',
  'profileData.lastName': 'lastName',
  'profileData.email': 'email',
  'profileData.mobileNumber': 'mobilePh',
  'profileData.phoneNumber': 'primaryPh',
  'accountAddress.shippingAddress.address1': 'addressOne',
  'accountAddress.shippingAddress.address2': 'addressTwo',
  'accountAddress.shippingAddress.city': 'city',
  'accountAddress.shippingAddress.state': 'state',
  'accountAddress.shippingAddress.postalCode': 'zip',
};
/**
 * @class CreateRegistryComponent
 * Create Registry Component renders layout for create registry page based on registry type.
 */
class CreateRegistryComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleRegistryModalState = this.toggleRegistryModalState.bind(this);
    this.onModalSelectionChange = this.onModalSelectionChange.bind(this);
    this.updateState = this.updateState.bind(this);
    this.checkFormSubmit = this.checkFormSubmit.bind(this);
    this.personalInfoValidation = this.personalInfoValidation.bind(this);
    this.optionalInfoValidation = this.optionalInfoValidation.bind(this);
    this.eventInfoValidation = this.eventInfoValidation.bind(this);
    this.contactInfoValidation = this.contactInfoValidation.bind(this);
    this.passwordErrorPresent = this.passwordErrorPresent.bind(this);
    this.updatePasswordData = this.updatePasswordData.bind(this);
    this.submitData = this.submitData.bind(this);
    this.onSelectSubscribe = this.onSelectSubscribe.bind(this);
    this.onSelectThirdPartyOption = this.onSelectThirdPartyOption.bind(this);
    this.addressValidation = this.addressValidation.bind(this);
    this.stateRuleByRegion = this.stateRuleByRegion.bind(this);
    this.closeProfileExtendModal = this.closeProfileExtendModal.bind(this);
    this.toggleProfileExtendModalState = this.toggleProfileExtendModalState.bind(
      this
    );
    this.handleProfileExtendClick = this.handleProfileExtendClick.bind(this);
    this.handleRegistrantProfileStatus = this.handleRegistrantProfileStatus.bind(
      this
    );
    this.listenProfileStatusChange = this.listenProfileStatusChange.bind(this);
    this.profileModal = this.profileModal.bind(this);
    this.dateValidation = this.dateValidation.bind(this);
    this.showShippingInfo = this.showShippingInfo.bind(this);
    this.hideShippingInfo = this.hideShippingInfo.bind(this);
    this.showMoveInfo = this.showMoveInfo.bind(this);
    this.hideMoveInfo = this.hideMoveInfo.bind(this);
    this.getPassWordError = this.getPassWordError.bind(this);
    this.clearConfirmPasswordField = this.clearConfirmPasswordField.bind(this);
    this.handleProfileHardLockedStatus = this.handleProfileHardLockedStatus.bind(
      this
    );
    this.handleKeepSignedIn = this.handleKeepSignedIn.bind(this);
    this.getContentStackData = this.getContentStackData.bind(this);
    this.flagOptional = false;
    this.primaryRegistrantEmailForShallowUser = '';
    let loggedInState = {};
    if (this.props.isLoggedIn) {
      loggedInState = {
        confirmPasswordError: false,
        passwordError: false,
      };
    }
    this.state = {
      ...defaultState,
      ...loggedInState,
      isProfileExtendModalOpen: false,
      isProfileExist: false,
      isOtherCountryProfile: false,
      isRecognized: false,
      isProfileStatusFlag: false,
      isLoggedIn: this.props.isLoggedIn,
      isRegistryTypeOpen: this.props.isRegistryTypeModalOpen,
      isPassWordEmpty: false,
      isConfirmPasswordEmpty: false,
      recaptchaError: '',
      isRecaptchaValidated: false,
      isRecaptchaEnabled: false,
      guests: this.props.isNewDashboard ? '0' : props.guestDefault.toString(),
      profileHardLocked: false,
      deviceAutoLogin: true,
      isV2SignUpFlow: false,
      isV2FormSubmit: false,
    };
    const loginRule = pathOr('', 'location.params.loginRule', this.props);
    this.signUpFromRegistry =
      !this.props.isLoggedIn ||
      loginRule === 'addToRegistry' ||
      isUserRecognized();
  }
  componentDidMount() {
    this.flagOptional = pathOr(
      false,
      'registryConfig.enableOptionalPanel',
      this.props
    );
  }
  componentWillReceiveProps(nextProps) {
    const nextEventType = pathOr(null, 'eventType', nextProps.registryInputs);
    const eventType = pathOr(null, 'eventType', this.props.registryInputs);
    if (
      nextProps.isLoggedIn &&
      nextProps.isLoggedIn !== this.props.isLoggedIn
    ) {
      window.scrollTo(0, 0);
    }
    /** function to detect props change and keep the state upto  date
     * To use this utility map props and state in propToStateMap above.
     */
    if (nextEventType !== eventType) {
      this.resetFormData(); // when registry type changes than force update the state
      this.props.updateSubmitStateData(false);
      this.populateProfileData({}, nextProps);
    } else {
      this.populateProfileData(this.props, nextProps);
    }
    this.clearConfirmPasswordField(nextProps);
    if (!isEmpty(nextProps.registryInputs)) {
      const isRecognized = isUserRecognized();
      this.setState({
        registryInputFields: nextProps.registryInputs.registryInputMap,
        eventType: nextProps.registryInputs.eventType,
        eventCode: nextProps.registryInputs.eventCode,
        isLoggedIn: nextProps.isLoggedIn && !isRecognized,
        isRecognized,
      });
      const nextPropThirdPartySearchFlag = this.strToBoolean(
        pathOr(true, 'registryConfig.RegistryThirdPartySearchFlag', nextProps)
      );
      const nextPropEmailOptIn = this.strToBoolean(
        pathOr(true, 'registryConfig.email_OptIn_Checked_Flag', nextProps)
      );
      const propThirdPartySearchFlag = this.strToBoolean(
        pathOr(true, 'registryConfig.RegistryThirdPartySearchFlag', this.props)
      );
      const propEmailOptIn = this.strToBoolean(
        pathOr(true, 'registryConfig.email_OptIn_Checked_Flag', this.props)
      );
      const nextPropNetworkAffiliation = pathOr(
        false,
        'registryInputs.registryInputMap.networkAffiliation',
        nextProps
      );
      if (nextPropNetworkAffiliation) {
        if (
          !this.state.checkBoxSet ||
          nextPropThirdPartySearchFlag !== propThirdPartySearchFlag
        ) {
          this.setState({
            thirdPartySelected:
              nextPropNetworkAffiliation.autoCheck &&
              nextPropThirdPartySearchFlag,
          });
        }
        if (!this.state.checkBoxSet || nextPropEmailOptIn !== propEmailOptIn) {
          this.setState({
            subscribeSelected: nextPropEmailOptIn,
          });
        }
        this.setState({
          checkBoxSet: true,
        });
      }
    }
    this.setRBYRSelectedState(nextProps);
    this.profileModal(nextProps); // when user get logged in close profile extend modal.
    this.handleProfileHardLockedStatus(nextProps);
    const loginRule = pathOr('', 'params.loginRule', nextProps.location);
    this.signUpFromRegistry =
      !nextProps.isLoggedIn ||
      loginRule === 'addToRegistry' ||
      isUserRecognized();
    const { isV2SignUpFlow, email, firstName, isV2FormSubmit } = this.state;
    if (isV2SignUpFlow && !this.signUpFromRegistry)
      this.setState({ isV2SignUpFlow: false, isV2FormSubmit: true });
    if (isV2FormSubmit && email && firstName && !email.startsWith('***')) {
      this.submitData();
      this.setState({ isV2FormSubmit: false });
    }
  }
  /** change state on change of subscribe option
   * @param {bool} selected true/false
   */
  onSelectSubscribe = selected => {
    this.setState(() => ({
      subscribeSelected: selected,
    }));
  };
  /** change state on change of third party checkbox
   * @param {bool} selected true/false
   */
  onSelectThirdPartyOption = selected => {
    this.setState(() => ({
      thirdPartySelected: selected,
    }));
  };
  /** Inherited method prop from CreateRegistry
   * change the registry type.
   * @param {string} type registry type code
   */
  onModalSelectionChange(type) {
    const eventType = type.registryCode;
    this.props.changeRegistryType(eventType);
    this.toggleRegistryModalState(false);
  }
  onSelectRBYROption = selected => {
    this.setState(() => ({
      isRegistryRBYRSelected: selected,
    }));
  };
  getPassWordError() {
    const { confirmPasswordError, passwordError } = this.state;
    const confirmPasswordErrorTemp =
      !this.props.isLoggedIn &&
      !this.state.isRecognized &&
      confirmPasswordError;
    const passwordErrorTemp =
      (!this.props.isLoggedIn || this.state.isRecognized) && passwordError;
    return confirmPasswordErrorTemp || passwordErrorTemp;
  }
  setRBYRSelectedState = nextProps => {
    const propRBYROptIn = pathOr(
      false,
      'registryConfig.RBYRCheckedFlag',
      this.props
    );
    const nextPropRBYROptIn = pathOr(
      false,
      'registryConfig.RBYRCheckedFlag',
      nextProps
    );
    if (!this.state.checkBoxSet || propRBYROptIn !== nextPropRBYROptIn) {
      this.setState({
        isRegistryRBYRSelected: nextPropRBYROptIn,
      });
    }
  };
  /**
   * This methods sets state profileHardLocked when user profile is hard locked
   *  and tries to sign in
   */
  setHardLockState = (value = false) => {
    this.setState(() => ({
      profileHardLocked: value,
    }));
  };
  getContentStackData() {
    this.props.fetchContentStack(
      false,
      '/store/static/registry-confirmation-success-modal'
    );
  }
  handleSignSisterSite = (key, selected) => {
    this.setState(() => ({
      [key]: selected,
    }));
  };
  /** check if User profile is Hard Locked or not
   */
  handleProfileHardLockedStatus(nextProps) {
    const error = pathOr('', '[0].message', this.props.error);
    const nextPropError = pathOr('', '[0].message', nextProps.error);
    const nextPropErrorCode = pathOr('', '[0].code', nextProps.error);
    const isProfileErrorCodeHardLocked =
      isEmpty(error) &&
      nextPropError &&
      nextPropErrorCode === PROFILE_HARD_LOCKED_ERR_CODE_CHECKLIST_FLOW;
    if (isProfileErrorCodeHardLocked) {
      this.setHardLockState(true);
    }
  }
  strToBoolean(str) {
    return /true/i.test(str);
  }
  profileModal(nextProps) {
    const nextIsLoggedIn = nextProps.isLoggedIn;
    const isLoggedIn = this.props.isLoggedIn;
    if (nextIsLoggedIn) {
      this.toggleProfileExtendModalState(false);
    }
    if (nextIsLoggedIn !== isLoggedIn) {
      this.setState({ isLoggedIn: nextIsLoggedIn });
    }
    if (this.state.isProfileStatusFlag && !isEmpty(nextProps.referredContent)) {
      if (nextProps.profileStatusUserType === registrantTypeConst.REGISTRANT) {
        this.handleRegistrantProfileStatus(nextProps);
      }
    }
  }
  /**
   * Higher order function which compare two similar structure object
   * and create a new state equivalent object from the state object mapping
   * provided and difference in object.
   * Note: Depends on _.pathOr to get the key in nested objects
   * @param {Object} currentProps [current props]
   * @param {Object} nextProps [next props]
   * @param {object} mapPropsToState [mapping object of props to state]
   */
  mapUpdatedPropsToState = (obj, nextObj) => {
    return mapPropsToState => {
      const updatedState = {};
      Object.keys(mapPropsToState).reduce((difference, property) => {
        const stateKey = mapPropsToState[property];
        const propValue = pathOr('', property, nextObj);
        if (pathOr('', property, obj) !== propValue) {
          difference.push(property);
          updatedState[stateKey] = propValue;
        }
        return difference;
      }, []);
      return updatedState;
    };
  };
  /* This will clear the registry form data */
  resetFormData() {
    const updatedState = Object.assign({}, defaultState);
    this.setState(updatedState);
  }
  populateProfileData(props, nextProps) {
    // Populate data when user change registry type
    const updatedState = this.mapUpdatedPropsToState(
      props,
      nextProps
    )(propToStateMap);
    if (!isEmpty(updatedState)) {
      const { addressOne, addressTwo, city, state, zip } = updatedState;
      const street = getformattedStreet(addressOne, city, state, zip);
      const otherAddressFields = {
        street,
        apartment: addressTwo,
        shippingStreet: street,
        shippingAddressOne: addressOne,
        shippingAddressTwo: addressTwo,
        shippingApartment: addressTwo,
        shippingCity: city,
        shippingState: state,
        shippingZip: zip,
        emailInfo: '',
        isProfileExist: false,
        profileAddress: street,
      };
      this.setState({ ...updatedState, ...otherAddressFields });
    }
  }
  handleRegistrantProfileStatus(nextProps) {
    const nextProfileStatus = pathOr(
      null,
      'profileStatus.atgResponse',
      nextProps
    );
    const profileStatusMsg = pathOr(
      '',
      profileStatusLabels[nextProfileStatus],
      PROFILE_STATUS_LBL
    );
    if (nextProfileStatus === PROFILE_STATUS.VERIFICATION_PENDNG) {
      this.setState({
        showVerMsg: true,
        isProfileExist: true,
        profileHardLocked: false,
      });
    } else if (
      nextProfileStatus === PROFILE_STATUS.EXISTS ||
      nextProfileStatus === PROFILE_STATUS.EXISTS_SOCIAL
    ) {
      this.setState({
        isProfileExist: true,
        isOtherCountryProfile: false,
        emailInfo: PROFILE_EXIST_MSG_LBL,
        confirmPasswordError: false,
        isProfileStatusFlag: false,
        profileHardLocked: false,
      });
    } else if (nextProfileStatus === PROFILE_STATUS.EXISTS_IN_SISTER_SITE) {
      this.setState({
        isProfileExtendModalOpen: true,
        isOtherCountryProfile: false,
        isProfileStatusFlag: false,
        confirmPasswordError: false,
        hideAccountDetectedModal: false,
        profileHardLocked: false,
      });
      this.props.resetVerType();
    } else if (nextProfileStatus === PROFILE_STATUS.HARD_LOCKED) {
      this.setState({
        isProfileExist: true,
        isOtherCountryProfile: false,
        emailInfo: profileStatusMsg,
        confirmPasswordError: false,
        isProfileStatusFlag: false,
        showVerMsg: false,
        profileHardLocked: true,
      });
    } else if (
      Object.prototype.hasOwnProperty.call(
        profileStatusLabels,
        nextProfileStatus
      )
    ) {
      this.setState({
        isProfileExist: true,
        isOtherCountryProfile: true,
        emailInfo: profileStatusMsg,
        isProfileStatusFlag: false,
        confirmPasswordError: false,
        profileHardLocked: false,
      });
    } else {
      this.setState({
        isProfileExist: false,
        isOtherCountryProfile: false,
        emailInfo: '',
        confirmPasswordError: this.state.confirmPasswordError,
        showVerMsg: false,
        profileHardLocked: false,
      });
    }
  }
  /**
   * update the state on change in input field
   * @param {Object} value
   */
  updateState(value) {
    this.setState(value);
  }
  /** Get Updated password data from the child {PasswordValidation.jsx} component
   * @param {string} pwd
   * @param {string} confPwd
   * @memberof ChangePassword
   */
  updatePasswordData(pwd, confPwd) {
    this.setState({
      password: pwd || '',
      confirmPassword: confPwd || '',
    });
  }
  /**
   * Determine whether error present or not.
   * @param {string} passwordValidationFailed
   * @param {string} passwordField
   * @param {string} passwordFieldValue
   * @memberof ChangePassword
   */
  passwordErrorPresent(
    passwordValidationFailed,
    passwordField,
    passwordFieldValue
  ) {
    if (passwordField === 'password') {
      this.setState({
        passwordError: passwordValidationFailed,
        password: passwordFieldValue,
      });
    } else {
      const passwordValidationFailedForString = !isEmpty(
        passwordValidationFailed
      );
      const passwordValidationFailedForBoolean =
        typeof passwordValidationFailed === 'boolean' &&
        passwordValidationFailed;
      this.setState({
        confirmPasswordError:
          passwordValidationFailedForString ||
          passwordValidationFailedForBoolean,
        confirmPassword: passwordFieldValue,
      });
    }
  }
  errorValidationFields = (eventType, registryInputs) => {
    const personalValidation = this.personalInfoValidation(registryInputs);
    const eventValidation = this.eventInfoValidation(registryInputs);
    const babyOptionalValidation = this.optionalInfoValidation();
    const contactValidation = this.contactInfoValidation(registryInputs);
    const shippingValidation = this.shippingValidation(registryInputs);
    const moveInValidation = this.moveInValidation(registryInputs);
    const dateValidation = this.dateValidation(registryInputs);
    if (eventType === eventTypeConst.BABY) {
      return {
        ...personalValidation,
        ...eventValidation,
        ...contactValidation,
        ...babyOptionalValidation,
        ...shippingValidation,
        ...moveInValidation,
        ...dateValidation,
      };
    }
    return {
      ...personalValidation,
      ...eventValidation,
      ...contactValidation,
      ...moveInValidation,
      ...shippingValidation,
      ...dateValidation,
    };
  };
  /* Shipping Validation */
  shippingValidation(registryInputs) {
    return getShippingValidation(
      registryInputs,
      this.state,
      this.props.labels,
      this.props.globalSwitchConfig
    );
  }
  /**
   * Move in Validation
   */
  moveInValidation(registryInputs) {
    return getMoveInValidation(
      registryInputs,
      this.state,
      this.props.labels,
      this.props.globalSwitchConfig
    );
  }
  dateFormatByRegion() {
    return isBedBathCanada() ? 'eventDateCanada' : 'eventDate';
  }
  /**
   * date validation
   * @param {object} registryInputs
   */
  dateValidation(registryInputs) {
    const { eventDate, showerDate } = this.state;
    const eventDateRule =
      checkForRequired(registryInputs.registryInputMap.eventDate) ||
      checkForRequired(
        registryInputs.registryInputMap.babyExpectedArivalDate
      ) ||
      eventDate.length > 0
        ? {
            rule: this.dateFormatByRegion(),
            value: eventDate,
          }
        : {};
    const showerDateRule =
      checkForRequired(registryInputs.registryInputMap.showerDate) ||
      showerDate.length > 0
        ? {
            rule: this.dateFormatByRegion(),
            value: showerDate,
          }
        : {};
    return { eventDate: eventDateRule, showerDate: showerDateRule };
  }
  /**
   *Checks for captcha error when captcha enabled
   scrolls to error on page
   * @param {object} registryInputs
   * @param {object} e
   */
  handleInvalidCaptcha = formRef => {
    const { isMobile } = this.props;
    const { isRecaptchaEnabled, isRecaptchaValidated } = this.state;
    if (isRecaptchaEnabled && isRecaptchaValidated === false) {
      this.setState({
        recaptchaError: CAPTCHA_ERROR_MESSAGE,
      });
      if (!isMobile && !isTouchDevice()) {
        scrollToElement('.passwordFocus', getElementHeight('header'));
      }
      /* istanbul ignore next */
      setTimeoutCustom(() => {
        const errorElement = formRef
          ? formRef.getElementsByClassName('recaptchaElement')
          : null;
        if (!errorElement) {
          return;
        }
        if (isMobileDevice.iOS()) {
          const offset = calculateOffset(errorElement);
          window.scrollTo(0, offset.top - 150);
        } else {
          setFocus(formRef, 'passwordFocus');
        }
      }, 0);
    }
  };
  /**
   * Submit Function of the form
   * @param {object} registryInputs
   * @param {object} e
   */
  /* eslint-disable complexity */
  checkFormSubmit(registryInputs, e) {
    const isEvent = e && e.target;
    if (isEvent) {
      e.preventDefault();
    }
    const { isOtherCountryProfile } = this.state;
    this.props.updateSubmitStateData(true);
    const formRef = isEvent
      ? e.target
      : document.getElementById('createRegistry');
    const { isMobile, labels } = this.props;
    const { isRecaptchaEnabled, isRecaptchaValidated } = this.state;
    const errorValidationFields = this.errorValidationFields(
      registryInputs.eventType,
      registryInputs
    );
    let errors = validateAll(errorValidationFields);
    const errorObj = validateBabyMultiples(
      registryInputs.eventType,
      this.state,
      labels.createRegistry
    );
    errors = Object.assign({}, errors, errorObj);
    if (this.props.isNewCreateRegForm) {
      const isAnyFieldError = registryInputs.registryInputList.some(item => {
        const fieldError = `${item.fieldName}Error`;
        return fieldError in errors;
      });
      if (!isAnyFieldError && this.signUpFromRegistry)
        this.setState({ isV2SignUpFlow: true });
    }
    const hasPasswordErrors = isEvent
      ? this.getPassWordError()
      : Object.keys(e).length;
    const hasErrors = Object.keys(errors).length > 0;
    const isFieldSetNotValid =
      hasErrors || hasPasswordErrors || isOtherCountryProfile;
    this.handleInvalidCaptcha(formRef);
    if (
      isRecaptchaEnabled
        ? isFieldSetNotValid || !isRecaptchaValidated
        : isFieldSetNotValid
    ) {
      this.setState(errors, () => {
        if (!isMobile && !isTouchDevice()) {
          if (Object.keys(errorObj).length) {
            scrollToElement('#genderBabyGirlError', -100);
          } else {
            scrollToElement(`.${styles.formError}`, getElementHeight('header'));
          }
        }
        /* istanbul ignore next */
        setTimeoutCustom(() => {
          const errorElement = formRef
            ? formRef.getElementsByClassName(styles.formError)
            : [];
          if (isMobileDevice.iOS()) {
            const offset = calculateOffset(errorElement[0]);
            window.scrollTo(0, offset.top - 150);
          } else {
            setFocus(formRef, styles.formError);
          }
        }, 0);
      });
      // Should scroll the screen to the email section in case form submission fails because of profileStatus being 'profile_exists_on_ca'.
      if (isOtherCountryProfile) {
        scrollToElement('#email', getElementHeight('header'));
      }
    } else if (
      !this.props.isNewCreateRegForm ||
      (!this.signUpFromRegistry && !this.state.isV2SignUpFlow)
    ) {
      this.submitData();
    }
  }
  /**
   * personal info vaildation
   * @param {object} registryInputs
   */
  personalInfoValidation(registryInputs) {
    const {
      coFirstName,
      coLastName,
      coEmail,
      email,
      firstName,
      lastName,
      babyMaidenName,
    } = this.state;
    const coFirstNameRule =
      checkForRequired(registryInputs.registryInputMap.CoRegistrantFirstName) ||
      coFirstName.length > 0
        ? {
            rule: 'registrationFirstName',
            value: coFirstName,
          }
        : {};
    const babyMaidenNameRule =
      babyMaidenName.length > 0
        ? {
            rule: 'registrationFirstName',
            value: babyMaidenName,
          }
        : {};
    const colastNameRule =
      checkForRequired(registryInputs.registryInputMap.CoRegistrantLastName) ||
      coLastName.length > 0
        ? {
            rule: 'lastName',
            value: coLastName,
          }
        : {};
    const coEmailRule =
      checkForRequired(registryInputs.registryInputMap.CoRegistrantEmail) ||
      coEmail.length > 0
        ? {
            rule: 'coEmail',
            value: { coEmail, comapareEmail: email },
          }
        : {};
    const lastNameRule =
      lastName && lastName.length > 0
        ? {
            rule: 'lastName',
            value: lastName,
          }
        : {};
    return {
      email: {
        rule: 'signinEmail',
        value: email,
      },
      firstName: {
        rule: 'registrationFirstName',
        value: firstName,
      },
      lastName: lastNameRule,
      babyMaidenName: babyMaidenNameRule,
      coEmail: coEmailRule,
      coLastName: colastNameRule,
      coFirstName: coFirstNameRule,
    };
  }
  /* baby optional info vaildation */
  optionalInfoValidation() {
    const { coFirstName, coLastName, coEmail, email } = this.state;
    const coFirstNameRule =
      coFirstName.length > 0
        ? {
            rule: 'registrationFirstName',
            value: coFirstName,
          }
        : {};
    const colastNameRule =
      coLastName.length > 0
        ? {
            rule: 'lastName',
            value: coLastName,
          }
        : {};
    const coEmailRule =
      coEmail.length > 0
        ? {
            rule: 'coEmail',
            value: { coEmail, comapareEmail: email },
          }
        : {};
    return {
      email: {
        rule: 'signinEmail',
        value: email,
      },
      coEmail: coEmailRule,
      coLastName: colastNameRule,
      coFirstName: coFirstNameRule,
    };
  }
  /** event info validation
   * @param {object} registryInputs
   */
  eventInfoValidation(registryInputs) {
    const { guests, college } = this.state;
    const guestsRule =
      checkForRequired(registryInputs.registryInputMap.numberOfGuests) ||
      parseInt(guests, 10) > 0
        ? {
            rule: 'guestNumber',
            value: guests,
          }
        : {};
    const collegeRule =
      checkForRequired(registryInputs.registryInputMap.college) ||
      college.length > 0
        ? {
            rule: 'college',
            value: college,
          }
        : {};
    return {
      guests: guestsRule,
      college: collegeRule,
    };
  }
  /** contactInfoValidation
   * @param {object} registryInputs
   */
  contactInfoValidation(registryInputs) {
    const { primaryPh, mobilePh, street, apartment } = this.state;
    const eventType = registryInputs.eventType;
    const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
    const isBabyRegistry = eventType === eventTypeConst.BABY;
    const mobilePhRule =
      registryInputs.registryInputMap.MobileNumber &&
      (checkForRequired(registryInputs.registryInputMap.MobileNumber) ||
        (mobilePh && mobilePh.length > 0)) &&
      !isWeddingRegistry &&
      !isBabyRegistry
        ? {
            rule: 'mobilePhRegistry',
            value: mobilePh,
          }
        : {};
    const primaryPhRule =
      registryInputs.registryInputMap.PhoneNumber &&
      (checkForRequired(registryInputs.registryInputMap.PhoneNumber) ||
        (primaryPh && primaryPh.length > 0))
        ? {
            rule: 'mobilePhRegistry',
            value: primaryPh,
          }
        : {};
    const streetRule =
      checkForRequired(registryInputs.registryInputMap.showContactAddress) ||
      street.length > 0
        ? {
            rule: 'required',
            value: street,
            depends: this.addressValidation(),
            dependsMessage: ENTER_VALID_ADDRESS_LBL,
          }
        : {};
    const apartmentRule =
      street.length > 0
        ? {
            rule: 'apartment',
            value: apartment,
          }
        : {};
    const addressValidation = checkForRequired(
      registryInputs.registryInputMap.showContactAddress
    )
      ? this.addressValidation()
      : {};
    return {
      mobilePh: mobilePhRule,
      primaryPh: primaryPhRule,
      street: streetRule,
      apartment: apartmentRule,
      ...addressValidation,
    };
  }
  /** addressValidation
   */
  zipRuleByRegion() {
    return isBedBathCanada() ? 'postalCodeCA' : 'zip';
  }
  stateRuleByRegion() {
    const caShipRestEnabled = pathOr(
      false,
      CA_SHIP_RESTRICTION,
      this.props.globalSwitchConfig
    );
    return caShipRestEnabled && isBedBathCanada() ? 'qcState' : 'required';
  }
  addressValidation() {
    const { addressOne, city, state, zip } = this.state;
    const addressOneRule = {
      rule: 'required',
      value: addressOne,
    };
    const cityRule = {
      rule: 'city',
      value: city,
    };
    const stateRule = {
      rule: this.stateRuleByRegion(),
      value: state,
    };
    const zipRule = {
      rule: this.zipRuleByRegion(),
      value: zip,
    };
    return {
      addressOne: addressOneRule,
      city: cityRule,
      state: stateRule,
      zip: zipRule,
    };
  }
  /** Toggle the state of registry type model,
   * @param {boolean} value [new value for modal state] */
  toggleRegistryModalState(value) {
    this.setState({ isRegistryTypeOpen: !!value });
  }
  submitData() {
    this.primaryRegistrantEmailForShallowUser = this.state.email;
    const {
      location,
      thersholdDayForOldRegistry,
      labels,
      formWrapperDataRegisterOrLogin,
      registryInputs,
    } = this.props;
    const password =
      formWrapperDataRegisterOrLogin && formWrapperDataRegisterOrLogin.password
        ? formWrapperDataRegisterOrLogin.password
        : {}; // Submit data when prop validation is cleared
    const formData = submitRegistryData(this.state, this.props, password.value);
    const queryParams = window.location.search;
    formData.thirdPartyParams =
      queryParams.indexOf('&') === -1
        ? false
        : queryParams.substring(queryParams.indexOf('&') + 1);
    formData.pathname = location.pathname;
    if (isEmpty(password.passwordError)) {
      const registryType = pathOr('', 'eventType', registryInputs);
      const isBabySite =
        getSiteId().includes('BuyBuyBaby') && registryType === 'Baby';
      const enableCSLabels = pathOr(
        false,
        'enableCSLabels',
        this.props.globalSwitchConfig
      );
      const labelObj = enableCSLabels ? labels : labels.createRegistry;
      if (this.props.enableRegistryQuiz && isBabySite)
        this.getContentStackData();
      this.props.createRegistry(formData, thersholdDayForOldRegistry, labelObj);
    }
    return null;
  }
  /** Listen to profile status change if changed than open ProfileModal
   * @param {*} args */
  listenProfileStatusChange(...args) {
    this.setState({ isProfileStatusFlag: true });
    this.props.resetProfileStatus();
    /* eslint-disable */
    const regEx = /^([a-zA-Z0-9_\-\.\+\%\&]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25}(;[ ]{0,1}([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})*$/;
    /* eslint-enable */
    const email = this.state.email;
    if (email !== '' && email.match(regEx))
      this.props.checkProfileStatus(...args);
  }
  closeProfileExtendModal() {
    this.setState({ email: '' });
    this.toggleProfileExtendModalState(false);
    this.props.resetProfileStatus();
  }
  toggleProfileExtendModalState(value) {
    this.setState(() => ({
      isProfileExtendModalOpen: value,
    }));
    if (!value) {
      this.setState({
        hideAccountDetectedModal: false,
      });
    }
  }
  handleProfileExtendClick(
    email,
    password,
    optForEmails,
    triggerFromExtendedAccount,
    deviceAutoLogin
  ) {
    this.optForEmails = optForEmails;
    this.props.onExtendProfileSubmitClick({
      email,
      password,
      optForEmails,
      triggerFromExtendedAccount,
      deviceAutoLogin,
    });
  }
  /** Show shipping info
   * @param {object} event */
  showShippingInfo(e) {
    e.preventDefault();
    this.setState({ showShippingInfo: true });
  }
  /** Hide shipping info
   * @param {object} event
   */
  hideShippingInfo(e) {
    e.preventDefault();
    this.setState({
      showShippingInfo: false,
      shippingStreet: this.state.street,
      shippingStreetError: this.state.streetError,
      shippingAddressOne: this.state.addressOne,
      shippingAddressTwo: this.state.addressTwo,
      shippingCity: this.state.city,
      shippingState: this.state.state,
      shippingZip: this.state.zip,
      shippingApartment: this.state.apartment,
    });
  }
  /** Show Move in info
   * @param {object} event */
  showMoveInfo(e) {
    e.preventDefault();
    this.setState({ showMoveInInfo: true });
  }
  updateFormField(
    identifier,
    name,
    rule,
    value,
    required,
    isChangedOnce,
    errorMsg
  ) {
    if (this.props.addFormField) {
      const object = {
        identifier,
        data: {
          name,
          rule,
          value,
          required,
          isChangedOnce,
          [`${name}Error`]: errorMsg,
        },
      };
      this.props.addFormField(object);
    }
  }
  clearConfirmPasswordField(nextProps) {
    const emailFromProps =
      this.props.profileData && this.props.profileData.email;
    const emailFromNextProps =
      nextProps.profileData && nextProps.profileData.email;
    if (emailFromProps !== emailFromNextProps) {
      this.updateFormField(
        this.props.formWrapperIdentifierRegisterOrLogin,
        'confirmPassword',
        '',
        '',
        false,
        '',
        ''
      );
    }
  }
  /**
   * @method - handleKeepSignedIn set checkbox selected value in state
   * @param {string} selected check box is selected or not
   */
  handleKeepSignedIn = selected => {
    this.setState(() => ({
      deviceAutoLogin: selected,
    }));
  };
  /** Hide shipping info
   * @param {object} event */
  hideMoveInfo(e) {
    e.preventDefault();
    this.setState({
      showMoveInInfo: false,
      moveInStreetError: '',
      futureShippingDateError: '',
    });
  }
  renderProfileExtendModal = () => {
    const { isProfileExtendModalOpen, email } = this.state;
    const {
      labels,
      referredContent,
      personalisedLables,
      extendAccountError,
      formWrapperData,
      formWrapperIdentifier,
      deviceConfig,
      reCaptchaActivationCount,
    } = this.props;
    const enableCSLabels = pathOr(
      false,
      'enableCSLabels',
      this.props.globalSwitchConfig
    );
    return (
      <ProfileExtendModal
        labels={labels}
        personalisedLables={personalisedLables}
        email={email}
        referredContent={referredContent.content}
        isModalOpen={isProfileExtendModalOpen}
        toggleModalState={this.toggleProfileExtendModalState}
        onSubmit={this.handleProfileExtendClick}
        closeModal={this.closeProfileExtendModal}
        errorInfo={extendAccountError}
        uniqueId={`RegistryForm`}
        formWrapperData={formWrapperData}
        formWrapperIdentifier={formWrapperIdentifier}
        deviceConfig={deviceConfig}
        reCaptchaActivationCount={reCaptchaActivationCount}
        hideAccountDetectedModal={this.state.hideAccountDetectedModal}
        deviceAutoLogin={this.state.deviceAutoLogin}
        handleKeepSignedIn={this.handleKeepSignedIn}
        fireTealiumAction={this.props.fireTealiumAction}
        enableCSLabels={enableCSLabels}
      />
    );
  };
  /* Render html layout for registry form */
  render() {
    const {
      labels,
      isFetching,
      registryInputs,
      isLoggedIn,
      formWrapperDataRegisterOrLogin,
      formWrapperIdentifierRegisterOrLogin,
      createRegistryModalPopUp,
      reCaptchaActivationCount,
      pageConfigGlobal,
      isEmailVerRequired,
      formWrapperData,
      deviceVerificationData,
      deviceVerificationError,
      changePhoneNo,
      phoneChangeState,
      signInClicked,
      verifyClicked,
      verifyPhoneState,
    } = this.props;
    const {
      isRegistryTypeOpen,
      isProfileExtendModalOpen,
      currentAddress,
      profileAddress,
    } = this.state;
    //  Unverified user profile
    if (isEmailVerRequired) {
      return (
        <Redirect
          to={{
            pathname: ROUTE_SHALLOW_PROFILE_REGISTRATION,
            state: {
              emailId: this.state.email
                ? this.state.email
                : this.primaryRegistrantEmailForShallowUser,
              isLifeStage: true,
            },
          }}
        />
      );
    }
    /* eslint-disable no-underscore-dangle */
    const createRegistryLabels = labels ? labels.createRegistry : {};
    if (this.props.isNewCreateRegForm) {
      return (
        <ErrorBoundary>
          <div
            className={classnames(
              styles.mainContainer,
              !this.props.isMobile && styles.bgColor
            )}
          >
            <RenderCreateRegistryFormV2
              stateObj={this.state}
              signUpFromRegistry={this.signUpFromRegistry}
              updateState={this.updateState}
              currentEventCode={this.state.eventCode}
              checkFormSubmit={this.checkFormSubmit}
              dataLocator={REGISTRY_FORM_DATA_LOCATOR}
              onSelectSubscribe={this.onSelectSubscribe}
              formWrapperDataRegisterOrLogin={formWrapperDataRegisterOrLogin}
              formWrapperIdentifierRegisterOrLogin={
                formWrapperIdentifierRegisterOrLogin
              }
              changePhoneNo={changePhoneNo}
              phoneChangeState={phoneChangeState}
              signInClicked={signInClicked}
              verifyClicked={verifyClicked}
              verifyPhoneState={verifyPhoneState}
              {...this.props}
            />
          </div>
        </ErrorBoundary>
      );
    }
    if (
      !this.props.isNewCreateRegForm &&
      !isFetching &&
      !isEmpty(registryInputs)
    ) {
      return (
        <ErrorBoundary>
          <ShowOnTbs>
            <AssociateSignIn />
          </ShowOnTbs>
          <RegistryBanner
            createRegistryModalPopUp={createRegistryModalPopUp}
            eventType={registryInputs.eventType}
            eventCode={registryInputs.eventCode}
            labels={createRegistryLabels}
            toggleRegistryModalState={this.toggleRegistryModalState}
            isLoggedIn={isLoggedIn}
            isBabyRegistry={this.props.isBabyRegistry}
            enableNewSignUp={this.props.enableNewSignUp}
            isCABabyRegistry={this.props.isCABabyRegistry}
          />
          <div className={styles.formContainer}>
            <RenderCreateRegistryForm
              stateObj={this.state}
              listenProfileStatusChange={this.listenProfileStatusChange}
              updateState={this.updateState}
              passwordErrorPresent={this.passwordErrorPresent}
              updatePasswordData={this.updatePasswordData}
              onSelectSubscribe={this.onSelectSubscribe}
              handleSignSisterSite={this.handleSignSisterSite}
              onSelectThirdPartyOption={this.onSelectThirdPartyOption}
              showShippingInfo={this.showShippingInfo}
              hideShippingInfo={this.hideShippingInfo}
              showMoveInfo={this.showMoveInfo}
              hideMoveInfo={this.hideMoveInfo}
              checkFormSubmit={this.checkFormSubmit}
              dataLocator={REGISTRY_FORM_DATA_LOCATOR}
              currentAddress={currentAddress}
              profileAddress={profileAddress}
              reCaptchaActivationCount={reCaptchaActivationCount}
              isModalOpen={isProfileExtendModalOpen}
              pageConfigGlobal={pageConfigGlobal}
              flagOptional={this.flagOptional}
              onSelectRBYROption={this.onSelectRBYROption}
              isRegistryRBYRSelected={this.state.isRegistryRBYRSelected}
              resetProfileHardLockedState={this.setHardLockState}
              formWrapperDataRegisterOrLogin={formWrapperDataRegisterOrLogin}
              formWrapperIdentifierRegisterOrLogin={
                formWrapperIdentifierRegisterOrLogin
              }
              isBabyRegistry={this.props.isBabyRegistry}
              isCABabyRegistry={this.props.isCABabyRegistry}
              {...this.props}
            />
          </div>
          {isRegistryTypeOpen && (
            <RegistryTypeModalWrapper
              isRegistryTypeOpen={isRegistryTypeOpen}
              toggleRegistryModalState={this.toggleRegistryModalState}
              labels={createRegistryLabels}
              location={this.props.location}
              changeRegistryType={this.onModalSelectionChange}
            />
          )}
          {isProfileExtendModalOpen && this.renderProfileExtendModal()}
          <RegistryDeviceVerification
            isExtendAccount={isProfileExtendModalOpen}
            formWrapperData={formWrapperData}
            onClose={() => {
              this.toggleProfileExtendModalState(false);
            }}
            deviceVerificationData={deviceVerificationData}
            deviceVerificationError={deviceVerificationError}
            email={this.state.email}
            onModalOpen={() => {
              // Hide Extend Modal via CSS if verification Modal has opened
              if (pathOr('', 'password.value', formWrapperData)) {
                // If extend Modal is closed, do not add the class
                this.setState({
                  hideAccountDetectedModal: true,
                });
              }
            }}
            optForEmails={this.optForEmails}
            deviceAutoLogin={this.state.deviceAutoLogin}
          />
        </ErrorBoundary>
      );
    }
    return <Skeleton />;
  }
}
CreateRegistryComponent.propTypes = propTypes;
CreateRegistryComponent.defaultProps = defaultProps;
export default CreateRegistryComponent;
