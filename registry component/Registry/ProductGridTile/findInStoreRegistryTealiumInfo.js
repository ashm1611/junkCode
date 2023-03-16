import pathOr from 'lodash/fp/pathOr';

const PAGE_NAME = 'find in store';
const PAGENAME_BREADCRUMB = 'Registry View Page';
const PAGE_TYPE = 'Registry';
export const getSelectorDerivedTealiumTags = (
  interactiveCheckList,
  favoriteStore
) => {
  let favStoreID = pathOr('', 'userSiteItems.favouriteStoreId', favoriteStore);
  favStoreID = favStoreID === null ? '' : favStoreID;
  const selectorDerivedTealiumTags = {
    favorite_store_id: favStoreID,
  };
  return selectorDerivedTealiumTags;
};

export const getProductTealiumTags = tealiumProductProps => {
  if (tealiumProductProps && tealiumProductProps.sKUDetailVO) {
    const skuDetail = tealiumProductProps.sKUDetailVO;
    const productTealiumTags = {
      category_id: tealiumProductProps.catId,
      product_id: [`${skuDetail.parentProdId}`],
      product_sku_id: [`${skuDetail.skuId}`],
      product_sku_name: [`${skuDetail.displayName}`],
      product_image_url: [`${tealiumProductProps.imageURL}`],
      product_image_name: [`${tealiumProductProps.imageTitle}`],
      product_price: [`${tealiumProductProps.price}`],
      product_quantity: [`${tealiumProductProps.quantity}`],
      product_sub_sub_category: [],
      product_subcategory: [],
      product_name: [`${skuDetail.displayName}`],
      product_url: [`${tealiumProductProps.productURL}`],
      brand_id: [],
      brand_name: [],
      customer_postal_code: tealiumProductProps.customerpostalCode,
    };
    return productTealiumTags;
  }
  return null;
};

export const getStaticTealiumTags = () => {
  const tealiumStaticTags = {
    page_name: PAGE_NAME,
    page_type: PAGE_TYPE,
    pagename_breadcrumb: PAGENAME_BREADCRUMB,
  };
  return tealiumStaticTags;
};

export const findInStoreRegistryTealiumInfo = (
  registryData,
  interactiveCheckList,
  favoriteStore,
  qtyRequested,
  qtyPurchased,
  tealiumProductProps
) => {
  const productTealiumTags = getProductTealiumTags(tealiumProductProps);
  const staticTags = getStaticTealiumTags();
  const selectorDerivedTealiumTags = getSelectorDerivedTealiumTags(
    interactiveCheckList,
    favoriteStore
  );

  return Object.assign(
    {},
    productTealiumTags,
    staticTags,
    selectorDerivedTealiumTags
  );
};

export default findInStoreRegistryTealiumInfo;
