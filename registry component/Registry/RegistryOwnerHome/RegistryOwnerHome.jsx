import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import GridContainer from '@bbb-app/core-ui/grid-container';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import Heading from '@bbb-app/core-ui/heading';
import { getCurrentSiteIdAtBrowser } from '@bbb-app/utils/common';
import getSiteId from '@bbb-app/utils/getSiteId';
import { LocalStorageUtil } from '@bbb-app/utils/localStorage';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import styles from './RegistryOwnerHome.css';
import RegistryInsights from '../../../RegistryInsights/index';
import LearnMoreMainBanner from '../../../../components/Pages/Registry/GroupGifting/LearnMoreMainBanner/LearnMoreMainBanner.async';
import { CONGRATS_MESSAGE_FOR_POST_REGISTRY_STATE_LBL } from '../../CollegeChecklist/ChecklistOwnerHome/constants';

const getCongratsMessage = registryDetailsData => {
  const regState = pathOr(
    '',
    'registryResVO.registrySummaryVO.registryState',
    registryDetailsData
  );
  const congratsMessage = CONGRATS_MESSAGE_FOR_POST_REGISTRY_STATE_LBL;
  if (regState === 'post') {
    return (
      <Heading level={2} styleVariation="h2-serif" className="md-pt03 center">
        {congratsMessage}
      </Heading>
    );
  }
  return null;
};

/* eslint-enable complexity */
const renderInsights = registryDetailsData => {
  const regType = pathOr(
    '',
    'registryResVO.registrySummaryVO.eventType',
    registryDetailsData
  );
  switch (regType) {
    case 'Baby':
      return (
        <GridContainer>
          <div className="grid-x grid-margin-x">
            <RegistryInsights registryData={registryDetailsData} />
          </div>
        </GridContainer>
      );
    default:
      return <div />;
  }
};
const dontRender = (registryDetailsData, componentToRender) => {
  /**
   * Commented out below as it is causing RegistryHomeTab to render as blank for all the registries which are in 'post' state.
   */
  // const regState = pathOr(
  //   '',
  //   'registryResVO.registrySummaryVO.registryState',
  //   registryDetailsData
  // );

  // if (regState === 'post') {
  //   return <div />;
  // }

  return componentToRender;
};
export const RegistryOwnerHome = ({
  registryDetailsData,
  mPulseEnabled,
  childrens,
  siteID,
  groupGiftingEnable,
  groupGiftOptIn,
  eventType,
  isNewRegDashboard,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const localUtil = new LocalStorageUtil(true);
  /* istanbul ignore next */
  const toggleSuggestionFlyout = () => {
    setIsOpen(!isOpen);
    localUtil.saveItem('learnMoreModalGG', true);
  };
  const notClosedOnce = localUtil.getItem('learnMoreModalGG');
  const congratsMessage = getCongratsMessage(registryDetailsData);
  const isBabyRegistry = getSiteId() === 'BuyBuyBaby' && eventType === 'Baby';
  return (
    <div className={isNewRegDashboard && 'mt15'}>
      <div className={styles.tipsSetBG}>
        {isBabyRegistry ? null : congratsMessage}
        <React.Fragment>
          {!isNewRegDashboard &&
            !isOpen &&
            !notClosedOnce &&
            (groupGiftingEnable || groupGiftOptIn) &&
            !isInternationalUser() && (
              <LearnMoreMainBanner
                toggleSuggestionFlyout={toggleSuggestionFlyout}
                {...props}
                isCongratsMessage={!!congratsMessage}
              />
            )}
        </React.Fragment>
        {mPulseEnabled && (
          <Instrumentation
            zoneName={'ux-primary-content-displayed'}
            markName={'ux-text-registry-home-content'}
          />
        )}
        {childrens}
        <div className={`slotCardSetBG${siteID}`}>
          {dontRender(registryDetailsData, renderInsights(registryDetailsData))}
        </div>
      </div>
    </div>
  );
};
RegistryOwnerHome.propTypes = {
  childrens: PropTypes.any,
  registryDetailsData: PropTypes.object,
  mPulseEnabled: PropTypes.bool,
  siteID: PropTypes.any,
  registryID: PropTypes.bool,
  groupGiftingEnable: PropTypes.bool,
  groupGiftOptIn: PropTypes.bool,
  eventType: PropTypes.string,
  isNewRegDashboard: PropTypes.bool,
};

RegistryOwnerHome.defaultProps = {
  siteID: getCurrentSiteIdAtBrowser(),
};

export default RegistryOwnerHome;
