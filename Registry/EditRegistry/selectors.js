import { createSelector } from 'reselect';
import { EDIT_REGISTRY_DETAILS_STATE_KEY } from './constants';
import { EDIT_CHECKLIST_DETAILS_STATE_KEY } from '../../CollegeChecklist/EditChecklist/constants';

export const getEditRegistryDetails = state =>
  state.get(EDIT_REGISTRY_DETAILS_STATE_KEY);

export const getEditChecklist = state =>
  state.get(EDIT_CHECKLIST_DETAILS_STATE_KEY);

export const makeSelectQASContactModalState = () =>
  createSelector(getEditRegistryDetails, details =>
    details.get('isContactAddressModalVisible')
  );

export const makeSelectQASMovingModalState = () =>
  createSelector(getEditRegistryDetails, details =>
    details.get('isMovingAddressModalVisible')
  );

export const makeSelectQASShippingModalState = () =>
  createSelector(getEditRegistryDetails, details =>
    details.get('isShippingAddressModalVisible')
  );

export const getFetchingEditRegistryDetailStatus = () =>
  createSelector(getEditRegistryDetails, registryDetails =>
    registryDetails.get('isFetchingEditRegistryDetails')
  );

export const selectTimerFlag = () =>
  createSelector(getEditRegistryDetails, registryDetails =>
    registryDetails.get('timerInactivity')
  );

export const selectEditRegistryData = () =>
  createSelector(getEditRegistryDetails, registryDetails =>
    registryDetails.get('editRegistryData')
  );

export const editChecklistModalOpen = () =>
  createSelector(getEditChecklist, registryDetails =>
    registryDetails ? registryDetails.get('modalEditMount') : false
  );
export const editModalOpen = () =>
  createSelector(getEditRegistryDetails, registryDetails =>
    registryDetails ? registryDetails.get('isEditModalOpen') : false
  );

export const getEditRegistryError = () =>
  createSelector(getEditRegistryDetails, registryDetails =>
    registryDetails.get('editModalError')
  );
export const EditModalClick = () =>
  createSelector(getEditRegistryDetails, registryDetails =>
    registryDetails.get('modalEditMount')
  );

export const getTymTabClickStatus = () =>
  createSelector(getEditRegistryDetails, registryDetails =>
    registryDetails.get('isTymTabClicked')
  );

const selectLabelDetails = state => state.get('labels');

export const makeSelectCreateRegistryLabels = () => {
  return createSelector(selectLabelDetails, labelsState =>
    labelsState.getIn(['Registry', 'createRegistry'])
  );
};
