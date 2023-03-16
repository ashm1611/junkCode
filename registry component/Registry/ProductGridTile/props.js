import { arrayOf, string, func, bool } from 'prop-types';

export const defaultProps = {
  attributes: [],
  reviews: 0,
};

export default {
  /** Product attributes to emphasize (e.g. "Wedding Registry Favorite") */
  attributes: arrayOf(string),
  /** Additional classes */
  className: string,
  /** Product image for initial thumbnail */
  SCENE7_URL: string,
  /** Flag for indicating the product as "pinned" (e.g. idea boards) */
  /** Product pricing */
  IS_PRICE: string,
  WAS_PRICE: string,
  /** Product review rating (0 - 1) */
  RATINGS: string,
  /** String title for rating ("3 out of 5 stars") */
  ratingTitle: string,
  /** Product review count (1+) */
  REVIEWS: string,
  /** String title for reviews ("100 Reviews") */
  reviewsTitle: string,
  /** Product title */
  DISPLAY_NAME: string,
  /** Product URL */
  SEO_URL: string,
  /** Quick Button action */
  onQuickViewButtonClick: func,
  updateSkuIdForAnchoring: func,
  onIdeaBoardButtonClick: func,
  isLoggedIn: bool,
  /** Update Gift data */
  updateGiftData: func,
  updateFilterCount: func,
  /** styleVariation */
  styleVariation: string,
  getUpdatedCategoryData: func,
  handleNandDReplaceModal: func,
};
