/* eslint-disable max-params */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Heading from '@bbb-app/core-ui/heading';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import { shouldReCaptchaRender } from '@bbb-app/utils/reCaptcha';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import { getSiteId } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import PasswordValidation from '@bbb-app/forms/components/PasswordValidation';
import RenderInputCommon from '@bbb-app/forms/components/FormInput';
import InputRadio from '@bbb-app/core-ui/input-radio';
import ReCaptcha from '@bbb-app/re-captcha/containers/ReCaptcha.async';
import RecognizedUserVerification from '@bbb-app/account-signin/components/recognized-user-verification/RecognizedUserVerification';
import ResetPassword from '@bbb-app/reset-password/containers/ResetPassword.async';
import '@bbb-app/assets/icons/infoIcon.svg';
import styles from '../../CreateRegistryFormStyles.css';
import RenderInput from './RenderInput';
import CoRegistrantEmail from './CoRegistrantEmail';
import {
  OPTIONAL_LBL,
  COREGISTRANT_INFO_LBL,
  OTHER_TEXT_LBL,
  MAIDEN_NAME_LBL,
  EDIT_REG_PERSONAL_INFO_SUBHEADING_LBL,
  FIRST_NAME_LBL,
  LAST_NAME_LBL,
  EMAIL_LBL,
  BRIDE_OPTION_LBL,
  GROOM_OPTION_LBL,
  CO_REGISTRANT_INFO_TOOL_TIP_BABY_LBL,
  CO_REGISTRANT_INFO_TOOL_TIP_LBL,
  CO_REGISTRANT_INFO_TOOL_TIP_BABY_CANADA_LBL,
} from './constants';

import {
  checkForDisplay,
  checkForRequired,
  eventTypeConst,
  genderConst,
  layoutConst,
  registrantTypeConst,
} from '../../CreateRegistryUtils';
const defaultState = {
  errorMessage: '',
  resetRecaptcha: false,
  recaptchaError: '',
};

const renderOptionalBabyFields = (
  registryInputFields,
  updateState,
  stateObj,
  dataLocator,
  coRegOwner
) => {
  return (
    <React.Fragment>
      <RenderInput
        id="babyMaidenName"
        name="babyMaidenName"
        fieldName="babyMaidenName"
        validation="maidenName"
        label={MAIDEN_NAME_LBL}
        classes={`large-6 small-12`}
        type="text"
        required={checkForRequired(registryInputFields.MaidenName)}
        dataLocator={dataLocator.registryBabyMaidenName}
        updateState={updateState}
        value={stateObj.babyMaidenName}
        babyMaidenNameError={stateObj.babyMaidenNameError}
        disabled={coRegOwner}
        maxLength={30}
      />
      <RenderInputCommon
        name="somefakeMaidenname"
        id="somefakeMaidenname"
        type="text"
        className="hide"
        tabIndex="-1"
        aria-hidden="true"
      />
    </React.Fragment>
  );
};

const renderOptionalWeddingFields = (stateObj, changeValue, dataLocator) => (
  <GridX className={'pb2'}>
    <Cell className={classnames('large-6 small-12')}>
      <div
        className={classnames(styles.textStyle, 'mr1')}
        data-locator="registry-iamlabel"
      >
        {OTHER_TEXT_LBL}
      </div>
      <ul className={styles.radiowrapper}>
        <li className={styles.radiowrapper}>
          <InputRadio
            className={classnames(styles.genderStyle)}
            id="brideOption"
            name="genderOption"
            labelContent={BRIDE_OPTION_LBL}
            value={genderConst.BRIDE}
            labelClass={styles.labelButton}
            data-locator={dataLocator.registryBrideOption}
            variation="button"
            defaultChecked={stateObj.gender === genderConst.BRIDE}
            onClick={e => changeValue(e)}
          />
        </li>
        <li className={styles.radiowrapper}>
          <InputRadio
            className={classnames(styles.genderStyle)}
            id="groomOption"
            name="genderOption"
            labelContent={GROOM_OPTION_LBL}
            value={genderConst.GROOM}
            labelClass={styles.labelButton}
            data-locator={dataLocator.registryGroomOption}
            variation="button"
            defaultChecked={stateObj.gender === genderConst.GROOM}
            onClick={e => changeValue(e)}
          />
        </li>
      </ul>
      <div
        className={classnames(styles.textStyle)}
        data-locator={dataLocator.registryOptionalLink}
      >
        {OPTIONAL_LBL}
      </div>
    </Cell>
  </GridX>
);

