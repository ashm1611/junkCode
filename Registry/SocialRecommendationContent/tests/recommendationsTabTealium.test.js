import recommendationsTabTealium from '../recommendationsTabTealium';
import {
  CHANNEL,
  CROSSSELL_PAGE,
  CROSSSELL_PRODUCT,
  INTERNAL_SEARCH_TERM,
  NAVIGATION_PATH,
  PAGE_FUNCTION,
  PAGENAME_BREADCRUMB,
  SUBNAVIGATION_PATH,
} from '../../ThankYouManager/constants';

import { PRODUCT_FINDING_METHOD } from '../constants';

describe('get recommendation Tab click Tealium', () => {
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
  };

  it('should return tealiumdataObject in output', () => {
    expect(recommendationsTabTealium(registryId, eventType)).to.deep.equal(
      tealiumConstants
    );
  });
});
