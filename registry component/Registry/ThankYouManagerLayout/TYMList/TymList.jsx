import React from 'react';
import pathOr from 'lodash/fp/pathOr';
import { parse } from 'qs';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import { anchorToItem } from '@bbb-app/utils/RegistryUtils';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import HideOnTbs from '@bbb-app/core-ui/hide-on-tbs/HideOnTbs';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import Img from '@bbb-app/core-ui/image/CoreImage';
import '@bbb-app/assets/icons/print-registry.svg';
import TYMRow from './TYMRow/TYMRow';
import TYMFilters from '../TYMFilters';
import TymEmail from './EmailList/TymEmail';
import styles from './TymList.css';

import tymDownloadTealiumInfo from './tymDownloadTealiumInfo';
import QuickViewModalWrapper from '../../../../../containers/QuickViewModal/QuickViewModalWrapper/QuickViewModalWrapper';
import '../../../../../assets/icons/download.svg';
import {
  THANK_YOU_LIST_LBL,
  DOWNLOAD_TYM_LBL,
  PRINT_TYL_LBL,
  GIFT_TRACKER_LBL,
  GIFT_TRACKER_IMG,
} from '../../constants';

class TymList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      filterState: null,
      tymList: this.props.tymListItems,
    };
    this.handleTYLDownloadClick = this.handleTYLDownloadClick.bind(this);
    this.handleTYMPrintClick = this.handleTYMPrintClick.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tymListItems !== this.props.tymListItems)
      this.setState({ tymList: nextProps.tymListItems });
  }

  componentDidUpdate() {
    const query = parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    anchorToItem({ skuAdded: pathOr('', 'skuAdded', query) });
  }

  handleTYLDownloadClick() {
    const tealiumConstants = tymDownloadTealiumInfo();
    const TEALIM_PAGE_INFO = {
      page_type: 'Registry',
      page_name: 'download',
    };
    this.props.fireTealiumAction(
      'download',
      tealiumConstants,
      TEALIM_PAGE_INFO
    );
  }

  handleTYMPrintClick() {
    setTimeoutCustom(() => {
      window.print();
    });
  }

  handleCallback(data) {
    const filteredList = this.state.tymList.map(item => {
      if (item.skuId === 69934769 && item.referenceId !== null) {
        if (item.referenceId === data.referenceId) {
          return {
            ...item,
            giftReceived: data.giftReceived,
            thankYouSent: data.thankYouSent,
            wasReturned: data.wasReturned,
          };
        }
      }
      if (item.rowId === data.rowID) {
        return {
          ...item,
          giftReceived: data.giftReceived,
          thankYouSent: data.thankYouSent,
          wasReturned: data.wasReturned,
        };
      }
      return item;
    });
    this.setState({ tymList: filteredList });
  }

  render() {
    const { filterState, tymList } = this.state;
    const tymListItems = tymList.filter(item =>
      filterState ? item[filterState] : item
    );
    const isMobileCheck = this.props.isMobile.isMobileScreen;
    const downloadUrl = `${getApiEndPointsFromStore(
      'downloadTYMList'
    )}?registryId=${this.props.registryId}`;
    const {
      globalSwitchConfig,
      formWrapperData,
      emailId,
      registryData,
      isNewDashboard,
    } = this.props;
    const tealiumData = {
      registryData: {
        favouriteCategoryIdList: pathOr(
          [],
          'favouriteCategoryIdList',
          registryData
        ),
        favouriteCategoryNameList: pathOr(
          [],
          'favouriteCategoryNameList',
          registryData
        ),
        registrySummaryVO: pathOr(
          '',
          'registryResVO.registrySummaryVO',
          registryData
        ),
      },
    };
    const renderTYMFilters = () => (
      <TYMFilters
        {...this.props}
        switchConfig={this.props.registrySwitchConfig}
      />
    );
    const renderForEmptyFilter = () => (
      <div className={classnames('center', styles.noResultWrapper)}>
        <Img
          className={styles.gifttrackerImg}
          src={GIFT_TRACKER_IMG}
          width="81px"
          height="81px"
        />
        <Heading className={styles.noResultHead} level={1} tabindex="0">
          {'no results found'}
        </Heading>
        <p className={styles.descriptionFont}>
          {'Please try a new search or change your filters.'}
        </p>
      </div>
    );
    return (
      <React.Fragment>
        <Cell className={classnames(styles.listsWrapper)}>
          <div className="grid-container pt3">
            <div
              className={classnames(
                'grid-x',
                !(isNewDashboard && isMobileCheck) && styles.headingUnderline
              )}
            >
              {!isMobileCheck ? (
                <Heading
                  level={3}
                  styleVariation={!isNewDashboard && 'h3-sans'}
                  className={classnames(
                    isNewDashboard ? styles.giftTrackerText : styles.heading,
                    'mr-auto'
                  )}
                >
                  {isNewDashboard ? GIFT_TRACKER_LBL : THANK_YOU_LIST_LBL}
                </Heading>
              ) : null}
              <ul
                className={classnames(
                  'mb3 sm-mb2 hideOnPrint TymList grid-x',
                  isNewDashboard && 'hide'
                )}
              >
                {!isMobileCheck ? (
                  <HideOnTbs>
                    <li className={classnames('pl3')}>
                      <PrimaryLink
                        href={downloadUrl}
                        name="hideDetail"
                        type="bold"
                        iconProps={{
                          type: 'download',
                          width: 20,
                          height: 20,
                        }}
                        isIconAfterContent={false}
                        className={classnames(styles.downloadTYM)}
                        target="_blank"
                        onClick={this.handleTYLDownloadClick}
                      >
                        {DOWNLOAD_TYM_LBL}
                      </PrimaryLink>
                    </li>
                  </HideOnTbs>
                ) : null}
                <li className={classnames(isMobileCheck ? 'pr3' : 'pl3')}>
                  <TymEmail
                    labels={this.props.labels}
                    activeRegistryData={this.props.activeRegistryData}
                    globalSwitchConfig={globalSwitchConfig}
                    formWrapperData={formWrapperData}
                    emailId={emailId}
                  />
                </li>
                {!isMobileCheck ? (
                  <li className={classnames('pl3')}>
                    <PrimaryLink
                      href="#"
                      type="bold"
                      iconProps={{
                        type: 'print-registry',
                        width: 20,
                        height: 20,
                      }}
                      isIconAfterContent={false}
                      onClick={this.handleTYMPrintClick}
                      className={classnames(styles.downloadTYM)}
                    >
                      {PRINT_TYL_LBL}
                    </PrimaryLink>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </Cell>
        <Cell className={classnames(styles.listsWrapper)}>
          {isNewDashboard ? (
            <GridX className={isMobileCheck ? 'ml2' : 'grid-container'}>
              <ul className={styles.filterListWrapper}>
                <li>
                  <button
                    id="gt_viewAll"
                    className={classnames(
                      styles.filterBtn,
                      filterState ? styles.btnNotSelected : styles.btnSelected
                    )}
                    onClick={() => this.setState({ filterState: null })}
                  >
                    {'View All'}
                  </button>
                </li>
                <li>
                  <button
                    id="gt_received"
                    className={classnames(
                      styles.filterBtn,
                      filterState === 'giftReceived'
                        ? styles.btnSelected
                        : styles.btnNotSelected
                    )}
                    onClick={() =>
                      this.setState({ filterState: 'giftReceived' })
                    }
                  >
                    {'Received'}
                  </button>
                </li>
                <li>
                  <button
                    id="gt_thankYou"
                    className={classnames(
                      styles.filterBtn,
                      filterState === 'thankYouSent'
                        ? styles.btnSelected
                        : styles.btnNotSelected
                    )}
                    onClick={() =>
                      this.setState({ filterState: 'thankYouSent' })
                    }
                  >
                    {'Thank You'}
                  </button>
                </li>
                <li>
                  <button
                    id="gt_returned"
                    className={classnames(
                      styles.filterBtn,
                      filterState === 'wasReturned'
                        ? styles.btnSelected
                        : styles.btnNotSelected
                    )}
                    onClick={() =>
                      this.setState({ filterState: 'wasReturned' })
                    }
                  >
                    {'Returned'}
                  </button>
                </li>
                <li>
                  <div className={styles.sortWrapper}>{renderTYMFilters()}</div>
                </li>
              </ul>
            </GridX>
          ) : (
            renderTYMFilters()
          )}
        </Cell>
        <Cell className={classnames(styles.listsWrapper, 'pb3')}>
          <ul className="grid-container">
            {!isNewDashboard || tymListItems.length > 0
              ? tymListItems.map((listItem, key) => (
                  <TYMRow
                    isMobile={this.props.isMobile}
                    uniqueKey={key}
                    key={`${
                      listItem.skuId === 69934769 &&
                      listItem.referenceId !== null
                        ? listItem.referenceId
                        : listItem.rowId
                    }`}
                    listItem={listItem}
                    labels={this.props.labels}
                    tealiumData={tealiumData}
                    price={listItem.price}
                    productURL={listItem.productURL}
                    qtyRequested={listItem.purchaseQty}
                    handleCallback={this.handleCallback}
                    {...this.props}
                  />
                ))
              : renderForEmptyFilter()}
            <QuickViewModalWrapper
              variation="registryQuickView"
              registryId={this.props.registryId}
            />
          </ul>
        </Cell>
      </React.Fragment>
    );
  }
}
TymList.propTypes = {
  isMobile: PropTypes.object.isRequired,
  tymListItems: PropTypes.array,
  labels: PropTypes.object,
  registryId: PropTypes.string,
  emailId: PropTypes.string,
  activeRegistryData: PropTypes.object,
  fireTealiumAction: PropTypes.func,
  globalSwitchConfig: PropTypes.object,
  formWrapperData: PropTypes.object,
  registryData: PropTypes.object,
  location: PropTypes.object,
  registrySwitchConfig: PropTypes.object,
  isNewDashboard: PropTypes.bool,
};

export default TymList;
