import React from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';

const EmptyCategoryTile = ({ type, className, height, width, focusable }) => (
  <svg
    className={classnames(className)}
    height={height || '571px'}
    width={width || '100%'}
    focusable={focusable}
    tabIndex={focusable === 'false' ? -1 : 0}
    aria-hidden={focusable === 'false'}
    aria-disabled={focusable === 'false'} // For VoiceOver to not call out the image.
    data-locator={`${type}_icon`}
  >
    <use xlinkHref={`#${type}`} />
  </svg>
);

EmptyCategoryTile.propTypes = {
  type: string.isRequired,
  className: string,
  height: string,
  width: string,
  focusable: string,
};

EmptyCategoryTile.defaultProps = {
  focusable: 'false', // Stop SVGs from gaining focus in ie11
};

export default EmptyCategoryTile;
