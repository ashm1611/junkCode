import pathOr from 'lodash/fp/pathOr';
import { addYear, isBedBathCanada } from '@bbb-app/utils/common';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import unMaskPhoneField from '@bbb-app/utils/unMaskPhoneField';
import getEncodedValue from '@bbb-app/utils/getEncodedValue';
import { CA_SHIP_RESTRICTION } from '@bbb-app/constants/QasValidation';
import isRBYRRegistry from '../utils/isRBYRRegistry';
import {
  ENTER_VALID_ADDRESS_LBL,
  BABY_GENDER_ERROR_MESSAGE_LBL,
} from './constants';

export const checkForDisplay = field => {
  return field && field.displayOnForm ? field.displayOnForm : false;
};

export const checkForRequired = field => {
  return field && field.requiredInputCreate ? field.requiredInputCreate : false;
};

export const eventTypeConst = {
  WEDDING: 'Wedding',
  BABY: 'Baby',
  COLLEGE: 'College/University',
  HOUSEWARMING: 'Housewarming',
  COMMITMENT: 'Commitment Ceremony',
  UNIVERSITY: 'University',
};

export const MOBILE = 'mobile';

export const createRegistryDefaultState = {
  coRegProfileStatus: 'false',
  thirdPartySelected: false,
  subscribeSelected: true,
  emailOptInSharedSite1: true,
  emailOptInSharedSite2: true,
  checkBoxSet: false,
  firstName: '',
  babyMaidenName: '',
  babyMaidenNameError: '',
  babyNurseryTheme: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  email: '',
  emailError: '',
  gender: '',
  babyMultiplesCount: 1,
  babyMultiplesRevealGender: false,
  babyGender: 'S',
  coFirstName: '',
  coFirstNameError: '',
  coRegistrantName: '',
  coRegistrantNameError: '',
  coLastName: '',
  coLastNameError: '',
  coEmail: '',
  coEmailError: '',
  coGender: '',
  eventDate: '',
  showerDate: '',
  eventDateError: '',
  babyExpectedArivalDate: '',
  babyExpectedArivalDateError: '',
  guestsError: '',
  primaryPh: '',
  primaryPhError: '',
  mobilePh: '',
  mobilePhError: '',
  street: '',
  streetError: '',
  apartment: '',
  apartmentError: '',
  zip: '',
  zipError: '',
  password: '',
  passwordError: true,
  confirmPassword: '',
  confirmPasswordError: true,
  addressOne: '',
  addressOneError: '',
  addressTwo: '',
  addressTwoError: '',
  city: '',
  cityError: '',
  state: '',
  stateError: '',
  showerDateError: '',
  showMoveInInfo: false,
  showShippingInfo: false,
  shippingPhone: '',
  shippingPhoneError: '',
  shippingStreet: '',
  shippingStreetError: '',
  shippingApartment: '',
  shippingApartmentError: '',
  shippingAddressOne: '',
  shippingCity: '',
  shippingCityError: '',
  shippingState: '',
  shippingStateError: '',
  shippingZip: '',
  shippingZipError: '',
  moveInStreet: '',
  moveInStreetError: '',
  moveInApartment: '',
  moveInApartmentError: '',
  futureShippingDate: '',
  emailInfo: '',
  isProfileExist: false,
  favStoreid: '',
  favStoreidError: '', // this needs to be removed once storeInfo implementation done
  qasContactValidated: false,
  qasShippingValidated: false,
  qasMovingValidated: false,
  prefStoreNum: '',
  currentAddress: '',
  profileAddress: '',
  isShippingAddressChanged: false,
  isContactAddressChanged: false,
  college: '',
  collegeError: '',
  showVerMsg: false,
};

export const genderConst = {
  BRIDE: 'B',
  GROOM: 'G',
  BOY: 'B',
  GIRL: 'G',
  SURPRISE: 'S',
  TWINS: 'T',
};

export const initialGenderDecorObj = {
  genderBaby1: genderConst.SURPRISE,
  genderBaby2: genderConst.SURPRISE,
  genderBaby3: genderConst.SURPRISE,
  genderBaby1Error: '',
  genderBaby2Error: '',
  genderBaby3Error: '',
  decorBaby1: '',
  decorBaby2: '',
  decorBaby3: '',
};

