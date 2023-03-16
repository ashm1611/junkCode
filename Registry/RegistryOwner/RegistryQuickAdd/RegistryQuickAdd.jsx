import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import toJS from '@bbb-app/hoc/toJS';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { makeSelectPageConfig } from '@bbb-app/selectors/configSelector';
import RegistryQuickAddComponent from '../../../../../components/Pages/Registry/RegistryOwner/RegistryQuickAddComponent/RegistryQuickAddComponent';
import { fetchRegistryQuickAddItems } from './actions';
import {
  makeSelectIsFetching,
  makeSelectQuickAddItems,
  selectQuickAddItemsForRegType,
  makeSelectQuickAddProducts,
  makeSelectQuickAddATRState,
} from './selectors';
import { getContextPath } from '../../../../../containers/Search/selectors';
import saga from './sagas';
import reducer from './reducer';
import {
  REGISTRY_QUICK_ADD,
  REGISTRY_OWNER_STATE_KEY,
  QUICK_ADD_TILE_COUNT,
  QUICK_ADD_TILE_COUNT_VARIATION_B,
} from './constants';
import {
  REGISTRY_OWNER_ITEMS_STATE_KEY,
  REGISTRY_DETAILS_STATE_KEY,
} from '../constants';
import registryOwnerReducer from '../RegistryOwnerReducer';
import registryOwnerSaga from '../sagas';
export class RegistryQuickAdd extends React.PureComponent {
  static propTypes = {
    quickAddItems: PropTypes.object,
    maxTileCount: PropTypes.number,
    maxTileCountVariationB: PropTypes.number,
    isFetching: PropTypes.bool,
    fetchQuickAddItems: PropTypes.func,
    quickAddId: PropTypes.string,
    contextPath: PropTypes.string,
    regType: PropTypes.string,
    quickAddItemsForRegType: PropTypes.string,
    isMobile: PropTypes.bool,
    enableQuickAdd: PropTypes.bool,
    quickAddProductsData: PropTypes.any,
  };
  static defaultProps = {
    maxTileCount: 4,
    maxTileCountVariationB: 12,
  };
  constructor(props) {
    super(props);
    this.state = {
      userClosed: false,
    };
    this.requiredOpacity = false;
  }
  componentDidMount() {
    const {
      quickAddItems,
      fetchQuickAddItems,
      quickAddId,
      regType,
      quickAddItemsForRegType,
    } = this.props;
    if (regType !== quickAddItemsForRegType || !quickAddItems) {
      fetchQuickAddItems(quickAddId, regType);
    }
  }
  render() {
    const {
      quickAddItems,
      contextPath,
      isFetching,
      maxTileCount,
      maxTileCountVariationB,
      quickAddProductsData,
    } = this.props;
    return (
      <ErrorBoundary>
        <RegistryQuickAddComponent
          quickAddItems={quickAddItems}
          maxTileCount={maxTileCount}
          maxTileCountVariationB={maxTileCountVariationB}
          contextPath={contextPath}
          isFetching={isFetching}
          isMobile={this.props.isMobile}
          enableQuickAdd={this.props.enableQuickAdd}
          quickAddProductsData={quickAddProductsData}
          {...this.props}
        />
      </ErrorBoundary>
    );
  }
}
export const mapStateToProps = createStructuredSelector({
  isFetching: makeSelectIsFetching(),
  quickAddItems: makeSelectQuickAddItems(),
  quickAddProductsData: makeSelectQuickAddProducts(),
  contextPath: getContextPath,
  maxTileCount: makeSelectPageConfig([
    REGISTRY_OWNER_STATE_KEY,
    QUICK_ADD_TILE_COUNT,
  ]),
  quickAddItemsForRegType: selectQuickAddItemsForRegType(),
  maxTileCountVariationB: makeSelectPageConfig([
    REGISTRY_OWNER_STATE_KEY,
    QUICK_ADD_TILE_COUNT_VARIATION_B,
  ]),
  quickAddATRState: makeSelectQuickAddATRState(),
});
export const mapDispatchToProps = dispatch => ({
  fetchQuickAddItems(quickAddId, regType) {
    dispatch(fetchRegistryQuickAddItems(quickAddId, regType));
  },
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({
  key: REGISTRY_QUICK_ADD,
  saga,
});
const withReducer = injectReducer({
  key: REGISTRY_QUICK_ADD,
  reducer,
});
const withRegistryOwnerSaga = injectSaga({
  key: REGISTRY_DETAILS_STATE_KEY,
  saga: registryOwnerSaga,
});
const withRegistryOwnerReducer = injectReducer({
  key: REGISTRY_OWNER_ITEMS_STATE_KEY,
  reducer: registryOwnerReducer,
});
export default compose(
  withReducer,
  withSaga,
  withRegistryOwnerSaga,
  withRegistryOwnerReducer,
  withConnect
)(toJS(RegistryQuickAdd));
