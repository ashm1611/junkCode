import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SuccessOptInModal from '../SuccessOptInModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render renderSuccessModal function correctly', () => {
    const wrapper = shallow(<SuccessOptInModal isMobile />);
    expect(wrapper.find('ModalDialog')).to.have.lengthOf(1);
  });

  it('should render toggleModal function correctly', () => {
    const wrapper = shallow(<SuccessOptInModal />);
    wrapper.setState({ showSuccessModal: true });
    wrapper.instance().toggleModal();
    expect(wrapper.state('showSuccessModal')).to.equal(false);
  });
});
