import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '@bbb-app/forms/containers/FormInput/FormInput';

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  fieldName: PropTypes.string,
  identifier: PropTypes.string,
  formWrapperData: PropTypes.object,
  isRequired: PropTypes.bool,
  validation: PropTypes.string,
  maxLength: PropTypes.string,
};

/**
 * @property defaultProps
 * @description defining defaultProps of the component
 */
const defaultProps = {
  type: 'text',
  label: '',
  fieldName: '',
  identifier: '',
  isRequired: true,
  formWrapperData: {},
};

/**
 * render input element and related components
 * @param {*} fieldName  name of the field
 * @param {*} type type of input tag
 * @param {*} label label
 * @param {*} isRequired if field id required or not
 */
const WeddingBookFormElement = props => {
  const {
    fieldName,
    label,
    type,
    isRequired,
    identifier,
    formWrapperData,
    validation,
    maxLength,
  } = props;
  const fieldError = `${fieldName}Error`;
  return (
    <div className={`relative`}>
      <FormInput
        type={type}
        id={fieldName}
        name={fieldName}
        aria-label={`weddingBook-${fieldName}`}
        label={label}
        labelPosition="append"
        validation={validation}
        maxLength={maxLength}
        value={
          (formWrapperData[fieldName] && formWrapperData[fieldName].value) || ''
        }
        {...{
          [fieldError]:
            formWrapperData[fieldName] &&
            formWrapperData[fieldName][fieldError],
        }}
        isRequired={isRequired}
        identifier={identifier}
      />
    </div>
  );
};

WeddingBookFormElement.propTypes = propTypes;
WeddingBookFormElement.defaultProps = defaultProps;
export default WeddingBookFormElement;
