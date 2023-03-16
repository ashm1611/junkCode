import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import GoodyBoxProgressBar from '../GoodyBoxProgressBar';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;
  const props = {
    registryData: {
      registryResVO: { registrySummaryVO: { giftRegistered: 16 } },
    },
  };

  it('should render GoodyBoxModal Properly', () => {
    wrapper = shallow(<GoodyBoxProgressBar {...props} />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render GoodyBoxModal with otherProps', () => {
    const otherProps = {
      registryData: {
        registryResVO: { registrySummaryVO: { giftRegistered: 16 } },
      },
    };
    wrapper = shallow(<GoodyBoxProgressBar {...otherProps} />);
    expect(wrapper.find('div')).to.have.lengthOf(3);
  });

  it('should render GoodyBoxModal when goody box is eligible', () => {
    const otherProps = {
      registryData: {
        registryResVO: { registrySummaryVO: { goodyBoxEligible: true } },
      },
    };
    wrapper = shallow(<GoodyBoxProgressBar {...otherProps} />);
    expect(wrapper.find('div')).to.have.lengthOf(2);
  });

  it('should render GoodyBoxModal when goody box is eligible and inStock', () => {
    const otherProps = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            goodyBoxInStock: true,
            goodyBoxEligible: true,
            giftRegistered: 16,
          },
        },
      },
    };
    wrapper = shallow(<GoodyBoxProgressBar {...otherProps} />);
    expect(wrapper.find('div')).to.have.lengthOf(2);
  });

  it('should render GoodyBoxModal when goody box already claimed', () => {
    const otherProps = {
      registryData: {
        registryResVO: { registrySummaryVO: { goodyBoxClaimed: true } },
      },
    };
    wrapper = shallow(<GoodyBoxProgressBar {...otherProps} />);
    expect(
      wrapper.find({ 'data-locator': 'goodyBoxClaimedStatus' })
    ).to.have.lengthOf(1);
  });
  it('should return empty when giftRegistered gives NaN value', () => {
    const otherProps = {
      registryData: {
        registryResVO: { registrySummaryVO: { giftRegistered: 'hkjhk' } },
      },
    };
    wrapper = shallow(<GoodyBoxProgressBar {...props} {...otherProps} />);

    expect(wrapper).to.be.empty; // eslint-disable-line
  });
});
