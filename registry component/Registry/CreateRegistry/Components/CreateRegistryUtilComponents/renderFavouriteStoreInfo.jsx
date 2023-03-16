import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isBedBathCanada } from '@bbb-app/utils/common';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import RegistryFavoriteStore from '../../../../../../containers/Pages/Registry/RegistryFavoriteStore/RegistryFavoriteStore';
import styles from './../../CreateRegistryFormStyles.css';
import {
  FAV_STORE_HEADING_LBL,
  FAV_STORE_HEADING_CANADA_LBL,
} from './constants';
const renderFavouriteStoreInfo = ({
  updateState,
  dataLocator,
  currentAddress,
  profileAddress,
  defaultStoreId,
}) => {
  const updateStore = (storeId, storeInfo) => {
    updateState({ prefStoreNum: storeId, storeInfo });
  };
  return (
    <div className="pb2">
      <fieldset>
        <GridX>
          <legend className={styles.formLegend}>
            <Heading level={2} className={classnames(styles.fieldsHeading)}>
              {isBedBathCanada()
                ? FAV_STORE_HEADING_CANADA_LBL
                : FAV_STORE_HEADING_LBL}
            </Heading>
          </legend>
        </GridX>

        <RegistryFavoriteStore
          dataLocator={dataLocator}
          currentAddress={currentAddress}
          profileAddress={profileAddress}
          defaultStoreId={defaultStoreId}
          onStoreUpdate={updateStore}
        />
      </fieldset>
    </div>
  );
};

renderFavouriteStoreInfo.propTypes = {
  updateState: PropTypes.func,
  dataLocator: PropTypes.object,
  profileAddress: PropTypes.string,
  currentAddress: PropTypes.string,
  defaultStoreId: PropTypes.string,
};

export default renderFavouriteStoreInfo;
