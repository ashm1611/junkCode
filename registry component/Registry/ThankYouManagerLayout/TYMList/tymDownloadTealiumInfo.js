import {
  LINK_LOCATION_NAME_DOWNLOAD_TYL,
  LINK_NAME_DOWNLOAD_TYL,
  PAGENAME_BREADCRUMB_DOWNLOAD_TYL,
} from './constants';

function tymDownloadTealiumInfo() {
  const tealiumConstants = {
    link_location_name: LINK_LOCATION_NAME_DOWNLOAD_TYL,
    link_name: LINK_NAME_DOWNLOAD_TYL,
    pagename_breadcrumb: PAGENAME_BREADCRUMB_DOWNLOAD_TYL,
  };

  return Object.assign({}, tealiumConstants);
}

export default tymDownloadTealiumInfo;
