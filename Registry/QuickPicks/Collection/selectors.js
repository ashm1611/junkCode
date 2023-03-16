import { createSelector } from 'reselect';
import { fromJS, Map } from 'immutable';
import { isEmpty } from 'lodash/fp';

import { selectRouter } from '@bbb-app/selectors/appSelectors';
import { GIFT_REGISTRIES_DETAILS_STATE_KEY } from '@bbb-app/constants/registryConstants';
import { EXPERIENCE_STATE_KEY } from '@bbb-app/constants/experienceConstants';
import { ACCOUNT_SIGNIN_STATE_KEY } from '@bbb-app/constants/state-keys/accountStateKeys';
import { STATIC_PAGES_KEY } from '@bbb-app/redux/labels/constants';
import { LABELS_STATE_KEY } from '@bbb-app/constants/appConstants';
import {
  makeSelectLabels,
  makeSelectPageConfig,
  selectContextPath,
  selectViewPortConfig as configState,
} from '@bbb-app/selectors/configSelector';
import { REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY } from './constants';

const root = state => state.get(REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY);
const selectExperience = state => state.get(EXPERIENCE_STATE_KEY);
const selectRoute = createSelector(selectRouter, state => {
  /* istanbul ignore else */
  if (state instanceof Map) {
    return state.toJS();
  }
  return state;
});

export const routeSelector = state => state.get('route');

export const makeSelectPrevRoute = () =>
  createSelector(routeSelector, state => {
    return (
      state.getIn([
        'previousLocationBeforeTransitions',
        'location',
        'pathname',
      ]) || state.getIn(['previousLocationBeforeTransitions', 'pathname'])
    );
  });

export const makeSelectCurrentRoute = () =>
  createSelector(routeSelector, state => {
    return (
      state.getIn(['locationBeforeTransitions', 'location', 'pathname']) ||
      state.getIn(['locationBeforeTransitions', 'pathname'])
    );
  });

export const registryQuickPicksCollectionSelector = createSelector(
  root,
  quickPicksCollection => quickPicksCollection.toJS()
);

// if browser app, get page URL from route state; if server rendering, get url from routeURL state as set in global actions
// this URL is used to get the defined template from set of experiences
export const currentUrlSelector = createSelector(
  [selectExperience, selectRoute],
  (experienceState, routeState) => {
    return (
      (routeState.location && routeState.location.pathname) ||
      experienceState.get('routeURL')
    );
  }
);

export const isLoggedInSelector = state =>
  state.getIn([ACCOUNT_SIGNIN_STATE_KEY, 'isLoggedIn'], false);

export const customerRegistryInfoSelector = state => {
  const registry = state
    .getIn([GIFT_REGISTRIES_DETAILS_STATE_KEY], fromJS(null))
    .toJS();

  return {
    registry,
    isLoggedIn: state.getIn([ACCOUNT_SIGNIN_STATE_KEY, 'isLoggedIn'], false),
    customerId: state.getIn(
      [ACCOUNT_SIGNIN_STATE_KEY, 'profile', 'repositoryId'],
      ''
    ),
    hasActiveRegistry: registry && !isEmpty(registry.activeRegistry),
  };
};

export const contentSelector = state => state.get('content');
/**
 * Select labels for Registry Quick Picks Collection
 *
 * @type {Reselect.Selector<Map, any>} A selector for Registry Quick Picks Collection labels.
 */
export const selectLabelsQuickPicksCollection = makeSelectLabels([
  'Registry',
  'QuickPicksLanding',
]);
/**
 * @return {Reselect.Selector<Map, any>} A selector for PLP labels
 */
const selectLabels = state => state.getIn([LABELS_STATE_KEY]);

export const selectProductTileLabels = createSelector(
  selectLabels,
  labelState => labelState.getIn(['productListingPage', 'productTile'])
);

/**
 * Select all labels for Registry Quick Picks Collection Page & Product Tile from PLP
 *
 * @type {Reselect.Selector<Map, any>} A selector for Registry Quick Picks Collection and PLP Product Tile.
 */

export const registryQuickPicksCollectionConfigSelector = makeSelectPageConfig(
  STATIC_PAGES_KEY
);

/**
 * Creats a reselector for items in Redux store.
 *
 * @type {Reselect.Selector<Map, any>} Creats a reselector for items in Redux store.
 */
export const productsSelector = createSelector(root, state =>
  state.get('products')
);

/**
 * @type {Reselect.Selector<Map, any>} Creates a selector used for error handling.
 */
export const errorSelector = createSelector(root, state => state.get('error'));

/**
 *
 * @type {Reselect.Selector<Map, any>} A selector for isLoading status.
 */
export const isLoading = createSelector(root, state => state.get('isLoading'));

/**
 * @return {Reselect.Selector<Map, any>} A selector for context path used in product grid.
 */
export const getContextPath = () => selectContextPath;

/**
 *
 * @type {Reselect.Selector<Map, any>} A selector for fetching configuration data from redux store.
 *
 */
export const dynamicPricingSelector = createSelector(root, state =>
  state.get('configuration')
);

/**
 *
 * @type {Reselect.Selector<Map, any | *> | Reselect.Selector<Map, any>} A selector for fetching channelType from store.
 */
export const channelTypeSelector = createSelector(configState, state =>
  state.getIn(['channelType'])
);

const getregistryQuickPicksCollection = state => {
  return state.getIn(['registryQuickPicksCollection']);
};

export const makeAkamaiInfo = () => {
  const akamaiSelector = state => state.getIn(['akamaiHeader', 'data']);
  return createSelector(akamaiSelector, akamaiData => {
    return akamaiData;
  });
};

export const makeSelectBreadcrumb = isFromRecommendation =>
  createSelector(
    [getregistryQuickPicksCollection],
    registryQuickPicksCollection => {
      const quickPicksCollectionInfo = registryQuickPicksCollection.toJS();
      const label =
        quickPicksCollectionInfo && quickPicksCollectionInfo.selectedCollection
          ? quickPicksCollectionInfo.selectedCollection.label
          : '';
      return {
        pagename_breadcrumb: isFromRecommendation
          ? 'Registry>Get Recommendations Landing Page'
          : `Registry Consultant ${label} list`,
      };
    }
  );

/**
 * @return selector for getting siteId from viewportConfig
 */
export const siteIdSelector = createSelector(configState, state =>
  state.getIn(['siteId'])
);
