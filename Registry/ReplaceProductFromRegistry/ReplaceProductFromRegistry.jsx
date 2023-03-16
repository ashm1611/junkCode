import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import ReplaceProductFromRegistryComponent from '../../../../components/Pages/Registry/ReplaceProductFromRegistry/ReplaceProductFromRegistry';
import { getRemainingItemFetchingStatus } from '../RegistryOwner/RegistryOwnerItemsSelectors';
import { closeModalState } from './selectors';
import { replaceProductFromRegistry as replaceProductFromRegistryAction } from './actions';
import reducer from './reducer';
import saga from './sagas';
import { REPLACE_PRODUCT_FROM_REGISTRY_KEY } from './constants';
import { fetchQuickViewProductDetails } from '../../../QuickViewModal/ActionWithSagaInjection';

export const ReplaceProductFromRegistryContainer = props => {
  return (
    <ErrorBoundary>
      <ReplaceProductFromRegistryComponent
        {...props}
        // eslint-disable-next-line react/prop-types
        onQuickViewButtonClick={props.onQuickViewButtonClick}
      />
    </ErrorBoundary>
  );
};
export const mapStateToProps = createStructuredSelector({
  closeModalState: closeModalState(),
  isRemainingItemFetching: getRemainingItemFetchingStatus(),
});

export const mapDispatchToProps = dispatch => ({
  replaceProductFromRegistry(payload) {
    dispatch(replaceProductFromRegistryAction(payload));
  },
  onQuickViewButtonClick( //eslint-disable-line
    productId,
    productVariation,
    productUrl,
    registryProductInfo,
    swatchDetails,
    itemIndex,
    isCompare,
    nearestStoreAvailabilty,
    miniQuickViewMode,
    clickFromPLPTile,
    sponsored
  ) {
    dispatch(
      fetchQuickViewProductDetails(
        productId,
        productVariation,
        productUrl,
        registryProductInfo,
        swatchDetails,
        itemIndex,
        isCompare,
        nearestStoreAvailabilty,
        miniQuickViewMode,
        clickFromPLPTile,
        sponsored
      )
    );
  },
});

const withReducer = injectReducer({
  key: REPLACE_PRODUCT_FROM_REGISTRY_KEY,
  reducer,
});
const withSaga = injectSaga({ key: REPLACE_PRODUCT_FROM_REGISTRY_KEY, saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withSiteSpectTracker
)(toJS(ReplaceProductFromRegistryContainer));
