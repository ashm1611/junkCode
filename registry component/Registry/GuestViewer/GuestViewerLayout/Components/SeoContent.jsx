/* eslint max-lines: ["error", 1329]*/
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Heading from '@bbb-app/core-ui/heading/Heading';
import { getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import Paragraph from '@bbb-app/core-ui/paragraph';
import {
  SEO_CONTENT_REG_BABY_LBL,
  SEO_CONTENT_REG_LBL,
} from '../../../RegistryOwner/RegistryOwnerLayout/constants';
import styles from './SeoContent.css';

/**
 * @author Saurabh (saurabh.barthwal@idc.bedbath.com)
 * @description SeoContent - SEO related content to be shown on
 * the Gift Giver Registry View
 * @param {object} registryData - Registrant and Co-Registrant information
 * @param {string} eventType - Registry type
 */

const SeoContent = ({ registryData, eventType }) => {
  if (isEmpty(registryData)) {
    return null;
  }

  const isBuyBuyBaby = getSiteId() === 'BuyBuyBaby';
  const registryResVO = pathOr(null, 'registryResVO', registryData);
  const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);

  const {
    coRegistrantFirstName,
    primaryRegistrantFirstName,
    primaryRegistrantLastName,
    primaryRegistrantMaidenName,
    coRegistrantLastName,
  } = registrySummaryVO;

  let userName;
  const maidenName = primaryRegistrantMaidenName
    ? `${primaryRegistrantMaidenName} `
    : '';
  if (coRegistrantFirstName) {
    userName =
      primaryRegistrantLastName === 'masked'
        ? `${primaryRegistrantFirstName} & ${coRegistrantFirstName}`
        : `${primaryRegistrantFirstName} ${maidenName}${primaryRegistrantLastName} & ${coRegistrantFirstName} ${coRegistrantLastName}`;
  } else {
    userName =
      primaryRegistrantLastName === 'masked'
        ? `${primaryRegistrantFirstName}`
        : `${primaryRegistrantFirstName} ${maidenName}${primaryRegistrantLastName}`;
  }
  const isBabyTbs =
    getSiteId() === 'BuyBuyBaby' || getSiteId() === 'TBS_BuyBuyBaby';

  return (
    <Cell id="seoContent" className={classnames('grid-container', 'mt2')}>
      <Heading
        className={classnames(styles.heading, 'mb2', {
          [styles.headingBaby]: isBuyBuyBaby,
        })}
        level={2}
      >
        {userName}&#39;s Registry
      </Heading>
      <div className="dialogContentStyle">
        <Paragraph theme="primary" className={classnames(styles.paragraph)}>
          {LabelsUtil.replacePlaceholderValues(
            isBabyTbs ? SEO_CONTENT_REG_BABY_LBL : SEO_CONTENT_REG_LBL,
            [userName, eventType, eventType, userName]
          )}
        </Paragraph>
      </div>
    </Cell>
  );
};

SeoContent.propTypes = {
  registryData: PropTypes.object,
  eventType: PropTypes.string,
};

export default SeoContent;
