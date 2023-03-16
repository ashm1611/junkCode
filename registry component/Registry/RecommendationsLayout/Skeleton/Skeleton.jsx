import React from 'react';
import classnames from 'classnames';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';
const RecommendationSkeletonDesktop = () => (
  <SkeletonWrapper
    width={800}
    height={200}
    preserveAspectRatio="xMinYMin meet"
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect x="50" y="18.27" rx="0" ry="0" width="153" height="15" />
    <rect x="50" y="45.27" rx="0" ry="0" width="153" height="15" />
    <rect x="50" y="69.27" rx="0" ry="0" width="153" height="15" />
    <rect x="250" y="18.27" rx="0" ry="0" width="143" height="70" />
    <rect x="400" y="20.27" rx="0" ry="0" width="161" height="15" />
    <rect x="400" y="42.27" rx="0" ry="0" width="161" height="15" />
    <rect x="400" y="62.27" rx="0" ry="0" width="161" height="15" />
    <rect x="580" y="17.27" rx="0" ry="0" width="168" height="15" />
    <rect x="580" y="36.27" rx="0" ry="0" width="168" height="15" />
    <rect x="580" y="56.27" rx="0" ry="0" width="168" height="15" />
  </SkeletonWrapper>
);
const RecommendationSkeletonMobile = () => (
  <SkeletonWrapper
    width={320}
    height={600}
    preserveAspectRatio="xMinYMin meet"
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect x="26" y="5.27" rx="0" ry="0" width="60" height="10" />
    <rect x="22" y="20.27" rx="0" ry="0" width="80" height="10" />
    <rect x="16" y="40.27" rx="0" ry="0" width="100" height="10" />
    <rect x="22" y="80" rx="0" ry="0" width="250" height="250" />
    <rect x="22" y="350" rx="0" ry="0" width="50" height="10" />
    <rect x="22" y="370" rx="0" ry="0" width="80" height="10" />
    <rect x="22" y="390" rx="0" ry="0" width="100" height="10" />
    <rect x="22" y="410" rx="0" ry="0" width="300" height="15" />
    <rect x="22" y="430" rx="0" ry="0" width="300" height="15" />
    <rect x="22" y="460" rx="0" ry="0" width="300" height="15" />
  </SkeletonWrapper>
);
const Skeleton = () => {
  return (
    <div>
      <div className={classnames('sm-hide xs-hide')}>
        {RecommendationSkeletonDesktop()}
      </div>
      <div className={classnames('lg-hide')}>
        {RecommendationSkeletonMobile()}
      </div>
    </div>
  );
};

export default Skeleton;
