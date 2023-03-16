/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getSiteId } from '@bbb-app/utils/common';
import Heading from '@bbb-app/core-ui/heading';
import Accordion from '@bbb-app/core-ui/accordion/Accordion';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import SocialSignin from '@bbb-app/social-signin/containers/SocialSignin.async';
import '@bbb-app/assets/icons/infoIcon.svg';
import '@bbb-app/assets/icons/minus.svg';
import '@bbb-app/assets/icons/plus.svg';
import '@bbb-app/assets/icons/packandhold.svg';
import { eventTypeConst, checkForDisplay } from './../../CreateRegistryUtils';
import PersonalInfo from './../FormComponents/PersonalInfo';
import ContactInfo from '../FormComponents/ContactInfo';
import EventInfo from '../FormComponents/EventInfo';
import NetworkInfo from '../FormComponents/NetworkInfo';
import {
  CONTACT_INFO_HEADING_CANADA_LBL,
  CONTACT_INFO_HEADING_LBL,
} from '../FormComponents/constants';
import styles from './../../CreateRegistryFormStyles.css';
import OptionalInfo from '../FormComponents/OptionalInfo';
import {
  PERSONAL_INFO_HEADING_WEDDING_LBL,
  PERSONAL_INFO_HEADING_OTHERS_LBL,
  EVENT_INFO_HEADING_LBL,
  PERSONAL_INFO_HEADING_TOOLTIP_LBL,
  BABY_OPTIONAL_INFO_HEADING_LBL,
  EVENT_COLLEGE_INFO_HEADING_LBL,
} from './constants';

export const renderPersonalInfo = props => {
  const {
    labels,
    registryInputs,
    updateState,
    passwordErrorPresent,
    updatePasswordData,
    personalisedLables,
    stateObj,
    listenProfileStatusChange,
    fetchCoRegistrantProfileStatus,
    referredContent,
    coRegProfileStatus,
    resetCoRegistrantProfileStatus,
    dataLocator,
    isMobile,
    profileData,
    confirmPasswordError,
    passwordError,
    setPassWordComError,
    submitState,
    formWrapperDataRegisterOrLogin,
    formWrapperIdentifierRegisterOrLogin,
    addFormField,
    deviceConfig,
    globalSwitchConfig,
    reCaptchaActivationCount,
    pageConfigGlobal,
    registryConfig,
    flagOptional,
    isEmailVerReqSisterSite,
    resetProfileHardLockedState,
    isBabyRegistry,
    isCABabyRegistry,
    enableNewSignUp,
  } = props;
  const personalInfoHeading =
    registryInputs.eventType === eventTypeConst.WEDDING
      ? PERSONAL_INFO_HEADING_WEDDING_LBL
      : PERSONAL_INFO_HEADING_OTHERS_LBL;
  const isWeddingRegistry = registryInputs.eventType === eventTypeConst.WEDDING;
  const renderStyle = () => {
    let formRenderStyle;
    if (isBabyRegistry) {
      formRenderStyle = styles.pInfofieldsHeadingBaby;
    } else if (isWeddingRegistry || isCABabyRegistry) {
      formRenderStyle = styles.weddingFieldsLabel;
    } else {
      formRenderStyle = styles.fieldsHeading;
    }
    return formRenderStyle;
  };
  return (
    <div className={styles.fieldsContainer}>
      <fieldset>
        <GridX>
          <legend className={styles.formLegend}>
            {registryInputs.eventType === eventTypeConst.COLLEGE && (
              <div className={styles.packHoldDiv}>
                <Icon
                  type="packandhold"
                  height="46px"
                  width="42px"
                  className="mr2"
                />
                <h2>
                  If you are shopping for college use our{' '}
                  <Button
                    theme="link"
                    id="collegePackHold"
                    href={`/store/static/pack-and-hold`}
                    variation="beaconBlue"
                  >
                    pack & hold
                  </Button>{' '}
                  service
                </h2>
              </div>
            )}
            <div className={styles.iconContainer}>
              <Heading
                level={2}
                className={classnames(renderStyle())}
                data-locator={'registry-luckycouplelabel'}
              >
                {personalInfoHeading}
                {!isWeddingRegistry && !isBabyRegistry && !isCABabyRegistry && (
                  <Button
                    className={classnames(styles.iconStyle, 'tooltip-bottom')}
                    data-tooltip={PERSONAL_INFO_HEADING_TOOLTIP_LBL}
                    theme="ghost"
                    variation="noPadding"
                    iconProps={{
                      type: 'infoIcon',
                      height: '14px',
                      width: '14px',
                    }}
                    aria-label={PERSONAL_INFO_HEADING_TOOLTIP_LBL}
                  />
                )}
              </Heading>
            </div>
            {isUserLoggedIn() ? (
              ''
            ) : (
              <div className={styles.socialBtn}>
                <SocialSignin dividerIsBelow />
              </div>
            )}
          </legend>
        </GridX>
        <PersonalInfo
          registryInputFields={registryInputs.registryInputMap}
          eventType={registryInputs.eventType}
          paragraphStyle={styles.paragraphStyle}
          labels={labels}
          stateObj={stateObj}
          listenProfileStatusChange={listenProfileStatusChange}
          updateState={updateState}
          passwordErrorPresent={passwordErrorPresent}
          updatePasswordData={updatePasswordData}
          personalisedLables={personalisedLables}
          fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
          referredContent={referredContent}
          coRegProfileStatus={coRegProfileStatus}
          resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
          dataLocator={dataLocator}
          isMobile={isMobile}
          profileData={profileData}
          confirmPasswordError={confirmPasswordError}
          passwordError={passwordError}
          setPassWordComError={setPassWordComError}
          submitState={submitState}
          formWrapperData={formWrapperDataRegisterOrLogin}
          formWrapperIdentifier={formWrapperIdentifierRegisterOrLogin}
          addFormField={addFormField}
          deviceConfig={deviceConfig}
          reCaptchaActivationCount={reCaptchaActivationCount}
          globalSwitchConfig={globalSwitchConfig}
          pageConfigGlobal={pageConfigGlobal}
          registryConfig={registryConfig}
          flagOptional={flagOptional}
          fromCreateRegistryUtil
          isEmailVerReqSisterSite={isEmailVerReqSisterSite}
          resetProfileHardLockedState={resetProfileHardLockedState}
          isBabyRegistry={isBabyRegistry}
          isCABabyRegistry={isCABabyRegistry}
          enableNewSignUp={enableNewSignUp}
        />
      </fieldset>
    </div>
  );
};

