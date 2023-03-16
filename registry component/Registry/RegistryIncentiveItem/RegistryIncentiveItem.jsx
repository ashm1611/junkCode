import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Button from '@bbb-app/core-ui/button';
import ImgSrcSet from '@bbb-app/core-ui/image-src-set';
import Image from '@bbb-app/core-ui/image';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import CustomHTMLTooltip from '@bbb-app/core-ui/custom-html-tooltip/CustomHTMLTooltip';
import { PAGE_NAME_REGISTRY_OWNER_HOME } from '@bbb-app/constants/route/route';
import {
  VIEW_DETAILS_LBL,
  REDEEM_CTA_LBL,
  AFTER_COMPLETION_MESSAGE_LBL,
  INCENTIVES_SHOP_NOW_LBL,
  INCENTIVES_CLAIM_OFFER_LBL,
} from '../../../../containers/Pages/Registry/RegistryIncentive/constants';
import styles from './RegistryIncentiveItem.css';
import RegistryIncentiveToolTip from './RegistryIncentiveToolTip';

export class RegistryIncentiveItem extends React.PureComponent {
  static propTypes = {
    incentiveInfo: PropTypes.array,
    pageName: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    isRecognizedUser: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      mountedState: false,
    };
    this.addModalClickHandler = this.addModalClickHandler.bind(this);
  }
  addModalClickHandler() {
    this.setState({
      mountedState: true,
    });
  }
  toggleModalState = state => {
    this.setState({ mountedState: state });
  };

  renderToolTip = () => {
    const {
      incentivePurchasedTotal,
      incentiveCompletionTotal,
    } = this.props.incentiveInfo;
    return (
      <CustomHTMLTooltip
        innerClass={styles.customTooltipIncentives}
        className={classnames(styles.showToolTip)}
      >
        {incentivePurchasedTotal >= incentiveCompletionTotal ? (
          <p className={styles.toolTip}>{AFTER_COMPLETION_MESSAGE_LBL}</p>
        ) : (
          <RegistryIncentiveToolTip {...this.props.incentiveInfo} />
        )}
      </CustomHTMLTooltip>
    );
  };

  render() {
    const {
      incentiveId,
      incentiveImageURL,
      incentiveCompletionTotal,
      incentiveRequestedTotal,
      incentivePurchasedTotal,
      incentiveHeader,
      incentiveRedeemPdfURL,
      incentiveSubHeader,
      incentiveDetailText,
      brandURL,
      incentiveRedeemPrimayURL,
    } = this.props.incentiveInfo;
    const { pageName } = this.props;

    const rootStyles = classnames({
      [styles.base]: true,
    });
    const SRC_SET = [
      {
        preset: 'content',
        width: '268',
        height: '138',
        sourceWidth: '1x',
      },
      {
        preset: 'content',
        width: '402',
        height: '207',
        sourceWidth: '1.5x',
      },
    ];
    const IMAGE_SRC = {
      preset: 'content',
      width: '268',
      height: '138',
    };

    const ownerPageTile =
      pageName === PAGE_NAME_REGISTRY_OWNER_HOME ? styles.ownerPageTile : '';

    const closeModal = () => {
      this.setState({ mountedState: false });
    };

    const calc = (qty, completionTotal) => {
      const compTotal = completionTotal || 1;
      return (Math.min(qty, compTotal) / compTotal) * 100;
    };
    const graphStatus = {
      width: `${calc(incentiveRequestedTotal, incentiveCompletionTotal)}%`,
    };
    const graphStatusBlue = {
      width: `${calc(incentivePurchasedTotal, incentiveCompletionTotal)}%`,
    };
    const activeUser = this.props.isLoggedIn || this.props.isRecognizedUser;
    const incentivePurchasedValue = `$0`;
    return (
      <Cell
        className={classnames(
          `large-3 small-12 medium-12 pr1 pl1 pt2 pb1 ${ownerPageTile}`,
          styles.incentiveTile
        )}
      >
        <div className={classnames(rootStyles)}>
          <ImgSrcSet
            alt={`Image ${incentiveId}`}
            srcSet={SRC_SET}
            imageSrc={IMAGE_SRC}
            scene7imageID={incentiveImageURL}
            lazyLoad={false}
            isScene7UrlPrefix={false}
          />
          <span className={classnames(styles.incentiveName, 'mt1')}>
            {incentiveHeader}
          </span>
          {activeUser && (
            <div
              className={classnames(styles.incentiveContainer)}
              data-locator="incentive_Container"
            >
              {incentiveCompletionTotal ? (
                <div className={classnames('center', 'relative', 'pb1')}>
                  <span className={classnames(styles.startPoint, 'align-top')}>
                    {incentivePurchasedValue}
                  </span>
                  <span
                    className={classnames(
                      styles.graphContainer,
                      'relative',
                      'align-top',
                      'mx1'
                    )}
                  >
                    {this.renderToolTip()}
                    <span className={styles.graphStatus} style={graphStatus} />
                    <span
                      className={styles.graphStatusBlue}
                      style={graphStatusBlue}
                    />
                  </span>
                  <span className={classnames(styles.startPoint, 'align-top')}>
                    ${incentiveCompletionTotal}
                  </span>
                </div>
              ) : null}
            </div>
          )}
          <Button
            theme={`secondaryStrokeBasic`}
            id="link"
            className={classnames(styles.viewDetails)}
            onClick={this.addModalClickHandler}
          >
            <span className={classnames(styles.wrapContent)}>
              {incentivePurchasedTotal >= incentiveCompletionTotal
                ? REDEEM_CTA_LBL
                : VIEW_DETAILS_LBL}
            </span>
          </Button>
          <ModalDialog
            titleText="Incentives"
            titleId="IncentivesId"
            mountedState={this.state.mountedState}
            closeIconShow
            verticallyCenter
            onModalDidClose={noop}
            onModalClose={closeModal}
            variation={'small'}
          >
            <GridX className={classnames('grid-margin-x')}>
              <Cell className={classnames('large-12')}>
                <GridX className={classnames('grid-margin-x mb2')}>
                  <Cell className={classnames('small-12 large-6')}>
                    <Image alt={'Incentive Image'} src={incentiveImageURL} />
                  </Cell>
                  <Cell className={classnames('small-12 large-6')}>
                    <Paragraph
                      className={classnames(styles.incentiveModalTitle)}
                    >
                      {incentiveHeader}
                    </Paragraph>
                  </Cell>
                </GridX>
              </Cell>
              <Cell className={classnames('large-12')}>
                <Paragraph className={classnames(styles.incentiveSubHeader)}>
                  {incentiveSubHeader}
                </Paragraph>
              </Cell>
              <Cell className={classnames('large-12 mb2')}>
                <Paragraph className={classnames(styles.incentiveText)}>
                  {incentiveDetailText}
                </Paragraph>
              </Cell>
              <Cell className={classnames('large-12 mb2')}>
                <GridX className={classnames('grid-margin-x mb2')}>
                  {incentiveRedeemPdfURL || incentiveRedeemPrimayURL ? (
                    <Cell className={classnames('small-12 large-6 mt2')}>
                      <Button
                        theme="primary"
                        data-locator="redeemBtn"
                        className={styles.incentiveCTA}
                        href={incentiveRedeemPdfURL || incentiveRedeemPrimayURL}
                        target="_blank"
                      >
                        <div>{INCENTIVES_CLAIM_OFFER_LBL}</div>
                      </Button>
                    </Cell>
                  ) : null}
                  {brandURL ? (
                    <Cell className={classnames('small-12 large-6 mt2')}>
                      <Button
                        theme="secondary"
                        data-locator="shopBtn"
                        className={styles.incentiveCTA}
                        href={brandURL}
                      >
                        <div>{INCENTIVES_SHOP_NOW_LBL}</div>
                      </Button>
                    </Cell>
                  ) : null}
                </GridX>
              </Cell>
            </GridX>
          </ModalDialog>
        </div>
      </Cell>
    );
  }
}

export default RegistryIncentiveItem;
