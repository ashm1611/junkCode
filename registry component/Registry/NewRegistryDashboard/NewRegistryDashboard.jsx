import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { Route } from 'react-router-dom';
import Cell from '@bbb-app/core-ui/cell';
import { isBrowser } from '@bbb-app/utils/common';
import Loader from '@bbb-app/loader/containers/Loader';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import '@bbb-app/assets/icons/print-registry.svg';
import ImageWrapper from '../Dashboard/ImageWrapper/ImageWrapper';
import RegistryTabs from './utils/RegistryTabs';
import EditRegistry from '../../../../containers/Pages/Registry/EditRegistry/EditRegistry.async';
import ShareRegistry from '../RegistryOwner/ShareRegistry/ShareRegistry.async';
import styles from './NewRegistryDashboard.css';
import dashboardStyles from '../Dashboard/Dashboard.inline.css';
import BarCodeComponent from '../BarCodeComponent/BarCodeComponent';
import InteractiveChecklist from '../../../../containers/InteractiveChecklist/InteractiveChecklist.async';

const propTypes = {
  emailId: PropTypes.string,
  isMobile: PropTypes.bool,
  profileData: PropTypes.object,
  registryData: PropTypes.object,
  isSocialAnnexReady: PropTypes.bool,
  route: PropTypes.object,
  stateObjMain: PropTypes.object,
  location: PropTypes.object,
  makeReviewYourProductsConfig: PropTypes.object,
  switchConfig: PropTypes.object,
  registryConfig: PropTypes.object,
  fireTealiumAction: PropTypes.func,
  eventTypeCode: PropTypes.string,
  isPreviewYrReg: PropTypes.bool,
  track: PropTypes.func,
  dynamicContentState: PropTypes.object,
  history: PropTypes.object,
  barCodeConfig: PropTypes.object,
  PDFConfig: PropTypes.object,
  formWrapperData: PropTypes.object,
  redirectTo: PropTypes.func,
  isRecognized: PropTypes.bool,
  isSiteid: PropTypes.bool,
  barcodeModalText: PropTypes.object,
};

