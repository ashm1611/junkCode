import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import {
  RegistryFacetFilter,
  mapDispatchToProps,
} from '../RegistryFacetFilter';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <RegistryFacetFilter
        config={{ dynamicPricingFlag: true }}
        productDataLoaded
        onResetFiltersAndSort={sinon.stub()}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  const dispatch = sinon.stub();

  it('should call dispatch "onUpdateSelectedFilters"', () => {
    const props = mapDispatchToProps(dispatch);

    props.onUpdateSelectedFilters({ PRICE: ['25-50', '50-75', '75-100'] });

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch "onClearSelectedFilters', () => {
    const props = mapDispatchToProps(dispatch);

    props.onClearSelectedFilters();

    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch "onResetAllFilters', () => {
    const props = mapDispatchToProps(dispatch);
    props.onResetAllFilters();
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch "onResetFiltersAndSort', () => {
    const props = mapDispatchToProps(dispatch);
    props.onResetFiltersAndSort();
    expect(dispatch).to.have.been.called;
  });
});
