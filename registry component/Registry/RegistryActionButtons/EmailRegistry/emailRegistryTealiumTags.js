import { PAGENAME_BREADCRUMB, TEALIUM_PAGE_INFO } from './constants';

export const emailRegistryTealiumTags = registrySummaryVO => {
  const registryID = registrySummaryVO && registrySummaryVO.registryId;
  const eventType = registrySummaryVO && registrySummaryVO.eventType;
  const tealiumData = {
    pagename_breadcrumb: PAGENAME_BREADCRUMB,
    registry_id: registryID,
    registry_type: eventType,
    page_name: TEALIUM_PAGE_INFO,
  };
  return tealiumData;
};

export default emailRegistryTealiumTags;
