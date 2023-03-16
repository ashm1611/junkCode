import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import focus from '@bbb-app/hoc/focus';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Message from '@bbb-app/core-ui/message';
import Heading from '@bbb-app/core-ui/heading';
import Checkbox from '@bbb-app/core-ui/checkbox';
import Image from '@bbb-app/core-ui/image';
import { isBedBathCanada } from '@bbb-app/utils/common';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import FormInput from '@bbb-app/forms/components/FormInput';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import Notification from '@bbb-app/core-ui/notification/Notification';
import FormWrapper from '@bbb-app/forms/containers/FormWrapper/FormWrapper';
import AccountSignInContainer from '@bbb-app/account-signin/containers/AccountSignIn.async';
import allRegTypes from '@bbb-app/registry-type/registryTypes';
import DateInput from '../FormComponents/DateInput';
import RenderInput from '../FormComponents/RenderInput';
import CollegeInputField from '../../../../../../containers/Pages/Registry/CollegeInputField/CollegeInputField';
import RegistrationFormContainer from '../../../../../../../app/containers/Pages/AccountRegistration/RegistrationForm/RegistrationForm';
import Skeleton from '../../Skeleton/Skeleton.async';
import styles from './RenderCreateRegistryForm.css';
import {
  CHECK_TEXT_NEW_LBL,
  CHECK_TEXT_NEW_US_LBL,
  PRIVACY_POLICY_URL,
  CHECK_TEXT_LBL_REMAIN_TEXT,
} from '../FormComponents/constants';
const FocusableMessage = focus(Message);
const propTypes = {
  error: PropTypes.object,
  isMobile: PropTypes.bool,
  isFromPDP: PropTypes.bool,
  isFetching: PropTypes.bool,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  loginLabels: PropTypes.object,
  dataLocator: PropTypes.object,
  channelType: PropTypes.string,
  profileData: PropTypes.object,
  checkFormSubmit: PropTypes.func,
  enableNewSignUp: PropTypes.bool,
  registryInputs: PropTypes.object,
  onSelectSubscribe: PropTypes.func,
  isFetchingProfile: PropTypes.bool,
  signUpFromRegistry: PropTypes.bool,
  currentEventCode: PropTypes.string,
  getRegistryInputs: PropTypes.object,
  registrationLabels: PropTypes.object,
  regNewCreateFlowData: PropTypes.object,
  isFetchingCreateRegCall: PropTypes.bool,
  formWrapperDataRegisterOrLogin: PropTypes.obj,
  formWrapperIdentifierRegisterOrLogin: PropTypes.string,
  signInClicked: PropTypes.func,
  verifyClicked: PropTypes.bool,
  verifyPhoneState: PropTypes.bool,
  changePhoneNo: PropTypes.func,
  phoneChangeState: PropTypes.bool,
  clearErrorState: PropTypes.func,
};
const renderErrorMessage = (error, clearErrorState) => {
  const lockErrorMessage = pathOr('', '[0].message', error);
  const message = lockErrorMessage.split(':');
  message.shift();
  const errorMessage = message.join();
  return (
    <Notification
      status={'error'}
      hasStatusIcon
      content={
        errorMessage && errorMessage.length ? errorMessage : lockErrorMessage
      }
      hasCloseButton
      closeClick={() => clearErrorState()}
      wrapperClass={'p1 mb2 large-8 small-12 mx-auto'}
    />
  );
};
const focusAbleMessage = (error, clearErrorState) => {
  const errorMessage = renderErrorMessage(error, clearErrorState);
  return (
    <Cell className={'large-12 small-12 mx-auto'}>
      <FocusableMessage>{errorMessage}</FocusableMessage>
    </Cell>
  );
};
const getRegTypeData = () => {
  return [].concat(
    ...Object.keys(allRegTypes).map(regCategory => {
      return allRegTypes[regCategory]
        .filter(
          x => x.registryName !== 'Birthday' && x.registryName !== 'Retirement'
        )
        .map(x => {
          return {
            eventCode: x.registryCode,
            label: x.registryName,
            props: {
              value: x.registryName,
            },
          };
        });
    })
  );
};
const coRegistantEventTypes = ['BRD', 'HSW', 'ANN', 'COM', 'BA1'];

