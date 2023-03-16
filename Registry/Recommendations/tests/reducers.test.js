import { fromJS } from 'immutable';

import {
  fetchRecommendations,
  fetchRecommendationsError,
  fetchRecommendationsSuccess,
  mayBeLaterCall,
  mayBeLaterCallSuccess,
  mayBeLaterCallError,
  getRecommenderSummarySuccess,
  socialRecommendUserBlockUnblockSuccess,
  getRecommenderSummaryError,
  socialRecommendUserBlockUnblockError,
  fetchRecommendationsDateSorted,
  fetchRecommenderSummary,
  socialRecommendUserBlockUnblockDataReset,
} from '../actions';

import RegistryRecommendationsReducer, {
  handleSuccessType,
  handleErrorType,
} from '../reducer';

describe('#RegistryRecommendationsReducer', () => {
  let state;
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
  beforeEach(() => {
    state = fromJS({
      data: {},
      isFetching: true,
      mayBeLaterFlag: false,
      recommendationBlockUnblockError: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(RegistryRecommendationsReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the fetchRecommendations correctly', () => {
    const data = {
      registryId: '1234567',
      tabId: 0,
      sortOption: 0,
      eventTypeCode: 'Weeding',
    };

    const expectedResult = state.set('isFetching', true);

    expect(
      RegistryRecommendationsReducer(state, fetchRecommendations(data))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the success callback correctlyeeee', () => {
    const data = {
      recommendationList: {},
    };

    const expectedResult = state
      .set('recommendationList', data)
      .set('isFetching', false);

    expect(
      RegistryRecommendationsReducer(state, fetchRecommendationsSuccess(data))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the Error callback correctly', () => {
    const error = {
      message: 'some error',
    };

    const expectedResult = state
      .set('recommendationError', error)
      .set('isFetching', false);

    expect(
      RegistryRecommendationsReducer(state, fetchRecommendationsError(error))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the fetchRecommendationsDateSorted correctly', () => {
    const data = {
      registryId: '1234567',
      tabId: 0,
      sortOption: 0,
      eventTypeCode: 'Weeding',
    };

    const expectedResult = state.set('isFetching', true);

    expect(
      RegistryRecommendationsReducer(state, fetchRecommendations(data))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the mayBeLaterCall correctly', () => {
    const expectedResult = state.set('mayBeLaterFlag', false);
    expect(
      RegistryRecommendationsReducer(state, mayBeLaterCall(payload))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the mayBeLaterCallSuccess correctly', () => {
    const expectedResult = state.set('mayBeLaterFlag', true);
    expect(
      RegistryRecommendationsReducer(state, mayBeLaterCallSuccess())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the mayBeLaterCallError correctly', () => {
    const expectedResult = state.set('mayBeLaterFlag', false);
    expect(
      RegistryRecommendationsReducer(state, mayBeLaterCallError())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the getRecommenderSummarySuccess correctly', () => {
    const data = 'test';
    const expectedResult = state
      .set('recommenderSummary', data)
      .set('isFetching', false);

    expect(
      RegistryRecommendationsReducer(state, getRecommenderSummarySuccess(data))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the socialRecommendUserBlockUnblockSuccess correctly with null', () => {
    let data;
    const expectedResult = state
      .set('recommendationBlockUnblockSuccess', null)
      .set('isFetching', false);

    expect(
      RegistryRecommendationsReducer(
        state,
        socialRecommendUserBlockUnblockSuccess(data)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the socialRecommendUserBlockUnblockSuccess correctly with results', () => {
    const data = {
      result: 'test',
    };

    const expectedResult = state
      .set('recommendationBlockUnblockSuccess', data.result)
      .set('isFetching', false);
    expect(
      RegistryRecommendationsReducer(
        state,
        socialRecommendUserBlockUnblockSuccess(data)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the getRecommenderSummaryError correctly', () => {
    const error = 'test';

    const expectedResult = state
      .set('recommenderSummaryError', error)
      .set('isFetching', false);
    expect(
      RegistryRecommendationsReducer(state, getRecommenderSummaryError(error))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the socialRecommendUserBlockUnblockError correctly', () => {
    const data = 'test';

    const expectedResult = state
      .set('recommendationBlockUnblockError', data)
      .set('isFetching', false);
    expect(
      RegistryRecommendationsReducer(
        state,
        socialRecommendUserBlockUnblockError(data)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRecommendationsDateSorted correctly', () => {
    const expectedResult = state.set('isFetching', true);
    expect(
      RegistryRecommendationsReducer(state, fetchRecommendationsDateSorted())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRecommenderSummary correctly', () => {
    const expectedResult = state.set('isFetching', true);
    expect(
      RegistryRecommendationsReducer(state, fetchRecommenderSummary())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the socialRecommendUserBlockUnblockDataReset correctly', () => {
    const expectedResult = state.set('recommendationBlockUnblockSuccess', null);
    expect(
      RegistryRecommendationsReducer(
        state,
        socialRecommendUserBlockUnblockDataReset()
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the deafult state of handleSuccessType function', () => {
    const expectedResult = state
      .set('data', fromJS({}))
      .set('isFetching', true)
      .set('mayBeLaterFlag', false)
      .set('recommendationBlockUnblockError', null);
    expect(handleSuccessType(state, { type: 'default' })).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the deafult state of handleErrorType function', () => {
    const expectedResult = state
      .set('data', fromJS({}))
      .set('isFetching', true)
      .set('mayBeLaterFlag', false)
      .set('recommendationBlockUnblockError', null);
    expect(handleErrorType(state, { type: 'default' })).to.deep.equal(
      expectedResult
    );
  });
});
