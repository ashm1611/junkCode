import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import TellAFriendForm from '../TellAFriendForm';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let tree;
  const formWrapperData = {
    firstName: { value: 'abc', firstNameError: '' },
    lastName: { value: 'bcc', lastNameError: '' },
  };

  const toggleModalState = sinon.spy();
  const labels = {
    firstName: 'firstName',
    lastName: 'lastName',
  };

  const identifier = 'tellAFried';
  const error = 'Something Went wrong';

  const props = {
    formWrapperData,
    labels,
    identifier,
    error,
    toggleModalState,
  };

  beforeEach(() => {
    tree = shallow(<TellAFriendForm {...props} />);
  });

  afterEach(() => {
    tree = null;
  });

  it('should render the "TellAFriendFormForm" component', () => {
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should setState emailCopyChecked', () => {
    tree.instance().emailCopy();
    expect(tree.instance().state.emailCopyChecked).to.equal(true);
  });

  it('should call onCancel', () => {
    const preventDefault = sinon.stub();
    const e = {
      preventDefault,
    };
    tree.instance().onCancel(e);
    /* eslint no-unused-expressions: 0 */
    expect(toggleModalState).to.have.been.called;
  });

  it('should call onCancel on click of primarylink', () => {
    tree.find(PrimaryLink).simulate('click', { preventDefault() {} });
    /* eslint no-unused-expressions: 0 */
    expect(toggleModalState).to.have.been.called;
  });

  it('should call submitTellAFriendForm', () => {
    const formWrapperTestData = {
      senderFirstName: { value: 'test' },
      senderLastName: { value: 'test' },
      recipientFirstName: { value: 'test' },
      recipientLastName: { value: 'test' },
      senderEmailAddr: { value: 'test' },
      recipientEmailAddr: { value: 'test' },
    };
    const submitTellAFriend = sinon.stub();

    tree.setProps({ formWrapperData: formWrapperTestData, submitTellAFriend });
    const obj = {};
    tree.instance().submitTellAFriendForm(obj);
  });

  it('should render Notification component for error', () => {
    const errorMessage = {
      response: { data: { errorMessages: [{ message: 'error:error' }] } },
    };
    const formWrapperTestData = {
      senderFirstName: { value: 'test' },
      senderLastName: { value: 'test' },
      recipientFirstName: { value: 'test' },
      recipientLastName: { value: 'test' },
      senderEmailAddr: { value: 'test' },
      recipientEmailAddr: { value: 'test' },
    };
    tree.setProps({
      error: errorMessage,
      formWrapperData: formWrapperTestData,
    });
    tree.instance().submitTellAFriendForm(errorMessage);
    expect(tree.find('Notification')).to.have.lengthOf(1);
  });
});
