import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import { getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import AccountSignInContainer from '@bbb-app/account-signin/containers/AccountSignIn.async';
import styles from './Dashboard.inline.css';
import ImageWrapper from './ImageWrapper/ImageWrapper';
import RegistryDetails from './RegistryDetails/RegistryDetails.async';
import GiftWrapper from './GiftWrapper/giftWrapper.async';
import MyFundGiftWrapper from './MyFundGiftWrapper/GiftWrapper.async';
import { enableBookAnAppointment } from '../../../../components/abtests/BookAnAppointmentExperiment/BookAnAppointmentUtil';
import NewRegistryHeaderLayout from './NewRegistryLayout/NewRegistryLayout.async';
import NewRegistryDashboard from '../NewRegistryDashboard/NewRegistryDashboard.async';
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
  WEDDING_EVENT_LBL,
  WEDDING,
  BABY,
  BABY_EVENT_LBL,
  PNH,
  PNH_EVENT_LBL,
  OTHER_EVENT_LBL,
} from './../../Registry/constants';
import { VISIBILITY_TBS_LBL, VISIBILITY_LBL } from './constants';
/* labels */
const GIFT_SWIP_SWAP_LBL = 'Ship or Swap';

export const compareLabels = (condition, ifTrue, ifFalse) =>
  condition ? ifTrue : ifFalse;
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
const renderLoginModal = ({
  loginModalVisibility,
  onModalClose,
  loginLabels,
  myFundGiftTooltipLink,
}) => {
  return (
    <ModalDialog
      mountedState={loginModalVisibility}
      underlayClickExits={false}
      titleAriaLabel="SignInModal"
      titleClass="mt1 mb1"
      verticallyCenter
      variation="small"
      onModalClose={onModalClose}
      closeDataLocator="checkout-crossicon"
    >
      <AccountSignInContainer
        inPage={false}
        afterSignInUrl={myFundGiftTooltipLink}
        loginLabels={loginLabels}
      />
    </ModalDialog>
  );
};

export const renderGiftWrapper = ({
  giftRegistered,
  giftPurchased,
  registryDetails,
  registrySiteConfig,
  barCodeConfig,
  PDFConfig,
  isMobile,
  barcodeModalText,
  isBarcodeEnabled,
  mPulseEnabled,
  isInternationalUser,
  redirectMyFundPage,
  myFundsData,
  pageConfig,
  track,
  paramEnableLoyalty,
}) => {
  const eventType = pathOr(
    null,
    `registrySummaryVO.eventType`,
    registryDetails
  );
  const isBabyTypeRegistry = eventType === 'Baby';
  const isEnableBookAnAppointmentSS = enableBookAnAppointment();
  const isBuyBuyBaby = getSiteId() === 'BuyBuyBaby';
  const bookAnAppointmentThreshold = pathOr(
    5,
    'bookAnAppointThreshold',
    pageConfig
  );

  const isRenderBookAnAppointment =
    isEnableBookAnAppointmentSS &&
    isBabyTypeRegistry &&
    isBuyBuyBaby &&
    giftRegistered < bookAnAppointmentThreshold;
  const totalBal = pathOr(0, 'balance', myFundsData);
  const formattedFunds =
    totalBal > 0 && pathOr('$0', 'formattedBalance', myFundsData);
  const GiftComponent = totalBal !== 0 ? MyFundGiftWrapper : GiftWrapper;
  const giftContainerStyle =
    totalBal !== 0 ? styles.myFundGiftContainer : styles.giftContainer;
  return (
    <Cell
      className={classnames(
        giftContainerStyle,
        'small-12 large-3 mt1 md-mb3 sm-mb3'
      )}
    >
      <GiftComponent
        paramEnableLoyalty={paramEnableLoyalty}
        giftRegistered={giftRegistered}
        giftsAddedLabel={GIFTS_ADDED_LBL}
        giftPurchased={giftPurchased}
        giftPurchasedLabel={GIFT_RECIEVED_LBL}
        giftSwipSwapLabel={GIFT_SWIP_SWAP_LBL}
        registryDetails={registryDetails}
        styles={styles}
        registrySiteConfig={registrySiteConfig}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        isMobile={isMobile}
        barcodeModalText={barcodeModalText}
        isBarcodeEnabled={isBarcodeEnabled}
        mPulseEnabled={mPulseEnabled}
        isInternationalUser={isInternationalUser}
        redirectMyFundPage={redirectMyFundPage}
        totalFunds={formattedFunds}
        pageConfig={pageConfig}
        track={track}
        isRenderBookAnAppointment={isRenderBookAnAppointment}
      />
    </Cell>
  );
};

