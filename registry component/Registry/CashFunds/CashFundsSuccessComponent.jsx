import React from 'react';
import PropTypes from 'prop-types';
import Img from '@bbb-app/core-ui/image';
import Button from '@bbb-app/core-ui/button';
import Heading from '@bbb-app/core-ui/heading';
import pathOr from 'lodash/fp/pathOr';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import { ROUTE_REGISTRY_OWNNER } from '@bbb-app/constants/route/route';
import styles from './CashFunds.css';
import { VIEW_FUND_LBL } from './constants';
const propTypes = {
  handleCashFundsModalClose: PropTypes.func,
  redirectTo: PropTypes.func,
  registryId: PropTypes.string,
  fireTealiumAction: PropTypes.func,
  fireCashFundLoadTelium: PropTypes.func,
  dynamicData: PropTypes.object,
};

const CashFundsSuccessComponent = props => {
  const {
    redirectTo,
    handleCashFundsModalClose,
    registryId,
    fireTealiumAction,
    fireCashFundLoadTelium,
  } = props;
  const handleViewFund = () => {
    const PAGENAME = `Cash Fund Confirmation`;
    const pageInfo = {
      page_name: PAGENAME,
    };
    const tealiumInfo = {
      pagename_breadcrumb: PAGENAME,
      link_name: PAGENAME,
    };
    fireTealiumAction(true, tealiumInfo, pageInfo);
    redirectTo(ROUTE_REGISTRY_OWNNER.replace(':id?', registryId));
    handleCashFundsModalClose();
  };
  const successHeading = pathOr('', 'SuccessHeading', props.dynamicData);
  const successSubcopy = pathOr('', 'SuccessSubcopy', props.dynamicData);
  const imgPath = pathOr('', 'SuccessImg.src', props.dynamicData);
  const viewFundBtn = () => (
    <div className={styles.viewBtn}>
      <Button
        id="viewMyFunds-Btn"
        variation="fullWidth"
        theme="primary"
        type="continue"
        onSubmit={'#'}
        className={styles.ventoFont}
        onClick={handleViewFund}
        aria-label="viewMyFunds"
        data-locator="viewMyFunds-Btn"
      >
        {VIEW_FUND_LBL}
      </Button>
    </div>
  );
  return (
    <div className={styles.cfSucWrapper}>
      {fireCashFundLoadTelium('Create_Cash_Fund_Success')}
      <Img
        src={getRectifiedURLFromScene7URL(imgPath)}
        className={styles.cfSuccessImg}
      />
      <Heading level={5} className={styles.cfSucHeader}>
        {successHeading}
      </Heading>
      <p className={styles.subCopy}>{successSubcopy}</p>
      {viewFundBtn()}
    </div>
  );
};

CashFundsSuccessComponent.propTypes = propTypes;

export default CashFundsSuccessComponent;
