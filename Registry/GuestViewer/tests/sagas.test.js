import { put, takeLatest } from 'redux-saga/effects';
import sinon from 'sinon';
import * as cookies from '@bbb-app/utils/universalCookie';
import {
  COPY_REGISTRY,
  FETCH_FIRST_CATEGORY,
  FETCH_OTHER_CATEGORIES,
  SET_BUYOFF_CONTEXT,
  FETCH_OOS_CATEGORIES,
} from '../constants';
/* import { fetchCopyRegistrySuccess, fetchCopyRegistryError } from '../actions'; */

import {
  registryCopySaga,
  copyRegistryItems,
  fetchFirstCategory,
  registryFirstCategroySaga,
  registryOtherCategoriesSaga,
  fetchOtherCategories,
  setBuyOffContextInATG,
  setBuyOffContextSaga,
  registryOosCategoriesSaga,
  fetchOosCategories,
} from '../sagas';

import {
  setBuyOffContext,
  setBuyOffContextValue,
  setBuyOffContextError,
  fetchRegistryOosCategoriesSuccess,
  fetchRegistryOosCategoriesError,
  fetchFirstCategoryError,
  fetchCopyRegistryError,
  fetchCopyRegistrySuccess,
  fetchFirstCategorySuccess,
  fetchRegistryOtherCategoriesSuccess,
  fetchRegistryOtherCategoriesError,
} from '../actions';

