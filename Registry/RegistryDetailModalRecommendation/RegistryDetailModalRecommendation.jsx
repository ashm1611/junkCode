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
import RegistryDetailModalRecommendationComponent from '../../../../components/Pages/Registry/RegistryDetailModalRecommendation/RegistryDetailModalRecommendation';
// @TODO Resolve this circular dep
import { getContextPath } from '../../../Search/selectors';

import {
  makeSelectOwnerFirstCategoryList,
  makeSelectSortedBy,
  selectQuickItemAdded,
} from '../RegistryOwner/selectors';
import { makeSelectIsFetching } from '../../../AddToRegistry/selectors';

export class RegistryDetailModalRecommendation extends React.PureComponent {
  static propTypes = {
    getApolloApiUrls: PropTypes.string,
    siteId: PropTypes.string,
    labels: PropTypes.object,
    productId: PropTypes.string,
    storeDetails: PropTypes.string,
    registryProductInfo: PropTypes.object,
    isPurchased: PropTypes.bool,
    cLabels: PropTypes.object,
    certonaLabels: PropTypes.object,
    enableCSLabels: PropTypes.bool,
    registryModalData: PropTypes.object,
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
    const { siteId, labels, productId, storeDetails } = this.props;
    const pathNameUrl = window && window.location.pathname.split('/');
    const params = {};
    const registryId = pathNameUrl[pathNameUrl.length - 1];

    try {
      const storeId = pathOr('', 'storeId', storeDetails);
      const noOfItems = pathOr('3', 'noOfRecItemOnDetailModal', labels);
      const userId = pathOr('', 'userDetails.repositoryId', this.props);
      const filteredParams = params;
      filteredParams.currencyCode = getCountryCurrencyValue(true);
      filteredParams.country = getCountryCurrencyValue();
      filteredParams.site = siteId;
      filteredParams.number = noOfItems;
      filteredParams.registryid = registryId;
      filteredParams.scheme = 'AddToCart_rr';
      filteredParams.context = productId;
      filteredParams.productId = productId;
      filteredParams.calledFromRegistry = true;
      filteredParams.userid = userId;
      filteredParams.storeId = storeId;

      const groupByParams = {
        products: productId,
        currencyCode: getCountryCurrencyValue(true),
        country: getCountryCurrencyValue(),
        site: siteId,
        scheme: 'AddToCart_rr',
        number: pathOr('3', 'noOfRecItemOnDetailModal', labels),
        registryid: registryId,
        isGroupby: true,
      };
      /* filteredParams.number = ; */
      const apolloEndPoints = this.props.getApolloApiUrls;
      const url = pathOr('', 'alsoBought', apolloEndPoints);
      const finalParams = groupByParams;

      ServiceUtil.triggerServerRequest({
        url,
        method: 'GET',
        params: { ...finalParams },
      }).then(data => {
        let response = '';
        let serviceStatus = '';
        serviceStatus = 'SUCCESS';
        response = this.getFormatterGroupByResponse(
          pathOr([], 'response.data.products', data)
        );

        if (serviceStatus === 'SUCCESS') {
          this.setState({ data: response && response.slice(0, 3) });
        } else if (serviceStatus === 'ERROR') {
          this.setState({ data: [] });
        }
      });
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  getFormatterGroupByResponse(response) {
    if (response) {
      return response.map(item => {
        const productItem = { ...item };
        productItem.CUSTOMIZATION_OFFERED_FLAG =
          item.CUSTOMIZATION_OFFERED_FLAG[0] === 'No' ? 'false' : 'true';
        return productItem;
      });
    }
    return response;
  }

  render() {
    const { data } = this.state;
    const { isPurchased, enableCSLabels, cLabels, certonaLabels } = this.props;
    const certonaLbl = enableCSLabels ? cLabels : certonaLabels;
    const skuInStock = pathOr(
      '',
      'sKUDetailVO.skuInStock',
      this.props.registryProductInfo
    );
    const displayNotifyRegistrantMsg = pathOr(
      '',
      'displayNotifyRegistrantMsg',
      this.props.registryProductInfo
    );
    let noCarryItem = true;
    if (!isPurchased && displayNotifyRegistrantMsg && !skuInStock) {
      noCarryItem = false;
    }
    return data && noCarryItem ? (
      <RegistryDetailModalRecommendationComponent
        content={data}
        {...this.props}
        certonaLabels={certonaLbl}
        itemTypes={this.props.registryModalData.itemType}
      />
    ) : null;
  }
}

export const mapStateToProps = createStructuredSelector({
  enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
  cLabels: makeSelectLabels(['Certona']),
  certonaLabels: makeSelectLabels(['Certona', 'certonaLabels']),
  registryOwnerFirstCategoryList: makeSelectOwnerFirstCategoryList(),
  deviceConfig: selectDeviceConfig,
  certonaConfig: makeSelectThirdPartyConfig('certona'),
  getLoggedIn: getLoggedIn(),
  accountSignInDetails,
  contextPath: getContextPath,
  cartData: makeSelectCartData(),
  getApolloApiUrls,
  siteId: selectSiteId(),
  labels: makeSelectLabels(['Registry']),
  variation: makeSelectSortedBy(),
  isAddToRegistryFetching: makeSelectIsFetching(),
  quickItemAddedTS: selectQuickItemAdded(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(toJS(RegistryDetailModalRecommendation));
