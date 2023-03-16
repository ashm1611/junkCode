import pathOr from 'lodash/fp/pathOr';
import {
  TEALIUM_CREATE_REGISTRY,
  TEALIUM_CREATE_REGISTRY_PAGENAME_BREADCRUMB,
  PAGE_TYPE_NON_LOGGEDIN,
  NON_LOGGEDIN_PAGENAME_BREADCRUMB,
} from './constants';

const createRegistryTealiumInfo = (
  formadata,
  profileId,
  registryId,
  MINICART_STATE,
  akamaiData,
  isGuestUserFlag,
  groupGiftingOptInInfo,
  isNewCreateRegForm
) => {
  const cartData = MINICART_STATE.toJS();
  const firstName = pathOr(
    '',
    'registryVO.primaryRegistrant.firstName',
    formadata
  );
  const lastName = pathOr(
    '',
    'registryVO.primaryRegistrant.lastName',
    formadata
  );
  const groupGiftingData = {};
  if (groupGiftingOptInInfo) {
    groupGiftingData.reg_groupgift_optin = true;
  }
  const registryType = pathOr(
    '',
    'registryVO.registryType.registryTypeName',
    formadata
  );
  const registryTypeNewRegLayout =
    isNewCreateRegForm && registryType && registryType.includes('New')
      ? registryType.substring(0, registryType.length - 3)
      : registryType;
  return {
    customer_name: `${firstName} ${lastName}`,
    favorite_store_id: pathOr('', 'registryVO.prefStoreNum', formadata),
    registry_type: registryTypeNewRegLayout,
    cart_total_items: pathOr(
      '',
      'data.atgResponse.Cart.cartItemCount',
      cartData
    ),
    customer_country: pathOr('', 'country_code', akamaiData),
    customer_email: decodeURIComponent(
      pathOr('', 'registryVO.primaryRegistrant.email', formadata)
    ),
    cart_total_value: '',
    profile_id: profileId,
    registry_id: registryId,
    product_id: '',
    product_name: '',
    product_price: '',
    product_quantity: '',
    product_url: '',
    page_name: TEALIUM_CREATE_REGISTRY,
    page_type: isGuestUserFlag ? PAGE_TYPE_NON_LOGGEDIN : 'Registry',
    registrants_name: `${firstName} ${lastName}`,
    pagename_breadcrumb: isGuestUserFlag
      ? NON_LOGGEDIN_PAGENAME_BREADCRUMB
      : TEALIUM_CREATE_REGISTRY_PAGENAME_BREADCRUMB,
    signup_type: TEALIUM_CREATE_REGISTRY,
    customer_postal_code: pathOr('', 'customer_postal_code', akamaiData),
    remove_global_vars: ['language_code'],
    page_function: 'Registry',
    navigation_path: 'Registry',
    subnavigation_path: 'Registry',
    ...groupGiftingData,
  };
};

export default createRegistryTealiumInfo;
