import { fromJS } from 'immutable';

import { contributeCashFundReducer } from '../reducer';
import {
  CONTRIBUTE_CASH_FUND_SUCCESS,
  CONTRIBUTE_CASH_FUND_ERROR,
  CLEAR_CONTRIBUTE_CASH_FUND,
} from '../constants';

describe('contributeCashFundReducer', () => {
  const state = fromJS({
    registryId: null,
    submitSuccessFlag: false,
    submitErrorFlag: false,
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(contributeCashFundReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });

  it('should set submitSuccessFlag', () => {
    const actionData = { type: CONTRIBUTE_CASH_FUND_SUCCESS };
    const expectedResult = state.set('submitSuccessFlag', true);
    expect(contributeCashFundReducer(state, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should set submitErrorFlag', () => {
    const actionData = { type: CONTRIBUTE_CASH_FUND_ERROR };
    const expectedResult = state.set('submitErrorFlag', true);
    expect(contributeCashFundReducer(state, actionData)).to.deep.equal(
      expectedResult
    );
  });

  it('should set intial state on ', () => {
    const data = {};
    const actionData = { type: CLEAR_CONTRIBUTE_CASH_FUND, data };
    const expectedResult = state
      .set('submitSuccessFlag', false)
      .set('submitErrorFlag', false);
    expect(contributeCashFundReducer(state, actionData)).to.deep.equal(
      expectedResult
    );
  });
});