export const RouteWithSubRoutes = otherProps => {
  const { route } = otherProps;
  return (
    <Route
      path={route.path}
      render={props => {
        const matchParamId = pathOr('', 'match.params.id', props);
        const matchPath = pathOr('', 'match.path', props);
        const { stateObj = {}, ...componentProps } = otherProps;
        const { filter, isFiltered, selectedFilterOption } = stateObj;
        // pass the sub-routes down to keep nesting
        return (
          <route.component
            matchParamId={matchParamId}
            matchPath={matchPath}
            filter={filter}
            isFiltered={isFiltered}
            selectedFilterOption={selectedFilterOption}
            {...componentProps}
            route={route}
          />
        );
      }}
    />
  );
};
const NewRegistryDashboard = props => {
  const {
    route,
    track,
    emailId,
    isMobile,
    location,
    profileData,
    isRecognized,
    redirectTo,
    stateObjMain,
    switchConfig,
    registryData,
    eventTypeCode,
    barcodeModalText,
    isPreviewYrReg,
    registryConfig,
    isSocialAnnexReady,
    fireTealiumAction,
    dynamicContentState,
    makeReviewYourProductsConfig,
  } = props;
  const registrySummaryVO = pathOr(
    {},
    'registryResVO.registrySummaryVO',
    registryData
  );
  const {
    daysToGo,
    isPublic,
    eventType,
    eventYetToCome,
    coRegistrantFirstName,
    primaryRegistrantFirstName,
  } = registrySummaryVO;
  const [showRegBuilder, setShowRegBuilder] = useState(null);
  const [isEditFetching, setIsEditFetching] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isPublicState, setIsPublicState] = useState(isPublic === '1');
  const [privPubToggleClicked, setPrivPubToggleClicked] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const setGuestModal = value => {
    setGuestModalOpen(value);
  };
  useEffect(() => {
    setIsPublicState(isPublic === '1');
  }, [isPublic]);
  useEffect(() => {
    if (isRecognized) {
      redirectTo('/store/account/Login?manageYourRegistry');
    }
  }, [isRecognized, redirectTo]);
  const daysToGoLbl = eventYetToCome ? `${daysToGo} days to go  ` : '';
  const displayName = coRegistrantFirstName
    ? `${primaryRegistrantFirstName} & ${coRegistrantFirstName}`
    : `${primaryRegistrantFirstName}'s Registry`;
  const renderEditRegistry = () => (
    <EditRegistry
      {...props}
      privPubToggleClicked={privPubToggleClicked}
      setIsPublicState={setIsPublicState}
      setPrivPubToggleClicked={setPrivPubToggleClicked}
      setIsEditFetching={setIsEditFetching}
      openEditRegistryModal={openEditModal}
      setOpenEditModal={setOpenEditModal}
      registryID={stateObjMain.registryId}
      isNewRegDashboard
      guestModalOpen={guestModalOpen}
      setGuestModal={setGuestModal}
    />
  );
  const privPubToggle = () => (
    <div className={styles.pubOrPrivWrapper}>
      <button
        id="publicBtn"
        className={classnames(
          styles.noPadding,
          isPublicState && styles.btnDisabled
        )}
        onClick={() => setPrivPubToggleClicked(true)}
      >
        <div
          className={classnames(
            styles.pubOrPrivBasic,
            isPublicState && styles.pubActive
          )}
        >
          Public
        </div>
      </button>
      <button
        id="privBtn"
        className={classnames(
          styles.noPadding,
          !isPublicState && styles.btnDisabled
        )}
        onClick={() => setPrivPubToggleClicked(true)}
      >
        <div
          className={classnames(
            styles.pubOrPrivBasic,
            !isPublicState && styles.privActive
          )}
        >
          Private
        </div>
      </button>
    </div>
  );

  return (
    <div className={styles.layoutContainer}>
      <div className={!isMobile && 'grid-container'}>
        {isEditFetching && <Loader />}
        <GridX>
          <Cell
            className={classnames(
              'large-3 medium-12 small-12',
              styles.leftNavWrapper
            )}
          >
            <aside>
              {renderEditRegistry()}
              <div className="grid-x">
                <div
                  className={classnames(
                    'small-4 large-12 medium-3',
                    !isMobile && 'mt15'
                  )}
                >
                  <div className={styles.imageParent}>
                    {isSocialAnnexReady ? (
                      <ImageWrapper
                        isFromNewDashboard
                        styles={dashboardStyles}
                        email={emailId}
                        isMobile={isMobile}
                        eventType={eventType}
                        registryId={stateObjMain.registryId}
                        profileData={profileData}
                        makeReviewYourProductsConfig={
                          makeReviewYourProductsConfig
                        }
                      />
                    ) : (
                      <img
                        className={classnames(
                          'ml2',
                          dashboardStyles.newRegistantImage
                        )}
                        alt=""
                        src="https://via.placeholder.com/150x150"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={classnames(
                    'small-7 large-12 medium-7',
                    styles.displayNameWrapper
                  )}
                >
                  <Heading level={3} className={styles.displayName}>
                    {displayName}
                  </Heading>
                  <div className={styles.displayDateWrapper}>
                    {daysToGoLbl && (
                      <Heading level={6} className={styles.displayDate}>
                        {daysToGoLbl}
                      </Heading>
                    )}
                    {isMobile && isBrowser() ? (
                      <BarCodeComponent
                        registryId={stateObjMain.registryId}
                        barCodeConfig={props.barCodeConfig}
                        PDFConfig={props.PDFConfig}
                        barcodeModalText={barcodeModalText}
                        isFromNewDashboard
                      />
                    ) : (
                      privPubToggle()
                    )}
                  </div>
                  {isMobile && <div className="my1"> {privPubToggle()}</div>}
                </div>
              </div>
              <div className={styles.shareRegWrapper}>
                <ShareRegistry
                  showLink
                  emailId={emailId}
                  isMobile={isMobile}
                  location={location}
                  track={track}
                  eventType={eventType}
                  registryId={stateObjMain.registryId}
                  switchConfig={switchConfig}
                  registryData={registryData}
                  eventTypeCode={eventTypeCode}
                  registryConfig={registryConfig}
                  labelData={dynamicContentState}
                  isPreviewYrReg={isPreviewYrReg}
                  handleTealiumEvent={fireTealiumAction}
                  isNewRegDashboard
                  isPublicState={isPublicState}
                  formWrapperData={props.formWrapperData}
                />
              </div>
              {!isMobile && (
                <div className=" md-my2">
                  <RegistryTabs
                    isMobile={isMobile}
                    location={location}
                    registryId={stateObjMain.registryId}
                    openEditModal={openEditModal}
                    setOpenEditModal={setOpenEditModal}
                    showRegBuilder={showRegBuilder}
                    setShowRegBuilder={setShowRegBuilder}
                  />
                </div>
              )}
            </aside>
          </Cell>
          <Cell className={classnames(styles.rightWrapper, 'large-9')}>
            {!showRegBuilder ? (
              <React.Fragment>
                {route.routes.map((routeItem, i) => (
                  <RouteWithSubRoutes
                    key={i}
                    route={routeItem}
                    stateObj={stateObjMain}
                    eventType={eventType}
                    eventTypeCode={eventTypeCode}
                    changeFilter={props.changeFilter}
                    updateFilterItemCount={props.updateFilterItemCount}
                    returnFilteredItemsCount={props.returnFilteredItemsCount}
                    mPulseEnabled={props.isMPulseEnabled}
                    discontinuedItemCount={stateObjMain.discontinuedItemCount}
                    resetFilter={props.resetFilter}
                    updateParam={props.updateParam}
                    saveStoreInfo={props.saveStoreInfo}
                    isStoreAvailable={stateObjMain.isStoreAvailable}
                    contentStackSelectors={props.contentStackSelectors}
                    fetchContentStack={props.fetchContentStack}
                    fireTealiumQuiz={props.fireTealiumQuiz}
                    handleCollaborationModal={props.handleCollaborationModal}
                    isFromRecommendation={props.isFromRecommendation}
                    setQuizFromRecommendation={props.setQuizFromRecommendation}
                    history={props.history}
                    setShowRegBuilder={setShowRegBuilder}
                    setGuestModalOpen={setGuestModalOpen}
                    setGuestModal={setGuestModal}
                  />
                ))}
              </React.Fragment>
            ) : (
              <InteractiveChecklist
                setShowRegBuilder={setShowRegBuilder}
                showRegBuilder={showRegBuilder}
                siteId={props.isSiteid}
                isFromNewDashboard
                {...props}
              />
            )}
          </Cell>
        </GridX>
      </div>
    </div>
  );
};

NewRegistryDashboard.propTypes = propTypes;

export default NewRegistryDashboard;
