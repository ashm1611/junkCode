import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ButtonComponent from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import '@bbb-app/assets/icons/alert.svg';
import styles from '../FilterItems/FilterItems.css';
import { DISCONTINUED } from './constants';

/* The tab on the registry owner view to show the discontinued N & D products on desktop */
export const DiscontinuedDesktop = ({
  id,
  filter,
  isActive,
  changeFilter,
  stylesDesktop,
  discontinuedItemCount,
}) => {
  return (
    <li className={stylesDesktop.buttonwrapper}>
      {discontinuedItemCount ? (
        <Icon
          type="alert"
          width="16px"
          height="16px"
          className={classnames(stylesDesktop.dangerIcon)}
        />
      ) : (
        ''
      )}
      <ButtonComponent
        id={id}
        className={classnames(
          styles.buttonLabel,
          stylesDesktop.buttonaction,
          discontinuedItemCount && styles.discontinuedLabel
        )}
        data-locator={filter.dataLocator}
        onClick={() => {
          changeFilter(DISCONTINUED);
        }}
        theme="control"
        aria-label={`filter ${filter.label}`}
        aria-pressed={isActive}
      >
        {filter.label}
      </ButtonComponent>
    </li>
  );
};

DiscontinuedDesktop.propTypes = {
  id: PropTypes.number,
  filter: PropTypes.object,
  isActive: PropTypes.bool,
  changeFilter: PropTypes.func,
  stylesDesktop: PropTypes.object,
  discontinuedItemCount: PropTypes.bool,
};
