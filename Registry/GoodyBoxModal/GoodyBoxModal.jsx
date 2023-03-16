import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  makeSelectLabels,
  makeSelectGlobalSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import toJS from '@bbb-app/hoc/toJS';
import GoodyBoxModalComponent from '../../../../components/Pages/Registry/GoodyBoxModal/GoodyBoxModal';
import styles from '../../../../components/Pages/Registry/GoodyBoxModal/GoodyBoxModal.css';
import { initiateInactivityModal } from '../../../../containers/Pages/Registry/RegistryOwner/actions';

export function GoodyBoxModal(props) {
  const cartModalclass = props.hideParentModal ? 'hide' : '';

  return (
    <ModalDialog
      mountedState={props.isGoodyBoxModalOpen}
      toggleModalState={props.openGoodyBoxModalOpen}
      verticallyCenter
      underlayClickNoExit
      scrollDisabled={false}
      titleId="Goody Box modal"
      titleAriaLabel="Goody Box modal has opened up"
      dialogClass={classNames(
        cartModalclass,
        styles.dailogClass,
        'baseAppContainer'
      )}
      contentWrapperClass={styles.modalContentRegistry}
    >
      <GoodyBoxModalComponent {...props} />
    </ModalDialog>
  );
}

GoodyBoxModal.propTypes = {
  isGoodyBoxModalOpen: PropTypes.bool,
  openGoodyBoxModalOpen: PropTypes.func,
  hideParentModal: PropTypes.any,
};

export const mapStateToProps = createStructuredSelector({
  labels: makeSelectLabels(['Registry', 'GoodyBox']),
  labelsRef: makeSelectLabels(['Registry']),
  enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
});

export const mapDispatchToProps = dispatch => ({
  initiateInactivityModal: inactivityModalState => {
    dispatch(initiateInactivityModal(inactivityModalState));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(toJS(GoodyBoxModal));
