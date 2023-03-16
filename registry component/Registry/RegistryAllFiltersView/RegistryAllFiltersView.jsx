import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { uniq, isEqual } from 'lodash/fp';
import classnames from 'classnames';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import {
  DIRECTION_VERTICAL,
  keyboardEventFocusNavigator,
} from '@bbb-app/utils/accessibility';
import '@bbb-app/assets/icons/close.svg';
import RenderListItems from '../../../Filters/RenderListItems/RenderListItems.async';
import Styles from './RegistryAllFiltersView.css';

class RegistryAllFiltersView extends PureComponent {
  shouldComponentUpdate(nextProps) {
    // Avoid heavy operation when allFilters are closed by preventing
    // unnessary re-rendering
    return nextProps.isOpen || !isEqual(this.props.data, nextProps.data);
  }
  /**
   * onClose
   **/
  onClose = () => {
    this.props.onClose();
  };

  addFacetItemToSelection = /* istanbul ignore next: function is not used */ (
    type,
    key
  ) => {
    const index = this.props.data.facets[type].items.findIndex(
      e => e.key === key
    );
    const itemData = this.props.data.facets[type].items[index];
    let selectedItems;
    if (itemData && itemData.singleSelection) {
      selectedItems = [];
    } else {
      selectedItems = this.props.data.selectedFilters[type]
        ? this.props.data.selectedFilters[type].concat()
        : [];
    }

    const findIndex = selectedItems.indexOf(key);
    if (findIndex !== -1) {
      return;
    }
    selectedItems.push(key);
    this.props.onSelectionUpdate(
      type,
      uniq(selectedItems),
      index,
      itemData && { ...itemData },
      true
    );
  };

  viewResults = () => {
    this.props.onClose();
  };

  /**
   * handleInputsArrowEvent
   * handler for arrow key press event
   *
   * @param { string } key [The arrow key pressed]
   */
  handleInputsArrowEvent = key => e => {
    keyboardEventFocusNavigator({
      parent: `.${Styles.accordion__body}.${key}`,
      direction: DIRECTION_VERTICAL,
    })(e);
  };

  closeButton = () => {
    const { onResetFiltersAndSort, isNewDashboard, isOwnerView } = this.props;
    return (
      <span>
        {isNewDashboard && (
          <Button
            id="clearBtn"
            theme="ghost"
            variation="noPadding"
            className={Styles.link}
            onClick={() => {
              onResetFiltersAndSort();
              this.props.handleBopisCheckboxChange();
            }}
          >
            {'clear'}
          </Button>
        )}
        <Button
          theme="ghost"
          variation="noPadding"
          className={classnames(
            Styles.header__closeButton,
            'js-allFiltersCloseButton fol'
          )}
          onClick={() => {
            if (isNewDashboard && isOwnerView) this.props.onOverlayClose();
            this.onClose();
          }}
          aria-label={'Fiter Close Button'}
        >
          <Icon
            type="close"
            width="16px"
            height="16px"
            className={isNewDashboard && Styles.iconStyles}
          />
        </Button>
      </span>
    );
  };

  /**
   * @param { object } facets
   * @param { object } selectedFilters filters that we selected
   */

  renderFacets({ facets, selectedFilters }) {
    const {
      onSelectionUpdate,
      labels,
      isPanelFacetToggle,
      isOwnerView,
      enableCSLabels,
      isNewDashboard,
    } = this.props;
    const facetData = isNewDashboard ? facets : facets.slice(0, 3);
    const accordionArr = facetData.map((facet, index) => {
      const keyId = isNewDashboard ? index + 1 : index;
      const key = `filters-facet-accordion-body-${keyId}`;
      return (
        <AccordionItem
          className={Styles.accordion__item}
          hideBodyClassName=""
          key={key}
          customKey={facet.id}
          expanded={!isNewDashboard}
        >
          <AccordionItemTitle
            className={
              isNewDashboard
                ? Styles.accordion__title_New
                : Styles.accordion__title
            }
            hideBodyClassName=""
          >
            <div
              className={
                isNewDashboard
                  ? Styles.accordion__title__wrapper_New
                  : Styles.accordion__title__wrapper
              }
            >
              <span
                role="heading"
                aria-level="3"
                data-locator={`registry-${isOwnerView ? 'owner' : 'guest'}-${
                  facet.id
                }-filter`}
              >
                {facet.displayName}
              </span>
              <span className={Styles.icon} />
            </div>
          </AccordionItemTitle>
          <AccordionItemBody
            hideBodyClassName="display-none"
            className={classnames('pt0 px0 pb3', key)}
          >
            <RenderListItems
              id={facet.id}
              data={facet.items}
              type={facet.type}
              labels={labels}
              selectedItems={selectedFilters[facet.id] || []}
              facetsData={facetData}
              onSelectionUpdate={onSelectionUpdate}
              accessibilityEventHandler={this.handleInputsArrowEvent(key)}
              fromAllFilterPanel
              isPanelFacetToggle={isPanelFacetToggle}
              isRegistrySortItems={facet.id === 'sort'}
              enableCSLabels={enableCSLabels}
            />
          </AccordionItemBody>
        </AccordionItem>
      );
    });
    if (isNewDashboard) accordionArr.unshift(this.renderNewBopisCheckbox());
    return accordionArr;
  }

