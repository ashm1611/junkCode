import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { isBedBathCanada, getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell/Cell';
import GridX from '@bbb-app/core-ui/grid-x';
import RenderInput from './RenderInput';
import {
  checkForDisplay,
  checkForRequired,
  moveInAddressDataLocators,
  DATE_FORMAT,
  DATE_FORMAT_CA,
  FUTURE_SHIPPING_PAST_YEAR,
  FUTURE_SHIPPING_FUTURE_YEAR,
} from '../../CreateRegistryUtils';
import AddressInput from '../AddressInput/AddressInput';
import DateInput from './DateInput';
import {
  EDIT_MOVE_IN_ADDRESS_HEADING_LBL,
  EDIT_MOVE_IN_ADDRESS_SUBHEADING_LBL,
  APARTMENT_LBL,
  FUTURE_SHIPPING_DATE_BABY_LBL,
  FUTURE_SHIPPING_DATE_CANADA_LBL,
  FUTURE_SHIPPING_DATE_LBL,
} from './constants';

/**
 * Render Move in info component
 * @param {object} props
 */
export function futureShippingDateLabel(siteId) {
  if (siteId === 'Buybuybaby' || siteId === 'TBS_BuyBuyBaby') {
    return FUTURE_SHIPPING_DATE_BABY_LBL;
  } else if (siteId === 'BedbathCanada' || siteId === 'TBS_BedBathCanada') {
    return FUTURE_SHIPPING_DATE_CANADA_LBL;
  }
  return FUTURE_SHIPPING_DATE_LBL;
}
const MoveInInfo = props => {
  const {
    labels,
    registryInputFields,
    stateObj,
    updateState,
    registryConfig,
    channelType,
    atDateFlag,
  } = props;
  /* istanbul ignore next */
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
      moveInStreet: street,
      moveInStreetError: streetError,
      moveInAddressOne: addressOne,
      moveInAddressTwo: addressTwo,
      moveInApartment: addressTwo,
      moveInCity: city,
      moveInState: state,
      moveInZip: zip,
      qasMovingValidated: isQASValidated,
      isMovingSoonChanged: true,
    });
  };
  const siteId = getSiteId();
  const dataLabel = futureShippingDateLabel(siteId);
  return (
    <ErrorBoundary>
      {checkForDisplay(registryInputFields.futureShippingDate) && (
        <GridX>
          <Cell className={'large-6 small-12 pb2'}>
            <DateInput
              id="futureShippingDate"
              name="futureShippingDate"
              dateLabel={dataLabel}
              pastYearToDisplay={FUTURE_SHIPPING_PAST_YEAR}
              futureYearToDisplay={FUTURE_SHIPPING_FUTURE_YEAR}
              channelType={channelType}
              registryInputFields={registryInputFields}
              required
              format={isBedBathCanada() ? DATE_FORMAT_CA : DATE_FORMAT}
              dataLocator={'registry-futureshippingdate'}
              value={stateObj.futureShippingDate}
              updateState={updateState}
              futureShippingDateError={stateObj.futureShippingDateError}
              validation={
                isBedBathCanada()
                  ? 'futureShippingDateCA'
                  : 'futureShippingDate'
              }
              isMobile={props.isMobile}
              atDateFlag={atDateFlag}
            />
          </Cell>
        </GridX>
      )}
      {checkForDisplay(registryInputFields.showFutureShippingAddr) && (
        <GridX>
          <AddressInput
            fieldName="moveInStreet"
            validation="required"
            labels={labels}
            required={checkForRequired(
              registryInputFields.showFutureShippingAddr
            )}
            locator={moveInAddressDataLocators}
            streetError={
              stateObj.moveInStateError || stateObj.moveInStreetError
            }
            updateState={updateState}
            value={stateObj.moveInStreet}
            addressOne={stateObj.moveInAddressOne}
            addressTwo={stateObj.moveInApartment}
            zip={stateObj.moveInZip}
            registryConfig={registryConfig}
            city={stateObj.moveInCity}
            state={stateObj.moveInState}
            heading={EDIT_MOVE_IN_ADDRESS_HEADING_LBL}
            formHeading={EDIT_MOVE_IN_ADDRESS_SUBHEADING_LBL}
            handelAddressChange={updateAddress} // TODO: add method update state
            updateAddressModalQasVisibility={
              props.updateMovingAddressModalQasVisibility
            }
            addressQASModalState={props.addressMovingQASModalState}
            {...props}
          />
        </GridX>
      )}
      <GridX className={'grid-margin-x'}>
        {checkForDisplay(registryInputFields.showFutureShippingAddr) && (
          <RenderInput
            fieldName="moveInApartment"
            validation="apartment"
            label={APARTMENT_LBL}
            classes={`large-6 small-12`}
            type="text"
            dataLocator="registry-contactInfoApartment"
            moveInApartmentError={stateObj.moveInApartmentError}
            updateState={updateState}
            value={stateObj.moveInApartment}
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
MoveInInfo.propTypes = {
  labels: PropTypes.object,
  registryInputFields: PropTypes.object,
  updateState: PropTypes.func.isRequired,
  stateObj: PropTypes.object,
  registryConfig: PropTypes.object,
  updateMovingAddressModalQasVisibility: PropTypes.func,
  addressMovingQASModalState: PropTypes.bool,
  channelType: PropTypes.string,
  isMobile: PropTypes.bool,
  atDateFlag: PropTypes.bool,
};

export default MoveInInfo;
