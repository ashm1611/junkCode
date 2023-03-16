import { call, put, takeLatest, select } from 'redux-saga/effects';
import pathOr from 'lodash/fp/pathOr';
import _merge from 'lodash/merge';
import qs from 'qs';
import { makeSelectSwitchConfig } from '@bbb-app/selectors/configSelector';
import { isGuestUser } from '@bbb-app/utils/common';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { miniCartState } from '@bbb-app/mini-cart/containers/selectors';
import { makeSelectAkamaiInfo } from '@bbb-app/tealium/tagSelectors/akamai';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import {
  fetchRegistriesDetails,
  fetchOwnAndRecommendedRegistryDetails,
} from '@bbb-app/get-registry-details/containers/actions';
import { RBYR_TEALIUM } from '@bbb-app/tbs/containers/RBYRTealium';
import { logoutSuccess } from '@bbb-app/header/containers/actions';
import { InvalidSyntaxHttpErrorDetails } from '@bbb-app/error-pages/containers/http-error-pages/UnauthorizedPage';
import { getVerificationParams } from '@bbb-app/utils/deviceVerificationUtil';
import { checkUserStateData } from '@bbb-app/redux/session-confirmation-number/actions';
import {
  setAccountSignInDetailsErrorCookie,
  clearAccountSignInDetailsErrorCookie,
} from '@bbb-app/account-signin/containers/actions';
import { fetchUserProfileData } from '@bbb-app/redux/profile-data/actions';
import { setDeviceId } from '@bbb-app/utils/setDeviceToken.async';

import {
  fetchRegistryInputsSuccess,
  fetchRegistryInputsError,
  createRegistryDataSuccess,
} from './actions';
import {
  FETCH_REG_INPUTS,
  DEFAULT_ERROR_MESSAGE,
  CREATE_REG,
  CREATE_REGISTRY_TEALIUM_ACTION,
  GIFT_CARD,
} from './constants';
import createRegistryTealiumInfo from './createRegistryTealiumInfo';

export function* getRegistryInputs({ regType, siteId, thirdParty }) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('registryInputs'),
      headers: {
        'atg-rest-depth': 3,
      },
      params: {
        registryType: regType,
        wcsid: thirdParty && thirdParty.wcsid,
        wcref: thirdParty && thirdParty.wcref,
      },
      siteId,
    });
    if (serviceStatus === 'SUCCESS') {
      return yield put(fetchRegistryInputsSuccess(data));
    }
    return yield put(fetchRegistryInputsError(errorMessages.message));
  } catch (error) {
    return yield put(fetchRegistryInputsError(DEFAULT_ERROR_MESSAGE));
  }
}

const commonGiftCardData = {
  price: '$100.00',
  qty: '1',
  isCustomizationRequired: false,
  refNum: '',
  ltlFlag: 'false',
  altNumber: '',
  ltlShipMethod: null,
  porchPayLoadJson: '',
  isList: false,
  fromComparisonPage: '',
  returnURL: '',
  skipNotifyFlag: 'false',
};

function getGiftCardData(labels, eventType, registryEventType) {
  const value = pathOr('', `${registryEventType}${GIFT_CARD}`, labels);
  let skuId;
  let prodId;
  if (value) {
    const dataArray = value.split('_');
    skuId = dataArray[0] && dataArray[0];
    prodId = dataArray[1] && dataArray[1];
  }
  if (skuId && prodId) {
    return {
      skuId,
      prodId,
      eventType,
      ...commonGiftCardData,
    };
  }
  return null;
}

function getData(registryId, giftCardData) {
  const {
    skuId,
    prodId,
    qty,
    price,
    activeRegistryName,
    isCustomizationRequired,
    personalizationType,
    refNum,
    ltlFlag,
    ltlShipMethod,
    isList,
    fromComparisonPage,
    returnURL,
    altNumber,
    isFromPendingTab,
    isFromDeclinedTab,
    isDeclined,
    repositoryId,
    skipNotifyFlag,
  } = giftCardData;
  const giftData = qs.stringify({
    jasonCollectionObj: JSON.stringify({
      addItemResults: [
        {
          qty: qty.toString(),
          registryId,
          skuId,
          price,
          prodId,
          isCustomizationRequired,
          personalizationType,
          refNum,
          ltlFlag,
          altNumber,
          ltlShipMethod,
          porchPayLoadJson: '',
        },
      ],
      parentProdId: prodId,
      registryName: activeRegistryName,
      repositoryId,
      isList,
      fromComparisonPage,
      returnURL,
      isFromPendingTab,
      isFromDeclinedTab,
      isDeclined,
      skipNotifyFlag,
    }),
  });
  return giftData;
}

