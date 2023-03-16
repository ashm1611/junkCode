import React from 'react';
import { PropTypes } from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import {
  renderPersonalInfo,
  renderEventInfo,
  renderContactInfo,
  renderPrivacySettings,
  renderOptionalInfo,
  renderNetworkInfo,
} from './EditBabyRegistryFormUtil';
import {
  registryInputFieldsBaby,
  registryConfig,
} from './../../../../../containers/Pages/Registry/EditRegistry/EditRegistryConfig';
import {
  REGISTRY_DETAILS_STATE_KEY,
  GROUP_GIFTING_ENABLE,
} from '../../../../../containers/Pages/Registry/RegistryOwner/constants';
import RBYRAndGroupGifting from '../../RBYRAndGroupGifting/RBYRAndGroupGifting.async';

const propTypes = {
  stateObj: PropTypes.object,
  labels: PropTypes.object,
  updateState: PropTypes.func,
  eventType: PropTypes.string,
  showMoveInfo: PropTypes.func,
  hideMoveInfo: PropTypes.func,
  showShippingInfo: PropTypes.func,
  hideShippingInfo: PropTypes.func,
  coRegOwner: PropTypes.bool,
  onSelectSubscribe: PropTypes.func,
  onSelectThirdPartyOption: PropTypes.func,
  dataLocator: PropTypes.object,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  dynamicContentState: PropTypes.object,
  profileData: PropTypes.object,
  isMobile: PropTypes.bool,
  atDateFlag: PropTypes.bool,
  coRegEmailFlag: PropTypes.func,
  registrySiteConfig: PropTypes.object,
  deactivateRegistryContentId: PropTypes.any,
  toggleModalState: PropTypes.func,
  enableRBYRFeatureConfig: PropTypes.bool,
  onSelectRBYROption: PropTypes.func,
  isRegistryRBYRSelected: PropTypes.bool,
  editStoredValueOptIn: PropTypes.bool,
  isRegistryRBYRIncluded: PropTypes.bool,
  rbyrDescriptionId: PropTypes.string,
  rbyrTermsAndConditionId: PropTypes.string,
  switchConfigGlobal: PropTypes.object,
};

/**
 * EditBabyRegistry Component
 * Renders Layout for Edit registry for Baby event and manages link to edit registry
 */

const EditBabyRegistry = ({
  stateObj,
  labels,
  updateState,
  eventType,
  showMoveInfo,
  hideMoveInfo,
  showShippingInfo,
  hideShippingInfo,
  onSelectSubscribe,
  onSelectThirdPartyOption,
  coRegOwner,
  dataLocator,
  fetchCoRegistrantProfileStatus,
  coRegProfileStatus,
  resetCoRegistrantProfileStatus,
  dynamicContentState,
  profileData,
  coRegEmailFlag,
  toggleModalState,
  enableRBYRFeatureConfig,
  onSelectRBYROption,
  isRegistryRBYRSelected,
  editStoredValueOptIn,
  isRegistryRBYRIncluded,
  rbyrDescriptionId,
  rbyrTermsAndConditionId,
  ...props
}) => {
  const groupGiftingEnable = pathOr(
    false,
    [
      REGISTRY_DETAILS_STATE_KEY,
      'registryResVO',
      'registrySummaryVO',
      GROUP_GIFTING_ENABLE,
    ],
    props
  );
  return (
    <React.Fragment>
      {renderPersonalInfo({
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
      })}
      {renderEventInfo({
        registryInputFieldsBaby,
        stateObj,
        labels,
        updateState,
        eventType,
        dataLocator,
        isMobile: props.isMobile,
        atDateFlag: props.atDateFlag,
        registrySiteConfig: props.registrySiteConfig,
        switchConfigGlobal: props.switchConfigGlobal,
      })}
      {renderContactInfo({
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
        coRegEmailFlag,
        ...props,
      })}
      {renderPrivacySettings(
        labels,
        stateObj,
        updateState,
        dataLocator,
        dynamicContentState,
        props.deactivateRegistryContentId,
        toggleModalState
      )}
      {(editStoredValueOptIn ||
        (enableRBYRFeatureConfig && isRegistryRBYRIncluded)) && (
        <RBYRAndGroupGifting
          labels={labels}
          onSelectRBYROption={onSelectRBYROption}
          isEnable={isRegistryRBYRSelected}
          dynamicContentState={dynamicContentState}
          rbyrDescriptionId={rbyrDescriptionId}
          rbyrTermsAndConditionId={rbyrTermsAndConditionId}
          shipOrSwap
        />
      )}
      {// will check if group gifting enable or already optIn then it will load the chunk for group gifting
      (groupGiftingEnable ||
        stateObj.groupGiftOptIn ||
        stateObj.groupGiftInitialStateOptIn) && (
        <RBYRAndGroupGifting
          labels={labels}
          isEnable={stateObj.groupGiftOptIn}
          dynamicContentState={dynamicContentState}
          updateState={updateState}
        />
      )}
      {renderOptionalInfo({
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
        isMobile: props.isMobile,
        coRegEmailFlag,
        globalSwitchConfig: props.switchConfigGlobal,
      })}
      <div className="pb3 sm-pb15">
        {renderNetworkInfo({
          registryInputFieldsBaby,
          stateObj,
          labels,
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
        })}
      </div>
    </React.Fragment>
  );
};

EditBabyRegistry.propTypes = propTypes;

export default EditBabyRegistry;
