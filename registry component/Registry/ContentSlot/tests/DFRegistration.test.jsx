import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import * as isUserRecognized from '@bbb-app/utils/isUserRecognized';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import * as RegistryPubSub from '@bbb-app/utils/pubsub';
import DFRegistration from '../DFRegistration';
import * as registryStateUtil from '../../DiaperFundModal/OptInModalRegistryData';
import * as submitRegistryDataUtil from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistryConfig';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const siteId = 'BuyBuyBaby' || 'TBS_BuyBuyBaby';
    const tree = shallow(<DFRegistration siteId={siteId} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render when groupGiftOptIn is true', () => {
    const registryData = {
      registryResVO: { registrySummaryVO: { groupGiftOptIn: true } },
    };
    const tree = shallow(<DFRegistration registryData={registryData} />);
    expect(tree).to.not.equal(null);
  });

  it('should render when groupGiftOptIn is false and user is logged in', () => {
    sinon.stub(isUserLoggedIn, 'default').callsFake(() => true);
    const tree = shallow(<DFRegistration />);

    expect(tree).to.not.equal(null);
    isUserLoggedIn.default.restore();
  });

  it('should render when groupGiftOptIn is false and user is recognised', () => {
    sinon.stub(isUserRecognized, 'default').callsFake(() => true);
    const location = {};
    const tree = shallow(<DFRegistration location={location} />);

    expect(tree).to.not.equal(null);
    isUserRecognized.default.restore();
  });

  it('should call toggleAddDFModalState', () => {
    const getRegistryOwnerFirstCategory = sinon.stub();
    const pubSubStub = sinon.stub(RegistryPubSub, 'publish');
    const tree = shallow(<DFRegistration />);

    tree.instance().toggleAddDFModalState();

    tree.instance().isOPtInSelected = true;
    tree.setProps({ getRegistryOwnerFirstCategory });
    tree.instance().toggleAddDFModalState();
    expect(getRegistryOwnerFirstCategory.called).to.be.equal(true);
    pubSubStub.restore();
    expect(pubSubStub.called).to.be.equal(true);
  });

  it('should call toggleDFOptInModalState', () => {
    const pubSubStub = sinon.stub(RegistryPubSub, 'publish');
    const tree = shallow(<DFRegistration />);

    tree.instance().toggleDFOptInModalState();
    pubSubStub.restore();
    expect(pubSubStub.called).to.be.equal(true);
  });

  it('should call toggleLoginModalState', () => {
    const pubSubStub = sinon.stub(RegistryPubSub, 'publish');
    const tree = shallow(<DFRegistration />);

    tree.instance().toggleLoginModalState();
    pubSubStub.restore();
    expect(pubSubStub.called).to.be.equal(true);
  });

  it('should call toggleLoginModalState when user is loggedIn', () => {
    sinon.stub(isUserLoggedIn, 'default').callsFake(() => true);
    const tree = shallow(<DFRegistration />);

    tree.instance().toggleLoginModalState();
    isUserLoggedIn.default.restore();
  });

  it('should call componentWillReceiveProps', () => {
    sinon.stub(isUserLoggedIn, 'default').callsFake(() => true);
    const tree = shallow(<DFRegistration />);
    tree.setState({ toggleAccountSignInModal: true });
    tree.setProps({
      isAddToRegistryFetching: true,
      isRemainingItemFetching: true,
      quickItemAddedTS: true,
    });
    isUserLoggedIn.default.restore();
  });

  it('should call handleOptInButton for success response', () => {
    const regState = {};
    const registryStateUtilStub = sinon
      .stub(registryStateUtil, 'registryState')
      .returns(regState);

    const submitRegistryDataUtilStub = sinon
      .stub(submitRegistryDataUtil, 'submitRegistryData')
      .returns(regState);

    const apiResponse = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          registryResVO: {
            registrySummaryVO: {
              eventType: 'Baby',
              registryId: '1234',
              eventTypeCode: 'BA1',
            },
          },
        },
      },
      response: {
        data: {
          data: [{}, {}],
        },
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const updateGroupGiftOptInInfo = sinon.stub();
    const tree = shallow(
      <DFRegistration updateGroupGiftOptInInfo={updateGroupGiftOptInInfo} />
    );
    tree.instance().handleOptInButton();

    return promise.then(() => {
      triggerServerRequestStub.restore();
      registryStateUtilStub.restore();
      submitRegistryDataUtilStub.restore();
    });
  });

  it('should call handleOptInButton for Error response', () => {
    const apiResponse = {
      body: {
        serviceStatus: 'ERROR',
        data: {
          registryResVO: {
            registrySummaryVO: {
              eventType: 'Baby',
              registryId: '1234',
              eventTypeCode: 'BA1',
            },
          },
        },
      },
      response: {
        data: {
          data: [{}, {}],
        },
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const tree = shallow(<DFRegistration />);
    tree.instance().handleOptInButton();

    return promise.then(() => {
      triggerServerRequestStub.restore();
    });
  });

  it('should call handleOptInButton for nested api break', () => {
    const regState = {};
    const registryStateUtilStub = sinon
      .stub(registryStateUtil, 'registryState')
      .returns(regState);

    const apiResponse = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {
          registryResVO: {
            registrySummaryVO: {
              eventType: 'Baby',
              registryId: '1234',
              eventTypeCode: 'BA1',
            },
          },
        },
      },
      response: {
        data: {},
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);

    const tree = shallow(<DFRegistration />);
    tree.instance().handleOptInButton();

    return promise.then(() => {
      triggerServerRequestStub.restore();
      registryStateUtilStub.restore();
    });
  });

  it('should call handleOptInButton for api break', () => {
    const apiResponse = {
      body: {
        serviceStatus: 'SUCCESS',
        data: {},
      },
      response: {
        data: {},
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon.stub(
      ServiceUtil,
      'triggerServerRequest'
    );

    const tree = shallow(<DFRegistration />);
    tree.instance().handleOptInButton();

    return promise.then(() => {
      triggerServerRequestStub.restore();
    });
  });

  it('should call handleOptInButton for nested api fail', () => {
    const regState = {};
    const registryStateUtilStub = sinon
      .stub(registryStateUtil, 'registryState')
      .returns(regState);

    const submitRegistryDataUtilStub = sinon
      .stub(submitRegistryDataUtil, 'submitRegistryData')
      .returns(regState);

    const apiResponse = {
      body: {
        serviceStatus: 'Error',
        data: {
          registryResVO: {
            registrySummaryVO: {
              eventType: 'Baby',
              registryId: '1234',
              eventTypeCode: 'BA1',
            },
          },
        },
      },
      response: {
        data: {
          data: [{}, {}],
        },
      },
    };

    const promise = Promise.reject(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const updateGroupGiftOptInInfo = sinon.stub();
    const tree = shallow(
      <DFRegistration updateGroupGiftOptInInfo={updateGroupGiftOptInInfo} />
    );
    tree.instance().handleOptInButton();

    return promise.catch(() => {
      triggerServerRequestStub.restore();
      registryStateUtilStub.restore();
      submitRegistryDataUtilStub.restore();
    });
  });
});
