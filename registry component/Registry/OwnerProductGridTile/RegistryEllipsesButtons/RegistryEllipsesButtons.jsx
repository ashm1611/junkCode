import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import CustomHTMLTooltip from '@bbb-app/core-ui/custom-html-tooltip/CustomHTMLTooltip';
import styles from './RegistryEllipsesButtons.css';
import '../../../../../assets/icons/bbb-Bluepencil.svg';
import '../../../../../assets/icons/bbb-Bluetrash.svg';
import '../../../../../assets/icons/bbBABY-Cyantrash.svg';
import '../../../../../assets/icons/bbBABY-Cyanpencil.svg';
import { EDIT_LBL, REMOVE_LBL } from '../constants';

/**
 * This component is responsible for rendering Edit and Removal modal when hover on ellipses button on Registrant Page.
 * @author Divya Gupta | divya.gupta1@idc.bedbath.com
 */

const propTypes = {
  removeRegistry: PropTypes.func,
  isBabySite: PropTypes.bool,
  onQuickViewButtonClick: PropTypes.func,
};

export const RegistryEllipsesButtons = ({
  isBabySite,
  removeRegistry,
  onQuickViewButtonClick,
}) => {
  return (
    <div className={classnames('absolute', styles.container)}>
      <CustomHTMLTooltip
        outerDivId="customTooltipellpises"
        id="customTooltipellpisesWrapper"
        className={styles.showToolTip}
      >
        <div className={styles.mainEditcontainer} data-locator="editflyout">
          <ul>
            <PrimaryLink
              href="#"
              className={classnames([styles.RemoveContainer, 'folHard'])}
              onClick={onQuickViewButtonClick}
              type="noUnderline"
              id="editflyout"
            >
              <li>
                <Icon
                  type={isBabySite ? 'bbBABY-Cyanpencil' : 'bbb-Bluepencil'}
                  width="21px"
                  height="20px"
                  className={classnames(styles.EditIcon)}
                  tabIndex={-1}
                />
                <Button
                  theme=""
                  variation=""
                  className={classnames(styles.editCTA)}
                >
                  <span
                    data-locator="edittext"
                    className={classnames(styles.edittext)}
                  >
                    {EDIT_LBL}
                  </span>
                </Button>
              </li>
            </PrimaryLink>

            <hr className="m0" />
            <PrimaryLink
              href="#"
              className={classnames([styles.RemoveContainer, 'folHard'])}
              onClick={removeRegistry}
              type="noUnderline"
            >
              <li>
                <Icon
                  type={isBabySite ? 'bbBABY-Cyantrash' : 'bbb-Bluetrash'}
                  width="16px"
                  height="19px"
                  className={styles.EditIcon}
                  tabIndex={-1}
                />
                <Button theme="" variation="" className={styles.RemoveCTA}>
                  <span data-locator="Removetext" className={styles.edittext}>
                    {REMOVE_LBL}
                  </span>
                </Button>
              </li>
            </PrimaryLink>
          </ul>
        </div>
      </CustomHTMLTooltip>
    </div>
  );
};

RegistryEllipsesButtons.propTypes = propTypes;
export default RegistryEllipsesButtons;