export const renderDashboardDeatils = props => {
  const {
    numberOfDays,
    registryDetails,
    eventType,
    profileData,
    makeReviewYourProductsConfig,
    registryId,
    email,
    isSocialAnnexReady,
    primaryRegistrantInitial,
    coRegistrantInitial,
    isMobile,
    isBBBNewRegistryHeader,
    isBabyNewRegistryHeader,
  } = props;
  const isBabyOrBBBNewHeader =
    isBBBNewRegistryHeader || isBabyNewRegistryHeader;
  return (
    <Cell
      className={classnames(styles.registryWrapper, {
        'small-12 large-9': !isBabyOrBBBNewHeader,
        'small-12 large-7': isBabyOrBBBNewHeader,
        [styles.resetMargin]: isBabyOrBBBNewHeader && isMobile,
      })}
    >
      <GridX className={classnames('grid-margin-x', styles.registryContainer)}>
        {isSocialAnnexReady === true && (
          <ImageWrapper
            numberOfDays={numberOfDays}
            styles={styles}
            registryDetails={registryDetails}
            profileData={profileData}
            makeReviewYourProductsConfig={makeReviewYourProductsConfig}
            registryId={registryId}
            email={email}
            eventType={eventType}
            primaryRegistrantInitial={primaryRegistrantInitial}
            coRegistrantInitial={coRegistrantInitial}
            isMobile={isMobile}
          />
        )}
        {!isSocialAnnexReady && <div className={styles.imgHold} />}
        <RegistryDetails {...props} styles={styles} />
      </GridX>
    </Cell>
  );
};

const renderNewRegistryLayout = ({
  registryLabel,
  numberOfDays,
  registryDetails,
  signInDetails,
  labels,
  clearEditRegistryData,
  closeModalFlag,
  registryConfig,
  fetchCoRegistrantProfileStatus,
  coRegProfileStatus,
  resetCoRegistrantProfileStatus,
  dynamicContentState,
  editModalError,
  eventType,
  accountAddress,
  openEditRegistryModal,
  profileData,
  eventTypeCode,
  mPulseEnabled,
  registryData,
  primaryRegistrantInitial,
  coRegistrantInitial,
  loginLabels,
  isMobile,
  isPreviewYrReg,
  isBBBNewRegistryHeader,
  isBabyNewRegistryHeader,
  handleCollaborationModal,
  isNewRegDashboard,
  ...props
}) => {
  return (
    <Cell
      className={classnames(
        isNewRegDashboard ? styles.alignIconNewDashboard : styles.alignIcon,
        'small-12 large-2'
      )}
    >
      <NewRegistryHeaderLayout
        registryLabel={registryLabel}
        numberOfDays={numberOfDays}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        clearEditRegistryData={clearEditRegistryData}
        closeModalFlag={closeModalFlag}
        registryConfig={registryConfig}
        fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
        coRegProfileStatus={coRegProfileStatus}
        resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
        dynamicContentState={dynamicContentState}
        editModalError={editModalError}
        eventType={eventType}
        accountAddress={accountAddress}
        openEditRegistryModal={openEditRegistryModal}
        profileData={profileData}
        eventTypeCode={eventTypeCode}
        mPulseEnabled={mPulseEnabled}
        registryData={registryData}
        primaryRegistrantInitial={primaryRegistrantInitial}
        coRegistrantInitial={coRegistrantInitial}
        loginLabels={loginLabels}
        isMobile={isMobile}
        isPreviewYrReg={isPreviewYrReg}
        isBabyNewRegistryHeader={isBabyNewRegistryHeader}
        isBBBNewRegistryHeader={isBBBNewRegistryHeader}
        handleCollaborationModal={handleCollaborationModal}
        {...props}
      />
    </Cell>
  );
};

