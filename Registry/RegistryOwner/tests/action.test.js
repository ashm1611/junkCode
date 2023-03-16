import { INITIATE_INACTIVITY_MODAL } from '@bbb-app/actions/registryActions';
import {
  FETCH_REGISTRY_DATA,
  FETCH_REGISTRY_DATA_SUCCESS,
  FETCH_REGISTRY_DATA_ERROR,
  REMOVE_REGISTRY_ITEM,
  REMOVE_REGISTRY_ITEM_ERROR,
  REMOVE_REGISTRY_ITEM_SUCCESS,
  UNDO_REMOVE_REGISTRY_ITEM,
  UNDO_REMOVE_REGISTRY_ITEM_SUCCESS,
  UNDO_REMOVE_REGISTRY_ITEM_ERROR,
  MARK_FAV_REGISTRY_ITEM,
  MARK_FAV_REGISTRY_ITEM_SUCCESS,
  MARK_FAV_REGISTRY_ITEM_ERROR,
  RESET_IS_ITEM_FETCHING,
  UPDATE_REMOVE_ITEM_DATA,
  ADD_REGISTRY_FROM_QUICKADD,
  SET_TRACK_FLAG,
  UPDATE_DASHBOARD_DATA,
  UPDATE_RBYR_OPT_IN,
  UPDATE_GROUP_GIFT_OPT_IN,
  SHOWN_REGISTRY_MYANALYZER_BUTTON,
  FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_SUCCESS,
  SET_FACET_DATA,
  GOODY_DETAIL_MODAL,
  EDIT_REGISTRY_FROM_MORE_INFORMATION_BTN,
} from '../constants';
import {
  fetchRegistryDataError,
  removeRegistryItem,
  removeRegistryItemError,
  removeRegistryItemSuccess,
  undoRemoveRegistryItemSuccess,
  undoRemoveRegistryItem,
  undoRemoveRegistryItemError,
  markFavRegistryItemSuccess,
  markFavRegistryItemError,
  fetchRegistryDataSuccess,
  updateRemoveItemData,
  setTrackFlag,
  shownRegistryMyAnalyzerBtn,
  fetchRegistryOwnerRemainingCategorySuccess,
  setFacetData,
  openGoodyBoxModalOpen,
  editRegistryFromMoreInformationBtn,
} from '../actions';
import {
  updateDashboardDataAction,
  initiateInactivityModal,
} from '../RegistryOwnerAction';

import { markFavRegistryItem } from '../MarkFavRegistryItemAction';
import {
  fetchRegistryData,
  updateDashboardData,
  updateRBYROptInInfo,
  updateGroupGiftOptInInfo,
  shownRegistryMyAnalyzerBtn as shownRegistryMyAnalyzerBtnMain,
} from '../RegistryDetailsSagaInjection';
import {
  updatedRegistryFromQuickAdd,
  resetIsItemsFetchingStatus,
} from '../RegistryOwnerItemSagaInjection';

