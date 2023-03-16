import { fromJS } from 'immutable';
import {
  CHECK_TOKEN,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_ERROR,
  MAP_TO_RECOMMENDER_SUCCESS,
  MAP_TO_RECOMMENDER_ERROR,
} from '../constants';

import checkTokenReducer from '../reducer';

describe(__filename, () => {
  const initialState = fromJS({
    isFetching: false,
    error: null,
    data: null,
    maptoRecommenderData: false,
    maptoRecommenderError: null,
  });
  it('should return the initial state', () => {
    const currentState = checkTokenReducer(undefined, {});
    expect(currentState.toJS()).to.deep.equal(initialState.toJS());
  });

  it('should reduce on CHECK_TOKEN', () => {
    const token = '111111';
    const registryID = '1111111';
    const state = checkTokenReducer(initialState, {
      type: CHECK_TOKEN,
      token,
      registryID,
    });

    expect(state.get('isFetching')).to.equal(true);
  });

  it('should reduce on CHECK_TOKEN_SUCCESS', () => {
    const data = {
      atgResponse: 2,
    };
    const state = checkTokenReducer(initialState, {
      type: CHECK_TOKEN_SUCCESS,
      data,
    });

    expect(state.get('isFetching')).to.equal(false);
  });

  it('should reduce on CHECK_TOKEN_ERROR', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Address must be between 1 and 50 characters.',
      },
    ];
    const state = checkTokenReducer(initialState, {
      type: CHECK_TOKEN_ERROR,
      error,
    });

    expect(state.get('isFetching')).to.equal(false);
  });
  it('should reduce on CHECK_TOKEN_ERROR else', () => {
    const trues = true;
    const state = checkTokenReducer(initialState, {
      type: CHECK_TOKEN_ERROR,
      trues,
    });

    expect(state.get('isFetching')).to.equal(false);
  });
  it('should reduce on MAP_TO_RECOMMENDER_SUCCESS', () => {
    const data = {
      atgResponse: 2,
    };
    const state = checkTokenReducer(initialState, {
      type: MAP_TO_RECOMMENDER_SUCCESS,
      data,
    });

    expect(state.get('maptoRecommenderData')).to.equal(data);
  });

  it('should reduce on MAP_TO_RECOMMENDER_ERROR', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Something went wrong.',
      },
    ];
    const state = checkTokenReducer(initialState, {
      type: MAP_TO_RECOMMENDER_ERROR,
      error,
    });

    expect(state.get('maptoRecommenderError')).to.equal(error);
  });
});
