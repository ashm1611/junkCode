import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import GridX from '@bbb-app/core-ui/grid-x';
import RenderInput from './RenderInput';
import {
  checkForDisplay,
  checkForRequired,
  shippingAddressDataLocators,
} from '../../CreateRegistryUtils';
import AddressInput from '../AddressInput/AddressInput';
import {
  EDIT_SHIPPING_ADDRESS_HEADING_LBL,
  EDIT_SHIPPING_ADDRESS_SUBHEADING_LBL,
  APARTMENT_LBL,
} from './constants';

/**
 * Render shipping info component
 * @param {object} props
 */
const ShippingInfo = props => {
  const {
    labels,
    registryInputFields,
    stateObj,
    updateState,
    registryConfig,
  } = props;

  const updateAddress = ({
    street,
    streetError,
    addressOne,
    addressTwo,
    city,
    state,
    zip,
    isQASValidated,
  }) => {
    updateState({
      shippingStreet: street,
      shippingStreetError: streetError,
      shippingAddressOne: addressOne,
      shippingAddressTwo: addressTwo,
      shippingApartment: addressTwo,
      shippingCity: city,
      shippingState: state,
      shippingZip: zip,
      qasShippingValidated: isQASValidated,
      isShippingAddressChanged: true,
    });
  };
  return (
    <ErrorBoundary>
      {checkForDisplay(registryInputFields.showShippingAddress) && (
        <GridX className={'grid-margin-x'}>
          <AddressInput
            fieldName="shippingStreet"
            validation="required"
            labels={labels}
            required={checkForRequired(registryInputFields.showShippingAddress)}
            locator={shippingAddressDataLocators}
            streetError={
              stateObj.shippingStateError || stateObj.shippingStreetError
            }
            updateState={updateState}
            value={stateObj.shippingStreet}
            addressOne={stateObj.shippingAddressOne}
            addressTwo={stateObj.shippingApartment}
            zip={stateObj.shippingZip}
            registryConfig={registryConfig}
            city={stateObj.shippingCity}
            state={stateObj.shippingState}
            heading={EDIT_SHIPPING_ADDRESS_HEADING_LBL}
            formHeading={EDIT_SHIPPING_ADDRESS_SUBHEADING_LBL}
            handelAddressChange={updateAddress}
            updateAddressModalQasVisibility={
              props.updateShippingAddressModalQasVisibility
            }
            addressQASModalState={props.addressShippingQASModalState}
            {...props}
          />
        </GridX>
      )}
      <GridX className={'grid-margin-x'}>
        {checkForDisplay(registryInputFields.showShippingAddress) && (
          <RenderInput
            fieldName="shippingApartment"
            validation="apartment"
            label={APARTMENT_LBL}
            classes={`large-6 small-12`}
            type="text"
            locator="registry-contactInfoApartment"
            shippingApartmentError={stateObj.shippingApartmentError}
            updateState={updateState}
            value={stateObj.shippingApartment}
          />
        )}
      </GridX>
    </ErrorBoundary>
  );
};

/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {object} registryInputFields
 * @param {function} updateState
 * @param {object} stateObj [state Object]
 */
ShippingInfo.propTypes = {
  labels: PropTypes.object,
  registryInputFields: PropTypes.object,
  updateState: PropTypes.func.isRequired,
  stateObj: PropTypes.object,
  registryConfig: PropTypes.object,
  updateShippingAddressModalQasVisibility: PropTypes.func,
  addressShippingQASModalState: PropTypes.bool,
};

export default ShippingInfo;
