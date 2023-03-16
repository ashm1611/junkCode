# `app/components/Pages/Registry/RegistryFacetFilterList/tests/RegistryFacetFilterList.test.jsx`

## `methods test cases`

####   `should update snapshot with selectedItems empty  `

```
<RegistryFacetFilterList
  collapseDropdown={false}
  dropdownIsOpen={false}
  facetsData={
    Array [
      Object {
        "count": Object {
          "SKU_ID": Array [
            "62238991",
            "65493120",
          ],
          "id": "GiftsPurchased",
          "key": "GiftsPurchased",
          "label": "Gifts PurchasedN",
        },
        "label": Object {
          "SKU_ID": Array [
            "63364576",
          ],
          "id": "GiftsWanted",
          "key": "GiftsWanted",
          "label": "Gifts Wanted",
        },
        "selected": false,
        "value": Object {
          "SKU_ID": Array [
            "63364576",
          ],
          "id": "GiftsWanted",
          "key": "GiftsWanted",
          "label": "Gifts Wanted",
        },
      },
    ]
  }
  id="sort"
  onSelectionUpdate={[Function]}
  searchable={true}
  selectedItems=""
>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <div
      aria-haspopup="true"
      className="filterList mgRight filterBtnWrapper pb1"
      onMouseLeave={[Function]}
      tabIndex="0"
    >
      <FilterButton
        aria-controls="sort"
        aria-expanded={true}
        aria-haspopup="true"
        data-locator="registry-guest-sort-filter"
        icon="caret"
        isSelected={true}
        onClick={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        onMouseOver={[Function]}
        styles=""
        type="button"
        variationName="default"
      >
        <button
          aria-controls="sort"
          aria-expanded={true}
          aria-haspopup="true"
          className="filterButton inlineFilterButton selected"
          data-locator="registry-guest-sort-filter"
          onClick={[Function]}
          onFocus={[Function]}
          onKeyDown={[Function]}
          onMouseOver={[Function]}
          type="button"
        >
          <Icon
            focusable="false"
            height="8"
            type="caret"
            width="16"
          >
            <svg
              aria-disabled={true}
              aria-hidden={true}
              className="icon"
              data-locator="caret_icon"
              focusable="false"
              height="8"
              tabIndex={-1}
              width="16"
            >
              <use
                xlinkHref="#caret"
              />
            </svg>
          </Icon>
        </button>
      </FilterButton>
      <div
        className="dropdown sortDropdown __test__filterListDropDownWrapper"
        id="sort"
        tabIndex="-1"
      >
        <UniversalComponent
          accessibilityEventHandler={[Function]}
          closeContainer={[Function]}
          facetsData={
            Array [
              Object {
                "count": Object {
                  "SKU_ID": Array [
                    "62238991",
                    "65493120",
                  ],
                  "id": "GiftsPurchased",
                  "key": "GiftsPurchased",
                  "label": "Gifts PurchasedN",
                },
                "label": Object {
                  "SKU_ID": Array [
                    "63364576",
                  ],
                  "id": "GiftsWanted",
                  "key": "GiftsWanted",
                  "label": "Gifts Wanted",
                },
                "selected": false,
                "value": Object {
                  "SKU_ID": Array [
                    "63364576",
                  ],
                  "id": "GiftsWanted",
                  "key": "GiftsWanted",
                  "label": "Gifts Wanted",
                },
              },
            ]
          }
          grouped={false}
          id="sort"
          isRegistrySortItems={true}
          onSelectionUpdate={[Function]}
          selectedItems={Array []}
          showTypeAhead={false}
          toggleOpenState={[Function]}
        >
          <RenderListItems
            accessibilityEventHandler={[Function]}
            appliedFiltersOrderedSet={null}
            className=""
            closeContainer={[Function]}
            displayPLPFilters={false}
            facetsData={
              Array [
                Object {
                  "count": Object {
                    "SKU_ID": Array [
                      "62238991",
                      "65493120",
                    ],
                    "id": "GiftsPurchased",
                    "key": "GiftsPurchased",
                    "label": "Gifts PurchasedN",
                  },
                  "label": Object {
                    "SKU_ID": Array [
                      "63364576",
                    ],
                    "id": "GiftsWanted",
                    "key": "GiftsWanted",
                    "label": "Gifts Wanted",
                  },
                  "selected": false,
                  "value": Object {
                    "SKU_ID": Array [
                      "63364576",
                    ],
                    "id": "GiftsWanted",
                    "key": "GiftsWanted",
                    "label": "Gifts Wanted",
                  },
                },
              ]
            }
            grouped={false}
            id="sort"
            isRegistrySortItems={true}
            modalIcon={null}
            onSelectionUpdate={[Function]}
            selectedFilters={Object {}}
            selectedItems={Array []}
            showTypeAhead={false}
            toggleOpenState={[Function]}
          >
            <ul
              className=""
              role="menu"
            />
          </RenderListItems>
        </UniversalComponent>
      </div>
    </div>
  </ErrorBoundary>
</RegistryFacetFilterList>
```