export const renderDashboard = otherProps => {
  const {
    registryDetails,
    giftRegistered,
    giftPurchased,
    giftTotalPurchased,
    profileData,
    registrySiteConfig,
    barCodeConfig,
    PDFConfig,
    isMobile,
    barcodeModalText,
    isBarcodeEnabled,
    mPulseEnabled,
    isInternationalUser,
    loginModalVisibility,
    redirectMyFundPage,
    onModalClose,
    loginLabels,
    myFundGiftTooltipLink,
    myFundsData,
    switchConfigGlobal,
    pageConfig,
    track,
    enableICToggle,
    paramEnableLoyalty,
    isNewRegDashboard,
  } = otherProps;
  const enableRBYRFeature = pathOr(
    false,
    'enableRBYRFeature',
    switchConfigGlobal
  );
  const isBBBNewRegistryHeader =
    enableICToggle && ['BedBathUS', 'BedBathCanada'].includes(getSiteId());
  const isBabyNewRegistryHeader =
    enableICToggle && getSiteId() === 'BuyBuyBaby';
  const isBabyOrBBBNewHeader =
    isBBBNewRegistryHeader || isBabyNewRegistryHeader;
  if (isNewRegDashboard) return <NewRegistryDashboard {...otherProps} />;
  return isMobile ? (
    <GridX
      className={classnames(
        styles.printStyle,
        'align-items-center grid-container'
      )}
    >
      {isBabyOrBBBNewHeader &&
        renderNewRegistryLayout({
          isBBBNewRegistryHeader,
          isBabyNewRegistryHeader,
          ...otherProps,
        })}
      {renderDashboardDeatils({
        isBBBNewRegistryHeader,
        isBabyNewRegistryHeader,
        ...otherProps,
      })}
      {renderLoginModal({
        loginModalVisibility,
        onModalClose,
        loginLabels,
        myFundGiftTooltipLink,
      })}
      {renderGiftWrapper({
        giftRegistered,
        giftPurchased,
        giftTotalPurchased,
        registryDetails,
        registrySiteConfig,
        barCodeConfig,
        PDFConfig,
        profileData,
        isMobile,
        barcodeModalText,
        isBarcodeEnabled,
        mPulseEnabled,
        isInternationalUser,
        redirectMyFundPage,
        myFundsData,
        enableRBYRFeature,
        pageConfig,
        track,
        paramEnableLoyalty,
      })}
    </GridX>
  ) : (
    <GridX
      className={classnames(
        styles.printStyle,
        'align-items-center grid-container'
      )}
    >
      {renderDashboardDeatils({
        isBBBNewRegistryHeader,
        isBabyNewRegistryHeader,
        ...otherProps,
      })}
      {isBabyOrBBBNewHeader &&
        renderNewRegistryLayout({
          isBBBNewRegistryHeader,
          isBabyNewRegistryHeader,
          ...otherProps,
        })}
      {renderLoginModal({
        loginModalVisibility,
        onModalClose,
        loginLabels,
        myFundGiftTooltipLink,
      })}
      {renderGiftWrapper({
        giftRegistered,
        giftPurchased,
        giftTotalPurchased,
        registryDetails,
        registrySiteConfig,
        barCodeConfig,
        PDFConfig,
        profileData,
        isMobile,
        barcodeModalText,
        isBarcodeEnabled,
        mPulseEnabled,
        isInternationalUser,
        redirectMyFundPage,
        myFundsData,
        enableRBYRFeature,
        pageConfig,
        track,
        paramEnableLoyalty,
      })}
    </GridX>
  );
};

