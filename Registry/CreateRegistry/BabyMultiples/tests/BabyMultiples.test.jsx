import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import { BabyMultiples, mapDispatchToProps } from '../BabyMultiples';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    referredContent: {
      content: {
        '1234': {
          body: 'text',
        },
      },
    },
    labels: {
      referredContent: [{ key: 'babyMultiplesPersonas', id: '1234' }],
    },
    isMobile: false,
    styles: {},
    updateState: sinon.spy(),
    fetchContent: sinon.spy(),
  };
  it('should render correctly', () => {
    const tree = shallow(<BabyMultiples {...props} />);

    expect(props.fetchContent.called).to.equal(true);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly if no content', () => {
    const tree = shallow(<BabyMultiples {...props} referredContent={{}} />);

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render null if no content id', () => {
    const tree = shallow(<BabyMultiples {...props} labels={{}} />);

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call dispatch fetchContent', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.fetchContent();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
});
