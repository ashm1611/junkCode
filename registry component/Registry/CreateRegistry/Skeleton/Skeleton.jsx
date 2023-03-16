import React from 'react';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';
import styles from '../CreateRegistryFormStyles.css';

const CreateRegistry = () => (
  <SkeletonWrapper
    width={500}
    height={200}
    className="pt2"
    viewPort={{ height: '200px', width: '500px' }}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect x="140" y="42" rx="0" ry="0" width="50%" height="9" />
    <rect x="63" y="70" rx="0" ry="0" width="80%" height="39" />
    <rect x="63" y="70" rx="0" ry="0" width="80%" height="39" />
    <rect x="140" y="130" rx="0" ry="0" width="50%" height="9" />
  </SkeletonWrapper>
);

const Skeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div>{CreateRegistry()}</div>
    </div>
  );
};

export default Skeleton;
