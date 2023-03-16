import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import Button from '@bbb-app/core-ui/button';
import { noop } from '@bbb-app/utils/common';
import * as windowWidth from '@bbb-app/utils/viewPortUtils';
import ManageNotificationModal from '../ManageNotificationModal';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const initiateFetching = sinon.stub();
  const handleGiftOptinButton = sinon.spy();
  const props = {
    initiateFetching,
    handleGiftOptinButton,
  };

  it('should render the "ManageNotificationModal" component', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns('400');

    const wrapper = shallow(<ManageNotificationModal {...props} />);
    windowObj.restore();
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render the "ManageNotificationModal" component returns false', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns('1024');

    const wrapper = shallow(<ManageNotificationModal {...props} />);
    windowObj.restore();
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('on click call intiateFetching method', () => {
    const wrapper = shallow(<ManageNotificationModal {...props} />);
    wrapper
      .find(Button)
      .first()
      .simulate('click', { preventDefault: noop, props });
    expect(initiateFetching.called);
  });
});
