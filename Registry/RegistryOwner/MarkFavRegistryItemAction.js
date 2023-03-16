import {
  injectReducerInStore,
  injectSagaInStore,
} from '@bbb-app/utils/asyncInjectors';
import {
  MARK_FAV_REGISTRY_ITEM,
  MARK_FAV_REGISTRY_ITEM_SAGA_KEY,
  REGISTRY_OWNER_ITEMS_STATE_KEY,
} from './constants';
import reducer from './RegistryOwnerReducer';
import saga from './MarkFavRegistryItemSaga';

function injectSagaAndReducer() {
  injectReducerInStore({ key: REGISTRY_OWNER_ITEMS_STATE_KEY, reducer });
  injectSagaInStore({ key: MARK_FAV_REGISTRY_ITEM_SAGA_KEY, saga });
}
export function markFavRegistryItem(productInfo, productData, updatedSkuId) {
  injectSagaAndReducer();
  return {
    type: MARK_FAV_REGISTRY_ITEM,
    productInfo,
    productData,
    updatedSkuId,
  };
}
