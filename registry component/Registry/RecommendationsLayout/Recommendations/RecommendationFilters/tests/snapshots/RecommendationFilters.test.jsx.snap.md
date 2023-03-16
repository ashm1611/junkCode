# `app/components/Pages/Registry/RecommendationsLayout/Recommendations/RecommendationFilters/tests/RecommendationFilters.test.jsx`

#### `should render defaults`

```
<PureComponent(GridContainer)
  className="bgColor containerGrey"
>
  <Connect(wrapper)
    minWidth={1024}
  >
    <PureComponent(Cell)
      className="pt3 pb2 recommendationHeading"
    >
      <Heading
        className="recsForReviewHeading"
        level={2}
      >
        recs for review
      </Heading>
    </PureComponent(Cell)>
    <section
      aria-labelledby="filters-my-items-h2"
      role="region"
    >
      <div
        className="pb15 filterItems socialRecAll mt3"
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
                aria-label="filter New"
                aria-pressed={false}
                className="buttonLabel"
                id="filter0"
                onClick={[Function]}
                theme="control"
                value="New"
              >
                New
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Maybe Later"
                aria-pressed={false}
                className="buttonLabel"
                id="filter1"
                onClick={[Function]}
                theme="control"
                value="Maybe Later"
              >
                Maybe Later
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Added to Registry"
                aria-pressed={false}
                className="buttonLabel"
                id="filter2"
                onClick={[Function]}
                theme="control"
                value="Added to Registry"
              >
                Added to Registry
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Recommenders"
                aria-pressed={false}
                className="buttonLabel"
                id="filter3"
                onClick={[Function]}
                theme="control"
                value="Recommenders"
              >
                Recommenders
              </Button>
            </li>
          </ul>
        </div>
        <CustomSelect
          buttonClassName="rclCustomSelectBtn"
          defaultSelectionIndex={Array []}
          defaultValue="Date"
          dropdownDescription=""
          iconClassName=""
          modalIconProps={
            Object {
              "height": "15px",
              "type": "close",
              "width": "15px",
            }
          }
          optionSet={Array []}
          selectOption={[Function]}
          variationName="selectFilters"
          wrapperClassName=""
        />
      </div>
    </section>
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={1023}
  >
    <PureComponent(Cell)
      className="pt3 pb2 recommendationHeading"
    >
      <Heading
        className="recsForReviewHeading"
        level={2}
      >
        recs for review
      </Heading>
    </PureComponent(Cell)>
    <div
      className="collabFilter filterItems justify-start"
    >
      <Button
        className="mr1 flex-auto"
        data-locator="registery-registerymyitems-filters"
        onClick={[Function]}
        theme="control"
        type="button"
        value="Filter"
      >
        Filter
      </Button>
      <Button
        className="flex-auto"
        onClick={[Function]}
        theme="control"
        type="button"
        value="Sort"
      >
        Sort
      </Button>
    </div>
  </Connect(wrapper)>
</PureComponent(GridContainer)>
```

#### `should render Filter items Correctly`

