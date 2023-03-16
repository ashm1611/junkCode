import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Heading from '@bbb-app/core-ui/heading';
import { isBedBathCanada, getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import '@bbb-app/assets/icons/infoIcon.svg';
import RenderInput from './RenderInput';
import styles from '../../CreateRegistryFormStyles.css';
import CoRegistrantEmail from './CoRegistrantEmail';
import {
  checkForDisplay,
  checkForRequired,
  DATE_FORMAT,
  DATE_FORMAT_CA,
  PAST_YEAR_TO_DISPLAY,
  FUTURE_YEAR_TO_DISPLAY,
  eventTypeConst,
} from '../../CreateRegistryUtils';
import DateInput from './DateInput';
import renderFavouriteStoreInfo from '../CreateRegistryUtilComponents/renderFavouriteStoreInfo';
import {
  COREGISTRANT_INFO_LBL,
  GUEST_APPROXIMATE_LBL,
  SHOWER_DATE_LBL,
  NURSERY_DECOR_LBL,
  FIRST_NAME_LBL,
  LAST_NAME_LBL,
  MOBILE_LBL,
  CO_REGISTRANT_INFO_TOOL_TIP_LBL,
  CO_REGISTRANT_INFO_TOOL_TIP_BABY_LBL,
  CO_REGISTRANT_INFO_TOOL_TIP_BABY_CANADA_LBL,
} from './constants';

const renderFirstName = (
  registryInputFields,
  updateState,
  stateObj,
  dataLocator
) => (
  <RenderInput
    id="coFirstName"
    name="coFirstName"
    fieldName="coFirstName"
    validation="registrationFirstName"
    label={FIRST_NAME_LBL}
    type="text"
    required={
      checkForRequired(registryInputFields.CoRegistrantFirstName) ||
      stateObj.coLastName.length > 0
    }
    dataLocator={dataLocator.registrycoFirstName}
    value={stateObj.coFirstName}
    updateState={updateState}
    maxLength={30}
    coFirstNameError={stateObj.coFirstNameError}
  />
);

const renderLastName = (
  registryInputFields,
  updateState,
  stateObj,
  dataLocator
) => (
  <RenderInput
    id="coLastName"
    name="coLastName"
    fieldName="coLastName"
    validation="lastName"
    required={
      checkForRequired(registryInputFields.CoRegistrantLastName) ||
      stateObj.coFirstName.length > 0
    }
    label={LAST_NAME_LBL}
    labelPosition="append"
    dataLocator={dataLocator.registrycoLastName}
    value={stateObj.coLastName}
    updateState={updateState}
    maxLength={30}
    coLastNameError={stateObj.coLastNameError}
  />
);

const renderEmail = props => {
  const {
    labels,
    registryInputFields,
    updateState,
    stateObj,
    fetchCoRegistrantProfileStatus,
    referredContent,
    coRegProfileStatus,
    resetCoRegistrantProfileStatus,
    dataLocator,
    isMobile,
    coRegEmailFlag,
    atDateFlag,
    globalSwitchConfig,
  } = props;
  return (
    <CoRegistrantEmail
      labels={labels}
      registryInputFields={registryInputFields}
      updateState={updateState}
      stateObj={stateObj}
      fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
      referredContent={referredContent}
      coRegProfileStatus={coRegProfileStatus}
      resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
      dataLocator={dataLocator}
      isMobile={isMobile}
      coRegEmailFlag={coRegEmailFlag}
      atDateFlag={atDateFlag}
      globalSwitchConfig={globalSwitchConfig}
    />
  );
};
export function CoRegistrantInfoToolTipLabel(siteId) {
  if (siteId === 'Buybuybaby' || siteId === 'TBS_BuyBuyBaby') {
    return CO_REGISTRANT_INFO_TOOL_TIP_BABY_LBL;
  } else if (siteId === 'BedbathCanada' || siteId === 'TBS_BedBathCanada') {
    return CO_REGISTRANT_INFO_TOOL_TIP_BABY_CANADA_LBL;
  }
  return CO_REGISTRANT_INFO_TOOL_TIP_LBL;
}
const OptionalInfo = props => {
  const {
    registryInputFields,
    updateState,
    stateObj,
    dataLocator,
    channelType,
    currentAddress,
    profileAddress,
    defaultStoreId,
    eventType,
    isMobile,
  } = props;
  const siteId = getSiteId();
  const dataToolTip = CoRegistrantInfoToolTipLabel(siteId);
  return (
    <div>
      {eventType === eventTypeConst.BABY && (
        <fieldset>
          <legend className={styles.formLegend}>
            <Heading level={6}>
              {COREGISTRANT_INFO_LBL}{' '}
              <Button
                data-tooltip={dataToolTip}
                className="tooltip-bottom"
                theme="ghost"
                variation="noPadding"
                iconProps={{
                  type: 'infoIcon',
                  height: '12px',
                  width: '12px',
                }}
              />
            </Heading>
          </legend>

          <GridX className={'grid-margin-x'}>
            {checkForDisplay(registryInputFields.CoRegistrantFirstName) && (
              <Cell className={classnames('large-6 small-12')}>
                {renderFirstName(
                  registryInputFields,
                  updateState,
                  stateObj,
                  dataLocator
                )}
              </Cell>
            )}
            {checkForDisplay(registryInputFields.CoRegistrantLastName) && (
              <Cell className={classnames('large-6 small-12')}>
                {renderLastName(
                  registryInputFields,
                  updateState,
                  stateObj,
                  dataLocator
                )}
              </Cell>
            )}

            <Cell className="small-12 large-6 ">
              <GridX>
                {checkForDisplay(registryInputFields.CoRegistrantEmail) && (
                  <Cell className={classnames('small-12')}>
                    {renderEmail(props)}
                  </Cell>
                )}
                {checkForDisplay(registryInputFields.showerDate) && (
                  <Cell className={classnames('small-12 mb2')}>
                    <DateInput
                      id="showerDate"
                      name="showerDate"
                      fieldName="showerDate"
                      dateLabel={SHOWER_DATE_LBL}
                      registryInputFields={registryInputFields}
                      required={checkForRequired(
                        registryInputFields.showerDate
                      )}
                      format={isBedBathCanada() ? DATE_FORMAT_CA : DATE_FORMAT}
                      dataLocator={dataLocator.registryShowerDateLink}
                      pastYearToDisplay={PAST_YEAR_TO_DISPLAY}
                      futureYearToDisplay={FUTURE_YEAR_TO_DISPLAY}
                      value={stateObj.showerDate}
                      updateState={updateState}
                      showerDateError={stateObj.showerDateError}
                      validation={
                        isBedBathCanada() ? 'eventDateCanada' : 'eventDate'
                      }
                      channelType={channelType}
                      isMobile={props.isMobile}
                    />
                  </Cell>
                )}
                {checkForDisplay(registryInputFields.nurseryTheme) && (
                  <Cell className={classnames('small-12 pb2')}>
                    <RenderInput
                      id="babyNurseryTheme"
                      name="babyNurseryTheme"
                      fieldName="babyNurseryTheme"
                      required={checkForRequired(
                        registryInputFields.nurseryTheme
                      )}
                      label={NURSERY_DECOR_LBL}
                      labelPosition="append"
                      dataLocator={dataLocator.registryNurseryDecorTheme}
                      value={stateObj.babyNurseryTheme}
                      updateState={updateState}
                    />
                  </Cell>
                )}
              </GridX>
            </Cell>
          </GridX>
          {checkForDisplay(registryInputFields.favoriteStore) &&
            renderFavouriteStoreInfo({
              updateState,
              stateObj,
              dataLocator,
              currentAddress,
              profileAddress,
              defaultStoreId,
            })}
        </fieldset>
      )}
      {eventType !== eventTypeConst.BABY && (
        <fieldset>
          <GridX className={'grid-margin-x'}>
            <Cell>
              {checkForDisplay(registryInputFields.CoRegistrantEmail) && (
                <Cell className={classnames('small-12')}>
                  {renderEmail(props)}
                </Cell>
              )}
              {checkForDisplay(registryInputFields.numberOfGuests) && (
                <GridX className={'grid-margin-x'}>
                  <RenderInput
                    fieldName="guests"
                    validation="guestNumber"
                    label={GUEST_APPROXIMATE_LBL}
                    classes={`large-6 small-12`}
                    type="number"
                    required={checkForRequired(
                      registryInputFields.numberOfGuests
                    )}
                    dataLocator={dataLocator.registryGuestsField}
                    guestsError={stateObj.guestsError}
                    updateState={updateState}
                    value={stateObj.guests}
                    showNumericKeypadOnMobile={isMobile && true}
                  />
                  {checkForDisplay(registryInputFields.MobileNumber) && (
                    <RenderInput
                      fieldName="mobilePh"
                      validation="mobilePhRegistry"
                      label={MOBILE_LBL}
                      classes={`large-6 small-12`}
                      type="tel"
                      required={checkForRequired(
                        registryInputFields.MobileNumber
                      )}
                      dataLocator={dataLocator.registryContactInfoMobile}
                      mobilePhError={stateObj.mobilePhError}
                      updateState={updateState}
                      value={stateObj.mobilePh ? stateObj.mobilePh : ''}
                      maxLength={10}
                    />
                  )}
                </GridX>
              )}
            </Cell>
          </GridX>
          {checkForDisplay(registryInputFields.favoriteStore) &&
            renderFavouriteStoreInfo({
              updateState,
              stateObj,
              dataLocator,
              currentAddress,
              profileAddress,
              defaultStoreId,
            })}
        </fieldset>
      )}
    </div>
  );
};

OptionalInfo.propTypes = {
  registryInputFields: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  stateObj: PropTypes.object.isRequired,
  dataLocator: PropTypes.object,
  channelType: PropTypes.bool,
  currentAddress: PropTypes.string,
  profileAddress: PropTypes.string,
  defaultStoreId: PropTypes.string,
  isMobile: PropTypes.bool,
  eventType: PropTypes.string,
};

renderEmail.propTypes = {
  labels: PropTypes.object,
  registryInputFields: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  stateObj: PropTypes.object.isRequired,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  referredContent: PropTypes.object,
  coRegProfileStatus: PropTypes.object,
  resetCoRegistrantProfileStatus: PropTypes.func,
  dataLocator: PropTypes.object,
  isMobile: PropTypes.bool,
  coRegEmailFlag: PropTypes.func,
  atDateFlag: PropTypes.bool,
  globalSwitchConfig: PropTypes.object,
};

export default OptionalInfo;
