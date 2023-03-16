import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import DeactivateRegistryModalComponent from '../DeactivateRegistryModalComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    modalMountedState: true,
    toggleModalState: sinon.spy(),
    deactivateReg: sinon.spy(),
    modalContent: 'modalContent',
  };
  it('should render correctly', () => {
    const tree = shallow(<DeactivateRegistryModalComponent {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
    tree
      .find('Button')
      .at(1)
      .simulate('click');
  });
});
