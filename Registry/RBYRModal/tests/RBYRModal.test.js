import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import serviceUtil from '@bbb-app/utils/serviceUtil';
import { RBYRModal, mapDispatchToProps } from '../RBYRModal';
import * as submitRegistryData from '../../../../Pages/Registry/EditRegistry/EditRegistryConfig';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const props = {
    rbyrLabels: {
      referredContent: [
        {
          id: '7728',
          key: 'cashfundworks',
        },
        {
          id: '5534',
          key: 'txt_coupon_cashier_instruction',
        },
      ],
    },
  };
  it('should render RBYRModal correctly', () => {
    const tree = shallow(<RBYRModal />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render RBYRModal correctly with props', () => {
    const tree = shallow(<RBYRModal {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
describe('RBYRModal: should dispatch actions', () => {
  const dispatch = sinon.stub();
  it('should call dispatch updateRBYR', () => {
    const props = mapDispatchToProps(dispatch);
    const isOptIn = true;
    props.updateRBYR(isOptIn);
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch clearEditRegistryData', () => {
    const props = mapDispatchToProps(dispatch);
    props.clearEditRegistryData();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
});
describe(__filename, () => {
  /* eslint no-unused-expressions: 0 */
  let triggerServerRequestStub;
  const defaultProps = {
    registryDetailsData: {
      registryResVO: {
        registryVO: {
          shipping: {
            shippingAddress: {
              addressLine1: 'asdc',
            },
            futureshippingAddress: {
              addressLine1: 'aswe',
            },
          },
          primaryRegistrant: {
            contactAddress: {
              addressLine1: '',
            },
            primaryPhone: '',
            firstName: '',
          },
          event: {
            babyGender: 'F',
          },
          coRegistrant: {
            firstName: '',
          },
        },
        registrySummaryVO: {
          futureShippingDate: '',
        },
      },
    },
    eventTypeCode: 'BRD',
    registryId: '123456',
    eventType: '',
    registryDetails: {
      registryResVO: {
        registryVO: {
          shipping: {
            shippingAddress: {
              addressLine1: 'asdc',
            },
            futureshippingAddress: {
              addressLine1: 'aswe',
            },
          },
          primaryRegistrant: {
            contactAddress: {
              addressLine1: '',
            },
            primaryPhone: '',
            firstName: '',
          },
          event: {
            babyGender: 'F',
          },
          coRegistrant: {
            firstName: '',
          },
        },
        registrySummaryVO: {
          futureShippingDate: '',
        },
      },
    },
    clearEditRegistryData: sinon.stub(),
    updateRBYR: sinon.stub(),
    handleLearnMoreClick: sinon.stub(),
  };
  beforeEach(() => {
    const data = {
      body: {
        serviceStatus: 'SUCCESS',
        response: {
          data: {
            errorMessages: ['some error'],
          },
        },
      },
    };
    triggerServerRequestStub = sinon
      .stub(serviceUtil, 'triggerServerRequest')
      .resolves(data);
  });
  afterEach(() => {
    triggerServerRequestStub.restore();
  });
  it('should call saveOptInDetailsFromTipsModule without registryDetails props', () => {
    const props = {
      registryDetailsData: {
        registryResVO: {
          registryVO: {
            shipping: {
              shippingAddress: {
                addressLine1: '',
              },
              futureshippingAddress: {
                addressLine1: '',
              },
            },
            primaryRegistrant: {
              contactAddress: {
                addressLine1: '',
              },
              primaryPhone: '',
              firstName: '',
            },
            event: {
              babyGender: 'F',
            },
            coRegistrant: {
              firstName: '',
            },
          },
          registrySummaryVO: {
            futureShippingDate: '',
          },
        },
      },
      eventTypeCode: 'BRD',
      registryId: '123456',
      eventType: '',
    };
    const wrapper = shallow(<RBYRModal {...props} />);
    wrapper.instance().saveOptInDetailsFromTipsModule(true);
  });
  it('should call saveOptInDetailsFromTipsModule with registryDetails props', async () => {
    const wrapper = shallow(<RBYRModal {...defaultProps} />);
    wrapper.setState({ SuccessOptInMod: false });
    wrapper.instance().saveOptInDetailsFromTipsModule(true);
    setImmediate(() => {
      // <-- that solves async setState in componentDidMount
      Promise.resolve();
      wrapper.update();
      expect(wrapper.state('SuccessOptInMod')).to.be.equal(true);
    });
  });
  // exception case must be written in last of describe block and followed to async function
  it('should call saveOptInDetailsFromTipsModule with exception', () => {
    // it will not be restored, because it got wrapped.
    sinon.stub(submitRegistryData, 'submitRegistryData').returns(undefined);
    const wrapper = shallow(<RBYRModal {...defaultProps} />);
    wrapper.setState({ SuccessOptInMod: false });
    wrapper.instance().saveOptInDetailsFromTipsModule(undefined);
    expect(wrapper.state('SuccessOptInMod')).to.be.equal(false);
  });
});
