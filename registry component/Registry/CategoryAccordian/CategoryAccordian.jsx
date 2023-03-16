import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import isEmpty from 'lodash/fp/isEmpty';
import '@bbb-app/assets/icons/minus.svg';
import '@bbb-app/assets/icons/plus.svg';
import styles from './CategoryAccordian.css';
import ProductGrid from '../ProductGrid';
import '../../../../assets/icons/myItemsCard.svg';

const renderAccordionContent = props => {
  const owner = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.primaryRegistrantFirstName',
    props
  );
  const coOwner = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.coRegistrantFirstName',
    props
  );
  const registryId = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.registryId',
    props
  );
  const isMinimumQtyEnabled = pathOr(
    false,
    'globalSwitchConfig.enableMinimumQuantity',
    props
  );
  const { data, deviceConfig, contextPath, onQuickViewButtonClick } = props;
  if (isEmpty(data)) {
    return null;
  }

  return (
    <Fragment>
      <ProductGrid
        deviceConfig={deviceConfig}
        contextPath={contextPath}
        items={data.registryItemList}
        ctaLabels=""
        buttonLayout=""
        onQuickViewButtonClick={onQuickViewButtonClick}
        owner={owner}
        coOwner={coOwner}
        registryId={registryId}
        isMinimumQtyEnabled={isMinimumQtyEnabled}
        {...props}
      />
    </Fragment>
  );
};

export const CategoryAccordian = props => {
  if (!props.data) {
    return null;
  }

  return (
    <div
      className={classnames(
        props.enableNewRegDashboard
          ? styles.accordianParentNew
          : styles.accordianParent,
        'grid-container'
      )}
    >
      {renderAccordionContent(props)}
    </div>
  );
};

CategoryAccordian.propTypes = {
  data: PropTypes.object,
  enableNewRegDashboard: PropTypes.bool,
};

renderAccordionContent.propTypes = {
  deviceConfig: PropTypes.object,
  contextPath: PropTypes.string,
  data: PropTypes.object,
  onQuickViewButtonClick: PropTypes.func,
};

export default CategoryAccordian;
