# `app/components/Pages/Registry/RegistryOwner/FlipFlop/tests/FlipFlopModal.test.jsx`

#### `should render with mock data`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ModalDialog
    closeIconShow={true}
    mountedState={false}
    titleAriaLabel="flipFlopAriaLabel"
    toggleModalState={[Function]}
    verticallyCenter={true}
  >
    <div
      className="flipFlopModalContent"
    >
      <Icon
        className="flipFlopModalImg"
        focusable="false"
        height={145}
        type="scene7URL"
        width={203}
      />
      <div
        className="flipFlopModalText mb3"
      >
        flipFLopATRError
      </div>
    </div>
  </ModalDialog>
</ErrorBoundary>
```

#### `should render with mock data while calling componentWillRecieveProps`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ModalDialog
    closeIconShow={true}
    mountedState={true}
    titleAriaLabel="flipFlopAriaLabel"
    toggleModalState={[Function]}
    verticallyCenter={true}
  >
    <div
      className="flipFlopModalContent"
    >
      <Icon
        className="flipFlopModalImg"
        focusable="false"
        height={145}
        type="scene7URL"
        width={203}
      />
      <div
        className="flipFlopModalText mb3"
      >
        flipFLopATRError
      </div>
    </div>
  </ModalDialog>
</ErrorBoundary>
```

#### `should render with mock data while calling componentWillRecieveProps with same props`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ModalDialog
    closeIconShow={true}
    mountedState={false}
    titleAriaLabel="flipFlopAriaLabel"
    toggleModalState={[Function]}
    verticallyCenter={true}
  >
    <div
      className="flipFlopModalContent"
    >
      <Icon
        className="flipFlopModalImg"
        focusable="false"
        height={145}
        type="scene7URL"
        width={203}
      />
      <div
        className="flipFlopModalText mb3"
      >
        flipFLopATRError
      </div>
    </div>
  </ModalDialog>
</ErrorBoundary>
```

