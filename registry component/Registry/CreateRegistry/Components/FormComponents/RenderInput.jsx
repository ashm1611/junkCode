import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isBrowser } from '@bbb-app/utils/filterUtils';
import handlePhoneFieldState from '@bbb-app/utils/handlePhoneFieldState';
import unMaskPhoneField from '@bbb-app/utils/unMaskPhoneField';
import Cell from '@bbb-app/core-ui/cell';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Paragraph from '@bbb-app/core-ui/paragraph';
import FormInput from '@bbb-app/forms/components/FormInput';
import { validateChange } from '@bbb-app/forms/validations/validator';
import styles from '../../CreateRegistryFormStyles.css';
import { NO_OF_GUESTS_MAXLENGTH } from './constants';

class RenderInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBlurChange = this.handleBlurChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.checkForPhoneFields = this.checkForPhoneFields.bind(this);
    this.state = {
      placeholder: '',
      showExistingUserNotification: true,
      handleChange: false,
    };
  }

  componentWillMount() {
    this.checkForInitialPhoneFields(this.props.fieldName, this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.checkForInitialPhoneFields(nextProps.fieldName, nextProps.value);
    }
    if (nextProps.isRegistryEmail && this.state.handleChange) {
      this.setState({ showExistingUserNotification: true });
    }
  }

  // this function is used to get the value object in the form required for the validator funciton
  getComparedValueObject(comparatorProp, name, value) {
    if (comparatorProp) {
      return {
        [name]: value,
        ...comparatorProp,
      };
    }
    return value;
  }
  // once the validator function return a value, it should be extracted from the returned object
  setComparedValueObject(comparatorProp, name, value) {
    if (comparatorProp) {
      return value[name];
    }
    return value;
  }

  setStatus = () => (this.state.showExistingUserNotification ? 'success' : '');

  /**
   * This method checks and formats the phone number
   * @param {string} name Field name
   * @param {number} value Field value
   * @returns {string} formatted phone number
   */
  checkAndFormatPhoneNumber(name, value) {
    const updateState = this.props.updateState;
    const phoneDigits = unMaskPhoneField(value);

    if (
      phoneDigits.length === 10 &&
      (name === 'mobilePh' || name === 'primaryPh' || name === 'shippingPhone')
    ) {
      const val = handlePhoneFieldState(value);
      updateState({ [name]: val });
      return val;
    }
    return value;
  }

  /**
   * handle the on blur validation and state updation
   */
  handleBlurChange(rule, required, e, comparatorProp = undefined) {
    const { name } = e.target;
    const { updateState, afterValidation } = this.props;
    if (!this.state.showExistingUserNotification)
      this.setState({ handleChange: true });
    let returnValue = {};
    let value = e.target.value;

    if (
      this.props.value === '' &&
      (e.target.name === 'mobilePh' ||
        e.target.name === 'primaryPh' ||
        e.target.name === 'shippingPhone')
    ) {
      this.setState({ placeholder: '' });
    }
    value = this.checkAndFormatPhoneNumber(name, value);

    // check if the field is required or any value has any length
    if (required || value.length) {
      // get the value object in case the comparator property is true
      value = this.getComparedValueObject(comparatorProp, name, value);
      returnValue =
        rule === 'coRegistrantName'
          ? Object.assign({}, this.validateNewCoRegName(name, value))
          : Object.assign({}, validateChange(name, value, rule));
      // get the value object in case the comparator property is true
      returnValue[name] = this.setComparedValueObject(
        comparatorProp,
        name,
        returnValue[name]
      );
    } else {
      const nameError = `${name}Error`;
      returnValue[name] = value;
      returnValue[nameError] = '';
    }
    if (returnValue && updateState) {
      updateState(returnValue);
    }
    // expose blur operation to  parent
    if (typeof afterValidation === 'function') {
      afterValidation(e, returnValue);
    }
  }
  validateNewCoRegName = (name, value) => {
    let coLastName = '';
    let coFirstName = '';
    const fieldError = `${name}Error`;
    let error = 'please enter first and last name';
    if (/^[a-zA-z\s]+$/.test(value)) {
      const nameArr = value.split(' ');
      const names = [...nameArr];
      coFirstName = names.shift();
      coLastName = names.join(' ');
      if (
        nameArr.length > 1 &&
        nameArr[1].length > 1 &&
        coFirstName.length &&
        coFirstName.length < 31 &&
        coLastName.length < 31
      ) {
        error = '';
      }
    }
    return {
      [name]: value,
      [fieldError]: error,
      coFirstName,
      coLastName,
    };
  };

  disableEventDate() {
    /* can't unit test window undefined */
    const url = isBrowser() && window.location.href;
    /* istanbul ignore next */
    const eventDate =
      typeof document !== 'undefined'
        ? document.getElementById('eventDate')
        : null;
    /* istanbul ignore next */
    const showerDate =
      typeof document !== 'undefined'
        ? document.getElementById('showerDate')
        : null;
    if (this.props.isMobile) {
      if (eventDate && !url.includes('atDate=true')) {
        eventDate.setAttribute('type', 'text');
        eventDate.setAttribute('disabled', true);
      }
      if (showerDate) {
        showerDate.setAttribute('type', 'text');
        showerDate.setAttribute('disabled', true);
      }
    }
  }

  handleOnFocus(e, ssTest) {
    if (e.target.name === 'coEmail') {
      this.disableEventDate();
    }

    const regEx = /street/i;
    if (ssTest && regEx.test(e.target.name)) {
      this.props.focusShow();
    }
  }

  keepAllDigit(val, maxLength = 10) {
    const val1 = `${val}`.replace(/\D/g, '');
    return val1.substr(0, maxLength);
  }
  /**
   * handle the change in input field and state validation
   */

  handleChange(e) {
    const { updateState, maxLength } = this.props;
    let value = e.target.value;
    const name = e.target.name;
    this.setState({ handleChange: false });
    if (
      name === 'mobilePh' ||
      name === 'primaryPh' ||
      name === 'shippingPhone'
    ) {
      value = this.keepAllDigit(value, maxLength);
      updateState({ [name]: value });
    } else if (name === 'guests') {
      const isValidNo = val => /^(\d+)?$/.test(val);
      if (isValidNo(value)) {
        value = this.keepAllDigit(value, NO_OF_GUESTS_MAXLENGTH);
        updateState({ [name]: value });
      }
    } else {
      updateState({ [name]: value });
    }
  }

  checkForPhoneFields(name, value) {
    const { updateState } = this.props;
    updateState({ [name]: value });
  }

  /**
   * This method is called once and checks and fromats the phone fields if it is coming from props directly
   * A case where we have saved phone fields
   * @param {string} name form field name
   * @param {number} value form value
   */
  checkForInitialPhoneFields(name, value) {
    if (
      name === 'mobilePh' ||
      name === 'primaryPh' ||
      name === 'shippingPhone'
    ) {
      this.checkAndFormatPhoneNumber(name, value);
    }
  }

  closeClick = () => this.setState({ showExistingUserNotification: false });

  render() {
    const {
      fieldName,
      validation, // validation rule
      label,
      classes,
      type,
      required,
      value,
      maxLength,
      disabled,
      dataLocator,
      comparatorProp,
      autocomplete,
      ssTest,
      showNumericKeypadOnMobile,
      fromPersonalInfo,
    } = this.props;
    const fieldError = `${fieldName}Error`;
    const fieldInfo = `${fieldName}Info`;
    const errorClass = this.props[fieldError]
      ? `${styles.formError} errorColor`
      : '';

    return (
      <Cell className={classnames(classes, 'pb2')}>
        <FormInput
          id={fieldName}
          type={type}
          className={errorClass}
          name={fieldName}
          onBlur={e => {
            this.handleBlurChange(validation, required, e, comparatorProp);
          }}
          onChange={e => this.handleChange(e)}
          onFocus={e => this.handleOnFocus(e, ssTest)}
          label={label}
          data-locator={dataLocator}
          labelPosition="append"
          placeholder={label}
          required={required}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          autocomplete={autocomplete}
          showNumericKeypadOnMobile={showNumericKeypadOnMobile}
        />
        {this.props[fieldError] && (
          <label htmlFor={fieldName} className="errorColor mt1">
            {this.props[fieldError]}
          </label>
        )}
        {this.props[fieldInfo] && this.props.isRegistryEmail ? (
          <div className="pt2">
            <Notification
              status={fromPersonalInfo ? this.setStatus() : 'success'}
              content={this.props[fieldInfo]}
              hasCloseButton="true"
              hasStatusIcon="true"
              closeClick={this.closeClick}
            />
          </div>
        ) : (
          this.props[fieldInfo] && (
            <Paragraph className={classnames(styles.formInfoMsg)}>
              {this.props[fieldInfo]}
            </Paragraph>
          )
        )}
      </Cell>
    );
  }
}

RenderInput.propTypes = {
  fieldName: PropTypes.string,
  validation: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.string,
  type: PropTypes.string,
  updateState: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  afterValidation: PropTypes.func,
  disabled: PropTypes.bool,
  dataLocator: PropTypes.string,
  autocomplete: PropTypes.string,
  comparatorProp: PropTypes.object,
  isMobile: PropTypes.bool,
  isRegistryEmail: PropTypes.bool,
  ssTest: PropTypes.bool,
  focusShow: PropTypes.func,
  showNumericKeypadOnMobile: PropTypes.bool,
  fromPersonalInfo: PropTypes.bool,
};

export default RenderInput;
