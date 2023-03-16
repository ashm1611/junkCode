import {
  updateContactAddressModalVisibility,
  updateMovingAddressModalVisibility,
  updateShippingAddressModalVisibility,
} from '../actionsWithReducerInjection';
import {
  UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY,
  UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY,
} from '../constants';

describe(__filename, () => {
  it('should dispatch action updateContactAddressModalVisibility, correctly', () => {
    const isAddAddressVisible = false;
    const expectedResult = {
      type: UPDATE_ADDRESS_QAS_MODAL_CONTACT_VISIBILITY_REGISTRY,
      isAddAddressVisible,
    };
    expect(
      updateContactAddressModalVisibility(isAddAddressVisible)
    ).to.deep.equal(expectedResult);
  });
  it('should dispatch action updateMovingAddressModalVisibility, correctly', () => {
    const isAddAddressVisible = false;
    const expectedResult = {
      type: UPDATE_ADDRESS_QAS_MODAL_MOVING_VISIBILITY_REGISTRY,
      isAddAddressVisible,
    };
    expect(
      updateMovingAddressModalVisibility(isAddAddressVisible)
    ).to.deep.equal(expectedResult);
  });
  it('should dispatch action updateShippingAddressModalVisibility, correctly', () => {
    const isAddAddressVisible = false;
    const expectedResult = {
      type: UPDATE_ADDRESS_QAS_MODAL_SHIPPING_VISIBILITY_REGISTRY,
      isAddAddressVisible,
    };
    expect(
      updateShippingAddressModalVisibility(isAddAddressVisible)
    ).to.deep.equal(expectedResult);
  });
});
