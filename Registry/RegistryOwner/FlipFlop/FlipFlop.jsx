import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import pathOr from 'lodash/fp/pathOr';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectSwitchConfig,
  channelTypeSelector,
  makeSelectEndPoints,
  makeSelectSiteConfig,
  makeSelectGlobalSwitchConfig,
  makeSelectLabels,
} from '@bbb-app/selectors/configSelector';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import { getCookie } from '@bbb-app/utils/universalCookie';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import toJS from '@bbb-app/hoc/toJS';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import AuthValidator from '@bbb-app/hoc/AuthValidator';
import {
  QUICK_VIEW_STATE_KEY,
  CHANNELTYPE_DESKTOP,
} from '@bbb-app/constants/appConstants';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import hardSPALinksContext from '@bbb-app/core-ui/hard-spa-link/enableHardSPALinksContext';
import registryTinderContext from '@bbb-app/context/registry-tinder-context/registryTinderContext';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import {
  makeSelectRegistryListFetched,
  makeSelectActiveRegistryID,
} from '@bbb-app/get-registry-details/containers/selectors';
import {
  makeSelectCustomerId,
  makeSelectRegistryList,
} from '@bbb-app/selectors/accountSelectors';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import {
  getFlipFlopData,
  deleteFlipFlopData,
  setIsItemsCountLow,
} from './actions';
import {
  makeSelectFlipFlopItemsList,
  makeSelectCookieCountInStore,
  makeSelectFetchingStatus,
  getRegTypeFromStore,
  makeSelectFlipFLopSelectedCategory,
  makeSelectMobileOrientationType,
  makeSelectIsItemsCountLow,
} from './selectors';
import '../../../../../assets/icons/flipFlopNotAccessibleImg.svg';
import Tinderable from '../../../../../components/Pages/Registry/RegistryOwner/FlipFlop/FlipFlopTinder';
import {
  DEFAULT_QUERY_STRING,
  DEFAULT_BATCH_SIZE,
  DEFAULT_START_INDEX_NUMBER,
  DEFAULT_END_INDEX_NUMBER,
  DEFAULT_COOKIE_EXPIRY_DAYS,
  FLIP_FLOP_START_INDEX,
  FLIP_FLOP_END_INDEX,
  FLIP_FLOP_BATCH_SIZE,
  FLIP_FLOP_COOKIE_EXPIRY,
  FLIP_FLOP_QUERY,
  FLIP_FLOP_REMAINING_ITEMS_TRIGGER,
  PAGE_OUT_OF_REACH,
  FLIP_FLOP_ALL_CATEGORIES,
  FLIP_FLOP_STATE_KEY,
  FLIP_FLOP_NOT_ACCESIBLE_MSG_LBL,
} from './constants';
import { DEFAULT_ERROR_MESSAGE } from '../constants';
import '../../../../../assets/icons/flipFlopATRError.svg';
import {
  makeSelectActiveRegistryName,
  makeSelectAddToRegistryState,
} from '../../../../AddToRegistry/selectors';
import { addToRegistry as addToRegistryAction } from '../../../../AddToRegistry/ActionWithSagaInjection';
import FlipFlopModal from '../../../../../components/Pages/Registry/RegistryOwner/FlipFlop/FlipFlopModal';
import { fetchQuickViewProductDetails } from '../../../../../containers/QuickViewModal/ActionWithSagaInjection';
import { onModalClose } from '../../../../../containers/QuickViewModal/actions';
import { selectProductDetails } from '../../../../../containers/QuickViewModal/selectors';
import saga from './sagas';
import reducer from './reducer';

import quikViewModalReducer from '../../../../QuickViewModal/combinedReducer';

// eslint-disable-next-line no-underscore-dangle
const registryTinderCategories = registryTinderContext._currentValue;
// eslint-disable-next-line no-underscore-dangle
const hardSPALinks = hardSPALinksContext._currentValue;

const propTypes = {
  flipFlopItemsList: PropTypes.array,
  fetchFlipFlopData: PropTypes.func,
  flipFlopCookieInStore: PropTypes.object,
  registrySiteConfig: PropTypes.object,
  isFetchingItemsList: PropTypes.bool,
  labels: PropTypes.object,
  location: PropTypes.object,
  channelType: PropTypes.object,
  resetFlipFlopData: PropTypes.func,
  registriesList: PropTypes.object,
  regTypeInStore: PropTypes.object,
  registryListFetched: PropTypes.bool,
  endPoints: PropTypes.object,
  getContent: PropTypes.func,
  selectedCategories: PropTypes.object,
  isLandscapeMode: PropTypes.bool,
  fireTealiumAction: PropTypes.func,
  isGroupByFlipFlopEnable: PropTypes.bool,
};

