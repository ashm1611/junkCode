import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import DraggableCard from '../FlipFlopDrag';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = { isFlipFlopEnabled: true };
  const handlePan = { animate: null };

  let configureHammerStub;
  let getElm;
  let getQueryElement;

  before(() => {
    configureHammerStub = sinon.stub(
      DraggableCard.prototype,
      'configureHammer'
    );
    getElm = sinon.stub(document, 'getElementById');
    getQueryElement = sinon.stub(document, 'querySelector');
  });

  after(() => {
    configureHammerStub.restore();
    getElm.restore();
    getQueryElement.restore();
  });

  it('should render correctly with componentDidMount', () => {
    const tree = shallow(
      <DraggableCard {...props} handlePan={handlePan} cardId="1" />
    );
    tree.setProps({ cardId: '1' });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly with panStart', () => {
    const tree = shallow(<DraggableCard {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it(`should give stickyFilterWrap the sticky class animation`, () => {
    const wrapper = shallow(<DraggableCard {...props} />);
    wrapper.setState({ animation: true });
    wrapper.instance().panstart();
    expect(wrapper.state('animation')).to.equal(false);
  });

  it(`should give stickyFilterWrap the sticky class start position`, () => {
    const wrapper = shallow(<DraggableCard {...props} />);
    wrapper.setState({ startPosition: true });
    wrapper.instance().panstart();
    expect(wrapper.state('startPosition')).to.be.a('object');
  });

  it('should call unmount once', () => {
    const willUnmount = sinon.stub(
      DraggableCard.prototype,
      'componentWillUnmount'
    );
    const tree = shallow(<DraggableCard {...props} />);
    tree.unmount();
    expect(willUnmount).to.have.property('callCount', 1);
  });

  it('should call panstart from handlePan', () => {
    const wrapper = shallow(<DraggableCard {...props} />);
    const ev = {
      preventDefault: () => {},
      type: 'panstart',
    };
    wrapper.instance().handlePan(ev);
  });

  it('should call panend from handlePan', () => {
    getElm.returns({});
    getQueryElement.returns({ offsetWidth: 0 });
    const wrapper = shallow(<DraggableCard {...props} />);
    const ev = {
      preventDefault: () => {},
      type: 'panend',
    };
    wrapper.instance().handlePan(ev);
    wrapper.instance().handleSwipe();
    getQueryElement.restore();
    expect(wrapper.instance().state.animation).to.be.equal(true);
  });

  it('should call panend from handlePan when x is less than 50', () => {
    const onOutScreenLeft = sinon.stub();
    getElm.returns({});
    const wrapper = shallow(
      <DraggableCard {...props} onOutScreenLeft={onOutScreenLeft} />
    );
    wrapper.setState({ x: -60 });
    const ev = {
      preventDefault: () => {},
      type: 'panend',
    };
    wrapper.instance().handlePan(ev);
    expect(onOutScreenLeft.called).to.be.equal(true);
  });

  it('should call panend from handlePan and call onOutScreenRight', () => {
    const onOutScreenRight = sinon.stub();
    getElm.returns({ offsetWidth: 0 });
    sinon.stub(document, 'querySelector').returns({ offsetWidth: 100 });
    document.getElementById
      .withArgs('flipFlopDragCard')
      .returns({ offsetWidth: 100 });
    const wrapper = shallow(
      <DraggableCard {...props} onOutScreenRight={onOutScreenRight} />
    );
    const ev = {
      preventDefault: () => {},
      type: 'panend',
    };
    wrapper.instance().handlePan(ev);
    expect(onOutScreenRight.called).to.be.equal(true);
  });

  it('should call panmove from handlePan when deltaX is not divided by 2', () => {
    const wrapper = shallow(<DraggableCard {...props} />);
    const ev = {
      preventDefault: () => {},
      type: 'panmove',
      deltaX: 9,
      deltaY: 10,
    };
    wrapper.instance().handlePan(ev);
  });

  it('should call panmove from handlePan when isFlipFlopEnabled is true', () => {
    const wrapper = shallow(<DraggableCard {...props} />);
    const ev = {
      preventDefault: () => {},
      type: 'panmove',
      deltaX: 10,
      deltaY: 10,
    };
    wrapper.instance().handlePan(ev);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call panmove from handlePan when isFlipFlopEnabled is VARIANT-B', () => {
    const newProps = { isFlipFlopEnabled: 'VARIANT-C' };
    const wrapper = shallow(<DraggableCard props={newProps} />);
    const ev = {
      preventDefault: () => {},
      type: 'panmove',
      deltaX: 180,
      deltaY: 10,
    };
    wrapper.instance().handlePan(ev);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call panmove from handlePan when isFlipFlopEnabled is VARIANT-C', () => {
    const newProps = { isFlipFlopEnabled: 'VARIANT-B' };
    const wrapper = shallow(<DraggableCard props={newProps} />);
    const ev = {
      preventDefault: () => {},
      type: 'panmove',
      deltaX: 11,
      deltaY: 10,
    };
    wrapper.instance().handlePan(ev);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call panmove from handlePan when isFlipFlopEnabled is true and deltaX negative', () => {
    const newProps = { isFlipFlopEnabled: true };
    const wrapper = shallow(<DraggableCard props={newProps} />);
    const ev = {
      preventDefault: () => {},
      type: 'panmove',
      deltaX: -180,
      deltaY: 10,
    };
    wrapper.instance().handlePan(ev);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call panmove from handlePan when isFlipFlopEnabled is false', () => {
    const newProps = { isFlipFlopEnabled: false };
    const wrapper = shallow(<DraggableCard props={newProps} />);
    const ev = {
      preventDefault: () => {},
      type: 'panmove',
      deltaX: -180,
      deltaY: 10,
    };
    wrapper.instance().handlePan(ev);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call panmove from handlePan', () => {
    const panmove = sinon.stub(DraggableCard.prototype, 'panmove');
    const wrapper = shallow(<DraggableCard {...props} />);
    const ev = {
      preventDefault: () => {},
      type: 'panmove',
    };
    wrapper.instance().handlePan(ev);
    expect(panmove.called).to.equal(true);
  });

  it('should call pancancel from handlePan', () => {
    const wrapper = shallow(<DraggableCard {...props} />);
    const ev = {
      preventDefault: () => {},
      type: 'pancancel',
    };
    wrapper.instance().handlePan(ev);
  });

  it('should go to default of handlePan', () => {
    const wrapper = shallow(<DraggableCard {...props} />);
    const ev = {
      preventDefault: () => {},
      type: 'abc',
    };
    wrapper.instance().handlePan(ev);
  });
});
