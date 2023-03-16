import { put, takeLatest } from 'redux-saga/effects';
import { signInUserSuccess, signInUserError } from '../actions';
import { signInRecognizedUser, signInRecognizedUserSaga } from '../sagas';
import { SIGN_IN_USER } from '../constants';
import { initiateInactivityModal } from '../../RegistryOwner/actions';

describe('Recognized Login Saga', () => {
  describe('#signInRecognizedUserSaga action', () => {
    let getSignInRecognizerUserGenerator;
    beforeEach(() => {
      getSignInRecognizerUserGenerator = signInRecognizedUserSaga();
    });

    it('should start task to watch for SIGN_IN_USER action', () => {
      const takeLatestDescriptor = getSignInRecognizerUserGenerator.next()
        .value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(SIGN_IN_USER, signInRecognizedUser)
      );
    });
  });
  describe('#signInRecognizedUserSaga', () => {
    let getSignInRecognizerUserGenerator;

    const args = {
      email: 'foo@bar.com',
      password: 'password',
    };

    beforeEach(() => {
      getSignInRecognizerUserGenerator = signInRecognizedUser({
        args,
      });
      getSignInRecognizerUserGenerator.next();
      getSignInRecognizerUserGenerator.next();
    });

    it('should dispatch the "signInUserSuccess" action for success response', () => {
      const signInData = 'SUCCESS';
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: null,
          data: signInData,
        },
      };

      const putNextDescriptor = getSignInRecognizerUserGenerator.next(response)
        .value;
      expect(putNextDescriptor).to.deep.equal(
        put(signInUserSuccess(signInData))
      );
    });

    it('should dispatch the "signInUserError" action for ERROR in response', () => {
      const errorMessages = {
        message: 'Login or Password do not match',
      };
      const response = {
        body: {
          data: null,
          serviceStatus: 'ERROR',
          errorMessages: {
            message: 'Login or Password do not match',
          },
        },
      };
      const putDescriptor = getSignInRecognizerUserGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(put(signInUserError(errorMessages)));
    });
  });

  describe('#signInRecognizedUserSaga for initiateInactivityModal action', () => {
    let getSignInRecognizerUserGenerator;

    const args = {
      email: 'foo@bar.com',
      password: 'password',
    };

    beforeEach(() => {
      getSignInRecognizerUserGenerator = signInRecognizedUser({
        args,
      });
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
      const putDescriptor = getSignInRecognizerUserGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(put(initiateInactivityModal(data)));
    });
  });
});
