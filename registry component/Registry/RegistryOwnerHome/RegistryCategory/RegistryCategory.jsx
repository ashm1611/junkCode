import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import Img from '@bbb-app/core-ui/image';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import styles from './RegistryCategory.css';

export const registryCategoryTile = element => {
  return (
    <div className={styles.inlineBlock}>
      <HyperLink
        textDecoration="textDecorationNone"
        type="noUnderline"
        href={element.cta_link_label.url}
        alt={element.cta_link_label.link_text}
        target="_blank"
      >
        <div className={styles.imageContainer}>
          <Img
            src={getRectifiedURLFromScene7URL(element.image)}
            height={'130px'}
            width={'130px'}
            reactImage={false}
            className={styles.imgDefault}
          />
          <p className={styles.categoryText}>{element.filter_name}</p>
        </div>
      </HyperLink>
    </div>
  );
};

export const getTile = data => {
  return (
    data &&
    data.map(element => {
      return registryCategoryTile(element);
    })
  );
};

export const RegistryCategory = ({ categoryData, propsData }) => {
  const [categoryShow, setCategoryShow] = useState(false);
  const category = categoryData && categoryData.curated_facets;
  const size = propsData.isMobile ? 6 : 12;
  const item = category && category.slice(0, size);
  const tile = getTile(item);
  const remainingItem =
    category &&
    category
      .slice(size, category.length)
      .concat(category.slice(category.length + 1));
  const remainingTile = getTile(remainingItem);
  return (
    <React.Fragment>
      <div className={styles.container}>
        <h2 className={styles.headingCategory}>
          {categoryData && categoryData.headline}
        </h2>
        <div className={styles.showMoreContainer}>
          <button
            className={styles.seemore}
            onClick={() => setCategoryShow(!categoryShow)}
          >
            {category.length > size && `show ${!categoryShow ? 'all' : 'less'}`}
          </button>
        </div>
      </div>
      <div className={classnames('grid-container', styles.storyContainer)}>
        {tile}
      </div>
      {categoryShow && (
        <div
          className={classnames(
            'grid-container',
            styles.storyRemainingContainer
          )}
        >
          {remainingTile}
        </div>
      )}
    </React.Fragment>
  );
};

RegistryCategory.propTypes = {
  categoryData: PropTypes.object,
  propsData: PropTypes.object,
};

export default RegistryCategory;
