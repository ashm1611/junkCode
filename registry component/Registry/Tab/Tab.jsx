import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';
import { isBrowser } from '@bbb-app/utils/common';
import { LocalStorageUtil } from '@bbb-app/utils/localStorage';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import FormInput from '@bbb-app/forms/components/FormInput';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
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
import {
  ROUTE_REGISTRY_OWNER_HOME,
  ROUTE_REGISTRY_OWNNER,
  ROUTE_REGISTRY_OWNER_RECOMMENDATION,
  ROUTE_REGISTRY_OWNER_TYM,
} from '@bbb-app/constants/route/route';
import {
  THANK_YOU_LIST_TAB_LBL,
  REGISTRY_HOME_LBL,
  GET_RECOMMENDATION_LBL,
  MY_ITEM_LBL,
} from '../constants';

import styles from './Tab.css';

/**
 * This renders the tabs for registry owner view
 *
 * @param { boolean } isMobile check for mobile device
 */

class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      URLs: {
        registryHomeURL: ROUTE_REGISTRY_OWNER_HOME.replace(
          ':id?',
          this.props.registryId
        ),
        tymURL: ROUTE_REGISTRY_OWNER_TYM.replace(':id?', this.props.registryId),
        myItemsURL: ROUTE_REGISTRY_OWNNER.replace(
          ':id?',
          this.props.registryId
        ),
        socialRecommendationURL: ROUTE_REGISTRY_OWNER_RECOMMENDATION.replace(
          ':id?',
          this.props.registryId
        ),
      },
      mobileNavigationTo: '',
      id: '',
    };

    this.handleStateChange = this.handleStateChange.bind(this, 'registry-name');
    this.handleUrlSelection = this.handleUrlSelection.bind(this);
    this.handleTealiumCTA = this.handleTealiumCTA.bind(this);
    this.localStorageUtil = new LocalStorageUtil(isBrowser());
  }

  componentDidMount() {
    this.handleUrlSelection(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const currentUrl = nextProps.location.pathname;
    const previousUrl = this.props.location.pathname;
    if (previousUrl !== currentUrl) {
      this.handleUrlSelection(nextProps);
    }
  }

  handleUrlSelection(propObj) {
    const currentUrl = propObj.location.pathname;
    const eventType = propObj.eventType;
    const firstTab = `${eventType} ${REGISTRY_HOME_LBL}`;
    if (currentUrl.includes('home')) {
      this.handleSelection(firstTab, 0);
    } else if (currentUrl.includes('myItems', 1)) {
      this.handleSelection(MY_ITEM_LBL);
    } else if (currentUrl.includes('tym', 2)) {
      this.handleSelection(THANK_YOU_LIST_TAB_LBL);
    } else if (currentUrl.includes('recommendation')) {
      this.handleSelection(GET_RECOMMENDATION_LBL, 3);
    }
  }

  handleTealiumCTA(updatedValue, tabURL) {
    const {
      eventType,
      registryId,
      fireTealiumAction,
      rfTrackerEventSent,
    } = this.props;

    const CHANNEL = 'Registry';
    const PAGENAME_BREADCRUMB = 'Registry View Page';
    const CALL_TO_ACTIONTYPE = 'registry tab click';
    const REGISTRY = 'Registry';
    let rfTracker;

    if (tabURL && tabURL.includes('viewRegistryOwner/home')) {
      rfTracker =
        rfTrackerEventSent &&
        !this.localStorageUtil.getItem('isRfTrackerEventSent');
      if (rfTracker) {
        this.localStorageUtil.saveItem('isRfTrackerEventSent', true);
      }
    }
    let tealiumObj = {
      content_pagetype: '',
      product_pagetype: '',
      pagename_breadcrumb: PAGENAME_BREADCRUMB,
      channel: CHANNEL,
      call_to_actiontype: CALL_TO_ACTIONTYPE,
      crossell_page: NON_CROSSELL_PAGE,
      crossell_product: NON_CROSSELL_PRODUCT,
      feo_site_indicator: FEO_SITE_INDICATOR,
      internal_search_term: NON_SEARCH,
      registry_id: registryId || '',
      registry_type: eventType || '',
      registry_tab_name: updatedValue || '',
      product_finding_method: `${REGISTRY} ${updatedValue}`,
      internal_campaign: NON_INTERNAL_CAMPAIGN,
      merchandising_main_level: NON_BROWSE,
      merchandising_category: NON_BROWSE,
      merchandising_subcategory: NON_BROWSE,
      RF_Tracker: !!rfTracker,
      product_id: ' ',
    };
    if (
      (tabURL && tabURL.includes('recommendation')) ||
      (updatedValue && updatedValue.includes('Recommendations'))
    ) {
      const tealiumObjRecommendation = {
        pagename_breadcrumb: PAGE_NAME_RECOMMENDATION_TEALIUM,
        page_function: PAGE_FUNCTION_RECOMMENDATION_TEALIUM,
        navigation_path: NAVIGATION_PATH_RECOMMENDATION_TEALIUM,
        subnavigation_path: SUB_NAVIGATION_PATH_RECOMMENDATION_TEALIUM,
      };
      tealiumObj = Object.assign({}, tealiumObj, tealiumObjRecommendation);
    }
    if (fireTealiumAction && updatedValue !== this.state.selectedTab) {
      const TEALIUM_PAGE_INFO = {
        page_type: 'Registry',
        page_name: 'registry tab click',
      };

      fireTealiumAction('registry tab click', tealiumObj, TEALIUM_PAGE_INFO);
    }
  }

  handleSelection(updatedValue, id) {
    this.setState({ selectedTab: updatedValue, cid: id, state: updatedValue });
  }

  handleTabClick(item) {
    this.handleTealiumCTA(item.label, item.tabURL);
    this.handleSelection(item.label);
    this.props.handleTabClickCallback(item);

    this.handleSelection(item.label, item.id);
  }

  handleStateChange = (rule, value) => {
    this.setState({ state: value });
    const mobileNavigationMapping = {};
    const eventType = this.props.eventType;
    const firstTab = `${eventType} ${REGISTRY_HOME_LBL}`;
    mobileNavigationMapping[firstTab] = this.state.URLs.registryHomeURL;
    mobileNavigationMapping[MY_ITEM_LBL] = this.state.URLs.myItemsURL;
    mobileNavigationMapping[THANK_YOU_LIST_TAB_LBL] = this.state.URLs.tymURL;
    mobileNavigationMapping[
      this.props.enableRecommendationTab ? GET_RECOMMENDATION_LBL : null
    ] = this.state.URLs.socialRecommendationURL;

    this.setState({ mobileNavigationTo: mobileNavigationMapping[value] });
    this.handleTealiumCTA(value);
  };

  render() {
    if (this.state.mobileNavigationTo !== '') {
      const mobileNavigationTo = this.state.mobileNavigationTo;
      this.setState({ mobileNavigationTo: '' });
      return <Redirect to={mobileNavigationTo} />;
    }
    const { isMobile } = this.props;
    const showTYM = this.props.enableTab;
    const eventTypeValue = pathOr('', 'eventType', this.props);
    const eventType = eventTypeValue || ' ';
    const eventTypeCode = pathOr('', 'eventTypeName', this.props);
    const eventYetToCome = pathOr(
      false,
      'registryResVO.registrySummaryVO.eventYetToCome',
      this.props.registryData
    );
    const recommendationCount = pathOr(
      null,
      'recommendationCount[1]',
      this.props.registryData
    );
    const isCodeTypeTabEnabled = pathOr(
      false,
      `${eventTypeCode}_enableRecommendationTab`,
      this.props.switchConfig
    );
    const isPastEventAndHaveRecommendations =
      !eventYetToCome && recommendationCount !== 0;

    const isRecommendationTabEnabled =
      pathOr(null, `enableRecommendationsView`, this.props.switchConfig) &&
      isCodeTypeTabEnabled;

    const isRecommendationTabVisible =
      isRecommendationTabEnabled &&
      (eventYetToCome || isPastEventAndHaveRecommendations);
    const getRecCount = pathOr(
      0,
      'recommendationCount[0]',
      this.props.registryData
    );
    const recLabel = getRecCount ? (
      <React.Fragment>
        {GET_RECOMMENDATION_LBL}
        <span className={styles.bubble}>{getRecCount}</span>
      </React.Fragment>
    ) : (
      GET_RECOMMENDATION_LBL
    );
    const selectLabels = [
      {
        labelName: `${eventType} ${REGISTRY_HOME_LBL}`,
        labelDisplayName: `${eventType} ${REGISTRY_HOME_LBL}`,
        labelUrl: this.state.URLs.registryHomeURL,
        dataLocator: 'registry-createdregistry-landingpage-registryhome-tab',
      },
      {
        labelName: MY_ITEM_LBL,
        labelDisplayName: MY_ITEM_LBL,
        labelUrl: this.state.URLs.myItemsURL,
        dataLocator: 'registry-createdregistry-landingpage-myitems-tab',
      },
      {
        labelName: showTYM && THANK_YOU_LIST_TAB_LBL,
        labelDisplayName: showTYM && THANK_YOU_LIST_TAB_LBL,
        labelUrl: showTYM && this.state.URLs.tymURL,
        dataLocator: 'registry-createdregistry-landingpage-thanksyoulist-tab',
      },
      {
        labelName: isRecommendationTabVisible && GET_RECOMMENDATION_LBL,
        labelDisplayName: isRecommendationTabVisible && recLabel,
        labelUrl:
          isRecommendationTabVisible && this.state.URLs.socialRecommendationURL,
        labelNotify: isRecommendationTabVisible,
      },
    ];
    const arrayTemp = selectLabels.map((item, index) => ({
      id: index,
      label: item.labelDisplayName,
      tabURL: item.labelUrl,
      props: {
        value: item.labelName,
      },
      notify: item.labelNotify,
      dataLocator: item.dataLocator,
    }));
    return isMobile ? (
      <div
        className={classnames(styles.registryTYMNavDropdown, 'mt15 sm-pt15')}
      >
        <FormInput
          type="select"
          optionSet={arrayTemp}
          id="registry-name"
          className={classnames(styles.formInputDropdown, 'grid-container')}
          label=" "
          name="registry-name"
          defaultValue={this.state.state}
          selectOption={this.handleStateChange}
        />
      </div>
    ) : (
      <ul className={classnames('grid-container tym-tabs mt4')}>
        {arrayTemp.map((item, index) => (
          <li
            key={item.id}
            aria-label={
              item.props.value === this.state.selectedTab && 'selected'
            }
            className={classnames(
              styles.registryNavLinks,
              item.props.value === this.state.selectedTab
                ? styles.selected
                : undefined
            )}
            data-tab={
              item.props.value &&
              item.props.value.replace(/ /gi, '-').toLowerCase()
            }
            data-locator={item.dataLocator}
          >
            <PrimaryLink
              href={item.tabURL}
              type="bold"
              variation="defaultBlack"
              className={classnames(styles.registryNavLinksFonts, 'pb2 fol')}
              onClick={() => {
                this.handleTabClick(item);
              }}
              {...{
                'aria-current':
                  item.props.value === this.state.selectedTab && 'page',
              }}
            >
              {item.label}
            </PrimaryLink>
            {index === 0 && (
              <Instrumentation
                zoneName={'ux-primary-content-displayed'}
                markName={'ux-text-registry-home'}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
}

Tab.propTypes = {
  isMobile: PropTypes.bool,
  eventType: PropTypes.string,
  enableTab: PropTypes.bool,
  location: PropTypes.object,
  registryId: PropTypes.string,
  registryData: PropTypes.number,
  switchConfig: PropTypes.object,
  fireTealiumAction: PropTypes.func,
  enableRecommendationTab: PropTypes.bool,
  rfTrackerEventSent: PropTypes.bool,
  handleTabClickCallback: PropTypes.func,
};

export default Tab;
