import React from 'react';
import PropTypes from 'prop-types';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { getSiteId } from '@bbb-app/utils/common';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import CartEmailFormComponent from '@bbb-app/cart-email-form/CartEmailForm.async';
import { emailRegistryTealiumTags } from './emailRegistryTealiumTags';
import {
  ACTIONTYPE,
  TEALIUM_PAGE_INFO,
  EMAIL_REGISTRY_BABY_LBL,
  EMAIL_REGISTRY_LBL,
  EMAIL_REGISTRY_MOB_LBL,
} from './constants';
import '../../../../../assets/icons/email-registry.svg';
import '../../../../../assets/icons/email-registry-black.svg';

export default class EmailRegistry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalMountedState: false,
    };
    this.toggleModalState = this.toggleModalState.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick = event => {
    event.preventDefault();
    this.setState({
      modalMountedState: !this.state.modalMountedState,
    });
    const { toggleShareModalState } = this.props;
    toggleShareModalState();
  };
  toggleModalState = state => {
    this.setState({ modalMountedState: state });

    const { toggleShareModalState } = this.props;
    /* istanbul ignore next */
    if (!state && toggleShareModalState) {
      this.props.toggleShareModalState();
    }

    const { hideShareRegistryModal } = this.props;
    hideShareRegistryModal();
  };
  openModal(e) {
    e.preventDefault();
    this.props.clearSubmitResponse();
    this.toggleModalState(true);
    const tealiumInfo = emailRegistryTealiumTags(this.props.registrySummaryVO);
    /* istanbul ignore next */
    if (this.props.handleTealiumEvent) {
      this.props.handleTealiumEvent(ACTIONTYPE, tealiumInfo, TEALIUM_PAGE_INFO);
    }
  }
  render() {
    const { registryLabel, iconType, linkVariation } = this.props;
    const emailRegistryLbl =
      getSiteId() === 'BuyBuyBaby'
        ? EMAIL_REGISTRY_BABY_LBL
        : EMAIL_REGISTRY_LBL;
    return (
      <div>
        {linkVariation === 'iconOnly' && (
          <PrimaryLink
            title="Email Registry"
            href="/"
            type="bold"
            onClick={this.openModal}
            iconProps={{
              type: iconType,
              width: '20px',
              height: '18px',
            }}
            variation="primaryColoredIcon"
          />
        )}

        {linkVariation !== 'iconOnly' && (
          <PrimaryLink
            title="Email Registry"
            href="/"
            type="bold"
            onClick={this.openModal}
            iconProps={{
              type: iconType,
              width: '20px',
              height: '18px',
            }}
            variation="primaryColoredIcon"
          >
            {this.props.isMobile ? EMAIL_REGISTRY_MOB_LBL : emailRegistryLbl}
          </PrimaryLink>
        )}
        <ModalDialog
          mountedState={this.state.modalMountedState}
          toggleModalState={this.toggleModalState}
          titleAriaLabel="Email Registry Modal"
          verticallyCenter
          variation="small"
          scrollDisabled={false}
          underlayClickExits={false}
          closeModal={this.handleButtonClick}
        >
          <CartEmailFormComponent
            closeModal={this.handleButtonClick}
            {...this.props}
            labels={registryLabel}
            submitForm={this.props.submitForm}
            emailSentResponse={this.props.emailSentResponse}
            variation="emailRegistry"
            clearSubmitResponse={this.props.clearSubmitResponse}
            checkBoxChecked={this.props.checkBoxChecked}
            handleCheckBox={this.props.handleCheckBox}
          />
        </ModalDialog>
      </div>
    );
  }
}

EmailRegistry.propTypes = {
  registryLabel: PropTypes.object,
  submitForm: PropTypes.func,
  emailSentResponse: PropTypes.string,
  clearSubmitResponse: PropTypes.func,
  checkBoxChecked: PropTypes.bool,
  handleCheckBox: PropTypes.func,
  isMobile: PropTypes.bool,
  iconType: PropTypes.string,
  registrySummaryVO: PropTypes.object,
  handleTealiumEvent: PropTypes.func,
  toggleShareModalState: PropTypes.func,
  linkVariation: PropTypes.string,
  hideShareRegistryModal: PropTypes.func,
};

EmailRegistry.defaultProps = {
  iconType: 'email-registry',
  hideShareRegistryModal: () => {},
};
