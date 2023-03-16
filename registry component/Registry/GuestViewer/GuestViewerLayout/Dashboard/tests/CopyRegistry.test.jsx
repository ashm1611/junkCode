import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CopyRegistry from '../CopyRegistry';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('should render correctly', () => {
    const registryLabel = {
      copyRegistry: 'Copy registry',
    };
    const tree = shallow(<CopyRegistry registryLabel={registryLabel} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly in mobile', () => {
    const registryLabel = {
      copyRegistryMobile: 'Copy registry',
    };
    const tree = shallow(
      <CopyRegistry isMobile registryLabel={registryLabel} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('toggleModalState : should toggle modal State', () => {
    const props = {
      registryLabel: {
        copyRegistry: 'Copy registry',
      },
    };

    const tree = shallow(<CopyRegistry {...props} />);
    tree.instance().toggleModalState(true);
    expect(tree.state('modalMountedState')).to.equal(true);
  });

  it('toggleRemoveModalState : should toggle modal State', () => {
    const props = {
      registryLabel: {
        copyRegistry: 'Copy registry',
      },
    };

    const tree = shallow(<CopyRegistry {...props} />);
    tree.instance().toggleRemoveModalState(true);
    expect(tree.state('modalMountedState')).to.equal(true);
  });

  it('handleButtonClick  : should toggle modal State', () => {
    const preventDefault = sinon.stub();
    const resetResponse = sinon.stub();
    const props = {
      registryLabel: {
        copyRegistry: 'Copy registry',
      },
      resetResponse,
    };
    const state = {
      modalMountedState: false,
    };
    const event = {
      preventDefault,
    };

    const tree = shallow(<CopyRegistry {...props} state={state} />);
    tree.instance().handleButtonClick(event);
    expect(tree.state('modalMountedState')).to.equal(true);
  });
});
