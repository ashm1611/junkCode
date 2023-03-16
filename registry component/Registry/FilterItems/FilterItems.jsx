import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import findIndex from 'lodash/fp/findIndex';
import GridContainer from '@bbb-app/core-ui/grid-container';
import { isBedBathCanada } from '@bbb-app/utils/common';
import isTbs from '@bbb-app/utils/isTbs';
import Button from '@bbb-app/core-ui/button';
// import { SessionStorageUtil } from '@bbb-app/utils/sessionStorage';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import ResponsiveMediaQuery from '@bbb-app/responsive-media-query/ResponsiveMediaQuery';
import CustomSelect from '@bbb-app/custom-select/CustomSelect';
import SlideoutOverlay from '@bbb-app/registry/components/SlideOutOverlay.async';
import SortOptionsView from '../../../../components/Pages/Registry/SortOptionFilter/RenderSortOptionView/SortOptionView.async';
import styles from './FilterItems.css';
import { DiscontinuedDesktop } from '../Discontinued/Discontinued';
import {
  DISCONTINUED,
  REMAINING,
  FAVORITES,
  PURCHASED,
} from '../../../../containers/Pages/Registry/RegistryOwner/constants';
import {
  PRICE_LBL,
  CATEGORY_LBL,
  DATE_ADDED_LBL,
  FAVORITES_LBL,
  FILTER_LBL,
  PURCHASED_LBL,
  REMAINING_LBL,
  SORT_LBL,
  VIEW_RESULTS_LBL,
  DATE_FILTER_LBL,
} from '../constants';
/* labels */
const DISCONTINUED_LBL = 'Discontinued';

/**
 * This component is responsible for rendering Filters on registryOwner and GuestViewer Page.
 * @author Ashish Mishra | ashish.mishra@idc.bedbath.com
 */
const MEDIAOPTION = {
  VARIATION: {
    DATE: 'Date',
    CATEGORY: 'Category',
    PRICE: 'priceView',
  },
  TILES_VIEW: {
    VIEWONE: '1',
    VIEWTWO: '2',
    VIEWTHREE: '3',
  },
};
const VIEW_ALL_TBS_LBL = 'All Items';
const VIEW_ALL_LBL = 'View All';

