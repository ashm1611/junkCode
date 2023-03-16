import React, { Fragment, PureComponent } from 'react';
import { func, object, shape, bool, string, arrayOf } from 'prop-types';
import classnames from 'classnames';
import { getOr, isEmpty, startCase, camelCase } from 'lodash/fp';
import pathOr from 'lodash/fp/pathOr';
import { compile } from 'path-to-regexp';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { isBrowser, noop } from '@bbb-app/utils/common';
import sanitizeSearchTerm from '@bbb-app/utils/sanitizeSearchTerm';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import GridContainer from '@bbb-app/core-ui/grid-container';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper/SkeletonWrapper';
import { HOSTNAMES } from '@bbb-app/seo/components/constants';
import TitleTags from '@bbb-app/seo/components/TitleTags';
import { InternalServerErrorPage } from '@bbb-app/error-pages/containers/http-error-pages/InternalServerErrorPage';
import { ROUTE_REGISTRY_QUICK_PICKS_LANDING } from '@bbb-app/constants/route/route';
import {
  CHANNELTYPE_DESKTOP,
  CHANNELTYPE_MOBILE,
} from '@bbb-app/constants/appConstants';
import CrumbDropdown from '../../../../common/Breadcrumbs/CrumbDropdown';
import VisualFacets from '../../../../PureContent/VisualFacets';
import CollectionItem from './CollectionItem';
import styles from './QuickPicksLanding.css';
import {
  renderContentModules,
  renderQuickPickHero,
  renderSignInButton,
} from '../ContentModules';
import QuickPickTealiumHandler from '../../../../../containers/ThirdParty/Tealium/QuickPickTealiumHandler/QuickPickTealiumHandler';
import { scrollSelectorUnderNavigation } from '../../../../../utils/quickPicks';
import { OVERFLOW_VARIATION_SCROLL } from '../../../../PureContent/VisualFacets/VisualFacets';
import UrlTags from '../../../../Seo/UrlTags';
import { SEO_KICKSTARTER_HEADER_LBL } from '../Collection/constants';

const wrapInGrid = component => (
  <GridContainer>
    <GridX>
      <Cell>{component}</Cell>
    </GridX>
  </GridContainer>
);
export const toPath = compile(ROUTE_REGISTRY_QUICK_PICKS_LANDING);
const toLowerCase = str =>
  str && typeof str === 'string' ? str.toLowerCase() : str;
/**
 * This class renders the Quick Pick Landing page.
 */
