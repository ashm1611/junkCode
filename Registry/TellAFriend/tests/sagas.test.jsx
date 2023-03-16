import { put, takeLatest } from 'redux-saga/effects';
import { tellAFriend, tellAFriendSaga } from '../sagas';
import { tellAFriendSuccess, tellAFriendError } from '../actions';
import { SUBMIT_TELL_A_FRIEND } from '../constants';

describe('tellAFriend Saga', () => {
  describe('#tellAFriend takelatest trigger', () => {
    let tellAFriendSagaGenerator;
    beforeEach(() => {
      tellAFriendSagaGenerator = tellAFriendSaga();
    });
    it('should dispatch SUBMIT_TELL_A_FRIEND action', () => {
      const takeLatestDescriptor = tellAFriendSagaGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(SUBMIT_TELL_A_FRIEND, tellAFriend)
      );
    });
  });
  let tellAFriendGenerator;
  beforeEach(() => {
    const formdata = {
      firstName: 'Test',
      senderFirstName: 'Test',
      senderLastName: 'Test',
      recipientFirstName: 'Test',
      recipientLastName: 'Test',
      senderEmailAddr: 'test@mail.com',
      recipientEmailAddr: 'test@mail.com',
      emailCopy: 'test@mail.com',
    };
    tellAFriendGenerator = tellAFriend({ formdata });
    tellAFriendGenerator.next();
  });
  it('should dispatch the "tellAFriendSuccess" action for success response', () => {
    const data = {
      formdata: {},
    };
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
        data,
      },
    };
    const putDescriptor = tellAFriendGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(tellAFriendSuccess(data)));
  });
  it('should call the "tellAFriendError" action for  error', () => {
    const error = new Error('some error');
    const response = { body: error };
    const putDescriptor = tellAFriendGenerator.throw(response).value;
    expect(putDescriptor).to.deep.equal(put(tellAFriendError(error)));
  });
  it('should call the "tellAFriendError" action for  api error ', () => {
    const errorMessages = [{ message: 'an error message' }];
    const response = {
      body: {
        serviceStatus: 'ERROR',
        errorMessages,
        data: null,
      },
    };
    const putDescriptor = tellAFriendGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(tellAFriendError(errorMessages)));
  });
});
