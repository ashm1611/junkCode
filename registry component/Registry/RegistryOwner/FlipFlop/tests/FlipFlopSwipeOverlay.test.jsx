import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import FlipFLopSwipeOverlay from './../FlipFLopSwipeOverlay';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = { labelMsg: 'flipFlopNotAccesibleMsg', opacity: 0 };
  it('should render correctly', () => {
    const tree = shallow(<FlipFLopSwipeOverlay {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when props got changed', () => {
    const tree = shallow(<FlipFLopSwipeOverlay {...props} />);
    tree.setProps({ opacity: 10 });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when props not changed', () => {
    const tree = shallow(
      <FlipFLopSwipeOverlay {...props} iconType="flipFlopWasteBin" />
    );
    tree.setProps({ opacity: 0 });
    expect(tree.find({ className: 'flipFLopCSSDisplayNone' })).to.have.lengthOf(
      1
    );
  });
});
