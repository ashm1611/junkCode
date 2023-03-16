import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary/ErrorBoundary';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Button from '@bbb-app/core-ui/button';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { PAGE_NAME_REGISTRY_OWNER_HOME } from '@bbb-app/constants/route/route';
import ProductGridSkeleton from '../../../ProductGrid/Skeleton/Skeleton';
import CreateRegistryWithUsBanner from '../../AccountRegistries/CreateRegistryWithUsBanner';
import {
  REGISTRY_REFERRED_CONTENT_KEY,
  REDIRECT_TO,
  REGISTRY_INCENTIVE_QUERY_PARAM,
  ALL_INCENTIVES_LBL,
  VIEW_ALL_INCENTIVES_LBL,
  SUB_HEAD_LBL,
  INCENTIVE_TEXT_LBL,
  REGISTRY_INCENTIVE_TNC_LINK_LBL,
  TERMS_CONDITIONS_LBL,
  CLICK_TO_VIEW_LBL,
  BONUS_GIFT_BANNER_TITLE_LBL,
} from '../../../../containers/Pages/Registry/RegistryIncentive/constants';
import RegistryIncentiveItem from '../../../../components/Pages/Registry/RegistryIncentiveItem/RegistryIncentiveItem';
import styles from './RegistryIncentiveComponent.css';
import stylesChild from '../RegistryIncentiveItem/RegistryIncentiveItem.css';
/**
 * @param {[object]}  incentiveInfo  [array of objects containing details about incentives]
 * @param {[object]}  labels  [Labels object]
 * @param {[boolean]}  isFetching  [Is data fetching]
 * @param {[object]} deviceConfig [Object containing info about viewport]
 * @param {[object]} bannerData  [Create registry with us banner data]
 */
export default class RegistryIncentiveComponent extends React.PureComponent {
  static propTypes = {
    incentiveInfo: PropTypes.array,
    isFetching: PropTypes.bool,
    deviceConfig: PropTypes.object,
    bannerData: PropTypes.object,
    pageName: PropTypes.string,
    activeRegistry: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    isRecognizedUser: PropTypes.bool,
    redirectTo: PropTypes.func,
    error: PropTypes.any,
    enableCSLabels: PropTypes.bool,
    labelsRef: PropTypes.object,
  };

  static defaultProps = {
    incentiveInfo: [],
  };