const RenderCreateRegistryFormV2 = props => {
  const {
    error,
    isMobile,
    stateObj,
    isFromPDP,
    channelType,
    dataLocator,
    isFetching,
    updateState,
    loginLabels,
    profileData,
    registryInputs,
    enableNewSignUp,
    checkFormSubmit,
    currentEventCode,
    onSelectSubscribe,
    getRegistryInputs,
    isFetchingProfile,
    signUpFromRegistry,
    registrationLabels,
    regNewCreateFlowData,
    isFetchingCreateRegCall,
    formWrapperDataRegisterOrLogin,
    formWrapperIdentifierRegisterOrLogin,
    signInClicked,
    verifyClicked,
    verifyPhoneState,
    changePhoneNo,
    phoneChangeState,
    clearErrorState,
  } = props;
  const isErrorPresent = !isEmpty(error);
  const formOptionSet = getRegTypeData();
  const [displayFormIndex, setDisplayFormIndex] = useState(0);
  const [btnTheme, setBtnTheme] = useState('deactivated');
  const [registryType, setRegistryType] = useState('');
  const [show, setShow] = useState(false);
  const updateEventType = value => {
    const selectedIndex = formOptionSet.filter(item => item.label === value);
    setRegistryType(selectedIndex[0].label);
    updateState({ eventCode: selectedIndex[0].eventCode });
    getRegistryInputs(selectedIndex[0].eventCode);
  };
  useEffect(() => {
    if (currentEventCode) {
      const selectedIndex = formOptionSet.filter(
        item => item.eventCode === currentEventCode
      );
      setRegistryType(selectedIndex[0].label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEventCode]);

  useEffect(() => {
    if (currentEventCode === 'COL') {
      if (stateObj.eventDate && stateObj.college) setBtnTheme('primary');
      else setBtnTheme('deactivated');
    } else if (
      coRegistantEventTypes.indexOf(currentEventCode) > -1 &&
      stateObj.eventDate
    ) {
      if (currentEventCode === 'BA1' && !stateObj.coRegistrantNameError) {
        setBtnTheme('primary');
      } else if (!stateObj.coRegistrantNameError && stateObj.coRegistrantName) {
        setBtnTheme('primary');
      } else setBtnTheme('deactivated');
    } else if (stateObj.eventDate) {
      setBtnTheme('primary');
    } else setBtnTheme('deactivated');
  }, [
    currentEventCode,
    stateObj.college,
    stateObj.eventDate,
    stateObj.coRegistrantName,
    stateObj.coRegistrantNameError,
  ]);
  const isUserRecognised = isUserRecognized();
  const changeRegistryFormTypeId = value => {
    setDisplayFormIndex(value);
  };
  const getCheckboxMsg = () => {
    return isBedBathCanada() ? (
      CHECK_TEXT_NEW_LBL
    ) : (
      <React.Fragment>
        {CHECK_TEXT_NEW_LBL}
        {show && (
          <React.Fragment>
            {CHECK_TEXT_NEW_US_LBL}
            <PrimaryLink
              href={PRIVACY_POLICY_URL}
              className={'mx1'}
              variation={'primary'}
              target="_blank"
              isHardSpaReq
            >
              {'Privacy Policy.'}
            </PrimaryLink>
            {CHECK_TEXT_LBL_REMAIN_TEXT}
            <PrimaryLink
              href={`${PRIVACY_POLICY_URL}#Notice-of-Financial`}
              className={styles.privacyPolicy}
              variation={'primary'}
              target="_blank"
              isHardSpaReq
            >
              here.
            </PrimaryLink>
          </React.Fragment>
        )}
        {!show && (
          <button className={styles.seemore} onClick={() => setShow(true)}>
            See More.
          </button>
        )}
      </React.Fragment>
    );
  };
  const registryEmailOptInCheckbox = () => (
    <div className={classnames('pb2', styles.flexCell)}>
      <div
        className={classnames(
          isBedBathCanada() ? styles.checkboxCa : styles.checkbox,
          'small-12'
        )}
      >
        <Checkbox
          type="checkbox"
          name="regEmailOptInCheckBox"
          onSelect={onSelectSubscribe}
          checked={stateObj.subscribeSelected}
          islablevisible={false}
          className={styles.checkboxDisclaimer}
        />
      </div>
      <div className={styles.renderContent}>{getCheckboxMsg()}</div>
    </div>
  );
  const getAccountSigninContainer = () => (
    <div>
      <div className="center">
        <Heading level={1} className={classnames(styles.heading, 'my1')}>
          {isUserRecognised ? 'hello again!' : 'almost there!'}
        </Heading>
        {!isUserRecognised && (
          <Heading level={5} className={styles.subHeading}>
            {displayFormIndex === 0
              ? 'Sign in to manage registries.'
              : 'Create an account so we can save your preferences.'}
          </Heading>
        )}
      </div>
      {displayFormIndex === 0 && (
        <AccountSignInContainer
          labels={loginLabels}
          hideCreateAccountLink
          inPage
          isThirdTab
          changeRegistryFormTypeId={changeRegistryFormTypeId}
          enableNewSignUp={enableNewSignUp}
          enableNewCreateFlow
          isRegistryPage
        />
      )}
      {displayFormIndex === 1 && (
        <RegistrationFormContainer
          labels={registrationLabels}
          signUpFromWedRegistry={signUpFromRegistry}
          changeRegistryFormTypeId={changeRegistryFormTypeId}
          enableNewSignUp={enableNewSignUp}
          enableNewCreateFlow
          changePhoneNo={changePhoneNo}
          phoneChangeState={phoneChangeState}
          signInClicked={signInClicked}
          verifyClicked={verifyClicked}
          verifyPhoneState={verifyPhoneState}
        />
      )}
    </div>
  );
  const createRegistryContinueBtn = () => (
    <Button
      id="newRegistry-submitBtn"
      variation="fullWidth"
      className={!isMobile && 'mb3 mt2'}
      theme={btnTheme}
      type="submit"
      onSubmit={e => checkFormSubmit(registryInputs, e)}
      aria-label="createRegistryNew-submit"
      data-locator="registryNew-continueBtn"
    >
      {signUpFromRegistry ? 'continue' : 'create a registry'}
    </Button>
  );
  const dynamicData =
    regNewCreateFlowData && regNewCreateFlowData[currentEventCode];
  const imgData = dynamicData && pathOr('', 'Image', dynamicData);
  const coRegistantLbl =
    dynamicData && pathOr('', 'coRegistantLbl', dynamicData);
  if (isFetchingCreateRegCall || isFetchingProfile) return null;
  const collegeInputFields = pathOr(
    '',
    'registryInputMap.college',
    registryInputs
  );
  return (
    <div className={classnames(styles.containerWrapper, 'grid-container')}>
      {!(stateObj.isV2SignUpFlow && isMobile) && (
        <Image
          alt={imgData && imgData.altTxt}
          src={isMobile ? imgData && imgData.mobSrc : imgData && imgData.src}
          className={classnames(
            styles.createV2BgImage,
            isFromPDP && styles.hidden
          )}
        />
      )}
      <GridX
        className={classnames(
          'grid-container',
          displayFormIndex === 1 && styles.signUpV2WrapperParent,
          stateObj.isV2SignUpFlow && styles.loginV2WrapperParent,
          styles.createV2WrapperParent
        )}
      >
        <Cell className={classnames(styles.formWrapper, 'mx-auto')}>
          {isFromPDP || stateObj.isV2SignUpFlow ? (
            getAccountSigninContainer()
          ) : (
            <div className={classnames('center mx-auto')}>
              <Heading className={classnames(styles.heading, 'mt1 mb1')}>
                {signUpFromRegistry
                  ? pathOr('', 'Header', dynamicData)
                  : `hi ${profileData.firstName}, ${pathOr(
                      '',
                      'Header',
                      dynamicData
                    )}`}
              </Heading>
              <Heading className={styles.subHeading}>
                {pathOr('', 'subCopy', dynamicData)}
              </Heading>
              {isErrorPresent && focusAbleMessage(error, clearErrorState)}
              {!isFetching && !isEmpty(registryInputs) ? (
                <FormWrapper
                  className={'pt2'}
                  noValidate
                  name="createRegistryNew"
                  id="newRegistry-formWrapper"
                  autoComplete="off"
                  onSubmit={e => checkFormSubmit(registryInputs, e)}
                  formWrapperData={formWrapperDataRegisterOrLogin || {}}
                  identifier={formWrapperIdentifierRegisterOrLogin}
                >
                  <FormInput
                    id="createRegistryNew"
                    type="select"
                    className={'my2'}
                    optionSet={formOptionSet}
                    variationName="dropDownSmall"
                    noLabelDisplay
                    position={'top'}
                    name="createRegistryNew-select-options"
                    defaultValue={registryType}
                    selectOption={updateEventType}
                  />
                  {coRegistantEventTypes.indexOf(currentEventCode) > -1 && (
                    <RenderInput
                      fieldName="coRegistrantName"
                      validation="coRegistrantName"
                      label={coRegistantLbl}
                      type="text"
                      required={currentEventCode !== 'BA1'}
                      dataLocator={dataLocator.registrycoFirstName}
                      coRegistrantNameError={stateObj.coRegistrantNameError}
                      updateState={updateState}
                      value={stateObj.coRegistrantName}
                      maxLength={61}
                    />
                  )}
                  <DateInput
                    id="eventDate"
                    name="eventDate"
                    className={'my2'}
                    dateLabel={`Select a Date ${
                      isBedBathCanada() ? '(dd/mm/yyyy)' : '(mm/dd/yyyy)'
                    }`}
                    eventType={registryInputs.eventType}
                    channelType={channelType}
                    registryInputFields={registryInputs.registryInputMap}
                    required
                    format={isBedBathCanada() ? 'dd/mm/yyyy' : 'mm/dd/yyyy'}
                    dataLocator={dataLocator.registryEventInfoDate}
                    pastYearToDisplay={0}
                    futureYearToDisplay={5}
                    value={stateObj.eventDate}
                    updateState={updateState}
                    eventDateError={stateObj.eventDateError}
                    validation={
                      isBedBathCanada() ? 'eventDateCanada' : 'eventDate'
                    }
                    atDateFlag
                    isMobile={props.isMobile}
                    autocomplete="off"
                    isNewCalender
                  />
                  {currentEventCode === 'COL' &&
                    !isEmpty(collegeInputFields) && (
                      <CollegeInputField
                        registryInputFields={registryInputs.registryInputMap}
                        {...props}
                      />
                    )}
                  {registryEmailOptInCheckbox()}
                  {createRegistryContinueBtn()}
                </FormWrapper>
              ) : (
                <Skeleton />
              )}
            </div>
          )}
        </Cell>
      </GridX>
    </div>
  );
};
RenderCreateRegistryFormV2.propTypes = propTypes;
export default RenderCreateRegistryFormV2;
