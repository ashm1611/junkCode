import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEqual } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Icon from '@bbb-app/core-ui/icon';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import registryTinderContext from '@bbb-app/context/registry-tinder-context/registryTinderContext';
import CustomSelect from '@bbb-app/custom-select/CustomSelect';
import '@bbb-app/assets/icons/check.svg';
import '@bbb-app/assets/icons/notificationError.svg';
import DraggableCard from './FlipFlopDrag';
import styles from './FlipFlopStyle.css';
import '../../../../../assets/icons/flipFlopATRError.svg';
import '../../../../../assets/icons/smartphone.svg';
import {
  ARIA_LABEL_ERROR_ATR,
  FLIP_FLOP_ALL_CATEGORIES,
  HIT_OR_MISS_PAGE,
  REGISTRY_HIT_OR_MISS_PAGE,
  PRODUCT_DETAILS_KEY,
  HIT_MISS_ADD_TO_REGISTRY,
} from '../../../../../containers/Pages/Registry/RegistryOwner/FlipFlop/constants';
import FlipFlopModal from './FlipFlopModal';
import isMultiSku from '../../../../../utils/isMultiSku';
import { ERROR_ADD_TO_REGISTRY_FLIPFLOP_LBL } from '../../constants';
// eslint-disable-next-line no-underscore-dangle
const registryTinderCategories = registryTinderContext._currentValue;
const propTypes = {
  items: PropTypes.array,
  labels: PropTypes.object,
  activeRegistryId: PropTypes.string,
  activeRegistryName: PropTypes.string,
  addToRegistry: PropTypes.func,
  addToRegistryState: PropTypes.object,
  triggerNextAPICall: PropTypes.func,
  thresholdNextAPITrigger: PropTypes.number,
  resetFlipFlopData: PropTypes.func,
  isFetchingItemsList: PropTypes.bool,
  dynamicContent: PropTypes.any,
  isFlipFlopEnabled: PropTypes.object,
  selectedCategory: PropTypes.object,
  onRightSwipeMSWP: PropTypes.func,
  isLandscapeMode: PropTypes.bool,
  onModalClose: PropTypes.func,
  setIsItemsCountLow: PropTypes.func,
  fireTealiumAction: PropTypes.func,
  customerID: PropTypes.string,
  isGroupByFlipFlopActive: PropTypes.string,
};

export class Tinderable extends React.PureComponent {
  constructor(props) {
    super(props);
    let flipFlopTutorialCookie;
    if (props.customerID) {
      const flipFlopTutorialCookieValue =
        localStorage[`flipFlopTutorialCookie_${props.customerID}`];
      flipFlopTutorialCookie = localStorage[
        `flipFlopTutorialCookie_${props.customerID}`
      ] = !flipFlopTutorialCookieValue;
    }

    this.state = {
      cards: this.props.items && new Array(...this.props.items),
      cardAtrData: null,
      itemsCount: this.props.items.length,
      thresholdNextAPITrigger: this.props.thresholdNextAPITrigger,
      showMSWPModal: false,
      previousUrl: '',
      mountedState: false,
      displayBanner: flipFlopTutorialCookie,
      itemsViewedDuringCall: 0,
      selectedTinderCategory: this.props.selectedCategory,
      showMswpbySiteSpect: false,
      mswpCardAtttrData: null,
    };
    this.removeCard = this.removeCard.bind(this);
    this.preparedCard = this.preparedCard.bind(this);
    this.toggleMSWPModalState = this.toggleMSWPModalState.bind(this);
    this.handleBannerClose = this.handleBannerClose.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.stateSetForMSP = this.stateSetForMSP.bind(this);

    const labels = this.props.labels;
    let id = '';
    labels.referredContent.forEach(ele => {
      if (ele.key === 'tinderLandscapeModeMessage') {
        id = ele.id;
      }
    });
    this.landscapeModeContentId = id;
  }

