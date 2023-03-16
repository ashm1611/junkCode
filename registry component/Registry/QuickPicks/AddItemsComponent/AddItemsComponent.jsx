import React, { Component, Fragment } from 'react';
import { bool, number, func, object, string } from 'prop-types';
import classnames from 'classnames';
import Checkbox from '@bbb-app/core-ui/checkbox';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { noop } from '@bbb-app/utils/common';
import LazyLoad from '@bbb-app/core-ui/lazy-load';
import Button from '@bbb-app/core-ui/button';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import CommonUtil from '@bbb-app/utils/commonUtil';
import styles from './AddItemsComponent.css';
import {
  SELECT_ALL_LBL,
  ADD_SELECTED_LBL,
  NO_SELECTED_ITEMS_LBL,
} from '../Collection/constants';

/**
 *  Renders Add Registry Items component used on the QuickPicks Collectionpage.
 */
class AddItemsComponent extends Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
      checked: false,
    };
  }
  /**
   * @param {bool} checked The state of the select all checkbox
   */
  handleSelectAllEvent = checked => {
    this.props.allItemsSelected(checked);
    this.setState({ checked });
  };
  /**
   * Handles view port change events.
   * @param {object} vp View port data.
   */
  handleViewPortChanges = vp => {
    if (vp.viewTop >= this.props.yThreshold && this.props.yThreshold !== 0) {
      this.setState({ fixed: !vp.inView });
    } else {
      this.setState({ fixed: false });
    }
  };
  /* Handles add selected items CTA events.*/
  handleAddSelectedItemsEvent = totalItems => {
    this.props.addSelectedItems(totalItems);
    this.setState({ checked: false });
  };
  /**
   * Renders select All checkbox and label.
   * @return {node}
   */
  renderSelectAllCheckbox = () => {
    return (
      <div
        className={classnames(
          styles.selectAllWrapper,
          this.props.fromRecomendation && styles.recSelectAllWrapper
        )}
      >
        <Checkbox
          onSelect={this.handleSelectAllEvent}
          checked={
            this.state.checked &&
            this.props.totalItems === this.props.selectedItemsCount
          }
          disabled={this.props.isInternationalUser}
          label=" "
        />
        <div
          className={classnames(
            styles.selectAllLabel,
            'ml0',
            this.props.fromRecomendation ? 'mr2' : 'mr3'
          )}
        >
          {SELECT_ALL_LBL}
        </div>
      </div>
    );
  };
  /** Renders Add Select Items CTA
   * @return {node}
   */
  renderAddSelectedItemsCTA = totalItems => {
    const { selectedItemsCount, isInternationalUser } = this.props;
    const isDisabled = isInternationalUser || !selectedItemsCount;
    return (
      <Button
        theme={isDisabled ? 'deactivated' : 'primary'}
        onClick={() => this.handleAddSelectedItemsEvent(totalItems)}
        className={styles.addSelectedItemsCTA}
        disabled={isDisabled}
      >
        {selectedItemsCount
          ? LabelsUtil.replacePlaceholderValues(ADD_SELECTED_LBL, [
              selectedItemsCount,
            ])
          : NO_SELECTED_ITEMS_LBL}
      </Button>
    );
  };
  /** Spy on viewport and fire in-out view port events
   * @return {node}
   */
  renderViewPortMonitor = () => {
    return (
      <LazyLoad
        repeatOnInView
        shouldCallbackonInit
        threshold={0}
        onInViewPortChange={this.handleViewPortChanges}
        useEvent
      >
        <div />
      </LazyLoad>
    );
  };
  /**
   * @override
   * @return {node}
   */
  render = () => {
    if (this.props.loading) {
      return null;
    }
    const { fromRecomendation } = this.props;
    const isMobile = CommonUtil.isMobileScreen(770);
    return (
      <Fragment>
        <section
          className={classnames(
            styles.base,
            this.state.fixed && !fromRecomendation
              ? styles.fixedToViewPort
              : '',
            this.state.fixed &&
              this.props.isRegistryFooterOpen &&
              !fromRecomendation &&
              styles.registryFooterOpen
          )}
        >
          <div
            className={classnames(
              styles.dockedWrapper,
              'grid-container',
              this.state.fixed && !fromRecomendation
                ? styles.floatingWrapper
                : ''
            )}
          >
            {fromRecomendation && (
              <React.Fragment>
                <GridX className="fullWidth">
                  <Heading level={1} className={styles.quickPicksTitle}>
                    {this.props.quizLabels.QUIZ_RESULTS_LBL.replace(
                      '{tk}',
                      this.props.personaType
                    )}
                  </Heading>
                  <Cell className={classnames('pb15', styles.quizSubHeading)}>
                    <span>{this.props.quizLabels.RETAKE_QUIZ_SUBCOPY_LBL}</span>
                    <PrimaryLink
                      href="#"
                      variation="primary"
                      onClick={this.props.renderQuizQnALayout}
                      type="bold"
                      className={'ml025 sm-pt2'}
                      data-locator="retakeQuizCta"
                    >
                      {this.props.quizLabels.RETAKE_QUIZ_LBL}
                    </PrimaryLink>
                  </Cell>
                </GridX>
              </React.Fragment>
            )}
            {
              <div
                className={classnames(
                  fromRecomendation && styles.recDockedWrapper,
                  'justify-end',
                  !fromRecomendation && !isMobile && 'flex',
                  !fromRecomendation &&
                    this.props.isResponsive &&
                    styles.quickPicksDockedWrapper
                )}
              >
                {this.renderSelectAllCheckbox()}
                {this.renderAddSelectedItemsCTA(this.props.totalItems)}
              </div>
            }
          </div>
        </section>
        {this.renderViewPortMonitor()}
      </Fragment>
    );
  };
}
/**
 * @param {object} labels Labels object
 * @param {number} selectedItemsCount The number of items selected.  Drives the labeling logic.
 * @param {func} allItemsSelected Callback for when user checks all selected checkbox.
 * @param {func} addSelectedItems Callback for when user clicks the add selected items CTA.
 * @param {bool} Allows component to display loading state.
 * @param {number} yThreshold Will only float below this 'y' threshold.
 */
AddItemsComponent.propTypes = {
  selectedItemsCount: number,
  allItemsSelected: func,
  addSelectedItems: func,
  loading: bool,
  yThreshold: number,
  totalItems: number,
  isRegistryFooterOpen: bool,
  isInternationalUser: bool,
  fromRecomendation: bool,
  personaType: string,
  renderQuizQnALayout: func,
  quizLabels: object,
  isResponsive: bool,
};
AddItemsComponent.defaultProps = {
  labels: {
    selectAll: 'Select all',
    addSelected: 'Add Selected to Registry ({0})',
    noSelectedItems: 'Add Selected to Registry',
  },
  selectedItemsCount: 0,
  allItemsSelected: noop,
  addSelectedItems: noop,
  yThreshold: 0,
  totalItems: 0,
  isInternationalUser: false,
};
export default AddItemsComponent;
