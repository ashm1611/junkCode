import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { getSiteId } from '@bbb-app/utils/common';
import pathOr from 'lodash/fp/pathOr';
import toJS from '@bbb-app/hoc/toJS';
import {
  selectSiteId,
  selectDeviceConfig,
  makeSelectLabels,
  makeSelectThirdPartyConfig,
  makeSelectGlobalSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import {
  getApolloApiUrls,
  makeSelectContent,
} from '@bbb-app/selectors/pageSelectors';
import { selectAccountSignInDetails as accountSignInDetails } from '@bbb-app/selectors/accountSelectors';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { getLoggedIn } from '@bbb-app/header/containers/selectors';
import AddDFModal from '../../../../components/Pages/Registry/DiaperFundModal/AddDFModal';
// @TODO Resolve this circular dep
import { getContextPath } from '../../../Search/selectors';
import {
  makeSelectOwnerFirstCategoryList,
  selectQuickItemAdded,
} from '../RegistryOwner/selectors';
import { makeSelectIsFetching } from '../../../AddToRegistry/selectors';
import {
  DIAPER_FUND_SECOND_SKU_IMAGE_LBL,
  DIAPER_FUND_FIRST_SKU_TITLE_LBL,
  DIAPER_FUND_SECOND_SKU_TITLE_LBL,
  DIAPER_FUND_THIRD_SKU_TITLE_LBL,
  DIAPER_FUND_FIRST_SKU_IMAGE_LBL,
  DIAPER_FUND_THIRD_SKU_IMAGE_LBL,
  DIAPER_FUND_PRODUCT_IDS_LBL,
  DIAPER_FUND_PRODUCT_IDS_US_BABY_LBL,
} from '../EditRegistry/constants';
export class DiaperFundModal extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.object,
    getContent: PropTypes.func,
    referredContent: PropTypes.object,
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
    const { labels, getContent } = this.props;
    this.fetchDiaperFundProductsData();
    const contentId = [];
    if (labels) {
      contentId.push(this.getReferredContentID('diaperFundModalDescription'));
    }
    if (contentId.length) {
      getContent(contentId);
    }
  }
  getReferredContentID(key) {
    const { labels, enableCSLabels } = this.props;
    const referredContent = pathOr(
      '',
      enableCSLabels ? 'referredContent' : 'RegistryOwner.referredContent',
      labels
    );
    if (referredContent) {
      let id = '';
      referredContent.forEach(ele => {
        if (ele.key === key) {
          id = ele.id;
        }
      });
      return id;
    }
    return '';
  }
  fetchDiaperFundProductsData() {
    const isUsBaby =
      getSiteId() === 'BedBathUS' || getSiteId() === 'BuyBuyBaby';
    const products = isUsBaby
      ? DIAPER_FUND_PRODUCT_IDS_US_BABY_LBL
      : DIAPER_FUND_PRODUCT_IDS_LBL;
    ServiceUtil.triggerServerRequest({
      url: getApiEndPointsFromStore('skuDetail'),
      method: 'GET',
      params: { product: products },
    })
      .then(data => {
        const serviceStatus = pathOr('', 'body.serviceStatus', data);
        const diaperFundProducts = pathOr(null, 'response.data.data', data);
        if (serviceStatus === 'SUCCESS') {
          const updatedDiaperFundProducts = this.updateDiaperFundProducts(
            diaperFundProducts
          );
          this.setState({ diaperFundProducts: updatedDiaperFundProducts });
        } else if (serviceStatus === 'ERROR') {
          this.setState({ diaperFundProducts: [] });
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch(e => {});
  }
  updateDiaperFundProducts(diaperFundProducts) {
    const firstSKUImageID = DIAPER_FUND_FIRST_SKU_IMAGE_LBL;
    const firstSKUTitle = DIAPER_FUND_FIRST_SKU_TITLE_LBL;
    const secondSKUImageID = DIAPER_FUND_SECOND_SKU_IMAGE_LBL;
    const secondSKUImageTitle = DIAPER_FUND_SECOND_SKU_TITLE_LBL;
    const thirdSKUImageID = DIAPER_FUND_THIRD_SKU_IMAGE_LBL;
    const thirdSKUImageTitle = DIAPER_FUND_THIRD_SKU_TITLE_LBL;
    if (diaperFundProducts) {
      diaperFundProducts.map((item, index) => {
        /* eslint-disable no-param-reassign */
        if (index === 0) {
          item.SCENE7_URL = firstSKUImageID;
          item.DISPLAY_NAME = firstSKUTitle;
        } else if (index === 1) {
          item.SCENE7_URL = secondSKUImageID;
          item.DISPLAY_NAME = secondSKUImageTitle;
        } else if (index === 2) {
          item.SCENE7_URL = thirdSKUImageID;
          item.DISPLAY_NAME = thirdSKUImageTitle;
        }
        return item;
        /* eslint-enable no-param-reassign */
      });
    }
    return diaperFundProducts;
  }
  render() {
    return (
      <AddDFModal
        diaperFundProducts={this.state.diaperFundProducts}
        referredContentData={pathOr(
          null,
          this.getReferredContentID('diaperFundModalDescription'),
          this.props.referredContent.content
        )}
        faqReferredContentID={this.getReferredContentID('diaperFundFAQ')}
        {...this.props}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getContent(contentIdCollection) {
      dispatch(fetchReferredContent(contentIdCollection));
    },
  };
};
export const mapStateToProps = createStructuredSelector({
  certonaLabels: makeSelectGlobalSwitchConfig('enableCSLabels')
    ? makeSelectLabels(['Certona'])
    : makeSelectLabels(['Certona', 'certonaLabels']),
  registryOwnerFirstCategoryList: makeSelectOwnerFirstCategoryList(),
  deviceConfig: selectDeviceConfig,
  certonaConfig: makeSelectThirdPartyConfig('certona'),
  getLoggedIn: getLoggedIn(),
  accountSignInDetails,
  contextPath: getContextPath,
  getApolloApiUrls,
  siteId: selectSiteId(),
  labels: makeSelectLabels(['Registry']),
  isAddToRegistryFetching: makeSelectIsFetching(),
  quickItemAddedTS: selectQuickItemAdded(),
  referredContent: makeSelectContent(),
  enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(toJS(DiaperFundModal));
