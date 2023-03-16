/* eslint-disable complexity */
/* eslint complexity: ["error", 11]*/
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Cell from '@bbb-app/core-ui/cell';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import ToggleButton from '@bbb-app/core-ui/toggleButton';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import '@bbb-app/assets/icons/infoIcon.svg';
import getSiteId from '@bbb-app/utils/getSiteId';
import { genderConst, BABYGENDER } from './constants';
import RegistryOwnerTealiumHandler from '../../../../../containers/ThirdParty/Tealium/Registry/RegistryOwnerTealiumHandler/RegistryOwnerTealiumHandler.async';
import RenderEditRegistryLink from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistryWrapper';
import RegistryActionButtons from '../../RegistryActionButtons';
import style from './RegistryDetails.css';
import { setToggleEdit } from './editApiUtil';
import { TEALIUM_PAGE_SHARE } from '../../../../../../app/constants/socialShare';
import { BABY_GENDER_SURPRISE_LBL } from '../../CreateRegistry/Components/FormComponents/constants';
import {
  TYM_EMAIL_MODAL_CTA_LBL,
  DASHBOARD_TOOLTIP_LBL,
  EMAIL_CHECKBOX_LBL,
  FROM_EMAIL_LBL,
  REG_MESSAGE_LBL,
  REG_SAVED_ITEMS_HEADING_LBL,
  SUBMIT_BTN_LBL,
  TO_EMAIL_LBL,
  REG_FORM_LBL,
} from '../../constants';

