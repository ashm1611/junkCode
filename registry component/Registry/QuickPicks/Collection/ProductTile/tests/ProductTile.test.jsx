import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import {
  CHANNELTYPE_DESKTOP,
  CHANNELTYPE_MOBILE,
} from '@bbb-app/constants/appConstants';
import ProductTile from '../ProductTile';
import { renderProductTile } from '../helper';
import mockData from '../../../../../../../../server/mockData/quickPicksCollection.json';
import * as RollupCodeUtil from '../../../../../../../utils/getRollupCode';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const actions = {
    addToRegistry: {
      label: 'Add to Registry',
      handler: () => {},
    },
    moreOptions: {
      label: 'More Options',
      handler: () => {},
    },
    quickView: {
      label: 'Quickview',
      handler: () => {},
    },
  };

  it('should render in its simplest form without throwing', () => {
    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
        comment="abc"
        profileHasRegistries={false}
        recommendedCount="2"
        channelType="MobileWeb"
        variants={[
          {
            image:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p',
            swatchScene7ID: '53759918828715p',
            label: 'Black',
            swatchImage:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$',
            title: 'Bugaboo Seat Liner in Black',
            skuId: '18828715',
            size: '5',
          },
          {
            image:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p',
            swatchScene7ID: '53759918828715p',
            label: 'Black',
            swatchImage:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$',
            title: 'Bugaboo Seat Liner in Black',
            skuId: '18828715',
            size: '4',
          },
        ]}
        rollupTypeCode="3"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call getPrimaryCta as disable ', () => {
    const isDisabled = true;
    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
      />
    );
    const spy = sinon.spy(tree.instance(), 'disabledActionHandler');
    tree.instance().getPrimaryCta('', '', '', isDisabled);
    expect(spy.called);
  });

  it('should call disabledActionHandler  ', () => {
    const event = {
      preventDefault: () => {},
    };
    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
      />
    );
    tree.instance().disabledActionHandler(event);
    expect(tree).to.not.equal(null);
  });

  it('#checkAttributesForShipping: should return false with renderedFreeShipping as false', () => {
    const obj = {
      freeShippingLabel: 'abc',
    };

    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
      />
    );
    const result = tree
      .instance()
      .checkAttributesForShipping([{ freeShippingLabel: 'abc' }], '', false);
    expect(result).to.deep.equal(obj);
  });

  it('#checkAttributesForShipping: should return false with renderedFreeShipping true', () => {
    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
      />
    );
    const result = tree
      .instance()
      .checkAttributesForShipping([{ freeShippingLabel: 'abc' }], '', true);
    expect(result).to.equal(false);
  });

  it('should call getTrimmedAttributes   ', () => {
    const attributes = [
      {
        skuAttributeId: '123_123',
        text: "<p class='sddMessage'>Same Day Delivery Eligible</p>",
        freeShippingMessage: 'freeShippingMessage',
      },
    ];

    const obj = [
      {
        freeShippingMessage: 'freeShippingMessage',
        skuAttributeId: '123_123',
        text: "<p class='sddMessage'>Same Day Delivery Eligible</p>",
      },
    ];

    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
      />
    );
    const result = tree.instance().getTrimmedAttributes(attributes);
    expect(result).to.deep.equal(obj);
  });

  it('should call renderWeddingFavourite with text as Wedding Registry Favorite   ', () => {
    const attributes = [
      {
        skuAttributeId: '123_123',
        text: 'Wedding Registry Favorite',
        freeShippingMessage: 'freeShippingMessage',
      },
    ];

    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
        attributes={attributes}
      />
    );
    const spy = sinon.spy(tree.instance(), 'getTrimmedAttributes');
    tree.instance().renderWeddingFavourite();
    expect(spy.called);
  });

  it('should call renderWeddingFavourite with test as abc ', () => {
    const attributes = [
      {
        skuAttributeId: '123_123',
        text: 'abc',
        freeShippingMessage: 'freeShippingMessage',
      },
    ];

    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
        attributes={attributes}
      />
    );
    const spy = sinon.spy(tree.instance(), 'getTrimmedAttributes');
    tree.instance().renderWeddingFavourite();
    expect(spy.called);
  });

  it('should render renderMoreOptionsButton in mobile ', () => {
    const channelType = 'MobileWeb';
    const tree = shallow(
      <ProductTile
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        collectionFlag="false"
        channelType={channelType}
        actions={actions}
      />
    );

    tree.instance().renderMoreOptionsButton('/abc');
    expect(tree.props('actions')).to.be.an('Object');
  });

  it('should render with helper', () => {
    const tree = shallow(
      <ProductTile
        {...renderProductTile(
          {
            headerTooltip: 'This is awesome!',
            recommendedQuantity: '1',
            badgeDescription: 'Detailed Message',
            labels: {},
            dynamicPrice: false,
            tileActions: null,
            channelType: CHANNELTYPE_DESKTOP,
            switchConfig: null,
            sddOptions: null,
            title: 'Product title',
            url: '/product/kitchen-mixer/88889999',
            image: '//placehold.it/200',
            productId: '88889999',
            categoryId: '10002',
            contextPath: '/store',
            searchTerm: 'sheets',
            actions,
            collectionFlag: 'true',
          },
          0,
          mockData.products[0].productInformation
        )}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render with attributes', () => {
    const tree = shallow(
      <ProductTile
        title="Product title"
        url="/product/bed-sheet/101010"
        image="//placehold.it/200"
        productId="101010"
        contextPath="/store"
        categoryId="10002"
        collectionFlag="false"
        shippingLabels={{
          freeShippingMessage: 'Free shipping for orders over $',
        }}
        attributes={[
          {
            id: '123_123',
            text: "<p class='sddMessage'>Same Day Delivery Eligible</p>",
            freeShippingMessage: 'freeShippingMessage',
          },
        ]}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render with no category', () => {
    const tree = shallow(
      <ProductTile
        headerTooltip="This is awesome!"
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        searchTerm="bar"
        channelType={CHANNELTYPE_MOBILE}
        badgeDescription="This is awesome!"
        recommendedQuantity={5}
        isMobile={false}
        comment={null}
        rollupTypeCode="ddd"
        collectionFlag={null}
        variants={[
          {
            image:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p',
            swatchScene7ID: '53759918828715p',
            label: 'Black',
            swatchImage:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$',
            title: 'Bugaboo Seat Liner in Black',
            skuId: '18828715',
            size: '',
          },
        ]}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    tree.setState({ variantIndex: 0 });
    tree.update();
    expect(tree).to.not.equal(null);
  });

  it('should render with no category on Mobile', () => {
    const tree = shallow(
      <ProductTile
        headerTooltip="This is awesome!"
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        searchTerm="bar"
        channelType={CHANNELTYPE_MOBILE}
        badgeDescription="This is awesome!"
        recommendedQuantity={5}
        isMobile
        comment={null}
        rollupTypeCode="ddd"
        collectionFlag={null}
        variants={[
          {
            image:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p',
            swatchScene7ID: '53759918828715p',
            label: 'Black',
            swatchImage:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$',
            title: 'Bugaboo Seat Liner in Black',
            skuId: '18828715',
            size: '',
          },
        ]}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    tree.setState({ variantIndex: 0 });
    tree.update();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render with no category and with RollupCodeUtil', () => {
    const RollupCodeUtilStub = sinon
      .stub(RollupCodeUtil, 'default')
      .returns(true);
    const tree = shallow(
      <ProductTile
        headerTooltip="This is awesome!"
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        searchTerm="bar"
        channelType={CHANNELTYPE_MOBILE}
        badgeDescription="This is awesome!"
        recommendedQuantity={5}
        isMobile={false}
        comment={null}
        rollupTypeCode="ddd"
        collectionFlag={null}
        variants={[
          {
            image:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p',
            swatchScene7ID: '53759918828715p',
            label: 'Black',
            swatchImage:
              'https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$',
            title: 'Bugaboo Seat Liner in Black',
            skuId: '18828715',
            size: '',
          },
        ]}
      />
    );
    tree.setState({ variantIndex: 0 });
    RollupCodeUtilStub.restore();
    expect(tree).to.have.lengthOf(1);
  });

  it('should render SwatchMenu', () => {
    const variants = [
      {
        image:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p',
        swatchScene7ID: '53759918828715p',
        label: 'Black',
        swatchImage:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$',
        title: 'Bugaboo Seat Liner in Black',
        skuId: '18828715',
        size: '',
      },
      {
        image:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p',
        swatchScene7ID: '53759918828715p',
        label: 'White',
        swatchImage:
          'https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$',
        title: 'Bugaboo Seat Liner in White',
        skuId: '18828716',
        size: '',
      },
    ];
    const tree = shallow(
      <ProductTile
        headerTooltip="This is awesome!"
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        searchTerm="bar"
        channelType={CHANNELTYPE_MOBILE}
        badgeDescription="This is awesome!"
        recommendedQuantity={5}
        isMobile={false}
        comment={null}
        rollupTypeCode="ddd"
        collectionFlag={null}
        variants={variants}
      />
    );
    expect(tree.find('SwatchMenu')).to.have.lengthOf(1);
  });
});

describe(`${__filename} events`, () => {
  let tree;
  let actions = {};
  let addToRegistryHandler;
  let moreOptionsHandler;
  let quickViewHandler;
  let onSelect;
  let updateProductQty;

  beforeEach(() => {
    addToRegistryHandler = sinon.spy();
    moreOptionsHandler = sinon.spy();
    quickViewHandler = sinon.spy();
    onSelect = sinon.spy();
    updateProductQty = sinon.spy();

    actions = {
      addToRegistry: {
        label: 'Add to Registry',
        handler: addToRegistryHandler,
      },
      moreOptions: {
        label: 'More Options',
        handler: moreOptionsHandler,
      },
      quickView: {
        label: 'Quickview',
        handler: quickViewHandler,
      },
      selectProduct: {
        label: 'Select Product',
        handler: onSelect,
      },
      updateProductQty: {
        handler: updateProductQty,
      },
    };

    tree = shallow(
      <ProductTile
        actions={actions}
        profileHasRegistries
        headerTooltip="This is awesome!"
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        channelType="mobile"
        collectionFlag="true"
      />
    );
    tree.setState({
      addToRegistryQty: -1,
      variantIndex: -1,
    });
  });

  it('should respond to events and trigger callbacks', () => {
    let instance = tree.instance();
    instance.onAddToRegistryClick();
    // eslint-disable-next-line no-unused-expressions
    expect(addToRegistryHandler).to.have.been.calledOnce;

    instance.onMoreOptionsClick();
    // eslint-disable-next-line no-unused-expressions
    expect(moreOptionsHandler).to.have.been.calledOnce;

    instance.onQuickViewButtonClick();
    // eslint-disable-next-line no-unused-expressions
    expect(quickViewHandler).to.have.been.calledOnce;

    instance.onUpdateQuantity(1);
    // eslint-disable-next-line no-unused-expressions
    expect(updateProductQty).to.have.been.calledOnce;

    instance.handleSwatchChange(0);
    expect(tree.state('variantIndex')).to.equal(0);

    instance.onSelect();
    // eslint-disable-next-line no-unused-expressions
    expect(onSelect).to.have.been.calledOnce;
    tree = shallow(
      <ProductTile
        actions={actions}
        profileHasRegistries
        headerTooltip="This is awesome!"
        title="Product title"
        url="#"
        image="//placehold.it/200"
        productId="123"
        categoryId="10002"
        channelType="mobile"
        collectionFlag="false"
        recommendedCount={30}
      />
    );
    instance = tree.instance();
    instance.onQuickViewButtonClick();
    expect(tree).to.not.equal(null);
  });
});
