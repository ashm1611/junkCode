# `app/components/Pages/Registry/QuickPicks/Collection/tests/QuickPicksCollection.test.js`

#### `should render correctly with default props`

```
<section>
  <ErrorBoundary
    fallback={<InternalServerErrorPage />}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell) />
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell)>
          <div>
            <Connect(wrapper)
              className="center"
              renderBefore="Already have a registry?"
            >
              Sign in
            </Connect(wrapper)>
          </div>
        </PureComponent(Cell)>
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell) />
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <section
      className="collectionViewport mt2"
    >
      <PureComponent(GridContainer)>
        <PureComponent(GridX)
          className="collectionHeader py2 items-center"
        >
          <div
            className="quickPicksItemsHeader large-6 small-12 cell"
          >
            Quick Picks Items
          </div>
          <TopRule />
        </PureComponent(GridX)>
      </PureComponent(GridContainer)>
      <branch(Component)
        categoryId=""
        className="mt0 py2"
        isInternationalUser={false}
        isLoading={false}
        itemRenderer={[Function]}
        items={Array []}
        labels={
          Object {
            "alreadyLoggedIn": "_Log__ged in_",
            "bookAppointment": "_Book Appointment_",
            "customerSupportCTAHeader": "_Need Help?_",
            "findARegistry": "_Find a Registry_",
            "liveChat": "_Live Chat_",
            "referredContent": Array [],
            "signIn": "__Sign_In__",
            "startYourRegistry": "_Start Your Registry_",
          }
        }
        profileHasRegistries={false}
        sddOptions={null}
        switchConfig={null}
        tileActions={
          Object {
            "addToCart": Object {
              "handler": [Function],
              "label": "Add to Cart",
            },
            "addToRegistry": Object {
              "handler": [Function],
              "label": "Add to Registry",
            },
            "chooseOptions": Object {
              "handler": undefined,
              "label": "Choose Options",
            },
            "moreOptions": Object {
              "handler": undefined,
              "label": "More Options",
            },
            "quickView": Object {
              "handler": undefined,
              "label": "Quickview",
            },
            "selectProduct": Object {
              "handler": [Function],
              "label": "",
              "selectedProducts": Object {},
            },
            "updateProductQty": Object {
              "handler": [Function],
              "label": "",
            },
          }
        }
      />
    </section>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell)>
          <ProductCategories
            align="center"
            justifyContent="left"
            textColor="dark"
          />
        </PureComponent(Cell)>
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell) />
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <withReducer(Connect(wrapper)) />
    <withReducer(Connect(wrapper))
      changeStore={true}
      findAStoreModal={true}
    />
    <LeavePageConfirmationModal
      channelType="MobileWeb"
      labels={
        Object {
          "alreadyLoggedIn": "_Log__ged in_",
          "bookAppointment": "_Book Appointment_",
          "customerSupportCTAHeader": "_Need Help?_",
          "findARegistry": "_Find a Registry_",
          "liveChat": "_Live Chat_",
          "referredContent": Array [],
          "signIn": "__Sign_In__",
          "startYourRegistry": "_Start Your Registry_",
        }
      }
      onLeavePageSelected={[Function]}
      onShowChanged={[Function]}
      show={false}
    />
  </ErrorBoundary>
  <Connect(wrapper)
    fireTealium={false}
  />
</section>
```

