import React from 'react';
import PropTypes from 'prop-types';
import { pathOr } from 'lodash/fp';
import classnames from 'classnames';
import { getSiteId } from '@bbb-app/utils/common';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { getStoreRef } from '@bbb-app/utils/storeRefUtils';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import {
  RBYR_TEALIUM,
  getRBYRTealiumData,
} from '@bbb-app/tbs/containers/RBYRTealium';
import AccountSignIn from '@bbb-app/account-signin/containers/AccountSignIn.async';
import '@bbb-app/assets/icons/plus-black.svg';
import styles from './RBYRModal.css';
import '../../../../assets/icons/ShipOrExchange.svg';
import '../../../../assets/icons/buy_you_gifts.svg';
import SuccessOptInModal from './SuccessOptInModal';
import {
  SUB_TITLE_FLEXIBLE_LBL,
  SUB_TITLE_FLEXIBLE_DESC_LBL,
  SUB_TITLE_EXCHANGES_LBL,
  DONE_BTN_LBL,
  MAY_NEXT_TIME_BTN_LBL,
  OPT_IN_BTN_LBL,
  RBYR_SUB_TITLE_LBL,
  RBYR_TITLE_LBL,
  OPT_OUT_BOTTOM_TEXT1_LBL,
  OPT_OUT_BOTTOM_TEXT2_LBL,
  SUB_TITLE_EXCHANGES_DESC_LBL,
  OPT_OUT_LINK_US_LBL,
  OPT_OUT_LINK_LBL,
} from './constants';

const DangerousHTML = dangerousHTML(DangerousHTML);
const isCanadaUSTbs =
  getSiteId() === 'BedBathCanada' || getSiteId() === 'TBS_BedBathUS';
export class RBYRModal extends React.PureComponent {
  static propTypes = {
    showModal: PropTypes.bool,
    handleLearnMoreClick: PropTypes.func,
    onSelectRBYROption: PropTypes.func,
    fromEditForm: PropTypes.bool,
    isFromTipsModule: PropTypes.bool,
    saveOptInDetailsFromTipsModule: PropTypes.func,
    SuccessOptInMod: PropTypes.bool,
    RBYRAlreadyOptIn: PropTypes.bool,
    registryId: PropTypes.string,
    isMobile: PropTypes.bool,
    loginModalVisibility: PropTypes.bool,
    openRBYRModal: PropTypes.func,
    toggleLoginModalState: PropTypes.func,
    onModalClose: PropTypes.func,
    loginLabels: PropTypes.object,
    path: PropTypes.string,
    hideLoginView: PropTypes.bool,
  };
  static defaultProps = {};
  constructor(props) {
    super(props);

    this.state = {
      storedValueOptIn: true,
    };
  }

  /* istanbul ignore next */
  fireTealiumEvent = (actionType, actionData, pageName, diffPageName) => {
    const store = getStoreRef();
    if (store && typeof store.dispatch === 'function') {
      store.dispatch(
        triggerTealiumEvent(actionType, actionData, pageName, diffPageName)
      );
    }
  };

  handleOptInButton = () => {
    const { storedValueOptIn } = this.state;
    const {
      isFromTipsModule,

      saveOptInDetailsFromTipsModule,
    } = this.props;

    if (
      isFromTipsModule &&
      typeof saveOptInDetailsFromTipsModule === 'function'
    ) {
      const actionType = RBYR_TEALIUM.OPT_IN_ACTION;
      this.fireTealiumEvent(
        actionType,
        getRBYRTealiumData({
          page_name: RBYR_TEALIUM.OPT_IN_MODAL,
          cta_pagetype: actionType,
          call_to_actiontype: actionType,
          rbyr_call_to_actiontype: actionType,
          pagename_breadcrumb: RBYR_TEALIUM.OPT_IN_MODAL,
        }),
        actionType
      );
      saveOptInDetailsFromTipsModule(storedValueOptIn);
    } else {
      this.props.handleLearnMoreClick();
      this.props.onSelectRBYROption(true);
    }
  };
  handleOptOutButton = () => {
    /* istanbul ignore next */
    if (this.props.isFromTipsModule) {
      const actionType = RBYR_TEALIUM.OPT_OUT_ACTION;
      this.fireTealiumEvent(
        actionType,
        getRBYRTealiumData({
          page_name: RBYR_TEALIUM.LEARN_MORE_TIPS_MODAL,
          cta_pagetype: actionType,
          call_to_actiontype: actionType,
          rbyr_call_to_actiontype: actionType,
          pagename_breadcrumb: RBYR_TEALIUM.LEARN_MORE_TIPS_MODAL,
        }),
        actionType
      );
    }
    this.props.handleLearnMoreClick();
    this.props.onSelectRBYROption(false);
  };
  doneButton = e => {
    this.props.handleLearnMoreClick();
    e.preventDefault();
  };
  /** This function return Button as Required (Single Button Done) or (Two Button one for optIn and optOut) */
  renderButton = () => {
    const { fromEditForm, RBYRAlreadyOptIn } = this.props;
    return fromEditForm || RBYRAlreadyOptIn ? (
      <GridX className="small-12 large-12 mt3">
        <Cell
          className={classnames('large-5 small-12', styles.doneButtonStyle)}
        >
          <Button
            them="primary"
            onClick={e => this.doneButton(e)}
            variation="primary"
            className={classnames('fullWidth')}
          >
            {DONE_BTN_LBL}
          </Button>
        </Cell>
      </GridX>
    ) : (
      <GridX className="small-12 large-12 mt3">
        <Cell className={classnames('large-6 small-12 px2 py1')}>
          <Button
            them="primary"
            onClick={e => this.handleOptInButton(e)}
            variation="primary"
            className={classnames('fullWidth')}
          >
            {OPT_IN_BTN_LBL}
          </Button>
        </Cell>
        <Cell className={classnames('large-6 small-12 px2 py1')}>
          <Button
            them="secondary"
            onClick={e => this.handleOptOutButton(e)}
            variation="secondary"
            className={classnames('fullWidth')}
          >
            {MAY_NEXT_TIME_BTN_LBL}
          </Button>
        </Cell>
      </GridX>
    );
  };
  /** Render Feature of RBYR in Modal (Middle part of modal) */
  renderFeature = () => {
    return (
      <GridX className={classnames(styles.blueBannerPanel, styles.popupPanel)}>
        <Cell className={classnames('px3 pb2 mt3', styles.imagesSection)}>
          {this.renderFeatureColumn(
            SUB_TITLE_FLEXIBLE_LBL,
            'ShipOrExchange',
            SUB_TITLE_FLEXIBLE_DESC_LBL
          )}
          <div className={classnames(styles.middleImage)}>
            <Icon type="plus-black" width="20px" height="20px" />
          </div>
          {this.renderFeatureColumn(
            SUB_TITLE_EXCHANGES_LBL,
            'buy_you_gifts',
            SUB_TITLE_EXCHANGES_DESC_LBL
          )}
        </Cell>
      </GridX>
    );
  };

