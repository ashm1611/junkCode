import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as getSiteId from '@bbb-app/utils/getSiteId';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import RegistryDetails from '../DashboardDetails';

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

  it('should render RegistryActionButtons', () => {
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
    expect(tree.find('RegistryActionButtons')).to.have.lengthOf(1);
  });

  it('should not render registry-gender when gender is null', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
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
    expect(tree.find({ 'data-locator': 'registry-gender' })).to.have.lengthOf(
      0
    );
  });

  it('should render registry-idlink', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      gender: 'S~||S~',
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
    expect(tree.find({ 'data-locator': 'registry-idlink' })).to.have.lengthOf(
      1
    );
  });

  it('should render registry-datelink', () => {
    const styles = {
      userName: '',
      detailsValue: '',
      details: '',
    };
    const registryDetails = {
      gender: 'B~||G~||S~',
      babyGender: null,
      registrySummaryVO: {
        primaryRegistrantFirstName: 'abc',
        primaryRegistrantLastName: 'xyz',
        coRegistrantFirstName: null,
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
    expect(tree.find({ 'data-locator': 'registry-datelink' })).to.have.lengthOf(
      1
    );
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
          babyMaidenName: 'ABC',
        },
      },
      registrySummaryVO: {
        primaryRegistrantFirstName: 'ABC',
        primaryRegistrantLastName: 'ABC',
        coRegistrantFirstName: 'ABC',
        coRegistrantLastName: 'ABC',
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