export const BABY_GENDER_COUNT_DELIMETER = '||';
export const BABY_GENDER_AND_DECOR_DELIMETER = '~';

export const layoutConst = {
  ONE_BY_TWO: '1x2',
  TWO_BY_ONE: '2x1',
};

export const registrantTypeConst = {
  REGISTRANT: 'registrant',
  CO_REGISTRANT: 'co-registrant',
};

export const QUERY_STRING = '?regType=';

export const profileStatusConstant = {
  EXISTS: 'true',
  NON_SISTER: 'nonSister',
};

export const referredContentKeys = {
  ALREADY_EXISTS: 'coRegistrantProfileExist',
  NON_SISTER: 'coRegistrantExtendedProfile',
  NOT_EXISTS: 'coRegistrantProfileNotFound',
};

export const replacePlaceholderValues = (str, placeholderValues) => {
  let labelStrNew = str;
  for (let x = 0; x < placeholderValues.length; x += 1) {
    const placeholder = `{${x}}`;
    if (labelStrNew.indexOf(placeholder) !== -1) {
      labelStrNew = labelStrNew.replace(placeholder, placeholderValues[x]);
    }
  }
  return labelStrNew;
};

export const getformattedStreet = (addressOne, city, state, zip) => {
  const addressArr = [];
  if (addressOne) {
    addressArr.push(addressOne);
  }
  if (city) {
    addressArr.push(city);
  }
  if (state) {
    addressArr.push(state);
  }
  if (zip) {
    addressArr.push(zip);
  }
  return addressArr.join(', ');
};

const getMoveInInfo = regState => {
  if (regState.showMoveInInfo) {
    return regState;
  }
  return {
    moveInAddressOne: '',
    moveInAddressTwo: '',
    moveInCity: '',
    moveInCountry: '',
    moveInState: '',
    qasMovingValidated: false,
    moveInZip: '',
    futureShippingDate: '',
  };
};

/**
 * Submit data when prop validation is cleared
 */
