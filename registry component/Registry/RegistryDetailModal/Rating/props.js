import { number, string, oneOf, bool } from 'prop-types';

const defaultProps = {
  value: 0,
  reviewsLabel: '',
  isNavigable: true,
  isReviewContainerReq: true,
};

const propTypes = {
  className: string,
  /** Description within the <svg> */
  desc: string,
  /** Title within the <svg> */
  title: string,
  /** Total number of scores (e.g. 100) */
  total: string,
  /** Product review score from 0 to 1 (e.g. 0.75) */
  value: number,
  /** Type of rating component used to determine font-size*/
  type: oneOf(['', 'small']),
  /** Variation of the compnent */
  variation: oneOf(['', 'noBorder']),

  reviewsLabel: string,
  /* If ratings container should be navigable by keyboard - configure tabIndex */
  isNavigable: bool,
  /** Boolean flag to check if right pipe style required or not */
  isReviewContainerReq: bool,
};

export { propTypes as default, defaultProps };
