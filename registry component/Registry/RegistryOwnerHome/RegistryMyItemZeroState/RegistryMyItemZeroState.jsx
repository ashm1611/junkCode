import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import Img from '@bbb-app/core-ui/image';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Heading from '@bbb-app/core-ui/heading';
import styles from './RegistryMyItem.css';

export const RegistryMyItem = ({ itemsData, getImageSrc }) => {
  const data = itemsData;
  const heading = data.infobox_properties && data.infobox_properties.headline;
  const subHeading =
    data.infobox_properties && data.infobox_properties.sub_title;
  const ctaText =
    data.infobox_properties && data.infobox_properties.cta.link_text;
  const ctaLink = data.infobox_properties && data.infobox_properties.cta.url;
  const title = data.image_alt_text;
  return (
    <div id="registry-my-item" className={styles.myItemContainer}>
      <Heading
        level={2}
        className={styles.heading}
        data-locator="registry-my-items"
      >
        {title}
      </Heading>
      <GridX className={classnames(styles.mBContainer)}>
        <Img
          src={getImageSrc}
          reactImage={false}
          className={styles.imgDefault}
        />
        <Cell className={styles.contentBox}>
          <Heading
            level={2}
            className={styles.title}
            data-locator="registry-my-items"
          >
            {heading}
          </Heading>
          <p className={styles.subHeading}>{subHeading}</p>
          <Button
            theme="secondaryStrokeBasic"
            data-locator="registry-my-items-cta"
            className={styles.shopButton}
            href={ctaLink}
          >
            {ctaText}
          </Button>
        </Cell>
      </GridX>
    </div>
  );
};

RegistryMyItem.propTypes = {
  itemsData: PropTypes.object,
  getImageSrc: PropTypes.string,
};

export default RegistryMyItem;