class FilterItems extends React.PureComponent {
  static prevAllFiltersState = {
    allFiltersOpen: false,
    activeFacetId: '',
  };
  constructor(props) {
    super(props);
    this.categoryLabel = CATEGORY_LBL;
    this.priceLabel = PRICE_LBL;
    this.dateLabel = DATE_ADDED_LBL;
    this.sortLabel = SORT_LBL;
    this.viewResultsLabel = VIEW_RESULTS_LBL;
    this.filterLabel = FILTER_LBL;
    this.viewAllLabel = isTbs() ? VIEW_ALL_TBS_LBL : VIEW_ALL_LBL;
    this.purchasedLabel = PURCHASED_LBL;
    this.remainingLabel = REMAINING_LBL;
    this.favoritesLabel = FAVORITES_LBL;
    this.dateFilterLabel = DATE_FILTER_LBL;
    this.toggleAllFilters = debounce(this.handleToggleAllFilters, 250);
    this.trackItem = false;
    this.state = {
      allFiltersOpen: FilterItems.prevAllFiltersState.allFiltersOpen || false,
      sortingOptionsOpen: false, // mobile only
      IsChunkLoaded: false,
    };
    this.sortOptions = [
      {
        key: 'Category',
        label: this.categoryLabel,
        props: {
          value: this.categoryLabel,
        },
        dataLocator: 'registery-registerymyitems-category	',
      },
      {
        key: 'Price',
        label: this.priceLabel,
        props: {
          value: this.priceLabel,
        },
      },
      {
        key: 'Date',
        label: DATE_FILTER_LBL,
        props: {
          value: DATE_FILTER_LBL,
        },
      },
    ];
    /* istanbul ignore next */
    this.defaultSort = findIndex(this.sortOptions, o => {
      return o.key === this.defaultSort;
    });
    this.selectedItems = [];
    this.sortLabels = {
      gridFilters: {
        sort: this.sortLabel,
        viewResultsBtn: this.viewResultsLabel,
      },
    };
    this.filterLabels = {
      gridFilters: {
        sort: this.filterLabel,
        viewResultsBtn: this.viewResultsLabel,
      },
      dataLocator: 'registery-registerymyitems-filtersviewall',
    };
    this.filterRegistryOptions = [
      {
        key: 'View All',
        label: this.viewAllLabel,
        props: {
          value: this.viewAllLabel,
        },
        dataLocator: 'registery-registerymyitems-filtersviewall',
      },
      {
        key: 'Purchased',
        label: this.purchasedLabel,
        props: {
          value: this.purchasedLabel,
        },
        dataLocator: 'registery-registerymyitems-filterspurchased',
      },
      {
        key: 'Remaining',
        label: this.remainingLabel,
        props: {
          value: this.remainingLabel,
        },
        dataLocator: 'registery-registerymyitems-filterremaining',
      },
      {
        key: isBedBathCanada() ? 'Favourites' : 'Favorites',
        label: this.favoritesLabel,
        props: {
          value: this.favoritesLabel,
        },
        dataLocator: 'registery-registerymyitems-filterfavorites',
      },
    ];
    this.discontinued = {
      key: 'Discontinued',
      label: DISCONTINUED_LBL,
      props: {
        value: DISCONTINUED_LBL,
      },
      dataLocator: 'registery-registerymyitems-filterdiscontinued',
    };
    this.filterOptions = !this.props.giftGiver
      ? [...this.filterRegistryOptions, this.discontinued]
      : this.filterRegistryOptions;
  }
  /**
   *  method will get the selected option from the dropdown and will feth the data sorted accordingly the selected option
   */

