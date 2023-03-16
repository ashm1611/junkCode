import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import qs from 'qs';
import pathOr from 'lodash/fp/pathOr';
import focus from '@bbb-app/hoc/focus';
import Heading from '@bbb-app/core-ui/heading';
import Icon from '@bbb-app/core-ui/icon';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Message from '@bbb-app/core-ui/message';
import Button from '@bbb-app/core-ui/button';
import RenderInput from '@bbb-app/forms/components/FormInput';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import AccountSignIn from '@bbb-app/account-signin/containers/AccountSignIn.async';
import getSiteId from '@bbb-app/utils/getSiteId';
import Skeleton from '../../../../containers/Pages/Registry/EditRegistry/Skeleton/Skeleton';
import {
  EDIT_REGISTRY_FORM_DATA_LOCATOR,
  DAVID_BRIDAL_EDIT_MODAL_CONTENT,
} from '../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';
import '../../../../assets/icons/baby-gear.svg';
import '../../../../assets/icons/bbb-gear.svg';
import PickupInStoreModalWrapper from '../../../../containers/PickupInStoreModal/PickupInStoreModalWrapper.async';
import EditWeddingRegistry from './WeddingRegistryForm/EditWeddingRegistry';
import EditBabyRegistry from './BabyRegistryForm/EditBabyRegistry';
import EditOtherRegistry from './OtherRegistryForm/EditOtherRegistry';
import RenderInputComponent from '../../Registry/CreateRegistry/Components/FormComponents/RenderInput';

import { eventTypeConst } from '../CreateRegistry/CreateRegistryUtils';
import styles from './EditRegistry.css';
import CreateRegistryWithUsBanner from '../../AccountRegistries/CreateRegistryWithUsBanner/CreateRegistryWithUsBanner';
import {
  DAVID_BRIDAL_EDIT_MODAL_HEADING_LABEL,
  EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_LBL,
  EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_TBS_LBL,
} from './../constants';
import {
  EDIT_REGISTRY_MODAL_TITLE_LBL,
  EDIT_REGISTRY_SUBMIT_BUTTON_LBL,
  EDIT_REG_MODAL_ERROR_LBL,
} from './constants';

const siteId = getSiteId();
const EDIT_REGISTRY_SHARE_WITH_FRIENDS_LBL =
  siteId === 'BedBathUS'
    ? 'to share your registry'
    : 'to share your profile with friends and family';

const FocusableMessage = focus(Message);

const propTypes = {
  isPublic: PropTypes.string.isRequired,
  signInDetails: PropTypes.object,
  customLabel: PropTypes.string,
  registryID: PropTypes.string,
  registryDetails: PropTypes.object,
  labels: PropTypes.object.isRequired,
  isFetchingEditRegistryDetails: PropTypes.bool,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  dynamicContentState: PropTypes.object,
  registryConfig: PropTypes.object,
  editModalError: PropTypes.bool,
  loginLabels: PropTypes.object,
  isRecognized: PropTypes.bool,
  checkFormSubmit: PropTypes.func,
  setEditRegistryFlag: PropTypes.func,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  showMoveInfo: PropTypes.func,
  hideMoveInfo: PropTypes.func,
  showShippingInfo: PropTypes.func,
  hideShippingInfo: PropTypes.func,
  onSelectSubscribe: PropTypes.func,
  onSelectThirdPartyOption: PropTypes.func,
  toggleModalState: PropTypes.func,
  coRegEmailFlag: PropTypes.func,
  deviceConfig: PropTypes.object,
  location: PropTypes.object,
  scrollEvent: PropTypes.func,
  handleEditRegistryClick: PropTypes.func,
  enabledVendors: PropTypes.object,
  createRegistryLabels: PropTypes.object,
  buttonTheme: PropTypes.string,
  LearnMoreModalGG: PropTypes.bool,
  isMobile: PropTypes.bool,
  onDeviceVerificationModalOpen: PropTypes.func,
  hideLoginView: PropTypes.bool,
  routeData: PropTypes.object,
  isBBBNewRegistryHeader: PropTypes.bool,
  isBabyNewRegistryHeader: PropTypes.bool,
  switchConfigGlobal: PropTypes.object,
  getContent: PropTypes.func,
  eventType: PropTypes.string,
  isNewRegDashboard: PropTypes.bool,
  guestModalOpen: PropTypes.bool,
  setGuestModal: PropTypes.func,
  contentStackSelectors: PropTypes.object,
};

