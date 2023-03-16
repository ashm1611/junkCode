import { fromJS } from 'immutable';
import CreateRegistryReducer from '../reducer';

import {
  fetchRegistryInputs,
  fetchRegistryInputsSuccess,
  fetchRegistryInputsError,
  createRegistryData,
  fetchProfileStatus,
  fetchProfileStatusSuccess,
  fetchProfileStatusError,
  updateContactAddressModalVisibility,
  updateShippingAddressModalVisibility,
  updateMovingAddressModalVisibility,
  resetStoreDataAction,
  createRegistryDataSuccess,
  clearCreateRegistry,
  clearCreateRegistryVerType,
  setPassWordError,
  updateSubmitState,
  resetProfileStatus,
  fetchQuizModal,
  clearQuizModal,
  clearErrorState,
  setFormRegType,
  setScroll,
} from '../actions';
import { clearRegistryResponse } from '../actionsWithSagaInjection';
import { DEFAULT_ERROR_MESSAGE } from '../constants';

describe('CreateRegistryReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isFetching: false,
      error: null,
      regInputs: null,
      registryId: null,
      createRegistryModalPopUp: false,
      isFetchingCreateRegCall: false,
      regTypeFormData: null,
      coRegProfileStatus: null,
      isContactAddressModalVisible: false,
      isShippingAddressModalVisible: false,
      isMovingAddressModalVisible: false,
      passwordError: true,
      confirmPasswordError: true,
      submitCalled: false,
      emailVerReq: false,
      verificationType: null,
      phoneLast4Digits: null,
      takeOurQuiz: false,
      scrollPosition: 0,
      skipRegistryPosition: 0,
    });
  });
  it('should return the initial state', () => {
    const expectedResult = state;
    expect(CreateRegistryReducer(undefined, {})).to.deep.equal(expectedResult);
  });
  it('should handle the fetchRegistryInputs action correctly', () => {
    const expectedResult = state.set('isFetching', true);

    expect(
      CreateRegistryReducer(
        state,
        fetchRegistryInputs({ query: { regType: 'BRD' } })
      )
    ).to.deep.equal(expectedResult);
  });
  it('should handle the fetchRegistryInputsSuccess action correctly', () => {
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
    const expectedResult = state
      .set('error', null)
      .set('isFetching', false)
      .set('regInputs', data)
      .set('registryId', null);

    expect(
      CreateRegistryReducer(state, fetchRegistryInputsSuccess(data))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the fetchRegistryInputsError action correctly', () => {
    const error = new Error(DEFAULT_ERROR_MESSAGE);
    const expectedResult = state
      .set('error', error)
      .set('isFetching', false)
      .set('regInputs', null)
      .set('registryId', null);

    expect(
      CreateRegistryReducer(state, fetchRegistryInputsError(error))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the createRegistryData action correctly', () => {
    const expectedResult = state
      .set('createRegistryModalPopUp', true)
      .set('isFetchingCreateRegCall', true)
      .set('regTypeFormData', 'WeddingNew')
      .set('error', null)
      .set('registryId', null);
    const data = {
      atgResponse: 'true',
      'registryVO.registryType.registryTypeName': 'WeddingNew',
    };
    const giftData = {};
    const thersholdDayForOldRegistry = 'Monday';
    expect(
      CreateRegistryReducer(
        state,
        createRegistryData(data, giftData, thersholdDayForOldRegistry)
      )
    ).to.deep.equal(expectedResult);
  });
  it('should handle the fetchProfileStatus action correctly', () => {
    const expectedResult = state
      .set('isProfileStatusFetching', true)
      .set('profileStatusError', null)
      .set('coRegProfileStatus', null);

    const emailId = 'abc@gmail.com';
    expect(
      CreateRegistryReducer(state, fetchProfileStatus(emailId))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the fetchProfileStatusSuccess action correctly', () => {
    const data = {
      atgResponse: 'true',
    };
    const expectedResult = state
      .set('isProfileStatusFetching', false)
      .set('profileStatusError', null)
      .set('coRegProfileStatus', data);

    expect(
      CreateRegistryReducer(state, fetchProfileStatusSuccess(data))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the fetchProfileStatusError action correctly', () => {
    const error = new Error(DEFAULT_ERROR_MESSAGE);
    const expectedResult = state
      .set('isProfileStatusFetching', false)
      .set('profileStatusError', error)
      .set('coRegProfileStatus', null);

    expect(
      CreateRegistryReducer(state, fetchProfileStatusError(error))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the updateContactAddressModalVisibility action correctly', () => {
    const expectedResult = state.set('isContactAddressModalVisible', true);

    expect(
      CreateRegistryReducer(state, updateContactAddressModalVisibility(true))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the updateShippingAddressModalVisibility action correctly', () => {
    const expectedResult = state.set('isShippingAddressModalVisible', true);

    expect(
      CreateRegistryReducer(state, updateShippingAddressModalVisibility(true))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the updateMovingAddressModalVisibility action correctly', () => {
    const expectedResult = state.set('isMovingAddressModalVisible', true);

    expect(
      CreateRegistryReducer(state, updateMovingAddressModalVisibility(true))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the  resetStoreDataAction correctly', () => {
    const expectedResult = state
      .set('emailVerReq', false)
      .set('registryId', null);
    expect(CreateRegistryReducer(state, resetStoreDataAction())).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  createRegistryDataSuccess correctly', () => {
    const data = {
      registryId: '1111',
      component: {
        emailVerReq: true,
        verificationType: 'abc',
        phoneLast4Digits: 'x000',
      },
    };
    const expectedResult = state
      .set('error', null)
      .set('regInputs', null)
      .set('createRegistryModalPopUp', true)
      .set('registryId', data)
      .set('emailVerReq', true)
      .set('verificationType', data.component.verificationType)
      .set('phoneLast4Digits', data.component.phoneLast4Digits)
      .set('userCreated', false);
    expect(
      CreateRegistryReducer(state, createRegistryDataSuccess(data))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the  clearRegistryResponse correctly', () => {
    const expectedResult = state
      .set('registryId', null)
      .set('emailVerReq', false);
    expect(CreateRegistryReducer(state, clearRegistryResponse())).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  clearCreateRegistry correctly', () => {
    const expectedResult = state
      .set('createRegistryModalPopUp', false)
      .set('emailVerReq', false);
    expect(CreateRegistryReducer(state, clearCreateRegistry())).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  clearCreateRegistryVerType correctly', () => {
    const expectedResult = state
      .set('verificationType', null)
      .set('phoneLast4Digits', null)
      .set('userCreated', false);
    expect(
      CreateRegistryReducer(state, clearCreateRegistryVerType())
    ).to.deep.equal(expectedResult);
  });
  it('should handle the  setPassWordError correctly', () => {
    const data = { passwordError: 'incorrect', confirmPasswordError: 'retry' };
    const expectedResult = state
      .set('passwordError', 'incorrect')
      .set('confirmPasswordError', 'retry');
    expect(CreateRegistryReducer(state, setPassWordError(data))).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  updateSubmitState correctly', () => {
    const data = { passwordError: 'incorrect', confirmPasswordError: 'retry' };
    const expectedResult = state
      .set('submitCalled', data)
      .set('emailVerReq', false);
    expect(CreateRegistryReducer(state, updateSubmitState(data))).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  resetProfileStatus correctly', () => {
    const expectedResult = state
      .set('isProfileStatusFetching', false)
      .set('profileStatusError', null)
      .set('coRegProfileStatus', null);
    expect(CreateRegistryReducer(state, resetProfileStatus())).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  fetchQuizModal correctly', () => {
    const expectedResult = state
      .set('createRegistryModalPopUp', true)
      .set('takeOurQuiz', true)
      .set('scrollPosition', 0);
    expect(CreateRegistryReducer(state, fetchQuizModal(0))).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the  setScrollPosition correctly', () => {
    const expectedResult = state.set('skipRegistryPosition', 0);
    expect(CreateRegistryReducer(state, setScroll(0))).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the  clearQuizModal correctly', () => {
    const expectedResult = state.set('takeOurQuiz', false);
    expect(CreateRegistryReducer(state, clearQuizModal())).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  clearErrorState correctly', () => {
    const expectedResult = state.set('error', null);
    expect(CreateRegistryReducer(state, clearErrorState())).to.deep.equal(
      expectedResult
    );
  });
  it('should handle the  setFormRegType correctly', () => {
    const data = { regTypeFormData: 'WeddingNew' };
    const expectedResult = state.set('regTypeFormData', data);
    expect(CreateRegistryReducer(state, setFormRegType(data))).to.deep.equal(
      expectedResult
    );
  });
});
