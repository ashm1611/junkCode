import { checkItemNeedToExcluded } from '../../excludeNeededItem';

describe(__filename, () => {
  it('should return itemType PER', () => {
    const itemType = 'PER';
    const jdaCatName = 'EXPERIENCES';

    const sKUDetailVO = {
      skuGiftCard: 'abc',
    };
    const array = checkItemNeedToExcluded(itemType, jdaCatName, sKUDetailVO);
    expect(array.length).to.be.equal(undefined);
  });
  it('should return jdaCatName EXPEEERIENCES', () => {
    const itemType = undefined;
    const jdaCatName = 'EXPERIENCES';

    const sKUDetailVO = {
      skuGiftCard: 'abc',
    };
    const array = checkItemNeedToExcluded(itemType, jdaCatName, sKUDetailVO);
    expect(array.length).to.be.equal(undefined);
  });
  it('should return sKUDetailVO with skuGiftCard', () => {
    const itemType = undefined;
    const jdaCatName = undefined;

    const sKUDetailVO = {
      skuGiftCard: 'abc',
    };
    const array = checkItemNeedToExcluded(itemType, jdaCatName, sKUDetailVO);
    expect(array.length).to.be.equal(3);
  });
});
