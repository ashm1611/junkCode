import { put } from 'redux-saga/effects';
import { deactivateRegistrySuccess, deactivateRegistryError } from '../actions';

import { deactivateRegistry, deactivateRegistrySaga } from '../sagas';

describe('deactivateRegistrySaga', () => {
  describe('#deactivateRegistry Saga', () => {
    let deactivateRegistrySagaGenerator;
    beforeEach(() => {
      deactivateRegistrySagaGenerator = deactivateRegistry('12345');
      deactivateRegistrySagaGenerator.next();
    });

    it('should dispatch the "deactivateRegistrySuccess" action if response contains no error', () => {
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          errorMessages: { message: '' },
        },
      };
      const putDescriptor = deactivateRegistrySagaGenerator.next(response)
        .value;
      expect(putDescriptor).to.deep.equal(put(deactivateRegistrySuccess()));
    });

    it('should dispatch the "deactivateRegistryError" action if response contains error', () => {
      const response = {
        body: {
          serviceStatus: 'ERROR',
          errorMessages: { message: 'Some Error' },
          data: {},
        },
      };
      const putDescriptor = deactivateRegistrySagaGenerator.next(response)
        .value;

      expect(putDescriptor).to.deep.equal(
        put(deactivateRegistryError(response.body.errorMessages.message))
      );
    });

    it('should call the "deactivateRegistryError" action for error response', () => {
      const error = new Error('some error');
      const response = { body: error };
      const putDescriptor = deactivateRegistrySagaGenerator.throw(response)
        .value;

      expect(putDescriptor).to.deep.equal(put(deactivateRegistryError(error)));
    });
  });
  describe('#deactivateRegistrySaga Saga', () => {
    let deactivateRegistrySagaGenerator;
    it('should call deactivateRegistrySaga', () => {
      deactivateRegistrySagaGenerator = deactivateRegistrySaga();
      deactivateRegistrySagaGenerator.next();
      expect(deactivateRegistry.called);
    });
  });
});
