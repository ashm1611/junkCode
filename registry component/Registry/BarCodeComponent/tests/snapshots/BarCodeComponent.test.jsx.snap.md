# `app/components/Pages/Registry/BarCodeComponent/tests/BarCodeComponent.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ThirdPartyClass
    isAsync={true}
    isEnabled={true}
    loadOnce={true}
    loadedCallback={[Function]}
    scriptId="scriptid"
    selector="head"
    src="somepath"
  />
  <ThirdPartyClass
    isAsync={true}
    isEnabled={true}
    loadOnce={true}
    loadedCallback={[Function]}
    scriptId="scriptid"
    selector="head"
    src="somepath"
  />
  <PureComponent(GridX)
    className="hideOnPrint center barcodeWrapper pt2 pb2"
    data-locator="registry-barcode"
  >
    <PrimaryLink
      href="#"
      iconProps={
        Object {
          "height": "18px",
          "type": "barcode",
          "width": "30px",
        }
      }
      onClick={[Function]}
      type="bold"
    >
      Barcode ID
    </PrimaryLink>
  </PureComponent(GridX)>
</ErrorBoundary>
```

#### `should render correctly when scripts are loaded`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <PureComponent(GridX)
    className="hideOnPrint center barcodeWrapper pt2 pb2"
    data-locator="registry-barcode"
  >
    <PrimaryLink
      href="#"
      iconProps={
        Object {
          "height": "18px",
          "type": "barcode",
          "width": "30px",
        }
      }
      onClick={[Function]}
      type="bold"
    >
      Barcode ID
    </PrimaryLink>
  </PureComponent(GridX)>
</ErrorBoundary>
```

