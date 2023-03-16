# `app/containers/Pages/Registry/CreateRegistry/BabyMultiples/tests/BabyMultiples.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <BabyMultiplesComponent
    isContentAvaible={true}
    isCreateMode={true}
    isMobile={false}
    styles={Object {}}
    surveyComponentContentObj={
      Object {
        "body": "text",
      }
    }
    updateState={[Function]}
  />
</ErrorBoundary>
```

#### `should render correctly if no content`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <BabyMultiplesComponent
    isContentAvaible={true}
    isCreateMode={true}
    isMobile={false}
    styles={Object {}}
    surveyComponentContentObj={Object {}}
    updateState={[Function]}
  />
</ErrorBoundary>
```

#### `should render null if no content id`

```
""
```

