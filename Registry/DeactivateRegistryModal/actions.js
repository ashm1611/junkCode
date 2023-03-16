import {
  DEACTIVATE_REGISTRY_ACTION,
  DEACTIVATE_REGISTRY_SUCCESS,
  DEACTIVATE_REGISTRY_ERROR,
  CLEAR_DEACTIVATED_REG_ID,
} from './constants';

export function deactivateRegistry(regId) {
  return {
    type: DEACTIVATE_REGISTRY_ACTION,
    regId,
  };
}

export function deactivateRegistrySuccess(deactivatedRegId) {
  return {
    type: DEACTIVATE_REGISTRY_SUCCESS,
    deactivatedRegId,
  };
}

export function deactivateRegistryError(error) {
  return {
    type: DEACTIVATE_REGISTRY_ERROR,
    error,
  };
}

export function clearDeactivatedRegId() {
  return {
    type: CLEAR_DEACTIVATED_REG_ID,
  };
}