const renderEmail = (
  propObj,
  checkRegistrantProfileStatus,
  emailClass = ''
) => {
  const {
    dataLocator,
    coRegOwner,

    stateObj,
    updateState,
    profileData,
    fromCreateRegistryUtil,
    eventType,
  } = propObj;
  const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
  return (
    <RenderInput
      fieldName="email"
      validation="signinEmail"
      label={EMAIL_LBL}
      classes={classnames(isWeddingRegistry ? 'large-12' : emailClass)}
      type="text"
      required
      dataLocator={dataLocator.registryEmail}
      emailError={stateObj.emailError}
      emailInfo={stateObj.emailInfo}
      isRegistryEmail
      updateState={updateState}
      value={stateObj.email ? stateObj.email : ''}
      afterValidation={checkRegistrantProfileStatus}
      disabled={
        (stateObj.isRecognized || stateObj.isLoggedIn || coRegOwner) &&
        !isEmpty(profileData)
      }
      fromPersonalInfo={fromCreateRegistryUtil}
    />
  );
};

const dummyPassword = () => {
  return 'Qq137$729';
};

// eslint-disable-next-line max-params
const renderPassword = (
  stateObj,
  personalisedLables,
  updatePasswordData,
  passwordErrorPresent,
  layout,
  dataLocator,
  otherProps
) => {
  const {
    passwordError,
    confirmPasswordError,
    setPassWordComError,
    submitState,
    formWrapperData,
    formWrapperIdentifier,
    addFormField,
    dummyPasswordVal,
    deviceConfig,
  } = otherProps;

  return (
    <Cell>
      <PasswordValidation
        confirmPasswordRequired={false}
        labels={personalisedLables}
        errorStyle="errorColor"
        passwordErrorPresent={passwordErrorPresent}
        firstName={stateObj.firstName ? stateObj.firstName.trim() : ''}
        lastName={stateObj.lastName ? stateObj.lastName.trim() : ''}
        updatePasswordData={updatePasswordData}
        layout={layout}
        disabledPassword={stateObj.isLoggedIn ? dummyPasswordVal : ''}
        hidePasswordValidationMessages={stateObj.isLoggedIn}
        dataLocator={dataLocator.registryPasswordTextField}
        isDisplayPasswordShowBtn={!stateObj.isLoggedIn}
        disableConfirmPassword={false}
        newPasswordFieldClassName={styles.formError}
        confirmPasswordClassName={styles.formError}
        isProfileExist={stateObj.isProfileExist}
        passwordEmptyError={passwordError}
        confirmPasswordEmptyError={confirmPasswordError}
        passwordComponentChange={setPassWordComError}
        submitState={submitState}
        variation="emptyPasswordValidation"
        formWrapperDataPasswordValidation={formWrapperData}
        formWrapperIdentifier={formWrapperIdentifier}
        addFormField={addFormField}
        deviceConfig={deviceConfig}
      />
    </Cell>
  );
};

class PersonalInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.renderEmailPasswordLayout = this.renderEmailPasswordLayout.bind(this);
    this.renderInputTypesExceptBaby = this.renderInputTypesExceptBaby.bind(
      this
    );
    this.checkRegistrantProfileStatus = this.checkRegistrantProfileStatus.bind(
      this
    );
    this.changeValue = this.changeValue.bind(this);
    this.lastCoEmail = '';
    this.dummyPassword = dummyPassword();
  }

  /**
   * This method will pass the recaptcha validation status to the recaptcha
   * component which will rerender the recaptcha based on the current error/valid state
   * @param {object} args
   * @returns
   * @memberof ReCaptcha
   */
  onRecaptchaValidation = args => {
    const { isValid } = args;
    if (isValid) {
      this.props.updateState({
        isRecaptchaValidated: isValid,
        recaptchaError: '',
      });
    } else {
      this.props.updateState({
        isRecaptchaValidated: isValid,
      });
    }
  };

  /**
   * This method will update the active component's
   *  recaptcha state once the recaptcha component is reset
   * @memberof ReCaptcha
   */
  onResetRecaptcha = () => {
    this.setState({
      resetRecaptcha: false,
    });
  };

  checkRegistrantProfileStatus = e => {
    const { value } = e.target;
    const { isLoggedIn } = this.props.stateObj;
    if (!isLoggedIn) {
      this.props.listenProfileStatusChange(
        value,
        registrantTypeConst.REGISTRANT
      );
    }
  };

  changeValue(e) {
    const { name, value } = e.target;
    if (name === 'genderOption') {
      this.props.updateState({ gender: value });
    } else {
      this.props.updateState({ coGender: value });
    }
  }

  /**
   * This method will render the recaptcha component below the Reset Password link on the Create Registry page
   * when the global and page level keys for
   * the feature are true and will be enabled after aconfigured number of failed attempts
   * @param
   * @returns recaptcha component
   * @memberof ReCaptcha
   */
  CoRegistrantInfoToolTipLabel = siteId => {
    if (siteId === 'Buybuybaby' || siteId === 'TBS_BuyBuyBaby') {
      return CO_REGISTRANT_INFO_TOOL_TIP_BABY_LBL;
    } else if (siteId === 'BedbathCanada' || siteId === 'TBS_BedBathCanada') {
      return CO_REGISTRANT_INFO_TOOL_TIP_BABY_CANADA_LBL;
    }
    return CO_REGISTRANT_INFO_TOOL_TIP_LBL;
  };
  renderRecaptcha() {
    const { reCaptchaActivationCount } = this.props;

    const isRecaptchaVisibleOnPage = shouldReCaptchaRender(
      reCaptchaActivationCount
    );
    this.props.updateState({
      isRecaptchaEnabled: isRecaptchaVisibleOnPage,
    });
    return !this.props.isModalOpen && isRecaptchaVisibleOnPage ? (
      <Cell className="recaptchaElement large-12 small-12 mb3 pt1">
        <ReCaptcha
          onValidation={this.onRecaptchaValidation}
          elementID="createRegistry-recaptcha"
          reset={this.state.resetRecaptcha}
          onResetRecaptcha={this.onResetRecaptcha}
          errorMessage={this.props.stateObj.recaptchaError}
        />
      </Cell>
    ) : (
      ''
    );
  }
  renderInputTypesExceptBaby() {
    const siteId = getSiteId();
    const {
      stateObj,
      updateState,
      labels,
      eventType,
      registryInputFields,
      fetchCoRegistrantProfileStatus,
      referredContent,
      coRegProfileStatus,
      resetCoRegistrantProfileStatus,
      dataLocator,
      isMobile,
      coRegEmailFlag,
      flagOptional,
      editWedRegistry,
      isEditOtherRegistry,
      globalSwitchConfig,
    } = this.props;
    const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
    return (
      <ErrorBoundary>
        <fieldset>
          <GridX>
            <legend className={styles.formLegend}>
              {(!isWeddingRegistry || editWedRegistry || !flagOptional) && (
                <Heading
                  level={2}
                  className={classnames(styles.fieldsSubHeading, {
                    [styles.fieldsFullWidth]:
                      isEditOtherRegistry || editWedRegistry,
                  })}
                >
                  {COREGISTRANT_INFO_LBL}{' '}
                  <Button
                    className={classnames('tooltip-bottom')}
                    data-tooltip={this.CoRegistrantInfoToolTipLabel(siteId)}
                    theme="ghost"
                    variation="noPadding"
                    iconProps={{
                      type: 'infoIcon',
                      height: '14px',
                      width: '14px',
                    }}
                    aria-label={this.CoRegistrantInfoToolTipLabel(siteId)}
                  />
                </Heading>
              )}
            </legend>
          </GridX>
          <GridX className={'grid-margin-x'}>
            {checkForDisplay(registryInputFields.CoRegistrantFirstName) && (
              <RenderInput
                fieldName="coFirstName"
                validation="registrationFirstName"
                label={
                  isWeddingRegistry
                    ? `Your Partner's First Name`
                    : FIRST_NAME_LBL
                }
                classes={`large-6 small-12`}
                type="text"
                required={
                  checkForRequired(registryInputFields.CoRegistrantFirstName) ||
                  stateObj.coLastName.length > 0
                }
                dataLocator={dataLocator.registrycoFirstName}
                coFirstNameError={stateObj.coFirstNameError}
                updateState={updateState}
                value={stateObj.coFirstName}
                maxLength={30}
              />
            )}
            {checkForDisplay(registryInputFields.CoRegistrantLastName) && (
              <RenderInput
                fieldName="coLastName"
                validation="lastName"
                label={LAST_NAME_LBL}
                classes={`large-6 small-12`}
                type="text"
                required={
                  checkForRequired(registryInputFields.CoRegistrantLastName) ||
                  stateObj.coFirstName.length > 0
                }
                dataLocator={dataLocator.registrycoLastName}
                coLastNameError={stateObj.coLastNameError}
                updateState={updateState}
                value={stateObj.coLastName}
                maxLength={30}
              />
            )}
          </GridX>
          {eventType === eventTypeConst.WEDDING && !flagOptional && (
            <GridX>
              <Cell className={classnames('large-6 small-12', styles.rowStyle)}>
                <ul className={styles.radiowrapper}>
                  <li className={styles.radiowrapper}>
                    <InputRadio
                      className={classnames(styles.genderStyle)}
                      id="coBrideOption"
                      name="coGenderOption"
                      labelContent={BRIDE_OPTION_LBL}
                      value={genderConst.BRIDE}
                      labelClass={styles.labelButton}
                      data-locator={dataLocator.registrycoBrideOption}
                      defaultChecked={stateObj.coGender === genderConst.BRIDE}
                      variation="button"
                      onClick={e => this.changeValue(e)}
                    />
                  </li>
                  <li className={styles.radiowrapper}>
                    <InputRadio
                      className={classnames(styles.genderStyle)}
                      id="coGroomOption"
                      name="coGenderOption"
                      labelContent={GROOM_OPTION_LBL}
                      value={genderConst.GROOM}
                      labelClass={styles.labelButton}
                      data-locator={dataLocator.registrycoGroomOption}
                      defaultChecked={stateObj.coGender === genderConst.GROOM}
                      variation="button"
                      onClick={e => this.changeValue(e)}
                    />
                  </li>
                </ul>
              </Cell>
            </GridX>
          )}
          {checkForDisplay(registryInputFields.CoRegistrantEmail) &&
            !flagOptional && (
              <CoRegistrantEmail
                labels={labels}
                registryInputFields={registryInputFields}
                updateState={updateState}
                stateObj={stateObj}
                fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
                referredContent={referredContent}
                coRegProfileStatus={coRegProfileStatus}
                resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
                dataLocator={dataLocator}
                coRegEmailFlag={coRegEmailFlag}
                isMobile={isMobile}
                globalSwitchConfig={globalSwitchConfig}
              />
            )}
        </fieldset>
      </ErrorBoundary>
    );
  }

  renderRecognizedUserVerificationSection() {
    const { stateObj, isEmailVerReqSisterSite } = this.props;
    if (
      (stateObj.showVerMsg || isEmailVerReqSisterSite) &&
      !this.state.hideEmailVerifiedMsg
    ) {
      return (
        <Cell className="small-12 large-12">
          <RecognizedUserVerification
            emailId={stateObj.email}
            lifestagesMessage
            hideCloseIcon={false}
            closeHandler={() => {
              this.setState({
                hideEmailVerifiedMsg: true,
              });
            }}
          />
        </Cell>
      );
    }
    return null;
  }

  renderEmailPasswordLayout() {
    const {
      stateObj,
      passwordErrorPresent,
      updatePasswordData,
      personalisedLables,
      dataLocator,
      passwordError,
      confirmPasswordError,
      setPassWordComError,
      submitState,
      formWrapperData,
      formWrapperIdentifier,
      addFormField,
      deviceConfig,
      resetProfileHardLockedState,
      eventType,
      isBabyRegistry,
      isCABabyRegistry,
      enableNewSignUp,
    } = this.props;
    const isWeddingOrBabyRegistryWithSignUpKey =
      ((eventType === eventTypeConst.WEDDING || isBabyRegistry) &&
        enableNewSignUp) ||
      isCABabyRegistry;
    const isGuestLayout = !(stateObj.isRecognized || stateObj.isLoggedIn);
    const obj = {
      passwordError,
      confirmPasswordError,
      setPassWordComError,
      submitState,
      formWrapperData,
      formWrapperIdentifier,
      addFormField,
      deviceConfig,
      dummyPasswordVal: this.dummyPassword,
    };
    if (isGuestLayout) {
      return (
        <div>
          <GridX className={'grid-margin-x'}>
            {renderEmail(this.props, this.checkRegistrantProfileStatus)}
          </GridX>
          {this.renderRecognizedUserVerificationSection()}
          {checkForDisplay(this.props.registryInputFields.confirmPassword) && (
            <GridX>
              {renderPassword(
                stateObj,
                personalisedLables,
                updatePasswordData,
                passwordErrorPresent,
                layoutConst.ONE_BY_TWO,
                dataLocator,
                obj
              )}
            </GridX>
          )}
          {stateObj.isProfileExist && (
            <ResetPassword
              {...this.props}
              profileHardLocked={stateObj.profileHardLocked}
              resetProfileHardLockedState={resetProfileHardLockedState}
              emailId={isUserRecognized() ? '' : pathOr('', 'email', stateObj)}
              loginType={'registry'}
            />
          )}
          {stateObj.isProfileExist && this.renderRecaptcha()}
        </div>
      );
    }
    return (
      <GridX className={'grid-margin-x'}>
        {!isWeddingOrBabyRegistryWithSignUpKey &&
          renderEmail(
            this.props,
            this.checkRegistrantProfileStatus,
            isBabyRegistry ? 'large-12' : 'large-6'
          )}
        {this.renderRecognizedUserVerificationSection()}
        <Cell
          className={classnames(
            eventType === eventTypeConst.WEDDING || isBabyRegistry
              ? 'large-12'
              : 'large-6',
            'small-12'
          )}
        >
          {!isWeddingOrBabyRegistryWithSignUpKey &&
            renderPassword(
              stateObj,
              personalisedLables,
              updatePasswordData,
              passwordErrorPresent,
              layoutConst.TWO_BY_ONE,
              dataLocator,
              obj
            )}
        </Cell>
        <Cell>
          {!isWeddingOrBabyRegistryWithSignUpKey && stateObj.isRecognized && (
            <ResetPassword
              {...this.props}
              profileHardLocked={stateObj.profileHardLocked}
              resetProfileHardLockedState={resetProfileHardLockedState}
              emailId={isUserRecognized() ? '' : pathOr('', 'email', stateObj)}
              loginType={'registry'}
            />
          )}
        </Cell>
        {stateObj.isRecognized && this.renderRecaptcha()}
      </GridX>
    );
  }

  render() {
    const {
      registryInputFields,
      eventType,
      stateObj,
      updateState,
      editRegistrySubHeading,
      coRegOwner,
      dataLocator,
      flagOptional,
      isBabyRegistry,
      editWedRegistry,
      isCABabyRegistry,
    } = this.props;
    const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
    return (
      <ErrorBoundary>
        <GridX className={'grid-margin-x'}>
          {editRegistrySubHeading ? (
            <Cell className={classnames('large-8 small-12')}>
              <Paragraph theme="largeLight" className={'mt0'}>
                {EDIT_REG_PERSONAL_INFO_SUBHEADING_LBL}
              </Paragraph>
            </Cell>
          ) : null}
          <RenderInput
            fieldName="firstName"
            validation="registrationFirstName"
            label={
              isWeddingRegistry || isCABabyRegistry
                ? 'Your First Name'
                : FIRST_NAME_LBL
            }
            classes={`large-6 small-12`}
            type="text"
            required
            dataLocator={dataLocator.registryFirstName}
            firstNameError={stateObj.firstNameError}
            updateState={updateState}
            value={stateObj.firstName ? stateObj.firstName : ''}
            maxLength={30}
            disabled={coRegOwner}
          />
          <RenderInput
            fieldName="lastName"
            validation="lastName"
            label={LAST_NAME_LBL}
            classes={`large-6 small-12`}
            type="text"
            required
            dataLocator={dataLocator.registryLastName}
            lastNameError={stateObj.lastNameError}
            updateState={updateState}
            value={stateObj.lastName ? stateObj.lastName : ''}
            maxLength={30}
            disabled={coRegOwner}
          />
          {eventType === eventTypeConst.BABY &&
            !isBabyRegistry &&
            !isCABabyRegistry &&
            renderOptionalBabyFields(
              registryInputFields,
              updateState,
              stateObj,
              dataLocator,
              coRegOwner
            )}
        </GridX>
        {eventType === eventTypeConst.WEDDING &&
          !flagOptional &&
          renderOptionalWeddingFields(stateObj, this.changeValue, dataLocator)}
        {eventType === eventTypeConst.WEDDING &&
        !editWedRegistry &&
        flagOptional
          ? [
              eventType !== eventTypeConst.BABY &&
                eventType !== eventTypeConst.COLLEGE &&
                eventType !== eventTypeConst.UNIVERSITY &&
                this.renderInputTypesExceptBaby(),
              this.renderEmailPasswordLayout(),
            ]
          : [
              this.renderEmailPasswordLayout(),
              eventType !== eventTypeConst.BABY &&
                eventType !== eventTypeConst.COLLEGE &&
                eventType !== eventTypeConst.UNIVERSITY &&
                this.renderInputTypesExceptBaby(),
            ]}
      </ErrorBoundary>
    );
  }
}

