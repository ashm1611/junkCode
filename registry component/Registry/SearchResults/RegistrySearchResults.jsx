import React, { PureComponent } from 'react';
import { object, func, string, shape, bool } from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import { scrollToFiltersTop } from '@bbb-app/utils/scrollToFiltersTop';
import { noop, isBrowser } from '@bbb-app/utils/common';
import { isPageSpecificRegeneration } from '@bbb-app/utils/mPulse';
import { SEARCH_MODE_BY_NAME } from '@bbb-app/constants/registryConstants';
import InternalServerErrorPage from '@bbb-app/error-pages/containers/http-error-pages/InternalServerErrorPage';
import SearchHeader, {
  isFacetSelected,
} from '@bbb-app/registry/components/search-results/search-header/SearchHeader';
import RegistryNotifyMsz from '@bbb-app/registry/components/search-results/registry-notifymsz/RegistryNotifyMsz';
import Filters from '@bbb-app/registry/components/search-results/registry-filters/RegistryFilters';
import RegistryResultsGrid from './RegistryResultsGrid';
import { RegionBoundary } from './RegistryContentSlots/RegistryContentSlots';
import SearchResultsTealiumHandler from '../../../../containers/ThirdParty/Tealium/Registry/SearchResultsTealiumHandler/SearchResultsTealiumHandler';
/**
 * The main component to render Registry Search Results Page.
 *
 * @author hreid
 *
 */
