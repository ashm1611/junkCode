import { put, takeLatest } from 'redux-saga/effects';
import sinon from 'sinon';
import * as getApiEndPointsFromStoreUtil from '@bbb-app/utils/getApiEndPointsFromStore';

import {
  fetchRecommendationsSuccess,
  fetchRecommendationsError,
  getRecommenderSummarySuccess,
  getRecommenderSummaryError,
  mayBeLaterCallSuccess,
  mayBeLaterCallError,
  socialRecommendUserBlockUnblockError,
  fetchRecommenderSummary,
} from '../actions';

import { initiateInactivityModal } from '../../RegistryOwner/actions';

import {
  getRecommendations,
  setEmailFrequency,
  getRecommendationsSortedByDate,
  getRecommenderSummary,
  mayBeLater,
  blockOrUnblockRecommender,
  recommendationsSaga,
  recommenderSummarySaga,
  emailFrequencySaga,
  getRecommendationsSortedByDateSaga,
  mayBeLaterSaga,
  blockOrUnblockRecommenderSaga,
} from '../sagas';
import {
  FETCH_REGISTRY_RECOMMENDATIONS,
  SAVE_EMAIL_FREQUENCY,
  FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED,
  MAY_BE_LATER,
  SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK,
  FETCH_REGISTRY_RECOMMENDER_SUMMARY,
} from '../constants';

describe('#getRecommendationsSaga', () => {
  let getRecommendationsSagaGenerator;

  beforeEach(() => {
    const registryId = '123';
    const tabId = 0;
    const sortOption = 0;
    const eventTypeCode = 'BRD';
    getRecommendationsSagaGenerator = getRecommendations(
      registryId,
      tabId,
      sortOption,
      eventTypeCode
    );
    getRecommendationsSagaGenerator.next();
    getRecommendationsSagaGenerator.next();
  });

  it('should dispatch the "fetchRecommendationsSuccess" action for success response', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const takeLatestDescriptor = getRecommendationsSagaGenerator.next(response)
      .value;
    expect(takeLatestDescriptor).to.deep.equal(
      put(fetchRecommendationsSuccess())
    );
  });

  it('should dispatch the "fetchRecommendationsError" action when 200 ok but without SUCCESS', () => {
    const response = {
      body: {
        serviceStatus: '',
        errorMessages: 'error',
      },
    };
    const takeLatestDescriptor = getRecommendationsSagaGenerator.next(response)
      .value;

    expect(takeLatestDescriptor).to.deep.equal(
      put(fetchRecommendationsError(response.body.errorMessages))
    );
  });

  it('should dispatch the "fetchRecommendationsError" action for error response', () => {
    const error = { body: 'response is not correct' };
    const response = { body: error };
    const putDescriptor = getRecommendationsSagaGenerator.throw(response.body)
      .value;
    expect(putDescriptor).to.deep.equal(
      put(fetchRecommendationsError(error.body))
    );
  });
});

describe('#getRecommenderSummary', () => {
  let getRecommenderSummarySagaGenerator;

  beforeEach(() => {
    const registryId = '123';
    const tabId = 0;
    getRecommenderSummarySagaGenerator = getRecommenderSummary(
      registryId,
      tabId
    );
    getRecommenderSummarySagaGenerator.next();
    getRecommenderSummarySagaGenerator.next();
  });

  it('should dispatch the "getRecommenderSummarySuccess" action for success response', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const takeLatestDescriptor = getRecommenderSummarySagaGenerator.next(
      response
    ).value;
    expect(takeLatestDescriptor).to.deep.equal(
      put(getRecommenderSummarySuccess())
    );
  });

  it('should dispatch the "getRecommenderSummaryError" action when 200 ok but without SUCCESS', () => {
    const response = {
      body: {
        serviceStatus: '',
        errorMessages: 'error',
      },
    };
    const takeLatestDescriptor = getRecommenderSummarySagaGenerator.next(
      response
    ).value;

    expect(takeLatestDescriptor).to.deep.equal(
      put(getRecommenderSummaryError(response.body.errorMessages))
    );
  });

  it('should dispatch the "getRecommenderSummaryError" action for error response', () => {
    const error = { body: 'response is not correct' };
    const response = { body: error };
    const putDescriptor = getRecommenderSummarySagaGenerator.throw(
      response.body
    ).value;
    expect(putDescriptor).to.deep.equal(
      put(getRecommenderSummaryError(error.body))
    );
  });
});

