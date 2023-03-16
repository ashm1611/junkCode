import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RenderInput from '../RenderInput';

configure({ adapter: new Adapter() });

describe(`${__filename}`, () => {
  const updateState = sinon.stub();
  const afterValidation = sinon.stub();
  const wrapper = shallow(
    <RenderInput
      fieldName="email"
      validation="signinEmail"
      label={{}}
      classes={''}
      type="text"
      required
      locator="registry-personalInfoEmail"
      emailError={''}
      updateState={updateState}
      value={''}
      emailInfo={'test'}
      afterValidation={afterValidation}
      isRegistryEmail="true"
      ssTest
      focusShow={() => {
        return true;
      }}
      fromPersonalInfo
    />
  );
  const notRequiredWrapper = shallow(
    <RenderInput
      fieldName="coEmail"
      validation="signinEmail"
      label={{}}
      classes={''}
      type="text"
      locator="registry-personalInfoCoEmail"
      coEmailError="Email Required"
      updateState={updateState}
      value={''}
    />
  );
  it('RenderInput should be rendered correctly with all the props', () => {
    wrapper.setProps({
      emailInfo: true,
      isRegistryEmail: false,
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('emailError state should not be empty for invalid email on blur', () => {
    wrapper.find('[name="email"]').simulate('blur', {
      target: {
        name: 'email',
        value: 'test',
      },
    });
    wrapper.setProps({
      fromPersonalInfo: false,
      isRegistryEmail: true,
      emailInfo: true,
    });
    const showExistingUserNotification = wrapper.setState({
      showExistingUserNotification: false,
    });
    wrapper.instance().closeClick = showExistingUserNotification;
    wrapper.instance().checkForPhoneFields();
    expect(wrapper.state('emailError')).to.not.equal('');
  });
  it('emailError state should be empty for not required email', () => {
    notRequiredWrapper.setState({
      coEmailError: '',
      coEmail: '',
    });
    notRequiredWrapper.find('[name="coEmail"]').simulate('blur', {
      target: {
        name: 'coEmail',
        value: '',
      },
    });
    expect(notRequiredWrapper.state('coEmailError')).to.equal('');
  });
  it('emailError state should not be empty for invalid email on change', () => {
    wrapper.find('[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'test',
      },
    });
    expect(wrapper.state('email')).to.not.equal('');
  });
  it('Co registant input state', () => {
    const wrapperNew = shallow(
      <RenderInput
        fieldName="coRegistrantName"
        validation="coRegistrantName"
        label={{}}
        classes={''}
        type="text"
        required
        locator="registry-personalInfoEmail"
        emailError={''}
        updateState={updateState}
        value={''}
        emailInfo={'test'}
        afterValidation={afterValidation}
        isRegistryEmail="true"
        ssTest
        focusShow={() => {
          return true;
        }}
        fromPersonalInfo
      />
    );
    wrapperNew.find('[name="coRegistrantName"]').simulate('blur', {
      target: {
        name: 'coRegistrantName',
        value: 'Annie',
      },
    });
    wrapperNew.find('[name="coRegistrantName"]').simulate('blur', {
      target: {
        name: 'coRegistrantName',
        value: 'Annie5',
      },
    });
    wrapperNew.find('[name="coRegistrantName"]').simulate('blur', {
      target: {
        name: 'coRegistrantName',
        value: 'Annie Leina',
      },
    });
    expect(wrapperNew.state('placeholder')).to.equal('');
  });

  it('change for phone for correct number', () => {
    const tree = shallow(
      <RenderInput
        fieldName="primaryPh"
        validation="primaryPh"
        label={{}}
        classes={''}
        type="text"
        required
        primaryPhError={''}
        updateState={updateState}
        value={''}
      />
    );
    tree.find('[name="primaryPh"]').simulate('change', {
      target: {
        name: 'primaryPh',
        value: '9999999999',
      },
    });
    expect(tree.state('placeholder')).to.equal('');
  });

  it('change for phone for incorrect number', () => {
    const tree = shallow(
      <RenderInput
        fieldName="primaryPh"
        validation="primaryPh"
        label={{}}
        classes={''}
        type="text"
        required
        primaryPhError={''}
        updateState={updateState}
        value={''}
      />
    );
    tree.find('[name="primaryPh"]').simulate('change', {
      target: {
        name: 'primaryPh',
        value: '999',
      },
    });
    expect(tree.state('placeholder')).to.equal('');
  });

  it('change for no of guests for correct number', () => {
    const tree = shallow(
      <RenderInput
        fieldName="guests"
        validation="guestNumber"
        label={{}}
        classes={''}
        type="number"
        required
        primaryPhError={''}
        updateState={updateState}
        value={''}
      />
    );
    tree.find('[name="guests"]').simulate('change', {
      target: {
        name: 'guests',
        value: '10',
      },
    });
    expect(tree.state('placeholder')).to.equal('');
  });

  it('emailError state should not be empty for invalid email match snapshot', () => {
    wrapper.setProps({
      updateState: undefined,
    });
    expect(wrapper).to.not.equal(null);
  });

  it('RenderInput will receive props', () => {
    wrapper.setProps({ fieldName: 'mobilePh', value: '' });
    expect(wrapper).to.not.equal(null);
  });

  it('blur for mobile', () => {
    wrapper.find('[name="mobilePh"]').simulate('blur', {
      target: {
        name: 'mobilePh',
        value: '',
      },
    });
    expect(wrapper.state('placeholder')).to.equal('');

    /* eslint no-unused-expressions: 0 */
    expect(afterValidation).to.have.been.called;
  });

  it('mobilePhError state should not be empty for invalid phone number on blur', () => {
    wrapper.find('[name="mobilePh"]').simulate('blur', {
      target: {
        name: 'mobilePh',
        value: 'test',
      },
    });
    expect(wrapper.state('mobilePhError')).to.not.equal('');
  });

  it('calling onFocus function', () => {
    const ssTest = true;
    const event = {
      target: {
        name: 'street',
      },
    };
    const handleOnFocusSpy = sinon.spy();
    wrapper.instance().handleOnFocus(event, ssTest);

    expect(handleOnFocusSpy.called);
  });

  it('calling disableEventDate function', () => {
    const disableEventSpy = sinon.spy();
    wrapper.instance().disableEventDate();
    wrapper.setProps({
      isMobile: false,
    });
    expect(disableEventSpy.called);
  });

  it('should format the phone number if 10 digits are there and filed is mobile', () => {
    const name = 'mobilePh';
    const value = '1231231231';
    wrapper.setProps({
      updateState: sinon.spy(),
    });
    const formattedValue = wrapper
      .instance()
      .checkAndFormatPhoneNumber(name, value);
    expect(formattedValue).to.equal('(123) 123-1231');
  });

  it('should format the phone number if 10 digits are there and filed is primaryPhone', () => {
    const name = 'primaryPh';
    const value = '1231231231';
    const formattedValue = wrapper
      .instance()
      .checkAndFormatPhoneNumber(name, value);
    expect(formattedValue).to.equal('(123) 123-1231');
  });

  it('should format the phone number if 10 digits are there and filed is shippingPhone', () => {
    const name = 'shippingPhone';
    const value = '1231231231';
    const formattedValue = wrapper
      .instance()
      .checkAndFormatPhoneNumber(name, value);
    expect(formattedValue).to.equal('(123) 123-1231');
  });

  it('should not format the phone number if 10 digits are not there', () => {
    const name = 'mobilePh';
    const value = '123123123';
    const formattedValue = wrapper
      .instance()
      .checkAndFormatPhoneNumber(name, value);
    expect(formattedValue).to.equal('123123123');
  });

  it('should format the phone number if 10 digits are there and filed is shippingPhone', () => {
    const name = 'shippingPhone';
    const value = '1231231231';
    const formattedValue = wrapper
      .instance()
      .checkAndFormatPhoneNumber(name, value);
    expect(formattedValue).to.equal('(123) 123-1231');
  });

  it('should validate for phone fields when new Props are recieved', () => {
    const instance = wrapper.instance();
    const stub = sinon.stub(instance, 'checkForInitialPhoneFields');
    instance.componentWillReceiveProps({ fieldName: 'phone', value: '123' });

    /* eslint no-unused-expressions: 0 */
    expect(stub).to.have.been.called;
    stub.restore();
  });

  it('should return correct object when getComparedValueObject is called appropriately', () => {
    const instance = wrapper.instance();
    const comparatorProp = { mob: '123' };
    expect(
      instance.getComparedValueObject(comparatorProp, 'phone', '234')
    ).to.deep.equal({ mob: '123', phone: '234' });
  });

  it('should return same value itself when getComparedValueObject is called appropriately', () => {
    const instance = wrapper.instance();
    expect(
      instance.getComparedValueObject(undefined, 'phone', '234')
    ).to.deep.equal('234');
  });

  it('should return correct value when setComparedValueObject is called appropriately', () => {
    const instance = wrapper.instance();
    const comparatorProp = { mob: '123' };
    expect(
      instance.setComparedValueObject(comparatorProp, 'phone', {
        phone: '123',
      })
    ).to.equal('123');
  });

  it('should return same value itself when setComparedValueObject is called appropriately', () => {
    const instance = wrapper.instance();
    expect(
      instance.setComparedValueObject(undefined, 'phone', '234')
    ).to.deep.equal('234');
  });

  it('should disable eventDate when coEmail is focused in mobile devices', () => {
    const eventDateElement = document.createElement('input');
    const showerDateElement = document.createElement('input');
    const mountedElement = document.createElement('div');
    eventDateElement.setAttribute('id', 'eventDate');
    showerDateElement.setAttribute('id', 'showerDate');
    mountedElement.appendChild(eventDateElement);
    mountedElement.appendChild(showerDateElement);
    document.body.appendChild(mountedElement);
    const mountedComponent = shallow(
      <RenderInput
        fieldName="coEmail"
        validation="coEmail"
        label={{}}
        classes={''}
        type="text"
        required
        primaryPhError={''}
        updateState={updateState}
        value={''}
        isMobile
      />,
      { attachedTo: mountedElement }
    );
    mountedComponent.find('[name="coEmail"]').simulate('focus', {
      target: {
        name: 'coEmail',
      },
    });

    expect(eventDateElement.getAttribute('disabled')).to.equal(null);
    expect(showerDateElement.getAttribute('disabled')).to.equal(null);
  });
});
