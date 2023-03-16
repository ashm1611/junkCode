import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import { getStateListUnsorted } from '@bbb-app/context/states-context/getStateList';
import Heading from '@bbb-app/core-ui/heading';
import getQASVerifiedData from '@bbb-app/utils/getQASVerifiedData';
import { handleNewAddress } from '@bbb-app/utils/handleNewAddress';
import { isBedBathCanada, getSiteId, isHarmon } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import QasValidation from '@bbb-app/qas-validation/containers/QasValidation.async';
import isBrowser from '@bbb-app/utils/isBrowser';
import FormInput from '@bbb-app/forms/components/FormInput/FormInput';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { validateAll } from '@bbb-app/forms/validations/validator';
import {
  VERIFIED,
  CA_SHIP_RESTRICTION,
} from '@bbb-app/constants/QasValidation';
import AutoFill from '@bbb-app/auto-fill/containers/AutoFill';
import RenderInput from '../FormComponents/RenderInput';
import styles from './AddressInput.css';
import { getformattedStreet } from '../../CreateRegistryUtils';
import {
  EDIT_ADDRESS_CANCEL_LBL,
  EDIT_CONTACT_ERROR_MSG_LBL,
  EDIT_ADDRESS_SUBMIT_LBL,
  ENTER_CITY_LBL,
  ADDRESS_LINE_ONE_LBL,
  ADDRESS_LINE_TWO_LBL,
  ENTER_STATE_CANADA_LBL,
  ENTER_STATE_LBL,
  STREET_ADDRESS_BABY_LBL,
  STREET_ADDRESS_LBL,
  ENTER_ZIP_CANADA_LBL,
  ENTER_ZIP_LBL,
} from './constants';
import { ENTER_VALID_ADDRESS_LBL } from '../../../../Registry/CreateRegistry/constants';
/**
 * @param {String} heading Heading of Address Edit Modal
 * @param {String} formHeading Form Heading inside Address edit modal
 * @param {object} labels labels object
 * @param {String} classes address input class name
 * @param {String} fieldName address input field name
 * @param {Function} updateState state function used to make street field controlled component.
 * @param {String} addressOne default value of addressOne
 * @param {Object} locator locator object for each field to be used in automation testing
 * @param {Boolean} required whether address field is required or not
 * @param {String} value default value of addressInput
 * @param {String} addressTwo: default value of addressTwo
 * @param {String} zip default 5 or 5-4 degit zip code
 * @param {String} city: default value of city
 * @param {String} state: default value of state
 * @param {Array} statesListObj: state array list.
 * @param {String} streetError: default value of streetError
 * @param {Function} handelAddressChange: default value of city
 */
const propTypes = {
  heading: PropTypes.string,
  formHeading: PropTypes.string,
  classes: PropTypes.string,
  fieldName: PropTypes.string,
  addressOne: PropTypes.string,
  locator: PropTypes.object.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  addressTwo: PropTypes.string,
  zip: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  streetError: PropTypes.string,
  handelAddressChange: PropTypes.func.isRequired,
  registryConfig: PropTypes.object,
  setUserAddressData: PropTypes.func,
  fetchQasData: PropTypes.func,
  updateAddressModalQasVisibility: PropTypes.func,
  addressQASModalState: PropTypes.bool,
  qasIsFetching: PropTypes.bool,
  enabledVendors: PropTypes.object,
  qasValidationStatus: PropTypes.object,
  emptyQasData: PropTypes.func,
  globalSwitchConfig: PropTypes.object,
  ssTest: PropTypes.bool,
  focusShow: PropTypes.func,
  currentFocus: PropTypes.any,
  hideModal: PropTypes.func,
  isBabyRegistry: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
  qasError: PropTypes.any,
  qasData: PropTypes.object,
};

const defaultProps = {
  value: '',
  addressOne: '',
  addressTwo: '',
  city: '',
  state: '',
  zip: '',
};

// eslint-disable-next-line no-underscore-dangle
const statesListObj = getStateListUnsorted();
/**
 * This component will handle Edit Address Modal Google Address Suggestion
 * and QAS integration. Reusable component to be used in contact, shipping,
 * future shipping registry address.
 */

