import { fromJS } from 'immutable';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';

import RegistryDetailReducer from '../reducer';
import {
  fetchRegistryDataError,
  activeRegistryCallSuccess,
  activeRegistryCallError,
  fetchRegistryDataSuccess,
  setTrackFlag,
  updateRemoveItemData,
  editRegistryFromMoreInformationBtn,
  setShowChecklist,
} from '../actions';

import {
  fetchRegistryData,
  updateFilterCount,
  closeOtherOpenModal,
  makeActiveRegistryCall,
  shownRegistryMyAnalyzerBtn,
} from '../RegistryDetailsSagaInjection';
import { clearGuestViewData } from '../../GuestViewer/actionWithReducerInjection';
import { fetchRegistryDataonServer } from '../RegistryDetailsSagaInjectionOnServer';
import { fetchTymDataSuccess } from '../../ThankYouManager/actions';
import { fetchTymData } from '../../ThankYouManager/ActionsWithSagaInjection';
import {
  DEFAULT_ERROR_MESSAGE,
  UPDATE_RBYR_OPT_IN,
  UPDATE_GROUP_GIFT_OPT_IN,
  FETCH_TYM_DATA_ERROR,
} from '../constants';

import {
  updateGiftDataAction,
  updateDashboardDataAction,
} from '../RegistryOwnerAction';

