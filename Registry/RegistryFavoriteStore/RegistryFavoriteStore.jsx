import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { pathOr, isEmpty } from 'lodash/fp';
import toJS from '@bbb-app/hoc/toJS';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { clearFetchStoreData } from '@bbb-app/actions/account/favoriteStoreActions';
import {
  makeFavoriteStore,
  makeSelectProfile,
  makeSelectStoreId,
} from '@bbb-app/selectors/accountSelectors';
import { makeStoresData } from '@bbb-app/context/stores-context/makeStoresData';
import { fetchProfileData } from '@bbb-app/redux/profile-data/actions';
import { fetchFavoriteStore } from '@bbb-app/redux/favorite-store/ActionsWithSagaInjection';
import injectReducer from '@bbb-app/hoc/injectReducer';
import { updatePickupinStoreModal } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/actions';
import { makeSelectIsPickupInStoreOpen } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/PickUpInStoreModalSelectors';
import { clearStoreData } from '@bbb-app/search-stores/containers/searchStoreActions';
import { fetchStores } from '@bbb-app/search-stores/containers/ActionsWithSagaInjection';
import {
  makeStoreResults,
  makeStoreList,
  makeSearchRadius,
  makeSelectSiteId,
  makeSelectIsFetching,
  makeStoreError,
} from '@bbb-app/search-stores/containers/selectors';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import { storeDetailsSelector } from '@bbb-app/redux/store-details/selectors';
import FavouriteStoreInfo from '../../../../components/Pages/Registry/CreateRegistry/Components/FormComponents/FavouriteStoreInfo';

// ## SELECTORS ##
import { makeSelectFavStoreId } from './selectors';

import { SET_FAV_STORE_KEY } from './constants';
import reducer from './reducer';
// eslint-disable-next-line no-redeclare

const propTypes = {
  searchStore: PropTypes.func,
  fetchStore: PropTypes.func,
  updatePickupinStoreModal: PropTypes.func,
  clearStoreData: PropTypes.func,
  getProfile: PropTypes.func,
  clearProfileStoreData: PropTypes.func,
  onStoreUpdate: PropTypes.func,
  siteId: PropTypes.string,
  currentAddress: PropTypes.string,
  isStoreFetching: PropTypes.bool,
  setRegistryFavStoreSearchFlag: PropTypes.func,
  storeListById: PropTypes.any,
  storeListByAddress: PropTypes.array,
  profileData: PropTypes.object,
  profileFavoriteStore: PropTypes.any,
  storeResults: PropTypes.object,
  profileAddress: PropTypes.string,
  defaultStoreId: PropTypes.string,
  isPickupInStoreOpen: PropTypes.bool,
  userPickedStoreId: PropTypes.any,
  storeDetails: PropTypes.object,
};

