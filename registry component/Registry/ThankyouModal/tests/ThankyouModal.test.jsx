import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import ThankyouModal from '../ThankyouModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should call ThankyouModal', () => {
    const renderTellAFriendModal = sinon.stub();
    const onCancel = sinon.stub();
    const wrapper = shallow(
      <ThankyouModal
        renderTellAFriendModal={renderTellAFriendModal}
        onCancel={onCancel}
      />
    );
    wrapper.find('Button').simulate('click', () => {});
    wrapper.find('PrimaryLink').simulate('click', () => {});
  });
});
