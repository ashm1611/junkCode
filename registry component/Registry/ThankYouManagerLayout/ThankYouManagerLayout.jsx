import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import { getUserState } from '@bbb-app/utils/common';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { LOGGED_IN_STATE_ENUM } from '@bbb-app/constants/appConstants';
import TYMSurpriseView from './TYMSurpriseView/TYMSurpriseView';
import TymList from './TYMList/TymList';
import TYMSignIn from '../../../../containers/Pages/Registry/TYMSignIn/TYMSignIn';
import ThankYouEmpty from '../RegistryOwner/ThankYouEmpty/ThankYouEmpty';
import { RegistryOwnerPath } from '../../../../containers/Pages/Registry/RegistryOwner/constants';
import { DATE_PURCHASED_NEW_LBL } from '../constants';

class ThankYouManagerLayout extends React.PureComponent {
  static propTypes = {
    enableTymDynamicContent: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired,
    thankYouListSurpriseData: PropTypes.object,
    registryData: PropTypes.object,
    revealThankYouList: PropTypes.func,
    registryId: PropTypes.string.isRequired,
    listDatatym: PropTypes.array,
    scene7UrlConfig: PropTypes.string,
    userLoggedIn: PropTypes.bool,
    getLoginStatus: PropTypes.func,
    loginLabels: PropTypes.object,
    displayLoginModal: PropTypes.func,
    loginModalVisibility: PropTypes.bool,
    globalSwitchConfig: PropTypes.object,
    isMobile: PropTypes.object,
    previousRoute: PropTypes.string,
    mPulseEnabled: PropTypes.bool,
    isNewDashboard: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDropdownOption: DATE_PURCHASED_NEW_LBL,
      sortOrder: '1',
      sortDirection: '1',
      redirectToPreviousRoute: false,
    };
    this.getContentID = this.getContentID.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    /*
      If the status of userLoggedIn retrieved from 'thankyoumanager' API is false,
      the below code displays the login modal for user to sign in.

      Ensures to open the login modal every time the tab is opened if the userLoggedIn is false.
    */

