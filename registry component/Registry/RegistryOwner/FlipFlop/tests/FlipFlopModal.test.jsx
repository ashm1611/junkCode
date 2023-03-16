import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import FlipFlopModal from '../FlipFlopModal';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    flipFlopNotAccesibleMsg: 'FlipFlop not accessible',
    errorAddToRegistryFlipFlop: 'ATR error',
  };

  const props = {
    toggleErrorModalState: sinon.stub(),
    labels,
    imgURL: 'scene7URL',
    closeIconShow: true,
    labelToShow: 'flipFLopATRError',
    ariaLabel: 'flipFlopAriaLabel',
    mountedState: false,
  };

  const nextProps = {
    toggleErrorModalState: sinon.stub(),
    labels,
    imgURL: 'scene7URL',
    closeIconShow: true,
    labelToShow: 'flipFLopATRError',
    ariaLabel: 'flipFlopAriaLabel',
    mountedState: true,
  };

  it('should render with mock data', () => {
    const tree = shallow(<FlipFlopModal {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render with mock data while calling componentWillRecieveProps', () => {
    const tree = shallow(<FlipFlopModal {...props} />);
    tree.instance().componentWillReceiveProps(nextProps);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render with mock data while calling componentWillRecieveProps with same props', () => {
    const tree = shallow(<FlipFlopModal {...props} />);
    tree.instance().componentWillReceiveProps(props);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
