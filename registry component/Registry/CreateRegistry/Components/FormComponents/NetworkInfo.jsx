import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Checkbox from '@bbb-app/core-ui/checkbox';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { getSiteId } from '@bbb-app/utils/common';
import { checkForDisplay } from '../../CreateRegistryUtils';
import styles from '../AddressInput/AddressInput.css';
import {
  PRIVACY_POLICY_URL,
  CHECK_2_TEXT_LBL,
  CHECK_TEXT_LBL,
  CHECK_TEXT_LBL_REMAIN_TEXT,
  CHECK_TEXT_CA_LBL,
  SHARED_SIGNUP_BABY_LBL,
  SHARED_SIGNUP_BBB_LBL,
  SHARED_SIGNUP_HARMON_LBL,
} from './constants';

const NetworkInfo = props => {
  const {
    emailOptInSharedSite1,
    handleSignSisterSite,
    emailOptInSharedSite2,
    registryInputFields,
    subscribeSelected,
    thirdPartySelected,
    onSelectSubscribe,
    onSelectThirdPartyOption,
    registryConfig,
    dataLocator,
  } = props;
  const enableEmailOptIn = pathOr(false, 'enableEmailOptIn', registryConfig);
  const siteID = getSiteId();
  const isUSBABY = siteID === 'BedBathUS' || siteID === 'BuyBuyBaby';
  const isUSONLY = siteID === 'BedBathUS';
  const renderContent = () => {
    return siteID.includes('BedBathCanada') ? (
      CHECK_TEXT_CA_LBL
    ) : (
      <div>
        {CHECK_TEXT_LBL}
        <PrimaryLink
          href={PRIVACY_POLICY_URL}
          className={styles.privacyPolicy}
          variation={'primary'}
          target="_blank"
          isHardSpaReq
        >
          Privacy Policy.
        </PrimaryLink>
        {CHECK_TEXT_LBL_REMAIN_TEXT}
        <PrimaryLink
          href={`${PRIVACY_POLICY_URL}#Notice-of-Financial`}
          className={styles.privacyPolicy}
          variation={'primary'}
          target="_blank"
          isHardSpaReq
        >
          here.
        </PrimaryLink>
      </div>
    );
  };
  return (
    <ErrorBoundary>
      {enableEmailOptIn && (
        <React.Fragment>
          <Cell className={classnames('mt1 mb2')}>
            <Checkbox
              className={styles.registrationCheckbox}
              label={isUSONLY ? SHARED_SIGNUP_BABY_LBL : SHARED_SIGNUP_BBB_LBL}
              checked={emailOptInSharedSite1}
              onSelect={e => handleSignSisterSite('emailOptInSharedSite1', e)}
              name="signUpSisterSite"
            />
          </Cell>
          <Cell className={classnames('mt1 mb2')}>
            <Checkbox
              className={styles.registrationCheckbox}
              label={
                isUSBABY ? SHARED_SIGNUP_HARMON_LBL : SHARED_SIGNUP_BABY_LBL
              }
              checked={emailOptInSharedSite2}
              onSelect={e => handleSignSisterSite('emailOptInSharedSite2', e)}
              name="signUpSisterSite2"
            />
          </Cell>
          <GridX>
            <Cell
              className={classnames('large-9 small-11 pb15', styles.flexCell)}
            >
              <Checkbox
                id="check1"
                name="check1"
                type="checkbox"
                aria-label="check1"
                onSelect={onSelectSubscribe}
                checked={subscribeSelected}
                data-locator={dataLocator.registryUnsubscribeCheckBox}
                islablevisible={false}
                className={styles.checkboxDisclaimer}
              />
              <div className={styles.renderContent}>{renderContent()}</div>
            </Cell>
          </GridX>
        </React.Fragment>
      )}
      <GridX>
        {checkForDisplay(registryInputFields.networkAffiliation) &&
          !JSON.parse(
            pathOr(false, 'Hide_RegistryThirdPartySearch_Flag', registryConfig)
          ) && (
            <Cell className={classnames('large-9 small-11')}>
              <Checkbox
                id="check2"
                name="check2"
                type="checkbox"
                onSelect={onSelectThirdPartyOption}
                checked={thirdPartySelected}
                label={CHECK_2_TEXT_LBL}
                data-locator={dataLocator.registryAdditionalThirdPartyCheckBox}
              />
            </Cell>
          )}
      </GridX>
    </ErrorBoundary>
  );
};

NetworkInfo.propTypes = {
  onSelectSubscribe: PropTypes.func,
  onSelectThirdPartyOption: PropTypes.func,
  subscribeSelected: PropTypes.bool,
  thirdPartySelected: PropTypes.bool,
  registryInputFields: PropTypes.object,
  registryConfig: PropTypes.object,
  dataLocator: PropTypes.object,
  handleSignSisterSite: PropTypes.func,
  emailOptInSharedSite1: PropTypes.object,
  emailOptInSharedSite2: PropTypes.object,
};

export default NetworkInfo;
