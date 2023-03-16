export const getFiltersTealiumData = (
  facetId,
  selectedFilters,
  singleSelection,
  selectedCheckboxFilter,
  isOwnerView,
  checkBoxChecked
) => {
  let statusArray = [];
  let priceArray = [];
  let categoriesArray = [];
  let sorting = '';
  let selectedInStoreCheckbox = false;
  let selectedBopisCheckbox = false;
  let status = '';

  // setting up initial values of the variables
  Object.entries(selectedFilters).forEach(([key, value]) => {
    if (key === 'status') {
      statusArray = statusArray.concat(value);
      status = 'Status';
    }
    if (key === 'price') {
      priceArray = priceArray.concat(value);
      status = 'Price';
    }
    if (key === 'categories') {
      categoriesArray = categoriesArray.concat(value);
      status = 'Categories';
    }
    if (key === 'sort') {
      if (value.toString() === 'hightolow') {
        sorting = 'Price: High to Low';
      } else if (value.toString() === 'lowtohigh') {
        sorting = 'Price: Low to High';
      } else {
        sorting = isOwnerView ? 'Recently Added' : 'Recommended';
      }
      status = 'Sort';
    }
  });

  // Setting up values after selection of filters

  if (selectedCheckboxFilter === 'in-stock-online' && !checkBoxChecked) {
    selectedInStoreCheckbox = true;
  }
  if (selectedCheckboxFilter === 'store-pickup' && !checkBoxChecked) {
    selectedBopisCheckbox = true;
  }

  if (facetId === 'status') {
    statusArray = statusArray.concat(singleSelection.label);
    status = 'Status';
  }

  if (facetId === 'price') {
    priceArray = priceArray.concat(singleSelection.label);
    status = 'Price';
  }

  if (facetId === 'categories') {
    categoriesArray = categoriesArray.concat(singleSelection.label);
    status = 'Categories';
  }

  if (facetId === 'sort') {
    if (singleSelection.key === 'lowtohigh') {
      sorting = 'Price: Low to High';
    } else if (singleSelection.key === 'hightolow') {
      sorting = 'Price: High to Low';
    } else {
      sorting = isOwnerView ? 'Recently Added' : 'Recommended';
    }
    status = 'Sort';
  }
  const FilterSort = `status=${
    statusArray.length === 0 ? 'all' : statusArray
  } | price=${priceArray.length === 0 ? 'all' : priceArray} | categories=${
    categoriesArray.length === 0 ? 'all' : categoriesArray
  } | sort=${sorting}`;

  const tealiumTags = isOwnerView
    ? {
        pagename_breadcrumb: 'Registry View Page',
        Registrant_FilterSort: FilterSort,
        filter_location_type: status,
        browse_refine_value: [singleSelection.label],
        browse_refinement_info: `${status} : ${singleSelection &&
          singleSelection.label}`,
        sort_value: sorting,
        registry_add_location: 'Registry Owner',
        crossell_page: 'non-cross sell',
        crossell_product: 'non-cross sell',
        internal_search_term: 'non-search',
        merchandising_category: 'non-browse',
        merchandising_main_level: 'non-browse',
        merchandising_subcategory: 'non-browse',
      }
    : {
        pagename_breadcrumb: 'Registry View Page',
        GiftGiver_FilterSort: `${FilterSort} | instock=${selectedInStoreCheckbox} | storepickup=${selectedBopisCheckbox}`,
        filter_location_type: status,
        browse_refine_value: [singleSelection.label],
        browse_refinement_info: `${status} : ${singleSelection &&
          singleSelection.label}`,
        sort_value: sorting,
        registry_add_location: 'Registry',
        crossell_page: 'non-cross sell',
        crossell_product: 'non-cross sell',
        internal_search_term: 'non-search',
        merchandising_category: 'non-browse',
        merchandising_main_level: 'non-browse',
        merchandising_subcategory: 'non-browse',
      };

  return tealiumTags;
};
