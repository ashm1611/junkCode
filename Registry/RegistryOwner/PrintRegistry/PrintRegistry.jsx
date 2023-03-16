import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import {
  makeSelectThirdPartyConfig,
  makeSelectLabels,
  makeSelectSwitchConfig,
} from '@bbb-app/selectors/configSelector';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { makeHeaderState } from '@bbb-app/header/containers/selectors';
import PrintRegistryAction from '../../../../../components/Pages/Registry/RegistryOwner/PrintRegistry/PrintRegistryAction';
import { fetchRegistryOwnerItemsFirstCategory } from '../RegistryOwnerItemSagaInjection';
import {
  makeSelectOwnerFirstCategoryList,
  makeSelectOwnerRemainingCategoryTotalPrice,
  getRemainingItemFetchingStatus,
} from '../../RegistryOwner/selectors';
import { makeSelectPickUpDateThreshold } from '../../../PNHChecklist/selectors';
import {
  isPNHChecklistFrozen,
  getRegistryData,
} from '../../../../Pages/CollegeChecklist/ChecklistOwner/selectors';
import { fetchListData } from '../../../CollegeChecklist/ChecklistOwner/ActionsWithSagaInjection';
import { fetchPickUpStore as fetchPickUpStoreAction } from '../../../CollegeChecklist/ActionsWithSagaInjection';
import { makeSelectPickUpStore } from '../../../CollegeChecklist/selectors';
const propTypes = {
  getRegistryOwnerFirstCategory: PropTypes.func,
  labels: PropTypes.object,
  labelsPNH: PropTypes.object,
};

export class PrintRegistry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { getRegistryOwnerFirstCategory, labels, labelsPNH } = this.props;
    return (
      <React.Fragment>
        <ErrorBoundary>
          <PrintRegistryAction
            labels={labels}
            labelsPNH={labelsPNH}
            getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
            {...this.props}
          />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}
export const mapStateToProps = createStructuredSelector({
  header: makeHeaderState,
  labels: makeSelectLabels(['Registry']),
  labelsPNH: makeSelectLabels(['PNHChecklist']),
  registryConfig: makeSelectSwitchConfig(['createRegistry']),
  barCodeConfig: makeSelectThirdPartyConfig(['barcode']),
  PDFConfig: makeSelectThirdPartyConfig(['pdf']),
  registryOwnerFirstCategoryList: makeSelectOwnerFirstCategoryList(),
  pickUpDateThreshold: makeSelectPickUpDateThreshold(),
  isFrozen: isPNHChecklistFrozen(),
  registryData: getRegistryData(),
  remainingCategoryTotalPrice: makeSelectOwnerRemainingCategoryTotalPrice(),
  pickUpStore: makeSelectPickUpStore(),
  isRemainingItemFetching: getRemainingItemFetchingStatus(),
});

export const mapDispatchToProps = dispatch => {
  return {
    onComponentMount(registryId, giftGiver) {
      dispatch(fetchListData(registryId, giftGiver, true));
    },
    fetchPickUpStore: storeId => {
      dispatch(fetchPickUpStoreAction(storeId));
    },
    getRegistryOwnerFirstCategory: (
      registryId,
      eventTypeCode,
      eventDate,
      isDateSort,
      isRegReplace,
      printView
    ) => {
      dispatch(
        fetchRegistryOwnerItemsFirstCategory(
          registryId,
          eventTypeCode,
          eventDate,
          isDateSort,
          isRegReplace,
          printView
        )
      );
    },
  };
};

PrintRegistry.propTypes = propTypes;
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(toJS(PrintRegistry));
