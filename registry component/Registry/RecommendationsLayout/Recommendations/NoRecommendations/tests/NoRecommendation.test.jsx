import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import NoRecommendation from '../NoRecommendations';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly with default props', () => {
    const tree = shallow(
      <NoRecommendation>
        <div>Hello World</div>
      </NoRecommendation>
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when shown', () => {
    const tree = shallow(
      <NoRecommendation show>
        <div>Hello world</div>
      </NoRecommendation>
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
