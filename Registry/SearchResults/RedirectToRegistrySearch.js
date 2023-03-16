import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import pathOr from 'lodash/fp/pathOr';
import { ROUTE_REGISTRY_SEARCH_PATH } from '@bbb-app/constants/route/registryRoute';

export const RedirectToRegistrySearch = props => {
  const currentPathObj = props.location;
  const hash = pathOr('', 'hash', currentPathObj);
  let searchVal;
  let searchMode;
  const suffix = '&reset=true';
  if (checkHash(hash, 'searchKeywordByName')) {
    searchVal = hash.split('=')[1];
    const find = '\\+';
    searchVal =
      searchVal.indexOf('+') > -1
        ? searchVal.replace(new RegExp(find, 'g'), '%20')
        : searchVal;
    searchMode = 'byName';
  } else if (checkHash(hash, 'searchKeywordById')) {
    searchVal = hash.split('=')[1];
    searchMode = 'byRegistryId';
  }
  const querystring = searchMode
    ? `q=${searchVal}&searchMode=${searchMode}${suffix}`
    : querystring;
  return (
    <Redirect
      to={{
        pathname: ROUTE_REGISTRY_SEARCH_PATH,
        search: querystring,
      }}
    />
  );
};

RedirectToRegistrySearch.propTypes = {
  location: PropTypes.object,
};

export function checkHash(hash, keyName) {
  return (
    hash &&
    hash.indexOf([keyName]) > -1 &&
    hash.split('=').length > 1 &&
    hash.split('=')[1]
  );
}

export default withRouter(RedirectToRegistrySearch);
