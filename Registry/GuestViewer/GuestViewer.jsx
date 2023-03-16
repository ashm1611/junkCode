/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs, { parse } from 'qs';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import isEqual from 'lodash/fp/isEqual';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import {
  makeSelectSwitchConfig,
  makeSelectSiteConfig,
  selectSiteId,
  selectDeviceConfig,
  selectMPulsePageConfig,
  selectIsMPulseEnabled,
  makeSelectLabels,
  makeSelectEndPoints,
  makeSelectIsMobileScreen,
  makeSelectGlobalSwitchConfig,
  makeSelectThirdPartyConfig,
  makeSelectPageConfig,
} from '@bbb-app/selectors/configSelector';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import isObject from '@bbb-app/utils/isObject';
import { isStoreBopisEnabled } from '@bbb-app/utils/StoreInfoUtils';
import { isBrowser } from '@bbb-app/utils/common';
import toJS from '@bbb-app/hoc/toJS';
import Notification from '@bbb-app/core-ui/notification/Notification';
import { selectAkamaiHeader } from '@bbb-app/selectors/appSelectors';
import {
  makeSelectIsLoggedIn,
  makeFavoriteStore,
  makeSelectProfile,
  makeSelectStoreId,
  makeSelectCustomerId,
  makeSelectRegistryList,
} from '@bbb-app/selectors/accountSelectors';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import { isPageSpecificRegeneration } from '@bbb-app/utils/mPulse';
import { SessionStorageUtil } from '@bbb-app/utils/sessionStorage';
import deferFunctionOnEvent from '@bbb-app/utils/deferOnEventUtil';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import {
  updateStateData,
  addFormField,
} from '@bbb-app/forms/containers/FormWrapper/actions';
import allRegTypes from '@bbb-app/registry-type/registryTypes';
import {
  makeSelectActiveRegistry,
  interactiveCheckListSelector,
} from '@bbb-app/selectors/registrySelectors';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { QUICK_VIEW_STATE_KEY } from '@bbb-app/constants/appConstants';
import { fetchRegistriesDetails } from '@bbb-app/get-registry-details/containers/actions';
import injectSaga from '@bbb-app/hoc/injectSaga';
import injectMultipleSagas from '@bbb-app/hoc/injectMultipleSagas';
import injectMultipleReducers from '@bbb-app/hoc/injectMultipleReducers';
import { makeHeaderState } from '@bbb-app/header/containers/selectors';
import getStoreFromCookies from '@bbb-app/utils/getStoreFromCookies';
import { storeDetailsSelector } from '@bbb-app/redux/store-details/selectors';
import {
  makeSelectFindAStoreModal,
  makeSelectIsPickupInStoreOpen,
} from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/PickUpInStoreModalSelectors';
import { updatePickupinStoreModal } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/actions';
import { saveLandingZip as setLandingZip } from '@bbb-app/pick-up-in-store/containers/ActionsWithSagaInjection';
import { fetchSkuStoreDetails } from '@bbb-app/search-stores/containers/searched-sku-store/ActionsWithSagaInjection';
import {
  anchorToItem,
  saveIsBackButtonPressed,
  getDataFromSessionStorage,
  saveDataInSessionStorage,
  deleteFromSessionStorage,
} from '@bbb-app/utils/RegistryUtils';
import { getNearestStoreFromApi } from '@bbb-app/redux/akamai/constants';
import { fetchProfileData } from '@bbb-app/redux/profile-data/actions';
import { fetchFavoriteStore } from '@bbb-app/redux/favorite-store/ActionsWithSagaInjection';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import { makeContentStackContents } from '@bbb-app/redux/content-stack/selectors';
import contentStackReducer from '@bbb-app/redux/content-stack/reducer';
import { fetchContentStack } from '@bbb-app/redux/content-stack/actions';
import { CONTENT_STACK_STATE_KEY } from '@bbb-app/redux/content-stack/constants';
import contentStackSaga from '@bbb-app/redux/content-stack/sagas';
import Skeleton from '../RegistryOwnerMain/Skeleton';
import {
  returnFirstCategoryItemCount,
  returnFilteredItemsCount,
} from '../../../../containers/Pages/Registry/RegistryUtils';
import {
  getRegistryData,
  getFetchingStatus,
  getErrorStatus,
  makeSelectSocialAnxWriteReview,
} from '../RegistryOwner/commonSelectors';
import {
  getBuyOffContextData,
  makeSelectBarcode,
  makeAkamaiInfo,
  getItemsFetchingStatus,
  makeSelectFirstCategoryList,
  makeSelectOtherCategoryList,
  makeSelectOosCategoryList,
  getCopyRegistryStatus,
  getCopyProductCount,
  getRemainingItemsFetchingStatus,
  getSortedItemsFetchingStatus,
  getOosItemsFetchingStatus,
  isSocialAnnexReady,
  getOosErrorStatus,
  getCategoryErrorStatus,
  isFilterItemReady,
  makeSelectSitespectCampaigns,
  getSelectedCheckBoxFilter,
  getFacetsData,
  makeSelectFromFirstCategory,
} from './selectors';
import { getContextPath } from '../../../../containers/Search/selectors';
import { clearGuestViewData } from './actionWithReducerInjection';
import GuestViewerLayout from '../../../../components/Pages/Registry/GuestViewer/GuestViewerLayout/GuestViewerLayout';
import {
  copyRegistry,
  fetchRegistryFirstCategory,
  resetResponse,
  setBuyOffContext,
  setBuyOffContextValue,
  resetIsItemsFetchingStatus,
  updateBopisCheckBoxState,
} from './actions';
import {
  WARRANTY_INFO_REFERRED_CONTENT_KEY,
  NEED_HELP_REFERRED_CONTENT_KEY,
  PERFECT_GIFT_REFERRED_CONTENT_KEY,
  BARCODE_MODAL_TEXT_KEY,
  COPY_SUCCESS_STATE_KEY,
  BUYOFF_CONTEXT_STATE_KEY,
  GIFT_GIVER_STATE_KEY,
  TEALIUM_PAGE_INFO,
  BOPIS_GUEST_CHECKBOX,
  DISPLAY_DISCOUNTED_PRICE_KEY,
  REGISTRY_OWNER_STATE_KEY,
} from './constants';
import { getFiltersTealiumData } from '../../../../components/Pages/Registry/RegistryFacetFilter/RegistryFacetTealiumHandler';
import PickupInStoreModalWrapper from '../../../../containers/PickupInStoreModal/PickupInStoreModalWrapper.async';
import { fetchQuickViewProductDetails } from '../../../QuickViewModal/ActionWithSagaInjection';
import { makeSelectIsQuickViewOpen } from '../../../QuickViewModal/QuickViewModalSelectors';
import RegistryGuestViewTealiumHandler from '../../../ThirdParty/Tealium/Registry/RegistryGuestViewTealiumHandler/RegistryGuestViewTealiumHandler';
import RegistryGuestWlcmeMsgForRecommender from '../RegistryGuestWlcmeMsgForRecommender/RegistryGuestWlcmeMsgForRecommender';
import CopyRegistryReducer, {
  BuyOffContextReducer,
  GiftGiverReducer,
} from './reducer';
import saga from './sagas';
import { ERR_FETCHING_DELETED_REGISTRY } from '../RegistryOwner/constants';
import { fetchRegistryData } from '../RegistryOwner/RegistryDetailsSagaInjectionOnServer';
import { makeSelectLandingZip } from '../../../Search/Filters/pickupStoreSelector';
import {
  selectRegsitryFacetFilter,
  makeSelectFirstCategoryDateSortedList,
  makeSelectOosCategoryDateSortedList,
} from '../RegistryFacetFilter/selectors';
import {
  sortCategoryItems,
  applyFilter,
} from '../../../../components/Pages/Registry/utils/sortCategoryItems';
import quikViewModalReducer from '../../../QuickViewModal/combinedReducer';
import {
  EMAIL_SENT_RESPONSE_LBL,
  EMAIL_SUBJECT_LBL,
  EMAIL_TITLE_LBL,
} from '../../../../components/Pages/Registry/constants';
import contributeCashFundSaga from '../CashFunds/CoontributeModal/sagas';
import { CONTRIBUTE_CASH_FUND_STATE_KEY } from '../CashFunds/CoontributeModal/constants';
import {
  contributeCashFund,
  clearContributeCashFund,
} from '../CashFunds/CoontributeModal/actions';
import { contributeCashFundReducer } from '../CashFunds/CoontributeModal/reducer';
import { getCFSubmitAPIStatus } from '../CashFunds/CoontributeModal/selectors';
const propTypes = {
  onComponentMount: PropTypes.func,
  findAStoreModal: PropTypes.bool,
  getRegistryFirstCategory: PropTypes.func,
  match: PropTypes.object,
  labels: PropTypes.object,
  registryData: PropTypes.object,
  dynamicContentState: PropTypes.object,
  profileData: PropTypes.object,
  getProfile: PropTypes.func,
  buyOffContext: PropTypes.string,
  setBuyOffContextValue: PropTypes.func,
  makeReviewYourProductsConfig: PropTypes.object,
  isFetching: PropTypes.bool,
  isFetchingRemaining: PropTypes.bool,
  resetIsItemsFetchingStatus: PropTypes.func,
  isMPulseEnabled: PropTypes.bool,
  errorStatus: PropTypes.object,
  handleTealiumEvent: PropTypes.func,
  customerID: PropTypes.string,
  clearGuestData: PropTypes.func,
  location: PropTypes.object.isRequired,
  getRegistryGuestData: PropTypes.func,
  storeDetails: PropTypes.object,
  landingZip: PropTypes.object,
  saveLandingZip: PropTypes.func,
  onPickupInStoreButtonClick: PropTypes.func,
  updateBopisCheckBoxState: PropTypes.func,
  selectedCheckboxFilter: PropTypes.string,
  isBopisFeatureEnable: PropTypes.bool,
  getRefContent: PropTypes.func,
  selectedFilters: PropTypes.object,
  dateSortedfirstCategoryList: PropTypes.object,
  dateSortedOosCategoryList: PropTypes.object,
  isPickupInStoreModalOpen: PropTypes.bool,
  ownerView: PropTypes.bool,
  facetId: PropTypes.string,
  singleSelection: PropTypes.string,
  isItemsFetching: PropTypes.bool,
  itemRegistered: PropTypes.number,
  itemPurchased: PropTypes.number,
  diaperFundEnabled: PropTypes.bool,
  storedValueOptIn: PropTypes.bool,
  registryTypeName: PropTypes.string,
  isMobile: PropTypes.bool,
  fetchContentStack: PropTypes.func,
  contentStackSelectors: PropTypes.object,
  enableRegistryCollaboration: PropTypes.bool,
  enableCashFund: PropTypes.bool,
  registryFirstCategoryList: PropTypes.array,
  regCashFundEventTypes: PropTypes.object,
  tnGiftsPurchased: PropTypes.string,
};
/* Labels */
const DELETED_REGISTRY_LBL = 'Error fetching deleted registry';
const sessionUtil = new SessionStorageUtil(isBrowser());
/** Container for Gift Giver view Iframe.
 * @param {Object} labels - labels required to render heading, bodytext and link.
 */
