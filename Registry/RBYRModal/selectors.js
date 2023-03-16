import { createSelector } from 'reselect';
import { LABELS_STATE_KEY } from '@bbb-app/constants/appConstants';

const selectLabelDetails = state => state.get(LABELS_STATE_KEY);

export const selectSiteConfig = state => {
  const siteConfig = state.get('viewportConfig');
  return siteConfig;
};

export const makeSelectRBYRLabels = () => {
  return createSelector(selectLabelDetails, labelsState =>
    labelsState.getIn(['Registry', 'RBYR'])
  );
};

export const makeSelectLabelsRegistry = () => {
  return createSelector(selectLabelDetails, labelsState =>
    labelsState.getIn(['Registry'])
  );
};
