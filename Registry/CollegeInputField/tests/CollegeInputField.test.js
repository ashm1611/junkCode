import sinon from 'sinon';
import { mapDispatchToProps } from '../CollegeInputField';

describe(__filename, () => {
  it('should mapDispatchToProps', () => {
    const dispatch = () => {};
    expect(mapDispatchToProps(dispatch)).to.be.a('object');
  });
  it('mapDispatchToProps should return a prop fetchCollegeList', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchCollegeList();
    expect(dispatch.called).to.equal(true);
  });
});
