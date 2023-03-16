import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';

import { FlipFlop, mapDispatchToProps } from '../FlipFlop';
import setCookieWithExpiry from '../../../../../../utils/setCookieWithExpiry';
import { FLIP_FLOP_ALL_CATEGORIES } from '../constants';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const fetchFlipFlopData = sinon.spy();
  const resetFlipFlopData = sinon.spy();
  const cookieValue = 8;
  beforeEach(() => {
    const cookie = new Cookies();
    cookie.set('flipFlopAllCategoriesBRD', cookieValue);
  });
  const registrySiteConfig = {
    flipFlopBatchSize: 5,
    flipFlopCookieExpiryDays: 10,
    flipFlopRemainingItemsTrigger: 8,
  };
  const endPoints = {
    registryOwner: '/store/giftRegistry/registryOwner/myItems/:regType/:id',
    myregistries: 'store/account/my_registries',
    home: '/',
  };
  let tree;
  let getContent;
  const labels = {
    referredContent: [{ id: '12240', key: 'tinderLandscapeModeMessage' }],
  };

  it('mapDispatchToProps should dispath fetchFlipFlopData', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    getContent = sinon.spy();
    props.fetchFlipFlopData(2, 3, 'wedding registry favorite', 'Error Msg');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath resetFlipFlopData', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.resetFlipFlopData(2);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath addToRegistryAction', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.addToRegistry('Error Msg');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath getContent', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getContent('11111');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath onRightSwipeMSWP', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.onRightSwipeMSWP('123', 'A', '/url', true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath onModalClose', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.onModalClose();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath setIsItemsCountLow', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setIsItemsCountLow(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should dispath setIsItemsCountLow', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    const actionType = 'abbc';
    const tealiumInfo = {
      prodID: '1234432',
    };
    const pageName = 'Registry';
    props.fireTealiumAction(actionType, tealiumInfo, pageName);
    expect(dispatch.called).to.equal(true);
  });

  it('should render correctly when flipFlopItemsList is null and flipFlop is disabled, return nothing', () => {
    const props = {
      fetchFlipFlopData,
      flipFlopItemsList: null,
      labels,
      match: { params: { regType: 'BRD' } },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setState({ mountedState: false });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when flipFlopItemsList is null and flipFlop is disabled, redirect to home', () => {
    const props = {
      fetchFlipFlopData,
      flipFlopItemsList: null,
      labels,
      match: { params: { regType: 'BRD' } },
      endPoints: { home: '/' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setState({ mountedState: true, timeOutSet: true });
    expect(tree.find('FlipFlopModal').length).to.equal(1);
  });

  it('should render correctly when flipFlopItemsList is null and flipFlop is disabled, in waiting mode for 3 sec', () => {
    const props = {
      fetchFlipFlopData,
      flipFlopItemsList: null,
      labels,
      match: { params: { regType: 'BRD' } },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setState({ mountedState: true, timeOutSet: false });
    expect(tree.find('FlipFlopModal').length).to.equal(1);
  });

  it('should render correctly when flipFlopItemsList is not null', () => {
    const tempFlipFlopItemsList = [];
    const props = {
      registryListFetched: true,
      fetchFlipFlopData,
      resetFlipFlopData,
      labels,
      flipFlopItemsList: tempFlipFlopItemsList,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    expect(tree.find('Tinderable').length).to.equal(0);
  });
  it('calculate random index number from store', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = 0;
    const props = {
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      labels,
      isFetchingItemsList,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.instance().getFlipFlopStartIndex('BRD', FLIP_FLOP_ALL_CATEGORIES);
  });

  it('should call generateRandomFlipFlopIndex', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = null;
    const props = {
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      labels,
      isFetchingItemsList,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.instance().generateRandomFlipFlopIndex('BRD');
  });

  it('should call componentWillMount when changing registry type when isFlipFlopEnabled is null in store', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const labels1 = {
      referredContent: [{ id: '12343', key: 'tinderLandscapeModeMessage' }],
    };
    const flipFlopCookieInStore = null;
    const setFlipFlopStatus = sinon.spy();
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels1,
      isFlipFlopEnabled: null,
      setFlipFlopStatus,
      switchConfigGlobal: {},
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setState({ isFlipFlopEnabled: false });
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.instance().componentWillMount();
    expect(tree.state('isFlipFlopEnabled')).to.be.equal(true);
  });

  it('should call componentWillMount when queryParam present', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = null;
    const setFlipFlopStatus = sinon.spy();
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      isFlipFlopEnabled: null,
      setFlipFlopStatus,
      location: { pathname: 'xyz', search: 'flipFlop' },
      switchConfigGlobal: {},
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setState({ mountedState: false });
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.instance().componentWillMount();
    expect(tree.state('mountedState')).to.be.equal(false);
  });

  it('should call componentWillMount when changing registry type when isFlipFlopEnabled is false in store', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = null;
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      labels,
      isFetchingItemsList,
      isFlipFlopEnabled: false,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.setState({ mountedState: false });
    tree.instance().componentWillMount();
    expect(tree.state('mountedState')).to.be.equal(false);
  });

  it('should call componentWillMount when changing registry type', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = null;
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      isFlipFlopEnabled: true,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.instance().componentWillMount();
  });

  it('should call componentWillMount when isFetchingItemsList is false', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = null;
    const flipFlopItemsList = null;
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      flipFlopItemsList,
      isFlipFlopEnabled: true,
      match: { params: { regType: 'BA1' } },
      selectedCategories: { BRD: 'Wedding' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().componentWillMount();
  });

  it('should call componentWillMount when flipFlopItemsList is not empty', () => {
    const isFetchingItemsList = true;
    const flipFlopCookieInStore = null;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      flipFlopItemsList: tempFlipFlopItemsList,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
      regTypeInStore: 'BRD',
      isFlipFlopEnabled: true,
      selectedCategories: { BRD: 'Wedding' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setState({ mountedState: false });
    tree.instance().componentWillMount();
    expect(tree.state('mountedState')).to.be.equal(false);
  });

  it('should call componentWillMount when flipFlopItemsList is not empty and isFetchingItemsList is false', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = null;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      flipFlopItemsList: tempFlipFlopItemsList,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
      regTypeInStore: 'BRD',
      isFlipFlopEnabled: true,
      selectedCategories: { BRD: 'Wedding' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().componentWillMount();
  });

  it('should call flipFlopCookie inStore present in browser', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = null;
    const props = {
      fetchFlipFlopData,
      registrySiteConfig,
      labels,
      flipFlopCookieInStore,
      isFetchingItemsList,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.instance().getFlipFlopStartIndex('BA1', FLIP_FLOP_ALL_CATEGORIES);
  });

  it('should call flipFlopCookieInStore present in state but not for all category', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = { Furniture_BA1: 100 };
    const props = {
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      flipFlopItemsList: [],
      resetFlipFlopData,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().getFlipFlopStartIndex('BA1', FLIP_FLOP_ALL_CATEGORIES);
  });

  it('should call flipFlopCookie present in state', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = { Furniture_BA1: 100 };
    const props = {
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      flipFlopItemsList: [],
      resetFlipFlopData,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().getFlipFlopStartIndex('BA1', 'Furniture');
  });

  it('should call flipFlopCookie not present in state but present in cookie', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = null;
    const props = {
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      flipFlopItemsList: [],
      labels,
      resetFlipFlopData,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
    };
    setCookieWithExpiry('flipFlopCookie_BA1', 10, 0);
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().getFlipFlopStartIndex('BA1', 'Furniture');
  });

  it('should redirect to myItems owner view if channel is DSK', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = null;
    const channelType = 'DesktopWeb';
    const props = {
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      channelType,
      labels,
      resetFlipFlopData,
      match: { params: { regType: 'BRD', id: '12345' } },
      location: { pathname: 'xyz', search: 'search' },
      flipFlopItemsList: { tempFlipFlopItemsList },
      endPoints,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().checkIfRoute();
  });

  it('should redirect to myRegistries page if no registries are present', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = null;
    const channelType = 'MobileWeb';
    const props = {
      fetchFlipFlopData,
      registryListFetched: true,
      registriesList: [],
      registrySiteConfig,
      flipFlopCookieInStore,
      labels,
      isFetchingItemsList,
      channelType,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
      endPoints,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().checkIfRoute();
  });

  it('should redirect to login page if user is not logged in.', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = null;
    const channelType = 'MobileWeb';
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const props = {
      fetchFlipFlopData,
      registryListFetched: true,
      registriesList: tempFlipFlopItemsList,
      registrySiteConfig,
      flipFlopCookieInStore,
      labels,
      isFetchingItemsList,
      channelType,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().checkIfRoute();
  });

  it('should call componentWillMount when queryParam not present', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const flipFlopCookieInStore = null;
    const setFlipFlopStatus = sinon.spy();
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      isFlipFlopEnabled: null,
      setFlipFlopStatus,
      location: { pathname: 'xyz', search: 'search' },
      switchConfigGlobal: {},
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    sinon.stub(tree, 'checkSiteSpectVariant').returned(true);
    tree.setProps({
      flipFlopItemsList: { tempFlipFlopItemsList },
    });
    tree.instance().componentWillMount();
  });

  it('should call toggleErrorModalState', () => {
    const isFetchingItemsList = false;
    const flipFlopCookieInStore = null;
    const channelType = 'MobileWeb';
    const tempFlipFlopItemsList = [
      { ProductId: '12345' },
      { ProductId: '22222' },
      { ProductId: '33333' },
    ];
    const props = {
      fetchFlipFlopData,
      registryListFetched: true,
      registriesList: tempFlipFlopItemsList,
      flipFlopCookieInStore,
      isFetchingItemsList,
      labels,
      channelType,
      match: { params: { regType: 'BRD' } },
      location: { pathname: 'xyz', search: 'search' },
      endPoints,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.setState({ mountedState: false, timeOutSet: false });
    tree.instance().toggleErrorModalState();
    expect(tree.state('mountedState')).to.be.equal(true);
  });

  it('#should call getFlipFlopStartIndex for flipFlopAllCategories and read cookies', () => {
    const isFetchingItemsList = false;
    const tempFlipFlopItemsList = [
      { test2: 'test', COLLECTION_FLAG: '1', PERSONALIZATION_TYPE: undefined },
      { test3: 'test', COLLECTION_FLAG: '0', PERSONALIZATION_TYPE: undefined },
      { test4: 'test', COLLECTION_FLAG: '1', PERSONALIZATION_TYPE: undefined },
    ];
    const flipFlopCookieInStore = null;
    const props = {
      resetFlipFlopData,
      fetchFlipFlopData,
      registrySiteConfig,
      flipFlopCookieInStore,
      labels,
      isFetchingItemsList,
      regTypeInStore: 'BRD',
      switchConfigGlobal: {},
      match: { params: { regType: 'BRD', id: '12345' } },
      location: { pathname: 'xyz', search: 'search' },
      flipFlopItemsList: tempFlipFlopItemsList,
      isGroupByFlipFlopEnable: true,
    };
    tree = shallow(<FlipFlop {...props} getContent={getContent} />);
    tree.instance().getFlipFlopStartIndex('BRD', 'flipFlopAllCategories');
    expect(tree.state('selectedCategory')).to.equal('flipFlopAllCategories');
  });

  describe('#componentWillReceiveProps', () => {
    it('#should call fetchFlipFlopData, When flipFlop Items List is empty', () => {
      const isFetchingItemsList = false;
      const tempFlipFlopItemsList = [];
      const flipFlopCookieInStore = null;
      const props = {
        resetFlipFlopData,
        fetchFlipFlopData,
        registrySiteConfig,
        flipFlopCookieInStore,
        labels,
        isFetchingItemsList,
        switchConfigGlobal: {},
      };
      tree = shallow(<FlipFlop {...props} getContent={getContent} />);
      tree.setProps({
        flipFlopItemsList: tempFlipFlopItemsList,
      });

      expect(fetchFlipFlopData.called).to.equal(true);
    });
    it('#should call triggerAPICallFunction, When flipFlop Items List has an item with empty regTypeInStore', () => {
      const isFetchingItemsList = false;
      const tempFlipFlopItemsList = [
        {
          test2: 'test',
          COLLECTION_FLAG: '1',
          PERSONALIZATION_TYPE: undefined,
        },
        {
          test3: 'test',
          COLLECTION_FLAG: '0',
          PERSONALIZATION_TYPE: undefined,
        },
        {
          test4: 'test',
          COLLECTION_FLAG: '1',
          PERSONALIZATION_TYPE: undefined,
        },
      ];
      const flipFlopCookieInStore = null;
      const props = {
        resetFlipFlopData,
        fetchFlipFlopData,
        registrySiteConfig,
        flipFlopCookieInStore,
        labels,
        isFetchingItemsList,
        regTypeInStore: '',
        switchConfigGlobal: {},
        selectedCategories: { BRD: 'Wedding' },
        match: { params: { regType: 'BRD', id: '12345' } },
        location: { pathname: 'xyz', search: 'search' },
        flipFlopItemsList: tempFlipFlopItemsList,
      };
      const state = { isFlipFlopEnabled: true };
      tree = shallow(
        <FlipFlop {...props} getContent={getContent} {...state} />
      );
      tree.instance().triggerAPICallFunction();
      expect(tree.state('selectedCategory')).to.equal('Wedding');
    });
    it('#should call triggerAPICallFunction, When flipFlop Items List has an item with regTypeInStore value', () => {
      const isFetchingItemsList = false;
      const tempFlipFlopItemsList = [
        {
          test2: 'test',
          COLLECTION_FLAG: '1',
          PERSONALIZATION_TYPE: undefined,
        },
        {
          test3: 'test',
          COLLECTION_FLAG: '0',
          PERSONALIZATION_TYPE: undefined,
        },
        {
          test4: 'test',
          COLLECTION_FLAG: '1',
          PERSONALIZATION_TYPE: undefined,
        },
      ];
      const flipFlopCookieInStore = null;
      const props = {
        resetFlipFlopData,
        fetchFlipFlopData,
        registrySiteConfig,
        flipFlopCookieInStore,
        labels,
        isFetchingItemsList,
        regTypeInStore: 'BRD',
        switchConfigGlobal: {},
        match: { params: { regType: 'BRD', id: '12345' } },
        location: { pathname: 'xyz', search: 'search' },
        flipFlopItemsList: tempFlipFlopItemsList,
        isGroupByFlipFlopEnable: true,
      };
      tree = shallow(<FlipFlop {...props} getContent={getContent} />);
      tree.instance().triggerAPICallFunction();
      expect(tree.state('selectedCategory')).to.equal('flipFlopAllCategories');
    });
  });
});
