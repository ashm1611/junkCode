import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryEllipsesButtons from '../RegistryEllipsesButtons';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    Edit: 'Edit',
    Remove: 'Remove',
  };
  it('should render correctly', () => {
    const tree = shallow(
      <RegistryEllipsesButtons labels={labels} isBabySite isMobile />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly in case of registrant', () => {
    const tree = shallow(<RegistryEllipsesButtons labels={labels} />);
    expect(tree).to.not.equal(null);
  });
});
