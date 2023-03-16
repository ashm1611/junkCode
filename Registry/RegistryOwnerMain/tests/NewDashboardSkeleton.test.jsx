import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import NewDashboardSkeleton from '../NewDashboardSkeleton';

describe(__filename, () => {
  it('should match snapshot correctly', () => {
    const tree = shallow(<NewDashboardSkeleton />);

    expect(toJson(tree)).to.matchSnapshot();
  });
});
