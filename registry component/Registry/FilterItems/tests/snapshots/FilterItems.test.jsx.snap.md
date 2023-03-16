# `app/components/Pages/Registry/FilterItems/tests/FilterItems.test.jsx`

#### `should call renderSlideOutOverlay`

```
<PureComponent(GridContainer)
  className="bgColor containerGrey"
>
  <Connect(wrapper)
    minWidth={1024}
  >
    <section
      arial-label="filters for items"
      role="region"
    >
      <div
        className="pt2 pb15 filterItems"
      >
        <div
          className="mr-auto"
        >
          <ul
            className="buttonwrapper inline-block relative"
          >
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter View All"
                aria-pressed={false}
                className="buttonLabel"
                data-locator="registery-registerymyitems-filtersviewall"
                id="filter0"
                onClick={[Function]}
                theme="control"
                value="View All"
              >
                View All
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Purchased"
                aria-pressed={false}
                className="buttonLabel"
                data-locator="registery-registerymyitems-filterspurchased"
                id="filter1"
                onClick={[Function]}
                theme="control"
                value="Purchased"
              >
                Purchased
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Remaining"
                aria-pressed={false}
                className="buttonLabel"
                data-locator="registery-registerymyitems-filterremaining"
                id="filter2"
                onClick={[Function]}
                theme="control"
                value="Remaining"
              >
                Remaining
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Favorites"
                aria-pressed={false}
                className="buttonLabel"
                data-locator="registery-registerymyitems-filterfavorites"
                id="filter3"
                onClick={[Function]}
                theme="control"
                value="Favorites"
              >
                Favorites
              </Button>
            </li>
          </ul>
        </div>
        <div
          className="sortBy mr2"
        >
          Sort
        </div>
        <div
          className="iconTooltip inline-block relative"
        >
          <CustomSelect
            buttonClassName="rclCustomSelectBtn"
            defaultSelectionIndex={-1}
            defaultValue="Category"
            dropdownDescription=""
            iconClassName=""
            modalIconProps={
              Object {
                "height": "15px",
                "type": "close",
                "width": "15px",
              }
            }
            optionSet={
              Array [
                Object {
                  "dataLocator": "registery-registerymyitems-category	",
                  "key": "Category",
                  "label": "Category",
                  "props": Object {
                    "value": "Category",
                  },
                },
                Object {
                  "key": "Price",
                  "label": "Price",
                  "props": Object {
                    "value": "Price",
                  },
                },
                Object {
                  "key": "Date",
                  "label": "Date",
                  "props": Object {
                    "value": "Date",
                  },
                },
              ]
            }
            selectOption={[Function]}
            variationName="selectFilters"
            wrapperClassName={null}
          />
        </div>
      </div>
    </section>
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={1023}
  >
    <div
      className="filterItems justify-start"
    >
      <Button
        className="mr1 flex-auto"
        data-locator="registery-registerymyitems-filters"
        onClick={[Function]}
        theme="control"
        type="button"
        value="Filter"
        variation="smallBorderRadius"
      >
        Filter
      </Button>
      <Button
        className="flex-auto"
        onClick={[Function]}
        theme="control"
        type="button"
        value="Sort"
        variation="smallBorderRadius"
      >
        Sort
      </Button>
    </div>
  </Connect(wrapper)>
  <UniversalComponent
    direction="right"
    panelStyles={
      Object {
        "height": "100%",
      }
    }
    panelWidth="100%"
    show={true}
  >
    <UniversalComponent
      data={
        Array [
          Object {
            "dataLocator": "registery-registerymyitems-filtersviewall",
            "key": "View All",
            "label": "View All",
            "props": Object {
              "value": "View All",
            },
          },
          Object {
            "dataLocator": "registery-registerymyitems-filterspurchased",
            "key": "Purchased",
            "label": "Purchased",
            "props": Object {
              "value": "Purchased",
            },
          },
          Object {
            "dataLocator": "registery-registerymyitems-filterremaining",
            "key": "Remaining",
            "label": "Remaining",
            "props": Object {
              "value": "Remaining",
            },
          },
          Object {
            "dataLocator": "registery-registerymyitems-filterfavorites",
            "key": "Favourites",
            "label": "Favorites",
            "props": Object {
              "value": "Favorites",
            },
          },
        ]
      }
      labels={
        Object {
          "dataLocator": "registery-registerymyitems-filtersviewall",
          "gridFilters": Object {
            "sort": "Filter",
            "viewResultsBtn": "View Results",
          },
        }
      }
      onClose={[Function]}
      onSelectionUpdate={[Function]}
      selectedItems={
        Array [
          undefined,
        ]
      }
      stateTrackItem={false}
      trackItems={[Function]}
    />
  </UniversalComponent>
</PureComponent(GridContainer)>
```

