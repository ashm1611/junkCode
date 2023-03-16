# `app/components/Pages/Registry/CashFunds/ContributeModal/tests/ContributeModalComponent.test.jsx`

#### `should render ContributeModalComponent component correctly`

```
<Fragment>
  <Connect(wrapper)
    identifier="Contribute_Modal"
    tealiumPageInfo={
      Object {
        "page_name": "Contribute to cash fund",
        "page_type": "Registry",
      }
    }
    utagData={
      Object {
        "cash_fund_name": undefined,
        "link_location_name": "Contribute to cash fund",
        "navigation_path": "Cash Fund",
        "page_name": "Contribute to cash fund",
        "pagename_breadcrumb": "Contribute to cash fund",
        "registry_type": "",
        "subnavigation_path": "Cash Fund",
      }
    }
  />
  <Connect(wrapper)
    closeIconShow={true}
    contentWrapperClass="cfWrapper"
    mountedState={true}
    onModalClose={[Function]}
    scrollDisabled={true}
    titleAriaLabel="CashFunds-Modal"
    variation="small"
    verticallyCenter={true}
  >
    <ConfirmationModal
      activeRegistry={
        Object {
          "registryType": Object {
            "registryTypeName": "OTH",
          },
        }
      }
      cashfundsModalState={true}
      dynamicData={
        Object {
          "CreateImg": Object {
            "src": "//b3h2.scene7.com/is/image/BedBathandBeyond/gift?$contentFlat$",
          },
          "createSubHeading": "test",
          "ggHeading": "please confirm your contribution",
          "ggSubcopy": "This helps the registrant keep track of gifts and send their thanks!",
        }
      }
      ggFormData={
        Object {
          "email": "",
          "emailError": "",
          "firstName": "",
          "firstNameError": "",
          "lastName": "",
          "lastNameError": "",
          "totalGoal": "",
          "totalGoalError": "",
        }
      }
      handleCashFundsModal={[Function]}
      regCashFundEventTypes={
        Object {
          "BBBYOTH": Object {},
        }
      }
      setGGFormData={[Function]}
      siteId="BedBathUS"
    />
  </Connect(wrapper)>
</Fragment>
```

#### `should render ContributeModalComponent null for cashfundsModalState false`

```
<Fragment>
  <Connect(wrapper)
    identifier="Contribute_Modal"
    tealiumPageInfo={
      Object {
        "page_name": "Contribute to cash fund",
        "page_type": "Registry",
      }
    }
    utagData={
      Object {
        "cash_fund_name": undefined,
        "link_location_name": "Contribute to cash fund",
        "navigation_path": "Cash Fund",
        "page_name": "Contribute to cash fund",
        "pagename_breadcrumb": "Contribute to cash fund",
        "registry_type": "",
        "subnavigation_path": "Cash Fund",
      }
    }
  />
  <Connect(wrapper)
    closeIconShow={true}
    contentWrapperClass="cfWrapper"
    mountedState={true}
    onModalClose={[Function]}
    scrollDisabled={true}
    titleAriaLabel="CashFunds-Modal"
    variation="small"
    verticallyCenter={true}
  >
    <Img
      alt=""
      className="CFContentImg"
      reactImage={true}
      src=""
    />
    <div
      className="grid-container mainContainer"
    >
      <Heading
        className="header"
        level={5}
      />
      <Heading
        className="subHeader"
        level={6}
      />
      <p
        className="sendMoney"
      />
      <p
        className="sendMoney"
      >
        Sending to: @undefined
      </p>
      <div
        className="flexCell"
      >
        <div
          className="small-12"
        >
          <Checkbox
            checked={true}
            id="checkbox-1"
            islablevisible={false}
            name="cashFundsCheckBox"
            onChange={[Function]}
            onClick={[Function]}
            onSelect={[Function]}
            pointer={false}
            type="checkbox"
          />
        </div>
        <div
          className="renderContent"
        >
          I acknowledge cash funds are not governed by Bed Bath & Beyond and solely subject to
          <PrimaryLink
            className="tnc"
            href="https://venmo.com/legal/us-user-agreement/"
            id="tncVemo"
            isHardSpaReq={true}
            target="_blank"
            variation="primary"
          >
            Venmo's Terms & Conditions.
          </PrimaryLink>
          To learn more
          <PrimaryLink
            className="tnc"
            href="/store/static/registry_cash_funds"
            id="tncLandingPage"
            isHardSpaReq={true}
            target="_blank"
            variation="primary"
          >
            click here
          </PrimaryLink>
        </div>
      </div>
      <Button
        aria-label="continue"
        className={null}
        data-locator="continueFormBtn"
        disabled={true}
        id="cashFunds-continueBtn"
        onClick={[Function]}
        onSubmit="#"
        theme="primary"
        type="continue"
        variation="fullWidth"
      >
        continue to venmo
      </Button>
    </div>
  </Connect(wrapper)>
</Fragment>
```

