import React, { useState } from 'react';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './StatusBar.css';
import OverviewCashFund from './OverviewCashFund';
function StatusBar(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const setModalOpenValue = value => {
    setModalOpen(value);
  };
  const giftPurchased = pathOr(
    null,
    'registryResVO.registrySummaryVO.giftPurchased',
    props.registryData
  );
  const giftRemaining = pathOr(
    null,
    'registryResVO.registrySummaryVO.giftRemaining',
    props.registryData
  );
  const cashFundDisplay = pathOr('', 'cashFundTotal', props.activeRegistry);
  const guestCount = pathOr(
    null,
    'registryResVO.registrySummaryVO.eventVO.guestCount',
    props.registryData
  );
  return (
    <div className={styles.status}>
      <div className={styles.allLabels}>
        <button className={classnames(styles.regLinks, styles.noPointer)}>
          Purchased
        </button>
        <p className={styles.noLinks}>{giftPurchased}</p>
      </div>
      <div className={styles.allLabels}>
        <button className={classnames(styles.regLinks, styles.noPointer)}>
          Remaining
        </button>
        <p className={styles.noLinks}>{giftRemaining}</p>
      </div>
      <div className={styles.allLabels}>
        <button
          id="cash-funds"
          className={styles.regCash}
          onClick={() => setModalOpenValue(true)}
        >
          Cash funds
        </button>
        <p className={styles.noLinks}> {` $ ${cashFundDisplay}`}</p>
      </div>

      {modalOpen && cashFundDisplay === 0 && (
        <OverviewCashFund
          modalOpen={modalOpen}
          setModalOpenValue={setModalOpenValue}
          statusBar={props.statusBar}
        />
      )}

      <div className={styles.allLabels}>
        <button
          id="guests"
          className={styles.regLinks}
          onClick={() => props.setGuestModal(true)}
        >
          Guests
        </button>
        {guestCount === '' ? (
          <p className={styles.noLinks}> {0}</p>
        ) : (
          <p className={styles.noLinks}> {guestCount}</p>
        )}
      </div>
    </div>
  );
}
StatusBar.propTypes = {
  registryData: PropTypes.object,
  activeRegistry: PropTypes.object,
  setGuestModal: PropTypes.func,
  statusBar: PropTypes.object,
};

export default StatusBar;
