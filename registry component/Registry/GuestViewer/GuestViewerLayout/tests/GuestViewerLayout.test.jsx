// eslint-disable-next-line max-lines
import React from 'react';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';
import { memoryHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { LAT_LONG_COOKIE } from '@bbb-app/constants/cookies';
import { getDataFromSessionStorage } from '@bbb-app/utils/RegistryUtils';
import * as commonUtil from '@bbb-app/utils/common';
import configureStore from '../../../../../../store';
import GuestViewerLayout, {
  renderBackToSearch,
  renderTimeoutError,
} from '../GuestViewerLayout';
import QuickViewModalWrapper from '../../../../../../containers/QuickViewModal/QuickViewModalWrapper/QuickViewModalWrapper.async';

configure({ adapter: new Adapter() });

const returnFilteredItems = sinon.spy();
describe(__filename, () => {
  let store;
  const breadCrumbList = [
    {
      name: 'Home',
      url: '/',
    },
  ];
  let endPoints;
  let eventType;
  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    breadCrumbList.push({
      name: `${eventType} Registry`,
      url: '/store/static/pages',
    });
    endPoints = { home: '/' };
  });
  afterEach(() => {
    store = null;
  });

  it('should render skeleton when isFetching is true', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('TBS_BedBathCanada');
    const props = {
      isFetching: true,
      isMobile: false,
      labels: { giftGiver: 'giver' },
      dynamicContentState: {
        content: 'sxyz',
      },
      config: {
        uploadPhoto: true,
      },
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryData: { dataFromSolrCall: true },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(toJson(tree)).to.matchSnapshot();
    commonUtil.getSiteId.restore();
  });

  it('isVisible to change the state of the modal', () => {
    const props = {
      labels: { giftGiver: 'giver' },
      registryData: { dataFromSolrCall: true },
      endPoints,
      eventType: 'Baby',
      breadCrumbList,
    };
    const tree = shallow(<GuestViewerLayout {...props} isFetching />);
    tree.instance().isVisible(false);
    expect(tree.state('giftGiverModalVisiblity')).to.equal(false);
  });

  it('should render component when isFetching is false', () => {
    const props = {
      isMobile: false,
      config: {
        uploadPhoto: true,
      },
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      labels: { giftGiver: 'giver' },
      registryFacetsFilter: [{}, {}],
      registryData: {
        dataFromSolrCall: true,
        registryResVO: { registrySummaryVO: { giftRegistered: 2 } },
      },
      endPoints,
      eventType: 'Housewarming',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render component when isFetching is false & filter items are there', () => {
    const props = {
      isMobile: false,
      config: {
        uploadPhoto: true,
      },
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      labels: { giftGiver: 'giver' },
      dateSortedfirstCategoryList: [
        {
          registryItemList: [
            { name: 'prod1', skuInStore: '1' },
            { name: 'prod2' },
          ],
        },
      ],
      selectedCheckboxFilter: 'store-pickup',
      endPoints,
      eventType: 'College/University',
      breadCrumbList,
    };
    const filteredSortedOosCategoryItems = [];
    const filteredFirstCategoryItems = [];

    const tree = shallow(
      <GuestViewerLayout
        returnFilteredItems={returnFilteredItems}
        filteredFirstCategoryItems={filteredFirstCategoryItems}
        filteredSortedOosCategoryItems={filteredSortedOosCategoryItems}
        {...props}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render component timeout error', () => {
    const props = {
      isMobile: false,
      config: {
        uploadPhoto: true,
      },
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      oosErrorStatus: {
        response: {
          axiosErrorMessage: 'timeout',
        },
      },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'other',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render component when isFetching is false and on mobile', () => {
    const props = {
      isMobile: true,
      dynamicContentState: {
        content: 'sxyz',
      },
      config: {
        uploadPhoto: true,
      },
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render skeleton when isFetching is true and on mobile', () => {
    const props = {
      isMobile: true,
      dynamicContentState: {
        content: 'sxyz',
      },
      config: {
        uploadPhoto: true,
      },
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render PerfectGift component', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render CategoryAccordian component', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render CategoryAccordian component tilesView = 1', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      config: {
        uploadPhoto: true,
      },
      tilesView: '1',
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryOtherCategoryList: { remainingCategoryBuckets: [] },
      registryOosCategoryList: { atgResponse: [{}, {}] },
      labels: {},
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render CategoryAccordian component tilesView = 2', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      tilesView: '2',
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      sortedPriceData: { inStockCategoryBuckets: [] },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render CategoryAccordian component tilesView = 3 with date sorted data in items in list', () => {
    const props = {
      labels: {},
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      tilesView: '3',
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      dateSortedfirstCategoryList: [
        {
          registryItemList: [{ name: 'prod1' }, { name: 'prod2' }],
        },
      ],
      dateSortedOosCategoryList: {
        atgResponse: [
          { registryItemList: [{ name: 'prod1' }, { name: 'prod2' }] },
        ],
      },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render CategoryAccordian component tilesView = 3 without date sorted data in items in list', () => {
    const props = {
      labels: {},
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      tilesView: '3',
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should call saveLandingZip prop', () => {
    const saveLandingZip = sinon.stub();
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      akamaiHeader: {
        isFetching: false,
        data: {
          data: {
            zip: '11111',
          },
        },
      },
      saveLandingZip,
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const wrapper = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    const wrapperInstance = wrapper.instance();
    wrapperInstance.componentDidMount();
    /* eslint no-unused-expressions: 0 */
    expect(saveLandingZip).to.have.been.called;
  });

  it('should return item if available in store', () => {
    const saveLandingZip = sinon.stub();
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      akamaiHeader: {
        isFetching: false,
        data: {
          data: {
            zip: '11111',
          },
        },
      },
      saveLandingZip,
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const filteredCategoryItems = [{ skuInStore: '1' }, { skuInStore: '-1' }];
    const wrapper = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    const wrapperInstance = wrapper.instance();
    const itemarray = wrapperInstance.getBopisItemCount(filteredCategoryItems);
    expect(itemarray.length).to.be.equal(1);
  });

  it('should call saveLandingZip prop in case of componentWillReceiveProps', () => {
    const saveLandingZip = sinon.stub();
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      akamaiHeader: {
        isFetching: false,
        data: {
          data: {
            zip: '11111',
          },
        },
      },
      saveLandingZip,
      labels: { giftGiver: 'giver' },
      isQuickViewOpen: true,
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const wrapper = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    wrapper
      .find(QuickViewModalWrapper)
      .first()
      .props('QuickViewModalWrapper')
      .hideParent();
    expect(
      wrapper
        .find(QuickViewModalWrapper)
        .first()
        .props('QuickViewModalWrapper')
        .hideParent()
    ).equal(undefined);
    const nextProps = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      akamaiHeader: {
        isFetching: false,
        data: {
          data: {
            zip: '11112',
          },
        },
      },
      saveLandingZip,
      isQuickViewOpen: false,
    };
    const wrapperInstance = wrapper.instance();
    wrapperInstance.componentWillReceiveProps(nextProps);
    /* eslint no-unused-expressions: 0 */
    expect(saveLandingZip).to.have.been.called;
  });

  it('setLandingZip should call saveLandingZip prop with zip null', () => {
    const saveLandingZip = sinon.stub();
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      akamaiHeader: {
        isFetching: false,
        data: {
          data: {
            zip: '11111',
          },
        },
      },
      saveLandingZip,
      labels: { giftGiver: 'giver' },
      isQuickViewOpen: undefined,
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const nextProps = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      akamaiHeader: {
        isFetching: true,
        data: {
          data: {
            zip: '11111',
          },
        },
      },
      saveLandingZip,
      isQuickViewOpen: true,
    };
    const wrapper = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    const wrapperInstance = wrapper.instance();
    wrapperInstance.componentWillReceiveProps(nextProps);
    wrapperInstance.setLandingZip('', saveLandingZip);
    /* eslint no-unused-expressions: 0 */
    expect(saveLandingZip).to.have.been.called;
  });

  it('should call saveLandingZip prop in case of existing latLngCookie', () => {
    const saveLandingZip = sinon.stub();
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryFirstCategoryList: { categoryBuckets: [] },
      akamaiHeader: {
        isFetching: false,
        data: {
          data: {
            zip: '11111',
          },
        },
      },
      saveLandingZip,
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const cookie = new Cookies();
    cookie.set(LAT_LONG_COOKIE, '-74.329795,40.718954,1,Springfield,NJ,07081');
    const wrapper = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    const wrapperInstance = wrapper.instance();
    wrapperInstance.componentDidMount();
    /* eslint no-unused-expressions: 0 */
    expect(saveLandingZip).to.have.been.called;
  });

  it('should render renderBackToSearch', () => {
    const labels = 'abc';
    const searchRegistryUrl = '/';
    const wrapper = shallow(renderBackToSearch(labels, searchRegistryUrl));
    expect(wrapper.find('.grid-container')).to.have.lengthOf('1');
  });

  it('should call getRegistryTags function correctly', () => {
    const props = {
      sortedPriceData: { notInStockCategoryBuckets: [1, 2, 3] },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const registryData = '';
    const track = sinon.spy();
    const wrapper = shallow(<GuestViewerLayout track={track} {...props} />);
    wrapper.instance().getRegistryTags(registryData);
  });

  it('should call renderDialogBoxOnGiftGiver function for min<=0 as true', () => {
    window.sessionStorage.setItem(
      'registryItemThresholdTime1',
      'Fri May 14 2030 16:51:37 GMT+0530 (India Standard Time)'
    );
    const key = 'registryItemThresholdTime1';
    const response = getDataFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem(
      'registryItemThresholdTime1'
    );
    const props = {
      registryId: 1,
      switchConfig: { enableGuestViewerPopup: true },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const track = sinon.spy();
    const wrapper = shallow(<GuestViewerLayout track={track} {...props} />);
    wrapper.instance().renderDialogBoxOnGiftGiver();
    wrapper.instance().isVisible(true);
    expect(response).to.equal(afterValue);
  });
  it('should call renderDialogBoxOnGiftGiver function for min<=0 as false', () => {
    window.sessionStorage.setItem(
      'registryItemThresholdTime1',
      'Fri May 14 2021 16:51:37 GMT+0530 (India Standard Time)'
    );
    const key = 'registryItemThresholdTime1';
    const response = getDataFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem(
      'registryItemThresholdTime1'
    );
    const props = {
      registryId: 1,
      switchConfig: { enableGuestViewerPopup: true },
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const track = sinon.spy();
    const wrapper = shallow(<GuestViewerLayout track={track} {...props} />);
    wrapper.instance().renderDialogBoxOnGiftGiver();
    wrapper.instance().isVisible(true);
    expect(response).to.equal(afterValue);
  });
  it('should render ProductTileSkeleton', () => {
    const props = {
      isItemsFetching: true,
      isSortedFetching: true,
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const track = sinon.spy();
    const wrapper = shallow(<GuestViewerLayout track={track} {...props} />);
    expect(wrapper.find('Skeleton')).to.have.lengthOf('1');
  });

  it('should read filteredItemsCount correctly', () => {
    const props = {
      isFiltered: true,
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const track = sinon.spy();
    const wrapper = shallow(<GuestViewerLayout track={track} {...props} />);
    expect(wrapper).to.not.equal(null);
  });

  it('should render renderTimeoutError', () => {
    const props = {
      labels: 'abc',
      categoryErrorStatus: { response: { axiosErrorMessage: 'timeout error' } },
      oosErrorStatus: '',
    };
    const wrapper = shallow(renderTimeoutError(props));
    expect(wrapper).to.have.lengthOf('1');
  });

  it('should render CategoryAccordian component tilesView = 1 & selectedCheckboxFilter is inStock', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      config: {
        uploadPhoto: true,
      },
      tilesView: '1',
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryOtherCategoryList: { remainingCategoryBuckets: [] },
      registryOosCategoryList: { atgResponse: [{}, {}] },
      selectedCheckboxFilter: 'in-stock-online',
      labels: {},
      filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render CategoryAccordian component tilesView = 1 & selectedCheckboxFilter is inStock else part', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      config: {
        uploadPhoto: true,
      },
      tilesView: '1',
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryOtherCategoryList: { remainingCategoryBuckets: [] },
      registryOosCategoryList: { atgResponse: [{}, {}] },
      selectedCheckboxFilter: 'store-pickup',
      labels: {},
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render CategoryAccordian component tilesView = 1 & selectedCheckboxFilter is inStock else second part', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      config: {
        uploadPhoto: true,
      },
      tilesView: '1',
      getWarrantyInfo: {
        body: 'info',
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      registryOtherCategoryList: { remainingCategoryBuckets: [] },
      registryOosCategoryList: { atgResponse: [{}, {}] },
      selectedCheckboxFilter: 'abc',
      labels: {},
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render CategoryAccordian component tilesView = 2 & selectedCheckboxFilter is inStock', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      tilesView: '2',
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      sortedPriceData: { inStockCategoryBuckets: [] },
      selectedCheckboxFilter: 'in-stock-online',
      labels: { giftGiver: 'giver' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render CategoryAccordian component tilesView = 3  & selectedCheckboxFilter is inStock', () => {
    const props = {
      labels: {},
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      tilesView: '3',
      getWarrantyInfo: {
        body: 'info',
      },
      config: {
        uploadPhoto: true,
      },
      selectedCheckboxFilter: 'in-stock-online',
      getPerfectGift: { type: 'gift' },
      getHelp: { type: 'help' },
      showMarketingBanner: true,
      dateSortedfirstCategoryList: [
        {
          registryItemList: [{ name: 'prod1' }, { name: 'prod2' }],
        },
      ],
      dateSortedOosCategoryList: {
        atgResponse: [
          { registryItemList: [{ name: 'prod1' }, { name: 'prod2' }] },
        ],
      },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const tree = shallow(
      <GuestViewerLayout returnFilteredItems={returnFilteredItems} {...props} />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render container', () => {
    const props = {
      getWarrantyInfo: { body: 'body' },
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const track = sinon.spy();
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <MediaQuery minWidth={750}>
            <GuestViewerLayout track={track} {...props} />
          </MediaQuery>
        </Provider>
      </Router>
    );
    expect(wrapper.find('Container')).to.have.lengthOf('1');
    wrapper.unmount();
  });
  it('should render MarketingBanner', () => {
    const props = {
      labels: { giftGiver: 'giver' },
      registryData: { dataFromSolrCall: true },
      profileData: {
        email: 'test@yopmail.com',
      },
      dateSortedOosCategoryList: {
        atgResponse: [
          {
            registryItemList: [
              {
                id: '11',
              },
            ],
          },
        ],
      },
      dateSortedfirstCategoryList: [
        {
          registryItemList: [{ id: '11' }],
        },
      ],
      filteredFirstCategoryItems: [],
      endPoints,
      eventType: 'Wedding',
      breadCrumbList,
    };
    const wrapperForMarketing = shallow(<GuestViewerLayout {...props} />);
    const instance = wrapperForMarketing.instance();
    const marketingData = {
      components: [
        {
          id: '11',
          content: {},
        },
      ],
    };
    const referContentStub = sinon
      .stub(instance, 'getRefContent')
      .returns(marketingData);
    instance.render();
    referContentStub.restore();
  });
  after(() => {
    // Remove lat-lng cookie
    const cookies = new Cookies();
    cookies.remove(LAT_LONG_COOKIE);
  });
});
