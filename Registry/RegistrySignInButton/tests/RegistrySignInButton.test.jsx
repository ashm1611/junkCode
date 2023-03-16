import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
  RegistrySignInButton,
  mapDispatchToProps,
} from '../RegistrySignInButton';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const defaultprops = {
    registryListIsFetching: true,
  };
  it('should render the "RegistrySignInButton" component container', () => {
    const wrapper = shallow(<RegistrySignInButton {...defaultprops} />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should call renderLoggedIn', () => {
    const wrapper = shallow(<RegistrySignInButton />);
    wrapper.instance().renderLoggedIn();
  });
  it('should call componentWillReceiveProps correctly', () => {
    const setRegistryLandingSignIn = sinon.stub();
    const props = {
      isRegistryLandingSignIn: true,
      setRegistryLandingSignIn,
    };

    const nextProps = {
      allRegistries: {
        activeRegistry: {
          registryId: '4345345',
        },
      },
    };
    const wrapper = shallow(<RegistrySignInButton {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    const spy = sinon.spy(wrapper.instance(), 'runRegistryRedirection');
    expect(spy.calledWith(nextProps, true));
  });
  it('should not call runRegistryRedirection if props update but isRegistryLandingSignIn is false ', () => {
    const setRegistryLandingSignIn = sinon.stub();
    const props = {
      isRegistryLandingSignIn: false,
      setRegistryLandingSignIn,
    };

    const nextProps = {
      allRegistries: {
        activeRegistry: {
          registryId: '4345345',
        },
      },
    };
    const wrapper = shallow(<RegistrySignInButton {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'runRegistryRedirection');
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(spy.called).to.equal(false);
  });
  it('should call runRegistryRedirection', () => {
    const propsData = {
      allRegistries: { activeRegistry: { registryId: '12345' } },
    };
    const setRegistryLandingSignIn = sinon.stub();

    const wrapper = shallow(
      <RegistrySignInButton
        setRegistryLandingSignIn={setRegistryLandingSignIn}
      />
    );
    wrapper.instance().runRegistryRedirection(propsData, false);
  });
  it('should redirect to registryOwner if endpoint & registryid is available ', () => {
    const propsData = {
      allRegistries: {
        activeRegistry: { registryId: '12345' },
      },
    };

    const setRegistryLandingSignIn = sinon.stub();
    const props = {
      endPoints: {
        registryOwner: '/store/giftRegistry/viewRegistryOwner/myItems/:id?',
      },
      setRegistryLandingSignIn,
    };
    const wrapper = shallow(<RegistrySignInButton {...props} />);
    wrapper.instance().runRegistryRedirection(propsData, false);
    expect(wrapper.instance().state.redirectToURL).to.equal(
      '/store/giftRegistry/viewRegistryOwner/myItems/12345'
    );
  });
  it('should redirect to soonest registry page if list is Active', () => {
    const propsData = {
      allRegistries: {
        soonestRegistry: { registryId: '12345' },
        listActive: true,
      },
    };

    const setRegistryLandingSignIn = sinon.stub();
    const props = {
      setRegistryLandingSignIn,
    };
    const wrapper = shallow(<RegistrySignInButton {...props} />);
    wrapper.instance().runRegistryRedirection(propsData, false);
    expect(wrapper.instance().state.redirectToURL).to.equal('');
  });
  it('should not redirect to other page if its redirected from login page ', () => {
    const propsData = {
      allRegistries: {
        activeRegistryId: { registryId: '12345' },
        listActive: true,
      },
    };

    const setRegistryLandingSignIn = sinon.stub();
    const props = {
      setRegistryLandingSignIn,
    };
    const wrapper = shallow(<RegistrySignInButton {...props} />);
    wrapper.instance().runRegistryRedirection(propsData, true);
    expect(wrapper.instance().state.redirectToURL).to.equal('');
    expect(wrapper.instance().state.redirectToOtherPage).to.equal(false);
  });
  it('should redirect to my Registry Page for active list having registry not null ', () => {
    const propsData = {
      allRegistries: {
        activeRegistryId: { registryId: '12345' },
        listActive: true,
      },
    };

    const setRegistryLandingSignIn = sinon.stub();
    const props = {
      setRegistryLandingSignIn,
      endPoints: {
        myregistries: 'abc.com/',
      },
    };
    const wrapper = shallow(<RegistrySignInButton {...props} />);
    wrapper.instance().runRegistryRedirection(propsData, false);
    expect(wrapper.instance().state.redirectToURL).to.equal(
      'abc.com/?scrollToRegistry=true'
    );
  });

  it('should call accountSignInClick', () => {
    const setRegistryLandingSignIn = sinon.stub();
    const props = {
      isLoggedIn: true,
      setRegistryLandingSignIn,
      allRegistries: {
        soonestRegistry: {
          registryId: '3435346',
        },
        listActive: true,
      },
      endPoints: {
        registryOwner: '/store/giftRegistry/viewRegistryOwner/myItems/:id?',
      },
    };
    const wrapper = shallow(<RegistrySignInButton {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'accountSignInClick');
    const runRegistryRedirection = sinon.spy(
      wrapper.instance(),
      'runRegistryRedirection'
    );
    wrapper.find('AccountSignInButton').simulate('click');
    wrapper
      .find('AccountSignInButton')
      .dive()
      .find('PrimaryLink')
      .simulate('click');
    expect(spy.called).to.equal(true);
    expect(setRegistryLandingSignIn.called).to.equal(true);
    expect(runRegistryRedirection.called).to.equal(true);
  });
  it('should call Dispatch', () => {
    const dispatch = sinon.stub();
    const isRegistryLandingSignIn = true;
    const prop = mapDispatchToProps(dispatch);
    prop.setRegistryLandingSignIn(isRegistryLandingSignIn);
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
});