class QuickPicksLanding extends PureComponent {
  componentDidMount() {
    if (
      (this.props.quickPicks.categories &&
        !this.props.quickPicks.categories.length) ||
      this.props.quickPicks.selectedCategory
    ) {
      this.getQuickPicksData(this.props);
    }
  }
  componentDidUpdate(prevProps) {
    const prevRegistry = pathOr('', 'match.params.registryName', prevProps);
    const currentRegistry = pathOr('', 'match.params.registryName', this.props);
    const prevCategory = pathOr('', 'match.params.category', prevProps);
    const currentCategory = pathOr('', 'match.params.category', this.props);
    if (currentRegistry !== prevRegistry || prevCategory !== currentCategory) {
      this.getQuickPicksData(this.props);
    }
  }
  getQuickPicksData = propObj => {
    const {
      match = { url: {}, params: {} },
      siteId,
      fetchQuickPicks,
    } = propObj;
    const { url, params: args } = match;
    const pageName = pathOr('', 'route.routeData.pageName', propObj);
    args.pagePath = url;
    fetchQuickPicks(args, pageName, '', {}, siteId);
  };
  getRegistryName = registryType => {
    const {
      quickPicks: { registryTypes },
    } = this.props;
    return getOr(
      '',
      'label',
      registryTypes.find(v => v.id === registryType)
    );
  };
  /**
   * Changes registry type
   *
   * @param registryType
   */
  changeRegistryType = registryType => {
    const {
      quickPicks: { selectedCategory },
    } = this.props;
    const registryName = sanitizeSearchTerm(this.getRegistryName(registryType));
    this.props.changeRegistryType(
      toPath({ registryType, registryName, category: selectedCategory })
    );
  };
  /**
   * updates store will selected Filters
   *
   * @param val
   */
  updateSelectedFilters = val => {
    const {
      quickPicks: { selectedRegistryType: registryType },
    } = this.props;
    /* istanbul ignore else */
    if (val.selectedCategory.length > 0) {
      const selectedCategory =
        val.selectedCategory[val.selectedCategory.length - 1];
      const registryName = sanitizeSearchTerm(
        this.getRegistryName(registryType)
      );
      const url = toPath({
        registryType,
        registryName,
        category: sanitizeSearchTerm(selectedCategory),
      });
      scrollSelectorUnderNavigation('.js-quickpicks-landing-visual-facets');
      if (isBrowser()) {
        history.pushState(null, null, url); // So Redux does not dispatch router change action.
      }
      this.props.setQuickPicks({
        selectedCategory, // Last value
        cacheKey: url,
      });
    }
  };
  /**
   * Renders Quick Picks Visual Facets
   *
   * @return {node}
   */
  renderQuickPicksCategories = () => {
    const {
      quickPicks: { categories: quickPicksCategories, selectedCategory },
    } = this.props;
    if (quickPicksCategories && quickPicksCategories.length > 0) {
      const categories = quickPicksCategories.map(({ label, image }) => ({
        cta: {
          url: sanitizeSearchTerm(label),
          linkText: label,
        },
        image: {
          alt: label,
          url: image.url,
        },
      }));
      const items = quickPicksCategories.map(({ label }) => ({
        selected: false,
        label,
        value: sanitizeSearchTerm(label),
        key: sanitizeSearchTerm(label),
      }));
      const facetsData = {
        selectedCategory: {
          id: 'selectedCategory',
          displayName: 'selectedCategory',
          type: 'field',
          items,
        },
      };
      const selectedFilters = {
        selectedCategory: selectedCategory ? [selectedCategory] : [],
      };
      return (
        <section className="md-mb2 sm-mb3 mt3 js-quickpicks-landing-visual-facets">
          <VisualFacets
            shape="round"
            type="filter"
            categories={categories}
            facetsData={facetsData}
            selectedFilters={selectedFilters}
            updateSelectedFilters={this.updateSelectedFilters}
            overflowVariation={{
              [CHANNELTYPE_MOBILE]: OVERFLOW_VARIATION_SCROLL,
              [CHANNELTYPE_DESKTOP]: OVERFLOW_VARIATION_SCROLL,
            }}
            channelType={this.props.channelType}
            hideHorizontalScrollbar
            applyBottomPadding
            displayCarouselWithArrow
          />
        </section>
      );
    }
    return null;
  };
  /**
   * Renders the Collection Tiles
   *
   * @return {node}
   */
  renderQuickPicksCollections = () => {
    const {
      quickPicks: { categories, selectedCategory },
    } = this.props;
    if (categories && selectedCategory) {
      const collectionData = categories.find(
        ({ label }) => sanitizeSearchTerm(label) === selectedCategory
      );
      const collection =
        collectionData && collectionData.collections
          ? collectionData.collections.map(({ label, image, url }, i) => (
              <div key={i} className="cell large-4 small-12 medium-6">
                <CollectionItem
                  productPositionClicked={this.props.productPositionClicked}
                  position={i}
                  url={url}
                  imageUrl={image}
                  collectionName={label}
                  triggerTealiumEvent={this.props.triggerTealiumEvent}
                />
              </div>
            ))
          : null;
      return (
        <div
          className={classnames(
            styles.collectionWrapper,
            'sm-my0 sm-pt4 md-my0 md-pt4 mb3'
          )}
        >
          {wrapInGrid(
            <section className="grid-x grid-margin-x">{collection}</section>
          )}
        </div>
      );
    }
    return null;
  };
  renderSEOTitleTags = () => {
    const {
      quickPicks: { registryTypes, selectedRegistryType, selectedCategory },
    } = this.props;
    const registry = registryTypes.find(v => v.id === selectedRegistryType);
    const hostname = HOSTNAMES.get(this.props.siteId) || '';
    if (!isEmpty(registry) && selectedCategory) {
      const label = startCase(registry.label);
      const category = startCase(camelCase(selectedCategory));
      return (
        <Fragment>
          <TitleTags>
            {LabelsUtil.replacePlaceholderValues(SEO_KICKSTARTER_HEADER_LBL, [
              category,
              label,
            ])}
          </TitleTags>
          <UrlTags>
            {`${hostname}${toPath({
              registryType: selectedRegistryType,
              registryName: toLowerCase(sanitizeSearchTerm(registry.label)),
              category: toLowerCase(sanitizeSearchTerm(selectedCategory)),
            })}`}
          </UrlTags>
        </Fragment>
      );
    }
    return null;
  };
  /**
   * Remders a combo box of Quick Picks Registry Types
   *
   * @return {node}
   */
  renderQuickPickTypes = () => {
    const {
      quickPicks: { registryTypes, selectedRegistryType },
    } = this.props;
    if (registryTypes && registryTypes.length > 0) {
      const links = registryTypes.map(({ label, id }) => ({
        key: id,
        props: { value: id },
        label,
      }));
      const registry = registryTypes.find(v => v.id === selectedRegistryType);
      const label = registry.label;
      return (
        <section className="center mb2 content-margin-top">
          <CrumbDropdown
            links={links}
            toNewUrl={this.changeRegistryType}
            title={{
              url: selectedRegistryType,
              text: selectedRegistryType,
              label,
            }}
            displayH1Option
          />
        </section>
      );
    }
    return null;
  };

