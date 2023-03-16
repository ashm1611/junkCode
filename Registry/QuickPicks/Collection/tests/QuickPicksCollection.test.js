import { mapDispatchToProps, mapStateToProps } from '../QuickPicksCollection';

describe(__filename, () => {
  it('should mapDispatchToProps', () => {
    const dispatch = () => {};
    expect(mapDispatchToProps(dispatch)).to.be.a('object');
  });
  it('should mapStateToProps', () => {
    expect(mapStateToProps()).to.be.a('function');
  });
});
