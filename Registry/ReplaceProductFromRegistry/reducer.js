import { fromJS } from 'immutable';
import {
  REPLACE_PRODUCT_FROM_REGISTRY,
  REPLACE_PRODUCT_FROM_REGISTRY_SUCCESS,
  REPLACE_PRODUCT_FROM_REGISTRY_ERROR,
} from './constants';

const initialState = fromJS({
  closeModalState: false,
});

function replaceProductFromRegistryReducer(state = initialState, { type }) {
  switch (type) {
    case REPLACE_PRODUCT_FROM_REGISTRY:
      return state.set('closeModalState', true);
    case REPLACE_PRODUCT_FROM_REGISTRY_SUCCESS:
      return state.set('closeModalState', false);

    case REPLACE_PRODUCT_FROM_REGISTRY_ERROR:
      return state.set('closeModalState', true);

    default:
      return state;
  }
}

export default replaceProductFromRegistryReducer;