describe('RemoveRegistryActions', () => {
  describe('#removeRegistryItem', () => {
    it('should return the correct type "REMOVE_REGISTRY_ITEM"', () => {
      const productInfo = {};
      const productData = [];
      const updatedSkuId = '';
      const expectedResult = {
        type: REMOVE_REGISTRY_ITEM,
        productInfo,
        productData,
        updatedSkuId,
      };
      expect(
        removeRegistryItem(productInfo, productData, updatedSkuId)
      ).to.deep.equal(expectedResult);
    });
  });
  describe('#removeRegistryItemSuccess', () => {
    it('should return the correct type "REMOVE_REGISTRY_ITEM_SUCCESS"', () => {
      const data = [];
      const updatedSkuId = '';
      const expectedResult = {
        type: REMOVE_REGISTRY_ITEM_SUCCESS,
        data,
        updatedSkuId,
      };
      expect(removeRegistryItemSuccess(data, updatedSkuId)).to.deep.equal(
        expectedResult
      );
    });
  });
  describe('#removeRegistryItemError', () => {
    it('should return the error type with actual error', () => {
      const error = new Error('some error');
      const updatedSkuId = '';
      const expectedResult = {
        type: REMOVE_REGISTRY_ITEM_ERROR,
        error,
        updatedSkuId,
      };
      expect(removeRegistryItemError(error, updatedSkuId)).to.deep.equal(
        expectedResult
      );
    });
  });
});
describe('UndoRemoveRegistryActions', () => {
  describe('#undoRemoveRegistryItem', () => {
    it('should return the correct type "UNDO_REMOVE_REGISTRY_ITEM"', () => {
      const productInfo = {};
      const productData = [];
      const updatedSkuId = '';
      const expectedResult = {
        type: UNDO_REMOVE_REGISTRY_ITEM,
        productInfo,
        productData,
        updatedSkuId,
      };
      expect(
        undoRemoveRegistryItem(productInfo, productData, updatedSkuId)
      ).to.deep.equal(expectedResult);
    });
  });
  describe('#undoRemoveRegistryItemSuccess', () => {
    it('should return the correct type "UNDO_REMOVE_REGISTRY_ITEM_SUCCESS"', () => {
      const data = [];
      const updatedSkuId = '';
      const expectedResult = {
        type: UNDO_REMOVE_REGISTRY_ITEM_SUCCESS,
        data,
        updatedSkuId,
      };
      expect(undoRemoveRegistryItemSuccess(data, updatedSkuId)).to.deep.equal(
        expectedResult
      );
    });
  });
  describe('#undoRemoveRegistryItemError', () => {
    it('should return the error type with actual error', () => {
      const error = new Error('some error');
      const updatedSkuId = '';
      const expectedResult = {
        type: UNDO_REMOVE_REGISTRY_ITEM_ERROR,
        error,
        updatedSkuId,
      };
      expect(undoRemoveRegistryItemError(error, updatedSkuId)).to.deep.equal(
        expectedResult
      );
    });
  });
  describe('#setTrackFlag', () => {
    it('should return the track flag with value', () => {
      const value = 'ABC';
      const expectedResult = {
        type: SET_TRACK_FLAG,
        value,
      };
      expect(setTrackFlag(value)).to.deep.equal(expectedResult);
    });
  });
  describe('#updateDashboardDataAction', () => {
    it('should return the updatedQuantity flag with value', () => {
      const updatedQuantity = 2;
      const expectedResult = {
        type: UPDATE_DASHBOARD_DATA,
        updatedQuantity,
      };
      expect(updateDashboardDataAction(updatedQuantity)).to.deep.equal(
        expectedResult
      );
    });
  });
  describe('#shownRegistryMyAnalyzerBtn', () => {
    it('should return the hasShown flag with value false ', () => {
      const hasShown = false;
      const expectedResult = {
        type: SHOWN_REGISTRY_MYANALYZER_BUTTON,
        hasShown,
      };
      expect(shownRegistryMyAnalyzerBtn()).to.deep.equal(expectedResult);
    });
    it('should return the hasShown flag with value true ', () => {
      const hasShown = true;
      const expectedResult = {
        type: SHOWN_REGISTRY_MYANALYZER_BUTTON,
        hasShown,
      };
      expect(shownRegistryMyAnalyzerBtn(hasShown)).to.deep.equal(
        expectedResult
      );
    });
    it('should return the facet Data ', () => {
      const data = {};
      const expectedResult = {
        type: SET_FACET_DATA,
        data,
      };
      expect(setFacetData(data)).to.deep.equal(expectedResult);
    });
  });
  describe('#fetchRegistryOwnerRemainingCategorySuccess', () => {
    it('should return the hasShown flag with value false ', () => {
      const data = {};
      const isDateSort = false;
      const isRegReplace = false;
      const expectedResult = {
        type: FETCH_REGISTRY_OWNER_REMAINING_CATEGORY_SUCCESS,
        data,
        isDateSort,
        isRegReplace,
      };
      expect(
        fetchRegistryOwnerRemainingCategorySuccess(
          data,
          isDateSort,
          isRegReplace
        )
      ).to.deep.equal(expectedResult);
    });
  });
});
describe('MarkFavRegistryActions', () => {
  describe('#markFavRegistryItem', () => {
    it('should return the correct type "MARK_FAV_REGISTRY_ITEM"', () => {
      const productInfo = {};
      const productData = [];
      const updatedSkuId = '';
      const expectedResult = {
        type: MARK_FAV_REGISTRY_ITEM,
        productInfo,
        productData,
        updatedSkuId,
      };
      expect(
        markFavRegistryItem(productInfo, productData, updatedSkuId)
      ).to.deep.equal(expectedResult);
    });
  });

  describe('#markFavRegistryItemSuccess', () => {
    it('should return the correct type "MARK_FAV_REGISTRY_ITEM_SUCCESS"', () => {
      const data = [];
      const updatedSkuId = '';
      const expectedResult = {
        type: MARK_FAV_REGISTRY_ITEM_SUCCESS,
        data,
        updatedSkuId,
      };
      expect(markFavRegistryItemSuccess(data, updatedSkuId)).to.deep.equal(
        expectedResult
      );
    });
  });
  describe('#markFavRegistryItemError', () => {
    it('should return the error type with actual error', () => {
      const error = new Error('some error');
      const updatedSkuId = '';
      const expectedResult = {
        type: MARK_FAV_REGISTRY_ITEM_ERROR,
        error,
        updatedSkuId,
      };
      expect(markFavRegistryItemError(error, updatedSkuId)).to.deep.equal(
        expectedResult
      );
    });
  });
});