  componentWillReceiveProps(newProps) {
    const { error } = this.props.addToRegistryState;
    const mswpInError = pathOr(null, 'mswpProductDetails.error', this.props);
    const mswpSKUInError = pathOr(
      null,
      'mswpProductDetails.skuError',
      this.props
    );
    this.setMountedState(newProps, error, mswpInError, mswpSKUInError);
    const isItemsListUpdated = isEqual(this.props.items[0], newProps.items[0]);
    if (isItemsListUpdated === false) {
      newProps.items.splice(0, this.state.itemsViewedDuringCall);
      this.setState({
        cards: newProps.items,
        itemsCount: newProps.items.length,
      });
    } else if (newProps.isItemsCountLow === true) {
      this.setState({
        cards: newProps.items,
        itemsCount: newProps.items.length,
      });
      this.props.setIsItemsCountLow(false);
    }
    if (newProps.selectedCategory !== this.props.selectedCategory) {
      this.setState({
        selectedTinderCategory: newProps.selectedCategory,
      });
    }
  }

  componentWillUnmount() {
    const viewedItemsCount = this.props.items.length - this.state.itemsCount;
    this.props.resetFlipFlopData(viewedItemsCount);
  }

  setMountedState(newProps, inError, mswpInError, mswpSKUInError) {
    const { addToRegistryState } = newProps;
    const mswpError = pathOr(null, 'mswpProductDetails.error', newProps);
    const mswpSKUError = pathOr(null, 'mswpProductDetails.skuError', newProps);
    const isMswpProductError = this.checkMswpProductDetailError({
      mswpError,
      mswpInError,
      mswpSKUError,
      mswpSKUInError,
    });
    const { error } = addToRegistryState;
    if ((error && error !== inError) || isMswpProductError) {
      this.renderATRErrorMessage();
    }
  }
  getImage() {
    const content = this.props.dynamicContent.content;
    const labels = this.props.labels;
    let id = '';
    labels.referredContent.forEach(ele => {
      if (ele.key === 'flipFlopBanner') {
        id = ele.id;
      }
    });
    return content && content[id] && content[id].body;
  }

  getLandscapeMessage() {
    const content = this.props.dynamicContent.content;
    return (
      content[this.landscapeModeContentId] &&
      content[this.landscapeModeContentId].body
    );
  }

  checkMswpProductDetailError(productErrorStates) {
    let isMswpProductError = false;
    const {
      mswpError,
      mswpInError,
      mswpSKUError,
      mswpSKUInError,
    } = productErrorStates;
    if (
      (mswpError && mswpError !== mswpInError) ||
      (mswpSKUError && mswpSKUError !== mswpSKUInError)
    ) {
      isMswpProductError = true;
      this.props.onModalClose();
    }
    return isMswpProductError;
  }

  toggleMSWPModalState = (previousUrl = '') => {
    this.setState({
      showMSWPModal: !this.state.showMSWPModal,
      previousUrl,
      showMswpbySiteSpect: true,
    });
  };

  stateSetForMSP(cardProps) {
    this.setState({ cardAtrData: cardProps.atrData });
    this.props.onRightSwipeMSWP(
      cardProps.atrData.prodId,
      cardProps.prodVaiation,
      this.state.previousUrl,
      true
    );
  }

  toggleErrorModalState = () => {
    this.setState({ mountedState: false });
  };

  handleBannerClose() {
    this.setState({
      displayBanner: false,
    });
  }

