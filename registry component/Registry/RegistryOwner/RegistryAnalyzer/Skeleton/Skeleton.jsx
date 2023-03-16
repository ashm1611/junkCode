import React from 'react';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';

const analyzerMobile = () => (
  <SkeletonWrapper
    width={450}
    height={20}
    viewPort={{ height: 20, width: '100%' }}
    rectContainerHeight={40}
    rectContainerWidth="100%"
    preserveAspectRatio="xMidYMin meet"
    primaryColor="#ff9895"
  >
    <rect x="0" y="0" rx="12" ry="12" width="230" height="28" />
    <rect x="252" y="0" rx="12" ry="12" width="80" height="28" />
    <circle cx="365" cy="13.5" r="14" />
  </SkeletonWrapper>
);

const analyzerDesktop = () => (
  <SkeletonWrapper
    width={340}
    height={20}
    viewPort={{ height: 20, width: '100%' }}
    rectContainerHeight={20}
    rectContainerWidth="100%"
    preserveAspectRatio="xMidYMin meet"
    primaryColor="#ff9895"
  >
    <rect x="0" y="0" rx="10" ry="10" width="228" height="20" />
    <rect x="248" y="0" rx="10" ry="10" width="53" height="20" />
    <circle cx="328" cy="10" r="10" />
  </SkeletonWrapper>
);

export const Skeleton = () => {
  return (
    <div>
      <span className="sm-hide md-hide lg-hide">{analyzerMobile()}</span>
      <span className="xs-hide">{analyzerDesktop()}</span>
    </div>
  );
};

export default Skeleton;
