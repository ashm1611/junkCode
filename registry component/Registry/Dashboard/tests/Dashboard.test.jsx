import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as getSiteId from '@bbb-app/utils/getSiteId';
import Dashboard from '../Dashboard';
import * as enableBookAnAppointment from '../../../../../components/abtests/BookAnAppointmentExperiment/BookAnAppointmentUtil';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<Dashboard />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render New Registry dashboard correctly', () => {
    const props = {
      switchConfig: { enableNewRegDashboard: true },
      registryDetails: { registrySummaryVO: { eventType: 'Wedding' } },
      eventType: 'Wedding',
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Manjari',
            primaryRegistrantLastName: 'Prithani',
            coRegistrantLastName: 'test',
            coRegistrantFirstName: 'test',
          },
        },
      },
      isMobile: false,
      labels: {
        registryDetails: {},
      },
      isLoggedIn: {},
      isSocialAnnexReady: true,
    };
    const tree = shallow(<Dashboard {...props} />);
    expect(tree).to.not.equal(null);
  });
  it('should render New Registry dashboard correctly for Baby', () => {
    const siteId = sinon.stub(getSiteId, 'default').returns('BuyBuyBaby');
    const props = {
      switchConfig: { enableNewRegDashboard: true },
      registryDetails: { registrySummaryVO: { eventType: 'Baby' } },
      eventType: 'Baby',
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Manjari',
            primaryRegistrantLastName: 'Prithani',
            coRegistrantLastName: 'test',
            coRegistrantFirstName: 'test',
          },
        },
      },
      isMobile: false,
      labels: {
        registryDetails: {},
      },
      isLoggedIn: {},
      isSocialAnnexReady: true,
    };
    const tree = shallow(<Dashboard {...props} />);
    expect(tree).to.not.equal(null);
    siteId.restore();
  });

  it('should render correctly when accessPermitted is true', () => {
    const BookAnAppointmentPreview = sinon
      .stub(enableBookAnAppointment, 'enableBookAnAppointment')
      .returns(true);
    const siteId = sinon.stub(getSiteId, 'default').returns('BuyBuyBaby');
    const props = {
      giftGiver: false,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Manjari',
            primaryRegistrantLastName: 'Prithani',
            eventType: 'Baby',
          },
        },
      },
      isMobile: false,
      labels: {
        registryDetails: {},
      },
      isLoggedIn: {},
    };
    const tree = shallow(<Dashboard {...props} />);
    BookAnAppointmentPreview.restore();
    siteId.restore();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when accessPermitted is false', () => {
    const siteId = sinon.stub(getSiteId, 'default').returns('TBS_BedBathUS');
    const props = {
      giftGiver: true,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Manjari',
            primaryRegistrantLastName: 'Prithani',
          },
        },
      },
      isMobile: false,
      labels: {
        registryDetails: {},
      },
      isLoggedIn: {},
    };
    const tree = shallow(<Dashboard {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
    siteId.restore();
  });

  it('should render correctly with other props', () => {
    const props = {
      giftGiver: true,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Manjari',
            primaryRegistrantLastName: 'Prithani',
            coRegistrantLastName: 'test',
            coRegistrantFirstName: 'test',
          },
        },
      },
      isMobile: false,
      labels: {
        registryDetails: {},
      },
      isLoggedIn: {},
      isSocialAnnexReady: true,
      myFundsData: { balance: 100 },
    };
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('ImageWrapper')).to.have.lengthOf(1);
  });

  it('should render newRegistryLayout for BuyBuyBaby baby Registry', () => {
    const props = {
      giftGiver: true,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Goku',
            primaryRegistrantLastName: 'Vegeta',
            coRegistrantLastName: 'test',
            coRegistrantFirstName: 'test',
          },
        },
      },
      isMobile: false,
      labels: {
        registryDetails: {},
      },
      eventType: 'Baby',
      isLoggedIn: {},
      isSocialAnnexReady: true,
      myFundsData: { balance: 100 },
      enableICToggle: true,
    };
    const siteId = sinon.stub(getSiteId, 'default').returns('BuyBuyBaby');
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('.registryContainer')).to.have.lengthOf(1);
    siteId.restore();
  });

  it('should render newRegistryLayout for Bedbath wedding Registry', () => {
    const props = {
      giftGiver: true,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Goku',
            primaryRegistrantLastName: 'Vegeta',
            coRegistrantLastName: 'test',
            coRegistrantFirstName: 'test',
          },
        },
      },
      isMobile: false,
      labels: {
        registryDetails: {},
      },
      eventType: 'Wedding',
      isLoggedIn: {},
      isSocialAnnexReady: true,
      myFundsData: { balance: 100 },
      enableICToggle: true,
    };
    const siteId = sinon.stub(getSiteId, 'default').returns('BedBathUS');
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('.registryContainer')).to.have.lengthOf(1);
    siteId.restore();
  });

  it('should render newRegistryLayout in mobile view', () => {
    const props = {
      giftGiver: true,
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'Goku',
            primaryRegistrantLastName: '',
            coRegistrantLastName: 'test',
            coRegistrantFirstName: 'test',
          },
        },
      },
      labels: {
        registryDetails: {},
      },
      eventType: 'Wedding',
      isLoggedIn: {},
      isSocialAnnexReady: true,
      myFundsData: { balance: 100 },
      enableICToggle: true,
      isMobile: true,
    };
    const siteId = sinon.stub(getSiteId, 'default').returns('BedBathUS');
    const tree = shallow(<Dashboard {...props} />);
    expect(tree.find('.registryContainer')).to.have.lengthOf(1);
    siteId.restore();
  });
});
