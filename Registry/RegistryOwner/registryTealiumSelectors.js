import pathOr from 'lodash/fp/pathOr';
import {
  NON_BROWSE,
  NON_CROSSELL_PAGE,
  NON_INTERNAL_CAMPAIGN,
  NON_SEARCH,
} from '@bbb-app/tealium/constants';
import { PRODUCT_FINDING_METHOD } from './constants';
import { getRegistryDataTags } from './registryOwnerTealiumHelper';
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
    const items =
      categoryBuckets[i] && categoryBuckets[i].registryItemList
        ? categoryBuckets[i].registryItemList
        : {};
    for (let k = 0; k < items.length; k += 1) {
      productId.push(items[k].sKUDetailVO.parentProdId);
      productSkuId.push(items[k].sKUDetailVO.skuId);
      productSkuName.push(items[k].sKUDetailVO.displayName);
    }
  }
}
export const getRegistryTeamliumInfo = (
  registryData,
  registryOwnerCategoryList,
  checkListData,
  thankYouListSurpriseData
) => {
  let tealiumRegistryTags = {};
  const productId = [];
  const productSkuId = [];
  const productSkuName = [];
  const productCatName = [];

  if (registryData) {
    /* istanbul ignore else  */
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
    tealiumRegistryTags = {
      registry_checklist_completion: pathOr(
        '',
        'averageC1Percentage',
        checkListData
      ),

      pagename_breadcrumb: 'Registry View Page',
      navigation_path: 'Registry',
      channel: 'Registry',
      content_pagetype: '',
      product_pagetype: '',
      product_id: productId,
      product_sku_id: productSkuId,
      product_sku_name: productSkuName,
      subnavigation_path: 'Registry',
      product_finding_method: PRODUCT_FINDING_METHOD,
      internal_search_term: NON_SEARCH,
      crossell_page: NON_CROSSELL_PAGE,
      crossell_product: NON_CROSSELL_PAGE,
      product_category: productCatName,
      product_subcategory: [],
      product_sub_sub_category: [],
      internal_campaign: NON_INTERNAL_CAMPAIGN,
      merchandising_main_level: NON_BROWSE,
      merchandising_category: NON_BROWSE,
      merchandising_subcategory: NON_BROWSE,
      ...registryTags,
    };
  }

  return tealiumRegistryTags;
};
