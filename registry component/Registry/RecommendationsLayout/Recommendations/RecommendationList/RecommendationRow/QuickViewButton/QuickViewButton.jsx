import React from 'react';
import PropTypes from 'prop-types';
import Button from '@bbb-app/core-ui/button';
import styles from './QuickViewButton.css';

/**
 * Helper component for QuickView
 * @param {object} props props for the action button
 * @param {string} props.label label for the button
 * @param {string} props.theme style theme for the button
 * @param {string} props.variation style variation for the button
 * @param {function} props.onClick click handler of the button
 * @param {string} props.icon type attribute of the optional icon
 */
export const QuickViewButton = ({
  label,
  className,
  theme,
  variation,
  onClick,
  iconType,
  href,
}) => {
  const iconProps =
    (iconType && {
      label,
      type: iconType,
      height: '16px',
    }) ||
    null;

  return (
    <div className={styles.quickViewWrapper}>
      <Button
        className={className}
        theme={theme}
        variation={variation}
        onClick={onClick}
        iconProps={iconProps}
        href={href}
      >
        {label}
      </Button>
    </div>
  );
};

QuickViewButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.string,
  variation: PropTypes.string,
  onClick: PropTypes.func,
  iconType: PropTypes.string,
  href: PropTypes.string,
};

export default QuickViewButton;
