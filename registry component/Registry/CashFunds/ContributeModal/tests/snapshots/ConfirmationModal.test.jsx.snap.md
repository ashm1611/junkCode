# `app/components/Pages/Registry/CashFunds/ContributeModal/tests/ConfirmationModal.test.jsx`

#### `should render correctly`

```
<Fragment>
  <Connect(wrapper)
    identifier="Confirm_Contribute_Modal"
    tealiumPageInfo={
      Object {
        "page_name": "Confirm Contribution",
        "page_type": "Registry",
      }
    }
    utagData={
      Object {
        "cash_fund_name": undefined,
        "link_location_name": "Confirm Contribution",
        "navigation_path": "Cash Fund",
        "page_name": "Confirm Contribution",
        "pagename_breadcrumb": "Confirm Contribution",
        "registry_type": "",
        "subnavigation_path": "Cash Fund",
      }
    }
  />
  <PureComponent(GridX)
    className="confWrapper"
  >
    <PureComponent(Cell)>
      <Img
        alt=""
        reactImage={true}
        src=""
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)>
      <Connect(wrapper)
        additionalClass="mb25"
        formWrapperData={
          Object {
            "email": "",
            "firstName": "",
            "lastName": "",
            "totalGoal": "",
          }
        }
        id="contribute-formWrapper"
        identifier="confirmContribute"
        method="post"
        name="confirmContribute"
        noValidate={true}
        onSubmit={[Function]}
        styles={
          Object {
            "CFContentImg": "CFContentImg",
            "bold": "bold",
            "cashfundInput": "cashfundInput",
            "cfSignInContainer": "cfSignInContainer",
            "cfSucHeader": "cfSucHeader",
            "cfSucWrapper": "cfSucWrapper",
            "cfSuccessImg": "cfSuccessImg",
            "cfWrapper": "cfWrapper",
            "confSubCopy": "confSubCopy",
            "confWrapper": "confWrapper",
            "dntKnow": "dntKnow",
            "flexCell": "flexCell",
            "header": "header",
            "headerWidth": "headerWidth",
            "inputfield": "inputfield",
            "renderContent": "renderContent",
            "subCopy": "subCopy",
            "subHeader": "subHeader",
            "venmoCopy": "venmoCopy",
            "ventoFont": "ventoFont",
            "viewBtn": "viewBtn",
          }
        }
      >
        <div
          className="headerWidth mx-auto mt2"
        >
          <Heading
            className="header"
            level={5}
          >
            please confirm your contribution
          </Heading>
          <p
            className="my1 sm-mx3 confSubCopy"
          >
            This helps the registrant keep track of gifts and send their thanks!
          </p>
        </div>
        <div
          className="pb3"
        >
          <div
            className="inputfield"
          >
            <Connect(wrapper)
              aria-label="firstName_fieldName"
              className=""
              data-locator="GGForm_firstName"
              id="firstName"
              identifier="confirmContribute"
              isRequired={true}
              label="First Name"
              labelPosition="append"
              maxLength={30}
              name="firstName"
              onBlur={[Function]}
              onChange={[Function]}
              onFocus={[Function]}
              placeholder="First Name"
              shouldShowAsterisk={true}
              type="text"
              validation="firstName"
              value=""
            />
          </div>
          <div
            className="inputfield"
          >
            <Connect(wrapper)
              aria-label="lastName_fieldName"
              className=""
              data-locator="GGForm_lastName"
              id="lastName"
              identifier="confirmContribute"
              isRequired={true}
              label="Last Name"
              labelPosition="append"
              maxLength={30}
              name="lastName"
              onBlur={[Function]}
              onChange={[Function]}
              onFocus={[Function]}
              placeholder="Last Name"
              shouldShowAsterisk={true}
              type="text"
              validation="lastName"
              value=""
            />
          </div>
          <div
            className="inputfield"
          >
            <Connect(wrapper)
              aria-label="email_fieldName"
              className=""
              data-locator="GGForm_email"
              id="email"
              identifier="confirmContribute"
              isRequired={true}
              label="Email Address"
              labelPosition="append"
              maxLength={130}
              name="email"
              onBlur={[Function]}
              onChange={[Function]}
              onFocus={[Function]}
              placeholder="Email Address"
              shouldShowAsterisk={true}
              type="text"
              validation="email"
              value=""
            />
          </div>
          <div
            className="inputfield"
          >
            <Connect(wrapper)
              aria-label="totalGoal_fieldName"
              className=""
              data-locator="GGForm_totalGoal"
              id="totalGoal"
              identifier="confirmContribute"
              isRequired={true}
              label="How much did you get the couple?"
              labelPosition="append"
              maxLength={7}
              name="totalGoal"
              onBlur={[Function]}
              onChange={[Function]}
              onFocus={[Function]}
              placeholder="How much did you get the couple?"
              shouldShowAsterisk={true}
              type="text"
              validation="totalGoal"
              value=""
            />
          </div>
        </div>
        <Button
          aria-label="GG-confirm"
          className="pt3"
          data-locator="GG-confirmFormBtn"
          id="GG-confirmBtn"
          identifier="confirmContribute"
          theme="deactivated"
          type="confirm"
          variation="fullWidth"
        >
          confirm contribution
        </Button>
        <div
          className="pt1"
        >
          <PrimaryLink
            href="#"
            onClick={[Function]}
            type="bold"
            variation="primary"
          >
            I didn't contribute
          </PrimaryLink>
        </div>
      </Connect(wrapper)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</Fragment>
```

