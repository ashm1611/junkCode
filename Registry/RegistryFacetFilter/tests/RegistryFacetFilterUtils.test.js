import { getFacets } from '../RegistryFacetFilterUtils';

describe(__filename, () => {
  it('should return with getFacets', () => {
    const selectedFilters = {
      event_type: ['brd'],
      searchable_state_code: [
        {
          key: 'brd',
        },
      ],
      event_month: [],
      event_year: [],
    };
    const facets = getFacets(selectedFilters);
    expect(facets).to.be.a('object');
  });
});
