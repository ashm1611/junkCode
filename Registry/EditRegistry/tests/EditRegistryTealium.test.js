import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import { getRBYRTealiumData } from '@bbb-app/tbs/containers/RBYRTealium';
import { fireOptInTealium, fireTealium } from '../EditRegistryTealium';
import RBYRModal from '../../../../../components/Pages/Registry/RBYRModal/RBYRModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const handleTealiumAction = sinon.spy();

  it('should call fireOptInTealium when only storedValue gets change in edit', () => {
    fireOptInTealium(handleTealiumAction, true, false, true, false);
    /* eslint no-unused-expressions: 0 */
    expect(handleTealiumAction).to.have.been.called;
  });

  it('should call fireOptInTealium when only group gift setting gets change in edit', () => {
    fireOptInTealium(handleTealiumAction, false, true, false, true);
    expect(handleTealiumAction).to.have.been.called;
  });

  it('should call fireOptInTealium when both storedValue group gift setting are being changed', () => {
    fireOptInTealium(handleTealiumAction, true, true, true, true);
    expect(handleTealiumAction).to.have.been.called;
  });

  it('should call getRBYRTealiumData with blank utag', () => {
    const handleLearnMoreClick = sinon.stub();
    const onSelectRBYROption = sinon.stub();
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
      saveOptInDetailsFromTipsModule: true,
    };
    const wrapper = shallow(<RBYRModal {...props} />);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.handleOptInButton();
    getRBYRTealiumData(undefined);
    expect(handleLearnMoreClick).to.have.been.called;
  });

  it('should call fireTealium ', () => {
    fireTealium(handleTealiumAction);
    expect(handleTealiumAction.called).to.be.equal(true);
  });
});
