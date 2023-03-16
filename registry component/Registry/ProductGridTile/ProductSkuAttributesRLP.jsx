import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import classnames from 'classnames';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import { getShippingThresholdValue } from '@bbb-app/utils/abtests/shippingPromoTestUtil';
import style from '../RegistryDetailModal/RegistryDetailModalUtil/RegistryDetailModalUtil.css';

const propTypes = {
  sKUDetailVO: PropTypes.object.isRequired,
  refNum: PropTypes.string,
  freeShippingMessage: PropTypes.string,
};

const ProductSkuAttributesRLP = props => {
  const sortInPriorityOrder = () => {
    const result = RLP.sort((a, b) => {
      const t = parseInt(a.priority, 10);
      const x = parseInt(b.priority, 10);
      return t - x;
    });

    return result;
  };

  const RLP = pathOr([], 'skuAttributes.RLP', props.sKUDetailVO);
  /* istanbul ignore next */
  const MessageContainer = propsMessage => (
    <span
      className={classnames(style.productAttr)}
      tabIndex="0"
      data-locator={'registry-quick-view-item-attribute'}
      {...propsMessage}
    />
  );

  const MessageWithDangerousHTML = dangerousHTML(MessageContainer);

  const isLtlItem = props.sKUDetailVO && props.sKUDetailVO.ltlItem;
  const refNum = props.refNum;

  if (isLtlItem || !isEmpty(refNum)) {
    return null;
  }

  return RLP.length > 0 ? (
    <div
      className={classnames(style.productAttr)}
      data-locator={'registry-quick-view-item-attribute'}
    >
      <MessageWithDangerousHTML>
        {sortInPriorityOrder()[0].attributeDescrip}
      </MessageWithDangerousHTML>
    </div>
  ) : (
    <div
      className={classnames(style.productAttr)}
      data-locator={'registry-quick-view-item-attribute'}
    >
      <MessageWithDangerousHTML>
        {props.sKUDetailVO.displayShipMsg
          ? LabelsUtil.replacePlaceholderValues(props.freeShippingMessage, [
              getShippingThresholdValue(),
            ])
          : ''}
      </MessageWithDangerousHTML>
    </div>
  );
};

ProductSkuAttributesRLP.propTypes = propTypes;

export default ProductSkuAttributesRLP;
