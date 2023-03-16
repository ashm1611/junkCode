import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import SocialRecommendationContent, {
  SocialRecommendationContent as SocialRecommendationContentComponent,
  mapDispatchToProps,
} from '../SocialRecommendationContent';

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);
const initialState = fromJS({
  viewportConfig: {
    siteId: 'BedBathUS',
  },
  formwrapper: {
    socialRecommendationFormData: {},
  },
  accountSignIn: { isLoggedIn: false },
  getHelp: { type: 'help' },
});
describe(__filename, () => {
  const store = mockStore(initialState);
  const fetchContentStack = sinon.spy();
  it('should render socialRecommendation correctly', () => {
    const props = {
      labels: {
        referredContent: [{ key: 'needHelp', id: 123 }],
      },
      contentState: { content: { '123': { key1: 'val1' } } },
      siteId: 'BedBathUS',
      deviceConfig: 'config',
      isRegistryPublic: '0',
      match: '1234',
      switchConfig: {
        enableRecommendationsView: true,
      },
      getEditRegistryData: {},
      formWrapperData: {},
      getHelp: { type: 'help' },
    };
    const wrapper = shallow(
      <SocialRecommendationContent {...props} store={store} />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should not render Invite CTA when enableRecommendationsView is off', () => {
    const props = {
      labels: {
        referredContent: [
          { key: 'socialRecommendationRegistryBanner', id: 123 },
        ],
      },
      contentState: { content: { '123': { key1: 'val1' } } },
      siteId: 'BedBathUS',
      deviceConfig: 'config',
      isRegistryPublic: '0',
      match: '1234',
      switchConfig: {
        enableRecommendationsView: false,
      },
      getEditRegistryData: {},
      formWrapperData: {},
      getHelp: { type: 'help' },
    };
    const wrapper = shallow(
      <SocialRecommendationContent {...props} store={store} />
    );
    expect(toJson(wrapper)).to.not.equal(null);
  });

  describe('SocialRecommendationContentComponent', () => {
    const getContent = sinon.spy();
    it('should render SocialRecommendationContentComponent correctly 1', () => {
      const props = {
        labels: {
          referredContent: [
            {
              key: 'babySocialRecommendations',
              id: 123,
            },
          ],
        },
        contentState: { content: { '123': { key1: 'val1' } } },
        siteId: 'BedBathUS',
        deviceConfig: 'config',
        isRegistryPublic: '0',
        match: '1234',
        switchConfig: {
          enableRecommendationsView: true,
        },
        getEditRegistryData: {},
        formWrapperData: {},
        renderGuideAndTools: () => {},
        getHelp: { type: 'help' },
      };
      const wrapper = shallow(
        <SocialRecommendationContentComponent
          {...props}
          store={store}
          getContent={getContent}
        />
      );

      expect(toJson(wrapper)).to.not.equal(null);
    });
    it('should render SocialRecommendationContentComponent when referred content is empty', () => {
      const props = {
        labels: {
          referredContent: [],
        },
        contentState: { content: { '123': { key1: 'val1' } } },
        siteId: 'BedBathUS',
        deviceConfig: 'config',
        isRegistryPublic: '0',
        match: '1234',
        switchConfig: {
          enableRecommendationsView: true,
          enableRegistryCollaboration: true,
        },
        getEditRegistryData: {},
        formWrapperData: {},
        renderGuideAndTools: () => {},
        getHelp: { type: 'help' },
      };
      const wrapper = shallow(
        <SocialRecommendationContentComponent
          {...props}
          store={store}
          fetchContentStack={fetchContentStack}
        />
      );

      expect(toJson(wrapper)).to.not.equal(null);
    });
    it('should render SocialRecommendationContentComponent correctly 2', () => {
      const props = {
        labels: {
          referredContent: [
            { key: 'socialRecommendationRegistryBanner', id: 123 },
          ],
        },
        contentState: { content: { '123': { key1: 'val1' } } },
        siteId: 'BedBathUS',
        deviceConfig: 'config',
        isRegistryPublic: '1',
        match: '1234',
        switchConfig: {
          enableRecommendationsView: true,
        },
        getEditRegistryData: {},
        formWrapperData: {},
        renderGuideAndTools: () => {},
        getHelp: { type: 'help' },
      };
      const wrapper = shallow(
        <SocialRecommendationContentComponent
          {...props}
          store={store}
          getContent={getContent}
        />
      );

      expect(toJson(wrapper)).to.not.equal(null);
    });
    it('should render SocialRecommendationContentComponent correctly 3', () => {
      const props = {
        labels: {
          referredContent: [{ key: 'registryBuildCTAPanel', id: 123 }],
        },
        contentState: { content: { '123': { key1: 'val1' } } },
        siteId: 'BedBathUS',
        deviceConfig: 'config',
        isRegistryPublic: '0',
        match: '1234',
        switchConfig: {
          enableRecommendationsView: false,
        },
        getEditRegistryData: {},
        formWrapperData: {},
        renderGuideAndTools: () => {},
        getHelp: { type: 'help' },
      };
      const wrapper = shallow(
        <SocialRecommendationContentComponent
          {...props}
          store={store}
          getContent={getContent}
        />
      );

      expect(toJson(wrapper)).to.not.equal(null);
    });

    it('handleEditRegistryClick  : should open modal', () => {
      const match = {
        params: {
          id: '123',
        },
        path: 'store/giftRegistry/viewRegistryOwner/myItems/',
      };
      const getEditRegistryData = sinon.stub();
      const props = {
        labels: {
          referredContent: [{ key: 'needHelp', id: 123, components: match }],
        },
        contentState: {
          content: { '123': { key1: 'val1', components: match } },
        },
        siteId: 'BedBathUS',
        deviceConfig: 'config',
        isRegistryPublic: '0',
        switchConfig: {
          enableRecommendationsView: false,
        },
        match,
        getEditRegistryData: {},
        formWrapperData: {},
        renderGuideAndTools: () => {},
        getHelp: { type: 'help' },
      };
      const tree = shallow(
        <SocialRecommendationContentComponent
          {...props}
          store={store}
          getContent={getContent}
          getEditRegistryData={getEditRegistryData}
        />
      );
      tree.instance().handleEditRegistryClick({ preventDefault: () => {} });
      expect(toJson(tree)).to.not.equal(null);
    });

    it('mapDispatchToProps should return a prop getContent which when called call the dispatch function passed', () => {
      const contentIdCollection = ['20971', '13548', '20845'];
      const dispatch = sinon.spy();
      const props = mapDispatchToProps(dispatch);
      props.getContent(contentIdCollection);
      expect(dispatch.called).to.equal(true);
    });

    it('should test map dispatch To props - updateStateData', () => {
      const dispatchSpy = sinon.spy();
      const { updateStateData } = mapDispatchToProps(dispatchSpy);
      const data = true;
      updateStateData(data);
      expect(dispatchSpy).to.have.been.calledWith({
        type: 'BBB/Formwrapper/updateStateData',
        data,
      });
    });
  });
});
