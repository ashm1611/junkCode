import React from 'react';

import PropTypes from 'prop-types';

import Cell from '@bbb-app/core-ui/cell';
import AccountSignIn from '@bbb-app/account-signin/containers/AccountSignIn.async';
import { ROUTE_REGISTRY_OWNER_TYM } from '@bbb-app/constants/route/route';

class TYMSignInForm extends React.PureComponent {
  componentDidUpdate(prevProps) {
    /*
      This is an auxiliary request to thankyoumanager API to retrieve updated userLoggedIn status
      post sign in using this form. If the status is true, thank you list will be rendered and the
      modal will be closed automatically. - OID: 100775

      Checks for the previous prop and only when it is not same as the current props, gets the updated
      status to prevent multiple calls to the API.
    */

    if (prevProps.userState !== this.props.userState) {
      this.updateLoginStatus();
    }
  }

  // Exposing as private function for sinon to spy during test
  updateLoginStatus = this.props.getLoginStatus;

  render() {
    const { errorMsg, accountSignInDetails, registryId } = this.props;
    const { email } = accountSignInDetails || '';

    const path = ROUTE_REGISTRY_OWNER_TYM.replace(':id?', registryId);

    return (
      <Cell className="sm-mb3">
        <AccountSignIn
          inPage={false}
          {...this.props}
          error={errorMsg}
          email={email}
          signInInitiator="tym"
          afterSignInUrl={path}
          fromTYMSignIn={this.props.fromTYMSignIn}
        />
      </Cell>
    );
  }
}

TYMSignInForm.propTypes = {
  getLoginStatus: PropTypes.func,
  errorMsg: PropTypes.object,
  accountSignInDetails: PropTypes.object,
  userState: PropTypes.string,
  registryId: PropTypes.string,
  fromTYMSignIn: PropTypes.bool,
};

export default TYMSignInForm;
