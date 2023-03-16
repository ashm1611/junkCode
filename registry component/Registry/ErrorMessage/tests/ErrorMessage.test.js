import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import ErrorMessage from '../ErrorMessage';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly with default props', () => {
    const tree = shallow(<ErrorMessage />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly', () => {
    const tree = shallow(
      <ErrorMessage
        type="404"
        title="Oops!"
        description="We can’t find the page you’re looking for, but we can at least get you back to your registry."
        labels={{
          viewYourRegistry: 'View Your Registry',
        }}
        url="#"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
