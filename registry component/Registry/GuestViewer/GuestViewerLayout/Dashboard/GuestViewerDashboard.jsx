import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import { getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import styles from './Dashboard.inline.css';
import RegistryDetails from './DashboardDetails';
import ImageWrapper from '../../../Dashboard/ImageWrapper/ImageWrapper';
import GiftWrapper from './GiftWrapper';
import {
  REGISTRY_ID_TEXT_LBL,
  MOB_REGISTRY_ID_TEXT_LBL,
  MOB_EVENT_LBL,
  YOUR_ACCOUNT_LBL,
  SIGNIN_LBL,
  DASHBOARD_TOOLTIP_LBL,
  GIFT_RECIEVED_LBL,
  REG_GENDER_LBL,
  REG_PUBLIC_LBL,
  REG_PRIVATE_LBL,
  MOBILE_EDIT_LBL,
  EDIT_LBL,
  GIFTS_ADDED_LBL,
  WEDDING,
  WEDDING_EVENT_LBL,
  BABY,
  BABY_EVENT_LBL,
  PNH,
  PNH_EVENT_LBL,
  OTHER_EVENT_LBL,
} from './../../../constants';

import { VISIBILITY_TBS_LBL, VISIBILITY_LBL } from './constants';

export const returnDateLabel = eventType => {
  if (eventType === WEDDING) {
    return WEDDING_EVENT_LBL;
  } else if (eventType === BABY) {
    return BABY_EVENT_LBL;
  } else if (eventType === PNH) {
    return PNH_EVENT_LBL;
  }
  return OTHER_EVENT_LBL;
};
export const compareLabels = (condition, ifTrue, ifFalse) =>
  condition ? ifTrue : ifFalse;

export const renderGiftWrapper = props => {
  return (
    <Cell
      className={classnames(
        styles.giftContainer,
        'small-12 large-3 mt1 md-mb3 sm-mb3'
      )}
    >
      <GiftWrapper
        giftRegistered={props.giftRegistered}
        giftsAddedLabel={GIFTS_ADDED_LBL}
        giftPurchased={props.giftTotalPurchased}
        giftPurchasedLabel={GIFT_RECIEVED_LBL}
        registryDetails={props.registryDetails}
        styles={styles}
        registrySiteConfig={props.registrySiteConfig}
        barCodeConfig={props.barCodeConfig}
        PDFConfig={props.PDFConfig}
        isMobile={props.isMobile}
        barcodeModalText={props.barcodeModalText}
        isBarcodeEnabled={props.isBarcodeEnabled}
        mPulseEnabled={props.mPulseEnabled}
        isInternationalUser={props.isInternationalUser}
      />
    </Cell>
  );
};

export const renderDashboardDeatils = props => {
  return (
    <Cell className={classnames(styles.registryWrapper, 'small-12 large-9')}>
      <GridX className={classnames('grid-margin-x', styles.registryContainer)}>
        {props.isSocialAnnexReady === true && (
          <ImageWrapper
            numberOfDays={props.numberOfDays}
            styles={styles}
            registryDetails={props.registryDetails}
            profileData={props.profileData}
            makeReviewYourProductsConfig={props.makeReviewYourProductsConfig}
            registryId={props.registryId}
            email={props.email}
            eventType={props.eventType}
            giftGiver
            primaryRegistrantInitial={props.primaryRegistrantInitial}
            coRegistrantInitial={props.coRegistrantInitial}
            isMobile={props.isMobile}
          />
        )}
        {!props.isSocialAnnexReady && <div className={styles.imgHold} />}
        <RegistryDetails styles={styles} {...props} />
      </GridX>
    </Cell>
  );
};

export const renderDashboard = props => {
  return (
    <GridX
      className={classnames(
        styles.printStyle,
        'align-items-center grid-container'
      )}
    >
      {renderDashboardDeatils(props)}
      {renderGiftWrapper(props)}
    </GridX>
  );
};

/**
 * This renders the dashboard view for Gift giver
 *
 * @param { object } registryData registry Data
 * @param { object } editRegistryData for edit registry Data
 * @param { boolean } isMobile check for mobile device
 * @param { object } isLoggedIn check if user is logged in or not
 */
export const Dashboard = props => {
  if (isEmpty(props.registryData)) {
    return null;
  }
  const registryResVO = pathOr(null, 'registryResVO', props.registryData);
  const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);
  const registryVO = pathOr(null, 'registryVO', registryResVO);
  const gender = pathOr(null, 'eventVO.babyGender', registrySummaryVO);
  const signInURL = pathOr(null, 'signIn', props.endPoints);
  const {
    coRegistrantFirstName,
    primaryRegistrantFirstName,
    eventYetToCome,
    daysToGo,
    isPublic,
    registryId,
    eventDate,
    giftRegistered,
    giftPurchased,
    primaryRegistrantLastName,
    coRegistrantLastName,
    giftTotalPurchased,
    babyGender,
  } = registrySummaryVO;

  const userName = compareLabels(
    coRegistrantFirstName,
    `${primaryRegistrantFirstName} & ${coRegistrantFirstName}`,
    primaryRegistrantFirstName
  );

  const coRegistrantLastInitial = coRegistrantLastName
    ? coRegistrantLastName[0]
    : '';
  const primaryRegistrantInitial = `${primaryRegistrantFirstName[0]}${
    primaryRegistrantLastName ? primaryRegistrantLastName[0] : ''
  }`;
  const coRegistrantInitial = coRegistrantFirstName
    ? `${coRegistrantFirstName[0]}${coRegistrantLastInitial}`
    : null;
  const numberOfDays = compareLabels(eventYetToCome, daysToGo, null);
  const eventLabel = compareLabels(
    props.isMobile,
    MOB_EVENT_LBL,
    returnDateLabel(props.eventType)
  );
  const isSiteid = getSiteId();
  const tbsSiteId =
    isSiteid === 'TBS_BedBathCanada' || isSiteid === 'TBS_BedBathUS';
  const visibilitylabel = compareLabels(
    props.isMobile,
    '',
    tbsSiteId ? VISIBILITY_TBS_LBL : VISIBILITY_LBL
  );
  const visibility = compareLabels(
    isPublic === '1',
    REG_PUBLIC_LBL,
    REG_PRIVATE_LBL
  );
  const editText = compareLabels(props.isMobile, MOBILE_EDIT_LBL, EDIT_LBL);
  const registryIdText = compareLabels(
    props.isMobile,
    MOB_REGISTRY_ID_TEXT_LBL,
    REGISTRY_ID_TEXT_LBL
  );
  const registryDetails = {
    userName,
    registryIdText,
    registryId,
    eventLabel,
    eventDate,
    gender,
    visibilitylabel,
    visibility,
    dashboardTooltip: DASHBOARD_TOOLTIP_LBL,
    genderLabel: REG_GENDER_LBL,
    yourAccount: YOUR_ACCOUNT_LBL,
    registrySummaryVO,
    registryVO,
    editRegistryData: props.editRegistryData,
    babyGender,
  };
  const signInDetails = {
    isLoggedIn: props.isLoggedIn,
    signInURL,
    editText,
    signInLabel: SIGNIN_LBL,
  };

  return renderDashboard({
    numberOfDays,
    registryDetails,
    signInDetails,
    giftRegistered,
    giftPurchased,
    giftTotalPurchased,
    primaryRegistrantInitial,
    coRegistrantInitial,
    ...props,
  });
};

