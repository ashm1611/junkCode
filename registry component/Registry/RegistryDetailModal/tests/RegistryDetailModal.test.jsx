import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import RegistryProductDetails from '../RegistryProductDetails';
import { RegistryDetailModal } from '../RegistryDetailModal';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const data = {
    ALT_IMG: 'img1, img2',
    productId: '100712',
    name: 'Mesh Metal Wastebaskettt',
    RATINGS: '1.9',
    REVIEWS: '12',
    TYPE: 'MSWP',
    BRAND: 'KITCHEN',
    BRAND_ID: '67',
    PRODUCT_VARIATION: 'NORMAL',
    ATTRIBUTES_JSON: {
      PDPT: [
        {
          SKU_ATTRIBUTE_ID: '13_2',
          DISPLAY_DESCRIP:
            "<p class='sddMessage'>Same Day Delivery Eligible</p>",
          PLACE_HOLDER: 'PLSR,PDPM,PDPC',
          INTL_FLAG: 'N',
          PRIORITY: '1',
          IMAGE_URL: '',
          ACTION_URL: '',
        },
      ],
      PDPP: [
        {
          SKU_ATTRIBUTE_ID: '13_2',
          DISPLAY_DESCRIP:
            "<p class='sddMessage'>Same Day Delivery Eligible</p>",
          PLACE_HOLDER: 'PLSR,PDPM,PDPC',
          INTL_FLAG: 'N',
          PRIORITY: '1',
          IMAGE_URL: '',
          ACTION_URL: '',
        },
      ],
      PDPM: [
        {
          SKU_ATTRIBUTE_ID: '13_2',
          DISPLAY_DESCRIP:
            "<p class='sddMessage'>Same Day Delivery Eligible</p>",
          PLACE_HOLDER: 'PLSR,PDPM,PDPC',
          INTL_FLAG: 'N',
          PRIORITY: '1',
          IMAGE_URL: '',
          ACTION_URL: '',
        },
      ],
    },
  };
  const deviceConfig = {
    DESKTOP: 1024,
  };

  it('should render QuickView Component', () => {
    const parentProductData = {
      PRODUCT_VARIATION: 'NORMAL',
    };
    const switchConfigGlobal = {
      enableQVCertona: true,
    };
    const registryProductInfo = {
      markedAsFav: true,
      sKUDetailVO: {
        displayName: 'abc',
        parentProdId: '676767',
      },
      activeRegistry: {
        groupGiftOptIn: true,
      },
    };
    const tree = shallow(
      <RegistryDetailModal
        selectedProduct={data}
        deviceConfig={deviceConfig}
        variation=""
        parentProductData={parentProductData}
        switchConfigGlobal={switchConfigGlobal}
        registryProductInfo={registryProductInfo}
        selectedSkuId=""
        registryId=""
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render QuickView with correct props Component', () => {
    const registryProductInfo = {
      sKUDetailVO: {
        displayName: 'abc',
        parentProdId: '676767',
      },
      activeRegistry: {
        groupGiftOptIn: true,
      },
    };

    const parentProductData = {
      PRODUCT_VARIATION: 'COLLECTION',
    };

    const switchConfigGlobal = {
      enableQVCertona: true,
    };

    const tree = shallow(
      <RegistryDetailModal
        deviceConfig={deviceConfig}
        selectedProduct={data}
        isQuickViewOpen="false"
        variation="rectangle"
        parentProductData={parentProductData}
        switchConfigGlobal={switchConfigGlobal}
        isPickupInStoreModalOpen={false}
        registryProductInfo={registryProductInfo}
      />
    );

    expect(tree).to.not.equal(null);
    tree
      .find(RegistryProductDetails)
      .props()
      .showError();
  });

  it('should render QuickView with correct props Component when enableMiniQuickViewModal true', () => {
    const registryProductInfo = {
      sKUDetailVO: {
        displayName: 'abc',
        parentProdId: '676767',
      },
      activeRegistry: {
        groupGiftOptIn: true,
      },
    };

    const parentProductData = {
      PRODUCT_VARIATION: 'NORMAL',
    };

    const switchConfigGlobal = {
      enableQVCertona: true,
      enableMiniQuickViewModal: true,
    };
    const miniQuickViewMode = true;

    const tree = shallow(
      <RegistryDetailModal
        deviceConfig={deviceConfig}
        selectedProduct={data}
        isQuickViewOpen="false"
        variation="rectangle"
        parentProductData={parentProductData}
        switchConfigGlobal={switchConfigGlobal}
        productVariation={'NORMAL'}
        miniQuickViewMode={miniQuickViewMode}
        isPickupInStoreModalOpen
        registryProductInfo={registryProductInfo}
      />
    );

    expect(tree).to.not.equal(null);
  });

  it('should render QuickView with Notification label if gift giver view and personalizationType equals PY', () => {
    const parentProductData = {
      PRODUCT_VARIATION: 'COLLECTION',
    };

    const switchConfigGlobal = {
      enableQVCertona: true,
    };

    const giftGiver = true;
    const registryProductInfo = {
      sKUDetailVO: {
        displayName: 'abc',
        parentProdId: '676767',
      },
      activeRegistry: {
        groupGiftOptIn: true,
      },
    };
    const registryData = {
      registryResVO: { registrySummaryVO: { coRegistrantFirstName: 'test' } },
    };
    const tree = shallow(
      <RegistryDetailModal
        deviceConfig={deviceConfig}
        selectedProduct={data}
        isQuickViewOpen="false"
        variation="rectangle"
        parentProductData={parentProductData}
        switchConfigGlobal={switchConfigGlobal}
        giftGiver={giftGiver}
        registryProductInfo={registryProductInfo}
        registryData={registryData}
      />
    );

    expect(tree).to.not.equal(null);
  });

  it('should render QuickView when giftgiver and ltl', () => {
    const parentProductData = {
      PRODUCT_VARIATION: 'COLLECTION',
    };

    const switchConfigGlobal = {
      enableQVCertona: true,
    };

    const giftGiver = true;
    const registryProductInfo = {
      personalizationType: 'PY',
      isPersonalised: true,
      isLtlItem: true,
      sKUDetailVO: {
        displayName: 'abc',
        parentProdId: '676767',
      },
      activeRegistry: {
        groupGiftOptIn: true,
      },
    };

    const tree = shallow(
      <RegistryDetailModal
        deviceConfig={deviceConfig}
        selectedProduct={data}
        isQuickViewOpen="false"
        variation="rectangle"
        parentProductData={parentProductData}
        switchConfigGlobal={switchConfigGlobal}
        giftGiver={giftGiver}
        registryProductInfo={registryProductInfo}
      />
    );

    expect(tree).to.not.equal(null);
  });
});
