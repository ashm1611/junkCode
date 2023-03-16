import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import NewRegistryHeaderLayout from '../NewRegistryHeaderLayout';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    isPreviewYrReg: true,
    isMobile: false,
    signInDetails: {},
    eventType: 'Baby',
    labels: {},
    isFetchingEditRegistryDetails: true,
    registryConfig: {},
    coRegProfileStatus: {},
    dynamicContentState: {},
    closeModalFlag: true,
    editModalError: true,
    accountAddress: {},
    openEditRegistryModal: true,
    eventTypeCode: 'BRB',
    loginLabels: {},
  };

  it('is component rendered', () => {
    const registryDetails = {
      giftGiver: false,
      registryVO: {
        isPublic: true,
      },
    };
    const tree = shallow(
      <NewRegistryHeaderLayout {...props} registryDetails={registryDetails} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should not render RenderEditRegistryLink if giftGiver is null', () => {
    const registryDetails = { giftGiver: true };
    const tree = shallow(
      <NewRegistryHeaderLayout {...props} registryDetails={registryDetails} />
    );
    expect(tree.find('RenderEditRegistryLink').isEmpty()).to.equal(true);
  });

  it('should render RenderEditRegistryLink if giftGiver not null', () => {
    const registryDetails = { giftGiver: false };
    const tree = shallow(
      <NewRegistryHeaderLayout {...props} registryDetails={registryDetails} />
    );
    expect(tree.find('RenderEditRegistryLink')).to.not.equal(null);
  });
});
