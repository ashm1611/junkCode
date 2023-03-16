import {
  REPLACE_PRODUCT_FROM_REGISTRY,
  REPLACE_PRODUCT_FROM_REGISTRY_SUCCESS,
  REPLACE_PRODUCT_FROM_REGISTRY_ERROR,
} from './constants';

export function replaceProductFromRegistry(payload) {
  return {
    type: REPLACE_PRODUCT_FROM_REGISTRY,
    payload,
  };
}

export function replaceProductFromRegistrySuccess(data) {
  return {
    type: REPLACE_PRODUCT_FROM_REGISTRY_SUCCESS,
    data,
  };
}

export function replaceProductFromRegistryError(error) {
  return {
    type: REPLACE_PRODUCT_FROM_REGISTRY_ERROR,
    error,
  };
}
