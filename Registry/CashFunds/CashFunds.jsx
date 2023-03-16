import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import Loader from '@bbb-app/loader/containers/Loader';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import { modalATRDidClose } from '../../../AddToRegistry/actions';
import { addToRegistry } from '../../../AddToRegistry/ActionWithSagaInjection';
import { makeSelectAddToRegistryState } from '../../../AddToRegistry/selectors';
import CashFundsComponent from '../../../../components/Pages/Registry/CashFunds/CashFundsComponent';
import CashFundsSuccessComponent from '../../../../components/Pages/Registry/CashFunds/CashFundsSuccessComponent';
import {
  ADD_CF_PAGENAME,
  TEALIUM_REGISTRY,
  DEFAULT_CF_STATE,
  TEALIUM_CASH_FUND,
  CF_NO_ERROR_STATE,
  CREATE_CF_PAGENAME,
  CREATE_CASH_FUND_NAME,
  CREATE_CASH_FUND_SUCCESS_NAME,
  ADD_CF_CLICK,
  CF_WELCOME,
} from '../../../../components/Pages/Registry/CashFunds/constants';
import styles from '../../../../components/Pages/Registry/CashFunds/CashFunds.css';

const propTypes = {
  regType: PropTypes.string,
  registryId: PropTypes.string,
  addToRegistryCall: PropTypes.func,
  handleCashFundsModalClose: PropTypes.func,
  activeRegistry: PropTypes.bool,
  regCashFundEventTypes: PropTypes.bool,
  isAddToRegistryFetching: PropTypes.bool,
  ATRStateData: PropTypes.object,
  ATRStateClear: PropTypes.func,
  fireTealiumAction: PropTypes.func,
};

class CashFunds extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cfFormData: { ...DEFAULT_CF_STATE, ...CF_NO_ERROR_STATE },
    };
  }
  componentDidMount() {
    this.fireTealiumCreateCashFund();
  }
  componentWillUnmount() {
    this.props.ATRStateClear();
  }

  getPayLoad = itemImgUrl => {
    const { registryId, regType } = this.props;
    const skuId = '69934769';
    const prodId = '5759330';
    const { fundName, venmoUsername, totalGoal } = this.state.cfFormData;
    return {
      activeRegistryId: registryId,
      activeRegistryName: regType,
      isCustomizationRequired: false,
      qty: '1',
      skuId,
      prodId,
      products: null,
      skuName: '',
      isList: false,
      ltlFlag: 'false',
      price: `$${totalGoal}`,
      skipNotifyFlag: 'false',
      tinderATRShowLoader: false,
      personalizationDescription: fundName,
      personalizationCode: venmoUsername,
      imageURL: itemImgUrl,
    };
  };
  getTealiumUtag(ATRSuccessData) {
    const PAGE_NAME = ATRSuccessData
      ? CREATE_CASH_FUND_SUCCESS_NAME
      : CREATE_CASH_FUND_NAME;
    return Object.assign(
      {},
      {
        page_type: PAGE_NAME,
        page_name: PAGE_NAME,
        channel: TEALIUM_REGISTRY,
        page_function: TEALIUM_REGISTRY,
        navigation_path: TEALIUM_CASH_FUND,
        subnavigation_path: TEALIUM_CASH_FUND,
        pagename_breadcrumb: PAGE_NAME,
        link_location_name: PAGE_NAME,
      }
    );
  }
  setCfFormData = value => this.setState({ cfFormData: value });
  fireCashFundLoadTelium = identifier => {
    const ATRSuccessData = pathOr(null, 'data', this.props.ATRStateData);
    const utag = this.getTealiumUtag(ATRSuccessData);
    return (
      <ErrorBoundary>
        <TealiumHandler
          utagData={utag}
          identifier={identifier}
          tealiumPageInfoNotAvailable
        />
      </ErrorBoundary>
    );
  };
  fireTealiumCreateCashFund() {
    const pageInfo = {
      page_name: CREATE_CF_PAGENAME,
      page_type: CREATE_CF_PAGENAME,
    };
    const actionDetails = {
      call_to_actiontype: CF_WELCOME,
      pagename_breadcrumb: CREATE_CF_PAGENAME,
      link_name: CREATE_CF_PAGENAME,
      link_location_name: CREATE_CF_PAGENAME,
    };
    this.props.fireTealiumAction(true, actionDetails, pageInfo);
  }
  fireTealiumCashFund() {
    const { cfFormData } = this.state;
    const cashFundName = cfFormData.fundName;
    const amount = cfFormData.totalGoal;
    const pageInfo = {
      page_name: ADD_CF_PAGENAME,
      page_type: ADD_CF_PAGENAME,
    };
    const tealiumInfo = {
      page_name: ADD_CF_CLICK,
      cash_fund_amount: amount,
      cash_fund_name: cashFundName,
      link_name: ADD_CF_PAGENAME,
      registry_type: this.props.regType,
    };
    this.props.fireTealiumAction(true, tealiumInfo, pageInfo);
  }
  handleCreateCashFunds = (submitBtnState, itemImgUrl) => {
    const payLoad = this.getPayLoad(itemImgUrl);
    this.fireTealiumCashFund();
    if (submitBtnState) this.props.addToRegistryCall(payLoad);
  };

  render() {
    const registryCode = pathOr(
      '',
      'registryType.registryTypeName',
      this.props.activeRegistry
    );
    const dynamicData = this.props.regCashFundEventTypes[registryCode];
    const { handleCashFundsModalClose, isAddToRegistryFetching } = this.props;
    const ATRSuccessData = pathOr(null, 'data', this.props.ATRStateData);
    const ATRErrorData = pathOr(null, 'error', this.props.ATRStateData);
    return (
      <ModalDialog
        mountedState
        closeIconShow
        titleAriaLabel="CashFunds-Modal"
        verticallyCenter
        scrollDisabled
        variation="small"
        onModalClose={handleCashFundsModalClose}
        contentWrapperClass={styles.cfWrapper}
      >
        {isAddToRegistryFetching && <Loader />}
        {ATRSuccessData ? (
          <CashFundsSuccessComponent
            {...this.props}
            fireCashFundLoadTelium={this.fireCashFundLoadTelium}
            dynamicData={dynamicData}
          />
        ) : (
          <CashFundsComponent
            {...this.props}
            fireCashFundLoadTelium={this.fireCashFundLoadTelium}
            cfFormData={this.state.cfFormData}
            setCfFormData={this.setCfFormData}
            ATRErrorData={ATRErrorData}
            handleCreateCashFunds={this.handleCreateCashFunds}
            dynamicData={dynamicData}
          />
        )}
      </ModalDialog>
    );
  }
}

CashFunds.propTypes = propTypes;
export const mapStateToProps = createStructuredSelector({
  ATRStateData: makeSelectAddToRegistryState(),
});
export const mapDispatchToProps = dispatch => ({
  addToRegistryCall: payload => {
    dispatch(addToRegistry(payload));
  },
  ATRStateClear: () => {
    dispatch(modalATRDidClose());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(CashFunds));
export { CashFunds as PureCashFunds };
