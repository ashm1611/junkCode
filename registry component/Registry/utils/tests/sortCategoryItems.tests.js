import { sortCategoryItems, applyFilter } from '../sortCategoryItems';

describe(__filename, () => {
  const itemsArray = [
    { priceVal: 1 },
    { priceVal: 2 },
    { priceVal: 3 },
    { priceVal: 4 },
    { priceVal: 9 },
    { priceVal: 6 },
    { priceVal: 3, totalPrice: 5 },
  ];

  const sortedArrayResult = [
    { priceVal: 1 },
    { priceVal: 2 },
    { priceVal: 3 },
    { priceVal: 4 },
    { priceVal: 3, totalPrice: 5 },
    { priceVal: 6 },
    { priceVal: 9 },
  ];

  const sortedArrayDesResult = [
    { priceVal: 9 },
    { priceVal: 6 },
    { priceVal: 3, totalPrice: 5 },
    { priceVal: 4 },
    { priceVal: 3 },
    { priceVal: 2 },
    { priceVal: 1 },
  ];

  const itemArr = {
    data: {
      registryItemList: [
        {
          categoryFilter: 'SAFETY',
          priceRangeFilter: '$150 - $200',
          purchased: false,
          statusFilter: 'Gifts Wanted',
        },
        {
          categoryFilter: 'BATH & POTTY',
          priceRangeFilter: '$100 - $149',
          purchased: false,
          statusFilter: 'Gifts Wanted',
        },
        {
          categoryFilter: 'SAFETY',
          priceRangeFilter: '$1 - $24',
          purchased: true,
          sKUDetailVO: {
            activeFlag: true,
          },
          statusFilter: 'Gift Purchased',
        },
      ],
    },
  };

  it('should return sorted array in asc', () => {
    const sortedArray = sortCategoryItems(itemsArray, 'asc');
    expect(sortedArray).to.deep.equal(sortedArrayResult);
  });

  it('should return sorted array in des', () => {
    const sortedArray = sortCategoryItems(itemsArray, 'des');
    expect(sortedArray).to.deep.equal(sortedArrayDesResult);
  });

  it('should return item only between 1 to 24 & $100 - $14 price', () => {
    const selectedFilter = {
      price: ['$1 - $24', '$100 - $149'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(2);
  });

  it('should return items which category is SAFETY', () => {
    const selectedFilter = {
      categories: ['SAFETY'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(2);
  });

  it('should return all items if filter not selected', () => {
    const selectedFilter = {};
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(3);
  });

  it('should return all items if GiftGiver and GiftWanted both selected', () => {
    const selectedFilter = {
      status: ['Gifts Wanted', 'Gift Purchased'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(3);
  });

  it('should return items if GiftGiver single value selected', () => {
    const selectedFilter = {
      status: ['Gifts Wanted'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(2);
  });

  it('should return items which category & price & Status selected with AND condition', () => {
    const selectedFilter = {
      categories: ['SAFETY'],
      status: ['Gift Purchased'],
      price: ['$1 - $24'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(1);
  });

  it('should return items which category & status selected with AND condition', () => {
    const selectedFilter = {
      categories: ['SAFETY'],
      status: ['Gift Purchased'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(1);
  });

  it('should return items which category & price selected with AND condition', () => {
    const selectedFilter = {
      categories: ['SAFETY'],
      price: ['$1 - $24', '$100 - $149'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(1);
  });

  it('should return items which status & price selected with AND condition', () => {
    const selectedFilter = {
      status: ['Gift Purchased'],
      price: ['$1 - $24', '$150 - $200'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(1);
  });

  it('should return items which status & price selected with AND condition', () => {
    const selectedFilter = {
      status: ['Gifts Wanted'],
      price: ['$100 - $149', '$150 - $200'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter
    );
    expect(itemsFilterArray.length).to.be.equal(2);
  });

  it('should call for registryOwner', () => {
    const selectedFilter = {
      status: ['Gifts Wanted'],
      price: ['$100 - $149', '$150 - $200'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter,
      true,
      []
    );
    expect(itemsFilterArray.length).to.be.equal(0);
  });

  it('should call for registryOwner bopis in-stock-online', () => {
    const selectedFilter = {
      status: ['Gifts Wanted'],
      price: ['$100 - $149', '$150 - $200'],
    };
    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter,
      true,
      'in-stock-online'
    );
    expect(itemsFilterArray.length).to.be.equal(2);
  });

  it('should call for registryOwner bopis in-stock-online - isBelowLineItem is true', () => {
    const selectedFilter = {
      status: ['Gifts Wanted'],
      price: ['$100 - $149', '$150 - $200'],
    };
    const registryItemList = [
      {
        categoryFilter: 'SAFETY',
        priceRangeFilter: '$150 - $200',
        purchased: false,
        statusFilter: 'Gifts Wanted',
        isBelowLineItem: 'true',
      },
      {
        categoryFilter: 'BATH & POTTY',
        priceRangeFilter: '$100 - $149',
        purchased: false,
        statusFilter: 'Gifts Wanted',
      },
      {
        categoryFilter: 'SAFETY',
        priceRangeFilter: '$1 - $24',
        purchased: true,
        sKUDetailVO: {
          activeFlag: true,
        },
        statusFilter: 'Gift Purchased',
      },
    ];
    const itemsFilterArray = applyFilter(
      registryItemList,
      selectedFilter,
      true,
      'in-stock-online'
    );
    expect(itemsFilterArray.length).to.be.equal(1);
  });

  it('should call for registryOwner bopis store-pickup', () => {
    const selectedFilter = {
      status: ['Gifts Wanted'],
      price: ['$100 - $149', '$150 - $200'],
    };

    const itemsFilterArray = applyFilter(
      itemArr.data.registryItemList,
      selectedFilter,
      true,
      'store-pickup'
    );
    expect(itemsFilterArray.length).to.be.equal(0);
  });

  it('should call for registryOwner bopis store-pickup - skuInStore is 1', () => {
    const selectedFilter = {
      status: ['Gifts Wanted'],
      price: ['$100 - $149', '$150 - $200'],
    };
    const registryItemList = [
      {
        categoryFilter: 'SAFETY',
        priceRangeFilter: '$150 - $200',
        purchased: false,
        statusFilter: 'Gifts Wanted',
        isBelowLineItem: 'true',
        skuInStore: '1',
      },
      {
        categoryFilter: 'BATH & POTTY',
        priceRangeFilter: '$100 - $149',
        purchased: false,
        statusFilter: 'Gifts Wanted',
      },
      {
        categoryFilter: 'SAFETY',
        priceRangeFilter: '$1 - $24',
        purchased: true,
        sKUDetailVO: {
          activeFlag: true,
        },
        statusFilter: 'Gift Purchased',
      },
    ];

    const itemsFilterArray = applyFilter(
      registryItemList,
      selectedFilter,
      true,
      'store-pickup'
    );
    expect(itemsFilterArray.length).to.be.equal(1);
  });
});
