import React from 'react';
import GridX from '@bbb-app/core-ui/grid-x';
import GridContainer from '@bbb-app/core-ui/grid-container';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';
const dashBoardLeftDesktop = () => (
  <SkeletonWrapper
    width={236}
    height={561}
    viewPort={{ height: '561px', width: '236px' }}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <circle cx="120" cy="70" r="60" />
    <circle cx="150" cy="120" r="20" />
    <rect width="236" height="50" x="0" y="395" rx="10" />
    <rect width="236" height="20" x="0" y="159" rx="8" />
    <rect width="158" height="20" x="40" y="190" rx="8" />
    <rect width="236" height="50" x="0" y="280" rx="10" />
    <rect width="236" height="50" x="0" y="453" rx="10" />
    <path d="M0 255h1440v4H0z" />
    <rect width="236" height="50" y="338" rx="10" />
    <rect width="104" height="16" x="1106" y="305" rx="8" />
    <rect width="104" height="16" x="1242" y="305" rx="8" />
    <rect width="236" height="50" x="0" y="510" rx="10" />
    <rect width="407" height="122" x="435" y="438" rx="10" />
    <rect width="407" height="122" x="867" y="438" rx="10" />
    <rect width="288.966" height="16" y="657" rx="8" />
    <rect width="103" height="44.918" x="1030" y="641" rx="10" />
    <rect width="138" height="44.918" x="1143" y="641" rx="10" />
    <path transform="translate(76 641)" d="M0 63h1280v4H0z" />
    <path transform="translate(0 641)" d="M0 63h1280v4H0z" />
    <rect width="147" height="44.918" x="3" y="731" rx="10" />
    <rect width="92" height="44.918" x="161" y="731" rx="10" />
    <rect width="147" height="44.918" x="264" y="731" rx="10" />
    <rect width="98" height="16" x="435" y="745" rx="8" />
    <rect width="150" height="16" x="1130" y="745" rx="8" />
    <rect width="150" height="16" x="955" y="745" rx="8" />
    <rect width="310" height="466" y="832" rx="10" />
    <rect width="310" height="466" y="1313" rx="10" />
    <rect width="310" height="466" x="649" y="832" rx="10" />
    <rect width="310" height="466" x="649" y="1313" rx="10" />
    <rect width="310" height="466" x="325" y="832" rx="10" />
    <rect width="310" height="466" x="325" y="1313" rx="10" />
    <rect width="310" height="466" x="974" y="832" rx="10" />
  </SkeletonWrapper>
);
const dashBoardRightDesktop = () => (
  <SkeletonWrapper
    className="ml15"
    width={980}
    height={561}
    viewPort={{ height: '561px', width: '980px' }}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect width="950" height="220" x="0" y="10" rx="10" />
    <rect width="950" height="300" x="0" y="258" rx="8" />
  </SkeletonWrapper>
);
const NewDashboardSkeleton = () => {
  return (
    <GridContainer>
      <GridX className="xs-hide m15">
        {dashBoardLeftDesktop()}
        {dashBoardRightDesktop()}
      </GridX>
      <div className="lg-hide mr15 ml35">{dashBoardLeftDesktop()}</div>
    </GridContainer>
  );
};
export default NewDashboardSkeleton;
