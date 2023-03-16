import React from 'react';
import classnames from 'classnames';
import Button from '@bbb-app/core-ui/button';
import ResponsiveMediaQuery from '@bbb-app/responsive-media-query/ResponsiveMediaQuery';
import CustomSelect from '@bbb-app/custom-select/CustomSelect';
import Icon from '@bbb-app/core-ui/icon';
import '@bbb-app/assets/icons/inline/caret.svg';
import FilterItems from '../../FilterItems/FilterItems';
import styles from '../../FilterItems/FilterItems.css';
import {
  DATE_PURCHASED_NEW_LBL,
  DATE_PURCHASED_OLD_LBL,
  GIFT_GIVER_ASCENDING_LBL,
  GIFT_GIVER_DESCENDING_LBL,
  GIFT_PURCHASED_ASCENDING_LBL,
  GIFT_PURCHASED_DESCENDING_LBL,
} from '../../constants';

class TYMFilters extends FilterItems {
  sortOptions = [
    {
      key: DATE_PURCHASED_NEW_LBL,
      label: DATE_PURCHASED_NEW_LBL,
      props: {
        value: DATE_PURCHASED_NEW_LBL,
      },
    },
    {
      key: DATE_PURCHASED_OLD_LBL,
      label: DATE_PURCHASED_OLD_LBL,
      props: {
        value: DATE_PURCHASED_OLD_LBL,
      },
    },
    {
      key: GIFT_PURCHASED_ASCENDING_LBL,
      label: GIFT_PURCHASED_ASCENDING_LBL,
      props: {
        value: GIFT_PURCHASED_ASCENDING_LBL,
      },
    },
    {
      key: GIFT_PURCHASED_DESCENDING_LBL,
      label: GIFT_PURCHASED_DESCENDING_LBL,
      props: {
        value: GIFT_PURCHASED_DESCENDING_LBL,
      },
    },
    {
      key: GIFT_GIVER_ASCENDING_LBL,
      label: GIFT_GIVER_ASCENDING_LBL,
      props: {
        value: GIFT_GIVER_ASCENDING_LBL,
      },
    },
    {
      key: GIFT_GIVER_DESCENDING_LBL,
      label: GIFT_GIVER_DESCENDING_LBL,
      props: {
        value: GIFT_GIVER_DESCENDING_LBL,
      },
    },
  ];

  filterOptions = [];

  sortBySelection = v => {
    const { sortThankYouList, registryId, updateView } = this.props;
    switch (v) {
      case DATE_PURCHASED_NEW_LBL:
        sortThankYouList(registryId, '1', '1');
        updateView(v, '1', '1');
        break;
      case DATE_PURCHASED_OLD_LBL:
        sortThankYouList(registryId, '1', '0');
        updateView(v, '1', '0');
        break;
      case GIFT_PURCHASED_ASCENDING_LBL:
        sortThankYouList(registryId, '2', '0');
        updateView(v, '2', '0');
        break;
      case GIFT_PURCHASED_DESCENDING_LBL:
        sortThankYouList(registryId, '2', '1');
        updateView(v, '2', '1');
        break;
      case GIFT_GIVER_ASCENDING_LBL:
        sortThankYouList(registryId, '0', '0');
        updateView(v, '0', '0');
        break;
      case GIFT_GIVER_DESCENDING_LBL:
        sortThankYouList(registryId, '0', '1');
        updateView(v, '0', '1');
        break;
      default:
    }
  };

  getDesktopMediaQuery = deviceConfig => {
    const { selectedDropdownOption, isNewDashboard } = this.props;
    return (
      <ResponsiveMediaQuery minWidth={deviceConfig.DESKTOP}>
        <section role="region" aria-labelledby="filters-my-items-h2">
          <div
            className={classnames(
              styles.filterItems,
              styles.TYMfilterItems,
              'py2'
            )}
          >
            <div className="mr-auto">{this.renderAllFacetsOnPage()}</div>
            <CustomSelect
              wrapperClassName={classnames(styles.sortByButton)}
              buttonClassName={isNewDashboard && styles.sortByButtonNew}
              optionSet={this.sortOptions}
              variationName="selectFilters"
              defaultSelectionIndex={this.defaultSort}
              selectOption={this.sortBySelection}
              defaultValue={selectedDropdownOption}
              maxNumberOfElementsToShow={6}
            />
          </div>
        </section>
      </ResponsiveMediaQuery>
    );
  };

  getMobileMediaQuery = deviceConfig => {
    const { isNewDashboard } = this.props;
    return (
      <ResponsiveMediaQuery maxWidth={deviceConfig.DESKTOP - 1}>
        {isNewDashboard ? (
          <button className={styles.sortBtn} onClick={this.toggleSortOptions}>
            {this.sortLabel}
            <Icon
              className={'ml1'}
              key={'caret'}
              width={'10px'}
              height={'5px'}
              type={'caret'}
            />
          </button>
        ) : (
          <div
            className={classnames(
              styles.filterItems,
              'justify-start',
              'sm-pt2'
            )}
          >
            <Button
              className="flex-auto"
              type="button"
              value={this.sortLabel}
              theme="control"
              onClick={this.toggleSortOptions}
            >
              {this.sortLabel}
            </Button>
          </div>
        )}
      </ResponsiveMediaQuery>
    );
  };
}

export default TYMFilters;
