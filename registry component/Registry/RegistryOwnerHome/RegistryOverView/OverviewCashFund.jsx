import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import styles from './StatusBar.css';

function OverviewCashFund(props) {
  if (isEmpty(props.statusBar)) return null;
  const cashFundTitle = props.statusBar.tile[0];
  return (
    <ModalDialog
      mountedState
      closeIconShow
      titleAriaLabel="CashFunds-Modal"
      verticallyCenter
      scrollDisabled
      onModalClose={() => props.setModalOpenValue(false)}
      contentWrapperClass={styles.overCashfunds}
    >
      <p className={styles.overcash}>{cashFundTitle.heading}</p>
      <p className={styles.noCash}> {cashFundTitle.subheading} </p>
      <a href={cashFundTitle.cta.href}>
        <button
          className={styles.cashLinks}
          onClick={() => props.setModalOpenValue(false)}
        >
          {cashFundTitle.cta.title}
        </button>
      </a>
    </ModalDialog>
  );
}
OverviewCashFund.propTypes = {
  setModalOpenValue: PropTypes.func,
  statusBar: PropTypes.object,
};
export default OverviewCashFund;
