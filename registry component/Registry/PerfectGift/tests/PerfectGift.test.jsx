import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import PerfectGift from '../PerfectGift';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly when isMobile is true', () => {
    const props = {
      cta: { url: '#', displayName: 'Start Browising' },
      image: {
        url: 'some.url.com',
        alt: 'Start Browsing image',
      },
      subTitle: 'Dont see the perfect gift?',
      isMobile: true,
    };
    const tree = shallow(<PerfectGift {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly when isMobile is false', () => {
    const props = {
      cta: { url: '#', displayName: 'Start Browising' },
      image: {
        url: 'some.url.com',
        alt: 'Start Browsing image',
      },
      subTitle: 'Dont see the perfect gift?',
      isMobile: false,
    };
    const tree = shallow(<PerfectGift {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should  simulate onclick', () => {
    const props = {
      cta: { url: '#', displayName: 'Start Browising' },
      setBuyOffContext: sinon.stub(),
    };
    const tree = shallow(<PerfectGift {...props} />);
    tree.find('PrimaryLink').simulate('click');
  });
  it('should render without props', () => {
    const tree = shallow(<PerfectGift />);
    expect(tree).to.not.equal(null);
  });
});