/**
 * @method renderErrorMessage to render error message from API
 * @param {object} error  an error object
 */
const renderErrorMessage = error => {
  const lockErrorMessage = pathOr('', 'message', error);
  const message = lockErrorMessage.split(':');
  message.shift();
  const errorMessage = message.join();

  return (
    <Notification
      status={'error'}
      content={
        errorMessage && errorMessage.length ? errorMessage : lockErrorMessage
      }
      wrapperClass={'p1 mb2'}
    />
  );
};

/**
 * @method focusAbleMessage Add focusable mesaage to show server side error
 * @param {*} errorrenderFor
 */
const focusAbleMessage = error => {
  const errorMessage = renderErrorMessage(error);
  // if (typeof errorMessage !== 'string') return null;
  // need to make sure that it's retuning a React component otherwise use the above code
  return <FocusableMessage>{errorMessage}</FocusableMessage>;
};
export class EditRegistryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginModal = this.renderLoginModal.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
    this.renderBabyOrOtherForm = this.renderBabyOrOtherForm.bind(this);
    this.pickUpInStoreModalOpen = false;
    this.state = {
      registryFavStoreSearch: false,
    };
  }
  componentDidMount() {
    const { switchConfigGlobal, labels } = this.props;
    const enableCSLabels = pathOr(false, 'enableCSLabels', switchConfigGlobal);
    if (enableCSLabels) {
      const referredContentIds = LabelsUtil.getReferredContentIds(labels);
      if (referredContentIds.length) {
        this.props.getContent(referredContentIds);
      }
    }
  }
  setRegistryFavStoreSearchFlag = value => {
    this.setState({
      registryFavStoreSearch: value,
    });
  };
  setPickUpInStoreModalOpen = value => {
    this.pickUpInStoreModalOpen = value;
  };

  getContentID = (labels, contentKey) => {
    const referredContent = (labels && labels.referredContent) || [];
    const referredKey = referredContent.find(obj => obj.key === contentKey);
    return referredKey && referredKey.id;
  };
  /**
   * Render either baby or other edit registry form based on event type
   */
  renderBabyOrOtherForm(eventType) {
    const {
      fetchCoRegistrantProfileStatus,
      resetCoRegistrantProfileStatus,
      coRegProfileStatus,
      registryConfig,
      dynamicContentState,
      registryDetails,
      stateObj,
      updateState,
      showMoveInfo,
      hideMoveInfo,
      showShippingInfo,
      hideShippingInfo,
      onSelectSubscribe,
      onSelectThirdPartyOption,
      coRegEmailFlag,
      enabledVendors,
      createRegistryLabels,
      switchConfigGlobal,
      labels,
    } = this.props;
    const coRegOwner = pathOr(null, 'coRegOwner', registryDetails);
    const enableCSLabels = pathOr(false, 'enableCSLabels', switchConfigGlobal);
    const EditRegistryReferredLabel = enableCSLabels
      ? labels
      : labels && labels.RBYR;
    const deactivateRegistryContentId = this.getContentID(
      enableCSLabels ? labels : createRegistryLabels,
      'deactivateRegistryMessage'
    );
    if (eventType !== null) {
      if (eventType === eventTypeConst.BABY) {
        return (
          <EditBabyRegistry
            registryDetails={registryDetails}
            stateObj={stateObj}
            labels={labels}
            updateState={updateState}
            eventType={eventType}
            showMoveInfo={showMoveInfo}
            hideMoveInfo={hideMoveInfo}
            showShippingInfo={showShippingInfo}
            hideShippingInfo={hideShippingInfo}
            onSelectSubscribe={onSelectSubscribe}
            onSelectThirdPartyOption={onSelectThirdPartyOption}
            coRegOwner={coRegOwner}
            rbyrDescriptionId={this.getContentID(
              EditRegistryReferredLabel,
              'rbyrDescription'
            )}
            rbyrTermsAndConditionId={this.getContentID(
              EditRegistryReferredLabel,
              'rbyrTermsAndConditions'
            )}
            dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
            registryConfig={registryConfig}
            fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
            coRegProfileStatus={coRegProfileStatus}
            resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
            dynamicContentState={dynamicContentState}
            coRegEmailFlag={coRegEmailFlag}
            globalSwitchConfig={enabledVendors}
            deactivateRegistryContentId={deactivateRegistryContentId}
            toggleModalState={this.props.toggleModalState}
            {...this.props}
          />
        );
      }
      return (
        <EditOtherRegistry
          registryDetails={registryDetails}
          stateObj={stateObj}
          labels={labels}
          updateState={updateState}
          eventType={eventType}
          showMoveInfo={showMoveInfo}
          hideMoveInfo={hideMoveInfo}
          showShippingInfo={showShippingInfo}
          hideShippingInfo={hideShippingInfo}
          onSelectSubscribe={onSelectSubscribe}
          onSelectThirdPartyOption={onSelectThirdPartyOption}
          coRegOwner={coRegOwner}
          rbyrDescriptionId={this.getContentID(
            EditRegistryReferredLabel,
            'rbyrDescription'
          )}
          rbyrTermsAndConditionId={this.getContentID(
            EditRegistryReferredLabel,
            'rbyrTermsAndConditions'
          )}
          dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
          registryConfig={registryConfig}
          fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
          coRegProfileStatus={coRegProfileStatus}
          resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
          dynamicContentState={dynamicContentState}
          coRegEmailFlag={coRegEmailFlag}
          globalSwitchConfig={enabledVendors}
          deactivateRegistryContentId={deactivateRegistryContentId}
          toggleModalState={this.props.toggleModalState}
          setRegistryFavStoreSearchFlag={this.setRegistryFavStoreSearchFlag}
          {...this.props}
        />
      );
    }
    return null;
  }
  /**
   * Render Edit Registry Form
   */

  renderEditForm() {
    const {
      registryConfig,
      fetchCoRegistrantProfileStatus,
      coRegProfileStatus,
      resetCoRegistrantProfileStatus,
      dynamicContentState,
      registryDetails,
      labels,
      registryID,
      editModalError,
      checkFormSubmit,
      stateObj,
      updateState,
      showMoveInfo,
      hideMoveInfo,
      showShippingInfo,
      hideShippingInfo,
      onSelectSubscribe,
      onSelectThirdPartyOption,
      coRegEmailFlag,
      deviceConfig,
      location,
      enabledVendors,
      createRegistryLabels,
      eventType,
    } = this.props;

    const { errorMessages } = stateObj;
    const isErrorPresent = !isEmpty(errorMessages);
    const coRegOwner = pathOr(null, 'coRegOwner', registryDetails);
    const id = this.getContentID(labels, DAVID_BRIDAL_EDIT_MODAL_CONTENT);
    let data;
    /* istanbul ignore else  */
    if (dynamicContentState && dynamicContentState.content) {
      const { content } = dynamicContentState;
      data = content[id];
    }
    const { switchConfigGlobal } = this.props;
    const enableCSLabels = pathOr(false, 'enableCSLabels', switchConfigGlobal);
    const locationSearch = pathOr('', 'search', location);
    const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    const deactivateRegistryContentId = this.getContentID(
      enableCSLabels ? labels : createRegistryLabels,
      'deactivateRegistryMessage'
    );
    const EditRegistryReferredLabel = enableCSLabels
      ? labels
      : labels && labels.RBYR;
    return (
      <React.Fragment>
        {data && query.showEditPopUp && (
          <CreateRegistryWithUsBanner
            data={data.components}
            deviceConfig={deviceConfig}
            headingLabel={DAVID_BRIDAL_EDIT_MODAL_HEADING_LABEL}
            bottomTextLabel
            babyRecommendations
          />
        )}
        <form
          noValidate
          name="editRegistry"
          onSubmit={e => checkFormSubmit(eventType, registryID, e)}
          autoComplete="off"
          method="post"
        >
          <RenderInput
            name="somefakefirstName"
            id="somefakefirstName"
            type="text"
            className="hide"
            tabIndex="-1"
            aria-hidden="true"
          />
          <RenderInput
            name="somefakeLastName"
            id="somefakeLastName"
            type="text"
            className="hide"
            tabIndex="-1"
            aria-hidden="true"
          />
          <RenderInput
            name="somefakepassword"
            id="somefakepassword"
            type="password"
            className="hide"
            tabIndex="-1"
            aria-hidden="true"
          />
          <RenderInput
            name="somefakeconfirmpassword"
            id="somefakeconfirmpassword"
            type="password"
            className="hide"
            tabIndex="-1"
            aria-hidden="true"
          />
          <React.Fragment>
            {isErrorPresent && focusAbleMessage(errorMessages)}
            {editModalError && (
              <Notification
                status={'error'}
                content={EDIT_REG_MODAL_ERROR_LBL}
                wrapperClass={'p1 mb2'}
              />
            )}
            {!query.showEditPopUp && (
              <Heading
                data-locator={EDIT_REGISTRY_FORM_DATA_LOCATOR.registryHeading}
                level={1}
                className={classnames(styles.editModalHeading, 'mb15')}
              >
                {EDIT_REGISTRY_MODAL_TITLE_LBL}
              </Heading>
            )}
            {eventType === eventTypeConst.WEDDING ? (
              <fieldset
                className={classnames(styles.fieldsetMinWidth)}
                disabled={this.props.editModalError}
              >
                <EditWeddingRegistry
                  registryDetails={registryDetails}
                  stateObj={stateObj}
                  labels={labels}
                  updateState={updateState}
                  eventType={eventType}
                  showMoveInfo={showMoveInfo}
                  hideMoveInfo={hideMoveInfo}
                  showShippingInfo={showShippingInfo}
                  hideShippingInfo={hideShippingInfo}
                  onSelectSubscribe={onSelectSubscribe}
                  onSelectThirdPartyOption={onSelectThirdPartyOption}
                  rbyrDescriptionId={this.getContentID(
                    EditRegistryReferredLabel,
                    'rbyrDescription'
                  )}
                  rbyrTermsAndConditionId={this.getContentID(
                    EditRegistryReferredLabel,
                    'rbyrTermsAndConditions'
                  )}
                  coRegOwner={coRegOwner}
                  dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
                  registryConfig={registryConfig}
                  fetchCoRegistrantProfileStatus={
                    fetchCoRegistrantProfileStatus
                  }
                  coRegProfileStatus={coRegProfileStatus}
                  resetCoRegistrantProfileStatus={
                    resetCoRegistrantProfileStatus
                  }
                  dynamicContentState={dynamicContentState}
                  coRegEmailFlag={coRegEmailFlag}
                  globalSwitchConfig={enabledVendors}
                  deactivateRegistryContentId={deactivateRegistryContentId}
                  toggleModalState={this.props.toggleModalState}
                  setRegistryFavStoreSearchFlag={
                    this.setRegistryFavStoreSearchFlag
                  }
                  {...this.props}
                />
              </fieldset>
            ) : (
              <fieldset
                className={classnames(styles.fieldsetMinWidth)}
                disabled={editModalError}
              >
                {this.renderBabyOrOtherForm(eventType)}
              </fieldset>
            )}
            <Button
              theme="primary"
              type="submit"
              aria-label="editRegistry-submit"
              id="editRegistry-submit"
              onSubmit={e => checkFormSubmit(eventType, registryID, e)}
              data-locator={EDIT_REGISTRY_FORM_DATA_LOCATOR.registryRegSaveBtn}
              disabled={this.props.editModalError}
              className={classnames(styles.buttonClass)}
            >
              {EDIT_REGISTRY_SUBMIT_BUTTON_LBL}
            </Button>
          </React.Fragment>
        </form>
      </React.Fragment>
    );
  }

  /**
   * render Login Modal
   */
  renderLoginModal() {
    const {
      loginLabels,
      setEditRegistryFlag,
      onDeviceVerificationModalOpen,
    } = this.props;
    setEditRegistryFlag(false);
    return (
      <AccountSignIn
        {...this.props}
        inPage={false}
        labels={loginLabels}
        loginType="registry"
        onDeviceVerificationModalOpen={onDeviceVerificationModalOpen}
      />
    );
  }

  /**
   * Render different Form on basis if user is recognised or not
   */
  renderForm = isRecognized => {
    return isRecognized ? this.renderLoginModal() : this.renderEditForm();
  };
  /* render pickUpInStoreMdal */
  renderpickUpInStoreModal = () => {
    const previousPageIdentifier = pathOr(
      '',
      'previousPageIdentifier',
      this.props.routeData
    );
    if (!this.pickUpInStoreModalOpen || this.state.registryFavStoreSearch) {
      if (previousPageIdentifier && previousPageIdentifier === 'myRegistries') {
        this.pickUpInStoreModalOpen = true;
      }
      if (this.pickUpInStoreModalOpen && this.state.registryFavStoreSearch) {
        return null;
      }
      return (
        <PickupInStoreModalWrapper
          findAStoreModal
          changeStore
          setRegistryFavStoreSearchFlag={this.setRegistryFavStoreSearchFlag}
          setPickUpInStoreModalOpen={this.setPickUpInStoreModalOpen}
        />
      );
    }
    return null;
  };

  render() {
    const {
      isFetchingEditRegistryDetails,
      isRecognized,
      stateObj,
      toggleModalState,
      scrollEvent,
      isPublic,
      customLabel,
      signInDetails,
      handleEditRegistryClick,
      buttonTheme,
      LearnMoreModalGG,
      isMobile,
      hideLoginView,
      isBBBNewRegistryHeader,
      isBabyNewRegistryHeader,
      isNewRegDashboard,
      contentStackSelectors,
    } = this.props;
    const isBabyOrBBBNewHeader =
      isBBBNewRegistryHeader || isBabyNewRegistryHeader;
    const isBabyTbs = getSiteId() === 'TBS_BuyBuyBaby';

    const renderEditRegistryBtn = () => {
      if (!isBabyOrBBBNewHeader && isPublic === '1') {
        return (
          <PrimaryLink
            className={classnames(
              styles.editLink,
              styles.details,
              'mr3 sm-mr2 xs-mr2'
            )}
            textDecoration="textDecorationNone"
            variation="primary"
            data-locator="registry-editlink"
            href="#"
            onClick={handleEditRegistryClick}
          >
            {signInDetails.editText}
          </PrimaryLink>
        );
      }
      return (
        <div
          className={classnames(styles.clickable)}
          aria-hidden="true"
          onClick={handleEditRegistryClick}
        >
          <Icon
            height={isMobile ? '32px' : '42px'}
            width={isMobile ? '32px' : '42px'}
            type={`${
              isBabyNewRegistryHeader ? 'baby' : isBBBNewRegistryHeader && 'bbb'
            }-gear`}
          />
        </div>
      );
    };
    return (
      <React.Fragment>
        {!isNewRegDashboard && renderEditRegistryBtn()}
        {!isNewRegDashboard &&
        isPublic !== '1' &&
        !customLabel &&
        !isBabyOrBBBNewHeader ? (
          <div>
            <PrimaryLink
              className={classnames(styles.editLink, styles.details)}
              variation="primary"
              data-locator="registry-editlink"
              textDecoration="textDecorationNone"
              href="#"
              onClick={handleEditRegistryClick}
            >
              {isBabyTbs
                ? EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_TBS_LBL
                : EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_LBL}
            </PrimaryLink>
            <span className={classnames(styles.editLink, styles.detailsValue)}>
              {EDIT_REGISTRY_SHARE_WITH_FRIENDS_LBL}
            </span>
          </div>
        ) : null}
        {LearnMoreModalGG && (
          <React.Fragment>
            <PrimaryLink
              className={isMobile && classnames(styles.editLinkGG)}
              variation="primary"
              type="bold"
              data-locator="registry-editlink"
              textDecoration="textDecorationNone"
              href="#"
              onClick={handleEditRegistryClick}
            >
              {customLabel}
            </PrimaryLink>
          </React.Fragment>
        )}
        {isPublic !== '1' && customLabel !== undefined && !LearnMoreModalGG ? (
          <Button
            className={classnames(
              styles.editLink,
              styles.details,
              'mr3 sm-mr2 xs-mr2'
            )}
            theme={buttonTheme || ''}
            textDecoration="textDecorationNone"
            variation={buttonTheme ? '' : 'link'}
            data-locator="registry-editlink"
            onClick={handleEditRegistryClick}
          >
            {customLabel}
          </Button>
        ) : null}

        <ModalDialog
          mountedState={stateObj.modalMountedState}
          toggleModalState={toggleModalState}
          dialogClass={classnames(
            styles.editRegistryModal,
            stateObj.modalMountedState &&
              hideLoginView &&
              isRecognized &&
              'hide'
          )}
          titleAriaLabel={EDIT_REGISTRY_MODAL_TITLE_LBL}
          variation={isRecognized ? 'small' : 'large'}
          onScrollCallback={scrollEvent}
          closeIconShow
          scrollDisabled
          underlayClickExits={false}
          contentWrapperClass={classnames(styles.paddingMobile, 'py3')}
        >
          {isFetchingEditRegistryDetails && <Skeleton />}
          {!isFetchingEditRegistryDetails && this.renderForm(isRecognized)}
          {this.renderpickUpInStoreModal()}
        </ModalDialog>

        {this.props.guestModalOpen && (
          <ModalDialog
            mountedState
            closeIconShow
            titleAriaLabel="Guests-Modal"
            verticallyCenter
            scrollDisabled
            onModalClose={() => this.props.setGuestModal(false)}
            contentWrapperClass={styles.overCashfunds}
          >
            <p className={styles.overGuest}>
              {contentStackSelectors[0].modules[1].status_bar.tile[1].heading}
            </p>
            <p className={styles.noCash}>
              {
                contentStackSelectors[0].modules[1].status_bar.tile[1]
                  .subheading
              }
            </p>
            <form
              noValidate
              name="editRegistry"
              onSubmit={e =>
                this.props.checkFormSubmit(
                  this.props.eventType,
                  this.props.registryID,
                  e
                )
              }
              autoComplete="off"
              method="post"
            >
              <RenderInputComponent
                fieldName="guests"
                validation="guestNumber"
                label={'Number Of Guests (Approximate)'}
                classes={`large-6 small-12`}
                type="number"
                required
                dataLocator={
                  EDIT_REGISTRY_FORM_DATA_LOCATOR.registryGuestsField
                }
                guestsError={stateObj.guestsError}
                updateState={this.props.updateState}
                value={stateObj.guests}
                showNumericKeypadOnMobile={isMobile && true}
              />
              <Button
                theme="primary"
                type="submit"
                aria-label="editRegistry-submit"
                id="editRegistry-submit"
                onSubmit={e =>
                  this.props.checkFormSubmit(
                    this.props.eventType,
                    this.props.registryID,
                    e
                  )
                }
                data-locator={
                  EDIT_REGISTRY_FORM_DATA_LOCATOR.registryRegSaveBtn
                }
                disabled={this.props.editModalError}
                className={classnames(styles.buttonClass && styles.editSubmit)}
              >
                {
                  contentStackSelectors[0].modules[1].status_bar.tile[1].cta
                    .title
                }
              </Button>
            </form>
          </ModalDialog>
        )}
      </React.Fragment>
    );
  }
}

export default EditRegistryComponent;
EditRegistryComponent.propTypes = propTypes;
