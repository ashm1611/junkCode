import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import * as isInternationalUser from '@bbb-app/utils/isInternationalUser';
import { RegistryProductDetails } from '../RegistryProductDetails';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const ProductLayout = {
    labels: {
      giftGiver: {
        qtyLabel: 'Qty',
      },
      referredContent: [{ key: 'brandexclusionlist' }],
    },
    Image: '',
    RatingsandReviews: {
      RATINGS: '1.9',
      REVIEWS: '12',
    },
    registryProductInfo: {
      sKUDetailVO: {
        displayName: 'Test',
        upc: 'upc',
      },
      qtyRequested: '1',
      qtyPurchased: '5',
      skuInStore: '1',
      markedAsFav: true,
    },
    deviceConfig: {
      DESKTOP: 1024,
    },
    selectedCheckboxFilter: '',
    productId: '',
    registryId: '121212',
    sKUDetailVO: {
      skuId: '1212',
      intlRestricted: '1212',
      parentProdId: '1212',
      ltlItem: '1212',
      size: '1212',
      swatch: '1212',
    },
    selectedSkuId: '1212',
    selectedSKU: {
      skuId: '121212',
    },
    refNum: null,
    onModalHide: () => {},
    enableKatori: false,
    isBopisFeatureEnable: true,
    skuInStore: '1',
    storeDetails: {
      storeId: '1',
      commonName: 'store',
    },
    isFetching: true,
    quickViewMode: true,
    selectedProduct: {
      PRODUCT_ID: 'PRODUCT_ID',
      RATINGS: 'RATINGS',
      REVIEWS: 'REVIEWS',
    },
    location: {
      pathname: 'sdsd',
    },
    config: {
      siteId: 'BedBathUS',
    },
  };

  const props = {
    labels: {
      referredContent: [
        {
          id: '5434',
          key: 'RegistrantProfileExtend',
        },
      ],
    },

    vendorPriceDetails: [
      {
        refnum: '5ac675a3e0a6886c7c8b457b',
        'retailer-name': 'bbby',
        'retailer-sku': '46564504',
        'vendor-name': 'Custom Personalization Solutions',
        'vendor-sku': '50358',
        provider: 'katori',
        'ordered-at': '',
        'customization-service': 'MO-SU',
        'preview-url':
          '//bbby.katori.com/img/bbby/5ac/5ac675a3e0a6886c7c8b457b.jpg',
        'customization-status': 'saved-complete',
        'metadata-status': 'complete',
        'moderation-status': 'pending',
        'metadata-url':
          'https://api.bbby.katori.com/api/customizations/5ac675a3e0a6886c7c8b457b/metadata',
        'moderation-url':
          'https://api.bbby.katori.com/api/customizations/5ac675a3e0a6886c7c8b457b/moderation',
        'created-at': '2018-04-05T19:15:16+00:00',
        'updated-at': '2018-04-05T19:15:16+00:00',
        'locked-at': '',
        'released-at': '2018-04-05T19:15:22+00:00',
        namedrop: 'Test Text',
        description: 'Personalization: Test Text',
        'retail-price-adder': 0.0,
        'cost-price-adder': 0.0,
        errors: [],
        images: [{ previews: [{ 'moderated-url': 'moderate' }] }],
        'incart-flag': 'false',
        'pricing-label-code': '',
        'sale-price': 0.0,
        'list-price': 14.99,
        'final-price': 14.99,
      },
    ],
  };

  it('should render correctly for skeleton', () => {
    const tree = shallow(
      <RegistryProductDetails {...ProductLayout} {...props} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly for component', () => {
    const getContent = sinon.stub();
    const tree = shallow(
      <RegistryProductDetails {...ProductLayout} getContent={getContent} />
    );
    tree.setProps({
      quickViewMode: true,
      selectedProduct: {
        PRODUCT_ID: 'PRODUCT_ID',
        RATINGS: 'RATINGS',
        REVIEWS: 'REVIEWS',
      },
      isFetching: false,
      ltlData: {
        ltlSelection: '',
      },
      siteId: 'BuyBuyBaby',
    });
    expect(tree).to.not.equal(null);
  });

  it('should call componentDidMount', () => {
    const tree = shallow(
      <RegistryProductDetails {...ProductLayout} {...props} />
    );
    tree.setState({ isClient: false });
    tree.setProps({
      quickViewMode: true,
      selectedProduct: {
        PRODUCT_ID: 'PRODUCT_ID',
        RATINGS: 'RATINGS',
        REVIEWS: 'REVIEWS',
        SKU_DISPLAY_NAME: ['test'],
      },
      isFetching: false,
      ltlData: {
        ltlSelection: '',
      },
    });
    tree.instance().componentDidMount();
    expect(tree).to.not.equal(null);
  });

  it('should call getUpdatedErrorState', () => {
    const tree = shallow(
      <RegistryProductDetails
        {...ProductLayout}
        {...props}
        preLoadImage
        isFetching={false}
      />
    );

    const nextProps = {
      selectedSKU: {
        colorVariation: 'red',
        sizeVariation: true,
      },
    };

    tree.instance().getUpdatedErrorState(nextProps);
    expect(tree).to.not.equal(null);
  });

  it('should call componentWillReceiveProps', () => {
    const utilStub = sinon.stub(isInternationalUser, 'default').returns(true);
    const nextProps = {
      selectedProduct: { LTL_FLAG: 'true', PRIMARY_CATEGORY: '123' },
      selectedSkuId: {},
      selectedSKU: {},
    };
    const stub = sinon.stub();
    const socialAnnexData = { data: { associate: 'yes' } };
    const selectedProduct = {
      SKU_ID: { '123': '123' },
      PRODUCT_ID: 'PRODUCT_ID',
      RATINGS: 'RATINGS',
      REVIEWS: 'REVIEWS',
    };
    const registryProductInfo = { coOwner: 'test', markedAsFav: true };
    const tree = shallow(
      <RegistryProductDetails
        {...ProductLayout}
        {...props}
        fetchRecommendedCategory={stub}
        getLTLDetails={stub}
        socialAnnexData={socialAnnexData}
        isFetching={false}
        ltlData={{}}
        selectedProduct={selectedProduct}
        registryProductInfo={registryProductInfo}
        selectedSkuId={undefined}
        registryId={undefined}
        selectedSKU={{}}
      />
    );
    tree.setState({ callToActionValue: true });
    tree.instance().componentWillReceiveProps(nextProps);

    tree.setProps({ resetVendorPriceDetails: stub });
    tree.instance().componentWillReceiveProps(nextProps);
    utilStub.restore();

    tree.setProps({ selectedProduct: { SKU_DISPLAY_NAME: ['test'] } });
  });
});
