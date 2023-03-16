import { fromJS } from 'immutable';
import {
  CONTRIBUTE_CASH_FUND_SUCCESS,
  CLEAR_CONTRIBUTE_CASH_FUND,
  CONTRIBUTE_CASH_FUND_ERROR,
} from './constants';

const initialState = fromJS({
  registryId: null,
  submitSuccessFlag: false,
  submitErrorFlag: false,
});

export function contributeCashFundReducer(state = initialState, { type }) {
  switch (type) {
    case CONTRIBUTE_CASH_FUND_SUCCESS:
      return state.set('submitSuccessFlag', true);
    case CONTRIBUTE_CASH_FUND_ERROR:
      return state.set('submitErrorFlag', true);
    case CLEAR_CONTRIBUTE_CASH_FUND:
      return state
        .set('submitSuccessFlag', false)
        .set('submitErrorFlag', false);
    default:
      return state;
  }
}
