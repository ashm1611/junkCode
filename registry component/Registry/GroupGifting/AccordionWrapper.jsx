import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import Accordion from '@bbb-app/core-ui/accordion/Accordion';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon/Icon';
import '@bbb-app/assets/icons/infoIcon.svg';
import '@bbb-app/assets/icons/minus.svg';
import '@bbb-app/assets/icons/plus.svg';
import formStyles from '../CreateRegistry/CreateRegistryFormStyles.css';
import styles from '../EditRegistry/EditRegistry.css';

/**
 * Custom Accordian component
 * @param {object} props it will contain the header title
 */

const AccordionWrapper = props => (
  <div
    className={classnames(styles.editFormAccordionWrapper, 'mb2 sm-px2 pt2')}
  >
    <Accordion
      accordion={false}
      noBorder
      showExpanded
      className={classnames(styles.editFormAccordion)}
      showExpandCollapseIcon={false}
      expandCollapseIconPos="right"
      expandCollapseIcons={{
        expand: (
          <Icon
            type="plus"
            width="16px"
            height="16px"
            className={formStyles.accordianIconStyle}
          />
        ),
        collapse: (
          <Icon
            type="minus"
            width="16px"
            height="16px"
            className={formStyles.accordianIconStyle}
          />
        ),
      }}
      data={[
        {
          title: (
            <Button
              theme="default"
              variation="noPadding"
              className={styles.fieldsHeading}
            >
              {props.title}
            </Button>
          ),
          body: <div className="pb1">{props.children}</div>,
          expanded: true,
        },
      ]}
    />
  </div>
);

AccordionWrapper.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string,
};

export default AccordionWrapper;
