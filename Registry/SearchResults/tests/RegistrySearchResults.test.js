import { mapDispatchToProps, mapStateToProps } from '../SearchResults';

describe(__filename, () => {
  it('should mapDispatchToProps', () => {
    const dispatch = () => {};
    expect(mapDispatchToProps(dispatch)).to.be.a('object');
  });
  it('should mapStateToProps', () => {
    const dispatch = () => {};
    expect(mapStateToProps(dispatch)).to.be.a('function');
  });
});
