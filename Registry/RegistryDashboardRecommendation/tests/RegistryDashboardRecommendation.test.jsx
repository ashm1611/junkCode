import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { RegistryDashboardRecommendation } from '../RegistryDashboardRecommendation';
import { REG_TYPE } from '../constants';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    labels: {
      noOfItems: '30',
      topRegistryItems: 'Top Registry Items',
    },
    registryId: '12345',
  };
  it('RegistryDashboardRecommendation should render correctly with regType equal to wedding', () => {
    const tree = shallow(
      <RegistryDashboardRecommendation {...props} regType={REG_TYPE} />
    );
    expect(tree.props().regType).to.equal(REG_TYPE);
  });
  it('RegistryDashboardRecommendation should render correctly with different regType', () => {
    const otherProps = {
      regType: 'baby',
      pageName: 'RegistryOwnerHome',
    };
    const tree = shallow(
      <RegistryDashboardRecommendation {...props} {...otherProps} />
    );

    expect(tree.props().regType).to.not.equal('wedding');
  });
  it('RegistryDashboardRecommendation should render correctly without regType', () => {
    const tree = shallow(<RegistryDashboardRecommendation {...props} />);
    expect(tree.props().regType).to.equal(undefined);
  });
  it('RegistryDashboardRecommendation should render correctly for success response of triggerServerRequest', async () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => {
        return new Promise(
          resolve => {
            const apiResponse = {
              body: {
                fusion: {
                  serviceStatus: 'SUCCESS',
                  response: {
                    navText: 'abc',
                  },
                },
              },
            };
            resolve(apiResponse);
          },
          () => {}
        );
      });
    const tree = shallow(
      <RegistryDashboardRecommendation {...props} regType={'BRD'} />
    );
    await tree.instance().componentDidMount();
    expect(tree.state('data')).to.be.a('object');
    triggerServerRequestStub.restore();
  });
  it('RegistryDashboardRecommendation should render correctly for error response of triggerServerRequest', async () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => {
        return new Promise(
          resolve => {
            const apiResponse = {
              body: {
                fusion: {
                  serviceStatus: 'ERROR',
                  response: {
                    navText: 'abc',
                  },
                },
              },
            };
            resolve(apiResponse);
          },
          () => {}
        );
      });
    const tree = shallow(
      <RegistryDashboardRecommendation {...props} regType={'BRD'} />
    );
    await tree.instance().componentDidMount();
    expect(typeof tree.state('data')).to.be.equal('object');
    triggerServerRequestStub.restore();
  });
  it('RegistryDashboardRecommendation should render correctly for reject promise of triggerServerRequest', async () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => {
        return new Promise(
          reject => {
            const apiResponse = {
              body: {
                fusion: {
                  serviceStatus: 'ERROR',
                  response: {
                    navText: 'abc',
                  },
                },
              },
            };
            reject(apiResponse);
          },
          () => {}
        );
      });
    const tree = shallow(
      <RegistryDashboardRecommendation {...props} regType={'BRD'} />
    );
    await tree.instance().componentDidMount();
    expect(typeof tree.state('data')).to.be.equal('object');
    triggerServerRequestStub.restore();
  });
  it('RegistryDashboardRecommendation should render correctly for catch block', () => {
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => null);
    const tree = shallow(
      <RegistryDashboardRecommendation {...props} regType={'BRD'} />
    );
    tree.instance().componentDidMount();
    expect(typeof tree.state('data')).to.be.equal('object');
    triggerServerRequestStub.restore();
  });
});
