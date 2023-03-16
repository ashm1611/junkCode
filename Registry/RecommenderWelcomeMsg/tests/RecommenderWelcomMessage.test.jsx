import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ShowRecommenderWelcomMessage } from '../RecommenderWelcomMessage';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render RecommenderWelcomMessage correctly', () => {
    const tree = shallow(<ShowRecommenderWelcomMessage />);
    expect(tree.find('ErrorBoundary')).to.have.lengthOf(1);
  });
});
