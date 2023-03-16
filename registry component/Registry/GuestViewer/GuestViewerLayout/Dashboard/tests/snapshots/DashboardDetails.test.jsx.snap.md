# `app/components/Pages/Registry/GuestViewer/GuestViewerLayout/Dashboard/tests/DashboardDetails.test.jsx`

#### `should render correctly`

```
<PureComponent(Cell)
  className="small-12 large-10"
>
  <Heading
    aria-hidden="false"
    className="userNameStyle pt1 sm-pt0"
    data-locator="registry-namelabel"
    level={1}
  >
       & 
    's
     
     
    Registry
  </Heading>
  <Instrumentation
    markName="ux-text-registrant-name"
    zoneName="ux-primary-content-displayed"
  />
  <dl>
    <div
      className="mr2 sm-mr2 xs-mr2"
      data-locator="registry-idlink"
    >
      <dt />
      <dd
        className=""
      />
    </div>
    <div
      className="mr2 sm-mr2 xs-mr2"
      data-locator="registry-datelink"
    >
      <dt />
      <dd
        className=""
      />
    </div>
    <Instrumentation
      markName="ux-text-event-date"
      zoneName="ux-primary-content-displayed"
    />
    <div
      className="mr2 sm-mr2 xs-mr2"
      data-locator="registry-gender"
    >
      <dt />
      <dd
        className=""
      />
    </div>
    <div
      className="hideOnPrint"
    >
      <dt>
        <span>
          Is this your registry?
           
        </span>
        <PrimaryLink
          type="bold"
          variation="primary"
        />
      </dt>
      <dd />
    </div>
  </dl>
  <PureComponent(Cell)
    className="registryActionButton"
  >
    <RegistryActionButtons
      eventType="Baby"
      gender=""
      labels={
        Object {
          "createRegistry": Object {
            "Boy0Girl1": "1 Girl",
            "Boy0Girl2": "2 Girls",
            "Boy0Girl3": "3 Girls",
            "Boy1Girl0": "1 Boy",
            "Boy1Girl1": "1 Boy & 1 Girl",
            "Boy1Girl2": "1 Boy & 2 Girls",
            "Boy2Girl0": "2 Boys",
            "Boy2Girl1": "2 Boys & 1 Girl",
            "Boy3Girl0": "3 Boys",
            "abc": "abc",
          },
          "registryDetails": Object {
            "isThisYoursRegistryLbl": "is this yours?",
          },
        }
      }
      registryLabel={
        Object {
          "cartContinueShopping": "OK",
          "emailCheckboxLabel": "Send me a copy of the email",
          "formLabel": "You may enter up to 10 email addresses. Separate multiple addresses with semicolons.",
          "fromEmailLabel": "Your Email",
          "messageLabel": "Comments",
          "savedItemsHeadingLabel": "Email Your Registry to Friends",
          "submitButtonLabel": "Submit",
          "toEmailLabel": "Your Friend's Email",
        }
      }
    />
  </PureComponent(Cell)>
</PureComponent(Cell)>
```

