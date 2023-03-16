import { fromJS } from 'immutable';

import { getCFSubmitAPIStatus } from '../selectors';

describe('contribute cash Funds Selectors', () => {
  const mockedState = fromJS({
    contributeCashFundKey: {},
  });
  it('should select the getCFSubmitAPIStatus', () => {
    const selector = getCFSubmitAPIStatus();
    expect(selector(mockedState)).to.equal(fromJS({}));
  });
});
