/* eslint max-lines:["error", 1106] */
import { put, takeLatest } from 'redux-saga/effects';
import sinon from 'sinon';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import * as ExperienceUtils from '@bbb-app/utils/experience';
import { PAGE_NAME_REGISTRY_OWNER_HOME } from '@bbb-app/constants/route/route';
import {
  FETCH_REGISTRY_DATA,
  DEFAULT_ERROR_MESSAGE,
  FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY,
  MARK_FAV_REGISTRY_ITEM,
  MAKE_ACTIVE_REGISTRY_CALL,
  UNDO_REMOVE_REGISTRY_ITEM,
  REMOVE_REGISTRY_ITEM,
} from '../constants';
import {
  fetchRegistryDataError,
  fetchRegistryOwnerItemsFirstCategorySuccess,
  fetchRegistryOwnerItemsFirstCategoryError,
  fetchRegistryOwnerRemainingCategorySuccess,
  fetchRegistryOwnerRemainingCategoryError,
  markFavRegistryItemSuccess,
  markFavRegistryItemError,
  updateRemoveItemData,
  removeRegistryItemSuccess,
  removeRegistryItemError,
  undoRemoveRegistryItemSuccess,
  undoRemoveRegistryItemError,
  fetchRegistryDataSuccess,
  initiateInactivityModal,
  activeRegistryCallSuccess,
  activeRegistryCallError,
  setFacetData,
} from '../actions';
import { putActiveRegistryStaticFlag } from '../../../../InteractiveChecklist/actions';
import {
  registryDetailsSaga,
  getRegistryDetails,
  fetchRegistryOwnerItemsFirstCatory,
  fetchRegistryOwnerItemsSaga,
  fetchRegistryOwnerRemainingCatory,
  fetchRegistryOwnerItemsRemainingSaga,
  removeRegistryItem,
  undoRemoveRegistryItem,
  activeRegistryCall,
  inactivityModalSaga,
  undoRemoveRegistryItemSaga,
  removeRegistryItemSaga,
  getProductIds,
  getContentParams,
  updateFacetData,
} from '../sagas';
import {
  markFavRegistryItem,
  markFavRegistryItemSaga,
} from '../MarkFavRegistryItemSaga';
import * as formatFacetFiltersUtils from '../../../../../components/Pages/Registry/utils/formatFacetFilters';

