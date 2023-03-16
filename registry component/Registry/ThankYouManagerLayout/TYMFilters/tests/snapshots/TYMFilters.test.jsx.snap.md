# `app/components/Pages/Registry/ThankYouManagerLayout/TYMFilters/tests/TYMFilters.test.jsx`

#### `should render defaults`

```
<PureComponent(GridContainer)
  className="containerGrey"
>
  <Connect(wrapper)
    minWidth={1024}
  >
    <section
      aria-labelledby="filters-my-items-h2"
      role="region"
    >
      <div
        className="filterItems TYMfilterItems py2"
      >
        <div
          className="mr-auto"
        >
          <ul
            className="buttonwrapper inline-block relative"
          />
        </div>
        <CustomSelect
          buttonClassName="sortByButtonNew"
          defaultSelectionIndex={-1}
          dropdownDescription=""
          iconClassName=""
          maxNumberOfElementsToShow={6}
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
                "key": "Date Purchased (new-old)",
                "label": "Date Purchased (new-old)",
                "props": Object {
                  "value": "Date Purchased (new-old)",
                },
              },
              Object {
                "key": "Date Purchased (old-new)",
                "label": "Date Purchased (old-new)",
                "props": Object {
                  "value": "Date Purchased (old-new)",
                },
              },
              Object {
                "key": "Gift Purchased (A-Z)",
                "label": "Gift Purchased (A-Z)",
                "props": Object {
                  "value": "Gift Purchased (A-Z)",
                },
              },
              Object {
                "key": "Gift Purchased (Z-A)",
                "label": "Gift Purchased (Z-A)",
                "props": Object {
                  "value": "Gift Purchased (Z-A)",
                },
              },
              Object {
                "key": "Gift Giver (A-Z)",
                "label": "Gift Giver (A-Z)",
                "props": Object {
                  "value": "Gift Giver (A-Z)",
                },
              },
              Object {
                "key": "Gift Giver (Z-A)",
                "label": "Gift Giver (Z-A)",
                "props": Object {
                  "value": "Gift Giver (Z-A)",
                },
              },
            ]
          }
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
    <button
      className="sortBtn"
      onClick={[Function]}
    >
      Sort
      <Icon
        className="ml1"
        focusable="false"
        height="5px"
        key="caret"
        type="caret"
        width="10px"
      />
    </button>
  </Connect(wrapper)>
</PureComponent(GridContainer)>
```

