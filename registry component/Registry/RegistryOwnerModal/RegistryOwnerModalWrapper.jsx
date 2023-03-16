import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import {
  selectDeviceConfig,
  makeSelectIsMobileScreen,
} from '@bbb-app/selectors/configSelector';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { storeDetailsSelector } from '@bbb-app/redux/store-details/selectors';

import { openRegistrantDetailModal } from '../../../../containers/Pages/Registry/RegistryOwner/actions';
import { isRegistrantDetailModalOpen } from '../../../../containers/Pages/Registry/RegistryOwner/selectors';
import { selectRegistrantModalData } from './selectors';
import RegistryOwnerModal from './RegistryOwnerModal.async';

export function RegistryOwnerModalWrapper(props) {
  const titleClose = 'Registry Detail modal has opened up';
  return (
    <ModalDialog
      mountedState={props.isRegistryDetailModalOpen}
      toggleModalState={props.openRegistrantDetailModal}
      verticallyCenter
      underlayClickNoExit
      scrollDisabled={false}
      aria-label={titleClose}
      titleId={titleClose}
      title={titleClose}
      dialogClass={classnames([
        props.qvModalRegistry,
        props.hideParentModal ? 'hide' : '',
      ])}
      contentWrapperClass={props.qvModalContentRegistry}
    >
      <RegistryOwnerModal {...props} />
    </ModalDialog>
  );
}

export const mapStateToProps = createStructuredSelector({
  isRegistryDetailModalOpen: isRegistrantDetailModalOpen(),
  registryModalData: selectRegistrantModalData(),
  deviceConfig: selectDeviceConfig,
  storeDetails: storeDetailsSelector,
  isMobile: makeSelectIsMobileScreen,
});

export const mapDispatchToProps = dispatch => ({
  openRegistrantDetailModal: () => {
    dispatch(openRegistrantDetailModal());
  },
});

RegistryOwnerModalWrapper.propTypes = {
  isRegistryDetailModalOpen: PropTypes.bool,
  openRegistrantDetailModal: PropTypes.any,
  qvModalRegistry: PropTypes.any,
  hideParentModal: PropTypes.any,
  qvModalContentRegistry: PropTypes.any,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(toJS(RegistryOwnerModalWrapper));
