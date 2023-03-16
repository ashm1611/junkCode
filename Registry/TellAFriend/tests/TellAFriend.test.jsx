import { configure, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { TellAFriend, mapDispatchToProps } from '../TellAFriend';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<TellAFriend />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should setState in componentWillReceiveProps', () => {
    const nextProps = {
      result: true,
    };
    const tree = shallow(<TellAFriend />);
    tree.instance().componentWillReceiveProps(nextProps);
    const thankyouModalState = tree.instance().state.thankyouModalState;
    expect(thankyouModalState).to.equal(true);
    const mountedState = tree.instance().state.mountedState;
    expect(mountedState).to.equal(false);
  });
  it('should not setState in componentWillReceiveProps if result not changed', () => {
    const nextProps = {
      result: true,
    };
    const tree = shallow(<TellAFriend result />);
    tree.instance().componentWillReceiveProps(nextProps);
    const thankyouModalState = tree.instance().state.thankyouModalState;
    expect(thankyouModalState).to.equal(false);
    const mountedState = tree.instance().state.mountedState;
    expect(mountedState).to.equal(false);
  });

  it('should setState onCancel', () => {
    const tree = shallow(<TellAFriend />);
    tree.instance().onCancel();
    expect(tree.instance().state.thankyouModalState).to.equal(false);
    expect(tree.instance().state.mountedState).to.equal(false);
  });

  it('should call renderTellAFriendModal when user click on link', () => {
    const tree = shallow(<TellAFriend />);
    const spy = sinon.spy(tree.instance(), 'renderTellAFriendModal');
    tree.find('PrimaryLink').simulate('click');
    expect(spy.called).to.equal(true);
    expect(tree.instance().state.thankyouModalState).to.equal(false);
    expect(tree.instance().state.mountedState).to.equal(true);
  });

  it('should setState thankyoumodalClose', () => {
    const tree = shallow(<TellAFriend />);
    tree.instance().thankyoumodalClose();
    expect(tree.instance().state.thankyouModalState).to.equal(false);
  });

  it('should setState modalClose', () => {
    const tree = shallow(<TellAFriend />);
    tree.instance().modalClose();
    expect(tree.instance().state.mountedState).to.equal(false);
  });

  it('should setState renderTellAFriendModal', () => {
    const tree = shallow(<TellAFriend />);
    tree.instance().renderTellAFriendModal();
    expect(tree.instance().state.thankyouModalState).to.equal(false);
    expect(tree.instance().state.mountedState).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchRegistryOwnerItemsFirstCategory which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const formdata = { firstName: 'test', lastName: 'test' };
    const props = mapDispatchToProps(dispatch);
    props.submitTellAFriend(formdata);
    expect(dispatch.called).to.equal(true);
  });
});
