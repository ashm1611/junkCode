import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { RegistryGuestWlcmeMsgForRecommender } from '../RegistryGuestWlcmeMsgForRecommender';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('Should render the <RegistryGuestWlcmeMsgForRecommender/> component and should match the snapshot', () => {
    const props = {
      labels: {
        giftGiver: {
          stepOneMsg: 'Step One',
          wlcmeMsgHeading: 'Welcome',
          stepTwoMsg: 'Step Two',
          stepThreeMsg: 'step three',
          wlcmeMsgCTA: 'Go to Registry',
        },
      },
      mountedState: true,
      closeModal: sinon.spy(),
    };

    const wrapper = shallow(
      <RegistryGuestWlcmeMsgForRecommender props={props} />
    );
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
