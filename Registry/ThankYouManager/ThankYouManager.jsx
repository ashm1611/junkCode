import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pathOr from 'lodash/fp/pathOr';
import { createStructuredSelector } from 'reselect';

import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { initiateInactivityModal } from '@bbb-app/actions/registryActions';
import toJS from '@bbb-app/hoc/toJS';
import {
  selectDeviceConfig,
  makeSelectSwitchConfig,
  makeSelectGlobalSwitchConfig,
  makeSelectThirdPartyConfig,
  makeSelectLabels,
} from '@bbb-app/selectors/configSelector';
import { makeTYMSignInModalLabels } from '@bbb-app/selectors/accountSelectors';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import { updateStateData } from '@bbb-app/forms/containers/FormWrapper/actions';
import { makeSelectEmailId } from '@bbb-app/account-signin/containers/commonSelectors';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import {
  getTymDynamicDataFlag,
  makeSelectRegistryId,
  getListData,
  getIsMobile,
  selectActiveRegistryObject,
  getLoggedInStatus,
  showLoginModal,
  getListUpdatedStatus,
  makeSelectisFetching,
  makeSelectPreviousRoute,
  makeSelectQueryString,
} from './selectors';
import {
  CONTENT_HEADING,
  CONTENT_SUB_HEADING,
  SEND_THANK_YOU_HEADING,
  SEND_THANK_YOU_DESCRIPTION,
} from './constants';
import {
  revealThankYouList,
  displayLoginModalVisibility,
  changeListUpdatedStatus,
  updateTymTabClickStatus,
} from './actions';
import { fetchTymData } from './ActionsWithSagaInjection';
import { addEditAddress } from './ActionToInjectEditSaga';
import { getRegistryData } from '../RegistryOwner/commonSelectors';
import ThankYouManagerLayout from '../../../../components/Pages/Registry/ThankYouManagerLayout/ThankYouManagerLayout';
import { fetchQuickViewProductDetails } from '../../../QuickViewModal/ActionWithSagaInjection';
import { getContextPath } from '../../../../containers/Search/selectors';
import { makeSelectIsQuickViewOpen } from '../../../QuickViewModal/QuickViewModalSelectors';

const propTypes = {
  matchParamId: PropTypes.string,
  labels: PropTypes.object.isRequired,
  tymDynamicDataFlag: PropTypes.string,
  thankYouListSurpriseData: PropTypes.object,
  registryId: PropTypes.string,
  revealThankYouListCB: PropTypes.func,
  listData: PropTypes.array,
  scene7UrlConfig: PropTypes.string,
  isMobile: PropTypes.object,
  registryData: PropTypes.object,
  getThankYouList: PropTypes.func,
  userLoggedIn: PropTypes.object,
  loginLabels: PropTypes.object,
  loginModalVisibility: PropTypes.bool,
  registrySwitchConfig: PropTypes.object,
  globalSwitchConfig: PropTypes.object,
  updateTymTabClickStatus: PropTypes.func,
  fireTealiumAction: PropTypes.func,
};