export function* addToRegistry(registryId, giftCardData, customerId) {
  try {
    yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('addItemsToGiftRegistry').replace(
        ':customerId',
        customerId
      ),
      method: 'POST',
      showLoader: true,
      variation: 'fullWidth',
      data: getData(registryId, giftCardData),
    });
    // eslint-disable-next-line no-empty
  } catch (exception) {}
}

export function* createRegistryErrorHandler(err) {
  if (err.statusCode === InvalidSyntaxHttpErrorDetails.code) {
    yield put(setAccountSignInDetailsErrorCookie());
  }
  return yield put(
    fetchRegistryInputsError(
      pathOr('', 'body.response.data.errorMessages', err)
    )
  );
}

export function* createRegistry(formdata) {
  try {
    const url = formdata.data.thirdPartyParams
      ? `${getApiEndPointsFromStore('getRegistryDetails')}?${
          formdata.data.thirdPartyParams
        }`
      : getApiEndPointsFromStore('getRegistryDetails');
    const requestParams = { ...formdata.data, verReq: true };
    const deviceData = getVerificationParams();

    _merge(requestParams, deviceData);
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url,
      method: 'POST',
      showLoader: true,
      data: qs.stringify(requestParams),
    });
    if (serviceStatus === 'SUCCESS' || serviceStatus === 'PARTIAL_ERROR') {
      return yield createRegistrycall(formdata, data);
    }
    return yield put(fetchRegistryInputsError(errorMessages));
  } catch (err) {
    const statuscode = pathOr(
      null,
      'body.response.data.errorMessages[0].code',
      err
    );

    const errorData = pathOr(null, 'body.response.data.data', err);
    if (statuscode === 'ECB05280') {
      return yield createRegistrycall(formdata, errorData);
    }
    return yield createRegistryErrorHandler(err);
  }
}

export function* createRegistrycall(formdata, data) {
  const isGuestUserFlag = isGuestUser();
  const profileId = data.component['registryVO.primaryRegistrant.profileId'];
  const registryId = data.component['registryVO.registryId'];
  const groupGiftingOptInInfo = data.component.groupGiftingOptIn;
  /**
   * If device is passively saved, save the deviceId in storage
   */
  const deviceId = pathOr(null, 'deviceToken', data);
  yield call(setDeviceId, deviceId);
  /* istanbul ignore else  */
  const {
    'registryVO.registryType.registryTypeName': eventType,
    registryEventType,
  } = formdata.data;
  const registryGiftCard = getGiftCardData(
    formdata.labels,
    eventType,
    registryEventType
  );
  const isNewDashboard = yield select(
    makeSelectSwitchConfig(['RegistryOwner', 'enableNewRegDashboard'], false)
  );
  /* istanbul ignore else  */
  if (!isNewDashboard && registryGiftCard) {
    yield addToRegistry(registryId, registryGiftCard, profileId);
  }

  yield put(fetchUserProfileData(profileId));
  yield put(
    fetchRegistriesDetails(profileId, formdata.thersholdDayForOldRegistry)
  );
  yield put(fetchOwnAndRecommendedRegistryDetails(profileId));
  const miniCartData = yield select(miniCartState);
  const akamaiData = yield select(makeSelectAkamaiInfo());
  const isNewCreateRegForm = yield select(
    makeSelectSwitchConfig(['createRegistry', 'enableNewCreateReg'])
  );
  const tealiumInfo = createRegistryTealiumInfo(
    formdata.data,
    profileId,
    registryId,
    miniCartData,
    akamaiData,
    isGuestUserFlag,
    groupGiftingOptInInfo,
    isNewCreateRegForm
  );

  /* istanbul ignore else  */
  if (
    formdata.data &&
    formdata.data.rbyrCheckbox &&
    formdata.data.storedValueOptIn
  ) {
    tealiumInfo.rbyr_call_to_actiontype = RBYR_TEALIUM.OPT_IN_ACTION;
  }
  yield put(
    triggerTealiumEvent(CREATE_REGISTRY_TEALIUM_ACTION, tealiumInfo, '')
  );
  /**
   * ---- Explicit logout a user ----
   * When a user extend account and Create a Checklist/Registry then submit the form
   * then user redirect to "One more step page",
   * there we need the user in the logout state, if user is Guest or Un-verified
   */
  const emailVerReq = pathOr(false, 'component.emailVerReq', data);
  /* istanbul ignore else  */
  if (isGuestUser() && emailVerReq) {
    const pathname = pathOr('', 'data.pathname', formdata);
    yield put(logoutSuccess(null, pathname, true));
    yield put(checkUserStateData());
  }

  yield put(createRegistryDataSuccess(data));
  return yield put(clearAccountSignInDetailsErrorCookie());
}

export function* registryInputSaga() {
  yield takeLatest(FETCH_REG_INPUTS, getRegistryInputs);
}

export function* createRegistrySaga() {
  yield takeLatest(CREATE_REG, createRegistry);
}

export default [registryInputSaga, createRegistrySaga];
