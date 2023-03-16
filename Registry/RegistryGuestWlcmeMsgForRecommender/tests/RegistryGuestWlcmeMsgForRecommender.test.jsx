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
      location: { search: { showWelcomeMsg: 'true' } },
      labels: {
        giftGiver: {
          stepOneMsg: 'Step One',
          wlcmeMsgHeading: 'Welcome',
          stepTwoMsg: 'Step Two',
          stepThreeMsg: 'step three',
          wlcmeMsgCTA: 'Go to Registry',
        },
      },
      mapToRecommender: sinon.spy(),
    };

    const wrapper = shallow(<RegistryGuestWlcmeMsgForRecommender {...props} />);
    wrapper.setState({
      mountedState: true,
    });
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('Should not render the <RegistryGuestWlcmeMsgForRecommenderComponent/> component ', () => {
    const props = {
      location: { search: { showWelcomeMsg: 'true' } },
      labels: {
        giftGiver: {
          stepOneMsg: 'Step One',
          wlcmeMsgHeading: 'Welcome',
          stepTwoMsg: 'Step Two',
          stepThreeMsg: 'step three',
          wlcmeMsgCTA: 'Go to Registry',
        },
      },
      enableRegistryCollaboration: true,
      mapToRecommender: sinon.spy(),
    };

    const wrapper = shallow(<RegistryGuestWlcmeMsgForRecommender {...props} />);
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.be.blank;
  });
  it('should render blank if query param is not attached', () => {
    const props = {
      location: { search: { showWelcomeMsg: 'false' } },
      labels: {
        giftGiver: {
          stepOneMsg: 'Step One',
          wlcmeMsgHeading: 'Welcome',
          stepTwoMsg: 'Step Two',
          stepThreeMsg: 'step three',
          wlcmeMsgCTA: 'Go to Registry',
        },
      },
      mapToRecommender: sinon.spy(),
    };

    const wrapper = shallow(<RegistryGuestWlcmeMsgForRecommender {...props} />);
    wrapper.setState({
      mountedState: true,
    });
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
  });
  it('should check the closemodal function and on call should set the mountedState to be false', () => {
    const props = {
      location: { search: { showWelcomeMsg: 'true' } },
      labels: {
        giftGiver: {
          stepOneMsg: 'Step One',
          wlcmeMsgHeading: 'Welcome',
          stepTwoMsg: 'Step Two',
          stepThreeMsg: 'step three',
          wlcmeMsgCTA: 'Go to Registry',
        },
      },
      mapToRecommender: sinon.spy(),
    };

    const wrapper = shallow(<RegistryGuestWlcmeMsgForRecommender {...props} />);
    wrapper.setState({
      mountedState: true,
    });
    wrapper.instance().closeModal();
    expect(wrapper.state('mountedState')).to.equal(false);
  });
});
