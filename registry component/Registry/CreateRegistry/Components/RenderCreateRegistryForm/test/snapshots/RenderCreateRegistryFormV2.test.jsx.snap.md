# `app/components/Pages/Registry/CreateRegistry/Components/RenderCreateRegistryForm/test/RenderCreateRegistryFormV2.test.jsx`

#### `Render Skeleton when isFetching`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt=""
    className="createV2BgImage"
    reactImage={true}
  />
  <PureComponent(GridX)
    className="grid-container createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div
        className="center mx-auto"
      >
        <Heading
          className="heading mt1 mb1"
        >
          hi Test, 
        </Heading>
        <Heading
          className="subHeading"
        />
        <UniversalComponent />
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `Render Skeleton when isFetchingRegCall`

```
""
```

#### `form render with event Signup flow`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt=""
    className="createV2BgImage"
    reactImage={true}
  />
  <PureComponent(GridX)
    className="grid-container loginV2WrapperParent createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div>
        <div
          className="center"
        >
          <Heading
            className="heading my1"
            level={1}
          >
            almost there!
          </Heading>
          <Heading
            className="subHeading"
            level={5}
          >
            Sign in to manage registries.
          </Heading>
        </div>
        <UniversalComponent
          changeRegistryFormTypeId={[Function]}
          enableNewCreateFlow={true}
          enableNewSignUp={true}
          hideCreateAccountLink={true}
          inPage={true}
          isRegistryPage={true}
          isThirdTab={true}
        />
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `form render with error message`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt=""
    className="createV2BgImage"
    reactImage={true}
  />
  <PureComponent(GridX)
    className="grid-container createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div
        className="center mx-auto"
      >
        <Heading
          className="heading mt1 mb1"
        >
          hi Test, 
        </Heading>
        <Heading
          className="subHeading"
        />
        <PureComponent(Cell)
          className="large-12 small-12 mx-auto"
        >
          <FocusableComponent
            keyForTriggeringFocus={0}
            wrapperClassName=""
          >
            <Notification
              closeClick={[Function]}
              content="this is an error"
              hasCloseButton={true}
              hasStatusIcon={true}
              height="18px"
              iconPosition="mr2"
              spaceClass="py1 px2"
              status="error"
              theme=""
              width="18px"
              wrapperClass="p1 mb2 large-8 small-12 mx-auto"
            />
          </FocusableComponent>
        </PureComponent(Cell)>
        <Connect(wrapper)
          autoComplete="off"
          className="pt2"
          formWrapperData={Object {}}
          id="newRegistry-formWrapper"
          name="createRegistryNew"
          noValidate={true}
          onSubmit={[Function]}
        >
          <FormInput
            blurHandler={[Function]}
            className="my2"
            defaultValue=""
            hideAriaLabelText={false}
            hideFieldLevelErrorMessage={false}
            id="createRegistryNew"
            isChangedOnce={false}
            isRequired={false}
            labelPosition="prepend"
            name="createRegistryNew-select-options"
            noLabelDisplay={true}
            onFocus={[Function]}
            optionSet={
              Array [
                Object {
                  "eventCode": "BRD",
                  "label": "Wedding",
                  "props": Object {
                    "value": "Wedding",
                  },
                },
                Object {
                  "eventCode": "BA1",
                  "label": "Baby",
                  "props": Object {
                    "value": "Baby",
                  },
                },
                Object {
                  "eventCode": "COL",
                  "label": "College/University",
                  "props": Object {
                    "value": "College/University",
                  },
                },
                Object {
                  "eventCode": "HSW",
                  "label": "Housewarming",
                  "props": Object {
                    "value": "Housewarming",
                  },
                },
                Object {
                  "eventCode": "ANN",
                  "label": "Anniversary",
                  "props": Object {
                    "value": "Anniversary",
                  },
                },
                Object {
                  "eventCode": "COM",
                  "label": "Commitment Ceremony",
                  "props": Object {
                    "value": "Commitment Ceremony",
                  },
                },
                Object {
                  "eventCode": "OTH",
                  "label": "Other",
                  "props": Object {
                    "value": "Other",
                  },
                },
              ]
            }
            position="top"
            selectOption={[Function]}
            showNumericKeypadOnMobile={false}
            tilesLength={-1}
            type="select"
            variationName="dropDownSmall"
            wrapperProps={Object {}}
          />
          <DateInput
            atDateFlag={true}
            autocomplete="off"
            className="my2"
            dataLocator="registry-eventInfoEventDate"
            dateLabel="Select a Date (dd/mm/yyyy)"
            eventDateError=""
            eventType="Wedding"
            format="dd/mm/yyyy"
            futureYearToDisplay={5}
            id="eventDate"
            isNewCalender={true}
            name="eventDate"
            pastYearToDisplay={0}
            required={true}
            validation="eventDateCanada"
            value="4/22/2022"
          />
          <div
            className="pb2 flexCell"
          >
            <div
              className="checkboxCa small-12"
            >
              <Checkbox
                checked={false}
                className="checkboxDisclaimer"
                islablevisible={false}
                name="regEmailOptInCheckBox"
                onSelect={[Function]}
                pointer={false}
                type="checkbox"
              />
            </div>
            <div
              className="renderContent"
            >
              Yes, I want to receive registry exclusive offers, completion discount and expert advice on all registry types.
            </div>
          </div>
          <Button
            aria-label="createRegistryNew-submit"
            className="mb3 mt2"
            data-locator="registryNew-continueBtn"
            id="newRegistry-submitBtn"
            onSubmit={[Function]}
            theme="deactivated"
            type="submit"
            variation="fullWidth"
          >
            create a registry
          </Button>
        </Connect(wrapper)>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `form render with error messag when errormessage is null`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt=""
    className="createV2BgImage"
    reactImage={true}
  />
  <PureComponent(GridX)
    className="grid-container createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div
        className="center mx-auto"
      >
        <Heading
          className="heading mt1 mb1"
        >
          hi Test, 
        </Heading>
        <Heading
          className="subHeading"
        />
        <PureComponent(Cell)
          className="large-12 small-12 mx-auto"
        >
          <FocusableComponent
            keyForTriggeringFocus={0}
            wrapperClassName=""
          >
            <Notification
              closeClick={[Function]}
              content=""
              hasCloseButton={true}
              hasStatusIcon={true}
              height="18px"
              iconPosition="mr2"
              spaceClass="py1 px2"
              status="error"
              theme=""
              width="18px"
              wrapperClass="p1 mb2 large-8 small-12 mx-auto"
            />
          </FocusableComponent>
        </PureComponent(Cell)>
        <Connect(wrapper)
          autoComplete="off"
          className="pt2"
          formWrapperData={Object {}}
          id="newRegistry-formWrapper"
          name="createRegistryNew"
          noValidate={true}
          onSubmit={[Function]}
        >
          <FormInput
            blurHandler={[Function]}
            className="my2"
            defaultValue=""
            hideAriaLabelText={false}
            hideFieldLevelErrorMessage={false}
            id="createRegistryNew"
            isChangedOnce={false}
            isRequired={false}
            labelPosition="prepend"
            name="createRegistryNew-select-options"
            noLabelDisplay={true}
            onFocus={[Function]}
            optionSet={
              Array [
                Object {
                  "eventCode": "BRD",
                  "label": "Wedding",
                  "props": Object {
                    "value": "Wedding",
                  },
                },
                Object {
                  "eventCode": "BA1",
                  "label": "Baby",
                  "props": Object {
                    "value": "Baby",
                  },
                },
                Object {
                  "eventCode": "COL",
                  "label": "College/University",
                  "props": Object {
                    "value": "College/University",
                  },
                },
                Object {
                  "eventCode": "HSW",
                  "label": "Housewarming",
                  "props": Object {
                    "value": "Housewarming",
                  },
                },
                Object {
                  "eventCode": "ANN",
                  "label": "Anniversary",
                  "props": Object {
                    "value": "Anniversary",
                  },
                },
                Object {
                  "eventCode": "COM",
                  "label": "Commitment Ceremony",
                  "props": Object {
                    "value": "Commitment Ceremony",
                  },
                },
                Object {
                  "eventCode": "OTH",
                  "label": "Other",
                  "props": Object {
                    "value": "Other",
                  },
                },
              ]
            }
            position="top"
            selectOption={[Function]}
            showNumericKeypadOnMobile={false}
            tilesLength={-1}
            type="select"
            variationName="dropDownSmall"
            wrapperProps={Object {}}
          />
          <DateInput
            atDateFlag={true}
            autocomplete="off"
            className="my2"
            dataLocator="registry-eventInfoEventDate"
            dateLabel="Select a Date (dd/mm/yyyy)"
            eventDateError=""
            eventType="Wedding"
            format="dd/mm/yyyy"
            futureYearToDisplay={5}
            id="eventDate"
            isNewCalender={true}
            name="eventDate"
            pastYearToDisplay={0}
            required={true}
            validation="eventDateCanada"
            value="4/22/2022"
          />
          <div
            className="pb2 flexCell"
          >
            <div
              className="checkboxCa small-12"
            >
              <Checkbox
                checked={false}
                className="checkboxDisclaimer"
                islablevisible={false}
                name="regEmailOptInCheckBox"
                onSelect={[Function]}
                pointer={false}
                type="checkbox"
              />
            </div>
            <div
              className="renderContent"
            >
              Yes, I want to receive registry exclusive offers, completion discount and expert advice on all registry types.
            </div>
          </div>
          <Button
            aria-label="createRegistryNew-submit"
            className="mb3 mt2"
            data-locator="registryNew-continueBtn"
            id="newRegistry-submitBtn"
            onSubmit={[Function]}
            theme="deactivated"
            type="submit"
            variation="fullWidth"
          >
            create a registry
          </Button>
        </Connect(wrapper)>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `should render AccountSignContainer, if loginRule as addFromRegistry`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt=""
    className="createV2BgImage"
    reactImage={true}
  />
  <PureComponent(GridX)
    className="grid-container createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div
        className="center mx-auto"
      >
        <Heading
          className="heading mt1 mb1"
        />
        <Heading
          className="subHeading"
        />
        <Connect(wrapper)
          autoComplete="off"
          className="pt2"
          formWrapperData={Object {}}
          id="newRegistry-formWrapper"
          name="createRegistryNew"
          noValidate={true}
          onSubmit={[Function]}
        >
          <FormInput
            blurHandler={[Function]}
            className="my2"
            defaultValue=""
            hideAriaLabelText={false}
            hideFieldLevelErrorMessage={false}
            id="createRegistryNew"
            isChangedOnce={false}
            isRequired={false}
            labelPosition="prepend"
            name="createRegistryNew-select-options"
            noLabelDisplay={true}
            onFocus={[Function]}
            optionSet={
              Array [
                Object {
                  "eventCode": "BRD",
                  "label": "Wedding",
                  "props": Object {
                    "value": "Wedding",
                  },
                },
                Object {
                  "eventCode": "BA1",
                  "label": "Baby",
                  "props": Object {
                    "value": "Baby",
                  },
                },
                Object {
                  "eventCode": "COL",
                  "label": "College/University",
                  "props": Object {
                    "value": "College/University",
                  },
                },
                Object {
                  "eventCode": "HSW",
                  "label": "Housewarming",
                  "props": Object {
                    "value": "Housewarming",
                  },
                },
                Object {
                  "eventCode": "ANN",
                  "label": "Anniversary",
                  "props": Object {
                    "value": "Anniversary",
                  },
                },
                Object {
                  "eventCode": "COM",
                  "label": "Commitment Ceremony",
                  "props": Object {
                    "value": "Commitment Ceremony",
                  },
                },
                Object {
                  "eventCode": "OTH",
                  "label": "Other",
                  "props": Object {
                    "value": "Other",
                  },
                },
              ]
            }
            position="top"
            selectOption={[Function]}
            showNumericKeypadOnMobile={false}
            tilesLength={-1}
            type="select"
            variationName="dropDownSmall"
            wrapperProps={Object {}}
          />
          <DateInput
            atDateFlag={true}
            autocomplete="off"
            className="my2"
            dataLocator="registry-eventInfoEventDate"
            dateLabel="Select a Date (dd/mm/yyyy)"
            eventDateError=""
            eventType="Wedding"
            format="dd/mm/yyyy"
            futureYearToDisplay={5}
            id="eventDate"
            isNewCalender={true}
            name="eventDate"
            pastYearToDisplay={0}
            required={true}
            validation="eventDateCanada"
            value="4/22/2022"
          />
          <div
            className="pb2 flexCell"
          >
            <div
              className="checkboxCa small-12"
            >
              <Checkbox
                checked={false}
                className="checkboxDisclaimer"
                islablevisible={false}
                name="regEmailOptInCheckBox"
                onSelect={[Function]}
                pointer={false}
                type="checkbox"
              />
            </div>
            <div
              className="renderContent"
            >
              Yes, I want to receive registry exclusive offers, completion discount and expert advice on all registry types.
            </div>
          </div>
          <Button
            aria-label="createRegistryNew-submit"
            className="mb3 mt2"
            data-locator="registryNew-continueBtn"
            id="newRegistry-submitBtn"
            onSubmit={[Function]}
            theme="deactivated"
            type="submit"
            variation="fullWidth"
          >
            continue
          </Button>
        </Connect(wrapper)>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `should render FormWrapper, new create registry flow for web view`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt="Wedding background image"
    className="createV2BgImage"
    reactImage={true}
    src="https://b3h2.scene7.com/is/image/BedBathandBeyond/background_wedding?$contentFlat$&wid=1440&hei=1066"
  />
  <PureComponent(GridX)
    className="grid-container createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div
        className="center mx-auto"
      >
        <Heading
          className="heading mt1 mb1"
        >
          hi Test, cheers to you!
        </Heading>
        <Heading
          className="subHeading"
        >
          Your wedding registry starts now.
        </Heading>
        <Connect(wrapper)
          autoComplete="off"
          className="pt2"
          formWrapperData={Object {}}
          id="newRegistry-formWrapper"
          name="createRegistryNew"
          noValidate={true}
          onSubmit={[Function]}
        >
          <FormInput
            blurHandler={[Function]}
            className="my2"
            defaultValue=""
            hideAriaLabelText={false}
            hideFieldLevelErrorMessage={false}
            id="createRegistryNew"
            isChangedOnce={false}
            isRequired={false}
            labelPosition="prepend"
            name="createRegistryNew-select-options"
            noLabelDisplay={true}
            onFocus={[Function]}
            optionSet={
              Array [
                Object {
                  "eventCode": "BRD",
                  "label": "Wedding",
                  "props": Object {
                    "value": "Wedding",
                  },
                },
                Object {
                  "eventCode": "BA1",
                  "label": "Baby",
                  "props": Object {
                    "value": "Baby",
                  },
                },
                Object {
                  "eventCode": "COL",
                  "label": "College/University",
                  "props": Object {
                    "value": "College/University",
                  },
                },
                Object {
                  "eventCode": "HSW",
                  "label": "Housewarming",
                  "props": Object {
                    "value": "Housewarming",
                  },
                },
                Object {
                  "eventCode": "ANN",
                  "label": "Anniversary",
                  "props": Object {
                    "value": "Anniversary",
                  },
                },
                Object {
                  "eventCode": "COM",
                  "label": "Commitment Ceremony",
                  "props": Object {
                    "value": "Commitment Ceremony",
                  },
                },
                Object {
                  "eventCode": "OTH",
                  "label": "Other",
                  "props": Object {
                    "value": "Other",
                  },
                },
              ]
            }
            position="top"
            selectOption={[Function]}
            showNumericKeypadOnMobile={false}
            tilesLength={-1}
            type="select"
            variationName="dropDownSmall"
            wrapperProps={Object {}}
          />
          <RenderInput
            dataLocator="registry-coregisterantfirstnametextfield"
            fieldName="coRegistrantName"
            label=""
            maxLength={61}
            required={true}
            type="text"
            validation="coRegistrantName"
          />
          <DateInput
            atDateFlag={true}
            autocomplete="off"
            className="my2"
            dataLocator="registry-eventInfoEventDate"
            dateLabel="Select a Date (dd/mm/yyyy)"
            eventDateError=""
            eventType="Wedding"
            format="dd/mm/yyyy"
            futureYearToDisplay={5}
            id="eventDate"
            isMobile={false}
            isNewCalender={true}
            name="eventDate"
            pastYearToDisplay={0}
            required={true}
            validation="eventDateCanada"
            value="4/22/2022"
          />
          <div
            className="pb2 flexCell"
          >
            <div
              className="checkboxCa small-12"
            >
              <Checkbox
                checked={false}
                className="checkboxDisclaimer"
                islablevisible={false}
                name="regEmailOptInCheckBox"
                onSelect={[Function]}
                pointer={false}
                type="checkbox"
              />
            </div>
            <div
              className="renderContent"
            >
              Yes, I want to receive registry exclusive offers, completion discount and expert advice on all registry types.
            </div>
          </div>
          <Button
            aria-label="createRegistryNew-submit"
            className="mb3 mt2"
            data-locator="registryNew-continueBtn"
            id="newRegistry-submitBtn"
            onSubmit={[Function]}
            theme="deactivated"
            type="submit"
            variation="fullWidth"
          >
            create a registry
          </Button>
        </Connect(wrapper)>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `should render FormWrapper, new create registry flow for Mobile View`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt="Wedding background image"
    className="createV2BgImage"
    reactImage={true}
    src="https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_wedding_New_1_2022_10_25?$mApp$"
  />
  <PureComponent(GridX)
    className="grid-container createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div
        className="center mx-auto"
      >
        <Heading
          className="heading mt1 mb1"
        >
          hi Test, cheers to you!
        </Heading>
        <Heading
          className="subHeading"
        >
          Your wedding registry starts now.
        </Heading>
        <Connect(wrapper)
          autoComplete="off"
          className="pt2"
          formWrapperData={Object {}}
          id="newRegistry-formWrapper"
          name="createRegistryNew"
          noValidate={true}
          onSubmit={[Function]}
        >
          <FormInput
            blurHandler={[Function]}
            className="my2"
            defaultValue=""
            hideAriaLabelText={false}
            hideFieldLevelErrorMessage={false}
            id="createRegistryNew"
            isChangedOnce={false}
            isRequired={false}
            labelPosition="prepend"
            name="createRegistryNew-select-options"
            noLabelDisplay={true}
            onFocus={[Function]}
            optionSet={
              Array [
                Object {
                  "eventCode": "BRD",
                  "label": "Wedding",
                  "props": Object {
                    "value": "Wedding",
                  },
                },
                Object {
                  "eventCode": "BA1",
                  "label": "Baby",
                  "props": Object {
                    "value": "Baby",
                  },
                },
                Object {
                  "eventCode": "COL",
                  "label": "College/University",
                  "props": Object {
                    "value": "College/University",
                  },
                },
                Object {
                  "eventCode": "HSW",
                  "label": "Housewarming",
                  "props": Object {
                    "value": "Housewarming",
                  },
                },
                Object {
                  "eventCode": "ANN",
                  "label": "Anniversary",
                  "props": Object {
                    "value": "Anniversary",
                  },
                },
                Object {
                  "eventCode": "COM",
                  "label": "Commitment Ceremony",
                  "props": Object {
                    "value": "Commitment Ceremony",
                  },
                },
                Object {
                  "eventCode": "OTH",
                  "label": "Other",
                  "props": Object {
                    "value": "Other",
                  },
                },
              ]
            }
            position="top"
            selectOption={[Function]}
            showNumericKeypadOnMobile={false}
            tilesLength={-1}
            type="select"
            variationName="dropDownSmall"
            wrapperProps={Object {}}
          />
          <RenderInput
            dataLocator="registry-coregisterantfirstnametextfield"
            fieldName="coRegistrantName"
            label=""
            maxLength={61}
            required={true}
            type="text"
            validation="coRegistrantName"
          />
          <DateInput
            atDateFlag={true}
            autocomplete="off"
            className="my2"
            dataLocator="registry-eventInfoEventDate"
            dateLabel="Select a Date (dd/mm/yyyy)"
            eventDateError=""
            eventType="Wedding"
            format="dd/mm/yyyy"
            futureYearToDisplay={5}
            id="eventDate"
            isMobile={true}
            isNewCalender={true}
            name="eventDate"
            pastYearToDisplay={0}
            required={true}
            validation="eventDateCanada"
            value="4/22/2022"
          />
          <div
            className="pb2 flexCell"
          >
            <div
              className="checkboxCa small-12"
            >
              <Checkbox
                checked={false}
                className="checkboxDisclaimer"
                islablevisible={false}
                name="regEmailOptInCheckBox"
                onSelect={[Function]}
                pointer={false}
                type="checkbox"
              />
            </div>
            <div
              className="renderContent"
            >
              Yes, I want to receive registry exclusive offers, completion discount and expert advice on all registry types.
            </div>
          </div>
          <Button
            aria-label="createRegistryNew-submit"
            className={false}
            data-locator="registryNew-continueBtn"
            id="newRegistry-submitBtn"
            onSubmit={[Function]}
            theme="deactivated"
            type="submit"
            variation="fullWidth"
          >
            create a registry
          </Button>
        </Connect(wrapper)>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `should render FormWrapper, new create registry flow`