describe('GetRegistriesActions', () => {
  describe('#fetchRegistryData', () => {
    it('should return the correct type "FETCH_REGISTRY_DATA"', () => {
      const registryId = '1111';
      const giftGiver = true;
      const fromRegistryController = true;
      const expectedResult = {
        type: FETCH_REGISTRY_DATA,
        registryId,
        giftGiver,
        fromRegistryController,
      };

      expect(
        fetchRegistryData(registryId, giftGiver, fromRegistryController)
      ).to.deep.equal(expectedResult);
    });
  });

  describe('#fetchRegistryDataSuccess', () => {
    it('should return the correct type "FETCH_REGISTRY_DATA_SUCCESS"', () => {
      const data = {};
      const headers = {};
      const expectedResult = {
        type: FETCH_REGISTRY_DATA_SUCCESS,
        data,
        headers,
      };

      expect(fetchRegistryDataSuccess(data, headers)).to.deep.equal(
        expectedResult
      );
    });
  });

  describe('#fetchRegistryDataError', () => {
    it('should return the error type with actual error', () => {
      const error = new Error('some error');
      const expectedResult = {
        type: FETCH_REGISTRY_DATA_ERROR,
        error,
      };

      expect(fetchRegistryDataError(error)).to.deep.equal(expectedResult);
    });
  });
});

describe('#updatedRegistryFromQuickAdd', () => {
  it('should return the correct type', () => {
    const expectedResult = {
      type: ADD_REGISTRY_FROM_QUICKADD,
    };

    expect(updatedRegistryFromQuickAdd()).to.deep.equal(expectedResult);
  });
});
describe('#initiateInactivityModal', () => {
  const inactivityModalState = true;
  it('should return the correct type', () => {
    const expectedResult = {
      type: INITIATE_INACTIVITY_MODAL,
      inactivityModalState,
    };

    expect(initiateInactivityModal(inactivityModalState)).to.deep.equal(
      expectedResult
    );
  });
});
describe('Reset Is Fetching Prop Action', () => {
  describe('#resetIsItemsFetchingStatus', () => {
    it('should reset the "isItemsFetching"', () => {
      const expectedResult = {
        type: RESET_IS_ITEM_FETCHING,
      };
      expect(resetIsItemsFetchingStatus()).to.deep.equal(expectedResult);
    });
  });
});

describe('#updateRemoveItemData', () => {
  it('Remove Item update action', () => {
    const requestedQuantity = 1;
    const purchasedQuantity = 3;
    const isUndoItem = false;
    const expectedResult = {
      type: UPDATE_REMOVE_ITEM_DATA,
      requestedQuantity,
      purchasedQuantity,
      isUndoItem,
    };
    expect(
      updateRemoveItemData(requestedQuantity, purchasedQuantity, isUndoItem)
    ).to.deep.equal(expectedResult);
  });
});
describe('#openGoodyBoxModalOpen', () => {
  const isGoodyBoxModalOpen = true;
  it('should return the correct type', () => {
    const expectedResult = {
      type: GOODY_DETAIL_MODAL,
      isGoodyBoxModalOpen,
    };

    expect(openGoodyBoxModalOpen(isGoodyBoxModalOpen)).to.deep.equal(
      expectedResult
    );
  });
});

describe('#RegistryDetailsSagaInjection', () => {
  it('#updateDashboardData', () => {
    const updatedQuantity = 2;
    const expectedResult = {
      type: UPDATE_DASHBOARD_DATA,
      updatedQuantity,
    };
    expect(updateDashboardData(updatedQuantity)).to.deep.equal(expectedResult);
  });

  it('#updateRBYROptInInfo', () => {
    const isOptIn = 2;
    const expectedResult = {
      type: UPDATE_RBYR_OPT_IN,
      isOptIn,
    };
    expect(updateRBYROptInInfo(isOptIn)).to.deep.equal(expectedResult);
  });

  it('#updateGroupGiftOptInInfo', () => {
    const isGroupGiftOptIn = true;
    const expectedResult = {
      type: UPDATE_GROUP_GIFT_OPT_IN,
      isGroupGiftOptIn,
    };
    expect(updateGroupGiftOptInInfo(isGroupGiftOptIn)).to.deep.equal(
      expectedResult
    );
  });

  it('#shownRegistryMyAnalyzerBtn', () => {
    const hasShown = false;
    const expectedResult = {
      type: SHOWN_REGISTRY_MYANALYZER_BUTTON,
      hasShown,
    };
    expect(shownRegistryMyAnalyzerBtnMain()).to.deep.equal(expectedResult);
  });
});

describe('#setEditRegistryFromMoreInformation', () => {
  it('should return the value for editing a registry', () => {
    const isEditRegistry = true;
    const expectedResult = {
      type: EDIT_REGISTRY_FROM_MORE_INFORMATION_BTN,
      isEditRegistry,
    };
    expect(editRegistryFromMoreInformationBtn(isEditRegistry)).to.deep.equal(
      expectedResult
    );
  });
});
