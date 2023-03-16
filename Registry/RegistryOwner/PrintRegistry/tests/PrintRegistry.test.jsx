import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { PrintRegistry, mapDispatchToProps } from '../PrintRegistry';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const getRegistryOwnerFirstCategory = sinon.spy();
  const props = {
    registryOwnerFirstCategoryList: [],
    header: {},
    labels: {},
    barCodeConfig: {},
    PDFConfig: {},
    globalSwitchConfig: {},
    getRegistryOwnerFirstCategory,
  };
  it('should render correctly', () => {
    const tree = shallow(<PrintRegistry {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call mapDispatchToProps', () => {
    const dispatch = sinon.spy();
    const propsdata = mapDispatchToProps(dispatch);
    propsdata.getRegistryOwnerFirstCategory();
    expect(dispatch.called).to.equal(true);
  });
  it('should call mapDispatchToProps #fetchPickUpStore', () => {
    const dispatch = sinon.spy();
    const propsdata = mapDispatchToProps(dispatch);
    propsdata.fetchPickUpStore();
    expect(dispatch.called).to.equal(true);
  });
  it('should call mapDispatchToProps #onComponentMount', () => {
    const dispatch = sinon.spy();
    const propsdata = mapDispatchToProps(dispatch);
    propsdata.onComponentMount();
    expect(dispatch.called).to.equal(true);
  });
});
