import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Icon from '@bbb-app/core-ui/icon';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import styles from './FlipFlopStyle.css';

const propTypes = {
  toggleErrorModalState: PropTypes.func,
  imgURL: PropTypes.object,
  closeIconShow: PropTypes.bool,
  labelToShow: PropTypes.string,
  ariaLabel: PropTypes.object,
  mountedState: PropTypes.bool,
};

export class FlipFlopModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { mountedState: this.props.mountedState };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mountedState !== nextProps.mountedState) {
      this.setState({ mountedState: nextProps.mountedState });
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <ModalDialog
          mountedState={this.state.mountedState}
          toggleModalState={this.props.toggleErrorModalState}
          closeIconShow={this.props.closeIconShow}
          titleAriaLabel={this.props.ariaLabel}
          verticallyCenter
        >
          <div className={styles.flipFlopModalContent}>
            <Icon
              type={this.props.imgURL}
              className={styles.flipFlopModalImg}
              focusable="false"
              width={203}
              height={145}
            />
            <div className={styles.flipFlopModalText}>
              {this.props.labelToShow}
            </div>
          </div>
        </ModalDialog>
      </ErrorBoundary>
    );
  }
}

FlipFlopModal.propTypes = propTypes;

export default FlipFlopModal;
