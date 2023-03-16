import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SocialRecommendation from '../SocialRecommendation';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly for wrong siteId', () => {
    const props = {
      labels: { key: 'labels' },
      data: {},
      deviceConfig: { desktop: 1024 },
      mPulseEnabled: true,
      switchConfig: { enableRegistryCollaboration: true },
    };
    const tree = shallow(<SocialRecommendation {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly for no data', () => {
    const props = {
      labels: { key: 'labels' },
      data: {},
      deviceConfig: { desktop: 1024 },
      mPulseEnabled: true,
      switchConfig: { enableRegistryCollaboration: true },
    };
    const tree = shallow(<SocialRecommendation {...props} />);
    expect(tree).to.not.equal(null);
  });
  it('should render correctly with data', () => {
    const props = {
      labels: { key: 'labels' },
      data: { datakey: 'dataVal' },
      deviceConfig: { desktop: 1024 },
      mPulseEnabled: true,
      switchConfig: { enableRegistryCollaboration: true },
    };
    const tree = shallow(<SocialRecommendation {...props} />);
    expect(tree).to.not.equal(null);
  });
  it('should render correctly Else Condition with data', () => {
    const props = {
      labels: { key: 'labels' },
      data: { datakey: 'dataVal' },
      deviceConfig: { desktop: 1024 },
      mPulseEnabled: true,
      switchConfig: { enableRegistryCollaboration: false },
    };
    const tree = shallow(<SocialRecommendation {...props} />);
    expect(tree).to.not.equal(null);
  });
});
