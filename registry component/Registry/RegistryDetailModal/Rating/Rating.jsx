import React from 'react';
import classnames from 'classnames';
import { PrimaryLinkContainer } from '@bbb-app/plp-primary-link/containers/PrimaryLink';
import { CLICK_QUICKVIEW } from '@bbb-app/plp-primary-link/containers/constants';
import propTypes, { defaultProps } from './props';
import styles from './Rating.css';
import { BV_BEST_RATING } from './constants';

const REVIEWS_LABEL = ' reviews';
const getReviewCount = (reviewsLabel, total) => {
  const lblReview = reviewsLabel || total + REVIEWS_LABEL;
  return (
    <div>
      <span className={styles.label} aria-hidden title={reviewsLabel}>
        {total}
      </span>
      <span className="hide" aria-label={lblReview} title={lblReview}>
        {lblReview}
      </span>
    </div>
  );
};

const renderSVG = otherProps => {
  const { desc, displayMicroData, ratingValue, value } = otherProps;
  /** Ensure value falls between 0 and 1 */
  const goodValue = Math.min(1, Math.max(0, value));
  const score = Math.round(goodValue * 120) || 0;
  const score1 = Math.round(goodValue * 79) || 0;
  const starsPathD = () =>
    'M7.5 11.85l-4.4 2.28.8-4.88L.37 5.78l4.9-.74L7.5.62l2.22 4.42 4.9.74-3.52 3.47.8 4.88M39.5 11.85l-4.4 2.28.8-4.88-3.53-3.47 4.9-.74L39.5.62l2.22 4.42 4.9.74-3.52 3.47.8 4.88M23.5 11.85l-4.4 2.28.8-4.88-3.53-3.47 4.9-.74L23.5.62l2.22 4.42 4.9.74-3.52 3.47.8 4.88M55.5 11.85l-4.4 2.28.8-4.88-3.53-3.47 4.9-.74L55.5.62l2.22 4.42 4.9.74-3.52 3.47.8 4.88M71.5 11.85l-4.4 2.28.8-4.88-3.53-3.47 4.9-.74L71.5.62l2.22 4.42 4.9.74-3.52 3.47.8 4.88';
  let itemPropRating = null;
  let itemPropBestRating = null;
  if (displayMicroData) {
    itemPropRating = ratingValue ? (
      <span itemProp="ratingValue" aria-hidden="true" className="hide">
        {ratingValue}
      </span>
    ) : null;
    itemPropBestRating = (
      <span itemProp="bestRating" aria-hidden="true" className="hide">
        {BV_BEST_RATING}
      </span>
    );
  }
  return (
    <span className={classnames('relative', styles.ratings)}>
      <svg className={styles.svg} height="20" width="120" viewBox="0 0 79 15">
        <path className={styles.rear} d={starsPathD()} />
      </svg>
      <svg
        className={styles.svg}
        height="20"
        width={score}
        viewBox={`0 0 ${score1} 15`}
      >
        <desc>{desc}</desc>
        <path className={styles.front} d={starsPathD()} />
      </svg>
      {itemPropRating}
      {itemPropBestRating}
    </span>
  );
};

const renderRating = otherProps => {
  const {
    dataLocator,
    SEOMicroData,
    toggleClass,
    reviewsLabel,
    total,
    className,
  } = otherProps;
  return (
    <div
      data-locator={dataLocator}
      className={classnames(
        styles.ratingContainer,
        'flex items-center',
        className,
        { [styles.facet]: toggleClass }
      )}
      {...SEOMicroData}
    >
      {renderSVG(otherProps)}
      {total && getReviewCount(reviewsLabel, total)}
    </div>
  );
};

const renderAnchorRating = (
  otherProps,
  itemPropReviewed,
  itemPropReviewCount
) => {
  const {
    title,
    dataLocator,
    SEOMicroData,
    toggleClass,
    reviewLinkProps,
    total,
    isReviewContainerReq,
    reviewsLabel,
    interactionTealiumData,
    className,
  } = otherProps;
  return (
    <PrimaryLinkContainer
      data-locator={dataLocator}
      {...reviewLinkProps}
      className={classnames(
        styles.ratingContainer,
        className,
        'items-center fol',
        { [styles.facet]: toggleClass }
      )}
      {...SEOMicroData}
      type="small"
      aria-label={`${total}for${title}`}
      elementClicked={CLICK_QUICKVIEW}
      interactionTealiumData={interactionTealiumData}
    >
      {renderSVG(otherProps)}
      <span
        className={classnames(
          isReviewContainerReq && styles.reviewsContainer,
          'mx1 inline-block'
        )}
        aria-hidden="true"
      >
        {reviewsLabel ? <span aria-label={reviewsLabel}>{total}</span> : total}
        {itemPropReviewCount}
        {itemPropReviewed}
      </span>
    </PrimaryLinkContainer>
  );
};

/**
 * This renders the rating stars and count of total reviews in
 * the product tiles
 *
 * @param { string } className CSS class to be applied to ratings div
 * @param { string } variation Styling variation
 * @param { number } value user rating
 * @param { number } total number of reviews
 * @param { string } desc description
 * @param { string } title shows rating when user hovers over rating stars
 * @param { object } reviewLinkProps props for link to reviews
 * @param { object } SEOMicroData props for SEO microdata for main product
 */
const Rating = props => {
  const {
    total,
    title,
    reviewLinkProps,
    displayMicroData,
    reviewCount,
  } = props;

  let itemPropReviewCount = null;
  let itemPropReviewed = null;
  if (displayMicroData) {
    itemPropReviewCount = reviewCount ? (
      <meta itemProp="reviewCount" content={reviewCount} />
    ) : null;
    itemPropReviewed = <meta itemProp="itemReviewed" content={title} />;
  }

  return reviewLinkProps && total
    ? renderAnchorRating(props, itemPropReviewed, itemPropReviewCount)
    : renderRating(props);
};

Rating.propTypes = propTypes;

Rating.defaultProps = defaultProps;

export default Rating;
