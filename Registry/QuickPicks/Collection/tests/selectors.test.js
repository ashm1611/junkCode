import { fromJS } from 'immutable';
import { GIFT_REGISTRIES_DETAILS_STATE_KEY } from '@bbb-app/constants/registryConstants';
import { EXPERIENCE_STATE_KEY } from '@bbb-app/constants/experienceConstants';
import { LABELS_STATE_KEY } from '@bbb-app/constants/appConstants';
import { ACCOUNT_SIGNIN_STATE_KEY } from '@bbb-app/constants/state-keys/accountStateKeys';
import { STATIC_PAGES_KEY } from '@bbb-app/redux/labels/constants';
import {
  channelTypeSelector,
  contentSelector,
  currentUrlSelector,
  customerRegistryInfoSelector,
  dynamicPricingSelector,
  errorSelector,
  isLoading,
  isLoggedInSelector,
  productsSelector,
  registryQuickPicksCollectionConfigSelector,
  selectLabelsQuickPicksCollection,
  selectProductTileLabels,
  registryQuickPicksCollectionSelector,
  routeSelector,
  makeSelectPrevRoute,
  makeSelectCurrentRoute,
  makeSelectBreadcrumb,
  makeAkamaiInfo,
  siteIdSelector,
} from '../selectors';
import { REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY } from '../constants';

describe(__filename, () => {
  it('#registryQuickPicksCollectionSelector', () => {
    const state = fromJS({
      [REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY]: { foo: 'bar' },
    });
    const selector = registryQuickPicksCollectionSelector(state);
    expect(selector).to.be.a('object');
  });

  it('#currentUrlSelector', () => {
    const state = fromJS({
      route: {
        locationBeforeTransitions: {
          location: {
            pathname: null,
          },
        },
      },
      router: {
        location: {
          pathname: null,
        },
      },
      [EXPERIENCE_STATE_KEY]: { routeURL: 'https://foobar.com' },
    });
    expect(currentUrlSelector(state)).to.equal('https://foobar.com');
  });

  it('#customerRegistryInfoSelector', () => {
    const state = fromJS({
      [ACCOUNT_SIGNIN_STATE_KEY]: { profile: { repositoryId: {} } },
      [GIFT_REGISTRIES_DETAILS_STATE_KEY]: { activeRegistry: {} },
    });
    expect(customerRegistryInfoSelector(state)).to.have.any.keys(
      'customerId',
      'hasActiveRegistry'
    );
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

  it('#routeSelector', () => {
    expect(routeSelector(fromJS({ route: {} }))).to.be.a('object');
  });

  it('#selectProductTileLabels', () => {
    const state = fromJS({
      [LABELS_STATE_KEY]: {
        productListingPage: {
          productTile: {},
        },
      },
    });
    const selector = selectProductTileLabels(state);
    expect(selector).to.be.a('object');
  });

  it('#selectLabelsQuickPicksCollection', () => {
    const state = fromJS({
      [LABELS_STATE_KEY]: {
        Registry: {
          QuickPicksLanding: {},
        },
      },
    });
    const selector = selectLabelsQuickPicksCollection(state);
    expect(selector).to.be.a('object');
  });

  it('#productsSelector', () => {
    const state = fromJS({
      [REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY]: { products: [] },
    });
    expect(productsSelector(fromJS(state))).to.be.a('object');
  });

  it('#errorSelector', () => {
    const state = fromJS({
      [REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY]: { error: {} },
    });
    expect(errorSelector(state)).to.be.a('object');
  });

  it('#isLoading', () => {
    const state = fromJS({
      [REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY]: { isLoading: true },
    });
    // eslint-disable-next-line no-unused-expressions
    expect(isLoading(state)).to.be.true;
  });

  it('#dynamicPricingSelector', () => {
    const state = fromJS({
      [REGISTRY_QUICK_PICKS_COLLECTION_STATE_KEY]: { configuration: {} },
    });
    expect(dynamicPricingSelector(state)).to.be.a('object');
  });

  it('#channelTypeSelector', () => {
    const state = fromJS({
      viewportConfig: { channelType: 'mobile' },
    });
    expect(channelTypeSelector(state)).to.equal('mobile');
  });

  it('#registryQuickPicksCollectionConfigSelector', () => {
    const state = fromJS({
      viewportConfig: {
        pageConfig: {
          [STATIC_PAGES_KEY]: {},
        },
      },
    });
    const selector = registryQuickPicksCollectionConfigSelector(state);
    expect(selector).to.be.a('object');
  });
  it('#makeSelectPrevRoute', () => {
    const state = fromJS({
      route: { previousLocationBeforeTransitions: { pathname: 'foo' } },
    });
    const selector = makeSelectPrevRoute();
    expect(selector(state)).to.equal('foo');
  });

  it('#makeSelectCurrentRoute', () => {
    const state = fromJS({
      route: { locationBeforeTransitions: { pathname: 'foo' } },
    });
    const selector = makeSelectCurrentRoute();
    expect(selector(state)).to.equal('foo');
  });

  it('#makeSelectBreadcrumb', () => {
    const isFromRecommendation = true;
    const state = fromJS({
      registryQuickPicksCollection: { selectedCollection: { label: {} } },
    });
    const selector = makeSelectBreadcrumb(isFromRecommendation);
    expect(selector(state)).to.be.a('object');
  });
  it('#makeSelectBreadcrumb with empty store', () => {
    const state = fromJS({
      registryQuickPicksCollection: {},
    });
    const selector = makeSelectBreadcrumb();
    expect(selector(state)).to.be.a('object');
  });

  it('#makeAkamaiInfo', () => {
    const state = fromJS({
      akamaiHeader: { data: {} },
    });
    const selector = makeAkamaiInfo();
    expect(selector(state)).to.be.a('object');
  });

  it('#siteIdSelector', () => {
    const state = fromJS({
      viewportConfig: { siteId: {} },
    });
    const selector = siteIdSelector(state);
    expect(selector).to.be.a('object');
  });
});