export class GuestViewer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.registryId = props.match.params.id;
    this.hasFirstCategoryCallFired = false;
    this.state = {
      submitInProgress: false,
      isSuccess: null,
      emailSentResponse: null,
      checkBoxChecked: false,
      filter: '',
      isFiltered: false,
      selectedFilterOption: 'View All',
      searchFlag: false,
      hasPriceSortCategoryCallFired: true,
      hasPriceSeqSortCatCallFired: true,
      hasDateSeqSortCatCallFired: true,
      isFirstTimePageLoad: true,
      isRegistryContentSlotReq: true,
      firstCategoryApiCallFlag: false,
    };
    this.isPriceSortEnabled = true;
    this.isPriceSortSeq = true;
    this.sentEmail = '';
    this.emailSubmitForm = this.emailSubmitForm.bind(this);
    this.nearestStoreApiResolvedCall = this.nearestStoreApiResolvedCall.bind(
      this
    );
    this.emailSubmitFormSuccess = this.emailSubmitFormSuccess.bind(this);
    this.emailSubmitFormError = this.emailSubmitFormError.bind(this);
    this.clearSubmitResponse = this.clearSubmitResponse.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.getReferredContentId = this.getReferredContentId.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.enableSearchFlag = this.enableSearchFlag.bind(this);
    this.renderLayout = this.renderLayout.bind(this);
    this.renderGlobalNotification = this.renderGlobalNotification.bind(this);
    this.updateSkuIdForAnchoring = this.updateSkuIdForAnchoring.bind(this);
    this.renderSortBy = this.renderSortBy.bind(this);
    this.referredContentArray = LabelsUtil.getReferredContentIdCollection(
      props.labels,
      ['registryDetails'],
      props.dynamicContentState
    );
    this.enableCSLabels = pathOr(
      false,
      'globalSwitchConfig.enableCSLabels',
      props
    );
    this.referredContent = pathOr(
      null,
      this.enableCSLabels
        ? 'referredContent'
        : 'registryDetails.referredContent',
      props.labels
    );
    this.mPulseMarksPopulated = false;
    this.referredContentCallFired = false;
  }
  componentWillMount() {
    if (isBrowser() && isPageSpecificRegeneration()) {
      const PageSpecificMarks = pathOr(
        null,
        'mPulseSiteConfig.PageSpecificMarks',
        this.props
      );
      const ConditionalMarksFlag = pathOr(
        null,
        'mPulseSiteConfig.ConditionalMarksFlag',
        this.props
      );
      if (
        this.props.isMPulseEnabled &&
        typeof window !== 'undefined' &&
        window.instrumentation
      ) {
        window.instrumentation.setPageMarks({
          PageViewMarks: PageSpecificMarks,
          ConditionalMarksFlag,
        });
        window.instrumentation.removeConditionalMarksFlag(
          'ux-destination-verified',
          'ux-action-before-load'
        );
      }
    }
  }
  componentDidMount() {
    const { profileData, registryData, labels } = this.props;
    if (this.props.customerID) {
      this.props.onComponentMount(this.props.customerID);
    }
    if (!isEmpty(profileData) && isUserLoggedIn()) {
      this.props.getProfile(profileData.repositoryId);
    }
    if (this.enableCSLabels) {
      const referredContentIds = LabelsUtil.getReferredContentIds(labels);
      if (referredContentIds.length) {
        this.props.getRefContent(referredContentIds);
      }
    }
    const registryResVO = pathOr(null, 'registryResVO', registryData);
    const registryId = pathOr(
      null,
      'registrySummaryVO.registryId',
      registryResVO
    );
    // For SSR no need to make the API call again
    if (
      isEmpty(registryData) ||
      pathOr('', 'match.params.id', this.props) !== registryId
    ) {
      this.props.getRegistryGuestData(this.props.match.params);
    }
    /** Below function will save a param in session If Browser back button is pressed */
    saveIsBackButtonPressed();
    // will fetch the store Id for handle store Id in hard spa
    const store = getStoreFromCookies();
    if (store && store.storeId) {
      this.storeId = store.storeId;
    } else if (getNearestStoreFromApi()) {
      this.nearestStoreApiResolved = true;
      this.storeId = pathOr(undefined, 'storeId', getNearestStoreFromApi());
    }
    if (this.storeId) {
      // will handle if this.storeId is bopis unavailable store as we are deleting this.storeId(if store is non bopis store) prior to api call
      this.nearestStoreApiResolved = true;
    }
    // will defer first category api call until nearest store api get complete
    deferFunctionOnEvent({
      deferOnPages: ['GuestViewer'],
      eventName: 'akamaiCallResolved',
      func: this.nearestStoreApiResolvedCall,
      pageIdentifier: 'GuestViewer',
      once: true,
    });
    const bopisGuestCheckbox = sessionUtil.getItem(BOPIS_GUEST_CHECKBOX);
    /* istanbul ignore else */
    if (bopisGuestCheckbox)
      this.props.updateBopisCheckBoxState(bopisGuestCheckbox);
  }
  componentWillReceiveProps(nextProps) {
    const { registryFirstCategoryList } = nextProps;
    const profileId = pathOr(null, 'profileData.repositoryId', nextProps);
    const lastProfileId = pathOr(null, 'profileData.repositoryId', this.props);
    const registryResVO = pathOr(null, 'registryResVO', nextProps.registryData);
    const isPublic = pathOr(null, 'registrySummaryVO.isPublic', registryResVO);
    /* istanbul ignore next */
    if (isPublic === '1') {
      this.renderSortBy(nextProps);
    }
    if (lastProfileId !== profileId && isUserLoggedIn()) {
      this.props.getProfile(profileId);
    }
    const mPulseEnabled = this.props.isMPulseEnabled;
    if (
      mPulseEnabled &&
      !this.mPulseMarksPopulated &&
      (registryFirstCategoryList || nextProps.dateSortedfirstCategoryList)
    ) {
      const itemCount =
        (registryFirstCategoryList &&
          returnFirstCategoryItemCount(registryFirstCategoryList)) ||
        (nextProps.dateSortedfirstCategoryList &&
          returnFilteredItemsCount(nextProps.dateSortedfirstCategoryList));
      if (itemCount > 0) {
        const preparedPageSpecificMarks = this.preparePageSpecificmarks();
        if (
          typeof window.instrumentation !== 'undefined' &&
          typeof window.instrumentation.setPageMarks === 'function'
        ) {
          window.instrumentation.setPageMarks({
            PageViewMarks: preparedPageSpecificMarks,
          });
        }
      }
      if (
        typeof window.instrumentation !== 'undefined' &&
        typeof window.instrumentation.removeConditionalMarksFlag === 'function'
      ) {
        window.instrumentation.removeConditionalMarksFlag(
          'ux-primary-content-displayed',
          'ux-action-before-content-load'
        );
      }
      this.mPulseMarksPopulated = true;
    }
    this.setDropDownOptionForSort();
    saveIsBackButtonPressed();
    this.updateItemsInFilteredMap(nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (isEqual(this.props, nextProps) && isEqual(this.state, nextState)) {
      return false;
    }
    return true;
  }
  componentDidUpdate() {
    const anchoredSkuId = getDataFromSessionStorage('anchoredSkuId');
    const isBackButtonPressed = getDataFromSessionStorage(
      'isBackButtonPressed'
    );
    if (
      !this.props.isFetching &&
      !this.props.isFetchingRemaining &&
      anchoredSkuId &&
      isBackButtonPressed
    ) {
      const queryObj = {};
      queryObj.skuAdded = anchoredSkuId;
      anchorToItem(queryObj);
    }
  }
  componentWillUnmount() {
    this.props.resetIsItemsFetchingStatus();
    this.props.clearGuestData();
    this.props.updateBopisCheckBoxState('');
    deleteFromSessionStorage('searchRegistryUrl');
  }
  setDropDownOptionForSort() {
    if (
      this.sortSeq &&
      Number(this.sortSeq) === 3 &&
      this.state.hasDateSeqSortCatCallFired
    ) {
      const nextSelectedDropdownOption = 'Date';
      const nextTilesView = '3';
      this.setState({
        selectedDropdownOption: nextSelectedDropdownOption,
        tilesView: nextTilesView,
        hasDateSeqSortCatCallFired: false,
      });
    }
  }
  getFavoriteStore({ isLoggedIn, storeInfo, fetchStore }, favoriteStoreId) {
    if (isLoggedIn && !isEmpty(favoriteStoreId) && isEmpty(storeInfo)) {
      fetchStore(favoriteStoreId);
    }
  }
  getReferredContentId(key) {
    let contentId;
    if (this.referredContent) {
      this.referredContent.forEach(obj => {
        if (obj.key === key) contentId = obj.id;
      });
    }
    return contentId;
  }
  nearestStoreApiResolvedCall = () => {
    if (!this.storeId && !this.lastStoreId) {
      this.storeId = pathOr(undefined, 'storeId', getNearestStoreFromApi());
      this.nearestStoreApiResolved = true;
      this.renderSortBy(this.props);
    }
  };
  updateItemsInFilteredMap = nextProps => {
    const isPriceSort = {
      lowtohigh: 'asc',
      hightolow: 'des',
    }[pathOr(null, 'selectedFilters.sort[0]', nextProps)];
    const {
      dateSortedfirstCategoryList: currentData,
      dateSortedOosCategoryList: currentOosData,
    } = this.props;
    const {
      dateSortedfirstCategoryList: newData,
      dateSortedOosCategoryList: newOosData,
    } = nextProps;
    if (
      !isEqual(this.props.selectedFilters, nextProps.selectedFilters) ||
      !isEqual(currentData, newData) ||
      (!this.state.filteredFirstCategoryItems && newData)
    ) {
      let firstCategoryList = pathOr([], '[0].registryItemList', newData);
      firstCategoryList = applyFilter(
        firstCategoryList,
        nextProps.selectedFilters
      );
      this.setState({
        filteredFirstCategoryItems: sortCategoryItems(
          firstCategoryList,
          isPriceSort
        ),
      });
      this.setState({
        isRegistryContentSlotReq: true,
      });
      if (
        (firstCategoryList &&
          Object.keys(nextProps.selectedFilters).length > 0 &&
          (nextProps.selectedFilters.sort[0] === 'lowtohigh' ||
            nextProps.selectedFilters.sort[0] === 'hightolow')) ||
        nextProps.selectedFilters.status ||
        nextProps.selectedFilters.categories ||
        nextProps.selectedFilters.price
      ) {
        this.setState({
          isRegistryContentSlotReq: false,
        });
      }
    }
    if (
      !isEqual(this.props.selectedFilters, nextProps.selectedFilters) ||
      !isEqual(currentOosData, newOosData) ||
      (!this.state.filteredSortedOosCategoryItems && newOosData)
    ) {
      let oosCategoryList = pathOr(
        [],
        'atgResponse[0].registryItemList',
        newOosData
      );
      oosCategoryList = applyFilter(oosCategoryList, nextProps.selectedFilters);
      this.setState({
        filteredSortedOosCategoryItems: sortCategoryItems(
          oosCategoryList,
          isPriceSort
        ),
      });
    }
  };
  collaborationGiftHelpContent = () => {
    const dynamicCSURL = `/store/static/collaboration-email-template`;
    this.props.fetchContentStack(false, dynamicCSURL);
  };
  /**
   * @function handleChangePickupInStore
   * Handler for when the "change store" link is clicked
   */
  handleChangePickupInStore = event => {
    this.setState({
      isCheckboxSelectionRequired: true,
      isFirstTimePageLoad: false,
    });
    event.preventDefault();
    const {
      storeDetails,
      landingZip,
      saveLandingZip,
      onPickupInStoreButtonClick,
    } = this.props;
    const zipInStore = !isEmpty(storeDetails) && `${storeDetails.postalCode}`;
    /* istanbul ignore else */
    if (!landingZip && zipInStore) {
      saveLandingZip(zipInStore);
    }
    onPickupInStoreButtonClick({ findAStoreModal: true });
  };
  updateSkuIdForAnchoring(valueOrSkuId, anchoredSkuCategoryId) {
    saveDataInSessionStorage(`anchoredSkuId`, valueOrSkuId);
    saveDataInSessionStorage(`anchoredSkuCategoryId`, anchoredSkuCategoryId);
  }
  preparePageSpecificmarks() {
    const PageSpecificMarks = {
      'ux-destination-verified': [],
      'ux-primary-content-displayed': [],
      'ux-primary-action-available': [],
      'ux-secondary-content-displayed': [],
    };
    PageSpecificMarks['ux-primary-content-displayed'].push(
      'ux-handler-expand-top-primary-content'
    );
    PageSpecificMarks['ux-primary-action-available'].push(
      'ux-handler-expand-top-primary-action'
    );
    return PageSpecificMarks;
  }
  injectInstrumentationScript() {
    const PageSpecificMarks = pathOr(
      null,
      'mPulseSiteConfig.PageSpecificMarks',
      this.props
    );
    const instrumentationScript = `window.instrumentation.setPageMarks({
        "PageViewMarks":${JSON.stringify(PageSpecificMarks)}});
        window.instrumentation.removeConditionalMarksFlag(
          'ux-destination-verified',
          'ux-action-before-load'
        );
    `;
    /* eslint-disable react/no-danger */
    return (
      <script dangerouslySetInnerHTML={{ __html: instrumentationScript }} />
    );
    /* eslint-enable */
  }
  enableSearchFlag(state) {
    this.setState({
      searchFlag: state,
    });
  }
  changeFilter(value, isFiltered, selectedFilterOption) {
    this.setState({ filter: value, isFiltered, selectedFilterOption });
  }
  /** submitForm Success handler */
  emailSubmitFormSuccess(data) {
    const { body: savedEmailResponse } = data;
    if (savedEmailResponse.data.result) {
      this.setState({
        isSuccess: true,
        emailSentResponse: `${EMAIL_SENT_RESPONSE_LBL}
        ${this.sentEmail}`,
        submitInProgress: false,
      });
    } else {
      this.setState({
        isSuccess: false,
        emailSentResponse: savedEmailResponse.data.component.emailResponse,
        submitInProgress: false,
      });
    }
  }
  /** submitForm Error handler */
  emailSubmitFormError(error) {
    this.sentEmail = '';
    this.setState({
      isSuccess: false,
      emailSentResponse: pathOr(
        '',
        ['body', 'response', 'data', 'errorMessages', '0', 'message'],
        error
      ),
      submitInProgress: false,
    });
  }
  /** Clear last submit response*/
  clearSubmitResponse() {
    this.setState({
      isSuccess: null,
      emailSentResponse: null,
      submitInProgress: false,
      checkBoxChecked: false,
    });
  }
  /** This will handle checkbox selection */
  handleCheckBox() {
    this.setState({
      checkBoxChecked: !this.state.checkBoxChecked,
    });
  }
  emailRegistryTealium = (registryId, registryType) => {
    const tealiumTags = {
      registry_id: registryId,
      registry_type: registryType,
      pagename_breadcrumb: 'Registry View Page',
    };
    return Object.assign({}, tealiumTags);
  };
  tealiumTagsOnClickOfRegEmail(registrySummaryVO) {
    const emailRegistryData = this.emailRegistryTealium(
      registrySummaryVO ? registrySummaryVO.registryId : '',
      registrySummaryVO ? registrySummaryVO.eventType : ''
    );
    this.props.handleTealiumEvent(
      'email registry',
      emailRegistryData,
      TEALIUM_PAGE_INFO
    );
  }
  /** trigger API for sending saved cart email and set local state based on response recieved */
  emailSubmitForm(formData) {
    const registryResVO = pathOr(
      null,
      'registryResVO',
      this.props.registryData
    );
    const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);
    const endPoint = getApiEndPointsFromStore('emailRegistry');
    const { checkBoxChecked } = this.state;
    const apiData = {
      senderEmail: formData.senderEmail,
      recipientEmail: formData.recipientEmail,
      eventType: registrySummaryVO.eventType,
      message: formData.message,
      registryEventDate: registrySummaryVO.eventDate,
      subject: EMAIL_SUBJECT_LBL,
      regFirstName: registrySummaryVO.primaryRegistrantFirstName,
      regLastName: registrySummaryVO.primaryRegistrantLastName,
      title: EMAIL_TITLE_LBL,
      coRegFirstName: registrySummaryVO.coRegistrantFirstName,
      coRegLastName: registrySummaryVO.coRegistrantLastName,
      registryName: registrySummaryVO.eventType,
      daysToGo: registrySummaryVO.daysToGo,
      registryId: registrySummaryVO.registryId,
      ccFlag: checkBoxChecked,
    };
    this.sentEmail = formData.recipientEmail;
    this.setState({
      submitInProgress: true,
    });
    this.tealiumTagsOnClickOfRegEmail(registrySummaryVO);
    ServiceUtil.triggerServerRequest({
      url: endPoint,
      method: 'POST',
      data: qs.stringify(apiData),
      headers: {
        'atg-rest-depth': 0,
      },
    })
      .then(this.emailSubmitFormSuccess)
      .catch(this.emailSubmitFormError);
  }
  /** will call when bopis checkbox or inStockOnline checkbox change */
  handleBopisCheckboxChange = checkBoxType => {
    this.setState({ isFirstTimePageLoad: false });
    this.props.updateBopisCheckBoxState(
      checkBoxType === this.props.selectedCheckboxFilter
        ? undefined
        : checkBoxType
    );
    const tealiumData = getFiltersTealiumData(
      this.props.facetId,
      this.props.selectedFilters,
      this.props.singleSelection,
      checkBoxType,
      this.props.ownerView,
      this.state.checkBoxChecked
    );
    triggerTealiumEvent('', tealiumData, '');
  };
  // will update the store in state if store got changed
  bopisStoreChange = (currentStoreId, changedStore, changedStoreId) => {
    if (
      currentStoreId !== changedStoreId ||
      (currentStoreId && !this.state.bopisStoreDetail)
    ) {
      // reset the last store ID to restrict the storeId in first category api call in case no bopis store
      delete this.storeId;
      const isBopisStore = isStoreBopisEnabled(changedStore);
      if (isBopisStore) {
        this.storeId = changedStoreId; // will use storeId instead of changedStoreId coz changeStoreId would be non bopis store Id
        // checkbox will selected if it got change from filter -> store pick -> modal only
        if (this.state.isCheckboxSelectionRequired) {
          //  bopis checkbox will be selected if changed store is  bopis enabled
          this.props.updateBopisCheckBoxState('store-pickup');
        }
      } else if (this.props.selectedCheckboxFilter === 'store-pickup') {
        // in case if store is no bopis store then, bopis checkbox will be unselected
        this.props.updateBopisCheckBoxState();
      }
      const bopisStoreDetail = {
        isBopisStore,
        storeId: this.storeId,
      };
      this.setState({ bopisStoreDetail, isCheckboxSelectionRequired: false });
    }
  };
  handleFirstCategoryCall = value => {
    this.setState({ firstCategoryApiCallFlag: value });
  };
  /** Render Layouy for access allowed user */
  renderSortBy(nextProps) {
    const currentStoreId = pathOr(
      undefined,
      'storeDetails.storeId',
      this.props
    );
    const changedStore = pathOr(undefined, 'storeDetails', nextProps);
    const changedStoreId = changedStore && changedStore.storeId;
    this.bopisStoreChange(currentStoreId, changedStore, changedStoreId);
    const popularArray = pathOr(null, 'popular', allRegTypes);
    const otherArray = pathOr(null, 'other', allRegTypes);
    const eventType = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO.eventType',
      nextProps
    );
    const registrySummary = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO',
      nextProps
    );
    if (eventType && (popularArray || otherArray)) {
      const categoryData = popularArray.concat(otherArray);
      const eventObject = categoryData.filter(arr => {
        return arr.registryName.toLowerCase() === eventType.toLowerCase();
      });
      const query = parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      });
      const wcref = pathOr(null, 'wcref', query);
      const wcsid = pathOr(null, 'wcsid', query);
      const isBopisfeatureOff =
        !this.props.isBopisFeatureEnable && !this.firstStoreApiCalled;
      const cashFundCallFired =
        this.state.firstCategoryApiCallFlag && this.props.enableCashFund;
      const isBopisfeatureOn =
        this.props.isBopisFeatureEnable &&
        ((this.storeId && this.storeId !== this.lastStoreId) ||
          this.nearestStoreApiResolved);
      if (
        this.registryId === registrySummary.registryId &&
        (isBopisfeatureOff || isBopisfeatureOn || cashFundCallFired)
      ) {
        this.firstStoreApiCalled = true;
        this.sortSeq = 3;
        /* istanbul ignore else */
        if (eventObject && eventObject[0].registryName) {
          this.nearestStoreApiResolved = false;
          this.lastStoreId = this.storeId;
          this.props.getRegistryFirstCategory(
            registrySummary.eventDate,
            registrySummary.registryId,
            eventObject[0].registryCode,
            true,
            wcref,
            wcsid,
            {
              storeId: this.storeId,
              isBopisFeatureEnable: this.props.isBopisFeatureEnable,
            }
          );
          this.hasFirstCategoryCallFired = true;
          if (cashFundCallFired) this.handleFirstCategoryCall(false);
        }
      }
      this.setState({
        registryCode: eventObject[0].registryCode,
      });
    }
    if (
      !this.referredContentCallFired &&
      this.props.isItemsFetching &&
      !nextProps.isItemsFetching
    ) {
      this.props.getRefContent(this.referredContentArray);
      this.referredContentCallFired = true;
    }
  }
  renderLayout() {
    const { dynamicContentState, isItemsFetching } = this.props;
    const registrySummaryVO = pathOr(
      {},
      'registryResVO.registrySummaryVO',
      this.props.registryData
    );
    const registryVO = pathOr(
      {},
      'registryResVO.registryVO',
      this.props.registryData
    );
    let data = this.props.registryData;
    if (pathOr(false, 'dataFromSolrCall', data)) {
      data = {
        ...data,
        registryResVO: {
          registrySummaryVO: {
            ...registrySummaryVO,
            storedValueOptIn: this.props.storedValueOptIn,
            diaperFundEnabled: this.props.diaperFundEnabled,
            giftTotalPurchased: isItemsFetching ? 0 : this.props.itemPurchased,
            giftRegistered: isItemsFetching ? 0 : this.props.itemRegistered,
            registryType: {
              registryTypeName: this.props.registryTypeName,
            },
          },
          registryVO: {
            ...registryVO,
            tnGiftsPurchased: this.props.tnGiftsPurchased,
          },
        },
      };
    }
    const getWarrantyInfo = pathOr(
      null,
      this.getReferredContentId(WARRANTY_INFO_REFERRED_CONTENT_KEY),
      dynamicContentState.content
    );
    const getPerfectGift = pathOr(
      null,
      this.getReferredContentId(PERFECT_GIFT_REFERRED_CONTENT_KEY),
      dynamicContentState.content
    );
    let getHelp = pathOr(
      null,
      this.getReferredContentId(NEED_HELP_REFERRED_CONTENT_KEY),
      dynamicContentState.content
    );
    if (getHelp !== null) {
      getHelp = getHelp.components && getHelp.components[0];
    }
    const barcodeModalText = pathOr(
      null,
      this.getReferredContentId(BARCODE_MODAL_TEXT_KEY),
      dynamicContentState.content
    );
    const anchoredSkuCategoryId = getDataFromSessionStorage(
      'anchoredSkuCategoryId'
    );
    const isBackButtonPressed = getDataFromSessionStorage(
      'isBackButtonPressed'
    );
    const isPOBoxAddress = pathOr(
      null,
      'registryData.isPOBoxAddress',
      this.props
    );
    if (this.props.buyOffContext) {
      this.props.setBuyOffContextValue(false);
    }
    const isDiaperFundEnable = pathOr(
      false,
      'registryResVO.registrySummaryVO.diaperFundEnabled',
      data
    );
    const eventType = pathOr(
      null,
      'registryResVO.registrySummaryVO.eventType',
      data
    );
    if (data) {
      return (
        <React.Fragment>
          {this.props.isMPulseEnabled && typeof window === 'undefined'
            ? this.injectInstrumentationScript()
            : null}
          <ErrorBoundary>
            <RegistryGuestViewTealiumHandler />
          </ErrorBoundary>
          <ErrorBoundary>
            <GuestViewerLayout
              {...this.props}
              isRegistryContentSlotReq={this.state.isRegistryContentSlotReq}
              registryId={this.registryId}
              submitForm={this.emailSubmitForm}
              emailSentResponse={this.state.emailSentResponse}
              clearSubmitResponse={this.clearSubmitResponse}
              checkBoxChecked={this.state.checkBoxChecked}
              handleCheckBox={this.handleCheckBox}
              getHelp={getHelp}
              registryData={data}
              getPerfectGift={getPerfectGift}
              getWarrantyInfo={getWarrantyInfo}
              registryCode={this.state.registryCode}
              selectedDropdownOption={this.state.selectedDropdownOption}
              tilesView={this.state.tilesView}
              changeFilter={this.changeFilter}
              filter={this.state.filter}
              isFiltered={this.state.isFiltered}
              selectedFilterOption={this.state.selectedFilterOption}
              enableSearchFlag={this.enableSearchFlag}
              config={this.props.makeReviewYourProductsConfig}
              updateSkuIdForAnchoring={this.updateSkuIdForAnchoring}
              barcodeModalText={barcodeModalText}
              anchoredSkuCategoryId={anchoredSkuCategoryId}
              isBackButtonPressed={isBackButtonPressed}
              searchRegistryUrl={getDataFromSessionStorage('searchRegistryUrl')}
              mPulseEnabled={this.props.isMPulseEnabled}
              isPOBoxAddress={isPOBoxAddress}
              fireTealiumAction={this.props.handleTealiumEvent}
              handleChangePickupInStore={this.handleChangePickupInStore}
              handleBopisCheckboxChange={this.handleBopisCheckboxChange}
              bopisStoreDetail={this.state.bopisStoreDetail}
              filteredFirstCategoryItems={this.state.filteredFirstCategoryItems}
              filteredSortedOosCategoryItems={
                this.state.filteredSortedOosCategoryItems
              }
              isDiaperFundEnable={isDiaperFundEnable}
              eventType={eventType}
              collaborationGiftHelpContent={this.collaborationGiftHelpContent}
              contentStackSelectors={this.props.contentStackSelectors}
              enableRegistryCollaboration={
                this.props.enableRegistryCollaboration
              }
              regCashFundEventTypes={this.props.regCashFundEventTypes}
              handleFirstCategoryCall={this.handleFirstCategoryCall}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            {this.props.isPickupInStoreModalOpen && (
              <PickupInStoreModalWrapper
                showSearchFlag={this.state.searchFlag}
                enableSearchFlag={this.enableSearchFlag}
                registryId={this.registryId}
                findAStoreModal={this.props.findAStoreModal}
                changeStore
              />
            )}
            <RegistryGuestWlcmeMsgForRecommender
              labels={this.props.labels}
              enableRegistryCollaboration={
                this.props.enableRegistryCollaboration
              }
            />
          </ErrorBoundary>
        </React.Fragment>
      );
    }
    return null;
  }
  renderGlobalNotification(content) {
    return (
      <div className="mt3">
        <Notification
          status={'error'}
          wrapperClass={'grid-container'}
          content={content}
        />
      </div>
    );
  }
  render() {
    const { errorStatus, labels } = this.props;
    const privateRegistryLabel = LabelsUtil.getLabel(
      labels.RecommederLandingPage,
      'privateRegistryMessageLabel'
    );
    const isPublic = pathOr(
      '1',
      'registryResVO.registrySummaryVO.isPublic',
      this.props.registryData
    );
    const accessDenied = isPublic === '0';
    if (this.props.isFetching) {
      return <Skeleton isMobile={this.props.isMobile} />;
    }
    if (errorStatus && Array.isArray(errorStatus)) {
      const errorMsg = LabelsUtil.getLabel(labels, errorStatus[0].code);
      return this.renderGlobalNotification(errorMsg);
    } else if (isObject(errorStatus)) {
      const errorMsg = pathOr(
        '',
        'response.data.errorMessages[0].message',
        errorStatus
      );
      return this.renderGlobalNotification(errorMsg);
    } else if (errorStatus === ERR_FETCHING_DELETED_REGISTRY) {
      return this.renderGlobalNotification(DELETED_REGISTRY_LBL);
    } else if (errorStatus) {
      return this.renderGlobalNotification(errorStatus);
    }
    return accessDenied
      ? this.renderGlobalNotification(privateRegistryLabel)
      : this.renderLayout();
  }
}
export const mapDispatchToProps = dispatch => {
  return {
    onComponentMount(customerID) {
      dispatch(fetchRegistriesDetails(customerID));
    },
    getRefContent(referredContentArray) {
      dispatch(fetchReferredContent(referredContentArray));
    },
    copyRegistryAct: (sourceId, targetId, regType) => {
      dispatch(copyRegistry(sourceId, targetId, regType));
    },
    getRegistryFirstCategory: (
      evtDate,
      regId,
      regCode,
      isDateSort,
      wcref,
      wcsid,
      params
    ) => {
      dispatch(
        fetchRegistryFirstCategory(
          evtDate,
          regId,
          regCode,
          isDateSort,
          wcref,
          wcsid,
          params
        )
      );
    },
    redirectTo: path => {
      dispatch(push(path));
    },
    resetResponse: () => {
      dispatch(resetResponse());
    },
    onPickupInStoreButtonClick(args) {
      dispatch(updatePickupinStoreModal(args));
    },
    searchStoreDetails(args) {
      dispatch(fetchSkuStoreDetails(args));
    },
    getProfile: customerId => {
      dispatch(fetchProfileData(customerId));
    },
    fetchStore: storeId => dispatch(fetchFavoriteStore(storeId)),
    handleTealiumEvent(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    setBuyOffContext: registryId => {
      dispatch(setBuyOffContext(registryId));
    },
    setBuyOffContextValue: data => {
      dispatch(setBuyOffContextValue(data));
    },
    clearGuestData: () => {
      dispatch(clearGuestViewData());
    },
    resetIsItemsFetchingStatus: () => {
      dispatch(resetIsItemsFetchingStatus());
    },
    onQuickViewButtonClick(
      productId,
      productVariation,
      productUrl,
      productInfo,
      swatchDetails
    ) {
      dispatch(
        fetchQuickViewProductDetails(
          productId,
          productVariation,
          productUrl,
          productInfo,
          swatchDetails
        )
      );
    },
    saveLandingZip(zip) {
      dispatch(setLandingZip(zip));
    },
    getRegistryGuestData: params => dispatch(fetchRegistryData(params)),
    updateStateData: data => {
      dispatch(updateStateData(data));
    },
    addFormField: data => {
      dispatch(addFormField(data));
    },
    updateBopisCheckBoxState: payload => {
      sessionUtil.saveItem(BOPIS_GUEST_CHECKBOX, payload);
      dispatch(updateBopisCheckBoxState(payload));
    },
    fetchContentStack(args, dynamicCSURL) {
      dispatch(fetchContentStack(args, dynamicCSURL));
    },
    contributeCashFund(payload) {
      dispatch(contributeCashFund(payload));
    },
    clearContributeCashFund() {
      dispatch(clearContributeCashFund());
    },
  };
};
export const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobileScreen,
  labels: makeSelectLabels(['Registry']),
  registryData: getRegistryData(),
  isFetching: getFetchingStatus(),
  endPoints: makeSelectEndPoints(),
  isLoggedIn: makeSelectIsLoggedIn(),
  activeRegistry: makeSelectActiveRegistry(),
  registryList: makeSelectRegistryList(),
  registryFirstCategoryList: makeSelectFirstCategoryList(),
  registryOtherCategoryList: makeSelectOtherCategoryList(),
  registryOosCategoryList: makeSelectOosCategoryList(),
  isRegistryCopied: getCopyRegistryStatus(),
  copiedProducts: getCopyProductCount(),
  makeReviewYourProductsConfig: makeSelectSocialAnxWriteReview(),
  dynamicContentState: makeSelectContent(),
  bookAppointment: makeSelectGlobalSwitchConfig(['enableBookAppointment']),
  liveChat: makeSelectGlobalSwitchConfig(['enableLiveChat']),
  deviceConfig: selectDeviceConfig,
  contextPath: getContextPath,
  enableKatori: makeSelectSwitchConfig(['PDP', 'enableKatori']),
  profileData: makeSelectProfile(),
  favoriteStore: makeSelectStoreId(),
  storeInfo: makeFavoriteStore(),
  searchRadius: makeSelectSiteConfig(['findStore', 'searchRadius']),
  buyOffContext: getBuyOffContextData(),
  mPulseSiteConfig: selectMPulsePageConfig,
  isMPulseEnabled: selectIsMPulseEnabled,
  switchConfig: makeSelectSwitchConfig(['GuestViewer']),
  barCodeConfig: makeSelectThirdPartyConfig(['barcode']),
  PDFConfig: makeSelectThirdPartyConfig(['pdf']),
  globalSwitchConfig: makeSelectGlobalSwitchConfig(),
  interactiveCheckList: interactiveCheckListSelector(),
  akamaiData: makeAkamaiInfo(),
  isBarcodeEnabled: makeSelectBarcode(),
  dateSortedfirstCategoryList: makeSelectFirstCategoryDateSortedList(),
  dateSortedOosCategoryList: makeSelectOosCategoryDateSortedList(),
  errorStatus: getErrorStatus(),
  customerID: makeSelectCustomerId(),
  isItemsFetching: getItemsFetchingStatus(),
  isFetchingRemaining: getRemainingItemsFetchingStatus(),
  isSortedFetching: getSortedItemsFetchingStatus(),
  isOosFetching: getOosItemsFetchingStatus(),
  oosErrorStatus: getOosErrorStatus(),
  categoryErrorStatus: getCategoryErrorStatus(),
  siteId: selectSiteId(),
  formWrapperData: formWrapperSelector('emailForm'),
  customizationCodes: makeSelectSiteConfig('customizationCodes', {}),
  akamaiHeader: selectAkamaiHeader,
  isSocialAnnexReady: isSocialAnnexReady(),
  isFilterItemReady: isFilterItemReady(),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  findAStoreModal: makeSelectFindAStoreModal(),
  isQuickViewOpen: makeSelectIsQuickViewOpen(),
  header: makeHeaderState,
  sitespectCampaigns: makeSelectSitespectCampaigns(),
  displayDiscountedPriceKey: makeSelectSwitchConfig([
    REGISTRY_OWNER_STATE_KEY,
    DISPLAY_DISCOUNTED_PRICE_KEY,
  ]),
  storeDetails: storeDetailsSelector,
  landingZip: makeSelectLandingZip(),
  selectedCheckboxFilter: getSelectedCheckBoxFilter(),
  registryFacetsFilter: getFacetsData(),
  isPickupInStoreModalOpen: makeSelectIsPickupInStoreOpen(),
  isBopisFeatureEnable: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableBopisFeature',
  ]),
  selectedFilters: selectRegsitryFacetFilter(),
  itemRegistered: makeSelectFromFirstCategory('giftRegistered'),
  itemPurchased: makeSelectFromFirstCategory('giftPurchased'),
  tnGiftsPurchased: makeSelectFromFirstCategory('tnGiftsPurchased'),
  diaperFundEnabled: makeSelectFromFirstCategory('diaperFundEnabled', false),
  storedValueOptIn: makeSelectFromFirstCategory('storedValueOptIn', false),
  registryTypeName: makeSelectFromFirstCategory('registryTypeName', 'BRD'),
  contentStackSelectors: makeContentStackContents(),
  enableRegistryCollaboration: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistryCollaboration',
  ]),
  enableCashFund: makeSelectSwitchConfig(['RegistryOwner', 'enableCashFund']),
  cfSubmitAPIStatus: getCFSubmitAPIStatus(),
  regCashFundEventTypes: makeSelectSiteConfig(['registryCashFundEventTypes']),
  pageConfigRegistryOwner: makeSelectPageConfig(['RegistryOwner']),
});
GuestViewer.propTypes = propTypes;
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withRegistryOwnerSaga = injectMultipleSagas([
  {
    key: CONTENT_STACK_STATE_KEY,
    saga: contentStackSaga,
  },
  {
    key: CONTRIBUTE_CASH_FUND_STATE_KEY,
    saga: contributeCashFundSaga,
  },
]);
const withReducers = injectMultipleReducers([
  {
    key: COPY_SUCCESS_STATE_KEY,
    reducer: CopyRegistryReducer,
  },
  {
    key: BUYOFF_CONTEXT_STATE_KEY,
    reducer: BuyOffContextReducer,
  },
  {
    key: GIFT_GIVER_STATE_KEY,
    reducer: GiftGiverReducer,
  },
  {
    key: QUICK_VIEW_STATE_KEY,
    reducer: quikViewModalReducer,
  },
  {
    key: CONTENT_STACK_STATE_KEY,
    reducer: contentStackReducer,
  },
  {
    key: CONTRIBUTE_CASH_FUND_STATE_KEY,
    reducer: contributeCashFundReducer,
  },
]);
const withSaga = injectSaga({ key: GIFT_GIVER_STATE_KEY, saga });
export default compose(
  withReducers,
  withSaga,
  withConnect,
  withRegistryOwnerSaga,
  withSiteSpectTracker
)(toJS(GuestViewer));
