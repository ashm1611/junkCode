import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import commonUtil from '@bbb-app/utils/commonUtil';
import Button from '@bbb-app/core-ui/button';

import QuickPicksCollection from '../QuickPicksCollection';
import mockData from './mockData';
import { noop } from '../../../../../../sampleTestCases/utils/noop';
import ProductGrid from '../../../../../ProductGrid';
import { ERROR_QUICK_PICKS_COLLECTION_NOT_FOUND } from '../../../../../../constants/registryQuickPicks';
import * as FiltersHelperUtil from '../../../../../Filters/FiltersHelper';

configure({ adapter: new Adapter() });

const quickPickCollections = () => ({
  hero: mockData.data.hero,
  collections: mockData.data.breadcrumb.category.collections,
  category: mockData.data.breadcrumb.category,
  selectedCollection: mockData.data.breadcrumb.category.collections[0],
  products: mockData.data.products,
  registryType: mockData.data.breadcrumb.registryTypes[0],
  selectedProducts: {},
  toastNotification: {
    content: [{ title: 'bar', defaultSkuCMS: '44159726' }],
    show: false,
  },
  history: {},
});

const fetchQuickPicksCollection = () => {};

describe(__filename, () => {
  let stub;
  beforeEach(() => {
    // Preventing setting up beforeunload event which tend to break karma
    stub = sinon.stub(window, 'addEventListener');
  });
  afterEach(() => {
    stub.restore();
  });
  it('should render correctly with default props', () => {
    const tree = shallow(
      <QuickPicksCollection
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    tree.instance().setGridHeader(<div />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render in its entirety', () => {
    const prevProps = {
      match: {
        params: {
          collectionName: 'Anniversary',
        },
      },
    };
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: false }}
        quickPicksCollection={quickPickCollections()}
        isQuickViewOpen
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        siteId={'BuyBuyBaby'}
      />
    );
    tree.instance().componentDidUpdate(prevProps);
    expect(tree).to.not.equal(null);
  });

  it('should render quick pick items from recommendation flow for mobile view', () => {
    sinon.stub(commonUtil, 'isMobileScreen').returns(true);
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: false }}
        quickPicksCollection={quickPickCollections()}
        isQuickViewOpen
        fromRecomendation
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        siteId={'BuyBuyBaby'}
      />
    );
    commonUtil.isMobileScreen.restore();
    expect(tree.find(ProductGrid)).to.have.length(1);
  });

  it('should render quick pick items from recommendation flow for desktop view', () => {
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: false }}
        quickPicksCollection={quickPickCollections()}
        isQuickViewOpen
        fromRecomendation
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        siteId={'BuyBuyBaby'}
      />
    );
    expect(tree.find(ProductGrid)).to.have.length(1);
  });

  it('should set showMoreQuickPicks as true when clicked on the view more button', () => {
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: true }}
        quickPicksCollection={quickPickCollections()}
        isQuickViewOpen
        fromRecomendation
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        siteId={'BuyBuyBaby'}
      />
    );
    tree.instance().setState({ showMoreQuickPicks: false });
    tree
      .find(Button)
      .at(0)
      .simulate('click');
    expect(tree.instance().state.showMoreQuickPicks).to.be.equal(true);
  });
  it('should set showMoreQuickPicks as false when clicked on the view more button', () => {
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: true }}
        quickPicksCollection={quickPickCollections()}
        isQuickViewOpen
        fromRecomendation
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        siteId={'BuyBuyBaby'}
      />
    );
    tree.instance().setState({ showMoreQuickPicks: true });
    tree
      .find(Button)
      .at(0)
      .simulate('click');
    expect(tree.instance().state.showMoreQuickPicks).to.be.equal(false);
  });

  it('should respond to events', () => {
    const changeQuickPicksSpy = sinon.spy();
    const tree = shallow(
      <QuickPicksCollection
        channelType="DesktopWeb"
        changeQuickPicksCollection={changeQuickPicksSpy}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        siteId={'TBS_BuyBuyBaby'}
      />
    );
    tree
      .instance()
      .onSwitchQuickPicksCollection(
        '/store/quickpicks/testCategory/testCollectionName/123456'
      );
    // eslint-disable-next-line no-unused-expressions
    expect(changeQuickPicksSpy).to.be.calledOnce;
    tree.instance().renderSkeletonStyles();
  });

  it('should display leave page modal', () => {
    const props = quickPickCollections();
    props.selectedProducts = { foo: 'bar' };
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: true }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        siteId={'BedBathUS'}
      />
    );
    const instance = tree.instance();
    expect(instance.handleHistoryBlockEvent('/foo/bar')).to.equal(false);
  });
  it('should not display leave page modal', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: true }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        channelType="MobileWeb"
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        siteId={'BedBathUS'}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    const instance = tree.instance();
    tree.instance().renderSkeletonStyles();
    expect(instance.handleHistoryBlockEvent('/foo/bar')).to.equal(true);
  });

  it('should handle leave page selected event', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    const leavePage = sinon.spy();
    const setQuickPicksCollection = sinon.spy();

    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: true }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        leavePage={leavePage}
        setQuickPicksCollection={setQuickPicksCollection}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    const instance = tree.instance();
    instance.unblock = () => noop;
    instance.onLeavePageSelected(true);
    expect(leavePage.called).to.equal(true);
    expect(setQuickPicksCollection.called).to.equal(true);
    instance.onLeavePageSelected(false);
    expect(tree).to.not.equal(null);
  });

  it('should not reset when unmounted leave page modal', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: true }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        quickPicksCollection={props}
      />
    );
    const instance = tree.instance();
    instance.unblock = () => noop;
    expect(instance.handleHistoryBlockEvent('/foo/bar')).to.equal(true);
    tree.unmount();
  });

  it('should toggle all selected items', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    const setQuickPicksCollection = sinon.spy();
    const tree = shallow(
      <QuickPicksCollection
        dynamicPricing={{ dynamicPricingFlag: false }}
        customerRegistryInfo={{ hasActiveRegistry: true }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        setQuickPicksCollection={setQuickPicksCollection}
      />
    );
    const instance = tree.instance();
    instance.toggleSelectAllItems(true);
    instance.toggleSelectAllItems(false);
    expect(tree).to.not.equal(null);
  });

  it('should render signed-in header', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    const setQuickPicksCollection = sinon.spy();
    const tree = shallow(
      <QuickPicksCollection
        customerRegistryInfo={{
          hasActiveRegistry: true,
          isLoggedIn: true,
        }}
        dynamicPricing={{ dynamicPricingFlag: false }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        setQuickPicksCollection={setQuickPicksCollection}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render single toast notification', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    props.toastNotification.content = [
      {
        title: 'bar',
        defaultSkuCMS: '44159726',
        selectedVariant: -2,
        variants: [],
      },
      {},
    ];
    props.previousSelectedProducts = {
      0: [
        {
          selectedProduct: {
            productId: '676767',
          },
        },
      ],
    };
    props.cacheHit = true;

    const tree = shallow(
      <QuickPicksCollection
        customerRegistryInfo={{
          hasActiveRegistry: true,
          isLoggedIn: true,
          registry: {
            activeRegistry: {
              registryId: '123',
            },
            ownAndRecommendedRegistries: {
              profileRegistryList: [],
            },
          },
        }}
        dynamicPricing={{ dynamicPricingFlag: false }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    tree.instance().componentDidMount();
    tree.instance().renderToastNotification();
    expect(tree).to.not.equal(null);
  });

  it('should render single variation selected toast notification', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    props.toastNotification.content = [
      {
        title: 'bar',
        defaultSkuCMS: '44159726',
        selectedVariant: 3,
        qty: 1,
        variants: [
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/59519844159702p',
            swatchScene7ID: '59519844159702p',
            label: 'White',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/13851453335684s?$48$&wid=48&hei=48',
            title: 'Bubula Diaper Pail in White',
            skuId: '44159702',
            size: '25&quot;',
          },
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/59519944159719p',
            swatchScene7ID: '59519944159719p',
            label: 'White/grey',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/13851463335684s?$48$&wid=48&hei=48',
            title: 'Bubula Diaper Pail in White/Grey',
            skuId: '44159719',
            size: '25&quot;',
          },
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/138090044159726p',
            swatchScene7ID: '138090044159726p',
            label: 'Grey',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/13851673335684s?$48$&wid=48&hei=48',
            title: 'Bubula Diaper Pail in Grey',
            skuId: '44159726',
            size: '25&quot;',
          },
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/59520144159733p',
            swatchScene7ID: '59520144159733p',
            label: 'Baby blue',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/13851493335684s?$48$&wid=48&hei=48',
            title: 'Bubula Steel Extra Large Diaper Pail in Baby Blue',
            skuId: '44159733',
            size: '25&quot;',
          },
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/59520244159740p',
            swatchScene7ID: '59520244159740p',
            label: 'Baby pink',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/13851503335684s?$48$&wid=48&hei=48',
            title: 'Bubula Steel Extra Large Diaper Pail in Baby Pink',
            skuId: '44159740',
            size: '25&quot;',
          },
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/59520344159757p',
            swatchScene7ID: '59520344159757p',
            label: 'Sage',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/13851513335684s?$48$&wid=48&hei=48',
            title: 'Bubula Steel Extra Large Diaper Pail in Sage',
            skuId: '44159757',
            size: '25&quot;',
          },
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/59520444159764p',
            swatchScene7ID: '59520444159764p',
            label: 'Lavender',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/13851523335684s?$48$&wid=48&hei=48',
            title: 'Bubula Steel Extra Large Diaper Pail',
            skuId: '44159764',
            size: '25&quot;',
          },
          {
            image:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/91765960036759p',
            swatchScene7ID: '91765960036759p',
            label: 'Navy',
            swatchImage:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/15531673335684s?$48$&wid=48&hei=48',
            title: 'Bubula&trade; Steel Diaper Pail in Navy',
            skuId: '60036759',
            size: '',
          },
        ],
      },
    ];
    const tree = shallow(
      <QuickPicksCollection
        customerRegistryInfo={{
          hasActiveRegistry: true,
          isLoggedIn: true,
          registry: {
            activeRegistry: {
              registryId: '123',
            },
            ownAndRecommendedRegistries: {
              profileRegistryList: [],
            },
          },
        }}
        dynamicPricing={{ dynamicPricingFlag: false }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    tree.instance().renderToastNotification();
    expect(tree).to.not.equal(null);
  });

  it('should render multiple items toast notification', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    props.toastNotification.content = [
      {
        title: 'bar',
        defaultSkuCMS: '44159726',
        selectedVariant: -2,
        variants: [],
      },
    ];
    const tree = shallow(
      <QuickPicksCollection
        customerRegistryInfo={{
          hasActiveRegistry: true,
          isLoggedIn: true,
          registry: {
            activeRegistry: {
              registryId: '123',
            },
            ownAndRecommendedRegistries: {
              profileRegistryList: [],
            },
          },
        }}
        dynamicPricing={{ dynamicPricingFlag: false }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    tree.instance().renderToastNotification();
    expect(tree).to.not.equal(null);
  });

  it('should handle isLoading', () => {
    const tree = shallow(
      <QuickPicksCollection
        quickPicksCollection={{ ...quickPickCollections(), isLoading: true }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should handle not found error', () => {
    const tree = shallow(
      <QuickPicksCollection
        quickPicksCollection={{
          ...quickPickCollections(),
          error: {
            type: ERROR_QUICK_PICKS_COLLECTION_NOT_FOUND,
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should handle general error', () => {
    const tree = shallow(
      <QuickPicksCollection
        quickPicksCollection={{
          ...quickPickCollections(),
          error: {
            type: 'foo',
          },
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should call handleUpdateProductQty', () => {
    const props = quickPickCollections();
    props.selectedProducts = {};
    const updateProductQty = sinon.spy();
    const tree = shallow(
      <QuickPicksCollection
        customerRegistryInfo={{
          hasActiveRegistry: true,
          isLoggedIn: true,
        }}
        dynamicPricing={{ dynamicPricingFlag: false }}
        labels={{
          referredContent: [
            { id: '111222', key: 'customerSupportCTAPanel' },
            { id: '101010', key: 'registryBuildCTAPanel' },
          ],
        }}
        content={{
          contentData: {
            '111222': {
              body:
                '<section><div class="subtitle">Our&nbsp;customer service is available 24/7.</div><div class="contact-number color-primary-brand ">(1-800-462-3966)</div></section>',
            },
            '101010': {
              body:
                '<div class="imgWrapper"><img role="presentation" src="//s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/Couple_1024x300_1.jpg" /></div><section><h2>Ready to build the best registry ever?</h2><p>Start building your perfect registry online now or with an expert in a story near you.</p></section>',
            },
          },
        }}
        quickPicksCollection={props}
        updateProductQty={updateProductQty}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    tree.instance().handleUpdateProductQty();
    // eslint-disable-next-line no-unused-expressions
    expect(updateProductQty).to.be.calledOnce;
  });

  it('componentWillReceiveProps should set fireTealium to true', () => {
    const props = quickPickCollections();
    const newProps = {
      quickPicksCollection: {
        selectedCollection: {
          collectionId: 'dc129898',
        },
      },
    };
    const wrapper = shallow(
      <QuickPicksCollection
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    wrapper.instance().fireTealium = false;
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper.instance().state.fireTealium).to.equal(true);
  });
  it('componentWillReceiveProps should set fireTealium to else', () => {
    const quickPickCollection = () => ({
      hero: mockData.data.hero,
      collections: mockData.data.breadcrumb.category.collections,
      category: {
        label: '',
        id: 'top-registry-picks',
      },
      selectedCollection: {
        label: 'addtocart',
        url: 'https',
        collectionId: 'dc129898',
      },
      products: mockData.data.products,
      registryType: mockData.data.breadcrumb.registryTypes[0],
      selectedProducts: {},
      toastNotification: {
        content: null,
        show: false,
      },
      history: {},
    });
    const props = quickPickCollection();
    const newProps = {
      quickPicksCollection: {
        selectedCollection: {
          collectionId: 'dc129898',
        },
      },
    };
    const wrapper = shallow(
      <QuickPicksCollection
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    wrapper.instance().fireTealium = false;
    wrapper.instance().componentWillReceiveProps(newProps);
    wrapper.instance().renderQuickPickCollectionSwitcher();
    wrapper.instance().renderToastNotification();
    expect(wrapper.instance().state.fireTealium).to.equal(false);
  });
  it('should handle window unload events', () => {
    const props = quickPickCollections();
    props.selectedProducts = { foo: 'bar' };
    const wrapper = shallow(
      <QuickPicksCollection
        quickPicksCollection={props}
        labels={{
          leavePageConfirmationMessage: 'bar',
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    const event = {};
    wrapper.instance().onUnload(event);
    expect(event.returnValue).to.be.a('string');
  });

  it('should not stop unloading window', () => {
    const props = quickPickCollections();
    const wrapper = shallow(
      <QuickPicksCollection
        quickPicksCollection={props}
        labels={{
          leavePageConfirmationMessage: 'bar',
        }}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );
    const event = {};
    wrapper.instance().onUnload(event);
    expect(event.returnValue).to.equal(undefined);
  });

  it('componentWillReceiveProps should call toast', () => {
    const props = quickPickCollections();
    const newProps = {
      quickPicksCollection: {
        toastNotification: {
          show: true,
        },
      },
    };
    const wrapper = shallow(
      <QuickPicksCollection
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
      />
    );

    wrapper.instance().componentWillReceiveProps(newProps);
  });

  it('should call scrollToPreviouslySelectedProduct', () => {
    const scrollToPreviouslySelectedProductStub = sinon
      .stub(FiltersHelperUtil, 'scrollToPreviouslySelectedProduct')
      .callsFake(() => {});
    const props = quickPickCollections();
    props.collections = undefined;
    props.cacheHit = true;
    props.previousSelectedProducts = {
      0: [
        {
          selectedProduct: {
            productId: '676767',
          },
        },
      ],
    };
    const querySelectorStub = sinon.stub(document, 'querySelector').returns({});
    const wrapper = shallow(
      <QuickPicksCollection
        quickPicksCollection={props}
        fetchQuickPicksCollection={fetchQuickPicksCollection}
        match={{ params: { collectionName: 'Anniversary', args: {} } }}
      />
    );
    wrapper.setProps({ match: { params: { collectionName: 'Anniversary' } } });
    querySelectorStub.restore();
    scrollToPreviouslySelectedProductStub.restore();
    expect(scrollToPreviouslySelectedProductStub.called).to.be.equal(true);
  });
});
