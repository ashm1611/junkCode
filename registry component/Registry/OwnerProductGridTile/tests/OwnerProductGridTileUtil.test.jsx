import { configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import consoleLog from '@bbb-app/utils/logger';
import {
  OwnerProductGridTileUtil,
  getPDPURL,
  getFilterCount,
} from '../OwnerProductGridTileUtil';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should log handleSagaError', () => {
    const error = {
      body: {
        response: {
          data: {
            errorMessages: [
              {
                message: 'Test',
              },
            ],
          },
        },
      },
    };
    const consoleLogStub = sinon.stub(consoleLog, 'error').returns(true);
    OwnerProductGridTileUtil.handleSagaError(error);
    // eslint-disable-next-line no-unused-expressions
    expect(consoleLog.error).to.be.called;
    consoleLogStub.restore();
  });

  it('isAddToCartDisable should return true', () => {
    const isAddToCartDisable = OwnerProductGridTileUtil.isAddToCartDisable(
      false,
      '5',
      false,
      true
    );
    expect(isAddToCartDisable).to.equal(true);
  });

  it('isAddToCartDisable should return false', () => {
    const isAddToCartDisable = OwnerProductGridTileUtil.isAddToCartDisable(
      false,
      '5',
      true
    );
    expect(isAddToCartDisable).to.equal(false);
  });

  it('getPDPURL: should return url', () => {
    const propsObj = { productURL: 'productURL?skuId=123' };
    const url = getPDPURL(propsObj, {});
    expect(url).to.be.equal(
      'undefinedproductURL?skuId=123&registryId=undefined'
    );
  });

  it('getFilterCount: should return count', () => {
    const propsObj = {
      registryOwnerFirstCategoryList: { categoryBuckets: [] },
    };
    const count = getFilterCount(propsObj);
    expect(count).to.be.equal(0);
  });
});
