import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as commonUtil from '@bbb-app/utils/common';
import { Dashboard } from '../GuestViewerDashboard';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('TBS_BedBathUS');
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'test',
            primaryRegistrantLastName: 'test',
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
    commonUtil.getSiteId.restore();
  });

  it('should render without props', () => {
    const tree = shallow(<Dashboard />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render GiftWrapper', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'test',
            primaryRegistrantLastName: 'test',
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
    expect(tree.find('GiftWrapper')).to.have.lengthOf(1);
  });

  it('should render correctly with other props', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            primaryRegistrantFirstName: 'test',
            primaryRegistrantLastName: '',
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
});