  renderNewBopisCheckbox = () => {
    return (
      <AccordionItem
        className={Styles.accordion__item}
        hideBodyClassName=""
        key={'filters-facet-accordion-body-0'}
        customKey={'InStore'}
        expanded
      >
        <AccordionItemTitle
          className={Styles.accordion__title_New}
          hideBodyClassName=""
        >
          <div className={Styles.accordion__title__wrapper_New}>
            <span
              role="heading"
              aria-level="3"
              data-locator={'newBopisAccordion'}
            >
              {'Online or In Store'}
            </span>
            <span className={Styles.icon} />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody
          hideBodyClassName="display-none"
          className={classnames(
            'pt0 px0 pb3',
            'filters-facet-accordion-body-0'
          )}
        >
          {this.props.renderBopisFilter()}
        </AccordionItemBody>
      </AccordionItem>
    );
  };

  renderSortView = () => {
    const {
      activeFacetId,
      data,
      labels,
      onActiveFacetChange,
      sortLabel,
      onSelectionUpdate,
      isPanelFacetToggle,
      isOwnerView,
      enableCSLabels,
    } = this.props;
    const { facets, selectedFilters } = data;
    return (
      <section
        className={classnames(Styles.slideOutWrapper, 'js-mob-allFiltersView')}
        role="region"
        aria-labelledby="all-filters-section-header-h2"
      >
        <header className={Styles.header}>
          <h2
            id="all-filters-section-header-h2"
            className={Styles.header__heading}
            tabIndex={-1}
            data-locator="allfilters_registry_headingtext"
          >
            {sortLabel}
          </h2>
          {this.closeButton()}
        </header>
        <div className={Styles.slideOutFiltersList}>
          {
            <Accordion
              className={Styles.accordion}
              accordion
              onChange={onActiveFacetChange}
              activeItems={activeFacetId && [activeFacetId]}
            >
              <RenderListItems
                id={facets[3].id}
                data={facets[3].items}
                type={facets[3].type}
                labels={labels}
                selectedItems={selectedFilters[facets[3].id] || []}
                facetsData={facets[3]}
                onSelectionUpdate={onSelectionUpdate}
                accessibilityEventHandler={this.handleInputsArrowEvent(
                  'sort-factes'
                )}
                isPanelFacetToggle={isPanelFacetToggle}
                styleProp={Styles.sortFont}
                isOwnerView={isOwnerView}
                enableCSLabels={enableCSLabels}
              />
            </Accordion>
          }
        </div>
        <footer className={Styles.footer}>
          <Button
            theme="primary"
            variation="fullWidth"
            className={Styles.viewResults}
            onClick={this.viewResults}
          >
            {'view results'}
          </Button>
        </footer>
      </section>
    );
  };

  renderAllFilterView = () => {
    const { activeFacetId, data, onActiveFacetChange } = this.props;
    return (
      <section
        className={classnames(Styles.slideOutWrapper, 'js-mob-allFiltersView')}
        role="region"
        aria-labelledby="all-filters-section-header-h2"
      >
        <header className={Styles.header}>
          <h2
            id="all-filters-section-header-h2"
            className={Styles.header__heading}
            tabIndex={-1}
            data-locator="allfilters_registry_headingtext"
          >
            {this.props.isNewDashboard ? 'filters & sort' : 'filters'}
          </h2>
          {this.closeButton()}
        </header>
        <div className={Styles.slideOutFiltersList}>
          <Accordion
            className={Styles.accordion}
            accordion
            onChange={onActiveFacetChange}
            activeItems={activeFacetId && [activeFacetId]}
          >
            {data && this.renderFacets(data)}
          </Accordion>
          {<div className={Styles.borderBottom} />}
        </div>
        <footer className={Styles.footer}>
          <Button
            theme="primary"
            variation="fullWidth"
            className={Styles.viewResults}
            onClick={this.viewResults}
          >
            {'view results'}
          </Button>
        </footer>
      </section>
    );
  };

  render() {
    const { isSortView, isNewDashboard } = this.props;
    return !isNewDashboard && isSortView
      ? this.renderSortView()
      : this.renderAllFilterView();
  }
}

export default RegistryAllFiltersView;

RegistryAllFiltersView.propTypes = {
  data: PropTypes.object,
  isSortView: PropTypes.bool,
  activeFacetId: PropTypes.string,
  onClose: PropTypes.func,
  onActiveFacetChange: PropTypes.func,
  sortLabel: PropTypes.string,
  onSelectionUpdate: PropTypes.func,
  labels: PropTypes.object,
  isPanelFacetToggle: PropTypes.bool,
  isOwnerView: PropTypes.bool,
  enableCSLabels: PropTypes.bool,
  renderBopisFilter: PropTypes.func,
  isNewDashboard: PropTypes.bool,
  onResetFiltersAndSort: PropTypes.func,
  handleBopisCheckboxChange: PropTypes.func,
  onOverlayClose: PropTypes.func,
};

RegistryAllFiltersView.defaultProps = {
  activeFacetId: '',
  productCount: 0,
  labels: {},
  accessibilityEventHandler: () => {},
};