  renderError = () => <InternalServerErrorPage />;

  renderCategoriesSkeleton = () => {
    const categoryFacet = (
      <div className={''}>
        <SkeletonWrapper
          viewPort={{ height: '100%', width: '100%' }}
          rectContainerHeight="100%"
          rectContainerWidth="100%"
          preserveAspectRatio="xMaxYMax meet"
          svgProps={{ viewBox: '0 0 100 100' }}
        >
          <Fragment>
            <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />
          </Fragment>
        </SkeletonWrapper>
        <SkeletonWrapper
          viewPort={{ height: 60, width: '100%' }}
          rectContainerHeight="100%"
          rectContainerWidth="100%"
          preserveAspectRatio="xMaxYMin meet"
          svgProps={{ viewBox: null }}
        >
          <Fragment>
            <rect
              x="20%"
              y={this.props.channelType === CHANNELTYPE_DESKTOP ? '20' : '3'}
              rx="12.5"
              ry="12.5"
              width="60%"
              height="25px"
            />
          </Fragment>
        </SkeletonWrapper>
      </div>
    );
    const facetsCount = this.props.channelType === CHANNELTYPE_DESKTOP ? 7 : 4;
    const categoryFacets = [];
    for (let i = 0; i < facetsCount; i += 1) {
      categoryFacets.push(
        <div
          className={classnames(styles.skeletonCategoryCell)}
          key={`qp-landing-skel-categoryFacet${i}`}
        >
          {categoryFacet}
        </div>
      );
    }
    return <div className={styles.facetItemWrapper}>{categoryFacets}</div>;
  };
  renderCollectionSkeleton = () => {
    const collection = (
      <div className={styles.skeletonCollection}>
        <SkeletonWrapper
          viewPort={{ height: 316, width: '100%' }}
          rectContainerHeight="100%"
          rectContainerWidth="100%"
          preserveAspectRatio="xMaxYMin meet"
          svgProps={{ viewBox: null }}
        >
          <Fragment>
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="260px" />
            <rect
              x="25%"
              y={this.props.channelType === CHANNELTYPE_DESKTOP ? '291' : '275'}
              rx="12.5"
              ry="12.5"
              width="50%"
              height="25px"
            />
          </Fragment>
        </SkeletonWrapper>
      </div>
    );
    const collectionsCount =
      this.props.channelType === CHANNELTYPE_DESKTOP ? 9 : 5;
    const collections = [];
    for (let i = 0; i < collectionsCount; i += 1) {
      collections.push(
        <div
          key={`qp-landing-skel-collect${i}`}
          className="cell large-4 small-12 medium-6"
        >
          {collection}
        </div>
      );
    }
    return (
      <div className={styles.skeletonCollectionsWrapper}>{collections}</div>
    );
  };
  renderHeroSkeleton = () => {
    const height = this.props.channelType === CHANNELTYPE_DESKTOP ? 446 : 219;
    return (
      <section className="center">
        <div className="pt2">
          <SkeletonWrapper
            viewPort={{ height, width: '100%' }}
            rectContainerHeight="100%"
            rectContainerWidth="100%"
            preserveAspectRatio="xMaxYMin meet"
            svgProps={{ viewBox: null }}
          >
            <rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width="100%"
              height={`${height}px`}
            />
          </SkeletonWrapper>
        </div>
      </section>
    );
  };
  renderSkeletonStyles = () => {
    return (
      <section className="center">
        <div className="pt4">
          <SkeletonWrapper
            viewPort={{ height: 120, width: '100%' }}
            rectContainerHeight="100%"
            rectContainerWidth="100%"
            preserveAspectRatio="xMaxYMin meet"
            svgProps={{ viewBox: null }}
          >
            {this.props.channelType === CHANNELTYPE_DESKTOP && (
              <Fragment>
                <rect x="46%" y="0" rx="8" ry="8" width="8%" height="16px" />
                <rect
                  x="40%"
                  y="36"
                  rx="19"
                  ry="19"
                  width="20%"
                  height="38px"
                />
              </Fragment>
            )}
            {this.props.channelType === CHANNELTYPE_MOBILE && (
              <Fragment>
                <rect x="38.5%" y="0" rx="8" ry="8" width="22%" height="16px" />
                <rect
                  x="25%"
                  y="35"
                  rx="11"
                  ry="11"
                  width="50%"
                  height="22px"
                />
                <rect
                  x="25%"
                  y="67"
                  rx="11"
                  ry="11"
                  width="50%"
                  height="22px"
                />
              </Fragment>
            )}
          </SkeletonWrapper>
        </div>
        {wrapInGrid(this.renderHeroSkeleton())}
        {wrapInGrid(this.renderCategoriesSkeleton())}
        {wrapInGrid(this.renderCollectionSkeleton())}
      </section>
    );
  };

