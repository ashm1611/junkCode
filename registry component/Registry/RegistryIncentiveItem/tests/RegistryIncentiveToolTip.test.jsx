import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import RegistryIncentiveToolTip from '../RegistryIncentiveToolTip';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('RegistryIncentives ToolTip should render correctly', () => {
    const tree = shallow(
      <RegistryIncentiveToolTip incentiveInfo={{}} labels={{}} />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
});
