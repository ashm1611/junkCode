import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import Accordion from '@bbb-app/core-ui/accordion/Accordion';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon/Icon';
import '@bbb-app/assets/icons/infoIcon.svg';
import '@bbb-app/assets/icons/minus.svg';
import '@bbb-app/assets/icons/plus.svg';
import styles from '../EditRegistry.css';
import formStyles from './../../CreateRegistry/CreateRegistryFormStyles.css';
import PersonalInfo from '../../CreateRegistry/Components/FormComponents/PersonalInfo';
import EventInfo from '../../CreateRegistry/Components/FormComponents/EventInfo';
import ContactInfo from '../../CreateRegistry/Components/FormComponents/ContactInfo';
import OptionalInfo from '../../CreateRegistry/Components/FormComponents/OptionalInfo';
import PrivacySettings from '../Components/PrivacySettings';
import NetworkInfo from '../../CreateRegistry/Components/FormComponents/NetworkInfo';
import {
  PERSONAL_INFO_HEADING_OTHERS_LBL,
  PERSONAL_INFO_HEADING_TOOLTIP_LBL,
} from '../../CreateRegistry/Components/CreateRegistryUtilComponents/constants';
import {
  EDIT_REG_EVENT_INFO_HEADING_LBL,
  EDIT_REG_PRIVACY_SETTINGS_LBL,
  EDIT_REG_CONTACT_INFO_LBL,
  EDIT_REG_OPTIONAL_INFO_HEADING_LBL,
} from '../constants';

