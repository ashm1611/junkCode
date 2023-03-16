import { pathOr } from 'lodash/fp';

export const checkItemNeedToExcluded = (itemType, jdaCatName, sKUDetailVO) => {
  const isGiftCard = pathOr('', 'skuGiftCard', sKUDetailVO);
  return (
    (itemType && itemType === 'PER') ||
    jdaCatName === 'EXPERIENCES' ||
    isGiftCard
  );
};
