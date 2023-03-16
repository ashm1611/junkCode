/**
 * Actions which will inject Saga and reducer asynchronously
 */
import { injectReducerInStore } from '@bbb-app/utils/asyncInjectors';
import {
  FETCH_QUICK_PICKS_COLLECTION,
  REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY,
} from './constants';
import reducer from './reducer';

const injectReducer = () => {
  injectReducerInStore({
    key: REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY,
    reducer,
  });
};

/**
 * Action creator for fetching Quick Picks data
 *
 * @param {object} args
 * @param {string} pageName Defined in Route
 * @param {string} Query String
 * @param {object} The redux store
 * @param {string} The Site Id
 * @return {{type, args: *}}
 */
export const fetchQuickPicksCollection = (
  args,
  pageName,
  search,
  state,
  siteId
) => {
  injectReducer();
  return {
    type: FETCH_QUICK_PICKS_COLLECTION,
    args,
    pageName,
    state,
    siteId,
  };
};
