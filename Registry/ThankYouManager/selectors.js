import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { selectGlobal } from '@bbb-app/selectors/appSelectors';
import { MOBILE_SCREEN_STATE_KEY } from '@bbb-app/constants/state-keys/configStateKeys';
import { ROUTES_STATE_KEY } from '@bbb-app/constants/experienceConstants';
import { THANK_YOU_LIST_STATE_KEY } from './constants';

export const makeSelectTymData = state =>
  state.get(THANK_YOU_LIST_STATE_KEY, Map());
export const isMobile = state => state.get(MOBILE_SCREEN_STATE_KEY, Map());
export const getTymDynamicDataFlag = () =>
  createSelector(makeSelectTymData, tymDetails =>
    tymDetails.get('thankYouListDynamicContent', Map())
  );

export const makeSelectRegistryId = () =>
  createSelector(makeSelectTymData, tymDetails => tymDetails.get('registryId'));

export const getListData = () =>
  createSelector(getListDataTYM, tymDetails => {
    if (tymDetails) {
      return tymDetails.tymGifterList;
    }
    return null;
  });

export const getLoggedInStatus = () =>
  createSelector(getListDataTYM, tymDetails => {
    if (tymDetails) {
      return tymDetails.userLoggedIn;
    }
    return false;
  });

export const getListDataTYM = state => {
  return state.getIn([THANK_YOU_LIST_STATE_KEY, 'data']);
};

export const showLoginModal = () =>
  createSelector(
    makeSelectTymData,
    tymDetails => tymDetails && tymDetails.get('loginModalVisibility')
  );

export const getIsMobile = () =>
  createSelector(isMobile, mobileDevice => mobileDevice);

export const getRegistryDetails = state => state.get('Registry', Map());

export const selectActiveRegistryObject = () =>
  createSelector(getRegistryDetails, registryState =>
    registryState.get('activeRegistry')
  );

export const getListUpdatedStatus = () =>
  createSelector(makeSelectTymData, tymDetails =>
    tymDetails.get('listUpdated', false)
  );

export const makeSelectisFetching = () =>
  createSelector(makeSelectTymData, tymDetails =>
    tymDetails.get('isFetching', true)
  );

const selectRoute = state => state.get(ROUTES_STATE_KEY, Map());

export const makeSelectPreviousRoute = () =>
  createSelector(selectRoute, state => {
    return (
      state.getIn([
        'previousLocationBeforeTransitions',
        'location',
        'pathname',
      ]) || state.getIn(['previousLocationBeforeTransitions', 'pathname'])
    );
  });

export const makeSelectQueryString = () =>
  createSelector(selectGlobal, globalState =>
    globalState
      ? globalState.getIn(['locationBeforeTransitions', 'location']) ||
        globalState.get('locationBeforeTransitions')
      : ''
  );
