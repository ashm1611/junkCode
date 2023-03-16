import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { getStateList } from '@bbb-app/context/states-context/getStateList';
import Checkbox from '@bbb-app/core-ui/checkbox';
import { isBedBathCanada, isTouchDevice } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Message from '@bbb-app/core-ui/message';
import Button from '@bbb-app/core-ui/button';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import focus from '@bbb-app/hoc/focus';
import FormWrapper from '@bbb-app/forms/containers/FormWrapper/FormWrapper';
import FormInput from '@bbb-app/forms/containers/FormInput/FormInput';
import DatePicker from '@bbb-app/date-picker/components/DatePicker';
import FormElement from './WeddingBookFormElement';
import RenderThankyouModal from './RenderThankyouModal';
import {
  DATE_FORMAT,
  DATE_FORMAT_CA,
  PAST_YEAR_TO_DISPLAY,
  FUTURE_YEAR_TO_DISPLAY,
  NOTE_LBL,
  NOTE_TEXT_LBL,
  START_DATE_LBL,
  EMAIL_CHECK_LBL,
  ZIP_LBL,
  PHONE_NUMBER_LBL,
  EMAIL_LBL,
  FIRST_NAME_LBL,
  LAST_NAME_LBL,
  CITY_LBL,
  STREET_ADDRESS_LBL,
  APARTMENT_LBL,
  SUBMIT_LBL,
  DATE_ERROR_LBL,
} from './constants';
import styles from './WeddingBookForm.css';

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  formWrapperData: PropTypes.object,
  identifier: PropTypes.string,
  submitWeddingBook: PropTypes.func,
  error: PropTypes.string,
  result: PropTypes.bool,
  resetFormDataFields: PropTypes.func,
  isMobile: PropTypes.bool,
};

/**
 * @property defaultProps
 * @description defining defaultProps of the component
 */
const defaultProps = {
  identifier: 'weddingBook',
  formWrapperData: {},
};

const FocusableMessage = focus(Message);

/**
 * Render Form of wedding Book
 * @param {Object} props
 */
class WeddingBookForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailOfferChecked: false,
      selectedState: '',
      eventDate: '',
      renderThankyou: false,
      dateErrorState: false,
      showDatePicker: true,
    };
    this.toggleModalState = this.toggleModalState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.result !== this.props.result && nextProps.result) {
      this.toggleModalState(true);
      this.resetForm();
    }
  }

  onClose() {
    this.setState({ renderThankyou: false });
  }

  toggleModalState(value) {
    this.setState({ renderThankyou: value });
  }

  handleChange = value => {
    this.setState({ eventDate: value });
    if (value === '') {
      this.setState({ dateErrorState: true });
    } else {
      this.setState({ dateErrorState: false });
    }
  };

  resetForm() {
    this.props.resetFormDataFields();
    this.setState(
      {
        selectedState: '',
        eventDate: '',
        dateErrorState: false,
        showDatePicker: false,
      },
      () => {
        this.setState({
          showDatePicker: true,
        });
      }
    );
  }

  emailOffer = () => {
    const emailOffer = this.state.emailOfferChecked;
    this.setState({ emailOfferChecked: !emailOffer });
  };

  handleStateChange = value => {
    this.setState({ selectedState: value });
  };

  focusAbleMessage = error => {
    const errorMessage = this.renderErrorMessage(error);

    return (
      <Cell className={'large-8 small-12 mx-auto'}>
        <FocusableMessage>{errorMessage}</FocusableMessage>
      </Cell>
    );
  };

  submitWeddingookForm = obj => {
    const { submitWeddingBook, formWrapperData } = this.props;
    const formaData = {
      firstName: formWrapperData && formWrapperData.firstName.value,
      lastName: formWrapperData && formWrapperData.lastName.value,
      addressLine1: formWrapperData && formWrapperData.streetAddress.value,
      addressLine2: formWrapperData && formWrapperData.apartment.value,
      city: formWrapperData && formWrapperData.city.value,
      zipcode: formWrapperData && formWrapperData.zipcode.value,
      phoneNumber: formWrapperData && formWrapperData.phoneNumber.value,
      emailAddr: formWrapperData && formWrapperData.emailAddr.value,
      selectedState: this.state.selectedState,
      emailOffer: this.state.emailOfferChecked,
      dateAsString: this.state.eventDate,
    };

    const hasFormErros = Object.keys(obj).length;
    /* istanbul ignore else */
    if (this.state.eventDate === '') {
      this.setState({ dateErrorState: true });
    } else if (!hasFormErros && !this.state.dateErrorState) {
      submitWeddingBook(formaData);
    }
  };

  /**
   * @method renderErrorMessage to render error message
   * @param {object} error an error object
   */

  renderErrorMessage = error => {
    const lockErrorMessage = pathOr(
      '',
      'response.data.errorMessages[0].message',
      error
    );
    const message = lockErrorMessage.split(':');
    message.shift();
    const errorMessage = message.join();
    return (
      <Notification
        status={'error'}
        content={
          errorMessage && errorMessage.length ? errorMessage : lockErrorMessage
        }
        wrapperClass={'p1 mb2 large-8 small-12 mx-auto'}
      />
    );
  };

  /**
   * Render the form component of associate login
   */
  renderForm = () => {
    const { formWrapperData, identifier, error, isMobile } = this.props;
    const isErrorPresent = !isEmpty(error);
    const dateErrorClass = this.state.dateErrorState ? styles.dateError : '';
    const stateError = pathOr('', 'stateError', formWrapperData.state);
    const stateList = getStateList() ? getStateList() : '';
    return (
      <div className={'large-12 small-12'}>
        {isErrorPresent && this.focusAbleMessage(error)}
        <FormWrapper
          id="weddingBook"
          method="post"
          onSubmit={this.submitWeddingookForm}
          name="weddingBookForm"
          identifier={identifier}
          formWrapperData={formWrapperData}
        >
          <GridX className="grid-margin-x">
            <Cell className={'large-6 small-12 mt2 '}>
              <FormElement
                fieldName="firstName"
                label={FIRST_NAME_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                validation="firstName"
                data-locator="rgbook-fnamebox"
                isRequired
              />
            </Cell>
            <Cell className={'large-6 small-12 mt2 '}>
              <FormElement
                fieldName="lastName"
                label={LAST_NAME_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                validation="lastName"
                data-locator="rgbook-lnamebox"
                isRequired
              />
            </Cell>
          </GridX>
          <GridX>
            <Cell className={'mt2 '}>
              <FormElement
                fieldName="streetAddress"
                label={STREET_ADDRESS_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                validation="required"
                data-locator="rgbook-addressbox"
                isRequired
              />
            </Cell>
          </GridX>
          <GridX>
            <Cell className={'mt2 '}>
              <FormElement
                fieldName="apartment"
                label={APARTMENT_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                data-locator="rgbook-aptbox"
              />
            </Cell>
          </GridX>
          <GridX>
            <Cell className={'mt2 '}>
              <FormElement
                fieldName="city"
                label={CITY_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                data-locator="rgbook-citybox"
                validation="city"
                isRequired
              />
            </Cell>
          </GridX>
          <GridX className="grid-margin-x">
            <Cell className={'large-6 small-6 mt2 '}>
              <FormInput
                type="select"
                id={'state'}
                name={'state'}
                optionSet={stateList}
                position={'top'}
                identifier={identifier}
                formWrapperData={formWrapperData}
                selectOption={this.handleStateChange}
                defaultValue={this.state.selectedState}
                data-locator="rgbook-stateBox"
                validation="state"
                stateError={stateError}
                required
                isRequired
              />
            </Cell>
            <Cell className={'large-6 small-6 mt2 '}>
              <FormElement
                fieldName="zipcode"
                label={ZIP_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                data-locator="rgbook-zipbox"
                validation={isBedBathCanada() ? 'postalCodeCA' : 'zip'}
                isRequired
              />
            </Cell>
          </GridX>
          <GridX className="grid-margin-x">
            <Cell className={'large-6 small-12 mt2 '}>
              <FormElement
                fieldName="phoneNumber"
                id="phoneNumber"
                name="phoneNumber"
                label={PHONE_NUMBER_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                data-locator="rgbook-phonenumber"
                validation={'phoneRequired'}
                type="tel"
                maxLength="10"
                isRequired
                labelPosition="append"
              />
            </Cell>
            <Cell className={'large-6 small-12 mt2 mb2'}>
              <FormElement
                fieldName="emailAddr"
                label={EMAIL_LBL}
                identifier={identifier}
                formWrapperData={formWrapperData}
                data-locator="rgbook-emailbox"
                validation="email"
                type="email"
                isRequired
              />
            </Cell>
          </GridX>
          <GridX className="grid-margin-x">
            <Cell
              className={classnames('large-6 small-12 mb2', styles.dateInput)}
            >
              {this.state.showDatePicker && (
                <DatePicker
                  id="startDate"
                  name="startDate"
                  label={isMobile && isTouchDevice() ? '' : START_DATE_LBL}
                  futureYearToDisplay={FUTURE_YEAR_TO_DISPLAY}
                  pastYearToDisplay={PAST_YEAR_TO_DISPLAY}
                  identifier={identifier}
                  value={this.state.eventDate}
                  className={classnames(dateErrorClass)}
                  onDayChange={this.handleChange}
                  onBlur={this.handleChange}
                  inputProps={{
                    'data-locator': 'weddingDate',
                    onChange: this.handleChange,
                    className: dateErrorClass,
                  }}
                  format={isBedBathCanada() ? DATE_FORMAT_CA : DATE_FORMAT}
                  validation="required"
                  required
                  isNative={isMobile}
                  data-locator="rgbook-date"
                  hideOnDayClick
                />
              )}
              {this.state.dateErrorState && (
                <div className={classnames('validationErrorMessage')}>
                  {DATE_ERROR_LBL}
                </div>
              )}
            </Cell>
          </GridX>
          <GridX className={classnames('mt2 mb2', styles.emailCheckox)}>
            <Checkbox
              id="emailCheck"
              name="emailCheck"
              type="checkbox"
              className={classnames(styles.emailCheck)}
              identifier={identifier}
              checked={this.state.emailOfferChecked}
              onSelect={this.emailOffer}
              label={EMAIL_CHECK_LBL}
              data-locator="rgbook-offercheckbox"
            />
          </GridX>
          <GridX>
            <Button
              id="weddingBookSubmit"
              type="submit"
              theme="primary"
              data-locator="rgbook-submitcta"
              className={'mb2 sm-mb3 mt1 large-6 small-12'}
            >
              {SUBMIT_LBL}
            </Button>
          </GridX>
          <GridX data-locator="rgbook-note">
            <span className={classnames(styles.noteText, 'large-8')}>
              <span className={classnames(styles.note, 'mr1')}>
                {NOTE_LBL}:
              </span>
              {NOTE_TEXT_LBL}
            </span>
          </GridX>
        </FormWrapper>
      </div>
    );
  };

  /**
   * Render Form of associate login
   * @param {Object} props
   */
  render() {
    return (
      <ErrorBoundary>
        <GridX>{this.renderForm()}</GridX>
        <RenderThankyouModal
          toggleModalState={this.toggleModalState}
          mountedState={this.state.renderThankyou}
          onCancel={this.onCancel}
        />
      </ErrorBoundary>
    );
  }
}

WeddingBookForm.propTypes = propTypes;
WeddingBookForm.defaultProps = defaultProps;
export default WeddingBookForm;
