import React from 'react';
import PropTypes from 'prop-types';
import Cell from '@bbb-app/core-ui/cell';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';

const propTypes = {
  view: PropTypes.string,
};

const renderLayout = () => (
  <SkeletonWrapper
    width={250}
    height={160}
    viewPort={{ height: 260, width: '100%' }}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
    preserveAspectRatio="xMinYMin meet"
  >
    <rect x="0" y="15" rx="4" ry="4" width="250" height="55" />
  </SkeletonWrapper>
);

export const Skeleton = () => {
  return <Cell>{renderLayout()}</Cell>;
};

Skeleton.propTypes = propTypes;

export default Skeleton;
