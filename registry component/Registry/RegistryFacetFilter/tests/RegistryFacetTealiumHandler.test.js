import { getFiltersTealiumData } from '../RegistryFacetTealiumHandler';

describe(__filename, () => {
  it('should call getFiltersTealiumData with facetID as status', () => {
    const facetId = 'status';
    const isOwnerView = false;
    const checkBoxChecked = false;
    const selectedCheckboxFilter = 'in-stock-online';
    const selectedFilters = {
      status: 'abc',
    };
    const singleSelection = {
      label: 'abc',
    };

    const wrapper = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView,
      checkBoxChecked
    );
    expect(wrapper.filter_location_type).to.equal('Status');
  });

  it('should call getFiltersTealiumData facedId as price ', () => {
    const facetId = 'price';
    const isOwnerView = false;
    const checkBoxChecked = false;
    const selectedCheckboxFilter = 'store-pickup';
    const selectedFilters = {
      price: '100',
    };
    const singleSelection = {
      label: 'abc',
    };

    const wrapper = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView,
      checkBoxChecked
    );
    expect(wrapper.filter_location_type).to.equal('Price');
  });

  it('should call getFiltersTealiumData facedId as categories ', () => {
    const facetId = 'categories';
    const isOwnerView = false;
    const checkBoxChecked = false;
    const selectedCheckboxFilter = 'store-pickup';
    const selectedFilters = {
      categories: 'abc',
    };
    const singleSelection = {
      label: 'abc',
    };

    const wrapper = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView,
      checkBoxChecked
    );
    expect(wrapper.filter_location_type).to.equal('Categories');
  });
  it('should call getFiltersTealiumData facedId as sort and singleSelection as hightolow ', () => {
    const facetId = 'sort';
    const isOwnerView = false;
    const checkBoxChecked = false;
    const selectedCheckboxFilter = 'store-pickup';
    const selectedFilters = {
      sort: 'hightolow',
    };
    const singleSelection = {
      key: 'hightolow',
    };

    const wrapper = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView,
      checkBoxChecked
    );
    expect(wrapper.sort_value).to.equal('Price: High to Low');
  });
  it('should call getFiltersTealiumData facedId as sort and singleSelection as lowtohigh ', () => {
    const facetId = 'sort';
    const isOwnerView = false;
    const checkBoxChecked = false;
    const selectedCheckboxFilter = 'store-pickup';
    const selectedFilters = {
      sort: 'lowtohigh',
    };
    const singleSelection = {
      key: 'lowtohigh',
    };

    const wrapper = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView,
      checkBoxChecked
    );
    expect(wrapper.sort_value).to.equal('Price: Low to High');
  });
  it('should call getFiltersTealiumData facedId as sort and singleSelection as default ', () => {
    const facetId = 'sort';
    const isOwnerView = true;
    const checkBoxChecked = false;
    const selectedCheckboxFilter = 'store-pickup';
    const selectedFilters = {
      sort: 'default',
    };
    const singleSelection = {
      label: 'abc',
    };

    const wrapper = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView,
      checkBoxChecked
    );
    expect(wrapper.sort_value).to.equal('Recently Added');
  });
  it('should call getFiltersTealiumData facedId as sort and isOwnerView as false ', () => {
    const facetId = 'sort';
    const isOwnerView = false;
    const checkBoxChecked = false;
    const selectedCheckboxFilter = 'store-pickup';
    const selectedFilters = {
      sort: 'default',
    };
    const singleSelection = {
      label: 'abc',
    };

    const wrapper = getFiltersTealiumData(
      facetId,
      selectedFilters,
      singleSelection,
      selectedCheckboxFilter,
      isOwnerView,
      checkBoxChecked
    );
    expect(wrapper.sort_value).to.equal('Recommended');
  });
});
