import React from 'react';
import sinon from 'sinon';
import { mount, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import {
  RegistryTypeDropdownContainer,
  mapDispatchToProps,
  mapStateToProps,
} from '../RegistryTypeDropdown';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render the "RegistryTypeDropdown" component container', () => {
    const props = {
      onToNewUrl: () => {},
      onComponentMount: () => {},
      router: { location: { pathname: '/test' } },
      viewPortConfig: {},
    };
    const mountWithRouter = node =>
      mount(
        <MemoryRouter
          initialEntries={[{ pathname: '/url/to/lorem/ipsum', key: 'testKey' }]}
          initialIndex={0}
        >
          {node}
        </MemoryRouter>
      );
    const wrapper = mountWithRouter(
      <RegistryTypeDropdownContainer {...props} />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('mapDispatchToProps should return a prop fetchRegistryTypes which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const url = '';
    const props = mapDispatchToProps(dispatch);
    props.onToNewUrl(url);
    expect(dispatch.called).to.equal(true);
  });

  it('should return proper object when mapStateToProps is called', () => {
    const props = {
      viewPortConfig: {},
      router: {},
    };
    const result = mapStateToProps({}, props);
    expect(result).to.be.a('function');
  });
});
