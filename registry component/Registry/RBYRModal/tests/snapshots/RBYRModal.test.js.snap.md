# `app/components/Pages/Registry/RBYRModal/tests/RBYRModal.test.js`

#### `should render RBYRModal correctly`

```
<Fragment>
  <ModalDialog
    closeIconShow={true}
    titleAriaLabel="Modal"
    toggleModalState={[Function]}
    variation="medium"
    verticallyCenter={true}
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Connect(wrapper)
        identifier="Registry_RBYR"
        tealiumPageInfoNotAvailable={true}
        utagData={
          Object {
            "category": "Registry",
            "channel": "Registry",
            "navigation_path": "Registry",
            "page_function": "Registry",
            "page_name": "Ship Or Swap>Opt-In Modal",
            "page_type": "Registry",
            "pagename_breadcrumb": "Ship Or Swap>Opt-In Modal",
            "sub_category": "Registry",
            "subnavigation_path": "Registry",
          }
        }
      />
    </ErrorBoundary>
    <p
      className="rbyrModalTitle"
    >
      What is Ship or Swap?
    </p>
    <p
      className="rbyrModalSubTitle mb3"
    >
      When you opt in to Ship or Swap, you're in control of the gifts guests choose to ship to you. Wait until after your event or exchange it for something else on your list. It's your registry - and your gifts - your way.
    </p>
    <PureComponent(GridX)
      className="blueBannerPanel popupPanel"
    >
      <PureComponent(Cell)
        className="px3 pb2 mt3 imagesSection"
      >
        <div>
          <h3
            className="featuresubTitle"
          >
            Flexible Shipping
          </h3>
          <Icon
            className="m2"
            focusable="false"
            height="90px"
            type="ShipOrExchange"
            width="135px"
          />
          <p
            className="featureSubTitleDesc"
          >
            Traveling, moving or just tight on space? We can wait to ship any or all of your gifts until it's convenient for you.
          </p>
        </div>
        <div
          className="middleImage"
        >
          <Icon
            focusable="false"
            height="20px"
            type="plus-black"
            width="20px"
          />
        </div>
        <div>
          <h3
            className="featuresubTitle"
          >
            Easier Exchanges
          </h3>
          <Icon
            className="m2"
            focusable="false"
            height="90px"
            type="buy_you_gifts"
            width="135px"
          />
          <p
            className="featureSubTitleDesc"
          >
            When a guest chooses to ship a registry gift directly to you, you can exchange the item before it goes out - without anyone knowing.
          </p>
        </div>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="small-12 large-12 mt3"
    >
      <PureComponent(Cell)
        className="large-5 small-12 doneButtonStyle"
      >
        <Button
          className="fullWidth"
          onClick={[Function]}
          them="primary"
          theme="primary"
          variation="primary"
        >
          Done
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <div>
      <div
        className="mt3"
      >
        <hr
          className="line"
        />
      </div>
      <div
        className="mt3 center"
      >
        <span
          className="optOutLinkText"
        >
          To opt-out of Ship or Swap go to your registry
        </span>
         
        <PrimaryLink
          className="optOutLink"
          href="#"
          onClick={[Function]}
          variation="myPrefrences"
        >
          settings
        </PrimaryLink>
         
        <span
          className="optOutLinkText"
        >
          click edit & uncheck the box
        </span>
      </div>
    </div>
  </ModalDialog>
  <SuccessOptInModal />
  <ModalDialog
    closeDataLocator="checkout-crossicon"
    dialogClass="hide"
    mountedState={true}
    titleAriaLabel="SignInModal"
    titleClass="mt1 mb1"
    underlayClickExits={false}
    variation="small"
    verticallyCenter={true}
  >
    <UniversalComponent
      RBYRAlreadyOptIn={false}
      SuccessOptInMod={true}
      fromEditForm={true}
      handleLearnMoreClick={[Function]}
      hideLoginView={true}
      inPage={false}
      isFromTipsModule={true}
      loginModalVisibility={true}
      onSelectRBYROption={[Function]}
      openRBYRModal={true}
      rbyrLabels={
        Object {
          "referredContent": Array [
            Object {
              "id": "7728",
              "key": "cashfundworks",
            },
            Object {
              "id": "5534",
              "key": "txt_coupon_cashier_instruction",
            },
          ],
        }
      }
    />
  </ModalDialog>
</Fragment>
```

