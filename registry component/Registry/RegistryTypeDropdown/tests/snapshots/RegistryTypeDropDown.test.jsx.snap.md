# `app/components/Pages/Registry/RegistryTypeDropdown/tests/RegistryTypeDropDown.test.jsx`

#### `should render correctly with data`

```
<div
  className="center"
>
  <div
    className="registryLink"
  >
    <PrimaryLink
      className="paragraph"
      href="/store/page/Registry"
      itemProp="item"
      title="The Registry"
    >
      <span
        itemProp="name"
      >
        The Registry
      </span>
    </PrimaryLink>
  </div>
  <CustomSelect
    buttonClassName="rclCustomSelectBtn"
    defaultValue="/store/page/Registry"
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
          "key": "BRD",
          "label": "Wedding",
          "props": Object {
            "value": "/store/page/Registry",
          },
        },
        Object {
          "key": "BA1",
          "label": "Baby",
          "props": Object {
            "value": "/store/page/BabyRegistry",
          },
        },
        Object {
          "key": "COL",
          "label": "College/University",
          "props": Object {
            "value": "/store/gift-registry/college-university",
          },
        },
        Object {
          "key": "HSW",
          "label": "Housewarming",
          "props": Object {
            "value": "/store/gift-registry/housewarming",
          },
        },
        Object {
          "key": "ANN",
          "label": "Anniversary",
          "props": Object {
            "value": "/store/gift-registry/anniversary",
          },
        },
        Object {
          "key": "BIR",
          "label": "Birthday",
          "props": Object {
            "value": "/store/gift-registry/birthday",
          },
        },
        Object {
          "key": "COM",
          "label": "Commitment Ceremony",
          "props": Object {
            "value": "/store/gift-registry/commitment-ceremony",
          },
        },
        Object {
          "key": "OTH",
          "label": "Other",
          "props": Object {
            "value": "/store/gift-registry/other",
          },
        },
        Object {
          "key": "RET",
          "label": "Retirement",
          "props": Object {
            "value": "/store/gift-registry/retirement",
          },
        },
      ]
    }
    selectOption={[Function]}
    variationName="selectBreadcrumbNoUnderline"
    wrapperClassName="mt2"
  />
</div>
```