```
<div
  className="containerWrapper grid-container"
>
  <Img
    alt="Wedding background image"
    className="createV2BgImage"
    reactImage={true}
    src="https://b3h2.scene7.com/is/image/BedBathandBeyond/ios_createbg_wedding_New_1_2022_10_25?$mApp$"
  />
  <PureComponent(GridX)
    className="grid-container createV2WrapperParent"
  >
    <PureComponent(Cell)
      className="formWrapper mx-auto"
    >
      <div
        className="center mx-auto"
      >
        <Heading
          className="heading mt1 mb1"
        >
          hi Test, cheers to you!
        </Heading>
        <Heading
          className="subHeading"
        >
          Your wedding registry starts now.
        </Heading>
        <Connect(wrapper)
          autoComplete="off"
          className="pt2"
          formWrapperData={Object {}}
          id="newRegistry-formWrapper"
          name="createRegistryNew"
          noValidate={true}
          onSubmit={[Function]}
        >
          <FormInput
            blurHandler={[Function]}
            className="my2"
            defaultValue=""
            hideAriaLabelText={false}
            hideFieldLevelErrorMessage={false}
            id="createRegistryNew"
            isChangedOnce={false}
            isRequired={false}
            labelPosition="prepend"
            name="createRegistryNew-select-options"
            noLabelDisplay={true}
            onFocus={[Function]}
            optionSet={
              Array [
                Object {
                  "eventCode": "BRD",
                  "label": "Wedding",
                  "props": Object {
                    "value": "Wedding",
                  },
                },
                Object {
                  "eventCode": "BA1",
                  "label": "Baby",
                  "props": Object {
                    "value": "Baby",
                  },
                },
                Object {
                  "eventCode": "COL",
                  "label": "College/University",
                  "props": Object {
                    "value": "College/University",
                  },
                },
                Object {
                  "eventCode": "HSW",
                  "label": "Housewarming",
                  "props": Object {
                    "value": "Housewarming",
                  },
                },
                Object {
                  "eventCode": "ANN",
                  "label": "Anniversary",
                  "props": Object {
                    "value": "Anniversary",
                  },
                },
                Object {
                  "eventCode": "COM",
                  "label": "Commitment Ceremony",
                  "props": Object {
                    "value": "Commitment Ceremony",
                  },
                },
                Object {
                  "eventCode": "OTH",
                  "label": "Other",
                  "props": Object {
                    "value": "Other",
                  },
                },
              ]
            }
            position="top"
            selectOption={[Function]}
            showNumericKeypadOnMobile={false}
            tilesLength={-1}
            type="select"
            variationName="dropDownSmall"
            wrapperProps={Object {}}
          />
          <RenderInput
            dataLocator="registry-coregisterantfirstnametextfield"
            fieldName="coRegistrantName"
            label=""
            maxLength={61}
            required={true}
            type="text"
            validation="coRegistrantName"
          />
          <DateInput
            atDateFlag={true}
            autocomplete="off"
            className="my2"
            dataLocator="registry-eventInfoEventDate"
            dateLabel="Select a Date (mm/dd/yyyy)"
            eventDateError=""
            eventType="Wedding"
            format="mm/dd/yyyy"
            futureYearToDisplay={5}
            id="eventDate"
            isMobile={true}
            isNewCalender={true}
            name="eventDate"
            pastYearToDisplay={0}
            required={true}
            validation="eventDate"
            value="4/22/2022"
          />
          <div
            className="pb2 flexCell"
          >
            <div
              className="checkbox small-12"
            >
              <Checkbox
                checked={false}
                className="checkboxDisclaimer"
                islablevisible={false}
                name="regEmailOptInCheckBox"
                onSelect={[Function]}
                pointer={false}
                type="checkbox"
              />
            </div>
            <div
              className="renderContent"
            >
              Yes, I want to receive registry exclusive offers, completion discount and expert advice.
              <button
                className="seemore"
                onClick={[Function]}
              >
                See More.
              </button>
            </div>
          </div>
          <Button
            aria-label="createRegistryNew-submit"
            className={false}
            data-locator="registryNew-continueBtn"
            id="newRegistry-submitBtn"
            onSubmit={[Function]}
            theme="deactivated"
            type="submit"
            variation="fullWidth"
          >
            create a registry
          </Button>
        </Connect(wrapper)>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

