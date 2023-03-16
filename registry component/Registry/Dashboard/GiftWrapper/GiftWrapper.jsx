import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Paragraph from '@bbb-app/core-ui/paragraph';
import GridY from '@bbb-app/core-ui/grid-y';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import RegistryAnalyzer from '../../../../../containers/Pages/Registry/RegistryAnalyzer/RegistryAnalyzer.async';
import inlineStyles from '../Dashboard.inline.css';
import BookAnAppointment from '../BookAnAppointment/BookAnAppointment.async';

const renderGiftTitleRow = ({ styles, count, title, margin }) => {
  return (
    <Paragraph className={styles.giftAddedCount}>
      <span
        className={classnames(
          styles.giftsNumber,
          styles.h3Serif,
          'mb0 xs-mr2 center',
          margin,
          { [styles.tnGiftsPurchased]: title === 'Ship or Swap' }
        )}
      >
        {count}
      </span>
      <span className={classnames(styles.giftsLabel, 'center')}>{title}</span>
    </Paragraph>
  );
};

const GiftWrapper = ({
  styles,
  giftRegistered,
  giftsAddedLabel,
  giftPurchased,
  giftPurchasedLabel,
  giftSwipSwapLabel,
  registryDetails,
  registrySiteConfig,
  isMobile,
  mPulseEnabled,
  isInternationalUser,
  redirectMyFundPage,
  track,
  isRenderBookAnAppointment,
}) => {
  const REG_ANALYZER_MAX_ITEM_COUNT = pathOr(
    500,
    'regAnalyzerMaxItemNo',
    registrySiteConfig
  );

  const tnGiftsPurchased = pathOr(
    0,
    `registryVO.tnGiftsPurchased`,
    registryDetails
  );

  const registryType = pathOr(
    '',
    `registrySummaryVO.eventType`,
    registryDetails
  );
  return (
    <GridY>
      <GridX
        className={classnames(styles.giftWrapper, inlineStyles.registryStats, {
          [inlineStyles.regWithFunds]: tnGiftsPurchased > 0,
        })}
      >
        <Cell
          className={classnames(
            styles.giftRegistered,
            'small-6 large-6 center'
          )}
          data-locator="registry-addedbtn"
        >
          {renderGiftTitleRow({
            styles,
            count: giftRegistered,
            title: giftsAddedLabel,
            margin: 'mt2',
          })}
        </Cell>
        <Cell className="small-6 large-6 center">
          {renderGiftTitleRow({
            styles,
            count: giftPurchased,
            title: giftPurchasedLabel,
            margin: 'mt2',
          })}
        </Cell>
        {mPulseEnabled && (
          <Instrumentation
            zoneName={'ux-secondary-content-displayed'}
            markName={'ux-text-item-requested'}
          />
        )}
        {tnGiftsPurchased > 0 && (
          <Cell
            className="small-6 large-6 center"
            data-locator="registry-tnGiftsPurchased"
          >
            <PrimaryLink
              href="#"
              onClick={redirectMyFundPage}
              type="noUnderline"
            >
              {renderGiftTitleRow({
                styles,
                count: tnGiftsPurchased,
                title: giftSwipSwapLabel,
                margin: 'mt2',
              })}
            </PrimaryLink>
            {mPulseEnabled && (
              <Instrumentation
                zoneName={'ux-secondary-content-displayed'}
                markName={'ux-text-item-purchased'}
              />
            )}
          </Cell>
        )}
      </GridX>
      {giftRegistered > REG_ANALYZER_MAX_ITEM_COUNT ||
      isInternationalUser ||
      isRenderBookAnAppointment ||
      registryType.includes('University') ? null : (
        <RegistryAnalyzer registryDetails={registryDetails} />
      )}

      {isRenderBookAnAppointment && <BookAnAppointment track={track} />}

      {isMobile}
    </GridY>
  );
};

GiftWrapper.propTypes = {
  giftRegistered: PropTypes.number,
  giftsAddedLabel: PropTypes.string,
  giftPurchased: PropTypes.number,
  giftPurchasedLabel: PropTypes.string,
  giftSwipSwapLabel: PropTypes.string,
  styles: PropTypes.object,
  registryDetails: PropTypes.object,
  registrySiteConfig: PropTypes.object,
  isMobile: PropTypes.bool,
  mPulseEnabled: PropTypes.bool,
  isInternationalUser: PropTypes.bool,
  redirectMyFundPage: PropTypes.func,
  track: PropTypes.func,
  isRenderBookAnAppointment: PropTypes.bool,
};

renderGiftTitleRow.propTypes = {
  styles: PropTypes.object,
  count: PropTypes.string,
  title: PropTypes.string,
  margin: PropTypes.string,
};

export default GiftWrapper;
