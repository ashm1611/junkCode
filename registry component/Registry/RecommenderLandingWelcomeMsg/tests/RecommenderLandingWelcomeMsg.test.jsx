import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { ShowRecommenderWelcomMessage } from '../RecommenderLandingWelcomeMsg';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('Should render the <ShowRecommenderWelcomMessage/> component and should match the snapshot', () => {
    const props = {
      eyebrowText: 'EyeBrow',
      heading: 'Heading',
      description: 'Description',
    };

    const wrapper = shallow(<ShowRecommenderWelcomMessage props={props} />);
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