// TODO: Test it by switching off the google address autofill flag.
class AddressInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditModalOpen: this.props.currentFocus,
      street: this.props.value,
      streetError: this.props.streetError,
      addressOne: this.props.addressOne,
      addressOneError: '',
      addressTwo: this.props.addressTwo,
      addressTwoError: '',
      city: this.props.city,
      cityError: '',
      state: this.props.state,
      stateError: '',
      zip: this.props.zip,
      zipError: '',
      lastValue: this.props.value,
      isQASSearchFlag: false,
      isQASValidated: false,
      showQasApiError: false,
      hasErrors: false,
    };
    this.hasAddressSuggestionSelected = false;
    this.renderSaveButton = this.renderSaveButton.bind(this);
    this.renderCancelButton = this.renderCancelButton.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderAddressModal = this.renderAddressModal.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.debounceBlur = this.debounceBlur.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validate = this.validate.bind(this);
    this.handelApply = this.handelApply.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.renderStateDropdown = this.renderStateDropdown.bind(this);
    this.saveAddress = this.saveAddress.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
    this.handelAddressSuggestions = this.handelAddressSuggestions.bind(this);
    this.updateStreet = this.updateStreet.bind(this, this.props.fieldName);
    this.handelBlur = this.handelBlur.bind(this);
    this.renderCount = 0;
    this.updateAddressQAS = this.updateAddressQAS.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.editAddressQAS = this.editAddressQAS.bind(this);
  }

  componentDidMount() {
    if (isBrowser() && !isHarmon()) {
      /* istanbul ignore next */
      document
        .getElementsByTagName('body')[0]
        .addEventListener('mousedown', this.suggestionSelected);
      document
        .getElementsByTagName('body')[0]
        .addEventListener('touchend', this.suggestionSelected);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { qasError, qasData, qasValidationStatus } = nextProps;
    const modifiedState = {};
    if (nextProps.value !== this.props.value) {
      modifiedState.street = nextProps.value;
      modifiedState.lastValue = nextProps.value;
    }
    if (nextProps.addressOne !== this.props.addressOne) {
      modifiedState.addressOne = nextProps.addressOne;
    }
    if (nextProps.city !== this.props.city) {
      modifiedState.city = nextProps.city;
    }
    if (nextProps.state !== this.props.state) {
      modifiedState.state = nextProps.state;
    }
    if (nextProps.zip !== this.props.zip) {
      modifiedState.zip = nextProps.zip;
    }
    if (nextProps.streetError !== this.props.streetError) {
      modifiedState.streetError = nextProps.streetError;
    }
    if (nextProps.addressTwo !== this.props.addressTwo) {
      modifiedState.addressTwo = nextProps.addressTwo;
    }
    if (!isEmpty(modifiedState)) {
      this.setState(modifiedState);
    }
    // QAS
    if (this.state.isQASSearchFlag)
      this.handleQAS(qasValidationStatus, qasError, qasData);
  }

  componentWillUnmount() {
    if (isBrowser()) {
      /* istanbul ignore next */
      document
        .getElementsByTagName('body')[0]
        .removeEventListener('mousedown', this.suggestionSelected);
      document
        .getElementsByTagName('body')[0]
        .removeEventListener('touchend', this.suggestionSelected);
    }
  }

  handleQAS(qasValidationStatus, qasError, qasData) {
    const data = pathOr(null, 'userAddressData.data', this.props);
    const verifyLevel = pathOr(null, 'verifyLevel', qasValidationStatus);
    const addressMatchState = pathOr(
      null,
      'addressMatchState',
      qasValidationStatus
    );
    if (
      qasError ||
      ((verifyLevel || addressMatchState) &&
        (verifyLevel !==
          pathOr(null, 'verifyLevel', this.props.qasValidationStatus) ||
          addressMatchState !==
            pathOr(null, 'addressMatchState', this.props.qasValidationStatus)))
    ) {
      const addressData = getQASVerifiedData(data, qasData);
      this.handleAddAddressQasData(verifyLevel, addressData, qasError);
    }
  }

  suggestionSelected(event) {
    if (
      event.target.className.includes('pac-item') ||
      event.target.parentNode.className.includes('pac-item')
    ) {
      this.hasAddressSuggestionSelected = true;
    }
  }

  handleAddAddressQasData(verifyLevel, data, qasErrorState) {
    if (verifyLevel === VERIFIED || qasErrorState) {
      this.updateAddressQAS(data);
      this.props.emptyQasData();
    } else {
      this.props.updateAddressModalQasVisibility(true);
    }
  }

  updateAddressQAS(addressData) {
    const { addressLine1, apartment, city, state, zip } = addressData;
    const address = [addressLine1, city, state, zip].join(', ');
    this.setState(
      {
        street: address,
        addressOne: addressLine1,
        addressTwo: apartment,
        city,
        state,
        zip,
        isQASSearchFlag: false,
        isQASValidated: true,
      },
      this.saveAddress
    );
    this.toggleModalState(false);
    this.props.updateAddressModalQasVisibility(false);
  }

  editAddressQAS() {
    this.toggleModalState(true);
  }

  /**
   * call the handelAddressChange prop and past the current state.
   */
  saveAddress(flag = false) {
    // save address ----------------------------
    this.props.handelAddressChange({
      street: this.state.street,
      streetError: this.state.streetError,
      addressOne: this.state.addressOne,
      addressTwo: this.state.addressTwo,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      isQASValidated: this.state.isQASValidated,
    });
    this.toggleModalState(flag);
  }

  saveAddressQASValidation() {
    const { addressOne, addressTwo, city, state, zip } = this.state;
    const { enabledVendors } = this.props;
    const isQasEnable = pathOr(null, 'enableQAS', enabledVendors);

    /*
     * QAS call, if no error in address
     */
    if (isQasEnable) {
      this.setState({
        isQASSearchFlag: true,
      });
      const data = {
        addressLine1: addressOne,
        apartment: addressTwo,
        city,
        state,
        zip,
      };
      // QAS Call
      this.props.setUserAddressData({
        data,
      });
      this.props.fetchQasData({
        data,
      });
      this.props.handelAddressChange({
        street: this.state.street,
        streetError: this.state.streetError,
        addressOne: this.state.addressOne,
        addressTwo: this.state.addressTwo,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        isQASValidated: this.state.isQASValidated,
      });
    } else {
      this.setState({
        isQASSearchFlag: false,
      });
      this.saveAddress();
    }
  }

  /**
   * open and close edit address modal state
   *
   * @param {Boolean} isVisible
   */
  toggleModalState(isVisible) {
    const { ssTest, hideModal, focusShow } = this.props;
    if (ssTest && isVisible) focusShow();
    else if (ssTest && !isVisible) hideModal();
    // inside toggleModalState');
    this.hasAddressSuggestionSelected = false;
    this.props.emptyQasData();
    this.setState({
      isEditModalOpen: isVisible,
      lastValue: this.state.street,
      isQASSearchFlag: false,
    });
  }

  /**
   * make form component controlled component
   *
   * @param {String} value
   */
  updateLocalState(value) {
    this.setState(value);
  }

  /**
   * enable multiple address inputs
   * @param {String} field
   * @param {Object} value
   */
  updateStreet(field, value) {
    this.setState({ street: value[field] });
  }

  /**
   * function to choose between place_selected and blur event
   * place_selected event will always be higher priority
   */
  debounceBlur(e, fieldName) {
    // wait for 200ms for google api place_selected event to fire
    // ## debouncing blur ----------------------
    if (isBrowser() && document.getElementById(fieldName)) {
      const element = document.getElementById(fieldName);
      this.setState({ street: element.value }, () => {
        if (!this.hasAddressSuggestionSelected && !this.state.isEditModalOpen) {
          this.handelBlur();
        }
      });
    }
  }

  /**
   * handle google suggestions
   */
  handelAddressSuggestions(suggestedPlace) {
    const newAddressObj = handleNewAddress(suggestedPlace);
    const { apartment: addressTwo, city, state, zip } = newAddressObj;
    let { addressLine1: addressOne } = newAddressObj;

    const street = getformattedStreet(addressOne, city, state, zip);
    const errors = this.validate(addressOne, addressTwo, city, state, zip);
    const hasErrors = Object.keys(errors).length > 0;
    const streetError = errors.stateError
      ? errors.stateError
      : ENTER_VALID_ADDRESS_LBL;

    addressOne = addressOne.substring(0, 30);

    if (hasErrors) {
      // ## inside google suggestion with error
      const tempStreetArr = this.state.street.split(',');
      if (tempStreetArr.length > 1) {
        addressOne = tempStreetArr[0].trim();
        addressOne = addressOne.substring(0, 30);
      }

      this.setState(
        {
          addressOne,
          addressTwo,
          city,
          state,
          zip,
          addressOneError: '',
          addressTwoError: '',
          zipError: '',
          cityError: '',
          stateError: '',
          streetError,
          isQASValidated: false,
        },
        this.saveAddress
      );
      this.toggleModalState(state !== 'QC');
    } else {
      // ## inside google suggestion with no error
      this.setState(
        {
          street,
          addressOne,
          addressTwo,
          city,
          state,
          zip,
          lastValue: street,
          addressOneError: '',
          addressTwoError: '',
          zipError: '',
          cityError: '',
          stateError: '',
          streetError: '',
        },
        this.saveAddressQASValidation
      );
    }
    this.hasAddressSuggestionSelected = false;
  }

  /**
   * handle blur event
   */
  handelBlur() {
    const {
      addressOne,
      addressTwo,
      city,
      state,
      zip,
      street,
      lastValue,
    } = this.state;
    const errors = this.validate(addressOne, addressTwo, city, state, zip);
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors || street !== lastValue) {
      // ## inside blur with error
      let addressFields = [];
      addressFields = (street && street.split(',')) || '';
      const newAddressOne = addressFields[0]
        ? addressFields[0].substring(0, 30)
        : '';
      this.setState(
        {
          addressOne: newAddressOne,
          addressTwo,
          city: '',
          state: '',
          zip: '',
          streetError: ENTER_VALID_ADDRESS_LBL,
          isQASValidated: false,
          hasErrors,
        },
        () => this.saveAddress(street !== lastValue && street !== '')
      );
    }
  }

  /**
   * handele apply button click
   */
  handelApply(e) {
    e.preventDefault();
    const { addressOne, addressTwo, city, state, zip } = this.state;
    const errors = this.validate(addressOne, addressTwo, city, state, zip);
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      this.setState(errors);
    } else {
      const address = getformattedStreet(addressOne, city, state, zip);
      this.setState(
        {
          street: address,
          lastValue: address,
          addressOneError: '',
          addressTwoError: '',
          cityError: '',
          stateError: '',
          zipError: '',
          streetError: '',
          isQASValidated: false,
          hasErrors: false,
        },
        this.saveAddressQASValidation
      );
    }
  }

  /**
   * close the edit address modal
   *
   * @param {Event} e
   */
  closeModal(e) {
    e.preventDefault();
    this.toggleModalState(false);
  }

  /**
   * Validate the address fields
   *
   * @param {String} addressOne
   * @param {String} city
   * @param {String} state
   * @param {STring} zip
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

  validate(addressOne, addressTwo, city, state, zip) {
    const rules = {
      addressOne: {
        rule: 'addressLine1',
        value: addressOne,
      },
      addressTwo: {
        rule: 'apartment',
        value: addressTwo,
      },
      city: {
        rule: 'city',
        value: city,
      },
      state: {
        rule: this.stateRuleByRegion(),
        value: state,
      },
      zip: {
        rule: this.zipRuleByRegion(),
        value: zip,
      },
    };
    return validateAll(rules);
  }

  /**
   * Handler for state dropdown selection
   *
   * @param {String} value
   */
  handleStateChange(value) {
    this.setState({ state: value, stateError: '' });
  }

  /**
   * render the save button
   *
   * @param {Object} labels
   */
  renderSaveButton() {
    return (
      <GridX>
        <Cell className={`small-12 large-6 mb3`}>
          <Button
            id="editAddressSubmit"
            type="submit"
            theme={this.props.qasIsFetching ? 'deactivated' : 'primary'}
            variation="fullWidth"
            aria-label="Save Address"
            className={`mb0`}
            disabled={false}
            onClick={this.handelApply}
          >
            {EDIT_ADDRESS_SUBMIT_LBL}
          </Button>
        </Cell>
      </GridX>
    );
  }

  /**
   * render the cancel button
   * @param {Object} labels
   */
  renderCancelButton() {
    return (
      <PrimaryLink
        id="editAddressCancel"
        variation="primaryLinkBlue"
        href="#"
        type="bold"
        onClick={this.closeModal}
      >
        {EDIT_ADDRESS_CANCEL_LBL}
      </PrimaryLink>
    );
  }

  /**
   * render the state dropdown
   */
  renderStateDropdown() {
    const { locator } = this.props;
    const { stateError, state } = this.state;
    return (
      <Cell className={classnames('mb3 sm-mb3', styles.fieldStyle)}>
        <FormInput
          required
          id={'state'}
          type="select"
          name={'state'}
          label={isBedBathCanada() ? ENTER_STATE_CANADA_LBL : ENTER_STATE_LBL}
          labelStyle="inlineLabel"
          optionSet={statesListObj}
          selectOption={this.handleStateChange}
          defaultValue={state}
          wrapperClassName={styles.stateDropdown}
          className={classnames({
            errorField: stateError,
          })}
          data-locator={locator.STATE}
        />
        {this.state.stateError ? (
          <Paragraph className="errorColor">{this.state.stateError}</Paragraph>
        ) : null}
      </Cell>
    );
  }

  /**
   * render modal fields
   */
  renderForm() {
    const { locator, formHeading } = this.props;
    const {
      addressOne,
      addressOneError,
      addressTwo,
      addressTwoError,
      zip,
      zipError,
      city,
      cityError,
    } = this.state;

    return (
      <React.Fragment>
        <Heading level={3} className={'mb2 sm-mb2'}>
          {formHeading}
        </Heading>
        <GridX>
          <RenderInput
            required
            type="text"
            validation="required"
            fieldName={'addressOne'}
            classes={classnames(styles.fieldStyle)}
            dataLocator={locator.ADDRESS1}
            maxLength={30}
            label={ADDRESS_LINE_ONE_LBL}
            updateState={this.updateLocalState}
            value={addressOne}
            addressOneError={addressOneError}
          />
        </GridX>
        <GridX>
          <RenderInput
            type="text"
            fieldName={'addressTwo'}
            classes={classnames(styles.fieldStyle)}
            dataLocator={locator.ADDRESS2}
            maxLength={30}
            updateState={this.updateLocalState}
            label={ADDRESS_LINE_TWO_LBL}
            value={addressTwo}
            addressTwoError={addressTwoError}
          />
        </GridX>
        <GridX>
          <RenderInput
            required
            type="text"
            fieldName={'zip'}
            validation={this.zipRuleByRegion()}
            classes={classnames(styles.fieldStyle)}
            dataLocator={locator.ZIP}
            maxLength={10}
            updateState={this.updateLocalState}
            label={isBedBathCanada() ? ENTER_ZIP_CANADA_LBL : ENTER_ZIP_LBL}
            value={zip}
            zipError={zipError}
          />
        </GridX>
        <GridX>
          <RenderInput
            required
            type="text"
            fieldName={'city'}
            classes={classnames(styles.fieldStyle)}
            validation="required"
            dataLocator={locator.CITY}
            maxLength={25}
            label={ENTER_CITY_LBL}
            updateState={this.updateLocalState}
            value={city}
            cityError={cityError}
          />
        </GridX>
        {this.renderStateDropdown()}
        <GridX />
      </React.Fragment>
    );
  }

  /**
   * render the address modal
   *
   * @param {Boolean} isEditModalOpen wether modal is open or not
   */
  renderAddressModal(isEditModalOpen) {
    const { heading, ssTest, currentFocus } = this.props;

    if (ssTest) this.state.isEditModalOpen = currentFocus;
    return (
      !this.props.addressQASModalState && (
        <ModalDialog
          mountedState={isEditModalOpen}
          toggleModalState={this.toggleModalState}
          dialogClass={classnames(styles.addressModal)}
          titleAriaLabel={heading}
          variation="small"
          underlayClickExits={false}
          verticallyCenter
          scrollDisabled={false}
        >
          <Heading
            level={2}
            className={classnames('mb3', styles.editAddressHeading)}
          >
            {heading}
          </Heading>
          {ssTest && this.state.hasErrors && (
            <Notification
              hasStatusIcon
              status={'error'}
              wrapperClass={'mb3 small-mb3'}
              content={EDIT_CONTACT_ERROR_MSG_LBL}
            />
          )}
          <form noValidate method="post">
            {this.renderForm()}
            {this.renderSaveButton()}
            {this.renderCancelButton()}
          </form>
        </ModalDialog>
      )
    );
  }

  render() {
    const {
      required,
      classes,
      locator,
      fieldName,
      registryConfig,
      enabledVendors,
      ssTest,
      focusShow,
      currentFocus,
      hideModal,
      isBabyRegistry,
      isCABabyRegistry,
    } = this.props;
    const { isEditModalOpen, streetError, street } = this.state;
    const fieldError = `${fieldName}Error`;
    const isQasEnable = pathOr(null, 'enableQAS', enabledVendors);
    const siteId = getSiteId();
    const streetAddress =
      siteId === 'BuyBuyBaby' || siteId === 'TBS_BuyBuyBaby'
        ? STREET_ADDRESS_BABY_LBL
        : STREET_ADDRESS_LBL;
    return (
      <React.Fragment>
        <RenderInput
          fieldName={fieldName}
          id={fieldName}
          label={
            isBabyRegistry || isCABabyRegistry
              ? `Street Address/City/State/Zip Code`
              : streetAddress
          }
          classes={classes}
          validation="required"
          type="text"
          required={required}
          dataLocator={locator.STREET}
          {...{ [fieldError]: streetError }}
          updateState={this.updateStreet}
          value={street}
          afterValidation={e => {
            this.debounceBlur(e, fieldName);
          }}
          ssTest={ssTest}
          focusShow={focusShow}
          hideModal={hideModal}
        />
        {!ssTest
          ? this.renderAddressModal(isEditModalOpen)
          : this.renderAddressModal(currentFocus)}
        {registryConfig && registryConfig.enableAutoFill && !ssTest ? (
          <AutoFill
            targetElementId={fieldName}
            onKeyDown={{
              [fieldName]: e => {
                // keycode for up and down arrow
                /* istanbul ignore next : unreachable code*/
                if (e.keyCode === 38 || e.keyCode === 40) {
                  this.hasAddressSuggestionSelected = true;
                } else if (e.keyCode === 13) {
                  e.preventDefault();
                  this.debounceBlur(e, fieldName);
                }
              },
            }}
            onAddressChange={{
              [fieldName]: suggestedPlace => {
                /* istanbul ignore next : unreachable code*/
                if (isBrowser() && document.getElementById(fieldName)) {
                  this.setState({
                    street: document.getElementById(fieldName).value,
                  });
                }
                this.handelAddressSuggestions(suggestedPlace);
              },
            }}
          />
        ) : null}
        {isQasEnable ? (
          <QasValidation
            submitAddress={this.updateAddressQAS}
            modalMountedState={this.props.addressQASModalState}
            updateModalState={flag => {
              this.props.emptyQasData();
              this.setState({ showQasApiError: false });
              this.props.updateAddressModalQasVisibility(flag);
            }}
            onEditClick={this.editAddressQAS}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

AddressInput.propTypes = propTypes;
AddressInput.defaultProps = defaultProps;
export default AddressInput;
