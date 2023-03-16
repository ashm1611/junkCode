import { takeLatest, put } from 'redux-saga/effects';
import sinon from 'sinon';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { MAP_RECOMMEDNDER, CHECK_TOKEN } from '../constants';
import {
  mapRecommenderSuccess,
  mapRecommenderError,
  checkTokenSuccess,
  checkTokenError,
} from '../actions';
import {
  mapToRecommenderSaga,
  mapRecommender,
  validateToken,
  validateTokenSaga,
} from '../sagas';

describe('map to recommender saga', () => {
  it('should test mapToRecommenderSaga', () => {
    const mapRecommenderSagaGenerator = mapToRecommenderSaga();
    const takeLatestDescriptor = mapRecommenderSagaGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(MAP_RECOMMEDNDER, mapRecommender)
    );
  });
  it('should check the success method of map to recommender saga', () => {
    const data = {
      serviceStatus: 'SUCCESS',
      errorMessages: null,
      data: {
        msg: 'success',
      },
    };
    const response = {
      body: data,
    };
    const payload = { data: { token: null, registryId: 520890927 } };
    const mapToRecommenderSagas = mapRecommender(payload);
    mapToRecommenderSagas.next();
    mapToRecommenderSagas.next(response);
    mapToRecommenderSagas.next(response);
    const putDescriptor = mapToRecommenderSagas.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(
        mapRecommenderSuccess({
          msg: 'success',
        })
      )
    );
  });
  it('should check the error method of map to recommender saga', () => {
    const data = {
      serviceStatus: 'Error',
      errorMessages: 'Invalid Registry Id',
      data: {
        msg: 'success',
      },
    };
    const response = {
      body: data,
    };
    const payload = { data: { token: 1476625083, registryId: 520890927 } };
    const mapToRecommenderSagas = mapRecommender(payload);
    mapToRecommenderSagas.next();
    const putDescriptor = mapToRecommenderSagas.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(mapRecommenderError(data.errorMessages))
    );
  });
  it('should check the error method of map to recommender saga for catch block', () => {
    const payload = { data: { token: 1476625083, registryId: 520890927 } };
    const mapToRecommenderSagas = mapRecommender(payload);
    mapToRecommenderSagas.next();
    const putDescriptor = mapToRecommenderSagas.next().value;
    expect(putDescriptor).to.deep.equal(put(mapRecommenderError(undefined)));
  });
});
describe('validateToken saga', () => {
  it('should test validateToken', () => {
    const validateTokenSagaGenerator = validateTokenSaga();
    const takeLatestDescriptor = validateTokenSagaGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(CHECK_TOKEN, validateToken)
    );
  });
  it('should check the success method of validateTokenSaga saga', () => {
    const data = {
      serviceStatus: 'SUCCESS',
      errorMessages: null,
      data: {
        msg: 'success',
      },
    };
    const response = {
      body: data,
    };
    const payload = { data: { registryId: 520890927, token: 1476625083 } };
    const validateTokenSagas = validateToken(payload);
    validateTokenSagas.next(response);
    const putDescriptor = validateTokenSagas.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(
        checkTokenSuccess({
          msg: 'success',
        })
      )
    );
  });
  it('should check the error method of validateToken saga', () => {
    const data = {
      serviceStatus: 'Error',
      errorMessages: 'Invalid Registry Id',
      data: {
        msg: 'success',
      },
    };
    const response = {
      body: data,
    };
    const payload = { data: { token: 1476625083, registryId: 520890927 } };
    const validateTokenSagas = validateToken(payload);
    validateTokenSagas.next();
    const putDescriptor = validateTokenSagas.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(checkTokenError(data.errorMessages))
    );
  });
  it('should check the error method of validateToken saga for catch block', () => {
    let apiResponse;
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => {
        return new Promise(
          reject => {
            apiResponse = {
              body: {
                serviceStatus: 'Error',
                errorMessages: 'Invalid Registry Id',
                data: {
                  msg: 'success',
                },
              },
            };
            reject(apiResponse);
          },
          () => {}
        );
      });
    const payload = { data: { token: 1476625083, registryId: 520890927 } };
    const validateTokenSagas = validateToken(payload);
    validateTokenSagas.next();
    const putDescriptor = validateTokenSagas.next(apiResponse).value;
    expect(putDescriptor).to.deep.equal(put(checkTokenError(undefined)));
    triggerServerRequestStub.restore();
  });
});
