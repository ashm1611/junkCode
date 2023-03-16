import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import { isTouchDevice } from '@bbb-app/utils/common';
import { validateChange } from '@bbb-app/forms/validations/validator';
import DatePicker from '@bbb-app/date-picker/components/DatePicker';
import styles from '../../CreateRegistryFormStyles.css';
import { focusableElement } from './constants';
class DateInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleDateValidation = this.handleDateValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const { setFocusOnNextElement } = this.props;
    const isTabPressesed = e.keyCode === 9 && !e.shiftKey; // checking for shift key as we don't want to call login if shift + tab is pressed
    if (setFocusOnNextElement && isTabPressesed) {
      this.focusNextElement();
    }
  }

  focusNextElement() {
    const containerId = document.getElementsByName('editRegistry')[0];
    const focusable =
      containerId && containerId.querySelectorAll(focusableElement);
    const focusableArray = Array.prototype.slice.call(focusable);
    let secondLastIndexOfDatePickerComponet;
    focusableArray.some((element, index) => {
      secondLastIndexOfDatePickerComponet = index;
      return element.classList.contains('datePickerNextBtn');
    });
    const nextFocusable = focusable[secondLastIndexOfDatePickerComponet + 2];
    /* istanbul ignore next */
    setTimeoutCustom(() => {
      nextFocusable.focus();
    }, 200);
  }

  handleDateValidation = e => {
    let value;
    const { name, validation, required, updateState } = this.props;

    const errorKey = `${name}Error`;
    if (typeof e === 'string') {
      value = e;
    } else if (typeof e === 'object') {
      value = e.target.value;
    }
    if (required || value.length) {
      const returnValue = validateChange(name, value, validation);
      updateState({
        [errorKey]: returnValue[errorKey],
      });
    }
  };

  handleChange = e => {
    const value = e.target.value;
    this.props.updateState({ [this.props.name]: value });
    if (e.target.value.length >= 9) {
      this.handleDateValidation(e, this.props.format);
    }
  };

  handleBlurEvent = e => {
    let value;
    if (typeof e === 'string') {
      value = e;
    } else if (typeof e === 'object') {
      value = e.target.value;
    }
    this.handleDateValidation(value, this.props.format);
  };

  handleDayChange = value => {
    this.props.updateState({ [this.props.name]: value });
    if (value.length >= 9) {
      this.handleDateValidation(value, this.props.format);
    }
    if (this.props.setFocusOnNextElement) {
      this.focusNextElement();
    }
  };

  render() {
    const {
      required,
      id,
      name,
      format,
      dataLocator,
      dateLabel,
      atDateFlag,
      isMobile,
      autocomplete,
    } = this.props;
    const idError = `${id}Error`;
    const errorClass = this.props[idError] ? `${styles.formError}` : '';
    return (
      <ErrorBoundary>
        <DatePicker
          id={id}
          name={name}
          className={classnames(errorClass, {
            [styles.dateInputStyle]: !atDateFlag && isMobile && isTouchDevice(),
          })}
          label={dateLabel}
          required={required}
          pastYearToDisplay={this.props.pastYearToDisplay}
          futureYearToDisplay={this.props.futureYearToDisplay}
          hideOnDayClick
          format={format}
          isNative={!atDateFlag && isMobile && isTouchDevice()}
          value={this.props.value}
          onDayChange={this.handleDayChange}
          inputProps={{
            'data-locator': dataLocator,
            onChange: this.handleChange,
            onBlur: this.handleBlurEvent,
            className: errorClass,
            onKeyDown: this.onKeyDown,
          }}
          dayPickerProps={this.props.dayPickerProps}
          autocomplete={autocomplete}
          fromRegistry
          isNewCalender={this.props.isNewCalender}
        />
        {this.props[idError] && (
          <label htmlFor={name} className="errorColor mt1 mb0">
            {this.props[idError]}
          </label>
        )}
      </ErrorBoundary>
    );
  }
}

DateInput.propTypes = {
  dateLabel: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  format: PropTypes.string,
  name: PropTypes.string,
  dataLocator: PropTypes.string,
  pastYearToDisplay: PropTypes.number,
  futureYearToDisplay: PropTypes.number,
  value: PropTypes.string,
  updateState: PropTypes.func,
  dayPickerProps: PropTypes.object,
  validation: PropTypes.string,
  atDateFlag: PropTypes.object,
  isMobile: PropTypes.bool,
  setFocusOnNextElement: PropTypes.bool,
  autocomplete: PropTypes.string,
  isNewCalender: PropTypes.bool,
};

export default DateInput;
