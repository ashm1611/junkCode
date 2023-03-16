import { createSelector } from 'reselect';
import { LABELS_STATE_KEY } from '@bbb-app/constants/appConstants';
import { STATIC_PAGES_KEY } from '@bbb-app/redux/labels/constants';
import { REGISTRY_QUICK_PICKS_LANDING_STATE_KEY } from './constants';

const selectLabelDetails = state => state.get(LABELS_STATE_KEY);

const root = state => state.get(REGISTRY_QUICK_PICKS_LANDING_STATE_KEY);

export const isLoggedInSelector = state =>
  state.getIn(['accountSignIn', 'isLoggedIn'], false);

export const contentSelector = state => state.get('content');

/**
 * Select labels for Registry Search Results
 *
 * @type {Reselect.Selector<Map, any>} A selector for Search Results Header labels.
 */
export const registryQuickPicksLandingLabelsSelector = createSelector(
  selectLabelDetails,
  state => state.getIn(['Registry', 'QuickPicksLanding'])
);

/**
 * Selects viewportConfig from Redux store.
 * @param {Map} state
 * @return {Map} viewportConfig branch in Redux store.
 */
export const configState = state => state.get('viewportConfig');

/**
 * @return selector for getting siteId from viewportConfig
 */
export const siteIdSelector = createSelector(configState, state =>
  state.getIn(['siteId'])
);

/**
 *
 * @type {Reselect.Selector<any, any | *> | Reselect.Selector<any, any>}
 */
export const registryQuickPicksSelector = createSelector(
  root,
  quickPicks => quickPicks
);

export const registryQuickPicksLandingConfigSelector = createSelector(
  configState,
  config => config.getIn(['pageConfig', STATIC_PAGES_KEY])
);
