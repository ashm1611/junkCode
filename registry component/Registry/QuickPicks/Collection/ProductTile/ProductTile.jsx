/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { get, uniqueId, isEmpty, has } from 'lodash';
import { stringify } from 'qs';
import { compact, orderBy, getOr, uniq } from 'lodash/fp';
import DeferRender from 'defer-render-hoc';
import truncate from '@bbb-app/utils/truncate';
import Card from '@bbb-app/core-ui/card';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Checkbox from '@bbb-app/core-ui/checkbox';
import { unescape, capitalizeFirstCharacter } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import getCartQuatitySelectorOptions from '@bbb-app/utils/getCartQuantitySelectorOptions';
import sanitizeSearchTerm from '@bbb-app/utils/sanitizeSearchTerm';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import QuantitySelector from '@bbb-app/quantity-selector/QuantitySelector';
import {
  PRODUCT_IMAGE_PLACEHOLDER,
  CHANNELTYPE_MOBILE,
} from '@bbb-app/constants/appConstants';
import styles from './ProductTile.css';
import propTypes, { defaultProps } from './props';
import getRollupCode from '../../../../../../utils/getRollupCode';
import Price from '../../../../../ProductTile/Price/index';
import Thumbnail from '../../../../../Thumbnail/index';
import SwatchMenu from '../../../../../common/SwatchMenu/index';
import RQPProductTileHeader from './RQPProductTileHeader/index';
import {
  LAZY_LOAD_OFFSET,
  PRICE_MAX_CHARS,
  NORMAL,
  COLLECTION,
} from '../../../../../ProductTile/constants';
import { pickProductProps } from '../../../../../../utils/quickPicks';
import { PRODUCT_TILE_FOOTER_LBL, PRODUCT_TILE_SIZE_LBL } from '../constants';
/**
 * Helper component for ActionButtons
 * @param {object} props props for the action button
 * @param {string} props.label label for the button
 * @param {string} props.theme style theme for the button
 * @param {string} props.variation style variation for the button
 * @param {function} props.onClick click handler of the button
 * @param {string} props.icon type attribute of the optional icon
 */
