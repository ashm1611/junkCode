import {
  personalizationApplicable,
  anchorToItem,
  getDataFromSessionStorage,
  saveDataInSessionStorage,
  deleteFromSessionStorage,
  isUsersRegOnGuest,
  saveIsBackButtonPressed,
  getTimeDifference,
  showDiscountedPrice,
} from '@bbb-app/utils/RegistryUtils';

describe('RegistryUtils', () => {
  it('personalizationApplicable should return true if refnum is not null', () => {
    const refNum = 12345;
    const personalizationType = 'PB';

    expect(personalizationApplicable(refNum, personalizationType)).to.equal(
      true
    );
  });
  it('personalizationApplicable should return false if refnum is null', () => {
    const refNum = null;
    const personalizationType = 'PB';

    expect(personalizationApplicable(refNum, personalizationType)).to.equal(
      false
    );
  });
  it('personalizationApplicable should return true if personalizationType is either PB or CR', () => {
    const refNum = 12345;
    const personalizationType = 'PB';

    expect(personalizationApplicable(refNum, personalizationType)).to.equal(
      true
    );
  });
  it('personalizationApplicable should return false if personalizationType is either PY and personalisedCode is not Y', () => {
    const refNum = 12345;
    const personalizationType = 'PY';

    expect(personalizationApplicable(refNum, personalizationType)).to.equal(
      true
    );
  });

  describe('anchorToItem method', () => {
    it('should not change anchoredSkuId', () => {
      const queryObj = { skuAdded: '234567422' };
      window.sessionStorage.setItem('anchoredSkuId', queryObj.skuAdded);
      const beforeValue = window.sessionStorage.getItem('anchoredSkuId');
      anchorToItem(queryObj);
      expect(beforeValue).to.equal('234567422');
    });

    it('should remove anchoredSkuId when header presents', () => {
      const queryObj = { skuAdded: '234567422' };

      const aTag = document.createElement('a');
      aTag.setAttribute('href', 'foo');
      aTag.dataset.sku = queryObj.skuAdded;
      aTag.innerHTML = 'bar';
      document.body.appendChild(aTag);

      const headerTag = document.createElement('header');
      document.body.appendChild(headerTag);
      window.sessionStorage.setItem('anchoredSkuId', queryObj.skuAdded);

      anchorToItem(queryObj);
      const afterValue = window.sessionStorage.getItem('anchoredSkuId');

      expect(afterValue).to.equal(null);
    });
  });

  describe('isUsersRegOnGuest method', () => {
    it('should return false when user is not viewing his registry', () => {
      const curRegId = '12345';
      const activeRegId = '12345';
      const listOfReg = [curRegId, activeRegId];
      const result = isUsersRegOnGuest(listOfReg, curRegId, activeRegId);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.true;
    });

    it('should return false when user is not viewing his registry', () => {
      const curRegId = '12345';
      const activeRegId = '67890';
      const listOfReg = [curRegId, activeRegId];
      const result = isUsersRegOnGuest(listOfReg, curRegId, activeRegId);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.false;
    });

    it('should return false when listOfReg is empty', () => {
      const listOfReg = [];
      const result = isUsersRegOnGuest(listOfReg);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.false;
    });
  });

  /**
   * `history.onpopstate` is not triggered with `history.back()`
   */
  it('should run saveIsBackButtonPressed function correctly', () => {
    saveIsBackButtonPressed();
    const key = 'isBackButtonPressed';
    const value = 'true';
    saveDataInSessionStorage(key, value);
    deleteFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem('isBackButtonPressed');

    // eslint-disable-next-line no-unused-expressions
    expect(afterValue).to.equal(null);
  });
  it('should run getDataFromSessionStorage function correctly', () => {
    window.sessionStorage.setItem('anchoredSkuId', '12345');
    const key = 'anchoredSkuId';
    const response = getDataFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem('anchoredSkuId');
    expect(response).to.equal(afterValue);
  });
  it('should run saveDataInSessionStorage function correctly', () => {
    const key = 'anchoredSkuId';
    const value = '12345';
    saveDataInSessionStorage(key, value);
    const afterValue = window.sessionStorage.getItem('anchoredSkuId');
    expect(afterValue).to.equal(value);
  });
  it('should run deleteFromSessionStorage function correctly', () => {
    const key = 'anchoredSkuId';
    const value = '12345';
    saveDataInSessionStorage(key, value);
    deleteFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem('anchoredSkuId');
    expect(afterValue).to.equal(null);
  });
  it('should run getTimeDifference function correctly', () => {
    const key = 'orderConfirmationTime';
    const value = '03/30/2020';
    getTimeDifference(key);
    saveDataInSessionStorage(key, value);
    deleteFromSessionStorage(key);
    const afterValue = window.sessionStorage.getItem(key);
    expect(afterValue).to.equal(null);
  });
  describe('showDiscountedPrice method', () => {
    it('should call showDiscountedPrice when displayDiscountedPrice is false', () => {
      const props = {
        displayDiscountedPrice: false,
      };
      expect(showDiscountedPrice(props)).to.equal(false);
    });
    it('should call showDiscountedPrice when ltlFlag is true', () => {
      const props = {
        sKUDetailVO: { ltlItem: true },
        displayDiscountedPrice: true,
      };
      expect(showDiscountedPrice(props)).to.equal(false);
    });
    it('should call showDiscountedPrice for isBelowLineItem', () => {
      const props = {
        isBelowLineItem: true,
        displayDiscountedPrice: true,
      };
      expect(showDiscountedPrice(props)).to.equal(false);
    });
    it('should call showDiscountedPrice if isPersonalizationApplicable', () => {
      const props = {
        displayDiscountedPrice: true,
        refNum: 12345,
        personalizationType: 'PB',
        personalizedPrice: 123,
        wasPrice: 122,
      };
      expect(showDiscountedPrice(props)).to.equal(false);
    });
  });
});
