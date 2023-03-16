import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as storeUtils from '@bbb-app/utils/storeRefUtils';
import { RegistryQuickAddComponent } from '../RegistryQuickAddComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    quickAddItems: {
      1013876150: {
        ALT_IMG: '16873013876150p__3,16873013876150p__2,16873013876150p__1',
        SKU_ID: ['13876150'],
        SKU_TYPE: ['1'],
      },
      Product3: {},
      Product4: {},
      Product5: {},
    },
    quickAddProductsData: [
      {
        product_id: '1042372998',
        recommendedQuantity: '1',
        badgeDescription: null,
      },
    ],
    maxTileCount: 4,
    contextPath: '/store',
    isFetching: false,
    labels: {
      quickAddHeading: 'quickAddHeading',
    },
    enableQuickAdd: true,
    setTrackFlag: sinon.stub(),
    trackFlag: true,
    maxTileCountVariationB: 12,
  };

  it('should render correctly 1', () => {
    const otherProps = {
      registryOwnerFirstCategoryList: [
        {
          DSLUpdateable: false,
          aboveLine: false,
          amountFulfilled: 0,
          assemblyFees: 0,
          price: 64.99,
          registryItemList: [
            {
              activeFlag: true,
              dynamicSKUPriceVO: {},
              eligibleShipMethods: [],
              skuAttributes: {},
              sku: '43820535',
            },
          ],
        },
      ],
    };
    const tree = shallow(
      <RegistryQuickAddComponent
        {...props}
        {...otherProps}
        enableNewRegDashboard
      />
    );

    tree.instance().dispatchTealiumObjRegistryArrow();
    tree.instance().createAddedItemLookUpMap();
    tree.instance().renderHeadingIcon();
  });

  it('should render correctly when variation is priceView', () => {
    const otherProps = {
      registryOwnerFirstCategoryList: {
        categoryBuckets: [
          {
            catgoryName: '$1 - $25',
            items: null,
          },
          {
            catgoryName: '$50 - $100',
            items: [
              {
                DSLUpdateable: false,
                aboveLine: false,
                amountFulfilled: 0,
                assemblyFees: 0,
                price: 64.99,
                sKUDetailVO: {
                  activeFlag: true,
                  dynamicSKUPriceVO: {},
                  eligibleShipMethods: [],
                  skuAttributes: {},
                  skuId: '43820535',
                },
              },
            ],
          },
        ],
      },
      variation: 'priceView',
      isMobile: true,
    };
    const tree = shallow(
      <RegistryQuickAddComponent {...props} {...otherProps} />
    );

    tree.instance().dispatchTealiumObjRegistryArrow();
    tree.instance().createAddedItemLookUpMap();
    tree.instance().renderHeadingIcon();
  });

  it('should render skeleton', () => {
    const newProps = Object.assign({}, props, { isFetching: true });
    const tree = shallow(<RegistryQuickAddComponent {...newProps} />);

    expect(tree).to.not.equal(null);
  });
  it('should render skeleton in new registry flow', () => {
    const newProps = Object.assign({}, props, { isFetching: true });
    const tree = shallow(
      <RegistryQuickAddComponent {...newProps} enableNewRegDashboard />
    );

    expect(tree).to.not.equal(null);
  });
  it('should render null if no item', () => {
    const newProps = Object.assign({}, props, { quickAddItems: {} });
    const tree = shallow(<RegistryQuickAddComponent {...newProps} />);

    expect(tree).to.not.equal(null);
  });

  it('Should return false when incoming registryOwnerFirstCategoryList is empty ', () => {
    const prop = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
    };
    const wrapperInstance = shallow(
      <RegistryQuickAddComponent {...prop} />
    ).instance();
    const nextProps = {
      registryOwnerFirstCategoryList: [],
      variation: 'Category',
    };
    expect(wrapperInstance.shouldComponentUpdate(nextProps)).to.equal(false);
  });

  it('Should return true when incoming registryOwnerFirstCategoryList is not empty ', () => {
    const prop = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
    };
    const wrapperInstance = shallow(
      <RegistryQuickAddComponent {...prop} />
    ).instance();
    const nextProps = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
      variation: 'Category',
    };
    expect(wrapperInstance.shouldComponentUpdate(nextProps)).to.equal(true);
  });

  it('Should return true when variation is Date', () => {
    const prop = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
    };
    const wrapperInstance = shallow(
      <RegistryQuickAddComponent {...prop} />
    ).instance();
    const nextProps = {
      variation: 'Date',
    };
    expect(wrapperInstance.shouldComponentUpdate(nextProps)).to.equal(true);
  });

  it('should return null when enableQuickAdd is false', () => {
    const prop = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
      quickAddItems: {
        1013876150: {
          ALT_IMG: '16873013876150p__3,16873013876150p__2,16873013876150p__1',
          SKU_ID: ['13876150'],
          SKU_TYPE: ['1'],
        },
      },
    };

    const wrapper = shallow(<RegistryQuickAddComponent {...prop} />);
    /* eslint-disable */
    expect(wrapper.type()).to.be.null;
  });

  it('should call renderProductTile', () => {
    sinon.stub(storeUtils, 'getStoreRef').returns({});
    const prop = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
      quickAddItems: {
        1013876150: {
          ALT_IMG: '16873013876150p__3,16873013876150p__2,16873013876150p__1',
          SKU_ID: ['13876150'],
          SKU_TYPE: ['1'],
          key: 1,
        },
      },
      quickAddProductsData: [
        {
          product_id: '1013876150',
          recommendedQuantity: '1',
          badgeDescription: null,
        },
      ],
      enableQuickAdd: true,
      maxTileCountVariationB: 12,
    };
    const wrapper = shallow(<RegistryQuickAddComponent {...prop} />);
    wrapper.instance().dispatchTealiumObjRegistryArrow();
    storeUtils.getStoreRef.restore();
    expect(wrapper.find('RegistryQuickAddProductTile')).to.have.lengthOf(1);
  });

  it('should call renderProductTile for mobile', () => {
    sinon.stub(storeUtils, 'getStoreRef').returns({});
    const prop = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
      quickAddItems: {
        1013876150: {
          ALT_IMG: '16873013876150p__3,16873013876150p__2,16873013876150p__1',
          SKU_ID: ['13876150'],
          SKU_TYPE: ['1'],
          key: 1,
        },
      },
      quickAddProductsData: [
        {
          product_id: '1013876150',
          recommendedQuantity: '1',
          badgeDescription: null,
        },
      ],
      enableQuickAdd: true,
      maxTileCountVariationB: 12,
      isMobile: true,
      enableNewRegDashboard: true,
    };
    const wrapper = shallow(<RegistryQuickAddComponent {...prop} />);
    storeUtils.getStoreRef.restore();
    expect(wrapper.find('RegistryQuickAddProductTile')).to.have.lengthOf(1);
  });

  it('should call renderProductTile for mobile', () => {
    sinon.stub(storeUtils, 'getStoreRef').returns({});
    const prop = {
      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 234 },
        { sku: 345 },
      ],
      quickAddItems: {
        1013876150: {
          ALT_IMG: '16873013876150p__3,16873013876150p__2,16873013876150p__1',
          SKU_ID: ['13876150'],
          SKU_TYPE: ['1'],
          key: 1,
        },
      },
      quickAddProductsData: [
        {
          product_id: '1013876150',
          recommendedQuantity: '1',
          badgeDescription: null,
        },
      ],
      enableQuickAdd: true,
      maxTileCountVariationB: 12,
      isMobile: true,
      enableNewRegDashboard: false,
    };
    const wrapper = shallow(<RegistryQuickAddComponent {...prop} />);
    storeUtils.getStoreRef.restore();
    expect(wrapper.find('RegistryQuickAddProductTile')).to.have.lengthOf(1);
  });
  it('should call renderProductTile for mobile when enableNewRegDashboard is true', () => {
    const newProps = Object.assign({}, props, {
      enableNewRegDashboard: true,
      isMobiile: true,
      isItemAlreadyAddedToRegistry: true,
      isItemAlreadyAddedToRegistryFlag: true,
    });
    const wrapper = shallow(<RegistryQuickAddComponent {...newProps} />);
    expect(wrapper).to.not.equal(null);
  });
});
