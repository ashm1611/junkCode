import React from 'react';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import HideOnTbs from '@bbb-app/core-ui/hide-on-tbs/HideOnTbs';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import getEncodedValue from '@bbb-app/utils/getEncodedValue';
import '@bbb-app/assets/icons/print-registry.svg';
import '../../../../assets/icons/bbb-print.svg';
import '../../../../assets/icons/baby-print.svg';
import ShareRegistry from '../RegistryOwner/ShareRegistry/ShareRegistry.async';
import { TEALIUM_PAGE_SHARE } from '../../../../../app/constants/socialShare';

// eslint-disable-next-line max-params
export const PrintRegistryCTA = (
  registryId,
  eventDate,
  registryTypeName,
  primaryRegistrantFirstName,
  coRegistrantFirstName,
  giftRegistered,
  giftTotalPurchased,
  babyGender,
  gender,
  isBBBNewRegistryHeader,
  isBabyNewRegistryHeader,
  isMobile,
  fireTealiumAction
  // eslint-disable-next-line max-params
) => {
  const isBabyOrBBBNewHeader =
    isBBBNewRegistryHeader || isBabyNewRegistryHeader;
  const tealiumTags = {
    link_name: 'Registry Print',
    link_location_name: 'Registry View Page',
  };
  const shareTealiumData = Object.assign({}, tealiumTags);
  return (
    <li
      className={isBabyOrBBBNewHeader ? 'pl1' : 'pl3'}
      data-locator="registry-createdregistry-landingpage-print-registry"
      title="Print"
    >
      {isBabyOrBBBNewHeader ? (
        <PrimaryLink
          href={`/store/viewitems/printRegistry?registryID=${registryId}&eventType=${registryTypeName}&eventDate=${eventDate}&primaryRegistrantFirstName=${primaryRegistrantFirstName}&coRegistrantFirstName=${coRegistrantFirstName}&giftRegistered=${giftRegistered}&giftPurchased=${giftTotalPurchased}&babyGender=${babyGender}&gender=${getEncodedValue(
            gender
          )}`}
          target="_blank"
          rel="noopener"
          type="bold"
          iconProps={{
            type: isBabyNewRegistryHeader ? 'baby-print' : 'bbb-print',
            height: isMobile ? '32px' : '42px',
            width: isMobile ? '32px' : '42px',
          }}
          onClick={() => {
            fireTealiumAction(
              'registry print',
              shareTealiumData,
              TEALIUM_PAGE_SHARE
            );
          }}
          aria-label="print"
        />
      ) : (
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
          aria-label="print"
        >
          Print Registry
        </PrimaryLink>
      )}
    </li>
  );
};

export const renderShareRegistry = otherProps => {
  const {
    isMobile,
    isBabyNewRegistryHeader,
    isBBBNewRegistryHeader,
  } = otherProps;
  const isBabyOrBBBNewHeader =
    isBabyNewRegistryHeader || isBBBNewRegistryHeader;
  return (
    <li
      className={classnames({
        pr2: isMobile && !isBabyOrBBBNewHeader,
        pl3: !isMobile && !isBabyOrBBBNewHeader,
        pl1: isBabyOrBBBNewHeader,
      })}
      data-locator="registry-createdregistry-landingpage-shareicon"
      title="Share"
    >
      <ShareRegistry
        registryData={otherProps.registryData}
        registryId={otherProps.registryId}
        labels={otherProps.labels}
        registryConfig={otherProps.registryConfig}
        loginLabels={otherProps.loginLabels}
        globalSwitchConfig={otherProps.globalSwitchConfig}
        formWrapperData={otherProps.formWrapperData}
        showLink
        isMobile={isMobile}
        location={otherProps.location}
        switchConfig={otherProps.switchConfig}
        handleTealiumEvent={otherProps.fireTealiumAction}
        emailId={otherProps.emailId}
        eventTypeCode={otherProps.eventTypeCode}
        labelData={otherProps.dynamicContentState}
        eventType={otherProps.eventType}
        isPreviewYrReg={otherProps.isPreviewYrReg}
        track={otherProps.track}
        isBabyNewRegistryHeader={otherProps.isBabyNewRegistryHeader}
        isBBBNewRegistryHeader={otherProps.isBBBNewRegistryHeader}
        enableRegistryCollaboration={otherProps.enableRegistryCollaboration}
        handleCollaborationModal={otherProps.handleCollaborationModal}
      />
    </li>
  );
};

/**
 * Container for Registry Action Buttons
 * @param { object } labels labels used to render the view
 * @param { object } registryData registry Data
 * @param { number } registryId check the registry id
 */
export const compareLabels = (condition, ifTrue, ifFalse) =>
  condition ? ifTrue : ifFalse;

export const RegistryActionButtons = props => {
  const {
    registryId,
    gender,
    isBBBNewRegistryHeader,
    isBabyNewRegistryHeader,
    isMobile,
    fireTealiumAction,
  } = props;
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
  const isBabyOrBBBNewHeader =
    isBBBNewRegistryHeader || isBabyNewRegistryHeader;

  return (
    <ErrorBoundary>
      <ul
        className={classnames(
          props.alignmentOnFacet,
          !isBabyOrBBBNewHeader && 'hideOnPrint',
          'grid-x'
        )}
      >
        {props.printregistry &&
          PrintRegistryCTA(
            registryId,
            eventDate,
            registryTypeName,
            primaryRegistrantFirstName,
            coRegistrantFirstName,
            giftRegistered,
            giftTotalPurchased,
            babyGender,
            gender,
            isBBBNewRegistryHeader,
            isBabyNewRegistryHeader,
            isMobile,
            fireTealiumAction
          )}
        <HideOnTbs>{renderShareRegistry(props)}</HideOnTbs>
      </ul>
    </ErrorBoundary>
  );
};
RegistryActionButtons.propTypes = {
  registryData: PropTypes.object,
  registryId: PropTypes.string,
  alignmentOnFacet: PropTypes.any,
  gender: PropTypes.string,
  isBBBNewRegistryHeader: PropTypes.bool,
  isBabyNewRegistryHeader: PropTypes.bool,
  isMobile: PropTypes.bool,
  printregistry: PropTypes.bool,
  fireTealiumAction: PropTypes.func,
};

export default RegistryActionButtons;
