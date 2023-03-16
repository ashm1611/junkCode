import {
  FETCH_REGISTRY_ANALYZER_DATA,
  FETCH_REGISTRY_ANALYZER_DATA_SUCCESS,
  FETCH_REGISTRY_ANALYZER_DATA_ERROR,
} from '../constants';

import {
  fetchRegAnalyzerData,
  fetchRegAnalyzerDataSuccess,
  fetchRegAnalyzerDataError,
} from '../actions';

describe('RegistryAnalyzer actions', () => {
  it('should return the correct type', () => {
    const regId = '12345';
    const regType = 'BRD';
    const numberOfGuests = '13';

    const expectedResult = {
      type: FETCH_REGISTRY_ANALYZER_DATA,
      regId,
      regType,
      numberOfGuests,
    };

    expect(fetchRegAnalyzerData(regId, regType, numberOfGuests)).to.deep.equal(
      expectedResult
    );
  });

  it('should return the correct type', () => {
    const analyzerData = {
      defaultNumberOfGuest: 100,
      giftMultiplier: 2.5,
      priceRangeList: [
        {
          addMoreLink:
            '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMCwyNS45OV0i?pstate=pv_view:grid||&ta=typeahead&ml=v2',
          addedNoOfGifts: 0,
          displayString: 'Under $25',
          distributionPercent: 10,
          priceRangeMax: 25,
          priceRangeMin: 1,
          recommendedNoOfGifts: 0,
        },
        {
          addMoreLink:
            '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2',
          addedNoOfGifts: 0,
          displayString: '$25 - $50',
          distributionPercent: 25,
          priceRangeMax: 50,
          priceRangeMin: 25,
          recommendedNoOfGifts: 0,
        },
      ],
    };

    const expectedData = {
      type: FETCH_REGISTRY_ANALYZER_DATA_SUCCESS,
      analyzerData,
    };

    expect(fetchRegAnalyzerDataSuccess(analyzerData)).to.deep.equal(
      expectedData
    );
  });

  it('should return the correct type', () => {
    const error = 'some error';

    const expectedResult = {
      type: FETCH_REGISTRY_ANALYZER_DATA_ERROR,
      error,
    };

    expect(fetchRegAnalyzerDataError(error)).to.deep.equal(expectedResult);
  });
});
