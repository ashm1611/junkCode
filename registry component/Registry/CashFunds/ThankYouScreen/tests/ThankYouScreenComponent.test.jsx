import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import ThankYouScreenComponent from '../ThankYouScreenComponent';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const dynamicData = {
    ggSuccessHeading: 'thanks for contributing!',
    ggSuccessImg: {
      src: '//b3h2.scene7.com/is/image/BedBathandBeyond/Group-1?$contentFlat$',
    },
    ggSuccessSubcopy:
      'The registrant will receive an email notifying them of your thoughtful gift.',
  };
  it('should render correctly', () => {
    const tree = shallow(<ThankYouScreenComponent dynamicData={dynamicData} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
