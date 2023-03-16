import { put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import {
  getFlipFlopDataError,
  getFlipFlopDataSuccess,
  getFlipFlopData,
  setFlipFlopCookie,
} from '../actions';

import { getFlipFlopDataSaga, getFlipFlopDataFunc } from '../sagas';

import { DEFAULT_ERROR_MESSAGE } from '../../constants';
import { GET_FLIP_FLOP_DATA } from '../constants';

describe('fetchRegistryOwnerItemsFirst', () => {
  const apiResponseSucess = {
    body: {
      serviceStatus: 'SUCCESS',
      response: {
        numFound: 5330,
        start: 0,
        docs: [
          {
            PRODUCT_ID: '1047067240',
          },
          {
            PRODUCT_ID: '1111111111',
          },
        ],
      },
    },
  };
  const apiResponseSucessForBlankDocs = {
    body: {
      serviceStatus: 'SUCCESS',
      response: {
        numFound: 1,
        start: 1,
        docs: [],
      },
    },
  };
  const apiResponseError = {
    body: {
      serviceStatus: 'SUCCESS',
      response: {
        errorMessages: [DEFAULT_ERROR_MESSAGE],
      },
    },
  };
  const errorMessages = 'Err msg';
  const apolloState = fromJS({
    viewportConfig: {
      siteConfig: {
        apollo: {
          plpGroupBy: {},
          productSearch: {},
        },
      },
    },
  });

  describe('#getFlipFlopDataSaga Saga when isGroupByFlipFlopEnable is true', () => {
    let getFlipFlopDataSagaGenerator;
    const isGroupByFlipFlopEnable = false;
    beforeEach(() => {
      const start = 5;
      const rows = 4;
      const query = 'wedding registry favorite';
      const flipFlopCookieExpiryDays = 2;
      const regType = 'BRD';
      const otherPayload = { thresholdAPITrigger: 10, selectedCategory: 'BRD' };

      getFlipFlopDataSagaGenerator = getFlipFlopDataFunc({
        start,
        rows,
        query,
        errorMessages,
        flipFlopCookieExpiryDays,
        regType,
        otherPayload,
        isGroupByFlipFlopEnable,
      });
      getFlipFlopDataSagaGenerator.next();
      getFlipFlopDataSagaGenerator.next(apolloState);
    });

    it('should dispatch the GET_FLIP_FLOP_DATA_SUCCESS action for success response', () => {
      const putDescriptor = getFlipFlopDataSagaGenerator.next(apiResponseSucess)
        .value;
      const totalItemsCount = 5330;
      const flipFlopItemsList = [
        { PRODUCT_ID: '1047067240' },
        { PRODUCT_ID: '1111111111' },
      ];
      const thresholdAPITrigger = 10;
      const regType = 'BRD';
      const isItemsCountLow = false;
      expect(putDescriptor).to.deep.equal(
        put(
          getFlipFlopDataSuccess(
            totalItemsCount,
            flipFlopItemsList,
            thresholdAPITrigger,
            regType,
            isItemsCountLow,
            isGroupByFlipFlopEnable
          )
        )
      );
    });
    it('should dispatch the GET_FLIP_FLOP_DATA_SUCCESS action for success response when numFound is greater than sum of start and rows', () => {
      const apiResponseSucess1 = {
        body: {
          serviceStatus: 'SUCCESS',
          response: {
            numFound: 8,
            start: 0,
            docs: [
              {
                PRODUCT_ID: '1047067240',
              },
              {
                PRODUCT_ID: '1111111111',
              },
            ],
          },
        },
      };
      const putDescriptor = getFlipFlopDataSagaGenerator.next(
        apiResponseSucess1
      ).value;
      const totalItemsCount = 8;
      const flipFlopItemsList = [
        { PRODUCT_ID: '1047067240' },
        { PRODUCT_ID: '1111111111' },
      ];
      const thresholdAPITrigger = 10;
      const regType = 'BRD';
      const isItemsCountLow = false;
      expect(putDescriptor).to.deep.equal(
        put(
          getFlipFlopDataSuccess(
            totalItemsCount,
            flipFlopItemsList,
            thresholdAPITrigger,
            regType,
            isItemsCountLow,
            isGroupByFlipFlopEnable
          )
        )
      );
    });
    it('should dispatch the GET_FLIP_FLOP_DATA_SUCCESS action for success response when numFound <= rows', () => {
      const apiResponseSucess2 = {
        body: {
          serviceStatus: 'SUCCESS',
          response: {
            numFound: 4,
            start: 0,
            docs: [
              {
                PRODUCT_ID: '1047067240',
              },
              {
                PRODUCT_ID: '1111111111',
              },
            ],
          },
        },
      };
      const putDescriptor = getFlipFlopDataSagaGenerator.next(
        apiResponseSucess2
      ).value;
      const totalItemsCount = 4;
      const flipFlopItemsList = [
        { PRODUCT_ID: '1047067240' },
        { PRODUCT_ID: '1111111111' },
      ];
      const thresholdAPITrigger = 10;
      const regType = 'BRD';
      const isItemsCountLow = true;
      expect(putDescriptor).to.deep.equal(
        put(
          getFlipFlopDataSuccess(
            totalItemsCount,
            flipFlopItemsList,
            thresholdAPITrigger,
            regType,
            isItemsCountLow,
            isGroupByFlipFlopEnable
          )
        )
      );
    });
    it('should dispatch the GET_FLIP_FLOP_DATA action for success response', () => {
      const putDescriptor = getFlipFlopDataSagaGenerator.next(
        apiResponseSucessForBlankDocs
      ).value;
      const start = 0;
      const rows = 4;
      const query = 'wedding registry favorite';
      const flipFlopCookieExpiryDays = 2;
      const regType = 'BRD';
      const otherPayload = { thresholdAPITrigger: 10, selectedCategory: 'BRD' };
      expect(putDescriptor).to.deep.equal(
        put(
          getFlipFlopData(
            start,
            rows,
            query,
            errorMessages,
            flipFlopCookieExpiryDays,
            regType,
            otherPayload
          )
        )
      );
    });
    it('should dispatch the GET_FLIP_FLOP_DATA_ERROR action for success response', () => {
      const putDescriptor = getFlipFlopDataSagaGenerator.next(apiResponseError)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(getFlipFlopDataError(errorMessages))
      );
    });
  });
  describe('#getFlipFlopDataSaga Saga when isGroupByFlipFlopEnable is true for blank docs', () => {
    let getFlipFlopDataSagaGenerator;
    const isGroupByFlipFlopEnable = true;
    beforeEach(() => {
      const start = 0;
      const rows = 4;
      const query = 'wedding registry favorite';
      const flipFlopCookieExpiryDays = 2;
      const regType = 'flipFlopAllCategories';
      const otherPayload = {
        thresholdAPITrigger: 10,
        selectedCategory: 'flipFlopAllCategories',
      };

      getFlipFlopDataSagaGenerator = getFlipFlopDataFunc({
        start,
        rows,
        query,
        errorMessages,
        flipFlopCookieExpiryDays,
        regType,
        otherPayload,
        isGroupByFlipFlopEnable,
      });
      getFlipFlopDataSagaGenerator.next();
      getFlipFlopDataSagaGenerator.next(apolloState);
    });
    it('should dispatch the GET_FLIP_FLOP_DATA action for success response and call generateRandomIndexNumber for flipFlopAllCategories', () => {
      const putDescriptor = getFlipFlopDataSagaGenerator.next(
        apiResponseSucessForBlankDocs
      ).value;
      const numFound = 1;
      const start = Math.floor(Math.random() * (+numFound - 0 + 1) + 0);
      const rows = 4;
      const query = 'wedding registry favorite';
      const flipFlopCookieExpiryDays = 2;
      const regType = 'flipFlopAllCategories';
      const otherPayload = {
        thresholdAPITrigger: 10,
        selectedCategory: 'flipFlopAllCategories',
      };
      const putResult = put(
        getFlipFlopData(
          start,
          rows,
          query,
          errorMessages,
          flipFlopCookieExpiryDays,
          regType,
          otherPayload
        )
      );
      expect(typeof putDescriptor).to.deep.equal(typeof putResult);
    });
  });
  describe('#getFlipFlopDataSaga Saga for flipFlopAllCategories', () => {
    const start = 5;
    const rows = 4;
    const query = 'wedding registry favorite';
    const flipFlopCookieExpiryDays = 2;
    const regType = 'flipFlopAllCategories';
    const otherPayload = {
      thresholdAPITrigger: 10,
      selectedCategory: 'flipFlopAllCategories',
    };
    const isGroupByFlipFlopEnable = true;
    const getFlipFlopDataSagaGenerator = getFlipFlopDataFunc({
      start,
      rows,
      query,
      errorMessages,
      flipFlopCookieExpiryDays,
      regType,
      otherPayload,
      isGroupByFlipFlopEnable,
    });
    it('should dispatch the SET_FLIP_FLOP_COOKIE action for success response for flipFlopAllCategories', () => {
      getFlipFlopDataSagaGenerator.next();
      getFlipFlopDataSagaGenerator.next(apolloState);
      getFlipFlopDataSagaGenerator.next(apiResponseSucess);
      const putDescriptor = getFlipFlopDataSagaGenerator.next(apiResponseSucess)
        .value;
      const nextIndex = 9;
      const selectedCategory = 'flipFlopAllCategories';
      expect(putDescriptor).to.deep.equal(
        put(setFlipFlopCookie(nextIndex, regType, selectedCategory))
      );
    });
  });
  describe('#getFlipFlopDataSaga Saga when isGroupByFlipFlopEnable is false', () => {
    let getFlipFlopDataSagaGenerator;
    beforeEach(() => {
      const start = 5;
      const rows = 4;
      const query = 'wedding registry favorite';
      const flipFlopCookieExpiryDays = 2;
      const regType = 'BRD';
      const otherPayload = { thresholdAPITrigger: 10, selectedCategory: 'BRD' };
      const isGroupByFlipFlopEnable = false;

      getFlipFlopDataSagaGenerator = getFlipFlopDataFunc({
        start,
        rows,
        query,
        errorMessages,
        flipFlopCookieExpiryDays,
        regType,
        otherPayload,
        isGroupByFlipFlopEnable,
      });
      getFlipFlopDataSagaGenerator.next();
    });
    it('should dispatch the "getFlipFlopDataERROR" action for success response', () => {
      const putDescriptor = getFlipFlopDataSagaGenerator.next(apiResponseError)
        .value;
      expect(putDescriptor).to.deep.equal(
        put(getFlipFlopDataError(DEFAULT_ERROR_MESSAGE))
      );
    });
  });
  describe('#getFlipFlopDataSaga Saga', () => {
    let getFlipFlopDataSagaGenerator;

    beforeEach(() => {
      getFlipFlopDataSagaGenerator = getFlipFlopDataSaga();
    });

    it('should start task to watch for GET_FLIP_FLOP_DATA action', () => {
      const takeLatestDescriptor = getFlipFlopDataSagaGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(GET_FLIP_FLOP_DATA, getFlipFlopDataFunc)
      );
    });
  });
});
