# `app/components/Pages/Registry/CreateRegistry/Components/AddressInput/test/AddressInput.test.jsx`

#### `should render correctly with required props only`

```
<Fragment>
  <RenderInput
    afterValidation={[Function]}
    dataLocator="registry-contactInfoStreet"
    label="Street Address"
    type="text"
    updateState={[Function]}
    validation="required"
    value=""
  />
  <ModalDialog
    dialogClass=""
    scrollDisabled={false}
    toggleModalState={[Function]}
    underlayClickExits={false}
    variation="small"
    verticallyCenter={true}
  >
    <Heading
      className="mb3 editAddressHeading"
      level={2}
    />
    <form
      method="post"
      noValidate={true}
    >
      <Heading
        className="mb2 sm-mb2"
        level={3}
      />
      <PureComponent(GridX)>
        <RenderInput
          addressOneError=""
          classes="fieldStyle"
          dataLocator="registry-contactInfoAddress1"
          fieldName="addressOne"
          label="Address Line 1"
          maxLength={30}
          required={true}
          type="text"
          updateState={[Function]}
          validation="required"
          value=""
        />
      </PureComponent(GridX)>
      <PureComponent(GridX)>
        <RenderInput
          addressTwoError=""
          classes="fieldStyle"
          dataLocator="registry-contactInfoAddress2"
          fieldName="addressTwo"
          label="Address Line 2"
          maxLength={30}
          type="text"
          updateState={[Function]}
          value=""
        />
      </PureComponent(GridX)>
      <PureComponent(GridX)>
        <RenderInput
          classes="fieldStyle"
          dataLocator="registry-contactInfoZip"
          fieldName="zip"
          label="Enter Zip"
          maxLength={10}
          required={true}
          type="text"
          updateState={[Function]}
          validation="zip"
          value=""
          zipError=""
        />
      </PureComponent(GridX)>
      <PureComponent(GridX)>
        <RenderInput
          cityError=""
          classes="fieldStyle"
          dataLocator="registry-contactInfoCity"
          fieldName="city"
          label="Enter City"
          maxLength={25}
          required={true}
          type="text"
          updateState={[Function]}
          validation="required"
          value=""
        />
      </PureComponent(GridX)>
      <PureComponent(Cell)
        className="mb3 sm-mb3 fieldStyle"
      >
        <FormInput
          blurHandler={[Function]}
          className=""
          data-locator="registry-contactInfoState"
          defaultValue=""
          hideAriaLabelText={false}
          hideFieldLevelErrorMessage={false}
          id="state"
          isChangedOnce={false}
          isRequired={false}
          label="Enter State"
          labelPosition="prepend"
          labelStyle="inlineLabel"
          name="state"
          onFocus={[Function]}
          optionSet={
            Array [
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "Select State",
                "props": Object {
                  "key": "",
                  "value": "",
                },
              },
              Object {
                "label": "State",
                "props": Object {
                  "militaryState": true,
                  "nexusState": true,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "",
                },
              },
              Object {
                "label": "AA",
                "name": "AA-Armed Forces of Americas",
                "props": Object {
                  "militaryState": true,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "AA",
                },
              },
              Object {
                "label": "AE",
                "name": "AE-Armed Forces of Europe",
                "props": Object {
                  "militaryState": true,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "AE",
                },
              },
              Object {
                "label": "AP",
                "name": "AP-Armed Forces of Pacific",
                "props": Object {
                  "militaryState": true,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnShipping": true,
                  "shyowOnReg": true,
                  "value": "AP",
                },
              },
              Object {
                "label": "AL",
                "name": "Alabama",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "AL",
                },
              },
              Object {
                "label": "AK",
                "name": "Alaska",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "AK",
                },
              },
              Object {
                "label": "AZ",
                "name": "Arizona",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "AZ",
                },
              },
              Object {
                "label": "AR",
                "name": "Arkansas",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "AR",
                },
              },
              Object {
                "label": "CA",
                "name": "California",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "CA",
                },
              },
              Object {
                "label": "CO",
                "name": "Colorado",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "CO",
                },
              },
              Object {
                "label": "CT",
                "name": "Connecticut",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "CT",
                },
              },
              Object {
                "label": "DE",
                "name": "Delaware",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "DE",
                },
              },
              Object {
                "label": "DC",
                "name": "District of Columbia",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "DC",
                },
              },
              Object {
                "label": "FL",
                "name": "Florida",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "FL",
                },
              },
              Object {
                "label": "GA",
                "name": "Georgia",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "GA",
                },
              },
              Object {
                "label": "HI",
                "name": "Hawaii",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "HI",
                },
              },
              Object {
                "label": "ID",
                "name": "Idaho",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "ID",
                },
              },
              Object {
                "label": "IL",
                "name": "Illinois",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "IL",
                },
              },
              Object {
                "label": "IN",
                "name": "Indiana",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "IN",
                },
              },
              Object {
                "label": "IA",
                "name": "Iowa",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "IA",
                },
              },
              Object {
                "label": "KS",
                "name": "Kansas",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "KS",
                },
              },
              Object {
                "label": "KY",
                "name": "Kentucky",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "KY",
                },
              },
              Object {
                "label": "LA",
                "name": "Louisiana",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "LA",
                },
              },
              Object {
                "label": "ME",
                "name": "Maine",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "ME",
                },
              },
              Object {
                "label": "MD",
                "name": "Maryland",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "MD",
                },
              },
              Object {
                "label": "MA",
                "name": "Massachusetts",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "MA",
                },
              },
              Object {
                "label": "MI",
                "name": "Michigan",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "MI",
                },
              },
              Object {
                "label": "MN",
                "name": "Minnesota",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "MN",
                },
              },
              Object {
                "label": "MS",
                "name": "Mississippi",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "MS",
                },
              },
              Object {
                "label": "MO",
                "name": "Missouri",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "MO",
                },
              },
              Object {
                "label": "MT",
                "name": "Montana",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "MT",
                },
              },
              Object {
                "label": "NE",
                "name": "Nebraska",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "NE",
                },
              },
              Object {
                "label": "NV",
                "name": "Nevada",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "NV",
                },
              },
              Object {
                "label": "NH",
                "name": "New Hampshire",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "NH",
                },
              },
              Object {
                "label": "NJ",
                "name": "New Jersey",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "NJ",
                },
              },
              Object {
                "label": "NM",
                "name": "New Mexico",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "NM",
                },
              },
              Object {
                "label": "NY",
                "name": "New York",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "NY",
                },
              },
              Object {
                "label": "NC",
                "name": "North Carolina",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "NC",
                },
              },
              Object {
                "label": "ND",
                "name": "North Dakota",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "ND",
                },
              },
              Object {
                "label": "OH",
                "name": "Ohio",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "OH",
                },
              },
              Object {
                "label": "OK",
                "name": "Oklahoma",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "OK",
                },
              },
              Object {
                "label": "OR",
                "name": "Oregon",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "OR",
                },
              },
              Object {
                "label": "PA",
                "name": "Pennsylvania",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "PA",
                },
              },
              Object {
                "label": "PR",
                "name": "Puerto Rico",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "PR",
                },
              },
              Object {
                "label": "RI",
                "name": "Rhode Island",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "RI",
                },
              },
              Object {
                "label": "SC",
                "name": "South Carolina",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "SC",
                },
              },
              Object {
                "label": "SD",
                "name": "South Dakota",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "SD",
                },
              },
              Object {
                "label": "TN",
                "name": "Tennessee",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "TN",
                },
              },
              Object {
                "label": "TX",
                "name": "Texas",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "TX",
                },
              },
              Object {
                "label": "UT",
                "name": "Utah",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "UT",
                },
              },
              Object {
                "label": "VT",
                "name": "Vermont",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "VT",
                },
              },
              Object {
                "label": "VI",
                "name": "Virgin Islands",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": false,
                  "showOnShipping": true,
                  "value": "VI",
                },
              },
              Object {
                "label": "VA",
                "name": "Virginia",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "VA",
                },
              },
              Object {
                "label": "WA",
                "name": "Washington",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "WA",
                },
              },
              Object {
                "label": "WV",
                "name": "West Virginia",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "WV",
                },
              },
              Object {
                "label": "WI",
                "name": "Wisconsin",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "WI",
                },
              },
              Object {
                "label": "WY",
                "name": "Wyoming",
                "props": Object {
                  "militaryState": false,
                  "nexusState": false,
                  "showOnBilling": true,
                  "showOnReg": true,
                  "showOnShipping": true,
                  "value": "WY",
                },
              },
            ]
          }
          required={true}
          selectOption={[Function]}
          showNumericKeypadOnMobile={false}
          tilesLength={-1}
          type="select"
          wrapperClassName="stateDropdown"
          wrapperProps={Object {}}
        />
      </PureComponent(Cell)>
      <PureComponent(GridX) />
      <PureComponent(GridX)>
        <PureComponent(Cell)
          className="small-12 large-6 mb3"
        >
          <Button
            aria-label="Save Address"
            className="mb0"
            disabled={false}
            id="editAddressSubmit"
            onClick={[Function]}
            theme="primary"
            type="submit"
            variation="fullWidth"
          >
            Apply
          </Button>
        </PureComponent(Cell)>
      </PureComponent(GridX)>
      <PrimaryLink
        href="#"
        id="editAddressCancel"
        onClick={[Function]}
        type="bold"
        variation="primaryLinkBlue"
      >
        Cancel
      </PrimaryLink>
    </form>
  </ModalDialog>
</Fragment>
```