/* eslint complexity: ["error", 12]*/
const RegistryDetails = props => {
  const {
    registryDetails,
    styles,
    signInDetails,
    isMobile,
    isBBBNewRegistryHeader,
    isBabyNewRegistryHeader,
    eventType,
  } = props;
  const isBabyOrBBBNewHeader =
    isBBBNewRegistryHeader || isBabyNewRegistryHeader;
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

  const trimRegistryInfo =
    isMobile && isBBBNewRegistryHeader && eventType === 'Wedding';

  const {
    primaryRegistrantFirstName,
    primaryRegistrantLastName,
    primaryRegistrantMaidenName,
    coRegistrantFirstName,
    coRegistrantLastName,
  } = registryDetails.registrySummaryVO;

  let babyMaidenName;
  if (registryDetails.registryVO) {
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

  const getRegistryHeading = () => {
    const header = `${heading} Registry`;
    if (trimRegistryInfo) {
      return header.replace("'s Registry", '');
    }
    return header;
  };

  const setChecklistToggle = toggledValue => {
    const {
      registryData,
      eventTypeCode,
      setShowChecklist,
      fireTealiumAction,
    } = props;
    if (!toggledValue) {
      const tealiumTags = {
        link_name: 'Registry Checklist Visibility Off',
        link_location_name: 'Registry View Page',
      };
      const shareTealiumData = Object.assign({}, tealiumTags);
      fireTealiumAction(
        'registry checklist visibility',
        shareTealiumData,
        TEALIUM_PAGE_SHARE
      );
    }
    setToggleEdit(
      'showChecklist',
      registryData,
      eventType,
      registryDetails.registryId,
      eventTypeCode,
      toggledValue,
      setShowChecklist
    );
  };
  const showChecklist = props.getShowChecklistData;
  const siteId = getSiteId();
  return (
    <Cell
      className={classnames(
        styles.detailsWrapper,
        isBabyOrBBBNewHeader && styles.registryInfo,
        'small-12 large-10'
      )}
    >
      <Heading
        level={siteId === 'BedBathCanada' ? 1 : 2}
        data-locator="registry-namelabel"
        aria-hidden="false"
        className={classnames(
          style.userNameStyle,
          styles.breakWord,
          isBBBNewRegistryHeader ? style.wedRegHeaderColor : 'pt1',
          'sm-pt0'
        )}
      >
        {getRegistryHeading()}
      </Heading>
      {props.mPulseEnabled && (
        <Instrumentation
          zoneName={'ux-primary-content-displayed'}
          markName={'ux-text-registrant-name'}
        />
      )}
      <div className={style.regDetail}>
        <div
          className={classnames(style.details, 'mr2 sm-mr2 xs-mr2')}
          data-locator="registry-idlink"
        >
          <div className={style.regText}>
            {isBabyOrBBBNewHeader ? 'ID' : registryDetails.registryIdText}
          </div>
          <p className={styles.detailsValue}>{registryDetails.registryId}</p>
        </div>
        <div
          className={classnames(style.details, 'mr2 sm-mr2 xs-mr2')}
          data-locator="registry-datelink"
        >
          <div className={style.regText}>{registryDetails.eventLabel}</div>
          <p className={styles.detailsValue}>{registryDetails.eventDate}</p>
        </div>
        {props.mPulseEnabled && (
          <Instrumentation
            zoneName={'ux-primary-content-displayed'}
            markName={'ux-text-event-date'}
          />
        )}
        {props.eventType === 'Baby' &&
        (registryDetails.gender || registryDetails.babyGender) ? (
          <div
            className={classnames(style.details, 'mr2 sm-mr2 xs-mr2')}
            data-locator="registry-gender"
          >
            <div className={style.regText}>{registryDetails.genderLabel}</div>
            <p className={styles.detailsValue}>
              {registryDetails.babyGender || returnOldGender}
            </p>
          </div>
        ) : null}
        <div
          className={classnames(style.details, 'hideOnPrint mr2 sm-mr2 xs-mr2')}
          data-locator="registry-visibilitylabel"
        >
          <div className={styles.visibility}>
            {registryDetails.visibilitylabel}
          </div>
          <p className={styles.detailsValue}>{registryDetails.visibility}</p>
          <Button
            data-tooltip={DASHBOARD_TOOLTIP_LBL}
            className="tooltip-bottom"
            theme="ghost"
            variation="noPadding"
            iconProps={{
              type: 'infoIcon',
              height: '12px',
              width: '12px',
            }}
            aria-label={DASHBOARD_TOOLTIP_LBL}
          />
          <RegistryOwnerTealiumHandler
            registryOwnerFirstCategoryList={
              props.registryOwnerFirstCategoryList
            }
            interactiveCheckList={props.interactiveCheckList}
            thankYouListSurpriseData={props.thankYouListSurpriseData}
          />
        </div>
        <ErrorBoundary>
          <div>
            {!isBabyOrBBBNewHeader && (
              <RenderEditRegistryLink
                registryDetails={registryDetails.editRegistryData}
                isPublic={
                  registryDetails.registryVO
                    ? registryDetails.registryVO.isPublic
                    : false
                }
                registryID={registryDetails.registryId}
                {...props}
                key={1}
              />
            )}
          </div>
        </ErrorBoundary>
      </div>
      {!isBabyOrBBBNewHeader && (
        <Cell className={style.registryActionButton}>
          <RegistryActionButtons
            isLoggedIn={signInDetails.isLoggedIn}
            registryId={registryDetails && registryDetails.registryId}
            {...props}
            registryLabel={formLabels}
            gender={registryDetails.babyGender}
          />
        </Cell>
      )}
      {isBabyOrBBBNewHeader && (
        <div className={style.toggleSection}>
          <ToggleButton
            theme={isBBBNewRegistryHeader ? 'bbb' : 'baby'}
            setToggleState={setChecklistToggle}
            toggleSelected={showChecklist}
          />
          <div className={style.toggleText}>
            {showChecklist ? 'Hide Checklist' : 'View Checklist'}
          </div>
        </div>
      )}
    </Cell>
  );
};

/**
 * @param {object} styles [UI style object]
 * @param {object} signInDetails [Sigin details for user]
 * @param {object} registryDetails [Details of registyr]
 * @param {object} registryLabel [lables and strings for UI]
 */

RegistryDetails.propTypes = {
  styles: PropTypes.object,
  signInDetails: PropTypes.object,
  registryDetails: PropTypes.object,
  eventType: PropTypes.string,
  mPulseEnabled: PropTypes.bool,
  registryData: PropTypes.object,
  registryOwnerFirstCategoryList: PropTypes.object,
  interactiveCheckList: PropTypes.object,
  thankYouListSurpriseData: PropTypes.object,
  isMobile: PropTypes.bool,
  isBBBNewRegistryHeader: PropTypes.bool,
  isBabyNewRegistryHeader: PropTypes.bool,
  getShowChecklistData: PropTypes.object,
  setShowChecklist: PropTypes.func,
};

export default RegistryDetails;
