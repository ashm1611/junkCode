import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { pathOr } from 'lodash/fp';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import { decodeHtmlEntities } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Icon from '@bbb-app/core-ui/icon';
import getCartQuatitySelectorOptions from '@bbb-app/utils/getCartQuantitySelectorOptions';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import Rating from '@bbb-app/rating/Rating';
import QuantitySelector from '@bbb-app/quantity-selector/QuantitySelector';
import '@bbb-app/assets/icons/checkmarkwhite.svg';
import { RATING_MAX } from '@bbb-app/constants/searchConstants';
import styles from './Recommendation.css';
import AddToRegistry from '../../../../../../../containers/AddToRegistry/AddToRegistry.async';
import '../../../../../../../assets/icons/registryConsultant.svg';
import QuickViewButton from './QuickViewButton/QuickViewButton';
import {
  NEW_FILTER_TAB,
  MAYBELATER_TAB,
  ADDED_TO_REGISTRY,
  PAGE_TYPE,
  RECOMMENDATION_SORT_RECOMMENDER,
  BUTTON,
} from '../../../constants';
import {
  ATR_SOCIAL_REC_LBL,
  COLOR_DASS_LBL,
  MAY_BE_LATER_SOCIAL_REC_LBL,
  SIZE_DASS_LBL,
} from '../../../../constants';
class RecommendationRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      classToggle: 'show',
      readMoreFlag: false,
      readText: this.props.showMore,
      selectedQuantity: '',
      showSeeAllLink: true,
      closeLtlModalMountedState: false,
      displayNotification: false,
      availableRecommendations: this.props.isRowCollection
        ? this.props.recommnedationItem.length
        : 1,
    };
    this.changeQuantity = this.changeQuantity.bind(this);
    this.mayBeLaterButton = this.mayBeLaterButton.bind(this);
    this.addToRegistryButton = this.addToRegistryButton.bind(this);
  }
  getDangerouslyLoadedImg(title, url) {
    const srcInfo = {
      preset: 'imagePLP',
      width: '256',
      height: '256',
    };
    const src = `${url}?$${srcInfo.preset}$&wid=${srcInfo.width}&hei=${srcInfo.height}`;
    const imageMarkUp = `<img
    alt=${JSON.stringify(decodeHtmlEntities(title))}
    src=${JSON.stringify(src)}
  />`;
    const DangerousText = dangerousHTML(DangerousText);
    return (
      <DangerousText data-locator="registry_recommenderProductImage">
        {imageMarkUp}
      </DangerousText>
    );
  }
  changeQuantity(updatedQuantity, index) {
    const selectedQuantity = {
      ...this.state.selectedQuantity,
      [index]: updatedQuantity === '0' ? '1' : updatedQuantity,
    };
    this.setState({ selectedQuantity });
  }
  addToRegistryButton(name, skuName, skuId) {
    const availableRecommendations = this.state.availableRecommendations - 1;

    this.setState({
      [name]: true,
      addedSkuName: skuName,
      addedSkuId: skuId,
      showSeeAllLink: true,
      closeLtlModalMountedState: true,
      displayNotification: true,
      availableRecommendations,
    });
  }
  mayBeLaterButton(evt, index) {
    let recommendationItem = this.props.recommnedationItem;
    if (this.props.isRowCollection) {
      recommendationItem = this.props.recommnedationItem[index];
    }

    const nameBtn = evt.target.name;
    const {
      formattedPrice,
      repositoryId,
      ltlShipMethod,
      recommendedQuantity,
      sKUDetailVO: {
        skuId,
        parentProdId,
        ltlItem,
        displayName,
        customizableRequired,
        personalizationType,
      },
    } = recommendationItem;
    const { registryId } = this.props;
    const qty = this.state.selectedQuantity[index]
      ? Number(this.state.selectedQuantity[index])
      : Number(recommendedQuantity);
    const availableRecommendations = this.state.availableRecommendations - 1;

    this.setState({
      addedSkuName: displayName,
      addedSkuId: skuId,
      showSeeAllLink: false,
      [nameBtn]: true,
      displayNotification: true,
      availableRecommendations,
    });
    this.props.mayBeLaterBtnCall({
      skuId,
      skuName: displayName,
      prodId: parentProdId,
      ltlFlag: ltlItem,
      isCustomizationRequired: customizableRequired,
      personalizationType,
      registryId,
      repositoryId,
      ltlShipMethod,
      price: formattedPrice,
      qty,
      registryName: this.props.registryEventType,
      isFromPendingTab: true,
      isDeclined: true,
      skipNotifyFlag: 'true',
    });
  }
  readMore = () => {
    if (!this.state.readMoreFlag) {
      this.setState({
        readText: this.props.showLess,
        readMoreFlag: true,
      });
    } else {
      this.setState({
        readText: this.props.showMore,
        readMoreFlag: false,
      });
    }
  };

  buttonToggelView(index) {
    return (
      this.props.tabId !== ADDED_TO_REGISTRY &&
      this.props.tabId !== MAYBELATER_TAB && (
        <div>
          <Button
            theme="secondaryTransparent"
            variation="fullWidth"
            appearance="rounded"
            onClick={e => this.mayBeLaterButton(e, index)}
            name={`item_${index}`}
          >
            {MAY_BE_LATER_SOCIAL_REC_LBL}
          </Button>
        </div>
      )
    );
  }

  checkButtonTheme() {
    return isInternationalUser() ? 'deactivated' : 'primary';
  }

  showNotification() {
    const TitleContainer = props => (
      <span className={classnames(styles.moveItemHeading)} {...props} />
    );
    const TitleWithDangerousHTML = dangerousHTML(TitleContainer);

    return (
      <li className={classnames('listContainer')}>
        <GridX className={classnames('mb3', styles.container)}>
          <Cell className={classnames('large-10')}>
            <div className={classnames('p3', styles.moveItem)}>
              <TitleWithDangerousHTML>
                {`${this.state.addedSkuName} `}
              </TitleWithDangerousHTML>
              {this.renderSeeAllItems()}
            </div>
          </Cell>
        </GridX>
      </li>
    );
  }

  moveToNewBtn = (recommendationItem, index) => {
    const btnTheme = this.checkButtonTheme();
    const { registryId, uniqueIndex, moveToNewLabel } = this.props;
    const {
      skuDisplayName,
      formattedPrice,
      imageVO: { basicImage },
      repositoryId,
      ltlShipMethod,
      sKUDetailVO: {
        skuId,
        parentProdId,
        ltlItem,
        displayName,
        customizableRequired,
        personalizationType,
      },
    } = recommendationItem;
    return (
      <AddToRegistry
        hideAtrModalState
        closeLtlModalMountedState={this.state.closeLtlModalMountedState}
        registryId={registryId}
        skuId={skuId}
        prodId={parentProdId}
        itemIndex={uniqueIndex}
        ltlFlag={ltlItem}
        price={formattedPrice}
        isCustomizationRequired={customizableRequired}
        ltlShipMethod={ltlShipMethod}
        selectDslOnModal
        ctaType={BUTTON}
        removeIsFromPendingTab
        isRecommendations
        isDeclined
        isFromDeclinedTab
        repositoryId={repositoryId}
        personalizationType={personalizationType}
        pageType={PAGE_TYPE}
        onSuccess={name =>
          this.addToRegistryButton(name, skuDisplayName, skuId)
        }
        selectedProduct={{
          SKU_SCENE7_URL: basicImage,
          DISPLAY_NAME: displayName,
          SKU_DISPLAY_NAME: displayName,
        }}
        qty={0}
        addToRegistryState={{
          data: '',
          error: '',
          productId: '',
        }}
        buttonProps={{
          attr: {
            name: `item_${index}`,
            theme: btnTheme,
            className: 'fullWidth',
            variation: 'fullWidth',
          },
          disabled: false,
          children: moveToNewLabel,
        }}
      />
    );
  };

  renderRowTitle = (rowData, isAssociate = false) => {
    if (this.props.sortOptionApplied !== RECOMMENDATION_SORT_RECOMMENDER)
      return '';

    return (
      <div
        className={classnames('pt3 pb2', styles.nameHeading)}
        data-locator="registry_recommendertitle"
      >
        {isAssociate
          ? this.props.yourRegistryAgentTitleLabel
          : rowData.fullName}
        <span data-locator="registry_recommenderItemCount">{` (${this.state.availableRecommendations})`}</span>
      </div>
    );
  };
  renderRegistryAddedBtn(index) {
    return (
      this.props.tabId === ADDED_TO_REGISTRY && (
        <div>
          <Button
            theme=""
            variation="fullWidth"
            appearance="rounded"
            disabled
            className={styles.addNotification}
          >
            <Icon type="checkmarkwhite" width="16px" height="18px" />{' '}
            {this.props.recommnedationItem[index]
              ? this.props.recommnedationItem[index].acceptedQuantity
              : this.props.recommnedationItem.acceptedQuantity}{' '}
            {ATR_SOCIAL_REC_LBL}
          </Button>
        </div>
      )
    );
  }
  renderSeeAllItems() {
    return (
      <span>
        {this.state.showSeeAllLink
          ? this.props.moveToMyItemsLabel
          : this.props.moveToMayBeLaterLabel}
      </span>
    );
  }

  renderRecommendation(recommendationItem, index) {
    if (
      !recommendationItem.imageVO ||
      !recommendationItem.bvProductVO ||
      !recommendationItem.sKUDetailVO
    ) {
      return null;
    }
    const TitleContainer = props => (
      <Paragraph
        theme={'largeLight'}
        className={classnames('m0 pb1')}
        tabindex="0"
        {...props}
      />
    );
    const TitleWithDangerousHTML = dangerousHTML(TitleContainer);
    const {
      skuDisplayName,
      skuSize,
      formattedPrice,
      imageVO: { basicImage },
      recommendedQuantity,
      repositoryId,
      ltlShipMethod,
      productId,
      bvProductVO: { totalReviewCount, ratingsTitle, averageOverallRating },
      sKUDetailVO: {
        skuId,
        parentProdId,
        ltlItem,
        displayName,
        customizableRequired,
        personalizationType,
      },
    } = recommendationItem;
    const {
      scene7URL,
      quickViewLabel,
      onQuickViewButtonClick,
      tabId,
      registryId,
      uniqueIndex,
      addtoRegistryLabel,
    } = this.props;
    const imgUrl = scene7URL.url + basicImage;
    const skuColor = pathOr(null, 'skuColor', recommendationItem);
    const btnTheme = this.checkButtonTheme();
    const swatchDetails = {
      color: skuColor,
      skuId,
    };
    const enableRecommendListQuickView = pathOr(
      false,
      'switchConfig.enableRecommendListQuickView',
      this.props
    );
    const DangerousSpan = dangerousHTML(props => <span {...props} />);

    return (
      <GridX className={classnames('md-p3 sm-py3')}>
        <Cell className={classnames('large-3')}>
          <GridX>
            <Cell
              className={classnames(
                'relative large-12 small-10 mx-auto sm-center sm-pt2 sm-pb15',
                styles.imageContainer
              )}
            >
              {this.getDangerouslyLoadedImg(displayName, imgUrl)}
              {enableRecommendListQuickView && (
                <QuickViewButton
                  data-locator="registry_recommenderQuickView"
                  className={styles.quickViewButton}
                  label={quickViewLabel}
                  onClick={() => {
                    onQuickViewButtonClick(
                      productId,
                      '',
                      '',
                      '',
                      swatchDetails
                    );
                  }}
                  theme="secondaryStrokeBasic"
                />
              )}
            </Cell>
          </GridX>
        </Cell>

        <Cell className={classnames(`pl1 sm-py2 large-5`)}>
          <GridX>
            <Cell className={classnames('ml2 large-8 small-10')}>
              <span
                className={classnames('m0', styles.price)}
                data-locator="registry_recommendationPrice"
              >
                {formattedPrice}
              </span>

              <div>
                <TitleWithDangerousHTML data-locator="registry_recommendationSkuName">
                  {skuDisplayName}
                </TitleWithDangerousHTML>
                {skuColor !== null && (
                  <Paragraph
                    theme={'mediumLight'}
                    className={classnames('m0 pb1')}
                    tabindex="0"
                    data-locator="registry_recommendationColor"
                  >
                    <span className={classnames('bold')}>
                      {`${COLOR_DASS_LBL} `}
                    </span>
                    <DangerousSpan>{skuColor}</DangerousSpan>
                  </Paragraph>
                )}
                {skuSize && (
                  <Paragraph
                    theme={'mediumLight'}
                    className={classnames('m0 pb1')}
                    tabindex="0"
                    data-locator="registry_recommendationSize"
                  >
                    <span className={classnames('bold')}>
                      {`${SIZE_DASS_LBL} `}
                    </span>
                    <DangerousSpan>{skuSize}</DangerousSpan>
                  </Paragraph>
                )}
                <span data-locator="registry_recommendationRating">
                  <Rating
                    className={styles.rating}
                    total={totalReviewCount}
                    value={averageOverallRating / RATING_MAX}
                    title={ratingsTitle}
                  />
                </span>
              </div>
            </Cell>
          </GridX>
        </Cell>
        <Cell className={classnames('large-4 md-pl1', styles.buttonContainer)}>
          {tabId !== ADDED_TO_REGISTRY && tabId !== MAYBELATER_TAB && (
            <div className={classnames('pb2')}>
              <QuantitySelector
                fieldName="qtySelect"
                optionSet={getCartQuatitySelectorOptions()}
                selectedQuantity={
                  Number(this.state.selectedQuantity[index]) ||
                  recommendedQuantity
                }
                onChangeQuantity={updatedQuantity => {
                  this.changeQuantity(updatedQuantity, index);
                }}
                updateQuantity={updatedQuantity => {
                  this.changeQuantity(updatedQuantity, index);
                }}
                textInputClassName={this.state.qtySelectError && 'errorField'}
                buttonProps={{
                  theme: 'ghost',
                  variation: 'noHorizontalPadding',
                }}
                updateButtonLabel=""
                showUpdateButton
                data-locator="buyagainmodal_productqty"
              />
            </div>
          )}
          {tabId !== ADDED_TO_REGISTRY && tabId !== MAYBELATER_TAB && (
            <div className={classnames('pb2')}>
              {tabId === NEW_FILTER_TAB ? (
                <AddToRegistry
                  hideAtrModalState
                  closeLtlModalMountedState={
                    this.state.closeLtlModalMountedState
                  }
                  registryId={registryId}
                  skuId={skuId}
                  prodId={parentProdId}
                  itemIndex={uniqueIndex}
                  ltlFlag={ltlItem}
                  price={formattedPrice}
                  isCustomizationRequired={customizableRequired}
                  ltlShipMethod={ltlShipMethod}
                  selectDslOnModal
                  ctaType={BUTTON}
                  isFromPendingTab
                  isRecommendations
                  isDeclined={false}
                  repositoryId={repositoryId}
                  personalizationType={personalizationType}
                  pageType={PAGE_TYPE}
                  onSuccess={name =>
                    this.addToRegistryButton(name, skuDisplayName, skuId)
                  }
                  selectedProduct={{
                    SKU_SCENE7_URL: basicImage,
                    DISPLAY_NAME: displayName,
                    SKU_DISPLAY_NAME: displayName,
                  }}
                  qty={
                    this.state.selectedQuantity[index]
                      ? Number(this.state.selectedQuantity[index])
                      : Number(recommendedQuantity)
                  }
                  addToRegistryState={{
                    data: '',
                    error: '',
                    productId: '',
                  }}
                  buttonProps={{
                    attr: {
                      name: `item_${index}`,
                      theme: btnTheme,
                      className: 'fullWidth',
                      variation: 'fullWidth',
                    },
                    disabled: false,
                    children: addtoRegistryLabel,
                  }}
                />
              ) : (
                <AddToRegistry
                  hideAtrModalState
                  closeLtlModalMountedState={
                    this.state.closeLtlModalMountedState
                  }
                  registryId={registryId}
                  skuId={skuId}
                  prodId={parentProdId}
                  itemIndex={uniqueIndex}
                  ltlFlag={ltlItem}
                  isRecommendations
                  price={formattedPrice}
                  isCustomizationRequired={customizableRequired}
                  ltlShipMethod={ltlShipMethod}
                  selectDslOnModal
                  ctaType={BUTTON}
                  isFromDeclinedTab
                  isDeclined={false}
                  repositoryId={repositoryId}
                  personalizationType={personalizationType}
                  pageType={PAGE_TYPE}
                  onSuccess={name =>
                    this.addToRegistryButton(name, skuDisplayName, skuId)
                  }
                  selectedProduct={{
                    SKU_SCENE7_URL: basicImage,
                    DISPLAY_NAME: displayName,
                    SKU_DISPLAY_NAME: displayName,
                  }}
                  qty={
                    this.state.selectedQuantity[index]
                      ? Number(this.state.selectedQuantity[index])
                      : Number(recommendedQuantity)
                  }
                  addToRegistryState={{
                    data: '',
                    error: '',
                    productId: '',
                  }}
                  buttonProps={{
                    attr: {
                      name: `item_${index}`,
                      theme: btnTheme,
                      variation: 'fullWidth',
                    },
                    disabled: false,
                    children: addtoRegistryLabel,
                  }}
                />
              )}
            </div>
          )}
          {tabId === MAYBELATER_TAB &&
            this.moveToNewBtn(recommendationItem, index)}
          {this.buttonToggelView(index)}
          {this.renderRegistryAddedBtn(index)}
        </Cell>
      </GridX>
    );
  }

  renderComments = comment => {
    const isMobile = this.props.isMobile;
    const commentLimit = this.props.recommendationCommentLimitPageConfig;
    return (
      <div
        className={classnames(styles.comment, this.state.classToggle)}
        data-locator="registry_recommendationNote"
      >
        {isMobile && comment.length > commentLimit ? (
          <span>
            {!this.state.readMoreFlag
              ? `${comment.substr(0, commentLimit)}... `
              : `${comment} `}
            <PrimaryLink
              variation="primary"
              href="#"
              onClick={e => {
                e.preventDefault();
                this.readMore();
              }}
            >
              {this.state.readText}
            </PrimaryLink>
          </span>
        ) : (
          <span>{comment}</span>
        )}
      </div>
    );
  };

  renderRow() {
    const { fullName } = this.props.recommnedationItem;
    const { enableRegistryCollaboration } = this.props.switchConfig;
    const {
      isRowCollection,
      recommnedationItem,
      recommendationFromLabel,
      isAssociate,
    } = this.props;
    const comment = isRowCollection
      ? recommnedationItem[0].comment
      : recommnedationItem.comment;
    return (
      <li
        className={classnames(
          'listContainer',
          enableRegistryCollaboration ? 'mb2' : 'mb15'
        )}
      >
        <GridX className={classnames(styles.container)}>
          <Cell className={classnames('large-3 sm-center')}>
            <GridX className={classnames(styles.fullHeight)}>
              <Cell
                className={classnames(
                  'sm-py2 sm-pb2 sm-pt3 md-p3',
                  enableRegistryCollaboration
                    ? styles.collabBorder
                    : styles.showBorder
                )}
              >
                <div>
                  {isAssociate && (
                    <Icon
                      className={classnames('m0 pb2')}
                      type="registryConsultant"
                      width="100px"
                      height="100px"
                      data-locator="registry_registryConsultantRecommendedIcon"
                    />
                  )}
                  <div
                    className={classnames(
                      enableRegistryCollaboration && styles.fromCollab,
                      styles.from,
                      'sm-pb2'
                    )}
                  >
                    {recommendationFromLabel}
                  </div>
                  <div
                    className={classnames(styles.nameRecommender, 'sm-pb15')}
                    data-locator="registry_recommenderName"
                  >
                    {isAssociate
                      ? this.props.yourRegistryAgentNameLabel
                      : fullName}
                  </div>

                  {comment && this.renderComments(comment)}
                </div>
              </Cell>
            </GridX>
          </Cell>
          <Cell className={classnames('large-9')}>
            {isRowCollection
              ? recommnedationItem.map((item, index) => {
                  if (this.state[`item_${index}`]) {
                    return null;
                  }
                  return (
                    <div className={classnames(styles.rowCollection)}>
                      {this.renderRecommendation(item, index)}
                    </div>
                  );
                })
              : this.renderRecommendation(recommnedationItem, 0)}
          </Cell>
        </GridX>
      </li>
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.renderRowTitle(
          this.props.recommnedationItem,
          this.props.isAssociate
        )}
        {this.state.displayNotification && this.showNotification()}
        {this.state.availableRecommendations > 0 ? this.renderRow() : ''}
      </React.Fragment>
    );
  }
}

RecommendationRow.propTypes = {
  recommnedationItem: PropTypes.object,
  yourRegistryAgentTitleLabel: PropTypes.string,
  scene7URL: PropTypes.string,
  sortOptionApplied: PropTypes.string,
  isMobile: PropTypes.string,
  tabId: PropTypes.number,
  showMore: PropTypes.string,
  showLess: PropTypes.string,
  registryId: PropTypes.string,
  addtoRegistryLabel: PropTypes.string,
  mayBeLaterBtnCall: PropTypes.func,
  registryEventType: PropTypes.string,
  isRowCollection: PropTypes.bool,
  isAssociate: PropTypes.bool,
  uniqueIndex: PropTypes.number,
  moveToMyItemsLabel: PropTypes.string,
  moveToMayBeLaterLabel: PropTypes.string,
  yourRegistryAgentNameLabel: PropTypes.string,
  recommendationFromLabel: PropTypes.string,
  quickViewLabel: PropTypes.string,
  onQuickViewButtonClick: PropTypes.func,
  recommendationCommentLimitPageConfig: PropTypes.number,
  moveToNewLabel: PropTypes.string,
  switchConfig: PropTypes.object,
};
export default RecommendationRow;
