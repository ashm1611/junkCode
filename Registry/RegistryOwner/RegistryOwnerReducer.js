/* eslint complexity: ["error", 27]*/
import { fromJS } from 'immutable';
import {
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY,
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_SUCCESS,
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_ERROR,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_SUCCESS,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_ERROR,
  UPDATE_CATEGORY_DATA,
  RESET_IS_ITEM_FETCHING,
  ADD_REGISTRY_FROM_QUICKADD,
  REMOVE_REGISTRY_ITEM,
  REMOVE_REGISTRY_ITEM_SUCCESS,
  REMOVE_REGISTRY_ITEM_ERROR,
  UNDO_REMOVE_REGISTRY_ITEM,
  UNDO_REMOVE_REGISTRY_ITEM_SUCCESS,
  UNDO_REMOVE_REGISTRY_ITEM_ERROR,
  MARK_FAV_REGISTRY_ITEM,
  MARK_FAV_REGISTRY_ITEM_SUCCESS,
  MARK_FAV_REGISTRY_ITEM_ERROR,
  SET_FACET_DATA,
  BOPIS_CHECK_BOX,
  REGISTRANT_DETAIL_MODAL,
  GOODY_DETAIL_MODAL,
} from './constants';

export const handleRemoveRegistryItem = (
  type,
  state,
  data,
  error,
  updatedSkuId
) => {
  switch (type) {
    case REMOVE_REGISTRY_ITEM:
      return state
        .set('isFetching', true)
        .set('isItemDeleted', false)
        .set('error', null);
    case REMOVE_REGISTRY_ITEM_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('isItemDeleted', false)
        .set('updatedSkuId', updatedSkuId);
    case REMOVE_REGISTRY_ITEM_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('isItemDeleted', true)
        .set('updatedSkuId', updatedSkuId)
        .set('firstCategorydata', fromJS(data));
    default:
      return state;
  }
};

export const handleUndoRemoveRegistryItem = (
  type,
  state,
  data,
  error,
  updatedSkuId
) => {
  switch (type) {
    case UNDO_REMOVE_REGISTRY_ITEM:
      return state.set('isFetching', true).set('error', null);
    case UNDO_REMOVE_REGISTRY_ITEM_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('updatedSkuId', updatedSkuId);
    case UNDO_REMOVE_REGISTRY_ITEM_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('updatedSkuId', updatedSkuId)
        .set('firstCategorydata', fromJS(data));
    default:
      return state;
  }
};

export const handleMarkFavRegistryItem = (
  type,
  state,
  data,
  error,
  updatedSkuId
) => {
  switch (type) {
    case MARK_FAV_REGISTRY_ITEM:
      return state.set('isFetching', true).set('error', null);
    case MARK_FAV_REGISTRY_ITEM_ERROR:
      return state
        .set('isFetching', false)
        .set('error', error)
        .set('updatedSkuId', updatedSkuId);
    case MARK_FAV_REGISTRY_ITEM_SUCCESS:
      if (data) {
        return state
          .set('isFetching', false)
          .set('error', null)
          .set('updatedSkuId', updatedSkuId)
          .set('firstCategorydata', fromJS(data));
      }
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('updatedSkuId', updatedSkuId);
    default:
      return state;
  }
};

const getRemoveRegistryItemType = type => {
  const removeRegistryItemType = [
    REMOVE_REGISTRY_ITEM,
    REMOVE_REGISTRY_ITEM_SUCCESS,
    REMOVE_REGISTRY_ITEM_ERROR,
  ];
  if (removeRegistryItemType.indexOf(type) !== -1) {
    return type;
  }
  return null;
};

const getUndoRemoveRegistryItemType = type => {
  const removeRegistryItemType = [
    UNDO_REMOVE_REGISTRY_ITEM,
    UNDO_REMOVE_REGISTRY_ITEM_SUCCESS,
    UNDO_REMOVE_REGISTRY_ITEM_ERROR,
  ];
  if (removeRegistryItemType.indexOf(type) !== -1) {
    return type;
  }
  return null;
};

