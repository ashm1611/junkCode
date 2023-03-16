import { connect } from 'react-redux';
import {
  push as changeQuickPicksCollection,
  push as leavePage,
} from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import {
  channelTypeSelector,
  makeSelectEndPoints,
  makeSelectLabels,
  makeSelectGlobalSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import toJS from '@bbb-app/hoc/toJS';
import { fetchReferredContent as loadContent } from '@bbb-app/referred-content/actions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { makeSelectIsPickupInStoreOpen } from '@bbb-app/pick-up-in-store/containers/pick-up-in-store-modal/PickUpInStoreModalSelectors';
import {
  setQuickPicksCollection,
  addItemToActiveRegistry,
  addSelectedItemsToRegistry,
  selectProducts,
  updateProductQty,
  fetchQuickPicksCollection,
  resetQuickPicksCollection,
} from './actions';
import { setProductGridRenderFlag } from '../../../../Search/actions';
import {
  isLoading,
  isLoggedInSelector,
  registryQuickPicksCollectionConfigSelector,
  contentSelector,
  getContextPath,
  dynamicPricingSelector,
  customerRegistryInfoSelector,
  siteIdSelector,
  registryQuickPicksCollectionSelector,
} from './selectors';
import { makeSelectRegistryFooterRendered } from '../../../../FixedElementComponent/selectors';
import QuickPicksCollection from '../../../../../components/Pages/Registry/QuickPicks/Collection';
import { fetchQuickViewProductDetails } from '../../../../QuickViewModal/ActionWithSagaInjection';
import { renderItems } from '../../../../Search/selectors';
import saga from './sagas';
import reducer from './reducer';
import { REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY } from './constants';

export const mapStateToProps = () =>
  createStructuredSelector({
    quickPicksCollection: registryQuickPicksCollectionSelector,
    isLoggedIn: isLoggedInSelector,
    config: registryQuickPicksCollectionConfigSelector,
    content: contentSelector,
    contextPath: getContextPath(),
    channelType: channelTypeSelector,
    dynamicPricing: dynamicPricingSelector,
    writeReview: makeSelectEndPoints('writeReview'),
    reviews: makeSelectEndPoints('reviews'),
    customerRegistryInfo: customerRegistryInfoSelector,
    isLoading,
    isPickupInStoreModalOpen: makeSelectIsPickupInStoreOpen(),
    isRegistryFooterOpen: makeSelectRegistryFooterRendered(),
    siteId: siteIdSelector,
    renderItem: renderItems,
    labelsRef: makeSelectLabels(['Registry']),
    enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
  });

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchQuickPicksCollection,
      setQuickPicksCollection,
      changeQuickPicksCollection,
      loadContent,
      addItemToActiveRegistry,
      addSelectedItemsToRegistry,
      selectProducts,
      leavePage,
      updateProductQty,
      onQuickViewButtonClick: fetchQuickViewProductDetails,
      setProductGridRender: setProductGridRenderFlag,
      resetQuickPicksCollection,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps(), mapDispatchToProps);
const withSaga = injectSaga({
  key: REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY,
  saga,
});
const withReducer = injectReducer({
  key: REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY,
  reducer,
});
export default compose(
  withReducer,
  withSaga,
  withConnect
)(toJS(QuickPicksCollection));
