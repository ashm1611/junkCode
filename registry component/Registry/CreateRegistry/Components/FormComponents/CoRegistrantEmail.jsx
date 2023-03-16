import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import GridX from '@bbb-app/core-ui/grid-x';
import RenderInput from './RenderInput';
import {
  checkForRequired,
  profileStatusConstant,
} from '../../CreateRegistryUtils';
import CoregistrantModal from './../../Components/CoregistrantModal/CoregistrantModal';
import { OPTIONAL_LBL, CO_EMAIL_LBL } from './constants';

/**
 *@param {object}  labels,
  @param {object} registryInputFields,
  @param {func} updateState,
  @param {object} stateObj,
  @param {func} fetchCoRegistrantProfileStatus,
  @param {func} resetCoRegistrantProfileStatus,
  @param {object} coRegProfileStatus,
  @param {object} referredContent,
 */
class CoRegistrantEmail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCoregistrantModalOpen: false,
      coRegProfileStatusFlag: null,
    };
    this.checkCoRegistrantProfileStatus = this.checkCoRegistrantProfileStatus.bind(
      this
    );
    this.toggleCoregistrantModalState = this.toggleCoregistrantModalState.bind(
      this
    );
    this.closeCoregistrantModal = this.closeCoregistrantModal.bind(this);
    this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
    this.lastCoEmail = pathOr('', 'stateObj.coEmail', props);
    this.focusableElmntOnCoRegistrantModalClose = '';
  }

  componentWillReceiveProps(nextProps) {
    const coRegProfileStatusValue = pathOr(
      null,
      'coRegProfileStatus',
      nextProps
    );
    if (
      !isEmpty(coRegProfileStatusValue) &&
      coRegProfileStatusValue.atgResponse === 'true' &&
      !this.state.coRegProfileStatusFlag
    ) {
      this.props.updateState({
        coRegProfileStatus: 'true',
      });
      this.setState({ coRegProfileStatusFlag: true });
    } else if (
      !isEmpty(coRegProfileStatusValue) &&
      !this.state.coRegProfileStatusFlag
    ) {
      this.props.updateState({
        coRegProfileStatus: 'false',
      });
      this.setState({ coRegProfileStatusFlag: true });
    }
    this.coRegistrantModal(nextProps);
  }
  /**
   * handle state of modal on the basis of coRegProfileStatus and referredContent
   */
  coRegistrantModal(nextProps) {
    if (
      !isEmpty(nextProps.coRegProfileStatus) &&
      !isEmpty(nextProps.referredContent)
    ) {
      this.setState({ isCoregistrantModalOpen: true });
    }
  }

  resetCoRegistrantEmailId() {
    const stateObj = {
      coEmail: '',
    };
    this.lastCoEmail = '';
    this.props.updateState(stateObj);
  }
  elementFocus(elmnt) {
    if (elmnt && typeof elmnt.focus === 'function') {
      elmnt.focus();
    }
  }
  focusCoRegistrantEmailField() {
    if (this.focusableElmntOnCoRegistrantModalClose) {
      const elmnt = this.focusableElmntOnCoRegistrantModalClose;
      setTimeoutCustom(this.elementFocus(elmnt), 0);
    }
  }

  resetCoRegistrantProfileStatus() {
    if (this.state.isCoregistrantModalOpen) {
      this.props.resetCoRegistrantProfileStatus();
    }
  }

  resetIsCoregistrantModalOpen(value) {
    this.setState(
      () => ({
        isCoregistrantModalOpen: value,
      }),
      () => {
        this.enableEventDate();
      }
    );
  }
  /**
   * toggle modal state
   */
  toggleCoregistrantModalState(value) {
    this.resetCoRegistrantProfileStatus();
    this.resetIsCoregistrantModalOpen(value);
    this.resetCoRegistrantEmailId();
    setTimeoutCustom(() => this.focusCoRegistrantEmailField(), 1);
  }

  /**
   * handle button click
   */
  handleOkButtonClick(e) {
    this.props.coRegEmailFlag(true);
    e.preventDefault();
    if (
      this.props.coRegProfileStatus.atgResponse ===
      profileStatusConstant.NON_SISTER
    ) {
      this.toggleCoregistrantModalState(false);
    } else {
      this.resetCoRegistrantProfileStatus();
      this.resetIsCoregistrantModalOpen(false);
      this.focusCoRegistrantEmailField();
    }
    this.setState({ coRegProfileStatusFlag: null });
  }

  /**
   * close modal
   */
  closeCoregistrantModal(e) {
    this.enableEventDate();
    e.preventDefault();
    this.toggleCoregistrantModalState(false);
    this.setState({ coRegProfileStatusFlag: null });
  }

  /**
   * check co-registrant profile status on email field blur event
   */
  checkCoRegistrantProfileStatus = (e, returnValue) => {
    const { value } = e.target;
    this.focusableElmntOnCoRegistrantModalClose = e.target;
    if (
      isEmpty(returnValue.coEmailError) &&
      value &&
      value !== this.lastCoEmail
    ) {
      this.props.fetchCoRegistrantProfileStatus(value, true);
    } else {
      this.enableEventDate();
    }
    this.lastCoEmail = value;
  };

  enableEventDate() {
    const atDateFlag = pathOr(false, 'atDateFlag', this.props);
    /* istanbul ignore else */
    if (atDateFlag) return;
    const eventDate =
      typeof document !== 'undefined'
        ? document.getElementById('eventDate')
        : null;
    const showerDate =
      typeof document !== 'undefined'
        ? document.getElementById('showerDate')
        : null;
    if (this.props.isMobile) {
      if (eventDate) {
        eventDate.setAttribute('type', 'date');
        eventDate.removeAttribute('disabled');
      }
      if (showerDate) {
        showerDate.setAttribute('type', 'date');
        showerDate.removeAttribute('disabled');
      }
    }
  }

  /**
   * render co-registrant modal
   */
  renderCoregistrantModal = () => {
    const { isCoregistrantModalOpen } = this.state;
    const {
      labels,
      coRegProfileStatus,
      referredContent,
      stateObj,
      globalSwitchConfig,
    } = this.props;
    return (
      <CoregistrantModal
        profileStatus={coRegProfileStatus.atgResponse}
        labels={labels}
        handleOkButtonClick={this.handleOkButtonClick}
        referredContent={referredContent}
        isCoregistrantModalOpen={isCoregistrantModalOpen}
        coRegistrantEmail={stateObj.coEmail}
        toggleCoregistrantModalState={this.toggleCoregistrantModalState}
        closeCoregistrantModal={this.closeCoregistrantModal}
        globalSwitchConfig={globalSwitchConfig}
      />
    );
  };
  render() {
    const {
      registryInputFields,
      stateObj,
      updateState,
      dataLocator,
      isMobile,
    } = this.props;
    const { isCoregistrantModalOpen } = this.state;
    return (
      <ErrorBoundary>
        <GridX className={'grid-margin-x'}>
          <RenderInput
            fieldName="coEmail"
            validation="coEmail"
            label={`${CO_EMAIL_LBL} ${OPTIONAL_LBL}`}
            afterValidation={this.checkCoRegistrantProfileStatus}
            type="text"
            required={checkForRequired(registryInputFields.CoRegistrantEmail)}
            dataLocator={dataLocator.registrycoEmail}
            coEmailError={stateObj.coEmailError}
            updateState={updateState}
            value={stateObj.coEmail}
            isMobile={isMobile}
            comparatorProp={{
              comapareEmail: stateObj.email,
            }}
            maxLength={50}
            autocomplete="nope" // 'nope' is used as hack to stop browsers from autofilling as off is not working for all cases.
          />
        </GridX>
        {isCoregistrantModalOpen && this.renderCoregistrantModal()}
      </ErrorBoundary>
    );
  }
}

CoRegistrantEmail.propTypes = {
  labels: PropTypes.object,
  registryInputFields: PropTypes.object.isRequired,
  updateState: PropTypes.func,
  stateObj: PropTypes.object,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  resetCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  referredContent: PropTypes.object,
  dataLocator: PropTypes.object,
  isMobile: PropTypes.bool,
  coRegEmailFlag: PropTypes.func,
  globalSwitchConfig: PropTypes.object,
};

CoRegistrantEmail.defaultProps = {
  coRegEmailFlag: () => {},
};

export default CoRegistrantEmail;
