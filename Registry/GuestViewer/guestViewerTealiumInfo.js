import pathOr from 'lodash/fp/pathOr';
import Immutable from 'immutable';
import { getCookie } from '@bbb-app/utils/universalCookie';
import { getPersonalizationFromCustCodes } from '@bbb-app/tealium/tagSelectors/utils';

let custCodes = [];

const isProductPersonalized = (items, k) => {
  return items[k].sKUDetailVO.personalizationType === 'N' ||
    !items[k].sKUDetailVO.personalizationType
    ? 'false'
    : 'true';
};
const productPersonalizeType = (items, k) => {
  const item = items[k];
  return getPersonalizationFromCustCodes(
    item.personalisedCode,
    custCodes,
    isProductPersonalized(items, k)
  );
};
const productLOS = (items, k) => {
  return items[k].ltlShipMethodDesc ? items[k].ltlShipMethodDesc : '';
};

const productStockStatus = (items, k) => {
  return items[k].sKUDetailVO.skuInStock ? 'in stock' : 'out of stock';
};

const getProductInfoByCat = itemsData => {
  const productId = [];
  const productSkuId = [];
  const productSkuName = [];
  const productURL = [];
  const productImageName = [];
  const productImageUrl = [];
  const productPrice = [];
  const productQuantity = [];
  const productHasPersonalization = [];
  const personalizationType = [];
  const ltlItem = [];
  const categoryBuckets = Immutable.Iterable.isIterable(itemsData)
    ? itemsData.toJS()
    : {};
  const inventoryStatus = [];
  const levelOfService = [];

  for (let i = 0; i < categoryBuckets.length; i += 1) {
    const items =
      categoryBuckets[i] && categoryBuckets[i].registryItemList
        ? categoryBuckets[i].registryItemList
        : /* istanbul ignore next */ {};
    for (let k = 0; k < items.length; k += 1) {
      productId.push(items[k].sKUDetailVO.parentProdId);
      productSkuId.push(items[k].sKUDetailVO.skuId);
      productSkuName.push(items[k].sKUDetailVO.displayName);
      productURL.push(items[k].productURL);
      productImageName.push(items[k].sKUDetailVO.displayName);
      productImageUrl.push(items[k].sKUDetailVO.skuImages.mediumImage);
      productPrice.push(items[k].priceVal);
      productQuantity.push(items[k].qtyRequested);
      productHasPersonalization.push(isProductPersonalized(items, k));
      personalizationType.push(productPersonalizeType(items, k));
      ltlItem.push(items[k].sKUDetailVO.ltlItem);
      inventoryStatus.push(productStockStatus(items, k));
      levelOfService.push(productLOS(items, k));
    }
  }

  return {
    productId,
    productSkuName,
    productSkuId,
    productURL,
    productImageName,
    productImageUrl,
    productPrice,
    productQuantity,
    productHasPersonalization,
    personalizationType,
    ltlItem,
    inventoryStatus,
    levelOfService,
  };
};
const getProductInfoByDate = itemsData => {
  const productId = [];
  const productSkuId = [];
  const productSkuName = [];
  const productURL = [];
  const productImageName = [];
  const productImageUrl = [];
  const productPrice = [];
  const productQuantity = [];
  const productHasPersonalization = [];
  const personalizationType = [];
  const ltlItem = [];
  const categoryBuckets = Immutable.Iterable.isIterable(itemsData)
    ? itemsData.toJS()
    : {};
  const inventoryStatus = [];
  const levelOfService = [];

  for (let i = 0; i < categoryBuckets.length; i += 1) {
    const items =
      categoryBuckets[i] && categoryBuckets[i].registryItemList
        ? categoryBuckets[i].registryItemList
        : /* istanbul ignore next */ {};
    for (let k = 0; k < items.length; k += 1) {
      productId.push(items[k].sKUDetailVO.parentProdId);
      productSkuId.push(items[k].sKUDetailVO.skuId);
      productSkuName.push(items[k].sKUDetailVO.displayName);
      productURL.push(items[k].productURL);
      productImageName.push(items[k].sKUDetailVO.displayName);
      productImageUrl.push(items[k].sKUDetailVO.skuImages.mediumImage);
      productPrice.push(items[k].priceVal);
      productQuantity.push(items[k].qtyRequested);
      productHasPersonalization.push(isProductPersonalized(items, k));
      personalizationType.push(productPersonalizeType(items, k));
      ltlItem.push(items[k].sKUDetailVO.ltlItem);
      inventoryStatus.push(productStockStatus(items, k));
      levelOfService.push(productLOS(items, k));
    }
  }

  return {
    productId,
    productSkuName,
    productSkuId,
    productURL,
    productImageName,
    productImageUrl,
    productPrice,
    productQuantity,
    productHasPersonalization,
    personalizationType,
    ltlItem,
    inventoryStatus,
    levelOfService,
  };
};
const getProductInfoByPrice = itemsData => {
  const productId = [];
  const productSkuId = [];
  const productSkuName = [];
  const productURL = [];
  const productImageName = [];
  const productImageUrl = [];
  const productPrice = [];
  const productQuantity = [];
  const productHasPersonalization = [];
  const personalizationType = [];
  const ltlItem = [];
  const { inStockCategoryBuckets } = itemsData || /* istanbul ignore next */ {};
  const inventoryStatus = [];
  const levelOfService = [];

  for (let i = 0; i < inStockCategoryBuckets.length; i += 1) {
    const items =
      inStockCategoryBuckets[i] && inStockCategoryBuckets[i].items
        ? inStockCategoryBuckets[i].items
        : {};
    for (let k = 0; k < items.length; k += 1) {
      productId.push(items[k].sKUDetailVO.parentProdId);
      productSkuId.push(items[k].sKUDetailVO.skuId);
      productSkuName.push(items[k].sKUDetailVO.displayName);
      productURL.push(items[k].productURL);
      productImageName.push(items[k].sKUDetailVO.displayName);
      productImageUrl.push(items[k].sKUDetailVO.skuImages.mediumImage);
      productPrice.push(items[k].priceVal);
      productQuantity.push(items[k].qtyRequested);
      productHasPersonalization.push(isProductPersonalized(items, k));
      personalizationType.push(productPersonalizeType(items, k));
      ltlItem.push(items[k].sKUDetailVO.ltlItem);
      inventoryStatus.push(productStockStatus(items, k));
      levelOfService.push(productLOS(items, k));
    }
  }

  return {
    productId,
    productSkuName,
    productSkuId,
    productURL,
    productImageName,
    productImageUrl,
    productPrice,
    productQuantity,
    productHasPersonalization,
    personalizationType,
    ltlItem,
    inventoryStatus,
    levelOfService,
  };
};
const getRegistryInfo = registryInfo => {
  return {
    registry_checklist_completion: '',
    registry_event_date: pathOr(
      '',
      'registryResVO.registrySummaryVO.eventDate',
      registryInfo
    ),
    registry_favorite_categories_id: pathOr(
      [],
      'favouriteCategoryIdList',
      registryInfo
    ),
    registry_favorite_categories_name: pathOr(
      [],
      'favouriteCategoryNameList',
      registryInfo
    ),
    shower_celebration_date: pathOr(
      '',
      'registryResVO.registrySummaryVO.eventVO.showerDateObject.time',
      registryInfo
    ),
    registry_type:
      pathOr(
        '',
        'registryResVO.registrySummaryVO.registryType.registryTypeDesc',
        registryInfo
      ) ||
      pathOr('', 'registryResVO.registrySummaryVO.eventType', registryInfo),
    registry_total_value: '',
    registry_total_items: pathOr(
      '',
      'registryResVO.registrySummaryVO.giftRegistered',
      registryInfo
    ),
    registry_purchased: pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeDesc',
      registryInfo
    ),
    registry_product_name_count_requested: [],
    registry_product_name_count_purchased: '',
    registry_id: pathOr(
      '',
      'registryResVO.registrySummaryVO.registryId',
      registryInfo
    ),
    registry_add_location: 'Registry',
    registrants_name: `${pathOr(
      '',
      'registryResVO.registrySummaryVO.primaryRegistrantFirstName',
      registryInfo
    )} ${pathOr(
      '',
      'registryResVO.registrySummaryVO.primaryRegistrantLastName',
      registryInfo
    )}`,
  };
};
export const gvTealiumInfo = (
  itemsData,
  akamiaInfo,
  favStoreInfo,
  registryInfo,
  sortOption,
  miniCart,
  customizationCodes
) => {
  custCodes = [];
  custCodes = customizationCodes;
  let productInfo = {};
  if (sortOption === '1') {
    productInfo = getProductInfoByCat(itemsData);
  }
  if (sortOption === '2') {
    productInfo = getProductInfoByPrice(itemsData);
  }
  if (sortOption === '3') {
    productInfo = getProductInfoByDate(itemsData);
  }
  const registryTagInfo = getRegistryInfo(registryInfo);

  return Object.assign(
    {},
    {
      category_id: '',
      product_sub_sub_category: [],
      product_subcategory: [],

      pagename_breadcrumb: 'Registry View Page',
      page_name: 'add to registry',
      page_type: 'Registry',
      level_of_service: productInfo.levelOfService,
      inventory_status: productInfo.inventoryStatus,
      customer_postal_code: akamiaInfo.customer_postal_code,
      favorite_store_id: favStoreInfo.favorite_store_id,
      product_id: productInfo.productId,
      product_sku_name: productInfo.productSkuName,
      product_sku_id: productInfo.productSkuId,
      product_url: productInfo.productURL,
      product_image_name: productInfo.productImageName,
      product_has_personalization: productInfo.productHasPersonalization,
      personalization_type: productInfo.personalizationType,
      is_ltl_item: productInfo.ltlItem,
      brand_id: [],
      brand_name: [],
      call_to_actiontype: 'add to registry',
      crossell_page: 'non-cross sell',
      crossell_product: 'non-cross sell',
      product_category: [],
      product_image_url: productInfo.productImageUrl,
      product_name: productInfo.productImageName,
      product_price: productInfo.productPrice,
      product_quantity: productInfo.productQuantity,
      remove_global_vars: ['language_code'],
      cart_total_items: getCookie('cartCount') || 0,
      cart_total_value: pathOr(
        '0',
        'atgResponse.orderPriceInfoDisplayVO.formattedTotalAmount',
        miniCart
      ),
      device_fingerprint: '',
      internal_search_term: 'non-search',
      internal_campaign: 'non-internal campaign',
      merchandising_main_level: 'non-browse',
      merchandising_category: 'non-browse',
      merchandising_subcategory: 'non-browse',
      product_finding_method: 'Registry',
    },
    registryTagInfo
  );
};

export default gvTealiumInfo;
