import downloadTYMListTealium from '../tymDownloadTealiumInfo';
import {
  LINK_LOCATION_NAME_DOWNLOAD_TYL,
  LINK_NAME_DOWNLOAD_TYL,
  PAGENAME_BREADCRUMB_DOWNLOAD_TYL,
} from '../constants';
describe('downloadTYMListTealium', () => {
  const tealiumConstants = {
    link_location_name: LINK_LOCATION_NAME_DOWNLOAD_TYL,
    link_name: LINK_NAME_DOWNLOAD_TYL,
    pagename_breadcrumb: PAGENAME_BREADCRUMB_DOWNLOAD_TYL,
  };

  it('should return tealiumdataObject in output', () => {
    expect(downloadTYMListTealium()).to.deep.equal(tealiumConstants);
  });
});
