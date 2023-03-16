import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import * as utils from '@bbb-app/utils/common';
import Filters from '../FilterItems';
import SortOptionsView from '../../../../../components/Pages/Registry/SortOptionFilter/RenderSortOptionView/SortOptionView.async';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let v;
  let instance;
  let sortSeq;
  let tree;
  const updateView = sinon.spy();
  const getSortedData = sinon.spy();
  const sortDataByCategory = sinon.spy();
  const getRegistryFirstCategory = sinon.stub();
  const sortDataByDate = sinon.stub();
  const changeFilter = sinon.spy();
  const changeSelectedFilterLabel = sinon.spy();
  const fireTealiumAction = sinon.spy();
  const props = {
    updateView,
    registryId: '123456',
    giftGiver: true,
    getSortedData,
    sortDataByCategory,
    changeFilter,
    getRegistryFirstCategory,
    sortDataByDate,
    changeSelectedFilterLabel,
    fireTealiumAction,
    switchConfig: { enableRegistryCollaboration: true },
  };
  beforeEach(() => {
    tree = shallow(<Filters {...props} />);
    instance = tree.instance();
  });

  it('should call updateView', () => {
    tree.setProps({
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventDate: 'date',
          },
        },
      },
    });
    v = 'Category';
    instance.categoryLabel = 'Category';
    instance.sortBySelection(v);
    expect(getRegistryFirstCategory.called).to.equal(true);
    expect(updateView.called).to.equal(true);
  });

  it('should call firstCategoryCall and updateView with args', () => {
    tree.setProps({
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventDate: 'date',
          },
        },
      },
    });
    v = 'Category';
    instance.categoryLabel = 'Category';
    instance.sortBySelection(v);
    expect(getRegistryFirstCategory.called).to.equal(true);
    expect(updateView.calledWith(v, '1')).to.equal(true);
  });

  it('should call updateView', () => {
    v = 'Price';
    instance.priceLabel = 'Price';
    instance.sortBySelection(v);
    expect(getSortedData.called).to.equal(true);
    expect(updateView.called).to.equal(true);
  });

  it('should call updateView with args v and sortSeq', () => {
    instance.sortBySelection(v);
    expect(updateView.calledWith(v, '2')).to.equal(true);
    expect(getSortedData.calledWith('123456', true, '2')).to.equal(true);
  });

  it('should call sortDataByCategory', () => {
    tree.setProps({ giftGiver: false });
    v = 'Price';
    instance.priceLabel = 'Price';
    sortSeq = '2';
    tree.setProps({ giftGiver: false });
    instance.sortBySelection(v, sortSeq);
    expect(sortDataByCategory.calledWith('Price', '2')).to.equal(true);
  });

  it('should call changeFilter', () => {
    v = 'View All';
    instance.changeFilter(v);
    expect(changeFilter.calledOnce).to.equal(true);
  });

  it('should call updateView for date view', () => {
    tree.setProps({
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            eventDate: 'date',
          },
        },
      },
    });
    v = 'Date';
    instance.dateFilterLabel = 'Date';
    instance.sortBySelection(v);
    expect(getRegistryFirstCategory.called).to.equal(true);
    expect(updateView.called).to.equal(true);
  });

  it('should call sortDataByDate', () => {
    v = 'Date';
    instance.dateFilterLabel = 'Date';
    sortSeq = '3';
    tree.setProps({ giftGiver: false });
    instance.sortBySelection(v, sortSeq);
    expect(sortDataByDate.calledWith('Date', '3')).to.equal(true);
  });

  /* eslint no-unused-expressions: 0 */
  it('should call changeSelectedFilterLabel for all', () => {
    const selectedFilterOption = 'View All';
    const changeSelectedLabel = instance.changeSelectedFilterLabel(
      selectedFilterOption
    );
    expect(changeSelectedLabel).to.deep.equal(selectedFilterOption);
  });

  it('should call changeSelectedFilterLabel for Purchased', () => {
    const selectedFilterOption = 'Purchased';
    instance.purchasedLabel = 'Purchased';
    const changeSelectedLabel = instance.changeSelectedFilterLabel(
      selectedFilterOption
    );
    expect(changeSelectedLabel).to.deep.equal(selectedFilterOption);
  });

  it('should call changeSelectedFilterLabel for Remaining', () => {
    const selectedFilterOption = 'Remaining';
    instance.remainingLabel = 'Remaining';
    const changeSelectedLabel = instance.changeSelectedFilterLabel(
      selectedFilterOption
    );
    expect(changeSelectedLabel).to.deep.equal(selectedFilterOption);
  });

  it('should call changeSelectedFilterLabel for Favorites', () => {
    const selectedFilterOption = 'Favorites';
    instance.favoritesLabel = 'Favorites';
    const changeSelectedLabel = instance.changeSelectedFilterLabel(
      selectedFilterOption
    );
    expect(changeSelectedLabel).to.deep.equal(selectedFilterOption);
  });

  it('should call changeSelectedFilterLabel for Discontinued', () => {
    const selectedFilterOption = 'Discontinued';
    instance.discontinued.label = 'Discontinued';
    const changeSelectedLabel = instance.changeSelectedFilterLabel(
      selectedFilterOption
    );
    expect(changeSelectedLabel).to.deep.equal(selectedFilterOption);
  });

  it('should call handleToggleAllFilters', () => {
    instance.handleToggleAllFilters();
  });

  it('should call setPrevAllFiltersState', () => {
    const arg = { activeFacetId: 'View All' };
    instance.setPrevAllFiltersState(arg);
  });

  it('should call toggleSortOptions', () => {
    instance.toggleSortOptions();
    instance.trackItems();
  });

  it('should call renderSlideOutOverlay', () => {
    tree.setState({ sortingOptionsOpen: false, allFiltersOpen: false });
    instance.renderSlideOutOverlay();

    tree.setProps({ isMobile: true });
    tree.setState({ allFiltersOpen: true, IsChunkLoaded: true });

    expect(toJson(tree)).to.matchSnapshot();
    tree
      .find(SortOptionsView)
      .props()
      .onSelectionUpdate(0);

    tree.setState({ sortingOptionsOpen: true });
    instance.renderSlideOutOverlay();
  });

  it('should call renderAllFacetsOnPage', () => {
    tree.setProps({ discontinuedItemCount: 0 });
    instance.trackItem = true;
    instance.renderAllFacetsOnPage();
  });

  it('should render for BedBathCanada and price sort', () => {
    const isBedBathCanadaStub = sinon
      .stub(utils, 'isBedBathCanada')
      .returns(false);

    const wrapper = shallow(
      <Filters
        {...props}
        tilesView={'2'}
        variation={'priceView'}
        mPulseEnabled
        getHeaderLayout
      />
    );
    expect(wrapper).to.not.equal(null);
    isBedBathCanadaStub.restore();
  });

  it('should render for date sort', () => {
    const labels = {
      registryDetails: {
        sortByLabel: 'Sort',
        categoryLabel: 'Date',
        viewAllLabel: 'View All',
      },
    };
    const registryData = {
      registryResVO: { registrySummaryVO: { eventDate: '' } },
    };
    const wrapper = shallow(
      <Filters
        {...props}
        tilesView={'3'}
        variation={'Date'}
        labels={labels}
        registryData={registryData}
        giftGiver={false}
        registryId={''}
        isMobile
      />
    );

    expect(wrapper).to.not.equal(null);
    wrapper.instance().sortBySelection('Date');

    const arg = { target: { value: 'View All' } };
    wrapper.instance().changeFilter(arg);
  });
});