const getMarkFavRegistryItemType = type => {
  const removeRegistryItemType = [
    MARK_FAV_REGISTRY_ITEM,
    MARK_FAV_REGISTRY_ITEM_SUCCESS,
    MARK_FAV_REGISTRY_ITEM_ERROR,
  ];
  if (removeRegistryItemType.indexOf(type) !== -1) {
    return type;
  }
  return null;
};

const itemsInitialState = fromJS({
  firstCategorydata: null,
  error: null,
  variation: '',
  isItemsFetching: true,
  isRemainingItemFetching: false,
  updatedSkuId: '',
  siteSpectDateSort: null,
  isPriceItemFetching: false,
});

export function RegistryOwnerItemsCaegoryReducer(
  state = itemsInitialState,
  {
    type,
    error,
    data,
    productObj,
    isDateSort,
    updatedSkuId,
    isRegReplace,
    isRegistrantModalOpen,
    isGoodyBoxModalOpen,
  }
) {
  let arr = [];
  switch (type) {
    case FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY:
      return state.set('isItemsFetching', true).set('isFilterItemReady', true);
    case FETCH_REGISTRY_OWNER_REMAINING_CATEGORY:
      return state
        .set('isRemainingItemFetching', true)
        .set('isSocialAnnexReady', true);

    case FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_SUCCESS:
      if (data && data.registryItemList) {
        arr.push(data);
      }
      if (isDateSort) {
        return state
          .set('isItemsFetching', false)
          .set('isFilterItemReady', true)
          .set('error', null)
          .set('firstCategorydata', fromJS(arr))
          .set('variation', 'Date');
      }
      return state
        .set('isItemsFetching', false)
        .set('error', null)
        .set('firstCategorydata', fromJS(arr))
        .set('variation', 'Category');

    case FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY_ERROR:
      return state
        .set('isItemsFetching', false)
        .set('error', error)
        .set('firstCategorydata', null)
        .set('isSocialAnnexReady', true);
    case FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_ERROR:
      return state
        .set('isRemainingItemFetching', false)
        .set('remainingCategoryError', error)
        .set('isSocialAnnexReady', true);
    case FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_SUCCESS:
      arr = state.get('firstCategorydata').toJS();
      if (isDateSort) {
        const arrDate = arr[0].registryItemList.concat(
          Object.values(data.atgResponse.JDAAllCategoryBucket.registryItemList)
        );
        arr[0].registryItemList = arrDate;
      } else {
        arr = arr.concat(Object.values(data.atgResponse));
      }
      return state
        .set('isRemainingItemFetching', false)
        .set('fromReplace', isRegReplace)
        .set('firstCategorydata', fromJS(arr));
    case UPDATE_CATEGORY_DATA:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('updatedSkuId', updatedSkuId)
        .set('firstCategorydata', fromJS(productObj));

    case getRemoveRegistryItemType(type):
      return handleRemoveRegistryItem(type, state, data, error, updatedSkuId);
    case getUndoRemoveRegistryItemType(type):
      return handleUndoRemoveRegistryItem(
        type,
        state,
        data,
        error,
        updatedSkuId
      );
    case getMarkFavRegistryItemType(type):
      return handleMarkFavRegistryItem(type, state, data, error, updatedSkuId);
    case RESET_IS_ITEM_FETCHING:
      return state.set('isItemsFetching', true).set('firstCategorydata', null);
    case ADD_REGISTRY_FROM_QUICKADD:
      return state.set('isQuickitemAddedTS', Date.now());
    case SET_FACET_DATA:
      return state.set('facetsData', data);
    case BOPIS_CHECK_BOX:
      return state.set('checkBoxState', data);
    case REGISTRANT_DETAIL_MODAL:
      return state
        .set('isRegistrantDetailModalOpen', isRegistrantModalOpen)
        .set('registrantModalData', data);
    case GOODY_DETAIL_MODAL:
      return state.set('isGoodyBoxModalOpen', isGoodyBoxModalOpen);
    case 'BBB/CLOSE_MODAL':
      return state
        .set('isRegistrantDetailModalOpen', false)
        .set('registrantModalData', undefined)
        .set('isGoodyBoxModalOpen', false);
    case '@@router/LOCATION_CHANGE':
      return state
        .set('isRegistrantDetailModalOpen', false)
        .set('registrantModalData', undefined);
    default:
      return state;
  }
}

export default RegistryOwnerItemsCaegoryReducer;
