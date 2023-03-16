import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { getUserState } from '@bbb-app/utils/common';
import toJS from '@bbb-app/hoc/toJS';
import { makeSelectProfile } from '@bbb-app/selectors/accountSelectors';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import TYMSignInForm from '../../../../components/Pages/Registry/RegistryOwner/TYMSignInForm';

import { getSignInStatus, getErrorMessage } from './selectors';
import { signInUser } from './actions';
import { RECOGNIZED_USER_SIGNIN_KEY } from './constants';
import reducer from './reducer';
import saga from './sagas';

export class TYMSignIn extends React.PureComponent {
  static propTypes = {
    signInRecognizedUser: PropTypes.func,
    getLoginStatus: PropTypes.func,
    labels: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    errorMsg: PropTypes.object,
    accountSignInDetails: PropTypes.object,
    registryId: PropTypes.string,
    onDeviceVerificationModalOpen: PropTypes.func,
    onDeviceModalClose: PropTypes.func,
    fromTYMSignIn: PropTypes.bool,
  };

  static defaultProps = {
    labels: {},
  };

  render() {
    const {
      signInRecognizedUser,
      labels,
      getLoginStatus,
      isLoggedIn,
      errorMsg,
      registryId,
      onDeviceVerificationModalOpen,
      onDeviceModalClose,
      fromTYMSignIn,
      ...otherProps
    } = this.props;

    return (
      <ErrorBoundary>
        <TYMSignInForm
          signInRecognizedUser={signInRecognizedUser}
          labels={labels}
          getLoginStatus={getLoginStatus}
          isLoggedIn={isLoggedIn}
          errorMsg={errorMsg}
          accountSignInDetails={this.props.accountSignInDetails}
          userState={getUserState()}
          registryId={registryId}
          onDeviceVerificationModalOpen={onDeviceVerificationModalOpen}
          onDeviceModalClose={onDeviceModalClose}
          fromTYMSignIn={fromTYMSignIn}
          {...otherProps}
        />
      </ErrorBoundary>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  isLoggedIn: getSignInStatus(),
  errorMsg: getErrorMessage(),
  accountSignInDetails: makeSelectProfile(),
});

export const mapDispatchToProps = dispatch => ({
  signInRecognizedUser: args => {
    dispatch(signInUser(args));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: RECOGNIZED_USER_SIGNIN_KEY, reducer });
const withSaga = injectSaga({ key: RECOGNIZED_USER_SIGNIN_KEY, saga });

export default compose(withReducer, withSaga, withConnect)(toJS(TYMSignIn));
