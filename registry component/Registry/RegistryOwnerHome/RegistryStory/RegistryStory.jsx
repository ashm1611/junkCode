import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import CustomCarousel from '@bbb-app/carousel/CustomCarousel';
import RegistryStoryTile from './RegistryStoryTile.async';
import styles from './RegistryStory.css';

export const getTile = (props, data) => {
  return data.map((element, index) => {
    return (
      <div
        className={classnames(
          'inlineBlock',
          props.isMobile && styles.MobileStyles
        )}
      >
        <RegistryStoryTile
          registryStoryTileData={element}
          data={data}
          index={index}
          {...props}
        />
      </div>
    );
  });
};

export const RegistryStory = props => {
  const { storyData, isMobile } = props;
  if (isEmpty(storyData)) return null;

  const tile = getTile(props, storyData);
  const settings = {
    dots: false,
    infinite: false,
    slide: true,
    slidesToShow: 7.5,
    slidesToScroll: 1,
    arrows: storyData.length > 7,
    lazyLoad: false,
    touchMove: isMobile,
    draggable: false,
    nextArrowClass: classnames(styles.slickNextArrow),
    prevArrowClass: classnames(styles.slickPrevArrow),
  };
  return isMobile ? (
    <div
      className={classnames('grid-container flex', styles.storyMobContainer)}
    >
      {tile}
    </div>
  ) : (
    <div className={classnames('grid-container', styles.storyContainer)}>
      <CustomCarousel
        className={classnames(styles.arrowButton, styles.arrowButtonposition)}
        ref={slider => slider}
        {...settings}
      >
        {tile}
      </CustomCarousel>
    </div>
  );
};

RegistryStory.propTypes = {
  storyData: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default RegistryStory;
