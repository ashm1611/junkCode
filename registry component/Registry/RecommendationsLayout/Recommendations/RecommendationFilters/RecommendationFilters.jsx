import React, { Fragment } from 'react';
import classnames from 'classnames';
import { pathOr } from 'lodash/fp';
import Cell from '@bbb-app/core-ui/cell';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import ResponsiveMediaQuery from '@bbb-app/responsive-media-query/ResponsiveMediaQuery';
import CustomSelect from '@bbb-app/custom-select/CustomSelect';
import FilterItems from '../../../FilterItems/FilterItems';
import RegistryActionButtons from '../../../RegistryActionButtons';
import styles from '../../../FilterItems/FilterItems.css';
import recommendFilterStyles from './RecommendationFilters.css';
import {
  NEW_FILTER_TAB,
  MAYBELATER_TAB,
  ADDED_TO_REGISTRY,
  RECOMMENDER_TAB,
  RECOMMENDATION_SORT_DATE,
  DEFAULT_SORT_OPTION,
} from '../../constants';
import {
  ATR_SOCIAL_REC_LBL,
  GET_RECOMMENDATIONS_TITLE_LBL,
  MAY_BE_LATER_SOCIAL_REC_LBL,
  NEW_SOCIAL_REC_LBL,
  RECOMMENDER_SOCIAL_REC_LBL,
  RECS_FOR_REVIEW_LBL,
} from '../../../constants';
class RecommendationFilters extends FilterItems {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.sortBySelection = this.sortBySelection.bind(this);
    this.sortOptions = [];
    this.defaultSortOption = DEFAULT_SORT_OPTION;
    this.defaultSort = -1;
  }
  filterOptions = [
    {
      key: 'New',
      label: NEW_SOCIAL_REC_LBL,
      props: {
        value: NEW_SOCIAL_REC_LBL,
      },
    },
    {
      key: 'Maybe Later',
      label: MAY_BE_LATER_SOCIAL_REC_LBL,
      props: {
        value: MAY_BE_LATER_SOCIAL_REC_LBL,
      },
    },
    {
      key: 'Added to Registry',
      label: ATR_SOCIAL_REC_LBL,
      props: {
        value: ATR_SOCIAL_REC_LBL,
      },
    },
    {
      key: 'Recommenders',
      label: RECOMMENDER_SOCIAL_REC_LBL,
      props: {
        value: RECOMMENDER_SOCIAL_REC_LBL,
      },
    },
  ];
  /* Calls the Recommendation Api based on the tab click performed by user,
  Passing the Tab id and default sort option value to api

  */
  changeFilter = v => {
    let value = v;
    if (typeof v === 'object') {
      value = pathOr({}, 'target.value', v);
    }
    let defaultSortOption = RECOMMENDATION_SORT_DATE;

    if (value === NEW_SOCIAL_REC_LBL) {
      defaultSortOption = this.getDefaultSortOption(NEW_FILTER_TAB);
      this.props.fetchRecommendationData(
        NEW_FILTER_TAB,
        defaultSortOption,
        NEW_SOCIAL_REC_LBL
      );
    } else if (value === MAY_BE_LATER_SOCIAL_REC_LBL) {
      defaultSortOption = this.getDefaultSortOption(MAYBELATER_TAB);
      this.props.fetchRecommendationData(
        MAYBELATER_TAB,
        defaultSortOption,
        MAY_BE_LATER_SOCIAL_REC_LBL
      );
    } else if (value === ATR_SOCIAL_REC_LBL) {
      defaultSortOption = this.getDefaultSortOption(ADDED_TO_REGISTRY);

      this.props.fetchRecommendationData(
        ADDED_TO_REGISTRY,
        defaultSortOption,
        ATR_SOCIAL_REC_LBL
      );
    } else if (value === RECOMMENDER_SOCIAL_REC_LBL) {
      defaultSortOption = this.getDefaultSortOption(RECOMMENDER_TAB);
      this.props.fetchRecommendationData(
        RECOMMENDER_TAB,
        defaultSortOption,
        RECOMMENDER_SOCIAL_REC_LBL
      );
    }
    const updateDefaultConfig = true;
    this.props.updateView(defaultSortOption, updateDefaultConfig);
  };
  getDefaultSortOption(tabId) {
    const sortConfig = this.props.getSortConfigForTab(tabId);
    const defaultSortOption = pathOr(
      DEFAULT_SORT_OPTION,
      'tabSortConfig.default',
      sortConfig
    );
    return defaultSortOption;
  }
  /* Calls the Recommendation Api based on the sort option selected,
   */
  sortBySelection = v => {
    const {
      sortRecommendationList,
      registryId,
      updateView,
      registryEventType,
      tabId,
    } = this.props;
    sortRecommendationList(registryId, tabId, v, registryEventType);
    updateView(v);
  };
  getDesktopMediaQuery = deviceConfig => {
    const { selectedDropdownOption, getSortConfigForTab } = this.props;
    const { enableRegistryCollaboration } = this.props.switchConfig;
    const sortConfig = getSortConfigForTab(this.props.tabId);
    this.defaultSortOption = pathOr(
      DEFAULT_SORT_OPTION,
      'tabSortConfig.default',
      sortConfig
    );
    this.sortOptions = pathOr([], 'tabSortConfig.options', sortConfig);
    this.defaultSort = pathOr([], 'selectedIndex', sortConfig);
    return (
      <ResponsiveMediaQuery minWidth={deviceConfig.DESKTOP}>
        <Cell
          className={classnames(
            'pt3 pb2',
            recommendFilterStyles.recommendationHeading
          )}
        >
          {enableRegistryCollaboration ? (
            <Heading
              level={2}
              className={recommendFilterStyles.recsForReviewHeading}
            >
              {RECS_FOR_REVIEW_LBL}
            </Heading>
          ) : (
            <Heading level={2}>{GET_RECOMMENDATIONS_TITLE_LBL}</Heading>
          )}
        </Cell>
        <section role="region" aria-labelledby="filters-my-items-h2">
          <div
            className={classnames(
              'pb15',
              styles.filterItems,
              recommendFilterStyles.socialRecAll,
              enableRegistryCollaboration ? 'mt3' : 'mt1'
            )}
          >
            <div
              className={classnames(
                'mr-auto',
                !enableRegistryCollaboration &&
                  recommendFilterStyles.socialRecFilters
              )}
            >
              {this.renderAllFacetsOnPage()}
            </div>
            {this.props.tabId !== RECOMMENDER_TAB && (
              <CustomSelect
                wrapperClassName={classnames(styles.sortByButton)}
                optionSet={this.sortOptions}
                variationName="selectFilters"
                defaultSelectionIndex={this.defaultSort}
                selectOption={this.sortBySelection}
                defaultValue={selectedDropdownOption || this.defaultSortOption}
              />
            )}
          </div>
        </section>
      </ResponsiveMediaQuery>
    );
  };
  getMobileMediaQuery = deviceConfig => {
    this.defaultSortOption = this.getDefaultSortOption(this.props.tabId);
    const { enableRegistryCollaboration } = this.props.switchConfig;
    return !this.props.getHeaderLayout ? (
      <ResponsiveMediaQuery maxWidth={deviceConfig.DESKTOP - 1}>
        <Fragment>
          {enableRegistryCollaboration ? (
            <Cell
              className={classnames(
                'pt3 pb2',
                recommendFilterStyles.recommendationHeading
              )}
            >
              <Heading
                level={2}
                className={recommendFilterStyles.recsForReviewHeading}
              >
                {RECS_FOR_REVIEW_LBL}
              </Heading>
            </Cell>
          ) : (
            <div className={classnames(styles.filterItems, 'justify-start')}>
              <RegistryActionButtons {...this.props} />
            </div>
          )}
          <div
            className={classnames(
              enableRegistryCollaboration && styles.collabFilter,
              styles.filterItems,
              'justify-start'
            )}
          >
            <Button
              className="mr1 flex-auto"
              type="button"
              value={this.filterLabel}
              theme="control"
              onClick={this.toggleAllFilters}
              data-locator="registery-registerymyitems-filters"
            >
              {this.filterLabel}
            </Button>
            {this.props.selectedFilterOption !== RECOMMENDER_SOCIAL_REC_LBL && (
              <Button
                className="flex-auto"
                type="button"
                value={this.sortLabel}
                theme="control"
                onClick={this.toggleSortOptions}
              >
                {this.sortLabel}
              </Button>
            )}
          </div>
        </Fragment>
      </ResponsiveMediaQuery>
    ) : null;
  };
}
export default RecommendationFilters;
