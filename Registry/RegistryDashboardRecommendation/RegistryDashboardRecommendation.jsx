import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import toJS from '@bbb-app/hoc/toJS';
import {
  selectSiteId,
  selectDeviceConfig,
  makeSelectLabels,
  makeSelectThirdPartyConfig,
  makeSelectGlobalSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import { getCountryCurrencyValue } from '@bbb-app/utils/countryCurrencyUtils';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { getApolloApiUrls } from '@bbb-app/selectors/pageSelectors';
import { selectAccountSignInDetails as accountSignInDetails } from '@bbb-app/selectors/accountSelectors';
import { getLoggedIn } from '@bbb-app/header/containers/selectors';
import { makeSelectCartData } from '@bbb-app/selectors/checkoutSelectors';
import { makeSelectProductInfo } from '@bbb-app/tealium/containers/pdp-tealium-handler/pdpSelectors';

import RegistryDashboardRecommendationComponent from '../../../../components/Pages/Registry/RegistryDashboardRecommendation/RegistryDashboardRecommendation';
// @TODO Resolve this circular dep
import { getContextPath } from '../../../Search/selectors';

import {
  makeSelectOwnerFirstCategoryList,
  makeSelectSortedBy,
  selectQuickItemAdded,
} from '../RegistryOwner/selectors';
import { makeSelectIsFetching } from '../../../AddToRegistry/selectors';
import { REG_TYPE, REG_TYPE_WED, NO_OF_ITEMS_LBL } from './constants';
export class RegistryDashboardRecommendation extends React.PureComponent {
  static propTypes = {
    getApolloApiUrls: PropTypes.string,
    siteId: PropTypes.string,
    regType: PropTypes.string,
    certonaLabels: PropTypes.object,
    labels: PropTypes.object,
    enableCSLabels: PropTypes.bool,
  };

  static defaultProps = {
    params: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    const { siteId, regType } = this.props;
    if (regType === REG_TYPE || regType === REG_TYPE_WED) {
      const params = {};
      const pathNameUrl = window && window.location.pathname.split('/');
      const registryId = pathNameUrl[pathNameUrl.length - 1];

      try {
        const filteredParams = params;
        filteredParams.currencyCode = getCountryCurrencyValue(true);
        filteredParams.country = getCountryCurrencyValue();
        filteredParams.site = siteId;
        filteredParams.number = NO_OF_ITEMS_LBL;
        filteredParams.registryid = registryId;
        /* filteredParams.number = ; */
        const apolloEndPoints = this.props.getApolloApiUrls;
        const url = pathOr('', 'dashboardSolrRecommendation', apolloEndPoints);
        ServiceUtil.triggerServerRequest({
          url,
          method: 'GET',
          params: { ...filteredParams },
        }).then(data => {
          const serviceStatus = pathOr('', 'body.fusion.serviceStatus', data);
          const response = pathOr('', 'body.fusion.response', data);
          if (serviceStatus === 'SUCCESS') {
            this.setState({ data: response });
          } else if (serviceStatus === 'ERROR') {
            this.setState({ data: [] });
          }
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }

  render() {
    const certonaLbl = this.props.enableCSLabels
      ? this.props.labels
      : this.props.certonaLabels;
    const { regType } = this.props;
    if (regType === REG_TYPE || regType === REG_TYPE_WED) {
      return (
        <RegistryDashboardRecommendationComponent
          content={this.state.data}
          {...this.props}
          certonaLabels={certonaLbl}
        />
      );
    }
    return null;
  }
}

export const mapStateToProps = createStructuredSelector({
  enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
  labels: makeSelectLabels(['Certona']),
  certonaLabels: makeSelectLabels(['Certona', 'certonaLabels']),
  registryOwnerFirstCategoryList: makeSelectOwnerFirstCategoryList(),
  deviceConfig: selectDeviceConfig,
  certonaConfig: makeSelectThirdPartyConfig('certona'),
  getLoggedIn: getLoggedIn(),
  accountSignInDetails,
  contextPath: getContextPath,
  tealiumATCInfo: makeSelectProductInfo(),
  cartData: makeSelectCartData(),
  getApolloApiUrls,
  siteId: selectSiteId(),
  variation: makeSelectSortedBy(),
  isAddToRegistryFetching: makeSelectIsFetching(),
  quickItemAddedTS: selectQuickItemAdded(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(toJS(RegistryDashboardRecommendation));
