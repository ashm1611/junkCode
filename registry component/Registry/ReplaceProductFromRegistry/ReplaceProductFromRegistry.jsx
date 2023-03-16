import classnames from 'classnames';
import { pathOr } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '@bbb-app/core-ui/button';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import styles from './ReplaceProductFromRegistry.css';

/**
 * Render ReplaceProductFromRegistry Compnent
 * @param {Object} props
 */
class ReplaceProductFromRegistry extends React.PureComponent {
  static propTypes = {
    atrWrapperClass: PropTypes.string,
    buttonProps: PropTypes.object,
    replace: PropTypes.bool,
    onQuickViewButtonClick: PropTypes.func,
    intlUser: PropTypes.bool,
    replaceProductFromRegistry: PropTypes.func,
    discontinuedProductDetails: PropTypes.object,
    skuId: PropTypes.string,
    prodId: PropTypes.string,
    price: PropTypes.string,
    parentProductId: PropTypes.string,
    closeModalState: PropTypes.bool,
    sortDataByDate: PropTypes.func,
    getReplacedItemData: PropTypes.func,
    selectedProduct: PropTypes.object,
    hideParent: PropTypes.object,
    toggleModalState: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      redirectToRegistry: false,
      closeModalState: false,
    };
    this.getButtonLayout = this.getButtonLayout.bind(this);
    this.handleReplaceProductFromRegistry = this.handleReplaceProductFromRegistry.bind(
      this
    );
    this.onChooseOptionClick = this.onChooseOptionClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /**
     * Condition If item replaced from Discontinued filter need to re-fetch data again based on the selection sorting type
     * Condition based on the Time Stamp based
     */
    const { toggleModalState } = nextProps;
    if (this.props.closeModalState && !nextProps.closeModalState) {
      this.props.sortDataByDate(true, true);
      toggleModalState(true);
    }
  }

  onChooseOptionClick(event) {
    event.preventDefault();
    this.props.hideParent(true);
    const { onQuickViewButtonClick, prodId } = this.props;
    const swatchDetails = {
      color: null,
      skuId: this.props.skuId,
      ltlMethod: null,
    };
    onQuickViewButtonClick(
      prodId,
      'NORMAL',
      this.props.selectedProduct.SKU_SCENE7_URL,
      null,
      swatchDetails,
      1,
      '',
      undefined,
      true,
      ''
    );
  }

  getButtonLayout = isReplace => {
    const { buttonProps } = this.props;
    const btnTheme = pathOr('', 'attr.theme', buttonProps);
    const buttonLabel = buttonProps.children;
    return isReplace ? (
      <div
        className={classnames(
          styles.replacefromRegistryBtn,
          this.props.atrWrapperClass
        )}
      >
        <Button
          onClick={this.handleReplaceProductFromRegistry}
          theme={btnTheme}
        >
          {buttonLabel}
        </Button>
      </div>
    ) : (
      <div
        className={classnames(
          styles.chooseOptionBtn,
          styles.replacefromRegistryBtn,
          this.props.atrWrapperClass
        )}
      >
        <Button onClick={this.onChooseOptionClick} theme={btnTheme}>
          {buttonLabel}
        </Button>
      </div>
    );
  };

  handleReplaceProductFromRegistry(evt) {
    evt.preventDefault();

    const {
      replaceProductFromRegistry,
      discontinuedProductDetails,
      skuId,
      prodId,
      price,
      parentProductId,
      selectedProduct,
    } = this.props;

    this.props.getReplacedItemData(
      selectedProduct.SKU_SCENE7_URL,
      selectedProduct.DISPLAY_NAME,
      skuId
    );

    const replacedProductDetails = {
      skuId,
      registryName: discontinuedProductDetails.eventType,
      qty: discontinuedProductDetails.qtyRemaining,
      prodId,
      price,
      parentProductId,
      registryId: discontinuedProductDetails.registryId,
    };

    const productData = {
      replacedProductDetails,
      discontinuedProductDetails,
    };

    replaceProductFromRegistry(productData);
  }

  render() {
    return (
      <ErrorBoundary>
        {!this.props.intlUser && this.getButtonLayout(this.props.replace)}
      </ErrorBoundary>
    );
  }
}
export default ReplaceProductFromRegistry;
