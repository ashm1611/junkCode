import { fromJS } from 'immutable';
import EditRegistryDetailReducer, {
  handleEditRegistryDetails,
  handleModalQASState,
} from '../reducer';
import {
  updateContactAddressModalVisibility,
  updateShippingAddressModalVisibility,
  updateMovingAddressModalVisibility,
  updateTymTabClickStatus,
} from '../actions';
import {
  FETCH_EDIT_REGISTRY_DATA,
  FETCH_EDIT_REGISTRY_DATA_SUCCESS,
  FETCH_EDIT_REGISTRY_DATA_ERROR,
  CLEAR_EDIT_REGISTRY_DATA,
  UPDATE_TYM_TAB_CLICK_STATUS,
} from '../constants';

describe('EditRegistryDetailReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      closeEditModal: false,
      isContactAddressModalVisible: false,
      isShippingAddressModalVisible: false,
      isMovingAddressModalVisible: false,
      isFetchingEditRegistryDetails: false,
      isTymTabClicked: false,
      data: {},
      error: null,
      modalEditMount: false,
    });
  });

  it('should handle the updateTymTabClickStatus action correctly', () => {
    const expectedResult = state.set('isTymTabClicked', true);

    expect(
      EditRegistryDetailReducer(state, updateTymTabClickStatus(true))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_EDIT_REGISTRY action correctly', () => {
    const expectedResult = state.set('isContactAddressModalVisible', true);

    expect(
      EditRegistryDetailReducer(
        state,
        updateContactAddressModalVisibility(true)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_EDIT_REGISTRY action correctly', () => {
    const expectedResult = state.set('isShippingAddressModalVisible', true);

    expect(
      EditRegistryDetailReducer(
        state,
        updateShippingAddressModalVisibility(true)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_EDIT_REGISTRY action correctly', () => {
    const expectedResult = state.set('isMovingAddressModalVisible', true);

    expect(
      EditRegistryDetailReducer(state, updateMovingAddressModalVisibility(true))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the undefined state correctly', () => {
    state = undefined;
    const expectedResult = fromJS({
      closeEditModal: false,
      isContactAddressModalVisible: false,
      isShippingAddressModalVisible: false,
      isMovingAddressModalVisible: false,
      isFetchingEditRegistryDetails: false,
      isTymTabClicked: false,
      data: {},
      error: null,
      modalEditMount: false,
    });
    expect(EditRegistryDetailReducer(state, { type: 'abc' })).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the FETCH_EDIT_REGISTRY_DATA  action if timerFlag and openEdit are false', () => {
    const expectedResult = state.set('isFetchingEditRegistryDetails', true);
    expect(
      EditRegistryDetailReducer(state, { type: FETCH_EDIT_REGISTRY_DATA })
    ).to.deep.equal(expectedResult);
  });

  it('should handle the FETCH_EDIT_REGISTRY_DATA  action if timerFlag is true', () => {
    const expectedResult = state
      .set('isFetchingEditRegistryDetails', true)
      .set('timerInactivity', true);
    expect(
      EditRegistryDetailReducer(state, {
        type: FETCH_EDIT_REGISTRY_DATA,
        timerFlag: true,
      })
    ).to.deep.equal(expectedResult);
  });

  it('should handle the FETCH_EDIT_REGISTRY_DATA  action if openEdit is true', () => {
    const expectedResult = state
      .set('isFetchingEditRegistryDetails', true)
      .set('modalEditMount', true);
    expect(
      EditRegistryDetailReducer(state, {
        type: FETCH_EDIT_REGISTRY_DATA,
        openEdit: true,
      })
    ).to.deep.equal(expectedResult);
  });

  it('should handle the FETCH_EDIT_REGISTRY_DATA_SUCCESS  action correctly', () => {
    const data = {};
    const expectedResult = state
      .set('isFetchingEditRegistryDetails', false)
      .set('editRegistryData', data)
      .set('timerInactivity', false)
      .set('isEditModalOpen', true)
      .set('modalEditMount', false);
    expect(
      EditRegistryDetailReducer(state, {
        type: FETCH_EDIT_REGISTRY_DATA_SUCCESS,
        data: {},
      })
    ).to.deep.equal(expectedResult);
  });

  it('should handle the FETCH_EDIT_REGISTRY_DATA_ERROR  action correctly', () => {
    const error = null;
    const expectedResult = state
      .set('isFetchingEditRegistryDetails', false)
      .set('error', error)
      .set('closeEditModal', true)
      .set('timerInactivity', false)
      .set('modalEditMount', false);
    expect(
      EditRegistryDetailReducer(state, {
        type: FETCH_EDIT_REGISTRY_DATA_ERROR,
        error: null,
      })
    ).to.deep.equal(expectedResult);
  });

  it('should handle the UPDATE_TYM_TAB_CLICK_STATUS  action correctly', () => {
    const tymClickParam = '';
    const expectedResult = state.set('isTymTabClicked', tymClickParam);
    expect(
      EditRegistryDetailReducer(state, {
        type: UPDATE_TYM_TAB_CLICK_STATUS,
        tymClickParam: '',
      })
    ).to.deep.equal(expectedResult);
  });

  it('should handle the CLEAR_EDIT_REGISTRY_DATA  action correctly', () => {
    const expectedResult = state
      .set('editRegistryData', null)
      .set('isEditModalOpen', false)
      .set('modalEditMount', false);
    expect(
      EditRegistryDetailReducer(state, { type: CLEAR_EDIT_REGISTRY_DATA })
    ).to.deep.equal(expectedResult);
  });

  it('should handle the default state of handleEditRegistryDetails', () => {
    const expectedResult = state
      .set('closeEditModal', false)
      .set('isContactAddressModalVisible', false)
      .set('isShippingAddressModalVisible', false)
      .set('isMovingAddressModalVisible', false)
      .set('isFetchingEditRegistryDetails', false)
      .set('isTymTabClicked', false)
      .set('data', fromJS({}))
      .set('error', null)
      .set('modalEditMount', false);
    expect(handleEditRegistryDetails('default', state)).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the default state of handleModalQASState', () => {
    const expectedResult = state
      .set('closeEditModal', false)
      .set('isContactAddressModalVisible', false)
      .set('isShippingAddressModalVisible', false)
      .set('isMovingAddressModalVisible', false)
      .set('isFetchingEditRegistryDetails', false)
      .set('isTymTabClicked', false)
      .set('data', fromJS({}))
      .set('error', null)
      .set('modalEditMount', false);
    expect(handleModalQASState('default', state)).to.deep.equal(expectedResult);
  });
});
