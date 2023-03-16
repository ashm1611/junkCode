import pathOr from 'lodash/fp/pathOr';

export const getRegistryDataTags = registryData => {
  const registryFavoriteCategoriesIds = pathOr(
    '',
    'favouriteCategoryIdList',
    registryData
  );
  const registryFavoriteCategoriesNames = pathOr(
    '',
    'favouriteCategoryNameList',
    registryData
  );
  const registrantFirstName = pathOr(
    '',
    ['registryResVO', 'registrySummaryVO', 'primaryRegistrantFirstName'],
    registryData
  );
  const registrantLastName = pathOr(
    '',
    ['registryResVO', 'registrySummaryVO', 'primaryRegistrantLastName'],
    registryData
  );
  const registryTags = {
    registry_favorite_categories_id:
      registryFavoriteCategoriesIds === null
        ? []
        : registryFavoriteCategoriesIds,
    registry_favorite_categories_name:
      registryFavoriteCategoriesNames === null
        ? []
        : registryFavoriteCategoriesNames,
    registry_id: pathOr(
      '',
      'registryResVO.registrySummaryVO.registryId',
      registryData
    ),
    registry_product_name_count_purchased: '',
    registry_product_name_count_requested: [],
    registry_total_items: pathOr(
      '',
      'registryResVO.registrySummaryVO.giftRegistered',
      registryData
    ),
    registry_type: pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeDesc',
      registryData
    ),
    shower_celebration_date: pathOr(
      '',
      'registryResVO.registrySummaryVO.eventVO.showerDateObject.time',
      registryData
    ),
    registry_event_date: pathOr(
      '',
      'registryResVO.registrySummaryVO.eventDate',
      registryData
    ),
    registrants_name: `${registrantFirstName} ${registrantLastName}`,
  };

  return registryTags;
};
