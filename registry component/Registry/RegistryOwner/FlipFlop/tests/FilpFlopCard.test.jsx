import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import TinderCard from '../FilpFlopCard';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const style = `msTransform: translate(50px, 100px)`;
  const classes = {
    animate: null,
  };
  const defaultProps = {
    cardId: 'BedBathUS_1043233533',
    index: 10001,
    onOutScreenLeft: function removeCard() {},
    onOutScreenRight: function removeCard() {},
    title: 'A wonderful day',
    price: {
      highPriceValueMX: 827,
      low: '$6.99 - $9.99 Each',
      lowPriceValueMX: 597,
      lowValue: 21.99,
      normal: 'FULL $21.99 - KING $43.99',
      normalValue: 43.99,
      priceLabelCodeMX: 'WAS',
      priceRangeDescription: 'FULL $%L - KING $%H',
      pricingLabelCode: 'WAS',
      wasLowPriceMX: '269.0',
    },
    rating: 0.8,
    reviews: 60,
    url: '/product/b-smith-reg-multi-purpose-server-with-tray/1043233533',
    scene7imageID: '56518543233533p',
    showMSWPModal: false,
    toggleMSWPModalState: function toggleMSWPModalState() {},
    previousUrl: '',
    atrData: {
      prodId: '22222222',
    },
    fireTealiumAction: sinon.spy(),
  };
  const other = [{ test1: 'abc' }, { test2: 'xyz' }];
  const defaultImageProps = {
    displayBanner: true,
    closeBanner: 'closeBanner',
    flipFlopBanner: other,
  };

  let stub;
  let setInitialPositionStub;

  before(() => {
    setInitialPositionStub = sinon.stub(
      TinderCard.prototype,
      'setInitialPosition'
    );
    stub = sinon.stub(window, 'addEventListener');
  });

  after(() => {
    stub.restore();
    setInitialPositionStub.restore();
  });

  it('should render correctly with componentDidMount', () => {
    const tree = shallow(
      <TinderCard style={style} className={classes} {...defaultProps} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call componentWillUnmount', () => {
    const tree = shallow(<TinderCard {...defaultProps} />);
    tree.instance().componentWillUnmount();
  });

  it('should render Tutorial for the firsttime user', () => {
    const tree = shallow(<TinderCard {...defaultImageProps} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly with isTinderCategoryVisible - left screen click', () => {
    const onOutScreenLeft = sinon.stub();
    const tree = shallow(
      <TinderCard
        style={style}
        className={classes}
        {...defaultProps}
        isTinderCategoryVisible
        onOutScreenLeft={onOutScreenLeft}
      />
    );
    tree
      .find('HyperLink')
      .at(0)
      .simulate('click', { preventDefault: sinon.stub() });
    expect(onOutScreenLeft.called).to.be.equal(true);
  });

  it('should render correctly with isTinderCategoryVisible false - right screen click', () => {
    const onOutScreenRight = sinon.stub();
    const tree = shallow(
      <TinderCard
        style={style}
        className={classes}
        {...defaultProps}
        isTinderCategoryVisible={false}
        onOutScreenRight={onOutScreenRight}
      />
    );
    tree
      .find('HyperLink')
      .at(1)
      .simulate('click', { preventDefault: sinon.stub() });
    expect(onOutScreenRight.called).to.be.equal(true);
  });
});