    const { userLoggedIn } = this.props;
    if (userLoggedIn === false) {
      this.props.displayLoginModal(true);
    }
  }

  componentDidUpdate(prevProps) {
    /*
      If the status of userLoggedIn retrieved from 'thankyoumanager' API is false,
      the below code displays the login modal for user to sign in.

      Watches for the userLoggedIn status turn true to false by comparing the prevProp
      when the recognized user access the Thank You List for the first time.
    */

    const { userLoggedIn } = this.props;
    if (prevProps.userLoggedIn !== userLoggedIn) {
      if (userLoggedIn === false) {
        this.props.displayLoginModal(true);
      }
    }

    if (getUserState() !== LOGGED_IN_STATE_ENUM.RECOGNIZED) {
      this.props.displayLoginModal(false);
    }
  }
  onDeviceVerificationModalOpen = () => this.setState({ hideLoginView: true });
  onDeviceModalClose = () => {
    const { displayLoginModal } = this.props;
    this.setState({
      hideLoginView: false,
    });
    displayLoginModal(false);
  };
  /**
   *
   * @param {object} labels
   * @param {string} contentKey
   */
  getContentID(labels, contentKey) {
    let id = null;
    const referredContent = labels.referredContent;
    referredContent.forEach(obj => {
      if (obj.key === contentKey) {
        id = obj.id;
      }
    });
    return id;
  }

  updateView(view, sortOrder, sortDirection) {
    this.setState({
      selectedDropdownOption: view,
      sortOrder,
      sortDirection,
    });
  }

  toggleLoginModalState = () => {
    this.props.displayLoginModal(false);
    this.setState({ redirectToPreviousRoute: true });
  };

  render() {
    const listItems = this.props.listDatatym;
    const CONTENT_HEADING = 'tymSurpriseContentHeading';
    const CONTENT_SUB_HEADING = 'tymSurpriseContentSubHeading';
    const SEND_THANK_YOU_HEADING = 'sendThankYouHeading';
    const SEND_THANK_YOU_DESCRIPTION = 'sendThankYouDescription';
    const HEADING_ID = this.getContentID(this.props.labels, CONTENT_HEADING);
    const SUB_HEADING_ID = this.getContentID(
      this.props.labels,
      CONTENT_SUB_HEADING
    );
    const SEND_THANK_YOU_HEADING_ID = this.getContentID(
      this.props.labels,
      SEND_THANK_YOU_HEADING
    );

    const SEND_THANK_YOU_DESCRIPTION_ID = this.getContentID(
      this.props.labels,
      SEND_THANK_YOU_DESCRIPTION
    );

    const {
      globalSwitchConfig,
      registryId,
      userLoggedIn,
      isMobile,
      previousRoute,
      mPulseEnabled,
      isNewDashboard,
    } = this.props;

    const renderThankYouManagerLayout = () => {
      return (
        <React.Fragment>
          {mPulseEnabled && (
            <Instrumentation
              zoneName={'ux-primary-content-displayed'}
              markName={'ux-text-registry-home-content'}
            />
          )}
          {this.props.enableTymDynamicContent === 'true' &&
          this.props.thankYouListSurpriseData &&
          this.props.thankYouListSurpriseData.content &&
          typeof this.props.thankYouListSurpriseData.content[HEADING_ID] !==
            'undefined' ? (
            <TYMSurpriseView
              thankYouListSurpriseData={this.props.thankYouListSurpriseData}
              revealThankYouList={this.props.revealThankYouList}
              registryId={this.props.registryId}
              headingId={HEADING_ID}
              subHeadingId={SUB_HEADING_ID}
              isMobile={isMobile}
              isNewDashboard={isNewDashboard}
            />
          ) : (
            ''
          )}
          {this.props.enableTymDynamicContent === 'false' &&
          listItems.length > 0 ? (
            <TymList
              tymListItems={listItems}
              scene7URL={this.props.scene7UrlConfig}
              labels={this.props.labels}
              sortOrder={this.state.sortOrder}
              sortDirection={this.state.sortDirection}
              globalSwitchConfig={globalSwitchConfig}
              showFilters
              updateView={this.updateView}
              selectedDropdownOption={this.state.selectedDropdownOption}
              isNewDashboard={isNewDashboard}
              {...this.props}
            />
          ) : (
            ''
          )}
          {this.props.enableTymDynamicContent === 'false' &&
          listItems.length === 0 ? (
            <ThankYouEmpty
              registryData={this.props.registryData}
              headingId={SEND_THANK_YOU_HEADING_ID}
              descriptionId={SEND_THANK_YOU_DESCRIPTION_ID}
              registryId={registryId}
              labelData={this.props.thankYouListSurpriseData}
              isNewDashboard={isNewDashboard}
              {...this.props}
            />
          ) : null}
        </React.Fragment>
      );
    };

    const renderLoginModal = () => {
      const { loginModalVisibility, getLoginStatus, loginLabels } = this.props;

      return (
        <ModalDialog
          mountedState={loginModalVisibility}
          toggleModalState={this.toggleLoginModalState}
          underlayClickExits={false}
          titleAriaLabel="ThankYouManager"
          titleClass="mt1 mb1"
          verticallyCenter
          variation="small"
          closeDataLocator="checkout-crossicon"
          dialogClass={classnames(this.state.hideLoginView ? 'hide' : '')}
        >
          <TYMSignIn
            getLoginStatus={getLoginStatus}
            labels={loginLabels}
            registryId={registryId}
            onDeviceVerificationModalOpen={this.onDeviceVerificationModalOpen}
            hideLoginView={this.state.hideLoginView}
            onDeviceModalClose={this.onDeviceModalClose}
            fromTYMSignIn
          />
        </ModalDialog>
      );
    };

    if (this.state.redirectToPreviousRoute) {
      const myItemsPath = `${RegistryOwnerPath}${registryId}`;
      if (previousRoute) {
        return <Redirect to={previousRoute} />;
      }
      return <Redirect to={myItemsPath} />;
    }

    return userLoggedIn ? renderThankYouManagerLayout() : renderLoginModal();
  }
}

export default ThankYouManagerLayout;