```
<PureComponent(GridContainer)
  className="bgColor"
>
  <Connect(wrapper)
    minWidth={1024}
  >
    <PureComponent(Cell)
      className="pt3 pb2 recommendationHeading"
    >
      <Heading
        level={2}
      >
        Get Recommendations
      </Heading>
    </PureComponent(Cell)>
    <section
      aria-labelledby="filters-my-items-h2"
      role="region"
    >
      <div
        className="pb15 filterItems socialRecAll mt1"
      >
        <div
          className="mr-auto socialRecFilters"
        >
          <ul
            className="buttonwrapper inline-block relative"
          >
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter New"
                aria-pressed={false}
                className="buttonLabel"
                id="filter0"
                onClick={[Function]}
                theme="control"
                value="New"
              >
                New
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Maybe Later"
                aria-pressed={false}
                className="buttonLabel"
                id="filter1"
                onClick={[Function]}
                theme="control"
                value="Maybe Later"
              >
                Maybe Later
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Added to Registry"
                aria-pressed={false}
                className="buttonLabel"
                id="filter2"
                onClick={[Function]}
                theme="control"
                value="Added to Registry"
              >
                Added to Registry
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Recommenders"
                aria-pressed={false}
                className="buttonLabel"
                id="filter3"
                onClick={[Function]}
                theme="control"
                value="Recommenders"
              >
                Recommenders
              </Button>
            </li>
          </ul>
        </div>
        <CustomSelect
          buttonClassName="rclCustomSelectBtn"
          defaultSelectionIndex={Array []}
          defaultValue="Date"
          dropdownDescription=""
          iconClassName=""
          modalIconProps={
            Object {
              "height": "15px",
              "type": "close",
              "width": "15px",
            }
          }
          optionSet={Array []}
          selectOption={[Function]}
          variationName="selectFilters"
          wrapperClassName=""
        />
      </div>
    </section>
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={1023}
  >
    <div
      className="filterItems justify-start"
    >
      <RegistryActionButtons
        deviceConfig={
          Object {
            "DESKTOP": 1024,
            "MIDDLEDESKTOP": 1100,
            "TABLET": 768,
          }
        }
        getSortConfigForTab={[Function]}
        switchConfig={
          Object {
            "enableRegistryCollaboration": false,
          }
        }
      />
    </div>
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
      >
        Filter
      </Button>
      <Button
        className="flex-auto"
        onClick={[Function]}
        theme="control"
        type="button"
        value="Sort"
      >
        Sort
      </Button>
    </div>
  </Connect(wrapper)>
</PureComponent(GridContainer)>
```

#### `should render correctly for Mobile`

```
<PureComponent(GridContainer)
  className="bgColor containerGrey"
>
  <Connect(wrapper)
    minWidth={1024}
  >
    <PureComponent(Cell)
      className="pt3 pb2 recommendationHeading"
    >
      <Heading
        className="recsForReviewHeading"
        level={2}
      >
        recs for review
      </Heading>
    </PureComponent(Cell)>
    <section
      aria-labelledby="filters-my-items-h2"
      role="region"
    >
      <div
        className="pb15 filterItems socialRecAll mt3"
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
                aria-label="filter New"
                aria-pressed={false}
                className="buttonLabel"
                id="filter0"
                onClick={[Function]}
                theme="control"
                value="New"
              >
                New
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Maybe Later"
                aria-pressed={false}
                className="buttonLabel"
                id="filter1"
                onClick={[Function]}
                theme="control"
                value="Maybe Later"
              >
                Maybe Later
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Added to Registry"
                aria-pressed={false}
                className="buttonLabel"
                id="filter2"
                onClick={[Function]}
                theme="control"
                value="Added to Registry"
              >
                Added to Registry
              </Button>
            </li>
            <li
              className="buttonwrapper inline-block relative"
            >
              <Button
                aria-label="filter Recommenders"
                aria-pressed={false}
                className="buttonLabel"
                id="filter3"
                onClick={[Function]}
                theme="control"
                value="Recommenders"
              >
                Recommenders
              </Button>
            </li>
          </ul>
        </div>
        <CustomSelect
          buttonClassName="rclCustomSelectBtn"
          defaultSelectionIndex={Array []}
          defaultValue="Date"
          dropdownDescription=""
          iconClassName=""
          modalIconProps={
            Object {
              "height": "15px",
              "type": "close",
              "width": "15px",
            }
          }
          optionSet={Array []}
          selectOption={[Function]}
          variationName="selectFilters"
          wrapperClassName=""
        />
      </div>
    </section>
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={1023}
  >
    <PureComponent(Cell)
      className="pt3 pb2 recommendationHeading"
    >
      <Heading
        className="recsForReviewHeading"
        level={2}
      >
        recs for review
      </Heading>
    </PureComponent(Cell)>
    <div
      className="collabFilter filterItems justify-start"
    >
      <Button
        className="mr1 flex-auto"
        data-locator="registery-registerymyitems-filters"
        onClick={[Function]}
        theme="control"
        type="button"
        value="Filter"
      >
        Filter
      </Button>
      <Button
        className="flex-auto"
        onClick={[Function]}
        theme="control"
        type="button"
        value="Sort"
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
  />
</PureComponent(GridContainer)>
```

