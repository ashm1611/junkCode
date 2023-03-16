import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, pathOr } from 'lodash/fp';
import classnames from 'classnames';
import Heading from '@bbb-app/core-ui/heading';
import InputRadio from '@bbb-app/core-ui/input-radio';
import SurveyComponent from '../../../../CollegeChecklist/SurveyComponent';
import {
  initialGenderDecorObj,
  BABY_GENDER_COUNT_DELIMETER,
  BABY_GENDER_AND_DECOR_DELIMETER,
  genderConst,
} from '../../CreateRegistryUtils';
import BabyGenderSelectionComponent from './BabyGenderSelectionComponent';
import {
  BABY_REVEAL_GENDER_HEADING_LBL,
  BABY_REVEAL_GENDER_YES_LBL,
  BABY_REVEAL_GENDER_NO_LBL,
} from './constants';

const propTypes = {
  surveyComponentContentObj: PropTypes.object,
  stateObj: PropTypes.object,
  styles: PropTypes.object,
  isContentAvaible: PropTypes.bool,
  isMobile: PropTypes.bool,
  isCreateMode: PropTypes.bool,
  updateState: PropTypes.func,
  babyGender: PropTypes.string,
  eventType: PropTypes.string,
};

const defaultProps = {
  isCreateMode: true,
};
export class BabyMultiplesComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isCreateMode, surveyComponentContentObj, babyGender } = props;
    const isCreateState = true;
    this.selectedKey = '';
    this.state = {
      selectedbabyCount: 1,
    };
    this.personas = pathOr([], 'personas', surveyComponentContentObj);
    this.setGenderDecorObj(isCreateMode, babyGender, isCreateState);
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else  */
    const { isCreateMode, surveyComponentContentObj, babyGender } = nextProps;
    const newPersonsObj = pathOr([], 'personas', surveyComponentContentObj);
    if (!isEqual(newPersonsObj, this.personas)) {
      this.personas = newPersonsObj;
      this.setGenderDecorObj(isCreateMode, babyGender);
    }

    if (!isEqual(this.props.stateObj, nextProps.stateObj)) {
      const obj = {};
      for (let i = 1; i <= this.state.selectedbabyCount; i += 1) {
        obj[`genderBaby${i}Error`] = nextProps.stateObj[`genderBaby${i}Error`];
        obj[`decorBaby${i}`] = nextProps.stateObj.babyNurseryTheme;
      }
      this.setState(obj, this.updateParentStates);
    }
  }

  setGenderDecorObj(isCreateMode, babyGender, isCreateState) {
    let revealGender = '';
    const genderDecorObj = Object.assign({}, initialGenderDecorObj);

    let selectedbabyCount = this.state.selectedbabyCount;
    if (isCreateMode) {
      revealGender = false;
      this.personas.forEach((personsData, idx) => {
        if (personsData.autoCheck) {
          this.selectedKey = idx;
          selectedbabyCount = idx + 1;
        }
      });
    } else {
      const babyGenderArr = babyGender.split(BABY_GENDER_COUNT_DELIMETER);
      revealGender = !(
        babyGender.charAt(0) === genderConst.SURPRISE ||
        babyGender === '' ||
        babyGender.charAt(0) === genderConst.TWINS
      );
      selectedbabyCount = babyGenderArr.length;
      this.selectedKey = selectedbabyCount - 1;
      let genderDecorArr;
      /* istanbul ignore else  */
      if (revealGender) {
        for (let i = 0; i < selectedbabyCount; i += 1) {
          genderDecorArr = babyGenderArr[i].split(
            BABY_GENDER_AND_DECOR_DELIMETER
          );
          genderDecorObj[`genderBaby${i + 1}`] = genderDecorArr[0];
          genderDecorObj[`decorBaby${i + 1}`] = genderDecorArr[1];
        }
      }
    }
    if (babyGender.charAt(0) === genderConst.TWINS) {
      this.selectedKey = 1;
      selectedbabyCount = 2;
    }
    if (isCreateState) {
      this.state = {
        selectedbabyCount,
        revealGender,
        ...genderDecorObj,
      };
      this.updateParentStates();
    } else {
      this.setState(
        {
          selectedbabyCount,
          revealGender,
          ...genderDecorObj,
        },
        this.updateParentStates
      );
    }
  }

  getPersonaIdxFromValue = personaValue => {
    let index = '';
    this.personas.forEach((personsData, idx) => {
      if (personsData.personaValue === personaValue) {
        index = idx + 1;
      }
    });
    return index;
  };

  setSurveyOptionRadio = (personaType, personaValue) => {
    this.setState(
      {
        selectedbabyCount: this.getPersonaIdxFromValue(personaValue),
      },
      this.updateParentStates
    );
  };

  updateParentStates = () => {
    const { revealGender, selectedbabyCount } = this.state;
    const valueArr = [];
    const stateObj = {
      babyMultiplesCount: selectedbabyCount,
      babyMultiplesRevealGender: revealGender,
    };
    for (let i = 1; i <= this.state.selectedbabyCount; i += 1) {
      valueArr.push(
        this.state[`genderBaby${i}`] +
          BABY_GENDER_AND_DECOR_DELIMETER +
          this.state[`decorBaby${i}`]
      );
      stateObj[`genderBaby${i}Error`] = this.state[`genderBaby${i}Error`];
    }
    const value = valueArr.join(BABY_GENDER_COUNT_DELIMETER);
    stateObj.babyGender = value;
    this.props.updateState(stateObj);
  };

  resetStatesToSurprise = () => {
    this.setState({ ...initialGenderDecorObj }, this.updateParentStates);
  };

  changeRevealGenderValue = e => {
    const { value } = e.target;
    if (value) {
      this.setState({ revealGender: value }, this.updateParentStates);
    } else {
      this.setState({ revealGender: value }, this.resetStatesToSurprise);
    }
  };

  changeSelectedGender = (e, key) => {
    const { value } = e.target;
    this.setState(
      { [`${key}`]: value, [`${key}Error`]: '' },
      this.updateParentStates
    );
  };

  renderSurveyComponent() {
    const {
      surveyComponentContentObj,
      isContentAvaible,
      isMobile,
      styles,
      eventType,
    } = this.props;

    const displayName = pathOr('', 'displayName', surveyComponentContentObj);

    return (
      <SurveyComponent
        multiSelect={false}
        displayName={displayName}
        personas={this.personas}
        isContentAvaible={isContentAvaible}
        setSurveyOptionRadio={this.setSurveyOptionRadio}
        isMobile={isMobile}
        selectedKey={this.selectedKey}
        alwaysRenderErrorDiv={false}
        surveyComponentCardStyle={styles.babyMultiplesTile}
        eventType={eventType}
      />
    );
  }

  renderRevealGender = () => {
    const { styles } = this.props;
    return (
      <React.Fragment>
        <Heading
          level={3}
          styleVariation="h4-sans"
          className={classnames('mb2')}
        >
          {BABY_REVEAL_GENDER_HEADING_LBL}
        </Heading>
        <ul className={classnames(styles.radiowrapper, 'pb2 mb1')}>
          <li className={classnames('sm-mb1', styles.radiowrapper)}>
            <InputRadio
              className={classnames(styles.genderStyle)}
              id="babyRevealGenderYes"
              name="revealGenderOption"
              labelContent={BABY_REVEAL_GENDER_YES_LBL}
              value
              labelClass={styles.labelButton}
              variation="button"
              defaultChecked={this.state.revealGender}
              onClick={this.changeRevealGenderValue}
            />
          </li>
          <li className={styles.radiowrapper}>
            <InputRadio
              className={classnames(styles.genderStyle)}
              id="babyRevealGenderNo"
              name="revealGenderOption"
              labelContent={BABY_REVEAL_GENDER_NO_LBL}
              value={false}
              labelClass={styles.labelButton}
              variation="button"
              defaultChecked={!this.state.revealGender}
              onClick={this.changeRevealGenderValue}
            />
          </li>
        </ul>
      </React.Fragment>
    );
  };

  renderBabyGenderSelection = () => {
    if (!this.state.revealGender) {
      return null;
    }
    const { styles } = this.props;
    const { selectedbabyCount } = this.state;
    const rows = [];
    let key;
    for (let i = 1; i <= selectedbabyCount; i += 1) {
      key = `genderBaby${i}`;
      rows.push(
        <BabyGenderSelectionComponent
          idx={i}
          styles={styles}
          selectedGender={this.state[`${key}`]}
          idKey={key}
          changeSelectedGender={this.changeSelectedGender}
          errorMessage={this.state[`genderBaby${i}Error`]}
        />
      );
    }
    return <React.Fragment>{rows}</React.Fragment>;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderSurveyComponent()}
        {this.renderRevealGender()}
        {this.renderBabyGenderSelection()}
      </React.Fragment>
    );
  }
}

BabyMultiplesComponent.propTypes = propTypes;
BabyMultiplesComponent.defaultProps = defaultProps;

export default BabyMultiplesComponent;
