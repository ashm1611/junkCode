import { put, takeLatest } from 'redux-saga/effects';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import { LocalStorageUtil } from '@bbb-app/utils/localStorage';
import { setAccountSignInDetailsErrorCookie } from '@bbb-app/account-signin/containers/actionWithInjectSaga';
import {
  FETCH_REG_INPUTS,
  DEFAULT_ERROR_MESSAGE,
  GET_CO_PROFILE_STATUS,
  RESET_CO_PROFILE_STATUS,
  CREATE_REG,
} from '../constants';
import {
  fetchRegistryInputsSuccess,
  fetchRegistryInputsError,
  fetchProfileStatusSuccess,
  resetProfileStatusSuccess,
  fetchProfileStatusError,
} from '../actions';
import {
  registryInputSaga,
  getRegistryInputs,
  createRegistryErrorHandler,
  createRegistry,
  addToRegistry,
  createRegistrySaga,
  createRegistrycall,
} from '../sagas';
import {
  getProfileStatus,
  coRegistrantProfileSaga,
  resetProfileStatusSaga,
  resetProfileStatusDetail,
} from '../coProfileSagas';

describe(__filename, () => {
  describe('#getRegistryInputs Saga', () => {
    let getRegistryInputsGenerator;
    beforeEach(() => {
      const regType = 'BRD';
      const siteId = '1234';
      const thirdParty = {
        wcsid: 'new',
        wcref: '12345',
      };
      getRegistryInputsGenerator = getRegistryInputs({
        regType,
        siteId,
        thirdParty,
      });
      getRegistryInputsGenerator.next();
    });
    it('should dispatch the "fetchRegistryInputsSuccess" action for success response', () => {
      const registryInputList = [
        {
          autoCheck: false,
          displayOnForm: false,
          fieldName: 'showContactAddress',
          id: 'DC1500007',
          requiredInputCreate: false,
          requiredInputUpdate: true,
          requiredToMakeRegPublic: true,
        },
      ];
      const registryInputMap = {
        CoRegistrantEmail: {
          autoCheck: false,
          displayOnForm: true,
          fieldName: 'CoRegistrantEmail',
          id: 'DC1400016',
          requiredInputCreate: false,
          requiredInputUpdate: false,
          requiredToMakeRegPublic: false,
        },
      };
      const data = {
        eventCode: 'BRD',
        eventType: 'Wedding',
        registryInputList,
        registryInputMap,
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      const putDescriptor = getRegistryInputsGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryInputsSuccess(data))
      );
    });
    it('should dispatch the "fetchRegistryInputsSuccess" action for fail response', () => {
      const registryInputList = [
        {
          autoCheck: false,
          displayOnForm: false,
          fieldName: 'showContactAddress',
          id: 'DC1500007',
          requiredInputCreate: false,
          requiredInputUpdate: true,
          requiredToMakeRegPublic: true,
        },
      ];
      const registryInputMap = {
        CoRegistrantEmail: {
          autoCheck: false,
          displayOnForm: true,
          fieldName: 'CoRegistrantEmail',
          id: 'DC1400016',
          requiredInputCreate: false,
          requiredInputUpdate: false,
          requiredToMakeRegPublic: false,
        },
      };
      const data = {
        eventCode: 'BRD',
        eventType: 'Wedding',
        registryInputList,
        registryInputMap,
      };
      const response = {
        body: {
          serviceStatus: 'PARTIAL_SUCCESS',
          errorMessages: { message: 'Partial Error' },
          data,
        },
      };
      const putDescriptor = getRegistryInputsGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryInputsError('Partial Error'))
      );
    });
    it('should dispatch the "fetchRegistryInputsError" action for error response', () => {
      const error = new Error(DEFAULT_ERROR_MESSAGE);
      const response = { body: error };
      const putDescriptor = getRegistryInputsGenerator.throw(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryInputsError(DEFAULT_ERROR_MESSAGE))
      );
    });
  });
  describe('#registryInputSaga Saga', () => {
    let getProfileStatusGenerator;

    beforeEach(() => {
      getProfileStatusGenerator = registryInputSaga();
    });

    it('should start task to watch for FETCH_REG_INPUTS action', () => {
      const takeLatestDescriptor = getProfileStatusGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(FETCH_REG_INPUTS, getRegistryInputs)
      );
    });
  });

  describe('#createRegistry Saga', () => {
    let getProfileStatusGenerator;
    it('should not call addToRegistry if gift card data is empty ', () => {
      const formData = {
        data: {
          thirdPartyParams: [],
          registryEventType: 'BRD',
          'registryVO.registryType.registryTypeName': 'Wedding',
          rbyrCheckbox: true,
          storedValueOptIn: '1',
          pathname: 'PDP',
        },
        labels: { BRD_GiftCard: '' },
        thersholdDayForOldRegistry: '30',
      };
      getProfileStatusGenerator = createRegistry(formData);
      getProfileStatusGenerator.next();
      const data = {
        component: {
          'registryVO.primaryRegistrant.profileId': 'DC58765069',
          'registryVO.registryId': '521142863',
          emailVerReq: true,
          groupGiftingOptIn: true,
        },
        deviceToken: '123456',
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      const localDeviceId = new LocalStorageUtil(true);
      const deviceId = data.deviceToken;
      localDeviceId.saveItem('deviceId', deviceId);

      getProfileStatusGenerator.next(response);
      const spy = sinon.stub(getProfileStatusGenerator, 'addToRegistry');
      expect(spy.called).to.equal(false);
    });
    it('should fetchRegistryInputsError correctly if serviceStatus is Error in response', () => {
      const formData = {
        data: {
          thirdPartyParams: null,
          registryEventType: 'BRD',
          'registryVO.registryType.registryTypeName': 'Wedding',
          rbyrCheckbox: false,
          storedValueOptIn: '1',
          pathname: 'PDP',
        },
        labels: { BRD_GiftCard: '12345_546732' },
        thersholdDayForOldRegistry: '30',
      };
      getProfileStatusGenerator = createRegistry(formData);
      getProfileStatusGenerator.next();

      const errorMessages = {
        error: 'something went wrong',
      };
      const response = {
        body: {
          serviceStatus: 'ERROR',
          data: null,
          errorMessages,
        },
      };

      const putDescriptor = getProfileStatusGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(
        put(fetchRegistryInputsError(errorMessages))
      );
    });
    it('should handle catch correctly when createRegistry throw error ', () => {
      const formData = {
        data: {
          thirdPartyParams: null,
          registryEventType: 'BRD',
          'registryVO.registryType.registryTypeName': 'Wedding',
          rbyrCheckbox: true,
          storedValueOptIn: true,
          pathname: 'PDP',
        },
        labels: { BRD_GiftCard: '12345_546732' },
        thersholdDayForOldRegistry: '30',
      };
      const data = {
        component: {
          'registryVO.primaryRegistrant.profileId': 'DC58765069',
          'registryVO.registryId': '521142863',
          emailVerReq: true,
          groupGiftingOptIn: true,
        },
        deviceToken: '123456',
      };
      const errorMessages = [
        {
          0: { code: 'ECB05280' },
        },
      ];

      const response = {
        body: {
          serviceStatus: 'ERROR',
          data,
          errorMessages,
        },
      };
      const miniCartData = {};
      const akamaiData = {
        country_code: 'IN',
        customer_city: 'testcity',
        customer_state: 'DL',
      };
      const tealiumInfo = {
        product_id: ['112233', '445566'],
        product_name: ['testname'],
      };
      const isNewCreateRegForm = true;
      getProfileStatusGenerator = createRegistrycall(formData, data);

      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next(fromJS(miniCartData));
      getProfileStatusGenerator.next(fromJS(akamaiData));
      getProfileStatusGenerator.next(isNewCreateRegForm);
      getProfileStatusGenerator.next(tealiumInfo);
      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next();
      getProfileStatusGenerator.next();

      try {
        const putDescriptor = getProfileStatusGenerator.throw(response).value;
        expect(putDescriptor).to.deep.equal(createRegistrycall(formData, data));
      } catch (error) {
        const err = {
          statusCode: 400,
          message: DEFAULT_ERROR_MESSAGE,
        };
        const createRegistryErrorHandlerGenerator = createRegistryErrorHandler(
          err
        );
        expect(createRegistryErrorHandlerGenerator.next().value).to.deep.equal(
          put(setAccountSignInDetailsErrorCookie())
        );
      }
    });
    it('should handle createRegistryErrorHandler properly if err has statusCode 400', () => {
      const err = {
        statusCode: 400,
        message: DEFAULT_ERROR_MESSAGE,
      };
      const createRegistryErrorHandlerGenerator = createRegistryErrorHandler(
        err
      );
      expect(createRegistryErrorHandlerGenerator.next().value).to.deep.equal(
        put(setAccountSignInDetailsErrorCookie())
      );
    });
  });

  describe('#createRegistrySaga Saga', () => {
    let getProfileStatusGenerator;

    beforeEach(() => {
      getProfileStatusGenerator = createRegistrySaga();
    });

    it('should start task to watch for CREATE_REG action', () => {
      const takeLatestDescriptor = getProfileStatusGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(CREATE_REG, createRegistry)
      );
    });
  });

  describe('addToRegistry Saga', () => {
    it('should handle addToRegistry correctly when addToRegistry api success', () => {
      const skuId = '77122';
      const prodId = '1077122';
      const registryId = '520589269';
      const eventType = 'Baby';
      const giftCardData = {
        skuId,
        prodId,
        eventType,
        price: '$100.00',
        qty: '1',
        isCustomizationRequired: false,
        refNum: '',
        ltlFlag: 'false',
        altNumber: '',
        ltlShipMethod: null,
        porchPayLoadJson: '',
        isList: false,
        fromComparisonPage: '',
        returnURL: '',
        skipNotifyFlag: 'false',
      };
      const customerId = '12345';
      const addToRegistryGenerator = addToRegistry(
        registryId,
        giftCardData,
        customerId
      );
      addToRegistryGenerator.next();
      expect(addToRegistryGenerator.next().done).to.deep.equal(true);
    });
    it('should handle catch correctly when addToRegistry throw error ', () => {
      const addToRegistryGenerator = addToRegistry({}, { qty: 1 }, null);
      const exception = { message: DEFAULT_ERROR_MESSAGE };
      addToRegistryGenerator.next();
      try {
        addToRegistryGenerator.throw(exception);
      } catch (error) {
        expect(error.message).to.equal(exception.message);
      }
    });
  });

  describe('#getProfileStatus Saga', () => {
    let getProfileStatusGenerator;
    const emailId = 'komal@gmail.com';
    const showLoader = true;
    const inactivityModalState = true;
    beforeEach(() => {
      getProfileStatusGenerator = getProfileStatus(
        emailId,
        showLoader,
        inactivityModalState
      );
      getProfileStatusGenerator.next();
    });
    it('should dispatch the "fetchProfileStatusSuccess" action for success response 2', () => {
      const data = {
        atgResponse: 'true',
      };
      const response = {
        body: {
          serviceStatus: 'SUCCESS',
          data,
        },
      };
      const putDescriptor = getProfileStatusGenerator.next(response).value;
      expect(putDescriptor).to.deep.equal(put(fetchProfileStatusSuccess(data)));
    });
    it('should dispatch the "fetchProfileStatusError" action for success response', () => {
      const data = {
        atgResponse: 'true',
      };
      const response = {
        body: {
          serviceStatus: '',
          errorMessages: { message: '' },
          data,
        },
      };
      const putDescriptor = getProfileStatusGenerator.next(response).value;

      expect(putDescriptor).to.deep.equal(put(fetchProfileStatusError('')));
    });
    it('should call the "fetchProfileStatusError" action for function error', () => {
      const error = '';
      const response = { error };
      const putDescriptor = getProfileStatusGenerator.throw(response).value;

      expect(putDescriptor).to.deep.equal(
        put(fetchProfileStatusError(undefined))
      );
    });
  });

  describe('#onLoginSuccess', () => {
    it('should read the cookie and update the store if the values are not equal', () => {
      const readRecognizedUserCookiesGenerator = resetProfileStatusDetail();
      expect(readRecognizedUserCookiesGenerator.next().value).to.deep.equal(
        put(resetProfileStatusSuccess())
      );
    });
  });
  describe('#onLoginSuccess', () => {
    it('should read the cookie and update the store if the values are not equal', () => {
      const readRecognizedUserCookiesGenerator = resetProfileStatusDetail();
      expect(readRecognizedUserCookiesGenerator.next().value).to.deep.equal(
        put(resetProfileStatusSuccess())
      );
    });
  });
  describe('#coRegistrantProfileSaga Saga', () => {
    let getProfileStatusGenerator;

    beforeEach(() => {
      getProfileStatusGenerator = coRegistrantProfileSaga();
    });

    it('should start task to watch for GET_CO_PROFILE_STATUS action', () => {
      const takeLatestDescriptor = getProfileStatusGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(GET_CO_PROFILE_STATUS, getProfileStatus)
      );
    });
  });
  describe('#resetProfileStatusSaga Saga', () => {
    let resetProfileStatusGenerator;

    beforeEach(() => {
      resetProfileStatusGenerator = resetProfileStatusSaga();
    });

    it('should start task to watch for RESET_CO_PROFILE_STATUS action', () => {
      const takeLatestDescriptor = resetProfileStatusGenerator.next().value;
      expect(takeLatestDescriptor).to.deep.equal(
        takeLatest(RESET_CO_PROFILE_STATUS, resetProfileStatusDetail)
      );
    });
  });
});
