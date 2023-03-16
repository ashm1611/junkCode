import { put, takeLatest } from 'redux-saga/effects';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { giftAlertOptinRegistryDetailsSuccess } from '@bbb-app/get-registry-details/containers/actions';
import {
  fetchTymDataSuccess,
  fetchTymDataError,
  revealThankYouListSuccess,
  revealThankYouListError,
} from '../actions';
import {
  FETCH_TYM_DATA,
  REVEAL_THANK_YOU_LIST,
  ADD_EDIT_TYM_ADDRESS,
} from '../constants';
import { fetchTymData } from '../ActionsWithSagaInjection';

import {
  getThankYouList,
  revealThankYouList,
  revealThankYouListSaga,
  tymListSaga,
} from '../sagas';
import { addEditAddress, addEditAddressSaga } from '../addEditAddressSaga';

import { initiateInactivityModal } from '../../RegistryOwner/actions';

describe('Thank You List Saga', () => {
  it('should dispatch the "fetchTymDataSuccess" action for success response', () => {
    const tymRegistryId = '11122';
    const contentIdArgs = ['9942', '9943'];
    const sortOrder = '1';
    const sortDirection = '1';
    const getThankYouListGenerator = getThankYouList({
      tymRegistryId,
      contentIdArgs,
      sortOrder,
      sortDirection,
    });
    getThankYouListGenerator.next();
    getThankYouListGenerator.next();
    const tymData = { giftSurpriseEnabled: 'false' };
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
        data: tymData,
      },
    };

    const putDescriptor = getThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(fetchReferredContent(contentIdArgs))
    );

    const putNextDescriptor = getThankYouListGenerator.next(response).value;
    expect(putNextDescriptor).to.deep.equal(put(fetchTymDataSuccess(tymData)));
  });

  it('should dispatch the "fetchReferredContent" action for getThankYouList success response', () => {
    const tymRegistryId = '11122';
    const contentIdArgs = ['9942', '9943'];
    const sortOrder = '1';
    const sortDirection = '1';
    const getThankYouListGenerator = getThankYouList({
      tymRegistryId,
      contentIdArgs,
      sortOrder,
      sortDirection,
    });
    getThankYouListGenerator.next();
    getThankYouListGenerator.next();
    const tymData = { giftSurpriseEnabled: 'true' };
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
        data: tymData,
      },
    };
    const putDescriptor = getThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(fetchReferredContent(contentIdArgs))
    );
  });

  it('should dispatch the "fetchTymDataError" action for ERROR in response', () => {
    const tymRegistryId = '11122';
    const contentIdArgs = ['9942', '9943'];
    const sortOrder = '1';
    const sortDirection = '1';
    const getThankYouListGenerator = getThankYouList({
      tymRegistryId,
      contentIdArgs,
      sortOrder,
      sortDirection,
    });
    getThankYouListGenerator.next();
    getThankYouListGenerator.next();
    const errorMessages = {
      message: 'Invalid or Missing _dynSessConf in request Heaader.',
    };
    const response = {
      body: {
        data: null,
        serviceStatus: 'ERROR',
        errorMessages: {
          message: 'Invalid or Missing _dynSessConf in request Heaader.',
        },
      },
    };
    const putDescriptor = getThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(fetchTymDataError(errorMessages)));
  });

  it('should dispatch the "fetchTymDataError" action for error response', () => {
    const tymRegistryId = '11122';
    const contentIdArgs = ['9942', '9943'];
    const sortOrder = '1';
    const sortDirection = '1';
    const getThankYouListGenerator = getThankYouList({
      tymRegistryId,
      contentIdArgs,
      sortOrder,
      sortDirection,
    });
    getThankYouListGenerator.next();
    getThankYouListGenerator.next();
    const error = new Error('some error');
    const response = { body: error };
    const putDescriptor = getThankYouListGenerator.throw(response).value;
    expect(putDescriptor).to.deep.equal(put(fetchTymDataError(error)));
  });

  it('should dispatch the "initiateInactivityModal" action for success response 1', () => {
    const tymRegistryId = '11122';
    const contentIdArgs = ['9942', '9943'];
    const sortOrder = '1';
    const sortDirection = '1';
    const getThankYouListGenerator = getThankYouList({
      tymRegistryId,
      contentIdArgs,
      sortOrder,
      sortDirection,
    });
    const data = true;
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: 'error',
        inactivityModalState: true,
      },
    };
    const putDescriptor = getThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(initiateInactivityModal(data)));
  });

  it('should dispatch the "revealThankYouListSuccess" action for success response', () => {
    const registryId = '11122';
    const revealThankYouListGenerator = revealThankYouList(registryId);
    revealThankYouListGenerator.next();
    revealThankYouListGenerator.next();
    const tymData = { giftSurpriseEnabled: 'false' };
    const response = {
      body: {
        data: tymData,
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const giftAlertData = 'Y';
    const responseGiftAlert = {
      body: {
        serviceStatus: 'SUCCESS',
        data: { giftSurpriseEnabled: 'false' },
        errorMessages: null,
      },
    };
    revealThankYouListGenerator.next();
    const putDescriptorGiftAlert = revealThankYouListGenerator.next(
      responseGiftAlert
    ).value;
    expect(putDescriptorGiftAlert).to.deep.equal(
      put(giftAlertOptinRegistryDetailsSuccess(giftAlertData))
    );
    const putDescriptor = revealThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(revealThankYouListSuccess(tymData))
    );
  });

  it('should dispatch the "revealThankYouListSuccess" action for success response when notification feature is ON', () => {
    const registryId = '11122';
    const revealThankYouListGenerator = revealThankYouList(registryId);
    revealThankYouListGenerator.next();
    revealThankYouListGenerator.next();
    const tymData = { giftSurpriseEnabled: 'false' };
    const response = {
      body: {
        data: tymData,
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const giftAlertData = 'Y';
    const responseGiftAlert = {
      body: {
        serviceStatus: 'SUCCESS',
        data: { giftSurpriseEnabled: 'false' },
        errorMessages: null,
      },
    };
    revealThankYouListGenerator.next(true);
    const putDescriptorGiftAlert = revealThankYouListGenerator.next(
      responseGiftAlert
    ).value;
    expect(putDescriptorGiftAlert).to.deep.equal(
      put(giftAlertOptinRegistryDetailsSuccess(giftAlertData))
    );
    const putDescriptor = revealThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(revealThankYouListSuccess(tymData))
    );
  });

  it('should dispatch the "revealThankYouListError" action for error response - output 1', () => {
    const registryId = '11122';
    const revealThankYouListGenerator = revealThankYouList(registryId);
    revealThankYouListGenerator.next();
    revealThankYouListGenerator.next();
    const response = {
      body: {
        data: {},
        serviceStatus: 'error',
        errorMessages: 'error:error',
      },
    };
    revealThankYouListGenerator.next();

    const putDescriptor = revealThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(revealThankYouListError('error:error'))
    );
  });

  it('should dispatch the "revealThankYouListError" action for error response', () => {
    const registryId = '11122';
    const revealThankYouListGenerator = revealThankYouList(registryId);
    revealThankYouListGenerator.next();
    revealThankYouListGenerator.next();
    const error = new Error('some error');
    const response = { body: error };
    revealThankYouListGenerator.next();
    const putDescriptor = revealThankYouListGenerator.throw(response).value;
    expect(putDescriptor).to.deep.equal(put(revealThankYouListError(error)));
  });

  it('should dispatch the "initiateInactivityModal" action for success response 2', () => {
    const registryId = '11122';
    const revealThankYouListGenerator = revealThankYouList(registryId);

    const data = true;
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: 'error',
        inactivityModalState: true,
      },
    };
    const putDescriptor = revealThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(initiateInactivityModal(data)));
  });

  it('should dispatch the "fetchTYMData" action for Add EDIT TYM success response', () => {
    const args = {
      editAddress: true,
      data: {
        addressLine1: 'ffknsskdsn test',
        rowId: 'AAAQfjAAMAAE2iVAAl',
      },
    };
    const updatedData = {
      result: true,
      component: {
        absoluteName: 'fjddfjdff ddabdfbd',
      },

      contentIdArgs: [],
    };
    const response = {
      body: {
        data: updatedData,
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const addEditThankYouListGenerator = addEditAddress({ args });
    addEditThankYouListGenerator.next();
    addEditThankYouListGenerator.next();
    const putDescriptor = addEditThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(
      put(fetchTymData(updatedData.registryId, updatedData.contentIdArgs))
    );
  });

  it('should dispatch the "fetchTymDataError" action for Add Edit TYM ERROR in response', () => {
    const args = {
      editAddress: true,
      data: {
        addressLine1: 'ffknsskdsn test',
        rowId: 'AAAQfjAAMAAE2iVAAl',
      },
    };
    const errorMessages = {
      message: 'Invalid or Missing _dynSessConf in request Heaader.',
    };
    const response = {
      body: {
        data: null,
        serviceStatus: 'ERROR',
        errorMessages: {
          message: 'Invalid or Missing _dynSessConf in request Heaader.',
        },
      },
    };
    const addEditThankYouListGenerator = addEditAddress({ args });
    addEditThankYouListGenerator.next();
    addEditThankYouListGenerator.next();
    const putDescriptor = addEditThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(fetchTymDataError(errorMessages)));
  });

  it('should dispatch the "initiateInactivityModal" action for success response 3', () => {
    const args = {
      editAddress: true,
      data: {
        addressLine1: 'ffknsskdsn test',
        giftReceived: true,
        wasReturned: true,
        thankYouSent: true,
        rowId: 'AAAQfjAAMAAE2iVAAl',
      },
    };
    const addEditThankYouListGenerator = addEditAddress({ args });

    const data = true;
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: 'error',
        inactivityModalState: true,
      },
    };
    const putDescriptor = addEditThankYouListGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(initiateInactivityModal(data)));
  });

  it('should start a task to watch for "FETCH_TYM_DATA" action', () => {
    const tymListSagaGenerator = tymListSaga();

    const takeLatestDescriptor = tymListSagaGenerator.next().value;

    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(FETCH_TYM_DATA, getThankYouList)
    );
  });

  it('should start a task to watch for "REVEAL_THANK_YOU_LIST" action', () => {
    const revealThankYouListSagaGenerator = revealThankYouListSaga();

    const takeLatestDescriptor = revealThankYouListSagaGenerator.next().value;

    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(REVEAL_THANK_YOU_LIST, revealThankYouList)
    );
  });

  it('should start a task to watch for "ADD_EDIT_TYM_ADDRESS" action', () => {
    const addEditAddressSagaGenerator = addEditAddressSaga();

    const takeLatestDescriptor = addEditAddressSagaGenerator.next().value;

    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(ADD_EDIT_TYM_ADDRESS, addEditAddress)
    );
  });
});