class RegistrySearchResults extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      holdScroll: false,
    };
    this.mPulseMarksPopulated = false;
  }
  componentWillMount = () => {
    /* Check if flag is set to 'browser' then only re initialize the marks */
    /* istanbul ignore else  */
    if (isBrowser() && isPageSpecificRegeneration()) {
      const mPulseEnabled = this.props.isMPulseEnabled;
      /* istanbul ignore else  */
      if (mPulseEnabled) {
        const PageSpecificMarks = pathOr(
          null,
          'mPulseSiteConfig.PageSpecificMarks',
          this.props
        );
        /* istanbul ignore else  */
        if (PageSpecificMarks) {
          window.instrumentation.setPageMarks({
            PageViewMarks: PageSpecificMarks,
          });
        }
        window.instrumentation.removeConditionalMarksFlag(
          'ux-destination-verified',
          'ux-action-before-load'
        );
      }
    }
  };
  componentDidMount = () => {
    const {
      location: { search },
      match: { params },
      registrySearchResults: { items },
    } = this.props;
    this.props.setComponentMounted(true);
    if (search) {
      this.props.initializeRegistrySearchResults(params, '', search);
    } else {
      this.props.resetSearchResultsForm();
    }
    if (items.length === 0) {
      setTimeoutCustom(() => window.scrollTo(0, 0), 1);
    }

    const contentId = [];
    const referredContent = pathOr(
      null,
      'referredContent',
      this.props.staticPagesLabels
    );
    if (referredContent) {
      referredContent.forEach(obj => {
        if (obj.key && obj.key.includes('findARegistry')) {
          contentId.push(obj.id);
        }
      });
    }
    if (contentId.length) {
      this.props.fetchReferredContent(contentId);
    }
  };
  componentWillReceiveProps = nextProps => {
    /* istanbul ignore else  */
    if (this.props.isMPulseEnabled) {
      /* Check if flag is set to 'browser' then only re initialize the marks */
      /* istanbul ignore else  */
      if (!this.mPulseMarksPopulated) {
        if (!this.props.location.search) {
          this.mPulseMarksPopulated = true;
        } else if (nextProps.registrySearchResults.fetchedInitialResults) {
          const itemCount = pathOr(
            0,
            'registrySearchResults.items.length',
            nextProps
          );
          /* istanbul ignore else  */
          if (itemCount > 0) {
            const preparedPageSpecificMarks = this.preparePageViewMarks(
              itemCount
            );
            window.instrumentation.setPageMarks({
              PageViewMarks: preparedPageSpecificMarks,
            });
          }
          this.mPulseMarksPopulated = true;
        }
      }
    }
  };

  shouldComponentUpdate(nextProps) {
    if (
      nextProps &&
      nextProps.registrySearchResults.items !==
        this.props.registrySearchResults.items
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate = prevProps => {
    const {
      showNoResults: prevShowNoResults,
      noResultsSearchTerm: prevNoResultsSearchTerm,
    } = prevProps.registrySearchResults;

    const { filtersData } = this.props;
    const {
      showNoResults,
      noResultsSearchTerm,
    } = this.props.registrySearchResults;
    const prevAppliedFiltersOrderedSetSize = pathOr(
      0,
      'appliedFiltersOrderedSet.size',
      prevProps.filtersData
    );
    const currentAppliedFiltersOrderedSetSize = pathOr(
      0,
      'appliedFiltersOrderedSet.size',
      filtersData
    );

    /* re initialize the registry search call as soon as user searches a new registry */
    if (prevProps.location.search !== this.props.location.search) {
      this.props.initializeRegistrySearchResults(
        this.props.match.params,
        '',
        this.props.location.search
      );
    }

    /* istanbul ignore else  */
    if (
      showNoResults !== prevShowNoResults &&
      noResultsSearchTerm !== prevNoResultsSearchTerm
    ) {
      /* istanbul ignore else */
      if (showNoResults && noResultsSearchTerm) {
        setTimeoutCustom(() => window.scrollTo(0, 0), 1);
      }
    }
    if (
      filtersData.scrollFiltersTop &&
      !this.state.holdScroll &&
      prevAppliedFiltersOrderedSetSize <= currentAppliedFiltersOrderedSetSize
    ) {
      // Do not scroll yet.
      this.setState(() => ({
        holdScroll: true,
      }));
    } else if (!filtersData.scrollFiltersTop && this.state.holdScroll) {
      // Great, we can now scrolll
      setTimeoutCustom(scrollToFiltersTop, 150); // Small buffer to allow DOM to settle.
      this.setState(() => ({
        holdScroll: false,
      }));
    }
  };
  componentWillUnmount() {
    this.props.resetInitialResultsFlag();
    this.props.setComponentMounted(false);
  }

  /**
   * Prepare marks for registry search results
   */
  preparePageViewMarks(length) {
    const PageSpecificMarks = {
      'ux-destination-verified': [],
      'ux-primary-content-displayed': ['ux-content-registry-search-results'],
      'ux-primary-action-available': [],
      'ux-secondary-content-displayed': [],
    };
    if (length > 1) {
      PageSpecificMarks['ux-secondary-content-displayed'].push(
        'ux-content-registry-search-filters',
        'ux-text-search-results-count'
      );
    }
    return PageSpecificMarks;
  }
  handleInViewPortChange = viewPort => {
    const { params, numFound, searchMode } = this.props.registrySearchResults;
    const { inView } = viewPort;
    if (
      inView &&
      parseInt(params.start, 10) + parseInt(params.perPage, 10) < numFound &&
      searchMode === SEARCH_MODE_BY_NAME
    ) {
      // Do not try again...
      this.props.onNextPage();
    }
  };
  injectInstrumentationScript() {
    const PageSpecificMarks = pathOr(
      null,
      'mPulseSiteConfig.PageSpecificMarks',
      this.props
    );
    const instrumentationScript = `window.instrumentation.setPageMarks({
      "PageViewMarks":${JSON.stringify(PageSpecificMarks)}});
      window.instrumentation.removeConditionalMarksFlag(
        'ux-destination-verified',
        'ux-action-before-load'
      );
  `;
    /* eslint-disable react/no-danger */
    return (
      <script dangerouslySetInnerHTML={{ __html: instrumentationScript }} />
    );
    /* eslint-enable */
  }

  checkGoogleDFP(regions) {
    if (!regions.third) {
      const third = {
        third: [
          {
            name: 'GoogleDFP',
            params: {
              type: '3Pack',
            },
            data: {
              type: '3Pack',
            },
          },
        ],
      };
      return { ...regions, ...third };
    }
    return regions;
  }

  renderBoundaries = (regions, labels) => {
    const renderedRegions = [];
    let rendered;
    /* istanbul ignore else */
    if (regions && regions.second && Object.keys(regions.second).length !== 0) {
      rendered = RegionBoundary({
        components: regions.second,
        id: 'region1',
        categoryId: 'CategoryModule',
        labels,
      });
      renderedRegions.push(rendered);
    }
    /* istanbul ignore else */
    if (regions && regions.third && Object.keys(regions.third).length !== 0) {
      rendered = RegionBoundary({
        components: regions.third,
        id: 'region2',
        categoryId: 'CategoryModule',
        labels,
      });
      renderedRegions.push(rendered);
    }
    return renderedRegions;
  };

  renderConditionalBlock = (
    props,
    showNoResults,
    noResultsSearchTerm,
    selectedFilters
  ) => {
    const div =
      showNoResults && noResultsSearchTerm ? (
        <RegistryNotifyMsz
          dataIdentifier={'noResultsNotifyMsz'}
          staticPagesLabels={props.staticPagesLabels}
          referredContent={props.referredContent}
          labels={props.labels}
          noResultsSearchTerm={noResultsSearchTerm}
        />
      ) : (
        <RegistryNotifyMsz
          dataIdentifier={'searchResultsNotifyMsz'}
          staticPagesLabels={props.staticPagesLabels}
          referredContent={props.referredContent}
          labels={props.labels}
          noResultsSearchTerm={noResultsSearchTerm}
        />
      );
    return !isFacetSelected(selectedFilters) ? (
      <ErrorBoundary> {div} </ErrorBoundary>
    ) : null;
  };

  render = () => {
    const {
      registrySearchResults: results,
      channelType,
      config,
      makeReviewYourProductsConfig,
      isMobile,
    } = this.props;
    const { items, regions, selectedFilters } = results;
    const newRegions = this.checkGoogleDFP(regions);
    const { socialAnnexPhotoRegistry, typeahead, typeaheadEnabled } = config;
    const { baseUri } = socialAnnexPhotoRegistry;
    const fallback = <InternalServerErrorPage />;

    return (
      <React.Fragment>
        {this.props.isMPulseEnabled && !isBrowser()
          ? this.injectInstrumentationScript()
          : null}
        <section>
          <ErrorBoundary fallback={fallback}>
            <SearchHeader
              {...results}
              onChange={this.props.onChange}
              labels={this.props.labels}
              onChangeMode={this.props.onChangeMode}
              onSubmit={this.props.onSubmit}
              channelType={this.props.channelType}
              typeaheadEnabled={typeaheadEnabled}
              disallowedSpecialCharacters={typeahead.getIn(
                ['typeahead.disallowedSpecialCharacters'],
                ''
              )}
              mPulseEnabled={this.props.isMPulseEnabled}
              resetFormInput={this.props.resetFormInput}
            />
          </ErrorBoundary>

          {results.searchMode === SEARCH_MODE_BY_NAME &&
            (items.length > 0 || isFacetSelected(selectedFilters)) && (
              <ErrorBoundary>
                <Filters
                  {...this.props.filtersData}
                  className="registryFilter"
                  updateSelectedFilters={this.props.onUpdateSelectedFilters}
                  fetchFacetResults={this.props.fetchFacetResults}
                  appliedFilters={this.props.onAppliedFilters}
                  clearSelectedFilters={this.props.onClearSelectedFilters}
                  labels={this.props.filterLabels}
                  isUpdatingFilters={results.isUpdatingFilters}
                  showFilters={results.isAdvancedSearch}
                  mPulseEnabled={this.props.isMPulseEnabled}
                  showNarrowSearchResults={false}
                  enableCSLabels={this.props.enableCSLabels}
                />
              </ErrorBoundary>
            )}
          {items.length === 0 &&
            this.renderConditionalBlock(
              this.props,
              results.showNoResults,
              results.noResultsSearchTerm,
              selectedFilters
            )}

          <ErrorBoundary>
            <RegistryResultsGrid
              items={items}
              isFetchingResults={results.isFetchingResults}
              labels={this.props.labels}
              onSubmit={this.props.onSubmit}
              onNextPage={this.handleInViewPortChange}
              photoEndpoint={baseUri}
              threshold={200}
              channelType={channelType}
              mPulseEnabled={this.props.isMPulseEnabled}
              makeReviewYourProductsConfig={makeReviewYourProductsConfig}
              isMobile={isMobile}
            />
          </ErrorBoundary>
          {this.renderBoundaries(newRegions, this.props.labels)}
          {results.fetchedInitialResults ? <SearchResultsTealiumHandler /> : ''}
        </section>
      </React.Fragment>
    );
  };
}
/**
 * @param {object} labels This component's labels
 * @param {object} filterLabels labels for the filters
 * @param {object} registrySearchResults Contains necessary data to render the entire Registry Search Results Page
 * @param {func} onChange Callback from when user enters text in to the search field.
 * @param {func} onChangeMode Callback for when a user switches search mode.
 * @param {func} onSubmit Callback for when form is submitted.
 * @param {func} onNextPage Callback for when next page is requested.
 * @param {object} location The location in history
 * @param {func} setRegistryResults Set the results when query is passed on mount
 * @param {object} filtersData Filter Data
 * @param {object} config Configuration data
 * @param {string} channelType desktop or mobile.
 * @param {bool} isMPulseEnabled globalMpulse Enable
 */
RegistrySearchResults.propTypes = {
  labels: object.isRequired,
  filterLabels: object.isRequired,
  registrySearchResults: object.isRequired,
  onChange: func.isRequired,
  onChangeMode: func.isRequired,
  onSubmit: func.isRequired,
  onNextPage: func.isRequired,
  resetSearchResultsForm: func.isRequired,
  filtersData: object,
  onUpdateSelectedFilters: func,
  fetchFacetResults: func,
  onAppliedFilters: func,
  onClearSelectedFilters: func,
  initializeRegistrySearchResults: func,
  setComponentMounted: func,
  channelType: string,
  config: object,
  isMPulseEnabled: bool,
  location: shape({
    search: string,
  }),
  match: shape({
    params: object,
  }),
  resetInitialResultsFlag: func,
  fetchReferredContent: func,
  staticPagesLabels: object.isRequired,
  makeReviewYourProductsConfig: object,
  resetFormInput: func,
  isMobile: bool,
  enableCSLabels: bool,
};

RegistrySearchResults.defaultProps = {
  filtersData: {},
  onUpdateSelectedFilters: noop,
  fetchFacetResults: noop,
  onAppliedFilters: noop,
  onClearSelectedFilters: noop,
  resetSearchResultsForm: noop,
  setComponentMounted: noop,
  channelType: 'mobile',
  config: {},
  initializeRegistrySearchResults: noop,
  location: {
    search: '',
  },
  match: {
    params: {},
  },
  registrySearchResults: {
    items: [],
  },
  fetchReferredContent: noop,
};
export default RegistrySearchResults;
