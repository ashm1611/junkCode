import {
  setQuickPicksCollection,
  fetchQuickPicksCollectionError,
  addSelectedItemsToRegistry,
  selectProducts,
  addItemToActiveRegistry,
  updateProductQty,
  fetchQuickPicksCollection,
  resetQuickPicksCollection,
} from '../actions';

describe(__filename, () => {
  it('should cover actions', () => {
    expect(setQuickPicksCollection({ products: [] })).to.be.a('object');
    expect(fetchQuickPicksCollection()).to.be.a('object');
    expect(
      fetchQuickPicksCollectionError({ error: { message: 'error code' } })
    ).to.be.a('object');
    expect(addSelectedItemsToRegistry()).to.be.a('object');
    expect(selectProducts()).to.be.a('object');
    expect(resetQuickPicksCollection()).to.be.a('object');
    expect(addItemToActiveRegistry()).to.be.a('object');
    expect(updateProductQty({ products: [] })).to.be.a('object');
  });
});