  /* responsible for rendering the strip that includes Actions links(email copy),
 filter and sort button. Adaptive component uses ResponsiveMediaQuery
  All Methods of Filters.jsx are accessible. Filters also owns the state for this component
  Depending on which button is clicked, it toggles the state of sort or filter slideout */
  getMobileMediaQuery = () => {
    const deviceConfig = {
      MIDDLEDESKTOP: 1100,
      DESKTOP: 1024,
      TABLET: 768,
    };
    return !this.props.getHeaderLayout ? (
      <ResponsiveMediaQuery maxWidth={deviceConfig.DESKTOP - 1}>
        <Fragment>
          <div className={classnames(styles.filterItems, 'justify-start')}>
            <Button
              className="mr1 flex-auto"
              type="button"
              value={this.filterLabel}
              theme="control"
              onClick={this.toggleAllFilters}
              variation="smallBorderRadius"
              data-locator="registery-registerymyitems-filters"
            >
              {this.filterLabel}
            </Button>
            <Button
              className="flex-auto"
              type="button"
              value={this.sortLabel}
              theme="control"
              variation="smallBorderRadius"
              onClick={this.toggleSortOptions}
            >
              {this.sortLabel}
            </Button>
          </div>
        </Fragment>
      </ResponsiveMediaQuery>
    ) : null;
  };
  /* responsible for rendering the strip that includes Heading,
  Actions links(email print copy), filter buttons and sort by dropdown. Adaptive component uses ResponsiveMediaQuery
  Filters also owns the state for this component */
  getDesktopMediaQuery = () => {
    const deviceConfig = {
      MIDDLEDESKTOP: 1100,
      DESKTOP: 1024,
      TABLET: 768,
    };
    let defaultSortedValue = '';
    if (
      this.props.tilesView === MEDIAOPTION.TILES_VIEW.VIEWTWO ||
      this.props.variation === MEDIAOPTION.VARIATION.PRICE
    ) {
      defaultSortedValue = 'Price';
    } else if (
      this.props.tilesView === MEDIAOPTION.TILES_VIEW.VIEWTHREE ||
      this.props.variation === MEDIAOPTION.VARIATION.DATE
    ) {
      defaultSortedValue = MEDIAOPTION.VARIATION.DATE;
    } else {
      defaultSortedValue = MEDIAOPTION.VARIATION.CATEGORY;
    }
    return (
      <ResponsiveMediaQuery minWidth={deviceConfig.DESKTOP}>
        <section role="region" arial-label="filters for items">
          {this.props.mPulseEnabled && this.props.getHeaderLayout && (
            <Instrumentation
              zoneName={'ux-destination-verified'}
              markName={'ux-text-registry-home'}
            />
          )}

          {!this.props.getHeaderLayout ? (
            <div
              className={classnames(
                'pt2 pb15',
                styles.filterItems,
                this.removeBottomBorder()
              )}
            >
              <div className="mr-auto">{this.renderAllFacetsOnPage()}</div>
              {SORT_LBL && (
                <div className={classnames(styles.sortBy, 'mr2')}>
                  {SORT_LBL}
                </div>
              )}
              <div className={styles.iconTooltip}>
                <CustomSelect
                  wrapperClassName={styles.sortByButton}
                  optionSet={this.sortOptions}
                  variationName="selectFilters"
                  defaultSelectionIndex={this.defaultSort}
                  selectOption={this.sortBySelection}
                  defaultValue={defaultSortedValue}
                />
              </div>
            </div>
          ) : null}
        </section>
      </ResponsiveMediaQuery>
    );
  };
  setPrevAllFiltersState({ allFiltersOpen, activeFacetId }) {
    if (allFiltersOpen !== undefined) {
      FilterItems.prevAllFiltersState.allFiltersOpen = allFiltersOpen;
    }
    if (activeFacetId !== undefined) {
      FilterItems.prevAllFiltersState.activeFacetId = activeFacetId;
    }
  }
  handleToggleAllFilters = () => {
    this.setPrevAllFiltersState({
      allFiltersOpen: !this.state.allFiltersOpen,
    });
    this.setState({
      allFiltersOpen: !this.state.allFiltersOpen,
      IsChunkLoaded: !this.state.IsChunkLoaded,
    });
  };
  /**
   * Toggles the Sort options fly out.
   */
  toggleSortOptions = () => {
    this.setState(() => ({
      sortingOptionsOpen: !this.state.sortingOptionsOpen,
      IsChunkLoaded: !this.state.IsChunkLoaded,
    }));
  };
  sortBySelection = v => {
    const {
      getSortedData,
      registryId,
      giftGiver,
      updateView,
      sortDataByCategory,
      registryCode,
      registryData,
      sortDataByDate,
      getRegistryFirstCategory,
      bopisStoreDetail,
      isBopisFeatureEnable,
    } = this.props;
    let sortSeq;
    if (this.categoryLabel === v) {
      sortSeq = '1';
      if (giftGiver) {
        const registryResVO = pathOr(null, 'registryResVO', registryData);

        const registrySummaryVO = pathOr(
          null,
          'registrySummaryVO',
          registryResVO
        );
        getRegistryFirstCategory(
          registrySummaryVO.eventDate,
          registryId,
          registryCode,
          false,
          undefined,
          undefined,
          false,
          {
            storeId: pathOr(undefined, 'storeId', bopisStoreDetail),
            isBopisFeatureEnable,
          }
        );
        updateView(v, sortSeq);
      } else {
        sortDataByCategory(v, sortSeq);
      }
    }
    if (this.priceLabel === v) {
      sortSeq = '2';
      if (giftGiver) {
        getSortedData(registryId, giftGiver, sortSeq, {
          storeId: pathOr(undefined, 'storeId', bopisStoreDetail),
          isBopisFeatureEnable,
        });
        updateView(v, sortSeq);
      } else {
        sortDataByCategory(v, sortSeq);
      }
    }
    if (v === 'Date') {
      sortSeq = '3';
      if (giftGiver) {
        const registryResVO = pathOr(null, 'registryResVO', registryData);
        const registrySummaryVO = pathOr(
          null,
          'registrySummaryVO',
          registryResVO
        );
        getRegistryFirstCategory(
          registrySummaryVO.eventDate,
          registryId,
          registryCode,
          true,
          undefined,
          undefined,
          false,
          {
            storeId: pathOr(undefined, 'storeId', bopisStoreDetail),
            isBopisFeatureEnable,
          }
        );
        updateView(v, sortSeq);
      } else {
        sortDataByDate(v, sortSeq, true);
      }
    }
    this.props.fireTealiumAction(
      'RegistrySortingClick',
      {
        appt_scheduler_entry: 'Registry Sorting applied',
        call_to_actiontype: 'Registry Sorting applied',
        page_name: 'Registry Sorting applied',
        registry_id: this.props.registryId,
        registry_type: this.props.eventType,
        page_function: 'Registry',
        navigation_path: 'Registry',
        subnavigation_path: 'Registry',
        page_type: 'Registry',
        channel: 'Registry',
        pagename_breadcrumb: 'Registry Sorting applied',
      },
      'RegistrySortingClick'
    );
  };
  changeFilter = v => {
    let value = v;
    if (typeof v === 'object') {
      value = v.target.value;
    }
    let filterValue = '';
    if (value !== this.viewAllLabel) {
      filterValue = value;
      this.props.changeFilter(filterValue, true, value);
    } else {
      this.props.changeFilter(filterValue, false, value);
    }
    this.props.fireTealiumAction(
      'RegistryFacetChangeClick',
      {
        appt_scheduler_entry: 'Registry Facet change',
        call_to_actiontype: 'Registry Facet changed',
        page_name: 'Registry Facet changed',
        registry_id: this.props.registryId || '',
        registry_type: this.props.eventType || '',
        page_function: 'Registry',
        navigation_path: 'Registry',
        subnavigation_path: 'Registry',
        page_type: 'Registry',
        channel: 'Registry',
        pagename_breadcrumb: 'Registry Facet changed',
      },
      'RegistryFacetChangeClick'
    );
  };
  removeBottomBorder() {
    return this.props.variation === 'Date' || this.props.tilesView === '3'
      ? styles.removeBottomBorder
      : '';
  }
  trackItems = () => {
    this.trackItem = true;
  };
  /* method responsible for highlighting the selected filter option on mobile*/
  changeSelectedFilterLabel = selectedFilterOption => {
    switch (selectedFilterOption) {
      case PURCHASED:
        return this.purchasedLabel;
      case REMAINING:
        return this.remainingLabel;
      case FAVORITES:
        return this.favoritesLabel;
      case DISCONTINUED:
        return this.discontinued.label;
      default:
        return selectedFilterOption;
    }
  };
  /*  responsible for rendering the slideout that opens in mobile view
  on click of filter/sort. Change in state is reflected in filterOptions of sortingOptions, and
  depending on the same, respective data is pulled which has been described at the top.
  Any callbacks needed to change page view should be handled from here */
  renderSlideOutOverlay = () => {
    const { sortingOptionsOpen, allFiltersOpen, IsChunkLoaded } = this.state;
    let data;
    let closeSlideout;
    let labels;
    let sortSelection;
    let selectedDropdownOption;
    if (sortingOptionsOpen) {
      data = this.sortOptions;
      labels = this.sortLabels;
      closeSlideout = this.toggleSortOptions;
      sortSelection = this.sortBySelection;
      selectedDropdownOption =
        this.props.selectedDropdownOption || this.defaultSortOption;
    } else if (allFiltersOpen) {
      data = this.filterOptions;
      labels = this.filterLabels;
      closeSlideout = this.toggleAllFilters;
      sortSelection = this.changeFilter;
      selectedDropdownOption = this.changeSelectedFilterLabel(
        this.props.selectedFilterOption
      );
    }
    return (
      <SlideoutOverlay
        show={sortingOptionsOpen || allFiltersOpen}
        direction="right"
        panelWidth="100%"
        panelStyles={{
          height: '100%',
        }}
      >
        {IsChunkLoaded && (
          <SortOptionsView
            data={data}
            onClose={closeSlideout}
            selectedItems={[selectedDropdownOption]}
            onSelectionUpdate={e => sortSelection(data[e].key)}
            labels={labels}
            discontinuedItemCount={this.props.discontinuedItemCount}
            track={this.props.track}
            trackItems={this.trackItems}
            stateTrackItem={this.trackItem}
          />
        )}
      </SlideoutOverlay>
    );
  };
  /* renders the filter buttons  */
  renderAllFacetsOnPage = () => {
    const filters = this.filterOptions;
    const selectedFilterOption = this.props.selectedFilterOption;
    const discontinuedItemCount = this.props.discontinuedItemCount;
    if (discontinuedItemCount <= 0 && this.trackItem) {
      this.trackItem = true;
    }
    return (
      <ul className={styles.buttonwrapper}>
        {filters.map((filter, index) =>
          filter.key === DISCONTINUED ? (
            <DiscontinuedDesktop
              id={`filter${index}`}
              filter={filter}
              isActive={selectedFilterOption === filter.label}
              changeFilter={this.changeFilter}
              stylesDesktop={styles}
              discontinuedItemCount={discontinuedItemCount}
              track={this.props.track}
              trackItems={this.trackItems}
              stateTrackItem={this.trackItem}
            />
          ) : (
            filter.key !== DISCONTINUED_LBL && (
              <li className={styles.buttonwrapper}>
                <Button
                  id={`filter${index}`}
                  className={styles.buttonLabel}
                  theme="control"
                  value={filter.label}
                  data-locator={filter.dataLocator}
                  aria-label={`filter ${filter.label}`}
                  aria-pressed={selectedFilterOption === filter.label}
                  onClick={this.changeFilter}
                >
                  {filter.label}
                </Button>
              </li>
            )
          )
        )}
      </ul>
    );
  };
  render() {
    return (
      <GridContainer
        className={classnames(
          !this.props.isNewDashboard && styles.bgColor,
          this.props.switchConfig.enableRegistryCollaboration &&
            styles.containerGrey
        )}
      >
        {this.getDesktopMediaQuery(this.props.deviceConfig)}
        {this.getMobileMediaQuery(this.props.deviceConfig)}
        {this.props.isMobile && this.renderSlideOutOverlay()}
      </GridContainer>
    );
  }
}
FilterItems.propTypes = {
  deviceConfig: PropTypes.object,
  bopisStoreDetail: PropTypes.object,
  track: PropTypes.func,
  discontinuedItemCount: PropTypes.number,
  selectedFilterOption: PropTypes.array,
  selectedDropdownOption: PropTypes.array,
  getHeaderLayout: PropTypes.bool,
  variation: PropTypes.string,
  tilesView: PropTypes.string,
  mPulseEnabled: PropTypes.bool,
  registryId: PropTypes.number,
  eventType: PropTypes.bool,
  fireTealiumAction: PropTypes.func,
  changeFilter: PropTypes.func,
  getSortedData: PropTypes.object,
  giftGiver: PropTypes.bool,
  updateView: PropTypes.any,
  sortDataByCategory: PropTypes.object,
  registryCode: PropTypes.any,
  registryData: PropTypes.object,
  sortDataByDate: PropTypes.func,
  getRegistryFirstCategory: PropTypes.func,
  isMobile: PropTypes.bool,
  isBopisFeatureEnable: PropTypes.bool,
  switchConfig: PropTypes.object,
  isNewDashboard: PropTypes.bool,
};
export default FilterItems;
