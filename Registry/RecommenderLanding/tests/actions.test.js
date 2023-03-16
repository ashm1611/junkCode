import {
  CHECK_TOKEN,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_ERROR,
  MAP_TO_RECOMMENDER_SUCCESS,
  MAP_TO_RECOMMENDER_ERROR,
} from '../constants';

import {
  checkToken,
  checkTokenSuccess,
  checkTokenError,
  mapRecommenderError,
  mapRecommenderSuccess,
} from '../actions';

describe(__filename, () => {
  it('should dispatch action checkToken', () => {
    const token = '111111';
    const registryID = '1111111';
    const expectedResult = {
      type: CHECK_TOKEN,
      token,
      registryID,
    };
    expect(checkToken(token, registryID)).to.deep.equal(expectedResult);
  });

  it('should dispatch action sumitWeddingBookSuccess', () => {
    const data = {
      atgResponse: 2,
    };
    const expectedResult = {
      type: CHECK_TOKEN_SUCCESS,
      data,
    };

    expect(checkTokenSuccess(data)).to.deep.equal(expectedResult);
  });

  it('should dispatch action sumitWeddingBookError', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Address must be between 1 and 50 characters.',
      },
    ];
    const expectedResult = {
      type: CHECK_TOKEN_ERROR,
      error,
    };
    expect(checkTokenError(error)).to.deep.equal(expectedResult);
  });

  it('should dispatch action mapRecommenderSuccess', () => {
    const data = {
      atgResponse: true,
    };
    const expectedResult = {
      type: MAP_TO_RECOMMENDER_SUCCESS,
      data,
    };

    expect(mapRecommenderSuccess(data)).to.deep.equal(expectedResult);
  });

  it('should dispatch action mapRecommenderError', () => {
    const error = [
      {
        code: 'ECB04463',
        message: 'Something went wrong.',
      },
    ];
    const expectedResult = {
      type: MAP_TO_RECOMMENDER_ERROR,
      error,
    };

    expect(mapRecommenderError(error)).to.deep.equal(expectedResult);
  });
});
