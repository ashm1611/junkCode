import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as getSiteId from '@bbb-app/utils/getSiteId';
import ToggleButton from '@bbb-app/core-ui/toggleButton';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import sinon from 'sinon';
import RegistryDetails from '../RegistryDetails';

configure({ adapter: new Adapter() });

const labels = {
  createRegistry: {
    abc: 'abc',
    Boy1Girl0: '1 Boy',
    Boy2Girl0: '2 Boys',
    Boy3Girl0: '3 Boys',
    Boy0Girl1: '1 Girl',
    Boy0Girl2: '2 Girls',
    Boy0Girl3: '3 Girls',
    Boy1Girl1: '1 Boy & 1 Girl',
    Boy2Girl1: '2 Boys & 1 Girl',
    Boy1Girl2: '1 Boy & 2 Girls',
  },
  registryDetails: {
    isThisYoursRegistryLbl: 'is this yours?',
  },
};

describe(__filename, () => {
  it('should render correctly', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      registryVO: {
        isPublic: '1',
        primaryRegistrant: {
          babyMaidenName: undefined,
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: undefined,
        primaryRegistrantLastName: undefined,
        coRegistrantFirstName: undefined,
        coRegistrantLastName: undefined,
      },
      gender: 'male',
      babyGender: '',
      giftGiver: true,
    };
    const eventType = 'Baby';
    const signInDetails = {};
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        eventType={eventType}
        mPulseEnabled
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when registryDetails is undefined', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      registryVO: {
        primaryRegistrant: {
          babyMaidenName: 'efg',
        },
      },
      babyGender: undefined,
      giftGiver: true,
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: 'pqe',
        coRegistrantLastName: 'sew',
      },
    };
    const eventType = 'Baby';
    const signInDetails = {};
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        eventType={eventType}
        mPulseEnabled
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });

  it('should render correctly gender: null', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      giftGiver: true,
      gender: null,
      registryVO: {
        isPublic: '0',
        primaryRegistrant: {
          babyMaidenName: 'efg',
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: 'pqe',
        coRegistrantLastName: 'sew',
      },
    };
    const signInDetails = { isLoggedIn: {} };
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        mPulseEnabled
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });

  it('should render correctly when gender value is S~||S~ and enableBabyMultiples', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      giftGiver: true,
      gender: 'S~||S~',
      registryVO: {
        isPublic: '0',
        primaryRegistrant: {
          babyMaidenName: 'efg',
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: 'pqe',
        coRegistrantLastName: 'sew',
      },
    };
    const registryConfig = {
      enableBabyMultiples: true,
    };
    const signInDetails = { isLoggedIn: {} };
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        registryConfig={registryConfig}
        mPulseEnabled
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render correctly when gender value is B~||G~ and enableBabyMultiples', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      giftGiver: true,
      gender: 'B~||G~',
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: 'pqe',
        coRegistrantLastName: 'sew',
      },
    };
    const registryConfig = {
      enableBabyMultiples: true,
    };
    const signInDetails = { isLoggedIn: {} };
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        registryConfig={registryConfig}
        mPulseEnabled
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render correctly when gender value is B~||G~||S~ and enableBabyMultiples', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      giftGiver: true,
      gender: 'B~||G~||S~',
      babyGender: null,
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: 'pqe',
        coRegistrantLastName: 'sew',
        primaryRegistrantMaidenName: 'test',
      },
    };
    const registryConfig = {
      enableBabyMultiples: true,
    };
    const signInDetails = { isLoggedIn: {} };
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        registryConfig={registryConfig}
        mPulseEnabled
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });

  it('should toggle component if isBBBNewRegistryHeader is true', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      giftGiver: true,
      registryVO: {
        isPublic: '0',
        primaryRegistrant: {
          babyMaidenName: 'efg',
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: 'pqe',
        coRegistrantLastName: 'sew',
      },
    };
    const signInDetails = { isLoggedIn: null };
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        mPulseEnabled
        isBBBNewRegistryHeader
      />
    );
    expect(tree.find('.toggleSection').length).to.equal(1);
  });

  it('should trim registry header if isBBBNewRegistryHeader & isMobile is true', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      giftGiver: true,
      registryVO: {
        isPublic: '0',
        primaryRegistrant: {
          babyMaidenName: 'efg',
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: 'pqe',
        coRegistrantLastName: 'sew',
      },
    };
    const signInDetails = { isLoggedIn: null };
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        mPulseEnabled
        isBBBNewRegistryHeader
        isMobile
      />
    );
    expect(tree.find('.userNameStyle').text()).not.contains("'s Registry");
  });
  it('should call setToggleEdit action', () => {
    const registryDetails = {
      registryVO: {
        isPublic: '1',
        primaryRegistrant: {
          babyMaidenName: undefined,
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: undefined,
        primaryRegistrantLastName: undefined,
        coRegistrantFirstName: undefined,
        coRegistrantLastName: undefined,
      },
      gender: 'male',
      babyGender: '',
      giftGiver: true,
    };
    const registryData = {
      registryResVO: {
        registrySummaryVO: {},
        registryVO: {
          event: {},
          coRegistrant: {},
          primaryRegistrant: {
            contactAddress: {},
          },
          shipping: {
            shippingAddress: {},
            futureshippingAddress: {},
          },
        },
      },
    };
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const signInDetails = { isLoggedIn: null };
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
    const setShowChecklist = sinon.spy();
    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const fireTealiumAction = sinon.spy();
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        registryData={registryData}
        signInDetails={signInDetails}
        labels={labels}
        isBabyNewRegistryHeader
        setShowChecklist={setShowChecklist}
        fireTealiumAction={fireTealiumAction}
      />
    );
    tree
      .find(ToggleButton)
      .props()
      .setToggleState();
    return promise.then(() => {
      triggerServerRequestStub.restore();
      // eslint-disable-next-line no-unused-expressions
      expect(setShowChecklist).to.be.called;
    });
  });
  it('should log error', () => {
    const registryDetails = {
      registryVO: {
        isPublic: '1',
        primaryRegistrant: {
          babyMaidenName: undefined,
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: undefined,
        primaryRegistrantLastName: undefined,
        coRegistrantFirstName: undefined,
        coRegistrantLastName: undefined,
      },
      gender: 'male',
      babyGender: '',
      giftGiver: true,
    };
    const registryData = {
      registryResVO: {
        registrySummaryVO: {},
        registryVO: {
          event: {},
          coRegistrant: {},
          primaryRegistrant: {
            contactAddress: {},
          },
          shipping: {
            shippingAddress: {},
            futureshippingAddress: {},
          },
        },
      },
    };
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const signInDetails = { isLoggedIn: null };
    const apiResponse = {
      status: 400,
      data: {},
    };
    const setShowChecklist = sinon.spy();
    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const tree = shallow(
      <RegistryDetails
        styles={styles}
        registryDetails={registryDetails}
        registryData={registryData}
        signInDetails={signInDetails}
        labels={labels}
        isBabyNewRegistryHeader
        setShowChecklist={setShowChecklist}
      />
    );
    tree
      .find(ToggleButton)
      .props()
      .setToggleState(true);
    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(toJson(tree)).to.not.equal(null);
    });
  });
  it('should render correctly when siteid is bedbathcanada', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      registryVO: {
        isPublic: '1',
        primaryRegistrant: {
          babyMaidenName: undefined,
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: undefined,
        primaryRegistrantLastName: undefined,
        coRegistrantFirstName: undefined,
        coRegistrantLastName: undefined,
      },
      gender: 'male',
      babyGender: '',
      giftGiver: true,
    };
    const eventType = 'Baby';
    const signInDetails = {};
    sinon.stub(getSiteId, 'default').returns('BedBathCanada');
    const tree = shallow(
      <RegistryDetails
        level={1}
        styles={styles}
        registryDetails={registryDetails}
        signInDetails={signInDetails}
        labels={labels}
        eventType={eventType}
        mPulseEnabled
      />
    );
    getSiteId.default.restore();
    expect(toJson(tree)).to.not.equal(null);
  });
});