  /**
   * Function returning the id with which to identify the referred content data.
   * @param {[object]} labels [Labels object]
   * @returns {[string]} id [Content ID from labels to match with data returned from dynamic content api call]
   */
  getContentID(labels) {
    let id = null;
    const { enableCSLabels, labelsRef } = this.props;

    const referredContent = pathOr(
      '',
      'referredContent',
      enableCSLabels ? labelsRef : labels
    );
    if (referredContent) {
      referredContent.forEach(obj => {
        if (obj.key === REGISTRY_REFERRED_CONTENT_KEY) {
          id = obj.id;
        }
      });
    }

    return id;
  }
  getRegistryList = (incentiveInfo, pageName) => {
    return incentiveInfo.map((val, i) => {
      if (!val) return null;
      if (pageName === PAGE_NAME_REGISTRY_OWNER_HOME && i > 2) {
        return null;
      }
      return (
        <RegistryIncentiveItem
          incentiveInfo={val}
          pageName={pageName}
          activeRegistry={this.props.activeRegistry}
          isLoggedIn={this.props.isLoggedIn}
          isRecognizedUser={this.props.isRecognizedUser}
        />
      );
    });
  };
  renderFirstTile() {
    const rootStyles = classnames({
      [stylesChild.base]: true,
    });
    const queryDelimiter = '?';
    return (
      <Cell
        className={classnames(
          'large-3 small-12 medium-12 pr1 pl1 pb1',
          stylesChild.incentiveTile
        )}
      >
        <div className={classnames(rootStyles)}>
          <Heading
            level={2}
            className={classnames(styles.incentiveHeading, 'mr-auto')}
            data-locator="registery-registerymyincentives-top-heading"
          >
            {BONUS_GIFT_BANNER_TITLE_LBL}
          </Heading>
          <div className={classnames('pt2 pb1', styles.subHead)}>
            {SUB_HEAD_LBL}
          </div>
          <div className={classnames(styles.incentiveText)}>
            {INCENTIVE_TEXT_LBL}
          </div>

          <Button
            onClick={() => {
              this.props.redirectTo(
                `${REDIRECT_TO}${queryDelimiter}${REGISTRY_INCENTIVE_QUERY_PARAM}`
              );
            }}
            theme={`secondaryStrokeBasic`}
            className={classnames('mt4', stylesChild.viewDetails)}
          >
            <span className={classnames(stylesChild.wrapContent)}>
              {VIEW_ALL_INCENTIVES_LBL}
            </span>
          </Button>
        </div>
      </Cell>
    );
  }
  renderHeading(incentiveInfo, pageName) {
    if (pageName === PAGE_NAME_REGISTRY_OWNER_HOME) {
      return null;
    }
    return (
      <div
        className={classnames(
          styles.headSection,
          'grid-container justify-start'
        )}
      >
        <Heading
          level={2}
          className={classnames(styles.incentiveHeading, 'mr-auto')}
          data-locator="registery-registerymyincentives-heading"
        >
          {ALL_INCENTIVES_LBL} &#40;{incentiveInfo.length}&#41;
        </Heading>
        <div className={classnames(styles.termsConditionsBlock)}>
          <span>{CLICK_TO_VIEW_LBL} </span>
          {this.renderTermsAndCondition()}
        </div>
      </div>
    );
  }
  renderList(incentiveInfo, labels, pageName) {
    const ownerPageIncentivesContainer =
      pageName === PAGE_NAME_REGISTRY_OWNER_HOME
        ? styles.ownerPageIncentivesContainer
        : '';
    return (
      incentiveInfo &&
      incentiveInfo.length > 0 && (
        <div className={classnames(styles.regionContainer)}>
          <div className={classnames('grid-container ')}>
            <div
              className={classnames(
                `pt4 pl4 pr4 grid-margin-x pb4 ${ownerPageIncentivesContainer}`,
                styles.incentivesContainer
              )}
            >
              {this.renderHeading(incentiveInfo, pageName)}

              <GridX>
                {pageName === PAGE_NAME_REGISTRY_OWNER_HOME &&
                  this.renderFirstTile()}
                {this.getRegistryList(incentiveInfo, labels, pageName)}
              </GridX>
            </div>
          </div>
        </div>
      )
    );
  }

  renderTermsAndCondition = () => {
    return (
      <PrimaryLink
        variation="primary"
        type="bold"
        className={classnames(styles.termsLink)}
        href={REGISTRY_INCENTIVE_TNC_LINK_LBL}
        target="_blank"
        data-locator={'Rregistryincentive_termsandcondition'}
      >
        {TERMS_CONDITIONS_LBL}
      </PrimaryLink>
    );
  };

  render() {
    const {
      isFetching,
      deviceConfig,
      bannerData,
      incentiveInfo,
      pageName,
      error,
    } = this.props;
    const labels = pathOr('', 'labels', this.props);
    if (isFetching) {
      return (
        <div className={classnames(styles.base, styles.gridViewBase)}>
          <ProductGridSkeleton
            count={1}
            className={classnames(styles.cell, styles.gridView)}
            height={'100'}
          />
        </div>
      );
    }
    const id = this.getContentID(labels);
    let data;
    if (bannerData && bannerData.content) {
      const { content } = bannerData;
      data = content[id];
    }
    if (pageName === PAGE_NAME_REGISTRY_OWNER_HOME) {
      return error ? (
        <Notification
          status={'error'}
          content={error}
          wrapperClass={'p1 mb2 large-8 small-12 mx-auto'}
        />
      ) : (
        this.renderList(incentiveInfo, labels, pageName)
      );
    }

    return (
      <ErrorBoundary>
        <div className={classnames('mt3 sm-mt0')}>
          {data && (
            <CreateRegistryWithUsBanner
              data={data.components}
              deviceConfig={deviceConfig}
              isRegistryIncentive
            />
          )}
          {this.renderList(incentiveInfo, labels)}
          {error && (
            <Notification
              status={'error'}
              content={error}
              wrapperClass={'p1 mb2 large-8 small-12 mx-auto'}
            />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}
