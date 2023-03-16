import React from 'react';
import { OrderedSet } from 'immutable';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';

import toJson from 'enzyme-to-json';

import AppliedFiltersComponent from '../AppliedFilters';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const appliedFiltersOrderedSet = OrderedSet([
      { label: 'blue' },
      { label: 'green' },
      { label: 'red' },
    ]);
    const swsSet = OrderedSet(['test']);
    const tree = shallow(
      <AppliedFiltersComponent
        clearSelectedFilters={() => null}
        appliedFilters={() => null}
        appliedFiltersOrderedSet={appliedFiltersOrderedSet}
        updateSelectedFilters={() => null}
        swsFilters={swsSet}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when appliedFiltersArray empty', () => {
    const appliedFiltersOrderedSet = OrderedSet([]);
    const swsSet = OrderedSet(['test']);
    const tree = shallow(
      <AppliedFiltersComponent
        clearSelectedFilters={() => null}
        appliedFilters={() => null}
        appliedFiltersOrderedSet={appliedFiltersOrderedSet}
        updateSelectedFilters={() => null}
        swsFilters={swsSet}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('clearAllFilters', () => {
    const onClick = sinon.stub();
    const clearTealium = sinon.stub();
    const appliedFiltersOrderedSet = OrderedSet([
      { label: 'glue' },
      { label: 'blue' },
      { label: 'red' },
    ]);
    const swsSet = ['test'];
    const tree = shallow(
      <AppliedFiltersComponent
        clearSelectedFilters={onClick}
        appliedFilters={() => null}
        appliedFiltersOrderedSet={appliedFiltersOrderedSet}
        updateSelectedFilters={() => {}}
        swsFilters={swsSet}
        setTealiumClearFilterCall={clearTealium}
        setBestProdBanner={() => {}}
      />
    );
    tree
      .find('._test_AppliedFiltersComponent_btn_clearAll')
      .first()
      .simulate('click');
    /* eslint no-unused-expressions: 0 */
    expect(onClick).to.have.been.called;
  });

  it('should call handleButtonFocus & handleButtonBlur', () => {
    const onClick = sinon.stub();
    // const onFocus = sinon.stub();
    const clearTealium = sinon.stub();
    const appliedFiltersOrderedSet = OrderedSet([
      { label: 'blue' },
      { label: 'green' },
      { label: 'red' },
    ]);
    const swsSet = ['test'];
    const tree = shallow(
      <AppliedFiltersComponent
        clearSelectedFilters={onClick}
        appliedFilters={() => null}
        appliedFiltersOrderedSet={appliedFiltersOrderedSet}
        updateSelectedFilters={() => {}}
        swsFilters={swsSet}
        setTealiumClearFilterCall={clearTealium}
      />
    );
    const add = sinon.stub();
    const remove = sinon.stub();
    const event = {
      target: {
        parentNode: {
          parentNode: {
            classList: {
              add,
              remove,
            },
          },
        },
      },
    };

    tree
      .find('._test_AppliedFiltersComponent_btn_appliedFilters')
      .first()
      .simulate('focus', event);

    tree
      .find('._test_AppliedFiltersComponent_btn_appliedFilters')
      .first()
      .simulate('blur', event);
    /* eslint no-unused-expressions: 0 */
    expect(add).to.have.been.called;
    expect(remove).to.have.been.called;
  });

  it('appliedFilters', () => {
    const update = sinon.stub();
    const clearTealium = sinon.stub();
    const appliedFiltersOrderedSet = OrderedSet([
      { label: 'blue', id: 'sort' },
      { label: 'green' },
      { label: 'red' },
    ]);
    const swsSet = OrderedSet(['test']);
    const tree = shallow(
      <AppliedFiltersComponent
        clearSelectedFilters={() => null}
        appliedFiltersOrderedSet={appliedFiltersOrderedSet}
        updateSelectedFilters={update}
        swsFilters={swsSet}
        setTealiumClearFilterCall={clearTealium}
        isNewDashboard
      />
    );
    tree
      .find('._test_AppliedFiltersComponent_btn_appliedFilters')
      .first()
      .simulate('click');
    /* eslint no-unused-expressions: 0 */
    expect(update).to.have.been.called;
  });

  it('applieDimentionaldFilters', () => {
    const update = sinon.stub();
    const clearTealium = sinon.stub();
    const appliedFiltersOrderedSet = OrderedSet([
      {
        label: '3-5',
        count: 0,
        id: 'ASSEMBLEDPRODUCTDIAMETERIN',
        key: '3-5',
        selected: true,
        singleSelection: false,
        value: '3-5',
      },
    ]);
    const swsSet = OrderedSet(['test']);
    const tree = shallow(
      <AppliedFiltersComponent
        clearSelectedFilters={() => null}
        appliedFiltersOrderedSet={appliedFiltersOrderedSet}
        updateSelectedFilters={update}
        swsFilters={swsSet}
        setTealiumClearFilterCall={clearTealium}
      />
    );
    tree
      .find('._test_AppliedFiltersComponent_btn_appliedFilters')
      .first()
      .simulate('click');
    /* eslint no-unused-expressions: 0 */
    expect(update).to.have.been.called;
  });
});
