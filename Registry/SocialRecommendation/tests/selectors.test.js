import { fromJS } from 'immutable';

import { getViewportSiteConfig } from '../selectors';

describe('#selectors', () => {
  const mockedState = fromJS({
    viewportConfig: {
      siteId: 'BBB',
    },
  });
  it('should select viewPortConfig', () => {
    expect(getViewportSiteConfig(mockedState)).to.deep.equal(
      fromJS({ siteId: 'BBB' })
    );
  });
});
