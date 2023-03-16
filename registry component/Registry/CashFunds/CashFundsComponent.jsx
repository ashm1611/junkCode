import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import classnames from 'classnames';
import Img from '@bbb-app/core-ui/image';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Button from '@bbb-app/core-ui/button';
import Heading from '@bbb-app/core-ui/heading';
import Checkbox from '@bbb-app/core-ui/checkbox';
import FormInput from '@bbb-app/forms/components/FormInput';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import pathOr from 'lodash/fp/pathOr';
import styles from './CashFunds.css';
import {
  I_AGREE_LBL,
  BBB_TNC_LBL,
  CREATE_CF_PAGENAME,
  DNT_HAVE_LBL,
  CF_FORM_FIELD_LBLS,
  CF_FORM_FIELD_ERROR_LBLS,
  LEARNMORE_LBL,
  API_ERROR_LBL,
  CLICK_HERE_LBL,
  DNT_HAVE_VENMO_PAGENAME,
  LEARNMORE_LINK,
} from './constants';
const propTypes = {
  cfFormData: PropTypes.object,
  setCfFormData: PropTypes.func,
  ATRStateClear: PropTypes.func,
  handleCreateCashFunds: PropTypes.func,
  dynamicData: PropTypes.object,
  ATRErrorData: PropTypes.object,
  fireTealiumAction: PropTypes.func,
  fireCashFundLoadTelium: PropTypes.func,
};
const CashFundsComponent = props => {
  const {
    handleCreateCashFunds,
    cfFormData,
    setCfFormData,
    ATRErrorData,
    ATRStateClear,
    fireTealiumAction,
    fireCashFundLoadTelium,
  } = props;
  const [submitBtnState, setSubmitBtnState] = useState(false);
  useEffect(() => {
    const {
      fundName,
      venmoUsername,
      totalGoal,
      fundNameError,
      venmoUsernameError,
      totalGoalError,
      cftncCheckbox,
    } = cfFormData;
    const usename = venmoUsername.substring(1);
    const isNoError = !fundNameError && !venmoUsernameError && !totalGoalError;
    if (fundName && usename && totalGoal && isNoError && cftncCheckbox) {
      setSubmitBtnState(true);
    } else setSubmitBtnState(false);
  }, [cfFormData, setSubmitBtnState]);
  const createHeading = pathOr('', 'CreateHeading', props.dynamicData);
  const createSubHeading = pathOr('', 'CreateSubHeading', props.dynamicData);
  const createSubcopy = pathOr('', 'CreateSubcopy', props.dynamicData);
  const imgPath = pathOr('', 'CreateImg.src', props.dynamicData);
  const learnMoreURL = pathOr(
    LEARNMORE_LINK,
    'pageConfig.cashFundsLandingUrl',
    props
  );
  const handleInputChange = e => {
    const { name, value } = e.target;
    let values = value;
    if (name === 'venmoUsername') values = `${value}`;
    if (name === 'totalGoal') values = `${value}`;
    setCfFormData({
      ...cfFormData,
      [name]:
        name === 'venmoUsername' || name === 'totalGoal'
          ? values.slice(1)
          : values,
    });
  };
  const validationFunction = e => {
    const { name, value } = e.target;
    const fieldError = `${name}Error`;
    setCfFormData({
      ...cfFormData,
      [fieldError]: '',
    });
    if (name === 'fundName') {
      if (isEmpty(value) || !/^[a-zA-z\s]+$/.test(value)) {
        setCfFormData({
          ...cfFormData,
          [fieldError]: CF_FORM_FIELD_ERROR_LBLS[name],
        });
      }
    } else if (name === 'venmoUsername') {
      const uname = value.substring(1);
      if (
        isEmpty(uname) ||
        uname.length < 5 ||
        !/^[a-zA-z0-9-_]+$/.test(uname)
      ) {
        setCfFormData({
          ...cfFormData,
          [fieldError]: CF_FORM_FIELD_ERROR_LBLS[name],
        });
      }
    } else if (name === 'last4DigitPhNo') {
      if (isNaN(value) || (value && value.length !== 4)) {
        setCfFormData({
          ...cfFormData,
          [fieldError]: CF_FORM_FIELD_ERROR_LBLS[name],
        });
      }
    } else if (name === 'totalGoal') {
      const goalAmt = value.substring(1);
      if (isNaN(goalAmt) || !(goalAmt >= 1 && goalAmt < 1000000)) {
        setCfFormData({
          ...cfFormData,
          [fieldError]: CF_FORM_FIELD_ERROR_LBLS[name],
        });
      }
    }
  };
  const rendertncCheckbox = () => (
    <div className={styles.flexCell}>
      <div className={classnames(styles.checkbox, 'small-12')}>
        <Checkbox
          type="checkbox"
          name="cftncCheckbox"
          onSelect={e => setCfFormData({ ...cfFormData, cftncCheckbox: e })}
          checked={cfFormData.cftncCheckbox}
          islablevisible={false}
          className={styles.checkboxDisclaimer}
        />
      </div>
      <div className={styles.renderContent}>
        {I_AGREE_LBL}
        <PrimaryLink
          href={'https://venmo.com/legal/us-user-agreement/'}
          className={styles.bold}
          variation={'primary'}
          target={'_blank'}
          isHardSpaReq
          id="tncVenmo"
        >
          {BBB_TNC_LBL}
        </PrimaryLink>
        {LEARNMORE_LBL}
        <PrimaryLink
          href={learnMoreURL}
          className={styles.bold}
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
  const setPlaceHolderValues = name => {
    if (name === 'venmoUsername') {
      return `@${cfFormData[name]}`;
    } else if (name === 'totalGoal') {
      return `$${cfFormData[name]}`;
    }
    return cfFormData[name];
  };
  const continueBtn = () => {
    const itemImgUrl = pathOr('', 'myItemImg.src', props.dynamicData);
    return (
      <Button
        id="cashFunds-continueBtn"
        variation="fullWidth"
        className={styles.paypalcontinue}
        theme={submitBtnState ? 'primary' : 'deactivated'}
        type="continue"
        onClick={() => handleCreateCashFunds(submitBtnState, itemImgUrl)}
        aria-label="cashFunds-continue"
        data-locator="cashFunds-continueFormBtn"
      >
        {CREATE_CF_PAGENAME}
      </Button>
    );
  };
  const renderInput = (name, maxLength) => {
    const fieldError = `${name}Error`;
    const errorClass = cfFormData[fieldError] ? 'errorField' : '';
    return (
      <div className={styles.inputfield}>
        <FormInput
          id={`${name}_fieldName`}
          className={classnames(errorClass, styles.cashfundInput)}
          type={'text'}
          name={name}
          label={CF_FORM_FIELD_LBLS[name]}
          placeholder={CF_FORM_FIELD_LBLS[name]}
          labelPosition="append"
          value={setPlaceHolderValues(name)}
          onFocus={handleInputChange}
          onChange={handleInputChange}
          onBlur={validationFunction}
          data-locator={`cashFundsForm_${name}`}
          isRequired
          aria-label={`${name}_fieldName`}
          shouldShowAsterisk
          maxLength={maxLength}
          {...{
            [fieldError]: cfFormData[fieldError],
          }}
        />
      </div>
    );
  };
  const renderVenmoInput = () => {
    return (
      <div>
        {renderInput('fundName', 30)}
        {renderInput('venmoUsername', 31)}
        {renderInput('last4DigitPhNo', 4)}
        {renderInput('totalGoal', 7)}
      </div>
    );
  };
  const fireTealiumVenmoAcc = () => {
    const pageInfo = {
      page_name: DNT_HAVE_VENMO_PAGENAME,
      page_type: DNT_HAVE_VENMO_PAGENAME,
    };
    const tealiumInfo = {
      link_name: DNT_HAVE_VENMO_PAGENAME,
    };
    fireTealiumAction(true, tealiumInfo, pageInfo);
  };
  const renderVenmoDetails = () => {
    return (
      <React.Fragment>
        {renderVenmoInput()}
        <div className="pt1">
          <PrimaryLink
            href={'https://account.venmo.com/signup'}
            variation={'primary'}
            onClick={() => fireTealiumVenmoAcc()}
            className={styles.dntKnow}
            target={'_blank'}
            isHardSpaReq
          >
            {DNT_HAVE_LBL}
          </PrimaryLink>
        </div>
      </React.Fragment>
    );
  };
  const renderCFComponent = () => {
    return (
      <React.Fragment>
        <Heading level={3} className={styles.header}>
          {createHeading}
        </Heading>
        <Heading level={6} className={styles.subHeader}>
          {createSubHeading}
        </Heading>
        <p className={styles.venmoCopy}>{createSubcopy}</p>
        {ATRErrorData && (
          <Notification
            hasCloseButton
            hasStatusIcon
            closeClick={() => ATRStateClear()}
            status={'error'}
            content={API_ERROR_LBL}
            wrapperClass={'p1 mb2'}
          />
        )}
        {renderVenmoDetails()}
        {rendertncCheckbox()}
        {continueBtn()}
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      {fireCashFundLoadTelium('Create_Cash_Fund')}
      <Img
        src={getRectifiedURLFromScene7URL(imgPath)}
        className={styles.CFContentImg}
      />
      <div className={styles.cfSignInContainer}>{renderCFComponent()}</div>
    </React.Fragment>
  );
};
CashFundsComponent.propTypes = propTypes;
export default CashFundsComponent;
