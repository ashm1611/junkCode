import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { registryLabelsSelector } from '@bbb-app/get-registry-details/containers/selectors';
import { makeSelectIsLoggedIn } from '@bbb-app/selectors/accountSelectors';
import toJS from '@bbb-app/hoc/toJS';
import {
  selectDeviceConfig,
  makeSelectGlobalSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { PAGE_NAME_REGISTRY_OWNER_HOME } from '@bbb-app/constants/route/route';
import { makeSelectRecognisedLoggingIn } from '@bbb-app/account-signin/containers/commonSelectors';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';

import { fetchMyRegistriesInfo } from './actions';

import {
  makeSelectIsFetching,
  makeSelectLabels,
  makeSelectRegistriesInfo,
  makeSelectError,
  makeSelectRegIncentivesSwitchConfig,
} from './selectors';
import {
  REGISTRY_REFERRED_CONTENT_KEY,
  MY_REGISTRIES_INFO_STATE_KEY,
  REGISTRY_INCENTIVE_QUERY_PARAM,
} from './constants';
import saga from './sagas';
import reducer from './reducer';
import { makeRouteData } from '../../../AddToIdeaboard/selectors';
import RegistryIncentiveComponent from '../../../../components/Pages/Registry/RegistryIncentive/RegistryIncentiveComponent';

const propTypes = {
  getContent: PropTypes.func,
  onComponentMount: PropTypes.func,
  enableCSLabels: PropTypes.bool,
};

const defaultProps = {
  isFetching: false,
  incentiveInfo: [],
};

export class RegistryIncentive extends React.PureComponent {
  constructor(props) {
    super(props);
    this.enableRegistryIncentives = pathOr(
      false,
      'registryIncentivesSwitchConfig.enableRegistryIncentives',
      this.props
    );
  }
  componentDidMount() {
    const { enableCSLabels } = this.props;
    const referredContent = pathOr(
      '',
      enableCSLabels ? 'labelsRef.referredContent' : 'labels.referredContent',
      this.props
    );
    const REGISTRY_INCENTIVE_EVENTYPE_LBL = 'BRD';
    const regType = pathOr(false, 'regType', this.props);
    const search = pathOr('', 'location.search', this.props);
    const contentId = [];
    const query = search && search.includes(REGISTRY_INCENTIVE_QUERY_PARAM);
    const pageName = pathOr('', 'pageName', this.props);
    const registryId = pageName ? pathOr('', 'regId', this.props) : '';

    if (this.enableRegistryIncentives) {
      if (!regType || REGISTRY_INCENTIVE_EVENTYPE_LBL.includes(regType)) {
        if (
          !query ||
          (!pathOr([], 'incentiveInfo', this.props).length && isUserLoggedIn())
        ) {
          this.props.onComponentMount(registryId);
        }
      }

      if (referredContent) {
        referredContent.forEach(obj => {
          if (obj.key === REGISTRY_REFERRED_CONTENT_KEY) {
            contentId.push(obj.id);
            this.props.getContent(contentId);
          }
        });
      }
    }
  }

  render() {
    const regType = pathOr(false, 'regType', this.props);
    const REGISTRY_INCENTIVE_EVENTYPE_LBL = 'BRD';
    const pageName = pathOr('', 'pageName', this.props);

    if (
      this.enableRegistryIncentives &&
      !(
        !REGISTRY_INCENTIVE_EVENTYPE_LBL.includes(regType) &&
        pageName === PAGE_NAME_REGISTRY_OWNER_HOME
      )
    ) {
      return (
        <RegistryIncentiveComponent
          className="myRegistries"
          mainContentProps={this.props}
          {...this.props}
        />
      );
    }
    return null;
  }
}

RegistryIncentive.propTypes = propTypes;
RegistryIncentive.defaultProps = defaultProps;

export const mapStateToProps = createStructuredSelector({
  deviceConfig: selectDeviceConfig,
  isFetching: makeSelectIsFetching(),
  bannerData: makeSelectContent(),
  labels: makeSelectLabels(),
  labelsRef: registryLabelsSelector,
  incentiveInfo: makeSelectRegistriesInfo(),
  isLoggedIn: makeSelectIsLoggedIn(),
  isRecognizedUser: makeSelectRecognisedLoggingIn(),
  routeData: makeRouteData(),
  error: makeSelectError(),
  registryIncentivesSwitchConfig: makeSelectRegIncentivesSwitchConfig(),
  enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
});

export const mapDispatchToProps = dispatch => ({
  onComponentMount(registryId) {
    dispatch(fetchMyRegistriesInfo(registryId));
  },
  getContent(contentIdCollection) {
    dispatch(fetchReferredContent(contentIdCollection));
  },
  redirectTo: path => {
    dispatch(push(path));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: MY_REGISTRIES_INFO_STATE_KEY, saga });
const withReducer = injectReducer({
  key: `${MY_REGISTRIES_INFO_STATE_KEY}`,
  reducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect
)(toJS(RegistryIncentive));
