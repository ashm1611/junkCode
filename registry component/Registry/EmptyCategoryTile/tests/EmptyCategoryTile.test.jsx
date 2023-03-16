import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import EmptyCategoryTile from '../EmptyCategoryTile';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<EmptyCategoryTile type="myItemsCard" />);
    expect(toJson(tree)).to.matchSnapshot();
    const tree1 = shallow(<EmptyCategoryTile type="myItemsCard" focusable />);
    expect(tree1).not.to.be.equal(null);
  });
});
