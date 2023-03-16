import { call, put, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { submitWeddingBookSuccess, submitWeddingBookError } from './actions';
import { SUBMIT_WEDDING_BOOK } from './constants';

export function* weddingBook({ formdata }) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('weddingBook'),
      headers: {
        'atg-rest-depth': 0,
      },
      method: 'POST',
      showLoader: true,
      data: qs.stringify({
        'bridalBookVO.firstName': formdata.firstName,
        'bridalBookVO.lastName': formdata.lastName,
        'bridalBookVO.addressLine1': formdata.addressLine1,
        'bridalBookVO.addressLine2': formdata.addressLine2,
        'bridalBookVO.city': formdata.city,
        'bridalBookVO.state': formdata.selectedState,
        'bridalBookVO.zipcode': formdata.zipcode,
        'bridalBookVO.phoneNumber': formdata.phoneNumber,
        'bridalBookVO.emailOffer': formdata.emailOffer,
        'bridalBookVO.dateAsString': formdata.dateAsString,
        'bridalBookVO.emailAddr': formdata.emailAddr,
      }),
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(submitWeddingBookSuccess(data));
    }
    return yield put(submitWeddingBookError(errorMessages));
  } catch (error) {
    return yield put(submitWeddingBookError(error.body));
  }
}

export function* weddingBookSaga() {
  yield takeLatest(SUBMIT_WEDDING_BOOK, weddingBook);
}

export default [weddingBookSaga];
