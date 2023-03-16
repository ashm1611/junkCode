import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AccordionWrapper from '../AccordionWrapper';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render AccordionWrapper function correctly', () => {
    const wrapper = shallow(<AccordionWrapper />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
