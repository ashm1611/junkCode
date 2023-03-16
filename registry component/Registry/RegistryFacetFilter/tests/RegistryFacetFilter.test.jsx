import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import * as obj from '@bbb-app/utils/common';
import SlideOutOverlay from '@bbb-app/registry/components/SlideOutOverlay.async';
import RegistyFacetFilter from '../RegistryFacetFilter';
import mockData from './registryfacet.json';
import { setObjectInMemory } from '../../utils/objectInMemory';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const spyOnUpdateSelectedFilters = sinon.spy();
  const fireTealiumAction = sinon.spy();
  const filters = (
    <RegistyFacetFilter
      fireTealiumAction={fireTealiumAction}
      facetsData={mockData}
      selectedFilters={''}
      onInitStoreDetails={() => {}}
      getAkamaiStoreDetails={() => {}}
      setStoreDetails={() => {}}
      fetchFavoriteStore={() => {}}
      updateSelectedFilters={spyOnUpdateSelectedFilters}
      isBopisFeatureEnable
      isOwnerView
      isMobile
      isSortFilterSelected
      reInitializeMarks={() => {}}
    />
  );
  it('should render correctly', () => {
    const isBrowserStub = sinon.stub(obj, 'isBrowser').returns(false);
    const tree = shallow(filters);
    isBrowserStub.restore();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when allFiltersOpen set true', () => {
    const tree = shallow(filters);
    tree.setState({ allFiltersOpen: true });
    tree.setProps({ isMobile: false });
    expect(tree.find(SlideOutOverlay).prop('show')).to.equal(true);
  });

  it('should render correctly for new filter & sort', () => {
    const tree = shallow(filters);
    tree.setState({ allFiltersOpen: true });
    tree.setProps({ isMobile: false, enableNewRegDashboard: true });
    expect(tree.find(SlideOutOverlay).prop('show')).to.equal(true);
  });

  it('should render correctly when allFiltersOpen set as false', () => {
    const tree = shallow(filters);
    tree.setState({ allFiltersOpen: false, isSortFilterSelected: true });
    expect(tree.find(SlideOutOverlay).prop('show')).to.equal(true);
  });

  it('should render with componentWillReceieve props', () => {
    const selected = '_recommended_Gifts Wanted';
    const nextProps = {
      selectedFilters: { status: ['Gifts Wanted'], sort: ['recommended'] },
      facetsData: '',
    };
    const replaceHistoryStub = sinon.stub(window.history, 'replaceState');
    const tree = shallow(filters);
    replaceHistoryStub.restore();
    tree.instance().componentWillReceiveProps(nextProps);
    expect(tree.instance().queryParam.selectedRLVFilters).to.equal(selected);
  });

  it('should call onFilterSelectionUpdate', () => {
    const facetId = 'id';
    const selections = [];
    const index = '0';
    const singleSelection = {};
    const selected = true;
    const tree = shallow(filters);
    const spy = sinon.spy(tree.instance(), 'onActiveFacetChange');
    tree
      .instance()
      .onFilterSelectionUpdate(
        facetId,
        selections,
        index,
        singleSelection,
        selected
      );
    expect(spy.called).to.equal(true);
  });

  it('should call onFilterSelectionUpdate when facetId is sort and selected as true', () => {
    const facetId = 'sort';
    const selections = [];
    const index = '0';
    const singleSelection = {};
    const selected = true;
    const tree = shallow(filters);
    const spy = sinon.spy(tree.instance(), 'onActiveFacetChange');
    tree
      .instance()
      .onFilterSelectionUpdate(
        facetId,
        selections,
        index,
        singleSelection,
        selected
      );
    expect(spy.called).to.equal(true);
  });

  it('should call onFilterSelectionUpdate when facetId is sort and selected as false', () => {
    const facetId = 'sort';
    const selections = [];
    const index = '0';
    const singleSelection = {};
    const selected = false;
    const tree = shallow(filters);
    tree.setProps({ reInitializeMarks: false });
    const spy = sinon.spy(tree.instance(), 'onActiveFacetChange');
    tree
      .instance()
      .onFilterSelectionUpdate(
        facetId,
        selections,
        index,
        singleSelection,
        selected
      );
    expect(spy.called).to.equal(false);
  });

  it('should call updateFilters with status not empty', () => {
    const value = { id: 'status', label: 'status' };
    const tree = shallow(filters);
    const props = {
      selectedFilters: {
        status: ['Gifts Wanted'],
        sort: ['recommended', 1234],
      },
      onClearSelectedFilters: sinon.stub(),
    };

    tree.setProps(props);
    tree.instance().updateFilters(value);
    expect(tree.props('onClearSelectedFilters').called);
  });
  it('should call updateFilters with status empty', () => {
    const value = { id: 'status', label: 'status' };
    const tree = shallow(filters);
    const props = {
      selectedFilters: {
        status: [],
        sort: ['recommended', 1234],
      },
      onClearSelectedFilters: sinon.stub(),
    };

    tree.setProps(props);
    tree.instance().updateFilters(value);
    expect(tree.props('onClearSelectedFilters').called);
  });
  it('should render onOverlayClose', () => {
    const tree = shallow(filters);
    const props = {
      selectedFilters: {
        status: [],
        sort: ['recommended', 1234],
      },
      selectedCheckboxFilter: undefined,
      appliedFilters: {
        selectedFilters: {
          status: [],
          sort: ['hightolow', 1234],
        },
        selectedCheckboxFilter: 'in-store-online',
      },
      onClearSelectedFilters: sinon.stub(),
      handleBopisCheckboxChange: sinon.stub(),
    };

    tree.setProps(props);
    tree.instance().onOverlayClose();
    expect(tree.props('onClearSelectedFilters').called);
  });
  it('should call callAndOpenFilter ', () => {
    const tree = shallow(filters);
    const spy = sinon.spy(tree.instance(), 'handleToggleAllFilters');
    tree.instance().callAndOpenFilter();
    expect(spy.called);
  });

  it('should call trackItems', () => {
    const tree = shallow(filters);
    tree.instance().trackItems();
    expect(tree.instance().trackItem).to.equal(true);
  });

  it('should call onAccordionChange', () => {
    const id = 'foo';
    const tree = shallow(filters);
    const spy = sinon.spy(tree.instance(), 'onActiveFacetChange');
    tree.instance().onAccordionChange(id);
    expect(spy.called).to.equal(true);
  });

  it('should call onActiveFacetChange ', () => {
    const facetId = 'id';
    const selections = ['deptid1'];
    const index = '0';
    const singleSelection = { dep_id: 'depid2' };
    const selected = true;
    const spy = sinon.spy();
    const tree = shallow(filters);
    tree.setProps({
      match: { path: '/' },
      updateSelectedFilters: spy,
      getHeaderLayout: true,
      mPulseEnabled: true,
      variation: 'Date',
    });
    tree
      .instance()
      .onFilterSelectionUpdate(
        facetId,
        selections,
        index,
        singleSelection,
        selected
      );
    expect(tree.instance().state.activeFacetId).to.equal(facetId);
  });

  it('should call componentWillUnmount', () => {
    const tree = shallow(filters);
    tree.instance().componentWillUnmount();
    expect(setObjectInMemory.called);
  });

  it('should call getFiltersFromURL with facetsData', () => {
    const selected = { sort: ['Gifts Wanted'] };
    const updateSelectedFiltersSpy = sinon.spy();
    const facetsData = [
      {
        items: [
          {
            id: 'sort',
            key: 'Gifts Wanted',
          },
          {
            key: 'Gifts PurchasedN',
          },
        ],
      },
    ];
    const tree = shallow(filters);
    tree.instance().queryParam = {
      selectedRLVFilters: '_Gifts Wanted_',
    };
    tree.setProps({ facetsData });
    tree.instance().getFiltersFromURL();
    expect(updateSelectedFiltersSpy.calledWith(selected));
  });

  it('should call getFiltersFromURL with facetsData1', () => {
    const selected = { price: ['Gifts Wanted'] };

    const updateSelectedFiltersSpy = sinon.spy();
    const facetsData1 = [
      {
        items: [
          {
            id: 'price',
            key: 'Gifts Wanted',
            label: 'Gifts Wanted',
          },
          {
            key: 'Gifts PurchasedN',
          },
        ],
      },
    ];
    const tree = shallow(filters);
    tree.instance().queryParam = {
      selectedRLVFilters: '_Gifts Wanted_',
    };
    tree.setProps({ facetsData: facetsData1 });
    tree.instance().getFiltersFromURL();
    expect(updateSelectedFiltersSpy.calledWith(selected));
  });

  it('should call getFiltersFromURL with empty facetsData', () => {
    const selected = undefined;
    const updateSelectedFiltersSpy = sinon.spy();
    const facetsData = [];
    const tree = shallow(filters);
    tree.instance().queryParam = {
      selectedRLVFilters: '_Gifts Wanted_',
    };
    tree.setProps({ facetsData });
    tree.instance().getFiltersFromURL();
    expect(updateSelectedFiltersSpy.calledWith(selected));
  });
  it('should render correctly when enableNewRegDashboard set true', () => {
    const filter = (
      <RegistyFacetFilter
        fireTealiumAction={fireTealiumAction}
        facetsData={mockData}
        selectedFilters={''}
        onInitStoreDetails={() => {}}
        getAkamaiStoreDetails={() => {}}
        setStoreDetails={() => {}}
        fetchFavoriteStore={() => {}}
        updateSelectedFilters={spyOnUpdateSelectedFilters}
        isBopisFeatureEnable
        isOwnerView
        isMobile
        isSortFilterSelected
        enableNewRegDashboard
        reInitializeMarks={() => {}}
      />
    );
    const tree = shallow(filter);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
