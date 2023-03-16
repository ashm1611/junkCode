import { createSelector } from 'reselect';
import { Iterable, Map } from 'immutable';
import { GIFT_REGISTRIES_DETAILS_STATE_KEY } from '@bbb-app/constants/registryConstants';
import { MYFUNDS_STATE_KEY } from '@bbb-app/constants/state-keys/accountStateKeys';
import {
  REGISTRY_DETAILS_STATE_KEY,
  REGISTRY_OWNER_ITEMS_STATE_KEY,
} from './constants';

export const registryList = state =>
  state.get(GIFT_REGISTRIES_DETAILS_STATE_KEY, Map());

export const selectRegistryOwnerItems = state =>
  state.get(REGISTRY_OWNER_ITEMS_STATE_KEY, Map());

export const getRegistryDetails = state =>
  state.get(REGISTRY_DETAILS_STATE_KEY, Map());

export const getRegistryEditData = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('editRegistryData')
  );

export const getFilterCount = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('filterCount')
  );

export const makeSelectEditRegistryFromMoreInfoBtn = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('isEditRegistryFromMoreInfoBtn')
  );

export const getShowChecklist = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('showChecklist')
  );

export const getTYMData = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('tymData')
  );

export const selectCloseModalFlag = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('closeOtherModal')
  );

export const makeSelectOwnerFirstCategoryList = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('firstCategorydata')
  );
};
export const makeSelectUpdatedSkuId = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('updatedSkuId')
  );
};

export const selectIsItemDeleted = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isItemDeleted')
  );
};

export const makeSelectSortedBy = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('variation')
  );
};

export const getSiteSpectDateSort = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('siteSpectDateSort')
  );
};

export const getItemsFetchingStatus = () =>
  createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isItemsFetching')
  );

export const isFilterItemReady = () =>
  createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isFilterItemReady')
  );

export const getRemainingItemFetchingStatus = () =>
  createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isRemainingItemFetching')
  );

export const isSocialAnnexReady = () =>
  createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isSocialAnnexReady')
  );

export const makeAkamaiInfo = () => {
  const akamaiSelector = state => state.getIn(['akamaiHeader', 'data']);
  return createSelector(akamaiSelector, akamaiData => {
    return akamaiData;
  });
};

export const makeSelectInactivityModalReset = () =>
  createSelector(getRegistryDetails, details =>
    details.get('inactivityModalReset')
  );

export const makeSelectActiveRegistryCallFlag = () =>
  createSelector(getRegistryDetails, details =>
    details.get('activeRegistryCallFlag')
  );

export const makeSelectOwnerFirstCategoryError = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('error')
  );
};

export const makeSelectOwnerRemainingCategoryError = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('remainingCategoryError')
  );
};

const routeDetails = state => {
  return state.get('route');
};

export const makeRouteData = () =>
  createSelector(routeDetails, routeData => {
    return routeData;
  });

export const selectQuickItemAdded = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isQuickitemAddedTS')
  );
};

export const getIsPriceFetching = () =>
  createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('isPriceItemFetching')
  );

export const getIsFromReplace = () =>
  createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('fromReplace')
  );
const getAddToCartState = state => state.get('addToCart', Map());

export const makeSelectCartDataIsFetching = () => {
  return createSelector(getAddToCartState, productDetailsState =>
    productDetailsState.get('isFetching', false)
  );
};

export const makeSelectOwnerRemainingCategoryTotalPrice = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem => {
    const regItem = registryOwnerItem.get('firstCategorydata');
    if (regItem && Iterable.isIterable(regItem)) {
      return regItem.getIn([1, 'itemsTotalPrice'], '');
    }
    return '';
  });
};

export const selectTrackFlag = () =>
  createSelector(
    getRegistryDetails,
    registryDetails => !!registryDetails.get('trackFlag')
  );

export const registryPromotionState = state =>
  state.get('registryPromotions', Map());

export const makeRfTrackerVisibilityStatus = () =>
  createSelector(registryPromotionState, rfTrackerStatus =>
    rfTrackerStatus.get('rfTrackerEventSent')
  );

export const getSelectedCheckBoxFilter = () => {
  return createSelector(selectRegistryOwnerItems, registryCopied => {
    return registryCopied.get('checkBoxState');
  });
};

export const isRegistrantDetailModalOpen = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem => {
    return registryOwnerItem.get('isRegistrantDetailModalOpen');
  });
};

export const isGoodyBoxModalOpen = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem => {
    return registryOwnerItem.get('isGoodyBoxModalOpen');
  });
};

export const selectMyFundsDetails = state => {
  return state.getIn([MYFUNDS_STATE_KEY], Map());
};

export const selectMyFundsDetailsData = () => {
  return createSelector(selectMyFundsDetails, myFundsState =>
    myFundsState.get('data', null)
  );
};
