import {
  CONTRIBUTE_CASH_FUND,
  CONTRIBUTE_CASH_FUND_SUCCESS,
  CONTRIBUTE_CASH_FUND_ERROR,
  CLEAR_CONTRIBUTE_CASH_FUND,
} from './constants';

export function contributeCashFund(data) {
  return {
    type: CONTRIBUTE_CASH_FUND,
    data,
  };
}

export function contributeCashFundSuccess() {
  return {
    type: CONTRIBUTE_CASH_FUND_SUCCESS,
  };
}

export function contributeCashFundError() {
  return {
    type: CONTRIBUTE_CASH_FUND_ERROR,
  };
}

export function clearContributeCashFund() {
  return {
    type: CLEAR_CONTRIBUTE_CASH_FUND,
  };
}
