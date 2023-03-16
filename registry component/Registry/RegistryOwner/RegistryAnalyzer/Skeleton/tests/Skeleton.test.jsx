import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Skeleton from '../Skeleton';

describe(__filename, () => {
  it('should match registry analyzer snapshot correctly', () => {
    const tree = shallow(<Skeleton />);

    expect(toJson(tree)).to.matchSnapshot();
  });
});
