import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import debounce from 'lodash.debounce';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import qs, { parse } from 'qs';
import GridContainer from '@bbb-app/core-ui/grid-container';
import Button from '@bbb-app/core-ui/button';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import ResponsiveMediaQuery from '@bbb-app/responsive-media-query/ResponsiveMediaQuery';
import { buildFriendlyFacetUrlSegment } from '@bbb-app/utils/buildFriendlyFacetUrlSegment';
import '@bbb-app/assets/icons/CloseIcon.svg';
import '@bbb-app/assets/icons/filter_icon.svg';
import SlideOutOverlay from '@bbb-app/registry/components/SlideOutOverlay.async';
import styles from './RegistryFacetFilter.css';
import RegistryAllFiltersView from '../RegistryAllFiltersView/RegistryAllFiltersView.async';
import { RenderFacetsCheckbox } from '../GuestViewer/GuestViewerLayout/ComponentUtils';
import RegistryFacetFilterList from '../RegistryFacetFilterList/RegistryFacetFilterList';
import AppliedFilters from './AppliedFilters/AppliedFilters';
import { getFacets } from '../../../../containers/Pages/Registry/RegistryFacetFilter/RegistryFacetFilterUtils';
import {
  getObjectfromMemory,
  setObjectInMemory,
} from '../utils/objectInMemory';
import { getFiltersTealiumData } from './RegistryFacetTealiumHandler';
const PANEL_STYLE_HEIGHT = { height: '100%' };

class FilterFacetItems extends React.PureComponent {
  constructor(props) {
    super(props);
    this.trackItem = false;
    this.toggleAllFilters = debounce(this.handleToggleAllFilters, 250);
    this.toggleSortOptions = debounce(this.toggleSortOptions, 250);
    this.state = {
      allFiltersOpen: false,
      allFiltersData: {
        facets: props.facetsData,
        selectedFilters: props.selectedFilters,
        isRegistryToolTip: true,
      },
      activeFacetId: props.enableNewRegDashboard ? 'InStore' : '',
    };
    this.registryLabels = pathOr(null, 'registryDetails', props.labels);
    this.filterLabel = 'Filter';
    this.sortLabel = 'Sort';
    this.queryParam = parse(location.search, { ignoreQueryPrefix: true });
    this.getFiltersFromURL();
  }
  componentWillReceiveProps = nextProps => {
    const { selectedFilters } = nextProps;
    this.setState({
      allFiltersData: {
        facets: nextProps.facetsData,
        selectedFilters,
      },
    });
    if (this.props.selectedFilters !== selectedFilters) {
      if (Object.keys(selectedFilters).length > 0) {
        const selected = buildFriendlyFacetUrlSegment(selectedFilters);
        this.queryParam.selectedRLVFilters = selected;
        window.history.replaceState(
          null,
          null,
          `${location.pathname}?${qs.stringify(this.queryParam)}`
        );
      }
    }
  };

  componentWillUnmount() {
    setObjectInMemory('registrySort', null);
  }

  onActiveFacetChange = id => {
    /* istanbul ignore else */
    if (id) {
      this.setState({
        activeFacetId: id,
        isPanelFacetToggle: !this.state.isPanelFacetToggle,
      });
      this.handleMultipleSelection(true);
    }
  };
  onAccordionChange = id => {
    this.onActiveFacetChange(id);
  };
  onFilterSelectionUpdate = (
    facetId,
    selections,
    index,
    singleSelection,
    selected
  ) => {
    const {
      updateSelectedFilters,
      selectedFilters,
      selectedCheckboxFilter,
      isOwnerView,
    } = this.props;
    if (facetId === 'sort') {
      updateSelectedFilters({
        [facetId]: [singleSelection.key],
      });
    } else {
      updateSelectedFilters({
        [facetId]: !isEmpty(selections) && selections,
      });
    }

    const tealiumData = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView
    );
    this.props.fireTealiumAction('', tealiumData, '');
    if (selected) {
      this.onActiveFacetChange(facetId);
    }

