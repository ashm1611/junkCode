/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import getSiteId from '@bbb-app/utils/getSiteId';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Message from '@bbb-app/core-ui/message';
import Button from '@bbb-app/core-ui/button';
import focus from '@bbb-app/hoc/focus';
import AccountSignInContainer from '@bbb-app/account-signin/containers/AccountSignIn.async';
import FormWrapper from '@bbb-app/forms/containers/FormWrapper/FormWrapper';
import RenderInput from '@bbb-app/forms/components/FormInput';
import { getCookie } from '@bbb-app/utils/universalCookie';
import RegistrationFormContainer from '../../../../../../../app/containers/Pages/AccountRegistration/RegistrationForm/RegistrationForm';
import BabyRegistryForm from '..//BabyRegistryForm/BabyRegistryForm';
import OtherRegistryForm from '../OtherRegistryForm/OtherRegistryForm';
import { eventTypeConst } from '../../CreateRegistryUtils';
import { SUBMIT_BUTTON_LBL } from '../../constants';
import WelcomeRewards from '../../../../../../containers/Pages/AccountRewards/WelcomeRewards';

const FocusableMessage = focus(Message);

/**
 * @param {object} labels [Labels and strings to be rendered on Create registry page]
 * @param {pbject} registryInputs
 * @param {object} registryConfig [Registry switch config]
 * @param {object} personalisedLables [Labels and strings to be rendered for Password component]
 * @param {func} listenProfileStatusChange
 * @param {object} stateObj [state Object]
 * @param {object} dataLocator [Object representing data locators for different fields]
 * @param {function} handleGenderChange
 * @param {function} handleCoGenderChange
 * @param {function} passwordErrorPresent
 * @param {function} updatePasswordData
 * @param {function} passwordErrorPresent
 * @param {function} onSelectSubscribe
 * @param {function} onSelectThirdPartyOption
 * @param {function} updateState
 * @param {function} showMoveInfo
 * @param {function} hideMoveInfo
 * @param {function} showShippingInfo
 * @param {function} hideShippingInfo
 * @param {function} checkFormSubmit
 * @param {object} error
 * @param {object} channelType
 * @param {object} fetchCoRegistrantProfileStatus
 * @param {object} coRegProfileStatus
 */
const propTypes = {
  labels: PropTypes.object,
  registryInputs: PropTypes.object,
  personalisedLables: PropTypes.object,
  registryConfig: PropTypes.object,
  listenProfileStatusChange: PropTypes.func,
  stateObj: PropTypes.object,
  passwordErrorPresent: PropTypes.func,
  updatePasswordData: PropTypes.func,
  onSelectSubscribe: PropTypes.func,
  handleSignSisterSite: PropTypes.func,
  onSelectThirdPartyOption: PropTypes.func,
  updateState: PropTypes.func,
  showMoveInfo: PropTypes.func,
  hideMoveInfo: PropTypes.func,
  showShippingInfo: PropTypes.func,
  hideShippingInfo: PropTypes.func,
  checkFormSubmit: PropTypes.func,
  error: PropTypes.object,
  channelType: PropTypes.string,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  referredContent: PropTypes.object,
  resetCoRegistrantProfileStatus: PropTypes.func,
  dataLocator: PropTypes.object,
  isModalOpen: PropTypes.bool,
  flagOptional: PropTypes.bool,
  pageConfigGlobal: PropTypes.object,
  isBabyRegistry: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  loginLabels: PropTypes.object,
  enableNewSignUp: PropTypes.bool,
  registrationLabels: PropTypes.object,
  location: PropTypes.obj,
  formWrapperDataRegisterOrLogin: PropTypes.obj,
  formWrapperIdentifierRegisterOrLogin: PropTypes.string,
  regProfileStatus: PropTypes.obj,
};
/**
 * @method renderErrorMessage to render error message
 * @param {object} error an error object
 */
const renderErrorMessage = error => {
  const lockErrorMessage = pathOr('', '[0].message', error);
  const message = lockErrorMessage.split(':');
  message.shift();
  const errorMessage = message.join();
  return (
    <Notification
      status={'error'}
      content={
        errorMessage && errorMessage.length ? errorMessage : lockErrorMessage
      }
      wrapperClass={'p1 mb2 large-8 small-12 mx-auto'}
    />
  );
};