export class ThankYouManager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.registryId = props.matchParamId;
    const referredContent = props.labels.referredContent;
    this.contentIdArgs = [];
    this.handleThankYouList = this.handleThankYouList.bind(this);

    if (referredContent) {
      referredContent.forEach(obj => {
        if (
          obj.key === CONTENT_HEADING ||
          obj.key === CONTENT_SUB_HEADING ||
          obj.key === SEND_THANK_YOU_HEADING ||
          obj.key === SEND_THANK_YOU_DESCRIPTION
        ) {
          this.contentIdArgs.push(obj.id);
        }
      });
    }

    this.state = {};
  }

  componentDidMount() {
    this.props.updateTymTabClickStatus(true);

    this.props.getThankYouList(this.registryId, this.contentIdArgs, '1', '1');
  }

  handleThankYouList() {
    this.props.getThankYouList(this.registryId, this.contentIdArgs, '1', '1');
  }

  render() {
    const {
      globalSwitchConfig,
      loginLabels,
      loginModalVisibility,
      registrySwitchConfig,
    } = this.props;

    const enableMPulse = pathOr(
      false,
      'registrySwitchConfig.enableMPulse',
      this.props
    );
    const globalMPulseEnable = pathOr(
      false,
      'globalSwitchConfig.globalMPulseEnable',
      this.props
    );
    const isNewDashboard =
      registrySwitchConfig && registrySwitchConfig.enableNewRegDashboard;
    return (
      <React.Fragment>
        <ErrorBoundary>
          <ThankYouManagerLayout
            labels={this.props.labels}
            enableTymDynamicContent={this.props.tymDynamicDataFlag}
            thankYouListSurpriseData={this.props.thankYouListSurpriseData}
            registryId={this.props.registryId}
            revealThankYouList={this.props.revealThankYouListCB}
            listDatatym={this.props.listData}
            scene7UrlConfig={this.props.scene7UrlConfig}
            isMobile={this.props.isMobile}
            registryData={this.props.registryData}
            userLoggedIn={this.props.userLoggedIn}
            getLoginStatus={this.handleThankYouList}
            loginLabels={loginLabels}
            loginModalVisibility={loginModalVisibility}
            registrySwitchConfig={registrySwitchConfig}
            globalSwitchConfig={globalSwitchConfig}
            mPulseEnabled={enableMPulse && globalMPulseEnable}
            handleTealiumEvent={this.props.fireTealiumAction}
            isNewDashboard={isNewDashboard}
            {...this.props}
          />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getThankYouList(regId, contentIdArgs) {
      // getting thank you list with default sort value Date Purchased (new-old)
      dispatch(fetchTymData(regId, contentIdArgs, '1', '1'));
    },
    revealThankYouListCB() {
      dispatch(revealThankYouList(this.registryId));
    },
    addEditAddress(args) {
      dispatch(addEditAddress(args));
    },
    updateTymTabClickStatus(tymClickParam) {
      dispatch(updateTymTabClickStatus(tymClickParam));
    },
    sortThankYouList(registryId, sortOrder, sortDirection) {
      dispatch(fetchTymData(registryId, [], sortOrder, sortDirection));
    },
    displayLoginModal: visiblity => {
      dispatch(displayLoginModalVisibility(visiblity));
    },
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    changeListUpdatedStatus() {
      dispatch(changeListUpdatedStatus());
    },
    updateStateData(data) {
      dispatch(updateStateData(data));
    },
    onQuickViewButtonClick(
      productId,
      productVariation,
      productUrl,
      productInfo,
      swatchDetails
    ) {
      dispatch(
        fetchQuickViewProductDetails(
          productId,
          productVariation,
          productUrl,
          productInfo,
          swatchDetails
        )
      );
    },
    initiateInactivityModal: inactivityModalState => {
      dispatch(initiateInactivityModal(inactivityModalState));
    },
  };
};

export const mapStateToProps = createStructuredSelector({
  deviceConfig: selectDeviceConfig,
  labels: makeSelectLabels(['Registry']),
  registryData: getRegistryData(),
  accountLabels: makeSelectLabels('myAccount'),
  tymDynamicDataFlag: getTymDynamicDataFlag(),
  thankYouListSurpriseData: makeSelectContent(),
  registryId: makeSelectRegistryId(),
  listData: getListData(),
  userLoggedIn: getLoggedInStatus(),
  scene7UrlConfig: makeSelectThirdPartyConfig(['scene7'], ''),
  isMobile: getIsMobile(),
  activeRegistryData: selectActiveRegistryObject(),
  loginLabels: makeTYMSignInModalLabels(),
  loginModalVisibility: showLoginModal(),
  globalSwitchConfig: makeSelectGlobalSwitchConfig(),
  registrySwitchConfig: makeSelectSwitchConfig(['RegistryOwner']),
  listUpdated: getListUpdatedStatus(),
  isFetching: makeSelectisFetching(),
  contextPath: getContextPath,
  formWrapperData: formWrapperSelector('emailForm'),
  formWrapperDataAddress: formWrapperSelector('accountAddressBook'),
  previousRoute: makeSelectPreviousRoute(),
  emailId: makeSelectEmailId(),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  isQuickViewOpen: makeSelectIsQuickViewOpen(),
  location: makeSelectQueryString(),
  enableCashFund: makeSelectSwitchConfig(['RegistryOwner', 'enableCashFund']),
});

ThankYouManager.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ThankYouManager));
