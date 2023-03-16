import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import GoodyBoxModal from '../GoodyBoxModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;
  const props = {
    labels: {},
  };
  it('should render GoodyBoxModal Properly', () => {
    wrapper = shallow(<GoodyBoxModal {...props} />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render GoodyBoxModal Properly when enableCSLabels is true', () => {
    const labelsRef = {
      referredContent: [
        {
          id: '22666',
          key: 'faqReferredContentID',
        },
      ],
    };
    wrapper = shallow(<GoodyBoxModal enableCSLabels labelsRef={labelsRef} />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
