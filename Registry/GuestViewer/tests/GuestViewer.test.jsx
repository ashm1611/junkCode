/* eslint max-lines: ["error", 1906]*/
import React from 'react';
import { shallow, configure } from 'enzyme';
import Cookies from 'universal-cookie';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as common from '@bbb-app/utils/common';
import { isPageSpecificRegeneration } from '@bbb-app/utils/mPulse';
import * as AkamaiApi from '@bbb-app/redux/akamai/constants';
import * as StoreInfoUtils from '@bbb-app/utils/StoreInfoUtils';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import allRegTypes from '@bbb-app/registry-type/registryTypes';
import * as ssUtils from '@bbb-app/utils/getStoreFromCookies';
import { getDataFromSessionStorage } from '@bbb-app/utils/RegistryUtils';
import { GuestViewer, mapDispatchToProps } from '../GuestViewer';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const dynamicContentState = {
    content: {
      11329: {
        components: [
          {
            foo: 'bar',
          },
        ],
      },
    },
  };
  const onComponentMount = sinon.spy();
  const setBuyOffContextValue = sinon.spy();
  const getRegistryFirstCategory = sinon.spy();
  const getRegistryGuestData = sinon.spy();
  const getProfile = sinon.spy();
  const updateBopisCheckBoxState = sinon.spy();
  const getRefContent = sinon.spy();
  const favoriteStore = { userSiteItems: { favouriteStoreId: '' } };
  const popular = [
    {
      registryCode: 'BRD',
      registryIndex: '1',
      registryName: 'Wedding',
      registryTypeId: '200001',
      registryImg: '/wedding/image',
    },
  ];
  const match = {
    params: {
      id: '123',
    },
    path: 'store/giftRegistry/viewRegistryOwner/myItems/',
  };
  const isMPulseEnabled = 'true';
  const other = [
    {
      registryCode: 'BIR',
      registryIndex: '7',
      registryName: 'Birthday',
      registryTypeId: '200006',
      registryImg: '',
    },
  ];
  const profileData = {
    repositoryId: '1111',
  };
  const labels = {
    referredContent: [
      { key: 'needHelp', id: 11329 },
      { key: 'GiftGiverMarketingBanner', id: '123' },
    ],
    registryDetails: {
      emailSentResponse: '',
    },
  };
  const switchConfig = { enableMPulse: true };
  const globalSwitchConfig = { globalMPulseEnable: true, enableCSLabels: true };

  const mPulseSiteConfig = {
    pageLevelConfig: {
      RegistryGuest: {
        PageViewMarks: {
          'ux-destination-verified': ['ux-image-inline-logo'],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
        PageSpecificMarks: {
          'ux-destination-verified': [
            'ux-text-registrant-name',
            'ux-text-event-date',
          ],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [
            'ux-text-item-requested',
            'ux-text-item-purchased',
          ],
        },
        ConditionalMarksFlag: {
          'ux-destination-verified': ['ux-action-before-load'],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
      },
    },
  };
  const removeConditionalMarksFlag = sinon.stub();
  const setPageMarks = sinon.stub();
  window.instrumentation = {
    removeConditionalMarksFlag,
    setPageMarks,
  };
  const fetchSiteSpectDateSort = sinon.stub();
  it('should render correctly', () => {
    const isBrowserStub = sinon.stub(common, 'isBrowser').returns(true);

    const regTypes = {
      popular,
      other,
    };
    const location = {
      search: '?skuAdded=67742813',
      pathname: 'store/giftRegistry/viewRegistryOwner/myItems/',
    };
    const registryData = {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Birthday',
          eventDate: '11/11/11',
          registryId: '12345',
          giftRegistered: '5',
          storedValueOptIn: false,
        },
        registryVO: {
          tnGiftsPurchased: '5',
        },
      },
    };
    const nextProps = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventType: 'Birthday',
            eventDate: '11/11/11',
            registryId: '12345',
            giftRegistered: '5',
            storedValueOptIn: false,
          },
          registryVO: {
            tnGiftsPurchased: '5',
          },
          dataFromSolrCall: '',
        },
      },
      store: {
        storeId: '8908',
      },
      eventType: 'Wedding',
      location,
    };
    const props = {
      isBopisFeatureEnable: true,
      enableCashFund: true,
      registryData,
      getRegistryFirstCategory: sinon.spy(),
      getProfile,
      isMPulseEnabled,
      isItemsFetching: true,
      getRegistryGuestData,
      location: {
        search: '?sorting=2',
      },
      match,
      profileData,
      regTypes,
      labels: {
        registryDetails: {
          referredContent: [
            {
              id: '11329',
              key: 'needHelp',
            },

            {
              id: '9942',
              key: 'tymSurpriseContentHeading',
            },
            {
              id: '9943',
              key: 'tymSurpriseContentSubHeading',
            },
          ],
        },
      },
      onComponentMount,
      buyOffContext: 'abc',
      favoriteStore,
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      akamaiData: {
        zip: '68046',
      },
      switchConfig,
      globalSwitchConfig,
      mPulseSiteConfig,
      fetchSiteSpectDateSort,
      isPickupInStoreModalOpen: true,
      getRefContent: sinon.stub(),
      updateBopisCheckBoxState,
    };
    global.window.instrumentation = {
      removeConditionalMarksFlag,
      setPageMarks,
    };

    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    tree.setState({
      registryBanner: 'abdhj',
    });
    props.regTypes = regTypes;
    props.profileData = profileData;
    props.registryFirstCategoryList = {
      categoryBuckets: {
        catSeoUrl: null,
        categoryId: '10003_FINEDININGGIFTWARE',
        displayName: 'FINE DINING & GIFTWARE',
        recommandedLinks: null,
      },
    };
    props.registryData = {
      dataFromSolrCall: true,
    };
    tree.setProps(props);
    tree.instance().firstStoreApiCalled = false;
    tree.instance().storeId = '8908';
    tree.instance().registryId = '12345';
    tree.instance().lastStoreId = '1123';
    tree.instance().nearestStoreApiResolved = true;
    tree.instance().renderLayout();
    tree.instance().renderSortBy(nextProps);
    tree.setProps({ isItemsFetching: false });
    tree.instance().renderLayout();
    isBrowserStub.restore();
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should update the searchFlag correctly', () => {
    const regTypes = {
      popular,
      other,
    };
    const location = {
      search: '?skuAdded=67742813',
      pathname: 'store/giftRegistry/viewRegistryOwner/myItems/',
    };
    const registryData = {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Birthday',
          eventDate: '11/11/11',
          registryId: '12345',
          giftRegistered: '5',
          storedValueOptIn: false,
        },
        registryVO: {
          tnGiftsPurchased: '5',
        },
        dataFromSolrCall: '',
      },
    };
    const nextProps = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventType: 'Wedding',
            eventDate: '11/11/11',
            registryId: '54321',
            giftRegistered: '5',
            storedValueOptIn: false,
          },
          registryVO: {
            tnGiftsPurchased: '5',
          },
          dataFromSolrCall: '',
        },
      },
      storeDetails: {
        storeId: '8908',
      },
      eventType: 'Wedding',
      location,
    };
    const props = {
      handleTealiumEvent: sinon.spy(),
      isBopisFeatureEnable: true,
      getRegistryFirstCategory: sinon.spy(),
      location: {
        search: '?sorting=3',
      },
      getProfile,
      isMPulseEnabled,
      getRegistryGuestData,
      registryData,
      profileData: {
        repositoryId: '1111',
      },
      regTypes,
      labels: {
        registryDetails: {
          referredContent: [
            {
              id: '9942',
              key: 'tymSurpriseContentHeading',
            },
            {
              id: '9943',
              key: 'tymSurpriseContentSubHeading',
            },
          ],
        },
      },
      match,
      onComponentMount,
      buyOffContext: 'abc',
      favoriteStore,
      switchConfig,
      globalSwitchConfig,
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      fetchSiteSpectDateSort,
      getRefContent: sinon.stub(),
      updateBopisCheckBoxState,
    };
    const tree = shallow(<GuestViewer {...props} match={match} />);
    tree.setState({
      searchFlag: 'new flag',
      isSuccess: true,
      emailSentResponse: true,
      checkBoxChecked: true,
      firstCategoryApiCallFlag: true,
    });
    const error = {
      body: {
        response: {
          data: {
            errorMessages: [{ key: 'value' }],
          },
        },
      },
    };
    props.regTypes = regTypes;
    props.profileData = profileData;
    tree.instance().enableSearchFlag('updated flag');
    tree.instance().emailSubmitFormError(error);
    tree.instance().clearSubmitResponse();
    tree.instance().storeId = true;
    tree.instance().lastStoreId = false;
    tree.instance().nearestStoreApiResolved = true;
    tree.instance().referredContentCallFired = true;
    tree.instance().firstStoreApiCalled = true;
    tree.instance().renderSortBy(nextProps);
    tree.instance().tealiumTagsOnClickOfRegEmail(undefined);
    expect(tree.state('searchFlag')).to.equal('updated flag');
    expect(tree.state('isSuccess')).to.equal(null);
    expect(tree.state('checkBoxChecked')).to.equal(false);
  });
  it('should update the searchFlag correctly', () => {
    const regTypes = {
      popular,
      other,
    };
    const props = {
      updateBopisCheckBoxState,
      getRegistryFirstCategory,
      location: {
        search: '?sorting=2',
      },
      getProfile,
      getRegistryGuestData,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventType: 'Birthday',
            isPublic: '0',
          },
        },
      },
      profileData: {
        repositoryId: '1111',
      },
      regTypes,
      labels: {
        registryDetails: {
          referredContent: [
            {
              id: '9942',
              key: 'tymSurpriseContentHeading',
            },
            {
              id: '9943',
              key: 'tymSurpriseContentSubHeading',
            },
          ],
        },
      },
      match,
      onComponentMount,
      buyOffContext: 'abc',
      favoriteStore,
      switchConfig,
      globalSwitchConfig,
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      fetchSiteSpectDateSort,
    };
    const tree = shallow(<GuestViewer {...props} match={match} />);
    tree.setState({
      searchFlag: 'new flag',
      isSuccess: true,
      emailSentResponse: true,
      checkBoxChecked: true,
      firstCategoryApiCallFlag: true,
    });
    props.regTypes = regTypes;
    props.profileData = profileData;
    tree.instance().handleCheckBox();
    expect(tree.state('checkBoxChecked')).to.equal(false);
  });
  it('should render skeleton when isFetching is true', () => {
    const getStoreFromCookiesStub = sinon
      .stub(ssUtils, 'getStoreFromCookies')
      .returns(undefined);
    const store = { id: '1234' };
    const getNearestStoreFromApiStub = sinon
      .stub(AkamaiApi, 'getNearestStoreFromApi')
      .callsFake(() => store);
    const props = {
      updateBopisCheckBoxState,
      isFetching: true,
      isMobile: false,
      isMPulseEnabled,
      match,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    window.instrumentation = {
      removeConditionalMarksFlag,
      setPageMarks,
    };

    const tree = shallow(
      <GuestViewer {...props} match={match} getRefContent={getRefContent} />
    );
    getStoreFromCookiesStub.restore();
    getNearestStoreFromApiStub.restore();
    expect(tree).to.not.equal(null);
  });
  it('should render skeleton when isFetching is true and on mobile', () => {
    const props = {
      updateBopisCheckBoxState,
      isFetching: true,
      isMobile: true,
      isMPulseEnabled,
      match,
      onComponentMount,
      setBuyOffContextValue,
      getRegistryGuestData,
      location: {
        search: 'avc',
      },
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      labels,
      switchConfig,
      globalSwitchConfig,
      mPulseSiteConfig,
      fetchSiteSpectDateSort,
    };
    window.instrumentation = {
      removeConditionalMarksFlag,
      setPageMarks,
    };

    const tree = shallow(
      <GuestViewer {...props} match={match} getRefContent={getRefContent} />
    );
    expect(tree).to.not.equal(null);
  });
  it('clearSubmitResponse: call function', () => {
    const props = {
      updateBopisCheckBoxState,
      isMPulseEnabled,
      match,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      getRegistryGuestData,
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    tree.instance().clearSubmitResponse();
    expect(tree.state('submitInProgress')).to.be.equal(false);
  });
  it('enableSearchFlag: call function', () => {
    const props = {
      updateBopisCheckBoxState,
      isMPulseEnabled,
      match,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      getRegistryGuestData,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
    };
    const tree = shallow(
      <GuestViewer {...props} match={match} getRefContent={getRefContent} />
    );
    tree.instance().enableSearchFlag(false);
    expect(tree.state('searchFlag')).to.be.equal(false);
  });

  it('changeFilter: call function', () => {
    const props = {
      updateBopisCheckBoxState,
      isMPulseEnabled,
      match,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    tree.instance().changeFilter('test', true, '1', 'View All');
    expect(tree.state('isFiltered')).to.be.equal(true);
  });
  it('emailSubmitFormSuccess: call function for success', () => {
    const props = {
      updateBopisCheckBoxState,
      isMPulseEnabled,
      match,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const dataObj = {
      body: {
        data: {
          result: {},
        },
      },
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    tree.instance().emailSubmitFormSuccess(dataObj);
    expect(tree.state('isSuccess')).to.be.equal(true);
  });
  it('emailSubmitFormSuccess: call function success false', () => {
    const props = {
      updateBopisCheckBoxState,
      isMPulseEnabled,
      match: {
        params: {
          id: 1,
        },
      },
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const dataObj = {
      body: {
        data: {
          component: { emailResponse: '' },
        },
      },
    };
    const tree = shallow(
      <GuestViewer {...props} match={match} getRefContent={getRefContent} />
    );
    tree.instance().emailSubmitFormSuccess(dataObj);
    expect(tree.state('isSuccess')).to.be.equal(false);
  });
  it('emailSubmitFormError: call function', () => {
    const props = {
      updateBopisCheckBoxState,
      isMPulseEnabled,
      match: {
        params: {
          id: 1,
        },
      },
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const dataObj = {
      body: {
        response: {
          data: {
            errorMessages: [{ message: '' }],
          },
        },
      },
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    tree.instance().emailSubmitFormError(dataObj);
    expect(tree.state('isSuccess')).to.be.equal(false);
  });
  it('emailSubmitForm: call function', () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .resolves(true);
    const handleTealiumEvent = () => {};
    const props = {
      updateBopisCheckBoxState,
      match: {
        params: {
          id: 1,
        },
      },
      labels,
      onComponentMount,
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      handleTealiumEvent,
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      location: {
        search: 'avc',
      },
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            registryId: '12312312',
            eventType: 'Wedding',
          },
        },
      },
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const formData = {
      senderEmail: 'asd@wer.com',
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    tree.instance().emailSubmitForm(formData);
    expect(tree).to.not.equal(null);
    triggerServerRequestStub.restore();
  });
  it('render Notification component with deleted registry message', () => {
    const props = {
      updateBopisCheckBoxState,
      errorStatus: 'err_fetching_deleted_registry',
      match: {
        params: {
          id: 1,
        },
      },
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    expect(tree).to.not.equal(null);
  });

  it('render Notification component', () => {
    const props = {
      errorStatus: 'Something went wrong. Please try again later.',
      match: {
        params: {
          id: 1,
        },
      },
      updateBopisCheckBoxState,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    expect(tree).to.not.equal(null);
  });

  it('render Notification component for error object', () => {
    const props = {
      errorStatus: {},
      match: {
        params: {
          id: 1,
        },
      },
      updateBopisCheckBoxState,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    expect(tree).to.not.equal(null);
  });

  it('render Notification component for error array', () => {
    const props = {
      errorStatus: [{ code: '78', message: 'error' }],
      match: {
        params: {
          id: 1,
        },
      },
      updateBopisCheckBoxState,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    expect(tree).to.not.equal(null);
  });

  it('handleCheckBox: call function', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
      updateBopisCheckBoxState,
      labels,
      onComponentMount,
      location: {
        search: 'avc',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    tree.setState({
      checkBoxChecked: true,
    });
    tree.instance().handleCheckBox();
    expect(tree.state('checkBoxChecked')).to.be.equal(false);
  });
  it('mapDispatchToProps should return a prop fetchRegistryData which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const data = {
      popular,
      other,
    };
    const props = mapDispatchToProps(dispatch);
    props.onComponentMount(data, '1111', true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchRegistryTypes which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.onComponentMount(null, '1111', true, '123');
    expect(dispatch.called).to.equal(true);
  });
  it('Update Banner', () => {
    const regTypes = {
      popular,
      other,
    };
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventType: '',
            isPublic: '1',
          },
        },
      },
      updateBopisCheckBoxState,
      isMPulseEnabled,
      regTypes,
      match: {
        params: {
          id: 1,
        },
      },
      onComponentMount,
      location: {
        search: 'avc',
      },
      switchConfig,
      globalSwitchConfig,
      mPulseSiteConfig,
      dynamicContentState: {
        content: 'someContent',
      },
      labels,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
      getRefContent: sinon.stub(),
    };
    const wrapper = shallow(<GuestViewer {...props} />);
    wrapper.setState({
      registryBanner: 'abdhj',
    });
    props.regTypes = regTypes;
    wrapper.setProps({
      props,
    });
    window.instrumentation = {
      removeConditionalMarksFlag,
      setPageMarks,
    };

    expect(wrapper).to.not.equal(null);
  });
  it('mapDispatchToProps should return a prop getRefContent which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const referredContentArray = [];
    const props = mapDispatchToProps(dispatch);
    props.getRefContent(referredContentArray);
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop updateBopisCheckBoxState which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const payload = {};
    const props = mapDispatchToProps(dispatch);
    props.updateBopisCheckBoxState(payload);
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop copyRegistryAct which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.copyRegistryAct('11', '1111', 'BA1');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop getRegistryFirstCategory which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getRegistryFirstCategory('11', '1111', 'BA1');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop redirectTo which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.redirectTo('/not-found');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop resetResponse which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.resetResponse();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop onPickupInStoreButtonClick which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.onPickupInStoreButtonClick('11');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop searchStoreDetails which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.searchStoreDetails('11');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop getProfile which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getProfile('11');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop setBuyOffContext which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setBuyOffContext(false);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop setBuyOffContextValue which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setBuyOffContextValue('11');
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop fetchFavoriteStore which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchStore('12345');
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop handleTealiumEvent which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const tealiumInfo = {};
    const actionType = 'email registry';
    const pageType = 'abc';
    const props = mapDispatchToProps(dispatch);
    props.handleTealiumEvent(actionType, tealiumInfo, pageType);
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop saveLandingZip which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.saveLandingZip('12345');
    expect(dispatch.called).to.equal(true);
  });
  it('shoul call rest functions of mapDispatchToProps', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.clearGuestData();
    props.resetIsItemsFetchingStatus();
    props.onQuickViewButtonClick();
    props.getRegistryGuestData();
    props.updateStateData();
    props.addFormField();
    props.fetchContentStack();
    props.contributeCashFund();
    props.clearContributeCashFund();
  });
  it('should render skeleton when isFetching else', () => {
    const props = {
      isFetching: true,
      isMobile: false,
      isMPulseEnabled,
      match,
      onComponentMount,
      location: {
        search: '?sorting=2',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      labels,
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
      getRefContent: sinon.stub(),
      profileData: { repositoryId: '123' },
      getProfile: sinon.stub(),
      updateBopisCheckBoxState: sinon.stub(),
    };
    window.instrumentation = {
      removeConditionalMarksFlag,
      setPageMarks,
    };

    const tree = shallow(<GuestViewer {...props} />);
    const nextProps = {
      registryFirstCategoryList: {},
      dateSortedfirstCategoryList: {},
      profileData: { repositoryId: '234' },
      selectedFilters: {},
    };
    tree.instance().componentWillReceiveProps(nextProps);
    tree.instance().updateItemsInFilteredMap(nextProps);
    expect(tree).to.not.equal(null);
  });
  it('should render skeleton when isFetching is true', () => {
    const props = {
      isFetching: true,
      isMobile: false,
      isMPulseEnabled,
      match,
      onComponentMount,
      location: {
        search: '?sorting=2',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      labels,
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
      profileData: { repositoryId: '123' },
      getProfile: sinon.stub(),
      updateBopisCheckBoxState: sinon.stub(),
    };
    window.instrumentation = {
      removeConditionalMarksFlag,
      setPageMarks,
    };
    const tree = shallow(
      <GuestViewer {...props} getRefContent={getRefContent} />
    );
    const nextProps = {
      registryFirstCategoryList: [
        {
          registryItemList: [
            {
              DSLUpdateable: false,
              aboveLine: true,
            },
          ],
        },
      ],
      profileData: { repositoryId: '234' },
    };
    tree.instance().componentWillReceiveProps(nextProps);
    expect(tree).to.not.equal(null);

    const nextProps1 = {
      dateSortedfirstCategoryList: [
        {
          registryItemList: [
            {
              DSLUpdateable: false,
              aboveLine: true,
            },
          ],
        },
      ],
      selectedFilters: {
        sort: ['lowtohigh'],
        price: [25, 50],
      },
    };
    tree.instance().componentWillReceiveProps(nextProps1);
    expect(tree).to.not.equal(null);

    const nextProps2 = {
      dateSortedfirstCategoryList: [
        {
          registryItemList: [
            {
              DSLUpdateable: false,
              aboveLine: true,
            },
          ],
        },
      ],
      selectedFilters: {
        sort: ['hightolow'],
        price: [25, 50],
      },
    };
    tree.instance().componentWillReceiveProps(nextProps2);
    expect(tree).to.not.equal(null);

    const nextProps3 = {
      dateSortedfirstCategoryList: [
        {
          registryItemList: [
            {
              DSLUpdateable: false,
              aboveLine: true,
            },
          ],
        },
      ],
      selectedFilters: {
        sort: ['abc'],
        status: [],
        price: [25, 50],
      },
    };
    tree.instance().componentWillReceiveProps(nextProps3);
    expect(tree).to.not.equal(null);

    const nextProps4 = {
      dateSortedfirstCategoryList: [
        {
          registryItemList: [
            {
              DSLUpdateable: false,
              aboveLine: true,
            },
          ],
        },
      ],
      selectedFilters: {
        sort: ['abc'],
        categories: [],
        price: [25, 50],
      },
    };
    tree.instance().componentWillReceiveProps(nextProps4);
    expect(tree).to.not.equal(null);

    const nextProps5 = {
      dateSortedfirstCategoryList: [
        {
          registryItemList: [
            {
              DSLUpdateable: false,
              aboveLine: true,
            },
          ],
        },
      ],
      selectedFilters: {
        sort: ['abc'],
        price: [25, 50],
      },
    };
    tree.instance().componentWillReceiveProps(nextProps5);
    expect(tree).to.not.equal(null);
  });
  it('should call returnFilteredItemsCount', () => {
    const props = {
      isFetching: true,
      isMobile: false,
      isMPulseEnabled,
      match,
      onComponentMount,
      location: {
        search: '?sorting=2',
      },
      setBuyOffContextValue,
      dynamicContentState,
      interactiveCheckList: {
        averageC1Percentage: 30,
      },
      labels,
      mPulseSiteConfig,
      switchConfig,
      globalSwitchConfig,
      fetchSiteSpectDateSort,
      getRegistryGuestData,
      getRefContent: sinon.stub(),
      profileData: { repositoryId: '123' },
      getProfile: sinon.stub(),
      updateBopisCheckBoxState: sinon.stub(),
    };
    const tree = shallow(<GuestViewer {...props} />);
    const nextProps = {
      dateSortedfirstCategoryList: [
        {
          registryItemList: [
            {
              DSLUpdateable: false,
              aboveLine: true,
            },
          ],
        },
      ],
      selectedFilters: {
        sort: ['lowtohigh'],
        price: [25, 50],
      },
    };
    tree.instance().componentWillReceiveProps(nextProps);
    expect(tree).to.not.equal(null);
  });
});

describe(__filename, () => {
  const saveLandingZip = sinon.stub();
  const onPickupInStoreButtonClick = sinon.stub();
  const getRefContent = sinon.spy();
  const storeDetails = {
    postalCode: '07004',
    storeId: '1',
  };
  const dynamicContentState = {
    content: 'someContent',
  };
  const onComponentMount = sinon.spy();
  const setBuyOffContextValue = sinon.spy();
  const getRegistryFirstCategory = sinon.spy();
  const getRegistryGuestData = sinon.spy();
  const fetchContentStack = sinon.spy();
  const getProfile = sinon.spy();
  const updateBopisCheckBoxState = sinon.spy();
  const favoriteStore = { userSiteItems: { favouriteStoreId: '' } };
  const popular = [
    {
      registryCode: 'BRD',
      registryIndex: '1',
      registryName: 'Wedding',
      registryTypeId: '200001',
      registryImg: '/wedding/image',
    },
  ];
  const other = [
    {
      registryCode: 'BIR',
      registryIndex: '7',
      registryName: 'Birthday',
      registryTypeId: '200006',
      registryImg: '',
    },
  ];
  const profileData = {
    repositoryId: '1111',
  };
  const switchConfig = { enableMPulse: true };
  const globalSwitchConfig = { globalMPulseEnable: true };
  const regTypes = {
    popular,
    other,
  };
  const mPulseSiteConfig = {
    pageLevelConfig: {
      RegistryGuest: {
        PageViewMarks: {
          'ux-destination-verified': ['ux-image-inline-logo'],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
        PageSpecificMarks: {
          'ux-destination-verified': [
            'ux-text-registrant-name',
            'ux-text-event-date',
          ],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [
            'ux-text-item-requested',
            'ux-text-item-purchased',
          ],
        },
        ConditionalMarksFlag: {
          'ux-destination-verified': ['ux-action-before-load'],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
      },
    },
  };
  const removeConditionalMarksFlag = sinon.stub();
  const setPageMarks = sinon.stub();
  window.instrumentation = {
    removeConditionalMarksFlag,
    setPageMarks,
  };
  const defaultProps = {
    updateBopisCheckBoxState,
    getRegistryFirstCategory,
    getProfile,
    getRegistryGuestData,
    fetchContentStack,
    location: {
      search: '?sorting=2',
    },
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Birthday',
          isPublic: '0',
          registryId: '123',
        },
      },
    },
    profileData,
    regTypes,
    labels: {
      registryDetails: {
        referredContent: [
          {
            id: '9942',
            key: 'tymSurpriseContentHeading',
          },
          {
            id: '9943',
            key: 'tymSurpriseContentSubHeading',
          },
        ],
      },
    },
    match: {
      params: {
        id: 1,
      },
    },
    onComponentMount,
    buyOffContext: 'abc',
    favoriteStore,
    setBuyOffContextValue,
    dynamicContentState,
    interactiveCheckList: {
      averageC1Percentage: 30,
    },
    akamaiData: {
      zip: '68046',
    },
    switchConfig,
    globalSwitchConfig,
    mPulseSiteConfig,
  };
  const getTree = props => {
    return shallow(
      <GuestViewer
        storeAvailability={false}
        storeAvailabilityCount={4}
        onPickupInStoreButtonClick={onPickupInStoreButtonClick}
        saveLandingZip={saveLandingZip}
        storeDetails={storeDetails}
        getRefContent={getRefContent}
        {...defaultProps}
        {...props}
      />
    );
  };
  it('should render correctly with handleChangePickupInStore with some value test', () => {
    const eventObj = { preventDefault: () => {} };
    const wrapper = getTree();
    wrapper.instance().handleChangePickupInStore(eventObj);
    // eslint-disable-next-line no-unused-expressions
    expect(saveLandingZip).to.be.called;
    // eslint-disable-next-line no-unused-expressions
    expect(onPickupInStoreButtonClick).to.be.called;
  });

  it('should render correctly with handleChangePickupInStore after store selection', () => {
    const eventObj = { preventDefault: () => {} };
    const wrapper = getTree();
    const isStoreBopisEnabledStub = sinon
      .stub(StoreInfoUtils, 'isStoreBopisEnabled')
      .returns(true);
    wrapper.instance().handleChangePickupInStore(eventObj);
    wrapper.instance().bopisStoreChange(1, false, 2);
    const nextProps = {
      storeDetails: {
        postalCode: '07005',
        storeId: '2',
      },
      selectedCheckboxFilter: 'store-pickup',
      activeRegistry: {
        isPublic: '1',
      },
    };
    wrapper.setProps(nextProps);
    const bopisStoreDetail = {
      isBopisStore: true,
      storeId: '2',
    };
    wrapper.setState({ bopisStoreDetail });
    isStoreBopisEnabledStub.restore();
    expect(wrapper.state('bopisStoreDetail')).to.deep.equal(bopisStoreDetail);
    isStoreBopisEnabledStub.restore();
  });

  it('should render correctly with handleChangePickupInStore after store selection', () => {
    const eventObj = { preventDefault: () => {} };
    const wrapper = getTree();

    wrapper.instance().handleChangePickupInStore(eventObj);
    const nextProps = {
      storeDetails: {
        postalCode: '07005',
        storeId: '22',
      },
      selectedCheckboxFilter: 'store-pickup',
      activeRegistry: {
        isPublic: '1',
      },
    };
    wrapper.setProps(nextProps);
    const bopisStoreDetail = {
      isBopisStore: true,
      storeId: '22',
    };
    wrapper.setState({ bopisStoreDetail });
    expect(wrapper.state('bopisStoreDetail')).to.deep.equal(bopisStoreDetail);
  });

  it('should run isBackButtonPressed function correctly', () => {
    window.sessionStorage.setItem('isBackButtonPressed', 'true');
    const key = 'isBackButtonPressed';
    const response = getDataFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem('isBackButtonPressed');
    const wrapper = getTree();
    expect(response).to.equal(afterValue);
    wrapper.instance().componentDidUpdate();
    expect(wrapper).to.not.equal(null);
  });
  it('should run anchoredSkuId function correctly', () => {
    window.sessionStorage.setItem('anchoredSkuId', '12345');
    const key = 'anchoredSkuId';
    const response = getDataFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem('anchoredSkuId');
    const wrapper = getTree();
    expect(response).to.equal(afterValue);
    wrapper.instance().componentDidUpdate();
    expect(wrapper).to.not.equal(null);
  });
  it('should run isBackButtonPressed function correctly else', () => {
    window.sessionStorage.setItem('isBackButtonPressed', 'false');
    const key = 'isBackButtonPressed';
    const response = getDataFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem('isBackButtonPressed');
    const wrapper = getTree();
    expect(response).to.equal(afterValue);
    wrapper.instance().componentDidUpdate();
    expect(wrapper).to.not.equal(null);
  });
  it('should run anchoredSkuId function correctly else', () => {
    window.sessionStorage.setItem('anchoredSkuId', '');
    const key = 'anchoredSkuId';
    const response = getDataFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem('anchoredSkuId');
    const wrapper = getTree();
    expect(response).to.equal(afterValue);
    wrapper.instance().componentDidUpdate();
    expect(wrapper).to.not.equal(null);
  });

  it('should call componentDidUpdate', () => {
    const props = {
      isFetching: false,
      isFetchingRemaining: false,
      location,
    };
    const wrapper = getTree(props);
    wrapper.instance().componentDidUpdate();
    expect(wrapper).to.not.equal(null);
  });
  it('should call componentWillUnmount', () => {
    const resetIsItemsFetchingStatus = sinon.spy();
    const clearGuestData = sinon.spy();
    const props = {
      resetIsItemsFetchingStatus,
      clearGuestData,
      updateBopisCheckBoxState,
    };
    const wrapper = getTree(props);
    wrapper.instance().componentWillUnmount();
    expect(wrapper).to.not.equal(null);
  });

  it('should call nearestStoreApiResolvedCall', () => {
    const wrapper = getTree();
    wrapper.instance().storeId = false;
    wrapper.instance().nearestStoreApiResolvedCall();
    expect(wrapper).to.not.equal(null);
  });
  it('should call nearestStoreApiResolvedCall else', () => {
    const wrapper = getTree();
    wrapper.instance().storeId = true;
    wrapper.instance().nearestStoreApiResolvedCall();
    expect(wrapper).to.not.equal(null);
  });
  it('should call preparePageSpecificmarks', () => {
    const wrapper = getTree();
    wrapper.instance().preparePageSpecificmarks();
    expect(wrapper).to.not.equal(null);
  });

  it('should call injectInstrumentationScript', () => {
    const wrapper = getTree();
    wrapper.instance().injectInstrumentationScript();
    expect(wrapper).to.not.equal(null);
  });

  it('should call componentDidMount', () => {
    const wrapper = getTree();
    const props = {
      labels: { GiftGiverMarketingBanner: 'banner' },
      customerID: '1111',
      registryData: { registryResVO: { registryId: '234' } },
      profileData: { repositoryId: '123' },
      onComponentMount: () => {},
      getProfile: () => {},
      referredContent: [{ key: 'GiftGiverMarketingBanner', id: 'cd' }],
    };
    const latLongCookie = new Cookies();
    const cookieStore = sinon.stub(ssUtils, 'default').returns({
      commonName: 'BedBathUS',
      storeId: 42,
    });

    latLongCookie.set('latLngCookie', '-74.004446,40.659336,Brooklyn,NY,11232');
    sinon.stub(ssUtils, 'getStoreFromCookies').returns('latLongCookie');
    wrapper.setProps(props);
    wrapper.instance().referredContentArray = undefined;
    wrapper.instance().storeId = false;
    wrapper.instance().nearestStoreApiResolved = true;
    wrapper.instance().componentDidMount();
    cookieStore.restore();
    expect(wrapper).to.not.equal(null);
    latLongCookie.remove(
      'latLngCookie',
      '-74.004446,40.659336,Brooklyn,NY,11232'
    );
  });
  it('should call componentWillMount', () => {
    const isBrowserStub = sinon.stub(common, 'isBrowser').returns(false);
    const isPageSpecificRegenerationStub = sinon
      .stub(isPageSpecificRegeneration, 'isPageSpecificRegeneration')
      .returns(false);

    const wrapper = getTree();
    const props = {
      isMPulseEnabled: 'true',
      mPulseSiteConfig: { PageSpecificMarks: '', ConditionalMarksFlag: '' },

      onComponentMount: () => {},
      isBrowser: () => {},
      isPageSpecificRegeneration: () => {},
    };

    wrapper.setProps(props);

    wrapper.instance().componentWillMount();
    isBrowserStub.restore();
    isPageSpecificRegenerationStub.restore();
    expect(wrapper).to.not.equal(null);
  });
  it('should call componentDidMount else', () => {
    const wrapper = getTree();
    const props = {
      store: {
        storeId: '123',
      },
      labels: {},
      customerID: '1111',
      registryData: {
        registryResVO: { registrySummaryVO: { registryId: '123' } },
      },
      profileData: { repositoryId: '123' },
      onComponentMount: () => {},
      getProfile: () => {},
      referredContent: {},
      match: {
        params: {
          id: '123',
        },
        path: 'store/giftRegistry/viewRegistryOwner/myItems/',
      },
    };
    props.match = {
      params: {
        id: '123',
      },
    };
    const nearestStore = {
      storeId: '1234',
    };
    const getNearestStoreFromApiStub = sinon
      .stub(AkamaiApi, 'getNearestStoreFromApi')
      .returns(nearestStore);
    wrapper.setProps(props);
    wrapper.instance().storeId = true;
    wrapper.instance().nearestStoreApiResolved = true;
    wrapper.instance().componentDidMount();
    expect(wrapper).to.not.equal(null);
    getNearestStoreFromApiStub.restore();
  });
  it('should call setDropDownOptionForSort', () => {
    const wrapper = getTree();
    wrapper.instance().sortSeq = 3;
    wrapper.setState({ hasDateSeqSortCatCallFired: true });
    wrapper.instance().setDropDownOptionForSort();
    expect(wrapper).to.not.equal(null);
  });
  it('should call getFavoriteStore', () => {
    const wrapper = getTree();
    const isLoggedIn = true;
    const favoriteStoreId = '123';
    const storeInfo = {};
    const fetchStore = sinon.stub();
    wrapper
      .instance()
      .getFavoriteStore({ isLoggedIn, storeInfo, fetchStore }, favoriteStoreId);
    expect(wrapper).to.not.equal(null);
  });
  it('should call getFavoriteStore else', () => {
    const wrapper = getTree();
    const isLoggedIn = false;
    const favoriteStoreId = '';
    const storeInfo = {
      abc: '123',
    };
    const fetchStore = sinon.stub();
    wrapper
      .instance()
      .getFavoriteStore({ isLoggedIn, storeInfo, fetchStore }, favoriteStoreId);
    expect(wrapper).to.not.equal(null);
  });
  it('should call getReferredContentId', () => {
    const wrapper = getTree();
    wrapper.instance().getReferredContentId('GiftGiverMarketingBanner');
    wrapper.instance().referredContent = [
      {
        key: 'GiftGiverMarketingBanner',
        id: 'cd',
      },
    ];
    wrapper.instance().getReferredContentId('GiftGiverMarketingBanner');
    expect(wrapper).to.not.equal(null);
  });
  it('should call updateSkuIdForAnchoring', () => {
    const wrapper = getTree();
    const valueOrSkuId = '123';
    const anchoredSkuCategoryId = '234';
    wrapper
      .instance()
      .updateSkuIdForAnchoring(valueOrSkuId, anchoredSkuCategoryId);
    expect(wrapper).to.not.equal(null);
  });

  it('should call handleBopisCheckboxChange', () => {
    const wrapper = getTree();
    const props = {
      selectedCheckboxFilter: 'store-pickup',
      updateBopisCheckBoxState: sinon.stub(),
      facetId: 'price',
      selectedFilters: { sort: ['abc'], price: [25, 50] },
      singleSelection: true,
      ownerView: true,
    };
    wrapper.setProps(props);
    wrapper.setState({ checkBoxChecked: true });
    wrapper.instance().handleBopisCheckboxChange('sort');
    wrapper.instance().handleBopisCheckboxChange('store-pickup');
    expect(wrapper).to.not.equal(null);
  });

  it('should call handleFirstCategoryCall', () => {
    const wrapper = getTree();
    const props = {
      selectedCheckboxFilter: 'store-pickup',
      updateBopisCheckBoxState: sinon.stub(),
      facetId: 'price',
      selectedFilters: { sort: ['abc'], price: [25, 50] },
      singleSelection: true,
      ownerView: true,
      enableCashFund: true,
    };
    wrapper.setProps(props);
    wrapper.setState({ firstCategoryApiCallFlag: true });
    wrapper.instance().handleFirstCategoryCall(false);
    expect(wrapper).to.not.equal(null);
  });
  it('should call collaborationGiftHelpContent', () => {
    const wrapper = getTree();
    const props = {
      selectedCheckboxFilter: 'store-pickup',
      updateBopisCheckBoxState: sinon.stub(),
      facetId: 'price',
      selectedFilters: { sort: ['abc'], price: [25, 50] },
      singleSelection: true,
      ownerView: true,
      enableCashFund: true,
    };
    wrapper.setProps(props);
    wrapper.instance().collaborationGiftHelpContent();
    expect(wrapper).to.not.equal(null);
  });
  it('should call bopisStoreChange without storeDetails', () => {
    const wrapper = getTree();
    const currentStoreId = '123';
    const changeStoreId = '234';
    wrapper.setProps({ updateBopisCheckBoxState: sinon.spy() });
    wrapper.setProps({ selectedCheckboxFilter: 'store-pickup' });
    wrapper.instance().bopisStoreChange(currentStoreId, false, changeStoreId);
    expect(wrapper).to.not.equal(null);
  });
  it('should call bopisStoreChange with storeDetails', () => {
    const isStoreBopisEnabledStub = sinon
      .stub(StoreInfoUtils, 'isStoreBopisEnabled')
      .returns(true);
    const wrapper = getTree();
    const currentStoreId = '1234';
    const changeStoreId = '123';
    const changedStore1 = {
      siteBobus: [
        {
          siteId: 'BedBathUS',
          bopusFlag: 1,
        },
      ],
    };
    wrapper.instance().bopisStoreChange(1, false, 2);
    wrapper.setState({
      isCheckboxSelectionRequired: true,
      bopisStoreDetail: false,
    });
    wrapper.setProps({ updateBopisCheckBoxState: sinon.stub() });
    wrapper
      .instance()
      .bopisStoreChange(currentStoreId, changedStore1, changeStoreId);
    isStoreBopisEnabledStub.restore();
    expect(wrapper).to.not.equal(null);
    isStoreBopisEnabledStub.restore();
  });

  it('should call renderSortBy', () => {
    const wrapper = getTree();
    const props = {
      storeDetails: {
        storeId: '123',
      },
      isBopisFeatureEnable: true,
    };
    const nextProps = {
      storeDetails: {
        storeId: '123',
      },
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventType: 'Wedding',
          },
        },
      },
    };
    const allRegTypesMockData = {
      popular: [
        {
          registryName: 'Wedding',
          registryCode: 'BRD',
        },
      ],
      other: [
        {
          registryName: 'OT1',
          registryCode: 'OTH',
        },
      ],
    };
    const allRegTypesStub = sinon
      .stub(allRegTypes, 'default')
      .returns(allRegTypesMockData);
    wrapper.setProps(props);
    wrapper.instance().renderSortBy(nextProps);
    expect(wrapper).to.not.equal(null);
    allRegTypesStub.restore();
  });
});
