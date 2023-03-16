import React from 'react';
import { array, string, object } from 'prop-types';
import { isEqual, sortBy } from 'lodash';
import GridContainer from '@bbb-app/core-ui/grid-container';
import Notification from '@bbb-app/core-ui/notification';
import {
  saveDataInSessionStorage,
  getDataFromSessionStorage,
} from '@bbb-app/utils/RegistryUtils';
import styles from './MyItemNotification.css';

/**
 * @description This component render notification on registry myitem tab if registrant has out of stock,
 * no logner carry and discountinued in their account.
 * @author Ajay Jha | ajay.jha@idc.bedbath.com
 */

class MyItemNotification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showNotification: false,
      statusFacets: [],
    };
    this.componentMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const { registryFacetsFilter, registryId } = this.props;
    const { selectedFilters } = nextProps;
    const { status } = selectedFilters;
    const { statusFacets } = this.state;

    if (!getDataFromSessionStorage(`hideMyItemNotification_${registryId}`)) {
      /* istanbul ignore else */
      if (
        !isEqual(nextProps.registryFacetsFilter, registryFacetsFilter) ||
        this.componentMounted
      ) {
        this.componentMounted = false;
        this.checkForOutStockItem(nextProps.registryFacetsFilter);
      } else if (isEqual(sortBy(status), sortBy(statusFacets))) {
        this.setState({ showNotification: false });
      } else if (!isEqual(status, statusFacets) && statusFacets.length >= 1) {
        this.setState({ showNotification: true });
      }
    }
  }

  closeNotificationHandler = () => {
    this.setState({ showNotification: false });
    saveDataInSessionStorage(
      `hideMyItemNotification_${this.props.registryId}`,
      true
    );
  };

  checkForOutStockItem = registryFacetsFilter => {
    const isEnable =
      registryFacetsFilter &&
      registryFacetsFilter.map(filter => {
        const facetData =
          filter.id === 'status' &&
          filter.items.filter(
            val =>
              val.key === 'Currently Sold Out' || val.key === 'Discontinued'
          );
        if (facetData.length >= 1) {
          const facets = facetData.map(val => val.key);
          this.setState({ statusFacets: facets });
          return true;
        }
        return false;
      });
    const isTrue = val => Boolean(val) === true;
    if (isEnable && isEnable.some(isTrue)) {
      this.setState({ showNotification: true });
    } else {
      this.setState({ showNotification: false, statusFacets: [] });
    }
  };

  renderNotificationContent = () => {
    const { notificationMsg } = this.props;
    return <React.Fragment>{notificationMsg}</React.Fragment>;
  };

  render() {
    const { showNotification } = this.state;
    return (
      showNotification &&
      !getDataFromSessionStorage(
        `hideMyItemNotification_${this.props.registryId}`
      ) && (
        <div className={styles.accordianContainer}>
          <GridContainer className={styles.outOfStock}>
            <Notification
              status="error"
              component={this.renderNotificationContent()}
              hasCloseButton="true"
              hasStatusIcon="true"
              wrapperClass={styles.outOfStockNotification}
              closeClick={this.closeNotificationHandler}
              iconPosition={styles.iconspace}
            />
          </GridContainer>
        </div>
      )
    );
  }
}

/**
 * @param {object} labels labels from RegistryOwner node
 * @param {func} updateSelectedFilters this function update the status filter
 * @param {array} registryFacetsFilter all registry facets returned from first-category and remaining-category api
 * @param {string} registryId active registry id
 */

MyItemNotification.propTypes = {
  registryFacetsFilter: array,
  registryId: string,
  notificationMsg: string,
  selectedFilters: object,
};

export default MyItemNotification;
