import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import RegistryDeviceVerification from '../RegistryDeviceVerification';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('should render correctly RegistryDeviceVerification component', () => {
    const tree = shallow(
      <RegistryDeviceVerification
        deviceVerificationData={{
          verificationType: 'pin',
        }}
        isExtendAccount
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
});
