import React from 'react';
import GridContainer from '@bbb-app/core-ui/grid-container';
import ProductGridSkeleton from '../../../../ProductGrid/Skeleton';
import styles from './Skeleton.inline.css';

const SKELETON_TILES = 7;

const Skeleton = () => {
  return (
    <div className={styles.color}>
      <GridContainer>
        <div className={styles.base}>
          <ProductGridSkeleton count={SKELETON_TILES} className={styles.cell} />
        </div>
      </GridContainer>
    </div>
  );
};

export default Skeleton;
