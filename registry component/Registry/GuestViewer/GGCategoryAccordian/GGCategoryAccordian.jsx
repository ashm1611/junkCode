import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { isArray } from 'lodash';
import '@bbb-app/assets/icons/minus.svg';
import '@bbb-app/assets/icons/plus.svg';
import styles from '../../CategoryAccordian/CategoryAccordian.css';
import ProductGrid from '../GGProductGrid/GGProductGrid';
import '../../../../../assets/icons/myItemsCard.svg';

const bopisDataItem = (items, props) => {
  let dataItemsArray = [];
  if (props.selectedCheckboxFilter === 'store-pickup') {
    dataItemsArray = items.filter(item => {
      return item.skuInStore === '1';
    });
  } else {
    dataItemsArray = items;
  }

  return dataItems(dataItemsArray, props);
};

const dataItems = (items, props) => {
  let dataItemsArray = [];
  if (items) {
    switch (props.filter) {
      case 'Purchased':
        dataItemsArray = items.filter(item => {
          return item.purchased;
        });
        break;
      case 'Favourites':
      case 'Favorites':
        dataItemsArray = items.filter(item => {
          return item.markedAsFav;
        });
        break;
      case 'Remaining':
        dataItemsArray = items.filter(item => {
          return !item.purchased;
        });
        break;
      default:
        dataItemsArray = items;
        break;
    }
  }

  return dataItemsArray;
};

const renderAccordionContent = props => {
  const owner = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.primaryRegistrantFirstName',
    props
  );
  const coOwner = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.coRegistrantFirstName',
    props
  );
  const registryId = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.registryId',
    props
  );
  const isMinimumQtyEnabled = pathOr(
    false,
    'globalSwitchConfig.enableMinimumQuantity',
    props
  );
  const { data, selectedCheckboxFilter } = props;

  const isPickupFilterSelected = selectedCheckboxFilter === 'store-pickup';
  return (
    <Fragment>
      <ProductGrid
        items={bopisDataItem(data.registryItemList, props)}
        ctaLabels=""
        buttonLayout=""
        owner={owner}
        coOwner={coOwner}
        registryId={registryId}
        isMinimumQtyEnabled={isMinimumQtyEnabled}
        pickupFilterSelected={isPickupFilterSelected}
        {...props}
      />
    </Fragment>
  );
};

export const GGCategoryAccordian = props => {
  if (!props.data) {
    return null;
  }
  const { selectedDropdownOption } = props;

  let ITEMS;
  if (
    selectedDropdownOption === 'Category' ||
    selectedDropdownOption === 'Date'
  ) {
    ITEMS = pathOr(null, 'data.registryItemList', props);
  } else {
    ITEMS = pathOr(null, 'data.items', props);
  }
  let showAccordianData = true;
  const DATA_ITEMS = bopisDataItem(ITEMS, props);

  if (isArray(DATA_ITEMS) && DATA_ITEMS.length === 0) {
    showAccordianData = false;
  }

  return showAccordianData ? (
    <div
      className={classnames(
        styles.accordianParent,
        props.styleVariation === 'oos' ? styles.oosAccordian : '',
        'grid-container'
      )}
    >
      {renderAccordionContent(props)}
    </div>
  ) : null;
};

GGCategoryAccordian.propTypes = {
  data: PropTypes.object,
  styleVariation: PropTypes.string,
  selectedDropdownOption: PropTypes.string,
};

renderAccordionContent.propTypes = {
  data: PropTypes.object,
  selectedCheckboxFilter: PropTypes.string,
};

GGCategoryAccordian.defaultProps = {
  expandAccordian: false,
};

export default GGCategoryAccordian;
