import React from 'react';
import { PropTypes } from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import {
  renderPersonalInfo,
  renderEventInfo,
  renderContactInfo,
  renderFavouriteStoreInfo,
  renderPrivacySettings,
  renderNetworkInfo,
} from './EditWeddingRegistryFormUtil';
import {
  registryConfig,
  registryInputFieldsWedding,
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
  onSelectSubscribe: PropTypes.func,
  onSelectThirdPartyOption: PropTypes.func,
  dataLocator: PropTypes.object,
  coRegOwner: PropTypes.bool,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  dynamicContentState: PropTypes.object,
  profileData: PropTypes.object,
  isMobile: PropTypes.bool,
  coRegEmailFlag: PropTypes.func,
  atDateFlag: PropTypes.bool,
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
  setRegistryFavStoreSearchFlag: PropTypes.func,
  globalSwitchConfig: PropTypes.object,
};

/**
 * EditWeddingRegistry Component
 * Renders Layout for Edit registry for events other than Baby and Wedding and manages link to edit registry
 */

const EditWeddingRegistry = ({
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
  dataLocator,
  coRegOwner,
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
  setRegistryFavStoreSearchFlag,
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
  const registryInputFields = registryInputFieldsWedding;

  return (
    <React.Fragment>
      {renderPersonalInfo({
        registryInputFields,
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
        globalSwitchConfig: props.globalSwitchConfig,
      })}
      {renderEventInfo({
        registryInputFields,
        labels,
        stateObj,
        updateState,
        eventType,
        dataLocator,
        isMobile: props.isMobile,
        atDateFlag: props.atDateFlag,
      })}
      {renderContactInfo({
        registryInputFields,
        labels,
        stateObj,
        updateState,
        eventType,
        showMoveInfo,
        hideMoveInfo,
        showShippingInfo,
        hideShippingInfo,
        dataLocator,
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
      {/* will check if group gifting enable or already optIn then it will load the chunk for group gifting */}
      {(groupGiftingEnable ||
        stateObj.groupGiftOptIn ||
        stateObj.groupGiftInitialStateOptIn) && (
        <RBYRAndGroupGifting
          labels={labels}
          isEnable={stateObj.groupGiftOptIn}
          dynamicContentState={dynamicContentState}
          updateState={updateState}
        />
      )}

      {renderFavouriteStoreInfo({
        labels,
        updateState,
        dataLocator,
        currentAddress: stateObj.currentAddress,
        profileAddress: stateObj.profileAddress,
        defaultStoreId: stateObj.defaultStoreId,
        setRegistryFavStoreSearchFlag,
      })}
      <div className="pb3 sm-pb15">
        {renderNetworkInfo({
          registryInputFields,
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

EditWeddingRegistry.propTypes = propTypes;

export default EditWeddingRegistry;
