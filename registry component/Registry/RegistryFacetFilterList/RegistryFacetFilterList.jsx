import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import {
  DIRECTION_HORIZONTAL,
  keyboardEventFocusNavigator,
  DIRECTION_VERTICAL,
} from '@bbb-app/utils/accessibility';
import { isBrowser, isMobileDevice } from '@bbb-app/utils/common';
import KEY_EVENT from '@bbb-app/constants/commonKeyEvents';
import FilterButton from '@bbb-app/filters/components/filter-button/FilterButton';
import FilterButtonStyles from '@bbb-app/filters/components/filter-button/FilterButton.css';
import Styles from './RegistryFacetFilterList.css';
import RenderListItems from '../../../../components/Filters/RenderListItems/RenderListItems.async';

export class RegistryFacetFilterList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleFocusOutEvent = this.handleFocusOutEvent.bind(this);
    this.toggleDropdown = debounce(this.toggleDropDown.bind(this), 250);
    this.closeDropDownOnBody = debounce(
      this.closeDropDownOnbody.bind(this),
      100
    );
    this.disableTabbingIfNotVisible = this.disableTabbingIfNotVisible.bind(
      this
    );
    this.closeDropdownWhenUserScrolls = debounce(
      this.closeDropdownWhenUserScrollHandle,
      550
    );

    this.state = {
      dropdownIsOpen: props.dropdownIsOpen || false,
    };
  }

  /**
   * @function componentDidMount
   */
  componentDidMount = () => {
    /* istanbul ignore else */
    if (isBrowser()) {
      /* istanbul ignore else */
      if (this.props.collapseDropdown) {
        window.addEventListener(
          'scroll',
          this.closeDropdownWhenUserScrollHandle
        );
      }
      this.filterListContainer.addEventListener(
        'focusout',
        this.handleFocusOutEvent
      );
    }
    const filtersWrapper = document.querySelector(
      '.filtersViewport .filtersWrapper'
    );
    if (filtersWrapper) {
      filtersWrapper.addEventListener('mouseleave', this.closeDropDownOnBody);
    }
  };

  componentDidUpdate() {
    try {
      this.disableTabbingIfNotVisible();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  /**
   * @function componentWillUnmount
   */
  componentWillUnmount() {
    /* istanbul ignore else */
    if (isBrowser()) {
      /* istanbul ignore else */
      if (this.filterListContainer) {
        this.filterListContainer.removeEventListener(
          'focusout',
          this.handleFocusOutEvent
        );
      }

      const filtersWrapper = document.querySelector(
        '.filtersViewport .filtersWrapper'
      );
      if (filtersWrapper) {
        filtersWrapper.removeEventListener(
          'mouseleave',
          this.closeDropDownOnBody
        );
      }
    }
    /* istanbul ignore next: testing window is dangerous in current setup */
    if (this.props.collapseDropdown) {
      window.removeEventListener(
        'scroll',
        this.closeDropdownWhenUserScrollHandle
      );
    }
    clearTimeout(this.delayCloseDD);
  }

  /**
   * Helper function to return Filter Button
   *
   * @return {(ElementTagNameMap[string] | null) | (Element | null)}
   */
  getHTMLDomFilterButton = () =>
    this.filterListContainer.querySelector(
      `.${FilterButtonStyles.filterButton}`
    );

  closeDropdownWhenUserScrollHandle = () => {
    if (this.state.dropdownIsOpen && !isMobileDevice.any()) {
      if (this.delayCloseDD !== undefined) {
        clearTimeout(this.delayCloseDD);
      }
      this.delayCloseDD = setTimeoutCustom(
        () => this.closeDropDownWithLocalState(),
        200
      );
    }
  };
  /**
   * closes the drop down when clicked outside of filter
   * @param {Event} e
   */
  closeDropDownOnbody = () => {
    this.toggleDropdown.cancel();
    /* istanbul ignore else  */
    if (this.state.dropdownIsOpen) {
      this.setState({
        dropdownIsOpen: false,
      });
    }
  };

  disableTabbingIfNotVisible() {
    const button = this.filterListContainer.querySelector('button');
    const top = this.filterListContainer.getBoundingClientRect().top;
    const parentTop = this.filterListContainer.parentElement.parentElement.getBoundingClientRect()
      .top;
    if (top < parentTop) {
      button.setAttribute('tabIndex', '-1');
      button.setAttribute('aria-hidden', 'true');
    } else {
      button.setAttribute('tabIndex', '0');
      button.removeAttribute('aria-hidden');
    }
  }

  /**
   * closes the drop down when clicked outside of filter
   * @param {Event} e
   */
  closeDropDown = () => {
    this.setState({
      dropdownIsOpen: false,
    });
    /* istanbul ignore else */
    if (this.state.modalSelectionView) {
      this.removeMobileModal();
    }

    if (this.props.handleMultipleSelection) {
      this.props.handleMultipleSelection(false);
    }
  };

  /**
   * closes the dropdown and sets the local dropdownIsOpen to false
   */
  closeDropDownWithLocalState = () => {
    this.setState({
      dropdownIsOpen: false,
    });
  };

  /**
   * Will close the drop down if Filter List loses focus.
   *
   * @param {FocusEvent} e
   */
  handleFocusOutEvent(e) {
    const { relatedTarget } = e;
    /* istanbul ignore else */
    if (
      this.state.dropdownIsOpen &&
      relatedTarget &&
      this.filterListContainer &&
      !this.filterListContainer.contains(relatedTarget)
    ) {
      this.closeDropDownWithLocalState();
    }
  }

  /**
   * Handles Key events that occurred in the Render Items
   *
   * @param {KeyboardEvent} e
   */
  handleInputsArrowEvent = e => {
    const { keyCode } = e;
    /* istanbul ignore else */
    if (keyCode === KEY_EVENT.KEY_ESCAPE) {
      this.closeDropDownWithLocalState();
      this.getHTMLDomFilterButton().focus();
    }
    keyboardEventFocusNavigator({
      parent: this.filterListContainer.querySelector(`.${Styles.dropdown}`),
      direction: DIRECTION_VERTICAL,
    })(e);
  };
  /**
   * Handels Key events for Filter List
   *
   * @param {KeyboardEvent} e
   * @return {null}
   */
  handleKeyDown = e => {
    const { keyCode } = e;
    switch (keyCode) {
      case KEY_EVENT.KEY_DOWN:
      case KEY_EVENT.KEY_UP:
        e.preventDefault();
        if (!this.state.dropdownIsOpen) {
          this.openDropdown(e);
        }
        break;
      case KEY_EVENT.KEY_ESCAPE:
        this.closeDropDownWithLocalState();
        keyboardEventFocusNavigator({
          parent: this.filterListContainer.parentNode,
          direction: DIRECTION_HORIZONTAL,
          bubbles: true,
          enableWrap: false,
          focusableSelector: `.${FilterButtonStyles.filterButton}`,
          callback: this.closeDropDownWithLocalState,
        })(e);
        break;
      default:
    }
    return null;
  };

  toggleDropDown = e => {
    if (this.state.dropdownIsOpen) {
      this.closeDropDown(e);
    } else {
      this.openDropdown(e);
    }
  };
  /**
   * opens the dropdown and sets the dropdownIsOpen to true
   *
   *  @param {Event} e
   */
  openDropdown = () => {
    this.setState({
      dropdownIsOpen: true,
    });
  };

  render() {
    const {
      displayName,
      id,
      data,
      facetsData,
      onSelectionUpdate,
      selectedItems,
      labels,
      isOwnerView,
      enableCSLabels,
    } = this.props;
    const { dropdownIsOpen } = this.state;
    return (
      <ErrorBoundary>
        <React.Fragment>
          <div
            className={`${Styles.filterList} ${Styles.mgRight} filterBtnWrapper pb1`}
            ref={node => (this.filterListContainer = node)}
            onMouseLeave={this.closeDropDownOnBody}
            tabIndex="0"
            aria-haspopup="true"
          >
            <FilterButton
              isSelected={dropdownIsOpen}
              label={displayName}
              aria-haspopup="true"
              aria-expanded={dropdownIsOpen}
              aria-controls={id}
              onKeyDown={this.handleKeyDown}
              styles={''}
              aria-label={displayName}
              variationName={'default'}
              type="button"
              data-locator={`registry-${
                isOwnerView ? 'owner' : 'guest'
              }-${id}-filter`}
              onMouseOver={this.toggleDropdown}
              onClick={this.toggleDropdown}
              onFocus={this.toggleDropdown}
            />

            {dropdownIsOpen && (
              <div
                className={classnames(
                  Styles.dropdown,
                  id === 'sort' ? Styles.sortDropdown : '',
                  '__test__filterListDropDownWrapper'
                )}
                id={id}
                tabIndex="-1"
              >
                <RenderListItems
                  id={id}
                  data={data}
                  grouped={false}
                  type={facetsData.type}
                  showTypeAhead={false}
                  labels={labels}
                  closeContainer={this.closeDropDownWithLocalState}
                  accessibilityEventHandler={this.handleInputsArrowEvent}
                  toggleOpenState={this.toggleDropdown}
                  onSelectionUpdate={onSelectionUpdate}
                  facetsData={facetsData}
                  selectedItems={selectedItems || []}
                  isRegistrySortItems={id === 'sort'}
                  isOwnerView={isOwnerView}
                  enableCSLabels={enableCSLabels}
                />
              </div>
            )}
          </div>
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

RegistryFacetFilterList.propTypes = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  data: PropTypes.object,
  handleMultipleSelection: PropTypes.func,
  facetsData: PropTypes.object,
  collapseDropdown: PropTypes.bool,
  dropdownIsOpen: PropTypes.bool,
  onSelectionUpdate: PropTypes.func,
  selectedItems: PropTypes.array,
  labels: PropTypes.object,
  isOwnerView: PropTypes.bool,
  enableCSLabels: PropTypes.bool,
};
RegistryFacetFilterList.defaultProps = {
  collapseDropdown: false,
  dropdownIsOpen: false,
};
export default RegistryFacetFilterList;
