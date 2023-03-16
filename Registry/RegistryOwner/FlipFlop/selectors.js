import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import { selectViewPortConfig } from '@bbb-app/selectors/configSelector';

import { FLIP_FLOP_STATE_KEY } from './constants';

export const getFlipFlopState = state => state.get(FLIP_FLOP_STATE_KEY, Map());

export const makeSelectFlipFlopItemsList = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('flipFlopItemsList', List())
  );

export const getRegTypeFromStore = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('regType')
  );

export const makeSelectFetchingStatus = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('isItemsFetching', false)
  );

export const makeSelectSolrAPICallErrorMsg = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('errorMsg')
  );

export const makeSelectTotalCollectionCount = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('totalItemsCount', 0)
  );

export const makeSelectCookieCountInStore = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('flipFlopCookieCountInStore')
  );

export const makeSelectFlipFLopSelectedCategory = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('flipFlopSelectedCategories')
  );

export const makeSelectMobileOrientationType = () =>
  createSelector(selectViewPortConfig, siteConfig => {
    return siteConfig.get('isMobileOrientationLandscape', Map());
  });

export const makeSelectIsItemsCountLow = () =>
  createSelector(getFlipFlopState, flipFlopState =>
    flipFlopState.get('isItemsCountLow')
  );
