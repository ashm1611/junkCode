import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Paragraph from '@bbb-app/core-ui/paragraph';
import isBrowser from '@bbb-app/utils/isBrowser';
import GridY from '@bbb-app/core-ui/grid-y';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import BarCodeComponent from '../../../BarCodeComponent/BarCodeComponent';

const renderGiftTitleRow = ({ styles, count, title, margin }) => {
  return (
    <Paragraph>
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
  registryDetails,
  barCodeConfig,
  PDFConfig,
  isMobile,
  barcodeModalText,
  isBarcodeEnabled,
  mPulseEnabled,
}) => {
  const tnGiftsPurchased = pathOr(
    0,
    `registryVO.tnGiftsPurchased`,
    registryDetails
  );
  const count = tnGiftsPurchased
    ? parseInt(giftPurchased, 10) + parseInt(tnGiftsPurchased, 10)
    : giftPurchased;
  return (
    <GridY>
      <GridX className={classnames(styles.giftWrapper, 'mb2 mt2')}>
        <Cell
          className={classnames(
            styles.giftGiverRegistered,
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
            count,
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
      </GridX>
      {isBrowser() && isBarcodeEnabled && isMobile && (
        <BarCodeComponent
          registryId={registryDetails.registryId}
          barCodeConfig={barCodeConfig}
          PDFConfig={PDFConfig}
          barcodeModalText={barcodeModalText}
        />
      )}
      {isMobile}
    </GridY>
  );
};

GiftWrapper.propTypes = {
  giftRegistered: PropTypes.number,
  giftsAddedLabel: PropTypes.string,
  giftPurchased: PropTypes.number,
  giftPurchasedLabel: PropTypes.string,
  styles: PropTypes.object,
  registryDetails: PropTypes.object,
  barCodeConfig: PropTypes.object,
  PDFConfig: PropTypes.object,
  isMobile: PropTypes.bool,
  isBarcodeEnabled: PropTypes.bool,
  barcodeModalText: PropTypes.object,
  mPulseEnabled: PropTypes.bool,
};

renderGiftTitleRow.propTypes = {
  styles: PropTypes.object,
  count: PropTypes.string,
  title: PropTypes.string,
  margin: PropTypes.string,
};

export default GiftWrapper;
