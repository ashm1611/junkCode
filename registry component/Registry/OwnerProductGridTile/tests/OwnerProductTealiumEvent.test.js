import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
  getTealiumData,
  getRemoveTealiumData,
  updateQuantityData,
  getFavTealiumData,
  getWritereviewTealiumData,
} from '../OwnerProductTealiumEvent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should call getTealiumData', () => {
    const sKUDetailVO = {};
    const tealiumVariable = {
      productURL: 'qweer',
      price: '123',
      jdaCatId: '908',
      displayTitle: 'cvb',
      ltlShipMethodDesc: true,
      imageURL: 'hjjkk',
      qtyRequested: '2',
      personalisedCode: 'PER',
      tealiumData: {},
    };
    let getTealiumDataTest = getTealiumData(sKUDetailVO, tealiumVariable);
    expect(getTealiumDataTest.called);
    tealiumVariable.tealiumData = false;
    getTealiumDataTest = getTealiumData(sKUDetailVO, tealiumVariable);
    expect(getTealiumDataTest.called);
  });

  it('should call getRemoveTealiumData', () => {
    const sKUDetailVO = {};
    const tealiumVariable = {
      productURL: 'qweer',
      price: '123',
      jdaCatId: '908',
      displayTitle: 'cvb',
      ltlShipMethodDesc: true,
      imageURL: 'hjjkk',
      qtyRequested: '2',
      personalisedCode: 'PER',
      tealiumData: {},
    };
    let getRemoveTealiumDataTest = getRemoveTealiumData(
      sKUDetailVO,
      tealiumVariable
    );
    expect(getRemoveTealiumDataTest.called);
    tealiumVariable.tealiumData = false;
    getRemoveTealiumDataTest = getRemoveTealiumData(
      sKUDetailVO,
      tealiumVariable,
      true,
      '23',
      'Wedding',
      '12345'
    );
    expect(getRemoveTealiumDataTest.called);
  });
  it('should call getFavTealiumData', () => {
    const registryId = '78901';
    const eventType = 'BRD';
    let skuInfo = {
      skuId: '123',
      parentProdId: '456',
    };
    let getFavTealiumDataTest = getFavTealiumData(
      registryId,
      eventType,
      skuInfo
    );
    expect(getFavTealiumDataTest.called);
    skuInfo = false;
    getFavTealiumDataTest = getFavTealiumData(registryId, eventType, skuInfo);
    expect(getFavTealiumDataTest.called);
  });
  it('should call updateQuantityData', () => {
    const tealiumData = {};
    const favoriteStore = 'abc';
    const qtyRequested = '2';
    const qtyPurchased = '1';
    const tealiumProductProps = {
      productURL: 'qweer',
      price: '123',
      jdaCatId: '908',
      displayTitle: 'cvb',
      ltlShipMethodDesc: true,
      imageURL: 'hjjkk',
      qtyRequested: '2',
      personalisedCode: 'PER',
    };
    let isupdateQuantityData = updateQuantityData(
      tealiumData,
      favoriteStore,
      qtyRequested,
      qtyPurchased,
      tealiumProductProps
    );
    expect(isupdateQuantityData.called);
    isupdateQuantityData = updateQuantityData(
      false,
      favoriteStore,
      qtyRequested,
      qtyPurchased,
      tealiumProductProps
    );
    expect(isupdateQuantityData.called);
  });

  it('getWritereviewTealiumData: should return tealium data', () => {
    const sKUDetailVO = {};
    const tealiumVariable = {};
    const result = getWritereviewTealiumData(sKUDetailVO, tealiumVariable);

    const expectedResult = {
      link_location_name: 'Registry View Page',
      page_type: 'Registry',
      pagename_breadcrumb: 'Registry View Page',
      product_name: [undefined],
      product_price: [undefined],
      product_quantity: [undefined],
    };
    expect(result).to.deep.equal(expectedResult);
  });
});
