import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { makeSelectCollegeList } from './selectors';
import { fetchCollegeList } from './actions';
import { SELECT_COLLEGE_STATE_KEY } from './constants';
import sagas from './sagas';
import { selectCollegeReducer } from './reducer';
import CollegeInputFieldComponent from '../../../../components/Pages/Registry/CollegeInputField/CollegeInputFieldComponent';

export const mapStateToProps = createStructuredSelector({
  collegeList: makeSelectCollegeList(),
});
export const mapDispatchToProps = dispatch => ({
  fetchCollegeList: payload => {
    dispatch(fetchCollegeList(payload));
  },
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: SELECT_COLLEGE_STATE_KEY,
  reducer: selectCollegeReducer,
});

const withSaga = injectSaga({
  key: SELECT_COLLEGE_STATE_KEY,
  saga: sagas,
});

export default compose(
  withConnect,
  withReducer,
  withSaga
)(toJS(CollegeInputFieldComponent));