describe('registryCopySaga', () => {
  describe('#copyRegistryItems Saga', () => {
    it('should dispatch the "fetchCopyRegistrySuccess" action for success response', () => {
      const sourceId = 789456895;
      const targetId = 789589512;
      const regType = 'Housewarming';
      const sortOption = '1';
      const eventTypeCode = 'BA1';
      const getCopyRegistryGenerator = copyRegistryItems({
        payload: {
          sourceId,
          targetId,
          regType,
          sortOption,
          eventTypeCode,
        },
      });
      getCopyRegistryGenerator.next();
      const myRegistriesInfo = {
        totalNumOfItemsCopied: '10',
      };
      const status = 'SUCCESS';
      const response = {
        body: {
          serviceStatus: status,
          errorMessages: { message: '' },
          data: myRegistriesInfo,
        },
      };
      const data = {
        totalNumOfItemsCopied: '10',
      };
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      const putDescriptor = getCopyRegistryGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchCopyRegistrySuccess(data, status))
      );
    });
    it('should dispatch the "fetchCopyRegistrySuccess" action for success else', () => {
      const sourceId = 789456895;
      const targetId = 789589512;
      const regType = 'Housewarming';
      const sortOption = '1';
      const eventTypeCode = undefined;
      const getCopyRegistryGenerator = copyRegistryItems({
        payload: {
          sourceId,
          targetId,
          regType,
          sortOption,
          eventTypeCode,
        },
      });
      getCopyRegistryGenerator.next();
      const myRegistriesInfo = {
        totalNumOfItemsCopied: '10',
      };
      const status = 'SUCCESS';
      const response = {
        body: {
          serviceStatus: status,
          errorMessages: { message: '' },
          data: myRegistriesInfo,
        },
      };
      const data = {
        totalNumOfItemsCopied: '10',
      };
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      getCopyRegistryGenerator.next(response);
      const putDescriptor = getCopyRegistryGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchCopyRegistrySuccess(data, status))
      );
    });
    it('should dispatch the "fetchCopyRegistryError" action for partial ERROR response', () => {
      const sourceId = 789456895;
      const targetId = 789589512;
      const regType = 'Housewarming';
      const sortOption = '1';
      const getCopyRegistryGenerator = copyRegistryItems({
        payload: {
          sourceId,
          targetId,
          regType,
          sortOption,
        },
      });
      getCopyRegistryGenerator.next();
      const error = new Error('some error');
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: { message: '' },
          err: {
            body: error,
          },
        },
      };
      const putDescriptor = getCopyRegistryGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(put(fetchCopyRegistryError(error)));
    });

    it('should dispatch the "fetchCopyRegistryError" action for error response', () => {
      const sourceId = 789456895;
      const targetId = 789589512;
      const regType = 'Housewarming';
      const sortOption = '1';
      const getCopyRegistryGenerator = copyRegistryItems({
        payload: {
          sourceId,
          targetId,
          regType,
          sortOption,
        },
      });
      getCopyRegistryGenerator.next();
      const error = new Error('some error');
      const response = { body: error };
      const putDescriptor = getCopyRegistryGenerator.throw(response).value;
      expect(putDescriptor).to.deep.equal(put(fetchCopyRegistryError(error)));
    });
  });
  describe('#registryCopySaga Saga', () => {
    let getCopyRegistryGenerator;

    beforeEach(() => {
      getCopyRegistryGenerator = registryCopySaga();
    });

    it('should start task to watch for COPY_REGISTRY action', () => {
      const takeLatestDescriptor = getCopyRegistryGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(COPY_REGISTRY, copyRegistryItems)
      );
    });
  });
});
describe('registryFirstCategroySaga', () => {
  describe('#fetchFirstCategory  Saga', () => {
    let fetchFirstCategoryGenerator;
    beforeEach(() => {
      const registryId = '12345';
      const eventTypeCode = 'BRI';
      const eventDate = '11/11/2018';
      const isBopisFeatureEnable = true;
      const storeId = 'abc';
      const isMSCall = true;
      fetchFirstCategoryGenerator = fetchFirstCategory({
        registryId,
        eventTypeCode,
        eventDate,
        isBopisFeatureEnable,
        storeId,
      });
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next(isMSCall);
    });

    it('should dispatch the "fetchFirstCategory" action for success response', () => {
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
      const isDateSort = undefined;
      const putDescriptor = fetchFirstCategoryGenerator.next(response).value;
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchFirstCategorySuccess(data, isDateSort))
      );
    });
    it('should dispatch the "fetchFirstCategory" action for success response else', () => {
      beforeEach(() => {
        const registryId = '12345';
        const eventTypeCode = 'BRI';
        const eventDate = '11/11/2018';
        const isBopisFeatureEnable = true;
        const storeId = 'abc';
        const isMSCall = false;
        fetchFirstCategoryGenerator = fetchFirstCategory({
          registryId,
          eventTypeCode,
          eventDate,
          isBopisFeatureEnable,
          storeId,
        });
        fetchFirstCategoryGenerator.next();
        fetchFirstCategoryGenerator.next(isMSCall);
      });
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
      const isDateSort = undefined;
      const putDescriptor = fetchFirstCategoryGenerator.next(response).value;
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchFirstCategorySuccess(data, isDateSort))
      );
    });
    it('should dispatch the "fetchFirstCategoryError" action for success response', () => {
      const evtDate = 789456895;
      const regId = 789589512;
      const regCode = 'Housewarming';
      fetchFirstCategoryGenerator = fetchFirstCategory({
        evtDate,
        regId,
        regCode,
      });
      fetchFirstCategoryGenerator.next();
      fetchFirstCategoryGenerator.next();
      const error = new Error('some error');
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: { message: '' },
          err: {
            body: error,
          },
        },
      };
      const putDescriptor = fetchFirstCategoryGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(put(fetchFirstCategoryError(error)));
    });
    it('should dispatch the "fetchFirstCategoryError" action for error response', () => {
      const error = new Error('Something went wrong');
      const response = { body: error };
      const putDescriptor = fetchFirstCategoryGenerator.throw(response).value;
      expect(putDescriptor).to.deep.equal(put(fetchFirstCategoryError(error)));
    });
  });
  describe('#fetchFirstCategory Saga', () => {
    let fetchFirstCategoryGenerator;
    beforeEach(() => {
      fetchFirstCategoryGenerator = registryFirstCategroySaga();
    });
    it('should start task to watch for FETCH_REGISTRY_DATA action', () => {
      const takeLatestDescriptor = fetchFirstCategoryGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_FIRST_CATEGORY, fetchFirstCategory)
      );
    });
  });
});
describe('fetchOtherCategories', () => {
  describe('#fetchOtherCategories Saga', () => {
    let fetchOtherCategoriesGenerator;
    beforeEach(() => {
      const regId = '12345';
      const evtDate = '11/11/2018';
      const isDateSort = undefined;
      const storeId = 'abc';
      const isBopisFeatureEnable = true;
      const isMSCall = true;
      fetchOtherCategoriesGenerator = fetchOtherCategories({
        evtDate,
        regId,
        isDateSort,
        storeId,
        isBopisFeatureEnable,
      });
      fetchOtherCategoriesGenerator.next();
      fetchOtherCategoriesGenerator.next(isMSCall);
    });
    it('should dispatch the "fetchOtherCategoriesSuccess" action for success response', () => {
      const registryFacetsFilter = [{ items: ['recommended'] }];
      const data = {
        giftGiver: {
          facetsData: {
            registryFacetsFilter,
          },
        },
        statusFilter: [{ foo: 'bar' }],
        priceFilter: [{ foo: 'bar' }],
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      const isDateSort = undefined;
      let putDescriptor = fetchOtherCategoriesGenerator.next(response).value;
      const registryUpdatedFacetsFilter = fetchOtherCategoriesGenerator.next(
        registryFacetsFilter
      );
      putDescriptor = fetchOtherCategoriesGenerator.next(
        registryUpdatedFacetsFilter
      ).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOtherCategoriesSuccess(data, isDateSort))
      );
    });
    it('should dispatch the "fetchOtherCategoriesSuccess" action for success else', () => {
      beforeEach(() => {
        const regId = '12345';
        const evtDate = '11/11/2018';
        const isDateSort = undefined;
        const storeId = 'abc';
        const isBopisFeatureEnable = true;
        const isMSCall = false;
        fetchOtherCategoriesGenerator = fetchOtherCategories({
          evtDate,
          regId,
          isDateSort,
          storeId,
          isBopisFeatureEnable,
        });
        fetchOtherCategoriesGenerator.next();
        fetchOtherCategoriesGenerator.next(isMSCall);
      });
      const data = {};
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      const isDateSort = undefined;
      const putDescriptor = fetchOtherCategoriesGenerator.next(response).value;
      fetchOtherCategoriesGenerator.next();
      fetchOtherCategoriesGenerator.next();
      fetchOtherCategoriesGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOtherCategoriesSuccess(data, isDateSort))
      );
    });
    it('should dispatch the "fetchOtherCategoriesGeneratorError" action for errormessage response', () => {
      const evtDate = 789456895;
      const regId = 789589512;
      const regCode = 'Housewarming';
      fetchOtherCategoriesGenerator = fetchOtherCategories({
        evtDate,
        regId,
        regCode,
      });
      fetchOtherCategoriesGenerator.next();
      fetchOtherCategoriesGenerator.next();
      const error = new Error('some error');
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: { message: '' },
          err: {
            body: error,
          },
        },
      };
      const putDescriptor = fetchOtherCategoriesGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOtherCategoriesError(error))
      );
    });
    it('should dispatch the "fetchOtherCategoriesError" action for error response', () => {
      const error = new Error('Something went wrong');
      const response = { body: error };
      const putDescriptor = fetchOtherCategoriesGenerator.throw(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOtherCategoriesError(error))
      );
    });
  });
  describe('#fetchOtherCategories Saga', () => {
    let fetchOtherCategoriesGenerator;
    beforeEach(() => {
      fetchOtherCategoriesGenerator = registryOtherCategoriesSaga();
    });
    it('should start task to watch for fetchOtherCategories action', () => {
      const takeLatestDescriptor = fetchOtherCategoriesGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_OTHER_CATEGORIES, fetchOtherCategories)
      );
    });
  });
});
describe('registryOosCategoriesSaga', () => {
  describe('#fetchOosCategories  Saga', () => {
    let fetchOosCategoriesGenerator;
    beforeEach(() => {
      const registryId = '12345';
      const eventTypeCode = 'BRI';
      const eventDate = '11/11/2018';
      const isBopisFeatureEnable = true;
      const storeId = 'abc';
      const isMSCall = true;
      fetchOosCategoriesGenerator = fetchOosCategories({
        registryId,
        eventTypeCode,
        eventDate,
        isBopisFeatureEnable,
        storeId,
      });
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next(isMSCall);
    });

    it('should dispatch the "fetchOosCategories" action for success response', () => {
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
      const isDateSort = undefined;
      const putDescriptor = fetchOosCategoriesGenerator.next(response).value;
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOosCategoriesSuccess(data, isDateSort))
      );
    });

    it('should dispatch the "fetchOosCategories" action for success else', () => {
      beforeEach(() => {
        const registryId = '12345';
        const eventTypeCode = 'BRI';
        const eventDate = '11/11/2018';
        const isBopisFeatureEnable = true;
        const storeId = 'abc';
        const isMSCall = false;
        fetchOosCategoriesGenerator = fetchOosCategories({
          registryId,
          eventTypeCode,
          eventDate,
          isBopisFeatureEnable,
          storeId,
        });
        fetchOosCategoriesGenerator.next();
        fetchOosCategoriesGenerator.next(isMSCall);
      });
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
      const isDateSort = undefined;
      const putDescriptor = fetchOosCategoriesGenerator.next(response).value;
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next();
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOosCategoriesSuccess(data, isDateSort))
      );
    });
    it('should dispatch the "fetchOosCategoriesError" action for success response', () => {
      const evtDate = 789456895;
      const regId = 789589512;
      const regCode = 'Housewarming';
      fetchOosCategoriesGenerator = fetchOosCategories({
        evtDate,
        regId,
        regCode,
      });
      fetchOosCategoriesGenerator.next();
      fetchOosCategoriesGenerator.next();
      const error = new Error('some error');
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: { message: '' },
          err: {
            body: error,
          },
        },
      };
      const putDescriptor = fetchOosCategoriesGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOosCategoriesError(error))
      );
    });
    it('should dispatch the "fetchOosCategoriesError" action for error response', () => {
      const error = new Error('Something went wrong');
      const response = { body: error };
      const putDescriptor = fetchOosCategoriesGenerator.throw(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryOosCategoriesError(error))
      );
    });
  });
  describe('#fetchOosCategoriesGenerator Saga', () => {
    let fetchOosCategoriesGenerator;
    beforeEach(() => {
      fetchOosCategoriesGenerator = registryOosCategoriesSaga();
    });
    it('should start task to watch for fetchOosCategories action', () => {
      const takeLatestDescriptor = fetchOosCategoriesGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_OOS_CATEGORIES, fetchOosCategories)
      );
    });
  });
});
describe('setBuyOffContextSaga', () => {
  describe('#setBuyOffContextSaga Listener', () => {
    let setBuyOffContextGenerator;
    beforeEach(() => {
      setBuyOffContextGenerator = setBuyOffContextSaga();
    });

    it('should start task to watch for SET_BUYOFF_CONTEXT action', () => {
      const takeLatestDescriptor = setBuyOffContextGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(SET_BUYOFF_CONTEXT, setBuyOffContextInATG)
      );
    });
  });
  describe('#setBuyOffContext Saga Actions', () => {
    let setBuyOffContextGenerator;
    beforeEach(() => {
      const data = {
        registryId: '123456',
      };
      setBuyOffContextGenerator = setBuyOffContextInATG(data);
      setBuyOffContextGenerator.next();
    });
    it('should dispatch the "setBuyOffContextValue" action for success response', () => {
      const data = true;
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      const putDescriptor = setBuyOffContextGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(put(setBuyOffContextValue(data)));
    });
    it('should dispatch the "setBuyOffContextError" action for partial success response', () => {
      const registryId = '123456';
      const response = {
        body: {
          serviceStatus: 'PARTIAL_SUCCESS',
          errorMessages: [{ code: 'ECB00427' }],
        },
      };
      sinon.stub(cookies, 'getCookie').returns('activeSession');
      const putDescriptor = setBuyOffContextGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(put(setBuyOffContext(registryId)));
      cookies.getCookie.restore();
    });
    it('should dispatch the "setBuyOffContextError" action for partial success response else', () => {
      const registryId = '123456';
      const response = {
        body: {
          serviceStatus: 'PARTIAL_SUCCESS',
          errorMessages: [{ code: 'ECB00427' }],
        },
      };
      sinon.stub(cookies, 'getCookie').returns(false);
      const putDescriptor = setBuyOffContextGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(put(setBuyOffContext(registryId)));
      cookies.getCookie.restore();
    });
    it('should dispatch the "setBuyOffContextError" action if response contains errormessage', () => {
      const error = {
        message: '',
      };
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: { message: '' },
          error,
        },
      };
      const putDescriptor = setBuyOffContextGenerator.next(response).value;

      expect(putDescriptor).to.deep.equal(put(setBuyOffContextError(error)));
    });
    it('should dispatch the "setBuyOffContextError" action for error response', () => {
      const errors = {
        error: {
          body: 'Error: some error',
        },
      };

      const putDescriptor = setBuyOffContextGenerator.throw(errors).value;
      expect(putDescriptor).to.deep.equal(put(setBuyOffContextError(errors)));
    });
  });
});
