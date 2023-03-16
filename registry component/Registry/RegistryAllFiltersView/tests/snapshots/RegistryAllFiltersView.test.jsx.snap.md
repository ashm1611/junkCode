# `app/components/Pages/Registry/RegistryAllFiltersView/tests/RegistryAllFiltersView.test.jsx`

#### `should render correctly`

```
<section
  aria-labelledby="all-filters-section-header-h2"
  className="slideOutWrapper flex justify-between flex-column js-mob-allFiltersView"
  role="region"
>
  <header
    className="header py2 pr2 pl2 flex justify-between"
  >
    <h2
      className="header__heading"
      data-locator="allfilters_registry_headingtext"
      id="all-filters-section-header-h2"
      tabIndex={-1}
    >
      filters
    </h2>
    <span>
      <Button
        aria-label="Fiter Close Button"
        className="header__closeButton js-allFiltersCloseButton fol"
        onClick={[Function]}
        theme="ghost"
        variation="noPadding"
      >
        <Icon
          focusable="false"
          height="16px"
          type="close"
          width="16px"
        />
      </Button>
    </span>
  </header>
  <div
    className="slideOutFiltersList p2 border-box"
  >
    <Accordion
      accordion={true}
      activeItems={
        Array [
          true,
        ]
      }
      className="accordion"
      onChange={[Function]}
    >
      <AccordionItem
        accordion={true}
        className="accordion__item border-top"
        customKey="status"
        expanded={true}
        hideBodyClassName=""
        key="filters-facet-accordion-body-0"
        onClick={[Function]}
      >
        <AccordionItemTitle
          ariaControls=""
          className="accordion__title relative"
          expanded={false}
          hideBodyClassName=""
          id=""
          onClick={[Function]}
          role=""
        >
          <div
            className="accordion__title__wrapper relative px0 py2 m0 left-align"
          >
            <span
              aria-level="3"
              data-locator="registry-owner-status-filter"
              role="heading"
            >
              Status
            </span>
            <span />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody
          className="pt0 px0 pb3 filters-facet-accordion-body-0"
          expanded={false}
          hideBodyClassName="display-none"
          id=""
          role=""
        >
          <UniversalComponent
            accessibilityEventHandler={[Function]}
            data={
              Array [
                Object {
                  "SKU_ID": Array [
                    "63364576",
                  ],
                  "id": "Gifts Wanted",
                  "key": "Gifts Wanted",
                  "label": "Gifts Wanted",
                },
                Object {
                  "SKU_ID": Array [
                    "62238991",
                    "65493120",
                  ],
                  "id": "Gifts Purchased",
                  "key": "Gifts Purchased",
                  "label": "Gifts PurchasedN",
                },
              ]
            }
            facetsData={
              Array [
                Object {
                  "displayName": "Status",
                  "id": "status",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "63364576",
                      ],
                      "id": "Gifts Wanted",
                      "key": "Gifts Wanted",
                      "label": "Gifts Wanted",
                    },
                    Object {
                      "SKU_ID": Array [
                        "62238991",
                        "65493120",
                      ],
                      "id": "Gifts Purchased",
                      "key": "Gifts Purchased",
                      "label": "Gifts PurchasedN",
                    },
                  ],
                },
                Object {
                  "displayName": "Price",
                  "id": "priceFilterMap",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$1 - $25",
                      "key": "$1 - $25",
                      "label": "$1 - $25",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$25 - $50",
                      "key": "$25 - $50",
                      "label": "$25 - $50",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$150 - $200",
                      "key": "$150 - $200",
                      "label": "$150 - $200",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$200+",
                      "key": "$200+",
                      "label": "$200+",
                    },
                  ],
                },
                Object {
                  "displayName": "Category",
                  "id": "category",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "63364576",
                      ],
                      "id": "BEDDING",
                      "key": "BEDDING",
                      "label": "BEDDING",
                    },
                    Object {
                      "SKU_ID": Array [
                        "62238991",
                        "65493120",
                      ],
                      "id": "CLEANING & ORGANIZATION",
                      "key": "CLEANING & ORGANIZATION",
                      "label": "CLEANING & ORGANIZATION",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "FINE DINING & GIFTWARE",
                      "key": "FINE DINING & GIFTWARE",
                      "label": "FINE DINING & GIFTWARE",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Bath",
                      "key": "Bath",
                      "label": "Bath",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Experience",
                      "key": "Experience",
                      "label": "Experience",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Furniture",
                      "key": "Furniture",
                      "label": "Furniture",
                    },
                  ],
                },
              ]
            }
            fromAllFilterPanel={true}
            id="status"
            isRegistrySortItems={false}
            labels={Object {}}
            onSelectionUpdate={[Function]}
            selectedItems={Array []}
          />
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem
        accordion={true}
        className="accordion__item border-top"
        customKey="priceFilterMap"
        expanded={true}
        hideBodyClassName=""
        key="filters-facet-accordion-body-1"
        onClick={[Function]}
      >
        <AccordionItemTitle
          ariaControls=""
          className="accordion__title relative"
          expanded={false}
          hideBodyClassName=""
          id=""
          onClick={[Function]}
          role=""
        >
          <div
            className="accordion__title__wrapper relative px0 py2 m0 left-align"
          >
            <span
              aria-level="3"
              data-locator="registry-owner-priceFilterMap-filter"
              role="heading"
            >
              Price
            </span>
            <span />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody
          className="pt0 px0 pb3 filters-facet-accordion-body-1"
          expanded={false}
          hideBodyClassName="display-none"
          id=""
          role=""
        >
          <UniversalComponent
            accessibilityEventHandler={[Function]}
            data={
              Array [
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "$1 - $25",
                  "key": "$1 - $25",
                  "label": "$1 - $25",
                },
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "$25 - $50",
                  "key": "$25 - $50",
                  "label": "$25 - $50",
                },
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "$150 - $200",
                  "key": "$150 - $200",
                  "label": "$150 - $200",
                },
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "$200+",
                  "key": "$200+",
                  "label": "$200+",
                },
              ]
            }
            facetsData={
              Array [
                Object {
                  "displayName": "Status",
                  "id": "status",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "63364576",
                      ],
                      "id": "Gifts Wanted",
                      "key": "Gifts Wanted",
                      "label": "Gifts Wanted",
                    },
                    Object {
                      "SKU_ID": Array [
                        "62238991",
                        "65493120",
                      ],
                      "id": "Gifts Purchased",
                      "key": "Gifts Purchased",
                      "label": "Gifts PurchasedN",
                    },
                  ],
                },
                Object {
                  "displayName": "Price",
                  "id": "priceFilterMap",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$1 - $25",
                      "key": "$1 - $25",
                      "label": "$1 - $25",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$25 - $50",
                      "key": "$25 - $50",
                      "label": "$25 - $50",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$150 - $200",
                      "key": "$150 - $200",
                      "label": "$150 - $200",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$200+",
                      "key": "$200+",
                      "label": "$200+",
                    },
                  ],
                },
                Object {
                  "displayName": "Category",
                  "id": "category",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "63364576",
                      ],
                      "id": "BEDDING",
                      "key": "BEDDING",
                      "label": "BEDDING",
                    },
                    Object {
                      "SKU_ID": Array [
                        "62238991",
                        "65493120",
                      ],
                      "id": "CLEANING & ORGANIZATION",
                      "key": "CLEANING & ORGANIZATION",
                      "label": "CLEANING & ORGANIZATION",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "FINE DINING & GIFTWARE",
                      "key": "FINE DINING & GIFTWARE",
                      "label": "FINE DINING & GIFTWARE",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Bath",
                      "key": "Bath",
                      "label": "Bath",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Experience",
                      "key": "Experience",
                      "label": "Experience",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Furniture",
                      "key": "Furniture",
                      "label": "Furniture",
                    },
                  ],
                },
              ]
            }
            fromAllFilterPanel={true}
            id="priceFilterMap"
            isRegistrySortItems={false}
            labels={Object {}}
            onSelectionUpdate={[Function]}
            selectedItems={Array []}
          />
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem
        accordion={true}
        className="accordion__item border-top"
        customKey="category"
        expanded={true}
        hideBodyClassName=""
        key="filters-facet-accordion-body-2"
        onClick={[Function]}
      >
        <AccordionItemTitle
          ariaControls=""
          className="accordion__title relative"
          expanded={false}
          hideBodyClassName=""
          id=""
          onClick={[Function]}
          role=""
        >
          <div
            className="accordion__title__wrapper relative px0 py2 m0 left-align"
          >
            <span
              aria-level="3"
              data-locator="registry-owner-category-filter"
              role="heading"
            >
              Category
            </span>
            <span />
          </div>
        </AccordionItemTitle>
        <AccordionItemBody
          className="pt0 px0 pb3 filters-facet-accordion-body-2"
          expanded={false}
          hideBodyClassName="display-none"
          id=""
          role=""
        >
          <UniversalComponent
            accessibilityEventHandler={[Function]}
            data={
              Array [
                Object {
                  "SKU_ID": Array [
                    "63364576",
                  ],
                  "id": "BEDDING",
                  "key": "BEDDING",
                  "label": "BEDDING",
                },
                Object {
                  "SKU_ID": Array [
                    "62238991",
                    "65493120",
                  ],
                  "id": "CLEANING & ORGANIZATION",
                  "key": "CLEANING & ORGANIZATION",
                  "label": "CLEANING & ORGANIZATION",
                },
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "FINE DINING & GIFTWARE",
                  "key": "FINE DINING & GIFTWARE",
                  "label": "FINE DINING & GIFTWARE",
                },
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "Bath",
                  "key": "Bath",
                  "label": "Bath",
                },
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "Experience",
                  "key": "Experience",
                  "label": "Experience",
                },
                Object {
                  "SKU_ID": Array [
                    "13612200",
                  ],
                  "id": "Furniture",
                  "key": "Furniture",
                  "label": "Furniture",
                },
              ]
            }
            facetsData={
              Array [
                Object {
                  "displayName": "Status",
                  "id": "status",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "63364576",
                      ],
                      "id": "Gifts Wanted",
                      "key": "Gifts Wanted",
                      "label": "Gifts Wanted",
                    },
                    Object {
                      "SKU_ID": Array [
                        "62238991",
                        "65493120",
                      ],
                      "id": "Gifts Purchased",
                      "key": "Gifts Purchased",
                      "label": "Gifts PurchasedN",
                    },
                  ],
                },
                Object {
                  "displayName": "Price",
                  "id": "priceFilterMap",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$1 - $25",
                      "key": "$1 - $25",
                      "label": "$1 - $25",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$25 - $50",
                      "key": "$25 - $50",
                      "label": "$25 - $50",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$150 - $200",
                      "key": "$150 - $200",
                      "label": "$150 - $200",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "$200+",
                      "key": "$200+",
                      "label": "$200+",
                    },
                  ],
                },
                Object {
                  "displayName": "Category",
                  "id": "category",
                  "items": Array [
                    Object {
                      "SKU_ID": Array [
                        "63364576",
                      ],
                      "id": "BEDDING",
                      "key": "BEDDING",
                      "label": "BEDDING",
                    },
                    Object {
                      "SKU_ID": Array [
                        "62238991",
                        "65493120",
                      ],
                      "id": "CLEANING & ORGANIZATION",
                      "key": "CLEANING & ORGANIZATION",
                      "label": "CLEANING & ORGANIZATION",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "FINE DINING & GIFTWARE",
                      "key": "FINE DINING & GIFTWARE",
                      "label": "FINE DINING & GIFTWARE",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Bath",
                      "key": "Bath",
                      "label": "Bath",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Experience",
                      "key": "Experience",
                      "label": "Experience",
                    },
                    Object {
                      "SKU_ID": Array [
                        "13612200",
                      ],
                      "id": "Furniture",
                      "key": "Furniture",
                      "label": "Furniture",
                    },
                  ],
                },
              ]
            }
            fromAllFilterPanel={true}
            id="category"
            isRegistrySortItems={false}
            labels={Object {}}
            onSelectionUpdate={[Function]}
            selectedItems={Array []}
          />
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
    <div
      className="borderBottom"
    />
  </div>
  <footer
    className="footer px3 py2 border-top"
  >
    <Button
      className="viewResults"
      onClick={[Function]}
      theme="primary"
      variation="fullWidth"
    >
      view results
    </Button>
  </footer>
</section>
```