export const submitRegistryData = (regState, props, password) => {
  const {
    firstName,
    lastName,
    coFirstName,
    coLastName,
    eventDate,
    thirdPartySelected,
    subscribeSelected,
    showerDate,
    babyNurseryTheme,
    babyMaidenName,
    coRegProfileStatus,
    qasContactValidated,
    qasShippingValidated,
    emailOptInSharedSite1,
    emailOptInSharedSite2,
  } = regState;
  const { isLoggedIn, getCurrentRegistryType, labels } = props;
  const moveInInfo = getMoveInInfo(regState);
  const mobilePhValue = unMaskPhoneField(regState.mobilePh);
  const primaryPhValue = unMaskPhoneField(regState.primaryPh);
  const passwordValue = isLoggedIn && !regState.isRecognized ? '' : password;
  const networkAffiliation = thirdPartySelected ? 'Y' : 'N';
  const isMaskedEmail = isUserRecognized();

  const formaData = {
    'registryVO.coRegistrant.firstName': coFirstName,
    registryEventType: props.registryInputs.eventCode,
    'registryVO.primaryRegistrant.cellPhone': mobilePhValue,
    'registryVO.primaryRegistrant.firstName': firstName,
    'registryVO.primaryRegistrant.lastName': lastName,
    'registryVO.primaryRegistrant.babyMaidenName': babyMaidenName,
    'registryVO.primaryRegistrant.contactAddress.firstName': firstName,
    'registryVO.primaryRegistrant.contactAddress.lastName': lastName,
    'registryVO.primaryRegistrant.primaryPhone': primaryPhValue,
    'value.mobileNumber': primaryPhValue,
    'registryVO.refStoreContactMethod': ' ', // Should be Blank as not used
    'registryVO.registryType.registryTypeName': props.registryInputs.eventType,
    createSimplified: true,
    'registryVO.prefStoreNum': regState.prefStoreNum, // TODO integrate when store and guide is implemented
    'registryVO.primaryRegistrant.contactAddress.addressLine1':
      regState.addressOne,
    'registryVO.primaryRegistrant.contactAddress.addressLine2':
      regState.apartment,
    'registryVO.primaryRegistrant.contactAddress.city': regState.city,
    'registryVO.primaryRegistrant.contactAddress.state': regState.state,
    'registryVO.primaryRegistrant.contactAddress.zip': regState.zip,
    'registryVO.primaryRegistrant.contactAddress.qasValidated': qasContactValidated,
    'registryVO.shipping.shippingAddress.addressLine1':
      regState.shippingAddressOne,
    'registryVO.shipping.shippingAddress.addressLine2':
      regState.shippingApartment,
    'registryVO.shipping.shippingAddress.city': regState.shippingCity,
    'registryVO.shipping.shippingAddress.firstName': firstName,
    'registryVO.shipping.shippingAddress.lastName': lastName,
    'registryVO.shipping.shippingAddress.state': regState.shippingState,
    'registryVO.shipping.shippingAddress.country': regState.shippingCountry,
    'registryVO.shipping.shippingAddress.qasValidated': qasShippingValidated,
    regContactAddress: regState.isContactAddressChanged
      ? 'newPrimaryRegAddress'
      : '',
    shippingAddress: regState.showShippingInfo
      ? 'newShippingAddress'
      : 'shipAdrressSameAsRegistrant',
    futureShippingAddress:
      regState.showMoveInInfo && 'newFutureShippingAddress',
    'registryVO.shipping.shippingAddress.zip': regState.shippingZip,
    'registryVO.shipping.futureShippingAddress.addressLine1':
      moveInInfo.moveInAddressOne,
    'registryVO.shipping.futureShippingAddress.addressLine2':
      moveInInfo.moveInApartment,
    'registryVO.shipping.futureShippingAddress.city': moveInInfo.moveInCity,
    'registryVO.shipping.futureShippingAddress.firstName': firstName,
    'registryVO.shipping.futureShippingAddress.lastName': lastName,
    'registryVO.shipping.futureShippingAddress.state': moveInInfo.moveInState,
    'registryVO.shipping.futureShippingAddress.country':
      moveInInfo.moveInCountry,
    'registryVO.shipping.futureShippingAddress.qasValidated':
      moveInInfo.qasMovingValidated,
    'registryVO.shipping.futureShippingAddress.zip': moveInInfo.moveInZip,
    'registryVO.shipping.futureShippingDate': moveInInfo.futureShippingDate,
    futureShippingDateSelected: regState.showMoveInInfo,
    'registryVO.coRegistrant.email': getEncodedValue(regState.coEmail),
    'registryVO.primaryRegistrant.email': isMaskedEmail
      ? null
      : getEncodedValue(regState.email),
    'registryVO.networkAffiliation': networkAffiliation,
    'registryVO.event.guestCount': regState.guests,
    'registryVO.event.college': regState.college,
    'registryVO.event.babyGender': regState.babyGender,
    'registryVO.coRegistrant.lastName': coLastName,
    'registryVO.event.eventDate': eventDate,
    'registryVO.event.showerDate': showerDate,
    'registryVO.regBG': regState.gender,
    'registryVO.coRegBG': regState.coGender,
    'registryVO.event.babyNurseryTheme': babyNurseryTheme,
    'registryVO.optInWeddingOrBump': '', // TODO integrate when OptIn will be implemented
    coRegEmailFoundPopupStatus:
      coRegProfileStatus === 'true' ? 'true' : 'false',
    coRegEmailNotFoundPopupStatus:
      coRegProfileStatus === 'true' ? 'false' : 'true',
    password: passwordValue,
    emailOptIn: subscribeSelected,
    emailOptInSharedSite1,
    emailOptInSharedSite2,
  };
  const enableRBYRFeature = pathOr(
    false,
    'globalSwitchConfig.enableRBYRFeature',
    props
  );
  const isRegistryIncludedRBYR = isRBYRRegistry(
    labels,
    getCurrentRegistryType ? getCurrentRegistryType(location) : ''
  );
  if (enableRBYRFeature && isRegistryIncludedRBYR) {
    formaData.storedValueOptIn = !!regState.isRegistryRBYRSelected;
    /* istanbul ignore next */
    if (
      typeof window === 'object' &&
      window.document &&
      window.document.querySelector
    ) {
      formaData.rbyrCheckbox = !!document.querySelector(
        'input[data-locator="registry-rbyr-checkbox"]'
      );
    }
  }
  return formaData;
};

