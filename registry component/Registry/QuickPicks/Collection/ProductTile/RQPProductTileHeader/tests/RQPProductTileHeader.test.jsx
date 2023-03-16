import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RQPProductTileHeader from '../RQPProductTileHeader';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render default', () => {
    const tree = shallow(
      <RQPProductTileHeader
        label="Why We Love This"
        tooltip="This is awesome!"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render without tooltip', () => {
    const tree = shallow(<RQPProductTileHeader label="Why We Love This" />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
