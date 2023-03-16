import { configure, shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import TellAFriendComponent from '../TellAFriendComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const formWrapperData = {
      firstName: { value: 'abc', firstNameError: '' },
      lastName: { value: 'bcc', firstNameError: '' },
    };
    const labels = {
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const identifier = 'tellAFried';
    const error = 'Something Went wrong';

    const tree = shallow(
      <TellAFriendComponent
        formWrapperData={formWrapperData}
        labels={labels}
        identifier={identifier}
        error={error}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