export const renderPersonalInfo = ({
  registryInputFieldsBaby,
  stateObj,
  labels,
  updateState,
  eventType,
  coRegOwner,
  dataLocator,
  fetchCoRegistrantProfileStatus,
  coRegProfileStatus,
  resetCoRegistrantProfileStatus,
  dynamicContentState,
  profileData,
  coRegEmailFlag,
}) => {
  return (
    <div
      className={classnames(styles.editFormAccordionWrapper, 'mb2 sm-px2 pt2')}
    >
      <Accordion
        accordion={false}
        noBorder
        showExpanded
        className={classnames(styles.editFormAccordion)}
        showExpandCollapseIcon={false}
        expandCollapseIconPos="right"
        expandCollapseIcons={{
          expand: (
            <Icon
              type="plus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
          collapse: (
            <Icon
              type="minus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
        }}
        data={[
          {
            title: (
              <div className={styles.fieldsHeading}>
                {PERSONAL_INFO_HEADING_OTHERS_LBL}{' '}
                <Button
                  data-tooltip={PERSONAL_INFO_HEADING_TOOLTIP_LBL}
                  theme="ghost"
                  className={classnames(styles.iconStyle, 'tooltip-bottom')}
                  variation="noPadding"
                  iconProps={{
                    type: 'infoIcon',
                    height: '14px',
                    width: '14px',
                  }}
                  aria-label={PERSONAL_INFO_HEADING_TOOLTIP_LBL}
                />
              </div>
            ),
            body: (
              <div
                className={classnames(
                  formStyles.editFormSection,
                  formStyles.fieldStyle,
                  'pb1'
                )}
              >
                <PersonalInfo
                  registryInputFields={registryInputFieldsBaby}
                  stateObj={stateObj}
                  labels={labels}
                  updateState={updateState}
                  eventType={eventType}
                  editRegistrySubHeading
                  coRegOwner={coRegOwner}
                  dataLocator={dataLocator}
                  fetchCoRegistrantProfileStatus={
                    fetchCoRegistrantProfileStatus
                  }
                  coRegProfileStatus={coRegProfileStatus}
                  resetCoRegistrantProfileStatus={
                    resetCoRegistrantProfileStatus
                  }
                  referredContent={dynamicContentState}
                  profileData={profileData}
                  coRegEmailFlag={coRegEmailFlag}
                />
              </div>
            ),
            expanded: true,
          },
        ]}
      />
    </div>
  );
};

export const renderEventInfo = ({
  registryInputFieldsBaby,
  stateObj,
  labels,
  updateState,
  eventType,
  dataLocator,
  isMobile,
  atDateFlag,
  registrySiteConfig,
  switchConfigGlobal,
}) => {
  return (
    <div
      className={classnames(styles.editFormAccordionWrapper, 'mb2 sm-px2 pt2')}
    >
      <Accordion
        accordion={false}
        noBorder
        showExpanded
        className={classnames(styles.editFormAccordion)}
        showExpandCollapseIcon={false}
        expandCollapseIconPos="right"
        expandCollapseIcons={{
          expand: (
            <Icon
              type="plus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
          collapse: (
            <Icon
              type="minus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
        }}
        data={[
          {
            title: (
              <Button
                theme="default"
                variation="noPadding"
                className={styles.fieldsHeading}
              >
                {EDIT_REG_EVENT_INFO_HEADING_LBL}
              </Button>
            ),
            body: (
              <div
                className={classnames(
                  formStyles.editFormSection,
                  formStyles.fieldStyle,
                  'pb1'
                )}
              >
                <EventInfo
                  registryInputFields={registryInputFieldsBaby}
                  stateObj={stateObj}
                  labels={labels}
                  updateState={updateState}
                  eventType={eventType}
                  dataLocator={dataLocator}
                  isMobile={isMobile}
                  atDateFlag={atDateFlag}
                  setFocusOnNextElement
                  registryConfig={registrySiteConfig}
                  isCreateMode={false}
                  globalSwitchConfig={switchConfigGlobal}
                />
              </div>
            ),
            expanded: true,
          },
        ]}
      />
    </div>
  );
};

export const renderContactInfo = ({
  registryInputFieldsBaby,
  stateObj,
  labels,
  updateState,
  eventType,
  showMoveInfo,
  hideMoveInfo,
  showShippingInfo,
  hideShippingInfo,
  dataLocator,
  ...props
}) => {
  return (
    <div
      className={classnames(styles.editFormAccordionWrapper, 'mb2 sm-px2 pt2')}
    >
      <Accordion
        accordion={false}
        noBorder
        showExpanded
        className={classnames(styles.editFormAccordion)}
        showExpandCollapseIcon={false}
        expandCollapseIconPos="right"
        expandCollapseIcons={{
          expand: (
            <Icon
              type="plus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
          collapse: (
            <Icon
              type="minus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
        }}
        data={[
          {
            title: (
              <Button
                theme="default"
                variation="noPadding"
                className={styles.fieldsHeading}
              >
                {EDIT_REG_CONTACT_INFO_LBL}
              </Button>
            ),
            body: (
              <div
                className={classnames(
                  formStyles.editFormSection,
                  formStyles.fieldStyle,
                  'pb2 sm-pb1'
                )}
              >
                <ContactInfo
                  registryInputFields={registryInputFieldsBaby}
                  stateObj={stateObj}
                  labels={labels}
                  updateState={updateState}
                  eventType={eventType}
                  showMoveInfo={showMoveInfo}
                  hideMoveInfo={hideMoveInfo}
                  showShippingInfo={showShippingInfo}
                  hideShippingInfo={hideShippingInfo}
                  dataLocator={dataLocator}
                  {...props}
                />
              </div>
            ),
            expanded: true,
          },
        ]}
      />
    </div>
  );
};

/* eslint max-params: ["error", 8]*/
export const renderPrivacySettings = (
  labels,
  stateObj,
  updateState,
  dataLocator,
  dynamicContentState,
  deactivateRegistryContentId,
  toggleModalState
) => {
  return (
    <div
      className={classnames(styles.editFormAccordionWrapper, 'mb2 sm-px2 pt2')}
    >
      <Accordion
        accordion={false}
        noBorder
        showExpanded
        className={classnames(styles.editFormAccordion)}
        showExpandCollapseIcon={false}
        expandCollapseIconPos="right"
        expandCollapseIcons={{
          expand: (
            <Icon
              type="plus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
          collapse: (
            <Icon
              type="minus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
        }}
        data={[
          {
            title: (
              <Button
                theme="default"
                variation="noPadding"
                className={styles.fieldsHeading}
              >
                {EDIT_REG_PRIVACY_SETTINGS_LBL}
              </Button>
            ),
            body: (
              <div className="pb1">
                <PrivacySettings
                  labels={labels}
                  stateObj={stateObj}
                  updateState={updateState}
                  dataLocator={dataLocator}
                  dynamicContentState={dynamicContentState}
                  deactivateRegistryContentId={deactivateRegistryContentId}
                  toggleModalState={toggleModalState}
                />
              </div>
            ),
            expanded: true,
          },
        ]}
      />
    </div>
  );
};

export const renderOptionalInfo = ({
  registryInputFieldsBaby,
  stateObj,
  labels,
  updateState,
  eventType,
  dataLocator,
  fetchCoRegistrantProfileStatus,
  coRegProfileStatus,
  resetCoRegistrantProfileStatus,
  dynamicContentState,
  isMobile,
  coRegEmailFlag,
  globalSwitchConfig,
}) => {
  return (
    <div
      className={classnames(styles.editFormAccordionWrapper, 'mb2 sm-px2 pt2')}
    >
      <Accordion
        accordion={false}
        noBorder
        showExpanded
        className={classnames(styles.editFormAccordion)}
        showExpandCollapseIcon={false}
        expandCollapseIconPos="right"
        expandCollapseIcons={{
          expand: (
            <Icon
              type="plus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
          collapse: (
            <Icon
              type="minus"
              width="16px"
              height="16px"
              className={formStyles.accordianIconStyle}
            />
          ),
        }}
        data={[
          {
            title: (
              <Button
                theme="default"
                variation="noPadding"
                className={styles.fieldsHeading}
              >
                {EDIT_REG_OPTIONAL_INFO_HEADING_LBL}
              </Button>
            ),
            body: (
              <div
                className={classnames(
                  formStyles.editFormSection,
                  formStyles.fieldStyle
                )}
              >
                <OptionalInfo
                  registryInputFields={registryInputFieldsBaby}
                  stateObj={stateObj}
                  labels={labels}
                  updateState={updateState}
                  eventType={eventType}
                  dataLocator={dataLocator}
                  fetchCoRegistrantProfileStatus={
                    fetchCoRegistrantProfileStatus
                  }
                  coRegProfileStatus={coRegProfileStatus}
                  resetCoRegistrantProfileStatus={
                    resetCoRegistrantProfileStatus
                  }
                  referredContent={dynamicContentState}
                  currentAddress={stateObj.currentAddress}
                  profileAddress={stateObj.profileAddress}
                  defaultStoreId={stateObj.defaultStoreId}
                  isMobile={isMobile}
                  coRegEmailFlag={coRegEmailFlag}
                  globalSwitchConfig={globalSwitchConfig}
                />
              </div>
            ),
            expanded: true,
          },
        ]}
      />
    </div>
  );
};

export const renderNetworkInfo = ({
  registryInputFieldsBaby,
  stateObj,
  eventType,
  registryConfig,
  onSelectSubscribe,
  onSelectThirdPartyOption,
  dataLocator,
  enableRBYRFeatureConfig,
  onSelectRBYROption,
  isRegistryRBYRSelected,
  editStoredValueOptIn,
  isRegistryRBYRIncluded,
}) => {
  return (
    <NetworkInfo
      eventType={eventType}
      registryInputFields={registryInputFieldsBaby}
      thirdPartySelected={stateObj.thirdPartySelected}
      subscribeSelected={stateObj.subscribeSelected}
      registryConfig={registryConfig}
      onSelectSubscribe={onSelectSubscribe}
      onSelectThirdPartyOption={onSelectThirdPartyOption}
      dataLocator={dataLocator}
      enableRBYRFeatureConfig={enableRBYRFeatureConfig}
      onSelectRBYROption={onSelectRBYROption}
      isRegistryRBYRSelected={isRegistryRBYRSelected}
      editStoredValueOptIn={editStoredValueOptIn}
      storedValueOptIn={stateObj.storedValueOptIn}
      isRegistryRBYRIncluded={isRegistryRBYRIncluded}
    />
  );
};

renderContactInfo.propTypes = {
  registryInputFieldsBaby: PropTypes.object,
  stateObj: PropTypes.object,
  labels: PropTypes.object,
  updateState: PropTypes.func,
  eventType: PropTypes.string,
  showMoveInfo: PropTypes.func,
  hideMoveInfo: PropTypes.func,
  showShippingInfo: PropTypes.func,
  hideShippingInfo: PropTypes.func,
  dataLocator: PropTypes.object,
};

renderEventInfo.propTypes = {
  registryInputFieldsBaby: PropTypes.object,
  stateObj: PropTypes.object,
  labels: PropTypes.object,
  updateState: PropTypes.func,
  eventType: PropTypes.string,
  dataLocator: PropTypes.object,
  registrySiteConfig: PropTypes.object,
  isMobile: PropTypes.bool,
  atDateFlag: PropTypes.bool,
  switchConfigGlobal: PropTypes.object,
};

renderNetworkInfo.propTypes = {
  registryInputFieldsBaby: PropTypes.object,
  stateObj: PropTypes.object,
  eventType: PropTypes.string,
  registryConfig: PropTypes.object,
  onSelectSubscribe: PropTypes.func,
  onSelectThirdPartyOption: PropTypes.func,
  dataLocator: PropTypes.object,
  enableRBYRFeatureConfig: PropTypes.bool,
  onSelectRBYROption: PropTypes.func,
  isRegistryRBYRSelected: PropTypes.bool,
  editStoredValueOptIn: PropTypes.bool,
  isRegistryRBYRIncluded: PropTypes.bool,
};

renderPersonalInfo.propTypes = {
  registryInputFieldsBaby: PropTypes.object,
  labels: PropTypes.object,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  eventType: PropTypes.string,
  dataLocator: PropTypes.func,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  dynamicContentState: PropTypes.object,
  coRegOwner: PropTypes.bool,
  profileData: PropTypes.object,
  coRegEmailFlag: PropTypes.func,
};

renderOptionalInfo.propTypes = {
  registryInputFieldsBaby: PropTypes.object,
  labels: PropTypes.object,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  eventType: PropTypes.string,
  dataLocator: PropTypes.func,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  dynamicContentState: PropTypes.object,
  isMobile: PropTypes.bool,
  coRegEmailFlag: PropTypes.func,
  globalSwitchConfig: PropTypes.object,
};
