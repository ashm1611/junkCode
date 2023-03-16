import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { RegistryAnalyzer, mapDispatchToProps } from '../RegistryAnalyzer';
import { fetchRegAnalyzerData } from '../actions';
import { shownRegistryMyAnalyzerBtn } from '../../RegistryOwner/actions';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render RegistryAnalyzer correctly', () => {
    const getRegAnalyzerDetails = sinon.spy();
    const disableMyAnalyzerBtn = sinon.spy();
    const clearSearchTerm = sinon.spy();
    const wrapper = shallow(
      <RegistryAnalyzer
        getRegAnalyzerDetails={getRegAnalyzerDetails}
        disableMyAnalyzerBtn={disableMyAnalyzerBtn}
        clearSearchTerm={clearSearchTerm}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render RegistryAnalyzer correctly if `regAnalyzerSwitchConfig` is true as string', () => {
    const getRegAnalyzerDetails = sinon.spy();
    const disableMyAnalyzerBtn = sinon.spy();
    const wrapper = shallow(
      <RegistryAnalyzer
        regAnalyzerSwitchConfig="true"
        getRegAnalyzerDetails={getRegAnalyzerDetails}
        disableMyAnalyzerBtn={disableMyAnalyzerBtn}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render RegistryAnalyzer null if `regAnalyzerSwitchConfig` is false', () => {
    const disableMyAnalyzerBtn = sinon.spy();
    const getRegAnalyzerDetails = sinon.spy();
    const wrapper = shallow(
      <RegistryAnalyzer
        regAnalyzerSwitchConfig="false"
        getRegAnalyzerDetails={getRegAnalyzerDetails}
        disableMyAnalyzerBtn={disableMyAnalyzerBtn}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render RegistryAnalyzer null if `regAnalyzerSwitchConfig` is false as boolean', () => {
    const disableMyAnalyzerBtn = sinon.spy();
    const getRegAnalyzerDetails = sinon.spy();
    const wrapper = shallow(
      <RegistryAnalyzer
        regAnalyzerSwitchConfig={false}
        getRegAnalyzerDetails={getRegAnalyzerDetails}
        disableMyAnalyzerBtn={disableMyAnalyzerBtn}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should trigger componentWillUnmount', () => {
    const disableMyAnalyzerBtn = sinon.spy();
    const componentWillUnmount = sinon.spy(
      RegistryAnalyzer.prototype,
      'componentWillUnmount'
    );
    const comp = mount(
      <RegistryAnalyzer disableMyAnalyzerBtn={disableMyAnalyzerBtn} />
    );
    comp.unmount();
    // eslint-disable-next-line no-unused-expressions
    expect(componentWillUnmount.called).to.be.true;
  });

  it('should return a function `getRegAnalyzerDetails` prop which dispatch the `fetchRegAnalyzerData` Action', () => {
    const regId = '1234';
    const regType = 'BRD';
    const numberOfGuests = 13;
    const registryDetails = {
      registryVO: {
        registryId: '1234',
        registryType: {
          registryTypeName: 'BRD',
        },
        event: {
          guestCount: 13,
        },
      },
    };
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getRegAnalyzerDetails(registryDetails);
    expect(dispatch).to.have.been.calledWith(
      fetchRegAnalyzerData(regId, regType, numberOfGuests)
    );
  });

  it('should return a function `disableMyAnalyzerBtn` prop which dispatch the `shownRegistryMyAnalyzerBtn` Action', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.disableMyAnalyzerBtn();
    expect(dispatch).to.have.been.calledWith(shownRegistryMyAnalyzerBtn(false));
  });

  it('mapDispatchToProps should return a prop handleTealiumAction which when called call the dispatch the function passed', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);
    props.handleTealiumAction();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop setFromAnalyzerTealium which when called call the dispatch the function passed', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);
    props.setFromAnalyzerTealium();
    expect(dispatch.called).to.equal(true);
  });
});
