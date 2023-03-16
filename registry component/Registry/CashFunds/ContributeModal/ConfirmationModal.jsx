import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash/fp';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import Img from '@bbb-app/core-ui/image';
import GridX from '@bbb-app/core-ui/grid-x';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Button from '@bbb-app/core-ui/button';
import Heading from '@bbb-app/core-ui/heading';
import FormWrapper from '@bbb-app/forms/containers/FormWrapper/FormWrapper';
import FormInput from '@bbb-app/forms/containers/FormInput/FormInput';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import ThankYouScreenComponent from '../ThankYouScreen/ThankYouScreenComponent';
import styles from '../CashFunds.css';
import {
  CONFIRN_BTN_LBL,
  DIDNT_LBL,
  API_ERROR_LBL,
  GG_FORM_FIELD_LBLS,
  GG_FORM_FIELD_ERROR_LBLS,
} from '../constants';

const propTypes = {
  ggFormData: PropTypes.object,
  setGGFormData: PropTypes.func,
  handleCashFundsModal: PropTypes.func,
  contributeCashFund: PropTypes.func,
  registryId: PropTypes.number,
  cfSubmitAPIStatus: PropTypes.object,
  clearContributeCashFund: PropTypes.func,
  refNum: PropTypes.number,
  dynamicData: PropTypes.object,
  registryData: PropTypes.object,
  handleTealiumEvent: PropTypes.func,
  personalizationDescription: PropTypes.string,
};
const ConfirmationModal = props => {
  const {
    handleCashFundsModal,
    ggFormData,
    setGGFormData,
    contributeCashFund,
    registryId,
    cfSubmitAPIStatus,
    clearContributeCashFund,
    refNum,
    dynamicData,
    registryData,
    handleTealiumEvent,
    personalizationDescription,
  } = props;
  const [submitBtnState, setSubmitBtnState] = useState(false);
  useEffect(() => {
    const {
      firstName,
      lastName,
      email,
      totalGoal,
      firstNameError,
      lastNameError,
      emailError,
      totalGoalError,
    } = ggFormData;
    const goal = totalGoal.substring(1);
    const isNoError =
      !firstNameError && !lastNameError && !emailError && !totalGoalError;
    if (firstName && lastName && email && goal && isNoError) {
      setSubmitBtnState(true);
    } else setSubmitBtnState(false);
  }, [ggFormData, setSubmitBtnState]);
  const imgPath = pathOr('', 'ggConfirmationImg.src', dynamicData);
  const ggConfirmHeading = pathOr('', 'ggConfirmHeading', dynamicData);
  const ggConfirmationSubcopy = pathOr(
    '',
    'ggConfirmationSubcopy',
    dynamicData
  );
  const PAGENAME_BREADCRUMB = 'Confirm Contribution';
  const registryType = pathOr(
    '',
    'registryResVO.registrySummaryVO.eventType',
    registryData
  );
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
  const getPayLoad = () => {
    const { firstName, lastName, email, totalGoal } = ggFormData;
    const goal = totalGoal.substring(1);
    return {
      firstName,
      lastName,
      email,
      contribution: goal,
      registryId,
      refId: refNum,
    };
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    let values = value;
    if (name === 'totalGoal') values = value[0] === '$' ? value : `$${value}`;
    setGGFormData({ ...ggFormData, [name]: values });
  };

  const validationFunction = e => {
    const { name, value } = e.target;
    const fieldError = `${name}Error`;
    setGGFormData({ ...ggFormData, [fieldError]: '' });
    if (name === 'firstName' || name === 'lastName') {
      if (isEmpty(value) || !/^[a-zA-z\s]+$/.test(value)) {
        setGGFormData({
          ...ggFormData,
          [fieldError]: GG_FORM_FIELD_ERROR_LBLS[name],
        });
      }
    } else if (name === 'email') {
      if (
        isEmpty(value) ||
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        setGGFormData({
          ...ggFormData,
          [fieldError]: GG_FORM_FIELD_ERROR_LBLS[name],
        });
      }
    } else if (name === 'totalGoal') {
      const goalAmt = value.substring(1);
      if (isNaN(goalAmt) || !(goalAmt >= 1 && goalAmt < 1000000)) {
        setGGFormData({
          ...ggFormData,
          [fieldError]: GG_FORM_FIELD_ERROR_LBLS[name],
        });
      }
    }
  };
  const handleTealiumOnConfirmBtn = () => {
    const userName = `${ggFormData.firstName} ${ggFormData.lastName}`;
    const amount = ggFormData.totalGoal;
    const ACTIONTYPE = 'confirm contribution button click';
    const tealiumInfo = {
      pagename_breadcrumb: PAGENAME_BREADCRUMB,
      page_name: PAGENAME_BREADCRUMB,
      link_location_name: ACTIONTYPE,
      registry_type: registryType,
      loyaltystatus: '',
      loyaltyid: '',
      cash_fund_contribution_amount: amount,
      cash_fund_name: userName,
      link_name: ACTIONTYPE,
    };
    handleTealiumEvent(ACTIONTYPE, tealiumInfo, PAGENAME_BREADCRUMB);
    return <ThankYouScreenComponent dynamicData={dynamicData} />;
  };
  const checkFormSubmit = () => {
    contributeCashFund(getPayLoad());
  };

  const continueBtn = () => (
    <Button
      id="GG-confirmBtn"
      variation="fullWidth"
      className="pt3"
      theme={submitBtnState ? 'primary' : 'deactivated'}
      type="confirm"
      identifier="confirmContribute"
      aria-label="GG-confirm"
      data-locator="GG-confirmFormBtn"
    >
      {CONFIRN_BTN_LBL}
    </Button>
  );
  const renderInput = (name, maxLength) => {
    const fieldError = `${name}Error`;
    const errorClass = ggFormData[fieldError] ? 'errorField' : '';
    return (
      <div className={styles.inputfield}>
        <FormInput
          id={name}
          className={errorClass}
          type={'text'}
          name={name}
          validation={name}
          identifier="confirmContribute"
          label={GG_FORM_FIELD_LBLS[name]}
          placeholder={GG_FORM_FIELD_LBLS[name]}
          labelPosition="append"
          value={ggFormData[name]}
          onFocus={handleInputChange}
          onChange={handleInputChange}
          onBlur={validationFunction}
          data-locator={`GGForm_${name}`}
          isRequired
          aria-label={`${name}_fieldName`}
          shouldShowAsterisk
          maxLength={maxLength}
          {...{
            [fieldError]: ggFormData[fieldError],
          }}
        />
      </div>
    );
  };
  const renderVenmoDetails = () => {
    return (
      <div className="pb3">
        {renderInput('firstName', 30)}
        {renderInput('lastName', 30)}
        {renderInput('email', 130)}
        {renderInput('totalGoal', 7)}
      </div>
    );
  };
  const renderCFComponent = () => {
    return (
      <React.Fragment>
        <div className={classnames(styles.headerWidth, 'mx-auto mt2')}>
          <Heading level={5} className={styles.header}>
            {ggConfirmHeading}
          </Heading>
          <p className={classnames('my1 sm-mx3', styles.confSubCopy)}>
            {ggConfirmationSubcopy}
          </p>
        </div>
        {cfSubmitAPIStatus.submitErrorFlag && (
          <Notification
            hasCloseButton
            hasStatusIcon
            closeClick={() => clearContributeCashFund()}
            status={'error'}
            content={API_ERROR_LBL}
            wrapperClass={'p1 mb2'}
          />
        )}
        {renderVenmoDetails()}
        {continueBtn()}
        <div className="pt1">
          <PrimaryLink
            href={'#'}
            variation={'primary'}
            type={'bold'}
            onClick={handleCashFundsModal}
          >
            {DIDNT_LBL}
          </PrimaryLink>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {cfSubmitAPIStatus.submitSuccessFlag ? (
        handleTealiumOnConfirmBtn()
      ) : (
        <React.Fragment>
          <TealiumHandler
            identifier="Confirm_Contribute_Modal"
            tealiumPageInfo={TEALIUM_PAGE_INFO}
            utagData={pageData}
          />
          <GridX className={styles.confWrapper}>
            <Cell>
              <Img src={getRectifiedURLFromScene7URL(imgPath)} />
            </Cell>
            <Cell>
              <FormWrapper
                noValidate
                name="confirmContribute"
                additionalClass="mb25"
                id="contribute-formWrapper"
                identifier="confirmContribute"
                styles={styles}
                onSubmit={checkFormSubmit}
                formWrapperData={ggFormData}
                method="post"
              >
                {renderCFComponent()}
              </FormWrapper>
            </Cell>
          </GridX>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

ConfirmationModal.propTypes = propTypes;

export default ConfirmationModal;
