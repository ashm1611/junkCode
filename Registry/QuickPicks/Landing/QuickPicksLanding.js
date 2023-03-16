import { connect } from 'react-redux';
import { compose } from 'recompose';
import { push as changeRegistryType } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import {
  channelTypeSelector,
  makeSelectLabels,
  makeSelectGlobalSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import toJS from '@bbb-app/hoc/toJS';
import { PRODUCT_POSITIONED_CLICKED_SAGA } from '@bbb-app/tealium/constants';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { fetchReferredContent as loadContent } from '@bbb-app/referred-content/actions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import {
  setQuickPicks,
  productPositionClicked,
  fetchQuickPicks,
} from './actions';
import {
  registryQuickPicksLandingLabelsSelector,
  isLoggedInSelector,
  contentSelector,
  siteIdSelector,
  registryQuickPicksSelector,
  registryQuickPicksLandingConfigSelector,
} from './selectors';
import QuickPicksLanding from '../../../../../components/Pages/Registry/QuickPicks/Landing/QuickPicksLanding.async';
import saga from '../../../../ThirdParty/Tealium/Events/productPositionClicked/productPositionClickedSaga';

import reducer from './reducer';
import quickPickSaga from './sagas';
import { REGISTRY_QUICK_PICKS_LANDING_STATE_KEY } from './constants';

export const mapStateToProps = () =>
  createStructuredSelector({
    quickPicks: registryQuickPicksSelector,
    labels: registryQuickPicksLandingLabelsSelector,
    isLoggedIn: isLoggedInSelector,
    config: registryQuickPicksLandingConfigSelector,
    content: contentSelector,
    channelType: channelTypeSelector,
    siteId: siteIdSelector,
    labelsRef: makeSelectLabels(['Registry']),
    enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
  });

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setQuickPicks,
      productPositionClicked,
      changeRegistryType,
      loadContent,
      triggerTealiumEvent,
      fetchQuickPicks,
    },
    dispatch
  );

const withconnect = connect(mapStateToProps(), mapDispatchToProps);
const withSaga = injectSaga({ key: PRODUCT_POSITIONED_CLICKED_SAGA, saga });
const withQuickPickSaga = injectSaga({
  key: REGISTRY_QUICK_PICKS_LANDING_STATE_KEY,
  saga: quickPickSaga,
});
const withReducer = injectReducer({
  key: REGISTRY_QUICK_PICKS_LANDING_STATE_KEY,
  reducer,
});
export default compose(
  withReducer,
  withconnect,
  withSaga,
  withQuickPickSaga
)(toJS(QuickPicksLanding));
