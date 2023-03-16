import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as commonUtil from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell/Cell';
import Button from '@bbb-app/core-ui/button';
import RegistryBanner from '../RegistryBanner';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <RegistryBanner
        eventType={{}}
        eventCode={''}
        labels={{}}
        isLoggedIn
        toggleRegistryModalState={() => {}}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call toggleRegistryModalState', () => {
    const toggleRegistryModalSpy = sinon.spy();
    const wrapper = shallow(
      <RegistryBanner
        eventType={{}}
        eventCode={''}
        labels={{}}
        toggleRegistryModalState={toggleRegistryModalSpy}
      />
    );
    wrapper
      .find(Cell)
      .find(Button)
      .last()
      .simulate('click', { preventDefault: () => {} });
    expect(toggleRegistryModalSpy.called).to.equal(true);
  });

  it('should run for BuyBuyBaby', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
    const wrapper = shallow(
      <RegistryBanner eventType={{}} eventCode={''} labels={{}} />
    );
    expect(wrapper).to.not.equal(null);
    commonUtil.getSiteId.restore();
  });

  it('should run for BedBathCanada', () => {
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const wrapper = shallow(
      <RegistryBanner eventType={{}} eventCode={'COL'} labels={{}} />
    );
    expect(wrapper).to.not.equal(null);
    commonUtil.isBedBathCanada.restore();
  });

  it('should render styles based on config key', () => {
    const wrapper = shallow(
      <RegistryBanner
        eventType={'Wedding'}
        eventCode={''}
        labels={{}}
        isLoggedIn
        toggleRegistryModalState={() => {}}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render styles based on config key for baby registry', () => {
    const wrapper = shallow(
      <RegistryBanner
        eventType={'Baby'}
        eventCode={''}
        labels={{}}
        isLoggedIn
        toggleRegistryModalState={() => {}}
        isBabyRegistry
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render ca_baby banner text correctly & show confetti', () => {
    const wrapper = shallow(
      <RegistryBanner
        eventType={'Baby'}
        eventCode={''}
        labels={{}}
        isLoggedIn
        toggleRegistryModalState={() => {}}
        isCABabyRegistry
      />
    );
    expect(
      wrapper.find('.weddingRegBannerHeading').props().children
    ).to.be.equal("Let's create your baby registry");
    expect(wrapper.find('.confettiLeft')).to.have.lengthOf(1);
  });
});
