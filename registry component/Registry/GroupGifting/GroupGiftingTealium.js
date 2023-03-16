export const INFORMATION_MODAL = 'Group Gifting>Information Modal';

export const getGroupGiftingTealiumData = utag => {
  return Object.assign(
    {},
    {
      channel: 'Registry',
      page_function: 'Registry',
      page_type: 'Registry',
      navigation_path: 'Registry',
      category: 'Registry',
      sub_category: 'Registry',
      subnavigation_path: 'Registry',
    },
    utag || {}
  );
};
