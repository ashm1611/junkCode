import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { pathOr } from 'lodash/fp';
import { isEmpty } from 'lodash';
import Heading from '@bbb-app/core-ui/heading';
import { isBedBathCanada, getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import InputRadio from '@bbb-app/core-ui/input-radio';
import styles from '../../CreateRegistryFormStyles.css';
import RenderInput from './RenderInput';
import DateInput from './DateInput';
import {
  checkForDisplay,
  checkForRequired,
  genderConst,
  eventTypeConst,
  DATE_FORMAT,
  DATE_FORMAT_CA,
  PAST_YEAR_TO_DISPLAY,
  FUTURE_YEAR_TO_DISPLAY,
  BABY_GENDER_AND_DECOR_DELIMETER,
} from '../../CreateRegistryUtils';
import {
  DATE_BABY_LBL,
  DATE_LBL,
  DATE_EVENT_LBL,
  GUEST_APPROXIMATE_LBL,
  BABY_GENDER_HEADING_LBL,
  BABY_GENDER_GIRL_LBL,
  BABY_GENDER_BOY_LBL,
  BABY_GENDER_SURPRISE_LBL,
  COLLEGE_LBL,
  DATE_CANADA_LBL,
} from './constants';
import BabyMultiples from '../../../../../../containers/Pages/Registry/CreateRegistry/BabyMultiples/BabyMultiples';
import CollegeInputField from '../../../../../../containers/Pages/Registry/CollegeInputField/CollegeInputField';

class EventInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(e) {
    const { value } = e.target;
    this.props.updateState({ babyGender: value });
  }

  renderbabyGenderSelection = () => {
    const { stateObj } = this.props;
    return (
      <React.Fragment>
        <Heading level={6} className={classnames('mb2', styles.formQuestion)}>
          {BABY_GENDER_HEADING_LBL}
        </Heading>
        <ul className={classnames(styles.radiowrapper, 'pb2')}>
          <li className={styles.radiowrapper}>
            <InputRadio
              className={classnames(styles.genderStyle)}
              id="babyGenderBoy"
              name="genderOption"
              labelContent={BABY_GENDER_BOY_LBL}
              value={genderConst.BOY}
              labelClass={styles.labelButton}
              variation="button"
              defaultChecked={stateObj.babyGender === genderConst.BOY}
              onClick={e => this.changeValue(e)}
            />
          </li>
          <li className={styles.radiowrapper}>
            <InputRadio
              className={classnames(styles.genderStyle)}
              id="babyGenderGirl"
              name="genderOption"
              labelContent={BABY_GENDER_GIRL_LBL}
              value={genderConst.GIRL}
              labelClass={styles.labelButton}
              variation="button"
              defaultChecked={stateObj.babyGender === genderConst.GIRL}
              onClick={e => this.changeValue(e)}
            />
          </li>
          <li className={styles.radiowrapper}>
            <InputRadio
              className={classnames(styles.genderStyle)}
              id="babyGenderSurprise"
              name="genderOption"
              labelContent={BABY_GENDER_SURPRISE_LBL}
              value={genderConst.SURPRISE}
              labelClass={styles.labelButton}
              variation="button"
              defaultChecked={
                stateObj.babyGender === genderConst.SURPRISE ||
                stateObj.babyGender === ''
              }
              onClick={e => this.changeValue(e)}
            />
          </li>
        </ul>
      </React.Fragment>
    );
  };

  renderbabyMultiplesSelection = () => {
    const {
      labels,
      isMobile,
      updateState,
      stateObj,
      isCreateMode,
      eventType,
      globalSwitchConfig,
    } = this.props;
    const enableCSLabels = pathOr(false, 'enableCSLabels', globalSwitchConfig);
    return (
      <BabyMultiples
        isMobile={isMobile}
        labels={enableCSLabels ? labels : labels.createRegistry}
        styles={styles}
        updateState={updateState}
        stateObj={stateObj}
        isCreateMode={isCreateMode}
        babyGender={stateObj.babyGender}
        eventType={eventType}
      />
    );
  };
  renderBabyRegistryEventInfo = dateEvent => {
    const {
      eventType,
      registryInputFields,
      updateState,
      stateObj,
      channelType,
      dataLocator,
      atDateFlag,
      isMobile,
      isCreateMode,
      isBabyRegistry,
      isCABabyRegistry,
    } = this.props;
    const enableBabyMultiples =
      !isCreateMode &&
      stateObj.babyGender.indexOf(BABY_GENDER_AND_DECOR_DELIMETER) !== -1;

    return (
      <ErrorBoundary>
        {checkForDisplay(registryInputFields.showerDate) && (
          <GridX className={'grid-margin-x'}>
            <Cell
              className={classnames(
                isBabyRegistry || isCABabyRegistry
                  ? 'large-12 small-12'
                  : 'large-6 small-12',
                styles.rowStyle
              )}
            >
              <DateInput
                id="eventDate"
                name="eventDate"
                dateLabel={isCABabyRegistry ? DATE_CANADA_LBL : dateEvent}
                eventType={eventType}
                channelType={channelType}
                registryInputFields={registryInputFields}
                required={checkForRequired(
                  registryInputFields.babyExpectedArivalDate
                )}
                format={isBedBathCanada() ? DATE_FORMAT_CA : DATE_FORMAT}
                dataLocator={dataLocator.registryEventInfoDate}
                pastYearToDisplay={PAST_YEAR_TO_DISPLAY}
                futureYearToDisplay={FUTURE_YEAR_TO_DISPLAY}
                value={stateObj.eventDate}
                updateState={updateState}
                eventDateError={stateObj.eventDateError}
                validation={isBedBathCanada() ? 'eventDateCanada' : 'eventDate'}
                atDateFlag={atDateFlag}
                isMobile={isMobile}
                autocomplete="off"
              />
            </Cell>
          </GridX>
        )}
        {!isBabyRegistry &&
          !isCABabyRegistry &&
          (enableBabyMultiples
            ? this.renderbabyMultiplesSelection()
            : this.renderbabyGenderSelection())}
      </ErrorBoundary>
    );
  };

  render() {
    const isBabyTbs = getSiteId().includes('BuyBuyBaby');
    const babyDate = isBabyTbs ? DATE_BABY_LBL : DATE_LBL;
    const {
      labels,
      eventType,
      registryInputFields,
      updateState,
      stateObj,
      channelType,
      dataLocator,
      atDateFlag,
      isMobile,
      setFocusOnNextElement,
      flagOptional,
      editWedRegistry,
      isNewCreateRegForm,
    } = this.props;
    const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
    const getdateLabelKey = `${eventType}${DATE_EVENT_LBL}`;
    const dateEvent = pathOr('', getdateLabelKey, babyDate);
    return (
      <div>
        {checkForDisplay(registryInputFields.eventDate) && (
          <GridX className={'grid-margin-x'}>
            <Cell
              className={classnames(
                isWeddingRegistry ? `large-12` : `large-6`,
                'small-12',
                'pb2'
              )}
            >
              <DateInput
                id="eventDate"
                name="eventDate"
                dateLabel={dateEvent}
                labels={labels.createRegistry}
                eventType={eventType}
                channelType={channelType}
                registryInputFields={registryInputFields}
                required={checkForRequired(registryInputFields.eventDate)}
                format={isBedBathCanada() ? DATE_FORMAT_CA : DATE_FORMAT}
                dataLocator={dataLocator.registryWeddingDateTextField}
                pastYearToDisplay={PAST_YEAR_TO_DISPLAY}
                futureYearToDisplay={FUTURE_YEAR_TO_DISPLAY}
                value={stateObj.eventDate}
                updateState={updateState}
                eventDateError={stateObj.eventDateError}
                validation={isBedBathCanada() ? 'eventDateCanada' : 'eventDate'}
                atDateFlag={atDateFlag}
                isMobile={isMobile}
                setFocusOnNextElement={setFocusOnNextElement}
                autocomplete="off"
              />
            </Cell>
          </GridX>
        )}
        {(!isWeddingRegistry || editWedRegistry) &&
          checkForDisplay(registryInputFields.numberOfGuests) &&
          !flagOptional && (
            <GridX className={'grid-margin-x'}>
              <RenderInput
                fieldName="guests"
                validation="guestNumber"
                label={GUEST_APPROXIMATE_LBL}
                classes={`large-6 small-12`}
                type="number"
                required={checkForRequired(registryInputFields.numberOfGuests)}
                dataLocator={dataLocator.registryGuestsField}
                guestsError={stateObj.guestsError}
                updateState={updateState}
                value={stateObj.guests}
                showNumericKeypadOnMobile={isMobile && true}
              />
            </GridX>
          )}
        {checkForDisplay(registryInputFields.college) &&
          (isNewCreateRegForm &&
          !isEmpty(pathOr('', 'college', registryInputFields)) ? (
            <GridX className={'grid-margin-x'}>
              <Cell className="large-6 small-12">
                <CollegeInputField
                  registryInputFields={registryInputFields}
                  {...this.props}
                />
              </Cell>
            </GridX>
          ) : (
            <GridX className={'grid-margin-x'}>
              <RenderInput
                fieldName="college"
                validation="college"
                label={COLLEGE_LBL}
                classes={`large-6 small-12`}
                type="text"
                required={checkForRequired(registryInputFields.college)}
                dataLocator={dataLocator.registryCollegeField}
                collegeError={stateObj.collegeError}
                updateState={updateState}
                value={stateObj.college}
              />
            </GridX>
          ))}
        {eventType === 'Baby' && this.renderBabyRegistryEventInfo(dateEvent)}
      </div>
    );
  }
}

EventInfo.propTypes = {
  labels: PropTypes.object,
  eventType: PropTypes.string,
  registryInputFields: PropTypes.object,
  updateState: PropTypes.func,
  stateObj: PropTypes.object,
  channelType: PropTypes.string,
  dataLocator: PropTypes.object,
  atDateFlag: PropTypes.object,
  isMobile: PropTypes.bool,
  setFocusOnNextElement: PropTypes.bool,
  isCreateMode: PropTypes.bool,
  flagOptional: PropTypes.bool,
  isBabyRegistry: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
  editWedRegistry: PropTypes.bool,
  globalSwitchConfig: PropTypes.object,
  isNewCreateRegForm: PropTypes.bool,
};

export default EventInfo;
