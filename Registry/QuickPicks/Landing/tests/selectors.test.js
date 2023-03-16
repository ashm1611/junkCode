import { fromJS } from 'immutable';
import { LABELS_STATE_KEY } from '@bbb-app/constants/appConstants';
import { STATIC_PAGES_KEY } from '@bbb-app/redux/labels/constants';
import {
  configState,
  contentSelector,
  isLoggedInSelector,
  registryQuickPicksLandingLabelsSelector,
  registryQuickPicksLandingConfigSelector,
  registryQuickPicksSelector,
  siteIdSelector,
} from '../selectors';
import { REGISTRY_QUICK_PICKS_LANDING_STATE_KEY } from '../constants';

describe(__filename, () => {
  it('#registryQuickPicksSelector', () => {
    const state = fromJS({
      [REGISTRY_QUICK_PICKS_LANDING_STATE_KEY]: { foo: 'bar' },
    });
    const selector = registryQuickPicksSelector(state);
    expect(selector).to.be.a('object');
  });

  it('#isLoggedInSelector', () => {
    const state = fromJS({
      accountSignIn: {
        isLoggedIn: false,
      },
    });
    const selector = isLoggedInSelector(state);
    expect(selector).to.equal(false);
  });

  it('#contentSelector', () => {
    expect(contentSelector(fromJS({ content: [] }))).to.be.a('object');
  });
  it('#registryQuickPicksLandingLabelsSelector', () => {
    const state = fromJS({
      [LABELS_STATE_KEY]: {
        Registry: {
          QuickPicksLanding: {},
        },
      },
    });
    const selector = registryQuickPicksLandingLabelsSelector(state);
    expect(selector).to.be.a('object');
  });

  it('#configState', () => {
    expect(configState(fromJS({ viewportConfig: {} }))).to.be.a('object');
  });

  it('#registryQuickPicksLandingConfigSelector', () => {
    const state = fromJS({
      viewportConfig: {
        pageConfig: {
          [STATIC_PAGES_KEY]: {},
        },
      },
    });
    const selector = registryQuickPicksLandingConfigSelector(state);
    expect(selector).to.be.a('object');
  });
  it('#siteIdSelector', () => {
    const state = fromJS({
      viewportConfig: {
        pageConfig: {
          [STATIC_PAGES_KEY]: {},
        },
        siteId: 'BedBathUS',
      },
    });
    const selector = siteIdSelector(state);
    expect(selector).to.be.equal('BedBathUS');
  });
});
