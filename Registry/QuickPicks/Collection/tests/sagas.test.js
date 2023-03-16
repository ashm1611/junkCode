import { select } from 'redux-saga/effects';
import sinon from 'sinon';
import * as util from '@bbb-app/utils/common';
import {
  watchFetchQuickPicksCollection,
  callAddItemsToGiftRegistryApi,
  handleDisplayToastNotification,
  addSelectedItemsToRegistry,
  addItemToActiveRegistry,
  getCollectionById,
  fetchQuickPicksCollection,
  getPreviousRegistryType,
  getRegistryType,
  getItemToAdd,
  getShowerDate,
  getProductData,
  getRegistryAddLocation,
  getTealiumData,
} from '../sagas';
import {
  customerRegistryInfoSelector,
  registryQuickPicksCollectionConfigSelector,
  // makeSelectCurrentRoute,
} from '../selectors';
import mockData from '../../../../../../components/Pages/Registry/QuickPicks/Collection/tests/mockData';

const customerInfo = {
  isLoggedIn: true,
  customerId: '123',
  registry: {
    activeRegistry: {
      registryId: '3285024',
      registryType: {
        registryTypeDesc: 'boo',
      },
      personaName: 'Modern',
    },
    soonestRegistry: {
      registryId: '3285024',
      registryType: {
        registryTypeDesc: 'boo',
      },
    },
    ownAndRecommendedRegistries: {
      profileRegistryList: [
        {
          registryId: '12345678',
          registryType: {
            registryTypeDesc: 'babyRegistry',
          },
        },
      ],
    },
  },
};

const payload = {
  type: 'BBB/Registry/QuickPicksLanding/Collection/ADD_ITEM_ACTIVE_REGISTRY',
  payload: {
    price: {
      normal: '$9.99 Each',
      normalValue: '9.99',
      lowValue: '9.99',
      pricingLabelCode: '',
      priceRangeDescription: '$%L Each',
      wasPrice: null,
    },
    productId: '3285024',
    title: 'DASH™ Mini Grill',
    variants: [
      {
        image:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/77117545957710p',
        swatchScene7ID: '77117545957710p',
        label: 'Silver',
        swatchImage:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/7711903285024s?$48$',
        title: 'DASH™ Mini Grill in Silver',
        skuId: '45957710',
        size: '',
      },
      {
        image:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/124848361478596p',
        swatchScene7ID: '124848361478596p',
        label: 'White',
        swatchImage:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/12485833328531s?$48$',
        title: 'DASH™ Mini Grill in White',
        skuId: '61478596',
        size: 'NO SIZE',
      },
      {
        image:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/124848261478602p',
        swatchScene7ID: '124848261478602p',
        label: 'Aqua',
        swatchImage:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/12485823328531s?$48$',
        title: 'DASH™ Mini Grill in Aqua',
        skuId: '61478602',
        size: 'NO SIZE',
      },
      {
        image:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/124848461478589p',
        swatchScene7ID: '124848461478589p',
        label: 'Pink',
        swatchImage:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/12485813328531s?$48$',
        title: 'DASH™ Mini Grill in Pink',
        skuId: '61478589',
        size: 'NO SIZE',
      },
      {
        image:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/77117645957703p',
        swatchScene7ID: '77117645957703p',
        label: 'Black',
        swatchImage:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/7711893285024s?$48$',
        title: 'DASH™ Mini Grill in Black',
        skuId: '45957703',
        size: '',
      },
    ],
    defaultSkuCMS: '45957710',
    qty: 1,
    selectedVariant: -1,
  },
};

