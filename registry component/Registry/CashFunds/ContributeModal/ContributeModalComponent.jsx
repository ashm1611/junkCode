import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import Img from '@bbb-app/core-ui/image';
import pathOr from 'lodash/fp/pathOr';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import Button from '@bbb-app/core-ui/button';
import Heading from '@bbb-app/core-ui/heading';
import Checkbox from '@bbb-app/core-ui/checkbox';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import styles from './ContributeModalComponent.css';
import ConfirmationModal from './ConfirmationModal';
import {
  I_AGREE_LBL,
  BBB_TNC_LBL,
  VENMO_LBL,
  DEFAULT_GG_STATE,
  LEARNMORE_LBL,
  CLICK_HERE_LBL,
  GG_NO_ERROR_STATE,
  LEARNMORE_LINK,
} from '../constants';

function ContributeModalComponent(props) {
  const {
    handleCashFundsModal,
    personalisedCode,
    personalizationDescription,
    cashfundsModalState,
    regCashFundEventTypes,
  } = props;
  const learnMoreURL = pathOr(
    LEARNMORE_LINK,
    'pageConfigRegistryOwner.cashFundsLandingUrl',
    props
  );
  const [checked, setChecked] = useState(false);
  const [continueBtnState, setContinueBtnState] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [ggFormData, setGGFormData] = useState({
    ...DEFAULT_GG_STATE,
    ...GG_NO_ERROR_STATE,
  });
  const registryType = pathOr(
    '',
    'registryResVO.registrySummaryVO.eventType',
    props.registryData
  );
  const PAGENAME_BREADCRUMB = 'Contribute to cash fund';
  const TEALIUM_PAGE_INFO = {
    page_name: PAGENAME_BREADCRUMB,
    page_type: 'Registry',
  };
  const pageData = {
    pagename_breadcrumb: PAGENAME_BREADCRUMB,
    page_name: PAGENAME_BREADCRUMB,
    link_location_name: PAGENAME_BREADCRUMB,
    cash_fund_name:
      personalizationDescription !== null && personalizationDescription,
    registry_type: registryType,
    navigation_path: 'Cash Fund',
    subnavigation_path: 'Cash Fund',
  };
  const registryCode = pathOr(
    '',
    'registryResVO.registrySummaryVO.registryType.registryTypeName',
    props.registryData
  );
  const dynamicData =
    regCashFundEventTypes && regCashFundEventTypes[registryCode];
  const imgPath = pathOr('', 'CreateImg.src', dynamicData);
  const ggHeading = pathOr('', 'ggHeading', dynamicData);
  const ggSubcopy = pathOr('', 'ggSubcopy', dynamicData);
  const createSubHeading = pathOr('', 'CreateSubHeading', dynamicData);
  function handleChange(e) {
    const {
      parentNode: { children },
    } = e.target;
    const index = [...children].indexOf(e.target);
    const newState = [...boxes];
    newState[index] = !newState[index];
    setBoxes(newState);
  }

  const tncCheckbox = () => (
    <div className={styles.flexCell}>
      <div className={classnames(styles.checkbox, 'small-12')}>
        <Checkbox
          id="checkbox-1"
          type="checkbox"
          name="cashFundsCheckBox"
          islablevisible={false}
          className={styles.checkboxDisclaimer}
          onClick={() => setChecked(c => !c)}
          checked={checked}
          onChange={handleChange}
        />
      </div>
      <div className={styles.renderContent}>
        {I_AGREE_LBL}
        <PrimaryLink
          href={'https://venmo.com/legal/us-user-agreement/'}
          className={styles.tnc}
          variation={'primary'}
          target={'_blank'}
          isHardSpaReq
          id="tncVemo"
        >
          {BBB_TNC_LBL}
        </PrimaryLink>
        {LEARNMORE_LBL}
        <PrimaryLink
          href={learnMoreURL}
          className={styles.tnc}
          variation={'primary'}
          target={'_blank'}
          isHardSpaReq
          id="tncLandingPage"
        >
          {CLICK_HERE_LBL}
        </PrimaryLink>
      </div>
    </div>
  );
  function isDisabled() {
    const len = boxes.filter(box => box).length;
    return len === 0 || len > 1;
  }
  const handleContinueBtn = () => {
    setContinueBtnState(true);
    window.open(
      `https://venmo.com/?txn=pay&audience=friends&recipients=${props.personalisedCode}&note=Thanks%20for%20giving%20a%20gift`,
      '_blank'
    );
  };
  const continueBtn = () => (
    <Button
      disabled={isDisabled()}
      id="cashFunds-continueBtn"
      variation="fullWidth"
      className={styles.paypalcontinue}
      theme="primary"
      type="continue"
      onSubmit={'#'}
      onClick={handleContinueBtn}
      aria-label="continue"
      data-locator="continueFormBtn"
    >
      {VENMO_LBL}
    </Button>
  );

  const renderContributeModalComponent = () => {
    return (
      <React.Fragment>
        <Img
          src={getRectifiedURLFromScene7URL(imgPath)}
          className={styles.CFContentImg}
        />
        <div className={classnames('grid-container', styles.mainContainer)}>
          <Heading level={5} className={styles.header}>
            {ggHeading}
          </Heading>
          <Heading level={6} className={styles.subHeader}>
            {createSubHeading}
          </Heading>
          <p className={styles.sendMoney}>{ggSubcopy}</p>
          <p className={styles.sendMoney}>
            {`Sending to: @${personalisedCode}`}
          </p>
          {tncCheckbox()}
          {continueBtn()}
        </div>
      </React.Fragment>
    );
  };
  return cashfundsModalState ? (
    <React.Fragment>
      <TealiumHandler
        identifier="Contribute_Modal"
        tealiumPageInfo={TEALIUM_PAGE_INFO}
        utagData={pageData}
      />
      <ModalDialog
        mountedState
        closeIconShow
        titleAriaLabel="CashFunds-Modal"
        verticallyCenter
        scrollDisabled
        variation="small"
        onModalClose={() => {
          handleCashFundsModal();
        }}
        contentWrapperClass={styles.cfWrapper}
      >
        <React.Fragment>
          {continueBtnState ? (
            <ConfirmationModal
              ggFormData={ggFormData}
              setGGFormData={setGGFormData}
              dynamicData={dynamicData}
              {...props}
            />
          ) : (
            renderContributeModalComponent()
          )}
        </React.Fragment>
      </ModalDialog>
    </React.Fragment>
  ) : null;
}
ContributeModalComponent.propTypes = {
  handleCashFundsModal: PropTypes.func,
  cashfundsModalState: PropTypes.bool,
  regCashFundEventTypes: PropTypes.object,
  registryData: PropTypes.object,
  personalisedCode: PropTypes.string,
  personalizationDescription: PropTypes.string,
};
export default ContributeModalComponent;
