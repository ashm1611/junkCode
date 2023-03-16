import {
  CONTRIBUTE_CASH_FUND,
  CONTRIBUTE_CASH_FUND_SUCCESS,
  CONTRIBUTE_CASH_FUND_ERROR,
  CLEAR_CONTRIBUTE_CASH_FUND,
} from '../constants';
import {
  contributeCashFund,
  contributeCashFundSuccess,
  contributeCashFundError,
  clearContributeCashFund,
} from '../actions';

describe('Actions for contribute Cash Fund', () => {
  describe('contributeCashFund', () => {
    it('should return the proper object', () => {
      const output = contributeCashFund();
      expect(output.type).to.equal(CONTRIBUTE_CASH_FUND);
    });
  });
  describe('contributeCashFundSuccess', () => {
    it('should return the proper object', () => {
      const output = contributeCashFundSuccess();
      expect(output.type).to.equal(CONTRIBUTE_CASH_FUND_SUCCESS);
    });
  });
  describe('contributeCashFundError', () => {
    it('should return the proper object', () => {
      const output = contributeCashFundError();
      expect(output.type).to.equal(CONTRIBUTE_CASH_FUND_ERROR);
    });
  });
  describe('clearContributeCashFund', () => {
    it('should return the proper object', () => {
      const output = clearContributeCashFund();
      expect(output.type).to.equal(CLEAR_CONTRIBUTE_CASH_FUND);
    });
  });
});