  removeCard(side, cardProps) {
    this.setState({
      cards: this.state.cards.splice(1),
      itemsCount: +this.state.itemsCount - 1,
    });
    if (this.props.isFetchingItemsList === true) {
      this.setState({
        itemsViewedDuringCall: +this.state.itemsViewedDuringCall + 1,
      });
    } else if (this.state.itemsViewedDuringCall !== 0) {
      this.setState({ itemsViewedDuringCall: 0 });
    }
    if (
      side === 'right' &&
      isMultiSku(cardProps.rollupTypeCode, cardProps.collectionFlag)
    ) {
      this.toggleMSWPModalState(cardProps.url);
      this.stateSetForMSP(cardProps);
      return;
    }
    if (side === 'right') {
      this.setState({
        cardAtrData: cardProps.atrData,
        showMswpbySiteSpect: false,
        showMSWPModal: false,
      });
      this.props.addToRegistry(cardProps.atrData);
      this.props.fireTealiumAction(
        '',
        {
          gift_wrap_selected: '',
          ideaboard_image_clicked: '',
          is_ltl_item: '',
          page_name: PRODUCT_DETAILS_KEY,
          page_type: HIT_OR_MISS_PAGE,
          pagename_breadcrumb: REGISTRY_HIT_OR_MISS_PAGE,
          product_category: [this.state.selectedTinderCategory],
          product_collection_flag: '',
          product_has_personalization: '',
          product_pagetype: HIT_OR_MISS_PAGE,
          product_price: [cardProps.atrData.price],
          products_per_page: '',
          registry_id: cardProps.atrData.activeRegistryId,
          registry_type: cardProps.atrData.activeRegistryName,
          subnavigation_path: HIT_OR_MISS_PAGE,
          brand_name: pathOr('n/a', 'atrData.brand_name', cardProps),
          product_sub_sub_category: [this.state.selectedTinderCategory],
          product_subcategory: [this.state.selectedTinderCategory],
          product_quantity: [pathOr('', 'atrData.qty', cardProps)],
          product_sku_id: [pathOr('', 'atrData.skuId', cardProps)],
          product_id: [pathOr('', 'atrData.prodId', cardProps)],
          product_image_name: [],
          product_image_url: [pathOr('', 'scene7imageID', cardProps)],
          call_to_actiontype: HIT_MISS_ADD_TO_REGISTRY,
          registry_add_location: HIT_OR_MISS_PAGE,
          tinder_product_card: HIT_OR_MISS_PAGE,
        },
        ''
      );
      if (
        this.state.itemsCount >= 0 &&
        this.state.itemsCount <= this.state.thresholdNextAPITrigger &&
        this.props.isFetchingItemsList === false
      ) {
        this.props.triggerNextAPICall(
          this.state.thresholdNextAPITrigger,
          this.state.selectedTinderCategory
        );
      }
    } else if (side === 'left') {
      this.props.fireTealiumAction(
        '',
        {
          appt_scheduler_entry: 'FlipFlop swiped left',
          call_to_actiontype: 'FlipFlop swiped left',
          page_name: PRODUCT_DETAILS_KEY,
          page_type: 'Registry',
          channel: 'Registry',
          pagename_breadcrumb: 'FlipFlop swiped left',
          prodID: cardProps.atrData.prodId,
          quantity: cardProps.atrData.qty,
          revenue: cardProps.atrData.price,
          SKU: cardProps.atrData.skuId,
          reg_type: cardProps.atrData.activeRegistryName,
          registryID: cardProps.atrData.activeRegistryId,
          add_to_registry_location: 'hit or miss',
          tinder_product_card: HIT_OR_MISS_PAGE,
        },
        ''
      );

      if (
        this.state.itemsCount >= 0 &&
        this.state.itemsCount <= this.state.thresholdNextAPITrigger &&
        this.props.isFetchingItemsList === false
      ) {
        this.props.triggerNextAPICall(
          this.state.thresholdNextAPITrigger,
          this.state.selectedTinderCategory
        );
      }
    }
  }