/**
 * This renders the dashboard view for both Registry Owner and Gift giver
 *
 * @param { object } registryData registry Data
 * @param { object } editRegistryData for edit registry Data
 * @param { boolean } isMobile check for mobile device
 * @param { object } isLoggedIn check if user is logged in or not
 */
export const Dashboard = props => {
  const {
    registryData,
    editRegistryData,
    isMobile,
    endPoints,
    isLoggedIn,
    eventType,
    paramEnableLoyalty,
  } = props;
  if (isEmpty(registryData)) {
    return null;
  }
  const registryResVO = pathOr(null, 'registryResVO', registryData);
  const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);
  const registryVO = pathOr(null, 'registryVO', registryResVO);
  const gender = pathOr(null, 'eventVO.babyGender', registrySummaryVO);
  const signInURL = pathOr(null, 'signIn', endPoints);
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
    isMobile,
    MOB_EVENT_LBL,
    returnDateLabel(eventType)
  );
  const isSiteid = getSiteId();
  const tbsSiteId =
    isSiteid === 'TBS_BedBathCanada' || isSiteid === 'TBS_BedBathUS';
  const visibilitylabel = compareLabels(
    isMobile,
    '',
    tbsSiteId ? VISIBILITY_TBS_LBL : VISIBILITY_LBL
  );
  const visibility = compareLabels(
    isPublic === '1',
    REG_PUBLIC_LBL,
    REG_PRIVATE_LBL
  );
  const editText = compareLabels(isMobile, MOBILE_EDIT_LBL, EDIT_LBL);
  const registryIdText = compareLabels(
    isMobile,
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
    editRegistryData,
    babyGender,
  };
  const signInDetails = {
    isLoggedIn,
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
    eventType,
    isMobile,
    registryData,
    primaryRegistrantInitial,
    coRegistrantInitial,
    paramEnableLoyalty,
    isSiteid,
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
  paramEnableLoyalty: PropTypes.bool,
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
  isBBBNewRegistryHeader: PropTypes.bool,
  isBabyNewRegistryHeader: PropTypes.bool,
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
  redirectMyFundPage: PropTypes.func,
  myFundsData: PropTypes.object,
  giftPurchased: PropTypes.number,
  pageConfig: PropTypes.object,
  track: PropTypes.func,
  paramEnableLoyalty: PropTypes.bool,
};

renderLoginModal.propTypes = {
  loginModalVisibility: PropTypes.bool,
  onModalClose: PropTypes.func,
  loginLabels: PropTypes.object,
  myFundGiftTooltipLink: PropTypes.string,
};

renderNewRegistryLayout.propTypes = {
  registryLabel: PropTypes.object,
  numberOfDays: PropTypes.number,
  registryDetails: PropTypes.object,
  signInDetails: PropTypes.object,
  labels: PropTypes.object,
  clearEditRegistryData: PropTypes.func,
  closeModalFlag: PropTypes.bool,
  registryConfig: PropTypes.object,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  resetCoRegistrantProfileStatus: PropTypes.func,
  dynamicContentState: PropTypes.object,
  editModalError: PropTypes.bool,
  eventType: PropTypes.string,
  accountAddress: PropTypes.object,
  openEditRegistryModal: PropTypes.bool,
  profileData: PropTypes.object,
  eventTypeCode: PropTypes.string,
  mPulseEnabled: PropTypes.bool,
  registryData: PropTypes.object,
  primaryRegistrantInitial: PropTypes.string,
  coRegistrantInitial: PropTypes.string,
  loginLabels: PropTypes.object,
  isMobile: PropTypes.bool,
  isPreviewYrReg: PropTypes.bool,
  isBBBNewRegistryHeader: PropTypes.bool,
  isBabyNewRegistryHeader: PropTypes.bool,
  handleCollaborationModal: PropTypes.func,
  isNewRegDashboard: PropTypes.bool,
};

export default Dashboard;
