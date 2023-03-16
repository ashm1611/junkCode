import pathOr from 'lodash/fp/pathOr';
import isEqual from 'lodash/fp/isEqual';
import React, { Suspense } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Heading from '@bbb-app/core-ui/heading';
import { isEmpty } from 'lodash';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import {
  makeSelectSwitchConfig,
  makeSelectPageConfig,
  makeSelectSiteConfig,
  selectSiteId,
  selectDeviceConfig,
  selectMPulsePageConfig,
  selectIsMPulseEnabled,
  makeSelectGlobalSwitchConfig,
  makeSelectEndPoints,
  makeSelectLabels,
  makeSelectIsMobileScreen,
} from '@bbb-app/selectors/configSelector';
import {
  makeSelectIsLoggedIn,
  makeSelectProfile,
  makeTYMSignInModalLabels,
  makeSelectStoreId,
} from '@bbb-app/selectors/accountSelectors';
import {
  makeSelectActiveRegistry,
  interactiveCheckListSelector,
} from '@bbb-app/selectors/registrySelectors';
import { isStoreBopisEnabled } from '@bbb-app/utils/StoreInfoUtils';
import { isBrowser } from '@bbb-app/utils/common';
import { isPageSpecificRegeneration } from '@bbb-app/utils/mPulse';
import deferFunctionOnEvent from '@bbb-app/utils/deferOnEventUtil';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import toJS from '@bbb-app/hoc/toJS';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { tealiumObject } from '@bbb-app/tealium/globalSelectorsCta';
import allRegTypes from '@bbb-app/registry-type/registryTypes';
import { QUICK_VIEW_STATE_KEY } from '@bbb-app/constants/appConstants';
import { initiateInactivityModal as initiateRegistryInactivityModal } from '@bbb-app/actions/registryActions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import getStoreFromCookies from '@bbb-app/utils/getStoreFromCookies';
import { storeDetailsSelector } from '@bbb-app/redux/store-details/selectors';
import { updatePickupinStoreModal } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/actions';
import { saveLandingZip as setLandingZip } from '@bbb-app/pick-up-in-store/containers/ActionsWithSagaInjection';
import {
  anchorToItem,
  saveDataInSessionStorage,
} from '@bbb-app/utils/RegistryUtils';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { emptyStoreData as addToCartEmptyStoreData } from '@bbb-app/redux/add-to-cart/emptyStoreDataAction';
import { getNearestStoreFromApi } from '@bbb-app/redux/akamai/constants';
import { makeSelectEmailId } from '@bbb-app/account-signin/containers/commonSelectors';
import { fetchProfileData } from '@bbb-app/redux/profile-data/actions';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import { makeSelectIsSlideoutOverlayOpen } from '@bbb-app/selectors/appSelectors';
import { makeSelectIsPickupInStoreOpen } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/PickUpInStoreModalSelectors';
import RegistryOwnerLayout from '../../../../components/Pages/Registry/RegistryOwner/RegistryOwnerLayout';
import { getContextPath } from '../../../../containers/Search/selectors';
import { putActiveRegistryStaticFlag } from '../../../InteractiveChecklist/actionWithInjectReducer';
import { makeSelectIsFetching } from '../../../AddToRegistry/selectors';
import { resetVendorPriceDetails as resetVendorPriceDetailsAction } from '../../PDP/Personalization/actions';
import { replaceProductFromRegistry as replaceProductFromRegistryAction } from '../ReplaceProductFromRegistry/actions';
import {
  makeSelectCoRegistrantProfileStatus,
  makeSelectCoRegistrantProfileStatusError,
  makeSelectQueryString,
} from '../CreateRegistry/selectors';
import {
  resetFiltersAndSort,
  updateSelectedFilters,
} from '../RegistryFacetFilter/actions';
import { fetchTymData } from '../ThankYouManager/ActionsWithSagaInjection';
import {
  CONTENT_HEADING,
  CONTENT_SUB_HEADING,
  SEND_THANK_YOU_DESCRIPTION,
  SEND_THANK_YOU_HEADING,
} from '../ThankYouManager/constants';
import {
  fetchProfileStatus,
  resetProfileStatus,
} from './../CreateRegistry/actions';
import {
  getUpdatedCategoryData,
  initiateInactivityModal,
  removeRegistryItem,
  undoRemoveRegistryItem,
  setTrackFlag,
  setFacetData,
  updateBopisCheckBoxState,
  openRegistrantDetailModal,
} from './actions';
import { fetchRegistryOwnerItemsFirstCategory } from './RegistryOwnerItemSagaInjection';
import {
  updateFilterCount,
  closeOtherOpenModal,
  makeActiveRegistryCall,
  updateGiftData,
} from './RegistryDetailsSagaInjection';
import { markFavRegistryItem } from './MarkFavRegistryItemAction';
import {
  getFilterCount,
  getItemsFetchingStatus,
  getRemainingItemFetchingStatus,
  isFilterItemReady,
  makeAkamaiInfo,
  makeRouteData,
  makeSelectActiveRegistryCallFlag,
  makeSelectOwnerFirstCategoryError,
  makeSelectOwnerFirstCategoryList,
  makeSelectOwnerRemainingCategoryError,
  makeSelectSortedBy,
  makeSelectUpdatedSkuId,
  selectCloseModalFlag,
  selectIsItemDeleted,
  selectQuickItemAdded,
  getIsFromReplace,
  getIsPriceFetching,
  selectTrackFlag,
  getSelectedCheckBoxFilter,
  isRegistrantDetailModalOpen,
} from './selectors';
import {
  getRegistryData,
  getFetchingStatus,
  makeSelectSocialAnxWriteReview,
  getFacetData,
} from './commonSelectors';
import registryInputReducer from '../../Registry/CreateRegistry/reducer';
import coProfileSaga from '../../Registry/CreateRegistry/coProfileSagas';
import { REG_INPUTS_STATE_KEY } from '../../Registry/CreateRegistry/constants';
import {
  applyFilter,
  sortCategoryItems,
} from '../../../../components/Pages/Registry/utils/sortCategoryItems';
import { selectRegsitryFacetFilter } from '../RegistryFacetFilter/selectors';
import { enableAPreviewYourReg } from '../../../../components/abtests/PreviewYrRegistryExperiment/PreviewYrRegistryUtil';
import PickupInStoreModalWrapper from '../../../PickupInStoreModal/PickupInStoreModalWrapper.async';
import { makeSelectLandingZip } from '../../../Search/Filters/pickupStoreSelector';
import propTypes from './propTypes';
import quikViewModalReducer from '../../../QuickViewModal/combinedReducer';
import { makeSelectIsQuickViewOpen } from '../../../QuickViewModal/QuickViewModalSelectors';
import styles from '../../../../components/Pages/Registry/RegistryOwner/RegistryQuickAddComponent/RegistryQuickAddComponent.css';
import RegistryMyItem from '../../../../components/Pages/Registry/RegistryOwnerHome//RegistryMyItemZeroState/RegistryMyItemZeroState';
/**
 * Container for Registry Owner view
 * @param {Object} labels - labels required to render heading, bodytext and link.
 */
