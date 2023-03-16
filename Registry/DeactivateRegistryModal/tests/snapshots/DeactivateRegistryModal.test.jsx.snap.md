# `app/containers/Pages/Registry/DeactivateRegistryModal/tests/DeactivateRegistryModal.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <DeactivateRegistryModalComponent
    buttonLabel="Deactivate My Registry"
    deactivateReg={[Function]}
    modalContent="text"
    modalMountedState={false}
    toggleModalState={[Function]}
  />
</ErrorBoundary>
```

#### `should render for else part`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <DeactivateRegistryModalComponent
    deactivateReg={[Function]}
    labels={
      Object {
        "deactivateRegCTA": "deactivateRegCTA",
        "deactivateRegCancelCTA": "deactivateRegCancelCTA",
      }
    }
    modalContent=""
    toggleModalState={[Function]}
  />
</ErrorBoundary>
```

#### `should render without props`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <DeactivateRegistryModalComponent
    deactivateReg={[Function]}
    labels={
      Object {
        "deactivateRegCTA": "deactivateRegCTA",
        "deactivateRegCancelCTA": "deactivateRegCancelCTA",
      }
    }
    modalContent=""
    toggleModalState={[Function]}
  />
</ErrorBoundary>
```

