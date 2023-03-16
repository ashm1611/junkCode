import { OUT_OF_STOCK, IN_STOCK } from '@bbb-app/tealium/constants';
import { getPersonalizationFromCustCodes } from '@bbb-app/tealium/tagSelectors/utils';
import { getStaticTealiumTags } from '@bbb-app/tealium/staticTealiumTags';
const FINDING_METHOD = 'Registry';
const PAGE_NAME = 'add to cart';
const CART_ADD_LOCATION = 'Registry';
const PAGENAME_BREADCRUMB = 'Registry View Page';

export const getSelectorDerivedTealiumTags = (
  interactiveCheckList,
  favoriteStore,
  akamaiData
) => {
  const favStoreID =
    favoriteStore && favoriteStore.userSiteItems
      ? favoriteStore.userSiteItems.favouriteStoreId
      : '';
  const postalCode = akamaiData ? akamaiData.zip : '';
  const selectorDerivedTealiumTags = {
    registry_checklist_completion: interactiveCheckList,
    favorite_store_id: favStoreID,
    customer_postal_code: postalCode,
  };
  return selectorDerivedTealiumTags;
};

export const getProductTealiumTags = (
  tealiumProductProps,
  customizationCodes
) => {
  if (tealiumProductProps && tealiumProductProps.sKUDetailVO) {
    const skuDetail = tealiumProductProps.sKUDetailVO;
    const stockStatus = skuDetail.skuInStock ? IN_STOCK : OUT_OF_STOCK;
    const isPersonalized = !!(
      skuDetail.customizationOffered && skuDetail.personalizationType !== 'N'
    );
    const levelService = tealiumProductProps.levelOfService
      ? tealiumProductProps.levelOfService
      : '';
    const personalizationType = getPersonalizationFromCustCodes(
      tealiumProductProps.personalisedCode,
      customizationCodes,
      isPersonalized
    );
    const productTealiumTags = {
      category_id: tealiumProductProps.catId,
      inventory_status: stockStatus,
      is_ltl_item: skuDetail.ltlItem,
      personalization_type: personalizationType,
      product_has_personalization: isPersonalized,
      product_id: [`${skuDetail.parentProdId}`],
      product_sku_id: [`${skuDetail.skuId}`],
      product_sku_name: [`${skuDetail.displayName}`],
      product_image_url: [`${tealiumProductProps.imageURL}`],
      product_image_name: [`${tealiumProductProps.imageTitle}`],
      product_price: [`${tealiumProductProps.price}`],
      product_quantity: [`${tealiumProductProps.quantity}`],
      product_sub_sub_category: [],
      product_subcategory: [],
      product_category: [],
      product_name: [`${skuDetail.displayName}`],
      product_url: [`${tealiumProductProps.productURL}`],
      brand_id: [],
      brand_name: [],
      level_of_service: levelService,
    };
    return productTealiumTags;
  }
  return null;
};

export const getEventSpecificTags = notRequired => {
  const eventSpecificTags = {
    page_name: PAGE_NAME,
    pagename_breadcrumb: PAGENAME_BREADCRUMB,
    registry_add_location: '',
    cart_add_location: CART_ADD_LOCATION,
  };
  const productFindingMethod = notRequired
    ? {}
    : { product_finding_method: FINDING_METHOD };
  return Object.assign({}, eventSpecificTags, productFindingMethod);
};

export const getRegistryTealiumTags = (
  registryData,
  qtyRequested,
  qtyPurchased
) => {
  if (registryData && registryData.registrySummaryVO) {
    const favCatIds = registryData.favouriteCategoryIdList || [];
    const favCatNames = registryData.favouriteCategoryNameList || [];
    const registrySummaryVO = registryData.registrySummaryVO;

    const registrantName = registrySummaryVO.primaryRegistrantLastName
      ? `${registrySummaryVO.primaryRegistrantFirstName} ${registrySummaryVO.primaryRegistrantLastName}`
      : registrySummaryVO.primaryRegistrantFirstName;

    const registryTealiumTags = {
      registry_favorite_categories_id: favCatIds,
      registry_favorite_categories_name: favCatNames,
      registry_product_name_count_purchased: [`${qtyPurchased}`],
      registry_product_name_count_requested: [`${qtyRequested}`],
      registry_type: registrySummaryVO.eventType,
      shower_celebration_date:
        registrySummaryVO.eventVO && registrySummaryVO.eventVO.showerDateObject
          ? registrySummaryVO.eventVO.showerDateObject.time
          : '',
      registry_total_value: '',
      registry_total_items: registrySummaryVO.giftRegistered,
      registry_purchased: registrySummaryVO.eventType,
      registry_id: registrySummaryVO.registryId,
      registry_event_date: registrySummaryVO.eventDate,
      registrants_name: registrantName,
    };
    return registryTealiumTags;
  }
  return null;
};

export const addToCartRegistryTealiumInfo = (
  tealiumData,
  favoriteStore,
  qtyRequested,
  qtyPurchased,
  tealiumProductProps,
  notRequired
) => {
  const registryTealiumTags = getRegistryTealiumTags(
    tealiumData ? tealiumData.registryData : '',
    qtyRequested,
    qtyPurchased
  );
  const productTealiumTags = getProductTealiumTags(
    tealiumProductProps,
    tealiumData ? tealiumData.customizationCodes : ''
  );
  const staticTags = notRequired ? {} : getStaticTealiumTags();
  const selectorDerivedTealiumTags = getSelectorDerivedTealiumTags(
    tealiumData ? tealiumData.interactiveCheckList : '',
    favoriteStore,
    tealiumData ? tealiumData.akamaiData : ''
  );
  const eventSpecificTags = getEventSpecificTags(notRequired);

  return Object.assign(
    {},
    registryTealiumTags,
    productTealiumTags,
    staticTags,
    selectorDerivedTealiumTags,
    eventSpecificTags
  );
};

export default addToCartRegistryTealiumInfo;
