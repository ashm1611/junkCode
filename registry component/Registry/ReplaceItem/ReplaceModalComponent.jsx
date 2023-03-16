import React from 'react';
import PropTypes from 'prop-types';
import ReplaceModalForNandD from '../../../../containers/Pages/Registry/ReplaceModalForNandD/ReplaceModalForNandD';
import QuickViewModalWrapper from '../../../../containers/QuickViewModal/QuickViewModalWrapper/QuickViewModalWrapper.async';

const ReplaceModalComponent = props => {
  return (
    <React.Fragment>
      {props.toggleModalState && (
        <ReplaceModalForNandD
          registrylabels={props.registrylabels}
          toggleModalState={props.toggleModalState}
          handleNandDReplaceModal={props.handleNandDReplaceModal}
          productId={props.productId}
          displayName={props.displayName}
          track={props.track}
          discontinuedProductDetails={props.discontinuedProductDetails}
          variation={props.variation}
          sortDataByDate={props.sortDataByDate}
          qtyPurchased={props.qtyPurchased}
          qtyRemaining={props.qtyRemaining}
          qtyRequested={props.qtyRequested}
          qtyWebPurchased={props.qtyWebPurchased}
          getReplacedItemData={props.getReplacedItemData}
          eventType={props.eventType}
          hideReplaceModal={props.hideReplaceModal}
          hideReplaceModalState={props.hideReplaceModalState}
        />
      )}
      {props.toggleModalState && props.isQuickViewOpen && (
        <QuickViewModalWrapper replaceProps={props.replaceProps} />
      )}
    </React.Fragment>
  );
};

ReplaceModalComponent.propTypes = {
  variation: PropTypes.string,
  track: PropTypes.func,
  sortDataByDate: PropTypes.func,
  isQuickViewOpen: PropTypes.bool,
  toggleModalState: PropTypes.bool,
  registrylabels: PropTypes.object,
  handleNandDReplaceModal: PropTypes.func,
  productId: PropTypes.string,
  displayName: PropTypes.string,
  discontinuedProductDetails: PropTypes.object,
  qtyPurchased: PropTypes.string,
  qtyRemaining: PropTypes.string,
  qtyRequested: PropTypes.string,
  qtyWebPurchased: PropTypes.string,
  getReplacedItemData: PropTypes.func,
  eventType: PropTypes.string,
  hideReplaceModal: PropTypes.func,
  hideReplaceModalState: PropTypes.bool,
  replaceProps: PropTypes.object,
};

export default ReplaceModalComponent;
