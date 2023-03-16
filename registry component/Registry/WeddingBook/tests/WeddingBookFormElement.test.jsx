import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import WeddingBookFormElement from '../WeddingBookFormElement';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render the "FormElement" component', () => {
    const formWrapperData = {
      firstName: { value: 'abc', firstNameError: '' },
      lastName: { value: 'bbb', lastNameError: '' },
    };
    const tree = shallow(
      <WeddingBookFormElement
        formWrapperData={formWrapperData}
        fieldName="firstName"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render the "FormElement" component when formWrapperData is null', () => {
    const tree = shallow(<WeddingBookFormElement />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