describe('Remove registry item saga', () => {
  describe('#removeRegistryItemSaga Listener', () => {
    let getRemoveRegistryItemGenerator;
    beforeEach(() => {
      getRemoveRegistryItemGenerator = removeRegistryItemSaga();
    });

    it('should start task to watch for REMOVE_REGISTRY_ITEM action', () => {
      const takeLatestDescriptor = getRemoveRegistryItemGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(REMOVE_REGISTRY_ITEM, removeRegistryItem)
      );
    });
  });
  describe('#removeRegistryItem saga', () => {
    let getRemoveRegistryItemGenerator;
    const updatedSkuId = '';
    beforeEach(() => {
      const data = {
        productInfo: {
          skuId: 107348,
          updateRegistryId: 12345678,
          productId: 12345678,
          regItemOldQty: 1,
          rowId: 'APO9089H',
          itemTypes: '',
          regType: 'Wedding',
          refNum: '',
          ltlDeliveryServices: '',
          regItemOldPurchasedQty: 3,
        },
        productData: [{ hasDiaperFund: false, itemCount: false }],
        updatedSkuId,
      };
      getRemoveRegistryItemGenerator = removeRegistryItem(data);
      getRemoveRegistryItemGenerator.next();
      getRemoveRegistryItemGenerator.next();
    });
    it('should dispatch the "removeRegistryItem" action for success response one', () => {
      const data = false;
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data: false,
        },
      };
      getRemoveRegistryItemGenerator.next(response);
      const putDescriptor = getRemoveRegistryItemGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(putActiveRegistryStaticFlag(data))
      );
    });
    it('should dispatch the "updateGiftData" action for success response', () => {
      const requestedQuantity = 1;
      const purchasedQuantity = 3;
      const isItemDeleted = false;
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data: {
            requestedQuantity: 1,
            purchasedQuantity: 3,
            isItemDeleted,
          },
        },
      };
      getRemoveRegistryItemGenerator.next(response);
      getRemoveRegistryItemGenerator.next();
      const putDescriptor = getRemoveRegistryItemGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(
          updateRemoveItemData(
            requestedQuantity,
            purchasedQuantity,
            isItemDeleted
          )
        )
      );
    });
    it('should dispatch the "removeRegistryItemSuccess" action for success response one', () => {
      const data = [{ hasDiaperFund: false, itemCount: false }];
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      getRemoveRegistryItemGenerator.next(response);
      getRemoveRegistryItemGenerator.next(response);
      getRemoveRegistryItemGenerator.next(response);
      getRemoveRegistryItemGenerator.next(response);
      const putDescriptor = getRemoveRegistryItemGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(removeRegistryItemSuccess(data, updatedSkuId))
      );
    });
    it('should dispatch the "removeRegistryItemError" action for error response', () => {
      const error = new Error(DEFAULT_ERROR_MESSAGE);
      const response = { body: error };
      const putDescriptor = getRemoveRegistryItemGenerator.throw(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(removeRegistryItemError(DEFAULT_ERROR_MESSAGE, updatedSkuId))
      );
    });
    it('should dispatch the "removeRegistryItemError" action for actual error response', () => {
      const errorMessages = {
        message: 'Invalid or Missing _dynSessConf in request Heaader.',
      };
      const response = {
        body: {
          data: null,
          serviceStatus: 'ERROR',
          errorMessages: {
            message: 'Invalid or Missing _dynSessConf in request Heaader.',
          },
        },
      };
      const putDescriptor = getRemoveRegistryItemGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(removeRegistryItemError(errorMessages, updatedSkuId))
      );
    });
  });
});
describe('Undo Remove Registry item saga', () => {
  describe('#undoRemoveRegistryItem Listener', () => {
    let getUndoRemoveRegistryItemGenerator;
    beforeEach(() => {
      getUndoRemoveRegistryItemGenerator = undoRemoveRegistryItemSaga();
    });

    it('should start task to watch for UNDO_REMOVE_REGISTRY_ITEM action', () => {
      const takeLatestDescriptor = getUndoRemoveRegistryItemGenerator.next()
        .value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(UNDO_REMOVE_REGISTRY_ITEM, undoRemoveRegistryItem)
      );
    });
  });
  describe('#undoRemoveRegistryItem saga', () => {
    let getUndoRemoveRegistryItemGenerator;
    const updatedSkuId = '';
    const customerData = { customerId: '1111' };
    const registryData = {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Wedding',
          registryId: '520648448',
          giftRegistered: 3,
          giftPurchased: 4,
        },
      },
    };
    beforeEach(() => {
      const data = {
        productInfo: {
          skuId: 107348,
          updateRegistryId: 12345678,
          productId: 12345678,
          regItemOldQty: 1,
          rowId: 'APO9089H',
          itemTypes: '',
          regType: 'Wedding',
          refNum: '',
          ltlShipMethodDesc: '',
          qtyRequested: 3,
          qtyPurchased: 1,
          sKUDetailVO: {
            skuId: '111',
            parentProdId: '111',
            personalizationType: 'N',
          },
        },
        productData: [{ hasDiaperFund: false, itemCount: false }],
        updatedSkuId,
      };
      getUndoRemoveRegistryItemGenerator = undoRemoveRegistryItem(data);
      getUndoRemoveRegistryItemGenerator.next();
      getUndoRemoveRegistryItemGenerator.next(customerData);
      getUndoRemoveRegistryItemGenerator.next(registryData);
    });
    it('should dispatch the "undoRemoveRegistryItem" action for success response', () => {
      const data = false;
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data: {
            component: {
              statusFilter: '',
              priceFilter: '',
              categoryFilter: '',
            },
          },
        },
      };
      getUndoRemoveRegistryItemGenerator.next(response);
      const putDescriptor = getUndoRemoveRegistryItemGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(putActiveRegistryStaticFlag(data))
      );
    });

    it('should dispatch the "updateRegistryData" action for success response', () => {
      const requestedQuantity = 3;
      const purchasedQuantity = 1;
      const isUndoItem = true;
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data: {
            requestedQuantity,
            purchasedQuantity,
            isUndoItem,
          },
        },
      };
      getUndoRemoveRegistryItemGenerator.next(response);
      getUndoRemoveRegistryItemGenerator.next(response);
      const putDescriptor = getUndoRemoveRegistryItemGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(
          updateRemoveItemData(requestedQuantity, purchasedQuantity, isUndoItem)
        )
      );
    });
    it('should dispatch the "removeRegistryItemSuccess" action for success response', () => {
      const data = [{ hasDiaperFund: false, itemCount: false }];
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      getUndoRemoveRegistryItemGenerator.next(response);
      getUndoRemoveRegistryItemGenerator.next(response);
      getUndoRemoveRegistryItemGenerator.next(response);
      const putDescriptor = getUndoRemoveRegistryItemGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(undoRemoveRegistryItemSuccess(data, updatedSkuId))
      );
    });
    it('should dispatch the "undoRegistryItemError" action for error response', () => {
      const error = new Error(DEFAULT_ERROR_MESSAGE);
      const response = { body: error };
      const putDescriptor = getUndoRemoveRegistryItemGenerator.throw(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(undoRemoveRegistryItemError(DEFAULT_ERROR_MESSAGE, updatedSkuId))
      );
    });
    it('should dispatch the "undoRemoveRegistryItem" action for actual error response', () => {
      const errorMessages = {
        message: 'Invalid or Missing _dynSessConf in request Heaader.',
      };
      const response = {
        body: {
          data: null,
          serviceStatus: 'ERROR',
          errorMessages: {
            message: 'Invalid or Missing _dynSessConf in request Heaader.',
          },
        },
      };
      const putDescriptor = getUndoRemoveRegistryItemGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(removeRegistryItemError(errorMessages, updatedSkuId))
      );
    });
  });
});
describe('Mark/UnMark Fav registry item saga', () => {
  describe('#MarkUnMarkFavregistryItem saga', () => {
    let getMarkFavRegistryItemGenerator;
    const updatedSkuId = '';
    beforeEach(() => {
      const productInfo = {};
      const productData = [];
      getMarkFavRegistryItemGenerator = markFavRegistryItem({
        productInfo,
        productData,
        updatedSkuId,
      });
      getMarkFavRegistryItemGenerator.next();
      getMarkFavRegistryItemGenerator.next();
    });
    it('should dispatch the "markFavRegistryItemSuccess" action for success response', () => {
      const data = [];
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: 'error',
        },
      };

      const putDescriptor = getMarkFavRegistryItemGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(markFavRegistryItemSuccess(data, updatedSkuId))
      );
    });
    it('should dispatch the "markFavRegistryItemError" action for Error response', () => {
      const error = new Error();
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: error,
        },
      };

      const putDescriptor = getMarkFavRegistryItemGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(markFavRegistryItemError(error, updatedSkuId))
      );
    });
    it('should dispatch the "markFavRegistryItemError" action for Actual error response', () => {
      const error = new Error(DEFAULT_ERROR_MESSAGE);
      const response = { body: error };
      const putDescriptor = getMarkFavRegistryItemGenerator.throw(response)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(markFavRegistryItemError(DEFAULT_ERROR_MESSAGE, updatedSkuId))
      );
    });
  });
  describe('#MarkUnMarkFavregistryItem saga for favTealiumData', () => {
    let getMarkFavRegistryItemGenerator;
    const updatedSkuId = '';

    beforeEach(() => {
      const productInfo = {
        markAsFav: 'Y',
      };
      const productData = {
        favTealiumData: 'Y',
      };
      getMarkFavRegistryItemGenerator = markFavRegistryItem({
        productInfo,
        productData,
        updatedSkuId,
      });
      getMarkFavRegistryItemGenerator.next();
      getMarkFavRegistryItemGenerator.next();
    });

    it('should dispatch the "triggerTealiumEvent" action for favTealiumData', () => {
      const productData = {
        favTealiumData: 'Y',
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: 'error',
          data: {
            favTealiumData: 'Y',
          },
        },
      };
      const putDescriptor = getMarkFavRegistryItemGenerator.next(response)
        .value;
      const pageName = {
        page_name: 'add to favorites',
        page_type: 'Registry',
      };
      expect(putDescriptor).to.deep.equal(
        put(
          triggerTealiumEvent(
            'add to favorites',
            productData.favTealiumData,
            pageName
          )
        )
      );
    });
  });
  describe('#MarkUnMarkFavregistryItem saga for initiateInactivityModal action', () => {
    let getMarkFavRegistryItemGenerator;

    beforeEach(() => {
      const productInfo = {};
      const productData = [];
      getMarkFavRegistryItemGenerator = markFavRegistryItem({
        productInfo,
        productData,
      });
    });
    it('should dispatch the "initiateInactivityModal" action for success response', () => {
      const data = true;
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: 'error',
          inactivityModalState: true,
        },
      };
      const putDescriptor = getMarkFavRegistryItemGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(put(initiateInactivityModal(data)));
    });
  });
  describe('#markFavRegistryItemSaga saga', () => {
    let markFavRegistryItemSagaGenerator;

    beforeEach(() => {
      markFavRegistryItemSagaGenerator = markFavRegistryItemSaga();
    });

    it('should start a task to watch for "MARK_FAV_REGISTRY_ITEM" action', () => {
      const takeLatestDescriptor = markFavRegistryItemSagaGenerator.next()
        .value;

      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(MARK_FAV_REGISTRY_ITEM, markFavRegistryItem)
      );
    });
  });
});
describe('Create registry owner saga', () => {
  describe('#getRegistryDetails Saga', () => {
    let getRegistryDetailsGenerator;
    beforeEach(() => {
      const payload = { registryId: '12345' };
      getRegistryDetailsGenerator = getRegistryDetails(payload);
      getRegistryDetailsGenerator.next(true);
    });
    it('should dispatch the "fetchRegistryDataError" action for error response', () => {
      const response = {
        body: {
          serviceStatus: 'PARTIAL_SUCCESS',
          errorMessages: { message: 'Partial Error' },
        },
      };
      getRegistryDetailsGenerator.next(true);
      const putDescriptor = getRegistryDetailsGenerator.throw(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryDataError(response.body))
      );
    });
    it('should dispatch the "fetchRegistryDataError" action for actual error response', () => {
      const errorMessages = {
        message: 'Invalid or Missing _dynSessConf in request Heaader.',
      };
      const response = {
        body: {
          data: null,
          serviceStatus: 'ERROR',
          errorMessages: {
            message: 'Invalid or Missing _dynSessConf in request Heaader.',
          },
        },
      };
      getRegistryDetailsGenerator.next();
      const putDescriptor = getRegistryDetailsGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryDataError(errorMessages))
      );
    });
    it('should dispatch the "fetchRegistryDataSuccess" action for success response', () => {
      const myRegistriesInfo = {
        atgResponse: {
          hasRegistries: true,
        },
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: { message: '' },
          data: myRegistriesInfo,
        },
      };
      getRegistryDetailsGenerator.next();
      const putDescriptor = getRegistryDetailsGenerator.next(response).value;

      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryDataSuccess(myRegistriesInfo))
      );
    });
    it('should dispatch the "fetchRegistryDataError" action for success response with error', () => {
      const myRegistriesInfo = {
        atgResponse: {
          hasRegistries: true,
        },
      };
      const errorMessages = [{ code: '123', message: 'error' }];
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages,
          data: myRegistriesInfo,
        },
      };
      getRegistryDetailsGenerator.next();
      const putDescriptor = getRegistryDetailsGenerator.next(response).value;

      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryDataError(errorMessages))
      );
    });
  });
  describe('#getRegistryDetails Saga Error', () => {
    it('should dispatch the "fetchRegistryDataError" action for actual error response', () => {
      const payload = { registryId: '' };
      const getRegistryDetailsGenerator = getRegistryDetails(payload);
      const putDescriptor = getRegistryDetailsGenerator.next().value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryDataError(DEFAULT_ERROR_MESSAGE))
      );
    });
  });
  describe('#registryDetailsSaga Saga', () => {
    let getRegistriesDetailsGenerator;

    beforeEach(() => {
      getRegistriesDetailsGenerator = registryDetailsSaga();
    });

    it('should start task to watch for FETCH_REGISTRY_DATA action', () => {
      const takeLatestDescriptor = getRegistriesDetailsGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_REGISTRY_DATA, getRegistryDetails)
      );
    });
  });
});
describe('fetchRegistryOwnerItemsFirst', () => {
  describe('#fetchRegistryOwnerItemsFirstCatory Saga', () => {
    let fetchRegistryOwnerItemsFirstCatoryGenerator;
    beforeEach(() => {
      const registryId = '12345';
      const eventTypeCode = 'BRI';
      const eventDate = '11/11/2018';

      fetchRegistryOwnerItemsFirstCatoryGenerator = fetchRegistryOwnerItemsFirstCatory(
        registryId,
        eventTypeCode,
        eventDate
      );
      fetchRegistryOwnerItemsFirstCatoryGenerator.next();
      fetchRegistryOwnerItemsFirstCatoryGenerator.next();
    });

    it('should dispatch the "fetchRegistryOwnerItemsFirstCategorySuccess" action for success response', () => {
      const data = {
        registryItemList: [
          {
            productURL: '/product/1043614165?skuId=43614165',
            qtyFulfilled: 0,
          },
        ],
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      const putDescriptor = fetchRegistryOwnerItemsFirstCatoryGenerator.next(
        response
      ).value;
      fetchRegistryOwnerItemsFirstCatoryGenerator.next();
      fetchRegistryOwnerItemsFirstCatoryGenerator.next();
      fetchRegistryOwnerItemsFirstCatoryGenerator.next();
      fetchRegistryOwnerItemsFirstCatoryGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOwnerItemsFirstCategorySuccess(data))
      );
    });

    it('should dispatch the "fetchRegistryOwnerItemsFirstCategorySuccess" action for Error response', () => {
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: {
            message: 'Error',
          },
        },
      };
      const putDescriptor = fetchRegistryOwnerItemsFirstCatoryGenerator.next(
        response
      ).value;
      fetchRegistryOwnerItemsFirstCatoryGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOwnerItemsFirstCategoryError('Error'))
      );
    });

    it('should dispatch the "fetchRegistryOwnerItemsFirstCategoryError" action for error response', () => {
      const error = new Error(DEFAULT_ERROR_MESSAGE);
      const response = { body: error };
      const putDescriptor = fetchRegistryOwnerItemsFirstCatoryGenerator.throw(
        response
      ).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOwnerItemsFirstCategoryError(error))
      );
    });
  });
  describe('#fetchRegistryOwnerItemsSaga Saga', () => {
    let fetchRegistryOwnerItemsSagaGenerator;
    beforeEach(() => {
      fetchRegistryOwnerItemsSagaGenerator = fetchRegistryOwnerItemsSaga();
    });
    it('should start task to watch for FETCH_REGISTRY_DATA action', () => {
      const takeLatestDescriptor = fetchRegistryOwnerItemsSagaGenerator.next()
        .value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(
          FETCH_REGISTRY_OWNER_ITEMS_FIRST_CATEGORY,
          fetchRegistryOwnerItemsFirstCatory
        )
      );
    });
  });
});
describe('fetchRegistryOwnerRemaining', () => {
  describe('#fetchRegistryOwnerRemainingCatory Saga', () => {
    let fetchRegistryOwnerRemainingCatoryGenerator;
    beforeEach(() => {
      const registryId = '12345';
      const eventTypeCode = 'BRI';
      const eventDate = '11/11/2018';
      const isDateSort = true;
      const bypassCertonaCall = false;
      fetchRegistryOwnerRemainingCatoryGenerator = fetchRegistryOwnerRemainingCatory(
        registryId,
        eventTypeCode,
        eventDate,
        isDateSort,
        bypassCertonaCall
      );
      fetchRegistryOwnerRemainingCatoryGenerator.next();
      fetchRegistryOwnerRemainingCatoryGenerator.next();
    });
    it('should dispatch the "fetchRegistryOwnerRemainingCategorySuccess" action for success response', () => {
      const data = {
        registryItemList: [
          {
            productURL: '/product/1043614165?skuId=43614165',
            qtyFulfilled: 0,
          },
        ],
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      fetchRegistryOwnerRemainingCatoryGenerator.next(response);
      fetchRegistryOwnerRemainingCatoryGenerator.next(response);
      const putDescriptor = fetchRegistryOwnerRemainingCatoryGenerator.next()
        .value;
      fetchRegistryOwnerRemainingCatoryGenerator.next(
        PAGE_NAME_REGISTRY_OWNER_HOME
      );
      fetchRegistryOwnerRemainingCatoryGenerator.next(
        PAGE_NAME_REGISTRY_OWNER_HOME
      );
      fetchRegistryOwnerRemainingCatoryGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOwnerRemainingCategorySuccess(data))
      );
    });
    it('should dispatch the "fetchRegistryOwnerRemainingCategoryError" action for error response', () => {
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: {
            message: 'Error',
          },
        },
      };
      fetchRegistryOwnerRemainingCatoryGenerator.next(response);
      const putDescriptor = fetchRegistryOwnerRemainingCatoryGenerator.next()
        .value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOwnerRemainingCategoryError('Error'))
      );
    });

    it('should dispatch the "fetchRegistryOwnerRemainingCategoryError" action while Error thrown', () => {
      const error = new Error(DEFAULT_ERROR_MESSAGE);
      const response = { body: error };
      const putDescriptor = fetchRegistryOwnerRemainingCatoryGenerator.throw(
        response
      ).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOwnerRemainingCategoryError(error))
      );
    });
  });
  describe('#fetchRegistryOwnerItemsRemainingSaga Saga', () => {
    let fetchRegistryOwnerItemsRemainingSagaGenerator;
    beforeEach(() => {
      fetchRegistryOwnerItemsRemainingSagaGenerator = fetchRegistryOwnerItemsRemainingSaga();
    });
    it('should start task to watch for FETCH_REGISTRY_DATA action', () => {
      const takeLatestDescriptor = fetchRegistryOwnerItemsRemainingSagaGenerator.next()
        .value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(
          FETCH_REGISTRY_OWNER_REMAINING_CATEGORY,
          fetchRegistryOwnerRemainingCatory
        )
      );
    });
  });
});
describe('#inactivityModalSaga', () => {
  describe('#activeRegistryCall Listener', () => {
    let inactivityModalSagaGenerator;
    beforeEach(() => {
      inactivityModalSagaGenerator = inactivityModalSaga();
    });

    it('should start task to watch for MAKE_ACTIVE_REGISTRY_CALL action', () => {
      const takeLatestDescriptor = inactivityModalSagaGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(MAKE_ACTIVE_REGISTRY_CALL, activeRegistryCall)
      );
    });
  });
  let inactivityModalSagaGenerator;
  beforeEach(() => {
    inactivityModalSagaGenerator = activeRegistryCall();
    inactivityModalSagaGenerator.next();
  });
  it('should dispatch the "activeRegistryCallSuccess" action for success response', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const takeLatestDescriptor = inactivityModalSagaGenerator.next(response)
      .value;
    expect(takeLatestDescriptor).to.deep.equal(
      put(activeRegistryCallSuccess())
    );
  });
  it('should dispatch the "activeRegistryCallError" action for error response', () => {
    const error = 'response is not correct';
    const response = { body: error };
    const putDescriptor = inactivityModalSagaGenerator.throw(response.body)
      .value;
    expect(putDescriptor).to.deep.equal(put(activeRegistryCallError(error)));
  });
  it('should dispatch the "activeRegistryCallError" action for actual error response', () => {
    const errorMessages = {
      message: 'Invalid or Missing _dynSessConf in request Heaader.',
    };
    const response = {
      body: {
        data: null,
        serviceStatus: 'ERROR',
        errorMessages: {
          message: 'Invalid or Missing _dynSessConf in request Heaader.',
        },
      },
    };
    const putDescriptor = inactivityModalSagaGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(activeRegistryCallError(errorMessages))
    );
  });
});
it('#getContentParams', () => {
  const getContentParamsFromRegionsStub = sinon
    .stub(ExperienceUtils, 'getContentParamsFromRegions')
    .returns({ paramsObject: {} });
  const result = getContentParams({}, 'ProductId');
  expect(result).to.deep.equal({ paramsObject: {} });
  getContentParamsFromRegionsStub.restore();
});

