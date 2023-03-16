import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Route, Redirect } from 'react-router';
import pathOr from 'lodash/fp/pathOr';
import { parse } from 'qs';
import { isEmpty } from 'lodash';

import {
  makeSelectGlobalPageConfig,
  selectDeviceConfig,
  makeSelectSwitchConfig,
  makeSelectGlobalSwitchConfig,
  makeSelectPageConfig,
  makeSelectLabels,
  makeSelectSiteConfig,
} from '@bbb-app/selectors/configSelector';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { getSiteId } from '@bbb-app/utils/common';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import {
  getEnabledGlobalVendors,
  makeSelectContent,
} from '@bbb-app/selectors/pageSelectors';
import {
  makeSelectIsLoggedIn,
  makeSelectProfile,
  makeTYMSignInModalLabels,
} from '@bbb-app/selectors/accountSelectors';
import toJS from '@bbb-app/hoc/toJS';
import { emptyQasData } from '@bbb-app/qas-validation/containers/actions';
import {
  selectUserAddressData,
  selectQasData,
  selectQasIsFetching,
  selectQasValidationStatus,
  selectQasError,
} from '@bbb-app/qas-validation/containers/selectors';
import {
  setUserAddress,
  fetchQas,
} from '@bbb-app/qas-validation/containers/commonActions';
import isBrowser from '@bbb-app/utils/isBrowser';
import { SessionStorageUtil } from '@bbb-app/utils/sessionStorage';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import {
  clearIdentifierStateData,
  addFormField,
} from '@bbb-app/forms/containers/FormWrapper/actions';
import { makeSelectActiveRegistry } from '@bbb-app/selectors/registrySelectors';
import emailRegistrationReducer from '@bbb-app/account-registration/containers/reducer';
import emailRegistrationSaga from '@bbb-app/account-registration/containers/sagas';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { fetchContentStack } from '@bbb-app/redux/content-stack/actions';
import { CONTENT_STACK_STATE_KEY } from '@bbb-app/redux/content-stack/constants';
import contentStackReducer from '@bbb-app/redux/content-stack/reducer';
import contentStackSaga from '@bbb-app/redux/content-stack/sagas';
import {
  EMAIL_REGISTRATION_STATE_KEY,
  ACCOUNT_SIGNIN_DETAILS_STATE_KEY,
} from '@bbb-app/constants/state-keys/accountStateKeys';
import {
  fetchEmailExistsInfo,
  resetEmailExistsInfo,
} from '@bbb-app/actions/accountActions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { isMobileScreen } from '@bbb-app/header/containers/selectors';
import {
  makeSelectUserExistsError,
  makeSelectUserExists,
  makeSelectUserType,
  makeSelectRegUserExists,
} from '@bbb-app/account-registration/containers/registration-form/selectors';
import {
  makeSelectDeviceVerificationData,
  makeSelectDeviceVerificationError,
} from '@bbb-app/account-signin/containers/accountSignInSelectors';
import { submitAccountSignInDetails } from '@bbb-app/account-signin/containers/actionWithInjectSaga';
import accountSignInSaga from '@bbb-app/account-signin/containers/sagas';
import { NotFoundHttpErrorPath } from '@bbb-app/constants/route/route';
import { RECAPTCHA_ACTIVATION_COUNT } from '@bbb-app/constants/appConstants';
import { QUERY_STRING } from '@bbb-app/constants/registryConstants';
import {
  makeSelectError,
  makeSelectIsShallowEmailVerificationRequired,
} from '@bbb-app/account-signin/containers/selectors';
import {
  resetVerificationType,
  requestPin,
} from '@bbb-app/account-signin/containers/actions';
import { fetchProfileData } from '@bbb-app/redux/profile-data/actions';
import { makeSelectAddress } from '@bbb-app/redux/profile-data/selectorAccountDashboardGlobal';
import { pwaRedirectUrlTransition } from '@bbb-app/utils/myAccountUtils/utils';
import { getCookie, setCookie } from '@bbb-app/utils/universalCookie';
import { COOKIE_PATH } from '@bbb-app/constants/cookies';
import getCurrentDomainUrl from '@bbb-app/utils/getCurrentDomainUrl';
import CreateRegistryComponent from '../../../../components/Pages/Registry/CreateRegistry';
import PickupInStoreModalWrapper from '../../../../containers/PickupInStoreModal/PickupInStoreModalWrapper';
import {
  makeRegInputData,
  makeRegInputIsFetching,
  makeRegInputError,
  getRegistryId,
  makeSelectChannelType,
  makeSelectCoRegistrantProfileStatus,
  makeSelectCoRegistrantProfileStatusError,
  makeSelectQASContactModalState,
  makeSelectQASShippingModalState,
  makeSelectQASMovingModalState,
  makePassWordInputError,
  makeConfirmPassWordInputError,
  makeSubmitState,
  makeSelectEmailVerReq,
  makeSelectQueryString,
  makeSelectRedirectParams,
  isFetchingCreateRegCall,
} from './selectors';
import { makeSelectIsFetching } from '../../../../containers/Pages/MyAccountDashboard/selectors';
import {
  fetchRegistryInputs,
  createRegistryData,
  resetStoreDataAction,
  fetchProfileStatus,
  resetProfileStatus,
  updateContactAddressModalVisibility,
  updateShippingAddressModalVisibility,
  updateMovingAddressModalVisibility,
  setPassWordError,
  updateSubmitState,
  resetWelcomeScreenData,
  clearErrorState,
} from './actions';
import {
  REG_INPUTS_STATE_KEY,
  DEFAULT_REGISTRY,
  OPEN_REGISTRY_MODAL_QUERY_STRING,
  FORMDATA_EXTEND_PROFILE_STATE_KEY,
  FORMDATA_REGISTER_LOGIN_STATE_KEY,
} from './constants';
import CreateRegistryTealiumHandler from '../../../ThirdParty/Tealium/Registry/CreateRegistryTealiumHandler/CreateRegistryTealiumHandler';
import { makeSelectOwnAndRecommendedRegistries } from '../../../AddToRegistry/selectors';
import CreateRegistryRedirection from './CreateRegistryRedirection';
import registryInputReducer from './reducer';
import RegistryTypesSagas from './sagas';
import coProfileSagSagas from './coProfileSagas';

const propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  labels: PropTypes.object,
  referredContent: PropTypes.object,
  fetchModalData: PropTypes.func,
  getRegistryInputs: PropTypes.func,
  registryID: PropTypes.object,
  ownAndRecommendedRegistries: PropTypes.object,
  activeRegistry: PropTypes.object,
  updateSubmitStateData: PropTypes.func,
  setPassWordComError: PropTypes.func,
  clearIdentifierStateData: PropTypes.func,
  locationBeforeTransition: PropTypes.object,
  prevLocationBeforeTransition: PropTypes.object,
  globalSwitchConfig: PropTypes.object,
  reCaptchaActivationCount: PropTypes.string,
  resetWelcomeScreenData: PropTypes.func,
  resetStoreData: PropTypes.func,
  enableNewSignUp: PropTypes.bool,
  registryInputs: PropTypes.object,
  enableRegBabyCreate: PropTypes.bool,
  resetProfileStatus: PropTypes.func,
  enableRegistryQuiz: PropTypes.bool,
  isNewCreateRegForm: PropTypes.bool,
};
export class CreateRegistry extends React.Component {
  constructor(props) {
    super(props);
    this.getDefaultRegistryType = this.getDefaultRegistryType.bind(this);
    this.changeRegistryType = this.changeRegistryType.bind(this);
    this.getCurrentRegistryType = this.getCurrentRegistryType.bind(this);
    this.getThirdPartyQueryParam = this.getThirdPartyQueryParam.bind(this);
    /** to check the atDate flag for Automation testing on mobile device */
    this.atDateFlag = false;
    this.sessionUtil = new SessionStorageUtil(isBrowser());
    this.state = {
      phoneChange: true,
      verifyPhoneClicked: false,
      verifyClicked: false,
    };
  }

