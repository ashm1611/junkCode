import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@bbb-app/core-ui/button/CoreButton';
import Icon from '@bbb-app/core-ui/icon';
import '@bbb-app/assets/icons/alert.svg';
import { SORT_LBL } from '../../../Filters/RenderListItem/constants';
/* The accordion panel on the registry owner view to show the discontinued N & D products on mobile */
export const DiscontinuedMobile = ({
  selected,
  listItemProps,
  label,
  count,
  index,
  toggleOpenState,
  stylesMob,
  onClick,
  discontinuedItemCount,
  singleSelection = false,
}) => {
  return (
    <li
      className={classnames(
        stylesMob.listItem,
        stylesMob.listButton,
        singleSelection ? stylesMob.singleSelection : '',
        {
          [stylesMob.listItemSelected]: selected,
        }
      )}
      {...listItemProps}
    >
      <Button
        onClick={e => {
          onClick();
          /* istanbul ignore else */
          if (toggleOpenState) {
            toggleOpenState(e);
          }
        }}
        role={'menuitem'}
        aria-label={`${SORT_LBL} by ${label}`}
        disabled={selected}
        value={index}
      >
        {' '}
        {discontinuedItemCount ? (
          <Icon
            type="alert"
            width="16px"
            height="16px"
            className={classnames('mr1')}
          />
        ) : (
          ''
        )}
        {label}
        {count && `(${parseInt(count, 10).toLocaleString()})`}
      </Button>
    </li>
  );
};

DiscontinuedMobile.propTypes = {
  selected: PropTypes.bool,
  listItemProps: PropTypes.object,
  label: PropTypes.object,
  count: PropTypes.number,
  index: PropTypes.number,
  singleSelection: PropTypes.bool,
  toggleOpenState: PropTypes.bool,
  stylesMob: PropTypes.object,
  onClick: PropTypes.func,
  discontinuedItemCount: PropTypes.bool,
};