it('#getProductIds', () => {
  const param1 = [
    { registryItemList: [{ sKUDetailVO: { parentProdId: '1' } }] },
    { registryItemList: [{ sKUDetailVO: { parentProdId: '2' } }] },
    { registryItemList: [{ sKUDetailVO: { parentProdId: '3' } }] },
  ];

  const param2 = {
    1: { registryItemList: [{ sKUDetailVO: { parentProdId: '4' } }] },
    2: { registryItemList: [{ sKUDetailVO: { parentProdId: '5' } }] },
    3: { registryItemList: [{ sKUDetailVO: { parentProdId: '6' } }] },
  };
  expect(getProductIds(param1, { atgResponse: param2 })).to.deep.equal(
    '1,2,3,4,5,6'
  );
  // covering else condition of retrieveProductIds method
  expect(getProductIds([], { atgResponse: param2 })).to.deep.equal('4,5,6');
});

describe('#fetchRegistryOwnerRemainingCatory Saga 1st', () => {
  let fetchRegistryOwnerRemainingCatoryGenerator;
  beforeEach(() => {
    const registryId = '12345';
    const eventTypeCode = 'BRI';
    const eventDate = '11/11/2018';
    const isDateSort = true;
    const bypassCertonaCall = false;
    fetchRegistryOwnerRemainingCatoryGenerator = fetchRegistryOwnerRemainingCatory(
      registryId,
      eventTypeCode,
      eventDate,
      isDateSort,
      bypassCertonaCall
    );
    fetchRegistryOwnerRemainingCatoryGenerator.next();
    fetchRegistryOwnerRemainingCatoryGenerator.next();
  });
  it('should dispatch the "fetchRegistryOwnerRemainingCategorySuccess" action for success response with success', () => {
    const data = {
      registryItemList: [
        {
          productURL: '/product/1043614165?skuId=43614165',
          qtyFulfilled: 0,
        },
      ],
    };
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        data,
      },
    };
    fetchRegistryOwnerRemainingCatoryGenerator.next(response);
    fetchRegistryOwnerRemainingCatoryGenerator.next(response);
    const putDescriptor = fetchRegistryOwnerRemainingCatoryGenerator.next()
      .value;
    fetchRegistryOwnerRemainingCatoryGenerator.next(
      PAGE_NAME_REGISTRY_OWNER_HOME
    );
    fetchRegistryOwnerRemainingCatoryGenerator.next(
      PAGE_NAME_REGISTRY_OWNER_HOME
    );
    fetchRegistryOwnerRemainingCatoryGenerator.next();
    expect(putDescriptor).to.deep.equal(
      put(fetchRegistryOwnerRemainingCategorySuccess(data))
    );
  });
});

