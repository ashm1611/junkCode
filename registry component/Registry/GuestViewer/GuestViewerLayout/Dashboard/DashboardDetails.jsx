/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell';
import Heading from '@bbb-app/core-ui/heading';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import '@bbb-app/assets/icons/infoIcon.svg';
import { getSiteId } from '@bbb-app/utils/common';
import RegistryActionButtons from './ActionButtons';
import style from './Dashboard.inline.css';
import {
  genderConst,
  BABYGENDER,
} from '../../../Dashboard/RegistryDetails/constants';
import actionCTAstyle from '../../../Dashboard/RegistryDetails/RegistryDetails.css';
import { BABY_GENDER_SURPRISE_LBL } from '../../../CreateRegistry/Components/FormComponents/constants';

const TYM_EMAIL_MODAL_CTA_LBL = 'OK';
const IS_THIS_YOUR_REGISTRY_LBL = 'Is this your registry?';
const REG_SAVED_ITEMS_HEADING_LBL = 'Email Your Registry to Friends';
const REG_MESSAGE_LBL = 'Comments';
const SUBMIT_BTN_LBL = 'Submit';
const EMAIL_CHECKBOX_LBL = 'Send me a copy of the email';
const TO_EMAIL_LBL = "Your Friend's Email";
const FROM_EMAIL_LBL = 'Your Email';
const REG_FORM_LBL =
  'You may enter up to 10 email addresses. Separate multiple addresses with semicolons.';
