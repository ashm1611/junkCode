import React, { PureComponent } from 'react';
import { array, func, object, number, bool, string } from 'prop-types';
import classnames from 'classnames';
import GridContainer from '@bbb-app/core-ui/grid-container';
import Heading from '@bbb-app/core-ui/heading';
import { isBrowser } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import LazyLoad from '@bbb-app/core-ui/lazy-load';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper/SkeletonWrapper';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import { saveDataInSessionStorage } from '@bbb-app/utils/RegistryUtils';
import RegistryPhoto, {
  THUMB,
} from '@bbb-app/registry/components/search-results/registry-photo/RegistryPhoto';
import RegistryResultsGridStyles from './RegistryResultsGrid.css';
const REG_ID_LBL = 'Registry ID';
const VIEW_REG_LBL = 'View Registry';
/**
 * Renders the registry results grid as defined in BBBFEO-843
 *
 * @author hreid
 */
class RegistryResultsGrid extends PureComponent {
  saveSearchUrl = () => {
    let currentUrl = '';
    if (isBrowser()) {
      currentUrl = window.location.pathname + window.location.search;
      saveDataInSessionStorage('searchRegistryUrl', currentUrl);
    }
  };
  renderRegistry = (item, key) => {
    const { makeReviewYourProductsConfig, isMobile } = this.props;
    const {
      display_initials: displayInitials,
      registry_num: registryNum,
      display_name: displayNameApi,
      reg_first_name: regFirstName,
      reg_last_name: regLastName,
      coreg_last_name: coRegLastName,
      coreg_first_name: coRegFirstName,
      display_event_date: displayEventDate,
      event_type_description: eventTypeDescription,
      display_state_code: displayStateCode,
    } = item;
    let displayName = (
      <Heading level={3} className="mb0">
        {regFirstName} {regLastName}
      </Heading>
    );
    /* istanbul ignore else  */
    if (coRegLastName || coRegFirstName) {
      const coRegName = `${coRegFirstName} ${coRegLastName}`;
      const coRegNameLength = 50;
      const coRegNameFifty =
        coRegName.slice(0, coRegNameLength) +
        (coRegName.length > coRegNameLength ? '...' : '');
      displayName = (
        <Heading level={3} className="mb0">
          {regFirstName} {regLastName} &amp;
          <br />
          {coRegNameFifty}
        </Heading>
      );
    }
    return (
      <li
        key={`registry-results-grid-${key}`}
        className={classnames(
          !isMobile && RegistryResultsGridStyles.gridHeight,
          RegistryResultsGridStyles.event
        )}
      >
        <div className={classnames(RegistryResultsGridStyles.gridDisplay)}>
          <div
            className={RegistryResultsGridStyles.thumbnailContainer}
            data-locator="search-results-registry-image"
          >
            <div className={RegistryResultsGridStyles.thumbnailWrapper}>
              <RegistryPhoto
                size={THUMB}
                registryId={registryNum}
                endpoint={this.props.photoEndpoint}
                makeReviewYourProductsConfig={makeReviewYourProductsConfig}
                style={`${RegistryResultsGridStyles.thumbnail} ${RegistryResultsGridStyles.thumbnailRegistrySearchedItems}`}
                alt={`${displayNameApi} ${eventTypeDescription} ${displayEventDate}`}
              >
                {displayInitials.replace(/\s+/g, '')}
              </RegistryPhoto>
            </div>
          </div>
          <div
            className={classnames(
              !isMobile && RegistryResultsGridStyles.gridEventDisplay
            )}
          >
            <div
              className={RegistryResultsGridStyles.registryNames}
              data-locator="search-results-registry-name"
            >
              {displayName}
            </div>
            <div
              className={RegistryResultsGridStyles.eventDetails}
              data-locator="search-results-registry-type"
            >
              <div
                className={classnames(
                  !isMobile && RegistryResultsGridStyles.eventDescDsk,
                  RegistryResultsGridStyles.eventDesc
                )}
              >
                <div
                  className={classnames(
                    RegistryResultsGridStyles.eventType,
                    'mb1'
                  )}
                >
                  {eventTypeDescription}
                </div>
                <div data-locator="search-results-registry-date">
                  {displayEventDate}
                </div>
                <div data-locator="search-results-registry-id">
                  {REG_ID_LBL} {registryNum}
                </div>
                <div data-locator="search-results-registry-state">
                  {displayStateCode}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={RegistryResultsGridStyles.viewRegistryWraper}
          data-locator="find-a-registry-view-registry-button"
        >
          <Button
            onClick={this.saveSearchUrl}
            className={RegistryResultsGridStyles.viewRegistryButton}
            href={`/store/giftregistry/viewregistryguest/${registryNum}`}
            aria-label={`view ${eventTypeDescription} registry of ${regFirstName} ${regLastName} ${coRegFirstName ||
              ''} ${coRegLastName || ''} dated ${displayEventDate}`}
            isHardSpaReq
          >
            {VIEW_REG_LBL}
          </Button>
        </div>
      </li>
    );
  };
  renderSkeletonStyle = () => {
    if (this.props.channelType === 'desktop') {
      return (
        <SkeletonWrapper
          className={classnames(
            'pt2',
            RegistryResultsGridStyles.skeletonStyles
          )}
          viewPort={{ height: 130, width: '100%' }}
          rectContainerHeight="100%"
          rectContainerWidth="100%"
          preserveAspectRatio="xMaxYMin meet"
          svgProps={{ viewBox: null }}
        >
          <ellipse cx="80" cy="50" rx="50" ry="50" />
          <rect x="155" y="0" rx="4" ry="4" width="30%" height="40px" />
          <rect x="155" y="50" rx="4" ry="4" width="30%" height="40px" />
          <rect x="58.5%" y="0" rx="4" ry="4" width="15%" height="20px" />
          <rect x="58.5%" y="25" rx="4" ry="4" width="15%" height="20px" />
          <rect x="58.5%" y="50" rx="4" ry="4" width="15%" height="20px" />
          <rect x="58.5%" y="75" rx="4" ry="4" width="15%" height="20px" />
          <rect x="85%" y="25%" rx="4" ry="4" width="144" height="50px" />
        </SkeletonWrapper>
      );
    }
    return (
      <SkeletonWrapper
        className={classnames('pt2', RegistryResultsGridStyles.skeletonStyles)}
        viewPort={{ height: 337, width: '100%' }}
        rectContainerHeight="100%"
        rectContainerWidth="100%"
        preserveAspectRatio="xMaxYMin meet"
        svgProps={{ viewBox: null }}
      >
        <ellipse cx="50" cy="35" rx="35" ry="35" />
        <rect x="15" y="85" rx="4" ry="4" width="70%" height="25px" />
        <rect x="15" y="120" rx="4" ry="4" width="70%" height="25px" />
        <rect x="15" y="160" rx="4" ry="4" width="40%" height="20px" />
        <rect x="15" y="220" rx="4" ry="4" width="40%" height="20px" />
        <rect x="15" y="190" rx="4" ry="4" width="40%" height="20px" />
        <rect x="15" y="270" rx="4" ry="4" width="90%" height="40px" />
      </SkeletonWrapper>
    );
  };
  render = () => {
    const uniqueItems = [];

    // as items come from different locations - sometimes there might be dup registry numbers; this makes sure there are no duplicates in the items
    this.props.items.forEach(i => {
      if (
        uniqueItems.findIndex(j => j.registry_num === i.registry_num) === -1
      ) {
        uniqueItems.push(i);
      }
    });
    const rows = uniqueItems.map(this.renderRegistry);
    return (
      uniqueItems &&
      uniqueItems.length > 0 && (
        <section className={RegistryResultsGridStyles.base}>
          <GridContainer className={RegistryResultsGridStyles.container}>
            <GridX>
              <Cell className={RegistryResultsGridStyles.events}>
                <ul>
                  {rows}
                  <Instrumentation
                    zoneName={'ux-primary-content-displayed'}
                    markName={'ux-content-registry-search-results'}
                  />
                  <LazyLoad
                    onInViewPortChange={this.props.onNextPage}
                    repeatOnInView
                    threshold={this.props.threshold}
                    disable={this.props.isFetchingResults}
                    useEvent
                  >
                    <div />
                  </LazyLoad>
                  {this.props.isFetchingResults && this.renderSkeletonStyle()}
                </ul>
              </Cell>
            </GridX>
          </GridContainer>
        </section>
      )
    );
  };
}

/**
 * @param {object} labels i8n labels
 * @param {func} Callback on each next page request.
 * @param {array} items Data returned for Registry Search Index in Solr
 * @param {number} threshold Integer val in pixels to trigger a next page load based on y-coord during scroll
 * @param {bool} isFetchingResults Indicates that results is fetch...
 *
 */
RegistryResultsGrid.propTypes = {
  onNextPage: func.isRequired,
  items: array,
  threshold: number,
  isFetchingResults: bool,
  photoEndpoint: string,
  channelType: string,
  makeReviewYourProductsConfig: object,
  isMobile: bool,
};

RegistryResultsGrid.defaultProps = {
  items: [],
  threshold: 200,
  /* Must use third party config */
  photoEndpoint:
    'https://s22.socialannex.com/v2/api/photoregistry/images/9411181',
  channelType: 'mobile',
};

export default RegistryResultsGrid;
