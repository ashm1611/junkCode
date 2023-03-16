import {
  FETCH_REGISTRY_RECOMMENDATIONS,
  FETCH_REGISTRY_RECOMMENDATIONS_SUCCESS,
  FETCH_REGISTRY_RECOMMENDATIONS_ERROR,
  SAVE_EMAIL_FREQUENCY,
  MAY_BE_LATER,
  MAY_BE_LATER_SUCCESS,
  MAY_BE_LATER_ERROR,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_SUCCESS,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY_ERROR,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_SUCCESS,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_ERROR,
} from '../constants';
import {
  fetchRecommendations,
  fetchRecommendationsSuccess,
  fetchRecommendationsError,
  fetchEmailFrequency,
  mayBeLaterCall,
  mayBeLaterCallSuccess,
  mayBeLaterCallError,
  getRecommenderSummarySuccess,
  getRecommenderSummaryError,
  socialRecommendUserBlockUnblockSuccess,
  socialRecommendUserBlockUnblockError,
} from '../actions';
describe('FetchRecommendationAction', () => {
  describe('#fetchRecommendation', () => {
    it('should return the correct type "MARK_FAV_REGISTRY_ITEM"', () => {
      const registryId = '123';
      const tabId = 0;
      const sortOption = 0;
      const eventTypeCode = 'BRD';
      const expectedResult = {
        type: FETCH_REGISTRY_RECOMMENDATIONS,
        registryId,
        tabId,
        sortOption,
        eventTypeCode,
      };
      expect(
        fetchRecommendations(registryId, tabId, sortOption, eventTypeCode)
      ).to.deep.equal(expectedResult);
    });
  });
});

describe('FetchRecommendationsSuccessAction', () => {
  describe('#fetchRecommendationsuccess', () => {
    it('should return the correct type "MARK_FAV_REGISTRY_ITEM"', () => {
      const data = {};

      const expectedResult = {
        type: FETCH_REGISTRY_RECOMMENDATIONS_SUCCESS,
        data,
      };
      expect(fetchRecommendationsSuccess(data)).to.deep.equal(expectedResult);
    });
  });
});

describe('FetchRecommendationsErrorAction', () => {
  describe('#fetchRecommendationError', () => {
    it('should return the correct type "MARK_FAV_REGISTRY_ITEM"', () => {
      const error = {};
      const expectedResult = {
        type: FETCH_REGISTRY_RECOMMENDATIONS_ERROR,
        error,
      };
      expect(fetchRecommendationsError(error)).to.deep.equal(expectedResult);
    });
  });
});

describe('fetchEmailFrequencyAction', () => {
  describe('#fetchEmailFrequency', () => {
    it('should return the correct type "EMAIL FREQUENCY"', () => {
      const registryId = '123';
      const emailOptionValue = 0;
      const expectedResult = {
        type: SAVE_EMAIL_FREQUENCY,
        registryId,
        emailOptionValue,
      };
      expect(fetchEmailFrequency(registryId, emailOptionValue)).to.deep.equal(
        expectedResult
      );
    });
  });
});

describe('mayBeLaterCallAction', () => {
  describe('#mayBeLaterCall', () => {
    it('should return the correct type "MAY_BE_LATER"', () => {
      const payload = {
        skuId: 111111111,
        skuName: 'test',
        prodId: 111112222,
        ltlFlag: false,
        isCustomizationRequired: 'N',
        personalizationType: '',
        registryId: 1234567890,
        repositoryId: '12CT',
        ltlShipMethod: false,
        price: '$2.33',
        qty: '3',
        registryName: 'Weeding',
        isFromPendingTab: true,
        isDeclined: true,
      };
      const expectedResult = {
        type: MAY_BE_LATER,
        payload,
      };
      expect(mayBeLaterCall(payload)).to.deep.equal(expectedResult);
    });
  });
});
describe('mayBeLaterCallSuccess', () => {
  describe('#mayBeLaterCallSuccess', () => {
    it('should return the correct type "MAY_BE_LATER_SUCCESS"', () => {
      const expectedResult = {
        type: MAY_BE_LATER_SUCCESS,
      };
      expect(mayBeLaterCallSuccess()).to.deep.equal(expectedResult);
    });
  });
});

describe('mayBeLaterCallError', () => {
  describe('#mayBeLaterCallError', () => {
    it('should return the correct type "MAY_BE_LATER_ERROR"', () => {
      const expectedResult = {
        type: MAY_BE_LATER_ERROR,
      };
      expect(mayBeLaterCallError()).to.deep.equal(expectedResult);
    });
  });
});

describe('getRecommenderSummarySuccess', () => {
  describe('#getRecommenderSummarySuccess', () => {
    it('should return the correct type "getRecommenderSummarySuccess"', () => {
      const data = 'test';
      const expectedResult = {
        type: FETCH_REGISTRY_RECOMMENDER_SUMMARY_SUCCESS,
        data,
      };
      expect(getRecommenderSummarySuccess(data)).to.deep.equal(expectedResult);
    });
  });
});

describe('getRecommenderSummaryError', () => {
  describe('#getRecommenderSummaryError', () => {
    it('should return the correct type "getRecommenderSummaryError"', () => {
      const error = 'test';
      const expectedResult = {
        type: FETCH_REGISTRY_RECOMMENDER_SUMMARY_ERROR,
        error,
      };
      expect(getRecommenderSummaryError(error)).to.deep.equal(expectedResult);
    });
  });
});

describe('socialRecommendUserBlockUnblockSuccess', () => {
  describe('#socialRecommendUserBlockUnblockSuccess', () => {
    it('should return the correct type "socialRecommendUserBlockUnblockSuccess"', () => {
      const data = 'test';
      const expectedResult = {
        type: SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_SUCCESS,
        data,
      };
      expect(socialRecommendUserBlockUnblockSuccess(data)).to.deep.equal(
        expectedResult
      );
    });
  });
});

describe('socialRecommendUserBlockUnblockError', () => {
  describe('#socialRecommendUserBlockUnblockError', () => {
    it('should return the correct type "socialRecommendUserBlockUnblockError"', () => {
      const data = 'test';
      const expectedResult = {
        type: SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK_ERROR,
        data,
      };
      expect(socialRecommendUserBlockUnblockError(data)).to.deep.equal(
        expectedResult
      );
    });
  });
});