const RegistryDetails = ({
  registryDetails,
  styles,
  signInDetails,
  eventType,
  mPulseEnabled,
  isMobile,
  isPreviewYrReg,
  ...props
}) => {
  const returnMultiplesGender = gender => {
    let babyGender = '';
    let babyGenderKey = '';
    if (gender.charAt(0) === genderConst.SURPRISE) {
      babyGender = BABY_GENDER_SURPRISE_LBL;
      return babyGender;
    }
    const babyGenderArr = gender.split('||');
    const babyCount = babyGenderArr.length;
    let boyCount = 0;
    let girlCount = 0;
    let genderDecorArr;
    for (let i = 0; i < babyCount; i += 1) {
      genderDecorArr = babyGenderArr[i].split('~');
      if (genderDecorArr[0] === genderConst.BOY) {
        boyCount += 1;
      } else if (genderDecorArr[0] === genderConst.GIRL) {
        girlCount += 1;
      }
    }
    babyGenderKey = `Boy${boyCount}Girl${girlCount}`;
    babyGender = pathOr('', `${babyGenderKey}`, BABYGENDER);
    return babyGender;
  };
  const formLabels = {
    formLabel: REG_FORM_LBL,
    savedItemsHeadingLabel: REG_SAVED_ITEMS_HEADING_LBL,
    fromEmailLabel: FROM_EMAIL_LBL,
    toEmailLabel: TO_EMAIL_LBL,
    messageLabel: REG_MESSAGE_LBL,
    emailCheckboxLabel: EMAIL_CHECKBOX_LBL,
    submitButtonLabel: SUBMIT_BTN_LBL,
    cartContinueShopping: TYM_EMAIL_MODAL_CTA_LBL,
  };

  const returnOldGender = registryDetails.gender
    ? returnMultiplesGender(registryDetails.gender)
    : BABY_GENDER_SURPRISE_LBL;

  const {
    primaryRegistrantFirstName,
    primaryRegistrantLastName,
    primaryRegistrantMaidenName,
    coRegistrantFirstName,
    coRegistrantLastName,
  } = registryDetails.registrySummaryVO;

  let babyMaidenName;
  if (
    registryDetails.registryVO &&
    registryDetails.registryVO.primaryRegistrant
  ) {
    babyMaidenName =
      registryDetails.registryVO.primaryRegistrant.babyMaidenName;
  } else if (primaryRegistrantMaidenName) {
    babyMaidenName = primaryRegistrantMaidenName;
  }

  let heading = `${primaryRegistrantFirstName || ''} ${babyMaidenName ||
    ''} ${primaryRegistrantLastName || ''}`;
  if (coRegistrantFirstName !== null) {
    heading += ` & ${coRegistrantFirstName || ''}
    ${coRegistrantLastName || ''}`;
  }
  heading += "'s";
  const siteId = getSiteId();
  return (
    <Cell className={classnames(styles.detailsWrapper, 'small-12 large-10')}>
      <Heading
        level={siteId === 'BedBathCanada' ? 1 : 2}
        data-locator="registry-namelabel"
        aria-hidden="false"
        className={classnames(
          style.userNameStyle,
          styles.breakWord,
          'pt1 sm-pt0'
        )}
      >
        {heading} {pathOr('', 'registrySummaryVO.eventType', registryDetails)}{' '}
        Registry
      </Heading>
      {mPulseEnabled && (
        <Instrumentation
          zoneName={'ux-primary-content-displayed'}
          markName={'ux-text-registrant-name'}
        />
      )}
      <dl className={styles.regDetailsDL}>
        <div
          className={classnames(styles.details, 'mr2 sm-mr2 xs-mr2')}
          data-locator="registry-idlink"
        >
          <dt>{registryDetails.registryIdText}</dt>
          <dd className={styles.detailsValue}>{registryDetails.registryId}</dd>
        </div>
        <div
          className={classnames(styles.details, 'mr2 sm-mr2 xs-mr2')}
          data-locator="registry-datelink"
        >
          <dt>{registryDetails.eventLabel}</dt>
          <dd className={styles.detailsValue}>{registryDetails.eventDate}</dd>
        </div>
        {mPulseEnabled && (
          <Instrumentation
            zoneName={'ux-primary-content-displayed'}
            markName={'ux-text-event-date'}
          />
        )}
        {eventType === 'Baby' &&
        (registryDetails.gender || registryDetails.babyGender) ? (
          <div
            className={classnames(styles.details, 'mr2 sm-mr2 xs-mr2')}
            data-locator="registry-gender"
          >
            <dt>{registryDetails.genderLabel}</dt>
            <dd className={styles.detailsValue}>
              {registryDetails.babyGender || returnOldGender}
            </dd>
          </div>
        ) : null}
        {signInDetails.isLoggedIn ? null : (
          <div className={classnames('hideOnPrint', styles.details)}>
            <dt>
              <span>{IS_THIS_YOUR_REGISTRY_LBL} </span>

              <PrimaryLink
                variation="primary"
                href={signInDetails.signInURL}
                type="bold"
                className={styles.editLink}
              >
                {signInDetails.signInLabel}
              </PrimaryLink>
            </dt>
            <dd />
          </div>
        )}
      </dl>
      <Cell className={actionCTAstyle.registryActionButton}>
        <RegistryActionButtons
          isPreviewYrReg={isPreviewYrReg}
          isMobile={isMobile}
          isLoggedIn={signInDetails.isLoggedIn}
          registryId={registryDetails && registryDetails.registryId}
          eventType={eventType}
          {...props}
          registryLabel={formLabels}
          gender={registryDetails.babyGender}
        />
      </Cell>
    </Cell>
  );
};

/**
 * @param {object} styles [UI style object]
 * @param {object} signInDetails [Sigin details for user]
 * @param {object} registryDetails [Details of registry]
 */

RegistryDetails.propTypes = {
  isPreviewYrReg: PropTypes.bool,
  styles: PropTypes.object,
  signInDetails: PropTypes.object,
  registryDetails: PropTypes.object,
  isFetchingEditRegistryDetails: PropTypes.bool,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  dynamicContentState: PropTypes.object,
  registryConfig: PropTypes.object,
  clearEditRegistryData: PropTypes.func,
  closeModalFlag: PropTypes.bool,
  editModalError: PropTypes.bool,
  eventType: PropTypes.string,
  accountAddress: PropTypes.object,
  openEditRegistryModal: PropTypes.bool,
  loginLabels: PropTypes.object,
  eventTypeCode: PropTypes.string,
  getUpdatedRegistryData: PropTypes.func,
  mPulseEnabled: PropTypes.bool,
  registryData: PropTypes.object,
  registryOwnerFirstCategoryList: PropTypes.object,
  interactiveCheckList: PropTypes.object,
  thankYouListSurpriseData: PropTypes.object,
  routeData: PropTypes.object,
  rfTrackerEventSent: PropTypes.bool,
  isMobile: PropTypes.bool,
  isRegistryOwner: PropTypes.bool,
};

export default RegistryDetails;
