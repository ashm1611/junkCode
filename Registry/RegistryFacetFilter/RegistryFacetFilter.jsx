import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import {
  channelTypeSelector,
  makeSelectSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import isBrowser from '@bbb-app/utils/isBrowser';
import withRouteMatch from '@bbb-app/hoc/withRouteMatch';
import injectReducer from '@bbb-app/hoc/injectReducer';
import {
  selectRegsitryFacetFilter,
  makeSelectFirstCategoryDateSortedList,
  makeSelectOosCategoryDateSortedList,
} from './selectors';
import {
  updateSelectedFilters,
  clearAndUpdateSelectedFilters,
  resetAllFilters,
  resetFiltersAndSort,
} from './actions';
import { reducer } from './reducer';
import { REGISTRY_FACET_FILTER } from './constant';
import RegistryFacetFilterComponent from '../../../../components/Pages/Registry/RegistryFacetFilter/RegistryFacetFilter.async';

export const RegistryFacetFilter = props => {
  const { onResetFiltersAndSort } = props;
  /* istanbul ignore next */
  useEffect(() => {
    return () => {
      if (isBrowser()) {
        onResetFiltersAndSort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegistryFacetFilterComponent
      {...props}
      updateSelectedFilters={props.onUpdateSelectedFilters}
    />
  );
};

RegistryFacetFilter.propTypes = {
  onUpdateSelectedFilters: PropTypes.func,
  onResetFiltersAndSort: PropTypes.func,
};
export const mapDispatchToProps = dispatch => ({
  onUpdateSelectedFilters: values => dispatch(updateSelectedFilters(values)),
  onClearSelectedFilters: values =>
    dispatch(clearAndUpdateSelectedFilters(values)),
  onResetAllFilters: () => dispatch(resetAllFilters()),
  onResetFiltersAndSort: () => dispatch(resetFiltersAndSort()),
});

export const mapStateToProps = createStructuredSelector({
  channelType: channelTypeSelector,
  selectedFilters: selectRegsitryFacetFilter(),
  dateSortedFirstCategoryList: makeSelectFirstCategoryDateSortedList(),
  dateSortedStoreOosFirstCategoryList: makeSelectOosCategoryDateSortedList(),
  enableCSLabels: makeSelectSwitchConfig(['Global', 'enableCSLabels'], false),
});
const withFacetRegistryFilterReducer = injectReducer({
  key: REGISTRY_FACET_FILTER,
  reducer,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
  withFacetRegistryFilterReducer
)(withRouteMatch(toJS(RegistryFacetFilter)));
