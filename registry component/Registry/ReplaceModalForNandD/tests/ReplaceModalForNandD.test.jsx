import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import ReplaceModalForNandD from '../ReplaceModalForNandD';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let tree;
  let props = {
    certonaConfig: {
      scheme: {
        PDP_outofstock: 'pdp_oos',
      },
      number: {
        replace_oos_product: 10,
      },
    },
    handleNandDReplaceModal: sinon.spy(),
    productId: '111',
    fireTealiumAction: sinon.spy(),
  };
  beforeEach(() => {
    tree = shallow(<ReplaceModalForNandD {...props} />);
  });

  afterEach(() => {
    tree = null;
  });

  it('should render the "ReplaceItem" component', () => {
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should set the state to true on call of toggleATRModalState', () => {
    const instance = tree.instance();
    instance.toggleATRModalState(true);
    expect(tree.state('closeModal')).to.be.equal(true);
  });
  it('should set the state to false on call of toggleATRModalState and should call handleNandDReplaceModal', () => {
    props = { track: sinon.spy(), handleNandDReplaceModal: sinon.spy() };
    const instance = tree.instance();
    instance.toggleATRModalState(false);
    expect(tree.state('closeModal')).to.be.equal(false);
    expect(props.track.called);
    expect(props.handleNandDReplaceModal.called);
  });
  it('should not call track if  track is not type of function', () => {
    props = { track: null, handleNandDReplaceModal: sinon.spy() };
    const instance = tree.instance();
    instance.toggleATRModalState(false);

    expect(props.track).to.equal(null);
  });
  it('should not call track if track is other than function', () => {
    props = { track: 'true', handleNandDReplaceModal: sinon.spy() };
    const instance = tree.instance();
    instance.toggleATRModalState(false);

    expect(props.track).to.equal('true');
  });
  it('should componentWillReceiveProps function correctly', () => {
    tree = shallow(<ReplaceModalForNandD {...props} />);
    const instance = tree.instance();
    instance.componentWillReceiveProps(nextProps);

    props = {
      track: 'true',
      handleNandDReplaceModal: sinon.spy(),
      productId: '111',
      fireTealiumAction: sinon.spy(),
    };
    const tree1 = shallow(<ReplaceModalForNandD {...props} />);
    const nextProps = { isFetching: false };
    const instance1 = tree1.instance();
    instance1.componentWillReceiveProps(nextProps);
    expect(instance1.props.fireTealiumAction.called).be.equal(true);
  });
});