const RegistryQuickAdd = React.lazy(() =>
  import('./RegistryQuickAdd/RegistryQuickAdd')
);
export class RegistryOwner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.registrySummary = {};
    this.eventObject = [];
    this.favItems = [];
    this.lastValue = { key: '', filter: '' };
    this.state = {
      sortedData: [],
      repositoryId: null,
      registryId: pathOr(null, 'matchParamId', this.props),
      isAddingQuickAddItemToList: false,
      isRegistryContentSlotReq: true,
      appliedFilters: { selectedFilters: null, selectedCheckboxFilter: null },
    };
    this.updateSkuIdForAnchoring = this.updateSkuIdForAnchoring.bind(this);
    this.sortDataByDate = this.sortDataByDate.bind(this);
    const referredContent = props.labels.referredContent;
    this.contentIdArgs = [];
    /* istanbul ignore else  */
    if (referredContent) {
      referredContent.forEach(obj => {
        /* istanbul ignore else  */
        if (
          obj.key === CONTENT_HEADING ||
          obj.key === CONTENT_SUB_HEADING ||
          obj.key === SEND_THANK_YOU_HEADING ||
          obj.key === SEND_THANK_YOU_DESCRIPTION
        ) {
          this.contentIdArgs.push(obj.id);
        }
      });
    }
    this.mPulseMarksPopulated = false;
    this.setClassVariables(this.props);
    this.isPreviewYrReg = enableAPreviewYourReg();
  }
  componentWillMount = () => {
    /* Check if flag is set to 'browser' then only re initialize the marks */
    /* istanbul ignore else  */
    if (
      !this.props.getHeaderLayout &&
      isBrowser() &&
      isPageSpecificRegeneration()
    ) {
      /* istanbul ignore else  */
      if (this.props.isMPulseEnabled) {
        /* istanbul ignore else  */
        const PageSpecificMarks = pathOr(
          null,
          'mPulseSiteConfig.PageSpecificMarks',
          this.props
        );
        /* istanbul ignore else  */
        if (PageSpecificMarks) {
          if (
            window.instrumentation &&
            typeof window.instrumentation.setPageMarks === 'function'
          ) {
            window.instrumentation.setPageMarks({
              PageViewMarks: PageSpecificMarks,
            });
          }
        }
        if (
          window.instrumentation &&
          typeof window.instrumentation.removeConditionalMarksFlag ===
            'function'
        ) {
          window.instrumentation.removeConditionalMarksFlag(
            'ux-destination-verified',
            'ux-action-before-load'
          );
        }
      }
    }
  };
  componentDidMount() {
    this.updateFilterItems(
      this.props.registryOwnerFirstCategoryList,
      this.props
    );
    const { switchConfigGlobal } = this.props;
    const enableCSLabels = pathOr(false, 'enableCSLabels', switchConfigGlobal);
    if (enableCSLabels) {
      const referredContentIds = LabelsUtil.getReferredContentIds(this.labels);
      if (referredContentIds.length) {
        this.props.getContent(referredContentIds);
      }
    }
    // will fetch the store Id for handle store Id in hard spa
    const store = getStoreFromCookies();
    if (store && store.storeId) {
      this.storeId = store.storeId;
    } else if (getNearestStoreFromApi()) {
      this.storeId = pathOr(undefined, 'storeId', getNearestStoreFromApi());
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ nearestStoreApiResolved: true });
    }

    if (this.storeId) {
      // will handle if this.storeId is bopis unavailable store as we are deleting this.storeId(if store is non bopis store) prior to api call
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ nearestStoreApiResolved: true });
    }
    // will defer first category api call until nearest store api get complete
    deferFunctionOnEvent({
      deferOnPages: ['GuestViewer'],
      eventName: 'akamaiCallResolved',
      func: this.nearestStoreApiResolvedCall,
      pageIdentifier: 'GuestViewer',
      once: true,
    });
  }
  componentWillReceiveProps(nextProps) {
    const paramId = pathOr(null, 'matchParamId', nextProps);
    /**
     * Condition which allows for re-rendering of component when switching between registries with a
     * change in registry id in url. Else part of this condition makes an API call to re-fetch
     * registry data for new registry id - that call only happens when there is a change in registry id
     * in url.
     */
    if (this.state.registryId === paramId) {
      if (
        nextProps.profileData &&
        this.state.repositoryId !== nextProps.profileData.repositoryId
      ) {
        this.setState({ repositoryId: nextProps.profileData.repositoryId });
      }
      this.setClassVariables(nextProps);
    } else {
      this.setState({ registryId: paramId });
    }
    this.preparePageSpecificMPulseMarks(nextProps);
    if (
      nextProps.isAddToRegistryFetching &&
      !this.props.isAddToRegistryFetching
    ) {
      this.setState({ isAddingQuickAddItemToList: true });
    }
    const { registryOwnerFirstCategoryList: currentData } = this.props;
    const { registryOwnerFirstCategoryList: newData } = nextProps;
    // As Product successfully added to the add to Registry our fetching data api called there
    if (
      this.state.isAddingQuickAddItemToList &&
      !this.isAddToRegistryFetching &&
      this.isDataChanged(currentData, newData)
    ) {
      this.props.updateFilterItemCount(nextProps.selectedFilterOption);
      this.setState({ isAddingQuickAddItemToList: false });
    }
    if (!this.enableNewRegDashboard || !nextProps.isSlideoutOverlayOpen)
      this.updateFilterItems(newData, nextProps, currentData);

    const currentStoreId = pathOr(
      undefined,
      'storeDetails.storeId',
      this.props
    );
    const changedStore = pathOr(undefined, 'storeDetails', nextProps);
    const changedStoreId = changedStore && changedStore.storeId;

    this.bopisStoreChange(currentStoreId, changedStore, changedStoreId);

    /**
     * Condition If item added from MyItem tab need to re-fetch data again based on the selection sorting type
     * Condition based on the Time Stamp based
     */

    const ifBopisFeatureOn =
      this.props.isBopisFeatureEnable &&
      ((this.storeId && this.storeId !== this.lastStoreId) ||
        this.state.nearestStoreApiResolved ||
        (!isEqual(this.props.isStoreAvailable, nextProps.isStoreAvailable) &&
          nextProps.isStoreAvailable));
    if (this.props.quickItemAddedTS !== nextProps.quickItemAddedTS) {
      this.setState({ isAddingQuickAddItemToList: true });
      this.sortDataByDate(true);
    } else if (ifBopisFeatureOn) {
      this.lastStoreId = this.storeId;
      this.sortDataByDate(true);
      this.setState({ nearestStoreApiResolved: false });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.nearestStoreApiResolved) this.props.saveStoreInfo(true);
  }
  componentWillUnmount() {
    this.props.emptyStoreData();
    if (this.props.updateParam) this.props.updateParam();
  }
  setClassVariables = propObj => {
    const popularArray = pathOr(null, 'popular', allRegTypes);
    const otherArray = pathOr(null, 'other', allRegTypes);
    const eventType = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO.eventType',
      propObj
    );
    this.registrySummary = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO',
      propObj
    );
    if (eventType) {
      const categoryData = popularArray.concat(otherArray);
      this.eventObject = categoryData.filter(arr => {
        return arr.registryName.toLowerCase() === eventType.toLowerCase();
      });
    }
  };
  nearestStoreApiResolvedCall = () => {
    if (!this.storeId) {
      this.storeId = pathOr(undefined, 'storeId', getNearestStoreFromApi());
      this.setState({ nearestStoreApiResolved: true });
    }
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
  /**
   * will filter and sort the frist category items
   * @param {object} newData items data from api
   * @param nextProps
   */
  updateFilterItems = (newData, nextProps, currentData) => {
    if (
      !isEqual(currentData, newData) ||
      !isEqual(this.props.selectedFilters, nextProps.selectedFilters) ||
      !isEqual(
        this.props.selectedCheckboxFilter,
        nextProps.selectedCheckboxFilter
      ) ||
      !isEqual(
        this.props.isSlideoutOverlayOpen,
        nextProps.isSlideoutOverlayOpen
      ) ||
      (!this.state.filteredFirstCategoryItems && newData)
    ) {
      const isPriceSort = {
        lowtohigh: 'asc',
        hightolow: 'des',
      }[pathOr(null, 'selectedFilters.sort[0]', nextProps)];
      let firstCategoryList = pathOr([], '[0].registryItemList', newData);
      firstCategoryList = applyFilter(
        firstCategoryList,
        nextProps.selectedFilters,
        true, // registryOwner take care for Bopis Filter if apply
        nextProps.selectedCheckboxFilter
      );
      this.setState({
        appliedFilters: {
          selectedFilters: nextProps.selectedFilters,
          selectedCheckboxFilter: nextProps.selectedCheckboxFilter,
        },
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
      this.setState({
        filteredFirstCategoryItems: sortCategoryItems(
          firstCategoryList,
          isPriceSort
        ),
      });
    }
  };
  isDataChanged = (data, newData) => {
    return (
      JSON.stringify(pathOr([], '[0].registryItemList', data)) !==
      JSON.stringify(pathOr([], '[0].registryItemList', newData))
    );
  };
  preparePageSpecificMPulseMarks = nextProps => {
    if (
      this.props.isMPulseEnabled &&
      !this.props.getHeaderLayout &&
      !this.mPulseMarksPopulated &&
      this.props.isFetching &&
      !nextProps.isFetching
    ) {
      if (
        nextProps.registryOwnerFirstCategoryList &&
        nextProps.registryOwnerFirstCategoryList.length > 0 &&
        nextProps.registryOwnerFirstCategoryList[0].registryItemList &&
        nextProps.registryOwnerFirstCategoryList[0].registryItemList.length > 0
      ) {
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
        if (
          window.instrumentation &&
          typeof window.instrumentation.setPageMarks === 'function'
        ) {
          window.instrumentation.setPageMarks({
            PageViewMarks: PageSpecificMarks,
          });
        }
      }
      this.mPulseMarksPopulated = true;
    }
  };
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
  updateSkuIdForAnchoring(valueOrSkuId, anchoredSkuCategoryId) {
    saveDataInSessionStorage(`anchoredSkuId`, valueOrSkuId);
    saveDataInSessionStorage(`anchoredSkuCategoryId`, anchoredSkuCategoryId);
  }
  sortDataByDate(isDateSort, isRegReplace) {
    this.props.getRegistryOwnerFirstCategory(
      this.registrySummary && this.registrySummary.registryId,
      this.eventObject &&
        this.eventObject[0] &&
        this.eventObject[0].registryCode,
      this.registrySummary && this.registrySummary.eventDate,
      isDateSort,
      isRegReplace,
      undefined,
      {
        storeId: this.storeId,
        isBopisFeatureEnable: this.props.isBopisFeatureEnable,
      }
    );
  }
  /**
   * will call when bopis checkbox or inStockOnline checkbox change
   */
  handleBopisCheckboxChange = checkBoxType => {
    this.setState({ isFirstTimePageLoad: false });
    this.props.updateBopisCheckBoxState(
      checkBoxType === this.props.selectedCheckboxFilter
        ? undefined
        : checkBoxType
    );
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
    const { storeDetails, landingZip } = this.props;
    const zipInStore = !isEmpty(storeDetails) && `${storeDetails.postalCode}`;
    /* istanbul ignore else */
    if (!landingZip && zipInStore) {
      this.props.saveLandingZip(zipInStore);
    }
    this.props.onPickupInStoreButtonClick({ findAStoreModal: true });
  };
  renderHeadingIconNew = () => {
    this.itemCount = pathOr(
      0,
      'registryResVO.registrySummaryVO.giftRegistered',
      this.props.registryData
    );
    const heading = pathOr(
      'your items',
      'image_alt_text',
      this.props.moduleData
    );
    return (
      <div className="relative pl1">
        <Heading level={3} className={styles.pageHeadingNew}>
          {heading}
          {<span className={styles.countItem}> {this.itemCount} items</span>}
        </Heading>
      </div>
    );
  };
  rendermyItems = itemCount => {
    if (this.enableNewRegDashboard) {
      return itemCount > 0;
    }
    return true;
  };
  renderRegistryQuickAdd(fromquickadd) {
    const enableCSLabels = pathOr(
      false,
      'enableCSLabels',
      this.props.switchConfigGlobal
    );
    this.itemCount = pathOr(
      0,
      'registryData.registryResVO.registrySummaryVO.giftRegistered',
      this.props
    );
    const enableQuickAdd = pathOr(
      false,
      'enableQuickAdd',
      this.props.switchConfig
    );
    const regType = pathOr(
      null,
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      this.props.registryData
    );
    const REG_TYPE_LBL = {
      BRD: 'RM1001',
      BA1: 'RM1002',
    };
    const { BRD, BA1 } = REG_TYPE_LBL;
    const regValue = { BRD, BA1 };
    const quickAddId = regValue[regType];
    if (
      this.itemCount >= this.props.maxItemInRegToShowQuickAdd ||
      !quickAddId
    ) {
      return null;
    }
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <RegistryQuickAdd
            quickAddId={quickAddId}
            regType={regType}
            enableQuickAdd={enableQuickAdd}
            itemsArray={this.itemsArray}
            registryId={this.state.registryId}
            isAddingQuickAddItemToList={this.state.isAddingQuickAddItemToList}
            {...this.props}
            fromQuickAdd={fromquickadd}
            enableNewRegDashboard={this.enableNewRegDashboard}
            enableCSLabels={enableCSLabels}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }
  render() {
    const eventType = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO.eventType',
      this.props
    );
    const eventObj = this.eventObject;
    const { expandAll } = this.props.switchConfig;
    const isDiaperFundEnable = pathOr(
      false,
      'registryData.registryResVO.registrySummaryVO.diaperFundEnabled',
      this.props
    );
    const hasDiaperFund = pathOr(
      false,
      'registryOwnerFirstCategoryList[0].hasDiaperFund',
      this.props
    );
    const productsCount = pathOr(
      0,
      'registryOwnerFirstCategoryList[0].itemCount',
      this.props
    );
    this.enableNewRegDashboard = this.props.newReg;
    const itemCount = pathOr(
      0,
      'registryResVO.registrySummaryVO.giftRegistered',
      this.props.registryData
    );
    if (this.props.showExpertPicks) {
      return this.renderRegistryQuickAdd(true);
    }
    return (
      <React.Fragment>
        <ErrorBoundary>
          {!this.props.getHeaderLayout &&
          this.props.isMPulseEnabled &&
          typeof window === 'undefined'
            ? this.injectInstrumentationScript()
            : null}
          {itemCount === 0 && this.enableNewRegDashboard && (
            <RegistryMyItem
              itemsData={this.props.moduleData}
              getImageSrc={this.props.getImageSrc}
            />
          )}
          {this.enableNewRegDashboard &&
            itemCount > 0 &&
            this.renderHeadingIconNew()}
          {!this.enableNewRegDashboard && this.renderRegistryQuickAdd(true)}
          {this.rendermyItems(itemCount) && (
            <RegistryOwnerLayout
              {...this.props}
              isRegistryContentSlotReq={this.state.isRegistryContentSlotReq}
              registrySummary={this.registrySummary}
              filteredFirstCategoryItems={this.state.filteredFirstCategoryItems}
              eventObject={eventObj}
              eventType={eventType}
              sortDataByDate={this.sortDataByDate}
              itemsArray={this.itemsArray}
              selectedFilterOption={this.props.selectedFilters}
              registryId={this.state.registryId}
              contentIdArgs={this.contentIdArgs}
              handleChangePickupInStore={this.handleChangePickupInStore}
              handleBopisCheckboxChange={this.handleBopisCheckboxChange}
              bopisStoreDetail={this.state.bopisStoreDetail}
              config={this.props.makeReviewYourProductsConfig}
              eventTypeCode={eventObj.length !== 0 && eventObj[0].registryCode}
              anchorToItem={anchorToItem}
              updateSkuIdForAnchoring={this.updateSkuIdForAnchoring}
              handleTealiumEvent={this.props.fireTealiumAction}
              mPulseEnabled={this.props.isMPulseEnabled}
              expandAll={expandAll}
              isPreviewYrReg={this.isPreviewYrReg}
              hasDiaperFund={hasDiaperFund}
              isDiaperFundEnable={isDiaperFundEnable}
              productsCount={productsCount}
              enableNewRegDashboard={this.enableNewRegDashboard}
              appliedFilters={this.state.appliedFilters}
            />
          )}
          {this.props.isPickupInStoreModalOpen && (
            <PickupInStoreModalWrapper
              showSearchFlag
              registryId={this.state.registryId}
              findAStoreModal
              changeStore
              fromRegistry
            />
          )}
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}
export const mapDispatchToProps = dispatch => {
  return {
    getProfileData: customerId => {
      dispatch(fetchProfileData(customerId));
    },
    onResetFiltersAndSort: () => dispatch(resetFiltersAndSort()),
    updateGiftData: (updateGiftRegistered, updateGiftPurchased) => {
      dispatch(updateGiftData(updateGiftRegistered, updateGiftPurchased));
    },
    updateFilterCount: filterCount => {
      dispatch(updateFilterCount(filterCount));
    },
    removeRegistryItem: (productInfo, productData, updatedSkuId) => {
      dispatch(removeRegistryItem(productInfo, productData, updatedSkuId));
    },
    undoRemoveRegistryItem: (productInfo, productData, updatedSkuId) => {
      dispatch(undoRemoveRegistryItem(productInfo, productData, updatedSkuId));
    },
    markFavRegistryItem: (productInfo, productData, updatedSkuId) => {
      dispatch(markFavRegistryItem(productInfo, productData, updatedSkuId));
    },
    fetchCoRegistrantProfileStatus: (email, showLoader) => {
      dispatch(initiateRegistryInactivityModal(true));
      dispatch(fetchProfileStatus(email, showLoader));
    },
    updatePickupinStoreModal: args => {
      dispatch(updatePickupinStoreModal(args));
    },
    resetCoRegistrantProfileStatus: () => {
      dispatch(resetProfileStatus());
    },
    getRegistryOwnerFirstCategory: (
      registryId,
      eventTypeCode,
      eventDate,
      isDateSort,
      isRegReplace,
      printView,
      params
    ) => {
      dispatch(
        fetchRegistryOwnerItemsFirstCategory(
          registryId,
          eventTypeCode,
          eventDate,
          isDateSort,
          isRegReplace,
          printView,
          params
        )
      );
    },
    getThankYouList(registryId, contentIdArgs) {
      // getting thank you list with default sort value Date Purchased (new-old)
      dispatch(fetchTymData(registryId, contentIdArgs, '1', '1'));
    },
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    updateInteractiveCheckList: args => {
      dispatch(putActiveRegistryStaticFlag(args));
    },
    closeOtherOpenModaOnInactiveModal(bool) {
      dispatch(closeOtherOpenModal(bool));
    },
    initiateInactivityModal: inactivityModalState => {
      dispatch(initiateInactivityModal(inactivityModalState));
    },
    makeActiveRegistryCall: () => {
      dispatch(makeActiveRegistryCall());
    },
    onProductTileClick: (isModalOpen, data) => {
      dispatch(openRegistrantDetailModal(isModalOpen, data));
    },
    emptyStoreData: () => {
      dispatch(addToCartEmptyStoreData());
      dispatch(resetVendorPriceDetailsAction());
    },
    getUpdatedCategoryData: (productObj, updatedSkuId) =>
      dispatch(getUpdatedCategoryData(productObj, updatedSkuId)),
    setTrackFlag: value => dispatch(setTrackFlag(value)),
    setFacetData: data => dispatch(setFacetData(data)),
    updateBopisCheckBoxState: payload =>
      dispatch(updateBopisCheckBoxState(payload)),
    onPickupInStoreButtonClick(args) {
      dispatch(updatePickupinStoreModal(args));
    },
    saveLandingZip(zip) {
      dispatch(setLandingZip(zip));
    },
    replaceProductFromRegistry(payload) {
      dispatch(replaceProductFromRegistryAction(payload));
    },
    updateSelectedFilters(payload) {
      dispatch(updateSelectedFilters(payload));
    },
    getContent(contentIdCollection) {
      dispatch(fetchReferredContent(contentIdCollection));
    },
  };
};
export const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobileScreen,
  labels: makeSelectLabels(['Registry']),
  registryData: getRegistryData(),
  isFetching: getFetchingStatus(),
  isItemsFetching: getItemsFetchingStatus(),
  endPoints: makeSelectEndPoints(),
  isLoggedIn: makeSelectIsLoggedIn(),
  emailId: makeSelectEmailId(),
  coRegProfileStatus: makeSelectCoRegistrantProfileStatus(),
  coRegProfileStatusError: makeSelectCoRegistrantProfileStatusError(),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  dynamicContentState: makeSelectContent(),
  makeReviewYourProductsConfig: makeSelectSocialAnxWriteReview(),
  bookAppointment: makeSelectGlobalSwitchConfig(['enableBookAppointment']),
  liveChat: makeSelectGlobalSwitchConfig(['enableLiveChat']),
  profileData: makeSelectProfile(),
  contextPath: getContextPath,
  location: makeSelectQueryString(),
  registryOwnerFirstCategoryList: makeSelectOwnerFirstCategoryList(),
  registryOnwerFirstCategoryError: makeSelectOwnerFirstCategoryError(),
  showOpenCount: makeSelectSiteConfig(
    ['registry', 'registryOwnerLayout', 'showOpenCount'],
    1
  ),
  enableKatori: makeSelectSwitchConfig(['PDP', 'enableKatori']),
  enableRegistryQuiz: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistryQuiz',
  ]),
  variation: makeSelectSortedBy(),
  registrySiteConfig: makeSelectSiteConfig(['registry']),
  deviceConfig: selectDeviceConfig,
  globalSwitchConfig: makeSelectGlobalSwitchConfig(),
  activeRegistry: makeSelectActiveRegistry(),
  switchConfigGlobal: makeSelectGlobalSwitchConfig(),
  switchConfig: makeSelectSwitchConfig(['RegistryOwner']),
  mPulseSiteConfig: selectMPulsePageConfig,
  isMPulseEnabled: selectIsMPulseEnabled,
  interactiveCheckList: interactiveCheckListSelector(),
  akamaiData: makeAkamaiInfo(),
  closeModalFlag: selectCloseModalFlag(),
  favoriteStore: makeSelectStoreId(),
  isRemainingItemFetching: getRemainingItemFetchingStatus(),
  remainingCategoryError: makeSelectOwnerRemainingCategoryError(),
  formWrapperData: formWrapperSelector('emailForm'),
  activeRegistryCallFlag: makeSelectActiveRegistryCallFlag(),
  siteId: selectSiteId(),
  isPickupInStoreModalOpen: makeSelectIsPickupInStoreOpen(),
  tealiumObject: tealiumObject(),
  loginLabels: makeTYMSignInModalLabels(),
  filteredItemsCount: getFilterCount(),
  routeData: makeRouteData(),
  customizationCodes: makeSelectSiteConfig('customizationCodes', {}),
  isFilterItemReady: isFilterItemReady(),
  updatedSkuId: makeSelectUpdatedSkuId(),
  isItemDeleted: selectIsItemDeleted(),
  maxItemInRegToShowQuickAdd: makeSelectPageConfig([
    'RegistryOwner',
    'maxItemInRegToShowQuickAdd',
  ]),
  quickItemAddedTS: selectQuickItemAdded(),
  isAddToRegistryFetching: makeSelectIsFetching(),
  isFromReplace: getIsFromReplace(),
  isPriceItemFetching: getIsPriceFetching(),
  trackFlag: selectTrackFlag(),
  selectedFilters: selectRegsitryFacetFilter(),
  registryFacetsFilter: getFacetData(),
  isBopisFeatureEnable: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistrantBopis',
  ]),
  selectedCheckboxFilter: getSelectedCheckBoxFilter(),
  isSlideoutOverlayOpen: makeSelectIsSlideoutOverlayOpen(),
  storeDetails: storeDetailsSelector,
  landingZip: makeSelectLandingZip(),
  isRegistrantDetailModalOpen: isRegistrantDetailModalOpen(),
  isQuickViewOpen: makeSelectIsQuickViewOpen(),
  newReg: makeSelectSwitchConfig(['RegistryOwner', 'enableNewRegDashboard']),
});
RegistryOwner.propTypes = propTypes;
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withCoProfileSagSaga = injectSaga({
  key: 'CO_PROFILE_SAGA',
  saga: coProfileSaga,
});
const withQuickViewModalReducer = injectReducer({
  key: QUICK_VIEW_STATE_KEY,
  reducer: quikViewModalReducer,
});
const withRegistryInputReducer = injectReducer({
  key: REG_INPUTS_STATE_KEY,
  reducer: registryInputReducer,
});
export default compose(
  withCoProfileSagSaga,
  withRegistryInputReducer,
  withQuickViewModalReducer,
  withConnect,
  withSiteSpectTracker
)(toJS(RegistryOwner));
