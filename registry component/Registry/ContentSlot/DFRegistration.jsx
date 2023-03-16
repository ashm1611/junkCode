import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import qs from 'qs';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { publish } from '@bbb-app/utils/pubsub';
import AccountSignIn from '@bbb-app/account-signin/containers/AccountSignIn.async';
import DFOptInModal from '../DiaperFundModal/DFOptInModal';
import DiaperFundModal from '../../../../containers/Pages/Registry/DiaperFundModal/DiaperFundModal';
import { submitRegistryData } from '../../../../containers/Pages/Registry/EditRegistry/EditRegistryConfig';
import { registryState } from '../DiaperFundModal/OptInModalRegistryData';

const propTypes = {
  loginLabels: PropTypes.object,
  updateGroupGiftOptInInfo: PropTypes.func,
  pathname: PropTypes.string,
  location: PropTypes.object,
  getRegistryOwnerFirstCategory: PropTypes.func,
  registryId: PropTypes.string,
  registryCode: PropTypes.string,
  eventDate: PropTypes.string,
  isRemainingItemFetching: PropTypes.bool,
  quickItemAddedTS: PropTypes.bool,
  isAddToRegistryFetching: PropTypes.bool,
};

export class DFRegistration extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleAccountSignInModal: false,
      isAddingQuickAddItemToList: false,
    };
    this.toggleDFOptInModalState = this.toggleDFOptInModalState.bind(this);
    this.toggleAddDFModalState = this.toggleAddDFModalState.bind(this);
    this.isOPtInSelected = false;
  }

  componentDidMount() {
    const groupGiftOptIn = pathOr(
      false,
      'registryData.registryResVO.registrySummaryVO.groupGiftOptIn',
      this.props
    );
    if (groupGiftOptIn) {
      this.toggleAddDFModalState(true);
    } else if (!groupGiftOptIn && isUserLoggedIn()) {
      this.toggleDFOptInModalState(true);
    } else if (!groupGiftOptIn && isUserRecognized()) {
      this.path = this.props.location.pathname;
      this.toggleLoginModalState(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.toggleAccountSignInModal && isUserLoggedIn()) {
      this.toggleLoginModalState(false);
    }
    if (
      nextProps.isAddToRegistryFetching &&
      !this.props.isAddToRegistryFetching
    ) {
      this.setState({ isAddingQuickAddItemToList: true });
    }
    if (
      !this.props.isRemainingItemFetching &&
      nextProps.isRemainingItemFetching
    ) {
      this.isOPtInSelected = false;
      this.setState({ isAddingQuickAddItemToList: false });
    }
    if (this.props.quickItemAddedTS !== nextProps.quickItemAddedTS) {
      this.setState({ isAddingQuickAddItemToList: true });
    }
  }

  handleOptInButton = groupGiftingOptIn => {
    let activeRegistry = {};
    let regState = {};
    try {
      ServiceUtil.triggerServerRequest({
        url: getApiEndPointsFromStore('fetchEditRegistryData').replace(
          ':registryId',
          this.props.registryId
        ),
        method: 'GET',
        headers: {
          'atg-rest-depth': 7,
        },
      })
        .then(data => {
          if (data && data.body.serviceStatus === 'SUCCESS') {
            activeRegistry =
              data && data.body.data.registryResVO.registrySummaryVO;
            regState = registryState(activeRegistry);
            const payload = submitRegistryData(
              regState,
              activeRegistry.eventType,
              activeRegistry.registryId,
              activeRegistry.eventTypeCode
            );
            payload.groupGiftingOptIn = groupGiftingOptIn;
            try {
              ServiceUtil.triggerServerRequest({
                url: getApiEndPointsFromStore('editRegistry'),
                method: 'PUT',
                showLoader: true,
                data: qs.stringify(payload),
              })
                .then(newdata => {
                  const { serviceStatus } = newdata && newdata.body;
                  if (serviceStatus === 'SUCCESS') {
                    this.props.updateGroupGiftOptInInfo(groupGiftingOptIn);
                    this.setState({
                      toggleAddDFModal: true,
                      toggleDFOptInModal: false,
                    });
                    this.isOPtInSelected = true;
                  }
                })
                .catch(e => {
                  const errorMessage = pathOr(
                    '',
                    ['body', 'response', 'data', 'errorMessages', '0'],
                    e
                  );
                  this.setState({
                    errorMessages: errorMessage,
                  });
                });
            } catch (e) {
              const errorMessage = pathOr(
                '',
                ['body', 'response', 'data', 'errorMessages', '0'],
                e
              );
              this.setState({
                errorMessages: errorMessage,
              });
            }
          }
        })
        .catch(e => {
          const errorMessage = pathOr(
            '',
            ['body', 'response', 'data', 'errorMessages', '0'],
            e
          );
          this.setState({
            errorMessages: errorMessage,
          });
        });
    } catch (e) {
      const errorMessage = pathOr(
        '',
        ['body', 'response', 'data', 'errorMessages', '0'],
        e
      );
      this.setState({
        errorMessages: errorMessage,
      });
    }
  };

  toggleAddDFModalState = value => {
    this.setState({ toggleAddDFModal: !!value });
    const { registryId, registryCode, eventDate } = this.props;
    if (!value) {
      if (this.isOPtInSelected) {
        this.isOPtInSelected = false;
        this.props.getRegistryOwnerFirstCategory(
          registryId,
          registryCode,
          eventDate,
          true
        );
      }
      publish('DFStartAdding', false);
    }
  };

  toggleDFOptInModalState = value => {
    this.setState({ toggleDFOptInModal: !!value });
    if (!value) {
      publish('DFStartAdding', false);
    }
  };

  toggleLoginModalState = value => {
    this.setState({ toggleAccountSignInModal: !!value });
    if (isUserLoggedIn()) {
      this.setState({
        toggleDFOptInModal: true,
      });
    }

    if (!isUserLoggedIn() && !value) {
      publish('DFStartAdding', false);
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* render Add DF Modal if user already opted in for GroupGifting */}
        {this.state.toggleAddDFModal && (
          <ModalDialog
            mountedState={this.state.toggleAddDFModal}
            toggleModalState={this.toggleAddDFModalState}
            underlayClickExits={false}
            scrollDisabled={false}
            titleAriaLabel="DiaperFundModal"
            dialogClass={'baseAppContainer'}
            titleClass="mt1 mb1"
            verticallyCenter
            variation="medium"
            onModalClose={this.toggleAddDFModalState}
            closeDataLocator="registry-AddDFModal-crossicon"
          >
            <DiaperFundModal
              {...this.props}
              isAddingQuickAddItemToList={this.state.isAddingQuickAddItemToList}
            />
          </ModalDialog>
        )}
        {/* render DF Opt-In modal if user is LoggedIn and not opted in for GroupGifting */}
        {this.state.toggleDFOptInModal && (
          <ModalDialog
            mountedState={this.state.toggleDFOptInModal}
            toggleModalState={this.toggleDFOptInModalState}
            underlayClickExits={false}
            scrollDisabled={false}
            titleAriaLabel="DFOptInModal"
            dialogClass={'baseAppContainer'}
            titleClass="mt1 mb1"
            verticallyCenter
            variation="medium"
            onModalClose={this.toggleDFOptInModalState}
            closeDataLocator="registry-DFOptInModal-crossicon"
          >
            <DFOptInModal
              handleOptInButton={this.handleOptInButton}
              {...this.props}
            />
          </ModalDialog>
        )}
        {/* render Account Sign in modal if user is Recognised and not opted in for GroupGifting */}
        {this.state.toggleAccountSignInModal && (
          <ModalDialog
            mountedState={this.state.toggleAccountSignInModal}
            toggleModalState={this.toggleLoginModalState}
            underlayClickExits={false}
            titleAriaLabel="SignInModal"
            titleClass="mt1 mb1"
            verticallyCenter
            variation="small"
            onModalClose={this.toggleLoginModalState}
            closeDataLocator="registry-accountSignIn-crossicon"
          >
            <AccountSignIn
              {...this.props}
              inPage={false}
              afterSignInUrl={this.path}
              labels={this.props.loginLabels}
              modalLabels={this.props.loginLabels}
            />
          </ModalDialog>
        )}
      </React.Fragment>
    );
  }
}

DFRegistration.propTypes = propTypes;
export default DFRegistration;
