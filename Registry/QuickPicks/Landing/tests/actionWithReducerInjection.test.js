import { FETCH_QUICK_PICKS } from '../constants';
import { fetchQuickPicks } from '../actionWithReducerInjection';

describe(__filename, () => {
  it('should dispatch action fetchQuickPicks', () => {
    const args = {};
    const pageName = '';
    const search = '';
    const state = {};
    const siteId = '';
    const expectedResult = {
      type: FETCH_QUICK_PICKS,
      args,
      pageName,
      state,
      siteId,
    };
    expect(
      fetchQuickPicks(args, pageName, search, state, siteId)
    ).to.deep.equal(expectedResult);
  });
});
