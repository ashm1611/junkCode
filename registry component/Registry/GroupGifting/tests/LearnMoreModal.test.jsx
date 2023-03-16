import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LearnMoreModal from '../LearnMoreModal/LearnMoreModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render learnMore function correctly', () => {
    const isMobile = false;
    const wrapper = shallow(<LearnMoreModal isMobile={isMobile} />);
    expect(wrapper.find('ModalDialog')).to.have.lengthOf(1);
  });
  it('should render learnMore function correctly btnclass', () => {
    const isMobile = true;
    const wrapper = shallow(<LearnMoreModal isMobile={isMobile} />);
    expect(wrapper.find('ModalDialog')).to.have.lengthOf(1);
  });
});
