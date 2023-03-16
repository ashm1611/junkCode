/* eslint max-lines:["error", 1230] */
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as commonUtil from '@bbb-app/utils/common';
import { BrowserRouter as Router } from 'react-router-dom';
import sinon from 'sinon';
import * as isUserRecognized from '@bbb-app/utils/isUserRecognized';
import * as isBrowser from '@bbb-app/utils/isBrowser';
import allRegTypes from '@bbb-app/registry-type/registryTypes';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import {
  RegistryOwnerMain,
  mapDispatchToProps,
  RouteWithSubRoutes,
} from '../RegistryOwnerMain';
import QuizQnAComponent from '../../../../../components/Pages/Registry/RegistryOwnerHome/RegistryQuiz/QuizQnAComponent.async';
import RegistryCollaborationModal from '../../../../../components/Pages/Registry/RegistryOwner/RegistryCollaborationModal/RegistryCollaborationModal.async';

configure({ adapter: new Adapter() });
// eslint-disable-next-line max-statements
describe(__filename, () => {
  const onComponentMount = sinon.spy();
  const getRegistryOwnerFirstCategory = sinon.spy();
  const updateFilterCount = sinon.spy();
  const clearDeactivatedReg = sinon.spy();
  const resetQuizPersona = sinon.spy();
  const redirectTo = sinon.spy();
  const fetchContentStack = sinon.spy();
  const fetchQuizPersona = sinon.spy();
  const fireTealiumAction = sinon.spy();
  const clearCreateRegistry = sinon.spy();
  const setShowChecklist = sinon.spy();
  const setQuizPersona = sinon.stub();
  const clearQuizModal = sinon.spy();
  const setQuizFromRecommendation = sinon.spy();
  const setScrollAction = sinon.spy();
  const switchConfig = {
    enableMPulse: true,
    enableRegistrySurvey: true,
    enableRecommendationTab: true,
    enableNewRegDashboard: true,
    enableCashFund: true,
  };
  const pageConfig = {
    registrySurveyItemThreshold: '5',
  };
  const switchConfigGlobal = { globalMPulseEnable: true };
  const match = {
    params: {
      id: '123',
    },
    path: 'store/giftRegistry/viewRegistryOwner/myItems/',
  };
  const route = {
    routes: [
      {
        id: '5347878',
        path: '/store/giftRegistry/viewRegistryOwner/myItems/:5347878?',
      },
    ],
  };
  const location = {
    search: '?skuAdded=67742813',
    pathname: 'store/giftRegistry/viewRegistryOwner/myItems/',
  };
  const labels = {
    referredContent: [
      { key: '123', id: '123' },
      { key: 'RegOwnerMarketingBanner', id: '123' },
    ],
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
  const dynamicContentState = {
    content: [
      {
        1234: {
          Response: 'Success',
          body: 'this is demo content',
          statusCode: 200,
        },
      },
    ],
  };
  const propsData = {
    location,
    registryData,
    registryListFetched: true,
    activeRegistry: { eventType: 'Wedding' },
    regTypes: {
      popular: [
        {
          registryCode: 'BRD',
          registryIndex: '1',
          registryName: 'Wedding',
          registryTypeId: '200001',
          registryImg: '/wedding/image',
        },
      ],
      other: [
        {
          registryCode: 'BIR',
          registryIndex: '7',
          registryName: 'Birthday',
          registryTypeId: '200006',
          registryImg: '',
        },
      ],
    },
    labels: {},
    pageConfig,
    switchConfig,
    isMPulseEnabled: true,
    mPulseSiteConfig: {
      pageLevelConfig: {
        RegistryGuest: {
          PageViewMarks: {
            'ux-destination-verified': ['ux-image-inline-logo'],
            'ux-primary-content-displayed': [],
            'ux-primary-action-available': [],
            'ux-secondary-content-displayed': [],
          },
          ConditionalMarksFlag: {
            'ux-destination-verified': ['ux-action-before-load'],
            'ux-primary-content-displayed': [],
            'ux-primary-action-available': [],
            'ux-secondary-content-displayed': [],
          },
        },
      },
    },
    route,
    match,
    isRemainingItemFetching: true,
    clearDeactivatedReg: sinon.spy(),
    getThankYouList: sinon.spy(),
    redirectTo: sinon.spy(),
    errorStatus: [{ code: '78', message: 'error' }],
    registryOwnerFirstCategoryList: {},
    registrylist: [
      {
        0: {
          registryId: '56272872',
        },
        1: {
          registryId: '56272878',
        },
      },
    ],
    dynamicContentState,
    resetQuizPersona,
    clearCreateRegistry,
    setShowChecklist,
    quizRegistryId: '123',
    showTakeOurQuiz: true,
  };
  const fetchSiteSpectDateSort = sinon.stub();
  const resetIsItemsFetchingStatus = sinon.stub();
  const viewPortConfigGlobal = { pageConfig: { foo: 'bar' } };
  const Test = () => {
    return <h1>Test</h1>;
  };
  let siteIdStub;
  before(() => {
    siteIdStub = sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
  });
  after(() => {
    siteIdStub.restore();
  });
  const getTree = () =>
    shallow(
      <RegistryOwnerMain
        switchConfig={switchConfig}
        switchConfigGlobal={switchConfigGlobal}
        route={route}
        location={location}
        labels={labels}
        onComponentMount={onComponentMount}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        match={match}
        fetchSiteSpectDateSort={fetchSiteSpectDateSort}
        viewPortConfigGlobal={viewPortConfigGlobal}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        clearDeactivatedReg={clearDeactivatedReg}
        redirectTo={redirectTo}
        activeRegistry={{}}
        fetchContentStack={fetchContentStack}
        resetQuizPersona={resetQuizPersona}
        clearCreateRegistry={clearCreateRegistry}
        setShowChecklist={setShowChecklist}
        setQuizPersona={setQuizPersona}
        fetchQuizPersona={fetchQuizPersona}
        clearQuizModal={clearQuizModal}
        quizRegistryId={'123'}
        fireTealiumAction={fireTealiumAction}
        contentStackSelectors={[{ modules: {} }]}
        disableCollaboration={sinon.spy()}
        enableCollaboration={sinon.spy()}
        setQuizFromRecommendation={setQuizFromRecommendation}
        setScrollAction={setQuizFromRecommendation}
        dynamicContentState={dynamicContentState}
      />
    );
  it('should render RegistryOwnerMain', () => {
    const tree = getTree();
    expect(tree).to.not.equal(null);
  });
  it('should call handleStartQuiz', () => {
    const tree = shallow(
      <RegistryOwnerMain
        onComponentMount={onComponentMount}
        {...propsData}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        dynamicContentState={dynamicContentState}
        redirectTo={redirectTo}
        fetchContentStack={fetchContentStack}
        fireTealiumAction={fireTealiumAction}
      />
    );
    tree.instance().handleStartQuiz();
    expect(fetchContentStack).to.be.called;
  });
  it('should render RegistryOwnerMain New skeleton', () => {
    const tree = getTree();
    tree.setProps({ isFetching: true });
    expect(tree).to.not.equal(null);
  });
  it('should render RegistryOwnerMain skeleton', () => {
    const tree = getTree();
    tree.setProps({
      isFetching: true,
      switchConfig: {
        enableNewRegDashboard: false,
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render new dashboard skeleton', () => {
    const tree = getTree();
    tree.setProps({
      isFetching: true,
      switchConfig: {
        enableNewRegDashboard: true,
      },
      isRegTypeFormData: 'WeddingNew',
    });
    expect(tree).to.not.equal(null);
  });

  it('should call  isBrowser in render ', () => {
    sinon.stub(isBrowser, 'default').returns(false);
    const tree = getTree();
    isBrowser.default.restore();
    expect(tree).to.not.equal(null);
  });
  it('should render RegistryOwnerMain in else case', () => {
    const matchs = {
      params: {
        id: undefined,
      },
    };

    const label = {
      referredContent: [
        { key: 'tymSurpriseContentHeading', id: '123' },
        { key: 'tymSurpriseContentSubHeading', id: '123' },
        { key: 'sendThankYouHeading', id: '123' },
        { key: 'sendThankYouDescription', id: '123' },
      ],
    };
    const registryDatas = {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Birthday',
          eventDate: '11/11/11',
          registryId: '12345',
        },
        registryVO: {
          tnGiftsPurchased: undefined,
        },
      },
    };
    const registryOwnerFirstCategoryList = {
      categoryBuckets: [
        {
          catSeoUrl: null,
          categoryId: '10003_FINEDININGGIFTWARE',
          displayName: 'FINE DINING & GIFTWARE',
          recommandedLinks: null,
        },
      ],
    };
    const getMyFundsData = sinon.spy();
    const tree = shallow(
      <RegistryOwnerMain
        registryData={registryDatas}
        switchConfig={switchConfig}
        switchConfigGlobal={switchConfigGlobal}
        route={route}
        location={location}
        labels={label}
        onComponentMount={onComponentMount}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        match={matchs}
        fetchSiteSpectDateSort={fetchSiteSpectDateSort}
        viewPortConfigGlobal={viewPortConfigGlobal}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        myFundsData={null}
        getMyFundsData={getMyFundsData}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
        redirectTo={redirectTo}
        fetchContentStack={fetchContentStack}
        contentStackSelectors={[{ modules: {} }]}
        activeRegistry={{ eventType: 'Birthday' }}
        routeData={{
          previousLocationBeforeTransitions: {
            location: { hash: '#cashfund' },
          },
        }}
        history={{ push: sinon.spy() }}
        dynamicContentState={dynamicContentState}
      />
    );
    tree.instance().returnFilteredItemsCount();
    tree.instance().componentDidMount();
    expect(tree).to.not.equal(null);
  });
  it('should render RegistryOwnerMain in else  for id case', () => {
    const matchs = {
      params: {
        id: undefined,
      },
    };
    const label = {};
    const getMyFundsData = sinon.spy();
    const tree = shallow(
      <RegistryOwnerMain
        labels={label}
        match={matchs}
        onComponentMount={onComponentMount}
        {...propsData}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        getMyFundsData={getMyFundsData}
        dynamicContentState={dynamicContentState}
        redirectTo={redirectTo}
        fetchContentStack={fetchContentStack}
        contentStackSelectors={[{ modules: {} }]}
      />
    );
    tree.instance().returnFilteredItemsCount();
    tree.instance().componentDidMount();
    expect(tree).to.not.equal(null);
  });
  it('should call getRefContentId ', () => {
    const tree = getTree();
    tree.setProps({ labels: { referredContent: {} } });
    tree.setProps({ ...propsData, isBopisFeatureEnable: true });
    tree.instance().getRefContentId();
    expect(tree).to.not.equal(null);
  });
  it('should call getRefContent ', () => {
    const tree = getTree();
    const dynamicContentStates = {
      content: [{ id: [{ 'moderated-url': 'moderate' }] }],
    };
    tree.setProps({
      dynamicContentState: dynamicContentStates,
    });
    tree.setProps({ ...propsData });
    tree.instance().getRefContent();
    expect(tree).to.not.equal(null);
  });
  it('should call clearDeactivatedReg ', () => {
    const tree = getTree();
    tree.setProps({ ...propsData, deactivatedRegId: '543211734' });
    tree.setState({ accessDenied: true });
    tree.setState({ registryId: '543211734' });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('saveStoreInfo: should set isStoreAvailable to true', () => {
    const tree = getTree();
    tree.instance().saveStoreInfo(true);
    expect(tree.instance().state.isStoreAvailable).to.be.equal(true);
  });

  it('should call callFirstCategory ', () => {
    const locations = {
      search: 'abc',
      pathname: 'store/giftRegistry/viewRegistryOwner/myItems/',
    };
    const tree = shallow(
      <RegistryOwnerMain
        switchConfig={switchConfig}
        switchConfigGlobal={switchConfigGlobal}
        route={route}
        location={locations}
        labels={labels}
        onComponentMount={onComponentMount}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        match={match}
        fetchSiteSpectDateSort={fetchSiteSpectDateSort}
        viewPortConfigGlobal={viewPortConfigGlobal}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        clearDeactivatedReg={clearDeactivatedReg}
        registryData={registryData}
        redirectTo={redirectTo}
        fetchContentStack={fetchContentStack}
        dynamicContentState={dynamicContentState}
        contentStackSelectors={[{ modules: {} }]}
      />
    );
    tree.instance().eventObject = [
      {
        registryName: 'Birthday',
      },
    ];
    tree.instance().hasFirstCategoryCallFired = false;
    tree
      .instance()
      .callFirstCategory({ location: locations, isFetching: false });
    expect(tree).to.not.equal(null);
  });
  it('should call handleTabClickCallback', () => {
    const item = { name: 'a', id: 1 };
    const tree = getTree();
    tree.setProps({
      enableNewRegDashboard: false,
    });
    tree.setState({ registryId: '543211734' });
    tree.instance().eventObject = [
      {
        registryName: 'Birthday',
      },
    ];
    tree.instance().hasFirstCategoryCallFired = true;
    tree.instance().handleTabClickCallback(item);
    expect(tree).to.not.equal(null);
  });
  it('should call startAddingClicked  ', () => {
    const tree = getTree();
    tree.setProps({ ...propsData });
    tree.setState({ startAddingClicked: true });
    expect(tree).to.not.equal(null);
  });
  it('should Componentwillmount with PageSpecificMarks false', () => {
    global.window.instrumentation = {
      setPageMarks: sinon.stub().callsFake(() => {}),
      removeConditionalMarksFlag: sinon.stub().callsFake(() => {}),
    };
    const tree = shallow(
      <RegistryOwnerMain
        switchConfig={switchConfig}
        switchConfigGlobal={switchConfigGlobal}
        route={route}
        location={location}
        labels={labels}
        onComponentMount={onComponentMount}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        match={match}
        fetchSiteSpectDateSort={fetchSiteSpectDateSort}
        viewPortConfigGlobal={viewPortConfigGlobal}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        clearDeactivatedReg={clearDeactivatedReg}
        registryData={registryData}
        redirectTo={redirectTo}
        isMPulseEnabled
        mPulseSiteConfig={{ PageSpecificMarks: false }}
        fetchContentStack={fetchContentStack}
        dynamicContentState={dynamicContentState}
        contentStackSelectors={[{ modules: {} }]}
      />
    );
    tree.instance().componentWillMount();
    expect(tree).to.not.equal(null);
  });
  it('should Componentwillmount with PageSpecificMarks true', () => {
    global.window.instrumentation = {
      setPageMarks: sinon.stub().callsFake(() => {}),
      removeConditionalMarksFlag: sinon.stub().callsFake(() => {}),
    };
    const tree = shallow(
      <RegistryOwnerMain
        switchConfig={switchConfig}
        switchConfigGlobal={switchConfigGlobal}
        route={route}
        location={location}
        labels={labels}
        onComponentMount={onComponentMount}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        match={match}
        fetchSiteSpectDateSort={fetchSiteSpectDateSort}
        viewPortConfigGlobal={viewPortConfigGlobal}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        clearDeactivatedReg={clearDeactivatedReg}
        registryData={registryData}
        redirectTo={redirectTo}
        isMPulseEnabled
        mPulseSiteConfig={{ PageSpecificMarks: true }}
        fetchContentStack={fetchContentStack}
        dynamicContentState={dynamicContentState}
        contentStackSelectors={[{ modules: {} }]}
      />
    );
    tree.instance().componentWillMount();
    expect(tree).to.not.equal(null);
  });
  it('should not  Componentwillmount', () => {
    global.window.instrumentation = null;
    const tree = shallow(
      <RegistryOwnerMain
        switchConfig={switchConfig}
        switchConfigGlobal={switchConfigGlobal}
        route={route}
        location={location}
        labels={labels}
        onComponentMount={onComponentMount}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        match={match}
        fetchSiteSpectDateSort={fetchSiteSpectDateSort}
        viewPortConfigGlobal={viewPortConfigGlobal}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        clearDeactivatedReg={clearDeactivatedReg}
        registryData={registryData}
        redirectTo={redirectTo}
        isMPulseEnabled
        mPulseSiteConfig={{ PageSpecificMarks: true }}
        fetchContentStack={fetchContentStack}
        dynamicContentState={dynamicContentState}
        contentStackSelectors={[{ modules: {} }]}
      />
    );
    tree.instance().componentWillMount();
    expect(tree).to.not.equal(null);
  });
  it('should call componentWillReceiveProps', () => {
    const nextProps = {
      registryListFetched: true,
      location: {
        pathname:
          'store/giftRegistry/viewRegistryOwner/recommendation/520747097',
        hash: '#cashfund',
      },
      activeRegistry: {
        registryId: '520747097',
        personaName: 'abc',
        showChecklist: true,
      },
      showTakeOurQuiz: false,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventType: 'Baby',
          },
        },
      },
    };
    const tree = getTree();
    tree.setProps({ setQuizPersona });
    tree.setProps({ setShowChecklist, ...propsData });
    tree.setProps({ setQuizPersona, ...propsData });
    tree.setState({ registryId: '520747097' });
    const allRegTypesStub = sinon
      .stub(allRegTypes, 'allRegTypes.popular')
      .returns(null);
    tree.instance().componentWillReceiveProps(nextProps);
    expect(tree).to.not.equal(null);
    allRegTypesStub.restore();
  });
  it('should callonModalClose', () => {
    const tree = getTree();
    tree.instance().onModalClose();
    expect(tree).to.not.equal(null);
  });
  it('should call showRegistryUsabilitySurvey', () => {
    const showRegistryUsability = sinon.stub();
    const wrapper = getTree();

    wrapper.setProps({ ...propsData });
    wrapper.setProps({ showRegistryUsability });
    wrapper.instance().showRegistryUsabilitySurvey();
  });
  it('should render Access Denied', () => {
    const tree = getTree();
    tree.setState({ syncAccessDenied: true });
    tree.setState({ accessDenied: true });
    expect(tree).to.not.equal(null);
  });

  it('should render renderLayout with marketingData', () => {
    const tree = getTree();
    const marketingData = {
      components: [{ message: '123' }],
    };
    const instance = tree.instance();
    const getRefContentStub = sinon
      .stub(instance, 'getRefContent')
      .returns(marketingData);
    instance.renderLayout();
    expect(tree.find('.registryOwnerMain')).to.have.lengthOf(1);
    getRefContentStub.restore();
  });
  it('should call setQuizOpenStatus props ', () => {
    const tree = getTree();
    tree.setState({ startQuiz: true });
    const instance = tree.instance();
    instance.setQuizOpenStatus();
    expect(clearCreateRegistry).to.be.called;
  });
  it('should call setQuizOpenStatus props for isMobile', () => {
    const tree = getTree();
    tree.setProps({ isMobile: true });
    tree.setState({ startQuiz: true });
    const instance = tree.instance();
    instance.setQuizOpenStatus(false, true);
    expect(tree.instance().state.modalMounteState).to.be.equal(false);
    expect(clearCreateRegistry).to.be.called;
  });
  it('redirect to recommendation on click of cross icon from desktop', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryQuiz: true,
      isRegistryCreated: true,
      isNewCreateRegForm: true,
      routeData: { previousPageIdentifier: 'notcreatereg' },
      activeRegistry: { eventType: 'Baby' },
    });
    tree.setState({ startQuiz: true });
    const instance = tree.instance();
    instance.renderQuizLayout();
    tree.find('#crossIcon').simulate('click');
    expect(redirectTo).to.have.been.called;
  });
  it('redirect to recommendation on click when newcreateflow is off', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryQuiz: true,
      isRegistryCreated: true,
      routeData: { previousPageIdentifier: 'notcreatereg' },
      activeRegistry: { eventType: 'Baby' },
    });
    tree.setState({ startQuiz: true });
    const instance = tree.instance();
    instance.renderQuizLayout();
    tree.find('#crossIcon').simulate('click');
    expect(redirectTo).to.have.been.called;
  });
  it('redirect to recommendation on click of cross icon from mobile', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryQuiz: true,
      isRegistryCreated: true,
      isMobile: true,
      activeRegistry: { eventType: 'Baby' },
      isNewCreateRegForm: true,
      routeData: { previousPageIdentifier: 'notcreatereg' },
    });
    tree.setState({ startQuiz: true });
    const instance = tree.instance();
    instance.renderQuizLayout();
    tree
      .find(ModalDialog)
      .props()
      .onModalClose();
    expect(redirectTo).to.have.been.called;
  });
  it('should call quizCompletedCallBack', () => {
    const tree = getTree();
    const instance = tree.instance();
    instance.quizCompletedCallBack();
    expect(tree.instance().state.startQuiz).to.equal(false);
  });
  it('should call fireTealiumAction when selectedCDP is not empty', () => {
    const tealiumPageName = 'Quiz Page';
    const tealiumPageType = 'Quiz Page';
    const selectedCDP = ['Active', 'Active', 'Active', 'Active', 'Active'];
    const tree = getTree();
    const instance = tree.instance();
    instance.fireTealiumQuiz(tealiumPageName, tealiumPageType, selectedCDP);
    expect(fireTealiumAction).to.be.called;
  });
  it('should call renderQuizLayout for Mobile ', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryQuiz: true,
      isRegistryCreated: true,
      isMobile: true,
      activeRegistry: { eventType: 'Baby' },
      isNewCreateRegForm: true,
      routeData: { previousPageIdentifier: 'notcreatereg' },
    });
    tree.setState({ startQuiz: true });
    const instance = tree.instance();
    instance.renderQuizLayout();
    expect(tree.find(QuizQnAComponent)).to.have.lengthOf(1);
  });
  it('should call renderQuizLayout for Desktop ', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryQuiz: true,
      isRegistryCreated: true,
      isMobile: false,
      activeRegistry: { eventType: 'Baby' },
      isNewCreateRegForm: true,
      routeData: { previousPageIdentifier: 'notcreatereg' },
    });
    tree.setState({ startQuiz: true });
    const instance = tree.instance();
    instance.renderQuizLayout();
    expect(tree.find(QuizQnAComponent)).to.have.lengthOf(1);
  });
  it('should call handleCashFundsModalClose when #cashfund exists on location', () => {
    const push = sinon.spy();
    const tree = getTree();
    tree.setProps({
      location: {
        pathname:
          'store/giftRegistry/viewRegistryOwner/recommendation/520747097',
        hash: '#cashfund',
      },
      history: { push },
    });
    const instance = tree.instance();
    tree.setState({ cashfundsModalState: false });
    instance.handleCashFundsModalClose();
    expect(tree).to.not.equal(null);
  });
  it('should call render collaboration modal ', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryCollaborationModal: true,
      isRegistryCreated: true,
    });
    tree.setState({ enableRegistryCollaborationModal: true });
    const instance = tree.instance();
    instance.renderRegistryCollaborationModal();
    expect(tree.find(RegistryCollaborationModal)).to.have.lengthOf(1);
  });
  it('should call render collaboration modal for mobile ', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryCollaborationModal: true,
      isRegistryCreated: true,
      isMobile: true,
    });
    tree.setState({ enableRegistryCollaborationModal: true });
    const instance = tree.instance();
    instance.renderRegistryCollaborationModal();
    expect(tree.find(RegistryCollaborationModal)).to.have.lengthOf(1);
  });
  it('should close collaboration modal ', () => {
    const tree = getTree();
    tree.setProps({
      enableRegistryCollaborationModal: false,
      isRegistryCreated: true,
      activeRegistry: { regTitle: `test` },
      isMobile: false,
    });
    tree.setState({ enableRegistryCollaborationModal: false });
    const instance = tree.instance();
    instance.closeRegistryCollaborationModal();
    expect(tree.find(RegistryCollaborationModal)).to.have.lengthOf(0);
  });
  it('should call checkForCheckList', () => {
    const tree = getTree();
    tree.setState({ enableRegistryCollaborationModal: true });
    tree.instance().checkForCheckList();
    expect(tree).to.not.equal(null);
  });
  it('mapDispatchToProps should return a prop fetchContentStack which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchContentStack();
    expect(dispatch.called).to.equal(true);
  });
  it('should check componentDid update of registry owner main', () => {
    const tree = getTree();
    const newLocation = {
      search: '?editRegistry=true',
      pathname:
        '/store/giftRegistry/viewRegistryOwner/recommendation/520892432',
    };
    const prevProps = {
      location: { search: { editRegistry: 'false', param: 'hello' } },
    };
    tree.setProps({ location: newLocation });
    tree.instance().allItemsFetched = true;
    tree.instance().hasScrolled = false;
    tree.setState({ openEditRegistryModal: false, startAddingClicked: '' });
    tree.instance().componentDidMount(prevProps);
    tree.instance().componentDidUpdate(prevProps);
    tree.instance().componentWillUnmount();
    expect(tree.state('openEditRegistryModal')).to.equal(true);
  });

  it('should check componentDid update of registry owner main when query Param has skuAdded', () => {
    const tree = getTree();
    const prevProps = {
      location: { search: {} },
    };
    tree.instance().updateParam();
    tree.instance().allItemsFetched = true;
    tree.instance().hasScrolled = false;
    tree.instance().queryParams = { skuAdded: 1234 };
    tree.instance().componentDidUpdate(prevProps);
  });
  it('should check componentDid update of registry owner main for showEditPopUp', () => {
    const tree = getTree();
    const newLocation = {
      search: '?showEditPopUp=true',
      pathname:
        '/store/giftRegistry/viewRegistryOwner/recommendation/520892432',
    };
    const prevProps = {
      location: { search: { showEditPopUp: 'false', param: 'hello' } },
    };
    tree.setProps({ location: newLocation });
    tree.setState({ openEditRegistryModal: false });
    tree.instance().componentDidMount(prevProps);
    tree.instance().componentDidUpdate(prevProps);
    tree.instance().componentWillUnmount();
    expect(tree.state('openEditRegistryModal')).to.equal(true);
  });
  it('should check componentDid update of registry owner main for all Items Fetched', () => {
    const tree = getTree();
    const prevProps = {
      location,
    };
    tree.instance().allItemsFetched = true;
    tree.instance().hasScrolled = false;
    tree.setState({ openEditRegistryModal: false });
    tree.instance().componentDidUpdate(prevProps);
    tree.instance().componentWillUnmount();
    expect(tree.state('openEditRegistryModal')).to.equal(false);
  });
  it('should call checkSignIn', () => {
    const tree = getTree();
    tree.instance().checkSignIn();
    expect(tree).to.not.equal(null);
  });
  it('should call handleThankYouListOnInactivity', () => {
    const tree = getTree();
    tree.setProps({ ...propsData });
    tree.instance().handleThankYouListOnInactivity();
    expect(tree).to.not.equal(null);
  });
  it('should call pathMatcher', () => {
    const tree = getTree();
    const path = {
      path: 'store/giftRegistry/viewRegistryOwner/myItems/',
    };
    tree.setProps({ ...propsData });
    tree.instance().pathMatcher(path);
    expect(tree).to.not.equal(null);
  });
  it('should call checkForAllItemsFetched ', () => {
    const tree = getTree();
    const nextProps = {
      isRemainingItemFetching: false,
    };
    tree.setProps({ ...propsData });
    tree.instance().checkForAllItemsFetched(nextProps);
    expect(tree).to.not.equal(null);
  });
  it('should call discontinuedItemCountValue ', () => {
    const tree = getTree();
    const nextProps = {
      registryOwnerFirstCategoryList: {
        categoryBuckets: [
          {
            catSeoUrl: null,
            categoryId: '10003_FINEDININGGIFTWARE',
            displayName: 'FINE DINING & GIFTWARE',
            recommandedLinks: null,
          },
        ],
      },
    };
    tree.setProps({ ...propsData });
    tree.instance().discontinuedItemCountValue(nextProps);
    expect(tree).to.not.equal(null);
  });
  it('should call updateFilterItemCount', () => {
    const tree = getTree();
    const selectedFilterOption = 'View All';
    tree.setProps({ ...propsData });
    tree.instance().updateFilterItemCount(selectedFilterOption);
    expect(tree).to.not.equal(null);
  });
  it('should call  redirectMyFundPage in render ', () => {
    const tree = getTree();
    sinon.stub(isUserRecognized, 'default').callsFake(() => true);
    tree.setState({ loginModalVisibility: true });
    tree.instance().redirectMyFundPage();
    tree.setProps({ ...propsData });
    isUserRecognized.default.restore();
    expect(tree).to.not.equal(null);
  });
  it('should call else  redirectMyFundPage in render ', () => {
    sinon.stub(isUserRecognized, 'default').returns(false);
    const tree = getTree();
    isUserRecognized.default.restore();
    tree.instance().redirectMyFundPage();
    tree.setProps({ ...propsData });
    expect(tree).to.not.equal(null);
  });
  it('should call enableCollaboration props', () => {
    const tree = getTree();
    const e = {
      target: {
        getAttribute: () => {
          return 'cssSelector_recommendation_invitebtn';
        },
      },
    };
    const enableCollaboration = sinon.spy();
    propsData.enableCollaboration = enableCollaboration;
    tree.setProps({ ...propsData });
    tree.instance().handleCollaborationModal(e);
    expect(enableCollaboration.called).to.equal(true);
  });
  it('should call setScrollAction props', () => {
    const tree = getTree();
    global.window.scrollY = 700;
    propsData.setScrollAction = setScrollAction;
    tree.setProps({ ...propsData });
    tree.instance().handleCollaborationModal();
    expect(setScrollAction.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop onComponentMount which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.onComponentMount('520646666', false, []);
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop setScrollAction which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setScrollAction(1000);
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop onComponentMount which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.clearCreateRegistry();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchContentStack which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchContentStack();
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return clearQuizModal which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.clearQuizModal();
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return resetQuizPersona which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.resetQuizPersona();
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return setQuizPersona which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setQuizPersona();
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a not prop onComponentMount which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.onComponentMount(undefined, false, []);
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop resetIsItemsFetchingStatus which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.resetIsItemsFetchingStatus();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchCoRegistrantProfileStatus which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchCoRegistrantProfileStatus('test@test.com', false);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop setQuizPersona which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setQuizPersona({});
  });

  it('mapDispatchToProps should return a prop fetchQuizPersona which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchQuizPersona({}, '');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop updatePickupinStoreModal which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.updatePickupinStoreModal({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop updateFilterCount which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.updateFilterCount();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fireTealiumAction which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fireTealiumAction();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop setShowChecklist which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setShowChecklist(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop setQuizFromRecommendation which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setQuizFromRecommendation(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop enableCollaboration which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.enableCollaboration(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop disableCollaboration which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.disableCollaboration(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchRegistryOwnerItemsFirstCategory which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getRegistryOwnerFirstCategory('12345', 'BIR', '11/11/11');
    expect(dispatch.called).to.equal(true);
  });

  it('should dispatch rest methods of mapDispatchToProps ', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.initiateInactivityModal();
    props.makeActiveRegistryCall();
    props.closeOtherOpenModaOnInactiveModal();
    props.getThankYouList();
    props.clearDeactivatedReg();
    props.getMyFundsData();
    props.updateGroupGiftOptInInfo();
  });
  it('should call dispatch redirectTo', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.redirectTo();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call handleUrlSelection', () => {
    const tree = getTree();
    tree.instance().handleUrlSelection();
    expect(tree).to.not.equal(null);
  });
  it('should call handleUrlSelection 2', () => {
    const switchConfig2 = {
      enableMPulse: true,
      enableRegistrySurvey: true,
      enableRecommendationTab: true,
      enableNewRegDashboard: true,
    };
    const tree = shallow(
      <RegistryOwnerMain
        switchConfig={switchConfig2}
        switchConfigGlobal={switchConfigGlobal}
        registryData={{
          registryResVO: {
            registrySummaryVO: {
              eventType: 'Baby',
              eventDate: '11/11/11',
              registryId: '12345',
            },
            registryVO: {
              tnGiftsPurchased: undefined,
            },
          },
        }}
        route={route}
        location={location}
        labels={labels}
        onComponentMount={onComponentMount}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateFilterCount={updateFilterCount}
        match={match}
        fetchSiteSpectDateSort={fetchSiteSpectDateSort}
        viewPortConfigGlobal={viewPortConfigGlobal}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        clearDeactivatedReg={clearDeactivatedReg}
        redirectTo={redirectTo}
        activeRegistry={{}}
        fetchContentStack={fetchContentStack}
        resetQuizPersona={resetQuizPersona}
        clearCreateRegistry={clearCreateRegistry}
        setShowChecklist={setShowChecklist}
        setQuizPersona={setQuizPersona}
        fetchQuizPersona={fetchQuizPersona}
        clearQuizModal={clearQuizModal}
        quizRegistryId={'123'}
        contentStackSelectors={[{ modules: {} }]}
        disableCollaboration={sinon.spy()}
        enableCollaboration={sinon.spy()}
        setQuizFromRecommendation={setQuizFromRecommendation}
        dynamicContentState={dynamicContentState}
      />
    );
    tree.instance().handleUrlSelection();
    expect(tree).to.not.equal(null);
  });
  describe('RouteWithSubRoutes component', () => {
    it('should render RouteWithSubRoutes correctly', () => {
      const routes = { path: '', component: Test };
      const tree = mount(
        <Router>
          <RouteWithSubRoutes route={routes} />
        </Router>
      );
      expect(tree).to.have.lengthOf(1);
    });
  });
});
