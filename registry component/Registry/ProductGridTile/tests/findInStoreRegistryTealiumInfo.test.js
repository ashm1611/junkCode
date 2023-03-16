import {
  getProductTealiumTags,
  getSelectorDerivedTealiumTags,
  findInStoreRegistryTealiumInfo,
  getStaticTealiumTags,
} from '../findInStoreRegistryTealiumInfo';

describe('#getProductTealiumTags', () => {
  it('should return product tealium tags having product_sku_id ', () => {
    const tealiumProductProps = {
      sKUDetailVO: {
        displayName: 'Fashion Bed Group Cosmos Complete Full Bed in Coffee',
        skuInStock: true,
        ltlItem: false,
        parentProdId: '3296600',
        personalizationType: 'N',
        skuId: '47046481',
      },
      imageURL:
        '"https://s7d2.scene7.com/is/image/BedBathandBeyond/9850316137065p?$478$"',
      imageTitle: 'Fashion Bed Group Cosmos Complete Full',
      price: '12.99',
      quantity: '4',
      productURL:
        '/product/nevaeh-white-reg-byfitz-and-floyd-reg-14-5-inch-oval-platter/1016137065?skuId=16137065',
      catId: '123456',
    };

    const obj = getProductTealiumTags(tealiumProductProps);
    expect(obj.product_id)
      .to.be.an('array')
      .that.includes('3296600');
  });

  it('should return null tealium tags when product data is empty', () => {
    const tealiumProductProps = {};

    const obj = getProductTealiumTags(tealiumProductProps);
    expect(obj).equal(null);
  });

  it('should return static tealium tags', () => {
    const obj = getStaticTealiumTags();
    expect(obj.pagename_breadcrumb).equal('Registry View Page');
  });

  it('should return favoriteStore and checlist tealium tags', () => {
    const favoriteStore = {
      userSiteItems: {
        favouriteStoreId: '12345',
      },
    };

    const interactiveCheckList = {
      averageC1Percentage: 30,
    };

    const obj = getSelectorDerivedTealiumTags(
      interactiveCheckList,
      favoriteStore
    );
    expect(obj.favorite_store_id).equal('12345');
  });

  it('should return null tealium tags when selectors data is empty', () => {
    const favoriteStore = {};

    const interactiveCheckList = {};

    const obj = getSelectorDerivedTealiumTags(
      interactiveCheckList,
      favoriteStore
    );
    expect(obj.favorite_store_id).equal('');
  });

  it('should call getSelectorDerivedTealiumTags and return null when favouriteStoreId is null', () => {
    const favoriteStore = { userSiteItems: { favouriteStoreId: null } };

    const obj = getSelectorDerivedTealiumTags({}, favoriteStore);
    expect(obj.favorite_store_id).equal('');
  });

  it('should return find in store tealium tags', () => {
    const favoriteStore = {
      userSiteItems: {
        favouriteStoreId: '12345',
      },
    };

    const interactiveCheckList = {
      averageC1Percentage: 30,
    };

    const tealiumProductProps = {
      sKUDetailVO: {
        displayName: 'Fashion Bed Group Cosmos Complete Full Bed in Coffee',
        skuInStock: true,
        ltlItem: false,
        parentProdId: '3296600',
        personalizationType: 'N',
        skuId: '47046481',
      },
      imageURL:
        '"https://s7d2.scene7.com/is/image/BedBathandBeyond/9850316137065p?$478$"',
      imageTitle: 'Fashion Bed Group Cosmos Complete Full',
      price: '12.99',
      quantity: '4',
      productURL:
        '/product/nevaeh-white-reg-byfitz-and-floyd-reg-14-5-inch-oval-platter/1016137065?skuId=16137065',
      catId: '123456',
      levelOfService: 'White glove',
    };

    const qtyRequested = '5';
    const qtyPurchased = '9';
    const registryData = {
      favouriteCategoryIdList: ['10003', '10546', '13109', 'OtherCat-Id'],
      favouriteCategoryNameList: [
        'FINE DINING & GIFTWARE',
        'FURNITURE',
        'BASIC LINENS',
        'OTHER',
      ],
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Wedding',
          eventDate: '06/01/2018',
          eventVO: {
            showerDateObject: {
              time: '06/01/2018',
            },
          },
          giftRegistered: 12,
          primaryRegistrantFirstName: 'Shivam',
          registryId: '520648448',
        },
      },
    };

    const obj = findInStoreRegistryTealiumInfo(
      registryData,
      interactiveCheckList,
      favoriteStore,
      qtyRequested,
      qtyPurchased,
      tealiumProductProps
    );
    expect(obj).to.be.a('object');
  });
});