  render = () => {
    const {
      quickPicks,
      labels,
      content,
      isLoggedIn,
      loadContent,
      siteId,
      labelsRef,
      enableCSLabels,
    } = this.props;
    if (quickPicks && quickPicks.error) {
      return this.renderError();
    }
    if (!quickPicks || quickPicks.fetching) {
      return this.renderSkeletonStyles();
    }
    return (
      <section className="js-quickpicks-landing-top">
        <ErrorBoundary fallback={this.renderError()}>
          {this.renderSEOTitleTags()}
          {wrapInGrid(this.renderQuickPickTypes())}
          {wrapInGrid(renderSignInButton(this.props))}
          {wrapInGrid(renderQuickPickHero(this.props.quickPicks.hero))}
          {wrapInGrid(this.renderQuickPicksCategories())}
          {this.renderQuickPicksCollections()}
          {wrapInGrid(
            renderContentModules({
              labels,
              content,
              isLoggedIn,
              loadContent,
              siteId,
              labelsRef,
              enableCSLabels,
            })
          )}
        </ErrorBoundary>
        <QuickPickTealiumHandler />
      </section>
    );
  };
}

/**
 * @param {func} setQuickPicks Updates data in Redux Store
 * @param {func} changeRegistryType Pushes a route change based on the selected registry type
 * @param {func} loadContent Loads content data from referred content / labels api
 * @param {bool} isLoggedIn Indicates is current user is authenticated
 * @param {array} quickPicks.categories Contains categories data
 * @param {bool} quickPicks.fetching Indicates that data is being fetched from endpoint
 * @param {string} quickPicks.selectedCategory The currently selected category
 * @param {array} quickPicks.registryTypes An array of available registry types
 * @param {string} quickPicks.selectedRegistryType The currently selected registry type
 * @param {bool} quickPicks.error Indicates if an error occurred when fetching data.
 * @param {array} quickPicks.hero Contains hero data
 * @param {object} labels Contains label data.
 * @param {object} content Contains Referred Content data
 */
QuickPicksLanding.propTypes = {
  setQuickPicks: func,
  changeRegistryType: func,
  loadContent: func,
  productPositionClicked: func,
  triggerTealiumEvent: func,
  isLoggedIn: bool,
  channelType: string,
  quickPicks: shape({
    categories: arrayOf(
      shape({
        label: string,
        image: string,
        collections: arrayOf(
          shape({
            label: string,
            image: string,
            url: '',
          })
        ),
      })
    ),
    fetching: bool,
    selectedCategory: string,
    registryTypes: arrayOf(
      shape({
        id: string,
        label: string,
        url: string,
      })
    ),
    selectedRegistryType: string,
    error: bool,
    hero: arrayOf(
      shape({
        title: object,
        description: object,
        image: shape({
          url: string,
          alt: string,
        }),
      })
    ),
  }),
  labels: object,
  content: object,
  siteId: string,
  labelsRef: object,
  enableCSLabels: bool,
};

QuickPicksLanding.defaultProps = {
  setQuickPicks: noop,
  changeRegistryType: noop,
  loadContent: noop,
  productPositionClicked: noop,
  triggerTealiumEvent: noop,
  isLoggedIn: false,
  channelType: CHANNELTYPE_MOBILE,
  siteId: '',
  content: {
    isFetching: false,
  },
  quickPicks: {
    categories: [],
    fetching: false,
    selectedCategory: '', // Configured Default.
    registryTypes: [],
    selectedRegistryType: '',
    error: false,
    hero: [],
  },
  labels: {
    alreadyLoggedIn: '_Log__ged in_',
    signIn: '__Sign_In__',
    startYourRegistry: '_Start Your Registry_',
    findARegistry: '_Find a Registry_',
    liveChat: '_Live Chat_',
    bookAppointment: '_Book Appointment_',
    customerSupportCTAHeader: '_Need Help?_',
    seoKickstartersHeader: '__{0} For {1}',
    referredContent: [],
  },
};

export default QuickPicksLanding;
