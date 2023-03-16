# `app/components/Pages/Registry/RegistryFacetFilter/tests/RegistryFacetFilter.test.jsx`

#### `should render correctly`

```
<PureComponent(GridContainer)>
  <Connect(wrapper)
    minWidth={1024}
  >
    <RenderFacetsCheckbox
      handleToggleAllFilters={[Function]}
      isMobile={true}
    />
    <section
      arial-label="filters for items"
      className="filtersViewport pl1 inline-block"
      role="region"
    >
      <div
        className="pt2 filterFacetItems channel-type-undefined filtersWrapper"
      >
        <div
          className="facetView mr-auto"
        >
          <RegistryFacetFilterList
            collapseDropdown={false}
            data={
              Array [
                Object {
                  "label": "Gifts Wanted",
                },
                Object {
                  "label": "Gifts PurchasedN",
                },
              ]
            }
            dropdownIsOpen={false}
            facetsData={
              Array [
                Object {
                  "id": "status",
                  "items": Array [
                    Object {
                      "label": "Gifts Wanted",
                    },
                    Object {
                      "label": "Gifts PurchasedN",
                    },
                  ],
                },
                Object {
                  "id": "price",
                  "items": Array [
                    Object {
                      "label": "$1 - $25",
                    },
                    Object {
                      "label": "$25 - $50",
                    },
                    Object {
                      "label": "$150 - $200",
                    },
                    Object {
                      "label": "$200+",
                    },
                  ],
                },
                Object {
                  "id": "category",
                  "items": Array [
                    Object {
                      "label": "BEDDING",
                    },
                    Object {
                      "label": "CLEANING & ORGANIZATION",
                    },
                    Object {
                      "label": "FINE DINING & GIFTWARE",
                    },
                    Object {
                      "label": "Bath",
                    },
                    Object {
                      "label": "Experience",
                    },
                    Object {
                      "label": "Furniture",
                    },
                  ],
                },
                Object {
                  "id": "sort",
                  "items": Array [
                    Object {
                      "label": "recommended",
                    },
                  ],
                },
              ]
            }
            handleMultipleSelection={[Function]}
            id="status"
            isOwnerView={true}
            isRegistryFlow={true}
            key="facet-0-status"
            onSelectionUpdate={[Function]}
            selectedFilters=""
          />
          <RegistryFacetFilterList
            collapseDropdown={false}
            data={
              Array [
                Object {
                  "label": "$1 - $25",
                },
                Object {
                  "label": "$25 - $50",
                },
                Object {
                  "label": "$150 - $200",
                },
                Object {
                  "label": "$200+",
                },
              ]
            }
            dropdownIsOpen={false}
            facetsData={
              Array [
                Object {
                  "id": "status",
                  "items": Array [
                    Object {
                      "label": "Gifts Wanted",
                    },
                    Object {
                      "label": "Gifts PurchasedN",
                    },
                  ],
                },
                Object {
                  "id": "price",
                  "items": Array [
                    Object {
                      "label": "$1 - $25",
                    },
                    Object {
                      "label": "$25 - $50",
                    },
                    Object {
                      "label": "$150 - $200",
                    },
                    Object {
                      "label": "$200+",
                    },
                  ],
                },
                Object {
                  "id": "category",
                  "items": Array [
                    Object {
                      "label": "BEDDING",
                    },
                    Object {
                      "label": "CLEANING & ORGANIZATION",
                    },
                    Object {
                      "label": "FINE DINING & GIFTWARE",
                    },
                    Object {
                      "label": "Bath",
                    },
                    Object {
                      "label": "Experience",
                    },
                    Object {
                      "label": "Furniture",
                    },
                  ],
                },
                Object {
                  "id": "sort",
                  "items": Array [
                    Object {
                      "label": "recommended",
                    },
                  ],
                },
              ]
            }
            handleMultipleSelection={[Function]}
            id="price"
            isOwnerView={true}
            isRegistryFlow={true}
            key="facet-1-price"
            onSelectionUpdate={[Function]}
            selectedFilters=""
          />
          <RegistryFacetFilterList
            collapseDropdown={false}
            data={
              Array [
                Object {
                  "label": "BEDDING",
                },
                Object {
                  "label": "CLEANING & ORGANIZATION",
                },
                Object {
                  "label": "FINE DINING & GIFTWARE",
                },
                Object {
                  "label": "Bath",
                },
                Object {
                  "label": "Experience",
                },
                Object {
                  "label": "Furniture",
                },
              ]
            }
            dropdownIsOpen={false}
            facetsData={
              Array [
                Object {
                  "id": "status",
                  "items": Array [
                    Object {
                      "label": "Gifts Wanted",
                    },
                    Object {
                      "label": "Gifts PurchasedN",
                    },
                  ],
                },
                Object {
                  "id": "price",
                  "items": Array [
                    Object {
                      "label": "$1 - $25",
                    },
                    Object {
                      "label": "$25 - $50",
                    },
                    Object {
                      "label": "$150 - $200",
                    },
                    Object {
                      "label": "$200+",
                    },
                  ],
                },
                Object {
                  "id": "category",
                  "items": Array [
                    Object {
                      "label": "BEDDING",
                    },
                    Object {
                      "label": "CLEANING & ORGANIZATION",
                    },
                    Object {
                      "label": "FINE DINING & GIFTWARE",
                    },
                    Object {
                      "label": "Bath",
                    },
                    Object {
                      "label": "Experience",
                    },
                    Object {
                      "label": "Furniture",
                    },
                  ],
                },
                Object {
                  "id": "sort",
                  "items": Array [
                    Object {
                      "label": "recommended",
                    },
                  ],
                },
              ]
            }
            handleMultipleSelection={[Function]}
            id="category"
            isOwnerView={true}
            isRegistryFlow={true}
            key="facet-2-category"
            onSelectionUpdate={[Function]}
            selectedFilters=""
          />
          <RegistryFacetFilterList
            collapseDropdown={false}
            data={
              Array [
                Object {
                  "label": "recommended",
                },
              ]
            }
            dropdownIsOpen={false}
            facetsData={
              Array [
                Object {
                  "id": "status",
                  "items": Array [
                    Object {
                      "label": "Gifts Wanted",
                    },
                    Object {
                      "label": "Gifts PurchasedN",
                    },
                  ],
                },
                Object {
                  "id": "price",
                  "items": Array [
                    Object {
                      "label": "$1 - $25",
                    },
                    Object {
                      "label": "$25 - $50",
                    },
                    Object {
                      "label": "$150 - $200",
                    },
                    Object {
                      "label": "$200+",
                    },
                  ],
                },
                Object {
                  "id": "category",
                  "items": Array [
                    Object {
                      "label": "BEDDING",
                    },
                    Object {
                      "label": "CLEANING & ORGANIZATION",
                    },
                    Object {
                      "label": "FINE DINING & GIFTWARE",
                    },
                    Object {
                      "label": "Bath",
                    },
                    Object {
                      "label": "Experience",
                    },
                    Object {
                      "label": "Furniture",
                    },
                  ],
                },
                Object {
                  "id": "sort",
                  "items": Array [
                    Object {
                      "label": "recommended",
                    },
                  ],
                },
              ]
            }
            handleMultipleSelection={[Function]}
            id="sort"
            isOwnerView={true}
            isRegistryFlow={true}
            key="facet-3-sort"
            onSelectionUpdate={[Function]}
            selectedFilters=""
          />
        </div>
      </div>
    </section>
    <div
      className=""
    />
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={1023}
  >
    <div>
      <div
        className="filterBopisLine pt2"
      />
      <RenderFacetsCheckbox
        handleToggleAllFilters={[Function]}
        isMobile={true}
      />
      <div
        className="filterBopisLine"
      />
      <div
        className="filterFacetItems filterFacetItems justify-start"
      >
        <Button
          className="mr1 flex-auto __test__showAllFiltersButton js-showAllFiltersButton buttonLabel"
          data-locator="registry-filter-button"
          onClick={[Function]}
          theme="control"
          type="button"
          value="Filter"
          variation="smallBorderRadius"
        >
          Filter
        </Button>
        <Button
          className="flex-auto buttonLabel"
          data-locator="registry-sort-button"
          onClick={[Function]}
          theme="control"
          type="button"
          value="Sort"
          variation="smallBorderRadius"
        >
          Sort
        </Button>
      </div>
      <div
        className=""
      />
    </div>
  </Connect(wrapper)>
</PureComponent(GridContainer)>
```

