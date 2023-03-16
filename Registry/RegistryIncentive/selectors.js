import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import { LABELS_STATE_KEY } from '@bbb-app/constants/appConstants';
import { MY_REGISTRIES_INFO_STATE_KEY } from './constants';

export const selectLabelDetails = state => state.get(LABELS_STATE_KEY, Map());

const viewportConfig = state => state.get('viewportConfig', Map());

export const makeSelectRegIncentivesSwitchConfig = () =>
  createSelector(
    viewportConfig,
    siteConfig => siteConfig.getIn(['switchConfig', 'RegistryIncentives']) || {}
  );

export const makeSelectLabels = () => {
  return createSelector(selectLabelDetails, labelsState =>
    labelsState.getIn(['Registry', 'RegistryIncentives'])
  );
};

export const selectMyRegistries = state =>
  state.get(MY_REGISTRIES_INFO_STATE_KEY, Map());

export const makeSelectIsFetching = () =>
  createSelector(selectMyRegistries, myRegistriesState =>
    myRegistriesState.get('isFetching', false)
  );

export const makeSelectRegistriesInfo = () =>
  createSelector(selectMyRegistries, myRegistriesState =>
    myRegistriesState.get('incentiveInfo', List())
  );

export const makeSelectError = () =>
  createSelector(selectMyRegistries, PSPState => PSPState.get('error'));