  renderFeatureColumn(subtitleFeature, iconType, subTitleFeatureDesc) {
    return (
      <div>
        <h3 className={classnames(styles.featuresubTitle)}>
          {pathOr(
            `${subtitleFeature}`,
            `rbyrLabels.${subtitleFeature}`,
            this.props
          )}
        </h3>
        <Icon
          className={classnames('m2', styles.icon)}
          type={iconType}
          width="135px"
          height="90px"
        />

        <p className={classnames(styles.featureSubTitleDesc)}>
          {pathOr(
            `${subTitleFeatureDesc}`,
            `rbyrLabels.${subTitleFeatureDesc}`,
            this.props
          )}
        </p>
      </div>
    );
  }
  /**
   * Function returning the id with which to identify the referred content data.
   * @param {[object]} labels [Labels object]
   * @returns {[string]} id [Content ID from labels to match with data returned from dynamic content api call]
   */

  render() {
    const {
      SuccessOptInMod,
      RBYRAlreadyOptIn,
      isFromTipsModule,
      registryId,
      isMobile,
      loginModalVisibility,
      openRBYRModal,
      toggleLoginModalState,
      onModalClose,
      loginLabels,
      path,
      hideLoginView,
    } = this.props;
    let tealiumPageName = RBYR_TEALIUM.LEARN_MORE_EDIT_MODAL;
    /* istanbul ignore next */
    if (isFromTipsModule) {
      tealiumPageName = RBYR_TEALIUM.OPT_IN_MODAL;
    }
    return (
      <React.Fragment>
        <ModalDialog
          mountedState={this.props.showModal}
          toggleModalState={this.props.handleLearnMoreClick}
          titleAriaLabel="Modal"
          closeIconShow
          verticallyCenter
          variation="medium"
        >
          <ErrorBoundary>
            <TealiumHandler
              identifier={RBYR_TEALIUM.IDENTIFIER}
              tealiumPageInfoNotAvailable
              utagData={getRBYRTealiumData({
                page_name: tealiumPageName,
                pagename_breadcrumb: tealiumPageName,
              })}
            />
          </ErrorBoundary>
          <p className={classnames(styles.rbyrModalTitle)}>{RBYR_TITLE_LBL}</p>
          <p className={classnames(styles.rbyrModalSubTitle, 'mb3')}>
            {RBYR_SUB_TITLE_LBL}
          </p>
          {this.renderFeature()}
          {this.renderButton()}
          {RBYRAlreadyOptIn === false && isFromTipsModule && (
            <div>
              <div className="mt3">
                <hr className={classnames(styles.line)} />
              </div>
              <div className="mt3 center">
                <span className={classnames(styles.optOutLinkText)}>
                  {OPT_OUT_BOTTOM_TEXT1_LBL}
                </span>{' '}
                <PrimaryLink
                  href="#"
                  variation="myPrefrences"
                  className={classnames(styles.optOutLink)}
                  onClick={this.props.handleLearnMoreClick}
                >
                  {isCanadaUSTbs ? OPT_OUT_LINK_LBL : OPT_OUT_LINK_US_LBL}
                </PrimaryLink>{' '}
                <span className={classnames(styles.optOutLinkText)}>
                  {OPT_OUT_BOTTOM_TEXT2_LBL}
                </span>
              </div>
            </div>
          )}
        </ModalDialog>
        {SuccessOptInMod && (
          <SuccessOptInModal registryId={registryId} isMobile={isMobile} />
        )}
        {loginModalVisibility && openRBYRModal && (
          <ModalDialog
            mountedState={loginModalVisibility}
            toggleModalState={toggleLoginModalState}
            underlayClickExits={false}
            titleAriaLabel="SignInModal"
            titleClass="mt1 mb1"
            verticallyCenter
            variation="small"
            onModalClose={onModalClose}
            closeDataLocator="checkout-crossicon"
            dialogClass={classnames(
              loginModalVisibility && hideLoginView && 'hide'
            )}
          >
            <AccountSignIn
              inPage={false}
              {...this.props}
              afterSignInUrl={path}
              labels={loginLabels}
            />
          </ModalDialog>
        )}
      </React.Fragment>
    );
  }
}

export default RBYRModal;
