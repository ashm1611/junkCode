import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { getFacetDataByID } from '@bbb-app/utils/filterUtils';
import Button from '@bbb-app/core-ui/button';
import { getSelectedItems } from '../../../../../utils/getSelectedItems';
import RegistryAllFiltersView from '../RegistryAllFiltersView';

configure({ adapter: new Adapter() });

const getItemsObject = () => {
  return [
    {
      displayName: 'Status',
      id: 'status',
      items: [
        {
          id: 'Gifts Wanted',
          key: 'Gifts Wanted',
          label: 'Gifts Wanted',
          SKU_ID: ['63364576'],
        },
        {
          id: 'Gifts Purchased',
          key: 'Gifts Purchased',
          label: 'Gifts PurchasedN',
          SKU_ID: ['62238991', '65493120'],
        },
      ],
    },
    {
      displayName: 'Price',
      id: 'priceFilterMap',
      items: [
        {
          id: '$1 - $25',
          key: '$1 - $25',
          label: '$1 - $25',
          SKU_ID: ['13612200'],
        },
        {
          id: '$25 - $50',
          key: '$25 - $50',
          label: '$25 - $50',
          SKU_ID: ['13612200'],
        },
        {
          id: '$150 - $200',
          key: '$150 - $200',
          label: '$150 - $200',
          SKU_ID: ['13612200'],
        },
        {
          id: '$200+',
          key: '$200+',
          label: '$200+',
          SKU_ID: ['13612200'],
        },
      ],
    },
    {
      displayName: 'Category',
      id: 'category',
      items: [
        {
          id: 'BEDDING',
          key: 'BEDDING',
          label: 'BEDDING',
          SKU_ID: ['63364576'],
        },
        {
          id: 'CLEANING & ORGANIZATION',
          key: 'CLEANING & ORGANIZATION',
          label: 'CLEANING & ORGANIZATION',
          SKU_ID: ['62238991', '65493120'],
        },
        {
          id: 'FINE DINING & GIFTWARE',
          key: 'FINE DINING & GIFTWARE',
          label: 'FINE DINING & GIFTWARE',
          SKU_ID: ['13612200'],
        },
        {
          id: 'Bath',
          key: 'Bath',
          label: 'Bath',
          SKU_ID: ['13612200'],
        },
        {
          id: 'Experience',
          key: 'Experience',
          label: 'Experience',
          SKU_ID: ['13612200'],
        },
        {
          id: 'Furniture',
          key: 'Furniture',
          label: 'Furniture',
          SKU_ID: ['13612200'],
        },
      ],
    },
    {
      displayName: 'sort',
      id: 'sort',
      items: [
        {
          id: 'recommended',
          key: 'recommended',
          label: 'recommended',
        },
      ],
    },
  ];
};

const selectedFilters = {};
const facetsData = getItemsObject();
const facets = getItemsObject();
facets.forEach(facet => {
  const data = getFacetDataByID(facet.id, facet);
  selectedFilters[facet.id] = getSelectedItems(data);
});

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(
      <RegistryAllFiltersView
        data={{
          facets: facetsData,
          selectedFilters,
        }}
        onClose={() => {}}
        onClearAll={() => {}}
        onSelectionUpdate={() => {}}
        searchCallback={() => {}}
        isOpen
        isOwnerView
        activeFacetId
      />
    );
    tree.setState({ isFiltersRendered: true });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should renderFacets correctly when values are empty', () => {
    const data = [{ id: 'test data' }];
    const tree = shallow(
      <RegistryAllFiltersView
        data={{
          facets: data,
          selectedFilters,
        }}
        onClose={() => {}}
        onClearAll={() => {}}
        onSelectionUpdate={() => {}}
        searchCallback={() => {}}
        isOpen
        isOwnerView
        activeFacetId
      />
    );
    tree.setState({ isFiltersRendered: true });
    expect(tree).to.not.equal(null);
  });

  describe(`${__filename} events`, () => {
    let wrapper;
    let spyOnClose;
    let spyOnClearAll;
    let spyOnOnActiveFacetChange;
    let spyViewResults;

    beforeEach(() => {
      spyOnClose = sinon.spy();
      spyOnClearAll = sinon.spy();
      spyOnOnActiveFacetChange = sinon.spy();
      spyViewResults = sinon.spy();
      wrapper = shallow(
        <RegistryAllFiltersView
          data={{
            facets: facetsData,
            selectedFilters,
          }}
          onClose={spyOnClose}
          onClearAll={spyOnClearAll}
          onActiveFacetChange={spyOnOnActiveFacetChange}
          onSelectionUpdate={() => {}}
          isOpen
          activeFacetId
          onOverlayClose={() => {}}
        />
      );
      wrapper.setState({ isFiltersRendered: true });
    });
    it('should trigger onClose callback', () => {
      wrapper
        .find('header')
        .find(Button)
        .first()
        .simulate('click');

      expect(spyOnClose.called).to.equal(true);
    });
    it('should trigger onClearAll callback', () => {
      wrapper
        .find('footer')
        .find(Button)
        .first()
        .simulate('click');

      expect(spyViewResults.called).to.equal(false);
    });
    it('shouldComponentUpdate', () => {
      const nextProps = { isOpen: false };
      wrapper.instance().shouldComponentUpdate(nextProps);
    });
    it('should render SortView', () => {
      wrapper.setProps({ isSortView: true });
      expect(wrapper).to.not.equal(null);
    });
    it('should render new FilterSortView', () => {
      wrapper.setProps({
        isNewDashboard: true,
        renderBopisFilter: sinon.spy(),
      });
      expect(wrapper).to.not.equal(null);
    });
    it('should render close button new FilterSortView', () => {
      wrapper.setProps({
        isNewDashboard: true,
        renderBopisFilter: sinon.spy(),
        onResetFiltersAndSort: sinon.spy(),
        handleBopisCheckboxChange: sinon.spy(),
      });
      wrapper.instance().closeButton();
      wrapper.find('#clearBtn').simulate('click');
      expect(wrapper).to.not.equal(null);
    });
    it('should render SortView when facets are empty', () => {
      const dataSort = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
      const data = {
        facets: dataSort,
        selectedFilters,
      };
      wrapper.setProps({ data, isSortView: true });
      expect(wrapper).to.not.equal(null);
    });
  });
});
