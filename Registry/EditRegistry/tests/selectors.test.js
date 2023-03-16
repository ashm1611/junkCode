import { fromJS } from 'immutable';
import {
  makeSelectQASContactModalState,
  makeSelectQASMovingModalState,
  makeSelectQASShippingModalState,
  getFetchingEditRegistryDetailStatus,
  selectTimerFlag,
  selectEditRegistryData,
  editChecklistModalOpen,
  editModalOpen,
  getEditRegistryError,
  EditModalClick,
  getTymTabClickStatus,
  makeSelectCreateRegistryLabels,
} from '../selectors';

describe(__filename, () => {
  it('should select isContactAddressModalVisible state', () => {
    const state = fromJS({
      editRegistryDetails: {
        isContactAddressModalVisible: false,
      },
    });
    const selectors = makeSelectQASContactModalState();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should select isMovingAddressModalVisible state', () => {
    const state = fromJS({
      editRegistryDetails: {
        isMovingAddressModalVisible: false,
      },
    });
    const selectors = makeSelectQASMovingModalState();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should select isContactAddressModalVisible state', () => {
    const state = fromJS({
      editRegistryDetails: {
        isShippingAddressModalVisible: false,
      },
    });
    const selectors = makeSelectQASShippingModalState();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should select isFetchingEditRegistryDetails state', () => {
    const state = fromJS({
      editRegistryDetails: {
        isFetchingEditRegistryDetails: false,
      },
    });
    const selectors = getFetchingEditRegistryDetailStatus();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should select timerInactivity state', () => {
    const state = fromJS({
      editRegistryDetails: {
        timerInactivity: false,
      },
    });
    const selectors = selectTimerFlag();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should select editRegistryData state', () => {
    const state = fromJS({
      editRegistryDetails: {
        editRegistryData: {},
      },
    });
    const selectors = selectEditRegistryData();
    expect(selectors(state)).to.deep.equal(fromJS({}));
  });

  it('should not select modalEditMount state if editChecklistDetails undefined', () => {
    const state = fromJS({});
    const selectors = editChecklistModalOpen();
    expect(selectors(state)).to.deep.equal(false);
  });
  it('should select modalEditMount state', () => {
    const state = fromJS({
      editChecklistDetails: {
        modalEditMount: false,
      },
    });
    const selectors = editChecklistModalOpen();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should not select isEditModalOpen state if editChecklistDetails undefined', () => {
    const state = fromJS({});
    const selectors = editModalOpen();
    expect(selectors(state)).to.deep.equal(false);
  });
  it('should select modalEditMount state', () => {
    const state = fromJS({
      editRegistryDetails: {
        isEditModalOpen: false,
      },
    });
    const selectors = editModalOpen();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should select editModalError state', () => {
    const state = fromJS({
      editRegistryDetails: {
        editModalError: null,
      },
    });
    const selectors = getEditRegistryError();
    expect(selectors(state)).to.deep.equal(null);
  });

  it('should select modalEditMount state', () => {
    const state = fromJS({
      editRegistryDetails: {
        modalEditMount: false,
      },
    });
    const selectors = EditModalClick();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('should select isTymTabClicked state', () => {
    const state = fromJS({
      editRegistryDetails: {
        isTymTabClicked: false,
      },
    });
    const selectors = getTymTabClickStatus();
    expect(selectors(state)).to.deep.equal(false);
  });

  it('makeSelectCreateRegistryLabels: should select CreateRegistryLabels', () => {
    const state = fromJS({
      labels: {
        Registry: { createRegistry: {} },
      },
    });
    const selectors = makeSelectCreateRegistryLabels();
    expect(selectors(state)).to.deep.equal(fromJS({}));
  });
});
