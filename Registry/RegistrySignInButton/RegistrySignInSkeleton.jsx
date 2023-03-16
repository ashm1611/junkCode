import React from 'react';
import classnames from 'classnames';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper/SkeletonWrapper';

// Renders the registry sign in skeleton
const RegistrySignInSkeleton = className => {
  return (
    <SkeletonWrapper
      className={classnames('pt2', className)}
      viewPort={{ height: 40, width: '100%' }}
      rectContainerHeight="100%"
      rectContainerWidth="100%"
      preserveAspectRatio="xMaxYMin meet"
      svgProps={{ viewBox: null }}
    >
      <rect x="80%" y="0" rx="4" ry="4" width="20%" height="25px" />
    </SkeletonWrapper>
  );
};

export default RegistrySignInSkeleton;
