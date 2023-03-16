import { isEmpty, pathOr } from 'lodash/fp';
import { isNull } from '@bbb-app/utils/common';
import consoleLog from '@bbb-app/utils/logger';
import { returnFilteredItemsCount } from '../../../../containers/Pages/Registry/RegistryUtils';

export const OwnerProductGridTileUtil = {
  handleSagaError(error) {
    const message = pathOr(
      null,
      'body.response.data.errorMessages[0].message',
      error
    );
    consoleLog.error(message);
  },
  isAddToCartDisable(
    intlRestricted,
    refNum,
    enableKatori,
    isInternationalUser
  ) {
    // Note: once international customer functionality is implemented
    // than drive this flag from there.
    if (isInternationalUser && (intlRestricted || !isEmpty(refNum))) {
      return true;
    }
    if (!enableKatori && !isEmpty(refNum)) {
      return true;
    }
    return false;
  },
};

export const getPDPURL = (propsObj, stateObj) => {
  const { contextPath, productURL, sKUDetailVO, registryId } = propsObj;
  const { ltlDeliveryServices } = stateObj;
  const queryDelimiter = '?';
  let chkForSku = -1;
  if (!isNull(productURL) && typeof productURL !== 'undefined') {
    chkForSku = productURL.indexOf('skuId');
  }
  let PDP_URL = '';
  PDP_URL =
    chkForSku !== -1
      ? `${contextPath}${productURL}&registryId=${registryId}`
      : `${contextPath}${productURL}${queryDelimiter}skuId=${sKUDetailVO.skuId}&registryId=${registryId}`;
  /* istanbul ignore if */
  if (ltlDeliveryServices) {
    PDP_URL += `&sopt=${ltlDeliveryServices}`;
  }
  return PDP_URL;
};

export const getFilterCount = propsObj => {
  let itemsArr = [];
  if (
    propsObj.registryOwnerFirstCategoryList &&
    propsObj.registryOwnerFirstCategoryList.categoryBuckets
  ) {
    itemsArr = propsObj.registryOwnerFirstCategoryList.categoryBuckets;
  } else if (propsObj.registryOwnerFirstCategoryList) {
    itemsArr = propsObj.registryOwnerFirstCategoryList;
  }
  const filterCount = returnFilteredItemsCount(itemsArr, propsObj.filter);
  return filterCount;
};

export const renderMustHaveIcons = (isMarked, isBabySite) => {
  const theme = isBabySite ? 'baby' : 'bbb';

  if (isMarked) {
    return `${theme}_must_have`;
  }
  return `${theme}_must_have_white`;
};

export const renderFavIcons = (isMarked, isBabySite) => {
  if (isBabySite) {
    return 'star-double';
  } else if (isMarked) {
    return 'bbb_fav_white';
  }
  return 'bbb_fav';
};
