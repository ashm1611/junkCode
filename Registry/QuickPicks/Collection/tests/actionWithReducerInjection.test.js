import { FETCH_QUICK_PICKS_COLLECTION } from '../constants';
import { fetchQuickPicksCollection } from '../actionWithReducerInjection';

describe(__filename, () => {
  it('should dispatch action fetchQuickPicksCollection', () => {
    const args = {};
    const pageName = '';
    const search = '';
    const state = {};
    const siteId = '';
    const expectedResult = {
      type: FETCH_QUICK_PICKS_COLLECTION,
      args,
      pageName,
      state,
      siteId,
    };
    expect(
      fetchQuickPicksCollection(args, pageName, search, state, siteId)
    ).to.deep.equal(expectedResult);
  });
});
