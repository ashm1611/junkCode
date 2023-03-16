/* eslint-disable max-lines */
import React, { Fragment } from 'react';
import qs from 'qs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty, isEqual } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@bbb-app/core-ui/button';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import {
  selectSiteId,
  selectDeviceConfig,
  selectIsMPulseEnabled,
  makeSelectSwitchConfig,
  makeSelectLabels,
  makeSelectIsMobileScreen,
  makeSelectGlobalSwitchConfig,
  makeSelectGlobalPageConfig,
  selectViewPortConfig,
  makeSelectThirdPartyConfig,
} from '@bbb-app/selectors/configSelector';
import {
  makeSelectIsLoggedIn,
  makeTYMSignInModalLabels,
  makeSelectRegistryList,
} from '@bbb-app/selectors/accountSelectors';
import {
  makeSelectActiveRegistry,
  interactiveCheckListSelector,
} from '@bbb-app/selectors/registrySelectors';
import { selectRouterLocation } from '@bbb-app/selectors/appSelectors';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Heading from '@bbb-app/core-ui/heading';
import Image from '@bbb-app/core-ui/image';
import { noop } from '@bbb-app/utils/common';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import toJS from '@bbb-app/hoc/toJS';
import { getContentParamsFromRegions } from '@bbb-app/utils/experience';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import consoleLog from '@bbb-app/utils/logger';
import { subscribe } from '@bbb-app/utils/pubsub';
import { fetchContent } from '@bbb-app/actions/experienceActions';
import { makeSelectActiveRegistryID } from '@bbb-app/get-registry-details/containers/selectors';
import injectMultipleReducers from '@bbb-app/hoc/injectMultipleReducers';
import {
  makeSelectDeviceVerificationData,
  makeSelectDeviceVerificationError,
} from '@bbb-app/account-signin/containers/accountSignInSelectors';
import DeviceVerification from '@bbb-app/device-verification/containers/DeviceVerification.async';
import { getMergedVerificationData } from '@bbb-app/utils/deviceVerificationUtil';
import { ROUTE_REGISTRY_OWNER_HOME } from '@bbb-app/constants/route/route';
import { makeSelectEmailId } from '@bbb-app/account-signin/containers/commonSelectors';
import injectMultipleSagas from '@bbb-app/hoc/injectMultipleSagas';
import { fetchContentStack } from '@bbb-app/redux/content-stack/actions';
import { CONTENT_STACK_STATE_KEY } from '@bbb-app/redux/content-stack/constants';
import { makeContentStackContents } from '@bbb-app/redux/content-stack/selectors';
import contentStackSaga from '@bbb-app/redux/content-stack/sagas';
import contentStackReducer from '@bbb-app/redux/content-stack/reducer';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import layouts from '../../../../components/Layouts';
import componentMap from '../../../ExperienceMapping/RegistryOwnerHomeMap';
import style from '../../../../components/RegistryOwner/RegistryOwner.css';
import { isGoodyBoxModalOpen } from '../RegistryOwner/selectors';
import { getRegistryData } from '../RegistryOwner/commonSelectors';
import {
  selectRegistryTemplate,
  showLoginModal,
  makeSelectPhoneNumberRegistry,
  makeSelectDeviceVerificationType,
  makeSelectUserCreated,
} from './selectors';
import { getcreateRegistryModalPopUpStatus } from '../CreateRegistry/selectors';
import {
  clearCreateRegistry,
  clearCreateRegistryVerType,
} from '../CreateRegistry/actions';
import RegistryOwnerHomeComponent from '../../../../components/Pages/Registry/RegistryOwnerHome';
import RegistryOverViewComponent from '../../../../components/Pages/Registry/RegistryOwnerHome/RegistryOverView/RegistryOverView.async';
import { TOP_REGISTRY_ITEM_CTA, NO_STORES_FOUND_LBL } from './constant';
import styles from '../../../../components/Pages/Registry/RegistryOwner/RegistryOwnerLayout/RegistryOwnerLayout.css';
import { APPOINTMENTSURL } from './constants';
import { fetchPageExperience } from '../../../Experience/actions';
import isPreviewEnv from '../../../../utils/isPreviewEnv';
import { displayLoginModalVisibility } from '../ThankYouManager/actions';
import { makeSelectPreviousRoute } from '../ThankYouManager/selectors';
import RBYRModal from '../RBYRModal/RBYRModal.async';
import registryOwnerSaga from '../RegistryOwner/sagas';
import registryOwnerCategoryReducer from '../RegistryOwner/RegistryOwnerReducer';
import {
  REGISTRY_DETAILS_STATE_KEY,
  REGISTRY_OWNER_ITEMS_STATE_KEY,
  GROUP_GIFTING_ENABLE,
} from '../RegistryOwner/constants';
import registryInputReducer from '../../Registry/CreateRegistry/reducer';
import { REG_INPUTS_STATE_KEY } from '../../Registry/CreateRegistry/constants';
import { enableAPreviewYourReg } from '../../../../components/abtests/PreviewYrRegistryExperiment/PreviewYrRegistryUtil';
import GoodyBoxModal from '../GoodyBoxModal/GoodyBoxModal.async';
import {
  openGoodyBoxModalOpen,
  editRegistryFromMoreInformationBtn,
} from '../../../../containers/Pages/Registry/RegistryOwner/actions';
import { enableBookAnAppointment } from '../../../../components/abtests/BookAnAppointmentExperiment/BookAnAppointmentUtil';
import { showConfetti } from './confettiScript';
import { setChecklistToolTip } from '../../../InteractiveChecklist/actions';
import { INTERACTIVE_KEY as InteractiveCheckListStateKey } from '../../../InteractiveChecklist/constants';
import interactiveCheckListReducer from '../../../InteractiveChecklist/reducer';
import { makeSelectStaticChecklistTooltip } from '../../../InteractiveChecklist/InteractiveChecklistSelectors';
import interactiveCheckListSaga from '../../../InteractiveChecklist/sagas';
let ref;
export class RegistryOwnerHome extends React.PureComponent {
  constructor(props) {
    super(props);
    ref = this;
    this.state = {
      isNeedToShow: false,
      called: false,
      showSuccessModal: false,
      registryId: props.matchParamId || null,
      showCreateRegistrySuccessModal: isEmpty(props.verificationType),
      isFromTipModule: false,
      loginModalVisibility: false,
      verificationType: props.verificationType,
      modalMountedState: true,
      toggleModalState: true,
      showConfirmationModal: this.props.isNewCreateRegForm
        ? true
        : this.isBabyRegOnBaby() || this.isWeddingOrCanadaBabyRegistry(),
      confettiAnimated: false,
    };
    this.toggleMode = this.toggleMode.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.toggleGoodyBoxModalState = this.toggleGoodyBoxModalState.bind(this);
    this.elements = null;
    this.checkRBYRFlag = false;
    this.isPreviewYrReg = enableAPreviewYourReg();
  }
  componentWillMount() {
    if (!isEmpty(this.props.registryDetailsData)) {
      this.setElements(this.props);
    }
  }
  componentDidMount() {
    const {
      route,
      match,
      regTemplate,
      getPageExperience,
      displayLoginModal,
      siteId,
      enableRegistryQuiz,
      switchConfigGlobal,
      labels,
    } = this.props;
    if (!regTemplate && isPreviewEnv()) {
      try {
        const params = {
          isPreview: true,
          expType: 'publish',
          pagePath: match.url,
          ...match.params,
          ...route.routeData,
        };
        getPageExperience(params);
      } catch (error) {
        consoleLog.error(`Experience Page Fallback Failed: ${error.message}`);
      }
    }

    const enableCSLabels = pathOr(false, 'enableCSLabels', switchConfigGlobal);
    if (enableCSLabels) {
      const referredContentIds = LabelsUtil.getReferredContentIds(labels);
      if (referredContentIds.length) {
        this.props.getRefContent(referredContentIds);
      }
    }
    const isRecognized = isUserRecognized();
    if (isRecognized) {
      displayLoginModal(true);
    }
    const registryType = pathOr('', 'eventType', this.props.activeRegistry);
    const isBabySite = siteId.includes('BuyBuyBaby') && registryType === 'Baby';
    if (this.props.isNewCreateRegForm && this.props.createRegistryModalPopUp)
      this.props.fetchContentStack();
    else if (this.props.isNewDashboard) this.getStoryTileData();
    else if (!enableRegistryQuiz || (enableRegistryQuiz && !isBabySite))
      this.props.fetchContentStack(this.isCanadaBabyRegistry());
    const CHECKLIST_TOOLTIP_DATA = {
      tooltipChecklist: {
        skip: true,
        currentStep: 1,
        allSteps: [
          {
            stepId: 1,
            stepMessage: 'Explore our new registry checklist',
            hasNextStep: true,
          },
          {
            stepId: 2,
            stepMessage: 'Explore subcategories by using the drop down arrow',
            hasNextStep: true,
          },
          {
            stepId: 3,
            stepMessage:
              'You can track the number of items added and needed. Once the category is complete a checkbox will appear',
            hasNextStep: false,
          },
        ],
      },
    };
    this.props.setCheckListTooltip(CHECKLIST_TOOLTIP_DATA);
  }
  componentWillReceiveProps(nextProps) {
    const { enableRegistryQuiz, registryDetailsData } = this.props;
    const paramId = pathOr(null, 'matchParamId', nextProps);
    if (this.state.registryId !== paramId) {
      this.setState({ registryId: paramId });
    }
    /** Show confetti burst on registry create success based on registry type & config */
    if (
      !enableRegistryQuiz ||
      (this.props.isNewCreateRegForm && this.props.createRegistryModalPopUp)
    ) {
      if (
        this.registryReimagineShowConfetti() &&
        this.props.contentStackSelectors &&
        !this.state.confettiAnimated
      ) {
        showConfetti();
        this.setState({ confettiAnimated: true });
      }
    }
    if (
      (!this.state.called && !isEmpty(registryDetailsData)) ||
      (!isEqual(nextProps.registryDetailsData, registryDetailsData) &&
        !isEmpty(nextProps.registryDetailsData))
    ) {
      this.setElements(this.props, nextProps);
      this.setState({ called: true });
    }
    if (
      this.props.isGoodyBoxModalOpen &&
      nextProps.isGoodyBoxModalOpen === false
    ) {
      this.setState({ hideParentModal: false });
    }
  }
  componentWillUnmount() {
    this.toggleGoodyBoxModalState(false);
  }
  onModalClose(e) {
    e.preventDefault();
    this.setState({
      loginModalVisibility: false,
      hideLoginView: false,
    });
  }
  onDeviceVerificationModalOpen = () => {
    if (this.state.loginModalVisibility) {
      this.setState({ hideLoginView: true });
    }
  };
  onDeviceModalClose = () => {
    this.setState({
      hideLoginView: false,
      loginModalVisibility: false,
    });
  };
  onChunkLoad = () => {
    this.setState({ isDeviceVerificationChunkLoaded: true });
  };
  onDeviceModalCloseAfterVerification = () => {
    // clear the State once user closes the Modal
    this.props.clearCreateRegistryVerTypeState();
    this.setState({
      showCreateRegistrySuccessModal: true,
      dvModalClosed: true,
    });
  };
  onLoginSubmit = () => {
    this.setState({
      verificationType: null,
    });
  };
  onButtonClick = () => {
    if (this.props.isNewDashboard) this.getStoryTileData();
    this.closeModal();
    const elem = document.querySelector('#registrymyitems');
    /* istanbul ignore else */
    if (elem) {
      const position = elem.offsetTop - 1;
      window.scrollTo(0, position);
    }
  };
  getStoryTileData = () => {
    const registryDetailData = pathOr(null, 'registryDetailsData', this.props);
    const regState = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryState',
      registryDetailData
    );
    const regType = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      registryDetailData
    );
    const newRegData = {
      regState,
      regType,
      isNewDashboard: this.props.isNewDashboard,
    };
    this.props.fetchContentStack(false, false, newRegData);
  };
  getControllerProps(props, regions) {
    const registryDetailData = pathOr(null, 'registryDetailsData', props);
    const labels = props.labels;
    const pageName = props.route.routeData.pageName;

    const categoryId = pathOr(null, 'match.params.categoryId', props);
    const regState = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryState',
      registryDetailData
    );
    const regType = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      registryDetailData
    );
    const regId = pathOr(
      '',
      'registryResVO.registrySummaryVO.registryId',
      registryDetailData
    );
    const isDiaperFundEnable =
      pathOr(
        false,
        'registryResVO.registrySummaryVO.diaperFundEnabled',
        registryDetailData
      ) && regType === 'BA1';
    const isGoodyBoxEnable =
      pathOr(
        false,
        'registryResVO.registrySummaryVO.goodyBoxEnabled',
        registryDetailData
      ) &&
      pathOr(
        false,
        'registryResVO.registrySummaryVO.goodyBoxEligible',
        registryDetailData
      );
    const mainParams = {
      regState,
      regType,
    };
    const contentParams = getContentParamsFromRegions(
      undefined,
      regions,
      mainParams
    );
    return {
      labels,
      pageName,
      categoryId,
      regState,
      regType,
      regId,
      buttonLayout: TOP_REGISTRY_ITEM_CTA,
      showAddToRegistryCTA: true,
      showChoseOptionsCTA: true,
      paramsObj: contentParams,
      ...props.enabledVendors,
      isDiaperFundEnable,
      isMobile: this.props.isMobile,
      isGoodyBoxEnable,
    };
  }
  setElements = (propObj, nextProps = {}) => {
    if (
      nextProps.regTemplate &&
      nextProps.regTemplate.regions &&
      nextProps.enabledVendors
    ) {
      const layout = layouts[nextProps.regTemplate.layout] || layouts.default;
      const regions = nextProps.regTemplate.regions;
      const controllerProps = this.getControllerProps(nextProps, regions);
      this.elements = layout(regions, controllerProps);
    }
    if (
      propObj.regTemplate &&
      propObj.regTemplate.regions &&
      propObj.enabledVendors
    ) {
      const layout = layouts[propObj.regTemplate.layout] || layouts.default;
      const regions = propObj.regTemplate.regions;
      const controllerProps = this.getControllerProps(propObj, regions);
      this.elements = layout(regions, controllerProps, componentMap);
    }
  };
  getStringFromCms = key => {
    const { switchConfigGlobal, labels } = this.props;
    const dynamicContentState = this.props.dynamicContentState;
    const enableCSLabels = pathOr(false, 'enableCSLabels', switchConfigGlobal);
    const createRegistry = enableCSLabels ? labels : labels.createRegistry;
    let id = '';
    let string = key;
    createRegistry.referredContent.forEach(data => {
      if (data.key === key) {
        id = data.id;
      }
    });
    const content = dynamicContentState.content;
    if (id !== undefined && content && content !== undefined) {
      if (content[id] !== undefined) {
        string = content[id].body;
      }
    }
    return string;
  };
  getHoorayModalValue = () => {
    const urlParams = pathOr('', 'search', this.props.router.location);
    const obj = qs.parse(urlParams, { ignoreQueryPrefix: true });
    if (obj.hoorayModal !== undefined && obj.hoorayModal === 'true') {
      return true;
    }
    return false;
  };
  isBabyRegOnBaby = () => {
    if (
      (this.props.siteId === 'BuyBuyBaby' ||
        this.props.siteId === 'TBS_BuyBuyBaby') &&
      this.props.eventTypeCode === 'BA1'
    ) {
      return true;
    }
    return false;
  };
  isCanadaBabyRegistry = () => {
    return (
      this.props.enableRegBabyCreate &&
      this.props.eventType === 'Baby' &&
      this.props.siteId === 'BedBathCanada'
    );
  };
  isWeddingOrCanadaBabyRegistry = () => {
    if (this.props.eventTypeCode === 'BRD' || this.isCanadaBabyRegistry()) {
      return true;
    }
    return false;
  };
  registryReimagineShowConfetti = () => {
    if (
      this.props.previousRoute &&
      this.props.router.location.search === '?hoorayModal=true' &&
      (this.isBabyRegOnBaby() ||
        this.isWeddingOrCanadaBabyRegistry() ||
        this.props.isNewCreateRegForm)
    ) {
      return true;
    }
    return false;
  };
  hideParent = () => {
    this.setState({ hideParentModal: true });
  };
  closeModal = modalType => {
    if (this.props.isNewDashboard) this.getStoryTileData();
    const getAllTooltip = Object.assign({}, this.props.getAllTooltip);
    getAllTooltip.tooltipChecklist.skip = false;
    this.props.setCheckListTooltip(getAllTooltip);
    if (modalType === 'babyModal') {
      this.setState({ mountState: false });
    }
    this.setState({ showCreateRegistrySuccessModal: false });
    const currentLocation = pathOr('', 'location.pathname', this.props.router);
    this.props.clearCreateRegistryState();
    if (this.props.history) {
      this.props.history.push({
        pathname: currentLocation,
        search: '?hoorayModal=false',
      });
    }
  };
  toggleLoginModalState = () => {
    const displayLoginModal = pathOr({}, 'displayLoginModal', this.props);
    displayLoginModal(false);
    this.setState({
      loginModalVisibility: !this.state.loginModalVisibility,
      hideLoginView: false,
    });
  };
  showCreateRegistrySuccessModal = (
    createRegistryModalPopUp,
    eventType,
    activeRegistry,
    isLoggedIn,
    siteId
  ) => {
    const welcomeText = {
      title: '',
      subTitle: '',
      info: '',
    };
    const reg = {
      registryId: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNum: '',
      coRegEmail: '',
      coRegFirstName: '',
      coRegLastName: '',
      eventDate: '',
      favStoreId: '',
    };

    const baseUrl = pathOr(
      APPOINTMENTSURL,
      'bookingBug.appointmentsUrl',
      this.props.thirdPartyDataConfig
    );
    let url = '';
    url = `${baseUrl}`;
    const hoorayModal = this.getHoorayModalValue();
    const isMobileWeddingModal = this.props.isMobile;
    switch (eventType) {
      case 'Wedding':
        if (!isMobileWeddingModal) {
          welcomeText.title = this.getStringFromCms('hoorayModalWedding');
        } else {
          welcomeText.title = this.getStringFromCms('mobileHoorayModalWedding');
        }
        break;
      case 'Baby':
        welcomeText.title = this.getStringFromCms('hoorayModalBaby');
        break;
      case 'Birthday':
        welcomeText.title = this.getStringFromCms('hoorayModalBirthday');
        break;
      case 'Retirement':
        welcomeText.title = this.getStringFromCms('hoorayModalRetirement');
        break;
      case 'Anniversary':
        welcomeText.title = this.getStringFromCms('hoorayModalAnniversary');
        break;
      case 'Housewarming':
        welcomeText.title = this.getStringFromCms('hoorayModalHouseWarming');
        break;
      case 'College/University':
      case 'University':
        welcomeText.title = this.getStringFromCms('hoorayModalCollege');
        break;
      case 'Commitment Ceremony':
        welcomeText.title = this.getStringFromCms('hoorayModalCommitment');
        break;
      case 'Other':
        welcomeText.title = this.getStringFromCms('hoorayModalOther');
        break;
      default:
        break;
    }
    let defaultBedbathStore = this.props.pageConfigGlobal.defaultBedbathStore;
    let defaultBabyStore = this.props.pageConfigGlobal.defaultBabyStore;
    let defaultCanadaStore = this.props.pageConfigGlobal.defaultCanadaStore;

    if (defaultBedbathStore !== undefined && defaultBedbathStore !== '') {
      defaultBedbathStore = defaultBedbathStore.toString();
    }
    if (defaultBabyStore !== undefined && defaultBabyStore !== '') {
      defaultBabyStore = defaultBabyStore.toString();
    }
    if (defaultCanadaStore !== undefined && defaultCanadaStore !== '') {
      defaultCanadaStore = defaultCanadaStore.toString();
    }
    const StaticStoreNumber = [
      defaultBedbathStore,
      defaultBabyStore,
      defaultCanadaStore,
    ];
    let showIframe = false;
    reg.favStoreId = pathOr('', 'favStoreId', activeRegistry);
    if (
      reg.favStoreId &&
      StaticStoreNumber.indexOf(reg.favStoreId.toString()) === -1
    ) {
      showIframe = true;
    }

    const isModalOpenSS =
      enableBookAnAppointment() &&
      siteId === 'BuyBuyBaby' &&
      eventType === 'Baby';
    const isBabyRegistry = siteId === 'BuyBuyBaby' || eventType === 'Baby';
    let contentStackData = '';
    if (this.props.isNewCreateRegForm) {
      if (siteId === 'BuyBuyBaby') {
        contentStackData = pathOr(
          '',
          'modules[3].support_page.content_body',
          this.props.contentStackSelectors
        );
      } else if (!isBabyRegistry) {
        contentStackData = pathOr(
          '',
          'modules[1].support_page.content_body',
          this.props.contentStackSelectors
        );
      } else {
        contentStackData = pathOr(
          '',
          'modules[2].support_page.content_body',
          this.props.contentStackSelectors
        );
      }
    } else {
      contentStackData = pathOr(
        '',
        'modules[0].support_page.content_body',
        this.props.contentStackSelectors
      );
    }
    const isBBYWedTheme =
      eventType === 'Wedding' || this.isCanadaBabyRegistry();
    return this.state.showConfirmationModal &&
      !isModalOpenSS &&
      createRegistryModalPopUp &&
      hoorayModal &&
      contentStackData ? (
      <React.Fragment>
        <ModalDialog
          mountedState={this.state.showCreateRegistrySuccessModal}
          toggleModalState={this.toggleModalState}
          titleAriaLabel="aria-label"
          verticallyCenter
          variation={this.props.isNewCreateRegForm ? 'small' : 'medium'}
          scrollDisabled={false}
          onModalClose={this.closeModal}
          dialogClass={classnames(
            this.isWeddingOrCanadaBabyRegistry() &&
              !this.props.isNewCreateRegForm &&
              styles.modalOverlayNew,
            this.props.isNewCreateRegForm &&
              !this.props.isMobile &&
              styles.newLay
          )}
        >
          <center
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: contentStackData,
            }}
          />

          <center>
            {this.isBabyRegOnBaby() && !this.props.isNewCreateRegForm && (
              <div className="mb2">
                <React.Fragment>
                  <Image
                    alt="babyConfLeft"
                    src="/static/assets/images/babyConfLeft.png"
                    className={classnames(
                      isMobileWeddingModal
                        ? styles.mobileImageModal
                        : styles.desktopImageModal
                    )}
                  />
                  <Image
                    alt="babyConfRight"
                    src="/static/assets/images/babyConfRight.png"
                    className={classnames(
                      isMobileWeddingModal
                        ? styles.regImageMobile
                        : styles.regImagedesktop
                    )}
                  />
                </React.Fragment>
              </div>
            )}
            <Button
              className={
                (isBBYWedTheme ? styles.startAddingCta : styles.startAddBabyCta,
                this.props.isNewCreateRegForm && styles.seeYourRegCta)
              }
              theme="primary"
              variation="large"
              data-locator="startAddingCta"
              onClick={this.onButtonClick}
            >
              {this.props.isNewCreateRegForm
                ? 'see your registry'
                : 'start adding'}
            </Button>
            {this.props.isNewCreateRegForm && (
              <div
                className={
                  this.props.isNewCreateRegForm &&
                  !this.props.isMobile &&
                  styles.ctaNew
                }
              >
                <img
                  alt="abv"
                  src="https://b3h2.scene7.com/is/image/BedBathandBeyond/icon_locked?$PNG$"
                />
                <p
                  className={
                    this.props.isNewCreateRegForm &&
                    !this.props.isMobile &&
                    styles.privateReg
                  }
                >
                  Your registry is private until you choose to share it.
                </p>
              </div>
            )}
          </center>
          {!this.props.isNewCreateRegForm && (
            <PrimaryLink
              className={classnames(
                isBBYWedTheme
                  ? styles.registryButtonModal
                  : styles.babyRegistryStyle
              )}
              textDecoration="textDecorationNone"
              variation="primary"
              href="#"
              onClick={this.onButtonClick}
            >
              {'Explore your registry homepage'}
            </PrimaryLink>
          )}
        </ModalDialog>
      </React.Fragment>
    ) : (
      !this.state.showConfirmationModal &&
        !isModalOpenSS &&
        createRegistryModalPopUp &&
        hoorayModal &&
        this.props.switchConfigGlobal.enableBookingBug && (
          <React.Fragment>
            <ModalDialog
              mountedState={this.state.showCreateRegistrySuccessModal}
              titleAriaLabel="Modal"
              closeIconShow
              verticallyCenter
              onModalDidClose={noop}
              onModalClose={this.closeModal}
              variation="large"
            >
              <center
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: welcomeText.title }}
              />
              {showIframe ? (
                <iframe className={style.frameWrapper} src={url} />
              ) : (
                <div className={style.noStoresFound}>{NO_STORES_FOUND_LBL}</div>
              )}
            </ModalDialog>
          </React.Fragment>
        )
    );
  };
  openRBYRModal = props => {
    const previousRoute = pathOr('', 'previousRoute', props);
    const registryId = pathOr('', 'activeRegistry.registryId', props);
    const path = ROUTE_REGISTRY_OWNER_HOME.replace(':id?', registryId);
    const isRecognized = isUserRecognized();
    if (previousRoute === path && !isRecognized && this.checkRBYRFlag) {
      this.setState({
        loginModalVisibility: false,
        showSuccessModal: true,
        hideLoginView: false,
      });
      return false;
    }
    return true;
  };
  RBYRsubscribe = subscribe('createRBYR-TipModule', isFromTipsModule => {
    const isRecognized = isUserRecognized();
    this.checkRBYRFlag = true;
    if (!isRecognized || ref.RBYRAlreadyOptIn) {
      ref.setState({
        showSuccessModal: true,
        loginModalVisibility: false,
        isFromTipsModule,
        hideLoginView: false,
      });
    } else if (!ref.RBYRAlreadyOptIn) {
      ref.setState({
        loginModalVisibility: true,
        showSuccessModal: false,
        isFromTipsModule,
        hideLoginView: false,
      });
    }
  });
  subscribeGoodyBox = subscribe('GoodyBoxStatus', val => {
    ref.toggleGoodyBoxModalState(val);
  });
  toggleGoodyBoxModalState(val) {
    this.props.openGoodyBoxModalOpen(val);
  }
  toggleMode() {
    this.checkRBYRFlag = false;
    this.setState({
      showSuccessModal: !this.state.showSuccessModal,
    });
  }
  render() {
    const { siteId, activeRegistry, isLoggedIn, isNewDashboard } = this.props;
    const groupGiftingEnable = pathOr(
      false,
      [
        'registryDetailsData',
        'registryResVO',
        'registrySummaryVO',
        GROUP_GIFTING_ENABLE,
      ],
      this.props
    );
    const groupGiftOptIn = pathOr(
      false,
      'registryDetailsData.registryResVO.registrySummaryVO.groupGiftOptIn',
      this.props
    );
    const registryId = pathOr('', 'activeRegistry.registryId', this.props);
    const eventType = pathOr(
      null,
      'registryDetailsData.registryResVO.registrySummaryVO.eventType',
      this.props
    );
    const headingForRegistryOwnerHome =
      eventType && `${eventType} Registry Home`;
    const path = ROUTE_REGISTRY_OWNER_HOME.replace(':id?', registryId);
    this.RBYRAlreadyOptIn = pathOr(
      false,
      'registryResVO.registrySummaryVO.storedValueOptIn',
      this.props.registryDetailsData
    );
    const verificationData = getMergedVerificationData(
      this.props.deviceVerificationData,
      this.props.deviceVerificationError
    );
    const isWeddingRegistryOrCanadaBabyRegistry =
      eventType === 'Wedding' || this.isCanadaBabyRegistry();
    return (
      <Fragment>
        <ErrorBoundary>
          {isNewDashboard && <RegistryOverViewComponent {...this.props} />}
          {!isNewDashboard && (
            <RBYRModal
              showModal={this.state.showSuccessModal}
              handleLearnMoreClick={this.toggleMode}
              RBYRAlreadyOptIn={this.RBYRAlreadyOptIn}
              isFromTipsModule={this.state.isFromTipsModule}
              registryDetailsData={this.props.registryDetailsData}
              registryId={registryId}
              eventType={eventType}
              eventTypeCode={this.props.eventTypeCode}
              isMobile={this.props.isMobile}
              loginModalVisibility={this.state.loginModalVisibility}
              openRBYRModal={this.openRBYRModal(this.props)}
              toggleLoginModalState={this.toggleLoginModalState}
              onModalClose={this.onModalClose}
              loginLabels={this.props.loginLabels}
              path={path}
              onDeviceVerificationModalOpen={this.onDeviceVerificationModalOpen}
              hideLoginView={this.state.hideLoginView}
              onDeviceModalClose={this.onDeviceModalClose}
            />
          )}
          {!isNewDashboard && (
            <div className={styles.registryActionButtonContainer}>
              {this.isBabyRegOnBaby() ||
              isWeddingRegistryOrCanadaBabyRegistry ? (
                <div
                  className={classnames(
                    styles.registryAddInfoSection,
                    'justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2'
                  )}
                >
                  <Heading
                    level={1}
                    className={classnames(
                      isWeddingRegistryOrCanadaBabyRegistry
                        ? styles.welcomeText__wedding
                        : styles.welcomeText,
                      'mr-auto',
                      styles.welComeTextMargin
                    )}
                    styleVariation={
                      !isWeddingRegistryOrCanadaBabyRegistry && 'h4-serif'
                    }
                    data-locator="registery-registerymyitems-heading"
                    id="registrymyitems"
                  >
                    {`Welcome ${Object.keys(activeRegistry).length > 0 &&
                      activeRegistry.primaryRegistrantFirstName !==
                        'undefined' &&
                      `${activeRegistry.primaryRegistrantFirstName}!`}`}
                  </Heading>
                  <div className={classnames(styles.moreInfoSection)}>
                    <div
                      className={classnames(
                        isWeddingRegistryOrCanadaBabyRegistry
                          ? styles.welcomeSubText
                          : styles.welcomeSubText__baby,
                        styles.welcomeSubTextSize
                      )}
                      styleVariation="h6-sans"
                    >
                      {isWeddingRegistryOrCanadaBabyRegistry &&
                      !this.isCanadaBabyRegistry()
                        ? `Do you want to complete your profile? `
                        : `Let's update your profile.`}
                    </div>
                    <PrimaryLink
                      className={classnames(
                        isWeddingRegistryOrCanadaBabyRegistry
                          ? styles.editRegistryButton
                          : styles.editRegistryButton__baby,
                        'mr3 sm-mr2 xs-mr2'
                      )}
                      textDecoration="textDecorationNone"
                      variation="primary"
                      href="#"
                      onClick={() =>
                        this.props.editRegistryFromMoreInformationBtn(true)
                      }
                    >
                      Add Information
                    </PrimaryLink>
                  </div>
                </div>
              ) : (
                <div
                  className={classnames(
                    styles.registryActionButton,
                    'justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2'
                  )}
                >
                  <Heading
                    level={2}
                    className={classnames(
                      styles.registryHeading,
                      'mr-auto pt1'
                    )}
                    styleVariation="h3-sans"
                    data-locator="registery-registerymyitems-heading"
                  >
                    {headingForRegistryOwnerHome}
                  </Heading>
                </div>
              )}
            </div>
          )}
          {this.registryReimagineShowConfetti() && <canvas id="canvas" />}
          {!isNewDashboard && (
            <RegistryOwnerHomeComponent
              {...this.props}
              mPulseEnabled={this.props.isMPulseEnabled}
              childrens={this.elements}
              registryID={this.state.registryId}
              groupGiftingEnable={groupGiftingEnable}
              groupGiftOptIn={groupGiftOptIn}
              isNewRegDashboard={this.props.isNewDashboard}
            />
          )}
          <div>
            {activeRegistry &&
            activeRegistry.favStoreId != null &&
            activeRegistry.registryId === this.state.registryId
              ? this.showCreateRegistrySuccessModal(
                  this.props.createRegistryModalPopUp,
                  eventType,
                  activeRegistry,
                  isLoggedIn,
                  siteId
                )
              : null}
          </div>
          {(!isEmpty(this.state.verificationType) ||
            this.state.isDeviceVerificationChunkLoaded) && (
            <DeviceVerification
              verificationType={
                !this.state.dvModalClosed
                  ? verificationData.verificationType ||
                    this.state.verificationType
                  : null
              }
              phoneLast4Digits={this.props.phoneLast4Digits}
              userFlow="createRegistryFlow"
              email={this.props.emailId}
              onChunkLoad={this.onChunkLoad}
              onDeviceModalClose={this.onDeviceModalCloseAfterVerification}
              onLoginSubmit={this.onLoginSubmit}
              showPasswordField
              deviceVerificationData={verificationData}
              accountCreatedThroughRegistryFlow={this.props.userCreated}
            />
          )}
          {this.props.isGoodyBoxModalOpen && !isNewDashboard && (
            <GoodyBoxModal
              isGoodyBoxModalOpen={this.props.isGoodyBoxModalOpen}
              openGoodyBoxModalOpen={this.toggleGoodyBoxModalState}
              registryId={registryId}
              hideParent={this.hideParent}
              hideParentModal={this.state.hideParentModal}
              registryData={this.props.registryDetailsData}
            />
          )}
        </ErrorBoundary>
      </Fragment>
    );
  }
}
RegistryOwnerHome.propTypes = {
  labels: PropTypes.object,
  registryDetailsData: PropTypes.object,
  switchConfigGlobal: PropTypes.object,
  pageConfigGlobal: PropTypes.object,
  dynamicContentState: PropTypes.object,
  activeRegistry: PropTypes.object,
  siteId: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  createRegistryModalPopUp: PropTypes.bool,
  thirdPartyDataConfig: PropTypes.object,
  router: PropTypes.object,
  isMobile: PropTypes.bool,
  history: PropTypes.object,
  matchParamId: PropTypes.string,
  clearCreateRegistryState: PropTypes.func,
  route: PropTypes.any,
  regTemplate: PropTypes.any,
  match: PropTypes.object,
  getPageExperience: PropTypes.func,
  loginLabels: PropTypes.object,
  displayLoginModal: PropTypes.func,
  eventTypeCode: PropTypes.string,
  verificationType: PropTypes.bool,
  emailId: PropTypes.string,
  deviceVerificationData: PropTypes.object,
  deviceVerificationError: PropTypes.object,
  clearCreateRegistryVerTypeState: PropTypes.func,
  userCreated: PropTypes.bool,
  phoneLast4Digits: PropTypes.string,
  isMPulseEnabled: PropTypes.bool,
  isGoodyBoxModalOpen: PropTypes.bool,
  openGoodyBoxModalOpen: PropTypes.func,
  editRegistryFromMoreInformationBtn: PropTypes.func,
  fetchContentStack: PropTypes.func,
  contentStackSelectors: PropTypes.func,
  previousRoute: PropTypes.string,
  enableRegBabyCreate: PropTypes.bool,
  eventType: PropTypes.string,
  setCheckListTooltip: PropTypes.func,
  getAllTooltip: PropTypes.object,
  enableRegistryQuiz: PropTypes.bool,
  getRefContent: PropTypes.func,
  isNewDashboard: PropTypes.bool,
  isNewCreateRegForm: PropTypes.bool,
};
export const mapStateToProps = createStructuredSelector({
  regTemplate: selectRegistryTemplate(),
  labels: makeSelectLabels(['Registry']),
  registryDetailsData: getRegistryData(),
  enabledVendors: makeSelectSwitchConfig(['RegistryOwnerHome']),
  isMPulseEnabled: selectIsMPulseEnabled,
  switchConfig: makeSelectSwitchConfig(),
  switchConfigGlobal: makeSelectGlobalSwitchConfig(),
  pageConfigGlobal: makeSelectGlobalPageConfig(),
  registryData: getRegistryData(),
  createRegistryModalPopUp: getcreateRegistryModalPopUpStatus(),
  activeRegistry: makeSelectActiveRegistry(),
  siteId: selectSiteId(),
  isLoggedIn: makeSelectIsLoggedIn(),
  emailId: makeSelectEmailId(),
  dynamicContentState: makeSelectContent(),
  formWrapperData: formWrapperSelector('emailForm'),
  thirdPartyDataConfig: makeSelectThirdPartyConfig(),
  router: selectRouterLocation(),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  globalSwitchConfig: makeSelectGlobalSwitchConfig(),
  activeRegistryId: makeSelectActiveRegistryID(),
  registryList: makeSelectRegistryList(),
  siteConfig: selectViewPortConfig,
  isMobile: makeSelectIsMobileScreen,
  loginLabels: makeTYMSignInModalLabels(),
  previousRoute: makeSelectPreviousRoute(),
  loginModalVisibility: showLoginModal(),
  deviceConfig: selectDeviceConfig,
  verificationType: makeSelectDeviceVerificationType(),
  phoneLast4Digits: makeSelectPhoneNumberRegistry(),
  deviceVerificationData: makeSelectDeviceVerificationData(),
  deviceVerificationError: makeSelectDeviceVerificationError(),
  userCreated: makeSelectUserCreated(),
  isGoodyBoxModalOpen: isGoodyBoxModalOpen(),
  contentStackSelectors: makeContentStackContents(),
  enableRegBabyCreate: makeSelectSwitchConfig([
    'createRegistry',
    'enableRegBabyCreate',
  ]),
  enableRegistryQuiz: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistryQuiz',
  ]),
  isNewCreateRegForm: makeSelectSwitchConfig([
    'createRegistry',
    'enableNewCreateReg',
  ]),
  isNewDashboard: makeSelectSwitchConfig(
    ['RegistryOwner', 'enableNewRegDashboard'],
    false
  ),
  getAllTooltip: makeSelectStaticChecklistTooltip(),
  interactiveCheckListData: interactiveCheckListSelector(),
});

