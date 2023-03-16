import { isEmpty } from 'lodash';

export const returnFilteredItemsCount = (itemsArray, filter) => {
  let filterQtyValue = 0;
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
      dataItemsArray = itemsObjArr.filter(item => {
        return !isEmpty(item);
      });
      break;
  }
  const filteredItemsCount = filterQtyValue || dataItemsArray.length;
  return filteredItemsCount;
};

export const returnFirstCategoryItemCount = itemsArray => {
  const categoryItems = [];
  /* istanbul ignore else  */
  if (itemsArray && itemsArray.length > 0) {
    if (itemsArray[0].items) {
      categoryItems.push(itemsArray[0].items);
    } else {
      categoryItems.push(itemsArray[0].registryItemList);
    }
  }
  const itemsObjArr = [];
  categoryItems.forEach(elem => {
    /* istanbul ignore else  */
    if (!isEmpty(elem)) {
      elem.forEach(el => {
        itemsObjArr.push(el);
      });
    }
  });
  return itemsObjArr.length;
};
