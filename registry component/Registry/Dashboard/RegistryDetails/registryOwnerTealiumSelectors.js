import { pathOr, isEmpty } from 'lodash/fp';
import { isBrowser } from '@bbb-app/utils/common';
import { getAllUrlParams } from '@bbb-app/tealium/tagSelectors/utils';
import {
  NON_SEARCH,
  NON_CROSSELL_PAGE,
  NON_INTERNAL_CAMPAIGN,
  NON_BROWSE,
} from '@bbb-app/tealium/constants';
import { getRegistryDataTags } from './registryOwnerTealiumHelpers';
function getProductInfo(
  registryOwnerCategoryList,
  productCatName,
  productId,
  productSkuId,
  productSkuName
) {
  const categoryBuckets = registryOwnerCategoryList;
  for (let i = 0; i < categoryBuckets.length; i += 1) {
    productCatName.push(categoryBuckets[i].displayName);
    const items = categoryBuckets[i] && categoryBuckets[i].registryItemList;
    for (let k = 0; k < items.length; k += 1) {
      productId.push(items[k].sKUDetailVO.parentProdId);
      productSkuId.push(items[k].sKUDetailVO.skuId);
      productSkuName.push(items[k].sKUDetailVO.displayName);
    }
  }
}
const getProductFindingMethod = pathName => {
  let productFindingMethod = 'viewRegistryOwner/home';
  if (pathName.includes('viewRegistryOwner/home')) {
    productFindingMethod = 'Registry';
  }
  if (pathName.includes('viewRegistryOwner/myItems')) {
    productFindingMethod = 'Registry';
    return productFindingMethod;
  }
  if (pathName.includes('viewRegistryOwner/tym')) {
    productFindingMethod = 'Registry';
    return productFindingMethod;
  }
  if (pathName.includes('viewRegistryOwner/recommendation')) {
    productFindingMethod = 'Registry';
    return productFindingMethod;
  }
  return productFindingMethod;
};
export const getRegistryTeamliumInfo = (
  registryData,
  registryOwnerCategoryList,
  checkListData,
  thankYouListSurpriseData,
  routeData,
  registryTabName
) => {
  let tealiumRegistryTags = {};
  const productId = [];
  const productSkuId = [];
  const productSkuName = [];
  const productCatName = [];
  const defaultPathname = pathOr(
    '',
    'locationBeforeTransitions.pathname',
    routeData
  );
  const pathName = pathOr(
    defaultPathname,
    'locationBeforeTransitions.location.pathname',
    routeData
  );

  if (registryData) {
    if (registryOwnerCategoryList) {
      getProductInfo(
        registryOwnerCategoryList,
        productCatName,
        productId,
        productSkuId,
        productSkuName
      );
    }
    const registryTags = getRegistryDataTags(
      registryData,
      thankYouListSurpriseData
    );

    let productFindingMethod = getProductFindingMethod(pathName);
    let internalCampaign = '';
    const url = isBrowser() && window.location.href;
    if (!isEmpty(url) && url.includes('icid')) {
      productFindingMethod = 'internal campaign';
      internalCampaign = getAllUrlParams(url).icid;
    }
    tealiumRegistryTags = {
      registry_checklist_completion: pathOr(
        '',
        'averageC1Percentage',
        checkListData
      ),
      Registrant_FilterSort:
        'status=all | price=all | categories=all | sort=recommended',
      pagename_breadcrumb: 'Registry View Page',
      navigation_path: 'Registry',
      channel: 'Registry',
      content_pagetype: '',
      product_pagetype: '',
      product_id: [],
      product_sku_id: [],
      product_sku_name: productSkuName,
      subnavigation_path: 'Registry',
      product_finding_method: productFindingMethod,
      internal_search_term: NON_SEARCH,
      crossell_page: NON_CROSSELL_PAGE,
      crossell_product: NON_CROSSELL_PAGE,
      product_category: productCatName,
      product_subcategory: [],
      product_sub_sub_category: [],
      internal_campaign: internalCampaign || NON_INTERNAL_CAMPAIGN,
      merchandising_main_level: NON_BROWSE,
      merchandising_category: NON_BROWSE,
      merchandising_subcategory: NON_BROWSE,
      ...registryTags,
    };
    if (pathName.includes('myItems')) {
      tealiumRegistryTags = Object.assign({}, tealiumRegistryTags, {
        registry_tab_name: registryTabName,
      });
    }
  }

  return tealiumRegistryTags;
};
