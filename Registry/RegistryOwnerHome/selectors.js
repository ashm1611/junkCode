import { createSelector } from 'reselect';
import { Map } from 'immutable';

import { selectRouter } from '@bbb-app/selectors/appSelectors';
import {
  EXPERIENCE_STATE_KEY,
  TEMPLATE_STATE_KEY,
  MAPPING_STATE_KEY,
  STATICPAGES_EXPERIENCE_KEY,
} from '@bbb-app/constants/experienceConstants';

import { REG_OWNER_INPUTS_STATE_KEY } from './constants';
const regOwnerHome = state => state.get(REG_OWNER_INPUTS_STATE_KEY);

export const selectExperience = state => state.get(EXPERIENCE_STATE_KEY);

const selectRoute = createSelector(selectRouter, state => {
  /* istanbul ignore else */
  if (state instanceof Map) {
    return state.toJS();
  }
  return state;
});

export const selectRegistryTemplateId = () =>
  createSelector(
    selectExperience,
    selectRoute,
    (experienceState, routeState) => {
      const pageURL =
        (routeState.location && routeState.location.pathname) ||
        experienceState.get('routeURL');

      const type = STATICPAGES_EXPERIENCE_KEY;
      const search = pageURL.substring(0, pageURL.lastIndexOf('/'));

      let templateId = experienceState.getIn([
        MAPPING_STATE_KEY,
        type,
        search,
        'templateId',
      ]);

      if (templateId) {
        return templateId;
      }

      //  Step 4, fetch templateid from grouptemplates in experience if previously not found
      //  patterns in experience are 2 levels deep, so urlArray is broken only
      //  till the same. Alternatively the following breakUrlArray const can be
      //  matched to the routeurl using a regex to generalize it.
      const urlArray = pageURL.split('/');
      const breakUrlArray = `/${urlArray.slice(1, 3).join('/')}/`;
      templateId = experienceState.getIn([
        MAPPING_STATE_KEY,
        'groupPages',
        breakUrlArray,
        'templateId',
      ]);

      if (templateId) {
        return templateId;
      }

      return false;
    }
  );

export const selectRegistryTemplate = () =>
  createSelector(
    selectExperience,
    selectRegistryTemplateId(),
    (experienceState, templateId) => {
      if (
        templateId &&
        experienceState.getIn([TEMPLATE_STATE_KEY, templateId])
      ) {
        return experienceState.getIn([TEMPLATE_STATE_KEY, templateId]).toJS();
      }
      return null;
    }
  );

export const showLoginModal = () =>
  createSelector(
    regOwnerHome,
    state => state && state.get('loginModalVisibility')
  );

const createRegistry = state => state.get('createRegistry');

export const makeSelectPhoneNumberRegistry = () =>
  createSelector(createRegistry, profileState =>
    profileState.get('phoneLast4Digits')
  );

export const makeSelectDeviceVerificationType = () =>
  createSelector(createRegistry, profileState =>
    profileState.get('verificationType')
  );

export const makeSelectUserCreated = () =>
  createSelector(createRegistry, profileState =>
    profileState.get('userCreated')
  );
