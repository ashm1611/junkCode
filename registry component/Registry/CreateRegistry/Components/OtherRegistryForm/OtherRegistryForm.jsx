import React from 'react';
import PropTypes from 'prop-types';
import { checkForDisplay, eventTypeConst } from './../../CreateRegistryUtils';
import {
  renderPersonalInfo,
  renderContactInfo,
  renderEventInfo,
  renderNetworkInfo,
  renderOptionalInfo,
} from './../CreateRegistryUtilComponents/CreateRegistryUtilComponents';
import renderFavouriteStoreInfo from './../CreateRegistryUtilComponents/renderFavouriteStoreInfo';

/**
 * @param {object} labels [Lables and string for form ]
 * @param {object} registryInputs [Registry input rules]
 * @param {object} stateObj [state object]
 * @param {func} update state  callback function
 * @param {func} toggleMoveInfo  callback function
 * @param {func} toggleShippingInfo callback function
 */
const propTypes = {
  labels: PropTypes.object,
  registryInputs: PropTypes.object,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  channelType: PropTypes.string,
  dataLocator: PropTypes.object,
  currentAddress: PropTypes.string,
  profileAddress: PropTypes.string,
  atDateFlag: PropTypes.bool,
  isMobile: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  flagOptional: PropTypes.bool,
  pageConfigGlobal: PropTypes.object,
};

/**
 * @Component OtherRegistryForm
 * Renders registry form for all registry other than BABY.
 *
 */
const OtherRegistryForm = props => {
  const {
    labels,
    registryInputs,
    stateObj,
    updateState,
    channelType,
    dataLocator,
    currentAddress,
    profileAddress,
    atDateFlag,
    isMobile,
    isModalOpen,
    pageConfigGlobal,
    flagOptional,
  } = props;
  if (!registryInputs) {
    return null;
  }
  return (
    <div>
      {renderPersonalInfo(props, isModalOpen)}
      {renderEventInfo(
        labels,
        registryInputs.registryInputMap,
        registryInputs.eventType,
        updateState,
        stateObj,
        channelType,
        dataLocator,
        atDateFlag,
        isMobile,
        pageConfigGlobal,
        flagOptional
      )}
      {renderContactInfo(props)}
      {flagOptional &&
        registryInputs.eventType !== eventTypeConst.COLLEGE &&
        registryInputs.eventType !== eventTypeConst.WEDDING &&
        renderOptionalInfo(props)}
      {((!flagOptional &&
        checkForDisplay(registryInputs.registryInputMap.favoriteStore) &&
        registryInputs.eventType !== eventTypeConst.BABY) ||
        registryInputs.eventType === eventTypeConst.COLLEGE) &&
        renderFavouriteStoreInfo({
          updateState,
          stateObj,
          dataLocator,
          currentAddress,
          profileAddress,
        })}
      {renderNetworkInfo(props)}
    </div>
  );
};

OtherRegistryForm.propTypes = propTypes;

export default OtherRegistryForm;
