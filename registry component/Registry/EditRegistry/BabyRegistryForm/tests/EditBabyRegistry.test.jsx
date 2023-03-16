import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EditBabyRegistry from '../EditBabyRegistry';
import { EDIT_REGISTRY_FORM_DATA_LOCATOR } from './../../../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = { createRegistry: { key: 'value' } };
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
      <EditBabyRegistry
        labels={labels}
        stateObj={{}}
        registryDetails={registryDetails}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        isMobile
        {...defaultProps}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render blank when registryDetails are not present correctly', () => {
    const tree = shallow(
      <EditBabyRegistry
        labels={labels}
        stateObj={{}}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        isMobile
        {...defaultProps}
        enableRBYRFeatureConfig
        isRegistryRBYRIncluded
      />
    );
    expect(tree).to.not.equal(null);
  });
});
