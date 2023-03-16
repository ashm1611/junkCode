import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow } from 'enzyme/build';
import Checkbox from '@bbb-app/core-ui/checkbox';
import { RenderFacetsCheckbox } from '../ComponentUtils';

describe(__filename, () => {
  const handleBopisCheckboxChange = sinon.spy();
  const handleChangePickupInStore = sinon.spy();
  const props = {
    labels: {},
    storeDetails: { commonName: 'New york' },
    selectedCheckboxFilter: true,
    handleBopisCheckboxChange,
    handleChangePickupInStore,
    isBopisFeatureEnable: true,
    bopisStoreDetail: {
      isBopisStore: false,
    },
  };
  it('render RenderFacetsCheckbox with storeDetails else', () => {
    const prop = {
      labels: {},
      storeDetails: { commonName: 'New york' },
      selectedCheckboxFilter: true,
      handleBopisCheckboxChange,
      handleChangePickupInStore,
      isBopisFeatureEnable: true,
    };
    const wrapper = shallow(
      <RenderFacetsCheckbox {...prop} siteId={'TBS_BuyBuyBaby'} />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('render RenderFacetsCheckbox without storeDetails', () => {
    const wrapper = shallow(<RenderFacetsCheckbox {...props} />);
    wrapper.setProps({ storeDetails: {} });
  });
  it('render RenderFacetsCheckbox and on click store change', () => {
    const wrapper = shallow(
      <RenderFacetsCheckbox
        {...props}
        isNewDashboard
        handleToggleAllFilters={sinon.spy()}
      />
    );
    wrapper.find('#changeStoreCTA').simulate('click');
    // eslint-disable-next-line no-unused-expressions
    expect(handleChangePickupInStore).to.have.been.called;
  });
  it('handleBopisCheckboxChange for online items', () => {
    const wrapper = shallow(<RenderFacetsCheckbox {...props} />);
    wrapper
      .find(Checkbox)
      .at(0)
      .prop('onSelect')();
    // eslint-disable-next-line no-unused-expressions
    expect(handleBopisCheckboxChange).to.have.been.called;
  });

  it('handleBopisCheckboxChange for bopis', () => {
    const wrapper = shallow(<RenderFacetsCheckbox {...props} isMobile />);
    wrapper
      .find(Checkbox)
      .at(1)
      .prop('onSelect')();
    // eslint-disable-next-line no-unused-expressions
    expect(handleBopisCheckboxChange).to.have.been.called;
  });
});
