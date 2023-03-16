import React from 'react';
import GridContainer from '@bbb-app/core-ui/grid-container';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';

const LargeSkeleton = () => (
  <SkeletonWrapper
    width={1300}
    height={250}
    className="pt2"
    viewPort={{ height: 250, width: '100%' }}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
    preserveAspectRatio="xMinYMin meet"
  >
    <rect x="320" y="15" rx="4" ry="4" width="625" height="40" />

    <rect x="5" y="90" rx="4" ry="4" width="120" height="120" />
    <rect x="155" y="90" rx="4" ry="4" width="140" height="21" />
    <rect x="155" y="130" rx="4" ry="4" width="140" height="40" />

    <rect x="325" y="90" rx="4" ry="4" width="120" height="120" />
    <rect x="475" y="90" rx="4" ry="4" width="140" height="21" />
    <rect x="475" y="130" rx="4" ry="4" width="140" height="40" />

    <rect x="645" y="90" rx="4" ry="4" width="120" height="120" />
    <rect x="795" y="90" rx="4" ry="4" width="140" height="21" />
    <rect x="795" y="130" rx="4" ry="4" width="140" height="40" />

    <rect x="965" y="90" rx="4" ry="4" width="120" height="120" />
    <rect x="1115" y="90" rx="4" ry="4" width="140" height="21" />
    <rect x="1115" y="130" rx="4" ry="4" width="140" height="40" />
  </SkeletonWrapper>
);

export const Skeleton = () => {
  return (
    <GridContainer className="fullWidth">
      <div className="xs-hide sm-hide fullWidth">{LargeSkeleton()}</div>
    </GridContainer>
  );
};

export default Skeleton;
