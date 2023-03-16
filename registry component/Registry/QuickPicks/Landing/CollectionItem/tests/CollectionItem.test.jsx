import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CollectionItem from '../CollectionItem';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly with default props', () => {
    const tree = shallow(<CollectionItem />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call function', () => {
    const tree = shallow(<CollectionItem />);
    tree.instance().onClick();
  });
});
