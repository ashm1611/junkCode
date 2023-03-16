import React from 'react';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';

const EditRegistryFormElement = () => (
  <SkeletonWrapper
    width={400}
    height={25}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect x="0" y="0" width="80%" height="25" />
  </SkeletonWrapper>
);

const EditRegistryHeadingElement = () => (
  <SkeletonWrapper
    width={400}
    height={25}
    rectContainerHeight="50%"
    rectContainerWidth="100%"
  >
    <rect x="100" y="0" width="50%" height="25" />
  </SkeletonWrapper>
);

const EditRegistryTextElement = () => (
  <SkeletonWrapper
    width={400}
    height={5}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect x="0" y="0" width="80%" height="5" />
  </SkeletonWrapper>
);

const Skeleton = () => {
  return (
    <div>
      <GridX>
        <Cell className={classnames('small-12 mb15')}>
          {EditRegistryHeadingElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('small-12 mb2')}>
          {EditRegistryTextElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('large-6 small-12')}>
          {EditRegistryFormElement()}
        </Cell>
        <Cell className={classnames('small-12 large-6 mb2')}>
          {EditRegistryFormElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('small-12 large-6 mb2')}>
          {EditRegistryFormElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('small-12 large-6 mb2')}>
          {EditRegistryFormElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('small-12 mb2 pt2')}>
          {EditRegistryTextElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('large-6 small-12')}>
          {EditRegistryFormElement()}
        </Cell>
        <Cell className={classnames('small-12 large-6 mb2')}>
          {EditRegistryFormElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('small-12 large-6 mb2')}>
          {EditRegistryFormElement()}
        </Cell>
      </GridX>
      <GridX>
        <Cell className={classnames('small-12 large-6 mb2')}>
          {EditRegistryFormElement()}
        </Cell>
      </GridX>
    </div>
  );
};

export default Skeleton;
