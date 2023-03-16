import {
  injectReducerInStore,
  injectSagaInStore,
} from '@bbb-app/utils/asyncInjectors';
import {
  EDIT_ADDRESS_SAGA,
  ADD_EDIT_TYM_ADDRESS,
  THANK_YOU_LIST_STATE_KEY,
} from './constants';
import saga from './addEditAddressSaga';
import reducer from './reducer';

const injectSagaAndReducer = () => {
  injectSagaInStore({ key: EDIT_ADDRESS_SAGA, saga });
  injectReducerInStore({ key: THANK_YOU_LIST_STATE_KEY, reducer });
};

export function addEditAddress(args) {
  injectSagaAndReducer();
  return {
    type: ADD_EDIT_TYM_ADDRESS,
    args,
  };
}
