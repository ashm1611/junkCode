import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import Tinderable from '../FlipFlopTinder';
import { FLIP_FLOP_VARIANT_A } from '../../../../../../containers/Pages/Registry/RegistryOwner/FlipFlop/constants';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const items = [
    {
      PRODUCT_ID: '1043233533',
      SITE_ID: ['BedBathUS'],
      DISPLAY_NAME: 'B. Smith&reg; Multi-Purpose Server with Tray',
      PRICE_RANGE_DESCRIP: '$%L',
      COLLECTION_FLAG: '0',
      SWATCH_FLAG: '0',
      ROLLUP_TYPE_CODE: '0',
      INTL_RESTRICTED: 'N',
      SCENE7_URL: '56518543233533p',
      SEO_URL: '/product/b-smith-reg-multi-purpose-server-with-tray/1043233533',
      BRAND: 'B. Smith',
      MEDIUM_IMAGE_ID: '56518543233533p?$146$',
      VERT_IMAGE_ID: '56518543233533p?$146v$',
      RATINGS: 4.8,
      REVIEWS: 52.0,
      INCART_FLAG: '0',
      MX_INCART_FLAG: '0',
      LOW_PRICE: 39.99,
      LOW_PRICE_MX: 939.0,
      PRICE_RANGE_STRING: '$39.99',
      PRICE_RANGE_STRING_MX: 'MXN 939.00',
      L3_ID: ['13811', '13178', '13882', '14155', '13719', '13245'],
      ATTRIBUTES_JSON: [
        '{"SKU_ATTRIBUTE_ID":"13_5","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_2","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"1_357","DISPLAY_DESCRIP":"<span class=\'prod-attrib prod-attrib-exclusive0\'>Wedding Registry Favorite</span>","PLACE_HOLDER":"PLSR,PDPT,CRSL,PDPC,PRINFO","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"Y","PRIORITY":"999"}',
        '{"SKU_ATTRIBUTE_ID":"13_17","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_4","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_3","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_12","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_6","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_8","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_7","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
        '{"SKU_ATTRIBUTE_ID":"13_11","DISPLAY_DESCRIP":"<p class=\'sddMessage prod-attrib-feo\'>Same Day Delivery Eligible</p>","PLACE_HOLDER":"PLSR,PDPM,PDPC,SHALL","IMAGE_URL":"","ACTION_URL":"","INTL_FLAG":"N","PRIORITY":"1"}',
      ],
      SKU_ID: ['43233533'],
      CUSTOMIZATION_OFFERED_FLAG: ['No'],
      PERSONALIZATION_TYPE: ['N'],
      LTL_FLAG: ['0'],
      id: 'BedBathUS_1043233533',
    },
  ];

  const itemsGroupBy = [
    {
      selectedColor: 'null',
      DISPLAY_NAME: 'Noritake&reg; Colorwave Crescent Plate in Turquoise',
      PRODUCT_ID: '1045656323',
      PRICE_RANGE_DESCRIP: '$%L',
      RATINGS: 4.7,
      REVIEWS: 18,
      url:
        '/product/noritake-reg-colorwave-crescent-plate-in-turquoise/1045656323',
      swatchFlag: '0',
      COLLECTION_FLAG: '0',
      ROLLUP_TYPE_CODE: '0',
      eligibleCustomizationDescrip: [],
      CUSTOMIZATION_OFFERED_FLAG: ['No'],
      intlRestricted: false,
      SKU_ID: ['45656323'],
      PRODUCT_VARIATION: 'NORMAL',
      brand: 'Noritake',
      beyondPlusProductCheck: '0',
      inventoryStatus: 'Positive',
      priceRangeString: '$19.99',
      normal: '$19.99',
      isPriceRangeStr: '$19.99',
      priceRangeStringMX: 'MXN 397.00',
      LTL_FLAG: false,
      scene7imageID: '75293845656323p',
      SCENE7_URL:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/75293845656323p',
      MSWP_FLAG: false,
      inCart: false,
      badge: '',
      price: {
        id: '1',
        highPriceValueMX: 0,
        isPriceRangeStr: '$19.99',
        lowPriceValueMX: 397,
        lowValue: 19,
        priceRangeDescription: '$%L',
        priceRangeStringMX: 'MXN 397.00',
        pricingLabelCode: null,
        wasHighPriceMX: 0,
        wasLowPriceMX: 0,
        wasPriceRangeStr: '$19.99',
        intlHighPriceValue: '',
        intlLowPriceValue: '',
        intlWasHighPriceValue: '',
        intlWasLowPriceValue: '',
        low: null,
        normal: '$19.99',
        normalValue: 0,
        priceLabelCodeMX: '',
        salePriceMX: null,
        tbsPrice: null,
        LTL_FLAG: true,
      },
      sddEligibleFlag: true,
      storeOnly: false,
      id: '1045656323',
      lowValue: 19.99,
      wasPriceRangeStr: '$19.99',
      WAS_PRICE_RANGE_STRING_MX: 'MXN 397.00',
      attributes: [
        {
          skuAttributeId: '1_357',
          txt:
            "<span class='prod-attrib prod-attrib-exclusive0 prod-attrib-feo feo-hide'>Wedding Registry Favorite</span>",
          attributesList: 'PLSR,PDPT,CRSL,PDPC,PRINFO',
          priority: '999',
          intlFlag: 'Y',
        },
      ],
      variants: [
        {
          colorGroup: 'Blue',
          title: 'Noritake&reg; Colorwave Crescent Plate in Turquoise',
          label: '',
          image: '2752178243386s',
          swatchScene7ID: '',
        },
      ],
    },
  ];

  const labels = {
    errorApiTimeout:
      "We're sorry, we experienced an issue while loading the registry. Please refresh the page.",
    referredContent: [
      {
        id: '12440',
        key: 'flipFlopBanner',
      },
      {
        id: '12441',
        key: 'tinderLandscapeModeMessage',
      },
    ],
  };

  const addToRegistryState = {
    data: null,
    productId: '10771122',
    skuId: '771122',
    contextTheme: 'regular',
    error: null,
    isFetching: false,
    addedSkuAttrs: {
      DISPLAY_NAME: 'TOY',
      SKU_SCENE7_URL: '$abc123',
    },
    qty: 2,
  };

  const mswpProductDetails = {
    color: 'red',
    error: {
      message: 'test error',
    },
    skuError: {
      message: 'test skuError',
    },
  };

  const isItemsCountLow = false;
  let newAddToRegistryState;

  const dynamicContent = {
    content: {
      '12440': {
        body:
          '<img alt="FLipFLop Banner Tutorial" data-align="center" data-entity-type="file" data-entity-uuid="b9358d78-00fc-481c-90ec-3c635978e6c7" height="67" src="http://s7d9.scene7.com/is/image/BedBathandBeyond/flip-flop-onboarding?$content$" />',
      },
      '12441': {
        body: 'test body data',
      },
    },
  };

  const props = {
    activeRegistryId: '520589269',
    activeRegistryName: 'Baby',
    addToRegistryState,
    labels,
    toggleMSWPModalState: sinon.stub(),
    addToRegistry: sinon.stub(),
    resetFlipFlopData: sinon.stub(),
    isFetchingItemsList: false,
    triggerNextAPICall: sinon.spy(),
    mswpProductDetails,
    setIsItemsCountLow: sinon.spy(),
    isItemsCountLow,
    match: {
      params: {
        regType: 'COL',
      },
    },
  };

  let newProps = {
    activeRegistryId: '520589269',
    activeRegistryName: 'Baby',
    newAddToRegistryState,
    labels,
    toggleMSWPModalState: sinon.stub(),
    addToRegistry: sinon.stub(),
    resetFlipFlopData: sinon.stub(),
    isFetchingItemsList: false,
    dynamicContent,
  };
  const mockStore = configureStore([]);
  const initialState = fromJS({
    sitespect: {
      assignedCampaigns: [
        {
          id: 'tinderSwipe',
          campaignId: '123456',
        },
      ],
    },
    route: {
      location: { pathname: '/store/giftRegistry/flipFlop/BRD/520892623' },
    },
  });

  const tinderable = shallow(
    <Tinderable
      items={items}
      {...props}
      store={mockStore(initialState)}
      dynamicContent={dynamicContent}
    />
  );

  const toggleMSWPModalState = sinon.stub(
    tinderable
      .first()
      .shallow()
      .instance(),
    'toggleMSWPModalState'
  );

  props.toggleMSWPModalState = toggleMSWPModalState;

  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render with mock data', () => {
    const match = {
      params: {
        regType: 'BA1',
      },
    };
    const tree = shallow(
      <Tinderable
        items={items}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        match={match}
      />
    )
      .first()
      .shallow();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render with mock data and in landscape mode', () => {
    const tree = shallow(
      <Tinderable
        isLandscapeMode
        items={items}
        {...props}
        store={store}
        fireTealiumAction={sinon.spy()}
        dynamicContent={dynamicContent}
      />
    )
      .first()
      .shallow();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render with mock data and isFlipFlopEnabled true', () => {
    const swicthConfigdata = {};
    const catData = {
      fqParam: '{!prefix f=CATEGORY_HIERARCHY v=$dep_clicked}',
      BRD: [
        {
          category_text: 'All Categories',
          url_param: '',
        },
      ],
    };
    const tree = shallow(
      <Tinderable
        items={items}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isFlipFlopEnabled
        switchConfigGlobal={swicthConfigdata}
        registryTinderAllCategories={catData}
        fireTealiumAction={sinon.spy()}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call toggleMSWPModalState', () => {
    const tree = shallow(
      <Tinderable
        items={items}
        {...props}
        onRightSwipeMSWP={sinon.stub()}
        store={store}
        dynamicContent={dynamicContent}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    const side = 'right';
    const cardId = 'BedBathUS_1043233533';
    const url =
      '/product/b-smith-reg-multi-purpose-server-with-tray/1043233533';
    const swatchFlag = '1';
    const prodId = '1043233533';
    const prodVaiation = 'NORMAL';
    const rollupTypeCode = '2';
    const collectionFlag = '1';

    tree.setState({
      previousUrl:
        '/product/b-smith-reg-multi-purpose-server-with-tray/1043233533',
    });
    const cardProps = {
      cardId,
      url,
      swatchFlag,
      atrData: { prodId },
      prodVaiation,
      collectionFlag,
      rollupTypeCode,
    };

    tree.instance().removeCard(side, cardProps);
    expect(toggleMSWPModalState.called);
  });

  it('should call toggleMSWPModalState for trigger nextAPICall', () => {
    const tree = shallow(
      <Tinderable
        items={items}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    const side = 'left';
    const cardId = 'BedBathUS_1043233533';
    const url =
      '/product/b-smith-reg-multi-purpose-server-with-tray/1043233533';
    const swatchFlag = '1';
    const rollupTypeCode = '2';
    const collectionFlag = '1';
    const cardProps = {
      cardId,
      url,
      swatchFlag,
      collectionFlag,
      rollupTypeCode,
      atrData: {
        prodId: '222222',
        qty: 2,
        price: 2222,
        skuId: '123455',
        activeRegistryId: '223346',
        activeRegistryName: 'BRD',
      },
    };
    tree.setState({ itemsCount: 4, thresholdNextAPITrigger: 8 });
    tree.setProps({ isFetchingItemsList: false });
    tree.instance().removeCard(side, cardProps);
    expect(toggleMSWPModalState.called);
  });

  it('should call toggleMSWPModalState and show toast message in case of Variant A', () => {
    const tree = shallow(
      <Tinderable
        items={items}
        {...props}
        onRightSwipeMSWP={sinon.stub()}
        store={store}
        dynamicContent={dynamicContent}
        isFlipFlopEnabled={FLIP_FLOP_VARIANT_A}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    const side = 'left';
    const cardId = 'BedBathUS_1043233533';
    const url =
      '/product/b-smith-reg-multi-purpose-server-with-tray/1043233533';
    const swatchFlag = '1';
    const prodId = '1043233533';
    const prodVaiation = 'NORMAL';
    const rollupTypeCode = '2';
    const collectionFlag = '1';

    tree.setState({
      previousUrl:
        '/product/b-smith-reg-multi-purpose-server-with-tray/1043233533',
    });
    const cardProps = {
      cardId,
      url,
      swatchFlag,
      atrData: { prodId },
      prodVaiation,
      collectionFlag,
      rollupTypeCode,
    };
    tree.instance().removeCard(side, cardProps);
    expect(toggleMSWPModalState.called);
  });

  it('should call componentWillUnMount when itemsList changed.', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];

    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        dynamicContent={dynamicContent}
        store={store}
      />
    )
      .first()
      .shallow();
    tree.setState({ itemsCount: 8 });
    tree.instance().componentWillUnmount();
    expect(props.resetFlipFlopData.called).to.be.equal(true);
  });

  it('should call componentWillRecieveProps when itemsList changed.', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];
    const newItemsPresent = [{ test2: 'xyz' }, { test3: 'poi' }];
    const other = [{ test1: 'abc' }, { test2: 'xyz' }];

    newProps = {
      toggleMSWPModalState,
      addToRegistry: sinon.stub(),
      items: newItemsPresent,
      resetFlipFlopData: sinon.stub(),
      addToRegistryState,
      flipFlopBanner: other,
      isItemsCountLow: true,
      selectedCategory: 'abc',
    };
    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        dynamicContent={dynamicContent}
        store={store}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    tree.setProps({ selectedCategory: '' });
    tree.setState({ itemsCount: 8, itemsViewedDuringCall: 1 });
    tree.instance().componentWillReceiveProps(newProps);
    expect(tree.instance().state.itemsCount).to.be.equal(1);
  });

  it('should call componentWillRecieveProps when itemsList not changed.', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];
    const newItemsPresent = [
      { test1: 'abc' },
      { test2: 'xyz' },
      { test3: 'poi' },
    ];
    const other = [{ test1: 'abc' }, { test2: 'xyz' }];

    newProps = {
      toggleMSWPModalState,
      addToRegistry: sinon.stub(),
      items: newItemsPresent,
      resetFlipFlopData: sinon.stub(),
      addToRegistryState,
      flipFlopBanner: other,
      isItemsCountLow: true,
    };
    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        dynamicContent={dynamicContent}
        store={store}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    tree.setState({ itemsCount: 8 });
    tree.instance().componentWillReceiveProps(newProps);
    expect(props.setIsItemsCountLow.called).to.be.equal(true);
  });

  it('should call renderATRErrorMessage.', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];

    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    tree.instance().renderATRErrorMessage();
    expect(tree.instance().state.mountedState).to.be.equal(true);
  });

  it('should call toggleErrorModalState.', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];
    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        dynamicContent={dynamicContent}
        store={store}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    tree.instance().toggleErrorModalState();
    expect(tree.instance().state.mountedState).to.be.equal(false);
  });

  it('should call handleBannerClose.', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];
    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        dynamicContent={dynamicContent}
        store={store}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    tree.instance().handleBannerClose();
    expect(tree.instance().state.displayBanner).to.be.equal(false);
  });

  it('should call setMountedState with error', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];
    newAddToRegistryState = {
      data: null,
      productId: '10771121',
      skuId: '771122',
      contextTheme: 'regular',
      error: 'errorOccured',
      isFetching: false,
      addedSkuAttrs: {
        DISPLAY_NAME: 'TOY',
        SKU_SCENE7_URL: '$abc123',
      },
      qty: 2,
    };
    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        dynamicContent={dynamicContent}
        store={store}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    tree.setProps({ addToRegistryState: newAddToRegistryState });
    tree.instance().setMountedState(newProps, null, null);
    expect(tree.instance().state.mountedState).to.be.equal(true);
  });

  it('should call setMountedState with data', () => {
    const itemsPresent = [{ test1: 'abc' }, { test2: 'xyz' }, { test3: 'poi' }];
    newAddToRegistryState = {
      data: 'data',
      productId: '10771121',
      skuId: '771122',
      contextTheme: 'regular',
      error: null,
      isFetching: false,
      addedSkuAttrs: {
        DISPLAY_NAME: 'TOY',
        SKU_SCENE7_URL: '$abc123',
      },
      qty: 2,
    };
    const tree = shallow(
      <Tinderable
        items={itemsPresent}
        {...props}
        dynamicContent={dynamicContent}
        store={store}
        fireTealiumAction={sinon.spy()}
      />
    )
      .first()
      .shallow();
    tree.setState({ cardAtrData: { skuId: '12345' } });
    tree.setProps({ addToRegistryState: newAddToRegistryState });
    tree.instance().setMountedState(newProps, null, null);
    expect(tree.instance().state.mountedState).to.be.equal(false);
  });

  it('should render correclty when GroupByFlipFlopEnable enable', () => {
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
      />
    )
      .first()
      .shallow();
    expect(tree.find('FlipFlopModal')).to.have.lengthOf(1);
  });

  it('should call preparedCard', () => {
    itemsGroupBy[1] = {
      selectedColor: 'null',
      DISPLAY_NAME: 'Noritake&reg; Colorwave Crescent Plate in Turquoise',
      PRODUCT_ID: '1045656323',
      PRICE_RANGE_DESCRIP: '$%L',
      RATINGS: 4.7,
      REVIEWS: 18,
      url:
        '/product/noritake-reg-colorwave-crescent-plate-in-turquoise/1045656323',
      swatchFlag: '0',
      COLLECTION_FLAG: '0',
      ROLLUP_TYPE_CODE: '0',
      eligibleCustomizationDescrip: [],
      CUSTOMIZATION_OFFERED_FLAG: ['No'],
      intlRestricted: false,
      SKU_ID: ['45656323'],
      PRODUCT_VARIATION: 'NORMAL',
      brand: 'Noritake',
      beyondPlusProductCheck: '0',
      inventoryStatus: 'Positive',
      priceRangeString: '$19.99',
      normal: '$19.99',
      isPriceRangeStr: '$19.99',
      priceRangeStringMX: 'MXN 397.00',
      LTL_FLAG: true,
      scene7imageID: '75293845656323p',
      SCENE7_URL:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/75293845656323p',
      MSWP_FLAG: false,
      inCart: false,
      badge: '',
      price: {
        id: '1',
        highPriceValueMX: 0,
        isPriceRangeStr: '$19.99',
        lowPriceValueMX: 397,
        lowValue: 19,
        priceRangeDescription: '$%L',
        priceRangeStringMX: 'MXN 397.00',
        wasPriceRangeStr: '$19.99',
        normal: '$19.99',
        normalValue: 0,
        priceLabelCodeMX: '',
        salePriceMX: null,
        tbsPrice: null,
        LTL_FLAG: true,
      },
      sddEligibleFlag: true,
      storeOnly: false,
      id: '1045656323',
      lowValue: 19.99,
      wasPriceRangeStr: '$19.99',
      WAS_PRICE_RANGE_STRING_MX: 'MXN 397.00',
      attributes: [{}],
      variants: [{}],
    };
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
      />
    )
      .first()
      .shallow();
    tree.setProps({ isGroupByFlipFlopActive: true });
    expect(typeof tree.instance().preparedCard()).to.be.equal('object');
  });

  it('should call selectOption', () => {
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
      />
    )
      .first()
      .shallow();
    const selectedCategory = '';
    tree.setProps({ fireTealiumAction: sinon.spy() });
    tree.setState({ selectedTinderCategory: 'abc' });
    tree.instance().selectOption(selectedCategory);
    expect(tree.instance().state.selectedTinderCategory).to.be.equal('');
  });
  it('should call renderFlipFlopPage', () => {
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
      />
    )
      .first()
      .shallow();
    tree.setState({ displayBanner: true });
    tree.instance().renderFlipFlopPage();
    expect(tree.instance().props.isLandscapeMode).to.be.equal(undefined);
  });

  it('should call removeCard', () => {
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
      />
    )
      .first()
      .shallow();
    const cardProps = {
      atrData: {
        price: '100',
        activeRegistryId: '11111',
        activeRegistryName: 'abce',
        brand_name: 'def',
        qty: '100',
        skuId: '2343',
        prodId: '4532',
      },
    };
    tree.setProps({
      triggerNextAPICall: sinon.spy(),
      addToRegistry: sinon.spy(),
      fireTealiumAction: sinon.spy(),
      isFetchingItemsList: true,
    });
    tree.instance().removeCard('right', cardProps);
    expect(tree.instance().state.itemsViewedDuringCall).to.be.equal(1);

    tree.setProps({ isFetchingItemsList: false });
    tree.setState({ itemsCount: 1, thresholdNextAPITrigger: 2 });
    tree.instance().removeCard('right', cardProps);
    expect(tree.instance().state.showMSWPModal).to.be.equal(false);
  });

  it('should call removeCard for slide anything other than left and right', () => {
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
        triggerNextAPICall={sinon.stub()}
        addToRegistry={sinon.stub()}
        fireTealiumAction={sinon.stub()}
        isFetchingItemsList
      />
    )
      .first()
      .shallow();
    const cardProps = {
      atrData: {
        price: '100',
        activeRegistryId: '11111',
        activeRegistryName: 'abce',
        brand_name: 'def',
        qty: '100',
        skuId: '2343',
        prodId: '4532',
      },
    };

    tree.instance().removeCard('top', cardProps);
    expect(tree.instance().state.itemsViewedDuringCall).to.be.equal(1);
  });

  it('should call checkMswpProductDetailError', () => {
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
      />
    )
      .first()
      .shallow();
    const productErrorStates = {
      mswpError: 'ase',
      mswpInError: 'sde',
      mswpSKUError: 'wds',
      mswpSKUInError: 'qwe',
    };
    tree.setProps({ onModalClose: sinon.spy() });
    expect(
      tree.instance().checkMswpProductDetailError(productErrorStates)
    ).to.be.equal(true);
  });

  it('should call toggleMSWPModalState with blank param', () => {
    itemsGroupBy[1] = {
      selectedColor: 'null',
      DISPLAY_NAME: 'Noritake&reg; Colorwave Crescent Plate in Turquoise',
      PRODUCT_ID: '1045656323',
      PRICE_RANGE_DESCRIP: '$%L',
      RATINGS: 4.7,
      REVIEWS: 18,
      url:
        '/product/noritake-reg-colorwave-crescent-plate-in-turquoise/1045656323',
      intlRestricted: false,
      SKU_ID: ['45656323'],
      PRODUCT_VARIATION: 'NORMAL',
      brand: 'Noritake',
      beyondPlusProductCheck: '0',
      inventoryStatus: 'Positive',
      priceRangeString: '$19.99',
      normal: '$19.99',
      isPriceRangeStr: '$19.99',
      priceRangeStringMX: 'MXN 397.00',
      LTL_FLAG: ['1'],
      scene7imageID: '75293845656323p',
      SCENE7_URL:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/75293845656323p',
      MSWP_FLAG: false,
      inCart: false,
      badge: '',
      price: {
        id: '1',
        highPriceValueMX: 0,
        isPriceRangeStr: '$19.99',
        lowPriceValueMX: 397,
        lowValue: 19,
        priceRangeDescription: '$%L',
        priceRangeStringMX: 'MXN 397.00',
        wasPriceRangeStr: '$19.99',
        low: null,
        normal: '$19.99',
      },
      sddEligibleFlag: true,
      storeOnly: false,
      id: '1045656323',
      lowValue: 19.99,
      wasPriceRangeStr: '$19.99',
      WAS_PRICE_RANGE_STRING_MX: 'MXN 397.00',
      attributes: [{}],
      variants: [{}],
    };
    const tree = shallow(
      <Tinderable
        items={itemsGroupBy}
        {...props}
        store={store}
        dynamicContent={dynamicContent}
        isGroupByFlipFlopEnable
        customerID="DC12"
      />
    )
      .first()
      .shallow();
    tree.setState({ showMSWPModal: true });
    tree.instance().toggleMSWPModalState();
    expect(tree.instance().state.previousUrl).to.be.equal('');
  });
});
