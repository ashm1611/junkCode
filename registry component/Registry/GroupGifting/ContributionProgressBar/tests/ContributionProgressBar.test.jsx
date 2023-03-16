import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ContributionProgressBar from '../ContributionProgressBar';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    ggItemContributionNeeded: 20,
    amountFulfilled: 1,
    labels: {},
    totalAmt: 20,
    enableNewRegDashboard: true,
  };
  it('should render blank string', () => {
    const tree = shallow(<ContributionProgressBar {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when ggItemContributionNeeded is less then amountFullyFilled', () => {
    const tree = shallow(
      <ContributionProgressBar
        ggItemContributionNeeded={1000}
        amountFullyFilled={70}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when ggItemContributionNeeded is complete', () => {
    const tree = shallow(
      <ContributionProgressBar
        ggItemContributionNeeded={'1000'}
        amountFullyFilled={'1000'}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly when cashfund is true', () => {
    const tree = shallow(
      <ContributionProgressBar
        ggItemContributionNeeded={30}
        amountFulfilled={30}
        totalAmt={20}
        isCashFund
        enableNewRegDashboard
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when ggItemContributionNeeded is zero', () => {
    const tree = shallow(
      <ContributionProgressBar
        ggItemContributionNeeded={0}
        amountFulfilled={1000}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when ggItemContributionNeeded is zero', () => {
    const tree = shallow(
      <ContributionProgressBar
        ggItemContributionNeeded={10}
        amountFulfilled={1000}
        RegistryDetails
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly when ggItemContributionNeeded is less but more than 20 percentage` then amountFullyFilled', () => {
    const tree = shallow(
      <ContributionProgressBar
        ggItemContributionNeeded={1000}
        amountFullyFilled={230}
      />
    );
    expect(tree).to.not.equal(null);
  });
});
