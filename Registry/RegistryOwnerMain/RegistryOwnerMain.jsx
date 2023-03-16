/* eslint max-lines: ["error", 1716]*/
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty, isEqual, debounce } from 'lodash';
import qs from 'qs';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectPageConfig,
  selectMPulsePageConfig,
  selectIsMPulseEnabled,
  makeSelectSwitchConfig,
  makeSelectIsMobileScreen,
  makeSelectLabels,
  makeSelectGlobalSwitchConfig,
  makeSelectSiteConfig,
  makeSelectThirdPartyConfig,
} from '@bbb-app/selectors/configSelector';
import { makeContentStackContents } from '@bbb-app/redux/content-stack/selectors';
import contentStackReducer from '@bbb-app/redux/content-stack/reducer';
import { CAPTCHA_ERROR_MESSAGE } from '@bbb-app/account-signin/containers/constants';
import { fetchContentStack } from '@bbb-app/redux/content-stack/actions';
import { CONTENT_STACK_STATE_KEY } from '@bbb-app/redux/content-stack/constants';
import contentStackSaga from '@bbb-app/redux/content-stack/sagas';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import isTbs from '@bbb-app/utils/isTbs';
import toJS from '@bbb-app/hoc/toJS';
import Notification from '@bbb-app/core-ui/notification/Notification';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import isBrowser from '@bbb-app/utils/isBrowser';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import {
  makeSelectIsLoggedIn,
  makeSelectProfile,
  makeTYMSignInModalLabels,
  makeSelectRegistryList,
  makeSelectCustomerId,
} from '@bbb-app/selectors/accountSelectors';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import AuthValidator from '@bbb-app/hoc/AuthValidator';
import allRegTypes from '@bbb-app/registry-type/registryTypes';
import {
  makeSelectActiveRegistry,
  interactiveCheckListSelector,
} from '@bbb-app/selectors/registrySelectors';
import { MYFUNDS_STATE_KEY } from '@bbb-app/constants/state-keys/accountStateKeys';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { subscribe } from '@bbb-app/utils/pubsub';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import {
  makeSelectRegistryListFetched,
  makeSelectsyncAccessDenied,
  makeShowCheckList,
} from '@bbb-app/get-registry-details/containers/selectors';
import MarketingBanner from '@bbb-app/marketing-banner/components/MarketingBanner.async';
import injectMultipleReducers from '@bbb-app/hoc/injectMultipleReducers';
import injectMultipleSagas from '@bbb-app/hoc/injectMultipleSagas';
import { getSiteId } from '@bbb-app/utils/common';
import { updatePickupinStoreModal } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/actions';
import {
  anchorToItem,
  getDataFromSessionStorage,
} from '@bbb-app/utils/RegistryUtils';
import { setCheckListICLayout } from '@bbb-app/get-registry-details/containers/actions';
import { makeSelectEmailId } from '@bbb-app/account-signin/containers/commonSelectors';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import Image from '@bbb-app/core-ui/image';
import GridX from '@bbb-app/core-ui/grid-x';
import Cell from '@bbb-app/core-ui/cell';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import { getCookie } from '@bbb-app/utils/universalCookie';
import { LocalStorageUtil } from '@bbb-app/utils/localStorage';
import { ROUTE_REGISTRY_OWNER_HOME } from '@bbb-app/constants/route/route';
import Dashboard from '../../../../components/Pages/Registry/Dashboard';
import Tab from '../../../../components/Pages/Registry/Tab';
import Skeleton from './Skeleton/Skeleton.async';
import NewDashboardSkeleton from './NewDashboardSkeleton.async';
import InactivityModal from '../../../../containers/Pages/Registry/InactivityModal/InactivityModal';
import {
  makeSelectOwnerFirstCategoryList,
  makeRouteData,
  makeSelectInactivityModalReset,
  makeSelectActiveRegistryCallFlag,
  isSocialAnnexReady,
  selectIsItemDeleted,
  getItemsFetchingStatus,
  getRemainingItemFetchingStatus,
  makeSelectSortedBy,
  makeSelectCartDataIsFetching,
  makeRfTrackerVisibilityStatus,
  selectQuickItemAdded,
  selectMyFundsDetailsData,
} from '../RegistryOwner/selectors';
import {
  getRegistryData,
  getFetchingStatus,
  getErrorStatus,
  makeSelectSocialAnxWriteReview,
} from '../RegistryOwner/commonSelectors';
import {
  clearRegistryResponse,
  fetchProfileStatus,
} from '../CreateRegistry/actionsWithSagaInjection';
import {
  getcreateRegistryModalPopUpStatus,
  getScrollPositionForQuiz,
  getTakeOurQuizStatus,
  getScrollPositionForSkip,
} from '../CreateRegistry/selectors';
import {
  QUERY_PARAM_SORT,
  DISCONTINUED,
  MY_FUND_GIFT_TOOLTIP_LINK,
  TEALIUM_QUIZ_START_PAGE_NAME,
  TEALIUM_QUIZ_NAME,
  TEALIUM_QUIZ_REGISTRY,
} from '../RegistryOwner/constants';
import {
  fetchRegistryData,
  updateFilterCount,
  makeActiveRegistryCall,
  closeOtherOpenModal,
  updateGroupGiftOptInInfo,
} from '../RegistryOwner/RegistryDetailsSagaInjection';
import { initiateInactivityModal } from '../RegistryOwner/actions';
import {
  fetchRegistryOwnerItemsFirstCategory,
  resetIsItemsFetchingStatus,
} from '../RegistryOwner/RegistryOwnerItemSagaInjection';
import { fetchTymData } from '../ThankYouManager/ActionsWithSagaInjection';
import { putActiveRegistry } from '../../../InteractiveChecklist/actionWithInjectSaga';
import { returnFilteredItemsCount } from './../RegistryUtils';
import {
  CONTENT_HEADING,
  CONTENT_SUB_HEADING,
  SEND_THANK_YOU_HEADING,
  SEND_THANK_YOU_DESCRIPTION,
} from '../ThankYouManager/constants';
import { enableAPreviewYourReg } from '../../../../components/abtests/PreviewYrRegistryExperiment/PreviewYrRegistryUtil';
import { makeSelectDeactivatedRegId } from '../DeactivateRegistryModal/selectors';
import { clearDeactivatedRegId } from '../DeactivateRegistryModal/actions';
import { accountMyFundsReducer } from '../../../Pages/AccountMyFunds/reducer';
import { AccountMyFundsSaga } from '../../../Pages/AccountMyFunds/sagas';
import { fetchMyFunds } from '../../../Pages/AccountMyFunds/actions';
import RegistryUsabilitySurvey from '../../../../components/Pages/Registry/RegistryUsabilitySurvey/RegistryUsabilitySurvey.async';
import DFRegistration from '../../../../components/Pages/Registry/ContentSlot/DFRegistration.async';
import CashFunds from '../CashFunds/CashFunds.async';
import { makeSelectIsFetching as makeSelectItemFetching } from '../../../AddToRegistry/selectors';
import { REG_INPUTS_STATE_KEY } from '../CreateRegistry/constants';
import registryInputReducer from '../CreateRegistry/reducer';
import {
  clearCreateRegistry,
  clearQuizModal,
  setScroll,
} from '../CreateRegistry/actions';
import RegistryCollaborationModal from '../../../../components/Pages/Registry/RegistryOwner/RegistryCollaborationModal/RegistryCollaborationModal.async';
import {
  enableCollaboration,
  disableCollaboration,
} from '../../../../containers/InteractiveChecklist/actions';
import {
  fetchQuizPersona,
  resetQuizPersona,
  setQuizPersona,
  setQuizFromRecommendation,
} from '../RegistryOwnerHome/Quiz/actions';
import { QuizReducer } from '../RegistryOwnerHome/Quiz/reducer';
import { QuizPersona } from '../RegistryOwnerHome/Quiz/sagas';
import {
  FETCH_QUIZ_PERSONA,
  SURVEY_HEADING_LBL,
} from '../RegistryOwnerHome/constants';
import {
  ACCESS_DENIED_LBL,
  ACCESS_DENIED_ERROR_MESSAGE_LBL,
} from '../constants';
import { VIEW_ALL_TBS_LBL, VIEW_ALL_LBL } from './constants';
import {
  getRegistryId,
  getPersonaType,
  getQuickPickId,
  getQuizCompleted,
  getFromRecommendation,
  getQuizIsQuizFetching,
  getErrorMessage,
} from '../RegistryOwnerHome/Quiz/selectors';
import QuizComponent from '../../../../components/Pages/Registry/RegistryOwnerHome/RegistryQuiz/QuicComponent.async';
import QuizQnAComponent from '../../../../components/Pages/Registry/RegistryOwnerHome/RegistryQuiz/QuizQnAComponent.async';
import {
  INVITE_FRIEND_COLLABORATION_MODAL_MESSAGE_LBL,
  INVITE_FRIEND_COLLABORATION_MODAL_TITLE_LBL,
  INVITE_FRIEND_MODAL_EMAIL_LBL,
  INVITE_FRIEND_MODAL_BTN_TEXT_LBL,
  INVITE_MORE_FRIEND_LBL,
  INVITE_FRIEND_EMAIL_SENT_RESPONSE_LBL,
  INVITE_FRIEND_ERROR_MSG_LBL,
  INVITE_FRIEND_SENT_MODAL_TITLE_LBL,
  RECOMMENDER_LANDING_PAGE_URL_LBL,
} from '../../../../components/Pages/Registry/constants';
import styles from '../../../../components/Pages/Registry/RegistryOwnerHome/RegistryQuiz/QuizStyle.css';
import inviteFriendTealiumInfo from '../../../../components/Pages/Registry/SocialRecommendation/SocialRecommendationInviteModal/inviteFriendTealiumInfo';
import RegistryOwnerTealiumHandler from '../../../ThirdParty/Tealium/Registry/RegistryOwnerTealiumHandler/RegistryOwnerTealiumHandler.async';
// eslint-disable-next-line no-underscore-dangle
let ref;
export const RouteWithSubRoutes = otherProps => {
  const { route } = otherProps;
  return (
    <Route
      path={route.path}
      render={props => {
        const matchParamId = pathOr('', 'match.params.id', props);
        const matchPath = pathOr('', 'match.path', props);
        const { stateObj = {}, ...componentProps } = otherProps;
        // pass the sub-routes down to keep nesting
        return (
          <route.component
            matchParamId={matchParamId}
            matchPath={matchPath}
            filter={stateObj.filter}
            isFiltered={stateObj.isFiltered}
            selectedFilterOption={stateObj.selectedFilterOption}
            {...componentProps}
            route={route}
          />
        );
      }}
    />
  );
};
export class RegistryOwnerMain extends React.PureComponent {
  constructor(props) {
    super(props);
    const registryId = this.findRegIdFromUrl(this.props.location.pathname);
    this.state = {
      registryId,
      filter: '',
      filteredItemsCount: 0,
      isFiltered: false,
      selectedFilterOption: 'View All',
      accessDenied: false,
      syncAccessDenied: false,
      openEditRegistryModal: false,
      discontinuedItemCount: 0,
      showChecklist: null,
      startQuiz: false,
      modalMounteState: true,
      enableRegistryCollaborationModal: false,
      selectedCDP: '',
      cashfundsModalState: false,
    };
    ref = this;
    this.hasScrolled = false;
    this.allItemsFetched = false;
    this.hasFirstCategoryCallFired = false;
    this.registrySummary = {};
    this.eventObject = [];
    this.referredContentArray = LabelsUtil.getReferredContentIdCollection(
      this.props.labels,
      ['registryDetails', 'createRegistry', 'RBYR'],
      this.props.dynamicContentState
    );
    const id = this.getRefContentId(
      this.props.labels,
      'RegOwnerMarketingBanner'
    );
    if (id) {
      this.referredContentArray = this.referredContentArray || [];
      if (this.referredContentArray instanceof Array) {
        this.referredContentArray.push(id);
      }
    }
    this.isPreviewYrReg = enableAPreviewYourReg();
    this.changeFilter = this.changeFilter.bind(this);
    this.renderLayout = this.renderLayout.bind(this);
    this.updateFilterItemCount = this.updateFilterItemCount.bind(this);
    this.renderGlobalNotification = this.renderGlobalNotification.bind(this);
    this.setEditRegistryModalStateFlag = this.setEditRegistryModalStateFlag.bind(
      this
    );
    this.handleUrlSelection = this.handleUrlSelection.bind(this);
    this.returnDiscontinuedCountAndSSTracking = this.returnDiscontinuedCountAndSSTracking.bind(
      this
    );
    this.pathMatcher = this.pathMatcher.bind(this);
    this.discontinuedItemCountValue = this.discontinuedItemCountValue.bind(
      this
    );
    this.setStateDiscountinuedItemCount = this.setStateDiscountinuedItemCount.bind(
      this
    );
    this.handleThankYouListOnInactivity = this.handleThankYouListOnInactivity.bind(
      this
    );
    this.saveStoreInfo = this.saveStoreInfo.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.registryId = props.match.params.id;
    const referredContent = props.labels.referredContent;
    this.contentIdArgs = [];
    this.isInternationalUser = isInternationalUser();
    this.setQuizOpenStatus = this.setQuizOpenStatus.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.quizCompletedCallBack = this.quizCompletedCallBack.bind(this);
    this.handleTabClickCallback = this.handleTabClickCallback.bind(this);
    this.fireTealiumQuiz = this.fireTealiumQuiz.bind(this);
    if (referredContent) {
      referredContent.forEach(obj => {
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
    this.localStorage = new LocalStorageUtil(isBrowser());
    this.siteId = getSiteId();
  }
  componentWillMount = () => {
    const mPulseEnabled = this.props.isMPulseEnabled;
    /* Check if flag is set to 'browser' then only re initialize the marks */
    if (mPulseEnabled && isBrowser()) {
      /* istanbul ignore if */
      if (window && window.instrumentation) {
        const PageSpecificMarks = pathOr(
          null,
          'mPulseSiteConfig.PageSpecificMarks',
          this.props
        );
        if (PageSpecificMarks) {
          window.instrumentation.setPageMarks({
            PageViewMarks: PageSpecificMarks,
          });
        }
        window.instrumentation.removeConditionalMarksFlag(
          'ux-destination-verified',
          'ux-action-before-load'
        );
      }
    }
  };
  componentDidMount() {
    const locationSearch = pathOr('', 'search', this.props.location);
    const isOpenCashFund = pathOr(
      '',
      'previousLocationBeforeTransitions.location.hash',
      this.props.routeData
    ).includes('cashfund');
    if (isOpenCashFund) {
      this.props.history.push({
        hash: 'cashfund',
      });
    }
    const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    if (
      (query.editRegistry === 'true' || query.showEditPopUp === 'true') &&
      !this.state.openEditRegistryModal
    ) {
      this.setEditRegistryModalStateFlag(true);
    }
    this.props.onComponentMount(
      this.state.registryId,
      false,
      this.referredContentArray
    );
    this.handleUrlSelection();
    if (
      !this.hasScrolled &&
      !this.props.isItemsFetching &&
      !this.props.isRemainingItemFetching
    ) {
      /* istanbul ignore next */
      setTimeoutCustom(() => anchorToItem(query, false), 200);
      this.hasScrolled = true;
    }
    if (this.props.myFundsData === null)
      this.props.getMyFundsData(
        'session',
        false,
        this.props.enableSVPermanentValue,
        true
      );
    // eslint-disable-next-line react/no-did-mount-set-state
    if (!isEmpty(this.props.activeRegistry)) {
      const wedType = this.props.activeRegistry.eventType === 'Wedding';
      this.localStorage.saveItem(
        'reg_type_form_data',
        wedType ? 'WeddingNew' : ''
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isBopisFeatureEnable, registryListFetched } = nextProps;
    const popularArray = pathOr(null, 'popular', allRegTypes);
    const otherArray = pathOr(null, 'other', allRegTypes);
    const eventType = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO.eventType',
      nextProps
    );
    const showChecklist = pathOr(
      null,
      'activeRegistry.showChecklist',
      nextProps
    );
    this.checkForCheckList(showChecklist);
    const newRegistryId = this.findRegIdFromUrl(nextProps.location.pathname);
    const locationSearch = pathOr('', 'search', nextProps.location);
    const isCashFundClicked =
      pathOr('', 'hash', nextProps.location) === '#cashfund';
    if (isCashFundClicked) this.setState({ cashfundsModalState: true });
    if (nextProps.showTakeOurQuiz !== this.props.showTakeOurQuiz) {
      this.setState({
        startQuiz: nextProps.showTakeOurQuiz,
        modalMounteState: this.props.isMobile,
      });
    }
    if (
      !isEmpty(nextProps.activeRegistry) &&
      nextProps.activeRegistry.personaName !== null &&
      nextProps.activeRegistry.registryId === newRegistryId &&
      newRegistryId !== this.props.quizRegistryId
    ) {
      const data = {
        quickPickid: nextProps.activeRegistry.quickPickId,
        personaType: nextProps.activeRegistry.personaName,
        registryId: nextProps.activeRegistry.registryId,
      };
      this.props.setQuizPersona(data);
    }
    if (
      !isEmpty(nextProps.activeRegistry) &&
      this.props.activeRegistry.registryId !==
        nextProps.activeRegistry.registryId
    ) {
      this.props.setShowChecklist(showChecklist);
    }
    if (this.state.registryId === newRegistryId) {
      const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
      query.sorting = QUERY_PARAM_SORT.DATE;
      if (eventType && (popularArray || otherArray)) {
        const registryData = [...popularArray, ...otherArray];
        this.registrySummary = pathOr(
          null,
          'registryData.registryResVO.registrySummaryVO',
          nextProps
        );
        this.eventObject = registryData.filter(arr => {
          return arr.registryName.toLowerCase() === eventType.toLowerCase();
        });
        if (
          this.callFirstCategory(nextProps) &&
          !(
            isBopisFeatureEnable &&
            nextProps.location.pathname.includes(
              'store/giftRegistry/viewRegistryOwner/myItems'
            )
          )
        ) {
          this.getFirstCategory(query);
        }
      }
    } else {
      this.props.onComponentMount(
        newRegistryId,
        false,
        this.referredContentArray
      );
      this.hasFirstCategoryCallFired = false;
      this.setState({ registryId: newRegistryId });
    }
    if (this.props.registrylist && registryListFetched) {
      const registryIdlist = nextProps.registrylist
        ? nextProps.registrylist.map(item => item.registryId)
        : [];
      this.setState({
        accessDenied: !registryIdlist.includes(this.state.registryId),
        syncAccessDenied: this.props.syncAccessDenied,
      });
    }
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ fireTealiumMyItems: false });
      this.setState({ accessDenied: false });
    }
    this.checkForAllItemsFetched(nextProps);
    this.returnDiscontinuedCountAndSSTracking(nextProps);
  }
  componentDidUpdate(prevProps) {
    const prevLocation = pathOr('', 'search', prevProps.location);
    const prevQuery = qs.parse(prevLocation, { ignoreQueryPrefix: true });
    const locationSearch = pathOr('', 'search', this.props.location);
    const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    if (
      !isEqual(prevQuery, query) &&
      (query.editRegistry === 'true' || query.showEditPopUp === 'true') &&
      !this.state.openEditRegistryModal
    ) {
      this.setEditRegistryModalStateFlag(true);
    }
    /** If product tiles get rendered on the page and we receive a skuAdded as a query parameter then the anchorToItem * function is called. */
    if (
      isBrowser() &&
      !window.location.href.includes('sorting=3') === true &&
      this.allItemsFetched &&
      !this.hasScrolled &&
      (query.skuAdded || pathOr('', 'skuAdded', this.queryParams))
    ) {
      /* istanbul ignore next */
      setTimeoutCustom(
        () => anchorToItem(this.fromReplace ? this.queryParams : query, false),
        1000
      );
      this.hasScrolled = true;
    }
    const anchoredSkuId = getDataFromSessionStorage('anchoredSkuId');
    const isBackButtonPressed = getDataFromSessionStorage(
      'isBackButtonPressed'
    );
    /* istanbul ignore next */
    if (
      !this.props.isItemsFetching &&
      !this.props.isRemainingItemFetching &&
      anchoredSkuId &&
      isBackButtonPressed
    ) {
      const queryObj = {};
      queryObj.skuAdded = anchoredSkuId;
      setTimeoutCustom(() => anchorToItem(queryObj), 200);
    }
  }
  componentWillUnmount() {
    this.props.resetIsItemsFetchingStatus();
    this.props.clearCreateRegistry();
    this.props.resetQuizPersona();
  }
  onModalClose = () => {
    this.setState({
      loginModalVisibility: false,
    });
  };
  getFirstCategory(query) {
    this.hasFirstCategoryCallFired = true;
    this.props.getRegistryOwnerFirstCategory(
      this.state.registryId,
      this.eventObject[0].registryCode,
      this.registrySummary.eventDate,
      query.sorting === QUERY_PARAM_SORT.DATE
    );
    this.resetFilter();
  }
  setQuizOpenStatus(scroll, renderHome) {
    if (!this.props.quizCompleted) {
      this.props.resetQuizPersona();
    }
    if (this.props.isMobile) {
      this.setState({ modalMounteState: false }, () => {
        window.scrollTo(0, 0);
      });
    }
    if (!scroll) {
      this.props.setQuizFromRecommendation();
    }
    debounce(() => window.scrollTo(0, this.props.scrollPositionForQuiz), 0)();
    this.props.clearCreateRegistry();
    if (renderHome) {
      this.props.redirectTo(
        ROUTE_REGISTRY_OWNER_HOME.replace(':id?', this.state.registryId)
      );
    }
  }
  getRegistryOwnerComponent() {
    const pathname = pathOr('', 'pathname', location);
    const siteId = this.siteId;
    const registryType = pathOr('', 'eventType', this.props.activeRegistry);
    const isBabySite = siteId.includes('BuyBuyBaby') && registryType === 'Baby';
    if (this.state.accessDenied) {
      return this.renderGlobalNotification();
    } else if (
      this.props.enableRegistryQuiz &&
      isBabySite &&
      this.props.isRegistryCreated &&
      !this.props.isNewCreateRegForm
    ) {
      return this.renderQuizLayout();
    } else if (
      this.props.enableRegistryQuiz &&
      isBabySite &&
      this.props.isRegistryCreated &&
      this.props.isNewCreateRegForm &&
      (pathname.indexOf('/recommendation') !== -1 ||
        this.props.routeData.previousPageIdentifier !== 'createRegistry')
    ) {
      return this.renderQuizLayout();
    } else if (
      this.state.enableRegistryCollaborationModal &&
      !this.props.isMobile
    ) {
      return this.renderRegistryCollaborationModal(siteId);
    }
    return (
      <React.Fragment>
        {this.props.isMobile &&
          this.state.enableRegistryCollaborationModal &&
          this.renderRegistryCollaborationModal(siteId)}
        {this.renderLayout()}
      </React.Fragment>
    );
  }
  getRefContentId = (labelState, key) => {
    let id;
    const referredContent = pathOr(null, 'referredContent', labelState);
    if (!referredContent || !key) return id;
    if (referredContent instanceof Array && referredContent.forEach) {
      referredContent.forEach(obj => {
        if (obj.key === key) id = obj.id;
      });
    }
    return id;
  };
  /** * Function to setState for discountinued item */
  setStateDiscountinuedItemCount(itemsArr) {
    this.setState({
      discontinuedItemCount: returnFilteredItemsCount(itemsArr, DISCONTINUED),
    });
  }
  setEditRegistryModalStateFlag = value => {
    this.setState({ openEditRegistryModal: value });
  };
  getRefContent = (referredContent, id) => {
    const content = pathOr(null, 'content', referredContent);
    if (!content || !id) {
      return undefined;
    }
    return content[id];
  };
  checkForCheckList = showChecklist => {
    if (this.state.enableRegistryCollaborationModal)
      this.props.enableCollaboration();
    else if (showChecklist) this.props.disableCollaboration();
  };
  closeRegistryCollaborationModal = () => {
    this.setState({ enableRegistryCollaborationModal: false });
    this.props.disableCollaboration();
    debounce(
      () => window.scrollTo(0, this.props.scrollPositionForSkip),
      1000
    )();
  };
  saveStoreInfo = val => {
    this.setState({ isStoreAvailable: val });
  };
  /** showRegistryUsabilitySurvey: this function used for verfying the condition to make feature OFF/ON */
  showRegistryUsabilitySurvey = () => {
    const giftRegistered = pathOr(
      null,
      'registryResVO.registrySummaryVO.giftRegistered',
      this.props.registryData
    );
    /** Note: Not adding the TBS and CA check in code, because we may need this feature on TBS * or CA as well in future. So we handle this feature ON/OFF for TBS and CA from CMS */
    const enableRegistrySurvey = pathOr(
      false,
      'enableRegistrySurvey',
      this.props.switchConfig
    );
    const registrySurveyItemThreshold = pathOr(
      5,
      'registrySurveyItemThreshold',
      this.props.pageConfig
    );
    return (
      enableRegistrySurvey && giftRegistered >= registrySurveyItemThreshold
    );
  };
  updateParam() {
    this.allItemsFetched = false;
    this.hasScrolled = false;
    const locationSearch = pathOr('', 'search', this.props.location);
    this.queryParams = qs.parse(locationSearch, {
      ignoreQueryPrefix: true,
    });
    this.fromReplace = true;
  }
  findRegIdFromUrl = pathname => {
    let regId;
    const pathnameArr = pathname.split('/');
    regId = pathnameArr[pathnameArr.length - 1];
    if (!regId.length) {
      regId = pathnameArr[pathnameArr.length - 2];
    }
    regId = parseInt(regId, 10);
    return (regId && regId.toString()) || '';
  };
  checkForAllItemsFetched = nextProps => {
    if (
      this.props.isRemainingItemFetching &&
      !nextProps.isRemainingItemFetching
    ) {
      this.allItemsFetched = true;
    }
  };
  /** * Function use to show the discontinued item  */
  discontinuedItemCountValue(nextProps) {
    let itemsArr = [];
    if (nextProps.registryOwnerFirstCategoryList) {
      if (nextProps.registryOwnerFirstCategoryList.categoryBuckets) {
        itemsArr = nextProps.registryOwnerFirstCategoryList.categoryBuckets;
        this.setStateDiscountinuedItemCount(itemsArr);
      } else {
        itemsArr = nextProps.registryOwnerFirstCategoryList;
        this.setStateDiscountinuedItemCount(itemsArr);
      }
    }
  }
  /** This function fires the SS track event on item added to cart from discontinued filter view and fire removed SS track event on item removed from discontinued filter view also return the discontinued item count*/
  returnDiscontinuedCountAndSSTracking(nextProps) {
    this.discontinuedItemCountValue(nextProps);
  }
  /* * Function to get thankYouList after inactivity modal * with default params sortOrder = 1 and sortDirection = 1.*/
  handleThankYouListOnInactivity() {
    this.props.getThankYouList(this.registryId, this.contentIdArgs, '1', '1');
  }
  pathMatcher(path) {
    return this.props.match.path.includes(path);
  }
  handleUrlSelection() {
    const currentUrl = this.props.location.pathname;
    if (currentUrl.includes('myItems'))
      this.setState({ fireTealiumMyItems: true });
  }
  /** * Function to reset filter back to 'View All' when swtiching between registries. */
  resetFilter() {
    const viewAllLabel = isTbs() ? VIEW_ALL_TBS_LBL : VIEW_ALL_LBL;
    this.changeFilter('', false, viewAllLabel);
  }
  /** * checkSignIn redirects to the sign in page if user is not signed in else to the dashboard view *  * @param (object) location * @param {object} route */
  checkSignIn() {
    return (
      <AuthValidator
        location={this.props.location}
        route={this.props.location.pathName}
        pathName={this.props.location.pathName}
        search={this.props.location.search}
        byPassLogin={isUserRecognized()}
      />
    );
  }
  changeFilter(value, isFiltered, selectedFilterOption) {
    const filteredItems = this.returnFilteredItemsCount(value);
    this.setState(() => ({
      filter: value,
      isFiltered,
      selectedFilterOption,
      filteredItemsCount: filteredItems,
    }));
  }
  updateFilterItemCount(selectedFilterOption) {
    const filterItems = this.returnFilteredItemsCount(selectedFilterOption);
    this.setState(() => ({
      filteredItemsCount: filterItems,
    }));
  }
  callFirstCategory(nextProps) {
    const isFetching = pathOr(null, 'isFetching', nextProps);
    const locationSearch = pathOr('', 'search', nextProps.location);
    const registryName = pathOr('', '[0].registryName', this.eventObject);
    const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    const sorting = QUERY_PARAM_SORT.DATE;
    return (
      this.eventObject &&
      registryName &&
      !this.hasFirstCategoryCallFired &&
      !isFetching &&
      (isEmpty(query) ||
        query.skuAdded ||
        sorting === QUERY_PARAM_SORT.CATEGORY ||
        sorting === QUERY_PARAM_SORT.DATE)
    );
  }
  returnFilteredItemsCount(filter) {
    let itemsArr = [];
    if (
      this.props.registryOwnerFirstCategoryList &&
      this.props.registryOwnerFirstCategoryList.categoryBuckets
    ) {
      itemsArr = this.props.registryOwnerFirstCategoryList.categoryBuckets;
    } else if (this.props.registryOwnerFirstCategoryList) {
      itemsArr = this.props.registryOwnerFirstCategoryList;
    }
    const filteredItemsCount = returnFilteredItemsCount(itemsArr, filter);
    this.props.updateFilterCount(filteredItemsCount);
    return filteredItemsCount;
  }
  redirectMyFundPage = () => {
    if (isUserRecognized()) {
      this.setState({ loginModalVisibility: true });
    } else {
      this.props.redirectTo(MY_FUND_GIFT_TOOLTIP_LINK);
    }
  };
  subscribe = subscribe('DFStartAdding', val => {
    ref.setState({ startAddingClicked: val });
  });
  quizCompletedCallBack(payload, customerId, CDPVars) {
    this.props.fetchQuizPersona(payload, customerId);
    this.props.fetchContentStack(
      false,
      '/store/static/registry-confirmation-success-modal'
    );
    this.props.clearQuizModal();
    this.setState({ startQuiz: false, selectedCDP: CDPVars });
  }
  handleStartQuiz() {
    this.props.fetchContentStack(
      false,
      '/store/static/registry-quiz-success-modal'
    );
    this.setState({ startQuiz: true, selectedCDP: '' });
    this.fireTealiumQuiz();
  }
  fireTealiumQuiz() {
    const pageInfo = {
      page_name: TEALIUM_QUIZ_NAME,
      page_type: TEALIUM_QUIZ_NAME,
    };
    const actionDetails = {
      channel: TEALIUM_QUIZ_REGISTRY,
      pagename_breadcrumb: TEALIUM_QUIZ_START_PAGE_NAME,
      page_function: TEALIUM_QUIZ_REGISTRY,
      navigation_path: TEALIUM_QUIZ_NAME,
      subnavigation_path: TEALIUM_QUIZ_NAME,
    };
    this.props.fireTealiumAction(true, actionDetails, pageInfo);
  }
  handleCollaborationModal = () => {
    if (typeof this.props.setScrollAction === 'function') {
      const scrollPosition = window.scrollY;
      this.props.setScrollAction(scrollPosition);
      if (scrollPosition !== 0) {
        window.scroll(0, 0);
      }
    }
    const dynamicCSURL = `/store/static/collaboration-email-template`;
    this.props.fetchContentStack(false, dynamicCSURL);
    this.setState({ enableRegistryCollaborationModal: true });
    this.props.enableCollaboration();
    if (typeof this.props.fireTealiumAction === 'function') {
      const tealiumConstants = inviteFriendTealiumInfo();
      this.props.fireTealiumAction('', tealiumConstants, '');
    }
  };
  /** * Render Notification component in case of access denied */
  handleTabClickCallback(item) {
    if (item.id === 1) {
      this.hasFirstCategoryCallFired = true;
      const locationSearch = pathOr('', 'search', this.props.location);
      const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
      query.sorting = QUERY_PARAM_SORT.DATE;
      this.getFirstCategory(query);
    }
  }
  handleCashFundsModalClose = () => {
    this.setState({ cashfundsModalState: false });
    this.props.history.push({
      hash: '',
    });
  };
  /**  * Render Notification component in case of access denied  s*/
  renderGlobalNotification() {
    const errorMessage = this.state.syncAccessDenied
      ? ACCESS_DENIED_ERROR_MESSAGE_LBL
      : ACCESS_DENIED_LBL;
    const errorMessageLabel =
      this.props.errorStatus && Array.isArray(this.props.errorStatus)
        ? this.props.errorStatus[0].message
        : '';
    return (
      <ErrorBoundary>
        <div className="mt3">
          <Notification
            status={'error'}
            wrapperClass={'grid-container criticalError'}
            content={errorMessageLabel || errorMessage}
          />
        </div>
      </ErrorBoundary>
    );
  }
  /** * Render Routes and Children Component */
  renderLayout() {
    const email = pathOr(null, 'profileData.email', this.props);
    const eventType = pathOr(
      null,
      'registryResVO.registrySummaryVO.eventType',
      this.props.registryData
    );
    const eventTypeName = pathOr(
      null,
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      this.props.registryData
    );
    const eventObj = this.eventObject;
    const { enableRecommendationTab } = this.props.switchConfig;
    const marketingData = this.getRefContent(
      this.props.dynamicContentState,
      this.getRefContentId(this.props.labels, 'RegOwnerMarketingBanner')
    );
    const hasComponenteMarketingData = !!pathOr(
      0,
      'components.length',
      marketingData
    );
    const isShipOrSwap = pathOr(
      false,
      'registryData.registryResVO.registrySummaryVO.storedValueOptIn',
      this.props
    );
    const updatedMarketingData = marketingData && { ...marketingData };
    if (updatedMarketingData && !isShipOrSwap)
      updatedMarketingData.components =
        hasComponenteMarketingData &&
        updatedMarketingData.components.filter(
          item => !item.message.includes('shipOrSwapMarketBanner')
        );
    const showMarketingBanner = !!pathOr(
      0,
      'components.length',
      updatedMarketingData
    );
    const tnGiftsPurchased = pathOr(
      null,
      'registryResVO.registryVO.tnGiftsPurchased',
      this.props.registryData
    );
    const enableLoyaltyQString = getCookie('enableLoyalty');
    const paramEnableLoyalty =
      enableLoyaltyQString === 1 ||
      enableLoyaltyQString === '1' ||
      this.props.isLoyaltyProgramEnabled;
    const isNewRegDashboard = pathOr(
      false,
      'enableNewRegDashboard',
      this.props.switchConfig
    );
    const isCashFundEnabled = pathOr(
      false,
      'enableCashFund',
      this.props.switchConfig
    );
    const barcodeModalText = this.getRefContent(
      this.props.dynamicContentState,
      this.getRefContentId(this.props.labels, 'barcodeModaltext')
    );
    return (
      <React.Fragment>
        {showMarketingBanner && (
          <MarketingBanner
            name="MarketingBanner"
            data={updatedMarketingData}
            pageIdentifier="REGISTRY"
          />
        )}
        {this.checkSignIn()}
        <div
          className={classnames(
            tnGiftsPurchased > 0
              ? 'registryOwnerMainThreeCells'
              : 'registryOwnerMain'
          )}
        >
          <Dashboard
            paramEnableLoyalty={paramEnableLoyalty}
            isPreviewYrReg={this.isPreviewYrReg}
            loginModalVisibility={this.state.loginModalVisibility}
            openEditRegistryModal={this.state.openEditRegistryModal}
            setEditRegistryModalStateFlag={this.setEditRegistryModalStateFlag}
            eventTypeCode={eventObj.length !== 0 && eventObj[0].registryCode}
            eventType={eventType}
            email={email}
            stateObjMain={this.state}
            registryId={this.state.registryId}
            mPulseEnabled={this.props.isMPulseEnabled}
            isInternationalUser={this.isInternationalUser}
            redirectMyFundPage={this.redirectMyFundPage}
            toggleLoginModalState={this.toggleLoginModalState}
            onModalClose={this.onModalClose}
            myFundGiftTooltipLink={MY_FUND_GIFT_TOOLTIP_LINK}
            track={this.props.track}
            changeFilter={this.changeFilter}
            updateFilterItemCount={this.updateFilterItemCount}
            returnFilteredItemsCount={this.returnFilteredItemsCount}
            resetFilter={this.resetFilter}
            updateParam={this.updateParam}
            saveStoreInfo={this.saveStoreInfo}
            fireTealiumQuiz={this.fireTealiumQuiz}
            isNewRegDashboard={isNewRegDashboard}
            isRecognized={isUserRecognized()}
            {...this.props}
            handleCollaborationModal={this.handleCollaborationModal}
            barcodeModalText={barcodeModalText}
          />
        </div>
        {isCashFundEnabled && this.state.cashfundsModalState && (
          <CashFunds
            {...this.props}
            regType={eventType}
            registryId={this.state.registryId}
            handleCashFundsModalClose={this.handleCashFundsModalClose}
            activeRegistry={this.props.activeRegistry}
            regCashFundEventTypes={this.props.regCashFundEventTypes}
            siteId={this.siteId}
          />
        )}
        {!isNewRegDashboard && (
          <div>
            <Tab
              eventType={eventType}
              enableTab={this.props.enableTab}
              registryId={this.state.registryId}
              mPulseEnabled={this.props.isMPulseEnabled}
              enableRecommendationTab={enableRecommendationTab}
              eventTypeName={eventTypeName}
              handleTabClickCallback={this.handleTabClickCallback}
              {...this.props}
            />
            <InactivityModal
              inactivityModalReset={this.props.inactivityModalReset}
              initiateInactivityModal={this.props.initiateInactivityModal}
              closeOtherOpenModaOnInactiveModal={
                this.props.closeOtherOpenModaOnInactiveModal
              }
              handleThankYouList={this.handleThankYouListOnInactivity}
              getEditRegistryData={this.props.getEditRegistryData}
              pathMatcher={this.pathMatcher}
              closeModalFlag={this.props.closeModalFlag}
              makeActiveRegistryCall={this.props.makeActiveRegistryCall}
              activeRegistryCallFlag={this.props.activeRegistryCallFlag}
              recognizedFlag={isUserRecognized()}
              location={this.props.location}
              isMobile={this.props.isMobile}
              mPulseEnabled={this.props.isMPulseEnabled}
            />
            {this.props.isMPulseEnabled && (
              <Instrumentation
                zoneName={'ux-primary-action-available'}
                markName={'ux-link-registry-tabs'}
              />
            )}
            {this.props.route.routes.map((routeItem, i) => (
              <RouteWithSubRoutes
                key={i}
                route={routeItem}
                changeFilter={this.changeFilter}
                updateFilterItemCount={this.updateFilterItemCount}
                returnFilteredItemsCount={this.returnFilteredItemsCount}
                stateObj={this.state}
                eventTypeCode={
                  eventObj.length !== 0 && eventObj[0].registryCode
                }
                eventType={eventType}
                mPulseEnabled={this.props.isMPulseEnabled}
                discontinuedItemCount={this.state.discontinuedItemCount}
                resetFilter={this.resetFilter}
                updateParam={this.updateParam}
                saveStoreInfo={this.saveStoreInfo}
                isStoreAvailable={this.state.isStoreAvailable}
                handleCollaborationModal={this.handleCollaborationModal}
                contentStackSelectors={this.props.contentStackSelectors}
                fetchContentStack={this.props.fetchContentStack}
                fireTealiumQuiz={this.fireTealiumQuiz}
                isFromRecommendation={this.props.isFromRecommendation}
                setQuizFromRecommendation={this.props.setQuizFromRecommendation}
                cashfundsModalState={this.state.cashfundsModalState}
                history={this.props.history}
              />
            ))}
          </div>
        )}
        {this.showRegistryUsabilitySurvey() && (
          <RegistryUsabilitySurvey
            registryId={this.state.registryId}
            surveyHeading={SURVEY_HEADING_LBL}
          />
        )}
        {this.state.startAddingClicked && (
          <DFRegistration
            labels={this.props.labels}
            registryData={this.props.registryData}
            registryId={this.state.registryId}
            registryCode={eventObj[0].registryCode}
            eventDate={this.registrySummary.eventDate}
            {...this.props}
          />
        )}
      </React.Fragment>
    );
  }
  renderRegistryCollaborationModal = siteId => {
    const collModalLabel = {
      savedItemsHeadingLabel: INVITE_FRIEND_COLLABORATION_MODAL_TITLE_LBL,
      formLabel: null,
      toEmailLabel: INVITE_FRIEND_MODAL_EMAIL_LBL,
      messageLabel: INVITE_FRIEND_COLLABORATION_MODAL_MESSAGE_LBL,
      submitButtonLabel: INVITE_FRIEND_MODAL_BTN_TEXT_LBL,
      recaptchaError: CAPTCHA_ERROR_MESSAGE,
      inviteFriendEmailSentResponse: INVITE_FRIEND_EMAIL_SENT_RESPONSE_LBL,
      inviteFriendErrorMsg: INVITE_FRIEND_ERROR_MSG_LBL,
      inviteFriendSentModalTitle: INVITE_FRIEND_SENT_MODAL_TITLE_LBL,
      inviteMoreFriend: INVITE_MORE_FRIEND_LBL,
      recommenderLandingPageURL: RECOMMENDER_LANDING_PAGE_URL_LBL,
    };
    return (
      <RegistryCollaborationModal
        closeCollaborationModal={this.closeRegistryCollaborationModal}
        siteId={siteId}
        isMobile={this.props.isMobile}
        contentStackSelectors={this.props.contentStackSelectors}
        label={collModalLabel}
        redirectToRegistry={this.closeRegistryCollaborationModal}
        fireTealiumAction={this.props.fireTealiumAction}
        registryData={this.props.registryData}
        formWrapperData={this.props.formWrapperData}
      />
    );
  };
  renderQuizLayout() {
    const primaryRegistrantFirstName = pathOr(
      '',
      'registryResVO.registrySummaryVO.primaryRegistrantFirstName',
      this.props.registryData
    );
    const renderComponent = this.state.startQuiz ? (
      <QuizQnAComponent
        contentStackData={this.props.contentStackSelectors}
        quizCompletedCallBack={this.quizCompletedCallBack}
        registryId={this.state.registryId}
        customerId={this.props.customerId}
        getQuizErrorMessage={this.props.getQuizErrorMessage}
        fireTealiumAction={this.props.fireTealiumAction}
        activeRegistry={this.props.activeRegistry}
      />
    ) : (
      <QuizComponent
        contentStackData={this.props.contentStackSelectors}
        handleStartQuiz={this.handleStartQuiz}
        primaryRegistrantFirstName={primaryRegistrantFirstName}
        setQuizOpenStatus={this.setQuizOpenStatus}
        setQuizFromRecommendation={this.props.setQuizFromRecommendation}
        isQuizCompleted={this.props.quizCompleted}
        registryId={this.state.registryId}
        personaType={this.props.personaType}
        isQuizFetching={this.props.isQuizFetching}
        isMobile={this.props.isMobile}
        activeRegistry={this.props.activeRegistry}
        selectedCDP={this.state.selectedCDP}
        redirectTo={this.props.redirectTo}
      />
    );
    const babyConfetti = (
      <GridX className={classnames('grid-margin-x', styles.confPosition)}>
        <Cell className="large-6 small-6">
          <Image
            alt="babyConfLeft"
            src="/static/assets/images/babyConfLeft.png"
          />
        </Cell>
        <Cell className={classnames(styles.rightImage, 'large-6  small-6')}>
          <Image
            alt="babyConfRight"
            src="/static/assets/images/babyConfRight.png"
          />
        </Cell>
      </GridX>
    );
    return (
      <React.Fragment>
        <RegistryOwnerTealiumHandler
          registryOwnerFirstCategoryList={
            this.props.registryOwnerFirstCategoryList
          }
          interactiveCheckList={this.props.interactiveCheckList}
          thankYouListSurpriseData={this.props.dynamicContentState}
        />
        {this.props.isMobile ? (
          <ModalDialog
            mountedState={this.state.modalMounteState}
            closeIconShow
            titleAriaLabel="Quiz-Modal"
            verticallyCenter
            scrollDisabled
            onModalClose={() => {
              this.setQuizOpenStatus(false);
            }}
            contentWrapperClass={this.state.startQuiz && styles.confQnAPosition}
          >
            <React.Fragment>
              {renderComponent}
              {babyConfetti}
            </React.Fragment>
          </ModalDialog>
        ) : (
          <React.Fragment>
            <div className={styles.closeBtn}>
              <Button
                id="crossIcon"
                theme="ghost"
                variation="noPadding"
                onClick={() => {
                  this.setQuizOpenStatus(false);
                }}
                aria-label="close-modal"
                className={styles.closeBtnColor}
              >
                <Icon type="close" width="16px" height="16px" />
              </Button>
            </div>
            {renderComponent}
            {babyConfetti}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
  render() {
    const newDashboardFlag = pathOr(
      false,
      'enableNewRegDashboard',
      this.props.switchConfig
    );
    if (!isBrowser()) {
      return null;
    }
    if (this.props.isFetching) {
      return newDashboardFlag ? <NewDashboardSkeleton /> : <Skeleton />;
    }
    if (this.state.registryId === this.props.deactivatedRegId) {
      this.props.clearDeactivatedReg();
      /* istanbul ignore next */
      return (
        <Route
          component={() => {
            window.location.href = '/';
            return null;
          }}
        />
      );
    }
    return <ErrorBoundary>{this.getRegistryOwnerComponent()}</ErrorBoundary>;
  }
}
RegistryOwnerMain.propTypes = {
  enableTab: PropTypes.bool,
  deactivatedRegId: PropTypes.string,
  clearDeactivatedReg: PropTypes.func,
  labels: PropTypes.object,
  isMobile: PropTypes.bool,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
  dynamicContentState: PropTypes.object,
  onComponentMount: PropTypes.func,
  registryData: PropTypes.object,
  route: PropTypes.object,
  getRegistryOwnerFirstCategory: PropTypes.func,
  registrylist: PropTypes.array,
  syncAccessDenied: PropTypes.bool,
  registryOwnerFirstCategoryList: PropTypes.array,
  updateFilterCount: PropTypes.func,
  switchConfig: PropTypes.object,
  isMPulseEnabled: PropTypes.bool,
  resetIsItemsFetchingStatus: PropTypes.func,
  inactivityModalReset: PropTypes.bool,
  initiateInactivityModal: PropTypes.func,
  closeOtherOpenModaOnInactiveModal: PropTypes.func,
  getEditRegistryData: PropTypes.func,
  closeModalFlag: PropTypes.bool,
  activeRegistryCallFlag: PropTypes.bool,
  makeActiveRegistryCall: PropTypes.func,
  match: PropTypes.object,
  getThankYouList: PropTypes.func,
  isItemsFetching: PropTypes.bool,
  isRemainingItemFetching: PropTypes.bool,
  errorStatus: PropTypes.object,
  getMyFundsData: PropTypes.func,
  enableSVPermanentValue: PropTypes.bool,
  myFundsData: PropTypes.object,
  pageConfig: PropTypes.object,
  redirectTo: PropTypes.func,
  track: PropTypes.func,
  setShowChecklist: PropTypes.func,
  activeRegistry: PropTypes.object,
  enableRegistryQuiz: PropTypes.bool,
  isRegistryCreated: PropTypes.bool,
  clearCreateRegistry: PropTypes.func,
  enableCollaboration: PropTypes.func,
  disableCollaboration: PropTypes.func,
  showTakeOurQuiz: PropTypes.bool,
  fetchContentStack: PropTypes.func,
  contentStackSelectors: PropTypes.array,
  clearQuizModal: PropTypes.func,
  fetchQuizPersona: PropTypes.func,
  resetQuizPersona: PropTypes.func,
  customerId: PropTypes.string,
  personaType: PropTypes.string,
  isQuizFetching: PropTypes.bool,
  quizCompleted: PropTypes.bool,
  getQuizErrorMessage: PropTypes.string,
  quizRegistryId: PropTypes.string,
  setQuizPersona: PropTypes.func,
  fireTealiumAction: PropTypes.func,
  interactiveCheckList: PropTypes.object,
  formWrapperData: PropTypes.object,
  isFromRecommendation: PropTypes.bool,
  setQuizFromRecommendation: PropTypes.func,
  scrollPositionForQuiz: PropTypes.number,
  isNewCreateRegForm: PropTypes.bool,
  scrollPositionForSkip: PropTypes.number,
  setScrollAction: PropTypes.func,
  isLoyaltyProgramEnabled: PropTypes.bool,
  history: PropTypes.object,
  isBopisFeatureEnable: PropTypes.bool,
  registryListFetched: PropTypes.bool,
  regCashFundEventTypes: PropTypes.bool,
  routeData: PropTypes.object,
};
export const mapDispatchToProps = dispatch => {
  return {
    updateGroupGiftOptInInfo: isGroupGiftOptIn => {
      dispatch(updateGroupGiftOptInInfo(isGroupGiftOptIn));
    },
    clearCreateRegistry: () => {
      dispatch(clearCreateRegistry());
    },
    onComponentMount(registryId, giftGiver, referredContentArray) {
      dispatch(clearRegistryResponse());
      dispatch(fetchRegistryData(registryId, giftGiver, true));
      if (registryId) {
        dispatch(putActiveRegistry(registryId));
      }
      dispatch(fetchReferredContent(referredContentArray));
    },
    updateFilterCount: filterCount => {
      dispatch(updateFilterCount(filterCount));
    },
    resetIsItemsFetchingStatus: () => {
      dispatch(resetIsItemsFetchingStatus());
    },
    fetchCoRegistrantProfileStatus: (email, showLoader) => {
      dispatch(fetchProfileStatus(email, showLoader));
    },
    updatePickupinStoreModal: args => {
      dispatch(updatePickupinStoreModal(args));
    },
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    fetchContentStack(args, dynamicCSURL) {
      dispatch(fetchContentStack(args, dynamicCSURL));
    },
    setShowChecklist: data => {
      dispatch(setCheckListICLayout(data));
    },
    getRegistryOwnerFirstCategory(
      registryId,
      eventTypeCode,
      eventDate,
      isDateSort
    ) {
      dispatch(
        fetchRegistryOwnerItemsFirstCategory(
          registryId,
          eventTypeCode,
          eventDate,
          isDateSort
        )
      );
    },
    initiateInactivityModal: inactivityModalState => {
      dispatch(initiateInactivityModal(inactivityModalState));
    },
    makeActiveRegistryCall: () => {
      dispatch(makeActiveRegistryCall());
    },
    closeOtherOpenModaOnInactiveModal(bool) {
      dispatch(closeOtherOpenModal(bool));
    },
    getThankYouList(registryId, contentIdArgs) {
      dispatch(fetchTymData(registryId, contentIdArgs, '1', '1'));
    },
    clearDeactivatedReg: () => dispatch(clearDeactivatedRegId()),
    getMyFundsData(source, isUpdate, enableSVPermanentValue, isPBar) {
      dispatch(fetchMyFunds(source, isUpdate, enableSVPermanentValue, isPBar));
    },
    redirectTo: path => {
      dispatch(push(path));
    },
    fetchQuizPersona: (data, customerId) => {
      dispatch(fetchQuizPersona(data, customerId));
    },
    clearQuizModal: () => {
      dispatch(clearQuizModal());
    },
    resetQuizPersona: () => {
      dispatch(resetQuizPersona());
    },
    enableCollaboration: () => {
      dispatch(enableCollaboration());
    },
    disableCollaboration: () => {
      dispatch(disableCollaboration());
    },
    setQuizPersona: data => {
      dispatch(setQuizPersona(data));
    },
    setQuizFromRecommendation: data => {
      dispatch(setQuizFromRecommendation(data));
    },
    setScrollAction: scrollPosition => {
      dispatch(setScroll(scrollPosition));
    },
  };
};
export const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobileScreen,
  labels: makeSelectLabels(['Registry']),
  accountLabels: makeSelectLabels(['myAccount']),
  rfTrackerEventSent: makeRfTrackerVisibilityStatus(),
  quickItemAddedTS: selectQuickItemAdded(),
  registryData: getRegistryData(),
  enableTab: makeSelectSwitchConfig(['createRegistry', 'enableTYMTab']),
  isFetching: getFetchingStatus(),
  registryOwnerFirstCategoryList: makeSelectOwnerFirstCategoryList(),
  registrylist: makeSelectRegistryList(),
  syncAccessDenied: makeSelectsyncAccessDenied(),
  dynamicContentState: makeSelectContent(),
  switchConfig: makeSelectSwitchConfig(['RegistryOwner']),
  switchConfigGlobal: makeSelectGlobalSwitchConfig(),
  loginLabels: makeTYMSignInModalLabels(),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  isLoggedIn: makeSelectIsLoggedIn(),
  makeReviewYourProductsConfig: makeSelectSocialAnxWriteReview(),
  profileData: makeSelectProfile(),
  routeData: makeRouteData(),
  interactiveCheckList: interactiveCheckListSelector(),
  inactivityModalReset: makeSelectInactivityModalReset(),
  activeRegistryCallFlag: makeSelectActiveRegistryCallFlag(),
  mPulseSiteConfig: selectMPulsePageConfig,
  isMPulseEnabled: selectIsMPulseEnabled,
  registryListFetched: makeSelectRegistryListFetched(),
  isSocialAnnexReady: isSocialAnnexReady(),
  deactivatedRegId: makeSelectDeactivatedRegId(),
  selectIsItemDeleted: selectIsItemDeleted(),
  cartDataIsFetching: makeSelectCartDataIsFetching(),
  isItemsFetching: getItemsFetchingStatus(),
  isRemainingItemFetching: getRemainingItemFetchingStatus(),
  errorStatus: getErrorStatus(),
  pageConfigGlobal: makeSelectPageConfig(),
  enableSVPermanentValue: makeSelectSwitchConfig([
    'myFunds',
    'enableSVPermanentValue',
  ]),
  myFundsData: selectMyFundsDetailsData(),
  variation: makeSelectSortedBy(),
  pageConfig: makeSelectPageConfig(['RegistryOwner']),
  formWrapperData: formWrapperSelector('emailForm'),
  emailId: makeSelectEmailId(),
  activeRegistry: makeSelectActiveRegistry(),
  isAddToRegistryFetching: makeSelectItemFetching(),
  getShowChecklistData: makeShowCheckList(),
  isRegistryCreated: getcreateRegistryModalPopUpStatus(),
  scrollPositionForQuiz: getScrollPositionForQuiz(),
  scrollPositionForSkip: getScrollPositionForSkip(),
  quizRegistryId: getRegistryId(),
  isBopisFeatureEnable: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistrantBopis',
  ]),
  enableRegistryQuiz: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistryQuiz',
  ]),
  enableICToggle: makeSelectSwitchConfig(['RegistryOwner', 'enableICToggle']),
  enableRegistryCollaboration: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistryCollaboration',
  ]),
  isNewCreateRegForm: makeSelectSwitchConfig([
    'createRegistry',
    'enableNewCreateReg',
  ]),
  isLoyaltyProgramEnabled: makeSelectSwitchConfig([
    'Global',
    'enableLoyaltyProgram',
  ]),
  contentStackSelectors: makeContentStackContents(),
  showTakeOurQuiz: getTakeOurQuizStatus(),
  customerId: makeSelectCustomerId(),
  personaType: getPersonaType(),
  quickPickId: getQuickPickId(),
  quizCompleted: getQuizCompleted(),
  isFromRecommendation: getFromRecommendation(),
  isQuizFetching: getQuizIsQuizFetching(),
  getQuizErrorMessage: getErrorMessage(),
  regCashFundEventTypes: makeSelectSiteConfig(['registryCashFundEventTypes']),
  barCodeConfig: makeSelectThirdPartyConfig(['barcode']),
  PDFConfig: makeSelectThirdPartyConfig(['pdf']),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withAccountMyFundSaga = injectMultipleSagas([
  {
    key: MYFUNDS_STATE_KEY,
    saga: AccountMyFundsSaga,
  },
  {
    key: CONTENT_STACK_STATE_KEY,
    saga: contentStackSaga,
  },
  {
    key: FETCH_QUIZ_PERSONA,
    saga: QuizPersona,
  },
]);
const withReducers = injectMultipleReducers([
  {
    key: REG_INPUTS_STATE_KEY,
    reducer: registryInputReducer,
  },
  {
    key: MYFUNDS_STATE_KEY,
    reducer: accountMyFundsReducer,
  },
  {
    key: CONTENT_STACK_STATE_KEY,
    reducer: contentStackReducer,
  },
  {
    key: FETCH_QUIZ_PERSONA,
    reducer: QuizReducer,
  },
]);
export default compose(
  withReducers,
  withConnect,
  withAccountMyFundSaga,
  withSiteSpectTracker
)(toJS(RegistryOwnerMain));
