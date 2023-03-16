import tymTabTealium from '../tymTabTealium';
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
} from '../constants';

describe(__filename, () => {
  const registryId = '520648448';
  const eventType = 'Wedding';

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
    registryId,
    registryType: eventType,
    registry_tab_name: 'Thank You List',
  };

  it('should return tealiumdataObject in output', () => {
    expect(tymTabTealium(registryId, eventType)).to.deep.equal(
      tealiumConstants
    );
  });
});
