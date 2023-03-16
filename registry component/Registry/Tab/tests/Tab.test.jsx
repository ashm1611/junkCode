import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { LocalStorageUtil } from '@bbb-app/utils/localStorage';
import {
  NON_CROSSELL_PAGE,
  NON_CROSSELL_PRODUCT,
  FEO_SITE_INDICATOR,
  NON_SEARCH,
  NON_INTERNAL_CAMPAIGN,
  NON_BROWSE,
  PAGE_NAME_RECOMMENDATION_TEALIUM,
  PAGE_FUNCTION_RECOMMENDATION_TEALIUM,
  NAVIGATION_PATH_RECOMMENDATION_TEALIUM,
  SUB_NAVIGATION_PATH_RECOMMENDATION_TEALIUM,
} from '@bbb-app/tealium/constants';
import Tab from '../Tab';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const location = {
    pathname: '/store/giftRegistry/viewRegistryOwner/home/:id?',
  };
  const switchConfig = {
    enableRecommendationsView: true,
    enableRecommendationTab: false,
    BRD_enableRecommendationTab: true,
  };

  it('should render correctly', () => {
    const match = {
      path: '/store/giftRegistry/viewRegistryOwner/home/:id?',
    };

    const isMobile = false;
    const labels = { registryDetails: {} };
    const navLables = {
      weddingRegistryLabel: 'Wedding',
      myItemLabel: 'My Item',
      thankYouListLabel: 'Thank You',
      getRecommendationLabel: 'Recommendation',
    };
    const selectLabels = [
      navLables.weddingRegistryLabel,
      navLables.myItemLabel,
      navLables.thankYouListLabel,
      navLables.getRecommendationLabel,
    ];
    const registryData = {
      recommendationCount: [2, 3],
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'firstname',
          coRegistrantLastName: 'coownerlastname',
          eventYetToCome: true,
        },
      },
    };

    const tree = shallow(
      <Tab
        isMobile={isMobile}
        labels={labels}
        selectLabels={selectLabels}
        match={match}
        location={location}
        switchConfig={switchConfig}
        registryData={registryData}
        eventTypeName="BRD"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call componentWillReceiveProps for myItems tab', () => {
    const nextProps = {
      location: {
        pathname: '/store/giftRegistry/viewRegistryOwner/myItems/:id?',
      },
    };

    const location1 = {
      pathname: '/store/giftRegistry/viewRegistryOwner/myItems/:id?',
    };

    const labels = { registryDetails: {} };
    const navLables = {
      weddingRegistryLabel: 'Wedding',
      myItemLabel: 'My Item',
      thankYouListLabel: 'Thank You',
      getRecommendationLabel: 'Recommendation',
    };
    const selectLabels = [
      navLables.weddingRegistryLabel,
      navLables.myItemLabel,
      navLables.thankYouListLabel,
      navLables.getRecommendationLabel,
    ];
    const registryData = {
      recommendationCount: [2, 3],
    };
    const match = {
      path: '/store/giftRegistry/viewRegistryOwner/home/:id?',
    };
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        selectLabels={selectLabels}
        match={match}
        location={location1}
        switchConfig={switchConfig}
        registryData={registryData}
      />
    );
    tree.instance().componentWillReceiveProps(nextProps);
    const spy = sinon.spy(tree.instance(), 'handleUrlSelection');
    expect(spy.called);
  });

  it('should call componentWillReceiveProps for tym tab', () => {
    const nextProps = {
      location: {
        pathname: '/store/giftRegistry/viewRegistryOwner/tym/:id?',
      },
    };
    const labels = { registryDetails: {} };
    const navLables = {
      weddingRegistryLabel: 'Wedding',
      myItemLabel: 'My Item',
      thankYouListLabel: 'Thank You',
      getRecommendationLabel: 'Recommendation',
    };
    const selectLabels = [
      navLables.weddingRegistryLabel,
      navLables.myItemLabel,
      navLables.thankYouListLabel,
      navLables.getRecommendationLabel,
    ];
    const registryData = {
      recommendationCount: [2, 3],
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'firstname',
          coRegistrantLastName: 'coownerlastname',
          eventYetToCome: true,
        },
      },
    };
    const match = {
      path: '/store/giftRegistry/viewRegistryOwner/home/:id?',
    };
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        selectLabels={selectLabels}
        match={match}
        location={location}
        switchConfig={switchConfig}
        registryData={registryData}
      />
    );
    tree.setProps({ enableTab: true, eventTypeName: 'BRD' });
    tree.instance().componentWillReceiveProps(nextProps);
    const spy = sinon.spy(tree.instance(), 'handleUrlSelection');
    expect(spy.called);

    tree.setProps({ enableTab: true, eventTypeName: undefined });
    tree.instance().componentWillReceiveProps(nextProps);
    expect(spy.called);
  });

  it('should call handleStateChange with enableRecommendationTab as true', () => {
    const labels = {
      mainNavigationLabels: {
        registryDetails: {
          myItemLabel: 'myItems',
          thankYouListLabel: '',
          getRecommendationLabel: '',
        },
      },
    };
    const registryData = {
      registryResVO: { registrySummaryVO: { eventYetToCome: false } },
      recommendationCount: [2, 3],
    };
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        location={location}
        registryData={registryData}
        switchConfig={switchConfig}
        eventTypeName="BRD"
        eventType="Wedding"
        registryId="12334456"
        enableRecommendationTab
      />
    );
    tree.instance().handleStateChange('state', 'My Items');
    const spy = sinon.spy(tree.instance(), 'handleTealiumCTA');
    expect(spy.called);
  });

  it('should call handleStateChange with enableRecommendationTab as false', () => {
    const labels = {
      mainNavigationLabels: {
        registryDetails: {
          myItemLabel: 'myItems',
          thankYouListLabel: '',
          getRecommendationLabel: '',
        },
      },
    };
    const registryData = {
      registryResVO: { registrySummaryVO: { eventYetToCome: false } },
      recommendationCount: [2, 3],
    };
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        location={location}
        registryData={registryData}
        switchConfig={switchConfig}
        eventTypeName="BRD"
        eventType="Wedding"
        registryId="12334456"
        enableRecommendationTab={false}
      />
    );
    tree.instance().handleStateChange('state', 'My Items');
    expect(tree.instance().state.state).to.equal('state');
  });

  it('Should call handleTabClick', () => {
    const item = {
      label: 'abc',
      tabUrl: 'viewRegistryOwner/home',
    };
    const labels = { registryDetails: {} };
    const switchConfig1 = {
      enableRecommendationsView: false,
    };
    const handleTabClickCallback = sinon.spy();
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        location={{
          pathname: '/store/giftRegistry/viewRegistryOwner/recommendation/:id?',
        }}
        handleTabClickCallback={handleTabClickCallback}
        switchConfig={switchConfig1}
      />
    );
    tree.instance().handleTabClick(item);
    const spy = sinon.spy(tree.instance(), 'handleSelection');
    expect(spy.called);
  });
  it('Should call handleTealiumCTA', () => {
    const item = {
      label: 'abc',
      tabUrl: 'viewRegistryOwner/home',
    };
    const labels = { registryDetails: {} };
    const switchConfig1 = {
      enableRecommendationsView: false,
    };
    const storageUtil = new LocalStorageUtil(true);
    storageUtil.saveItem('isRfTrackerEventSent', false);
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        location={{
          pathname: '/store/giftRegistry/viewRegistryOwner/recommendation/:id?',
        }}
        switchConfig={switchConfig1}
        rfTrackerEventSent
        fireTealiumAction={() => {}}
      />
    );
    tree.instance().handleTealiumCTA(item.label, item.tabUrl);
    expect(tree.instance().props.fireTealiumAction.called).to.equal(undefined);
  });

  it('Should call handleTealiumCTA with updatedValue empty', () => {
    const item = {
      label: 'abc',
      tabUrl: 'viewRegistryOwner/home',
    };
    const labels = { registryDetails: {} };
    const switchConfig1 = {
      enableRecommendationsView: false,
    };
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        location={{
          pathname: '/store/giftRegistry/viewRegistryOwner/recommendation/:id?',
        }}
        switchConfig={switchConfig1}
        rfTrackerEventSent
        fireTealiumAction={() => {}}
      />
    );
    tree.instance().handleTealiumCTA('', item.tabUrl);
    expect(tree.instance().props.fireTealiumAction.called).to.equal(undefined);
  });

  it('Should call handleSelection', () => {
    const propObj = {
      location: {
        pathname: '/abc',
      },
    };
    const labels = { registryDetails: {} };
    const switchConfig1 = {
      enableRecommendationsView: false,
    };
    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        location={{
          pathname: '/store/giftRegistry/viewRegistryOwner/recommendation/:id?',
        }}
        switchConfig={switchConfig1}
        rfTrackerEventSent={false}
        fireTealiumAction={() => {}}
      />
    );
    const spy = sinon.spy(tree.instance(), 'handleSelection');
    tree.instance().handleUrlSelection(propObj);
    expect(spy.called);
  });

  it('on click call handleTabClick', () => {
    const labels = { registryDetails: {} };
    const switchConfig1 = {
      enableRecommendationsView: false,
    };
    const handleTabClickCallback = sinon.spy();
    const tree = shallow(
      <Tab
        isMobile={false}
        labels={labels}
        handleTabClickCallback={handleTabClickCallback}
        location={{
          pathname: '/store/giftRegistry/viewRegistryOwner/recommendation/:id?',
        }}
        switchConfig={switchConfig1}
        rfTrackerEventSent={false}
        fireTealiumAction={() => {}}
      />
    );
    const spy = sinon.spy(tree.instance(), 'handleTabClick');
    tree
      .find(PrimaryLink)
      .first()
      .simulate('click');
    expect(spy.called);
  });

  it('on click handleTabClick handleTealiumCTA should be called for recommendation tab', () => {
    const item = {
      label: 'abc',
      tabUrl: 'store/giftRegistry/viewRegistryOwner/recommendation/520760258',
    };
    const pageName = PAGE_NAME_RECOMMENDATION_TEALIUM;
    const pageFunction = PAGE_FUNCTION_RECOMMENDATION_TEALIUM;
    const navigationPath = NAVIGATION_PATH_RECOMMENDATION_TEALIUM;
    const subNavigationPath = SUB_NAVIGATION_PATH_RECOMMENDATION_TEALIUM;
    const CHANNEL = 'Registry';
    const CALL_TO_ACTIONTYPE = 'registry tab click';
    const REGISTRY = 'Registry';
    const tealiumObj = {
      content_pagetype: '',
      product_pagetype: '',
      pagename_breadcrumb: pageName,
      channel: CHANNEL,
      call_to_actiontype: CALL_TO_ACTIONTYPE,
      crossell_page: NON_CROSSELL_PAGE,
      crossell_product: NON_CROSSELL_PRODUCT,
      feo_site_indicator: FEO_SITE_INDICATOR,
      internal_search_term: NON_SEARCH,
      registry_id: '',
      registry_type: '',
      registry_tab_name: '',
      product_finding_method: `${REGISTRY} ${''}`,
      internal_campaign: NON_INTERNAL_CAMPAIGN,
      merchandising_main_level: NON_BROWSE,
      merchandising_category: NON_BROWSE,
      merchandising_subcategory: NON_BROWSE,
      RF_Tracker: false,
      product_id: ' ',
      page_function: pageFunction,
      navigation_path: navigationPath,
      subnavigation_path: subNavigationPath,
    };

    const labels = { registryDetails: {} };
    const switchConfig1 = {
      enableRecommendationsView: false,
    };

    const tree = shallow(
      <Tab
        isMobile
        labels={labels}
        location={{
          pathname:
            'store/giftRegistry/viewRegistryOwner/recommendation/520760258',
        }}
        switchConfig={switchConfig1}
        rfTrackerEventSent
        fireTealiumAction={() => {}}
        tealiumObj={tealiumObj}
      />
    );
    tree.instance().handleTealiumCTA(item.label, item.tabUrl);
    expect(tree.instance().props.fireTealiumAction.called);
  });
});