describe(__filename, () => {
  it('should watch sagas', () => {
    const gen = watchFetchQuickPicksCollection();
    expect(gen.next().value).to.matchSnapshot();
    expect(gen.next().value).to.matchSnapshot();
    expect(gen.next().value).to.matchSnapshot();
    expect(gen.next().value).to.matchSnapshot();
  });

  it('should getCollectionById from endpoint', () => {
    const isBrowserStub = sinon.stub(util, 'isBrowser').returns(false);
    const gen = getCollectionById('1', 'BedBathUs');
    gen.next();
    expect(gen.next({ body: { data: {} } }).value).to.matchSnapshot();
    isBrowserStub.restore();
  });

  it('should callAddItemsToGiftRegistryApi from endpoint', () => {
    const gen = callAddItemsToGiftRegistryApi('1', { foo: 'bar' });
    gen.next();
    expect(gen.next({ body: { data: {} } }).value).to.matchSnapshot();
  });

  it('should fetchQuickPicksCollection', () => {
    const gen = fetchQuickPicksCollection({
      args: { category: 'abc', collectionId: '123' },
      siteId: 'BedBathUs',
      channel: '',
    });
    const responseData = {
      productInformation: { '123': {} },
      products: [{ product_id: '123' }],
      breadcrumb: { category: { collections: [{ collectionId: '123' }] } },
    };
    gen.next();
    gen.next();
    gen.next({ responseData });
    gen.next({
      serviceStatus: 'SUCCESS',
      errorMessages: '',
      responseData: mockData,
    });
    gen.next();
    gen.next();
  });

  it('should fetchQuickPicksCollection for success', () => {
    const gen = fetchQuickPicksCollection({
      args: { category: 'abc', collectionId: '123' },
      siteId: 'BedBathUs',
      channel: '',
    });
    const responseData = {
      productInformation: { '123': {} },
      products: [{ sku_id: '123' }],
    };
    gen.next();
    gen.next();
    gen.next({ responseData });
    gen.next();
    gen.next();
  });

  it('should fetchQuickPicksCollection for success with sku id in response', () => {
    const gen = fetchQuickPicksCollection({
      args: { category: 'abc', collectionId: '123' },
      siteId: 'BedBathUs',
      channel: '',
    });
    const responseData = {
      productInformation: {},
      products: [{}],
    };
    gen.next();
    gen.next();
    gen.next({ responseData });
  });

  it('should fetchQuickPicksCollection Error from API', () => {
    const gen = fetchQuickPicksCollection({
      args: { category: 'abc', collectionId: '123', pagePath: '#test' },
    });
    const quickPicksObj = { currentCacheKey: '#test' };
    gen.next();
    gen.next(quickPicksObj);
    gen.next();
    gen.next({
      serviceStatus: 'ERROR',
      errorMessages: '',
      responseData: 'error',
    });
    expect(gen.next().value).to.matchSnapshot();
  });

  it('should fetchQuickPicksCollection with error thrown', () => {
    const gen = fetchQuickPicksCollection({
      args: { category: 'abc', collectionId: '123' },
    });
    gen.next();
    const error = new Error('some error');
    const response = { body: error };
    expect(gen.throw(response).value).to.matchSnapshot();
  });

  it('should handleDisplayToastNotification with configured duration', () => {
    const gen = handleDisplayToastNotification({ payload: 'foo' });
    expect(gen.next().value).to.deep.equal(
      select(registryQuickPicksCollectionConfigSelector)
    );
    gen.next({ 'registry.quickpicks.toast.duration': {} });
    expect(gen.next().value).to.matchSnapshot();
    gen.next();
  });

  it('should do nothing is user is logged out', () => {
    const totalcount = '20';
    const gen = addSelectedItemsToRegistry(totalcount);
    expect(gen.next().value).to.deep.equal(
      select(customerRegistryInfoSelector)
    );
    expect(
      gen.next({
        isLoggedIn: false,
        customerId: '123',
        registry: {
          activeRegistry: {
            registryId: '3285024',
            registryType: {
              registryTypeDesc: 'boo',
            },
          },
        },
      })
    );
    expect(gen.next().value).to.matchSnapshot();
  });

  it('should addSelectedItemsToRegistry for logged in user with selected product', () => {
    const state = {
      selectedProducts: {
        '3285024': {
          price: {
            normal: '$9.99 Each',
            normalValue: '9.99',
            lowValue: '9.99',
            pricingLabelCode: '',
            priceRangeDescription: '$%L Each',
            wasPrice: null,
          },
          productId: '3285024',
          title: 'DASH™ Mini Grill',
          variants: [
            {
              image:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/77117545957710p',
              swatchScene7ID: '77117545957710p',
              label: 'Silver',
              swatchImage:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/7711903285024s?$48$',
              title: 'DASH™ Mini Grill in Silver',
              skuId: '45957710',
              size: '',
            },
            {
              image:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/124848361478596p',
              swatchScene7ID: '124848361478596p',
              label: 'White',
              swatchImage:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/12485833328531s?$48$',
              title: 'DASH™ Mini Grill in White',
              skuId: '61478596',
              size: 'NO SIZE',
            },
            {
              image:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/124848261478602p',
              swatchScene7ID: '124848261478602p',
              label: 'Aqua',
              swatchImage:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/12485823328531s?$48$',
              title: 'DASH™ Mini Grill in Aqua',
              skuId: '61478602',
              size: 'NO SIZE',
            },
            {
              image:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/124848461478589p',
              swatchScene7ID: '124848461478589p',
              label: 'Pink',
              swatchImage:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/12485813328531s?$48$',
              title: 'DASH™ Mini Grill in Pink',
              skuId: '61478589',
              size: 'NO SIZE',
            },
            {
              image:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/77117645957703p',
              swatchScene7ID: '77117645957703p',
              label: 'Black',
              swatchImage:
                'https://s7d2.scene7.com/is/image/BedBathandBeyond/7711893285024s?$48$',
              title: 'DASH™ Mini Grill in Black',
              skuId: '45957703',
              size: '',
            },
          ],
          defaultSkuCMS: '45957710',
          selectedVariant: -1,
        },
      },
    };
    const totalcount = '20';
    const gen = addSelectedItemsToRegistry(totalcount);
    expect(gen.next().value).to.deep.equal(
      select(customerRegistryInfoSelector)
    );
    expect(gen.next(customerInfo));
    gen.next(state);
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    gen.next({
      serviceStatus: 'SUCCESS',
    });
    gen.next();
    gen.next();
    gen.next();
  });

  it('should add selected item without price', () => {
    const page = { breadcrumb: { pagename_breadcrumb: 'test' } };
    const wrapper = getTealiumData({}, {}, {}, {}, payload, 'test', page);
    expect(wrapper).to.not.equal(null);
    const newCustomerInfo = {
      isLoggedIn: true,
      customerId: '123',
      registry: {
        activeRegistry: {
          registryId: '3285024',
          registryType: {
            registryTypeDesc: 'boo',
          },
        },
        ownAndRecommendedRegistries: {
          profileRegistryList: [
            {
              registryId: '3285024',
              registryType: {
                registryTypeDesc: 'babyRegistry',
              },
            },
          ],
        },
      },
    };
    const totalcount = '20';
    const gen = addSelectedItemsToRegistry(totalcount);
    expect(gen.next().value).to.deep.equal(
      select(customerRegistryInfoSelector)
    );
    expect(gen.next(newCustomerInfo));
    gen.next({
      serviceStatus: 'SUCCESS',
    });
    expect(gen.next().value).to.matchSnapshot();
    gen.next();
  });

  it('should addSelectedItemsToRegistry with error thrown', () => {
    const totalcount = '20';
    const gen = addSelectedItemsToRegistry(totalcount);
    gen.next();
    const error = new Error('some error');
    const response = { body: error };
    expect(gen.throw(response).value).to.matchSnapshot();
  });

  it('should addItemToActiveRegistry for logged in user', () => {
    const gen = addItemToActiveRegistry({ payload });
    expect(gen.next().value).to.deep.equal(
      select(customerRegistryInfoSelector)
    );
    gen.next(customerInfo);
    gen.next();
    gen.next();
    gen.next();
    gen.next();
    gen.next({
      serviceStatus: 'SUCCESS',
    });
    gen.next();
    gen.next();
    gen.next();
    gen.next();
  });

  it('should do nothing is user is logged out', () => {
    const gen = addItemToActiveRegistry(payload);
    expect(gen.next().value).to.deep.equal(
      select(customerRegistryInfoSelector)
    );
    expect(
      gen.next({
        isLoggedIn: false,
        customerId: '123',
        registry: {
          activeRegistry: {
            registryId: '3285024',
            registryType: {
              registryTypeDesc: 'boo',
            },
          },
        },
      })
    );
    expect(gen.next().value).to.matchSnapshot();
  });

  it('should addItemToActiveRegistry with error thrown', () => {
    const gen = addItemToActiveRegistry(payload);
    gen.next();
    const error = new Error('some error');
    const response = { body: error };
    expect(gen.throw(response).value).to.matchSnapshot();
  });

  it('getPreviousRegistryType', () => {
    const gen = getPreviousRegistryType();
    gen.next();
    gen.next();
  });

  it('should call getPreviousRegistryType with api success', () => {
    const state = '/store/kickstarters/:registryName?/:registryType/:category?';
    const gen = getPreviousRegistryType();
    gen.next();
    gen.next(state);
    gen.next();
  });

  it('should call getRegistryType', () => {
    const registryTypes = ['baby', 'wedding'];
    const previousRegistryType = ['college', 'wedding'];
    const wrapper = getRegistryType(registryTypes, previousRegistryType);
    expect(wrapper).to.not.equal(null);
  });

  it('should call getItemToAdd', () => {
    const itemParam = {
      productId: '123',
      defaultSkuCMS: '123',
      price: 20,
      qty: 1,
      selectedVariant: 0,
      variants: [{}],
    };
    const wrapper = getItemToAdd('123', itemParam);
    expect(wrapper).to.not.equal(null);
  });

  it('should call getShowerDate', () => {
    const registry = {
      activeRegistry: { eventVO: { showerDate: '12345678' } },
    };
    const wrapper = getShowerDate(registry);
    expect(wrapper).to.not.equal(null);
  });

  it('should call getProductData', () => {
    const selectedProducts = [];
    const page = { breadcrumb: { pagename_breadcrumb: 'test' } };
    const wrapper = getProductData(selectedProducts, page);
    expect(wrapper).to.not.equal(null);
  });

  it('should call getRegistryAddLocation', () => {
    const pathname = '/test/test/test/test';
    const wrapper = getRegistryAddLocation(pathname);
    expect(wrapper).to.not.equal(null);
  });

  it('should call getTealiumData when registry has persona', () => {
    const page = { breadcrumb: { pagename_breadcrumb: 'test' } };
    const wrapper = getTealiumData(
      {},
      customerInfo.registry,
      {},
      {},
      payload,
      'test',
      page
    );
    expect(wrapper).to.not.equal(null);
  });
  it('should call getTealiumData when registry does not have persona', () => {
    const page = { breadcrumb: { pagename_breadcrumb: 'test' } };
    const wrapper = getTealiumData({}, {}, {}, {}, payload, 'test', page);
    expect(wrapper).to.not.equal(null);
  });
});
