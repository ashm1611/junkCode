import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NetworkInfo from '../NetworkInfo';

configure({ adapter: new Adapter() });

describe(`${__filename}`, () => {
  const labels = { checkText: 'test label', check2Text: 'test2 label' };
  const registryInputFields = { networkAffiliation: { displayOnForm: true } };
  const registryConfig = { enableEmailOptIn: false };
  const dataLocator = {
    registryUnsubscribeCheckBox: 'datalocator-unsubscribecheckbox',
    registryAdditionalThirdPartyCheckBox: 'datalocator-thirdpartycheckbox',
  };
  const onSelectSubscribe = sinon.stub();
  const onSelectThirdPartyOption = sinon.stub();

  const wrapper = shallow(
    <NetworkInfo
      labels={labels}
      registryInputFields={registryInputFields}
      subscribeSelected={false}
      thirdPartySelected={false}
      onSelectSubscribe={onSelectSubscribe}
      onSelectThirdPartyOption={onSelectThirdPartyOption}
      registryConfig={registryConfig}
      dataLocator={dataLocator}
    />
  );
  it('networkAffiliation should be rendered correctly with all the props', () => {
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('EnableEmailOptIn checkbox should be rendered correctly with all the props', () => {
    wrapper.setProps({
      registryConfig: { enableEmailOptIn: true },
      registryInputFields: {},
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
