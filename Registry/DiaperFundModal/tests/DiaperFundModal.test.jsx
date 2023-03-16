import React from 'react';
import { shallow, configure } from 'enzyme';
import * as commonUtil from '@bbb-app/utils/common';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { DiaperFundModal, mapDispatchToProps } from '../DiaperFundModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    quickAddItems: null,
    contextPath: '',
    isFetching: false,
    labels: {
      RegistryOwner: {
        referredContent: [{ key: 'first', id: 2345 }],
      },
    },
    maxTileCount: 4,
    regType: 'BRD',
    quickAddItemsForRegType: 'BRD',
    fetchQuickAddItems: sinon.spy(),
    quickAddId: 'RM1001',
    referredContent: {
      content: {},
    },
    getContent: () => {},
  };

  it('should render correctly', () => {
    const tree = shallow(<DiaperFundModal {...props} />);

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when enableCSLabels is true', () => {
    const tree = shallow(<DiaperFundModal {...props} enableCSLabels />);

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should return id getReferredContentID if key found', () => {
    const tree = shallow(<DiaperFundModal {...props} />);
    const key = tree.instance().getReferredContentID('first');
    expect(key).to.equal(2345);
  });

  it('should return blank string getReferredContentID if key found', () => {
    const referredContent = {};
    const tree = shallow(<DiaperFundModal referredContent={referredContent} />);
    const key = tree.instance().getReferredContentID('kkk');
    expect(key).to.equal('');
  });

  it('should call dispatch fetchReferredContent', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.getContent();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('updateDiaperFundProducts', () => {
    const updateDiaperFundProducts = [
      {
        SCENE7_URL: '69638537_imageset',
        DISPLAY_NAME: 'Typically lasts 4 months',
      },
      {
        SCENE7_URL: '69638538_imageset',
        DISPLAY_NAME: 'Typically lasts 8 months',
      },
      {
        SCENE7_URL: '69638539_imageset',
        DISPLAY_NAME: 'Typically lasts 12 months',
      },
    ];
    const referredContent = {};
    const tree = shallow(
      <DiaperFundModal {...props} referredContent={referredContent} />
    );
    const diaperFundProducts = [{}, {}, {}];
    const updatedDiaperFundItems = tree
      .instance()
      .updateDiaperFundProducts(diaperFundProducts);
    expect(updatedDiaperFundItems).to.deep.equal(updateDiaperFundProducts);
  });

  it('updateDiaperFundProducts index greater than 2', () => {
    const updateDiaperFundProducts = [
      {
        SCENE7_URL: '69638537_imageset',
        DISPLAY_NAME: 'Typically lasts 4 months',
      },
      {
        SCENE7_URL: '69638538_imageset',
        DISPLAY_NAME: 'Typically lasts 8 months',
      },
      {
        SCENE7_URL: '69638539_imageset',
        DISPLAY_NAME: 'Typically lasts 12 months',
      },
      {},
    ];
    const referredContent = {};
    const tree = shallow(
      <DiaperFundModal {...props} referredContent={referredContent} />
    );
    const diaperFundProducts = [{}, {}, {}, {}];
    const updatedDiaperFundItems = tree
      .instance()
      .updateDiaperFundProducts(diaperFundProducts);
    expect(updatedDiaperFundItems).to.deep.equal(updateDiaperFundProducts);
  });

  it('updateDiaperFundProducts else', () => {
    const referredContent = {};
    const tree = shallow(
      <DiaperFundModal {...props} referredContent={referredContent} />
    );
    const updatedDiaperFundItems = tree.instance().updateDiaperFundProducts();
    expect(updatedDiaperFundItems).to.deep.equal(undefined);
  });

  it('fetchDiaperFundProductsData', () => {
    const apiResponse = {
      body: {
        serviceStatus: 'SUCCESS',
      },
      response: {
        data: {
          data: [{}, {}],
        },
      },
    };

    const referredContent = {};

    const updateDiaperFundProducts = [
      {
        SCENE7_URL: '69638537_imageset',
        DISPLAY_NAME: 'Typically lasts 4 months',
      },
      {
        SCENE7_URL: '69638538_imageset',
        DISPLAY_NAME: 'Typically lasts 8 months',
      },
    ];
    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const tree = shallow(
      <DiaperFundModal {...props} referredContent={referredContent} />
    );
    tree.instance().fetchDiaperFundProductsData();
    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(tree.instance().state.diaperFundProducts).to.deep.equal(
        updateDiaperFundProducts
      );
    });
  });
  it('should render correctly when isBabyUs is true', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
    const tree = shallow(<DiaperFundModal {...props} isBabyUs />);

    expect(toJson(tree)).to.matchSnapshot();
    commonUtil.getSiteId.restore();
  });

  it('fetchDiaperFundProductsData error', () => {
    const apiResponse = {
      body: {
        serviceStatus: 'ERROR',
      },
      response: {
        data: {
          data: [{}, {}],
        },
      },
    };

    const referredContent = {};
    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const tree = shallow(
      <DiaperFundModal {...props} referredContent={referredContent} />
    );
    tree.instance().fetchDiaperFundProductsData();
    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(tree.instance().state.diaperFundProducts).to.deep.equal([]);
    });
  });

  it('fetchDiaperFundProductsData api catch', () => {
    const apiResponse = {
      body: {
        serviceStatus: 'ERROR',
      },
      response: {
        data: {
          data: [{}, {}],
        },
      },
    };

    const referredContent = {};
    const promise = Promise.reject(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const tree = shallow(
      <DiaperFundModal {...props} referredContent={referredContent} />
    );
    tree.instance().fetchDiaperFundProductsData();
    return promise.catch(error => {
      triggerServerRequestStub.restore();
      expect(error.body.serviceStatus).to.equal('ERROR');
    });
  });
});
