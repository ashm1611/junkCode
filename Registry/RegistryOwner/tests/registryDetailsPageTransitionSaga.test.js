import { put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import {
  getRegistryStatus,
  getRegistryDetailsOnServer,
  registryDetailsSagaonServerSaga,
} from '../registryDetailsPageTransitionSaga';
import { fetchRegistryDataError, fetchRegistryDataSuccess } from '../actions';
import {
  DEFAULT_ERROR_MESSAGE,
  FETCH_REGISTRY_DATA_SERVER,
} from '../constants';

describe('#getRegistryStatus', () => {
  const getRegistryStatusBuilder = () => {
    const getRegistryStatusGen = getRegistryStatus('534767434');
    getRegistryStatusGen.next();
    return getRegistryStatusGen;
  };

  it('#getRegistryStatus with throwing Error ECB01784', () => {
    const error = new Error('Something went wrong');
    error.body = {
      response: {
        data: {
          errorMessages: [{ code: 'ECB01784' }],
        },
      },
    };
    const result = getRegistryStatusBuilder().throw(error).value;
    expect(result).to.deep.equal(
      put(fetchRegistryDataError(error.body.response.data.errorMessages))
    );
  });

  it('#getRegistryStatus with throwing Error ECB01785', () => {
    const error = new Error('Something went wrong');
    error.body = {
      response: {
        data: {
          errorMessages: [{ code: 'ECB01785' }],
        },
      },
    };
    const data = {
      dataFromSolrCall: true,
      registryResVO: {
        registrySummaryVO: {
          isPublic: '0',
        },
      },
    };
    const result = getRegistryStatusBuilder().throw(error).value;
    expect(result).to.deep.equal(put(fetchRegistryDataSuccess(data)));
  });

  it('#getRegistryStatus with success and active atgResponse', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          atgResponse: 'Active',
        },
      },
    };
    const result = getRegistryStatusBuilder().next(response).value;
    expect(result).to.equal(null);
  });

  it('#getRegistryStatus with success and with error message', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          atgResponse: 'Active1',
        },
        errorMessages: 'errorMessages',
      },
    };
    const result = getRegistryStatusBuilder().next(response).value;
    expect(result).to.deep.equal(
      put(fetchRegistryDataError(response.body.errorMessages))
    );
  });

  it('#getRegistryStatus with error response', () => {
    const error = new Error('Something went wrong');
    error.body = {
      response: {
        data: {
          errorMessages: [{ code: 'ECB01785sd' }],
        },
      },
    };
    const result = getRegistryStatusBuilder().throw(error).value;
    expect(result).to.deep.equal(
      put(fetchRegistryDataError(DEFAULT_ERROR_MESSAGE))
    );
  });
});
describe('#getRegistryDetailsOnServer', () => {
  const registryId = '534767434';
  const getRegistryDetailsSolrBuilder = () => {
    const getRegistryStatusGen = getRegistryDetailsOnServer(registryId);
    getRegistryStatusGen.next();
    getRegistryStatusGen.next(fromJS({ registrySearchGroupBy: 'http://solr' }));
    getRegistryStatusGen.next('BedBathUS');
    return getRegistryStatusGen;
  };

  it('#getRegistryDetailsOnServer with blank doc', () => {
    const apiResponse = {
      body: {
        response: {
          docs: [],
        },
      },
    };
    const getRegistryDetailsSolrGen = getRegistryDetailsSolrBuilder();
    /* eslint-disable no-unused-expressions */
    getRegistryDetailsSolrGen.next(apiResponse).value;
    const result = getRegistryDetailsSolrGen.next();
    expect(result).to.be.a('object');
  });

  it('#getRegistryDetailsOnServer with 1 length of doc', () => {
    const apiResponse = {
      body: {
        response: {
          docs: [
            {
              registry_num: 'registry_num',
              event_type_description: 'event_type_description',
              reg_first_name: 'reg_first_name',
              reg_maiden_name: 'reg_maiden_name',
              coreg_last_name: 'coreg_last_name',
              coreg_first_name: 'coreg_first_name',
              reg_last_name: 'reg_last_name',
              event_date: 'event_date',
              baby_gender: 'baby_gender',
              daysToGo: 'daysToGo',
              eventYetToCome: 'eventYetToCome',
            },
          ],
        },
      },
    };
    const data = {
      dataFromSolrCall: true,
      registryResVO: {
        registrySummaryVO: {
          coRegistrantFirstName: 'coreg_first_name',
          coRegistrantLastName: 'coreg_last_name',
          eventDate: 'event_date',
          eventType: 'event_type_description',
          registryId: 'registry_num',
          primaryRegistrantFirstName: 'reg_first_name',
          primaryRegistrantLastName: 'reg_last_name',
          primaryRegistrantMaidenName: 'reg_maiden_name',
          daysToGo: 'daysToGo',
          eventYetToCome: 'eventYetToCome',
          babyGender: 'baby_gender',
          isPublic: '1',
        },
      },
    };
    const getRegistryDetailsSolrGen = getRegistryDetailsSolrBuilder();
    const result = getRegistryDetailsSolrGen.next(apiResponse).value;
    expect(result).to.deep.equal(put(fetchRegistryDataSuccess(data)));
  });

  it('#getRegistryDetailsOnServer with more than 1 length of doc', () => {
    const apiResponse = {
      errorMessage: 'errorMessage',
      body: {
        response: {
          docs: [
            {
              registry_num: 'registry_num',
              event_type_description: 'event_type_description',
              reg_first_name: 'reg_first_name',
              coreg_last_name: 'coreg_last_name',
              coreg_first_name: 'coreg_first_name',
              reg_last_name: 'reg_last_name',
              event_date: 'event_date',
              baby_gender: 'baby_gender',
              daysToGo: 'daysToGo',
              eventYetToCome: 'eventYetToCome',
            },
            { registry_num: 'registry_num' },
          ],
        },
      },
    };
    const getRegistryDetailsSolrGen = getRegistryDetailsSolrBuilder();
    const result = getRegistryDetailsSolrGen.next(apiResponse).value;
    expect(result).to.deep.equal(put(fetchRegistryDataError()));
  });

  it('#getRegistryDetailsOnServer while throw error', () => {
    const error = new Error('Something went wrong');
    const getRegistryDetailsSolrGen = getRegistryDetailsSolrBuilder();
    const result = getRegistryDetailsSolrGen.throw(error).value;
    expect(result).to.deep.equal(
      put(fetchRegistryDataError(DEFAULT_ERROR_MESSAGE))
    );
  });
});
describe('#registryDetailsSagaonServerSaga Saga', () => {
  let myRegistriesInfoGenerator;
  beforeEach(() => {
    myRegistriesInfoGenerator = registryDetailsSagaonServerSaga();
  });
  it('should start task to watch for FETCH_REGISTRY_DATA_SERVER action', () => {
    const takeLatestDescriptor = myRegistriesInfoGenerator.next().value;
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(FETCH_REGISTRY_DATA_SERVER, getRegistryDetailsOnServer)
    );
  });
});