describe('#fetchRegistryOwnerItemsFirstCatory Saga with param js object', () => {
  let fetchRegistryOwnerItemsFirstCatoryGenerator;
  beforeEach(() => {
    const registryId = '12345';
    const eventTypeCode = 'BRI';
    const eventDate = '11/11/2018';

    fetchRegistryOwnerItemsFirstCatoryGenerator = fetchRegistryOwnerItemsFirstCatory(
      {
        registryId,
        eventTypeCode,
        eventDate,
        isDateSort: true,
        params: { storeId: '12', isBopisFeatureEnable: true },
      }
    );
    fetchRegistryOwnerItemsFirstCatoryGenerator.next();
    fetchRegistryOwnerItemsFirstCatoryGenerator.next();
  });

  it('should dispatch the "fetchRegistryOwnerItemsFirstCategorySuccess" action for Error response', () => {
    const response = {
      body: {
        serviceStatus: 'ERROR',
        errorMessages: {
          message: 'Error',
        },
      },
    };
    const putDescriptor = fetchRegistryOwnerItemsFirstCatoryGenerator.next(
      response
    ).value;
    fetchRegistryOwnerItemsFirstCatoryGenerator.next();
    expect(putDescriptor).to.deep.equal(
      put(fetchRegistryOwnerItemsFirstCategoryError('Error'))
    );
  });
});

