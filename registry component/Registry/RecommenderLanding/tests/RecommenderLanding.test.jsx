import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { RecommenderLanding } from '../RecommenderLanding';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render the "RecommenderLanding"', () => {
    const props = {
      labels: {
        eyebrowText: 'EyeBrow',
        heading: 'Heading',
        description: 'Description',
        ctaText: 'Go to Registry',
      },
      imageUrl: 'https://image',
      handleClick: sinon.spy(),
    };
    const tree = shallow(<RecommenderLanding {...props} />);
    /* eslint no-unused-expressions: 0 */
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render the "RecommenderLanding" with disabledCTA', () => {
    const spy = sinon.stub();
    const props = {
      labels: {
        eyebrowText: 'EyeBrow',
        heading: 'Heading',
        description: 'Description',
        ctaText: 'Go to Registry',
      },
      imageUrl: 'https://image',
      handleClick: sinon.spy(),
      isBtnDisable: true,
    };
    const tree = shallow(<RecommenderLanding {...props} />);
    /* eslint no-unused-expressions: 0 */
    tree
      .find('#rl-gotocta')
      .first()
      .simulate('click');
    expect(spy.called);
  });

  it('should render the "RecommenderLanding" with disabledCTA and access denied message shown', () => {
    const props = {
      labels: {
        eyebrowText: 'EyeBrow',
        heading: 'Heading',
        description: 'Description',
        ctaText: 'Go to Registry',
      },
      imageUrl: 'https://image',
      handleClick: sinon.spy(),
      isBtnDisable: true,
      privateRegistryMessage: true,
    };
    const tree = shallow(<RecommenderLanding {...props} />);
    /* eslint no-unused-expressions: 0 */
    tree
      .find('#rl-gotocta')
      .first()
      .simulate('click');
    expect(tree.find('Notification')).to.have.lengthOf(1);
  });

  it('should render the "RecommenderLanding" with disabledCTA and token expired message shown', () => {
    const props = {
      labels: {
        eyebrowText: 'EyeBrow',
        heading: 'Heading',
        description: 'Description',
        ctaText: 'Go to Registry',
      },
      imageUrl: 'https://image',
      handleClick: sinon.spy(),
      isBtnDisable: true,
      invalidMessage: true,
    };
    const tree = shallow(<RecommenderLanding {...props} />);
    /* eslint no-unused-expressions: 0 */
    tree
      .find('#rl-gotocta')
      .first()
      .simulate('click');
    expect(tree.find('Notification')).to.have.lengthOf(1);
  });
  it('should render loader', () => {
    const props = {
      labels: {
        eyebrowText: 'EyeBrow',
        heading: 'Heading',
        description: 'Description',
        ctaText: 'Go to Registry',
      },
      imageUrl: 'https://image',
      handleClick: sinon.spy(),
      showLoaderForButton: true,
      genericError: 'something getting wrong',
      isMobile: true,
    };
    const tree = shallow(<RecommenderLanding {...props} />);
    /* eslint no-unused-expressions: 0 */
    expect(tree).to.not.be.blank;
  });
});
