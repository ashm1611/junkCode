import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { getCookie } from '@bbb-app/utils/universalCookie';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import FormInput from '@bbb-app/forms/components/FormInput';
import styles from './RegistryDetailModalLayout.css';
import layout from './layout.css';
import AddToCart from '../../../../../containers/AddToCart/AddToCart.async';
import GroupGiftingTooltip from '../../OwnerProductGridTile/GroupGiftingTooltip';
import ContributionProgressBar from '../../GroupGifting/ContributionProgressBar/ContributionProgressBar';
import {
  getStoreAvailabilityMessage,
  getProductPrice,
  getProductTitle,
  getQtyDropDown,
  getRequestPurchased,
  getProductAttributes,
  getUPC,
  renderAddToCartBtn,
  renderPDPLinkText,
  getPurchase,
} from '../RegistryDetailModalUtil/RegistryDetailModalUtil';
import {
  PROGRESS_BAR_TITLE_LBL,
  TOOL_TIP_BODY_LBL,
  TOOL_TIP_HEADING_LBL,
  CONTRIBUTE_CTA_LBL,
  CONTRIBUTE_INPUT_HELP_TEXT_LBL,
  GREATER_THAN_FUND_ERROR_LBL,
  LESS_THAN_FUND_ERROR_LBL,
  LESS_THAN_THRESHOLD_FUND_ERROR_LBL,
  DIAPER_FUND_LBL,
  TOOL_TIP_DIAPER_HEADING_LBL,
  TOOL_TIP_DIAPER_BODY_LBL,
  PURCHASED_LABEL_MODAL_MSG_LBL,
} from './constants';

const propTypes = {
  Image: PropTypes.object.isRequired,
  isBelowLineItem: PropTypes.object.bool,
  RatingsandReviews: PropTypes.object.isRequired,
  view: PropTypes.string,
  ggEligibleItem: PropTypes.object,
  registryProductInfo: PropTypes.object,
  isBopisFeatureEnable: PropTypes.bool,
  storeDetails: PropTypes.object,
  skuInStore: PropTypes.bool,
  styleVariation: PropTypes.string,
  selectedCheckboxFilter: PropTypes.string,
  ggItemContributionNeeded: PropTypes.any,
  config: PropTypes.object,
  amountFulfilled: PropTypes.any,
  quickViewSwatchDetails: PropTypes.any,
  storeId: PropTypes.string,
  ltlShipMethod: PropTypes.string,
  registryId: PropTypes.string,
  quantity: PropTypes.string,
  refNum: PropTypes.string,
  productId: PropTypes.string,
  modalNeedToShow: PropTypes.bool,
  toggleModal: PropTypes.func,
  isInternationalUser: PropTypes.bool,
  hideParent: PropTypes.func,
  siteId: PropTypes.string,
  isLtlItem: PropTypes.bool,
};

/**
 * Renders Product Detail
 */
class RegistryDetailModalLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.contributeInputHelpText = CONTRIBUTE_INPUT_HELP_TEXT_LBL;
    this.itemType = pathOr(null, 'itemType', props);
    this.isDiaperFundSku = this.itemType === 'DPF';
    this.state = {
      qty: 1,
      isInputUpdate: false,
      inputFund: '',
      isButtonDisable: true,
    };
    this.submitContibutionfund = this.submitContibutionfund.bind(this);
    this.renderAddToCart = this.renderAddToCart.bind(this);
    this.isGroupGiftEligible = this.isGGItemEligible();
    this.hideParentModal = '';
    this.hideParent = this.hideParent.bind(this);
    this.groupGiftItemStatus = this.groupGiftItemStatus.bind(this);
    this.newlyCreatedCart = false;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    ) {
      return true;
    }
    return false;
  }
  isGGItemEligible = () => {
    const {
      ggItemContributionNeeded,
      amountFulfilled,
      ggEligibleItem,
      isInternationalUser,
    } = this.props;
    return (
      ggEligibleItem &&
      (ggItemContributionNeeded !== 0 || amountFulfilled !== 0) &&
      !isInternationalUser
    );
  };

  hideParent() {
    this.hideParentModal = 'display-none';
  }

  // will check for if it is in defined range
  isFundRangeError = inputfund => {
    const { amountFulfilled, ggItemContributionNeeded, config } = this.props;
    const fundRangeGG =
      config.pageConfig.RegistryGroupGifting.GGContiFundThreshold;
    const ggFundContriThreshold = parseInt(fundRangeGG, 10);
    let requiredContribution = ggItemContributionNeeded;
    if (Number(amountFulfilled) === 0 || Number(amountFulfilled))
      requiredContribution = (
        ggItemContributionNeeded - amountFulfilled
      ).toFixed(2);

    if (inputfund > requiredContribution) {
      return LabelsUtil.replacePlaceholderValues(GREATER_THAN_FUND_ERROR_LBL, [
        requiredContribution,
      ]);
    }
    /* istanbul ignore else  */
    if (requiredContribution < ggFundContriThreshold) {
      /* istanbul ignore else  */
      if (inputfund < requiredContribution) {
        return LabelsUtil.replacePlaceholderValues(LESS_THAN_FUND_ERROR_LBL, [
          requiredContribution,
        ]);
      }
    }
    if (
      requiredContribution > ggFundContriThreshold &&
      inputfund < ggFundContriThreshold
    ) {
      return LabelsUtil.replacePlaceholderValues(
        LESS_THAN_THRESHOLD_FUND_ERROR_LBL,
        [ggFundContriThreshold]
      );
    }

    return false;
  };
  submitContibutionfund = e => {
    e.preventDefault();
  };

  handleBlur(e) {
    const value = parseFloat(
      pathOr('', 'target.value', e).replace('$ ', ''),
      10
    );
    if (!value) {
      this.setState({
        groupGiftFundError: undefined,
        isButtonDisable: true,
      });
    } else {
      this.setState({
        groupGiftFundError: undefined,
        isButtonDisable: undefined,
      });
    }
    const fundError = this.isFundRangeError(value);
    if (fundError) {
      this.setState({
        groupGiftFundError: fundError,
        isButtonDisable: true,
      });
    }
  }
  parseValue = value => {
    const replacedValue = value.replace('$ ', '');
    if (replacedValue[replacedValue.length - 1] === '.') {
      return replacedValue;
    }

    const fundValueArray = replacedValue.split('.');
    let updateValue = this.state.inputFund;
    /* istanbul ignore else  */
    if (fundValueArray.length > 0) {
      const splittedValue1 = fundValueArray[0].replace(/\D/g, '');
      updateValue = splittedValue1;
      if (fundValueArray.length === 2) {
        const decimalValue = fundValueArray[1].replace(/\D/g, '').slice(0, 2);
        updateValue = `${splittedValue1}.${decimalValue}`;
      }
    }
    return updateValue;
  };
  handleChange(e) {
    const value = pathOr('', 'target.value', e);
    const updateValue = this.parseValue(value);

    const dotCount =
      updateValue.includes('.') && updateValue.split('.').length - 1;
    /* istanbul ignore else  */
    if (!(dotCount > 1)) {
      this.setState({
        inputFund: updateValue ? `$ ${updateValue}` : undefined,
        isInputUpdate: !!updateValue,
        isButtonDisable: !updateValue,
        groupGiftFundError: undefined,
      });
    }
  }

  groupGiftItemStatus(atcData) {
    const data = pathOr({}, 'store.data', atcData);
    if (data) {
      const commerceItemId = data.data.component.commerceItemId;
      const groupGiftingItem = data.data.component.order.commerceItemVOList.reduce(
        (acc, red) => {
          if (commerceItemId === red.commerceItemId) {
            return red.groupGiftingItem;
          }
          return acc;
        },
        ''
      );
      return groupGiftingItem;
    }
    return '';
  }

  renderAddToCart() {
    const {
      quickViewSwatchDetails,
      ltlShipMethod,
      registryId,
      quantity,
      refNum,
      productId,
      storeId,
      ggEligibleItem,
      siteId,
    } = this.props;
    let contributeGroupGifting = this.state.inputFund;
    if (contributeGroupGifting) {
      contributeGroupGifting = contributeGroupGifting.replace('$ ', '');
    }
    const skuIdentifier = 'GG';
    /* istanbul ignore else  */
    if (getCookie('cartCount') === '0') {
      this.newlyCreatedCart = 'true';
    }
    return (
      <AddToCart
        skuId={quickViewSwatchDetails.skuId}
        prodId={productId}
        qty={quantity}
        buttonProps={{
          attr: {
            id:
              contributeGroupGifting &&
              (siteId === 'BedBathUS' || siteId === 'BedBathCanada') &&
              'ContributeCtaTile',
            theme: !this.state.isButtonDisable ? 'primary' : 'deactivated',
            className: 'fullWidth mb1',
            'data-locator': 'contribute-addtocartbuttontile',
          },
          children: CONTRIBUTE_CTA_LBL,
          disabled: this.state.isButtonDisable,
        }}
        ltlFlag={ltlShipMethod}
        registryId={registryId}
        refnum={refNum}
        storeId={storeId}
        skuIdentifier={skuIdentifier}
        contributionAmount={contributeGroupGifting}
        modalNeedToShow={this.props.modalNeedToShow}
        hideParentModal={this.props.hideParent}
        toggleParentModal={this.props.toggleModal}
        ggEligibleItem={ggEligibleItem}
        groupGiftItemStatus={this.groupGiftItemStatus}
        {...this.props}
        onClientError={() => {
          this.props.hideParent();
        }}
        onSuccess={() => {
          this.props.hideParent();
        }}
      />
    );
  }

  renderGroupGiftProgress = () => {
    const { ggItemContributionNeeded, amountFulfilled } = this.props;
    return (
      <React.Fragment>
        <div className={!this.isDiaperFundSku && styles.borderTop} />
        <div className="md-mb2 md-mt1">
          <GroupGiftingTooltip
            heading={PROGRESS_BAR_TITLE_LBL}
            title={TOOL_TIP_HEADING_LBL}
            description={TOOL_TIP_BODY_LBL}
            diaperFundLabel={DIAPER_FUND_LBL}
            isDiaperFundSku={this.isDiaperFundSku}
            diapertitle={TOOL_TIP_DIAPER_HEADING_LBL}
            diaperdescription={TOOL_TIP_DIAPER_BODY_LBL}
            toolTipAlign={`outerTooltipGG`}
            amountFulfilled={amountFulfilled}
            showFulfilledAmount
            giftGiver
            iconProps={this.isMobileScreen && { width: '12px', height: '12px' }}
            ggItemContributionNeeded={ggItemContributionNeeded}
            commonStyle={styles.commonAmount}
            toolTipOnMob={styles.toolTipAlign}
            fromModal={this.props.siteId === 'BuyBuyBaby'}
          />
          <ContributionProgressBar
            amountFulfilled={amountFulfilled}
            ggItemContributionNeeded={ggItemContributionNeeded}
            commonStyle={styles.commonAmount}
            RegistryDetails="RegistryDetailsModal"
          />
          <div className={this.isDiaperFundSku ? 'pb1' : styles.borderBottom} />
        </div>
      </React.Fragment>
    );
  };

  render() {
    const {
      Image,
      RatingsandReviews,
      view,
      registryProductInfo,
      selectedCheckboxFilter,
      isLtlItem,
    } = this.props;
    let mobileColumn = '';
    /* istanbul ignore else  */
    if (screen.width <= 768) {
      mobileColumn = `${screen.width - 30}px`;
    }

    const sKUDetailVO = pathOr(
      {},
      'registryProductInfo.sKUDetailVO',
      this.props
    );

    const isPrimaryRequired = () => {
      return (
        !this.props.isBopisFeatureEnable ||
        selectedCheckboxFilter === 'in-stock-online' ||
        this.props.skuInStore !== '1'
      );
    };

    const isPurchased = pathOr(false, 'purchased', registryProductInfo);
    const isFunded = pathOr(false, 'ggRegItemStatus', registryProductInfo);
    return (
      <div className={classnames(styles.productDetails, layout[`${view}`])}>
        <div className={layout.imageWrapper}>
          <div>
            {getProductPrice({
              ...registryProductInfo,
            })}
            {!this.isDiaperFundSku && RatingsandReviews}
            {sKUDetailVO.displayName &&
              getProductTitle(sKUDetailVO.displayName)}
            {sKUDetailVO.upc && getUPC(sKUDetailVO.upc)}
          </div>
          {Image}
        </div>
        <div className={layout.detailWrapper}>
          {(isPurchased || isFunded) &&
            getPurchase(PURCHASED_LABEL_MODAL_MSG_LBL)}
          <div className={layout.productDetailWrapper}>
            {getRequestPurchased(
              registryProductInfo.qtyRequested,
              registryProductInfo.qtyPurchased
            )}
            {!this.isDiaperFundSku &&
              getProductAttributes({
                ...registryProductInfo,
              })}
            {this.props.isBopisFeatureEnable &&
              this.props.skuInStore === '1' &&
              getStoreAvailabilityMessage({
                storeDetails: this.props.storeDetails,
                pickupFilterSelected: registryProductInfo.pickupFilterSelected,
                ggEligibleItem: this.props.ggEligibleItem,
                skuInStore: this.props.skuInStore,
                styleVariation: this.props.styleVariation,
              })}
            {!this.isDiaperFundSku &&
              getQtyDropDown(value => {
                this.setState({ qty: value });
              })}
            {(this.props.ggEligibleItem ||
              (this.props.isBelowLineItem === 'false' &&
                (!selectedCheckboxFilter ||
                  selectedCheckboxFilter === 'in-stock-online'))) && (
              <div className={styles.addToCart}>
                {renderAddToCartBtn({
                  ...this.props,
                  quantity: this.state.qty,
                  theme:
                    !isPurchased &&
                    (this.isGroupGiftEligible
                      ? 'secondary'
                      : isPrimaryRequired() && 'primary'),
                  isItemPurchased: isPurchased,
                  isItemFunded: isFunded,
                })}
              </div>
            )}
            {this.props.isBopisFeatureEnable &&
              this.props.skuInStore === '1' &&
              (!selectedCheckboxFilter ||
                selectedCheckboxFilter === 'store-pickup') &&
              !this.props.ggEligibleItem && (
                <div className={styles.addToCart}>
                  {renderAddToCartBtn({
                    ...this.props,
                    quantity: this.state.qty,
                    pickupFilterSelected: true,
                    ggEligibleItem: this.props.ggEligibleItem,
                    theme: !isPurchased && 'primary',
                    isItemPurchased: isPurchased,
                    isItemFunded: isFunded,
                  })}
                </div>
              )}
            <div className={styles.commonTop} styles={{ width: mobileColumn }}>
              {this.isGroupGiftEligible && this.renderGroupGiftProgress()}
              {this.isGroupGiftEligible && (
                <div className={screen.width <= 768 && styles.justifyEnd}>
                  <Cell
                    className={classnames(
                      'small-12 large-6 mb1',
                      styles.groupGiftFund,
                      screen.width <= 768 && styles.commonWidth
                    )}
                  >
                    <FormInput
                      id="groupGiftFundRLV"
                      name="groupGiftFund"
                      groupGiftFundError={this.state.groupGiftFundError}
                      className={
                        this.state.groupGiftFundError
                          ? ''
                          : styles.inputDefautStyle
                      }
                      validation={'required'}
                      identifier="RegistrygroupGiftFund"
                      isRequired
                      data-locator="groupGiftTile"
                      onClick={this.submitContibutionfund}
                      value={this.state.inputFund}
                      placeholder={this.contributeInputHelpText || '$100'}
                      onChange={e => this.handleChange(e)}
                      onBlur={e => this.handleBlur(e)}
                      disabled={isPurchased}
                    />
                  </Cell>
                  <Cell
                    className={classnames(
                      'small-12 large-6',
                      screen.width <= 768 && styles.commonWidth
                    )}
                  >
                    {this.renderAddToCart()}
                  </Cell>
                </div>
              )}
            </div>
          </div>
          {!this.isDiaperFundSku &&
            !isLtlItem &&
            renderPDPLinkText(registryProductInfo.pdpUrl)}
        </div>
      </div>
    );
  }
}

RegistryDetailModalLayout.propTypes = propTypes;

export default RegistryDetailModalLayout;
