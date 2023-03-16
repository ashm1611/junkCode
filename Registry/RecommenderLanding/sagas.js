import { call, put, takeLatest, select } from 'redux-saga/effects';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { fetchOwnAndRecommendedRegistryDetails } from '@bbb-app/get-registry-details/containers/actions';
import { makeSelectCustomerId } from '@bbb-app/selectors/accountSelectors';
import {
  checkTokenSuccess,
  checkTokenError,
  mapRecommenderSuccess,
  mapRecommenderError,
} from './actions';
import { CHECK_TOKEN, MAP_RECOMMEDNDER, RecommenderVar } from './constants';

export function* validateToken({ token, registryID }) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('validateToken'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        registryId: registryID,
        token,
      },
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(checkTokenSuccess(data));
    }
    return yield put(checkTokenError(errorMessages));
  } catch (error) {
    return yield put(checkTokenError(error.body));
  }
}

export function* mapRecommender(payload) {
  const registryId = payload && payload.data && payload.data.registryId;
  const token = payload && payload.data && payload.data.token;
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('mapToRecommender'),
      method: 'POST',
      data: qs.stringify({
        registryId,
        token,
        isFromFb: false,
      }),
    });

    if (serviceStatus === 'SUCCESS') {
      const customerId = yield select(makeSelectCustomerId());
      yield put(fetchOwnAndRecommendedRegistryDetails(customerId));
      /* istanbul ignore else */
      if (RecommenderVar.token === token) {
        RecommenderVar.token = '';
        RecommenderVar.registryId = '';
      }
      return yield put(mapRecommenderSuccess(data));
    }
    return yield put(mapRecommenderError(errorMessages));
  } catch (err) {
    return yield put(mapRecommenderError(err.body));
  }
}

export function* validateTokenSaga() {
  yield takeLatest(CHECK_TOKEN, validateToken);
}

export function* mapToRecommenderSaga() {
  yield takeLatest(MAP_RECOMMEDNDER, mapRecommender);
}

export default [mapToRecommenderSaga, validateTokenSaga];
