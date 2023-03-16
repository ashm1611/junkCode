import isMultiSku from '../../../../../utils/isMultiSku';
const FlipflopUtil = {
  /**
   * return SOLR data filtered on some contitions
   */
  getFilteredDataFlipFlop(flipFlopData) {
    const {
      flipFlopItemsList,
      arrFlipFlopItemsListData,
      thresholdAPITrigger,
      isGroupByFlipFlopEnable,
    } = flipFlopData;
    let arrFlipFlopItemsList = arrFlipFlopItemsListData;
    let formattedFlipFlopItemsList = [];
    let tempThresholdCount;

    formattedFlipFlopItemsList = isGroupByFlipFlopEnable
      ? flipFlopItemsList.filter(
          arrFlipFlopItem =>
            arrFlipFlopItem.COLLECTION_FLAG === '0' &&
            (arrFlipFlopItem.CUSTOMIZATION_OFFERED_FLAG === undefined ||
              arrFlipFlopItem.CUSTOMIZATION_OFFERED_FLAG[0] === 'No') &&
            !isMultiSku(
              arrFlipFlopItem.ROLLUP_TYPE_CODE,
              arrFlipFlopItem.COLLECTION_FLAG
            )
        )
      : flipFlopItemsList.filter(
          arrFlipFlopItem =>
            arrFlipFlopItem.COLLECTION_FLAG === '0' &&
            (arrFlipFlopItem.PERSONALIZATION_TYPE === undefined ||
              arrFlipFlopItem.PERSONALIZATION_TYPE[0] === 'N') &&
            !isMultiSku(
              arrFlipFlopItem.ROLLUP_TYPE_CODE,
              arrFlipFlopItem.COLLECTION_FLAG
            )
        );

    if (arrFlipFlopItemsList !== null) {
      arrFlipFlopItemsList = arrFlipFlopItemsList.toJS();
      tempThresholdCount = +arrFlipFlopItemsList.length - thresholdAPITrigger;
      arrFlipFlopItemsList.splice(
        0,
        tempThresholdCount <= 0 ? 1 : tempThresholdCount
      );
      arrFlipFlopItemsList = arrFlipFlopItemsList.concat(
        formattedFlipFlopItemsList
      );
    } else {
      arrFlipFlopItemsList = formattedFlipFlopItemsList;
    }

    return arrFlipFlopItemsList;
  },
};

export default FlipflopUtil;
