import { put, takeLatest, call } from 'redux-saga/effects';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { fetchCollegeListSuccess, fetchCollegeListError } from './actions';
import { FETCH_COLLEGE_LIST } from './constants';

export function* getRegistryCollegeList({ payload }) {
  try {
    const searchTerm = payload.searchTerm;
    const { body: response } = yield call(ServiceUtil.triggerServerRequest, {
      url: `/api/cms/v3/content_types/college/entries?include_count=true&skip=0&limit=100&query={"college_name":{"$regex":"^${searchTerm}","$options":"i"}}&web3feo`,
    });
    if (response.entries)
      return yield put(fetchCollegeListSuccess(response.entries));
    return yield put(fetchCollegeListError(response.entries));
  } catch (error) {
    return yield put(fetchCollegeListError(error.body));
  }
}

export function* registryCollegeNameSaga() {
  yield takeLatest(FETCH_COLLEGE_LIST, getRegistryCollegeList);
}
export default [registryCollegeNameSaga];
