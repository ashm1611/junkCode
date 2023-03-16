import {
  FETCH_QUICK_PICKS,
  SET_QUICK_PICKS,
  PRODUCT_POSITION_CLICKED,
} from './constants';

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
export const fetchQuickPicks = (args, pageName, search, state, siteId) => ({
  type: FETCH_QUICK_PICKS,
  args,
  pageName,
  state,
  siteId,
});

/**
 * Sets Quick Picks data
 *
 * @param {object} payload
 * @return {{type, payload: *}}
 */
export const setQuickPicks = payload => ({
  type: SET_QUICK_PICKS,
  payload,
});

/**
 * Saves the position of the collection item user clicked on
 * for Tealium
 *
 * @param {object} payload
 * @return {{type, payload: *}}
 */
export const productPositionClicked = (position, name) => {
  return {
    type: PRODUCT_POSITION_CLICKED,
    position,
    name,
  };
};