export const BBB_SITE_NAME = 'Bed Bath & Beyond';
export const BBBY_SITE_NAME = 'Buy Buy Baby';
export const DATE_FORMAT = 'mm/dd/yyyy';
export const DATE_FORMAT_CA = 'dd/mm/yyyy';
export const PAST_YEAR_TO_DISPLAY = 0;
export const FUTURE_YEAR_TO_DISPLAY = 5;

export const FUTURE_SHIPPING_PAST_YEAR = 0;
export const FUTURE_SHIPPING_FUTURE_YEAR = 5;

export const contactAddressDataLocators = {
  STREET: 'registry-contactInfoStreet',
  ADDRESS1: 'registry-contactInfoAddress1',
  ADDRESS2: 'registry-contactInfoAddress2',
  ZIP: 'registry-contactInfoZip',
  CITY: 'registry-contactInfoCity',
  STATE: 'registry-contactInfoState',
};

export const shippingAddressDataLocators = {
  STREET: 'registry-shippingInfoStreet',
  ADDRESS1: 'registry-shippingInfoAddress1',
  ADDRESS2: 'registry-shippingInfoAddress2',
  ZIP: 'registry-shippingInfoZip',
  CITY: 'registry-shippingInfoCity',
  STATE: 'registry-shippingInfoState',
};

export const moveInAddressDataLocators = {
  STREET: 'registry-moveInInfoStreet',
  ADDRESS1: 'registry-moveInInfoAddress1',
  ADDRESS2: 'registry-moveInInfoAddress2',
  ZIP: 'registry-moveInInfoZip',
  CITY: 'registry-moveInInfoCity',
  STATE: 'registry-moveInInfoState',
};

/**
 * Shipping validation
 * @param {object} registryInputs
 * @param {object} tempState
 */
export const getShippingValidation = (
  registryInputs,
  tempState,
  globalSwitchConfig
) => {
  const {
    shippingAddressOne,
    showShippingInfo,
    shippingCity,
    shippingStreet,
  } = tempState;
  if (showShippingInfo) {
    const shippingValidationRule = shippingValidation(
      registryInputs,
      tempState,
      globalSwitchConfig
    );
    const shippingAddressOneRule =
      checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
      shippingAddressOne.length
        ? {
            rule: 'required',
            value: shippingAddressOne,
          }
        : {};
    const shippingCityRule =
      checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
      shippingCity.length
        ? {
            rule: 'city',
            value: shippingCity,
          }
        : {};
    const shippingStreetRule =
      checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
      shippingStreet.length > 0
        ? {
            rule: 'required',
            value: shippingStreet,
            depends: {
              shippingAddressOne: shippingAddressOneRule,
              shippingCity: shippingCityRule,
              ...shippingValidationRule,
            },
            dependsMessage: ENTER_VALID_ADDRESS_LBL,
          }
        : {};
    return {
      shippingStreet: shippingStreetRule,
      shippingAddressOne: shippingAddressOneRule,
      shippingCity: shippingCityRule,
      ...shippingValidationRule,
    };
  }
  return {};
};

/**
 * Reamining Shipping validation
 * @param {object} registryInputs
 * @param {object} tempState
 */
const zipRuleByRegion = () => {
  return isBedBathCanada() ? 'postalCodeCA' : 'zip';
};
const stateRuleByRegion = globalSwitchConfig => {
  const caShipRestEnabled = pathOr(
    false,
    CA_SHIP_RESTRICTION,
    globalSwitchConfig
  );
  return caShipRestEnabled && isBedBathCanada() ? 'qcState' : 'required';
};
export const shippingValidation = (
  registryInputs,
  tempState,
  globalSwitchConfig
) => {
  const { shippingCity, shippingState, shippingZip } = tempState;
  const shippingStateRule =
    checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
    shippingCity.length
      ? {
          rule: stateRuleByRegion(globalSwitchConfig),
          value: shippingState,
        }
      : {};
  const shippingZipRule =
    checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
    shippingCity.length
      ? {
          rule: zipRuleByRegion(),
          value: shippingZip,
        }
      : {};
  return {
    shippingState: shippingStateRule,
    shippingZip: shippingZipRule,
  };
};