describe('#fetchRegistryOwnerRemainingCatory Saga with json object param', () => {
  let fetchRegistryOwnerRemainingCatoryGenerator;
  beforeEach(() => {
    const registryId = '12345';
    const eventTypeCode = 'BRI';
    const eventDate = '11/11/2018';
    const isDateSort = true;
    const bypassCertonaCall = false;
    fetchRegistryOwnerRemainingCatoryGenerator = fetchRegistryOwnerRemainingCatory(
      {
        registryId,
        eventTypeCode,
        eventDate,
        isDateSort,
        bypassCertonaCall,
        params: { storeId: '21', isBopisFeatureEnable: true },
      }
    );
    fetchRegistryOwnerRemainingCatoryGenerator.next();
    fetchRegistryOwnerRemainingCatoryGenerator.next();
  });

  it('should dispatch the "fetchRegistryOwnerRemainingCategoryError" action for error response with Bopis feature on', () => {
    const response = {
      body: {
        serviceStatus: 'ERROR',
        errorMessages: {
          message: 'Error',
        },
      },
    };
    fetchRegistryOwnerRemainingCatoryGenerator.next(response);
    const putDescriptor = fetchRegistryOwnerRemainingCatoryGenerator.next()
      .value;
    expect(putDescriptor).to.deep.equal(
      put(fetchRegistryOwnerRemainingCategoryError('Error'))
    );
  });
});

