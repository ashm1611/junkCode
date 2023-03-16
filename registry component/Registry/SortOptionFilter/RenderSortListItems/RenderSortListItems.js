import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, get, uniq } from 'lodash/fp';
import Button from '@bbb-app/core-ui/button/CoreButton';
import RenderSortListItem from '../RenderSortListItem/RenderSortListItem';

/**
 * RenderListItems
 * Renders a list of items, can be used standalone or within a container as we have in app/components/Filters/FilterList/FilterList
 */
class RenderSortListItems extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      items: data,
    };
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else */
    if (!isEqual(nextProps.data, this.props.data)) {
      this.setState({ items: nextProps.data });
    }
  }

  /**
   * @method onItemSelect
   * Triggers callback when an item in the list is altered by user interaction
   * Sends a cumulative update including all selected items from the list
   *
   * @param {string} id ID of item in the list that changed
   * @param {bool} selected Type of change - selected or deselected
   * @param {number} index Index of the item in the list
   */
  onItemSelect = (id, selected, index) => {
    const itemData = this.props.data.find(e => e.key === id);
    const items =
      itemData && itemData.singleSelection
        ? []
        : this.props.selectedItems.concat();
    if (selected) {
      items.push(id);
    }

    const selectedItems = uniq(items);

    this.props.onSelectionUpdate(
      this.props.id,
      selectedItems,
      index,
      itemData && { ...itemData },
      selected
    );
  };

  /**
   * @method renderItem
   * Renders individual items in the list
   *
   * @param {object} data Data for the item, refer app/components/Filters/RenderListItem/RenderListItem
   * @param {number} index Index within the list
   * @param {string} position Position within the list - first or last, used for controlling focus when navigating using a keyboard
   */

  renderItem(data, index, position, labels, allItems, obj) {
    const {
      selectedItems,
      type,
      toggleOpenState,
      selectedFilters,
      id,
      appliedFiltersOrderedSet,
      unavailableItemCount,
    } = this.props;
    const uniqueId = data.key;
    const key =
      get('props.value', data) || get('dep_id', data) || get('key', data);
    const isSelected = selectedItems.indexOf(key) > -1;

    return (
      <RenderSortListItem
        onSelectionUpdate={this.props.onSelectionUpdate}
        id={uniqueId}
        facetKey={id}
        selectedFilters={selectedFilters}
        key={`${id}-${uniqueId}`}
        data={data}
        type={type}
        index={index}
        itemPositionInList={position} // flag for "first" or "last" in the list
        selected={isSelected}
        onSelect={this.onItemSelect}
        labels={labels}
        closeContainer={this.props.closeContainer}
        toggleOpenState={toggleOpenState}
        allItems={allItems}
        appliedFiltersOrderedSet={appliedFiltersOrderedSet}
        fromAllFilterPanel={this.props.fromAllFilterPanel}
        discontinuedItemCount={obj.discontinuedItemCount}
        track={obj.track}
        stateTrackItem={obj.stateTrackItem}
        trackItems={obj.trackItems}
        facetClick={this.props.facetClick}
        unavailableItemCount={unavailableItemCount}
      />
    );
  }

  render() {
    const {
      labels,
      modalSelectionView,
      modalSelectionHeading,
      toggleOpenState,
      modalIcon,
      allowHeaders,
      facetsData,
      discontinuedItemCount,
      track,
      trackItems,
      stateTrackItem,
    } = this.props;
    const { items } = this.state;
    // according to BBBFEO-25097 these are the only categories that should have headers in the dropdown
    const itemIdsThatShouldHaveHeaders = ['LOW_PRICE', 'BRAND', 'RATINGS'];
    const obj = {
      discontinuedItemCount,
      track,
      trackItems,
      stateTrackItem,
    };
    return (
      /* As per https://www.w3.org/TR/wai-aria-practices/#menu */
      <ul role="menu">
        {modalSelectionView ? (
          <li className="modalSelectionHeader">
            {modalSelectionHeading ? <h3>{modalSelectionHeading}</h3> : null}
            <Button
              className="modalSelectionClose"
              onClick={e => toggleOpenState(e)}
              aria-label={'close'}
            >
              {modalIcon || 'X'}
            </Button>
          </li>
        ) : null}

        {items &&
          Array.isArray(items) &&
          items
            .filter(i => {
              let shouldBeLetRendered = true;
              if (i.type && i.type === 'header') {
                shouldBeLetRendered =
                  itemIdsThatShouldHaveHeaders.indexOf(i.id) > -1;
              }
              // allowHeaders check added to display headings even if
              // above condition does not meet
              return allowHeaders || shouldBeLetRendered;
            })
            .map((item, index) => {
              let itemPositionInList = '';
              if (index === 0) {
                itemPositionInList = 'first';
              } else if (index === items.length - 1) {
                itemPositionInList = 'last';
              }
              return this.renderItem(
                item,
                index,
                itemPositionInList,
                labels,
                facetsData,
                obj
              );
            }, this)}
      </ul>
    );
  }
}

export default RenderSortListItems;

/**
 * @param {string} id Unique ID for the list
 * @param {object} data Data object with label, value and count properties
 * @param {string} type Type of renderer - field, interval, range or [Empty]
 * @param {func} onSelectionUpdate Callback for selection change
 * @param {array} selectedItems List of pre-selected items in the list
 * @param {object} labels label from label api
 */
RenderSortListItems.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
  onSelectionUpdate: PropTypes.func,
  selectedItems: PropTypes.array,
  labels: PropTypes.object,
  closeContainer: PropTypes.func,
  modalSelectionView: PropTypes.bool,
  modalSelectionHeading: PropTypes.string,
  toggleOpenState: PropTypes.func,
  modalIcon: PropTypes.any,
  selectedFilters: PropTypes.object,
  allowHeaders: PropTypes.bool, // To allow all headings to be displayed
  facetsData: PropTypes.object,
  appliedFiltersOrderedSet: PropTypes.any,
  fromAllFilterPanel: PropTypes.bool,
  discontinuedItemCount: PropTypes.bool,
  track: PropTypes.func,
  trackItems: PropTypes.func,
  stateTrackItem: PropTypes.bool,
  facetClick: PropTypes.func,
  unavailableItemCount: PropTypes.number,
};

RenderSortListItems.defaultProps = {
  grouped: false,
  onSelectionUpdate: () => {},
  selectedItems: [],
  closeContainer: () => {},
  accessibilityEventHandler: () => {},
  modalIcon: null,
  selectedFilters: {},
  facetsData: {},
  appliedFiltersOrderedSet: null,
};
