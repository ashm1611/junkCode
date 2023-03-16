import { put, takeLatest } from 'redux-saga/effects';
import { contributeCashFund, contributeCashFundSaga } from '../sagas';
import { CONTRIBUTE_CASH_FUND } from '../constants';
import { contributeCashFundSuccess } from '../actions';

describe('#contributeCashFund Saga', () => {
  let contentGenerator;

  beforeEach(() => {
    const args = {
      data: {
        firstName: 'abc',
        lastName: 'xyz',
        email: 'abc@xyz.com',
        contribution: '30',
        registryId: '12345',
        refId: '987654321',
      },
    };
    contentGenerator = contributeCashFund(args);
    contentGenerator.next();
  });

  it('should dispatch the  action for success response', () => {
    const response = {
      body: {
        serviceStatus: 'SUCCESS',
        data: { atgResponse: true },
        errorMessages: [],
      },
    };
    const result = contentGenerator.next(response).value;
    expect(result).to.deep.equal(put(contributeCashFundSuccess()));
  });

  it('should set error message', () => {
    const response = {
      body: {
        serviceStatus: 'ERROR',
        data: { atgResponse: false },
        errorMessages: 'Error',
      },
    };
    contentGenerator.next(response);
  });

  it('should dispatch the action for error response', () => {
    contentGenerator.next();
  });

  it('should start task to watch for CONTRIBUTE_CASH_FUND action', () => {
    const contributeCashFundSagaGenarator = contributeCashFundSaga();
    const takeLatestDescriptor = contributeCashFundSagaGenarator.next().value;
    contributeCashFundSagaGenarator.next();
    expect(takeLatestDescriptor).to.deep.equal(
      takeLatest(CONTRIBUTE_CASH_FUND, contributeCashFund)
    );
  });
});