    if (this.props.reInitializeMarks) {
      this.props.reInitializeMarks();
    }
  };

  onOverlayClose = () => {
    const {
      appliedFilters,
      selectedFilters,
      selectedCheckboxFilter,
      onClearSelectedFilters,
    } = this.props;
    if (!isEqual(appliedFilters.selectedFilters, selectedFilters)) {
      onClearSelectedFilters(appliedFilters.selectedFilters);
    }
    if (
      !isEqual(appliedFilters.selectedCheckboxFilter, selectedCheckboxFilter)
    ) {
      this.props.handleBopisCheckboxChange(
        appliedFilters.selectedCheckboxFilter
      );
    }
  };

  getFiltersFromURL = () => {
    const { updateSelectedFilters, facetsData } = this.props;
    if (facetsData.length > 0) {
      const data =
        this.queryParam &&
        this.queryParam.selectedRLVFilters &&
        this.queryParam.selectedRLVFilters.split('_');
      let selected;
      if (data) {
        facetsData.map(facet => {
          if (facet.items) {
            const selection = [];
            facet.items.map(item => {
              if (data.find(value => item.key === value)) {
                if (item.id === 'sort') {
                  selection.push(item.key);
                } else {
                  selection.push(item.label);
                }
                selected = Object.assign(
                  {},
                  { [item.id]: selection },
                  selected
                );
              }
              return null;
            });
          }
          return null;
        });
        updateSelectedFilters(selected);
      }
    }
  };

  getMobileMediaQuery = () => {
    const deviceConfig = {
      MIDDLEDESKTOP: 1100,
      DESKTOP: 1024,
      TABLET: 768,
    };
    return (
      <ResponsiveMediaQuery maxWidth={deviceConfig.DESKTOP - 1}>
        <div>
          {this.props.isBopisFeatureEnable && [
            this.props.isOwnerView && (
              <div
                className={classnames(
                  this.props.isMobile && [
                    this.props.enableNewRegDashboard
                      ? styles.filterBopisLineNotVisible
                      : styles.filterBopisLine,
                    'pt2',
                  ]
                )}
              />
            ),
            this.renderBopisFilter(),
            <div
              className={
                this.props.isMobile && this.props.enableNewRegDashboard
                  ? styles.filterBopisLineNotVisible
                  : styles.filterBopisLine
              }
            />,
          ]}
          <div
            className={classnames(
              styles.filterFacetItems,
              'filterFacetItems',
              'justify-start'
            )}
          >
            <Button
              className={classnames(
                'mr1 flex-auto',
                '__test__showAllFiltersButton',
                'js-showAllFiltersButton',
                styles.buttonLabel
              )}
              type="button"
              value={this.filterLabel}
              theme="control"
              onClick={this.callAndOpenFilter}
              variation="smallBorderRadius"
              data-locator="registry-filter-button"
            >
              {this.filterLabel}
            </Button>
            <Button
              className={classnames('flex-auto', styles.buttonLabel)}
              type="button"
              value={this.sortLabel}
              theme="control"
              variation="smallBorderRadius"
              onClick={this.toggleSortOptions}
              data-locator="registry-sort-button"
            >
              {this.sortLabel}
            </Button>
          </div>
          {this.renderAppliedFilters()}
        </div>
      </ResponsiveMediaQuery>
    );
  };

  getDesktopMediaQuery = () => {
    const deviceConfig = {
      MIDDLEDESKTOP: 1100,
      DESKTOP: 1024,
      TABLET: 768,
      DESKTOP_BREAKPOINT: 1360,
    };
    return (
      <React.Fragment>
        <ResponsiveMediaQuery minWidth={deviceConfig.DESKTOP}>
          {this.renderFacetView()}
        </ResponsiveMediaQuery>
      </React.Fragment>
    );
  };

  getNewLayoutMediaQuery = () => (
    <div className={styles.appliedFiltersWrap}>
      <div className="mt2" id="filterNSort">
        <Button
          theme=""
          variation="noPadding"
          onClick={this.handleToggleAllFilters}
          data-locator="registry-filter-sort-btn"
          iconProps={{
            type: 'filter_icon',
            width: '16',
            height: '16',
          }}
        >
          {'filter & sort'}
        </Button>
      </div>
      {this.renderAppliedFilters()}
    </div>
  );

  updateFilters = value => {
    const { onClearSelectedFilters, selectedFilters } = this.props;
    const { id, label } = value;
    const updatedFilters = selectedFilters;
    const removedFilter = updatedFilters[`${id}`].filter(
      index => index !== label
    );
    if (removedFilter.length > 0) {
      updatedFilters[`${id}`] = removedFilter;
    } else if (removedFilter.length === 0) {
      delete updatedFilters[`${id}`];
    }
    onClearSelectedFilters(updatedFilters);
  };
  callAndOpenFilter = () => {
    this.handleToggleAllFilters();
  };

  handleMultipleSelection = bool => {
    this.setState({ facetClick: bool });
  };

  handleToggleAllFilters = () => {
    this.setState({
      allFiltersOpen: !this.state.allFiltersOpen,
    });
  };

  /**
   * Toggles the Sort options fly out.
   */
  toggleSortOptions = () => {
    this.setState({
      isSortFilterSelected: !this.state.isSortFilterSelected,
    });
  };

  removeBottomBorder() {
    return this.props.variation === 'Date' || this.props.tilesView === '3'
      ? styles.removeBottomBorder
      : '';
  }
  trackItems = () => {
    this.trackItem = true;
  };

  /* renders the filter dropdown  */
  renderFacetItems = () => {
    const facetsData = pathOr('', 'facetsData', this.props);
    const { selectedFilters, isOwnerView, enableCSLabels } = this.props;

    return facetsData.map((facet, index) => {
      const getFacetsDisplayName = () => {
        if (
          facet.id === 'sort' &&
          selectedFilters &&
          selectedFilters.sort &&
          selectedFilters.sort[0]
        ) {
          const registrySortKey = 'registrySort';
          if (!getObjectfromMemory(registrySortKey) && facet && facet.items) {
            const sortingKeyMap = facet.items.reduce((acc, item) => {
              // eslint-disable-next-line no-param-reassign
              acc[item.key] = item.label;
              return acc;
            }, {});
            setObjectInMemory(registrySortKey, sortingKeyMap);
          }

          return `${facet.displayName}: ${
            getObjectfromMemory(registrySortKey)[selectedFilters.sort[0]]
          }`;
        }
        return facet.displayName;
      };
      return (
        <RegistryFacetFilterList
          displayName={getFacetsDisplayName()}
          id={facet.id}
          label={facet.displayName}
          data={facet.items}
          key={`facet-${index}-${facet.id}`}
          type={facet.type}
          facetsData={facetsData}
          onSelectionUpdate={this.onFilterSelectionUpdate}
          handleMultipleSelection={this.handleMultipleSelection}
          selectedItems={selectedFilters[facet.id]}
          selectedFilters={selectedFilters}
          facetClick={this.isFacetClicked}
          isRegistryFlow
          isOwnerView={isOwnerView}
          enableCSLabels={enableCSLabels}
        />
      );
    });
  };
  renderBopisFilter = () => {
    return (
      this.props.isBopisFeatureEnable && (
        <RenderFacetsCheckbox
          labels={this.props.labels}
          storeDetails={this.props.storeDetails}
          bopisStoreDetail={this.props.bopisStoreDetail}
          selectedCheckboxFilter={this.props.selectedCheckboxFilter}
          handleBopisCheckboxChange={this.props.handleBopisCheckboxChange}
          handleChangePickupInStore={this.props.handleChangePickupInStore}
          isMobile={this.props.isMobile}
          siteId={this.props.siteId}
          isNewDashboard={this.props.enableNewRegDashboard}
          handleToggleAllFilters={this.handleToggleAllFilters}
        />
      )
    );
  };
  renderAppliedFilters() {
    const { appliedFilters } = this.props;
    const filters =
      this.props.enableNewRegDashboard && this.props.isSlideoutOverlayOpen
        ? appliedFilters.selectedFilters
        : this.props.selectedFilters;

    const data = getFacets(filters);
    return (
      <div
        className={classnames(
          !this.props.isMobile && 'pl1',
          this.props.enableNewRegDashboard && this.props.isMobile && 'mt2 pl1'
        )}
      >
        {Object.keys(filters).length > 1 && (
          <AppliedFilters
            labels={this.props.labels}
            clearSelectedFilters={this.props.onResetAllFilters}
            updateSelectedFilters={this.updateFilters}
            appliedFiltersOrderedSet={data}
            enableCSLabels={this.props.enableCSLabels}
            isNewDashboard={this.props.enableNewRegDashboard}
          />
        )}
      </div>
    );
  }
  renderFacetView = () => {
    const { channelType } = this.props;
    return (
      <React.Fragment>
        {this.renderBopisFilter()}
        <section
          role="region"
          arial-label="filters for items"
          className="filtersViewport pl1 inline-block"
        >
          {this.props.mPulseEnabled && this.props.getHeaderLayout && (
            <Instrumentation
              zoneName={'ux-destination-verified'}
              markName={'ux-text-registry-home'}
            />
          )}
          <div
            className={classnames(
              'pt2',
              styles.filterFacetItems,
              `channel-type-${channelType}`,
              'filtersWrapper',
              this.removeBottomBorder()
            )}
          >
            <div className={classnames(styles.facetView, 'mr-auto')}>
              {this.renderFacetItems()}
            </div>
          </div>
        </section>
        {this.renderAppliedFilters()}
      </React.Fragment>
    );
  };
  renderSlideOutOverlay = (
    isUpdatingFilters,
    channelType,
    labels,
    facetDataOrder
  ) => {
    const {
      allFiltersOpen,
      activeFacetId,
      allFiltersData,
      isPanelFacetToggle,
      isSortFilterSelected,
    } = this.state;
    const { enableNewRegDashboard, isMobile } = this.props;
    if (allFiltersOpen) {
      return (
        <SlideOutOverlay
          onOverlayClick={enableNewRegDashboard ? null : this.toggleAllFilters}
          show={allFiltersOpen}
          direction="right"
          panelWidth={enableNewRegDashboard && !isMobile ? '29%' : '100%'}
          panelStyles={PANEL_STYLE_HEIGHT}
          overlayWrapperClassName={this.props.overlayWrapperClassName}
        >
          <RegistryAllFiltersView
            data={allFiltersData}
            activeFacetId={activeFacetId}
            onActiveFacetChange={this.onAccordionChange}
            onClose={this.toggleAllFilters}
            onSelectionUpdate={this.onFilterSelectionUpdate}
            labels={labels}
            facetDataOrder={facetDataOrder}
            channelType={channelType}
            isOpen={allFiltersOpen}
            isBusy={isUpdatingFilters}
            switchConfig={this.props.switchConfig}
            isPanelFacetToggle={isPanelFacetToggle}
            isOwnerView={this.props.isOwnerView}
            enableCSLabels={this.props.enableCSLabels}
            isNewDashboard={enableNewRegDashboard}
            renderBopisFilter={this.renderBopisFilter}
            onResetFiltersAndSort={this.props.onResetFiltersAndSort}
            handleBopisCheckboxChange={this.props.handleBopisCheckboxChange}
            onOverlayClose={this.onOverlayClose}
          />
        </SlideOutOverlay>
      );
    } else if (isSortFilterSelected) {
      return (
        <SlideOutOverlay
          onOverlayClick={this.toggleSortOptions}
          show={isSortFilterSelected}
          direction="right"
          panelWidth={'100%'}
          panelStyles={PANEL_STYLE_HEIGHT}
          onSlideoutOverlayOpen={this.onSlideoutOverlayOpen}
          overlayWrapperClassName={this.props.overlayWrapperClassName}
        >
          <RegistryAllFiltersView
            data={allFiltersData}
            activeFacetId={activeFacetId}
            onActiveFacetChange={this.onAccordionChange}
            onClose={this.toggleSortOptions}
            onSelectionUpdate={this.onFilterSelectionUpdate}
            labels={labels}
            facetDataOrder={facetDataOrder}
            channelType={channelType}
            isOpen={allFiltersOpen}
            isBusy={isUpdatingFilters}
            switchConfig={this.props.switchConfig}
            isPanelFacetToggle={isPanelFacetToggle}
            sortLabel={this.sortLabel}
            isSortView
            isOwnerView={this.props.isOwnerView}
            enableCSLabels={this.props.enableCSLabels}
          />
        </SlideOutOverlay>
      );
    }
    return null;
  };

  render() {
    const { channelType, facetsData, selectedFilters, labels } = this.props;
    return (
      <GridContainer
        className={this.props.enableNewRegDashboard && styles.bgcolor}
      >
        {this.props.enableNewRegDashboard
          ? this.getNewLayoutMediaQuery()
          : this.getDesktopMediaQuery()}
        {!this.props.enableNewRegDashboard && this.getMobileMediaQuery()}
        {this.renderSlideOutOverlay(
          channelType,
          facetsData,
          selectedFilters,
          labels
        )}
      </GridContainer>
    );
  }
}

