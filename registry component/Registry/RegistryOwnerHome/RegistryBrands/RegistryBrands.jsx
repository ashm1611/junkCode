import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import Img from '@bbb-app/core-ui/image';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import styles from './RegistryBrands.css';

export const registryBrandsTile = (element, isMobile) => {
  return (
    <div
      className={classnames(
        'inlineBlock',
        isMobile ? styles.MobileStyles : styles.imgContainer
      )}
    >
      <HyperLink
        textDecoration="textDecorationNone"
        type="noUnderline"
        href={element.cta_link_label.url}
        alt={element.cta_link_label.link_text}
      >
        <Img
          src={getRectifiedURLFromScene7URL(element.image)}
          reactImage={false}
          className={styles.imgDefault}
        />
        <p className={styles.categoryText}>{element.filter_name}</p>
      </HyperLink>
    </div>
  );
};
export const getTile = (isMobile, data) => {
  return (
    data &&
    data.map(element => {
      return registryBrandsTile(element, isMobile);
    })
  );
};
export const RegistryBrands = ({ brandsData, propsData }) => {
  const [show, setShow] = useState(false);
  const brands = brandsData && brandsData.curated_facets;
  const size = propsData.isMobile ? brands.length : 6;
  const item = brands && brands.slice(0, size);
  const tile = getTile(propsData.isMobile, item);
  const remainingItem =
    brands &&
    brands.slice(size, brands.length).concat(brands.slice(brands.length + 1));
  const remainingTile = getTile(propsData.isMobile, remainingItem);
  return (
    <React.Fragment>
      <div className={styles.content}>
        <h2 className={styles.heading}>{brandsData && brandsData.headline}</h2>
        {!propsData.isMobile && (
          <button className={styles.seemore} onClick={() => setShow(!show)}>
            show {!show ? 'more' : 'less'}
          </button>
        )}
      </div>
      <div>
        {propsData.isMobile ? (
          <div
            className={classnames(
              'grid-container flex',
              styles.storyMobContainer
            )}
          >
            {tile}
          </div>
        ) : (
          <React.Fragment>
            <div
              className={classnames('grid-container', styles.storyContainer)}
            >
              {tile}
            </div>
            <div className={styles.showMoreContainer}>
              {show && (
                <div
                  className={classnames(
                    'grid-container',
                    styles.storyRemainingContainer
                  )}
                  id="nav"
                >
                  {remainingTile}
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

RegistryBrands.propTypes = {
  brandsData: PropTypes.object,
  propsData: PropTypes.object,
};

export default RegistryBrands;
