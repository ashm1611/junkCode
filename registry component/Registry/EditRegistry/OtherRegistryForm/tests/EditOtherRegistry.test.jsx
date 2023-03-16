import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EditOtherRegistry from '../EditOtherRegistry';
import { EDIT_REGISTRY_FORM_DATA_LOCATOR } from './../../../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';
import { eventTypeConst } from './../../../CreateRegistry/CreateRegistryUtils';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = { test: 'value' };
  const defaultProps = {
    registrySiteConfig: {
      enableDeleteRegistryFeature: true,
    },
    isNewCreateRegForm: true,
  };

  it('should render correctly', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: { registrySummaryVO: { groupGiftingEnable: true } },
    };
    const tree = shallow(
      <EditOtherRegistry
        stateObj={{}}
        labels={labels}
        enableRBYRFeatureConfig
        isRegistryRBYRIncluded
        eventType={eventTypeConst.HOUSEWARMING}
        registryDetails={registryDetails}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        {...defaultProps}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when event type is COMMITMENT', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: { registrySummaryVO: { groupGiftingEnable: true } },
    };
    const tree = shallow(
      <EditOtherRegistry
        stateObj={{}}
        labels={labels}
        enableRBYRFeatureConfig
        isRegistryRBYRIncluded
        eventType={eventTypeConst.COMMITMENT}
        registryDetails={registryDetails}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        {...defaultProps}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when event type is COLLEGE', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: { registrySummaryVO: { groupGiftingEnable: true } },
    };
    const tree = shallow(
      <EditOtherRegistry
        stateObj={{}}
        labels={labels}
        enableRBYRFeatureConfig
        isRegistryRBYRIncluded
        eventType={eventTypeConst.COLLEGE}
        registryDetails={registryDetails}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        {...defaultProps}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render blanck when registryDetails are not present correctly', () => {
    const tree = shallow(
      <EditOtherRegistry
        stateObj={{}}
        labels={labels}
        enableRBYRFeatureConfig
        isRegistryRBYRIncluded
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        isMobile
        {...defaultProps}
      />
    );
    expect(tree).to.not.equal(null);
  });
});
