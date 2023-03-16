import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import GroupGiftingTooltip from '../GroupGiftingTooltip';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;
  const props = {
    rbyrLabels: {
      groupGiftingRBYRLabel: 'RBYR Label',
      groupGiftingRBYRTitle: 'RBYR Title',
      groupGiftingRBYRDescription: 'this is RBYR description',
    },
    handleHoverRBYRtooltip: sinon.spy(),
    qtySVPurchased: 0,
  };

  it('should render GroupGiftingTooltip Properly', () => {
    wrapper = shallow(<GroupGiftingTooltip {...props} />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render GroupGiftingTooltip Properly with showFulfilledAmount', () => {
    wrapper = shallow(
      <GroupGiftingTooltip
        {...props}
        showFulfilledAmount
        isDiaperFundSku
        enableNewRegDashboard
      />
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should render correctly when cashfund is true', () => {
    const tree = shallow(
      <GroupGiftingTooltip
        ggItemContributionNeeded={30}
        amountFulfilled={30}
        isCashFund
        enableNewRegDashboard
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render GroupGiftingTooltip Properly with qtySVPurchased', () => {
    wrapper = shallow(
      <GroupGiftingTooltip {...props} qtySVPurchased={3} fromModal iconProps />
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should render GroupGiftingTooltip Properly with amountFullFill', () => {
    wrapper = shallow(
      <GroupGiftingTooltip
        {...props}
        showFulfilledAmount
        amountFulfilled={3}
        ggItemContributionNeeded={10}
      />
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should render GroupGiftingTooltip Properly when 0 ggItemContributionNeeded', () => {
    wrapper = shallow(
      <GroupGiftingTooltip {...props} ggItemContributionNeeded={0} />
    );
    expect(wrapper).to.not.equal(null);
  });
});