describe('#mayBeLater', () => {
  let mayBeLaterSagaGenerator;

  const skuId = '1234';
  const prodId = '1234';
  const registryId = '1234';
  const qty = '5';
  const price = '1234';
  const registryName = 'test';
  const isCustomizationRequired = 'true';
  const personalizationType = '1234';
  const refNum = '1234';
  const ltlFlag = 'true';
  const ltlShipMethod = '1234';
  const porchPayLoadJson = '1234';
  const isList = '1234';
  const fromComparisonPage = '1234';
  const returnURL = '1234';
  const altNumber = '1234';
  const isFromPendingTab = '1234';
  const isDeclined = 'true';
  const repositoryId = '1234';
  const skipNotifyFlag = 'true';

  beforeEach(() => {
    const payload = {
      skuId,
      prodId,
      registryId,
      qty,
      price,
      registryName,
      isCustomizationRequired,
      personalizationType,
      refNum,
      ltlFlag,
      ltlShipMethod,
      porchPayLoadJson,
      isList,
      fromComparisonPage,
      returnURL,
      altNumber,
      isFromPendingTab,
      isDeclined,
      repositoryId,
      skipNotifyFlag,
    };

    mayBeLaterSagaGenerator = mayBeLater({ payload });
    mayBeLaterSagaGenerator.next();
    mayBeLaterSagaGenerator.next();
    mayBeLaterSagaGenerator.next();
  });

  it('should dispatch the "mayBeLaterCallSuccess" action for success response', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const takeLatestDescriptor = mayBeLaterSagaGenerator.next(response).value;
    expect(takeLatestDescriptor).to.deep.equal(put(mayBeLaterCallSuccess()));
  });

  it('should dispatch the "mayBeLaterCallError" action when 200 ok but without SUCCESS', () => {
    const response = {
      body: {
        serviceStatus: '',
        errorMessages: 'error',
      },
    };
    const takeLatestDescriptor = mayBeLaterSagaGenerator.next(response).value;

    expect(takeLatestDescriptor).to.deep.equal(
      put(mayBeLaterCallError(response.body.errorMessages))
    );
  });

  it('should dispatch the "mayBeLaterCallError" action for error response', () => {
    const error = { body: 'response is not correct' };
    const response = { body: error };
    const putDescriptor = mayBeLaterSagaGenerator.throw(response.body).value;
    expect(putDescriptor).to.deep.equal(put(mayBeLaterCallError(error.body)));
  });
});

describe('#blockOrUnblockRecommender', () => {
  let blockOrUnblockRecommenderGenerator;

  beforeEach(() => {
    const dataObj = {
      data: { registryId: 1234 },
    };

    blockOrUnblockRecommenderGenerator = blockOrUnblockRecommender(dataObj);
    blockOrUnblockRecommenderGenerator.next();
  });

  it('should dispatch the "socialRecommendUserBlockUnblockSuccess" action for success response', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const takeLatestDescriptor = blockOrUnblockRecommenderGenerator.next(
      response
    ).value;
    expect(takeLatestDescriptor).to.deep.equal(
      put(fetchRecommenderSummary(1234, '3'))
    );
  });

  it('should dispatch the "socialRecommendUserBlockUnblockError" action when 200 ok but without SUCCESS', () => {
    const response = {
      body: {
        serviceStatus: '',
        errorMessages: 'error',
      },
    };
    const takeLatestDescriptor = blockOrUnblockRecommenderGenerator.next(
      response
    ).value;

    expect(takeLatestDescriptor).to.deep.equal(
      put(socialRecommendUserBlockUnblockError(response.body.errorMessages))
    );
  });

  it('should dispatch the "socialRecommendUserBlockUnblockError" action for error response', () => {
    const data = { body: 'response is not correct' };
    const response = { body: data };
    const putDescriptor = blockOrUnblockRecommenderGenerator.throw(
      response.body.body
    ).value;
    expect(putDescriptor).to.deep.equal(
      put(socialRecommendUserBlockUnblockError(data.body))
    );
  });
});

describe('#setEmailFrequency', () => {
  let setEmailFrequencySagaGenerator;

  beforeEach(() => {
    const registryId = '123';
    const emailOptionValue = 0;
    setEmailFrequencySagaGenerator = setEmailFrequency(
      registryId,
      emailOptionValue
    );
  });

  it('should dispatch the "initiateInactivityModal" action for success response', () => {
    let takeLatestDescriptor = setEmailFrequencySagaGenerator.next(true).value;
    expect(takeLatestDescriptor).to.deep.equal(
      put(initiateInactivityModal(true))
    );

    takeLatestDescriptor = setEmailFrequencySagaGenerator.next('api call')
      .value;
    // eslint-disable-next-line no-unused-expressions
    expect(takeLatestDescriptor).to.be.a('object');
  });
});

