import { fromJS } from 'immutable';
import {
  makeWeddingBookError,
  makeWeddingBookSuccess,
  viewportSiteConfig,
  isMobileStatus,
} from '../selectors';

describe(__filename, () => {
  it('makeWeddingBookError', () => {
    const state = fromJS({
      weddingBookState: {
        isFetching: false,
        data: null,
        error: {},
      },
    });
    const selector = makeWeddingBookError();
    expect(selector(state)).to.be.a('object');
  });

  it('makeWeddingBookSuccess', () => {
    const state = fromJS({
      weddingBookState: {
        isFetching: false,
        data: {},
        error: false,
      },
    });
    const selector = makeWeddingBookSuccess();
    expect(selector(state)).to.be.a('object');
  });
  it('viewportSiteConfig', () => {
    const state = fromJS({
      viewportConfig: {},
    });
    expect(viewportSiteConfig(state)).to.be.a('object');
  });
  it('isMobileStatus', () => {
    const state = fromJS({
      mobileScreen: {
        isMobileScreen: false,
      },
    });
    const selector = isMobileStatus();
    expect(selector(state)).to.be.equal(false);
  });
});