FilterFacetItems.propTypes = {
  fireTealiumAction: PropTypes.func,
  bopisStoreDetail: PropTypes.object,
  labels: PropTypes.object,
  getHeaderLayout: PropTypes.bool,
  variation: PropTypes.string,
  tilesView: PropTypes.string,
  mPulseEnabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  isBopisFeatureEnable: PropTypes.bool,
  updateSelectedFilters: PropTypes.func,
  reInitializeMarks: PropTypes.func,
  selectedFilters: PropTypes.array,
  channelType: PropTypes.string,
  facetsData: PropTypes.String,
  storeDetails: PropTypes.object,
  selectedCheckboxFilter: PropTypes.bool,
  handleBopisCheckboxChange: PropTypes.func,
  handleChangePickupInStore: PropTypes.func,
  switchConfig: PropTypes.object,
  overlayWrapperClassName: PropTypes.string,
  onClearSelectedFilters: PropTypes.func,
  onResetAllFilters: PropTypes.func,
  isOwnerView: PropTypes.bool,
  siteId: PropTypes.string,
  enableCSLabels: PropTypes.bool,
  enableNewRegDashboard: PropTypes.bool,
  isSlideoutOverlayOpen: PropTypes.bool,
  onResetFiltersAndSort: PropTypes.func,
  appliedFilters: PropTypes.object,
};
export default FilterFacetItems;
