import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { noop } from '@bbb-app/utils/common';

import LeavePageConfirmationModal from '../LeavePageConfirmationModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly with default props', () => {
    const tree = shallow(
      <LeavePageConfirmationModal show onLeavePageSelected={noop} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly on desktop', () => {
    const tree = shallow(
      <LeavePageConfirmationModal
        show
        channelType="desktop"
        onLeavePageSelected={noop}
      />
    );
    const instance = tree.instance();
    instance.onModalClose();
    instance.onLeavePage();
    expect(toJson(tree)).to.matchSnapshot();
  });
});
