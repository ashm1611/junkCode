/* eslint max-lines: ["error", 1300]*/
import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import qs, { parse } from 'qs';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import isEqual from 'lodash/fp/isEqual';
import {
  makeSelectLabels,
  selectDeviceConfig,
  makeSelectPageConfig,
  makeSelectSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { isBedBathCanada } from '@bbb-app/utils/common';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import { getEnabledGlobalVendors } from '@bbb-app/selectors/pageSelectors';
import toJS from '@bbb-app/hoc/toJS';
import { emptyQasData } from '@bbb-app/qas-validation/containers/actions';
import {
  selectUserAddressData,
  selectQasData,
  selectQasIsFetching,
  selectQasValidationStatus,
  selectQasError,
} from '@bbb-app/qas-validation/containers/selectors';
import handlePhoneFieldState from '@bbb-app/utils/handlePhoneFieldState';
import {
  setUserAddress,
  fetchQas,
} from '@bbb-app/qas-validation/containers/commonActions';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import setFocus from '@bbb-app/utils/setFocus';
import { validateAll } from '@bbb-app/forms/validations/validator';
import consoleLog from '@bbb-app/utils/logger';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import formatRegionDate from '@bbb-app/utils/formatRegionDate';
import {
  makeSelectProfile,
  makeSelectCustomerId,
} from '@bbb-app/selectors/accountSelectors';
import {
  fetchOwnAndRecommendedRegistryDetails,
  fetchRegistriesDetails,
} from '@bbb-app/get-registry-details/containers/actions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { CA_SHIP_RESTRICTION } from '@bbb-app/constants/QasValidation';
import { fetchProfileData } from '@bbb-app/redux/profile-data/actions';
import { makeSelectAddress } from '@bbb-app/redux/profile-data/selectorAccountDashboardGlobal';
import { makeSelectIsPickupInStoreOpen } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/PickUpInStoreModalSelectors';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import styles from '../../../../components/Pages/Registry/EditRegistry/EditRegistry.css';
import formStyles from '../../../../components/Pages/Registry/CreateRegistry/CreateRegistryFormStyles.css';
import { EDIT_REGISTRY_DETAILS_STATE_KEY, QUERY_PARAM_SORT } from './constants';
import { initialState } from './initState';
import {
  registryInputFieldsOther,
  registryInputMap,
  submitRegistryData,
} from './EditRegistryConfig';
import {
  eventTypeConst,
  getformattedStreet,
  checkForRequired,
  checkForDisplay,
  validateBabyMultiples,
} from '../../../../components/Pages/Registry/CreateRegistry/CreateRegistryUtils';
import EditRegistryComponent from '../../../../components/Pages/Registry/EditRegistry/EditRegistryComponent';
import { getSiteSpectDateSort } from './../RegistryOwner/selectors';
import { getRegistryData } from './../RegistryOwner/commonSelectors';
import { removeFavoriteStoreId } from '../../../Pages/Registry/RegistryFavoriteStore/actions';
import {
  clearEditRegistryData,
  updateContactAddressModalVisibility,
  updateShippingAddressModalVisibility,
  updateMovingAddressModalVisibility,
  fetchEditRegistryData,
  updateTymTabClickStatus,
} from './actions';
import { fetchRegistryData } from '../RegistryOwner/RegistryDetailsSagaInjection';
import { fetchRegistryOwnerItemsFirstCategory } from '../RegistryOwner/RegistryOwnerItemSagaInjection';
import {
  makeSelectQASContactModalState,
  makeSelectQASShippingModalState,
  makeSelectQASMovingModalState,
  getFetchingEditRegistryDetailStatus,
  getTymTabClickStatus,
  selectEditRegistryData,
  getEditRegistryError,
  makeSelectCreateRegistryLabels,
} from './selectors';
import { propToState } from './EditRegistryUtils';
import isRBYRRegistry from '../../../../components/Pages/Registry/utils/isRBYRRegistry';
import { fireTealium, fireOptInTealium } from './EditRegistryTealium';
import {
  makeSelectCoRegistrantProfileStatus,
  makeSelectCoRegistrantProfileStatusError,
} from '../CreateRegistry/selectors';
import {
  fetchProfileStatus,
  resetProfileStatus,
} from './../CreateRegistry/actions';

import reducer from './reducer';
import saga from './sagas';
import registryInputReducer from '../CreateRegistry/reducer';
import RegistryTypesSagas from '../CreateRegistry/sagas';
import {
  REG_INPUTS_STATE_KEY,
  ENTER_VALID_ADDRESS_LBL,
} from '../CreateRegistry/constants';
import { editRegistryFromMoreInformationBtn } from '../RegistryOwner/actions';

const propToStateMap = propToState;
const defaultState = initialState;
export class EditRegistry extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditRegistryClick = this.handleEditRegistryClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.hideMoveInfo = this.hideMoveInfo.bind(this);
    this.showMoveInfo = this.showMoveInfo.bind(this);
    this.hideShippingInfo = this.hideShippingInfo.bind(this);
    this.showShippingInfo = this.showShippingInfo.bind(this);
    this.checkFormSubmit = this.checkFormSubmit.bind(this);
    this.errorValidationFields = this.errorValidationFields.bind(this);
    this.personalInfoValidation = this.personalInfoValidation.bind(this);
    this.eventInfoValidation = this.eventInfoValidation.bind(this);
    this.optionalInfoValidation = this.optionalInfoValidation.bind(this);
    this.contactInfoValidation = this.contactInfoValidation.bind(this);
    this.stateRuleByRegion = this.stateRuleByRegion.bind(this);
    this.dateValidation = this.dateValidation.bind(this);
    this.setEditRegistryFlag = this.setEditRegistryFlag.bind(this);
    this.submitData = this.submitData.bind(this);
    this.state = defaultState;
    this.coRegEmailFlag = this.coRegEmailFlag.bind(this);
    this.renderEditComponent = this.renderEditComponent.bind(this);
    this.getEditRegistryDataCalled = true; // true for not called
    /** to check the atDate flag for Automation testing on mobile device */
    this.atDateFlag = false;
    this.pastFutureDate = pathOr(
      '',
      'registryData.registryResVO.registrySummaryVO.futureShippingDate',
      this.props
    );
    this.actualEventDate = pathOr(
      '',
      'registryData.registryResVO.registrySummaryVO.eventDate',
      this.props
    );
    const storedValueOptIn = pathOr(
      false,
      'registryData.registryResVO.registrySummaryVO.storedValueOptIn',
      this.props
    );
    this.editStoredValueOptIn = storedValueOptIn;
    this.isRBYRRegistryEnabled = isRBYRRegistry(
      this.props.labels,
      pathOr(
        '',
        'registryData.registryResVO.registrySummaryVO.registryType.registryTypeName',
        this.props
      )
    );
    this.ggValueOptIn = pathOr(
      false,
      'registryData.registryResVO.registrySummaryVO.groupGiftOptIn',
      this.props
    );
    if (this.props.setIsChunkLoaded) this.props.setIsChunkLoaded(true);
  }
  componentDidMount() {
    if (this.props.isNewRegDashboard) {
      this.props.clearEditRegistryData();
      this.props.getEditRegistryData(this.props.registryID);
    }
    if (this.props.openEditRegistryModal) this.toggleModalState(true);
    const search = pathOr('', 'location.search', this.props);
    const query = parse(search, { ignoreQueryPrefix: true });
    this.atDateFlag = JSON.parse(pathOr(false, 'atDate', query));
    fireTealium(this.props.handleTealiumAction, this.props.registryData);
  }
  // eslint-disable-next-line complexity
  componentWillReceiveProps(nextProps) {
    const { registryDetails } = nextProps;
    let isShippingInfoVisible = false;
    let isMoveInInfoVisible = false;
    this.isRecognized = isUserRecognized();
    if (registryDetails) {
      const updatedState = this.mapUpdatedPropsToState(
        this.props,
        nextProps
      )(propToStateMap);
      const {
        addressOne,
        apartment,
        city,
        state,
        zip,
        ShippingaddressOne,
        shippingApartment,
        Shippingcity,
        Shippingstate,
        Shippingzip,
        Shippingphone,
        futureaddressOne,
        moveInApartment,
        futurestate,
        futurecity,
        futurezip,
        futuredate,
        thirdPartySelected,
        groupGiftOptIn,
      } = updatedState;
      if (groupGiftOptIn) {
        // it will handle the optin condition
        this.setState({ groupGiftInitialStateOptIn: true });
      }
      const shippingStreet = getformattedStreet(
        ShippingaddressOne,
        Shippingcity,
        Shippingstate,
        Shippingzip
      );
      const street = getformattedStreet(addressOne, city, state, zip);
      const moveInStreet = getformattedStreet(
        futureaddressOne,
        futurestate,
        futurecity,
        futurezip
      );
      if (street.trim() !== shippingStreet.trim()) {
        isShippingInfoVisible = true;
      }
      if (moveInStreet) {
        isMoveInInfoVisible = true;
      }
      const otherAddressFields = {
        shippingStreet,
        shippingAddressOne: ShippingaddressOne,
        shippingApartment,
        shippingCity: Shippingcity,
        shippingState: Shippingstate,
        shippingZip: Shippingzip,
        shippingPhone: Shippingphone,
        street,
        addressOne,
        apartment,
        city,
        state,
        zip,
        moveInStreet,
        moveInAddressOne: futureaddressOne,
        moveInAddressTwo: moveInApartment,
        moveInApartment,
        moveInCity: futurecity,
        moveInState: futurestate,
        moveInZip: futurezip,
        futureShippingDate: futuredate,
        showShippingInfo: isShippingInfoVisible,
        showMoveInInfo: isMoveInInfoVisible,
      };
      if (!isEmpty(updatedState)) {
        this.setState({ ...updatedState, ...otherAddressFields });
      }
      if (thirdPartySelected) {
        if (thirdPartySelected === 'Y') {
          this.setState({ thirdPartySelected: true });
        } else {
          this.setState({ thirdPartySelected: false });
        }
      }

      const { address1, postalCode } = otherAddressFields;
      const profileAddress = getformattedStreet(
        address1,
        city,
        state,
        postalCode
      );
      if (profileAddress !== this.state.profileAddress) {
        this.setState({ profileAddress });
      }
      if (this.state.isPublicSaved) {
        this.setState({
          isPublic: this.state.isPublicSaved,
          isPublicSaved: null,
        });
      }
    }
    if (
      this.props.signInDetails &&
      this.props.signInDetails.isLoggedIn &&
      !this.isRecognized &&
      !this.getEditRegistryDataCalled &&
      !this.props.isTymTabClicked
    ) {
      nextProps.getEditRegistryData(nextProps.registryID);
      this.setEditRegistryFlag(true);
    }
    if (nextProps.privPubToggleClicked) {
      if (this.state.isPublic) {
        this.setState({
          isPublic: this.state.isPublic === '1' ? '0' : '1',
          isToggleClicked: true,
        });
        this.props.setIsEditFetching(true);
      } else this.toggleModalState(true);
      this.props.setPrivPubToggleClicked(false);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props, nextProps) || !isEqual(this.state, nextState)) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.openEditRegistryModal !== this.props.openEditRegistryModal &&
      this.props.openEditRegistryModal &&
      !this.state.modalMountedState
    ) {
      this.toggleModalState(true);
    }
    if (
      this.state.isToggleClicked &&
      prevState.isPublic &&
      this.state.isPublic &&
      prevState.isPublic !== this.state.isPublic
    ) {
      this.checkFormSubmit(
        this.props.eventType,
        this.props.registryID,
        '',
        true
      );
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        isToggleClicked: false,
        isPublicSaved: this.state.isPublic,
      });
    }
  }
  componentWillUnmount() {
    this.props.updateTymTabClickStatus(false);
  }
  /**
   * change state on change of subscribe option
   * @param {bool} selected true/false
   */
  onSelectSubscribe = selected => {
    this.setState(() => ({
      subscribeSelected: selected,
    }));
  };
  /**
   * change state on change of third party checkbox
   * @param {bool} selected true/false
   */
  onSelectThirdPartyOption = selected => {
    this.setState(() => ({
      thirdPartySelected: selected,
    }));
  };
  /**
   * @param {bool} val checked value from RBYR form
   */
  onSelectRBYROption = selected => {
    this.setState(() => ({
      storedValueOptIn: selected,
    }));
  };

  /**
   * setEditRegistry state
   * @param {bool} flag
   */
  setEditRegistryFlag(flag) {
    this.getEditRegistryDataCalled = flag;
  }
  shippingValidation(registryInputs) {
    const { shippingState, shippingStreet } = this.state;
    const caShipRestEnabled = pathOr(
      false,
      CA_SHIP_RESTRICTION,
      this.props.enabledVendors
    );
    const showShipAddr = checkForRequired(registryInputs.showShippingAddress);
    if (caShipRestEnabled && isBedBathCanada()) {
      const shippingStateRule =
        showShipAddr || shippingStreet.length
          ? {
              rule: 'qcState',
              value: shippingState,
            }
          : {};
      return {
        shippingState: shippingStateRule,
      };
    }
    return {};
  }
  /**
   * @param {Object} currentProps [current props]
   * @param {Object} nextProps [next props]
   * @param {object} mapPropsToState [mapping object of props to state]
   */
  mapUpdatedPropsToState = (obj, nextObj) => {
    return mapPropsToState => {
      const updatedState = {};
      Object.keys(mapPropsToState)
        .reduce((difference, property) => {
          if (pathOr('', property, obj) !== pathOr('', property, nextObj)) {
            difference.push(property);
          }
          return difference;
        }, [])
        .forEach(element => {
          let value;
          if (pathOr(null, element, nextObj) === null) {
            value = '';
          } else {
            value = pathOr(null, element, nextObj);
          }
          updatedState[mapPropsToState[element]] = value;
        });
      return updatedState;
    };
  };
  showShippingInfo(e) {
    e.preventDefault();
    this.setState({ showShippingInfo: true });
  }
  hideShippingInfo(e) {
    e.preventDefault();
    this.setState({
      showShippingInfo: false,
      shippingStreet: '',
      shippingStreetError: '',
      shippingApartment: '',
      shippingApartmentError: '',
    });
  }
  showMoveInfo(e) {
    e.preventDefault();
    this.setState({ showMoveInInfo: true });
  }
  hideMoveInfo(e) {
    e.preventDefault();
    this.setState({
      showMoveInInfo: false,
      moveInStreet: '',
      moveInStreetError: '',
      moveInApartment: '',
      moveInApartmentError: '',
      futureShippingDate: '',
    });
  }
  errorValidationFields = (eventType, registryInputs) => {
    const personalValidation = this.personalInfoValidation(registryInputs);
    const eventValidation = this.eventInfoValidation(registryInputs);
    const babyOptionalValidation = this.optionalInfoValidation();
    const contactValidation = this.contactInfoValidation(
      registryInputs,
      eventType
    );
    const shippingValidation = this.shippingValidation(registryInputs);
    const dateValidation = this.dateValidation(registryInputs);
    const moveInValidation = this.moveInValidation(registryInputs);
    if (eventType === eventTypeConst.BABY) {
      return {
        ...personalValidation,
        ...eventValidation,
        ...contactValidation,
        ...babyOptionalValidation,
        ...shippingValidation,
        ...dateValidation,
        ...moveInValidation,
      };
    }
    return {
      ...personalValidation,
      ...eventValidation,
      ...contactValidation,
      ...shippingValidation,
      ...dateValidation,
      ...moveInValidation,
    };
  };
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
      checkForRequired(registryInputs.CoRegistrantFirstName) ||
      coFirstName.length > 0 ||
      coLastName.length > 0
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
      checkForRequired(registryInputs.CoRegistrantLastName) ||
      coLastName.length > 0 ||
      coFirstName.length > 0
        ? {
            rule: 'lastName',
            value: coLastName,
          }
        : {};
    const coEmailRule =
      checkForRequired(registryInputs.CoRegistrantEmail) || coEmail.length > 0
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
      firstName: {
        rule: 'registrationFirstName',
        value: firstName,
      },
      lastName: {
        rule: 'lastName',
        value: lastName,
      },
      babyMaidenName: babyMaidenNameRule,
      coEmail: coEmailRule,
      coLastName: colastNameRule,
      coFirstName: coFirstNameRule,
    };
  }
  /**
   * baby optional info vaildation
   */
  optionalInfoValidation() {
    const { coFirstName, coLastName, coEmail, email } = this.state;
    const coFirstNameRule =
      coFirstName.length > 0 || coLastName.length > 0
        ? {
            rule: 'registrationFirstName',
            value: coFirstName,
          }
        : {};
    const colastNameRule =
      coLastName.length > 0 || coFirstName.length > 0
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
  /**
   * event info validation
   * @param {object} registryInputs
   */
  eventInfoValidation(registryInputs) {
    const { guests, college } = this.state;
    const guestsRule =
      checkForRequired(registryInputs.numberOfGuests) || guests.length > 0
        ? {
            rule: 'guestNumber',
            value: guests,
          }
        : {};
    const collegeRule =
      checkForRequired(registryInputs.college) || college.length > 0
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
  /**
   * Move in Validation
   */
  shippingDateByRegion() {
    return isBedBathCanada() ? 'futureShippingDateCA' : 'futureShippingDate';
  }
  moveInValidation(registryInputs) {
    const {
      showMoveInInfo,
      moveInAddressOne,
      moveInCity,
      moveInStreet,
      futureShippingDate,
      moveInState,
    } = this.state;
    const caShipRestEnabled = pathOr(
      false,
      CA_SHIP_RESTRICTION,
      this.props.enabledVendors
    );
    if (showMoveInInfo) {
      const moveInAddressOneRule =
        checkForRequired(registryInputs.showFutureShippingAddr) ||
        moveInAddressOne.length
          ? {
              rule: 'apartment',
              value: moveInAddressOne,
            }
          : {};
      const moveInCityRule =
        checkForRequired(registryInputs.showFutureShippingAddr) ||
        moveInAddressOne.length
          ? {
              rule: 'city',
              value: moveInCity,
            }
          : {};
      const moveInStateRule =
        checkForRequired(registryInputs.showFutureShippingAddr) ||
        (moveInAddressOne.length && caShipRestEnabled && isBedBathCanada())
          ? {
              rule: 'qcState',
              value: moveInState,
            }
          : {};
      const moveInStreetRule =
        checkForRequired(registryInputs.showFutureShippingAddr) ||
        moveInStreet.length > 0
          ? {
              rule: 'required',
              value: moveInStreet,
              depends: {
                moveInAddressOne: moveInAddressOneRule,
                moveInCity: moveInCityRule,
                moveInState: moveInStateRule,
              },
              dependsMessage: ENTER_VALID_ADDRESS_LBL,
            }
          : {};
      const futureShippingDateRule = {
        rule: this.shippingDateByRegion(),
        value: futureShippingDate,
      };
      return {
        moveInStreet: moveInStreetRule,
        moveInAddressOne: moveInAddressOneRule,
        moveInCity: moveInCityRule,
        futureShippingDate: futureShippingDateRule,
      };
    }
    return {};
  }
  /**
   * contactInfoValidation
   * @param {object} registryInputs
   */
  contactInfoValidation(registryInputs, eventType) {
    const { primaryPh, mobilePh, street, apartment } = this.state;
    const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
    const isBabyRegistry = eventType === eventTypeConst.BABY;
    const mobilePhRule =
      registryInputs.MobileNumber &&
      (checkForRequired(registryInputs.MobileNumber) ||
        (mobilePh && mobilePh.length > 0)) &&
      !isWeddingRegistry &&
      !isBabyRegistry
        ? {
            rule: 'mobilePhRegistry',
            value:
              mobilePh.length === 10
                ? handlePhoneFieldState(mobilePh)
                : mobilePh,
          }
        : {};
    const primaryPhRule =
      registryInputs.PhoneNumber &&
      (checkForRequired(registryInputs.PhoneNumber) || primaryPh.length > 0)
        ? {
            rule: 'mobilePhRegistry',
            value:
              primaryPh.length === 10
                ? handlePhoneFieldState(primaryPh)
                : primaryPh,
          }
        : {};
    const streetRule =
      checkForRequired(registryInputs.showContactAddress) || street.length > 0
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
      registryInputs.showContactAddress
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
  /**
   * addressValidation
   */
  zipRuleByRegion() {
    return isBedBathCanada() ? 'postalCodeCA' : 'zip';
  }
  stateRuleByRegion() {
    const caShipRestEnabled = pathOr(
      false,
      CA_SHIP_RESTRICTION,
      this.props.enabledVendors
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

  /**
   * Return parsed date based on region
   */
  parseDateByRegion(date) {
    return isBedBathCanada()
      ? formatRegionDate(date, 'dd/mm/yyyy')
      : formatRegionDate(date, 'mm/dd/yyyy');
  }

  /** date validation
   * @param {object} registryInputs
   */
  dateFormatByRegion() {
    return isBedBathCanada() ? 'eventDateCanada' : 'eventDate';
  }
  dateValidation(registryInputs) {
    const { eventDate, showerDate } = this.state;
    const eventDateRule =
      checkForRequired(registryInputs.eventDate) ||
      checkForRequired(registryInputs.babyExpectedArivalDate) ||
      eventDate.length > 0
        ? {
            rule: this.dateFormatByRegion(),
            value: eventDate,
          }
        : {};
    const showerDateRule =
      checkForRequired(registryInputs.showerDate) ||
      (showerDate.length > 0 && checkForDisplay(registryInputs.showerDate))
        ? {
            rule: this.dateFormatByRegion(),
            value: showerDate,
          }
        : {};
    return { eventDate: eventDateRule, showerDate: showerDateRule };
  }
  // validating all fields before submit
  checkFormSubmit(eventType, registryID, e, isFromToggle = false) {
    let formRef = {};
    if (e) {
      e.preventDefault();
      formRef = e.target;
    }
    const regInputs = registryInputMap.has(eventType)
      ? registryInputMap.get(eventType)
      : registryInputFieldsOther;
    const errorValidationFields = this.errorValidationFields(
      eventType,
      regInputs
    );
    const regCode = this.props.eventTypeCode;
    const eventDate = this.state.eventDate;
    const futureDate = pathOr(
      '',
      'futureShippingDate.value',
      errorValidationFields
    );
    const pastEventDate = pathOr('', 'eventDate.value', errorValidationFields);
    if (
      new Date() > this.parseDateByRegion(futureDate) &&
      this.pastFutureDate === futureDate
    ) {
      errorValidationFields.futureShippingDate.rule = '';
    }
    if (
      new Date() > this.parseDateByRegion(pastEventDate) &&
      this.actualEventDate === pastEventDate
    ) {
      errorValidationFields.eventDate.rule = '';
    }
    let errors = validateAll(errorValidationFields);
    const errorObj = validateBabyMultiples(eventType, this.state);
    errors = Object.assign({}, errors, errorObj);
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      this.setState(errors, () => {
        if (Object.keys(errorObj).length) {
          document.getElementById('genderBaby1Boy').focus();
          document.getElementById('genderBaby1Boy').blur();
        }
        if (!isEmpty(formRef)) setFocus(formRef, formStyles.formError);
      });
      if (isFromToggle) this.toggleModalState(true);
    } else {
      const formData = submitRegistryData(
        this.state,
        eventType,
        registryID,
        regCode
      );
      this.submitData(formData, registryID, regCode, eventDate, isFromToggle);
    }
  }
  submitData(formData, registryID, regCode, eventDate, isFromToggle) {
    const {
      openEditRegistryModal,
      setEditRegistryModalStateFlag,
      getUpdatedRegistryData,
      getRegistryOwnerFirstCategory,
      siteSpectDateSort,
      fetchOwnAndRecommendedRegistryDetails: fetchOwnAndRecommendedRegistryDetail,
      customerId,
      getProfileData,
      favoriteStoreId,
      fetchRegistriesDetails: fetchRegistriesDetail,
      thersholdDayForOldRegistry,
      getItemsByPrice,
      handleTealiumAction,
    } = this.props;
    this.setState({
      errorMessages: {},
    });
    const storedOptInChange =
      this.editStoredValueOptIn !== this.state.storedValueOptIn;
    const ggOptInChange = this.ggValueOptIn !== this.state.groupGiftOptIn;
    try {
      const qasDataIsFetching = pathOr(false, 'qasData.isFetching', this.props);
      if (qasDataIsFetching) this.emptyQasData();
      else {
        ServiceUtil.triggerServerRequest({
          url: getApiEndPointsFromStore('editRegistry'),
          method: 'PUT',
          data: qs.stringify(formData),
        })
          .then(data => {
            const { serviceStatus } = data && data.body;
            const isDateSort =
              siteSpectDateSort || this.props.variation === 'Date';
            const isPriceView = this.props.variation === 'priceView';
            let sortSeq = 1;
            if (serviceStatus === 'SUCCESS') {
              if (this.props.setIsEditFetching)
                this.props.setIsEditFetching(false);
              if (this.props.setIsPublicState)
                this.props.setIsPublicState(this.state.isPublic === '1');
              if (
                openEditRegistryModal &&
                typeof setEditRegistryModalStateFlag === 'function'
              ) {
                setEditRegistryModalStateFlag(false);
              }
              /* istanbul ignore next */
              if (handleTealiumAction && (storedOptInChange || ggOptInChange)) {
                fireOptInTealium(
                  handleTealiumAction,
                  storedOptInChange,
                  ggOptInChange,
                  this.state.storedValueOptIn,
                  this.state.groupGiftOptIn
                );
              }
              this.toggleModalState(false);
              if (!isFromToggle) getUpdatedRegistryData(registryID, false);
              /**
               * Call getItemsByPrice function if items were sorted on the basis of Price prior to Edit Registry
               * Otherwise call getRegistryOwnerFirstCategory function for Category and Date
               */
              if (isPriceView) {
                sortSeq = QUERY_PARAM_SORT.PRICE;
                getItemsByPrice(registryID, false, sortSeq);
              } else {
                getRegistryOwnerFirstCategory(
                  registryID,
                  regCode,
                  eventDate,
                  isDateSort
                );
                if (isDateSort) {
                  sortSeq = QUERY_PARAM_SORT.DATE;
                }
              }
              window.history.replaceState(
                null,
                null,
                `${window.location.pathname}?sorting=${sortSeq}`
              );
              fetchOwnAndRecommendedRegistryDetail(customerId);
              if (isUserLoggedIn()) {
                getProfileData(customerId);
              }
              favoriteStoreId();
              fetchRegistriesDetail(customerId, thersholdDayForOldRegistry);
            }
          })
          .catch(e => {
            const errorMessages = pathOr(
              null,
              'body.response.data.errorMessages[0]',
              e
            );
            const message = errorMessages && errorMessages.message;
            this.setState({
              errorMessages,
            });
            if (isFromToggle) this.toggleModalState(true);
            consoleLog.error(message);
          });
      }
    } catch (e) {
      const errorMessages = pathOr(
        null,
        'body.response.data.errorMessages[0]',
        e
      );
      const message = errorMessages && errorMessages.message;
      this.setState({
        errorMessages,
      });
      if (isFromToggle) this.toggleModalState(true);
      consoleLog.error(message);
    }
  }
  /**
   * Sets modal mounted state to true.
   */
  handleEditRegistryClick = e => {
    e.preventDefault();
    fireTealium(this.props.handleTealiumAction, this.props.registryData);
    const { getEditRegistryData } = this.props;
    this.setState({ modalMountedState: true });
    getEditRegistryData(this.props.registryID);
    this.props.updateTymTabClickStatus(false);
  };
  /**
   * Toggles the state of edit modal
   * @param {boolean} state State of modal
   */
  toggleModalState = state => {
    if (state === true) {
      if (this.props.isNewRegDashboard) this.props.clearEditRegistryData();
      this.props.getEditRegistryData(this.props.registryID);
    }
    if (this.props.setIsEditFetching) this.props.setIsEditFetching(false);
    this.setState({ modalMountedState: state });
    if (state === false) {
      if (this.props.setOpenEditModal) this.props.setOpenEditModal(false);
      const isPublic = pathOr(
        '',
        'registryDetails.registryResVO.registrySummaryVO.isPublic',
        this.props
      );
      this.props.editRegistryFromMoreInformationBtn(false);
      this.setState({ hideLoginView: false });
      if (this.props.isNewRegDashboard) this.setState({ isPublic });
      if (!this.props.isNewRegDashboard) {
        this.props.clearEditRegistryData();
        this.setState({ ...defaultState, hideLoginView: false });
      }
      if (
        this.props.openEditRegistryModal &&
        typeof this.props.setEditRegistryModalStateFlag === 'function'
      ) {
        this.props.setEditRegistryModalStateFlag(false);
      }
    }
  };
  /**
   * update the state on change in input field
   * @param {*} value
   */
  updateState = value => {
    this.setState(value);
  };
  coRegEmailFlag = value => {
    this.setState({ iscoRegEmailFlag: value });
  };
  renderEditComponent() {
    const { enabledVendors } = this.props;
    const enableRBYRFeature = pathOr(
      false,
      'enableRBYRFeature',
      enabledVendors
    );
    const { dynamicContentState } = this.props;
    return (
      <EditRegistryComponent
        stateObj={this.state}
        isRecognized={this.isRecognized}
        dynamicContentState={dynamicContentState}
        checkFormSubmit={this.checkFormSubmit}
        setEditRegistryFlag={this.setEditRegistryFlag}
        updateState={this.updateState}
        showMoveInfo={this.showMoveInfo}
        hideMoveInfo={this.hideMoveInfo}
        showShippingInfo={this.showShippingInfo}
        hideShippingInfo={this.hideShippingInfo}
        onSelectSubscribe={this.onSelectSubscribe}
        onSelectThirdPartyOption={this.onSelectThirdPartyOption}
        toggleModalState={this.toggleModalState}
        coRegEmailFlag={this.coRegEmailFlag}
        scrollEvent={this.scrollEvent}
        handleEditRegistryClick={this.handleEditRegistryClick}
        atDateFlag={this.atDateFlag}
        enableRBYRFeatureConfig={enableRBYRFeature}
        onSelectRBYROption={this.onSelectRBYROption}
        isRegistryRBYRSelected={this.state.storedValueOptIn}
        editStoredValueOptIn={this.editStoredValueOptIn}
        isRegistryRBYRIncluded={this.isRBYRRegistryEnabled}
        onDeviceVerificationModalOpen={() => {
          this.setState({ hideLoginView: true });
        }}
        hideLoginView={this.state.hideLoginView}
        onDeviceModalClose={() => {
          this.setState({ modalMountedState: false, hideLoginView: false });
        }}
        {...this.props}
      />
    );
  }
  render() {
    const { registryID, LearnMoreModalGG } = this.props;
    if (!registryID) return null;
    if (LearnMoreModalGG) return this.renderEditComponent();
    return (
      <ErrorBoundary>
        <div className={classnames(styles.details, 'mr0 xs-mr2')}>
          {this.renderEditComponent()}
        </div>
      </ErrorBoundary>
    );
  }
}
/**
 * @param {object} signInDetails Login related data
 * @param {string} registryID Registry Id to be edited
 * @param {object} labels Labels and strings to render over UI
 */
EditRegistry.propTypes = {
  signInDetails: PropTypes.object,
  registryID: PropTypes.string,
  registryDetails: PropTypes.object,
  labels: PropTypes.object.isRequired,
  clearEditRegistryData: PropTypes.func,
  openEditRegistryModal: PropTypes.bool,
  getUpdatedRegistryData: PropTypes.func,
  eventTypeCode: PropTypes.string,
  getEditRegistryData: PropTypes.func,
  getRegistryOwnerFirstCategory: PropTypes.func,
  getProfileData: PropTypes.func,
  fetchOwnAndRecommendedRegistryDetails: PropTypes.func,
  customerId: PropTypes.string,
  setEditRegistryModalStateFlag: PropTypes.func,
  handleTealiumAction: PropTypes.func,
  registryData: PropTypes.object,
  favoriteStoreId: PropTypes.func,
  isTymTabClicked: PropTypes.bool,
  updateTymTabClickStatus: PropTypes.func,
  fetchRegistriesDetails: PropTypes.func,
  enabledVendors: PropTypes.object,
  siteSpectDateSort: PropTypes.bool,
  thersholdDayForOldRegistry: PropTypes.string,
  LearnMoreModalGG: PropTypes.bool,
  setIsChunkLoaded: PropTypes.func,
  variation: PropTypes.string,
  getItemsByPrice: PropTypes.func,
  editRegistryFromMoreInformationBtn: PropTypes.func,
  dynamicContentState: PropTypes.object,
  isNewRegDashboard: PropTypes.bool,
  setPrivPubToggleClicked: PropTypes.func,
  setIsEditFetching: PropTypes.func,
  eventType: PropTypes.string,
  setIsPublicState: PropTypes.string,
  setOpenEditModal: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  privPubToggleClicked: PropTypes.bool,
};
EditRegistry.defaultProps = {
  isFetchingEditRegistryDetails: true,
  isTymTabClicked: false,
};
export const mapDispatchToProps = dispatch => {
  return {
    clearEditRegistryData: () => {
      dispatch(removeFavoriteStoreId());
      dispatch(clearEditRegistryData());
    },
    getUpdatedRegistryData: (registryId, giftGiver) => {
      dispatch(fetchRegistryData(registryId, giftGiver, true));
    },
    getRegistryOwnerFirstCategory: (
      registryId,
      eventTypeCode,
      eventDate,
      siteSpectDateSort
    ) => {
      dispatch(
        fetchRegistryOwnerItemsFirstCategory(
          registryId,
          eventTypeCode,
          eventDate,
          siteSpectDateSort
        )
      );
    },
    fetchQasData: params => {
      dispatch(fetchQas(params));
    },
    getEditRegistryData: registryId => {
      dispatch(fetchEditRegistryData(registryId));
    },
    setUserAddressData: data => {
      dispatch(setUserAddress(data));
    },
    emptyQasData: () => {
      dispatch(emptyQasData());
    },
    getProfileData: customerId => {
      dispatch(fetchProfileData(customerId));
    },
    updateTymTabClickStatus: tymClickParam => {
      dispatch(updateTymTabClickStatus(tymClickParam));
    },
    favoriteStoreId: () => {
      dispatch(removeFavoriteStoreId());
    },
    updateContactAddressModalQasVisibility: flag =>
      dispatch(updateContactAddressModalVisibility(flag)),
    updateMovingAddressModalQasVisibility: flag =>
      dispatch(updateMovingAddressModalVisibility(flag)),
    updateShippingAddressModalQasVisibility: flag =>
      dispatch(updateShippingAddressModalVisibility(flag)),
    fetchOwnAndRecommendedRegistryDetails: customerId =>
      dispatch(fetchOwnAndRecommendedRegistryDetails(customerId)),
    handleTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    resetCoRegistrantProfileStatus: () => {
      dispatch(resetProfileStatus());
    },
    fetchRegistriesDetails: (customerId, thersholdDayForOldRegistry) => {
      dispatch(fetchRegistriesDetails(customerId, thersholdDayForOldRegistry));
    },
    fetchCoRegistrantProfileStatus: (email, showLoader) => {
      dispatch(fetchProfileStatus(email, showLoader));
    },
    editRegistryFromMoreInformationBtn(value) {
      dispatch(editRegistryFromMoreInformationBtn(value));
    },
    getContent(contentIdCollection) {
      dispatch(fetchReferredContent(contentIdCollection));
    },
  };
};
export const mapStateToProps = createStructuredSelector({
  labels: makeSelectLabels(['Registry']),
  accountAddress: makeSelectAddress(),
  userAddressData: selectUserAddressData(),
  qasData: selectQasData(),
  isFetchingEditRegistryDetails: getFetchingEditRegistryDetailStatus(),
  isTymTabClicked: getTymTabClickStatus(),
  qasIsFetching: selectQasIsFetching(),
  qasValidationStatus: selectQasValidationStatus(),
  addressContactQASModalState: makeSelectQASContactModalState(),
  addressShippingQASModalState: makeSelectQASShippingModalState(),
  addressMovingQASModalState: makeSelectQASMovingModalState(),
  enabledVendors: getEnabledGlobalVendors(),
  editModalError: getEditRegistryError(),
  qasError: selectQasError(),
  registryDetails: selectEditRegistryData(),
  customerId: makeSelectCustomerId(),
  profileData: makeSelectProfile(),
  isMobile: state => state.getIn(['mobileScreen', 'isMobileScreen']),
  registryData: getRegistryData(),
  coRegProfileStatus: makeSelectCoRegistrantProfileStatus(),
  coRegProfileStatusError: makeSelectCoRegistrantProfileStatusError(),
  deviceConfig: selectDeviceConfig,
  siteSpectDateSort: getSiteSpectDateSort(),
  createRegistryLabels: makeSelectCreateRegistryLabels(),
  isPickupInStoreModalOpen: makeSelectIsPickupInStoreOpen(),
  thersholdDayForOldRegistry: makeSelectPageConfig([
    'Registry',
    'thersholdDayForOldRegistry',
  ]),
  isNewCreateRegForm: makeSelectSwitchConfig([
    'createRegistry',
    'enableNewCreateReg',
  ]),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: EDIT_REGISTRY_DETAILS_STATE_KEY,
  reducer,
});
const withSaga = injectSaga({ key: EDIT_REGISTRY_DETAILS_STATE_KEY, saga });
const withRegistryTypesSagas = injectSaga({
  key: REG_INPUTS_STATE_KEY,
  saga: RegistryTypesSagas,
});

const withRegistryInputReducer = injectReducer({
  key: REG_INPUTS_STATE_KEY,
  reducer: registryInputReducer,
});

export default compose(
  withReducer,
  withSaga,
  withRegistryTypesSagas,
  withRegistryInputReducer,
  withConnect
)(toJS(EditRegistry));
