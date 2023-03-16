import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Rating from '../index';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render default state without throwing', () => {
    const tree = shallow(<Rating isNavigable={false} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render with props', () => {
    const tree = shallow(
      <Rating
        title="test"
        desc="test"
        value={1}
        total={5}
        reviewLinkProps={{ href: '/test/url' }}
        ratingValue={5}
        reviewCount={100}
        displayMicroData
        reviewsLabel="5 reviews"
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render with variatons', () => {
    const tree = shallow(
      <Rating
        title="test"
        desc="test"
        value={1}
        total={5}
        type="small"
        variation="noBorder"
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render review Title when passed as props', () => {
    const tree = shallow(
      <Rating
        title="test"
        desc="test"
        value={1}
        total={5}
        type="small"
        variation="noBorder"
        reviewsLabel="5 reviews"
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render with props reviewlabel is not send', () => {
    const tree = shallow(
      <Rating
        title="test"
        desc="test"
        value={1}
        total={5}
        reviewLinkProps={{ href: '/test/url' }}
        ratingValue={undefined}
        reviewCount={undefined}
        displayMicroData
      />
    );
    expect(tree).to.not.equal(null);
  });
});
