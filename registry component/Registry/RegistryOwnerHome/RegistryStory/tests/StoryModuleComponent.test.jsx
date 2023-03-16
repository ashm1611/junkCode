import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StoryModuleComponent from '../StoryModuleComponent';

it('should render correctly', () => {
  const tree = shallow(<StoryModuleComponent />);
  expect(toJson(tree)).to.matchSnapshot();
});