export const renderOptionalInfo = props => {
  const {
    labels,
    registryInputs,
    updateState,
    stateObj,
    fetchCoRegistrantProfileStatus,
    referredContent,
    coRegProfileStatus,
    resetCoRegistrantProfileStatus,
    dataLocator,
    channelType,
    currentAddress,
    profileAddress,
    isMobile,
    pageConfigGlobal,
    atDateFlag,
    globalSwitchConfig,
  } = props;
  return (
    <div className={styles.fieldsContainer}>
      <Accordion
        accordion
        showExpandCollapseIcon={false}
        expandCollapseIconPos="right"
        expandCollapseIcons={{
          expand: (
            <Icon
              type="plus"
              width="16px"
              height="16px"
              className={styles.accordianIconStyle}
            />
          ),
          collapse: (
            <Icon
              type="minus"
              width="16px"
              height="16px"
              className={styles.accordianIconStyle}
            />
          ),
        }}
        data={[
          {
            title: (
              <div className={styles.challengeQHeading}>
                {BABY_OPTIONAL_INFO_HEADING_LBL}
              </div>
            ),
            body: (
              <OptionalInfo
                registryInputFields={registryInputs.registryInputMap}
                eventType={registryInputs.eventType}
                paragraphStyle={styles.paragraphStyle}
                labels={labels}
                stateObj={stateObj}
                updateState={updateState}
                fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
                referredContent={referredContent}
                coRegProfileStatus={coRegProfileStatus}
                resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
                dataLocator={dataLocator}
                channelType={channelType}
                currentAddress={currentAddress}
                profileAddress={profileAddress}
                isMobile={isMobile}
                pageConfigGlobal={pageConfigGlobal}
                atDateFlag={atDateFlag}
                globalSwitchConfig={globalSwitchConfig}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export const renderNetworkInfo = props => {
  const {
    registryInputs,
    eventType,
    stateObj,
    onSelectSubscribe,
    handleSignSisterSite,
    onSelectThirdPartyOption,
    registryConfig,
    dataLocator,
    fromCreateRegistryPage,
    isCABabyRegistry,
  } = props;
  const isWeddingRegistry = registryInputs.eventType === eventTypeConst.WEDDING;
  return (
    <div
      className={classnames(
        isWeddingRegistry ? styles.weddingEmailCheckBox : styles.fieldsContainer
      )}
    >
      {checkForDisplay(registryInputs.registryInputMap.networkAffiliation) && (
        <NetworkInfo
          registryInputFields={registryInputs.registryInputMap}
          eventType={eventType}
          onSelectSubscribe={onSelectSubscribe}
          handleSignSisterSite={handleSignSisterSite}
          emailOptInSharedSite1={stateObj.emailOptInSharedSite1}
          emailOptInSharedSite2={stateObj.emailOptInSharedSite2}
          onSelectThirdPartyOption={onSelectThirdPartyOption}
          thirdPartySelected={stateObj.thirdPartySelected}
          subscribeSelected={stateObj.subscribeSelected}
          registryConfig={registryConfig}
          dataLocator={dataLocator}
          fromCreateRegistryPage={fromCreateRegistryPage}
          isCABabyRegistry={isCABabyRegistry}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line max-params
export const renderEventInfo = (
  labels,
  registryInputFields,
  eventType,
  updateState,
  stateObj,
  channelType,
  dataLocator,
  atDateFlag,
  isMobile,
  registryConfig,
  flagOptional,
  isBabyRegistry,
  isCABabyRegistry,
  globalSwitchConfig
  // eslint-disable-next-line max-params
) => {
  const eventCheck = () => {
    return isBabyRegistry || isCABabyRegistry
      ? 'When is your baby arriving?'
      : EVENT_INFO_HEADING_LBL;
  };
  const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
  return (
    <div className={styles.fieldsContainer}>
      <fieldset>
        <GridX>
          <legend className={styles.formLegend}>
            <Heading
              level={2}
              className={
                isBabyRegistry
                  ? styles.fieldsHeadingBaby
                  : isWeddingRegistry || isCABabyRegistry
                  ? styles.weddingFieldsLabel
                  : styles.fieldsHeading
              }
            >
              {eventType === 'College/University' || eventType === 'University'
                ? EVENT_COLLEGE_INFO_HEADING_LBL
                : eventCheck()}
            </Heading>
          </legend>
        </GridX>
        <EventInfo
          registryInputFields={registryInputFields}
          eventType={eventType}
          channelType={channelType}
          labels={labels}
          stateObj={stateObj}
          updateState={updateState}
          dataLocator={dataLocator}
          atDateFlag={atDateFlag}
          isMobile={isMobile}
          registryConfig={registryConfig}
          flagOptional={flagOptional}
          isBabyRegistry={isBabyRegistry}
          isCABabyRegistry={isCABabyRegistry}
          isCreateMode
          globalSwitchConfig={globalSwitchConfig}
        />
      </fieldset>
    </div>
  );
};
const isCanada =
  getSiteId() === 'BedBathCanada' || getSiteId() === 'TBS_BedBathCanada';
export const renderContactInfo = props => {
  const {
    labels,
    registryInputs,
    updateState,
    stateObj,
    showMoveInfo,
    hideMoveInfo,
    showShippingInfo,
    hideShippingInfo,
    registryConfig,
    dataLocator,
    pageConfigGlobal,
    flagOptional,
    isBabyRegistry,
    isCABabyRegistry,
  } = props;
  const isWeddingRegistry = registryInputs.eventType === eventTypeConst.WEDDING;
  const contactHeading = isCanada
    ? CONTACT_INFO_HEADING_CANADA_LBL
    : CONTACT_INFO_HEADING_LBL;
  return (
    <div
      className={
        isWeddingRegistry
          ? styles.WeddingFieldsContainer
          : styles.fieldsContainer
      }
    >
      <fieldset>
        <GridX>
          <legend className={styles.formLegend}>
            <Heading
              level={2}
              className={classnames(
                // eslint-disable-next-line no-nested-ternary
                isBabyRegistry
                  ? styles.fieldsHeadingBaby
                  : isWeddingRegistry || isCABabyRegistry
                  ? styles.weddingFieldsLabel
                  : styles.fieldsHeading
              )}
            >
              {isBabyRegistry || isCABabyRegistry
                ? "What's your address?"
                : contactHeading}
            </Heading>
          </legend>
        </GridX>
        <ContactInfo
          registryInputFields={registryInputs.registryInputMap}
          eventType={registryInputs.eventType}
          labels={labels.createRegistry}
          stateObj={stateObj}
          registryConfig={registryConfig}
          updateState={updateState}
          showShippingInfo={showShippingInfo}
          hideShippingInfo={hideShippingInfo}
          showMoveInfo={showMoveInfo}
          hideMoveInfo={hideMoveInfo}
          dataLocator={dataLocator}
          pageConfigGlobal={pageConfigGlobal}
          flagOptional={flagOptional}
          {...props}
        />
      </fieldset>
    </div>
  );
};

/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {object} registryInputs
 * @param {object} stateObj [state Object]
 * @param {function} handleCoGenderChange
 * @param {function} handleGenderChange
 * @param {function} updateState
 * @param {function} passwordErrorPresent
 * @param {function} updatePasswordData
 * @param {object} personalisedLables
 * @param {function} listenProfileStatusChange
 * @param {function} fetchCoRegistrantProfileStatus
 * @param {object} referredContent
 * @param {object} coRegProfileStatus
 */
renderPersonalInfo.propTypes = {
  labels: PropTypes.object,
  registryInputs: PropTypes.object,
  stateObj: PropTypes.object,
  updateState: PropTypes.func.isRequired,
  passwordErrorPresent: PropTypes.func,
  updatePasswordData: PropTypes.func,
  personalisedLables: PropTypes.object,
  listenProfileStatusChange: PropTypes.func,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  referredContent: PropTypes.object,
  coRegProfileStatus: PropTypes.object,
  resetCoRegistrantProfileStatus: PropTypes.func,
  dataLocator: PropTypes.object,
  isMobile: PropTypes.bool,
  profileData: PropTypes.object,
  confirmPasswordError: PropTypes.bool,
  passwordError: PropTypes.bool,
  setPassWordComError: PropTypes.func,
  addFormField: PropTypes.func,
  submitState: PropTypes.func,
  formWrapperDataRegisterOrLogin: PropTypes.object,
  deviceConfig: PropTypes.object,
  formWrapperIdentifierRegisterOrLogin: PropTypes.string,
  globalSwitchConfig: PropTypes.object,
  reCaptchaActivationCount: PropTypes.string,
  pageConfigGlobal: PropTypes.object,
  registryConfig: PropTypes.object,
  flagOptional: PropTypes.bool,
  isEmailVerReqSisterSite: PropTypes.bool,
  resetProfileHardLockedState: PropTypes.func,
  isBabyRegistry: PropTypes.bool,
  enableNewSignUp: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
};

/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {object} registryInputs
 * @param {object} stateObj [state Object]
 * @param {string} eventType
 * @param {function} onSelectSubscribe
 * @param {function} onSelectThirdPartyOption
 * @param {object} registryConfig
 */
renderNetworkInfo.propTypes = {
  registryInputs: PropTypes.object,
  stateObj: PropTypes.object,
  eventType: PropTypes.string,
  onSelectSubscribe: PropTypes.func.isRequired,
  handleSignSisterSite: PropTypes.func.isRequired,
  onSelectThirdPartyOption: PropTypes.func.isRequired,
  registryConfig: PropTypes.object,
  dataLocator: PropTypes.object,
  fromCreateRegistryPage: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
};

/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {object} registryInputFieldss
 * @param {object} stateObj [state Object]
 * @param {function} showShippingInfo
 * @param {function} hideShippingInfo
 * @param {function} showMoveInfo
 * @param {function} hideMoveInfo
 * @param {function} updateState
 */
renderContactInfo.propTypes = {
  labels: PropTypes.object,
  registryInputs: PropTypes.object,
  stateObj: PropTypes.object,
  showMoveInfo: PropTypes.func.isRequired,
  hideMoveInfo: PropTypes.func.isRequired,
  showShippingInfo: PropTypes.func.isRequired,
  hideShippingInfo: PropTypes.func.isRequired,
  updateState: PropTypes.func,
  registryConfig: PropTypes.object,
  dataLocator: PropTypes.object,
  pageConfigGlobal: PropTypes.object,
  flagOptional: PropTypes.bool,
  isBabyRegistry: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
};

/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {object} registryInputs
 * @param {object} stateObj [state Object]
 * @param {function} updateState
 * @param {function} fetchCoRegistrantProfileStatus
 * @param {object} referredContent
 * @param {object} coRegProfileStatus
 */

renderOptionalInfo.propTypes = {
  labels: PropTypes.object,
  registryInputs: PropTypes.object,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  referredContent: PropTypes.object,
  coRegProfileStatus: PropTypes.object,
  resetCoRegistrantProfileStatus: PropTypes.func,
  dataLocator: PropTypes.object,
  channelType: PropTypes.bool,
  profileAddress: PropTypes.string,
  currentAddress: PropTypes.string,
  isMobile: PropTypes.bool,
  pageConfigGlobal: PropTypes.object,
  atDateFlag: PropTypes.bool,
  globalSwitchConfig: PropTypes.object,
};