/**
 * @method focusAbleMessage Add focusable mesaage to show server side error
 * @param {*} error
 */
const focusAbleMessage = error => {
  const errorMessage = renderErrorMessage(error);
  // if (typeof errorMessage !== 'string') return null;
  // need to make sure that it's retuning a React component otherwise use the above code
  return (
    <Cell className={classnames('large-8 small-12 mx-auto')}>
      <FocusableMessage>{errorMessage}</FocusableMessage>
    </Cell>
  );
};
/**
 * Renders registry form based on registry type. Other Registry form handles all the registries apart from Baby registry.
 */
const RenderCreateRegistryForm = props => {
  const {
    labels,
    registryInputs,
    personalisedLables,
    registryConfig,
    listenProfileStatusChange,
    stateObj,
    passwordErrorPresent,
    updatePasswordData,
    onSelectSubscribe,
    handleSignSisterSite,
    onSelectThirdPartyOption,
    updateState,
    showMoveInfo,
    hideMoveInfo,
    showShippingInfo,
    hideShippingInfo,
    checkFormSubmit,
    error,
    channelType,
    fetchCoRegistrantProfileStatus,
    coRegProfileStatus,
    referredContent,
    resetCoRegistrantProfileStatus,
    dataLocator,
    isModalOpen,
    flagOptional,
    pageConfigGlobal,
    isBabyRegistry,
    isCABabyRegistry,
    isLoggedIn,
    loginLabels,
    enableNewSignUp,
    registrationLabels,
    location,
    formWrapperDataRegisterOrLogin,
    formWrapperIdentifierRegisterOrLogin,
  } = props;
  const isErrorPresent = !isEmpty(error);
  const loginRule = pathOr('', 'params.loginRule', location);
  const isWeddingRegistry = registryInputs.eventType === eventTypeConst.WEDDING;
  const isBabyRegistryInBaby =
    registryInputs.eventType === eventTypeConst.BABY &&
    getSiteId() === 'BuyBuyBaby';

  const signUpFromRegistry =
    (((isWeddingRegistry || isBabyRegistryInBaby) && enableNewSignUp) ||
      isCABabyRegistry) &&
    (!isLoggedIn || loginRule === 'addToRegistry' || isUserRecognized());
  const [displayFormIndex, setDisplayFormIndex] = useState(0);
  function changeRegistryFormTypeId(value) {
    setDisplayFormIndex(value);
  }
  const createRegistrySubmitBtn = () => (
    <GridX className={'grid-margin-x'}>
      <Cell className={classnames('pt1 large-6 small-12')}>
        <Button
          id="createRegistry-submitBtn"
          variation="fullWidth"
          theme="primary"
          type="submit"
          onSubmit={e => checkFormSubmit(registryInputs, e)}
          aria-label="createRegistry-submit"
          data-locator="registry-startmyregistrybtn"
        >
          {isBabyRegistry ||
          isCABabyRegistry ||
          registryInputs.eventType === eventTypeConst.WEDDING
            ? 'create registry'
            : SUBMIT_BUTTON_LBL}
        </Button>
      </Cell>
    </GridX>
  );

  const isFreeTierMember = getCookie('loyt') === 0 || getCookie('loyt') === '0';

  const displayForm =
    isLoggedIn &&
    props.regProfileStatus &&
    (props.regProfileStatus.loyaltyExists === 'false' ||
      !props.regProfileStatus.loyaltyExists) ? (
      <WelcomeRewards
        isBeyondRejected={
          props.regProfileStatus && props.regProfileStatus.tncAccepted
        }
        inPage
        isBeyondPlusLandingPage={false}
        callFromReg
        isFreeTierMember={isFreeTierMember}
      />
    ) : (
      <FormWrapper
        className="pt3"
        noValidate
        name="createRegistry"
        id="createRegistry-formWrapper"
        autoComplete="off"
        onSubmit={e => checkFormSubmit(registryInputs, e)}
        formWrapperData={formWrapperDataRegisterOrLogin || {}}
        identifier={formWrapperIdentifierRegisterOrLogin}
      >
        <RenderInput
          name="somefakefirstName"
          id="somefakefirstName"
          type="text"
          className="hide"
          tabIndex="-1"
          aria-hidden="true"
        />
        <RenderInput
          name="somefakeLastName"
          id="somefakeLastName"
          type="text"
          className="hide"
          tabIndex="-1"
          aria-hidden="true"
        />
        <RenderInput
          name="somefakepassword"
          id="somefakepassword"
          type="password"
          className="hide"
          tabIndex="-1"
          aria-hidden="true"
        />
        <RenderInput
          name="somefakeconfirmpassword"
          id="somefakeconfirmpassword"
          type="password"
          className="hide"
          tabIndex="-1"
          aria-hidden="true"
        />
        {registryInputs.eventType === eventTypeConst.BABY ? (
          <Fragment>
            <BabyRegistryForm
              labels={labels}
              registryInputs={registryInputs}
              stateObj={stateObj}
              updateState={updateState}
              passwordErrorPresent={passwordErrorPresent}
              updatePasswordData={updatePasswordData}
              personalisedLables={personalisedLables}
              onSelectSubscribe={onSelectSubscribe}
              handleSignSisterSite={handleSignSisterSite}
              onSelectThirdPartyOption={onSelectThirdPartyOption}
              registryConfig={registryConfig}
              listenProfileStatusChange={listenProfileStatusChange}
              showShippingInfo={showShippingInfo}
              hideShippingInfo={hideShippingInfo}
              showMoveInfo={showMoveInfo}
              hideMoveInfo={hideMoveInfo}
              channelType={channelType}
              fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
              coRegProfileStatus={coRegProfileStatus}
              referredContent={referredContent}
              resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
              dataLocator={dataLocator}
              isModalOpen={isModalOpen}
              {...props}
            />
            {createRegistrySubmitBtn()}
          </Fragment>
        ) : (
          <Fragment>
            <OtherRegistryForm
              labels={labels}
              registryInputs={registryInputs}
              stateObj={stateObj}
              updateState={updateState}
              passwordErrorPresent={passwordErrorPresent}
              updatePasswordData={updatePasswordData}
              personalisedLables={personalisedLables}
              onSelectSubscribe={onSelectSubscribe}
              handleSignSisterSite={handleSignSisterSite}
              onSelectThirdPartyOption={onSelectThirdPartyOption}
              registryConfig={registryConfig}
              listenProfileStatusChange={listenProfileStatusChange}
              showShippingInfo={showShippingInfo}
              hideShippingInfo={hideShippingInfo}
              showMoveInfo={showMoveInfo}
              hideMoveInfo={hideMoveInfo}
              channelType={channelType}
              fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
              coRegProfileStatus={coRegProfileStatus}
              referredContent={referredContent}
              resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
              dataLocator={dataLocator}
              isModalOpen={isModalOpen}
              pageConfigGlobal={pageConfigGlobal}
              flagOptional={flagOptional}
              fromCreateRegistryPage
              {...props}
            />
            {createRegistrySubmitBtn()}
          </Fragment>
        )}
      </FormWrapper>
    );

  return (
    <div className={classnames('grid-container')}>
      <GridX>
        {isErrorPresent && focusAbleMessage(error)}
        <Cell
          className={classnames('small-12 mx-auto mt3 ', {
            'large-4': signUpFromRegistry,
            'large-8': !signUpFromRegistry,
          })}
        >
          {signUpFromRegistry ? (
            <Cell className={classnames('flex')}>
              {displayFormIndex === 0 && (
                <AccountSignInContainer
                  labels={loginLabels}
                  hideCreateAccountLink
                  inPage
                  signUpFromWedRegistry={signUpFromRegistry}
                  changeRegistryFormTypeId={changeRegistryFormTypeId}
                  enableNewSignUp={enableNewSignUp}
                />
              )}
              {displayFormIndex === 1 && (
                <RegistrationFormContainer
                  labels={registrationLabels}
                  signUpFromWedRegistry={signUpFromRegistry}
                  changeRegistryFormTypeId={changeRegistryFormTypeId}
                  enableNewSignUp={enableNewSignUp}
                />
              )}
            </Cell>
          ) : (
            displayForm
          )}
        </Cell>
      </GridX>
    </div>
  );
};
RenderCreateRegistryForm.propTypes = propTypes;
export default RenderCreateRegistryForm;
