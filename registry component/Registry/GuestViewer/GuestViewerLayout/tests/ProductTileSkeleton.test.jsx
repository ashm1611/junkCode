import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Skeleton from '../ProductTileSkeleton';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Skeleton />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
