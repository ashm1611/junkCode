import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { noop } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import RBYRModal from '../RBYRModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const handleLearnMoreClick = sinon.stub();
  const onSelectRBYROption = sinon.stub();
  const handleOptInButton = sinon.stub();
  const handleOptOutButton = sinon.stub();
  const saveOptInDetailsFromTipsModule = sinon.spy();
  const props = {
    rbyrLabels: {
      referredContent: [
        {
          id: '7728',
          key: 'cashfundworks',
        },
        {
          id: '5534',
          key: 'txt_coupon_cashier_instruction',
        },
      ],
    },
    handleLearnMoreClick,
    onSelectRBYROption,
    isFromTipsModule: true,
    openRBYRModal: true,
    SuccessOptInMod: true,
    loginModalVisibility: true,
    RBYRAlreadyOptIn: false,
    hideLoginView: true,
  };

  it('should render RBYRModal correctly', () => {
    const doneButton = sinon.stub();
    const wrapper = shallow(<RBYRModal {...props} fromEditForm />);
    const event = {
      preventDefault: () => {},
    };
    wrapper
      .find(Button)
      .first()
      .simulate('click', event);
    expect(doneButton.called);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('handleOptInButton should be called', () => {
    const wrapper = shallow(
      <RBYRModal
        {...props}
        isFromTipsModule
        saveOptInDetailsFromTipsModule={saveOptInDetailsFromTipsModule}
      />
    );
    const wrapperInstance = wrapper.instance();
    wrapperInstance.handleOptInButton();
    expect(wrapper.find('Button')).to.have.lengthOf(2);
  });

  it('handleOptOutButton should be called', () => {
    const wrapper = shallow(<RBYRModal {...props} />);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.handleOptOutButton();
    /* eslint no-unused-expressions: 0 */
    expect(handleLearnMoreClick).to.have.been.called;
    expect(onSelectRBYROption).to.have.called;
  });

  it('on click call handleOptInButton', () => {
    const wrapper = shallow(<RBYRModal {...props} />);
    wrapper
      .find(Button)
      .first()
      .simulate('click', { preventDefault: noop });
    expect(handleOptInButton.called);
  });

  it('on click call handleOptOutButton', () => {
    const wrapper = shallow(<RBYRModal {...props} />);
    wrapper
      .find(Button)
      .at(1)
      .simulate('click', { preventDefault: noop });
    expect(handleOptOutButton.called);
  });
});
