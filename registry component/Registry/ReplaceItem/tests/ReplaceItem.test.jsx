import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import Button from '@bbb-app/core-ui/button';
import ReplaceItem from '../ReplaceItem';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('should render the "ReplaceItem" component', () => {
    const tree = shallow(<ReplaceItem />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should fire the onClick', () => {
    const handleNandDReplaceModal = sinon.stub();
    const hideReplaceModal = sinon.stub();
    const wrapper = shallow(
      <ReplaceItem
        handleNandDReplaceModal={handleNandDReplaceModal}
        hideReplaceModal={hideReplaceModal}
      />
    );
    wrapper.find(Button).simulate('click');
  });
});
