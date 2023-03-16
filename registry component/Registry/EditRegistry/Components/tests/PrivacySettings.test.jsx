import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import PrivacySettings from './../PrivacySettings';
import { EDIT_REGISTRY_FORM_DATA_LOCATOR } from './../../../../../../containers/Pages/Registry/EditRegistry/datalocatorConstants';

describe(__filename, () => {
  const defaultProps = {
    dynamicContentState: {
      content: {
        '5151': {
          body: 'This is test data',
        },
      },
    },
    deactivateRegistryContentId: '5151',
    enableDeleteRegistryFeature: true,
  };
  it('should render correctly', () => {
    const registryDetails = { test: 'value' };
    const stateObj = {
      registryVO: {},
      eventVO: { guestCount: 1 },
      registrySummaryVO: {
        primaryRegistrant: { contactAddress: { addressLine1: '' } },
      },
    };
    const tree = shallow(
      <PrivacySettings
        registryDetails={registryDetails}
        labels={{ test: 'key' }}
        stateObj={stateObj}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        {...defaultProps}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should update state  isPublic: 1', () => {
    const registryDetails = { test: 'value' };
    const updateState = sinon.stub();
    const stateObj = {
      registryVO: {},
      isPublic: '1',
      eventVO: { guestCount: 1 },
      registrySummaryVO: {
        primaryRegistrant: { contactAddress: { addressLine1: '' } },
      },
    };
    const tree = shallow(
      <PrivacySettings
        registryDetails={registryDetails}
        labels={{ test: 'key' }}
        stateObj={stateObj}
        updateState={updateState}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        {...defaultProps}
      />
    );
    tree.instance().handleChange();
    expect(updateState).to.have.been.calledWith({ isPublic: '0' });
  });
  it('should update state isPublic: 0  ', () => {
    const registryDetails = { test: 'value' };
    const updateState = sinon.stub();
    const stateObj = {
      registryVO: {},
      isPublic: '0',
      eventVO: { guestCount: 1 },
      registrySummaryVO: {
        primaryRegistrant: { contactAddress: { addressLine1: '' } },
      },
    };
    const tree = shallow(
      <PrivacySettings
        registryDetails={registryDetails}
        labels={{ test: 'key' }}
        stateObj={stateObj}
        updateState={updateState}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        {...defaultProps}
      />
    );
    tree.instance().handleChange();
    expect(updateState).to.have.been.calledWith({ isPublic: '1' });
  });
  it('should render deactivate modal', () => {
    const registryDetails = { test: 'value' };
    const updateState = sinon.stub();
    const stateObj = {
      registryVO: {},
      isPublic: '0',
      eventVO: { guestCount: 1 },
      registrySummaryVO: {
        primaryRegistrant: { contactAddress: { addressLine1: '' } },
      },
    };
    const tree = shallow(
      <PrivacySettings
        registryDetails={registryDetails}
        labels={{ test: 'key' }}
        stateObj={stateObj}
        updateState={updateState}
        dataLocator={EDIT_REGISTRY_FORM_DATA_LOCATOR}
        enableDeleteRegistryFeature
      />
    );
    tree.setState({ deactivateRegModalState: true });
    tree.instance().openDeactivateRegModal();
    tree.instance().toggleDeactivateRegModal();
  });
});