PersonalInfo.propTypes = {
  labels: PropTypes.object,
  registryInputFields: PropTypes.object.isRequired,
  eventType: PropTypes.string,
  updateState: PropTypes.func,
  stateObj: PropTypes.object,
  passwordErrorPresent: PropTypes.func,
  updatePasswordData: PropTypes.func,
  personalisedLables: PropTypes.object,
  listenProfileStatusChange: PropTypes.func,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  editRegistrySubHeading: PropTypes.bool,
  referredContent: PropTypes.object,
  coRegProfileStatus: PropTypes.object,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegOwner: PropTypes.bool,
  dataLocator: PropTypes.object,
  isMobile: PropTypes.bool,
  coRegEmailFlag: PropTypes.func,
  passwordError: PropTypes.bool,
  confirmPasswordError: PropTypes.bool,
  setPassWordComError: PropTypes.func,
  submitState: PropTypes.bool,
  formWrapperData: PropTypes.object,
  deviceConfig: PropTypes.object,
  formWrapperIdentifier: PropTypes.string,
  addFormField: PropTypes.func,
  reCaptchaActivationCount: PropTypes.string,
  isModalOpen: PropTypes.bool,
  flagOptional: PropTypes.bool,
  isEmailVerReqSisterSite: PropTypes.bool,
  resetProfileHardLockedState: PropTypes.func,
  isBabyRegistry: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
  enableNewSignUp: PropTypes.bool,
  editWedRegistry: PropTypes.bool,
  isEditOtherRegistry: PropTypes.bool,
  globalSwitchConfig: PropTypes.object,
};

PersonalInfo.defaultProps = { listenProfileStatusChange: PropTypes.func };

export default PersonalInfo;
