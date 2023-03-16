import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;
  const props = {
    showDeleteModal: true,
  };

  it('should render deleteGorupGift Properly', () => {
    wrapper = shallow(<ConfirmationModal {...props} />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
