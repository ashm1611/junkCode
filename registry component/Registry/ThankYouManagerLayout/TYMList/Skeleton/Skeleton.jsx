import React from 'react';
import classnames from 'classnames';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';
import styles from '../../TYMList/TYMRow/TymRow.css';

const TYMListDesktop = () => (
  <SkeletonWrapper
    width={800}
    height={200}
    preserveAspectRatio="xMinYMin meet"
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect x="80" y="10" rx="10" ry="0" width="10" height="100" />
    <circle cx="120" cy="60" r="11" />
    <rect x="150" y="30" rx="0" ry="0" width="125" height="10" />
    <rect x="150" y="45" rx="0" ry="0" width="200" height="10" />
    <rect x="150" y="60" rx="0" ry="0" width="150" height="10" />
    <rect x="150" y="75" rx="0" ry="0" width="110" height="10" />
    <rect x="420" y="10" rx="0" ry="0" width="1" height="100" />
    <rect x="520" y="30" rx="0" ry="0" width="200" height="10" />
    <rect x="520" y="45" rx="0" ry="0" width="190" height="10" />
    <rect x="520" y="60" rx="0" ry="0" width="170" height="10" />
  </SkeletonWrapper>
);

const TYMListMobile = () => (
  <SkeletonWrapper
    width={320}
    height={320}
    preserveAspectRatio="xMinYMin meet"
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <circle
      cx="160.38448708429138"
      cy="64.15448708429139"
      r="51.884487084291386"
    />
    <rect x="113.5" y="136.27" rx="0" ry="0" width="96" height="18" />
    <rect x="92.5" y="190.27" rx="0" ry="0" width="141" height="108" />
    <rect x="120.5" y="307.27" rx="0" ry="0" width="81" height="11" />
  </SkeletonWrapper>
);

const Skeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={classnames('sm-hide xs-hide')}>{TYMListDesktop()}</div>
      <div className={classnames('md-hide lg-hide')}>{TYMListMobile()}</div>
    </div>
  );
};

export default Skeleton;