  componentDidMount() {
    const {
      labels,
      referredContent,
      fetchModalData,
      getRegistryInputs,
    } = this.props;

    // fetch registry inputs data
    const registryType = this.getCurrentRegistryType(this.props.location);
    const thirdParty = this.getThirdPartyQueryParam(this.props.location);

    getRegistryInputs(registryType, thirdParty);
    /**
     * check when user is logged in and if address is present in profile
     * if address is not present than dispatch action to get address
     * address are than pre populated in registry form for logged in user
     */
    this.getAddressData(this.props);

    /**
     * get the referred content ids from labels
     */
    const uniqueIds = LabelsUtil.getReferredContentIdCollection(
      labels,
      ['createRegistry'],
      referredContent
    );

    /**
     * get the data for co-registrant modal.
     */
    if (uniqueIds && uniqueIds.length !== 0) {
      fetchModalData(uniqueIds);
    }
  }

  componentWillReceiveProps(nextProps) {
    const registryType = this.getCurrentRegistryType(nextProps.location);

    // If user state changed from logout to login pre-populate address data.
    this.getAddressData(nextProps);

    // If regtype is changed in the url param, fetch reg inputs
    if (this.props.location.search !== nextProps.location.search) {
      const thirdParty = this.getThirdPartyQueryParam(nextProps.location);
      this.props.getRegistryInputs(registryType, thirdParty);
    }
  }

  componentWillUnmount() {
    // it will reset the emailVerReq key in CreateRegistry store
    const { resetStoreData } = this.props;
    /* istanbul ignore else */
    if (typeof resetStoreData === 'function') resetStoreData();

    this.props.updateSubmitStateData(false);
    this.props.setPassWordComError({
      passwordError: true,
      confirmPasswordError: true,
    });
    this.props.clearIdentifierStateData(FORMDATA_REGISTER_LOGIN_STATE_KEY);
  }

  /**
   * find and return the registry type in query param
   *
   * @param {string} search query search param
   */
  getRegistryTypeFromSearchParam(search) {
    if (isEmpty(search)) {
      return '';
    }
    const query = parse(search, { ignoreQueryPrefix: true });
    this.atDateFlag = JSON.parse(pathOr(false, 'atDate', query));
    return query.regType || '';
  }

  getRegTypeModalStateFromSearchParam(search) {
    if (isEmpty(search)) {
      return '';
    }
    const query = parse(search, { ignoreQueryPrefix: true });
    return query[OPEN_REGISTRY_MODAL_QUERY_STRING] === 'true' || false;
  }
  /**
   * get default registry type from config key.
   */
  getDefaultRegistryType() {
    return getSiteId() === 'BuyBuyBaby' ? 'BA1' : DEFAULT_REGISTRY;
  }

  getCurrentRegistryType(location) {
    return (
      this.getRegistryTypeFromSearchParam(location.search) ||
      this.getDefaultRegistryType()
    );
  }

  getThirdPartyQueryParam(location) {
    const query = parse(location.search, { ignoreQueryPrefix: true });
    return {
      wcref: query.wcref,
      wcsid: query.wcsid,
    };
  }
  /**
   * if address data not present than fetch address data.
   * @param {*} props
   */
  getAddressData({
    isLoggedIn,
    isFetchingProfile,
    profileData,
    accountAddress,
    getProfile,
  }) {
    if (
      (isLoggedIn || isUserRecognized()) &&
      !isFetchingProfile &&
      !isEmpty(pathOr(null, 'repositoryId', profileData)) &&
      isEmpty(accountAddress)
    ) {
      getProfile(profileData.repositoryId);
    }
  }

