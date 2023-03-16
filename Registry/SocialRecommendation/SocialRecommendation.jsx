import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pathOr from 'lodash/fp/pathOr';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import {
  makeSelectSwitchConfig,
  selectDeviceConfig,
  makeSelectGlobalSwitchConfig,
  makeSelectLabels,
} from '@bbb-app/selectors/configSelector';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import { getRegistryData } from '../RegistryOwner/commonSelectors';
import SocialRecommendationContent from '../SocialRecommendationContent';
import { makeSelectRegistryId } from '../ThankYouManager/selectors';

import registryOwnerSaga from '../RegistryOwner/sagas';
import registryOwnerCategoryReducer from '../RegistryOwner/RegistryOwnerReducer';
import {
  REGISTRY_DETAILS_STATE_KEY,
  REGISTRY_OWNER_ITEMS_STATE_KEY,
} from '../RegistryOwner/constants';

/**
 * SocialRecommendation Component This is only Placeholder for future development.
 */
export class SocialRecommendation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const enableMPulse = pathOr(
      false,
      'registrySwitchConfig.enableMPulse',
      this.props
    );
    const globalMPulseEnable = pathOr(
      false,
      'globalSwitchConfig.globalMPulseEnable',
      this.props
    );

    return (
      <React.Fragment>
        <ErrorBoundary>
          <SocialRecommendationContent
            {...this.props}
            mPulseEnabled={enableMPulse && globalMPulseEnable}
            isRegistryPublic={pathOr(
              null,
              'registryData.registryResVO.registrySummaryVO.isPublic',
              this.props
            )}
          />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  deviceConfig: selectDeviceConfig,
  contentState: makeSelectContent(),
  switchConfig: makeSelectSwitchConfig('RegistryOwner'),
  labels: makeSelectLabels(['Registry']),
  registryData: getRegistryData(),
  registryId: makeSelectRegistryId(),
  globalSwitchConfig: makeSelectGlobalSwitchConfig(),
  registrySwitchConfig: makeSelectSwitchConfig(['RegistryOwner']),
});

const withConnect = connect(mapStateToProps);

const withRegistryOwnerSaga = injectSaga({
  key: REGISTRY_DETAILS_STATE_KEY,
  saga: registryOwnerSaga,
});

const withRegistryOwnerCategoryReducer = injectReducer({
  key: REGISTRY_OWNER_ITEMS_STATE_KEY,
  reducer: registryOwnerCategoryReducer,
});

export default compose(
  withRegistryOwnerSaga,
  withRegistryOwnerCategoryReducer,
  withConnect
)(toJS(SocialRecommendation));
