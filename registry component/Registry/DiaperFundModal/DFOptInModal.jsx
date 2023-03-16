import React from 'react';
import classnames from 'classnames';
import { getWindowInnerWidth } from '@bbb-app/utils/viewPortUtils';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Icon from '@bbb-app/core-ui/icon';
import '@bbb-app/assets/icons/plus-black.svg';
import styles from './DiaperFundModal.css';
import '../../../../assets/icons/baby_diapericon.svg';
import '../../../../assets/icons/baby_groupgiftingicon.svg';
import {
  DISCLAIMER_LBL,
  PARAGRAPH_TEXT_TITLE_LBL,
  GROUP_GIFT_OPT_IN_BTN_LBL,
  PARAGRAPH_TEXT_DESC_LBL,
  TITLE_TEXT_LBL,
  SUB_TITLE_GROUP_GIFTING_LBL,
  SUB_TITLE_GROUP_GIFTING_DESC_LBL,
  SUB_TITLE_EXCHANGES_TXT_LBL,
  SUB_TITLE_EXCHANGES_DESC_LBL,
} from '../constants';

const handleOptInClick = (e, props) => {
  e.preventDefault();
  props.handleOptInButton(true);
};
const renderOptInButton = props => {
  return (
    <Cell className={classnames(styles.OptInButtonContainer, 'mt3')}>
      <Button
        data-locator="groupGift-optIn-Modal-button"
        theme="primary"
        onClick={e => handleOptInClick(e, props)}
        variation="primary"
        className={classnames(styles.OptInButton)}
      >
        {GROUP_GIFT_OPT_IN_BTN_LBL}
      </Button>
    </Cell>
  );
};

const renderFeature = () => {
  return (
    <GridX className={classnames(styles.blueBannerPanel)}>
      <Cell className={classnames(styles.imagesSection)}>
        {renderFeatureColumn(
          SUB_TITLE_GROUP_GIFTING_LBL,
          'baby_groupgiftingicon',
          SUB_TITLE_GROUP_GIFTING_DESC_LBL
        )}
        <div className={classnames(styles.middleImage)}>
          <Icon type="plus-black" width="20px" height="20px" />
        </div>
        {renderFeatureColumn(
          SUB_TITLE_EXCHANGES_TXT_LBL,
          'baby_diapericon',
          SUB_TITLE_EXCHANGES_DESC_LBL
        )}
      </Cell>
    </GridX>
  );
};
const renderFeatureColumn = (heading, iconType, content) => {
  return (
    <div className={classnames(styles.featureContainer)}>
      <Heading
        level={3}
        className={classnames(styles.featuresubTitle)}
        data-locator="groupGift-optIn-Modal-Image-Heading"
      >
        {heading}
      </Heading>
      <Icon
        data-locator="groupGift-optIn-Modal-Image"
        className={classnames('m2', styles.icon)}
        type={iconType}
        width="135px"
        height="90px"
      />

      <Paragraph
        className={classnames(styles.featureSubTitleDesc)}
        data-locator="groupGift-optIn-Modal-Image-sub-Heading"
      >
        {content}
      </Paragraph>
    </div>
  );
};

export const DFOptInModal = props => {
  const isMobileScreen = getWindowInnerWidth() < 769;
  return (
    <React.Fragment>
      <GridX>
        <div className={classnames(styles.titleContainer)}>
          <Paragraph
            className={classnames(styles.diaperFundModalTitle)}
            data-locator="groupGift-optIn-Modal-Heading"
          >
            {TITLE_TEXT_LBL}
          </Paragraph>
          <Paragraph
            className={classnames(styles.diaperFundModalSubTitle, 'mb3')}
            data-locator="groupGift-optIn-Modal-paragraph"
          >
            {PARAGRAPH_TEXT_TITLE_LBL}
          </Paragraph>
          <Paragraph
            className={classnames(styles.diaperFundModalSubTitle, 'mb3')}
            data-locator="groupGift-optIn-Modal-paragraph"
          >
            {PARAGRAPH_TEXT_DESC_LBL}
          </Paragraph>
        </div>
        {isMobileScreen && renderOptInButton(props)}
        {renderFeature()}
        {!isMobileScreen && renderOptInButton(props)}
        <div className={classnames(styles.borderText, 'p2', 'm3')} />
        <div
          className={classnames(styles.disclaimerText, 'p2')}
          data-locator="groupGift-optIn-Modal-Disclaimer"
        >
          {DISCLAIMER_LBL}
        </div>
      </GridX>
    </React.Fragment>
  );
};

export default DFOptInModal;
