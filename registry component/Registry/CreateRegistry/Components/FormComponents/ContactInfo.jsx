import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading/Heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import styles from '../../CreateRegistryFormStyles.css';
import {
  checkForDisplay,
  checkForRequired,
  contactAddressDataLocators,
  eventTypeConst,
} from '../../CreateRegistryUtils';
import RenderInput from './RenderInput';
import ShippingInfo from './ShippingInfo';
import MoveInInfo from './MoveInInfo';
import AddressInput from '../AddressInput/AddressInput';
import {
  DIFF_ADDRESS_HEADING_LBL,
  MOVING_SOON_HEADING_LBL,
  MOVING_SOON_TEXT_LBL,
  EDIT_CONTACT_ADDRESS_HEADING_LBL,
  EDIT_CONTACT_ADDRESS_SUBHEADING_LBL,
  HIDE_DIFFERENT_ADDRESS_CONTENT_LBL,
  HIDE_MOVING_SOON_HEADING_LBL,
  APARTMENT_LBL,
  PHONE_LBL,
  MOBILE_LBL,
  DIFFERENT_ADDRESS_TEST_US_LBL,
  DIFFERENT_ADDRESS_TEST_LBL,
} from './constants';

const ContactInfo = ({
  labels,
  registryInputFields,
  updateState,
  stateObj,
  showShippingInfo,
  hideShippingInfo,
  showMoveInfo,
  hideMoveInfo,
  registryConfig,
  dataLocator,
  eventType,
  flagOptional,
  editWedRegistry,
  isBabyRegistry,
  isCABabyRegistry,
  ...props
}) => {
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
    if (stateObj.showShippingInfo) {
      updateState({
        street,
        streetError,
        addressOne,
        addressTwo,
        city,
        state,
        zip,
        apartment: addressTwo,
        qasContactValidated: isQASValidated,
        currentAddress: street,
        isContactAddressChanged: true,
      });
    } else {
      updateState({
        street,
        streetError,
        addressOne,
        addressTwo,
        city,
        state,
        zip,
        apartment: addressTwo,
        shippingStreet: street,
        shippingStreetError: streetError,
        shippingAddressOne: addressOne,
        shippingAddressTwo: addressTwo,
        shippingCity: city,
        shippingState: state,
        shippingZip: zip,
        shippingApartment: addressTwo,
        qasContactValidated: isQASValidated,
        qasShippingValidated: isQASValidated,
        currentAddress: street,
        isContactAddressChanged: true,
      });
    }
  };
  /* istanbul ignore next */
  const checkAndUpdateAptState = value => {
    const updatedValue = Object.assign({}, value);
    if (!stateObj.showShippingInfo) {
      updatedValue.shippingApartment = value.apartment;
    }
    updateState(updatedValue);
  };
  const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
  const weddingRegistryWithoutEdit = isWeddingRegistry && !editWedRegistry;
  const otherRegistryWithWedEdit = !isWeddingRegistry || editWedRegistry;
  const siteId = getSiteId();
  return (
    <ErrorBoundary>
      {checkForDisplay(registryInputFields.showContactAddress) && (
        <GridX className={'grid-margin-x'}>
          <AddressInput
            fieldName="street"
            validation="required"
            labels={labels.createRegistry}
            required={checkForRequired(registryInputFields.showContactAddress)}
            locator={contactAddressDataLocators}
            streetError={stateObj.stateError || stateObj.streetError}
            updateState={updateState}
            value={stateObj.street}
            registryConfig={registryConfig}
            addressOne={stateObj.addressOne}
            addressTwo={stateObj.apartment}
            zip={stateObj.zip}
            city={stateObj.city}
            state={stateObj.state}
            heading={EDIT_CONTACT_ADDRESS_HEADING_LBL}
            formHeading={EDIT_CONTACT_ADDRESS_SUBHEADING_LBL}
            handelAddressChange={updateAddress}
            updateAddressModalQasVisibility={
              props.updateContactAddressModalQasVisibility
            }
            addressQASModalState={props.addressContactQASModalState}
            isBabyRegistry={isBabyRegistry}
            isCABabyRegistry={isCABabyRegistry}
            {...props}
          />
        </GridX>
      )}
      <GridX className={'grid-margin-x'}>
        {checkForDisplay(registryInputFields.showContactAddress) && (
          <RenderInput
            fieldName="apartment"
            validation="apartment"
            label={APARTMENT_LBL}
            classes={
              weddingRegistryWithoutEdit || isBabyRegistry || isCABabyRegistry
                ? `large-12 small-12`
                : `large-6 small-12`
            }
            type="text"
            dataLocator={dataLocator.registryAptNo}
            apartmentError={stateObj.apartmentError}
            updateState={checkAndUpdateAptState}
            value={stateObj.apartment}
            maxLength={30}
          />
        )}
        {checkForDisplay(registryInputFields.PhoneNumber) && (
          <RenderInput
            fieldName="primaryPh"
            validation="mobilePhRegistry"
            label={PHONE_LBL}
            classes={
              weddingRegistryWithoutEdit || isBabyRegistry || isCABabyRegistry
                ? `large-12 small-12`
                : `large-6 small-12`
            }
            type="tel"
            required={checkForRequired(registryInputFields.PhoneNumber)}
            dataLocator={dataLocator.registryPhoneNumber}
            primaryPhError={stateObj.primaryPhError}
            updateState={updateState}
            value={stateObj.primaryPh ? stateObj.primaryPh : ''}
            maxLength={10}
          />
        )}
      </GridX>
      {!flagOptional &&
        eventType !== eventTypeConst.BABY &&
        eventType !== eventTypeConst.COLLEGE &&
        mobileField({
          registryInputFields,
          updateState,
          stateObj,
          dataLocator,
        })}
      {!isBabyRegistry &&
        !isWeddingRegistry &&
        eventType === eventTypeConst.COLLEGE &&
        mobileField({
          registryInputFields,
          updateState,
          stateObj,
          dataLocator,
        })}
      {otherRegistryWithWedEdit &&
        !isBabyRegistry &&
        !isCABabyRegistry &&
        checkForDisplay(registryInputFields.showShippingAddress) && (
          <GridX className={'pb1'}>
            <Cell className={'large-12 small-12'}>
              {!stateObj.showShippingInfo && (
                <Button
                  theme={'link'}
                  variation="beaconBlue"
                  className={classnames('mb1', styles.fieldsLink)}
                  data-locator={dataLocator.registryDifferentAddLink}
                  onClick={e => showShippingInfo(e)}
                >
                  {DIFF_ADDRESS_HEADING_LBL}
                </Button>
              )}
              {stateObj.showShippingInfo && (
                <Heading
                  level={3}
                  className={classnames(styles.addressSubHeading, 'mb1')}
                >
                  {DIFF_ADDRESS_HEADING_LBL}
                </Heading>
              )}
              <Paragraph className={classnames('mt0 mb0', styles.formText)}>
                {siteId === 'BedBathUS' || siteId === 'TBS_BedBathUS'
                  ? DIFFERENT_ADDRESS_TEST_US_LBL
                  : DIFFERENT_ADDRESS_TEST_LBL}
              </Paragraph>
            </Cell>
            {stateObj.showShippingInfo && (
              <Cell>
                <Button
                  theme={'link'}
                  variation="beaconBlue"
                  onClick={e => hideShippingInfo(e)}
                  className={classnames('mb2 left-align hideShippingButton')}
                >
                  {HIDE_DIFFERENT_ADDRESS_CONTENT_LBL}
                </Button>
                <ShippingInfo
                  labels={labels.createRegistry}
                  registryInputFields={registryInputFields}
                  stateObj={stateObj}
                  updateState={updateState}
                  registryConfig={registryConfig}
                  {...props}
                />
              </Cell>
            )}
          </GridX>
        )}
      {otherRegistryWithWedEdit &&
        !isBabyRegistry &&
        !isCABabyRegistry &&
        checkForDisplay(registryInputFields.showFutureShippingAddr) && (
          <GridX className={'pb1'}>
            <Cell className={classnames('large-12 small-12')}>
              {!stateObj.showMoveInInfo && (
                <Button
                  theme={'link'}
                  variation="beaconBlue"
                  className={classnames('mb1', styles.fieldsLink)}
                  data-locator={dataLocator.registryMovingSoonLink}
                  onClick={e => showMoveInfo(e)}
                >
                  {MOVING_SOON_HEADING_LBL}
                </Button>
              )}
              {stateObj.showMoveInInfo && (
                <Heading
                  level={1}
                  className={classnames(styles.addressSubHeading, 'mb1')}
                >
                  {MOVING_SOON_HEADING_LBL}
                </Heading>
              )}
              <Paragraph className={classnames('mt0 mb0', styles.formText)}>
                {MOVING_SOON_TEXT_LBL}
              </Paragraph>
            </Cell>
            {stateObj.showMoveInInfo && (
              <Cell>
                <Button
                  theme={'link'}
                  variation="beaconBlue"
                  onClick={e => hideMoveInfo(e)}
                  className={classnames('mb2 hideMovingButton')}
                >
                  {HIDE_MOVING_SOON_HEADING_LBL}
                </Button>
                <MoveInInfo
                  labels={labels.createRegistry}
                  registryInputFields={registryInputFields}
                  stateObj={stateObj}
                  updateState={updateState}
                  registryConfig={registryConfig}
                  {...props}
                />
              </Cell>
            )}
          </GridX>
        )}
    </ErrorBoundary>
  );
};
const mobileField = ({
  registryInputFields,
  dataLocator,
  stateObj,
  updateState,
}) => {
  if (checkForDisplay(registryInputFields.MobileNumber)) {
    return (
      <GridX className={'grid-margin-x'}>
        <RenderInput
          fieldName="mobilePh"
          validation="mobilePhRegistry"
          label={MOBILE_LBL}
          classes={`large-6 small-12`}
          type="tel"
          required={checkForRequired(registryInputFields.MobileNumber)}
          dataLocator={dataLocator.registryContactInfoMobile}
          mobilePhError={stateObj.mobilePhError}
          updateState={updateState}
          value={stateObj.mobilePh ? stateObj.mobilePh : ''}
          maxLength={10}
        />
      </GridX>
    );
  }
  return '';
};
/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {object} registryInputFields
 * @param {function} updateState
 * @param {object} stateObj [state Object]
 * @param {string} eventType
 * @param {function} showShippingInfo
 * @param {function} hideShippingInfo
 * @param {function} showMoveInfo
 * @param {function} hideMoveInfo
 */
ContactInfo.propTypes = {
  labels: PropTypes.object,
  registryInputFields: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  stateObj: PropTypes.object,
  showShippingInfo: PropTypes.func,
  hideShippingInfo: PropTypes.func,
  showMoveInfo: PropTypes.func,
  hideMoveInfo: PropTypes.func,
  registryConfig: PropTypes.object,
  dataLocator: PropTypes.object,
  updateContactAddressModalQasVisibility: PropTypes.func,
  addressContactQASModalState: PropTypes.bool,
  eventType: PropTypes.string,
  flagOptional: PropTypes.bool,
  editWedRegistry: PropTypes.bool,
  isBabyRegistry: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
};
mobileField.propTypes = {
  registryInputFields: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  stateObj: PropTypes.object,
  dataLocator: PropTypes.object,
};

export default ContactInfo;
