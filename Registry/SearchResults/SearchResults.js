import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import {
  channelTypeSelector,
  selectMPulsePageConfig,
  selectIsMPulseEnabled,
  makeSelectSwitchConfig,
  makeSelectLabels,
} from '@bbb-app/selectors/configSelector';
import toJS from '@bbb-app/hoc/toJS';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import {
  registrySearchResultsLabelsSelector,
  registrySearchResultsSelector,
  filtersDataSelector,
  registrySearchResultsConfigSelector,
  makeSelectReferredContent,
  makeSelectSocialAnxWriteReview,
} from '@bbb-app/registry-search/containers/selectors';
import {
  updateSearchTerm,
  setSearchMode,
  submitSearchForm,
  fetchNextPage,
  setRegistryResults,
  updateSearchFilter,
  updateSelectedFilters,
  setAppliedFilters,
  clearSelectedFilters,
  initializeRegistrySearchResults,
  resetInitialResultsFlag,
  resetSearchResultsForm,
  setComponentMounted,
  resetFormInput,
} from '@bbb-app/registry-search/containers/actions';
import reducer from '@bbb-app/registry-search/containers/reducer';
import saga from '@bbb-app/registry-search/containers/sagas';
import { REGISTRY_SEARCH_STATE_KEY } from '@bbb-app/constants/state-keys/registryStateKeys';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import RegistrySearchResultsComponent from '../../../../components/Pages/Registry/SearchResults/RegistrySearchResults';

export const mapStateToProps = () =>
  createStructuredSelector({
    labels: registrySearchResultsLabelsSelector,
    registryLabels: makeSelectLabels(['Registry']),
    staticPagesLabels: makeSelectLabels(['StaticPages']),
    registrySearchResults: registrySearchResultsSelector,
    filtersData: filtersDataSelector,
    channelType: channelTypeSelector,
    filterLabels: makeSelectLabels(['productListingPage']),
    config: registrySearchResultsConfigSelector,
    mPulseSiteConfig: selectMPulsePageConfig,
    isMPulseEnabled: selectIsMPulseEnabled,
    switchConfig: makeSelectSwitchConfig(['RegistrySearchResults']),
    referredContent: makeSelectReferredContent(),
    makeReviewYourProductsConfig: makeSelectSocialAnxWriteReview(),
    isMobile: state => state.getIn(['mobileScreen', 'isMobileScreen']),
    enableCSLabels: makeSelectSwitchConfig(['Global', 'enableCSLabels'], false),
  });

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setRegistryResults,
      initializeRegistrySearchResults,
      onChange: updateSearchTerm,
      onChangeMode: setSearchMode,
      onSubmit: submitSearchForm,
      onNextPage: fetchNextPage,
      onFilterUpdate: updateSearchFilter,
      onUpdateSelectedFilters: updateSelectedFilters,
      onAppliedFilters: setAppliedFilters,
      onClearSelectedFilters: clearSelectedFilters,
      resetInitialResultsFlag,
      resetSearchResultsForm,
      setComponentMounted,
      fetchReferredContent,
      resetFormInput,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps(), mapDispatchToProps);
const withReducer = injectReducer({ key: REGISTRY_SEARCH_STATE_KEY, reducer });
const withSaga = injectSaga({ key: REGISTRY_SEARCH_STATE_KEY, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(toJS(RegistrySearchResultsComponent));
