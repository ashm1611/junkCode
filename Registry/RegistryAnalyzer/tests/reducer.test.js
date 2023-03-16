import { fromJS } from 'immutable';

import RegistryAnalyzerReducer from '../reducer';
import {
  fetchRegAnalyzerData,
  fetchRegAnalyzerDataSuccess,
  fetchRegAnalyzerDataError,
} from '../actions';

describe('RegistryAnalyzer Reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      isAnalyzerDataFetching: false,
      analyzerData: null,
      error: null,
    });
  });

  it('should return the initial state', () => {
    expect(RegistryAnalyzerReducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle the fetchRegAnalyzerData action correctly', () => {
    const data = {
      isAnalyzerDataFetching: true,
    };
    const regId = '12345';
    const regType = 'BRD';
    const numberOfGuests = '13';

    const expectedResult = initialState.merge(data);

    expect(
      RegistryAnalyzerReducer(
        initialState,
        fetchRegAnalyzerData(regId, regType, numberOfGuests)
      ).toJS()
    ).to.deep.equal(expectedResult.toJS());
  });

  it('should handle the fetchRegAnalyzerDataSuccess action correctly', () => {
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
    const data = {
      isAnalyzerDataFetching: false,
      analyzerData,
    };

    const expectedResult = initialState.merge(data);

    expect(
      RegistryAnalyzerReducer(
        initialState,
        fetchRegAnalyzerDataSuccess(analyzerData)
      ).toJS()
    ).to.deep.equal(expectedResult.toJS());
  });

  it('should handle the fetchRegAnalyzerDataError action correctly', () => {
    const error = 'some error';
    const data = {
      isAnalyzerDataFetching: false,
      error,
    };

    const expectedResult = initialState.merge(data);

    expect(
      RegistryAnalyzerReducer(
        initialState,
        fetchRegAnalyzerDataError(error)
      ).toJS()
    ).to.deep.equal(expectedResult.toJS());
  });
});
