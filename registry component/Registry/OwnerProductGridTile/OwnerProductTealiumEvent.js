import {
  NON_BROWSE,
  NON_CROSSELL_PAGE,
  NON_SEARCH,
} from '@bbb-app/tealium/constants';
import { getProductFindingMethod } from '@bbb-app/tealium/tagSelectors/utils';
import { addToCartRegistryTealiumInfo } from '../ProductGridTile/addToCartRegistryTealiumInfo';
import {
  PAGE_TYPE,
  BREADCRUMB,
  PRODUCT_FINDING_METHOD,
  LINK_LOCATION_NAME,
  ITEM_REMOVAL_CONFIRMATION,
} from './constants';
import { getGroupGiftingTealiumData } from '../GroupGifting/GroupGiftingTealium';
const removevariable = [
  'brand_id',
  'brand_name',
  'cart_add_location',
  'category_id',
  'country_code',
  'customer_city',
  'customer_name',
  'customer_postal_code',
  'customer_state',
  'department_name',
  'favorite_store_id',
  'inventory_status',
  'is_ltl_item',
  'language_code',
  'level_of_service',
  'personalization_type',
  'product_has_personalization',
  'product_image_name',
  'product_image_url',
  'product_sku_name',
  'product_sub_sub_category',
  'product_subcategory',
  'product_url',
  'registrants_name',
  'registry_add_location',
  'registry_checklist_completion',
  'registry_event_date',
  'registry_favorite_categories_id',
  'registry_favorite_categories_name',
  'registry_product_name_count_purchased',
  'registry_product_name_count_requested',
  'registry_purchased',
  'registry_total_items',
  'registry_total_value',
  'shower_celebration_date',
];

const updateQuantityRemovevariable = [
  'brand_id',
  'brand_name',
  'cart_add_location',
  'category_id',
  'country_code',
  'customer_city',
  'customer_name',
  'customer_postal_code',
  'customer_state',
  'department_name',
  'favorite_store_id',
  'inventory_status',
  'is_ltl_item',
  'language_code',
  'level_of_service',
  'personalization_type',
  'product_has_personalization',
  'product_image_name',
  'product_image_url',
  'product_sub_sub_category',
  'product_subcategory',
  'product_url',
  'page_name',
];

export const removeExtraVariable = (obj, prop) => {
  // eslint-disable-next-line no-restricted-syntax, no-param-reassign, guard-for-in
  for (const p in prop) {
    if (prop[p] in obj) {
      // eslint-disable-next-line no-restricted-syntax, no-param-reassign, guard-for-in
      delete obj[prop[p]];
    }
  }
  return obj;
};

export const getTealiumData = (sKUDetailVO, tealiumVariable) => {
  const tealiumProductProps = {
    sKUDetailVO,
    productURL: tealiumVariable.productURL,
    price: tealiumVariable.price,
    catId: tealiumVariable.jdaCatId,
    imageTitle: tealiumVariable.displayTitle,
    levelOfService: tealiumVariable.ltlShipMethodDesc,
    imageURL: tealiumVariable.imageURL,
    quantity: tealiumVariable.qtyRequested,
    personalisedCode: tealiumVariable.personalisedCode,
  };
  let registryQuantityTealiumInfo = {};

  if (tealiumVariable.tealiumData) {
    registryQuantityTealiumInfo = addToCartRegistryTealiumInfo(
      tealiumVariable.tealiumData,
      tealiumVariable.favoriteStore,
      tealiumVariable.qtyRequested,
      tealiumVariable.qtyPurchased,
      tealiumProductProps,
      true
    );
  }
  return registryQuantityTealiumInfo;
};

