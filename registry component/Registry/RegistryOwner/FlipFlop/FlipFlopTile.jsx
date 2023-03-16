import React, { PureComponent } from 'react';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import truncate from '@bbb-app/utils/truncate';
import Card from '@bbb-app/core-ui/card';
import Image from '@bbb-app/core-ui/image';
import { decodeHtmlEntities } from '@bbb-app/utils/common';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import PrimaryLinkContainer from '@bbb-app/plp-primary-link/containers/PrimaryLink';
import Rating from '@bbb-app/rating/Rating';
import productTileStyles from '../../../../ProductTile/ProductTile.inline.css';
import flipFlopStyles from './FlipFlopStyle.css';
import propTypes from '../../../../ProductTile/props';
import Price from '../../../../ProductTile/Price';
import { FLIP_FLOP_PRODUCT_IMAGE_SIZE } from '../../../../../containers/Pages/Registry/RegistryOwner/FlipFlop/constants';
import { PRICE_MAX_CHARS } from '../../../../ProductTile/constants';
import { MORE_INFO_LBL } from '../../constants';

class FlipFlopTile extends PureComponent {
  static propTypes = propTypes;
  get displayTitle() {
    return truncate(this.props.title, 55);
  }
  appendParametersToURLs = (url, param) => {
    return `${url}&${param}`;
  };

  redirectTOPDP = () => {
    this.props.fireTealiumAction(
      '',
      {
        appt_scheduler_entry: 'Redirected to PDP',
        call_to_actiontype: 'Redirected to PDP',
        page_name: 'ProductDetails',
        page_type: 'Registry',
        channel: 'Registry',
        pagename_breadcrumb: 'HITORMISS',
        add_to_registry_location: 'hit or miss',
        prodID: this.props.prodId,
        merchandising_category: 'non-browse',
        merchandising_main_level: 'non-browse',
        merchandising_subcategory: 'non-browse',
        crossell_page: 'non-cross sell',
        crossell_product: 'non-cross sell',
        internal_search_term: 'non-search',
        internal_campaign: 'non-internal campaign',
        product_finding_method: 'Hit or Miss',
      },
      ''
    );
  };

  render() {
    const {
      price,
      rating,
      reviews,
      title,
      scene7imageID,
      url,
      skuId,
    } = this.props;
    let prodImageUrl = getConcatenatedScene7URLWithImageId(
      scene7imageID,
      'largeImage',
      FLIP_FLOP_PRODUCT_IMAGE_SIZE
    );
    const parameterToSharpenImage = 'op_sharpen=1';
    prodImageUrl = this.appendParametersToURLs(
      prodImageUrl,
      parameterToSharpenImage
    );

    return (
      <ErrorBoundary>
        <Card skuId={skuId} className={flipFlopStyles.tile}>
          <div
            data-locator="hit-miss-item-image"
            className={classnames(flipFlopStyles.imageWrapper, 'pt2')}
          >
            <div
              className={classnames(
                productTileStyles.thumbnailWrapper,
                flipFlopStyles.flipFlopProductImage
              )}
            >
              <PrimaryLinkContainer
                href={`#`}
                className="absolute top-0 right-0 bottom-0 left-0 activeAnchorHeight"
              >
                <Image
                  className={classnames(
                    productTileStyles.thumbnail,
                    'activeAnchorImage'
                  )}
                  alt={title}
                  src={prodImageUrl}
                />
              </PrimaryLinkContainer>
            </div>
          </div>
          <Price
            className={flipFlopStyles.price}
            {...price}
            maxChars={PRICE_MAX_CHARS}
            dataLocator="hit-miss-item-price"
          />
          <header
            className={`${productTileStyles.title} ${flipFlopStyles.heading}`}
            title={decodeHtmlEntities(title)}
            data-locator="hit-miss-item-title"
          >
            <span
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: this.displayTitle }}
            />
          </header>
          <Rating
            className={productTileStyles.rating}
            total={reviews}
            value={rating}
            dataLocator="hit-miss-item-rating"
          />
          <PrimaryLinkContainer
            href={`/store${url}`}
            variation="primary"
            onClick={this.redirectTOPDP}
            data-locator="hit-miss-item-more-info-link"
          >
            {MORE_INFO_LBL}
          </PrimaryLinkContainer>
        </Card>
      </ErrorBoundary>
    );
  }
}

export default FlipFlopTile;