  preparedCard() {
    const propsObj = [];
    const availbleCards = this.state.cards.slice(0, 5).reverse();
    const isGroupByFlipFlopEnable = this.props.isGroupByFlipFlopActive;
    availbleCards.forEach((c, index) => {
      const props = {
        cardId: c.id,
        index,
        onOutScreenLeft: this.removeCard,
        onOutScreenRight: this.removeCard,
        title: c.DISPLAY_NAME,
        price: isGroupByFlipFlopEnable
          ? {
              highPriceValueMX: c.price.highPriceValueMX,
              low: c.price.low,
              lowPriceValueMX: c.price.lowPriceValueMX,
              lowValue: c.price.lowValue,
              normal: c.price.normal,
              normalValue: c.price.normalValue,
              priceLabelCodeMX: c.price.priceLabelCodeMX,
              priceRangeDescription: c.price.priceRangeDescription,
              pricingLabelCode: c.price.pricingLabelCode,
              wasLowPriceMX: c.price.wasLowPriceMX,
              priceLabels: { was: c.price.pricingLabelCode },
            }
          : {
              highPriceValueMX: c.HIGH_PRICE_MX,
              low: c.SALE_PRICE_RANGE_STRING,
              lowPriceValueMX: c.LOW_PRICE_MX,
              lowValue: c.LOW_PRICE,
              normal: c.PRICE_RANGE_STRING,
              normalValue: c.HIGH_PRICE,
              priceLabelCodeMX: c.MX_PRICING_LABEL_CODE,
              priceRangeDescription: c.PRICE_RANGE_DESCRIP,
              pricingLabelCode: c.PRICING_LABEL_CODE,
              wasLowPriceMX: c.WAS_LOW_PRICE_MX,
              priceLabels: { was: c.PRICING_LABEL_CODE },
            },
        prodVaiation: c.PRODUCT_VARIATION,
        rating: c.RATINGS,
        reviews: c.REVIEWS,
        url: isGroupByFlipFlopEnable ? c.url : c.SEO_URL,
        scene7imageID: isGroupByFlipFlopEnable ? c.scene7imageID : c.SCENE7_URL,
        labels: this.props.labels,
        previousUrl: this.state.previousUrl,
        swatchFlag: isGroupByFlipFlopEnable ? c.swatchFlag : c.SWATCH_FLAG,
        collectionFlag: c.COLLECTION_FLAG,
        rollupTypeCode: c.ROLLUP_TYPE_CODE,
        atrData: {
          isCustomizationRequired: false,
          isList: false,
          price: isGroupByFlipFlopEnable
            ? c.priceRangeString
            : c.PRICE_RANGE_STRING,
          prodId: c.PRODUCT_ID,
          qty: 1,
          skipNotifyFlag: 'false',
          skuId: c.SKU_ID && c.SKU_ID[0],
          skuName: c.DISPLAY_NAME,
          activeRegistryId: this.props.activeRegistryId,
          activeRegistryName: this.props.activeRegistryName,
          scene7imageID: c.SCENE7_URL,
          tinderATRShowLoader: false,
          // eslint-disable-next-line
          ltlFlag: isGroupByFlipFlopEnable
            ? c.LTL_FLAG
              ? 'true'
              : 'false'
            : c.LTL_FLAG && c.LTL_FLAG[0] === '1'
            ? 'true'
            : 'false',
          brand_name: isGroupByFlipFlopEnable ? c.brand : c.BRAND,
        },
      };
      propsObj.push(props);
    });
    return propsObj;
  }

  selectOption(selectedCategory) {
    this.setState({ selectedTinderCategory: selectedCategory });
    this.props.fireTealiumAction(
      '',
      {
        browse_refine_value: [],
        filter_category_name: selectedCategory,
        filter_location_type: `LISTHEADER|${selectedCategory}`,
        gift_wrap_selected: '',
        ideaboard_image_clicked: '',
        is_ltl_item: '',
        link_location_name: HIT_OR_MISS_PAGE,
        page_name: `Filter on Registry ${HIT_OR_MISS_PAGE}`,
        page_type: HIT_OR_MISS_PAGE,
        pagename_breadcrumb: REGISTRY_HIT_OR_MISS_PAGE,
        product_category: [selectedCategory],
        product_collection_flag: '',
        product_has_personalization: '',
        product_pagetype: HIT_OR_MISS_PAGE,
        product_price: [],
        products_per_page: '',
        subnavigation_path: HIT_OR_MISS_PAGE,
        product_id: [],
        registry_hitormiss_filter: 'true',
      },
      ''
    );
    /* istanbul ignore if */
    if (this.state.selectedTinderCategory !== selectedCategory) {
      this.props.triggerNextAPICall(0, selectedCategory);
    }
  }

  renderATRErrorMessage() {
    this.setState({ mountedState: true });
  }

  renderTinderCategoryDropdown() {
    const regType = pathOr(null, 'match.params.regType', this.props);
    const tinderCategoriesOptionSet = registryTinderCategories[regType].map(
      item => {
        const urlParam1 = item.url_param ? item.url_param : '';
        const urlParam2 = item.url_param2 ? item.url_param2 : 'L2_ID:*';
        const urlParam = `(${urlParam1} AND ${urlParam2})`;
        return {
          key: urlParam1 ? urlParam : FLIP_FLOP_ALL_CATEGORIES,
          label: item.category_text,
          props: {
            value: urlParam1 ? urlParam : FLIP_FLOP_ALL_CATEGORIES,
          },
        };
      }
    );
    return (
      <div className={classnames('mx1', styles.flipFlopTinderCategories)}>
        <CustomSelect
          wrapperClassName={classnames('mt2', styles.tinderCategoryDropdown)}
          optionSet={tinderCategoriesOptionSet}
          selectOption={this.selectOption}
          buttonClassName={classnames(styles.btnClass)}
          defaultValue={this.state.selectedTinderCategory}
          variationName={'selectBreadcrumbNoUnderline'}
        />
      </div>
    );
  }

