import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import * as groupByUtil from '@bbb-app/utils/groupBy';
import { RegistryDetailModalRecommendation } from '../RegistryDetailModalRecommendation';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    labels: {
      noOfItems: '30',
      topRegistryItems: 'Top Registry Items',
    },
    registryId: '12345',
    registryModalData: { itemType: 'CSH' },
  };

  it('RegistryDetailModalRecommendation on api error', () => {
    const apiResponse = {
      body: {
        fusion: {
          serviceStatus: 'ERROR',
        },
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const tree = shallow(<RegistryDetailModalRecommendation {...props} />);

    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(tree.instance().state.data).to.deep.equal([]);
    });
  });

  it('RegistryDetailModalRecommendation on api success', () => {
    const apiResponse = {
      body: {
        fusion: {
          serviceStatus: 'SUCCESS',
          AddToCart_rr: [{}, {}],
        },
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    const tree = shallow(<RegistryDetailModalRecommendation {...props} />);

    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(tree.instance().state.data).to.be.an('array');
    });
  });

  it('RegistryDetailModalRecommendation should call api when groupBy is enable', () => {
    const isGroupbyActiveStub = sinon
      .stub(groupByUtil, 'isGroupbyActive')
      .returns(true);

    const apiResponse = {
      response: {
        data: {
          products: [
            { CUSTOMIZATION_OFFERED_FLAG: [] },
            { CUSTOMIZATION_OFFERED_FLAG: ['No'] },
          ],
        },
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);

    const tree = shallow(
      <RegistryDetailModalRecommendation {...props} isGroupByRecommendation />
    );
    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(tree.instance().state.data).to.be.an('array');
      isGroupbyActiveStub.restore();
    });
  });

  it('RegistryDetailModalRecommendation should render correctly with different regType', () => {
    const otherProps = {
      regType: 'baby',
      pageName: 'RegistryOwnerHome',
    };
    const apiResponse = {
      body: {
        fusion: {
          serviceStatus: 'PARTIAL-ERROR',
        },
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);

    const tree = shallow(
      <RegistryDetailModalRecommendation {...props} {...otherProps} />
    );

    return promise.then(() => {
      triggerServerRequestStub.restore();
      expect(tree.props().regType).to.not.equal('wedding');
    });
  });

  it('RegistryDetailModalRecommendation should return null', () => {
    const registryProductInfo = { displayNotifyRegistrantMsg: 'N' };
    const apiResponse = {
      body: {
        fusion: {
          serviceStatus: 'ERROR',
        },
      },
    };

    const promise = Promise.reject(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);

    const tree = shallow(
      <RegistryDetailModalRecommendation
        {...props}
        registryProductInfo={registryProductInfo}
      />
    );
    return promise.catch(e => {
      expect(e.body.fusion.serviceStatus).to.equal('ERROR');
      expect(tree).to.be.an('Object');
      triggerServerRequestStub.restore();
    });
  });
});
