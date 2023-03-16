import { put, takeLatest, call } from 'redux-saga/effects';
import ServiceUtils from '@bbb-app/utils/serviceUtil';
import consoleLog from '@bbb-app/utils/logger';
import qs from 'qs';
import { contributeCashFundSuccess, contributeCashFundError } from './actions';
import { CONTRIBUTE_CASH_FUND, DEFAULT_ERROR_MESSAGE } from './constants';

export function* contributeCashFund(payload) {
  try {
    const {
      body: { data, errorMessages, serviceStatus },
    } = yield call(ServiceUtils.triggerServerRequest, {
      url: `/apis/stateful/v1.0/registry/saveCashFund`,
      method: 'POST',
      showLoader: true,
      data: qs.stringify(payload.data),
    });
    if (serviceStatus === 'SUCCESS' && data.atgResponse === true) {
      yield put(contributeCashFundSuccess());
    } else {
      consoleLog.error(errorMessages);
      yield put(contributeCashFundError());
    }
  } catch (error) {
    consoleLog.error((error && error.errorMessage) || DEFAULT_ERROR_MESSAGE);
    yield put(contributeCashFundError());
  }
}

export function* contributeCashFundSaga() {
  yield takeLatest(CONTRIBUTE_CASH_FUND, contributeCashFund);
}

export default [contributeCashFundSaga];
