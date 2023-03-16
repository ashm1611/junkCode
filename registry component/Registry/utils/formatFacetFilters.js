/* LABELS */
const RECENTLY_ADDED_LBL = 'Recently Added';
const RECOMMENDED_LBL = 'Recommended';
const FACET_HIGH_LOW_LBL = 'Price: High to Low';
const FACET_LOW_HIGH_LBL = 'Price: Low to High';
const CATEGORY_FACET_LBL = 'Categories';
const PRICE_FACET_TITLE_LBL = 'Price';
const STATUS_FACET_TITLE_LBL = 'Status';
const SORT_FACET_TITLE_LBL = 'Sort';

export function formatRegistryFacetData({
  statusFilter,
  categoryFilter,
  priceFilter,
  isGiftGiver,
}) {
  const facetFilterData = [];
  // Status Data SetUp
  const statusLabel = STATUS_FACET_TITLE_LBL;
  let facet = statusFilter || [];
  facet.displayName = statusLabel;
  facet.id = 'status';
  facetFilterData.push(getFacetsData(facet));

  // Price Data SetUp
  facet = priceFilter || [];
  facet.displayName = PRICE_FACET_TITLE_LBL;
  facet.id = 'price';
  facetFilterData.push(getFacetsData(facet));

  // category Data SetUp
  facet = categoryFilter || [];
  facet.displayName = CATEGORY_FACET_LBL;
  facet.id = 'categories';
  facetFilterData.push(getFacetsData(facet));

  const facetRecommended = isGiftGiver ? RECOMMENDED_LBL : RECENTLY_ADDED_LBL;
  facet = [];
  facet.push({ label: facetRecommended, type: 'single', key: 'recommended' });
  facet.push({ label: FACET_LOW_HIGH_LBL, type: 'single', key: 'lowtohigh' });
  facet.push({ label: FACET_HIGH_LOW_LBL, type: 'single', key: 'hightolow' });
  facet.displayName = SORT_FACET_TITLE_LBL;
  facet.id = 'sort';
  facetFilterData.push(getFacetsData(facet, true));
  return facetFilterData;
}

function getFacetsData(facet, isSort) {
  try {
    return {
      id: facet.id,
      displayName: facet.displayName,
      type: facet.type,
      items: facet.map(val => {
        const key = isSort ? val.key : val.label;
        return {
          ...val,
          key,
          selected: false,
          singleSelection: false,
          id: facet.id,
        };
      }),
    };
  } catch (error) {
    return { '': '' };
  }
}

export function updateFacetFiterData(
  registryFacetsFilter,
  { statusFilterData, priceFilterData, categoryFilterData }
) {
  const registryCurrentFacetFilet = [...registryFacetsFilter];
  const statusUpdatedData = formatRegistryFacetData({
    statusFilter: statusFilterData,
    priceFilter: priceFilterData,
    categoryFilter: categoryFilterData,
  });
  if (statusUpdatedData[0].items.length > 0)
    registryCurrentFacetFilet[0] = statusUpdatedData[0];
  if (statusUpdatedData[1].items.length > 0)
    registryCurrentFacetFilet[1] = statusUpdatedData[1];
  if (statusUpdatedData[2].items.length > 0)
    registryCurrentFacetFilet[2] = statusUpdatedData[2];
  return registryCurrentFacetFilet;
}
