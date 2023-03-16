import { fromJS } from 'immutable';
import { makeSelectCollegeList } from '../selectors';

describe('college input field Selectors', () => {
  const mockedState = fromJS({
    selectCollegeStateKey: {
      collegeList: true,
    },
  });
  it('should select the makeSelectCollegeList', () => {
    const value = true;
    const selector = makeSelectCollegeList();
    expect(selector(mockedState)).to.deep.equal(value);
  });
});
