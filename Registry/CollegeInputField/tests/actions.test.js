import {
  FETCH_COLLEGE_LIST,
  FETCH_COLLEGE_LIST_SUCCESS,
  FETCH_COLLEGE_LIST_ERROR,
} from '../constants';
import {
  fetchCollegeList,
  fetchCollegeListSuccess,
  fetchCollegeListError,
} from '../actions';

describe('Actions for fetch college list', () => {
  describe('contributeCashFund', () => {
    it('should return the proper object', () => {
      const output = fetchCollegeList();
      expect(output.type).to.equal(FETCH_COLLEGE_LIST);
    });
  });
  describe('fetchCollegeListSuccess', () => {
    it('should return the proper object', () => {
      const output = fetchCollegeListSuccess();
      expect(output.type).to.equal(FETCH_COLLEGE_LIST_SUCCESS);
    });
  });
  describe('fetchCollegeListError', () => {
    it('should return the proper object', () => {
      const output = fetchCollegeListError();
      expect(output.type).to.equal(FETCH_COLLEGE_LIST_ERROR);
    });
  });
});
