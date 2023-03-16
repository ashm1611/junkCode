/* eslint-disable max-lines */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as isUserRecognized from '@bbb-app/utils/isUserRecognized';
import { publish } from '@bbb-app/utils/pubsub';
import { RegistryOwnerHome, mapDispatchToProps } from '../RegistryOwnerHome';
import * as isPreviewEnv from '../../../../../utils/isPreviewEnv';
import * as enableBookAnAppointment from '../../../../../components/abtests/BookAnAppointmentExperiment/BookAnAppointmentUtil';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let tree;
  let registryDetailsData;
  let template;
  let enabledVendors;
  let route;
  const switchConfig = {
    enableMPulse: true,
  };
  let getElementByIdStub = '';
  const canvasEle = document.createElement('canvas');
  canvasEle.setAttribute('id', 'canvas');
  const switchConfigGlobal = { globalMPulseEnable: true, enableCSLabels: true };
  const siteConfig = {
    thirdPartyDataConfig: { bookingBug: { appointmentsUrl: 'baseUrl' } },
  };
  const mPulseSiteConfig = {
    pageLevelConfig: {
      RegistryOwnerHome: {
        enabled: true,
        PageViewMarks: {
          'ux-destination-verified': ['ux-image-inline-logo'],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
        PageSpecificMarks: {
          'ux-destination-verified': [
            'ux-text-registrant-name',
            'ux-text-registry-home',
          ],
          'ux-primary-content-displayed': ['ux-text-registry-home-content'],
          'ux-primary-action-available': ['ux-link-registry-tabs'],
          'ux-secondary-content-displayed': [
            'ux-text-item-requested',
            'ux-text-item-purchased',
          ],
        },
        ConditionalMarksFlag: {
          'ux-destination-verified': [],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
      },
    },
  };
  const pageConfigGlobal = {
    refID_BRD: 'refID_BRD',
    refID_BA1: 'refID_BA1',
    refID_BIR: 'refID_BIR',
    refID_RET: 'refID_RET',
    refID_ANN: 'refID_ANN',
    refID_HSW: 'refID_HSW',
    refID_COL: 'refID_COL',
    refID_COM: 'refID_COM',
    refID_OTH: 'refID_OTH',
    defaultBedbathStore: 1,
    defaultBabyStore: 2,
    defaultCanadaStore: 3,
  };
  const dynamicContentState = {
    content: {
      '1': { body: 'hoorayModalWedding' },
      '2': { body: 'hoorayModalBaby' },
      '3': { body: 'hoorayModalBirthday' },
      '4': { body: 'hoorayModalRetirement' },
      '5': { body: 'hoorayModalAnniversary' },
      '6': { body: 'hoorayModalHouseWarming' },
      '7': { body: 'hoorayModalCollege' },
      '8': { body: 'hoorayModalCommitment' },
      '9': { body: 'hoorayModalOther' },
    },
  };
  const labels = {
    referredContent: [
      { key: 'hoorayModalWedding', id: '1' },
      { key: 'hoorayModalBaby', id: '2' },
      { key: 'hoorayModalBirthday', id: '3' },
      { key: 'hoorayModalRetirement', id: '4' },
      { key: 'hoorayModalAnniversary', id: '5' },
      { key: 'hoorayModalHouseWarming', id: '6' },
      { key: 'hoorayModalCollege', id: '7' },
      { key: 'hoorayModalCommitment', id: '8' },
      { key: 'hoorayModalOther', id: '9' },
    ],
  };
  const labelsCreateRegsitry = {
    createRegistry: {
      referredContent: [
        { key: 'hoorayModalWedding', id: '1' },
        { key: 'hoorayModalBaby', id: '2' },
        { key: 'hoorayModalBirthday', id: '3' },
        { key: 'hoorayModalRetirement', id: '4' },
        { key: 'hoorayModalAnniversary', id: '5' },
        { key: 'hoorayModalHouseWarming', id: '6' },
        { key: 'hoorayModalCollege', id: '7' },
        { key: 'hoorayModalCommitment', id: '8' },
        { key: 'hoorayModalOther', id: '9' },
      ],
    },
  };
  const activeRegistry = {
    registryId: '1234',
    primaryRegistrantFirstName: 'abc',
    primaryRegistrantLastName: 'xyz',
    primaryRegistrantEmail: 'email',
    primaryRegistrantPrimaryPhoneNum: '1234567890',
    coRegistrantFirstName: 'asd',
    coRegistrantLastName: 'asd',
    coRegEmail: 'mail',
    eventDate: 'data',
    favStoreId: 'asd',
  };
  beforeEach(() => {
    global.window.instrumentation = {
      pageSource: 'browser',
      addPerfMarkForZones: sinon.stub().callsFake(() => {}),
      removeConditionalMarksFlag: sinon.stub().callsFake(() => {}),
      setPageMarks: sinon.stub().callsFake(() => {}),
    };
    registryDetailsData = {
      registryResVO: {
        registrySummaryVO: {
          registryState: 'inprogress',
          eventType: 'Wedding',
        },
      },
    };
    template = { regions: {}, layout: {} };
    enabledVendors = { gru_tri: true };
    route = { routeData: { pageName: 'RegistryOwnerHome' } };
    const resetFirstCategoryCallFired = sinon.spy();
    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    tree = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        regTemplate={template}
        enabledVendors={enabledVendors}
        router={router}
        route={route}
        createRegistryModalPopUp
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        switchConfigGlobal={switchConfigGlobal}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        matchParamId={'1234'}
        isLoggedIn
        displayLoginModal={() => {}}
        isGoodyBoxModalOpen
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
  });
  afterEach(() => {
    getElementByIdStub.restore();
  });
  it('should call editRegistryFromMoreInformation on btn click', () => {
    getElementByIdStub = sinon.stub(document, 'getElementById');
    getElementByIdStub.withArgs('canvas').returns(canvasEle);
    registryDetailsData = {
      registryResVO: {
        registrySummaryVO: {
          registryState: 'inprogress',
          eventType: 'Wedding',
        },
      },
    };
    const wrapper = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        route={route}
        switchConfigGlobal={switchConfigGlobal}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        isLoggedIn
        displayLoginModal={sinon.spy()}
        editRegistryFromMoreInformationBtn={sinon.spy()}
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    wrapper.find('.editRegistryButton').simulate('click');
    expect(tree.find('.editRegistryModal')).to.have.lengthOf(0);
  });

  it('should call componentWillMount correctly', () => {
    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    const isPreviewEnvObj = sinon.stub(isPreviewEnv, 'default').returns(true);
    const getPageExperience = sinon.stub();
    const openGoodyBoxModalOpen = sinon.stub();
    const fetchContentStack = sinon.spy();
    const wrapper = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        switchConfigGlobal={switchConfigGlobal}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        isLoggedIn
        displayLoginModal={() => {}}
        getPageExperience={getPageExperience}
        openGoodyBoxModalOpen={openGoodyBoxModalOpen}
        fetchContentStack={fetchContentStack}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    const setElementsStub = sinon.stub(wrapper.instance(), 'setElements');
    wrapper.instance().componentWillMount();
    expect(setElementsStub.called).to.be.equal(true);
    wrapper.setProps({ registryDetailsData: '' });
    wrapper.instance().componentWillMount();
    isPreviewEnvObj.restore();
    setElementsStub.restore();
    wrapper.instance().componentWillUnmount();
  });
  it('should call componentDidMount correctly', () => {
    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    const match = {
      params: {
        id: '1234',
        categoryId: 'cat01',
      },
      url: '/',
    };
    const isPreviewEnvObj = sinon.stub(isPreviewEnv, 'default').returns(true);
    const isUserRecognizedObj = sinon
      .stub(isUserRecognized, 'default')
      .returns(true);
    const getPageExperience = sinon.stub();
    const openGoodyBoxModalOpen = sinon.stub();
    const fetchContentStack = sinon.spy();
    const labels1 = {
      referredContent: [],
    };
    const wrapper = shallow(
      <RegistryOwnerHome
        labels={labels1}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        createRegistryModalPopUp
        switchConfigGlobal={switchConfigGlobal}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        isLoggedIn
        displayLoginModal={sinon.spy()}
        getPageExperience={getPageExperience}
        openGoodyBoxModalOpen={openGoodyBoxModalOpen}
        match={match}
        fetchContentStack={fetchContentStack}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().props.displayLoginModal.called).to.be.equal(true);
    isPreviewEnvObj.restore();
    isUserRecognizedObj.restore();
  });
  it(`should fire functions on onModalClose`, () => {
    const e = {
      preventDefault: sinon.stub(),
    };
    const router = {
      location: {
        search: { hoorayModal: 'true' },
        pathname: '',
      },
    };
    const loginModalVisibility = false;
    const createRegistryConfig = {
      enableBookingBug: true,
      enableCSLabels: false,
    };
    const wrapper = shallow(
      <RegistryOwnerHome
        labels={labelsCreateRegsitry}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        regTemplate={template}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        switchConfigGlobal={createRegistryConfig}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        matchParamId={'1234'}
        isLoggedIn
        displayLoginModal={() => {}}
        loginModalVisibility={loginModalVisibility}
        createRegistryModalPopUp
        previousRoute="/store/giftRegistry/viewRegistryOwner/home/1234"
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    wrapper.instance().onModalClose(e);
    expect(wrapper.state('loginModalVisibility')).to.be.equal(false);
  });
  it(`should call openRBYRModal`, () => {
    const router = {
      location: {
        search: { hoorayModal: 'true' },
        pathname: '',
      },
    };
    const previousRoute = '/store/giftRegistry/viewRegistryOwner/home/111';
    const loginModalVisibility = false;
    const createRegistryConfig = { enableBookingBug: true };
    const activeRegistryNew = {
      registryId: '111',
    };
    const isUserRecognizedObj = sinon
      .stub(isUserRecognized, 'default')
      .returns(false);
    const wrapper = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        regTemplate={template}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        switchConfigGlobal={createRegistryConfig}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistryNew}
        matchParamId={'1234'}
        isLoggedIn
        displayLoginModal={() => {}}
        loginModalVisibility={loginModalVisibility}
        createRegistryModalPopUp
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    wrapper.instance().checkRBYRFlag = true;
    wrapper.setProps({ previousRoute });
    wrapper.instance().openRBYRModal();
    isUserRecognizedObj.restore();
  });
  it(`should fire functions on toggleLoginModalState `, () => {
    const toggle = sinon.spy();

    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    const loginModalVisibility = false;
    const wrapper = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        regTemplate={template}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        switchConfigGlobal={switchConfigGlobal}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        matchParamId={'1234'}
        isLoggedIn
        displayLoginModal={() => {}}
        loginModalVisibility={loginModalVisibility}
        toggle={toggle}
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    wrapper.instance().toggleLoginModalState();
    expect(wrapper.state('hideLoginView')).to.be.equal(false);
  });
  it(`should fire functions on toggleMode`, () => {
    const toggleMode = sinon.spy();
    const openGoodyBoxModalOpen = sinon.stub();
    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    tree = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        regTemplate={template}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        switchConfigGlobal={switchConfigGlobal}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        displayLoginModal={() => {}}
        matchParamId={'1234'}
        isLoggedIn
        toggleMode={toggleMode}
        openGoodyBoxModalOpen={openGoodyBoxModalOpen}
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    tree.setState({
      checkRBYRFlag: false,
      showSuccessModal: true,
    });
    tree.instance().toggleMode();
    tree.instance().toggleGoodyBoxModalState();
    expect(tree.state('checkRBYRFlag')).to.equal(false);
    expect(tree.state('showSuccessModal')).to.equal(false);
  });
  it(`should call showCreateRegistrySuccessModal for else condition`, () => {
    const toggleMode = sinon.spy();
    const openGoodyBoxModalOpen = sinon.stub();

    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    const activeRegistryNew = {
      registryId: '1234',
      primaryRegistrantFirstName: 'abc',
      primaryRegistrantLastName: 'xyz',
      primaryRegistrantEmail: 'email',
      primaryRegistrantPrimaryPhoneNum: '1234567890',
      coRegistrantFirstName: 'asd',
      coRegistrantLastName: 'asd',
      coRegEmail: 'mail',
      eventDate: 'data',
    };
    tree = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        regTemplate={template}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        switchConfigGlobal={switchConfigGlobal}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistryNew}
        displayLoginModal={() => {}}
        matchParamId={'1234'}
        toggleMode={toggleMode}
        openGoodyBoxModalOpen={openGoodyBoxModalOpen}
        isMobile
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
      />
    );
    tree.setProps({ pageConfigGlobal: '' });
    tree.setState({
      checkRBYRFlag: false,
      showSuccessModal: true,
    });
    tree.instance().toggleMode();
    tree.instance().showCreateRegistrySuccessModal(true, 'Wedding');
    expect(tree.state('checkRBYRFlag')).to.equal(false);
    expect(tree.state('showSuccessModal')).to.equal(false);
  });

  afterEach(() => {
    tree = null;
  });

  it('should check the render of RegistryOwnerHome', () => {
    global.window.instrumentation = {
      pageSource: 'browser',
      setPageMarks: sinon.stub().callsFake(() => {}),
      removeConditionalMarksFlag: sinon.stub().callsFake(() => {}),
    };
    tree.setState({ called: true });
    tree.setProps({
      registryResVO: {
        registrySummaryVO: {
          registryState: 'COM',
        },
      },
      matchParamId: '2345',
    });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should check the render of RegistryOwnerHome when setstate is false.', () => {
    global.window.instrumentation = {
      pageSource: 'browser',
      setPageMarks: sinon.stub().callsFake(() => {}),
      removeConditionalMarksFlag: sinon.stub().callsFake(() => {}),
    };
    tree.setState({ called: false });
    tree.setProps({
      registryResVO: {
        registrySummaryVO: {
          registryState: 'COM',
        },
      },
    });
    tree.setProps({
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'COM' },
            eventType: 'Wedding',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should setstate on componentWillReceiveProps', () => {
    const nextProps = {
      match: {
        params: {
          id: '1234',
          categoryId: 'cat01',
        },
      },
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'registryState',
            registryType: {
              registryTypeName: 'registryTypeName',
            },
          },
        },
      },
      isGoodyBoxModalOpen: false,
    };

    tree.setProps({ location: { search: '' } });
    tree.instance().componentWillReceiveProps(nextProps);

    expect(tree.instance().state.called).to.deep.equal(true);
  });

  it('should render when eventType is Wedding', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'BRD' },
            eventType: 'Wedding',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is Baby', () => {
    const BookAnAppointmentPreview = sinon
      .stub(enableBookAnAppointment, 'enableBookAnAppointment')
      .returns(true);
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'BA1' },
            eventType: 'Baby',
            diaperFundEnabled: true,
            goodyBoxEnabled: true,
          },
        },
      },
    });
    tree.setState({ registryId: '1234' });
    BookAnAppointmentPreview.restore();
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is Birthday', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'BIR' },
            eventType: 'Birthday',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is Retirement', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'RET' },
            eventType: 'Retirement',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is Anniversary', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'ANN' },
            eventType: 'Anniversary',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is Housewarming', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'HSW' },
            eventType: 'Housewarming',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is College', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'COL' },
            eventType: 'College/University',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is University', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'COL' },
            eventType: 'University',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is Commitment Ceremony', () => {
    tree.setProps({
      createRegistryModalPopUp: true,
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'COM' },
            eventType: 'Commitment Ceremony',
          },
        },
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render when eventType is Other', () => {
    tree.setProps({
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'inprogress',
            registryType: { registryTypeName: 'OTH' },
            eventType: 'Other',
          },
        },
      },
      createRegistryModalPopUp: true,
      dynamicContentState: {},
    });
    expect(tree).to.not.equal(null);
  });

  it('should subscribe createRBYR-TipModule event', () => {
    const isUserRecognizedObj = sinon
      .stub(isUserRecognized, 'default')
      .returns(false);
    publish('createRBYR-TipModule');
    isUserRecognizedObj.restore();
    expect(tree.state('showSuccessModal')).to.be.equal(true);
  });

  it('should subscribe createRBYR-TipModule event when RBYR is not opt in', () => {
    const isUserRecognizedObj = sinon
      .stub(isUserRecognized, 'default')
      .returns(true);
    tree.setState({ RBYRAlreadyOptIn: false });
    publish('createRBYR-TipModule');
    isUserRecognizedObj.restore();
    expect(tree.state('showSuccessModal')).to.be.equal(false);
  });

  describe('#RegistryOwnerHome.mapDispatchToProps', () => {
    const dispatch = sinon.spy();

    it('should call dispatch and trigger "fireTealiumAction"', () => {
      const props = mapDispatchToProps(dispatch);
      props.fireTealiumAction();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "getPageExperience"', () => {
      const props = mapDispatchToProps(dispatch);
      props.getPageExperience({});
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "fetchContentStack"', () => {
      const props = mapDispatchToProps(dispatch);
      props.fetchContentStack();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "clearCreateRegistryState"', () => {
      const props = mapDispatchToProps(dispatch);
      props.clearCreateRegistryState();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "getContent"', () => {
      const props = mapDispatchToProps(dispatch);
      props.getContent();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "displayLoginModal"', () => {
      const props = mapDispatchToProps(dispatch);
      props.displayLoginModal();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "clearCreateRegistryVerTypeState"', () => {
      const props = mapDispatchToProps(dispatch);
      props.clearCreateRegistryVerTypeState();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "editRegistryFromMoreInformation"', () => {
      const props = mapDispatchToProps(dispatch);
      props.editRegistryFromMoreInformationBtn();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "setCheckListTooltip"', () => {
      const props = mapDispatchToProps(dispatch);
      props.setCheckListTooltip();
      expect(dispatch.called).to.equal(true);
    });
    it('should call dispatch and trigger "openGoodyBoxModalOpen"', () => {
      const props = mapDispatchToProps(dispatch);
      props.openGoodyBoxModalOpen();
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "fetchContentStack"', () => {
      const props = mapDispatchToProps(dispatch);
      props.fetchContentStack({});
      expect(dispatch.called).to.equal(true);
    });

    it('should call dispatch and trigger "getRefContent"', () => {
      const props = mapDispatchToProps(dispatch);
      props.getRefContent({});
      expect(dispatch.called).to.equal(true);
    });
  });
  describe('#RegistryOwnerHome UI function', () => {
    const toggleMode = sinon.spy();
    const openGoodyBoxModalOpen = sinon.stub();
    const clearCreateRegistryVerTypeState = sinon.spy();
    const clearCreateRegistryState = sinon.spy();
    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    const history = [];
    const treeNew = shallow(
      <RegistryOwnerHome
        labels={labels}
        dynamicContentState={dynamicContentState}
        registryDetailsData={registryDetailsData}
        regTemplate={template}
        enabledVendors={enabledVendors}
        mPulseSiteConfig={mPulseSiteConfig}
        switchConfig={switchConfig}
        router={router}
        route={route}
        switchConfigGlobal={switchConfigGlobal}
        siteConfig={siteConfig}
        pageConfigGlobal={pageConfigGlobal}
        activeRegistry={activeRegistry}
        displayLoginModal={() => {}}
        matchParamId={'1234'}
        isLoggedIn
        toggleMode={toggleMode}
        openGoodyBoxModalOpen={openGoodyBoxModalOpen}
        clearCreateRegistryVerTypeState={clearCreateRegistryVerTypeState}
        clearCreateRegistryState={clearCreateRegistryState}
        history={history}
        fetchContentStack={sinon.spy()}
        setCheckListTooltip={sinon.spy()}
        getAllTooltip={{ tooltipChecklist: { skip: true } }}
        tealiumConfirmationInfo={sinon.spy()}
        getRefContent={sinon.spy()}
        siteId={'BuyBuyBaby'}
        createRegistryModalPopUp
        isNewCreateRegForm={'true'}
      />
    );
    it(`should call onDeviceVerificationModalOpen`, () => {
      treeNew.instance().onDeviceVerificationModalOpen();
      treeNew.setState({
        loginModalVisibility: true,
      });
      treeNew.instance().onDeviceVerificationModalOpen();
      expect(treeNew.state('hideLoginView')).to.equal(true);
    });
    it(`should call onDeviceModalClose`, () => {
      treeNew.instance().onDeviceModalClose();
      expect(treeNew.state('loginModalVisibility')).to.equal(false);
    });
    it(`should call onChunkLoad`, () => {
      treeNew.instance().onChunkLoad();
      expect(treeNew.state('isDeviceVerificationChunkLoaded')).to.equal(true);
    });
    it(`should call onDeviceModalCloseAfterVerification`, () => {
      treeNew.instance().onDeviceModalCloseAfterVerification();
      expect(treeNew.state('showCreateRegistrySuccessModal')).to.equal(true);
    });
    it(`should call onLoginSubmit`, () => {
      treeNew.instance().onLoginSubmit();
      expect(treeNew.state('verificationType')).to.equal(null);
    });
    it('should work onButtonClick', () => {
      const heading = document.createElement('header');
      heading.id = 'registrymyitems';
      document.body.appendChild(heading);
      const elem = document.querySelector('#registrymyitems');
      const event = {
        target: { id: 'registrymyitems' },
      };
      treeNew.setProps({
        isNewDashboard: { RegistryOwner: { enableNewRegDashboard: true } },
        registryDetailsData: {
          registryResVO: {
            registrySummaryVO: {
              registryState: 'inprogress',
              eventType: 'Wedding',
            },
          },
        },
      });
      treeNew.instance().onButtonClick(event);
      expect(elem.id).to.equal('registrymyitems');
    });
    it(`should call closeModal`, () => {
      treeNew.setProps({
        isNewDashboard: { RegistryOwner: { enableNewRegDashboard: true } },
        registryDetailsData: {
          registryResVO: {
            registrySummaryVO: {
              registryState: 'inprogress',
              eventType: 'Wedding',
            },
          },
        },
      });
      treeNew.instance().closeModal();
      expect(treeNew.state('showCreateRegistrySuccessModal')).to.equal(false);
    });

    it(`closeModal: should set showCreateRegistrySuccessModal state`, () => {
      treeNew.setProps({
        history: undefined,
      });
      treeNew.instance().closeModal();
      expect(treeNew.state('showCreateRegistrySuccessModal')).to.equal(false);
    });

    it(`should call hideParent`, () => {
      treeNew.instance().hideParent();
      expect(treeNew.state('hideParentModal')).to.equal(true);
    });

    it('check baby event type and config key', () => {
      const routerNew = {
        location: {
          search: { hoorayModal: 'true' },
          pathname: '',
        },
      };
      const switchConfigGlobal3 = {
        enableBookingBug: true,
        enableCSLabels: true,
      };
      const treeNew2 = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={registryDetailsData}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={routerNew}
          route={route}
          switchConfigGlobal={switchConfigGlobal3}
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          displayLoginModal={() => {}}
          matchParamId={'1234'}
          isLoggedIn
          toggleMode={toggleMode}
          openGoodyBoxModalOpen={openGoodyBoxModalOpen}
          clearCreateRegistryVerTypeState={clearCreateRegistryVerTypeState}
          clearCreateRegistryState={clearCreateRegistryState}
          history={history}
          fetchContentStack={sinon.spy()}
          isMobile
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          getRefContent={sinon.spy()}
          siteId={'BuyBuyBaby'}
          isNewCreateRegForm={'true'}
        />
      );
      treeNew2.setProps({
        createRegistryModalPopUp: true,
        contentStackSelectors: {
          modules: [{ support_page: { content_body: 'test' } }],
        },
      });
      treeNew2.instance().showCreateRegistrySuccessModal(true, 'Baby');
      expect(tree).to.not.equal(null);
    });
    it('check baby event type and config key when concept is Desktop', () => {
      const routerNew = {
        location: {
          search: { hoorayModal: 'true' },
          pathname: '',
        },
      };
      const switchConfigGlobal3 = {
        enableBookingBug: true,
        enableCSLabels: true,
      };
      const treeNew2 = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={registryDetailsData}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={routerNew}
          route={route}
          switchConfigGlobal={switchConfigGlobal3}
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          displayLoginModal={() => {}}
          matchParamId={'1234'}
          isLoggedIn
          toggleMode={toggleMode}
          openGoodyBoxModalOpen={openGoodyBoxModalOpen}
          clearCreateRegistryVerTypeState={clearCreateRegistryVerTypeState}
          clearCreateRegistryState={clearCreateRegistryState}
          history={history}
          fetchContentStack={sinon.spy()}
          isMobile={false}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          getRefContent={sinon.spy()}
          siteId={'BuyBuyBaby'}
          isNewCreateRegForm={'true'}
        />
      );
      treeNew2.setProps({
        createRegistryModalPopUp: true,
        contentStackSelectors: {
          modules: [{ support_page: { content_body: 'test' } }],
        },
      });
      treeNew2.instance().showCreateRegistrySuccessModal(true, 'Baby');
      expect(tree).to.not.equal(null);
    });

    it('check  wedding event type and config key', () => {
      const routerNew = {
        location: {
          search: { hoorayModal: 'true' },
          pathname: '',
        },
      };
      const switchConfigGlobal3 = {
        enableBookingBug: true,
        enableCSLabels: true,
      };
      const isNewDashboard = { RegistryOwner: { enableNewRegDashboard: true } };
      const treeNew2 = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={registryDetailsData}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={routerNew}
          route={route}
          switchConfigGlobal={switchConfigGlobal3}
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          displayLoginModal={() => {}}
          matchParamId={'1234'}
          isLoggedIn
          toggleMode={toggleMode}
          openGoodyBoxModalOpen={openGoodyBoxModalOpen}
          clearCreateRegistryVerTypeState={clearCreateRegistryVerTypeState}
          clearCreateRegistryState={clearCreateRegistryState}
          history={history}
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          getRefContent={sinon.spy()}
          siteId={'BuyBuyBaby'}
          isNewDashboard={isNewDashboard}
        />
      );
      treeNew2.setState({ showConfirmationModal: true });
      treeNew2.setProps({
        createRegistryModalPopUp: true,
        contentStackSelectors: {
          modules: [{ support_page: { content_body: 'test' } }],
        },
      });
      treeNew2.instance().showCreateRegistrySuccessModal(true, 'Wedding');
      expect(tree).to.not.equal(null);
    });

    it('should show hooray modal if eventType as BRD', () => {
      const routerNew = {
        location: {
          search: { hoorayModal: 'true' },
          pathname: '',
        },
      };
      const switchConfigGlobal3 = {
        enableBookingBug: true,
        enableCSLabels: true,
      };
      const wrapper = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={registryDetailsData}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={routerNew}
          route={route}
          switchConfigGlobal={switchConfigGlobal3}
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          displayLoginModal={() => {}}
          matchParamId={'1234'}
          eventTypeCode="BRD"
          isLoggedIn
          toggleMode={toggleMode}
          openGoodyBoxModalOpen={openGoodyBoxModalOpen}
          clearCreateRegistryVerTypeState={clearCreateRegistryVerTypeState}
          clearCreateRegistryState={clearCreateRegistryState}
          history={history}
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          getRefContent={sinon.spy()}
          siteId={'BuyBuyBaby'}
        />
      );
      wrapper.setProps({
        createRegistryModalPopUp: true,
        contentStackSelectors: {
          modules: [{ support_page: { content_body: 'horrayModal' } }],
        },
      });
      expect(
        wrapper
          .find('center')
          .at(0)
          .html()
      ).to.not.equal(null);
    });
    it('should render styles for baby', () => {
      const wrapper = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={{
            registryResVO: {
              registrySummaryVO: {
                registryState: 'inprogress',
                eventType: 'Baby',
              },
            },
          }}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={router}
          route={route}
          siteId={'BuyBuyBaby'}
          eventTypeCode={'BA1'}
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          matchParamId={'1234'}
          isLoggedIn
          displayLoginModal={() => {}}
          createRegistryModalPopUp
          previousRoute="/store/giftRegistry/viewRegistryOwner/home/1234"
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          getRefContent={sinon.spy()}
          switchConfigGlobal={switchConfigGlobal}
        />
      );
      expect(
        wrapper
          .find('div')
          .at(1)
          .hasClass('.welcomeSubText__baby')
      );
    });

    it('should render hooray for CA Baby Registry', () => {
      const routerNew = {
        location: {
          search: { hoorayModal: 'true' },
          pathname: '',
        },
      };
      const switchConfigGlobal3 = {
        enableBookingBug: true,
        enableCSLabels: true,
      };
      const wrapper = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={registryDetailsData}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={routerNew}
          route={route}
          switchConfigGlobal={switchConfigGlobal3}
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          displayLoginModal={() => {}}
          matchParamId={'1234'}
          eventTypeCode="BA1"
          siteId={'BedBathCanada'}
          enableRegBabyCreate
          isLoggedIn
          toggleMode={toggleMode}
          openGoodyBoxModalOpen={openGoodyBoxModalOpen}
          clearCreateRegistryVerTypeState={clearCreateRegistryVerTypeState}
          clearCreateRegistryState={clearCreateRegistryState}
          history={history}
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          getRefContent={sinon.spy()}
        />
      );
      wrapper.setProps({
        createRegistryModalPopUp: true,
        contentStackSelectors: {
          modules: [{ support_page: { content_body: 'horrayModal' } }],
        },
      });
      expect(
        wrapper
          .find('center')
          .at(0)
          .html()
      ).to.equal('<center>hoorayModalWedding</center>');
    });
    it('should render correct styles for baby CA registry', () => {
      const wrapper = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={{
            registryResVO: {
              registrySummaryVO: {
                registryState: 'inprogress',
                eventType: 'Baby',
              },
            },
          }}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={router}
          route={route}
          eventTypeCode="BA1"
          eventType="Baby"
          siteId={'BedBathCanada'}
          enableRegBabyCreate
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          matchParamId={'1234'}
          isLoggedIn
          displayLoginModal={() => {}}
          createRegistryModalPopUp
          previousRoute="/store/giftRegistry/viewRegistryOwner/home/1234"
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          switchConfigGlobal={switchConfigGlobal}
          getRefContent={sinon.spy()}
        />
      );
      expect(
        wrapper
          .find('div')
          .at(1)
          .hasClass('.welcomeSubText')
      );
    });

    it('should call showconfetti function  correctly', () => {
      const router1 = {
        location: {
          search: '?hoorayModal=true',
          pathname: '',
        },
      };
      const switchConfigGlobal3 = {
        enableBookingBug: true,
        enableCSLabels: true,
      };
      const contentStackSelectors = {
        stories: [
          {
            event_type: ['wedding'],
            item: [
              {
                title_cta: 'great benefits',
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
              },
            ],
          },
        ],
      };
      getElementByIdStub = sinon.stub(document, 'getElementById');
      getElementByIdStub.withArgs('canvas').returns(canvasEle);
      const wrapper = shallow(
        <RegistryOwnerHome
          labels={labels}
          dynamicContentState={dynamicContentState}
          registryDetailsData={registryDetailsData}
          regTemplate={template}
          enabledVendors={enabledVendors}
          mPulseSiteConfig={mPulseSiteConfig}
          switchConfig={switchConfig}
          router={router1}
          route={route}
          switchConfigGlobal={switchConfigGlobal3}
          siteConfig={siteConfig}
          pageConfigGlobal={pageConfigGlobal}
          activeRegistry={activeRegistry}
          displayLoginModal={() => {}}
          matchParamId={'1234'}
          eventTypeCode="BRD"
          isLoggedIn
          toggleMode={toggleMode}
          openGoodyBoxModalOpen={openGoodyBoxModalOpen}
          clearCreateRegistryVerTypeState={clearCreateRegistryVerTypeState}
          clearCreateRegistryState={clearCreateRegistryState}
          history={history}
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          getRefContent={sinon.spy()}
          siteId={'BuyBuyBaby'}
          contentStackSelectors={contentStackSelectors}
          enableRegistryQuiz={false}
          createRegistryModalPopUp
          isNewCreateRegForm
          previousRoute="/store/giftRegistry/viewRegistryOwner/home/521068446?hoorayModal=true"
        />
      );
      wrapper.setProps({
        createRegistryModalPopUp: true,
        isNewCreateRegForm: true,
        contentStackSelectors: {
          modules: [{ support_page: { content_body: 'horrayModal' } }],
        },
      });
      wrapper.setState({
        confettiAnimated: 'false',
      });
      wrapper.instance().registryReimagineShowConfetti();
      expect(wrapper).to.not.equal(null);
    });
  });
});
