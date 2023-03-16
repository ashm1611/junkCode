import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AddDFModal from '../AddDFModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const referredContentData = {
    body: '<div>&lt;p&gt;hello world&lt;/p&gt;</div>',
  };
  const labels = {
    referredContent: [
      { key: '123', id: '123' },
      { key: 'diaperFundModalDescription', id: '123' },
    ],
  };
  const diaperFundProducts = [{}, {}, {}];
  const props = {
    referredContentData,
    diaperFundProducts,
    labels,
  };
  it('should render correctly', () => {
    const tree = shallow(<AddDFModal {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