  /**
   * Accept registry type and redirect user to new registry type.
   *
   * @param {string} type
   */
  changeRegistryType(type) {
    const {
      location,
      history,
      enableNewSignUp,
      enableRegBabyCreate,
    } = this.props;
    const loginRuleAtCreateRegistry = pathOr(
      '',
      'state.from.params.loginRule',
      location
    );
    if (enableRegBabyCreate) {
      this.props.resetProfileStatus();
    }
    const loginRuleAtCreateAccount = pathOr('', 'params.loginRule', location);
    if (
      enableNewSignUp &&
      (loginRuleAtCreateAccount === 'addToRegistry' ||
        loginRuleAtCreateRegistry === 'addToRegistry')
    ) {
      history.push({
        ...location,
        search: `${QUERY_STRING}${type}&addToRegistry=true`,
      });
    } else {
      history.push(`${location.pathname}${QUERY_STRING}${type}`);
    }
  }

  /**
   * redirect user to not found page.
   */
  redirectToNotFound() {
    return <Redirect to={NotFoundHttpErrorPath} />;
  }

  changePhoneNo = () => {
    this.setState({
      phoneChange: true,
      verifyPhoneClicked: false,
    });
  };

  signInClicked = () => {
    this.setState({ phoneChange: false });
  };

  verifyClicked = () => {
    this.setState({ verifyPhoneClicked: true, phoneChange: false });
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      isFetching,
      error,
      registryID,
      location,
      locationBeforeTransition,
      prevLocationBeforeTransition,
      ownAndRecommendedRegistries,
      activeRegistry,
      reCaptchaActivationCount,
      globalSwitchConfig,
      enableNewSignUp,
      enableRegBabyCreate,
      enableRegistryQuiz,
    } = this.props;

    let isPWA;
    let redirectUrl;
    if (enableNewSignUp) {
      if (location && location.search) {
        isPWA = pathOr('', 'search', location).includes('pwaRedirectUrl');
        const pwaUrl = new URLSearchParams(location.search).get(
          'pwaRedirectUrl'
        );
        redirectUrl = pwaUrl && pwaUrl.replace(/^.*\/\/[^/]+/, '');
      }
      if (isPWA) {
        const queryParam = redirectUrl.includes('?') ? '&' : '?';
        this.props.location.params = {
          loginRule: 'addToRegistry',
          redirect: `${redirectUrl}${queryParam}addToRegistry=true&redirectToAMP=true`,
        };
        this.props.location.state = {
          from: {
            pathname: redirectUrl,
          },
        };
      }
    }

    const isRegistryID = pathOr(
      false,
      'component["registryVO.registryId"]',
      registryID
    );
    const profileRegistryList = pathOr(
      [],
      'profileRegistryList',
      ownAndRecommendedRegistries
    );
    const userEmail = pathOr('', 'profileData.email', this.props);
    const query = parse(location.search, { ignoreQueryPrefix: true });
    if (!isFetching && !isEmpty(error) && isRegistryID) {
      return this.redirectToNotFound();
    }
    const enableRBYRFeature = pathOr(
      false,
      'enableRBYRFeature',
      this.props.globalSwitchConfig
    );
    const defaultRedirectLocation = pathOr(
      '',
      'params.redirect',
      locationBeforeTransition
    );
    const redirectLocation = pathOr(
      defaultRedirectLocation,
      'params.redirect',
      prevLocationBeforeTransition
    );

