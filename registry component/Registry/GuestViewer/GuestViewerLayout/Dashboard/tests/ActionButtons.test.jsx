import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { RegistryActionButtons, compareLabels } from '../ActionButtons';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('should render correctly', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '0',
          },
        },
      },
      printregistry: true,
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly without props', () => {
    const tree = shallow(<RegistryActionButtons />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('compareLabels: should return true', () => {
    const tree = compareLabels(true, true, false);
    expect(tree).to.be.equal(true);
  });

  it('compareLabels: should return false', () => {
    const tree1 = compareLabels(false, true, false);
    expect(tree1).to.be.equal(false);
  });

  it('should render EmailRegistry component', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
          },
        },
      },
      handleTealiumEvent: true,
      activeRegistry: {
        registrantEmail: 'masked',
      },
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    expect(tree.find('EmailRegistry')).to.have.lengthOf(1);
  });

  it('should render EmailRegistry component for mobile device', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
          },
        },
      },
      isMobile: true,
      activeRegistry: {},
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    expect(tree.find('EmailRegistry')).to.have.lengthOf(1);
  });

  it('should render CopyRegistry component', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            giftRegistered: 2,
          },
        },
      },
      activeRegistry: { registryId: '1234' },
      isLoggedIn: true,
      registryList: [{}],
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    expect(tree.find('CopyRegistry')).to.have.lengthOf(1);
  });

  it('should call redirectTo for copy registry', () => {
    const redirectTo = sinon.stub();
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            giftRegistered: 2,
          },
        },
      },
      isMobile: true,
      activeRegistry: { registryId: '1234' },
      isLoggedIn: true,
      registryList: [{}],
      redirectTo,
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    tree
      .find('CopyRegistry')
      .props()
      .redirectToMyRegistry();
    expect(redirectTo.called).to.be.equal(true);
  });
});
