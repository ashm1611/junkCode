import {
  CHANNEL,
  CROSSSELL_PAGE,
  CROSSSELL_PRODUCT,
  INTERNAL_SEARCH_TERM,
  NAVIGATION_PATH,
  PAGE_FUNCTION,
  PAGENAME_BREADCRUMB,
  PRODUCT_FINDING_METHOD,
  SUBNAVIGATION_PATH,
  THANK_YOU_LIST,
} from './constants';

const tymTabTealium = (registryId, registryType) => {
  const tealiumConstants = {
    channel: CHANNEL,
    crosssell_page: CROSSSELL_PAGE,
    crosssell_product: CROSSSELL_PRODUCT,
    internal_serach_tem: INTERNAL_SEARCH_TERM,
    navigation_path: NAVIGATION_PATH,
    page_function: PAGE_FUNCTION,
    pagename_breadcrumb: PAGENAME_BREADCRUMB,
    product_finding_method: PRODUCT_FINDING_METHOD,
    subnavigation_path: SUBNAVIGATION_PATH,
    content_pagetype: '',
    product_pagetype: '',
    registry_tab_name: THANK_YOU_LIST,
  };

  const tealiumTags = {
    registryId,
    registryType,
    ...tealiumConstants,
  };

  return Object.assign({}, tealiumTags);
};

export default tymTabTealium;