  renderLanscapeMode() {
    const MessageContainer = props => <Paragraph {...props} />;
    const MessageWithDangerousHTML = dangerousHTML(MessageContainer);
    return (
      <div className="pt3">
        <Icon
          type={'smartphone'}
          className={styles.landscapeMessageIcon}
          focusable="false"
          width={64}
          height={64}
        />
        <MessageWithDangerousHTML
          className={classnames('mt4', styles.landscapeMessageContainer)}
          theme="mediumLight"
          data-locator="tinder-landscape-mode-message"
        >
          {this.getLandscapeMessage()}
        </MessageWithDangerousHTML>
      </div>
    );
  }

  renderFlipFlopPage() {
    const cards = this.preparedCard();
    const cardsLength = cards.length;
    const img = this.getImage();
    return (
      <div>
        {this.renderTinderCategoryDropdown()}
        <div id="flipFlopDragCard">
          {this.state.displayBanner ? (
            <DraggableCard
              displayBanner={this.state.displayBanner}
              closeBanner={this.handleBannerClose}
              labels={this.props.labels}
              image={img}
              fireTealiumAction={this.props.fireTealiumAction}
              selectedTinderCategory={this.state.selectedTinderCategory}
            />
          ) : (
            cards.map((data, i) => {
              let fireTealiumView = false;
              if (cardsLength === i + 1) {
                fireTealiumView = true;
              }
              const utag = {
                Audience_Segment: '',
                content_pagetype: REGISTRY_HIT_OR_MISS_PAGE,
                product_category: [this.state.selectedTinderCategory],
                favorite_store_id: '',
                navigation_path: REGISTRY_HIT_OR_MISS_PAGE,
                page_function: REGISTRY_HIT_OR_MISS_PAGE,
                page_name: REGISTRY_HIT_OR_MISS_PAGE,
                page_type: REGISTRY_HIT_OR_MISS_PAGE,
                pagename_breadcrumb: '',
                product_has_personalization: '',
                product_id: [pathOr('', 'atrData.prodId', data)],
                subnavigation_path: REGISTRY_HIT_OR_MISS_PAGE,
                product_sub_sub_category: [],
                product_subcategory: [],
                product_pagetype: REGISTRY_HIT_OR_MISS_PAGE,
                product_price: [pathOr('', 'atrData.price', data)],
                product_quantity: [pathOr('', 'atrData.qty', data)],
                product_sku_id: [pathOr('', 'atrData.skuId', data)],
                product_sku_name: [pathOr('', 'atrData.skuName', data)],
                product_name: [pathOr('', 'title', data)],
                product_image_url: [pathOr('', 'scene7imageID', data)],
                product_image_name: [],
                reg_hitmiss_prodimpression: 'true',
              };
              return (
                <React.Fragment>
                  {fireTealiumView && (
                    <TealiumHandler
                      utagData={utag}
                      identifier="cardExposure"
                      tealiumPageInfoNotAvailable
                    />
                  )}
                  <DraggableCard
                    {...data}
                    key={data.cardId}
                    showMSWPModal={this.state.showMSWPModal}
                    toggleMSWPModalState={this.toggleMSWPModalState}
                    isFlipFlopEnabled={this.props.isFlipFlopEnabled}
                    fireTealiumAction={this.props.fireTealiumAction}
                    selectedTinderCategory={this.state.selectedTinderCategory}
                  />
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    );
  }

  render() {
    const { isLandscapeMode } = this.props;
    return (
      <ErrorBoundary>
        <React.Fragment>
          <div id="flipFlopRootContainer">
            <div
              id="cards"
              className={classnames(styles.flipFlopCardsContainer)}
            >
              {isLandscapeMode
                ? this.renderLanscapeMode()
                : this.renderFlipFlopPage()}
            </div>
          </div>
          <FlipFlopModal
            toggleErrorModalState={this.toggleErrorModalState}
            imgURL={'flipFlopATRError'}
            closeIconShow
            labelToShow={ERROR_ADD_TO_REGISTRY_FLIPFLOP_LBL}
            ariaLabel={ARIA_LABEL_ERROR_ATR}
            mountedState={this.state.mountedState}
          />
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

Tinderable.propTypes = propTypes;

export default withSiteSpectTracker(Tinderable);
