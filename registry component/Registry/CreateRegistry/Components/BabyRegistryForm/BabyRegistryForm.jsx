import React from 'react';
import PropTypes from 'prop-types';
import {
  renderPersonalInfo,
  renderContactInfo,
  renderEventInfo,
  renderNetworkInfo,
  renderOptionalInfo,
} from './../CreateRegistryUtilComponents/CreateRegistryUtilComponents';

/**
 * @param {object} labels [Lables and string for form ]
 * @param {object} registryInputs [Registry input rules]
 * @param {object} stateObj [State Object]
 * @param {func} update state  callback function
 * @param {func} toggleMoveInfo  callback function
 * @param {func} toggleShippingInfo callback function
 */
const propTypes = {
  labels: PropTypes.object,
  registryInputs: PropTypes.object,
  registryConfig: PropTypes.object,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  channelType: PropTypes.string,
  dataLocator: PropTypes.object,
  atDateFlag: PropTypes.bool,
  isMobile: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  isBabyRegistry: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
  globalSwitchConfig: PropTypes.object,
};

/**
 * @Component BabyRegistryForm
 * Renders registry form for baby registry only.
 */
const BabyRegistryForm = props => {
  const {
    labels,
    registryInputs,
    stateObj,
    updateState,
    channelType,
    dataLocator,
    atDateFlag,
    isModalOpen,
    registryConfig,
    isBabyRegistry,
    isCABabyRegistry,
    globalSwitchConfig,
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
        props.isMobile,
        registryConfig,
        props,
        isBabyRegistry,
        isCABabyRegistry,
        globalSwitchConfig
      )}
      {renderContactInfo(props)}
      {!isBabyRegistry && !isCABabyRegistry && renderOptionalInfo(props)}
      {renderNetworkInfo(props)}
    </div>
  );
};

BabyRegistryForm.propTypes = propTypes;

export default BabyRegistryForm;
