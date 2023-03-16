import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EditWeddingRegistry from '../EditWeddingRegistry';
import { EDIT_REGISTRY_FORM_DATA_LOCATOR } from './../../../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = { test: 'value' };
  const defaultProps = {
    registrySiteConfig: {
      enableDeleteRegistryFeature: true,
    },
  };

  it('should render correctly', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: { registrySummaryVO: { groupGiftingEnable: true } },
    };
    const tree = shallow(
      <EditWeddingRegistry
        stateObj={{}}
        labels={labels}
        enableRBYRFeatureConfig
        isRegistryRBYRIncluded
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        registryDetails={registryDetails}
        {...defaultProps}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render blanck when registryDetails are not present correctly', () => {
    const tree = shallow(
      <EditWeddingRegistry
        stateObj={{}}
        labels={labels}
        enableRBYRFeatureConfig
        isRegistryRBYRIncluded
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        isMobile
        {...defaultProps}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
