import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { CONTRIBUTE_CASH_FUND_STATE_KEY } from './constants';

export const cashFundData = state =>
  state.get(CONTRIBUTE_CASH_FUND_STATE_KEY, Map());

export const getCFSubmitAPIStatus = () =>
  createSelector(cashFundData, cashFundDetails => cashFundDetails);
