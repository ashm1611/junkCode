import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Heading from '@bbb-app/core-ui/heading';
import Paragraph from '@bbb-app/core-ui/paragraph';
import InputRadio from '@bbb-app/core-ui/input-radio';
import { genderConst } from '../../CreateRegistryUtils';
import {
  BABY_GENDER_GIRL_LBL,
  BABY_GENDER_BOY_LBL,
  BABY_SELECT_GENDER_HEADING_LBL,
} from './constants';

const BabyGenderSelectionComponent = ({
  styles,
  selectedGender,
  idKey,
  idx,
  changeSelectedGender,
  errorMessage,
}) => {
  const errorClass = errorMessage ? styles.formError : '';
  return (
    <div className={classnames('pb2', errorClass)} id="genderBabyGirlError">
      <Heading level={3} styleVariation="h4-sans" className={classnames('mb2')}>
        {LabelsUtil.replacePlaceholderValues(BABY_SELECT_GENDER_HEADING_LBL, [
          idx,
        ])}
      </Heading>
      <ul className={classnames(styles.radiowrapper)}>
        <li className={styles.radiowrapper}>
          <InputRadio
            className={classnames(styles.genderStyle)}
            id={`${idKey}Boy`}
            name={`${idKey}Option`}
            labelContent={BABY_GENDER_BOY_LBL}
            value={genderConst.BOY}
            labelClass={styles.labelButton}
            variation="button"
            defaultChecked={selectedGender === genderConst.BOY}
            onClick={e => changeSelectedGender(e, idKey)}
            required
          />
        </li>
        <li className={styles.radiowrapper}>
          <InputRadio
            className={classnames(styles.genderStyle)}
            id={`${idKey}Girl`}
            name={`${idKey}Option`}
            labelContent={BABY_GENDER_GIRL_LBL}
            value={genderConst.GIRL}
            labelClass={styles.labelButton}
            variation="button"
            defaultChecked={selectedGender === genderConst.GIRL}
            onClick={e => changeSelectedGender(e, idKey)}
            required
          />
        </li>
      </ul>
      {errorMessage && (
        <Paragraph className="errorColor">{errorMessage}</Paragraph>
      )}
    </div>
  );
};

BabyGenderSelectionComponent.propTypes = {
  styles: PropTypes.object,
  selectedGender: PropTypes.string,
  idKey: PropTypes.string,
  errorMessage: PropTypes.string,
  idx: PropTypes.number,
  changeSelectedGender: PropTypes.func,
};

export default BabyGenderSelectionComponent;
