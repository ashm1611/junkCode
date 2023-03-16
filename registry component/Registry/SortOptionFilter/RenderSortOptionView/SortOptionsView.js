import React from 'react';
import PropTypes from 'prop-types';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import '@bbb-app/assets/icons/CloseIcon.svg';
import { RESULT_BTN_LBL } from '@bbb-app/registry/components/search-results/registry-filters/RegistryFiltersConstant';

import RenderSortListItems from '../RenderSortListItems/RenderSortListItems';
import noop from '../../../../../utils/noop';
import Styles from '../../../../Filters/SortOptionsView/SortOptionsView.css';
import { SORT_LBL } from '../../../../Filters/RenderListItem/constants';
const SortOptionsView = ({
  data,
  onClose,
  onSelectionUpdate,
  selectedItems,
  labels,
  unavailableItemCount,
  ...otherProps
}) => {
  const onSelectedSortOption = (selectedId, selectedValue, index) => {
    onSelectionUpdate(index);
  };
  return (
    <div className={Styles.slideOutWrapper}>
      <div className={Styles.slideOutSortOptionsList}>
        <header>
          <h2 className={Styles.heading}>{SORT_LBL}</h2>
          <Button
            theme="ghost"
            variation="noPadding"
            className={Styles.closeButton}
            onClick={onClose}
            aria-label="close-modal"
          >
            <Icon type="CloseIcon" width="16px" height="16px" />
          </Button>
        </header>
        <RenderSortListItems
          id="sortOptions"
          data={data}
          grouped={false}
          type=""
          onSelectionUpdate={onSelectedSortOption}
          selectedItems={selectedItems}
          labels={labels}
          unavailableItemCount={unavailableItemCount}
          {...otherProps}
        />
      </div>
      <footer>
        <Button
          className={Styles.viewResults}
          theme={selectedItems[0] !== '-1' ? 'primary' : 'deactivated'}
          onClick={onClose}
          variation="fullWidth"
        >
          {RESULT_BTN_LBL}
        </Button>
      </footer>
    </div>
  );
};

export default SortOptionsView;

SortOptionsView.propTypes = {
  data: PropTypes.array,
  onClose: PropTypes.func,
  onSelectionUpdate: PropTypes.func,
  selectedItems: PropTypes.array,
  labels: PropTypes.object,
  unavailableItemCount: PropTypes.number,
};

SortOptionsView.defaultProps = {
  onClose: noop,
  selectedItems: [],
  labels: {},
};
