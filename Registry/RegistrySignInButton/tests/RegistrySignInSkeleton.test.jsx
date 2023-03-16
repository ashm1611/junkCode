import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import RegistrySignInSkeleton from '../RegistrySignInSkeleton';

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<RegistrySignInSkeleton count={4} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
