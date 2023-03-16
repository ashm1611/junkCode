/* eslint-disable redux-saga/yield-effects */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import pathOr from 'lodash/fp/pathOr';
import qs from 'qs';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { getApolloApiUrls } from '@bbb-app/selectors/pageSelectors';
import { selectSiteId } from '@bbb-app/selectors/configSelector';
import consoleLog from '@bbb-app/utils/logger';
import { fetchRegistryDataError, fetchRegistryDataSuccess } from './actions';
import { DEFAULT_ERROR_MESSAGE, FETCH_REGISTRY_DATA_SERVER } from './constants';

const getSiteId = siteName =>
  ({
    [siteName]: 1, // Default site id for BedBathUS, TBS_BedBathUS, undefined
    BedBathCanada: 3,
    BuyBuyBaby: 2,
    TBS_BedBathCanada: 3,
    TBS_BuyBuyBaby: 2,
  }[siteName]);

export function* getRegistryStatus(registryId) {
  try {
    const {
      body: { serviceStatus, errorMessages, data },
    } = yield call(ServiceUtil.triggerServerRequest, {
      url: getApiEndPointsFromStore('registryStatus'),
      method: 'POST',
      data: qs.stringify({
        registryId,
      }),
    });
    if (serviceStatus === 'SUCCESS' && data.atgResponse === 'Active') {
      return null;
    }
    return put(fetchRegistryDataError(errorMessages));
  } catch (err) {
    consoleLog.error(err);
    const errorCode = pathOr(
      null,
      'body.response.data.errorMessages[0].code',
      err
    );
    if (errorCode === 'ECB01784') {
      return yield put(
        fetchRegistryDataError(err.body.response.data.errorMessages)
      );
    } else if (errorCode === 'ECB01785') {
      const data = {
        dataFromSolrCall: true,
        registryResVO: {
          registrySummaryVO: {
            isPublic: '0',
          },
        },
      };
      return yield put(fetchRegistryDataSuccess(data));
    }
    return yield put(fetchRegistryDataError(DEFAULT_ERROR_MESSAGE));
  }
}

export function* getRegistryDetailsOnServer({ args }) {
  const registryId = pathOr('', 'id', args);
  try {
    const apolloEndPoints = yield select(getApolloApiUrls);
    const siteId = yield select(selectSiteId());
    const url = apolloEndPoints.get('registrySearchGroupBy');
    const params = {
      site: getSiteId(siteId),
      q: registryId,
    };
    const { body: searchResults } = yield call(
      ServiceUtil.triggerServerRequest,
      {
        params,
        url,
      }
    );
    const { response } = searchResults;
    let errorMessage;
    if (response.docs && response.docs.length === 0)
      return yield getRegistryStatus(registryId);
    if (response.docs && response.docs.length === 1) {
      const registryData = response.docs && response.docs[0];
      const {
        registry_num,
        event_type_description,
        reg_first_name,
        coreg_last_name,
        coreg_first_name,
        reg_last_name,
        event_date,
        baby_gender,
        daysToGo,
        eventYetToCome,
        reg_maiden_name,
      } = registryData;
      const data = {
        dataFromSolrCall: true,
        registryResVO: {
          registrySummaryVO: {
            coRegistrantFirstName: coreg_first_name,
            coRegistrantLastName: coreg_last_name,
            eventDate: event_date,
            eventType: event_type_description,
            registryId: registry_num,
            primaryRegistrantFirstName: reg_first_name,
            primaryRegistrantLastName: reg_last_name,
            primaryRegistrantMaidenName: reg_maiden_name,
            daysToGo,
            eventYetToCome,
            babyGender: baby_gender,
            isPublic: '1',
          },
        },
      };
      return yield put(fetchRegistryDataSuccess(data));
    }
    return yield put(fetchRegistryDataError(errorMessage));
  } catch (err) {
    return yield put(fetchRegistryDataError(DEFAULT_ERROR_MESSAGE));
  }
}

export function* registryDetailsSagaonServerSaga() {
  yield takeLatest(FETCH_REGISTRY_DATA_SERVER, getRegistryDetailsOnServer);
}

export default [registryDetailsSagaonServerSaga];
