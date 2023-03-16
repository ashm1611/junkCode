import {
  GET_FLIP_FLOP_DATA,
  GET_FLIP_FLOP_DATA_SUCCESS,
  GET_FLIP_FLOP_DATA_ERROR,
  SET_FLIP_FLOP_COOKIE,
  SET_LOW_ITEMS_COUNT,
  DELETE_FLIP_FLOP_DATA,
} from '../constants';
import {
  getFlipFlopData,
  getFlipFlopDataSuccess,
  getFlipFlopDataError,
  setFlipFlopCookie,
  deleteFlipFlopData,
  setIsItemsCountLow,
} from '../actions';

describe('FlipFlopActions', () => {
  describe('#getFlipFlopData', () => {
    it('should return the correct type "GET_FLIP_FLOP_DATA"', () => {
      const start = 5;
      const rows = 8;
      const query = '';
      const errorMessages = '';
      const flipFlopCookieExpiryDays = 20;
      const regType = 'BRD';
      const thresholdAPITrigger = 10;
      const isGroupByFlipFlopEnable = false;
      const otherPayload = {
        thresholdAPITrigger,
        selectedCategory: 'ALL',
        fqParam: 'param',
      };

      const expectedResult = {
        type: GET_FLIP_FLOP_DATA,
        start,
        rows,
        query,
        errorMessages,
        flipFlopCookieExpiryDays,
        regType,
        otherPayload,
        isGroupByFlipFlopEnable,
      };
      expect(
        getFlipFlopData(
          start,
          rows,
          query,
          errorMessages,
          flipFlopCookieExpiryDays,
          regType,
          otherPayload,
          isGroupByFlipFlopEnable
        )
      ).to.deep.equal(expectedResult);
    });
  });
  describe('#getFlipFlopDataSuccess', () => {
    it('should return the correct type "GET_FLIP_FLOP_DATA_SUCCESS"', () => {
      const totalItemsCount = 8;
      const flipFlopItemsList = [];
      const thresholdAPITrigger = 10;
      const regType = 'BRD';
      const isItemsCountLow = true;
      const isGroupByFlipFlopEnable = false;
      const expectedResult = {
        type: GET_FLIP_FLOP_DATA_SUCCESS,
        totalItemsCount,
        flipFlopItemsList,
        thresholdAPITrigger,
        regType,
        isItemsCountLow,
        isGroupByFlipFlopEnable,
      };
      expect(
        getFlipFlopDataSuccess(
          totalItemsCount,
          flipFlopItemsList,
          thresholdAPITrigger,
          regType,
          isItemsCountLow,
          isGroupByFlipFlopEnable
        )
      ).to.deep.equal(expectedResult);
    });
  });
  describe('#getFlipFlopDataError', () => {
    it('should return the correct type "GET_FLIP_FLOP_DATA_ERROR"', () => {
      const errorMsg = '';
      const expectedResult = {
        type: GET_FLIP_FLOP_DATA_ERROR,
        errorMsg,
      };
      expect(getFlipFlopDataError(errorMsg)).to.deep.equal(expectedResult);
    });
  });
  describe('#setFlipFlopCookie', () => {
    it('should return the correct type "SET_FLIP_FLOP_COOKIE"', () => {
      const nextIndex = 10;
      const regType = 'BRD';
      const selectedCategory = 'flipFlopAllCategory';
      const expectedResult = {
        type: SET_FLIP_FLOP_COOKIE,
        nextIndex,
        regType,
        selectedCategory,
      };
      expect(
        setFlipFlopCookie(nextIndex, regType, selectedCategory)
      ).to.deep.equal(expectedResult);
    });
  });

  describe('#setIsItemsCountLow', () => {
    it('should return the correct type "SET_LOW_ITEMS_COUNT"', () => {
      const isItemsCountLow = false;
      const expectedResult = {
        type: SET_LOW_ITEMS_COUNT,
        isItemsCountLow,
      };
      expect(setIsItemsCountLow(isItemsCountLow)).to.deep.equal(expectedResult);
    });
  });

  describe('#deleteFlipFlopData', () => {
    it('should return the correct type "DELETE_FLIP_FLOP_DATA"', () => {
      const countOfItemsViewed = 3;
      const expectedResult = {
        type: DELETE_FLIP_FLOP_DATA,
        countOfItemsViewed,
      };
      expect(deleteFlipFlopData(countOfItemsViewed)).to.deep.equal(
        expectedResult
      );
    });
  });
});
