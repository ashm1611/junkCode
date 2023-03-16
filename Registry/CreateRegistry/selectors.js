import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { selectViewPortConfig } from '@bbb-app/selectors/configSelector';
import { selectGlobal } from '@bbb-app/selectors/appSelectors';
import { REG_INPUTS_STATE_KEY } from './constants';

const createRegistry = state => state.get(REG_INPUTS_STATE_KEY);
export const makeRegInputIsFetching = () =>
  createSelector(createRegistry, regInputSections => {
    return regInputSections.get('isFetching');
  });
export const isFetchingCreateRegCall = () =>
  createSelector(createRegistry, registryDetails =>
    registryDetails.get('isFetchingCreateRegCall')
  );
export const getcreateRegistryModalPopUpStatus = () =>
  createSelector(createRegistry, registryDetails =>
    registryDetails.get('createRegistryModalPopUp')
  );
export const getRegTypeFormData = () =>
  createSelector(createRegistry, registryDetails =>
    registryDetails.get('regTypeFormData')
  );
export const getScrollPositionForQuiz = () =>
  createSelector(createRegistry, registryDetails =>
    registryDetails.get('scrollPosition')
  );
export const getScrollPositionForSkip = () =>
  createSelector(createRegistry, registryDetails =>
    registryDetails.get('skipRegistryPosition')
  );
export const getTakeOurQuizStatus = () =>
  createSelector(createRegistry, registryDetails =>
    registryDetails.get('takeOurQuiz')
  );
export const makeSelectChannelType = () =>
  createSelector(selectViewPortConfig, siteConfig => {
    return siteConfig.get('navigationViewportSize');
  });
export const makeRegInputError = () =>
  createSelector(createRegistry, regInputSections =>
    regInputSections.get('error')
  );
export const makeRegInputData = () =>
  createSelector(createRegistry, regIdSections =>
    regIdSections.get('regInputs')
  );
export const getRegistryId = () =>
  createSelector(createRegistry, regIdSections =>
    regIdSections.get('registryId')
  );
export const accountSignInDetails = state => state.get('accountSignIn');
export const getLoggedIn = () =>
  createSelector(accountSignInDetails, accountSignInDetailsState =>
    accountSignInDetailsState.get('isLoggedIn')
  );
export const makeSelectCoRegistrantProfileStatus = () =>
  createSelector(createRegistry, profileState =>
    profileState.get('coRegProfileStatus', Map())
  );
export const makeSelectCoRegistrantProfileStatusError = () =>
  createSelector(createRegistry, profileState =>
    profileState.get('profileStatusError', Map())
  );
export const makeSelectQASContactModalState = () =>
  createSelector(createRegistry, regInputSections =>
    regInputSections.get('isContactAddressModalVisible', false)
  );
export const makeSelectQASMovingModalState = () =>
  createSelector(createRegistry, regInputSections =>
    regInputSections.get('isMovingAddressModalVisible', false)
  );
export const makeSelectQASShippingModalState = () =>
  createSelector(createRegistry, regInputSections =>
    regInputSections.get('isShippingAddressModalVisible', false)
  );
export const makePassWordInputError = () =>
  createSelector(createRegistry, passwordSection =>
    passwordSection.get('passwordError')
  );
export const makeConfirmPassWordInputError = () =>
  createSelector(createRegistry, confirmPasswordError =>
    confirmPasswordError.get('confirmPasswordError')
  );
export const makeSubmitState = () =>
  createSelector(createRegistry, submitState =>
    submitState.get('submitCalled')
  );
export const makeSelectEmailVerReq = () =>
  createSelector(createRegistry, profileState =>
    profileState.get('emailVerReq')
  );

export const makeSelectRedirectParams = () =>
  createSelector(selectGlobal, globalState =>
    globalState
      ? globalState.getIn(['previousLocationBeforeTransitions', 'location']) ||
        globalState.get('previousLocationBeforeTransitions')
      : ''
  );
export const makeSelectQueryString = () =>
  createSelector(selectGlobal, globalState =>
    globalState
      ? globalState.getIn(['locationBeforeTransitions', 'location']) ||
        globalState.get('locationBeforeTransitions')
      : ''
  );
