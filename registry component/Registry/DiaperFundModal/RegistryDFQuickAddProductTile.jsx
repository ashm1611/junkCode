import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import ImgSrcSet from '@bbb-app/core-ui/image-src-set';
import { PRODUCT_IMAGE_PLACEHOLDER } from '@bbb-app/constants/appConstants';
import styles from './RegistryDFQuickAddProductTile.css';
import truncateWithEllipses from '../../../../utils/truncateWithEllipses';
import AddToRegistry from '../../../../containers/AddToRegistry/AddToRegistry.async';

const propTypes = {
  item: PropTypes.object,
  hideATRFlag: PropTypes.bool,
  addToRegistryLbl: PropTypes.string,
  addedToRegistryLbl: PropTypes.string,
  isItemAlreadyAddedToRegistry: PropTypes.bool,
  labels: PropTypes.any,
  registryId: PropTypes.string,
  isAddToRegistryFetching: PropTypes.bool,
  isAddingQuickAddItemToList: PropTypes.bool,
};

export class RegistryDFQuickAddProductTile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isInternationalUser = isInternationalUser();
  }

  getRole = () => {
    if (this.props.isItemAlreadyAddedToRegistry) {
      return 'text';
    }
    return null;
  };

  renderImage = () => {
    const IMAGE_SRC = {
      preset: 'content',
      width: '140',
      height: '140',
    };
    const SRC_SET = [
      {
        preset: 'content',
        width: '140',
        height: '140',
        sourceWidth: '1x',
      },
      {
        preset: 'content',
        width: '140',
        height: '140',
        sourceWidth: '1x',
      },
    ];
    return (
      <ImgSrcSet
        alt={this.displayTitle}
        srcSet={SRC_SET}
        imageSrc={IMAGE_SRC}
        scene7imageID={pathOr('', 'item.SCENE7_URL', this.props)}
        isScene7UrlPrefix
        lazyLoadOptions={{
          offset: 1500,
          placeholder: PRODUCT_IMAGE_PLACEHOLDER,
        }}
        lazyLoad
      />
    );
  };
  render() {
    const {
      item,
      hideATRFlag,
      isItemAlreadyAddedToRegistry,
      isAddToRegistryFetching,
      isAddingQuickAddItemToList,
    } = this.props;
    const DangerousHTML = dangerousHTML(DangerousHTML);
    const {
      DISPLAY_NAME: displayName,
      IS_PRICE: price,
      PRODUCT_ID: productID,
      SKU_ID: skuID,
      SCENE7_URL,
    } = item;
    const imageUrl = [getConcatenatedScene7URLWithImageId(SCENE7_URL)];
    return (
      <div>
        <div>{this.renderImage()}</div>
        <h6 className={classnames(styles.priceStyle, 'pt2')}>{price}</h6>
        <div className={classnames(styles.titleStyle, 'pt1')}>
          <DangerousHTML>{`${truncateWithEllipses({
            str: displayName,
            len: 35,
            isEllipses: true,
          })}`}</DangerousHTML>
        </div>
        {!hideATRFlag && (
          <div className={classnames(styles.marginTop, 'grid-x')}>
            <AddToRegistry
              isLazyLoad={false}
              ltlFlag="false"
              registryId={this.props.registryId}
              registryLabels={this.props.labels.createRegistry}
              skuId={skuID && skuID.toString()}
              prodId={productID ? productID.toString() : ''}
              isCustomizationRequired={false}
              price={price}
              imageUrl={imageUrl}
              ltlShipMethod={null}
              refNum={''}
              isATRRM
              disableATRModal
              selectedProduct={{
                SKU_SCENE7_URL: SCENE7_URL,
                DISPLAY_NAME: displayName,
                SKU_DISPLAY_NAME: displayName,
              }}
              calledFromRegistry
              addToRegistryState={{ data: '', error: '', productId: '' }}
              qty={1}
              ctaType="button"
              quickAddToRegistry
              buttonProps={{
                disabled: !!this.isInternationalUser,

                attr: {
                  variation: isItemAlreadyAddedToRegistry
                    ? 'noTransition'
                    : 'inlineFlex',
                  // eslint-disable-next-line
                  theme: isItemAlreadyAddedToRegistry
                    ? 'primarySuccess'
                    : isAddToRegistryFetching ||
                      isAddingQuickAddItemToList ||
                      this.isInternationalUser
                    ? 'secondaryWhiteDeactivated'
                    : 'secondaryStrokeBasic',

                  className:
                    !isItemAlreadyAddedToRegistry &&
                    (isAddToRegistryFetching || isAddingQuickAddItemToList)
                      ? `${styles.quickAddToRegistryBtnDisabledState}`
                      : `${styles.quickAddToRegistryBtn} ${
                          isAddToRegistryFetching
                            ? styles.quickAddToRegistryButton
                            : ''
                        }`,
                  role: this.getRole(),
                },
                children: isItemAlreadyAddedToRegistry
                  ? this.props.addedToRegistryLbl
                  : this.props.addToRegistryLbl,
              }}
              preventLabelOverride
            />
          </div>
        )}
      </div>
    );
  }
}

RegistryDFQuickAddProductTile.propTypes = propTypes;

export default RegistryDFQuickAddProductTile;
