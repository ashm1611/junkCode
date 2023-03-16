import { fromJS } from 'immutable';
import {
  formatRegistryFacetData,
  updateFacetFiterData,
} from '../formatFacetFilters';

describe(__filename, () => {
  it('should return all filters values need to render', () => {
    const data = {
      statusFilter: [
        {
          label: 'Gifts Purchased',
        },
        {
          label: 'Gifts Wanted',
        },
      ],
      priceFilter: [
        {
          label: '$1 - $25',
        },
      ],
      categoryFilter: [
        {
          label: 'BEDDING',
        },
      ],
    };
    const array = formatRegistryFacetData({
      statusFilter: data.statusFilter,
      categoryFilter: data.categoryFilter,
      priceFilter: data.priceFilter,
    });
    expect(array.length).to.be.equal(4);
  });

  it('should call updateFacetFiterData and return empty array', () => {
    const wrapper = updateFacetFiterData(fromJS({}), [], {
      statusFilterData: [],
      priceFilterData: [],
      categoryFilterData: [],
    });
    expect(wrapper).to.deep.equal([]);
  });
});
