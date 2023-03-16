import { call, put, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { tellAFriendSuccess, tellAFriendError } from './actions';
import { SUBMIT_TELL_A_FRIEND } from './constants';

export function* tellAFriend({ formdata }) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('tellAFriend'),
      headers: {
        'atg-rest-depth': 0,
      },
      method: 'POST',
      showLoader: true,
      data: qs.stringify({
        'tellAFriendVO.type ': formdata.firstName,
        'tellAFriendVO.senderFirstName': formdata.senderFirstName,
        'tellAFriendVO.senderLastName': formdata.senderLastName,
        'tellAFriendVO.recipientFirstName': formdata.recipientFirstName,
        'tellAFriendVO.recipientLastName': formdata.recipientLastName,
        'tellAFriendVO.senderEmailAddr': formdata.senderEmailAddr,
        'tellAFriendVO.recipientEmailAddr': formdata.recipientEmailAddr,
        'tellAFriendVO.emailCopy': formdata.emailCopy,
      }),
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(tellAFriendSuccess(data));
    }
    return yield put(tellAFriendError(errorMessages));
  } catch (error) {
    return yield put(tellAFriendError(error.body));
  }
}

export function* tellAFriendSaga() {
  yield takeLatest(SUBMIT_TELL_A_FRIEND, tellAFriend);
}

export default [tellAFriendSaga];
