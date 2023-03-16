import { fromJS } from 'immutable';
import createRegistryTealiumInfo from '../createRegistryTealiumInfo';
import {
  TEALIUM_CREATE_REGISTRY,
  PAGE_TYPE_NON_LOGGEDIN,
  NON_LOGGEDIN_PAGENAME_BREADCRUMB,
  TEALIUM_CREATE_REGISTRY_PAGENAME_BREADCRUMB,
} from '../constants';

describe('# createRegistryTealiumInfo', () => {
  const formData = {
    registryVO: {
      primaryRegistrant: {
        firstName: 'Test',
        lastName: 'Test',
        email: 'test@test.com',
      },
      registryType: {
        registryTypeName: 'Wedding',
      },
      prefStoreNum: '99',
    },
  };
  const profileId = '123';
  const registryId = '234';
  const cartData = fromJS({
    data: {
      atgResponse: {
        Cart: {
          cartItemCount: '10',
        },
      },
    },
  });
  const akamaiData = {
    country_code: '91',
    customer_postal_code: '12',
  };
  const isGuestUserFlag = true;

  it('# createRegistryTealiumInfo', () => {
    const expected = createRegistryTealiumInfo(
      formData,
      profileId,
      registryId,
      cartData,
      akamaiData,
      isGuestUserFlag,
      true
    );
    expect(expected).to.deep.equal({
      customer_name: `Test Test`,
      favorite_store_id: '99',
      registry_type: 'Wedding',
      cart_total_items: '10',
      customer_country: '91',
      customer_email: 'test@test.com',
      cart_total_value: '',
      profile_id: '123',
      registry_id: '234',
      product_id: '',
      product_name: '',
      product_price: '',
      product_quantity: '',
      product_url: '',
      page_name: TEALIUM_CREATE_REGISTRY,
      page_type: PAGE_TYPE_NON_LOGGEDIN,
      registrants_name: `Test Test`,
      pagename_breadcrumb: NON_LOGGEDIN_PAGENAME_BREADCRUMB,
      signup_type: TEALIUM_CREATE_REGISTRY,
      customer_postal_code: '12',
      remove_global_vars: ['language_code'],
      page_function: 'Registry',
      navigation_path: 'Registry',
      subnavigation_path: 'Registry',
      reg_groupgift_optin: true,
    });
  });
  it('# createRegistryTealiumInfo when isGuestUserFlag is false', () => {
    const expected = createRegistryTealiumInfo(
      formData,
      profileId,
      registryId,
      cartData,
      akamaiData,
      false,
      false
    );
    expect(expected).to.deep.equal({
      customer_name: `Test Test`,
      favorite_store_id: '99',
      registry_type: 'Wedding',
      cart_total_items: '10',
      customer_country: '91',
      customer_email: 'test@test.com',
      cart_total_value: '',
      profile_id: '123',
      registry_id: '234',
      product_id: '',
      product_name: '',
      product_price: '',
      product_quantity: '',
      product_url: '',
      page_name: TEALIUM_CREATE_REGISTRY,
      page_type: 'Registry',
      registrants_name: `Test Test`,
      pagename_breadcrumb: TEALIUM_CREATE_REGISTRY_PAGENAME_BREADCRUMB,
      signup_type: TEALIUM_CREATE_REGISTRY,
      customer_postal_code: '12',
      remove_global_vars: ['language_code'],
      page_function: 'Registry',
      navigation_path: 'Registry',
      subnavigation_path: 'Registry',
    });
  });
  it('# createRegistryTealiumInfo when isNewCreateRegForm is true', () => {
    const formDataNew = {
      registryVO: {
        primaryRegistrant: {
          firstName: 'Test',
          lastName: 'Test',
          email: 'test@test.com',
        },
        registryType: {
          registryTypeName: 'WeddingNew',
        },
        prefStoreNum: '99',
      },
    };
    const expected = createRegistryTealiumInfo(
      formDataNew,
      profileId,
      registryId,
      cartData,
      akamaiData,
      isGuestUserFlag,
      true,
      true
    );
    expect(expected).to.deep.equal({
      customer_name: `Test Test`,
      favorite_store_id: '99',
      registry_type: 'Wedding',
      cart_total_items: '10',
      customer_country: '91',
      customer_email: 'test@test.com',
      cart_total_value: '',
      profile_id: '123',
      registry_id: '234',
      product_id: '',
      product_name: '',
      product_price: '',
      product_quantity: '',
      product_url: '',
      page_name: TEALIUM_CREATE_REGISTRY,
      page_type: 'My Account',
      registrants_name: `Test Test`,
      pagename_breadcrumb: NON_LOGGEDIN_PAGENAME_BREADCRUMB,
      signup_type: TEALIUM_CREATE_REGISTRY,
      customer_postal_code: '12',
      remove_global_vars: ['language_code'],
      page_function: 'Registry',
      navigation_path: 'Registry',
      subnavigation_path: 'Registry',
      reg_groupgift_optin: true,
    });
  });
});
