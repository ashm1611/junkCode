# `app/components/Pages/Registry/GuestViewer/GuestViewerLayout/Dashboard/tests/DashboardDetails.jsx`

#### `should render correctly`

```
<PureComponent(Cell)
  className="small-12 large-10"
>
  <Heading
    aria-hidden="false"
    className="userNameStyle pt1 sm-pt0"
    data-locator="registry-namelabel"
    level={2}
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
      >
        Boy0Girl0
      </dd>
    </div>
    <div
      className="hideOnPrint"
    >
      <dt>
        <span>
          is this yours?
           
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
          "cartContinueShopping": undefined,
          "isThisYoursRegistryLbl": "is this yours?",
        }
      }
    />
  </PureComponent(Cell)>
</PureComponent(Cell)>
```

