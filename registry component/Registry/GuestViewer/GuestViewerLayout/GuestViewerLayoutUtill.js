import React from 'react';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Heading from '@bbb-app/core-ui/heading';
import Paragraph from '@bbb-app/core-ui/paragraph';
import { getSiteId } from '@bbb-app/utils/common';
import {
  getOnlineUnAvailableItem,
  getStoreItem,
} from '@bbb-app/utils/RegistryUtils';
import styles from './GuestViewerLayout.inline.css';
import CategoryAccordian from '../GGCategoryAccordian/GGCategoryAccordian';
import RegistryContentSlot from '../../ContentSlot/RegistryContentSlot';
import {
  ITEMS_UNAVAILABLE_ONLINE_INFO_LBL,
  ITEMS_UNAVAILABLE_ONLINE_INFO_BABY_LBL,
  ITEMS_UNAVAILABLE_ONLINE_HEADING_LBL,
  ITEMS_UNAVAILABLE_ONLINE_HEADING_CANADA_LBL,
  ITEMS_AVAILABLE_STORE_HEADING_LBL,
  ITEMS_UNAVAILABLE_STORE_INFO_LBL,
} from '../../OwnerProductGridTile/constants';

const NO_RESULT_FOR_LBL = 'No Result For';
const NO_SELECTED_LBL = '“The Selected Filters”';

export const bopisFilterItemCount = (
  itemsArray,
  selectedCheckboxFilter,
  filter
) => {
  let dataItemsArray;
  const categoryItems = [];
  const itemsObjArr = [];
  for (let i = 0; i < itemsArray.length; i += 1) {
    if (itemsArray[i].items) {
      categoryItems.push(itemsArray[i].items);
    } else {
      categoryItems.push(itemsArray[i].registryItemList);
    }
  }

  categoryItems.forEach(elem => {
    if (!isEmpty(elem)) {
      elem.forEach(el => {
        itemsObjArr.push(el);
      });
    }
  });
  if (selectedCheckboxFilter === 'store-pickup') {
    dataItemsArray = itemsObjArr.filter(item => {
      return item.skuInStore === '1';
    });

    return returnFilteredItemsCount(
      dataItemsArray,
      filter,
      selectedCheckboxFilter
    );
  }
  return returnFilteredItemsCount(itemsObjArr, filter, selectedCheckboxFilter);
};

export const returnFilteredItemsCount = (
  itemsArray,
  filter,
  selectedCheckboxFilter
) => {
  let filterQtyValue = 0;
  let dataItemsArray;
  const itemsObjArr = itemsArray;

  switch (filter) {
    case 'Purchased':
      dataItemsArray = itemsObjArr.filter(item => {
        /* istanbul ignore else  */
        if (item.purchased && !item.deletedItem) {
          filterQtyValue += item.qtyPurchased;
        }
        return filterQtyValue;
      });
      break;
    case 'Favourites':
    case 'Favorites':
      dataItemsArray = itemsObjArr.filter(item => {
        /* istanbul ignore else  */
        if (item.markedAsFav && !item.deletedItem) {
          filterQtyValue += item.qtyRequested;
        }
        return filterQtyValue;
      });
      break;
    case 'Remaining':
      dataItemsArray = itemsObjArr.filter(item => {
        /* istanbul ignore else  */
        if (!item.purchased && !item.deletedItem)
          filterQtyValue +=
            Number(item.qtyRequested) - Number(item.qtyPurchased);
        return filterQtyValue;
      });
      break;
    case 'Discontinued':
      dataItemsArray = itemsObjArr.filter(item => {
        /* istanbul ignore else  */
        if (
          !item.purchased &&
          !item.deletedItem &&
          item.displayNotifyRegistrantMsg
        ) {
          filterQtyValue +=
            Number(item.qtyRequested) - Number(item.qtyPurchased);
        }
        return filterQtyValue;
      });
      break;

    default:
      if (selectedCheckboxFilter) {
        dataItemsArray = itemsObjArr.filter(item => {
          if (!item.deletedItem) {
            filterQtyValue += Number(item.qtyRequested);
          }
          return filterQtyValue;
        });
      } else {
        dataItemsArray = itemsObjArr.filter(item => {
          return !isEmpty(item);
        });
      }
      break;
  }
  const filteredItemsCount = filterQtyValue || dataItemsArray.length;
  return filteredItemsCount;
};

