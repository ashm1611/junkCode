import {
  setQuickPicks,
  fetchQuickPicks,
  productPositionClicked,
} from '../actions';

describe(__filename, () => {
  it('should cover actions', () => {
    expect(setQuickPicks('a')).to.be.a('object');
    expect(fetchQuickPicks({ match: 'a' })).to.be.a('object');
    expect(productPositionClicked('left', 'test')).to.be.a('object');
  });
});
