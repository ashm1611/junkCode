import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { RegistryActionButtons, compareLabels } from '../RegistryActionButtons';

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
    expect(tree.find('.pl3')).to.have.length(2);
  });
  it('should render share registry component', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
          },
        },
      },
      giftGiver: true,
      activeRegistry: {
        registrantEmail: 'masked',
      },
    };
    const tree = shallow(<RegistryActionButtons {...props} printregistry />);
    expect(tree.find('.pl3')).to.have.length(2);
  });
  it('should render with CopyRegistryComponent', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            giftRegistered: ['1', '2'],
          },
        },
      },
      isLoggedIn: true,
      giftGiver: true,
      registryList: ['1', '2'],
      activeRegistry: {
        registryId: '123456',
      },
      registryId: '654321',
      printregistry: true,
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    expect(tree.find('.pl3')).to.have.length(2);
  });

  it('should render share registry component for mobile device', () => {
    const props = {
      isMobile: true,
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    expect(tree.find('.pr2')).to.have.length(1);
  });
  it('should call compareLabels', () => {
    // return true
    const tree = compareLabels(true, true, false);
    expect(tree).to.be.equal(true);
    // return false
    const tree1 = compareLabels(false, true, false);
    expect(tree1).to.be.equal(false);
  });
  it('should render email registry component for mobile device', () => {
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
          },
        },
      },
      giftGiver: true,
      isMobile: true,
      handleTealiumEvent: true,
      activeRegistry: {
        registrantEmail: 'masked',
      },
    };
    const tree = shallow(<RegistryActionButtons {...props} />);
    expect(tree.find('.pr2')).to.have.length(1);
  });

  it('should render print Registry Icon for BBB', () => {
    const fireTealiumAction = sinon.spy();
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            giftRegistered: ['1', '2'],
          },
        },
      },
      isLoggedIn: true,
      giftGiver: true,
      registryList: ['1', '2'],
      activeRegistry: {
        registryId: '123456',
      },
      registryId: '654321',
      printregistry: true,
      fireTealiumAction,
    };
    const tree = shallow(
      <RegistryActionButtons {...props} isBBBNewRegistryHeader isMobile />
    );
    expect(tree.find('PrimaryLink').props().iconProps.type).to.equal(
      'bbb-print'
    );
    tree.find('PrimaryLink').simulate('click');
    expect(tree.find('PrimaryLink').props().href).to.not.equal(null);
  });

  it('should render new print Registry Icon for Baby', () => {
    const fireTealiumAction = sinon.spy();
    const props = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            isPublic: '1',
            giftRegistered: ['1', '2'],
          },
        },
      },
      isLoggedIn: true,
      giftGiver: true,
      registryList: ['1', '2'],
      activeRegistry: {
        registryId: '123456',
      },
      registryId: '654321',
      printregistry: true,
      fireTealiumAction,
    };
    const tree = shallow(
      <RegistryActionButtons {...props} isBabyNewRegistryHeader isMobile />
    );
    expect(tree.find('PrimaryLink').props().iconProps.type).to.equal(
      'baby-print'
    );
    tree.find('PrimaryLink').simulate('click');
    expect(tree.find('PrimaryLink').props().href).to.not.equal(null);
  });
});
