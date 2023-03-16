import { shallow } from 'enzyme';

import {
  returnFilteredItemsCount,
  bopisFilterItemCount,
  renderFacetsSortedView,
} from '../GuestViewerLayoutUtill';

describe(__filename, () => {
  it('should return count for returnFilteredItemsCount for purchased filter', () => {
    const items = [
      {
        purchased: true,
        deletedItem: false,
        qtyPurchased: 1,
      },
      {
        purchased: true,
        deletedItem: false,
        qtyPurchased: 3,
      },
    ];

    const filter = 'Purchased';
    const count = returnFilteredItemsCount(items, filter);
    expect(count).to.equal(4);
  });
  it('should return count for returnFilteredItemsCount for Favourites filter', () => {
    const items = [
      {
        markedAsFav: true,
        deletedItem: false,
        qtyRequested: 2,
      },
      {
        markedAsFav: true,
        deletedItem: false,
        qtyRequested: 3,
      },
    ];

    const filter = 'Favourites';
    const count = returnFilteredItemsCount(items, filter);
    expect(count).to.equal(5);
  });
  it('should return count for returnFilteredItemsCount for Favorites filter', () => {
    const items = [
      {
        markedAsFav: true,
        deletedItem: false,
        qtyRequested: 2,
      },
      {
        markedAsFav: true,
        deletedItem: false,
        qtyRequested: 0,
      },
    ];

    const filter = 'Favorites';
    const count = returnFilteredItemsCount(items, filter);
    expect(count).to.equal(2);
  });
  it('should return count for returnFilteredItemsCount for Remaining filter', () => {
    const items = [
      {
        purchased: false,
        deletedItem: false,
        qtyRequested: 2,
        qtyPurchased: 1,
      },
      {
        purchased: false,
        deletedItem: false,
        qtyRequested: 3,
        qtyPurchased: 1,
      },
    ];

    const filter = 'Remaining';
    const count = returnFilteredItemsCount(items, filter);
    expect(count).to.equal(3);
  });
  it('should return count for returnFilteredItemsCount for Discontinued filter without purchased', () => {
    const items = [
      {
        purchased: false,
        deletedItem: false,
        qtyRequested: 2,
        qtyPurchased: 1,
        displayNotifyRegistrantMsg: 'N',
      },
      {
        purchased: false,
        deletedItem: false,
        qtyRequested: 3,
        qtyPurchased: 1,
        displayNotifyRegistrantMsg: 'N',
      },
    ];

    const filter = 'Discontinued';
    const count = returnFilteredItemsCount(items, filter);
    expect(count).to.equal(3);
  });
  it('should return count for returnFilteredItemsCount for default', () => {
    const items = [
      {
        purchased: true,
        deletedItem: false,
        qtyRequested: 2,
        qtyPurchased: 1,
        displayNotifyRegistrantMsg: 'N',
      },
      {
        purchased: true,
        deletedItem: false,
        qtyRequested: 3,
        qtyPurchased: 1,
        displayNotifyRegistrantMsg: 'N',
      },
    ];

    const filter = 'default';
    const count = returnFilteredItemsCount(items, filter);
    expect(count).to.equal(2);
  });
  it('should return count for returnFilteredItemsCount for no value', () => {
    const items = [
      {
        purchased: false,
        deletedItem: true,
        qtyRequested: 2,
        qtyPurchased: 0,
        displayNotifyRegistrantMsg: 'N',
      },
      {
        purchased: false,
        deletedItem: true,
        qtyRequested: 3,
        qtyPurchased: 0,
        displayNotifyRegistrantMsg: 'N',
      },
    ];

    const filter = 'default';
    const count = returnFilteredItemsCount(items, filter, 'store-pickup');
    expect(count).to.equal(0);
  });
  it('should return count for returnFilteredItemsCount for default with purchased ', () => {
    const items = [
      {
        purchased: true,
        deletedItem: false,
        qtyRequested: 2,
        qtyPurchased: 1,
        displayNotifyRegistrantMsg: 'N',
      },
      {
        purchased: true,
        deletedItem: false,
        qtyRequested: 3,
        qtyPurchased: 1,
        displayNotifyRegistrantMsg: 'N',
      },
    ];

    const filter = 'default';
    const count = returnFilteredItemsCount(items, filter);
    expect(count).to.equal(2);
  });
  it('should return count for bopisFilterItemCount return all item', () => {
    const itemsArray = [
      {
        items: [
          {
            purchased: true,
            deletedItem: false,
            qtyPurchased: 1,
          },
          {
            purchased: true,
            deletedItem: false,
            qtyPurchased: 3,
          },
        ],
      },
    ];
    const count = bopisFilterItemCount(itemsArray, '', undefined);
    expect(count).to.equal(2);
  });
  it('should return count for bopisFilterItemCount return only store pickup item', () => {
    const itemsArray = [
      {
        items: [
          {
            purchased: true,
            deletedItem: false,
            qtyPurchased: 1,
            qtyRequested: 2,
            skuInStore: '1',
          },
          {
            purchased: true,
            deletedItem: true,
            qtyPurchased: 3,
            skuInStore: '1',
          },
          {
            purchased: true,
            deletedItem: false,
            qtyPurchased: 3,
            skuInStore: '-1',
          },
        ],
      },
    ];
    const count = bopisFilterItemCount(itemsArray, 'store-pickup');
    expect(count).to.equal(2);
  });
  it('should return count for bopisFilterItemCount return only registryItemList item', () => {
    const itemsArray = [
      {
        registryItemList: [
          {
            purchased: true,
            deletedItem: false,
            qtyPurchased: 1,
            qtyRequested: 1,
            skuInStore: '1',
          },
          {
            purchased: true,
            deletedItem: false,
            qtyPurchased: 3,
            qtyRequested: 1,
            skuInStore: '1',
          },
          {
            purchased: true,
            deletedItem: false,
            qtyPurchased: 3,
            skuInStore: '-1',
          },
        ],
      },
    ];
    const count = bopisFilterItemCount(itemsArray, 'store-pickup');
    expect(count).to.equal(2);
  });

  it('should render renderFacetsSortedView 1', () => {
    const props = {
      isOosFetching: true,
      sortedPriceData: {
        inStockCategoryBuckets: [{ items: null, categoryName: 'abc' }],
      },
      labels: {
        giftGiver: 'giftGiver',
      },
      filteredItemsCount: 1,
      dateSortedOosListItemsCount: 1,
      tilesView: '3',
      dateSortedOosCategoryList: { atgResponse: [] },
      filteredSortedOosCategoryItems: [{ sku: 12 }, { sku: 123 }, { sku: 124 }],
      filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
      selectedCheckboxFilter: 'in-stock-online',
    };
    const getNumberofRegistryItem = 1;
    const dateSortedListItemsCount = 1;
    const displayDiscountedPrice = 20;

    const wrapper = shallow(
      renderFacetsSortedView(
        props,
        dateSortedListItemsCount,
        getNumberofRegistryItem,
        displayDiscountedPrice
      )
    );
    expect(wrapper.find('ErrorBoundary')).to.have.lengthOf('0');
  });
  it('should render renderFacetsSortedView 1 else', () => {
    const props = {
      sortedPriceData: {
        inStockCategoryBuckets: [{ items: null, categoryName: 'abc' }],
      },
      labels: {
        giftGiver: 'giftGiver',
      },
      filteredItemsCount: 1,
      dateSortedOosListItemsCount: 1,
      tilesView: '3',
      dateSortedOosCategoryList: { atgResponse: [] },
      filteredSortedOosCategoryItems: [{ sku: 12 }, { sku: 123 }, { sku: 124 }],
      filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
      selectedCheckboxFilter: 'abc',
      isRegistryContentSlotReq: true,
    };
    const getNumberofRegistryItem = 1;
    const dateSortedListItemsCount = 0;
    const displayDiscountedPrice = 20;

    const wrapper = shallow(
      renderFacetsSortedView(
        props,
        dateSortedListItemsCount,
        getNumberofRegistryItem,
        displayDiscountedPrice
      )
    );
    expect(wrapper.find('ErrorBoundary')).to.have.lengthOf('0');
  });
  it('should render renderFacetsSortedView 2', () => {
    const props = {
      sortedPriceData: {
        inStockCategoryBuckets: [{ items: null, categoryName: 'abc' }],
      },
      labels: {
        giftGiver: 'giftGiver',
      },
      filteredItemsCount: 1,
      dateSortedOosListItemsCount: 1,
      tilesView: '3',
      dateSortedOosCategoryList: { atgResponse: [] },
      filteredSortedOosCategoryItems: [{ sku: 12 }, { sku: 123 }, { sku: 124 }],
      filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
      selectedCheckboxFilter: 'store-pickup',
    };
    const getNumberofRegistryItem = 1;
    const dateSortedListItemsCount = 1;
    const displayDiscountedPrice = 20;

    const wrapper = shallow(
      renderFacetsSortedView(
        props,
        dateSortedListItemsCount,
        getNumberofRegistryItem,
        displayDiscountedPrice
      )
    );
    expect(wrapper.find('ErrorBoundary')).to.have.lengthOf('0');
  });
  it('should render renderFacetsSortedView 3', () => {
    const props = {
      sortedPriceData: {
        inStockCategoryBuckets: [{ items: null, categoryName: 'abc' }],
      },
      labels: {
        giftGiver: 'giftGiver',
      },
      filteredItemsCount: 1,
      dateSortedOosListItemsCount: 1,
      tilesView: '3',
      dateSortedOosCategoryList: { atgResponse: [] },
      filteredSortedOosCategoryItems: [
        { sku: 12, skuInStore: 1 },
        { sku: 123, skuInStore: 1 },
        { sku: 124, skuInStore: 1 },
      ],
      filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
      selectedCheckboxFilter: '',
      isFetchingOthers: true,
    };
    const getNumberofRegistryItem = 1;
    const dateSortedListItemsCount = 0;
    const displayDiscountedPrice = 0;

    const wrapper = shallow(
      renderFacetsSortedView(
        props,
        dateSortedListItemsCount,
        getNumberofRegistryItem,
        displayDiscountedPrice
      )
    );
    expect(wrapper.find('ErrorBoundary')).to.have.lengthOf('0');
  });

  it('should render renderFacetsSortedView 4', () => {
    const props = {
      sortedPriceData: {
        inStockCategoryBuckets: [{ items: null, categoryName: 'abc' }],
      },
      labels: {
        giftGiver: 'giftGiver',
      },
      filteredItemsCount: 1,
      dateSortedOosListItemsCount: 1,
      tilesView: '3',
      dateSortedOosCategoryList: { atgResponse: [] },
      filteredSortedOosCategoryItems: [],
      filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
      selectedCheckboxFilter: 'store-pickup',
      isFetchingOthers: true,
    };
    const getNumberofRegistryItem = 1;
    const dateSortedListItemsCount = 0;
    const displayDiscountedPrice = 0;

    const wrapper = shallow(
      renderFacetsSortedView(
        props,
        dateSortedListItemsCount,
        getNumberofRegistryItem,
        displayDiscountedPrice
      )
    );
    expect(wrapper.find('ErrorBoundary')).to.have.lengthOf('0');
  });

  it('should render renderFacetsSortedView 5', () => {
    const props = {
      sortedPriceData: {
        inStockCategoryBuckets: [{ items: null, categoryName: 'abc' }],
      },
      labels: {
        giftGiver: 'giftGiver',
      },
      filteredItemsCount: 1,
      dateSortedOosListItemsCount: 1,
      tilesView: '3',
      dateSortedOosCategoryList: { atgResponse: [] },
      filteredSortedOosCategoryItems: [{ sku: 112, skuInStore: '1' }],
      filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
      selectedCheckboxFilter: '',
      isFetchingOthers: true,
    };
    const getNumberofRegistryItem = 1;
    const dateSortedListItemsCount = 0;
    const displayDiscountedPrice = 0;

    const wrapper = shallow(
      renderFacetsSortedView(
        props,
        dateSortedListItemsCount,
        getNumberofRegistryItem,
        displayDiscountedPrice
      )
    );
    expect(wrapper.find('ErrorBoundary')).to.have.lengthOf('0');
  });
});
