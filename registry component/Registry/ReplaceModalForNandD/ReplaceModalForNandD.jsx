import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import { ADD_TO_LIST_LBL } from '@bbb-app/constants/registryConstants';
import Certona from '../../../../containers/Certona/Certona.lazy.async';
import styles from './ReplaceModal.css';
import {
  REPLACE_OOS_PRODUCT,
  PDP_SCHEME,
  DEFAULT_COUNT_CERTONA_SKELETON,
  REPLACE_CERTONA_LAYOUT,
} from './constants';

export class ReplaceModalForNandD extends React.PureComponent {
  static propTypes = {
    toggleModalState: PropTypes.func,
    handleNandDReplaceModal: PropTypes.object,
    productId: PropTypes.string,
    certonaConfig: PropTypes.object,
    track: PropTypes.func,
    displayName: PropTypes.string,
    discontinuedProductDetails: PropTypes.object,
    variation: PropTypes.string,
    sortDataByDate: PropTypes.func,
    getReplacedItemData: PropTypes.func,
    eventType: PropTypes.string,
    fireTealiumAction: PropTypes.func,
    hideReplaceModal: PropTypes.func,
    hideReplaceModalState: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      closeModal: false,
    };
    this.toggleATRModalState = this.toggleATRModalState.bind(this);
  }
  componentWillReceiveProps() {
    if (this.props.productId) {
      const CALL_TO_ACTIONTYPE = `registry ${this.props.eventType}`;
      const tealiumTags = {
        call_to_actiontype: CALL_TO_ACTIONTYPE,
        certona_trigger: 'true',
        product_id: this.props.productId,
      };
      this.props.fireTealiumAction('certona product click', tealiumTags, '');
    }
  }
  toggleATRModalState(value) {
    this.setState({ closeModal: value });
    if (!value) {
      this.props.handleNandDReplaceModal(value);
    }
  }

  render() {
    const {
      toggleModalState,
      certonaConfig,
      track,
      displayName,
      productId,
      discontinuedProductDetails,
      variation,
      sortDataByDate,
      getReplacedItemData,
    } = this.props;
    const type = pathOr('', `scheme.${PDP_SCHEME}`, certonaConfig);
    const number = pathOr('', `number.${REPLACE_OOS_PRODUCT}`, certonaConfig);
    const params = { type: `${type}|${number}` };

    const decideModalState = this.state.closeModal ? false : toggleModalState;
    return (
      <ModalDialog
        mountedState={decideModalState}
        toggleModalState={this.toggleATRModalState}
        titleAriaLabel={ADD_TO_LIST_LBL}
        verticallyCenter
        variation={'small'}
        scrollDisabled={false}
        rclModalClass={styles.rclModalMinHeight}
        dialogClass={classnames({ hide: this.props.hideReplaceModalState })}
      >
        <Certona
          nonExperience
          params={params}
          className="mt3"
          certona
          pdp_oos
          productId={productId}
          showIdeaBoards={false}
          buttonLayout={REPLACE_CERTONA_LAYOUT}
          certonaItemsPerSlideVariation={REPLACE_OOS_PRODUCT}
          subHeadingClasses={classnames('mb3', styles.subheading)}
          subHeading
          headerMarginClass="mb1"
          getHeaderFromCdpLabels
          textAlignmentVariation={'left'}
          skeltonStyle={styles.skeltonStyles}
          defaultCountForSkelton={DEFAULT_COUNT_CERTONA_SKELETON}
          track={track}
          showReplaceFromRegistryCTA
          showChoseOptionsCTA
          displayName={displayName}
          toggleModalState={this.toggleATRModalState}
          discontinuedProductDetails={discontinuedProductDetails}
          variation={variation}
          sortDataByDate={sortDataByDate}
          getReplacedItemData={getReplacedItemData}
          hideParent={this.props.hideReplaceModal}
        />
      </ModalDialog>
    );
  }
}

export default ReplaceModalForNandD;
