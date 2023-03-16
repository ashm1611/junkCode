import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import { RegistryOwnerHome } from '../RegistryOwnerHome';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  describe('showConfetti for RegistryReimagine feature', () => {
    const toggleMode = sinon.spy();
    const openGoodyBoxModalOpen = sinon.stub();
    const clearCreateRegistryVerTypeState = sinon.spy();
    const clearCreateRegistryState = sinon.spy();
    const router = {
      location: {
        search: '?hoorayModal=true',
        pathname: '',
      },
    };
    const history = [];
    const canvasEle = document.createElement('canvas');
    canvasEle.setAttribute('id', 'canvas');
    const displayLoginModal = () => {};
    const pageConfigGlobal = {
      refID_BRD: 'refID_BRD',
      refID_BA1: 'refID_BA1',
      defaultBedbathStore: 1,
      defaultBabyStore: 2,
      defaultCanadaStore: 3,
    };
    const dynamicContentState = {
      content: {
        '1': { body: 'hoorayModalWedding' },
        '2': { body: 'hoorayModalBaby' },
      },
    };
    const labels = {
      createRegistry: {
        referredContent: [
          { key: 'hoorayModalWedding', id: '1' },
          { key: 'hoorayModalBaby', id: '2' },
        ],
      },
    };
    const registryDetailsData = {
      registryResVO: {
        registrySummaryVO: {
          registryState: 'inprogress',
          eventType: 'Wedding',
        },
      },
    };
    const template = { regions: {}, layout: {} };
    const enabledVendors = { gru_tri: true };
    const route = { routeData: { pageName: 'RegistryOwnerHome' } };
    const switchConfig = { enableMPulse: true };
    const switchConfigGlobal = { globalMPulseEnable: true };
    const siteConfig = {
      thirdPartyDataConfig: { bookingBug: { appointmentsUrl: 'baseUrl' } },
    };
    let getElementByIdStub = '';
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
    const commonProps = {
      labels,
      dynamicContentState,
      registryDetailsData,
      regTemplate: { template },
      enabledVendors: { enabledVendors },
      switchConfig: { switchConfig },
      router,
      route: { route },
      switchConfigGlobal,
      siteConfig,
      pageConfigGlobal,
      activeRegistry,
      displayLoginModal,
      matchParamId: '1234',
      isLoggedIn: true,
      toggleMode: { toggleMode },
      openGoodyBoxModalOpen: { openGoodyBoxModalOpen },
      clearCreateRegistryVerTypeState: { clearCreateRegistryVerTypeState },
      clearCreateRegistryState: { clearCreateRegistryState },
      history: { history },
      previousRoute: '/store/giftregistry/createRegistryForm',
    };

    afterEach(() => {
      getElementByIdStub.restore();
    });

    it(`should show confetti on baby registry create for BuyBuyBaby`, () => {
      getElementByIdStub = sinon.stub(document, 'getElementById');
      const getElm = getElementByIdStub.withArgs('canvas').returns(canvasEle);
      const tree2 = shallow(
        <RegistryOwnerHome
          {...commonProps}
          eventTypeCode="BA1"
          siteId="BuyBuyBaby"
          getElm={getElm}
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          isNewCreateRegForm={'true'}
        />
      );
      expect(toJson(tree2)).to.matchSnapshot();
    });

    it(`should show confetti on wedding registry create for BedBathUS`, () => {
      getElementByIdStub = sinon.stub(document, 'getElementById');
      getElementByIdStub.withArgs('canvas').returns(canvasEle);
      const tree2 = shallow(
        <RegistryOwnerHome
          {...commonProps}
          eventTypeCode="BRD"
          siteId="BedBathUS"
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
        />
      );
      expect(toJson(tree2)).to.matchSnapshot();
    });

    it(`should show confetti on wedding registry create for BedBathCA`, () => {
      getElementByIdStub = sinon.stub(document, 'getElementById');
      getElementByIdStub.withArgs('canvas').returns(canvasEle);
      const tree2 = shallow(
        <RegistryOwnerHome
          {...commonProps}
          eventTypeCode="BRD"
          siteId="BedBathCA"
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
          isNewCreateRegForm={'true'}
        />
      );
      expect(toJson(tree2)).to.matchSnapshot();
    });

    it(`should not show confetti on wedding registry create if enableRegWedCreate is false `, () => {
      getElementByIdStub = sinon.stub(document, 'getElementById');
      getElementByIdStub.withArgs('canvas').returns(canvasEle);
      const tree2 = shallow(
        <RegistryOwnerHome
          {...commonProps}
          eventTypeCode="BRD"
          siteId="BedBathCA"
          fetchContentStack={sinon.spy()}
          setCheckListTooltip={sinon.spy()}
          tealiumConfirmationInfo={sinon.spy()}
        />
      );
      expect(toJson(tree2)).to.matchSnapshot();
    });
  });
});