describe('#undoRemoveRegistryItem saga with total price value null', () => {
  const updatedSkuId = '';
  const customerData = { customerId: '1111' };
  const registryData = {
    registryResVO: {
      registrySummaryVO: {
        eventType: 'Wedding',
        registryId: '520648448',
        giftRegistered: 3,
        giftPurchased: 4,
      },
    },
  };

  it('should dispatch the "undoRemoveRegistryItem" action for success response with totalPriceVal 0', () => {
    const data = {
      productInfo: {
        skuId: 107348,
        totalPriceVal: 0,
        updateRegistryId: 12345678,
        productId: 12345678,
        regItemOldQty: 1,
        rowId: 'APO9089H',
        itemTypes: '',
        regType: 'Wedding',
        refNum: '',
        ltlShipMethodDesc: '',
        qtyRequested: 3,
        qtyPurchased: 1,
        sKUDetailVO: {
          skuId: '111',
          parentProdId: '111',
          personalizationType: 'N',
        },
      },
      productData: [{ hasDiaperFund: false, itemCount: false }],
      updatedSkuId,
    };
    const getUndoRemoveRegistryItemGenerator = undoRemoveRegistryItem(data);
    getUndoRemoveRegistryItemGenerator.next();
    getUndoRemoveRegistryItemGenerator.next(customerData);
    getUndoRemoveRegistryItemGenerator.next(registryData);

    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          component: {
            statusFilter: '',
            priceFilter: '',
            categoryFilter: '',
          },
        },
      },
    };
    getUndoRemoveRegistryItemGenerator.next(response);
    const putDescriptor = getUndoRemoveRegistryItemGenerator.next(response)
      .value;
    expect(putDescriptor).to.deep.equal(
      put(putActiveRegistryStaticFlag(false))
    );
  });
});

