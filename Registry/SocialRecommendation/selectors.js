import { createSelector } from 'reselect';

export const getViewportSiteConfig = state => state.get('viewportConfig');

export const makeSelectSiteId = () => {
  return createSelector(getViewportSiteConfig, config => config.get('siteId'));
};
