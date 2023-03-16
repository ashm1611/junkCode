import React from 'react';
import PropTypes from 'prop-types';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import CopyRegistryModal from './CopyRegistryModal.async';
import { COPY_REGISTRY_LBL, COPY_REGISTRY_MOB_LBL } from '../../../constants';
import '../../../../../../assets/icons/copy-registry.svg';

export default class CopyRegistry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalMountedState: false,
    };
  }
  toggleModalState = state => {
    this.setState({ modalMountedState: state });
  };

  handleButtonClick = event => {
    event.preventDefault();
    this.props.resetResponse();
    this.setState({ modalMountedState: !this.state.modalMountedState });
  };

  toggleRemoveModalState = state => {
    this.setState({
      modalMountedState: state,
    });
  };

  render() {
    return (
      <div>
        <PrimaryLink
          title="Copy Registry"
          href="/"
          type="bold"
          onClick={this.handleButtonClick}
          iconProps={{
            type: 'copy-registry',
            width: '20px',
            height: '20px',
          }}
          variation="primaryColoredIcon"
        >
          {this.props.isMobile ? COPY_REGISTRY_MOB_LBL : COPY_REGISTRY_LBL}
        </PrimaryLink>
        <ModalDialog
          mountedState={this.state.modalMountedState}
          toggleModalState={this.toggleModalState}
          titleAriaLabel="Copy Registry Modal"
          verticallyCenter
          variation="small"
          scrollDisabled
        >
          {this.state.modalMountedState && (
            <CopyRegistryModal
              {...this.props}
              onClickLinkCancel={this.toggleRemoveModalState}
            />
          )}
        </ModalDialog>
      </div>
    );
  }
}

CopyRegistry.propTypes = {
  resetResponse: PropTypes.func,
  isMobile: PropTypes.bool,
};
