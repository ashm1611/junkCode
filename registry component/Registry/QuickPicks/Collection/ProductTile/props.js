import { arrayOf, bool, func, number, shape, string, object } from 'prop-types';
import { noop } from '@bbb-app/utils/common';
import Badge from '../../../../../ProductBadge/ProductBadge';

export const defaultProps = {
  actions: {
    addToCart: { label: '', handler: noop },
    addToIdeaBoard: { label: '', handler: noop },
    addToRegistry: { label: '', handler: noop },
    chooseOptions: { label: '', handler: noop },
    compare: { label: '', handler: noop },
    customize: { label: '', handler: noop },
    quickView: { label: '', handler: noop },
    personalize: { label: '', handler: noop },
  },
  attributes: [],
  reviews: 0,
  variants: [],
  reviewsLabel: '',
  chooseOptionsLabel: '',
  selected: true,
  comment: null,
  recommendedCount: 0,
  qty: 1,
  defaultSkuCMS: '',
};

export default {
  /** CTAs */
  actions: shape({
    /** Label & handler for "Add to registry" CTA */
    addToRegistry: shape({
      label: string,
      handler: func,
    }),
    /** Label & handler for "Quick view" CTA */
    quickView: shape({
      label: string,
      handler: func,
    }),
  }),
  /** Product attributes to emphasize (e.g. "Wedding Registry Favorite") */
  attributes: arrayOf(
    shape({
      /** the text to display for the attribute */
      text: string,
      /** flag indicating the type of shipping label */
      freeShippingLabel: string,
    })
  ),
  /** The badge anchored to the top (e.g. "Online Only") */
  badge: shape(Badge.propTypes),
  /** Additional classes */
  className: string,
  /** Product unique identifier */
  productId: string.isRequired,
  /** Product image for initial thumbnail */
  image: string.isRequired,
  /** Scene 7 image id */
  scene7imageID: string,
  /** Flag to render in a disabled (faded, read-only) state */
  isDisabled: bool,
  /** Flag for indicating if (profile of logged in user, if exists) has Registries */
  profileHasRegistries: bool,
  /** Flag for indicating if price is dynamic. Comes from product grid. */
  dynamicPrice: bool,
  /** Product pricing */
  price: shape({
    /** Default price, displayed normally */
    normal: string,
    /** Special low price, displayed with flare */
    low: string,
  }),
  /** Labels for different static text string */
  labels: object,
  chooseOptionsLabel: string,
  /** Labels for different price types */
  priceLabels: shape({
    /** label for the different price variations on a product (range) */
    priceVariations: string,
    /** label for what a price used to be */
    was: string,
    /** if a price is discounted when it's in the cart label */
    discountedInCart: string,
    /** the full price to show when in cart */
    fullPriceInCart: string,
    /** label for when a price is to be determined */
    pricetbd: string,
  }),
  /** Product review rating (0 - 1) */
  rating: number,
  /** String title for rating ("3 out of 5 stars") */
  ratingTitle: string,
  /** Product review count (1+) */
  reviews: number,
  /** String title for reviews ("100 Reviews") */
  reviewsTitle: string,
  /** the labels for different free shipping messages */
  shippingLabels: shape({
    /** the label for when some of the items in a multi SKU qualify for free shipping */
    someSkusFreeShippingMessage: string,
    /** label for when a product qualifies for free shipping */
    freeShippingMessage: string,
  }),
  /** Is the tile is selectable, control selection */
  selected: bool,
  /** Product title */
  title: string.isRequired,
  /** Product URL */
  url: string.isRequired,
  /** The array of objects used to construct swatches and alternate thumbnails */
  variants: arrayOf(
    shape({
      /** URL for the variant thumbnail image (e.g. 'path/to/thumbnail.webp') */
      image: string,
      /** scene7ID for the variant thumbnail image  */
      swatchScene7ID: string,
      /** Label for the variant (e.g. 'Dark Blue') */
      label: string,
      /** URL for the variant swatch image (e.g. 'path/to/swatch.webp') */
      swatchImage: string,
      /** Product variant title (e.g. 'Product name in Dark Blue') */
      title: string,
    })
  ),
  /** Selectable Tile, add checkbox **/
  selectable: bool,
  /** Reviews label **/
  reviewsLabel: string,
  /** Recommended count **/
  recommendedCount: number,
  /** Header / Why We Love This **/
  header: string,
  /** Header / Why We Love This **/
  comment: string,

  defaultSkuCMS: string,

  qty: number,
};