const ActionButton = propArgs => {
  const {
    label,
    className,
    theme,
    variation,
    onClick,
    iconType,
    href,
    disabled,
  } = propArgs;
  const iconProps =
    (iconType && { label, type: iconType, height: '16px' }) || null;

  return (
    <Button
      className={className}
      theme={theme}
      variation={variation}
      onClick={onClick}
      iconProps={iconProps}
      href={href}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

/**
 * Deferred render component variations.
 *
 * Wrapping these sub-components in the deferred render HOC
 * will cause them to render null in SSR, and appear shortly
 * after the main product tile UI renders. This improves
 * the perceived performance of the entire grid rendering.
 */
const DeferredActionButton = DeferRender(ActionButton);

/* eslint-enable react/prop-types */
/**
 * Displays a Product Tile with product title, price, image and other attributes
 *
 * For more information about the component please refer to
 * the README: docs/storybook/product-tile.md
 */
class ProductTile extends PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    /** Currently selected variant index (swatches) */
    variantIndex: this.getCMSDefaultVariationIndex(),
  };

  /**
   * Handler for Add to Registry CTA
   */
  onAddToRegistryClick = () => {
    this.props.actions.addToRegistry.handler({
      ...pickProductProps(this.props),
      selectedVariant: this.state.variantIndex,
    });
  };

  /**
   * Handler for Add to Registry CTA
   */
  onMoreOptionsClick = () => {
    this.props.actions.moreOptions.handler(this.props.productId);
  };

  /**
   * Handler for Quick View CTA
   */
  onQuickViewButtonClick = () => {
    const productVariation =
      this.props.collectionFlag === 'false' ? NORMAL : COLLECTION;

    this.props.actions.quickView.handler(
      this.props.productId,
      productVariation,
      this.props.url
    );
  };

  /**
   * Handler for Quantity selector
   *
   */
  onUpdateQuantity = qty => {
    this.props.actions.updateProductQty.handler({
      defaultSkuCMS: this.props.defaultSkuCMS,
      qty,
    });
  };

  /**
   * Handler for selection
   */
  onSelect = () => {
    this.props.actions.selectProduct.handler({
      ...pickProductProps(this.props),
      selectedVariant: this.state.variantIndex,
    });
  };

  getCMSDefaultVariationIndex() {
    const orderedVariants = orderBy('label', 'asc', this.props.variants);
    return orderedVariants.findIndex(
      item => item.skuId === this.props.defaultSkuCMS
    );
  }
  /**
   * Get the Primary CTA to render by action
   */
  getPrimaryCta = (label, handler, href, isDisabled) => {
    return ActionButton({
      className: styles.primaryCtaButton,
      label: label || '',
      onClick: isDisabled ? this.disabledActionHandler : handler,
      theme: isDisabled ? 'deactivated' : 'primary',
      disabled: isDisabled,
      href,
    });
  };
  /**
   * Dervice the Product url
   */
  getProductUrl({ categoryId, searchTerm, isSkuCreated }) {
    const href = `${this.props.contextPath}${this.props.url}`;
    let queryString = href;
    const keyword = sanitizeSearchTerm(searchTerm);
    if (categoryId) {
      queryString = `${href}?categoryId=${categoryId}`;
    } else if (keyword) {
      queryString = `${href}?keyword=${keyword}`;
    }
    if (this.selectedVariant) {
      let variParams = '';
      if (isSkuCreated) {
        variParams = `${stringify(
          {
            color: this.selectedVariant.label,
          },
          { sort: false }
        )}`;
      } else {
        variParams = `${stringify(
          {
            color: this.selectedVariant.label,
            skuId: this.selectedVariant.skuId,
          },
          { sort: false }
        )}`;
      }
      /* istanbul ignore else */
      if (variParams) {
        queryString = `${queryString}${
          queryString.indexOf('?') === -1 ? '?' : '&'
        }${variParams}`;
      }
    }

    return `${queryString}`;
  }
  getTrimmedAttributes = attributes => {
    // Attributes ids are formatted as \d_\d where the match[1] is the attribute type
    const cache = {};
    const regex = /(\d+)_(\d+)/;
    return (
      attributes &&
      attributes.filter(({ skuAttributeId: id }) => {
        const matches = id && id.match(regex);
        const key = matches && matches.length > 0 && matches[1];
        if (key && !cache[key]) {
          cache[key] = id;
          return true;
        }
        return false;
      })
    );
  };
  disabledActionHandler = event => {
    event.preventDefault();
  };
  /** check if attributes is supposed to render free shipping label if it hasn't yet
   * and skip over current attribute if it does not have free shipping label
   */
  checkAttributesForShipping = (
    attributes,
    freeShippingLabel,
    renderedFreeShipping
  ) => {
    if (!renderedFreeShipping) {
      return (
        isEmpty(freeShippingLabel) &&
        attributes.find(attr => attr.freeShippingLabel)
      );
    }
    return false;
  };
  /**
   * Gets the selected variant
   *
   * @returns {object} object with all data for the selected variant
   */
  get selectedVariant() {
    // variants are ordered by swatch color names
    const orderedVariants = orderBy('label', 'asc', this.props.variants);
    return orderedVariants[this.state.variantIndex];
  }
  /**
   * @returns {string} scene7ID of the selected swatch image
   */
  get currentImage() {
    return get(this.selectedVariant, 'swatchScene7ID');
  }
  /**
   * Gets the truncated product title to be a maximum of 100 characters
   * @returns {string} product title truncated
   */
  get displayTitle() {
    let title = this.props.title || '';
    if (this.selectedVariant) {
      title = this.selectedVariant.title;
    }
    return title.length > 0 ? truncate(title, 100) : '';
  }

  // Updates the state when a new swatch is selected
  handleSwatchChange = index => this.setState({ variantIndex: index });
  /**
   * Renders quantity dropdown
   * @param { object } labels label from api
   * @param { number } quantity quanity of product user selected
   * @param { funct } changeQuantity alled when user changes quantity in dropdown
   */
  renderQuantitySelector = (labels, quantity) => (
    <div className={styles.qty}>
      <QuantitySelector
        fieldName="qtySelect"
        labelName={'Qty'}
        labelStyle={'inlineLabel'}
        selectedQuantity={quantity}
        optionSet={getCartQuatitySelectorOptions()}
        updateQuantity={this.onUpdateQuantity}
        buttonProps={{
          theme: 'ghostPrimary',
          variation: 'noHorizontalPadding',
        }}
        updateButtonName=""
        showUpdateButton={false}
        data-locator="saveditems_qtydropdown"
        classes="borderColor"
      />
    </div>
  );
  // Render the Primary CTA
  renderPrimaryCta = () => {
    return this.getPrimaryCta(
      this.props.actions.addToRegistry.label,
      this.onAddToRegistryClick,
      null,
      this.props.isInternationalUser || false
    );
  };
  renderMoreOptionsButton = href => {
    const isMobile = this.props.channelType === CHANNELTYPE_MOBILE;
    return (
      <Button
        className={classnames(styles.moreOptions, 'mt2')}
        theme="ghost"
        variation="noPadding"
        onClick={this.onQuickViewButtonClick}
        href={isMobile ? href : null}
      >
        {this.props.actions.moreOptions.label}
      </Button>
    );
  };
  // Render the attrbutes section
  renderWeddingFavourite = () => {
    const needAttributesRendered = this.props.attributes.length > 0;
    const trimmedAttributes = this.getTrimmedAttributes(this.props.attributes);
    if (needAttributesRendered) {
      return (
        <ul className={styles.attributes}>
          {trimmedAttributes.map((attribute, i) => {
            const { text } = attribute;
            if (text.includes('Wedding Registry Favorite')) {
              return (
                <li key={i} className={styles.attribute} tabIndex={0}>
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </li>
              );
            }

            return null;
          })}
        </ul>
      );
    }
    return null;
  };
  render() {
    const {
      className,
      profileHasRegistries,
      productId,
      title,
      variants,
      categoryId,
      searchTerm,
      rollupTypeCode,
      collectionFlag,
      comment,
      defaultSkuCMS,
    } = this.props;
    const rootStyles = {
      [styles.base]: styles.base,
      [styles.isDisabled]: this.props.disabled,
      [className]: className,
    };
    if (productId) {
      rootStyles[`js-product-id-${productId}`] = `js-product-id-${productId}`;
    }
    const isMobile = this.props.channelType === CHANNELTYPE_MOBILE;
    const tileTitleId = uniqueId('tileTitleId');
    const isSkuCreated = getRollupCode(rollupTypeCode, collectionFlag);
    const href = this.getProductUrl({
      categoryId,
      isSkuCreated,
      searchTerm,
    });
    const moreOptionsButton = !isEmpty(this.props.actions.moreOptions)
      ? this.renderMoreOptionsButton(href)
      : null;
    const sizeVariants = compact(
      uniq(
        variants.map(item => capitalizeFirstCharacter(item.size.toLowerCase()))
      )
    );
    const rollupColor = rollupTypeCode !== '2' && rollupTypeCode !== '0';
    const rollupSize =
      rollupTypeCode !== '3' &&
      rollupTypeCode !== '1' &&
      rollupTypeCode !== '0';
    let showDefaults = false;

    if (rollupSize && rollupColor) {
      showDefaults = true;
    }
    if (productId) {
      rootStyles[`js-product-id-${productId}`] = `js-product-id-${productId}`;
    }
    return (
      <Card
        className={classnames(rootStyles)}
        ariaAttributes={{
          role: 'region',
          'aria-describedby': tileTitleId,
        }}
        type="tight"
      >
        {!isEmpty(comment) ? (
          <RQPProductTileHeader label={this.props.header} tooltip={comment} />
        ) : (
          <div className={styles.headerSpacer} />
        )}
        <div className={styles.wrapper}>
          <div className={styles.thumbnailWrapper}>
            <PrimaryLink
              href={href}
              className="absolute top-0 right-0 bottom-0 left-0"
            >
              <Thumbnail
                className={styles.thumbnail}
                alt={title}
                lazyLoad={this.props.lazyLoad}
                lazyLoadOptions={{
                  offset: LAZY_LOAD_OFFSET,
                  placeholder: PRODUCT_IMAGE_PLACEHOLDER,
                }}
                scene7imageID={
                  this.state.variantIndex === -1
                    ? this.props.scene7imageID
                    : this.currentImage
                }
              />
            </PrimaryLink>

            {profileHasRegistries && (
              <div className={styles.checkboxWrapper}>
                <Checkbox
                  islablevisible={false}
                  checked={
                    !this.props.isInternationalUser &&
                    has(
                      this.props.actions,
                      `selectProduct.selectedProducts[${defaultSkuCMS}]`
                    )
                  }
                  onSelect={this.onSelect}
                  label={title}
                  disabled={this.props.isInternationalUser}
                />
              </div>
            )}
            <div className={styles.quickViewWrapper}>
              <DeferredActionButton
                className={styles.quickViewButton}
                label={this.props.actions.quickView.label}
                onClick={this.onQuickViewButtonClick}
                theme="secondaryStrokeBasic"
              />
            </div>
          </div>
          <Price
            className={styles.price}
            {...this.props.price}
            dynamicPrice={this.props.dynamicPrice}
            priceLabels={this.props.priceLabels}
            maxChars={PRICE_MAX_CHARS}
            noWrap
          />
          <header className={styles.title} title={title} id={tileTitleId}>
            <PrimaryLink href={href}>
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: this.displayTitle }}
              />
            </PrimaryLink>
          </header>
          {variants.length > 1 && (
            <div className={styles.variantsGroup}>
              {rollupColor && (
                <section className={styles.colorGroup}>
                  <div className={styles.attributeGroupWrapper}>
                    <SwatchMenu
                      className={styles.swatches}
                      items={
                        showDefaults
                          ? variants.filter(v => v.skuId === defaultSkuCMS)
                          : variants
                      }
                      selectedIndex={this.state.variantIndex}
                      onChange={this.handleSwatchChange}
                      name={`product_${productId}_swatches`}
                      chooseOptionsLabel={this.props.chooseOptionsLabel}
                    />
                  </div>
                  {isEmpty(sizeVariants) && moreOptionsButton}
                </section>
              )}
              {!isEmpty(sizeVariants) && rollupSize && (
                <div className={styles.sizeMenu}>
                  <section className={styles.sizeGroup}>
                    <div className={styles.attributeGroupWrapper}>
                      <strong className={styles.attributeGroupTitle}>
                        {PRODUCT_TILE_SIZE_LBL}
                      </strong>
                      <span>
                        {unescape(
                          capitalizeFirstCharacter(
                            getOr(
                              '',
                              'size',
                              variants.find(v => v.skuId === defaultSkuCMS)
                            ).toLowerCase()
                          )
                        )}
                      </span>
                    </div>
                  </section>
                  {moreOptionsButton}
                </div>
              )}
            </div>
          )}
          {this.renderWeddingFavourite()}
        </div>
        {profileHasRegistries && (
          <div className={styles.ctaGroup}>
            {this.renderQuantitySelector(this.props.labels, this.props.qty)}
            {this.renderPrimaryCta(isMobile, href)}
          </div>
        )}
        {!profileHasRegistries && this.props.recommendedCount > 0 && (
          <footer className={styles.footer}>
            <span className={styles.weRecommend}>
              {LabelsUtil.replacePlaceholderValues(PRODUCT_TILE_FOOTER_LBL, [
                this.props.recommendedCount,
              ])}
            </span>
          </footer>
        )}
      </Card>
    );
  }
}

export default ProductTile;
