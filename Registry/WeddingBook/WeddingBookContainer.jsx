import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import { resetFormDataFields } from '@bbb-app/forms/containers/FormWrapper/actions';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import WeddingBook from '../../../../components/Pages/Registry/WeddingBook/WeddingBook';
import {
  makeWeddingBookError,
  makeWeddingBookSuccess,
  isMobileStatus,
} from './selectors';
import { submitWeddingBook } from './actions';

import reducer from './reducer';
import saga from './sagas';
import { WEDDING_BOOK_STATE_KEY } from './constants';

export const mapStateToProps = createStructuredSelector({
  formWrapperData: formWrapperSelector('weddingBook'),
  error: makeWeddingBookError(),
  result: makeWeddingBookSuccess(),
  isMobile: isMobileStatus(),
});

export const mapDispatchToProps = dispatch => ({
  submitWeddingBook: formdata => {
    dispatch(submitWeddingBook(formdata));
  },
  resetFormDataFields: () => {
    dispatch(resetFormDataFields('weddingBook'));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: WEDDING_BOOK_STATE_KEY,
  reducer,
});
const withSaga = injectSaga({ key: WEDDING_BOOK_STATE_KEY, saga });

export default withRouter(
  compose(withReducer, withSaga, withConnect)(toJS(WeddingBook))
);
