import { put, takeLatest } from 'redux-saga/effects';
import { initiateInactivityModal } from '../../RegistryOwner/actions';
import {
  fetchEditRegistryDataError,
  fetchEditRegistryDataSuccess,
} from '../actions';
import { FETCH_EDIT_REGISTRY_DATA } from '../constants';
import { fetchEditRegistryData, editRegistrySaga } from '../sagas';

describe('#fetchEditRegistriesDetails Saga for  initiateInactivityModal  action', () => {
  let getProfileRegistriesGenerator;
  let customerData;
  beforeEach(() => {
    customerData = { customerId: '1111' };
    getProfileRegistriesGenerator = fetchEditRegistryData(customerData);
  });
  it('should dispatch the "initiateInactivityModal" action for success response', () => {
    const data = true;
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: 'error',
        inactivityModalState: true,
      },
    };
    const putDescriptor = getProfileRegistriesGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(initiateInactivityModal(data)));
  });
  it('should dispatch the "fetchEditRegistryDataSuccess" action for success response', () => {
    const data = {
      data: {},
      errorMessage: null,
    };
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: 'error',
        inactivityModalState: true,
        data,
      },
    };
    getProfileRegistriesGenerator.next();
    getProfileRegistriesGenerator.next();
    const putDescriptor = getProfileRegistriesGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(fetchEditRegistryDataSuccess(data))
    );
  });
  it('should not dispatch the "fetchEditRegistryDataSuccess" action if errorMessage is not null', () => {
    const data = {
      data: {},
      errorMessage: {},
    };
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: 'error',
        inactivityModalState: true,
        data,
      },
    };
    getProfileRegistriesGenerator.next();
    getProfileRegistriesGenerator.next();
    const putDescriptor = getProfileRegistriesGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(fetchEditRegistryDataError(response.body.errorMessages))
    );
  });
});

describe('getProfileRegistriesDetailsSaga', () => {
  describe('#fetchRegistriesDetails Saga', () => {
    let getProfileRegistriesGenerator;
    let customerData;
    beforeEach(() => {
      customerData = { customerId: '1111' };
      getProfileRegistriesGenerator = fetchEditRegistryData(customerData);
      getProfileRegistriesGenerator.next();
      getProfileRegistriesGenerator.next();
    });
    it('should dispatch the "fetchRegistriesDetailsError" action for error response', () => {
      const error = new Error('some error');
      const response = { body: error };
      const putDescriptor = getProfileRegistriesGenerator.throw(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchEditRegistryDataError(error))
      );
    });
  });
  describe('#editRegistrySaga', () => {
    let editRegistrySagaGenerator;

    beforeEach(() => {
      editRegistrySagaGenerator = editRegistrySaga();
    });
    it('should start task to watch for FETCH_EDIT_REGISTRY_DATA action', () => {
      const takeLatestDescriptor = editRegistrySagaGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_EDIT_REGISTRY_DATA, fetchEditRegistryData)
      );
    });
  });
});
