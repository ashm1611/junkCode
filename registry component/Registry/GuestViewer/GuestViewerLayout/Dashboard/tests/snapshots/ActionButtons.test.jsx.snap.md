# `app/components/Pages/Registry/GuestViewer/GuestViewerLayout/Dashboard/tests/ActionButtons.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ul
    className="grid-x hideOnPrint"
  >
    <li
      className="pl3"
      data-locator="registry-createdregistry-landingpage-print-registry"
    >
      <PrimaryLink
        href="/store/viewitems/printRegistry?registryID=undefined&eventType=null&eventDate=null&primaryRegistrantFirstName=undefined&coRegistrantFirstName=undefined&giftRegistered=undefined&giftPurchased=undefined&babyGender=null&gender=undefined"
        iconProps={
          Object {
            "height": "20px",
            "type": "print-registry",
            "width": "20px",
          }
        }
        isIconAfterContent={false}
        rel="noopener"
        target="_blank"
        type="bold"
        variation="primaryColoredIcon"
      >
        Print Registry
      </PrimaryLink>
    </li>
  </ul>
</ErrorBoundary>
```

#### `should render correctly without props`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ul
    className="grid-x hideOnPrint"
  >
    <li
      className="pl3"
      data-locator="registry-createdregistry-landingpage-print-registry"
    >
      <PrimaryLink
        href="/store/viewitems/printRegistry?registryID=undefined&eventType=null&eventDate=null&primaryRegistrantFirstName=undefined&coRegistrantFirstName=undefined&giftRegistered=undefined&giftPurchased=undefined&babyGender=null&gender=undefined"
        iconProps={
          Object {
            "height": "20px",
            "type": "print-registry",
            "width": "20px",
          }
        }
        isIconAfterContent={false}
        rel="noopener"
        target="_blank"
        type="bold"
        variation="primaryColoredIcon"
      >
        Print Registry
      </PrimaryLink>
    </li>
  </ul>
</ErrorBoundary>
```

