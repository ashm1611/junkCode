import React from 'react';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import getEncodedValue from '@bbb-app/utils/getEncodedValue';
import '@bbb-app/assets/icons/print-registry.svg';
import EmailRegistry from '../../../RegistryActionButtons/EmailRegistry';
import CopyRegistry from './CopyRegistry';
import { RegistryOwnerPath } from '../../../../../../containers/Pages/Registry/RegistryOwner/constants';

const renderEmailRegistry = (
  otherProps,
  isMobile,
  registrySummaryVO,
  fromEmailId
) => {
  let fromEmailIdValue = fromEmailId || '';
  if (fromEmailIdValue && fromEmailIdValue === 'masked') {
    fromEmailIdValue = ''; // put 'empty' string if value is equal to masked, this would be the case when guest is viewing someone else's registry
  }
  return (
    <li className={isMobile ? 'pr2' : 'pl3'}>
      <EmailRegistry
        registryLabel={otherProps.registryLabel}
        submitForm={otherProps.submitForm}
        emailSentResponse={otherProps.emailSentResponse}
        clearSubmitResponse={otherProps.clearSubmitResponse}
        checkBoxChecked={otherProps.checkBoxChecked}
        handleCheckBox={otherProps.handleCheckBox}
        formWrapperData={otherProps.formWrapperData}
        isMobile={isMobile}
        registrySummaryVO={registrySummaryVO}
        handleTealiumEvent={otherProps.handleTealiumEvent || ''}
        globalSwitchConfig={otherProps.globalSwitchConfig}
        switchConfig={otherProps.switchConfig}
        fromEmail={fromEmailIdValue}
      />
    </li>
  );
};

export const PrintRegistryCTA = ({
  registryId,
  eventDate,
  registryTypeName,
  primaryRegistrantFirstName,
  coRegistrantFirstName,
  giftRegistered,
  giftTotalPurchased,
  babyGender,
  gender,
}) => {
  return (
    <li
      className="pl3"
      data-locator="registry-createdregistry-landingpage-print-registry"
    >
      <PrimaryLink
        href={`/store/viewitems/printRegistry?registryID=${registryId}&eventType=${registryTypeName}&eventDate=${eventDate}&primaryRegistrantFirstName=${primaryRegistrantFirstName}&coRegistrantFirstName=${coRegistrantFirstName}&giftRegistered=${giftRegistered}&giftPurchased=${giftTotalPurchased}&babyGender=${babyGender}&gender=${getEncodedValue(
          gender
        )}`}
        target="_blank"
        rel="noopener"
        type="bold"
        iconProps={{
          type: 'print-registry',
          width: '20px',
          height: '20px',
        }}
        variation="primaryColoredIcon"
        isIconAfterContent={false}
      >
        Print Registry
      </PrimaryLink>
    </li>
  );
};

export const isCopyRegistryAllowed = (
  isLoggedIn,
  registries,
  uniqueId,
  registrySummaryVO
) => {
  if (
    !isLoggedIn ||
    registries.length <= 0 ||
    !uniqueId ||
    (registrySummaryVO && registrySummaryVO.giftRegistered <= 0)
  ) {
    return false;
  }
  return true;
};

/**
 * Component for Registry Action Buttons
 *
 * @param { object } registryData registry Data
 * @param { number } registryId check the registry id
 */
export const compareLabels = (condition, ifTrue, ifFalse) =>
  condition ? ifTrue : ifFalse;

export const RegistryActionButtons = props => {
  const { activeRegistry, isMobile, alignmentOnFacet, registryId } = props;
  let registries = [];
  let uniqueId = false;

  const registryResVO = pathOr(null, 'registryResVO', props.registryData);
  const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);
  const eventDate = pathOr(null, 'registrySummaryVO.eventDate', registryResVO);
  const babyGender = pathOr(
    null,
    'registrySummaryVO.eventVO.babyGender',
    registryResVO
  );
  const registryTypeName = pathOr(
    null,
    'registrySummaryVO.registryType.registryTypeName',
    registryResVO
  );
  const {
    coRegistrantFirstName,
    primaryRegistrantFirstName,
    giftRegistered,
    giftTotalPurchased,
  } = registrySummaryVO || {};

  if (props.registryList) {
    registries = props.registryList;
  }

  if (activeRegistry) {
    uniqueId = activeRegistry.registryId !== registryId;
  }

  let fromEmailId = '';

  if (activeRegistry) {
    fromEmailId = activeRegistry.registrantEmail || '';
  }
  const redirectToMyRegistry = () => {
    props.redirectTo(`${RegistryOwnerPath}${activeRegistry.registryId}`);
  };
  const registryCopyPermitted = isCopyRegistryAllowed(
    props.isLoggedIn,
    registries,
    uniqueId,
    registrySummaryVO
  );
  return (
    <ErrorBoundary>
      <ul className={classnames(alignmentOnFacet, 'grid-x hideOnPrint')}>
        {pathOr(false, 'isPublic', registrySummaryVO) === '1'
          ? renderEmailRegistry(props, isMobile, registrySummaryVO, fromEmailId)
          : null}
        {PrintRegistryCTA({
          registryId: props.registryId,
          eventDate,
          registryTypeName,
          primaryRegistrantFirstName,
          coRegistrantFirstName,
          giftRegistered,
          giftTotalPurchased,
          babyGender,
          gender: props.gender,
        })}
        {registryCopyPermitted ? (
          <li className={isMobile ? 'pr2' : 'pl3'}>
            <CopyRegistry
              registryData={props.registryData}
              copyRegistryAct={props.copyRegistryAct}
              match={props.match}
              activeRegistry={activeRegistry}
              isRegistryCopied={props.isRegistryCopied}
              redirectToMyRegistry={redirectToMyRegistry}
              resetResponse={props.resetResponse}
              isMobile={isMobile}
              copiedProducts={props.copiedProducts}
              sortOption={props.tilesView}
            />
          </li>
        ) : null}
      </ul>
    </ErrorBoundary>
  );
};

RegistryActionButtons.propTypes = {
  registryData: PropTypes.object,
  isMobile: PropTypes.bool,
  registryId: PropTypes.string,
  activeRegistry: PropTypes.object,
  alignmentOnFacet: PropTypes.any,
  gender: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  copyRegistryAct: PropTypes.func,
  copiedProducts: PropTypes.object,
  match: PropTypes.object,
  isRegistryCopied: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  redirectTo: PropTypes.func,
  resetResponse: PropTypes.func,
  tilesView: PropTypes.string,
  registryList: PropTypes.array,
};

PrintRegistryCTA.propTypes = {
  registryId: PropTypes.string,
  eventDate: PropTypes.string,
  registryTypeName: PropTypes.string,
  primaryRegistrantFirstName: PropTypes.string,
  coRegistrantFirstName: PropTypes.string,
  giftRegistered: PropTypes.any,
  giftTotalPurchased: PropTypes.any,
  babyGender: PropTypes.string,
  gender: PropTypes.string,
};

export default RegistryActionButtons;