export const renderNoResultView = () => {
  return (
    <div className={styles.containerForNoResult}>
      <div className={styles.noResultFilter}>{NO_RESULT_FOR_LBL}</div>
      <div className={classnames(styles.noSelectedFilter, 'mt1')}>
        {NO_SELECTED_LBL}
      </div>
    </div>
  );
};

const isBabySite = getSiteId() === 'BuyBuyBaby';
const isBedBathCanadaSite = getSiteId() === 'BedBathCanada';
export const renderFacetsSortedView = (
  otherProps,
  dateSortedListItemsCount,
  getNumberofRegistryItem,
  displayDiscountedPrice,
  showWelcomeMsg
) => {
  const {
    labels,
    tilesView,
    filter,
    filteredFirstCategoryItems,
    filteredSortedOosCategoryItems,
    isFetchingRemaining,
    isOosFetching,
    isPOBoxAddress,
    selectedCheckboxFilter,
  } = otherProps;
  const dateSortedOosListItemsCountFilter =
    filteredSortedOosCategoryItems &&
    getOnlineUnAvailableItem(
      { registryItemList: filteredSortedOosCategoryItems },
      tilesView
    );
  const dateSortedOosListItemsCount =
    dateSortedOosListItemsCountFilter &&
    selectedCheckboxFilter !== 'in-stock-online' &&
    selectedCheckboxFilter !== 'store-pickup'
      ? bopisFilterItemCount(
          [dateSortedOosListItemsCountFilter],
          selectedCheckboxFilter,
          filter
        )
      : 0;
  const dateSortedStoreListItemsCountFilter =
    filteredSortedOosCategoryItems &&
    getStoreItem(
      { registryItemList: filteredSortedOosCategoryItems },
      tilesView
    );

  const dateSortedStoreListItemsCount =
    dateSortedStoreListItemsCountFilter &&
    selectedCheckboxFilter !== 'in-stock-online'
      ? bopisFilterItemCount(
          [dateSortedStoreListItemsCountFilter],
          selectedCheckboxFilter,
          filter
        )
      : 0;

  return (
    <ErrorBoundary>
      {dateSortedListItemsCount === 0 &&
        otherProps.isRegistryContentSlotReq &&
        selectedCheckboxFilter !== 'in-stock-online' &&
        selectedCheckboxFilter !== 'store-pickup' && (
          <div
            className={classnames(styles.accordianContainer, 'grid-container')}
          >
            <div className={classnames(styles.contentContainer, 'pb3 pt3')}>
              <RegistryContentSlot
                isGiftGiver
                labels={labels}
                styleVariation={otherProps.styleVariation}
                siteId={otherProps.siteId}
                registryData={otherProps.registryData}
              />
            </div>
          </div>
        )}
      {filteredFirstCategoryItems && dateSortedListItemsCount !== 0 && (
        <div
          className={classnames(styles.accordianContainer, 'pt2')}
          data-locator="guestViewItemsSection"
        >
          <CategoryAccordian
            isRegistryContentSlotReq={otherProps.isRegistryContentSlotReq}
            getNumberofRegistryItem={getNumberofRegistryItem}
            data={{ registryItemList: filteredFirstCategoryItems }}
            expandAccordian
            {...otherProps}
            variation={'Date'}
            isPOBoxAddress={isPOBoxAddress}
            displayDiscountedPrice={displayDiscountedPrice}
            selectedCheckboxFilter={selectedCheckboxFilter}
            showWelcomeMsg={showWelcomeMsg}
          />
        </div>
      )}
      {dateSortedStoreListItemsCount !== 0 &&
        selectedCheckboxFilter !== 'in-stock-online' && (
          <div
            className={classnames(styles.accordianContainer, 'pb25')}
            data-locator="itemInSelectedStore"
          >
            {filteredSortedOosCategoryItems &&
            filteredSortedOosCategoryItems.length ? (
              <React.Fragment>
                <Heading
                  level={2}
                  className="mr-auto pt3 grid-container"
                  data-locator="registery-registerymyitems-heading"
                >
                  {ITEMS_AVAILABLE_STORE_HEADING_LBL}
                </Heading>
                <Paragraph
                  className={classnames(
                    styles.itemsUnavailableOnlineInfo,
                    'pt1 grid-container'
                  )}
                >
                  {ITEMS_UNAVAILABLE_STORE_INFO_LBL}
                </Paragraph>
              </React.Fragment>
            ) : null}
            {dateSortedStoreListItemsCount !== 0 &&
              selectedCheckboxFilter !== 'in-stock-online' &&
              filteredSortedOosCategoryItems && (
                <div className={classnames(styles.oosAccordian, 'pt4')}>
                  <CategoryAccordian
                    getNumberofRegistryItem={getNumberofRegistryItem}
                    data={getStoreItem(
                      { registryItemList: filteredSortedOosCategoryItems },
                      tilesView
                    )}
                    expandAccordian
                    {...otherProps}
                    variation={'Date'}
                    styleVariation={'ais'}
                    isGiftGiverPage
                    isPOBoxAddress={isPOBoxAddress}
                    displayDiscountedPrice={displayDiscountedPrice}
                  />
                </div>
              )}
          </div>
        )}
      {dateSortedOosListItemsCount !== 0 &&
        selectedCheckboxFilter !== 'in-stock-online' &&
        selectedCheckboxFilter !== 'store-pickup' && (
          <div
            className={classnames(styles.accordianOosContainer, 'pb25')}
            data-locator="oosItemsSection"
          >
            {filteredSortedOosCategoryItems &&
            filteredSortedOosCategoryItems.length ? (
              <React.Fragment>
                <Heading
                  level={2}
                  className="mr-auto pt3 grid-container"
                  data-locator="registery-registerymyitems-heading"
                >
                  {isBedBathCanadaSite
                    ? ITEMS_UNAVAILABLE_ONLINE_HEADING_CANADA_LBL
                    : ITEMS_UNAVAILABLE_ONLINE_HEADING_LBL}
                </Heading>
                <Paragraph
                  className={classnames(
                    styles.itemsUnavailableOnlineInfo,
                    'pt1 grid-container'
                  )}
                >
                  {isBabySite
                    ? ITEMS_UNAVAILABLE_ONLINE_INFO_BABY_LBL
                    : ITEMS_UNAVAILABLE_ONLINE_INFO_LBL}
                </Paragraph>
              </React.Fragment>
            ) : null}
            {dateSortedOosListItemsCount !== 0 &&
              selectedCheckboxFilter !== 'in-stock-online' &&
              selectedCheckboxFilter !== 'store-pickup' &&
              filteredSortedOosCategoryItems && (
                <div className={classnames(styles.oosAccordian, 'pt4')}>
                  <CategoryAccordian
                    getNumberofRegistryItem={getNumberofRegistryItem}
                    data={getOnlineUnAvailableItem(
                      { registryItemList: filteredSortedOosCategoryItems },
                      tilesView
                    )}
                    expandAccordian
                    {...otherProps}
                    variation={'Date'}
                    styleVariation={'oos'}
                    isGiftGiverPage
                    isPOBoxAddress={isPOBoxAddress}
                    displayDiscountedPrice={displayDiscountedPrice}
                  />
                </div>
              )}
          </div>
        )}
      {tilesView === '3' && (isFetchingRemaining || isOosFetching) && null}
    </ErrorBoundary>
  );
};
