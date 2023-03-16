/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import _ from 'lodash';
/**
 * will check sorting key and totalPrice will be used for LTL products
 */
const getSortingKey = (a, b, dir) => {
  let keyforA = 'priceVal';
  let keyforB = 'priceVal';
  if (a.totalPrice) {
    keyforA = 'totalPrice';
  }
  if (b.totalPrice) {
    keyforB = 'totalPrice';
  }
  return dir === 'asc' ? a[keyforA] - b[keyforB] : b[keyforB] - a[keyforA];
};

/**
 * sort the array with price
 */
export const sortCategoryItems = (itemsArr, dir) => {
  const itemsArray = [...itemsArr];
  if (dir && itemsArray && itemsArray.length > 0) {
    itemsArray.sort((a, b) => getSortingKey(a, b, dir));
    return itemsArray;
  }
  return itemsArray;
};

export const applyFilter = (
  itemsArray,
  selectedFilters,
  registryOwner,
  selectedCheckboxFilter
) => {
  if (registryOwner && selectedCheckboxFilter) {
    // eslint-disable-next-line no-param-reassign
    itemsArray = itemsArray.filter(item => {
      if (selectedCheckboxFilter === 'in-stock-online') {
        if (item.isBelowLineItem !== 'true') return item;
      } else if (selectedCheckboxFilter === 'store-pickup') {
        if (item.skuInStore === '1') return item;
      }
    });
  }

  if (
    selectedFilters.price &&
    selectedFilters.categories &&
    selectedFilters.status
  ) {
    return itemsArray.filter(item => {
      const priceItem = _.includes(
        selectedFilters.price,
        item.priceRangeFilter
      );
      const catItem = _.includes(
        selectedFilters.categories,
        item.categoryFilter
      );
      const statusItem = selectedFilters.status.some(status =>
        _.includes(item.statusFilter, status)
      );
      return priceItem && catItem && statusItem;
    });
  } else if (selectedFilters.price && selectedFilters.categories) {
    return itemsArray.filter(item => {
      const priceItem = _.includes(
        selectedFilters.price,
        item.priceRangeFilter
      );
      const catItem = _.includes(
        selectedFilters.categories,
        item.categoryFilter
      );
      return priceItem && catItem;
    });
  } else if (selectedFilters.price && selectedFilters.status) {
    return itemsArray.filter(item => {
      const priceItem = _.includes(
        selectedFilters.price,
        item.priceRangeFilter
      );
      const statusItem = selectedFilters.status.some(status =>
        _.includes(item.statusFilter, status)
      );
      return priceItem && statusItem;
    });
  } else if (selectedFilters.status && selectedFilters.categories) {
    return itemsArray.filter(item => {
      const catItem = _.includes(
        selectedFilters.categories,
        item.categoryFilter
      );
      const statusItem = selectedFilters.status.some(status =>
        _.includes(item.statusFilter, status)
      );
      return catItem && statusItem;
    });
  } else if (selectedFilters.status) {
    return itemsArray.filter(item => {
      const statusItem = selectedFilters.status.some(status =>
        _.includes(item.statusFilter, status)
      );
      return statusItem;
    });
  } else if (selectedFilters.categories) {
    return itemsArray.filter(item => {
      const catItem = _.includes(
        selectedFilters.categories,
        item.categoryFilter
      );
      return catItem;
    });
  } else if (selectedFilters.price) {
    return itemsArray.filter(item => {
      const priceItem = _.includes(
        selectedFilters.price,
        item.priceRangeFilter
      );
      return priceItem;
    });
  }
  return itemsArray;
};