Dashboard.propTypes = {
  registryData: PropTypes.object,
  editRegistryData: PropTypes.object,
  isMobile: PropTypes.bool,
  endPoints: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  clearEditRegistryData: PropTypes.func,
  closeModalFlag: PropTypes.bool,
  editModalError: PropTypes.bool,
  accountAddress: PropTypes.object,
  barCodeConfig: PropTypes.object,
  PDFConfig: PropTypes.object,
  profileData: PropTypes.object,
};

renderDashboardDeatils.propTypes = {
  numberOfDays: PropTypes.number,
  registryDetails: PropTypes.object,
  eventType: PropTypes.string,
  profileData: PropTypes.object,
  makeReviewYourProductsConfig: PropTypes.object,
  email: PropTypes.string,
  registryId: PropTypes.string,
  isSocialAnnexReady: PropTypes.bool,
  primaryRegistrantInitial: PropTypes.string,
  coRegistrantInitial: PropTypes.string,
  isMobile: PropTypes.bool,
};

renderGiftWrapper.propTypes = {
  giftRegistered: PropTypes.number,
  registryDetails: PropTypes.object,
  registrySiteConfig: PropTypes.object,
  barCodeConfig: PropTypes.object,
  PDFConfig: PropTypes.object,
  isMobile: PropTypes.bool,
  barcodeModalText: PropTypes.object,
  isBarcodeEnabled: PropTypes.bool,
  mPulseEnabled: PropTypes.bool,
  isInternationalUser: PropTypes.bool,
  giftTotalPurchased: PropTypes.number,
};

export default Dashboard;
