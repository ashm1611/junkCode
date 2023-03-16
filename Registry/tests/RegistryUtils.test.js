import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  returnFirstCategoryItemCount,
  returnFilteredItemsCount,
} from '../RegistryUtils';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should return item count', () => {
    const itemsArray = [
      {
        items: [
          {
            skuId: '123',
          },
          {
            skuId: '1234',
          },
        ],
      },
    ];
    const count = returnFirstCategoryItemCount(itemsArray);
    expect(count).to.equal(2);
  });

  it('should return count for registryItemList', () => {
    const itemsArray = [
      {
        registryItemList: [
          {
            skuId: '123',
          },
          {
            skuId: '1234',
          },
        ],
      },
    ];
    const count = returnFirstCategoryItemCount(itemsArray);
    expect(count).to.equal(2);
  });

  it('should return count for returnFilteredItemsCount for purchased filter', () => {
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
    const filter = 'Purchased';
    const count = returnFilteredItemsCount(itemsArray, filter);
    expect(count).to.equal(4);
  });
  it('should return count for returnFilteredItemsCount  for Favourites filter', () => {
    const itemsArray = [
      {
        items: [
          {
            purchased: true,
            markedAsFav: true,
            deletedItem: false,
            qtyRequested: 1,
          },
          {
            purchased: true,
            markedAsFav: true,
            deletedItem: false,
            qtyRequested: 3,
          },
        ],
      },
    ];
    const filter = 'Favourites';
    const count = returnFilteredItemsCount(itemsArray, filter);
    expect(count).to.equal(4);
  });
  it('should return count for returnFilteredItemsCount  for Favorites filter', () => {
    const itemsArray = [
      {
        items: [
          {
            purchased: true,
            markedAsFav: true,
            deletedItem: false,
            qtyRequested: 1,
          },
          {
            purchased: true,
            markedAsFav: true,
            deletedItem: false,
            qtyRequested: 3,
          },
        ],
      },
    ];
    const filter = 'Favorites';
    const count = returnFilteredItemsCount(itemsArray, filter);
    expect(count).to.equal(4);
  });

  it('should return count for returnFilteredItemsCount  for Remaining filter', () => {
    const itemsArray = [
      {
        items: [
          {
            purchased: false,
            deletedItem: false,
            qtyRequested: 1,
            qtyPurchased: 1,
          },
          {
            purchased: false,
            deletedItem: false,
            qtyRequested: 3,
            qtyPurchased: 0,
          },
        ],
      },
    ];
    const filter = 'Remaining';
    const count = returnFilteredItemsCount(itemsArray, filter);
    expect(count).to.equal(3);
  });
  it('should return count for returnFilteredItemsCount  for Discontinued filter', () => {
    const itemsArray = [
      {
        items: [
          {
            purchased: false,
            markedAsFav: true,
            deletedItem: false,
            qtyRequested: 1,
            displayNotifyRegistrantMsg: true,
          },
          {
            purchased: false,
            markedAsFav: true,
            deletedItem: false,
            qtyRequested: 3,
            displayNotifyRegistrantMsg: true,
          },
        ],
      },
    ];
    const filter = 'Discontinued';
    const count = returnFilteredItemsCount(itemsArray, filter);
    expect(count).to.equal(0);
  });
  it('should return count for returnFilteredItemsCount  return itemsArray else', () => {
    const itemsArray = [
      {
        items: [
          {
            purchased: false,
            markedAsFav: false,
          },
        ],
      },
    ];
    const filter = 'abc';
    const count = returnFilteredItemsCount(itemsArray, filter);
    expect(count).to.equal(1);
  });
  it('should return count for returnFilteredItemsCount  default', () => {
    const itemsArray = [
      {
        items: '',
      },
    ];
    const filter = 'abc';
    const count = returnFilteredItemsCount(itemsArray, filter);
    expect(count).to.equal(0);
  });
});