describe('RegistryDetailReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      hasShownAnalyzerBtn: false,
      isFetching: true,
      data: {},
      error: null,
      remainingCategoryError: null,
      tymData: {},
      isContactAddressModalVisible: false,
      isShippingAddressModalVisible: false,
      isMovingAddressModalVisible: false,
      activeRegistryCallFlag: false,
      filterCount: 0,
      trackFlag: false,
      regResponse: null,
      isEditRegistryFromMoreInfoBtn: false,
      showChecklist: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state
      .set('hasShownAnalyzerBtn', false)
      .set('error', null)
      .set('isFetching', true)
      .set('data', null)
      .set('tymData', null)
      .set('isContactAddressModalVisible', false)
      .set('isShippingAddressModalVisible', false)
      .set('isMovingAddressModalVisible', false)
      .set('activeRegistryCallFlag', false)
      .set('regResponse', null);
    expect(RegistryDetailReducer(undefined, fetchRegistryData())).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the fetchRegistryDataError action correctly', () => {
    const error = new Error(DEFAULT_ERROR_MESSAGE);
    const expectedResult = state
      .set('error', error)
      .set('isFetching', false)
      .set('data', null);

    expect(
      RegistryDetailReducer(state, fetchRegistryDataError(error))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the editRegistryFromMoreInformationBtn action correctly', () => {
    const expectedResult = state.set('isEditRegistryFromMoreInfoBtn', false);
    expect(
      RegistryDetailReducer(state, editRegistryFromMoreInformationBtn(false))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the setShowChecklist action correctly', () => {
    const expectedResult = state.set('showChecklist', true);
    expect(RegistryDetailReducer(state, setShowChecklist(true))).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the closeOtherOpenModal action correctly', () => {
    const expectedResult = state.set('closeOtherModal', true);

    expect(
      RegistryDetailReducer(state, closeOtherOpenModal(true))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the makeActiveRegistryCall action correctly', () => {
    const expectedResult = state.set('activeRegistryCallFlag', true);
    expect(
      RegistryDetailReducer(state, makeActiveRegistryCall())
    ).to.deep.equal(expectedResult);
  });

  it('should handle the activeRegistryCallSuccess action correctly', () => {
    const expectedResult = state.set('activeRegistryCallFlag', false);
    expect(
      RegistryDetailReducer(state, activeRegistryCallSuccess(true))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the activeRegistryCallError action correctly', () => {
    const expectedResult = state.set('activeRegistryCallFlag', false);
    expect(
      RegistryDetailReducer(state, activeRegistryCallError('Error'))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryDataonServer action correctly', () => {
    const args = {};
    const expectedResult = state
      .set('isFetching', true)
      .set('error', null)
      .set('data', null)
      .set('tymData', null);
    expect(
      RegistryDetailReducer(state, fetchRegistryDataonServer(args))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchRegistryDataSuccess action correctly', () => {
    const data = {};
    const header = {};
    const expectedResult = state
      .set('isFetching', false)
      .set('error', null)
      .set('trackFlag', true)
      .set('data', data)
      .set('regResponse', header);
    expect(
      RegistryDetailReducer(state, fetchRegistryDataSuccess(data, header))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the clearGuestViewData action correctly', () => {
    const expectedResult = state
      .set('isFetching', false)
      .set('error', null)
      .set('data', null);
    expect(RegistryDetailReducer(state, clearGuestViewData())).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the fetchTymData action correctly', () => {
    const registryId = '';
    const contentIdArgs = [];
    const sortOrder = '0';
    const sortDirection = '0';
    const expectedResult = state.set('tymData', null);
    expect(
      RegistryDetailReducer(
        state,
        fetchTymData(registryId, contentIdArgs, sortOrder, sortDirection)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchTymDataSuccess action correctly', () => {
    const registryId = {};
    const data = {};
    const expectedResult = state.set('tymData', data);
    expect(
      RegistryDetailReducer(state, fetchTymDataSuccess(registryId, data))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the fetchTymDataError action correctly', () => {
    const error = {};
    const actionData = { type: FETCH_TYM_DATA_ERROR, error };
    const expectedResult = state.set('tymData', error);
    expect(RegistryDetailReducer(state, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the updateFilterCount action correctly', () => {
    const filterCountValue = 1;
    const filterCount = 1;
    const expectedResult = state
      .set('isFetching', false)
      .set('error', null)
      .set('filterCount', filterCountValue);
    expect(
      RegistryDetailReducer(state, updateFilterCount(filterCount))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the updateRemoveItemData action correctly', () => {
    const actualData = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 2,
          giftPurchased: 1,
          giftTotalPurchased: 1,
        },
      },
    };
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 1,
          giftPurchased: 1,
          giftTotalPurchased: 1,
        },
      },
    };
    const storeConfig = {
      get: () => actualData,
      set: () => ({ set: () => ({ set: () => expectedResult }) }),
    };

    expect(
      RegistryDetailReducer(storeConfig, updateRemoveItemData(1, 1, false))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the updateRemoveItemData action correctly in case of undo', () => {
    const actualData = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 2,
          giftPurchased: 1,
          giftTotalPurchased: 1,
        },
      },
    };
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 3,
          giftPurchased: 1,
          giftTotalPurchased: 1,
        },
      },
    };
    const storeConfig = {
      get: () => actualData,
      set: () => ({ set: () => ({ set: () => expectedResult }) }),
    };

    expect(
      RegistryDetailReducer(storeConfig, updateRemoveItemData(1, 1, true))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the updateRemoveItemData action correctly when registryData is not available', () => {
    const initialState = fromJS({});
    const expectedResult = initialState
      .set('isFetching', false)
      .set('error', null)
      .set('data', undefined);
    expect(
      RegistryDetailReducer(initialState, updateRemoveItemData(1, 1, false))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the shownRegistryMyAnalyzerBtn action correctly', () => {
    const hasShown = false;
    const expectedResult = state.set('hasShownAnalyzerBtn', hasShown);
    expect(
      RegistryDetailReducer(state, shownRegistryMyAnalyzerBtn(hasShown))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the initiateInactivityModal action', () => {
    const inactivityModalState = false;
    const expectedResult = state.set(
      'inactivityModalReset',
      inactivityModalState
    );

    expect(
      RegistryDetailReducer(
        state,
        initiateInactivityModal(inactivityModalState)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the setTrackFlag action correctly', () => {
    const expectedResult = state.set('trackFlag', !true);
    expect(RegistryDetailReducer(state, setTrackFlag())).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the default action type', () => {
    const actionData = { type: 'null' };
    const result = RegistryDetailReducer(state, actionData);

    expect(result).to.deep.equal(state);
  });

  it('should handle the UPDATE_RBYR_OPT_IN action correctly', () => {
    const actualData = {
      registryResVO: {
        registrySummaryVO: { storedValueOptIn: false },
      },
    };
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: { storedValueOptIn: true },
      },
    };
    const storeConfig = {
      get: () => actualData,
      set: () => expectedResult,
    };

    const actionData = { type: UPDATE_RBYR_OPT_IN, isOptIn: true };

    expect(RegistryDetailReducer(storeConfig, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the UPDATE_RBYR_OPT_IN action correctly when registryResVO is not available in response', () => {
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: { storedValueOptIn: true },
      },
    };
    const storeConfig = {
      get: () => {},
      set: () => expectedResult,
    };

    const actionData = { type: UPDATE_RBYR_OPT_IN, isOptIn: true };

    expect(RegistryDetailReducer(storeConfig, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the UPDATE_GROUP_GIFT_OPT_IN action correctly', () => {
    const actionData = {
      type: UPDATE_GROUP_GIFT_OPT_IN,
      isGroupGiftOptIn: true,
    };
    const actualData = {
      registryResVO: {
        registrySummaryVO: { groupGiftOptIn: false },
      },
    };
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: { groupGiftOptIn: true },
      },
    };
    const storeConfig = {
      get: () => actualData,
      set: () => expectedResult,
    };
    expect(RegistryDetailReducer(storeConfig, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the UPDATE_GIFT_DATA action type correctly when registryResVO is not available in response', () => {
    const actionData = {
      type: UPDATE_GROUP_GIFT_OPT_IN,
      isGroupGiftOptIn: true,
    };
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: { groupGiftOptIn: true },
      },
    };
    const storeConfig = {
      get: () => {},
      set: () => expectedResult,
    };
    expect(RegistryDetailReducer(storeConfig, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the updateGiftDataAction action correctly', () => {
    const actualData = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 2,
          giftPurchased: 1,
          giftTotalPurchased: 1,
        },
      },
    };
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 3,
          giftPurchased: 1,
          giftTotalPurchased: 1,
        },
      },
    };
    const storeConfig = {
      get: () => actualData,
      set: () => ({ set: () => ({ set: () => expectedResult }) }),
    };
    expect(
      RegistryDetailReducer(storeConfig, updateGiftDataAction(1, 1))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the updateGiftDataAction action correctly when registryResVO is not available in response', () => {
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 3,
          giftPurchased: 1,
          giftTotalPurchased: 1,
        },
      },
    };
    const storeConfig = {
      get: () => {},
      set: () => ({ set: () => ({ set: () => expectedResult }) }),
    };
    expect(
      RegistryDetailReducer(storeConfig, updateGiftDataAction(1, 1))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the updateDashboardDataAction action correctly', () => {
    const actualData = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 2,
        },
      },
    };
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 3,
        },
      },
    };
    const storeConfig = {
      get: () => actualData,
      set: () => ({ set: () => ({ set: () => expectedResult }) }),
    };
    expect(
      RegistryDetailReducer(storeConfig, updateDashboardDataAction(1))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the updateDashboardDataAction action correctly when registryResVO is not available in response', () => {
    const expectedResult = {
      registryResVO: {
        registrySummaryVO: {
          giftRegistered: 3,
        },
      },
    };
    const storeConfig = {
      get: () => {},
      set: () => ({ set: () => ({ set: () => expectedResult }) }),
    };
    expect(
      RegistryDetailReducer(storeConfig, updateDashboardDataAction(1))
    ).to.deep.equal(expectedResult);
  });
});
