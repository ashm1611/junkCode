import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Img from '@bbb-app/core-ui/image';
import GridX from '@bbb-app/core-ui/grid-x';
import Cell from '@bbb-app/core-ui/cell';
import Heading from '@bbb-app/core-ui/heading';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import styles from './MarketingBanner.css';

export const MarketingBanner = ({ data, getImageSrc }) => {
  return (
    <GridX className={classnames(styles.mBContainer)}>
      <Cell className={classnames(styles.leftContainer)}>
        <Heading
          level={2}
          className={styles.title}
          data-locator="registry-marketing-banner"
          id="registryMB"
        >
          {data && data.infobox_properties.headline}
        </Heading>
        <PrimaryLink
          textDecoration="textDecorationNone"
          className={styles.clickHere}
          variation="primary"
          href={data && data.infobox_properties.cta.url}
          target="_blank"
        >
          {data && data.infobox_properties.cta.link_text}
        </PrimaryLink>
      </Cell>
      <Cell className={styles.rightContainer}>
        <Img
          src={getImageSrc}
          alt={data && data.image_alt_text}
          reactImage={false}
          className={styles.imgDefault}
        />
      </Cell>
    </GridX>
  );
};

MarketingBanner.propTypes = {
  data: PropTypes.object,
  getImageSrc: PropTypes.string,
};

export default MarketingBanner;
