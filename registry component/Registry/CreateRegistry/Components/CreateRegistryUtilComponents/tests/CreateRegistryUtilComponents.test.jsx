import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as util from '@bbb-app/utils/isUserLoggedIn';
import * as commonUtil from '@bbb-app/utils/common';
import {
  renderPersonalInfo,
  renderNetworkInfo,
  renderEventInfo,
  renderOptionalInfo,
  renderContactInfo,
} from '../CreateRegistryUtilComponents';
import RenderFavouriteStoreInfo from '../renderFavouriteStoreInfo';
import RegistryFavoriteStore from '../../../../../../../containers/Pages/Registry/RegistryFavoriteStore/RegistryFavoriteStore';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should call renderPersonalInfo', () => {
    const props = {
      registryInputs: {
        eventType: 'Wedding',
      },
      labels: {},
    };
    const isUserLoggedInStub = sinon.stub(util, 'default').returns(true);

    const wrapper = renderPersonalInfo(props);
    expect(wrapper).to.not.equal(null);

    isUserLoggedInStub.restore();
  });

  it('should call renderNetworkInfo', () => {
    const props = {
      registryInputs: {
        registryInputMap: { networkAffiliation: { displayOnForm: true } },
      },
      labels: {},
      stateObj: {},
    };

    const wrapper = renderNetworkInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderFavouriteStoreInfo', () => {
    const updateStateStub = sinon.spy();
    const props = { updateState: updateStateStub };
    sinon.stub(commonUtil, 'isBedBathCanada').returns(true);
    const wrapper = shallow(<RenderFavouriteStoreInfo {...props} />);

    wrapper
      .find(RegistryFavoriteStore)
      .props()
      .onStoreUpdate();

    expect(props.updateState.called).to.equal(true);
    commonUtil.isBedBathCanada.restore();
  });
  it('should call renderFavouriteStoreInfo else', () => {
    const updateStateStub = sinon.spy();
    const props = { updateState: updateStateStub };
    const wrapper = shallow(<RenderFavouriteStoreInfo {...props} />);

    wrapper
      .find(RegistryFavoriteStore)
      .props()
      .onStoreUpdate();

    expect(props.updateState.called).to.equal(true);
  });
  it('should call renderEventInfo', () => {
    const labels = {};
    const registryInputFields = {
      registryInputMap: { networkAffiliation: { displayOnForm: true } },
    };
    const eventType = 'College/University';
    const wrapper = renderEventInfo(labels, registryInputFields, eventType);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderEventInfo else', () => {
    const labels = {};
    const registryInputFields = {
      registryInputMap: { networkAffiliation: { displayOnForm: true } },
    };
    const props = {
      registryConfig: {
        enableOptionalPanel: false,
      },
    };
    const flagOptional = props.registryConfig.enableOptionalPanel;
    const isBabyRegistry = true;
    const eventType = 'Wedding';
    const wrapper = renderEventInfo(
      labels,
      registryInputFields,
      eventType,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      flagOptional,
      isBabyRegistry
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should call optionalInfo', () => {
    const props = {
      registryInputs: {
        registryInputMap: { networkAffiliation: { displayOnForm: true } },
      },
      labels: {},
      stateObj: {},
    };
    const wrapper = renderOptionalInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call contactInfo', () => {
    const props = {
      registryInputs: {
        registryInputMap: { networkAffiliation: { displayOnForm: true } },
      },
      labels: {},
      stateObj: {},
    };
    const wrapper = renderContactInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call eventInfo for baby registry', () => {
    const labels = {};
    const props = {
      registryConfig: {
        enableOptionalPanel: true,
      },
    };
    const flagOptional = props.registryConfig.enableOptionalPanel;
    const isBabyRegistry = true;
    const registryInputFields = {
      registryInputMap: { networkAffiliation: { displayOnForm: true } },
    };
    const eventType = 'Baby';
    const wrapper = renderEventInfo(
      labels,
      registryInputFields,
      eventType,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      flagOptional,
      isBabyRegistry
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should call eventInfo for wedding registry', () => {
    const labels = {};
    const registryInputFields = {
      registryInputMap: { networkAffiliation: { displayOnForm: true } },
    };
    const props = {
      registryConfig: {
        enableOptionalPanel: false,
      },
    };
    const flagOptional = props.registryConfig.enableOptionalPanel;
    const isBabyRegistry = false;
    const eventType = 'Wedding';
    const wrapper = renderEventInfo(
      labels,
      registryInputFields,
      eventType,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      flagOptional,
      isBabyRegistry
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should get wedding registry heading', () => {
    const props = {
      registryInputs: {
        eventType: 'Baby',
      },
      labels: {},
      eventType: 'Wedding',
    };
    const wrapper = renderPersonalInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should get baby registry heading', () => {
    const props = {
      registryInputs: {
        eventType: 'Baby',
      },
      labels: {},
      eventType: 'baby',
      isBabyRegistry: true,
    };
    const wrapper = renderPersonalInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should display Pack & Hold Section if registry is college', () => {
    const props = {
      registryInputs: {
        eventType: 'College/University',
      },
      labels: {},
      isBabyRegistry: true,
    };
    const tree = shallow(renderPersonalInfo(props));
    expect(tree.find('.packHoldDiv').length).to.equal(1);
  });

  it('should get others registry heading', () => {
    const props = {
      registryInputs: {
        eventType: 'Wedding',
      },
      labels: {},
      eventType: 'Wedding',
    };
    const wrapper = renderPersonalInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should get others registry heading in eventInfo', () => {
    const labels = {};
    const props = {
      registryConfig: {
        enableOptionalPanel: false,
      },
    };
    const flagOptional = props.registryConfig.enableOptionalPanel;
    const registryInputFields = {
      registryInputMap: { networkAffiliation: { displayOnForm: true } },
    };
    const isBabyRegistry = false;
    const eventType = 'Wedding';
    const updateState = {};
    const stateObj = {};
    const channelType = {};
    const wrapper = renderEventInfo(
      labels,
      registryInputFields,
      eventType,
      updateState,
      stateObj,
      channelType,
      false,
      false,
      false,
      false,
      flagOptional,
      isBabyRegistry
    );
    expect(wrapper).to.not.equal(null);
  });

  it('should call contactInfo', () => {
    const props = {
      registryInputs: {
        registryInputMap: { networkAffiliation: { displayOnForm: true } },
      },
      labels: {},
      stateObj: {},
    };
    const wrapper = renderContactInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call contactInfo for baby registry', () => {
    const props = {
      registryInputs: {
        eventType: 'Baby',
        registryInputMap: { networkAffiliation: { displayOnForm: true } },
      },
      labels: {},
      stateObj: {},
      isBabyRegistry: true,
    };
    const wrapper = renderContactInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should render styles fo wedding Registry config key', () => {
    const props = {
      registryInputs: {
        registryInputMap: { networkAffiliation: { displayOnForm: true } },
        eventType: 'Wedding',
      },
      labels: {},
      stateObj: {},
    };
    const wrapper = renderContactInfo(props);
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderNetworkInfo for wedding info', () => {
    const props = {
      registryInputs: {
        registryInputMap: { networkAffiliation: { displayOnForm: true } },
        eventType: 'Wedding',
      },
      labels: {},
      stateObj: {},
    };
    const wrapper = renderNetworkInfo(props);
    expect(wrapper).to.not.equal(null);
  });
});