export const mapDispatchToProps = dispatch => {
  return {
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    getPageExperience(args) {
      dispatch(fetchPageExperience(args));
    },
    fetchContentStack(isCABabyRegistry, dynamicCSURL, newRegData) {
      dispatch(fetchContentStack(isCABabyRegistry, dynamicCSURL, newRegData));
    },
    clearCreateRegistryState() {
      dispatch(clearCreateRegistry());
    },
    getContent(contentParams) {
      dispatch(fetchContent(contentParams, {}));
    },
    displayLoginModal: visiblity => {
      dispatch(displayLoginModalVisibility(visiblity));
    },
    clearCreateRegistryVerTypeState() {
      dispatch(clearCreateRegistryVerType());
    },
    openGoodyBoxModalOpen: value => {
      dispatch(openGoodyBoxModalOpen(value));
    },
    editRegistryFromMoreInformationBtn(isRegistryEdit) {
      dispatch(editRegistryFromMoreInformationBtn(isRegistryEdit));
    },
    setCheckListTooltip(args) {
      dispatch(setChecklistToolTip(args));
    },
    getRefContent(contentIdCollection) {
      dispatch(fetchReferredContent(contentIdCollection));
    },
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withRegistryOwnerSaga = injectMultipleSagas([
  {
    key: REGISTRY_DETAILS_STATE_KEY,
    saga: registryOwnerSaga,
  },
  {
    key: CONTENT_STACK_STATE_KEY,
    saga: contentStackSaga,
  },
  {
    key: InteractiveCheckListStateKey,
    saga: interactiveCheckListSaga,
  },
]);
const withReducers = injectMultipleReducers([
  {
    key: REGISTRY_OWNER_ITEMS_STATE_KEY,
    reducer: registryOwnerCategoryReducer,
  },
  {
    key: REG_INPUTS_STATE_KEY,
    reducer: registryInputReducer,
  },
  {
    key: CONTENT_STACK_STATE_KEY,
    reducer: contentStackReducer,
  },
  {
    key: InteractiveCheckListStateKey,
    reducer: interactiveCheckListReducer,
  },
]);
export default compose(
  withReducers,
  withRegistryOwnerSaga,
  withConnect,
  withSiteSpectTracker
)(toJS(RegistryOwnerHome));