export class FlipFlop extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      mountedState: false,
      timeOutSet: false,
      selectedCategory: FLIP_FLOP_ALL_CATEGORIES,
      isFlipFlopEnabled: false,
    };
    this.fetchFlipFlopDataFunc = this.fetchFlipFlopDataFunc.bind(this);
  }
  componentWillMount() {
    const { labels } = this.props;
    const refContent = [];
    const internationalUser = isInternationalUser();
    let isFlipFlopEnabled = false;
    if (!internationalUser) {
      isFlipFlopEnabled = true;
      this.setState({
        isFlipFlopEnabled,
      });
    }
    if (!isFlipFlopEnabled) {
      this.setState({ mountedState: true });
    }
    if (labels) {
      labels.referredContent.forEach(ele => {
        if (
          ele.key === 'flipFlopBanner' ||
          ele.key === 'tinderLandscapeModeMessage'
        ) {
          refContent.push(ele.id);
        }
      });
      this.props.getContent(refContent);
    }
  }

  componentDidMount() {
    if (this.state.isFlipFlopEnabled) {
      this.triggerAPICallFunction();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { flipFlopItemsList, isFetchingItemsList } = nextProps;
    const { mountedState, isFlipFlopEnabled } = this.state;

    if (
      flipFlopItemsList &&
      flipFlopItemsList.length <= 0 &&
      isFlipFlopEnabled &&
      !isFetchingItemsList &&
      !mountedState
    ) {
      this.triggerAPICallFunction();
    }
  }

  getFlipFlopStartIndex = (regType, selectedCategory) => {
    const { flipFlopItemsList } = this.props;
    const flipFlopCookie = `${selectedCategory}${regType}`;
    const checkCookiePresent = getCookie(flipFlopCookie);
    if (checkCookiePresent !== null && !isNaN(checkCookiePresent)) {
      return checkCookiePresent;
    }
    const flipFlopStartCatIndex = this.getFlipFlopCategoryStartIndex(
      regType,
      selectedCategory
    );
    if (
      (flipFlopStartCatIndex || flipFlopStartCatIndex === 0) &&
      !isNaN(flipFlopStartCatIndex) &&
      flipFlopItemsList !== null
    ) {
      return flipFlopStartCatIndex;
    }
    const randomIndexNumber = this.generateRandomFlipFlopIndex(regType);
    return randomIndexNumber;
  };

  getFlipFlopCategoryStartIndex = (regType, selectedCategory) => {
    const flipFlopCookieInStore = this.props.flipFlopCookieInStore;
    const selectedCategoryName = `${selectedCategory}_${regType}`;
    let startIndex = null;
    if (flipFlopCookieInStore) {
      startIndex = pathOr(
        selectedCategory && selectedCategory !== FLIP_FLOP_ALL_CATEGORIES
          ? 0
          : null,
        selectedCategoryName,
        flipFlopCookieInStore
      );
    }
    return startIndex;
  };

  triggerAPICallFunction = () => {
    const regType = pathOr(null, 'match.params.regType', this.props);
    const {
      flipFlopItemsList,
      isFetchingItemsList,
      registrySiteConfig,
      regTypeInStore,
      selectedCategories,
    } = this.props;
    const thresholdNextAPITrigger = pathOr(
      8,
      FLIP_FLOP_REMAINING_ITEMS_TRIGGER,
      registrySiteConfig
    );
    let selectedCategory;
    if (this.state.isFlipFlopEnabled && selectedCategories) {
      selectedCategory = pathOr(
        FLIP_FLOP_ALL_CATEGORIES,
        regType,
        selectedCategories
      );
    }
    this.setState({
      selectedCategory,
    });
    if (
      !isFetchingItemsList &&
      regTypeInStore !== regType &&
      flipFlopItemsList
    ) {
      this.props.resetFlipFlopData(flipFlopItemsList.length - 1);
      this.fetchFlipFlopDataFunc(thresholdNextAPITrigger, selectedCategory);
    } else if (
      !isFetchingItemsList &&
      (!flipFlopItemsList ||
        (flipFlopItemsList &&
          flipFlopItemsList.length <= thresholdNextAPITrigger))
    ) {
      this.fetchFlipFlopDataFunc(thresholdNextAPITrigger, selectedCategory);
    }
  };

  fetchFlipFlopDataFunc = (
    thresholdAPITrigger,
    selectedCategory = FLIP_FLOP_ALL_CATEGORIES
  ) => {
    this.setState({ selectedCategory });
    const regType = pathOr(null, 'match.params.regType', this.props);
    const { registrySiteConfig, isGroupByFlipFlopEnable } = this.props;

    const startIndex = this.getFlipFlopStartIndex(regType, selectedCategory);

    const queryByRegType = pathOr(
      DEFAULT_QUERY_STRING,
      `${FLIP_FLOP_QUERY}${regType}`,
      registrySiteConfig
    );
    const flipFlopCookieExpiryDays = pathOr(
      DEFAULT_COOKIE_EXPIRY_DAYS,
      FLIP_FLOP_COOKIE_EXPIRY,
      registrySiteConfig
    );
    const flipFlopBatchSize = pathOr(
      DEFAULT_BATCH_SIZE,
      FLIP_FLOP_BATCH_SIZE,
      registrySiteConfig
    );
    const fqParam = registryTinderCategories.fqParam
      ? registryTinderCategories.fqParam
      : '';
    const otherPayload = {
      thresholdAPITrigger,
      selectedCategory,
      fqParam,
    };

    this.props.fetchFlipFlopData(
      startIndex,
      flipFlopBatchSize,
      queryByRegType,
      DEFAULT_ERROR_MESSAGE,
      flipFlopCookieExpiryDays,
      regType,
      otherPayload,
      isGroupByFlipFlopEnable
    );
  };

  generateRandomFlipFlopIndex = regType => {
    const { registrySiteConfig } = this.props;
    const flipFlopStartIndex = pathOr(
      DEFAULT_START_INDEX_NUMBER,
      `${FLIP_FLOP_START_INDEX}${regType}`,
      registrySiteConfig
    );
    const flipFlopEndIndex = pathOr(
      DEFAULT_END_INDEX_NUMBER,
      `${FLIP_FLOP_END_INDEX}${regType}`,
      registrySiteConfig
    );
    const randomNumberGenerated = Math.floor(
      Math.random() * (flipFlopEndIndex - flipFlopStartIndex + 1) +
        flipFlopStartIndex
    );
    return randomNumberGenerated;
  };
  ifFlipFlopDisabled = () => {
    const endPoints = this.props.endPoints;
    if (this.state.mountedState) {
      if (!this.state.timeOutSet) {
        setTimeoutCustom(() => {
          this.setState({ timeOutSet: true });
        }, 3000);
      } else {
        if (hardSPALinks === true) {
          window.location.href = endPoints.home;
        }
        return <Redirect to={endPoints.home} />;
      }
    }
    return '';
  };

  toggleErrorModalState = () => {
    this.setState({ mountedState: true, timeOutSet: true });
  };

  checkIfRoute = () => {
    const endPoints = this.props.endPoints;

    const isDesktop = this.props.channelType === CHANNELTYPE_DESKTOP;
    if (isDesktop) {
      const registryId = pathOr(null, 'match.params.id', this.props);
      const path = endPoints.registryOwner.replace(':id?', registryId);
      return <Redirect to={path} />;
    }

    const { registriesList, registryListFetched } = this.props;
    if (registryListFetched && registriesList && registriesList.length === 0) {
      return <Redirect to={endPoints.myregistries} />;
    }

    const location = this.props.location;
    const pathName = location.pathname;
    const search = location.search;
    const byPassLogin = isUserRecognized();

    return (
      <AuthValidator
        location={location}
        pathName={pathName}
        search={search}
        byPassLogin={byPassLogin}
      />
    );
  };

  render() {
    const thresholdNextAPITrigger = pathOr(
      8,
      FLIP_FLOP_REMAINING_ITEMS_TRIGGER,
      this.props.registrySiteConfig
    );
    const { flipFlopItemsList, labels } = this.props;

    return flipFlopItemsList && flipFlopItemsList.length > 0 ? (
      <React.Fragment>
        {this.checkIfRoute()}
        <Tinderable
          items={new Array(...flipFlopItemsList)}
          labels={labels}
          triggerNextAPICall={this.fetchFlipFlopDataFunc}
          thresholdNextAPITrigger={thresholdNextAPITrigger}
          resetFlipFlopData={this.props.resetFlipFlopData}
          isLandscapeMode={this.props.isLandscapeMode}
          selectedCategory={this.state.selectedCategory}
          isFlipFlopEnabled={this.state.isFlipFlopEnabled}
          fireTealiumAction={this.props.fireTealiumAction}
          isGroupByFlipFlopActive={this.props.isGroupByFlipFlopEnable}
          {...this.props}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <FlipFlopModal
          toggleErrorModalState={this.toggleErrorModalState}
          imgURL={'flipFlopNotAccessibleImg'}
          closeIconShow
          labelToShow={FLIP_FLOP_NOT_ACCESIBLE_MSG_LBL}
          ariaLabel={PAGE_OUT_OF_REACH}
          mountedState={this.state.mountedState}
          labels={this.props.labels}
        />
        {this.ifFlipFlopDisabled()}
      </React.Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    /* eslint max-params: ["error", 8]*/
    fetchFlipFlopData: (
      start,
      rows,
      query,
      errorMsg,
      flipFlopCookieExpiryDays,
      regType,
      otherPayload,
      isGroupByFlipFlopEnable
    ) => {
      dispatch(
        getFlipFlopData(
          start,
          rows,
          query,
          errorMsg,
          flipFlopCookieExpiryDays,
          regType,
          otherPayload,
          isGroupByFlipFlopEnable
        )
      );
    },
    resetFlipFlopData: countOfItemsViewed => {
      dispatch(deleteFlipFlopData(countOfItemsViewed));
    },
    addToRegistry(payload) {
      dispatch(addToRegistryAction(payload));
    },
    getContent: contentId => {
      dispatch(fetchReferredContent(contentId));
    },
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    onRightSwipeMSWP(
      productId,
      productVariation,
      productUrl,
      miniQuickViewMode
    ) {
      dispatch(
        fetchQuickViewProductDetails(
          productId,
          productVariation,
          productUrl,
          null,
          null,
          null,
          false,
          '',
          miniQuickViewMode
        )
      );
    },
    onModalClose() {
      dispatch(onModalClose());
    },
    setIsItemsCountLow: isItemsCountLow => {
      dispatch(setIsItemsCountLow(isItemsCountLow));
    },
  };
};

export const mapStateToProps = createStructuredSelector({
  customerID: makeSelectCustomerId(),
  flipFlopItemsList: makeSelectFlipFlopItemsList(),
  flipFlopCookieInStore: makeSelectCookieCountInStore(),
  registrySiteConfig: makeSelectSiteConfig(['registry']),
  isFetchingItemsList: makeSelectFetchingStatus(),
  labels: makeSelectLabels(['Registry']),
  channelType: channelTypeSelector,
  registriesList: makeSelectRegistryList(),
  regTypeInStore: getRegTypeFromStore(),
  registryListFetched: makeSelectRegistryListFetched(),
  activeRegistryId: makeSelectActiveRegistryID(),
  activeRegistryName: makeSelectActiveRegistryName(),
  addToRegistryState: makeSelectAddToRegistryState(),
  endPoints: makeSelectEndPoints(),
  dynamicContent: makeSelectContent(),
  switchConfigGlobal: makeSelectGlobalSwitchConfig(),
  selectedCategories: makeSelectFlipFLopSelectedCategory(),
  isLandscapeMode: makeSelectMobileOrientationType(),
  mswpProductDetails: selectProductDetails,
  isItemsCountLow: makeSelectIsItemsCountLow(),
  isGroupByFlipFlopEnable: makeSelectSwitchConfig([
    'RegistryFlipFlops',
    'enableGroupByFlipFlopAPI',
  ]),
});

FlipFlop.propTypes = propTypes;

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: FLIP_FLOP_STATE_KEY,
  reducer,
});
const withSaga = injectSaga({ key: FLIP_FLOP_STATE_KEY, saga });

const withQuickViewModalReducer = injectReducer({
  key: QUICK_VIEW_STATE_KEY,
  reducer: quikViewModalReducer,
});

export default compose(
  withSaga,
  withReducer,
  withQuickViewModalReducer,
  withConnect
)(toJS(FlipFlop));
