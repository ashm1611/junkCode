import { FEO_SITE_INDICATOR } from '@bbb-app/tealium/constants';
import {
  LINK_LOCATION_NAME_INVITE_BTN,
  LINK_NAME_INVITE_BTN,
  PAGENAME_BREADCRUMB_INVITE_BTN,
} from './constants';

function inviteFriendTealiumInfo() {
  const CALL_TO_ACTIONTYPE = 'invite now';
  const tealiumConstants = {
    link_location_name: LINK_LOCATION_NAME_INVITE_BTN,
    link_name: LINK_NAME_INVITE_BTN,
    pagename_breadcrumb: PAGENAME_BREADCRUMB_INVITE_BTN,
    content_pagetype: '',
    product_pagetype: '',
    call_to_actiontype: CALL_TO_ACTIONTYPE,
    feo_site_indicator: FEO_SITE_INDICATOR,
    page_name: 'invite now',
    page_type: 'Registry',
  };

  return Object.assign({}, tealiumConstants);
}

export default inviteFriendTealiumInfo;
