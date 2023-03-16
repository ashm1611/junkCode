import { put, takeLatest } from 'redux-saga/effects';
import { getRegistryCollegeList, registryCollegeNameSaga } from '../sagas';
import { FETCH_COLLEGE_LIST } from '../constants';
import { fetchCollegeListSuccess } from '../actions';

describe('#getRegistryCollegeList Saga', () => {
  let getRegistryCollegeListGenerator;
  beforeEach(() => {
    const payload = { searchTerm: 'uni' };
    getRegistryCollegeListGenerator = getRegistryCollegeList({
      payload,
    });
    getRegistryCollegeListGenerator.next();
  });
  it('should dispatch the "fetchCollegeListSuccess" action for success response', () => {
    const data = [
      {
        college_name: 'Maharishi University of Management (Fairfield, IA)',
      },
    ];
    const response = {
      body: {
        entries: data,
      },
    };
    const putDescriptor = getRegistryCollegeListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(fetchCollegeListSuccess(data)));
  });

  it('should set error message', () => {
    const response = {
      body: {
        serviceStatus: 'ERROR',
        payload: { atgResponse: false },
        errorMessages: 'Error',
      },
    };
    getRegistryCollegeListGenerator.next(response);
  });
  it('should dispatch the action for error response', () => {
    getRegistryCollegeListGenerator.next();
  });
});
describe('#registryCollegeNameSaga Saga', () => {
  let getRegistryCollegeListGenerator;

  beforeEach(() => {
    getRegistryCollegeListGenerator = registryCollegeNameSaga();
  });

  it('should start task to watch for FETCH_COLLEGE_LIST action', () => {
    const takeLatestDescriptor = getRegistryCollegeListGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(FETCH_COLLEGE_LIST, getRegistryCollegeList)
    );
  });
});