describe('#getRecommendationsSortedByDate', () => {
  let getRecommendationsSortedByDateSagaGenerator;

  beforeEach(() => {
    const registryId = '123';
    const tabId = 0;
    const sortOption = 0;
    const eventTypeCode = 'BRD';
    getRecommendationsSortedByDateSagaGenerator = getRecommendationsSortedByDate(
      registryId,
      tabId,
      sortOption,
      eventTypeCode
    );
    getRecommendationsSortedByDateSagaGenerator.next();
    getRecommendationsSortedByDateSagaGenerator.next();
  });

  it('should dispatch the "fetchRecommendationsSuccess" action for success response', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const takeLatestDescriptor = getRecommendationsSortedByDateSagaGenerator.next(
      response
    ).value;
    expect(takeLatestDescriptor).to.deep.equal(
      put(fetchRecommendationsSuccess())
    );
  });

  it('should dispatch the "fetchRecommendationsError" action when 200 ok but without SUCCESS', () => {
    const response = {
      body: {
        serviceStatus: '',
        errorMessages: 'error',
      },
    };
    const takeLatestDescriptor = getRecommendationsSortedByDateSagaGenerator.next(
      response
    ).value;

    expect(takeLatestDescriptor).to.deep.equal(
      put(fetchRecommendationsError(response.body.errorMessages))
    );
  });

  it('should dispatch the "fetchRecommendationsError" action for error response', () => {
    const error = { body: 'response is not correct' };
    const response = { body: error };
    const putDescriptor = getRecommendationsSortedByDateSagaGenerator.throw(
      response.body
    ).value;
    expect(putDescriptor).to.deep.equal(
      put(fetchRecommendationsError(error.body))
    );
  });
});

describe(__filename, () => {
  it('recommendationsSaga: should start a task to watch for "FETCH_REGISTRY_RECOMMENDATIONS" action', () => {
    const recommendationsSagaGenerator = recommendationsSaga();
    const takeLatestDescriptor = recommendationsSagaGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(FETCH_REGISTRY_RECOMMENDATIONS, getRecommendations)
    );
  });

  it('recommenderSummarySaga: should start a task to watch for "FETCH_REGISTRY_RECOMMENDER_SUMMARY" action', () => {
    const recommenderSummarySagaGenerator = recommenderSummarySaga();
    const takeLatestDescriptor = recommenderSummarySagaGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(FETCH_REGISTRY_RECOMMENDER_SUMMARY, getRecommenderSummary)
    );
  });

  it('emailFrequencySaga: should start a task to watch for "SAVE_EMAIL_FREQUENCY" action', () => {
    const emailFrequencySagaGenerator = emailFrequencySaga();
    const takeLatestDescriptor = emailFrequencySagaGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(SAVE_EMAIL_FREQUENCY, setEmailFrequency)
    );
  });

  it('getRecommendationsSortedByDateSaga: should start a task to watch for "FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED" action', () => {
    const getRecommendationsSortedByDateSagaGenerator = getRecommendationsSortedByDateSaga();
    const takeLatestDescriptor = getRecommendationsSortedByDateSagaGenerator.next()
      .value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(
        FETCH_REGISTRY_RECOMMENDATIONS_DATE_SORTED,
        getRecommendationsSortedByDate
      )
    );
  });

  it('mayBeLaterSaga: should start a task to watch for "MAY_BE_LATER" action', () => {
    const mayBeLaterSagaGenerator = mayBeLaterSaga();
    const takeLatestDescriptor = mayBeLaterSagaGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(MAY_BE_LATER, mayBeLater)
    );
  });

  it('blockOrUnblockRecommenderSaga: should start a task to watch for "SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK" action', () => {
    const blockOrUnblockRecommenderSagaGenerator = blockOrUnblockRecommenderSaga();
    const takeLatestDescriptor = blockOrUnblockRecommenderSagaGenerator.next()
      .value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(SOCIAL_RECOMMENDATION_BLOCK_UNBLOCK, blockOrUnblockRecommender)
    );
  });

  it('should dispatch the "socialRecommendUserBlockUnblockSuccess" action for success response - hard code endpoint', () => {
    const getApiEndPointsFromStoreStub = sinon
      .stub(getApiEndPointsFromStoreUtil, 'default')
      .returns(undefined);

    const dataObj = {
      data: { registryId: 1234 },
    };

    const blockOrUnblockRecommenderGenerator = blockOrUnblockRecommender(
      dataObj
    );
    blockOrUnblockRecommenderGenerator.next();

    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        errorMessages: null,
      },
    };
    const takeLatestDescriptor = blockOrUnblockRecommenderGenerator.next(
      response
    ).value;
    blockOrUnblockRecommenderGenerator.next();

    getApiEndPointsFromStoreStub.restore();
    expect(takeLatestDescriptor).to.deep.equal(
      put(fetchRecommenderSummary(1234, '3'))
    );
  });
});