describe('#updateFacetData', () => {
  let updateFacetFiterDataStub;
  beforeEach(() => {
    updateFacetFiterDataStub = sinon
      .stub(formatFacetFiltersUtils, 'updateFacetFiterData')
      .returns({ updateFacetData: [] });
  });

  it('#updateFacetData statusFilterData', () => {
    const updateFacetDataGen = updateFacetData({
      statusFilterData: 'status',
      priceFilterData: 'price',
      categoryFilterData: 'cat',
    });
    updateFacetDataGen.next(); // get facet data
    const putDescriptor = updateFacetDataGen.next().value;
    expect(putDescriptor).to.deep.equal(
      put(setFacetData({ updateFacetData: [] }))
    );
  });

  it('#updateFacetData priceFilterData', () => {
    const updateFacetDataGen = updateFacetData({
      priceFilterData: 'price',
      categoryFilterData: 'cat',
    });
    updateFacetDataGen.next(); // get facet data
    const putDescriptor = updateFacetDataGen.next().value;
    expect(putDescriptor).to.deep.equal(
      put(setFacetData({ updateFacetData: [] }))
    );
  });

  it('#updateFacetData categoryFilterData', () => {
    const updateFacetDataGen = updateFacetData({
      categoryFilterData: 'cat',
    });
    updateFacetDataGen.next(); // get facet data
    const putDescriptor = updateFacetDataGen.next().value;
    expect(putDescriptor).to.deep.equal(
      put(setFacetData({ updateFacetData: [] }))
    );
  });

  it('#updateFacetData without data for else branch', () => {
    const updateFacetDataGen = updateFacetData({});
    updateFacetDataGen.next(); // get facet data
    const putDescriptor = updateFacetDataGen.next().value;
    expect(putDescriptor).to.deep.equal(undefined);
  });
  afterEach(() => {
    updateFacetFiterDataStub.restore();
  });
});
