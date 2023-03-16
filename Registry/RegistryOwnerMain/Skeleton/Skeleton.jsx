import React from 'react';
import GridContainer from '@bbb-app/core-ui/grid-container';
import GridX from '@bbb-app/core-ui/grid-x';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';

const dashBoardDesktop = () => (
  <SkeletonWrapper
    width={1440}
    height={1779}
    viewPort={{ height: '1779px', width: '1440px' }}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <circle cx="74" cy="74" r="74" />

    <rect width="390" height="32" x="256" y="42" rx="16" />
    <rect width="61" height="32" x="1102" y="48" rx="16" />
    <rect width="61" height="32" x="1255" y="48" rx="16" />
    <rect width="605" height="16" x="256" y="99" rx="8" />

    <rect width="148" height="16" x="30" y="217" rx="8" />
    <rect width="148" height="16" x="202" y="217" rx="8" />
    <rect width="148" height="16" x="374" y="217" rx="8" />
    <rect width="148" height="16" x="546" y="217" rx="8" />

    <path d="M0 255h1440v4H0z" />

    <rect width="390" height="32" y="312" rx="16" />
    <rect width="104" height="16" x="1106" y="305" rx="8" />
    <rect width="104" height="16" x="1242" y="305" rx="8" />

    <rect width="407" height="122" x="0" y="438" rx="10" />
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

const dashBoardMobile = () => (
  <SkeletonWrapper
    width={420}
    height={1616}
    viewPort={{ height: '1616px', width: '420px' }}
    rectContainerHeight="100%"
    rectContainerWidth="100%"
  >
    <rect width="282" height="122" x="18" y="456" rx="10" />
    <rect width="282" height="122" x="18" y="598" rx="10" />
    <rect width="282" height="122" x="18" y="740" rx="10" />

    <path transform="translate(14 925)" d="M0 27h280v4H0z" />
    <rect width="112" height="44.918" x="17" y="977" rx="10" />
    <rect width="112" height="44.918" x="138" y="977" rx="10" />
    <rect width="160" height="16" x="14" y="925" rx="8" />

    <rect width="280" height="466" x="18" y="1053" rx="10" />
    <circle cx="160" cy="49" r="49" />
    <rect width="98" height="32" x="40" y="208" rx="16" />
    <rect width="211" height="32" x="57" y="353" rx="16" />
    <rect width="98" height="32" x="182" y="208" rx="16" />
    <rect width="224" height="24" x="50" y="109" rx="12" />
    <rect width="200" height="8" x="61" y="151" rx="4" />
    <path d="M0 319h320v4H0z" />
    <rect width="80" height="8" x="111" y="425" rx="4" />
    <rect width="80" height="8" x="21" y="425" rx="4" />
  </SkeletonWrapper>
);

const Skeleton = () => {
  return (
    <GridContainer>
      <GridX className="xs-hide">{dashBoardDesktop()}</GridX>
      <div className="lg-hide">{dashBoardMobile()}</div>
    </GridContainer>
  );
};

export default Skeleton;
