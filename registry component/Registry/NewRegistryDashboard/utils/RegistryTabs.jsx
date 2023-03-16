import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridContainer from '@bbb-app/core-ui/grid-container';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import styles from '../NewRegistryDashboard.css';

const RegistryTabs = props => {
  const {
    openEditModal,
    setOpenEditModal,
    showRegBuilder,
    setShowRegBuilder,
    isMobile,
  } = props;
  const [selectedTabIndex, setselectedTabIndex] = useState(0);
  useEffect(() => {
    if (openEditModal) setselectedTabIndex(2);
    else if (showRegBuilder) setselectedTabIndex(1);
    else setselectedTabIndex(0);
  }, [openEditModal, showRegBuilder]);
  const selectLabels = [
    {
      labelName: 'overview',
      onClick: () => setShowRegBuilder(null),
      dataLocator: 'registry-newDashboard-overview',
    },
    {
      labelName: 'registry builder',
      onClick: () => setShowRegBuilder('default'),
      dataLocator: 'registry-newDashboard-registryBuilder',
    },
    {
      labelName: 'registry settings',
      onClick: () => setOpenEditModal(true),
      dataLocator: 'registry-newDashboard-registrySettings',
    },
  ];

  return (
    <GridContainer className={classnames(isMobile && styles.tabsWrapper)}>
      <ul
        className={classnames(
          'md-mt3 md-ml4 md-mr2',
          styles.leftnav,
          isMobile && styles.listWrapper
        )}
      >
        {selectLabels.map((item, index) => (
          <li
            key={index}
            aria-label={index === selectedTabIndex && 'selected'}
            className={classnames(
              styles.registryTabs,
              index === selectedTabIndex && styles.selectedTab,
              !isMobile && styles.botomBorder
            )}
            data-tab={item.labelName}
            data-locator={item.dataLocator}
          >
            <PrimaryLink
              id={`registry-tab-${index}`}
              href={'#'}
              onClick={item.onClick}
              type="normal"
              variation="defaultBlack"
              className={classnames(
                styles.link,
                index === selectedTabIndex
                  ? styles.selectedTabFont
                  : styles.tabFont
              )}
            >
              {item.labelName}
            </PrimaryLink>
          </li>
        ))}
      </ul>
    </GridContainer>
  );
};

RegistryTabs.propTypes = {
  isMobile: PropTypes.bool,
  openEditModal: PropTypes.bool,
  setOpenEditModal: PropTypes.func,
  showRegBuilder: PropTypes.bool,
  setShowRegBuilder: PropTypes.func,
};

export default RegistryTabs;