#### `should render correctly when enableNewRegDashboard set true`

```
<PureComponent(GridContainer)
  className="bgcolor"
>
  <div
    className="appliedFiltersWrap"
  >
    <div
      className="mt2"
      id="filterNSort"
    >
      <Button
        className={null}
        data-locator="registry-filter-sort-btn"
        iconProps={
          Object {
            "height": "16",
            "type": "filter_icon",
            "width": "16",
          }
        }
        onClick={[Function]}
        theme=""
        variation="noPadding"
      >
        filter & sort
      </Button>
    </div>
    <div
      className="mt2 pl1"
    />
  </div>
</PureComponent(GridContainer)>
```

#### `should call getFiltersFromURL with empty facetsData`

```
<PureComponent(GridContainer)
  className="bgcolor"
>
  <Connect(wrapper)
    minWidth={1024}
  >
    <RenderFacetsCheckbox
      isMobile={true}
    />
    <section
      arial-label="filters for items"
      className="filtersViewport pl1 inline-block"
      role="region"
    >
      <div
        className="pt2 filterFacetItems channel-type-undefined filtersWrapper"
      >
        <div
          className="facetView mr-auto"
        />
      </div>
    </section>
    <div
      className={false}
    />
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={1023}
  >
    <div>
      <div
        className="filterBopisLineNotVisible pt2"
      />
      <RenderFacetsCheckbox
        isMobile={true}
      />
      <div
        className="filterBopisLineNotVisible"
      />
      <div
        className="filterFacetItems filterFacetItems justify-start"
      >
        <Button
          className="mr1 flex-auto __test__showAllFiltersButton js-showAllFiltersButton buttonLabel"
          data-locator="registry-filter-button"
          onClick={[Function]}
          theme="control"
          type="button"
          value="Filter"
          variation="smallBorderRadius"
        >
          Filter
        </Button>
        <Button
          className="flex-auto buttonLabel"
          data-locator="registry-sort-button"
          onClick={[Function]}
          theme="control"
          type="button"
          value="Sort"
          variation="smallBorderRadius"
        >
          Sort
        </Button>
      </div>
      <div
        className={false}
      />
    </div>
  </Connect(wrapper)>
</PureComponent(GridContainer)>
```

