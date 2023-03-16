import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LearnMoreMainBanner from '../LearnMoreMainBanner/LearnMoreMainBanner';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render component ', () => {
    const tree = shallow(<LearnMoreMainBanner />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should simulate onclick ', () => {
    const tree = shallow(<LearnMoreMainBanner isCongratsMessage />);
    tree.find('PrimaryLink').simulate('click');
  });
});
