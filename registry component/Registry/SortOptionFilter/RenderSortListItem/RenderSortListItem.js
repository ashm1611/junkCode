import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@bbb-app/core-ui/button/CoreButton';
import Icon from '@bbb-app/core-ui/icon';
import styles from '@bbb-app/filters/components/render-list-item/lazy-RenderListItem.css';
import {
  DISCONTINUED_LABEL,
  UNAVAILABLE,
  SORT_LBL,
} from '../../../../Filters/RenderListItem/constants';
import { DiscontinuedMobile } from '../../Discontinued/DiscontinuedMobile';
/**
 * Renders a custom component within a list of items defined by app/components/Filters/RenderListItems/RenderListItems
 *
 * For more information about the component please refer to
 * the README: docs/storybook/filter-list.md
 */
class RenderSortListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.domNode = null;
  }

  componentDidMount() {
    /* istanbul ignore else */
    if (this.domNode && this.props.itemPositionInList === 'first') {
      const input =
        this.domNode.querySelector('input') ||
        this.domNode.querySelector('button');
      // ensure the focus doesn't shift to checkbox when user is backspacing from brand input search
      /* istanbul ignore else */
      if (input) {
        try {
          input.focus();
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    }
  }

  /**
   * Triggers onSelect callback prop for the Button renderer
   *
   * @param {string} text
   * @public
   */
  onClick = () => {
    const { onSelect, toggleOpenState, facetClick, index, id } = this.props;
    onSelect(id, true, index);
    if (toggleOpenState) toggleOpenState();
    if (facetClick) facetClick(false);
  };

  /**
   * renders default filter List item
   *
   * @param {boolean} selected Controls selection by default
   * @param {object} listItemProps
   * @param {string} label string for checkbox label value
   * @param {number} count number of items that fit filter result
   * @param {number} index Index in the list
   *
   */
  /* eslint-disable max-params */
  filterItem = (
    selected,
    listItemProps,
    label,
    count,
    index,
    discontinuedItemCount,
    track,
    trackItems,
    stateTrackItem,
    key,
    labels = {},
    unavailableItemCount
  ) => {
    return key === DISCONTINUED_LABEL ? (
      <DiscontinuedMobile
        selected={selected}
        listItemProps={listItemProps}
        label={label}
        count={count}
        index={index}
        labels={labels}
        stylesMob={styles}
        onClick={this.onClick}
        discontinuedItemCount={discontinuedItemCount}
        track={track}
        trackItems={trackItems}
        stateTrackItem={stateTrackItem}
      />
    ) : (
      <li
        className={classnames(styles.listItem, styles.listButton, {
          [styles.listItemSelected]: selected,
        })}
        {...listItemProps}
      >
        <Button
          onClick={e => {
            this.onClick(e);
          }}
          role={'menuitem'}
          aria-label={`${SORT_LBL} by ${label}`}
          disabled={selected}
          value={index}
        >
          {key === UNAVAILABLE && unavailableItemCount > 0 && (
            <Icon
              type="alert"
              width="16px"
              height="16px"
              className={classnames(styles.dangerIcon)}
            />
          )}
          {label}
          {count && ` (${parseInt(count, 10).toLocaleString()})`}
        </Button>
      </li>
    );
  };

  render() {
    const {
      data,
      index,
      selected,
      itemPositionInList,
      labels,
      discontinuedItemCount,
      track,
      trackItems,
      stateTrackItem,
      unavailableItemCount,
    } = this.props;
    const { label, count, key } = data;
    const menuitemProps = {
      'data-position': itemPositionInList,
      key: `listItem-${index}`,
      ref: ref => {
        this.domNode = ref;
      },
    };
    /* istanbul ignore else */
    if (parseInt(count, 10) === 0) {
      return null;
    }
    return (
      data &&
      this.filterItem(
        selected,
        menuitemProps,
        label,
        count,
        index,
        discontinuedItemCount,
        track,
        trackItems,
        stateTrackItem,
        key,
        labels,
        unavailableItemCount
      )
    );
  }
}

export default RenderSortListItem;

/**
 * @param {string} id Unique ID for the item
 * @param {number} index Index in the list
 * @param {object} data Data object with label, value and count properties
 * @param {func} onSelect Callback for selection change
 * @param {oneOf} type Type of renderer - field, interval, range or [Empty]
 * @param {bool} selected Controls selection by default
 * @param {string} itemPositionInList Position of item in the list - first or last
 * @param {object} labels label from label api
 */
RenderSortListItem.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  data: PropTypes.object,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  itemPositionInList: PropTypes.string,
  labels: PropTypes.object,
  toggleOpenState: PropTypes.func,
  discontinuedItemCount: PropTypes.bool,
  track: PropTypes.func,
  trackItems: PropTypes.func,
  stateTrackItem: PropTypes.bool,
  facetClick: PropTypes.func,
  unavailableItemCount: PropTypes.number,
};

RenderSortListItem.defaultProps = {
  type: 'field',
  selected: false,
  onSelect: () => {},
  itemPositionInList: '',
  accessibilityEventHandler: () => {},
  selectedFilters: {},
  allItems: {},
  appliedFiltersOrderedSet: null,
};