const SOURCE = {
  USER_PROFILE_STORE_ID: 'userProfileSourceId',
  USER_PROFILE_ADDRESS: 'userProfileAddress',
  USER_ADDRESS_UPDATE: 'userAddressUpdate',
  USER_STORE_SEARCH: 'userStoreSearch',
  USER_CHANGE_STORE_ID: 'userStoreChange',
  DEFAULT_STORE_ID: 'defaultStoreId',
};
export class RegistryFavoriteStore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.searchStoreAction = this.searchStoreAction.bind(this);
    this.setFavoriteStoreById = this.setFavoriteStoreById.bind(this);
    this.setFavoriteStoreByAddress = this.setFavoriteStoreByAddress.bind(this);
    this.getFavoriteStoreByAddress = this.getFavoriteStoreByAddress.bind(this);
    this.getFavoriteStoreById = this.getFavoriteStoreById.bind(this);
    this.changeStoreAction = this.changeStoreAction.bind(this);
    this.openStoreModalOnNoResult = this.openStoreModalOnNoResult.bind(this);
    this.prePopulateStore = this.prePopulateStore.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.getFilterId = this.getFilterId.bind(this);
    this.source = '';
    this.currentProfileId = null;
    this.isChangeStore = false;
    this.isSetFromProfileData = false;
    this.state = {
      favoriteStoreId: null,
      selectedStoreId: null,
      selectedStoreAddress: '',
      showFavStoreInputErr: false,
    };
    this.isSearchStore = false;
  }

  componentWillReceiveProps(nextProps) {
    const {
      storeListById,
      storeListByAddress,
      currentAddress,
      profileData,
      profileFavoriteStore,
      storeResults,
      profileAddress,
      defaultStoreId,
      isPickupInStoreOpen,
      userPickedStoreId,
      isStoreFetching,
      storeDetails,
    } = nextProps;

    /**
     * If user manually change the store than it should have highest priority
     */

    if (!isEmpty(userPickedStoreId)) {
      this.getFavoriteStoreById(userPickedStoreId, SOURCE.USER_CHANGE_STORE_ID);
    }

    if (isEmpty(userPickedStoreId) && !isEmpty(storeDetails.storeId)) {
      this.getFavoriteStoreById(storeDetails.storeId, SOURCE.DEFAULT_STORE_ID);
    }

    /**
     * if user update the address than populate that address.
     */
    if (
      this.props.currentAddress !== currentAddress &&
      !isEmpty(currentAddress) &&
      !this.isChangeStore
    ) {
      this.getFavoriteStoreByAddress(
        currentAddress,
        SOURCE.USER_ADDRESS_UPDATE
      );
    }

    if (
      isEmpty(userPickedStoreId) &&
      isEmpty(storeDetails.storeId) &&
      !isEmpty(defaultStoreId)
    ) {
      this.getFavoriteStoreById(defaultStoreId, SOURCE.DEFAULT_STORE_ID);
    }

    /* if user doesn't have currentAddress and doesn't change favorite store
     * than pre populate profile favorite store if profile favorite store doesn't
     * exist than pre populate it from default profile address
     */
    if (
      isEmpty(userPickedStoreId) &&
      isEmpty(currentAddress) &&
      isEmpty(defaultStoreId) &&
      !this.isSetFromProfileData
    ) {
      this.prePopulateStore(profileFavoriteStore, profileAddress, profileData);
    }

    if (!isPickupInStoreOpen) {
      this.isChangeStore = false;
    }
    if (this.isSearchStore && isEmpty(userPickedStoreId)) {
      this.source = SOURCE.USER_STORE_SEARCH;
    }
    // Set Store
    this.setStore(
      this.source,
      storeListById,
      storeListByAddress,
      storeResults,
      isStoreFetching
    );

    // reset source once seach store call has finished.
    if (this.props.isStoreFetching && !isStoreFetching) {
      this.source = '';
    }
  }

  onStoreChange() {
    this.props.onStoreUpdate(this.state.favoriteStoreId);
  }

  /**
   * Populate user profile data in store for logged in user
   *
   * if user is logged in and user address data and favorite store info
   * is not yet populated in store than make a call to populate this info.
   * Making call to API only once as there can be case where user doesn't
   * set his favorite store or default address.
   *
   * @param {String} profileId user profileId
   */
  getProfileData(profileId) {
    if (
      !isEmpty(profileId) &&
      profileId !== this.currentProfileId &&
      isUserLoggedIn()
    ) {
      this.props.getProfile(profileId);
      this.currentProfileId = profileId;
    }
  }

  /**
   * Function to dispatch fetchStore action to populate store by storeId
   *
   * Make a API call to fetch store info by storeId only if storeId is present
   * and store info for this storeId is not already fetched
   *
   * @param {String} storeId valid store id of present store
   */
  getFavoriteStoreById(storeId, source) {
    if (storeId !== this.state.favoriteStoreId) {
      this.source = source;
      this.setState({
        selectedStoreId: storeId,
      });
      this.props.fetchStore(storeId);
    }
  }

  getFilterId() {
    const { siteId } = this.props;
    const stores = makeStoresData();
    const configArray = stores.map(configObj => {
      if (configObj.siteId === siteId) {
        return configObj.key;
      }
      return null;
    });

    return configArray.filter(val => val);
  }

  /**
   * Function to dispatch searchStore action to populate store by storeAddress
   *
   * make a API call and fetch store info from store address only if storeAddress
   * is present and store info for this storeAddress is not already fetched
   *
   * @param {String} storeAddress store address should be a valid city and state or zip
   */
  getFavoriteStoreByAddress(storeAddress, source) {
    const filterId = this.getFilterId();
    if (storeAddress !== this.state.selectedStoreAddress) {
      this.source = source;
      this.setState({
        selectedStoreAddress: storeAddress,
      });
      this.props.searchStore({
        address: storeAddress,
        radius: pathOr('25', 'searchRadius.default', this.props),
        filter: filterId,
      });
    }
  }

  setStore(
    source,
    storeListById,
    storeListByAddress,
    storeResults,
    isStoreFetching
  ) {
    // set store only if source is in valid source
    switch (source) {
      case SOURCE.USER_PROFILE_STORE_ID:
      case SOURCE.USER_CHANGE_STORE_ID:
      case SOURCE.DEFAULT_STORE_ID:
        this.setState({ showFavStoreInputErr: false });
        this.setFavoriteStoreById(storeListById);
        this.isChangeStore = false;
        break;
      case SOURCE.USER_ADDRESS_UPDATE:
      case SOURCE.USER_PROFILE_ADDRESS:
        this.setState({ showFavStoreInputErr: false });
        this.setFavoriteStoreByAddress(
          storeListByAddress,
          storeResults,
          isStoreFetching
        );
        break;
      case SOURCE.USER_STORE_SEARCH:
        this.setState({ showFavStoreInputErr: true });
        this.setFavoriteStoreByAddress(storeListByAddress);
        this.openStoreModalOnNoResult(storeResults, isStoreFetching);
        break;
      default:
        break;
    }
  }

  setFavoriteStoreById(storeListById) {
    if (!isEmpty(storeListById)) {
      const nearestStore = storeListById[0];
      const currentStoreId = pathOr(null, 'storeInfo.RecordId', this.state);
      if (currentStoreId !== nearestStore.storeId) {
        this.setState(
          {
            storeInfo: { ...nearestStore, RecordId: nearestStore.storeId },
            favoriteStoreId: nearestStore.storeId,
          },
          () => {
            this.onStoreChange();
            this.props.clearProfileStoreData();
          }
        );
      }
    }
  }

  setFavoriteStoreByAddress(storeListByAddress, storeResults, isStoreFetching) {
    if (!isEmpty(storeListByAddress) && !this.isChangeStore) {
      const nearestStore = storeListByAddress[0];
      const currentStoreId = pathOr(null, 'storeInfo.RecordId', this.state);
      if (currentStoreId !== nearestStore.RecordId) {
        this.setState(
          {
            storeInfo: nearestStore,
            favoriteStoreId: nearestStore.RecordId,
          },
          () => {
            this.onStoreChange();
            this.props.clearStoreData();
          }
        );
      }
    } else if (
      storeResults &&
      storeResults.resultsCount === 0 &&
      !isStoreFetching
    ) {
      this.setState(
        {
          storeInfo: null,
          favoriteStoreId: null,
        },
        () => {
          this.onStoreChange();
          this.props.clearStoreData();
        }
      );
    }
  }

  prePopulateStore(profileFavoriteStore, profileAddress, profileData) {
    const profileFavouriteStoreId = pathOr(
      null,
      'userSiteItems.favouriteStoreId',
      profileFavoriteStore
    );
    const profileId = pathOr(null, 'repositoryId', profileData);
    if (!isEmpty(profileFavouriteStoreId)) {
      this.getFavoriteStoreById(
        profileFavouriteStoreId,
        SOURCE.USER_PROFILE_STORE_ID
      );
    } else if (!isEmpty(profileAddress)) {
      this.getFavoriteStoreByAddress(
        profileAddress,
        SOURCE.USER_PROFILE_ADDRESS
      );
    } else {
      this.getProfileData(profileId);
    }
  }

  openStoreModalOnNoResult(storeResults, isStoreFetching) {
    if (
      !this.isChangeStore &&
      storeResults &&
      storeResults.resultsCount === 0 &&
      !isStoreFetching &&
      this.source === SOURCE.USER_STORE_SEARCH
    ) {
      this.isChangeStore = true;
      this.props.updatePickupinStoreModal();
    }
  }

  searchStoreAction(address) {
    this.isSearchStore = true;
    this.getFavoriteStoreByAddress(address, SOURCE.USER_STORE_SEARCH);
  }

  changeStoreAction(args) {
    this.isChangeStore = true;
    if (this.state.selectedStoreAddress) {
      this.props.setRegistryFavStoreSearchFlag(true);
    }
    this.props.updatePickupinStoreModal(args);
  }

  render() {
    return (
      <ErrorBoundary>
        <FavouriteStoreInfo
          storeId={this.state.favoriteStoreId}
          storeInfo={this.state.storeInfo}
          onSearchStore={this.searchStoreAction}
          onChangeStore={this.changeStoreAction}
          showFavStoreInputErr={this.state.showFavStoreInputErr}
          {...this.props}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profileFavoriteStore: makeSelectStoreId(),
  storeListById: makeFavoriteStore(),
  storeListByAddress: makeStoreList(),
  storeResults: makeStoreResults(),
  storeError: makeStoreError(),
  profileData: makeSelectProfile(),
  searchRadius: makeSearchRadius(),
  siteId: makeSelectSiteId(),
  userPickedStoreId: makeSelectFavStoreId(),
  isPickupInStoreOpen: makeSelectIsPickupInStoreOpen(),
  isMobile: state => state.getIn(['mobileScreen', 'isMobileScreen']),
  isStoreFetching: makeSelectIsFetching(),
  storeDetails: storeDetailsSelector,
});

export const matchDispatchToProps = dispatch => {
  return {
    getProfile: customerId => dispatch(fetchProfileData(customerId)),
    fetchStore: storeId => dispatch(fetchFavoriteStore(storeId)),
    searchStore: data => dispatch(fetchStores(data)),
    updatePickupinStoreModal: args => dispatch(updatePickupinStoreModal(args)),
    clearStoreData: () => dispatch(clearStoreData()),
    clearProfileStoreData: () => dispatch(clearFetchStoreData()),
  };
};

RegistryFavoriteStore.propTypes = propTypes;

const withConnect = connect(mapStateToProps, matchDispatchToProps);
const withReducer = injectReducer({
  key: SET_FAV_STORE_KEY,
  reducer,
});

export default compose(withConnect, withReducer)(toJS(RegistryFavoriteStore));
