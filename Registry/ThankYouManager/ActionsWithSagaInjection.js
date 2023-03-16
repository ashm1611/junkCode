import {
  injectReducerInStore,
  injectSagaInStore,
} from '@bbb-app/utils/asyncInjectors';
import { FETCH_TYM_DATA, THANK_YOU_LIST_STATE_KEY } from './constants';
import saga from './sagas';
import reducer from './reducer';

const injectSagaAndReducer = () => {
  injectSagaInStore({ key: THANK_YOU_LIST_STATE_KEY, saga });
  injectReducerInStore({ key: THANK_YOU_LIST_STATE_KEY, reducer });
};

export function fetchTymData(
  registryId,
  contentIdArgs,
  sortOrder,
  sortDirection
) {
  injectSagaAndReducer();
  return {
    type: FETCH_TYM_DATA,
    registryId,
    contentIdArgs,
    sortOrder,
    sortDirection,
  };
}
