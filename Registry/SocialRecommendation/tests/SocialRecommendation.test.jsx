import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { SocialRecommendation } from '../SocialRecommendation';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render socialRecommendation correctly', () => {
    const resetFirstCategoryCallFired = sinon.spy();
    const resetIsItemsFetchingStatus = sinon.spy();
    const wrapper = shallow(
      <SocialRecommendation
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        registrySwitchConfig={{ enableMPulse: true }}
        globalSwitchConfig={{ globalMPulseEnable: true }}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
      />
    );

    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
