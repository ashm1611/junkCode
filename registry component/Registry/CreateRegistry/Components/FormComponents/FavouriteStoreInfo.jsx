import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty, split } from 'lodash/fp';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Heading from '@bbb-app/core-ui/heading/Heading';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import { isMobileDevice } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import List from '@bbb-app/core-ui/list';
import '@bbb-app/assets/icons/directions.svg';
import styles from '../../CreateRegistryFormStyles.css';
import FavoriteStoreInput from './FavouriteStoreInput';
import '../../../../../../assets/icons/change-blue.svg';
import { DIRECTIONS_LBL, CHANGE_LBL } from './constants';

const getDirectionLink = storeData => {
  const combinedAddress = `${storeData.address}+${storeData.city}+${storeData.state}+${storeData.postalCode}+${storeData.country}`;
  if (isMobileDevice.iOS()) {
    return `http://maps.apple.com/?daddr=${combinedAddress}`;
  } else if (isMobileDevice.Android()) {
    return `https://maps.google.com/maps?saddr=My Location&daddr=${combinedAddress}`;
  }
  const lat = storeData.Lat || storeData.latitude;
  const long = storeData.Lng || storeData.longitude;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
};

const renderButtons = (storeInfo, onChangeStore, dataLocator) => {
  const handleClick = e => {
    e.preventDefault();
    onChangeStore({ findAStoreModal: true });
  };
  return (
    <List>
      <Cell>
        <PrimaryLink
          href={getDirectionLink(storeInfo)}
          theme="control"
          target="_blank"
          isHardSpaReq
          iconProps={{
            className: styles.favoriteStoreIconButton,
            type: 'directions',
          }}
          className="left-align"
          data-locator={dataLocator.registryFavStoreDirection}
        >
          <span className={classnames(styles.favoriteStoreButton, 'ml1')}>
            {DIRECTIONS_LBL}
          </span>
        </PrimaryLink>
      </Cell>
      <Cell>
        <Button
          onClick={e => {
            handleClick(e);
          }}
          theme="link"
          variation="blacklink"
          iconProps={{
            className: styles.favoriteStoreIconButton,
            type: 'change-blue',
          }}
          className="left-align"
          data-locator={dataLocator.registryFavStoreChange}
        >
          <span className={classnames(styles.favoriteStoreButton, 'ml1')}>
            {CHANGE_LBL}
          </span>
        </Button>
      </Cell>
    </List>
  );
};

const FavouriteStoreInfo = ({
  storeId,
  storeInfo,
  dataLocator,
  onChangeStore,
  onSearchStore,
  isMobile,
  isStoreFetching,
  storeError,
  showFavStoreInputErr,
}) => {
  const renderStoreTitle = () => (
    <Heading
      className={classnames('mb0', styles.favoriteStoreTitle)}
      level={4}
      data-locator={dataLocator.registryFavStoreCity}
    >
      {storeInfo.city}
    </Heading>
  );
  const renderPhoneLink = phone =>
    isMobile ? (
      <HyperLink
        variation="phoneNumber"
        textDecoration="textDecorationNone"
        href={`tel:${phone}`}
        className={classnames(styles.phoneNumber)}
      >
        {phone}
      </HyperLink>
    ) : (
      phone
    );
  const renderStoreAddress = () => (
    <List
      className={styles.favoriteStoreList}
      listData={[
        storeInfo.commonName,
        storeInfo.address,
        `${storeInfo.city}, ${storeInfo.state} ${storeInfo.postalCode}`,
        renderPhoneLink(storeInfo.phone),
      ]}
    />
  );
  const renderStoreTiming = () => {
    if (storeInfo.hours) {
      return (
        <List
          className={styles.favoriteStoreList}
          listData={split(',', storeInfo.hours)}
          data-locator={dataLocator.registryFavStoreTimings}
        />
      );
    }
    return (
      <List
        className={styles.favoriteStoreList}
        listData={split(',', storeInfo.storeTimings)}
        data-locator={dataLocator.registryFavStoreTimings}
      />
    );
  };
  return (
    <ErrorBoundary>
      {storeId && !isEmpty(storeInfo) ? (
        <div
          className={classnames(styles.favoriteStore)}
          data-locator={dataLocator.registryFavStoreSection}
        >
          <GridX className={'grid-margin-x'}>
            <Cell>{renderStoreTitle()}</Cell>
          </GridX>
          <GridX className={'grid-margin-x'}>
            <Cell className={classnames('large-3 small-12 sm-mb2')}>
              {renderStoreAddress()}
            </Cell>
            <Cell className={classnames('large-3 small-12 sm-mb1')}>
              {renderStoreTiming()}
            </Cell>
            <Cell className={classnames('large-2 small-12')}>
              {renderButtons(storeInfo, onChangeStore, dataLocator)}
            </Cell>
          </GridX>
        </div>
      ) : (
        <FavoriteStoreInput
          dataLocator={dataLocator}
          onSearchStore={onSearchStore}
          isStoreFetching={isStoreFetching}
          storeError={storeError}
          showFavStoreInputErr={showFavStoreInputErr}
        />
      )}
    </ErrorBoundary>
  );
};

FavouriteStoreInfo.propTypes = {
  dataLocator: PropTypes.object,
  storeId: PropTypes.string,
  storeInfo: PropTypes.object,
  onChangeStore: PropTypes.func,
  onSearchStore: PropTypes.func,
  isMobile: PropTypes.bool,
  isStoreFetching: PropTypes.bool,
  showFavStoreInputErr: PropTypes.bool,
  storeError: PropTypes.array,
};

export default FavouriteStoreInfo;
