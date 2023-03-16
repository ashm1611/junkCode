import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import isRBYRRegistry from '../utils/isRBYRRegistry';
import { checkItemNeedToExcluded } from '../excludeNeededItem';
import RegistryProductDetails from './RegistryProductDetails';

const propTypes = {
  selectedProduct: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onModalClose: PropTypes.func,
  isQuickViewOpen: PropTypes.bool,
  getLTLDetails: PropTypes.func,
  productVariation: PropTypes.string,
  productUrl: PropTypes.string,
  deviceConfig: PropTypes.object,
  selectedSkuId: PropTypes.string,
  isQuickViewHidden: PropTypes.bool,
  onModalHide: PropTypes.func,
  onPickupInStoreButtonClick: PropTypes.func,
  isPickupInStoreModalOpen: PropTypes.string,
  switchConfigGlobal: PropTypes.object,
  ProductBadgingConfig: PropTypes.object,
  variation: PropTypes.string,
  pageIdentifier: PropTypes.string,
  guestViewerLabels: PropTypes.string,
  resgistryListItems: PropTypes.array,
  giftGiver: PropTypes.bool,
  registryProductInfo: PropTypes.object,
  pageType: PropTypes.string,
  isCompare: PropTypes.bool,
  productCompareData: PropTypes.object,
  miniQuickViewMode: PropTypes.bool,
  preLoadImage: PropTypes.bool,
  profileHasRegistries: PropTypes.bool,
  quickViewError: PropTypes.string,
  registryData: PropTypes.object,
  itemType: PropTypes.object,
  jdaCatName: PropTypes.object,
  sKUDetailVO: PropTypes.object,
  track: PropTypes.func,
  isShowBadge: PropTypes.bool,
};

const defaultProps = {
  selectedProduct: {},
  switchConfigGlobal: {},
  closeModalOnBackDrop: false,
};

function showError(msg) {
  // Todo: needs to be implemented
  /* istanbul ignore next */
  return msg;
}

const getDisableNavToPDP = (
  isRegistryPersonalisedItem,
  personalizationType,
  giftGiver,
  isLtlItem
) => {
  if (!giftGiver) {
    // for owner view
    return false;
  } else if (isRegistryPersonalisedItem || isLtlItem) {
    // for giftgiver PY non personalised and LTL
    return true;
  }
  /* istanbul ignore next */
  return false; // For all normal SKUs
};

export const RegistryDetailModal = ({
  selectedProduct,
  onModalClose,
  isQuickViewOpen,
  onModalHide,
  selectedSkuId,
  switchConfigGlobal,
  variation,
  pageIdentifier,
  giftGiver,
  registryProductInfo,
  isCompare,
  productCompareData,
  preLoadImage,
  profileHasRegistries,
  registryData,
  onPickupInStoreButtonClick,
  ...props
}) => {
  const displayname =
    registryProductInfo.sKUDetailVO &&
    registryProductInfo.sKUDetailVO.displayName;
  const tealiumData = {
    pagename_breadcrumb: `registry product flyout for gift givers: ${displayname}`,
    call_to_actiontype: 'GiftGiver_ProductFlyout',
    product_id: [
      registryProductInfo && registryProductInfo.sKUDetailVO.parentProdId,
    ],
    Reg_Product_View: true,
    registry_add_location: 'Registry Owner',
  };

  const personalizationType = pathOr(
    '',
    'personalizationType',
    registryProductInfo
  );
  const isRegistryPersonalisedItem = pathOr(
    false,
    'isPersonalised',
    registryProductInfo
  );
  const itemType = pathOr('', 'itemType', registryProductInfo);
  const jdaCatName = pathOr('', 'jdaCatName', registryProductInfo);

  const sKUDetailVO = pathOr({}, 'sKUDetailVO', registryProductInfo);

  const isRBYR = pathOr(
    false,
    'registryResVO.registrySummaryVO.storedValueOptIn',
    registryData
  );
  const registrySummaryVO = pathOr(
    {},
    'registryResVO.registrySummaryVO',
    registryData
  );

  const {
    coRegistrantFirstName = '',
    primaryRegistrantFirstName = '',
  } = registrySummaryVO;

  const registryUserName = coRegistrantFirstName
    ? `${primaryRegistrantFirstName} & ${coRegistrantFirstName}`
    : primaryRegistrantFirstName;

  const isRBYRRegistryEnabled = isRBYRRegistry(
    props.guestViewerLabels,
    pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      registryData
    )
  );
  const isLtlItem = pathOr(false, 'isLtlItem', registryProductInfo);
  const isIntlRestricted = JSON.parse(
    pathOr('false', 'INTL_RESTRICTED', selectedProduct)
  );
  const disableNavToPDP = getDisableNavToPDP(
    isRegistryPersonalisedItem,
    personalizationType,
    giftGiver,
    isLtlItem
  );
  const productAttributes = pathOr(
    null,
    'quickViewSwatchDetails.data.ATTRIBUTES_JSON',
    props
  );
  return (
    <ErrorBoundary>
      <React.Fragment>
        <div>
          <RegistryProductDetails
            isNeedToExcluded={checkItemNeedToExcluded(
              itemType,
              jdaCatName,
              sKUDetailVO
            )}
            isRBYRItem={isRBYR}
            isRBYRRegistryEnabled={isRBYRRegistryEnabled}
            profileHasRegistries={profileHasRegistries}
            selectedProduct={selectedProduct}
            view="twoColumnLayout"
            quickViewMode={isQuickViewOpen}
            closeModal={onModalClose}
            hideModal={onModalHide}
            showError={showError}
            selectedSkuId={selectedSkuId}
            switchConfigGlobal={switchConfigGlobal}
            variation={variation}
            disableNavToPDP={disableNavToPDP}
            registryProductInfo={registryProductInfo}
            hideIdeaboardIcon={pageIdentifier === 'IdeaboardDetail'}
            isIntlRestricted={isIntlRestricted}
            isCompare={isCompare}
            productAttributes={productAttributes}
            productCompareData={productCompareData}
            preLoadImage={preLoadImage}
            onPickupInStoreButtonClick={onPickupInStoreButtonClick}
            giftGiver={giftGiver}
            {...props}
            labels={props.guestViewerLabels}
            registryUserName={registryUserName}
          />
        </div>
        <TealiumHandler
          identifier="REGISTRY_MODAL_INFO"
          tealiumPageInfoNotAvailable
          utagData={tealiumData}
        />
      </React.Fragment>
    </ErrorBoundary>
  );
};

RegistryDetailModal.propTypes = propTypes;
RegistryDetailModal.defaultProps = defaultProps;

export default withSiteSpectTracker(RegistryDetailModal);
