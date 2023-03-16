import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { selectViewPortConfig } from '@bbb-app/selectors/configSelector';
import {
  REGISTRY_DETAILS_STATE_KEY,
  REGISTRY_OWNER_ITEMS_STATE_KEY,
} from './constants';

export const getRegistryDetails = state =>
  state.get(REGISTRY_DETAILS_STATE_KEY, Map());

export const getRegistryData = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('data')
  );

export const getFetchingStatus = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('isFetching')
  );

export const getErrorStatus = () =>
  createSelector(getRegistryDetails, registryDetails =>
    registryDetails.get('error')
  );

export const makeSelectSocialAnxWriteReview = () =>
  createSelector(selectViewPortConfig, siteConfig => {
    const socialAnnexSelector = siteConfig
      .getIn(['switchConfig', 'RegistryOwner'])
      .toJS();
    const newData = {
      uploadPhoto: socialAnnexSelector.socialAnnex,
      writeReview: socialAnnexSelector.bazaarVoice,
    };
    return newData;
  });

export const selectRegistryOwnerItems = state =>
  state.get(REGISTRY_OWNER_ITEMS_STATE_KEY, Map());

export const getFacetData = () => {
  return createSelector(selectRegistryOwnerItems, registryOwnerItem =>
    registryOwnerItem.get('facetsData')
  );
};