export const getRemoveTealiumData = (
  sKUDetailVO,
  tealiumVariable,
  ggEligibleItem,
  amountFulfilled,
  eventType,
  registryId
) => {
  let GGTealiumVars;
  if (ggEligibleItem && amountFulfilled > 0) {
    const skuId = sKUDetailVO.skuId;
    const productId = sKUDetailVO.parentProdId;
    GGTealiumVars = getGroupGiftingTealiumData({
      reg_groupgift_delete: true,
      registry_id: [registryId],
      registry_type: [eventType],
      product_sku_id: [skuId],
      product_id: [productId],
      page_name: ITEM_REMOVAL_CONFIRMATION,
      pagename_breadcrumb: ITEM_REMOVAL_CONFIRMATION,
    });
  }
  const tealiumProductProps = {
    sKUDetailVO,
    productURL: tealiumVariable.productURL,
    price: tealiumVariable.price,
    catId: tealiumVariable.jdaCatId,
    imageTitle: tealiumVariable.displayTitle,
    levelOfService: tealiumVariable.ltlShipMethodDesc,
    imageURL: tealiumVariable.imageURL,
    quantity: tealiumVariable.qtyRequested,
  };
  let registryQuantityTealiumInfo = {};

  if (tealiumVariable.tealiumData) {
    registryQuantityTealiumInfo = addToCartRegistryTealiumInfo(
      tealiumVariable.tealiumData,
      tealiumVariable.favoriteStore,
      tealiumVariable.qtyRequested,
      tealiumVariable.qtyPurchased,
      tealiumProductProps
    );
  }
  const registryTealiumInfo = removeExtraVariable(
    registryQuantityTealiumInfo,
    removevariable
  );
  return Object.assign({}, registryTealiumInfo, GGTealiumVars, {
    remove_global_vars: [
      'country_code',
      'customer_city',
      'customer_email',
      'customer_email_md5_hash',
      'customer_email_sha256_hash',
      'customer_name',
      'customer_state',
      'language_code',
    ],
  });
};

export const getWritereviewTealiumData = (sKUDetailVO, tealiumVariable) => {
  const tealiumProductProps = {
    product_price: [tealiumVariable.price],
    product_quantity: [tealiumVariable.qtyRequested],
    link_location_name: LINK_LOCATION_NAME,
    pagename_breadcrumb: BREADCRUMB,
    page_type: PAGE_TYPE,
    product_name: [sKUDetailVO.displayName],
  };
  const registryQuantityTealiumInfo = {};

  return Object.assign({}, registryQuantityTealiumInfo, tealiumProductProps);
};

export const getFavTealiumData = (registryId, eventType, skuInfo) => {
  const prodID = [];
  const prodSkuID = [];
  const intCamp = getProductFindingMethod();
  if (skuInfo.parentProdId) {
    prodID.push(skuInfo.parentProdId);
  }
  if (skuInfo.skuId) {
    prodSkuID.push(skuInfo.skuId);
  }
  const tealiumVariable = {
    call_to_actiontype: 'add to favorites',
    crossell_page: NON_CROSSELL_PAGE,
    crossell_product: NON_CROSSELL_PAGE,
    internal_search_term: NON_SEARCH,
    merchandising_category: NON_BROWSE,
    merchandising_main_level: NON_BROWSE,
    merchandising_subcategory: NON_BROWSE,
    pagename_breadcrumb: `registry product flyout for registrants: ${skuInfo.displayName}`,
    product_id: prodID,
    product_sku_id: prodSkuID,
    internal_campaign: intCamp.internalCampaign,
    product_finding_method: PRODUCT_FINDING_METHOD,
    registry_id: registryId || '',
    registry_type: eventType || '',
  };
  return tealiumVariable;
};

export const updateQuantityData = (
  tealiumData,
  favoriteStore,
  qtyRequested,
  qtyPurchased,
  tealiumProductProps
) => {
  const cartVariable = {
    cart_total_items: '',
    cart_total_value: '',
    call_to_actiontype: 'Reg_Mark_As_Purchased',
    page_name: 'update Quantity',
  };

  let registryQuantityTealiumInfo = {};
  if (tealiumData) {
    registryQuantityTealiumInfo = addToCartRegistryTealiumInfo(
      tealiumData,
      favoriteStore,
      qtyRequested,
      qtyPurchased,
      tealiumProductProps
    );
  }
  const registryTealiumInfo = removeExtraVariable(
    registryQuantityTealiumInfo,
    updateQuantityRemovevariable
  );

  const intCamp = getProductFindingMethod();
  registryTealiumInfo.internal_campaign = intCamp.internalCampaign;

  return Object.assign({}, registryTealiumInfo, cartVariable);
};
