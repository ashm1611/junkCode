import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import { Redirect } from 'react-router-dom';
import {
  makeSelectEndPoints,
  makeSelectLabels,
  makeSelectPageConfig,
} from '@bbb-app/selectors/configSelector';
import { makeSelectIsLoggedIn } from '@bbb-app/selectors/accountSelectors';
import { selectRouterLocation } from '@bbb-app/selectors/appSelectors';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import GridContainer from '@bbb-app/core-ui/grid-container';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import toJS from '@bbb-app/hoc/toJS';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { selectRegistryDetails } from '@bbb-app/selectors/registrySelectors';
import { makeSelectRegistryListIsFetching } from '@bbb-app/get-registry-details/containers/GetRegistriesDetailsSelector';
import { setRegistryLandingSignIn } from '@bbb-app/account-signin/containers/actions';
import { makeSelectIsRegistryLandingSignIn } from '@bbb-app/account-signin/containers/commonSelectors';
import AccountSignInButton from '../../../../components/AccountSignInButton';
import RegistrySignInSkeleton from './RegistrySignInSkeleton';
import { SIGNIN_LBL } from '../../../../components/Pages/Registry/constants';

const ALREADY_LOGGED_IN_LBL = 'Already have a registry?';
export class RegistrySignInButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirectToOtherPage: false,
      redirectToURL: '',
    };
    this.renderLoggedIn = this.renderLoggedIn.bind(this);
    this.runRegistryRedirection = this.runRegistryRedirection.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { allRegistries } = nextProps;
    if (
      this.props.isRegistryLandingSignIn &&
      !isEmpty(allRegistries.activeRegistry)
    ) {
      this.runRegistryRedirection(nextProps, true);
    }
  }
  accountSignInClick() {
    this.props.setRegistryLandingSignIn(true);
  }

  runRegistryRedirection(propsData, isRedirectAfterLogin = false) {
    const { endPoints } = this.props;
    let NavigationTo;
    let pageNavigation = true;
    const activeRegistryId = pathOr(
      null,
      'activeRegistry.registryId',
      propsData.allRegistries
    );
    const soonestRegistryId = pathOr(
      null,
      'soonestRegistry.registryId',
      propsData.allRegistries
    );
    const isListActive = pathOr(false, 'listActive', propsData.allRegistries);
    const registryOwnerEndpoint = pathOr(null, 'registryOwner', endPoints);
    const myRegistriesPageEndpoint = pathOr(null, 'myregistries', endPoints);
    if (isListActive && soonestRegistryId !== null) {
      NavigationTo = registryOwnerEndpoint
        ? registryOwnerEndpoint.replace(':id?', soonestRegistryId)
        : '';
    } else if (isListActive || activeRegistryId === null) {
      NavigationTo = `${myRegistriesPageEndpoint}?scrollToRegistry=true`;
      if (isRedirectAfterLogin) {
        pageNavigation = false;
      }
    } else {
      NavigationTo = registryOwnerEndpoint
        ? registryOwnerEndpoint.replace(':id?', activeRegistryId)
        : '';
    }
    this.props.setRegistryLandingSignIn(false);

    if (pageNavigation) {
      this.setState({
        redirectToOtherPage: true,
        redirectToURL: NavigationTo,
      });
    }
  }

  renderLoggedIn() {
    return (
      <React.Fragment>
        <PrimaryLink
          href={'#'}
          variation={'primary'}
          type={'bold'}
          className={'right'}
          onClick={() => {
            this.runRegistryRedirection(this.props);
          }}
        >
          {LabelsUtil.getLabel(this.props.labels, 'registryLoggedIn')}
        </PrimaryLink>
      </React.Fragment>
    );
  }
  render() {
    const location = pathOr({}, 'location', this.props.router);
    if (this.state.redirectToOtherPage) {
      return <Redirect to={this.state.redirectToURL} />;
    }
    if (this.props.registryListIsFetching) return <RegistrySignInSkeleton />;
    return (
      <ErrorBoundary>
        <GridContainer>
          <GridX>
            <Cell className={'mt15'}>
              <AccountSignInButton
                renderBefore={ALREADY_LOGGED_IN_LBL}
                location={location}
                renderLoggedIn={this.renderLoggedIn}
                isLoggedIn={this.props.isLoggedIn}
                className={'right'}
                onClick={() => {
                  this.accountSignInClick();
                }}
              >
                {SIGNIN_LBL}
              </AccountSignInButton>
            </Cell>
          </GridX>
        </GridContainer>
      </ErrorBoundary>
    );
  }
}
RegistrySignInButton.propTypes = {
  isLoggedIn: PropTypes.any,
  labels: PropTypes.object,
  router: PropTypes.object,
  endPoints: PropTypes.object,
  setRegistryLandingSignIn: PropTypes.func,
  isRegistryLandingSignIn: PropTypes.bool,
  registryListIsFetching: PropTypes.bool,
  allRegistries: PropTypes.object,
};
export const mapDispatchToProps = dispatch => ({
  setRegistryLandingSignIn(isRegistryLandingSignIn) {
    dispatch(setRegistryLandingSignIn(isRegistryLandingSignIn));
  },
});
export const mapStateToProps = () =>
  createStructuredSelector({
    isLoggedIn: makeSelectIsLoggedIn(),
    labels: makeSelectLabels('Global'),
    router: selectRouterLocation(),
    registryPageConfig: makeSelectPageConfig('Registry'),
    allRegistries: selectRegistryDetails,
    endPoints: makeSelectEndPoints(),
    isRegistryLandingSignIn: makeSelectIsRegistryLandingSignIn(),
    registryListIsFetching: makeSelectRegistryListIsFetching(),
  });
export default connect(
  mapStateToProps(),
  mapDispatchToProps
)(toJS(RegistrySignInButton));