    // add check for profileRegistryList and activeRegistry to wait for calls to complete before redirect
    if (
      isRegistryID &&
      userEmail &&
      profileRegistryList.length &&
      !isEmpty(activeRegistry)
    ) {
      /* istanbul ignore next */
      if (
        window.location.hash &&
        window.location.hash.includes('pwaRedirectUrl')
      ) {
        const urlPath = pwaRedirectUrlTransition(window.location);
        if (urlPath) {
          return (
            <Redirect
              to={{
                pathname: urlPath.postSignInPathName,
                search: urlPath.postSignInSearch,
                state: { from: location },
              }}
            />
          );
        }
      }
      if (query.addToRegistry === 'true' && redirectLocation)
        return <Redirect to={`${redirectLocation}`} />;
      if (
        query &&
        query.addToRegistry === 'true' &&
        query.ideaboard === 'true'
      ) {
        const ideaboardLink = getCookie('redirectUrltoIdeaboard');
        const link = decodeURIComponent(ideaboardLink);
        const redirectIdeaBoardUrl = `${getCurrentDomainUrl()}${link}`;
        setCookie('redirecttoIdeaboard', true, {
          path: COOKIE_PATH,
        });
        return (
          <Route
            component={() => {
              window.location.href = `${redirectIdeaBoardUrl}`;
              return null;
            }}
          />
        );
      }
      return (
        <CreateRegistryRedirection
          isRegistryID={isRegistryID}
          activeRegistry={activeRegistry}
          globalSwitchConfig={globalSwitchConfig}
          location={location}
          enableNewSignUp={enableNewSignUp}
        />
      );
    }
    const isCABabyRegistry =
      enableRegBabyCreate &&
      getSiteId() === 'BedBathCanada' &&
      this.props.registryInputs &&
      this.props.registryInputs.eventType === 'Baby';
    const isBabyRegistry =
      getSiteId() === 'BuyBuyBaby' &&
      this.props.registryInputs &&
      this.props.registryInputs.eventType === 'Baby';
    const isFromPDP = pathOr('', 'from.pathname', location.state).includes(
      '/store/product/'
    );
    return (
      <React.Fragment>
        <ErrorBoundary>
          <CreateRegistryComponent
            {...this.props}
            location={location}
            changeRegistryType={this.changeRegistryType}
            getCurrentRegistryType={this.getCurrentRegistryType}
            atDateFlag={this.atDateFlag}
            isRegistryTypeModalOpen={this.getRegTypeModalStateFromSearchParam(
              location.search
            )}
            resetWelcomeScreenData={this.props.resetWelcomeScreenData}
            reCaptchaActivationCount={reCaptchaActivationCount}
            globalSwitchConfig={globalSwitchConfig}
            formWrapperIdentifier={FORMDATA_EXTEND_PROFILE_STATE_KEY}
            formWrapperIdentifierRegisterOrLogin={
              FORMDATA_REGISTER_LOGIN_STATE_KEY
            }
            enableRBYRFeature={enableRBYRFeature}
            isBabyRegistry={isBabyRegistry}
            isCABabyRegistry={isCABabyRegistry}
            enableRegistryQuiz={enableRegistryQuiz}
            isFromPDP={isFromPDP}
            changePhoneNo={this.changePhoneNo}
            phoneChangeState={this.state.phoneChange}
            signInClicked={this.signInClicked}
            verifyClicked={this.verifyClicked}
            verifyPhoneState={this.state.verifyPhoneClicked}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <PickupInStoreModalWrapper
            findAStoreModal
            changeStore
            createPickUpInStore
            isScrollable
          />
        </ErrorBoundary>
        {!isFromPDP && (
          <ErrorBoundary>
            <CreateRegistryTealiumHandler
              isRegistryTypeModalOpen={this.getRegTypeModalStateFromSearchParam(
                location.search
              )}
              isNewCreateRegForm={this.props.isNewCreateRegForm}
            />
          </ErrorBoundary>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  registryInputs: makeRegInputData(),
  profileStatus: makeSelectUserExists(),
  regProfileStatus: makeSelectRegUserExists(),
  profileStatusUserType: makeSelectUserType(),
  profileStatusError: makeSelectUserExistsError(),
  coRegProfileStatus: makeSelectCoRegistrantProfileStatus(),
  coRegProfileStatusError: makeSelectCoRegistrantProfileStatusError(),
  isFetching: makeRegInputIsFetching(),
  error: makeRegInputError(),
  labels: makeSelectLabels(['Registry']),
  referredContent: makeSelectContent(),
  personalisedLables: makeSelectLabels(['myAccount']),
  registryID: getRegistryId(),
  isLoggedIn: makeSelectIsLoggedIn(),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  profileData: makeSelectProfile(),
  accountAddress: makeSelectAddress(),
  extendAccountError: makeSelectError(),
  channelType: makeSelectChannelType(),
  userAddressData: selectUserAddressData(),
  qasData: selectQasData(),
  qasIsFetching: selectQasIsFetching(),
  qasError: selectQasError(),
  qasValidationStatus: selectQasValidationStatus(),
  addressContactQASModalState: makeSelectQASContactModalState(),
  addressShippingQASModalState: makeSelectQASShippingModalState(),
  addressMovingQASModalState: makeSelectQASMovingModalState(),
  enabledVendors: getEnabledGlobalVendors(),
  isFetchingProfile: makeSelectIsFetching(),
  passwordError: makePassWordInputError(),
  confirmPasswordError: makeConfirmPassWordInputError(),
  submitState: makeSubmitState(),
  isMobile: isMobileScreen,
  formWrapperData: formWrapperSelector(FORMDATA_EXTEND_PROFILE_STATE_KEY),
  formWrapperDataRegisterOrLogin: formWrapperSelector(
    FORMDATA_REGISTER_LOGIN_STATE_KEY
  ),
  locationBeforeTransition: makeSelectQueryString(),
  prevLocationBeforeTransition: makeSelectRedirectParams(),
  ownAndRecommendedRegistries: makeSelectOwnAndRecommendedRegistries(),
  activeRegistry: makeSelectActiveRegistry(),
  deviceConfig: selectDeviceConfig,
  globalSwitchConfig: makeSelectGlobalSwitchConfig(),
  reCaptchaActivationCount: makeSelectGlobalPageConfig([
    RECAPTCHA_ACTIVATION_COUNT,
  ]),
  pageConfigGlobal: makeSelectGlobalPageConfig(),
  guestDefault: makeSelectPageConfig(['createRegistry', 'guestDefault']),
  isEmailVerRequired: makeSelectEmailVerReq(),
  isEmailVerReqSisterSite: makeSelectIsShallowEmailVerificationRequired(),
  thersholdDayForOldRegistry: makeSelectPageConfig([
    'Registry',
    'thersholdDayForOldRegistry',
  ]),
  deviceVerificationData: makeSelectDeviceVerificationData(),
  deviceVerificationError: makeSelectDeviceVerificationError(),
  loginLabels: makeTYMSignInModalLabels(),
  enableNewSignUp: makeSelectSwitchConfig([
    'createRegistry',
    'enableNewSignUp',
  ]),
  enableRegBabyCreate: makeSelectSwitchConfig([
    'createRegistry',
    'enableRegBabyCreate',
  ]),
  enableRegistryQuiz: makeSelectSwitchConfig([
    'RegistryOwner',
    'enableRegistryQuiz',
  ]),
  isNewCreateRegForm: makeSelectSwitchConfig([
    'createRegistry',
    'enableNewCreateReg',
  ]),
  isNewDashboard: makeSelectSwitchConfig(
    ['RegistryOwner', 'enableNewRegDashboard'],
    false
  ),
  registrationLabels: makeSelectLabels('myAccount'),
  regNewCreateFlowData: makeSelectSiteConfig(['registryNewCreateFlow']),
  isFetchingCreateRegCall: isFetchingCreateRegCall(),
});

export const mapDispatchToProps = dispatch => {
  return {
    getRegistryInputs: (registryType, thirdParty) => {
      dispatch(fetchRegistryInputs(registryType, thirdParty));
    },
    checkProfileStatus: (email, userType) => {
      dispatch(fetchEmailExistsInfo(email, userType));
    },
    resetProfileStatus: () => {
      dispatch(resetEmailExistsInfo());
    },
    fetchModalData: contentIdCollection => {
      dispatch(fetchReferredContent(contentIdCollection));
    },
    createRegistry: (formaData, thersholdDayForOldRegistry, labels) => {
      dispatch(
        createRegistryData(formaData, thersholdDayForOldRegistry, labels)
      );
    },
    fetchContentStack(args, dynamicCSURL) {
      dispatch(fetchContentStack(args, dynamicCSURL));
    },
    resetStoreData: () => {
      dispatch(resetStoreDataAction());
    },
    getProfile: customerId => {
      dispatch(fetchProfileData(customerId));
    },
    onExtendProfileSubmitClick(args) {
      dispatch(submitAccountSignInDetails(args));
    },
    fetchCoRegistrantProfileStatus: (email, showLoader) => {
      dispatch(fetchProfileStatus(email, showLoader));
    },
    resetCoRegistrantProfileStatus: () => {
      dispatch(resetProfileStatus());
    },

    fetchQasData: params => {
      dispatch(fetchQas(params));
    },
    setUserAddressData: data => {
      dispatch(setUserAddress(data));
    },
    emptyQasData: () => {
      dispatch(emptyQasData());
    },
    setPassWordComError: data => {
      dispatch(setPassWordError(data));
    },
    updateSubmitStateData: data => {
      dispatch(updateSubmitState(data));
    },
    updateContactAddressModalQasVisibility: flag =>
      dispatch(updateContactAddressModalVisibility(flag)),
    updateMovingAddressModalQasVisibility: flag =>
      dispatch(updateMovingAddressModalVisibility(flag)),
    updateShippingAddressModalQasVisibility: flag =>
      dispatch(updateShippingAddressModalVisibility(flag)),
    addFormField: data => {
      dispatch(addFormField(data));
    },
    clearIdentifierStateData: data => {
      dispatch(clearIdentifierStateData(data));
    },
    resetWelcomeScreenData: () => {
      dispatch(resetWelcomeScreenData());
    },
    resetVerType() {
      dispatch(resetVerificationType());
    },
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    getPinResent(arg) {
      dispatch(requestPin(arg));
    },
    clearErrorState: () => {
      dispatch(clearErrorState());
    },
  };
};

CreateRegistry.propTypes = propTypes;
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withRegistryInputReducer = injectReducer({
  key: REG_INPUTS_STATE_KEY,
  reducer: registryInputReducer,
});

const withEmailRegistrationReducer = injectReducer({
  key: EMAIL_REGISTRATION_STATE_KEY,
  reducer: emailRegistrationReducer,
});
const withContentStackReducer = injectReducer({
  key: CONTENT_STACK_STATE_KEY,
  reducer: contentStackReducer,
});

const withEmailRegistrationSaga = injectSaga({
  key: EMAIL_REGISTRATION_STATE_KEY,
  saga: emailRegistrationSaga,
});
const withContentStackSaga = injectSaga({
  key: CONTENT_STACK_STATE_KEY,
  saga: contentStackSaga,
});

const withAccountSignInSaga = injectSaga({
  key: ACCOUNT_SIGNIN_DETAILS_STATE_KEY,
  saga: accountSignInSaga,
});

const withRegistryTypesSagas = injectSaga({
  key: REG_INPUTS_STATE_KEY,
  saga: RegistryTypesSagas,
});

const withCoProfileSagSaga = injectSaga({
  key: 'CO_PROFILE_SAGA',
  saga: coProfileSagSagas,
});

export default compose(
  withRegistryInputReducer,
  withEmailRegistrationReducer,
  withContentStackReducer,
  withCoProfileSagSaga,
  withEmailRegistrationSaga,
  withContentStackSaga,
  withAccountSignInSaga,
  withRegistryTypesSagas,
  withConnect
)(toJS(CreateRegistry));
