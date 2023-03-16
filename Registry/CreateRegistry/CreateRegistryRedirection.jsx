import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { Redirect, Route } from 'react-router';
import { RegistryOwnerHomePath } from '../RegistryOwner/constants';

const propTypes = {
  isRegistryID: PropTypes.any,
  globalSwitchConfig: PropTypes.object,
  location: PropTypes.object,
  enableNewSignUp: PropTypes.bool,
};

const CreateRegistryRedirection = props => {
  const { isRegistryID, globalSwitchConfig, location, enableNewSignUp } = props;
  const redirect = pathOr('', 'state.from.params.redirect', location);
  const hoorayModalconfig = pathOr(false, 'hoorayModal', globalSwitchConfig);
  const hoorayModal = '?hoorayModal=true';
  const redirectLoc = enableNewSignUp && redirect;
  if (redirectLoc && redirectLoc.indexOf('addToRegistry=true') > -1) {
    return (
      <Route
        component={() => {
          window.location.href = redirectLoc;
          return null;
        }}
      />
    );
  }
  if (hoorayModalconfig) {
    return (
      <Redirect
        to={
          redirectLoc || `${RegistryOwnerHomePath}${isRegistryID}${hoorayModal}`
        }
      />
    );
  }
  return <Redirect to={`${RegistryOwnerHomePath}${isRegistryID}`} />;
};

CreateRegistryRedirection.propTypes = propTypes;

export default CreateRegistryRedirection;
