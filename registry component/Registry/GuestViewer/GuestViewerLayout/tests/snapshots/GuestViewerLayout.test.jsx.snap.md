# `app/components/Pages/Registry/GuestViewer/GuestViewerLayout/tests/GuestViewerLayout.test.jsx`

#### `should render skeleton when isFetching is true`

```
<div
  className="mb2"
>
  <ModalDialog
    closeDataLocator="checkout-crossicon"
    mountedState={false}
    titleAriaLabel="Attention Gift Giver!"
    titleClass="mt1 mb1"
    toggleModalState={[Function]}
    underlayClickExits={false}
    variation="medium"
    verticallyCenter={true}
  >
    <PureComponent(Cell)>
      <Heading
        className="heading"
        id="giftViewerModallHeading"
        level={2}
        styleVariation="h2-serif"
      >
        Attention Gift Giver!
      </Heading>
      <Paragraph
        className="modalText mt2"
        theme="primary"
        weight=""
      >
        Please allow some time for your purchase to reflect on the registry.
      </Paragraph>
    </PureComponent(Cell)>
  </ModalDialog>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <div
      className="grid-container"
    >
      <ul
        className="list"
        data-locator="Breadcrumbs"
        itemScope={true}
        itemType="http://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope={true}
          itemType="http://schema.org/ListItem"
          key="0"
        >
          <meta
            content={1}
            itemProp="position"
          />
          <PrimaryLink
            href="/"
            itemProp="item"
            title="Home"
          >
            <wrapper
              className="breadCrumb"
              itemProp="name"
            >
              Home
            </wrapper>
          </PrimaryLink>
        </li>
        <li
          itemProp="itemListElement"
          itemScope={true}
          itemType="http://schema.org/ListItem"
          key="1"
        >
          <meta
            content={2}
            itemProp="position"
          />
          <PrimaryLink
            href="/store/page/Registry"
            itemProp="item"
            title="Wedding Registry"
          >
            <wrapper
              className="breadCrumb"
              itemProp="name"
            >
              Wedding Registry
            </wrapper>
          </PrimaryLink>
        </li>
        <wrapper>
          view registry
        </wrapper>
      </ul>
    </div>
    <Skeleton />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <div
      className="registryActionButtonContainer"
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    />
  </ErrorBoundary>
  <PureComponent(GridX)
    className="grid-container"
  >
    <SeoContent
      eventType="Wedding"
      registryData={
        Object {
          "dataFromSolrCall": true,
        }
      }
    />
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <PureComponent(Cell)
        className="mb2 grid-container"
      >
        <wrapper
          className="small-12 large-10 mx-auto my2"
        >
          info
        </wrapper>
      </PureComponent(Cell)>
    </ErrorBoundary>
    <HideOnTbs>
      <ErrorBoundary
        fallback={null}
        routeToSystemErrorPage={false}
      >
        <PureComponent(Cell)
          className="mb2"
        >
          <PerfectGift
            isMobile={false}
            type="gift"
          />
        </PureComponent(Cell)>
      </ErrorBoundary>
    </HideOnTbs>
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <PureComponent(Cell)
        className="mb2"
      >
        <UniversalComponent
          eventType="Wedding"
          getHelp={
            Object {
              "type": "help",
            }
          }
          isMobile={false}
        />
      </PureComponent(Cell)>
    </ErrorBoundary>
  </PureComponent(GridX)>
</div>
```