/**
 * Move in validation
 * @param {object} registryInputs
 * @param {object} tempState
 */
const shippingDateRule = () => {
  return isBedBathCanada() ? 'futureShippingDateCA' : 'futureShippingDate';
};
export const getMoveInValidation = (
  registryInputs,
  tempState,
  globalSwitchConfig
) => {
  const {
    showMoveInInfo,
    moveInAddressOne,
    moveInCity,
    moveInStreet,
    futureShippingDate,
  } = tempState;
  if (showMoveInInfo) {
    const moveinValidationRule = moveinValidation(
      registryInputs,
      tempState,
      globalSwitchConfig
    );
    const moveInAddressOneRule =
      checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
      moveInAddressOne.length
        ? {
            rule: 'apartment',
            value: moveInAddressOne,
          }
        : {};
    const moveInCityRule =
      checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
      moveInAddressOne.length
        ? {
            rule: 'city',
            value: moveInCity,
          }
        : {};
    const moveInStreetRule =
      checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
      moveInStreet.length > 0
        ? {
            rule: 'required',
            value: moveInStreet,
            depends: {
              moveInAddressOne: moveInAddressOneRule,
              moveInCity: moveInCityRule,
              ...moveinValidationRule,
            },
            dependsMessage: ENTER_VALID_ADDRESS_LBL,
          }
        : {};
    const futureShippingDateRule = {
      rule: shippingDateRule(),
      value: futureShippingDate,
    };
    return {
      moveInStreet: moveInStreetRule,
      moveInAddressOne: moveInAddressOneRule,
      moveInCity: moveInCityRule,
      futureShippingDate: futureShippingDateRule,
      ...moveinValidationRule,
    };
  }
  return {};
};
/**
 * Remaining Move In validation
 * @param {object} registryInputs
 * @param {object} tempState
 */

export const moveinValidation = (
  registryInputs,
  tempState,
  globalSwitchConfig
) => {
  const { moveInAddressOne, moveInState, moveInZip } = tempState;
  const moveInStateRule =
    checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
    moveInAddressOne.length
      ? {
          rule: stateRuleByRegion(globalSwitchConfig),
          value: moveInState,
        }
      : {};
  const moveInZipRule =
    checkForRequired(registryInputs.registryInputMap.showShippingAddress) ||
    moveInAddressOne.length
      ? {
          rule: zipRuleByRegion(),
          value: moveInZip,
        }
      : {};
  return {
    moveInState: moveInStateRule,
    moveInZip: moveInZipRule,
  };
};

export const validateBabyMultiples = (eventType, stateObj) => {
  const errorObj = {};

  if (eventType !== eventTypeConst.BABY) {
    return errorObj;
  }

  const {
    babyMultiplesCount,
    babyMultiplesRevealGender,
    babyGender,
  } = stateObj;
  if (babyMultiplesRevealGender) {
    const babyGenderArr = babyGender.split(BABY_GENDER_COUNT_DELIMETER);
    let genderDecorArr;
    for (let i = 0; i < babyMultiplesCount; i += 1) {
      genderDecorArr = babyGenderArr[i].split(BABY_GENDER_AND_DECOR_DELIMETER);
      if (genderDecorArr[0] === genderConst.SURPRISE) {
        errorObj[`genderBaby${i + 1}Error`] = BABY_GENDER_ERROR_MESSAGE_LBL;
      }
    }
  }
  return errorObj;
};

// todo: get these from config.
export const fromShipDate = new Date();
export const toShipDate = addYear(new Date(), FUTURE_SHIPPING_FUTURE_YEAR);
export const fromEventDate = addYear(new Date(), -PAST_YEAR_TO_DISPLAY);
export const toEventDate = addYear(new Date(), FUTURE_YEAR_TO_DISPLAY);
