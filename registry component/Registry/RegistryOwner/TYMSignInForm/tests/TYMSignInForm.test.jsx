import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import AccountSignIn from '@bbb-app/account-signin/containers/AccountSignIn';

import TYMSignInForm from '../TYMSignInForm';

import { mapDispatchToProps } from '../../../../../../containers/Pages/Registry/TYMSignIn/TYMSignIn';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should match snapshot', () => {
    const tree = shallow(<TYMSignInForm registryId="1337" />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});

describe('<TYMSignInForm />', () => {
  const props = {
    labels: {},
    userState: 2,
    getLoginStatus: () => {},
  };
  const wrapper = shallow(<TYMSignInForm {...props} />);

  it('should render the AccountSignIn form', () => {
    expect(wrapper.find(AccountSignIn).length).to.equal(0);
  });

  it('should recieve prop afterSignInUrl prop', () => {
    wrapper.setProps({ userState: 2 });
    expect(wrapper.prop('afterSignInUrl'));
  });

  it('change in userState should call updateLoginStatus()', () => {
    const wrapperInstance = wrapper.instance();
    const spyupdateLoginStatus = sinon.spy(
      wrapperInstance,
      'updateLoginStatus'
    );

    wrapper.setProps({ userState: 1 });
    expect(spyupdateLoginStatus.called).to.equal(true);
  });
});

describe('<TYMSignIn />', () => {
  describe('#TYMSignIn.mapDispatchToProps', () => {
    const dispatch = sinon.stub();

    it('should call dispatch', () => {
      const props = mapDispatchToProps(dispatch);
      props.signInRecognizedUser();
      /* eslint no-unused-expressions: 0 */
      expect(dispatch).to.have.been.called;
    });
  });
});
