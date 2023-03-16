# `app/containers/Pages/Registry/RegistryAnalyzer/tests/RegistryAnalyzer.test.jsx`

#### `should render RegistryAnalyzer correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <RegistryAnalyzer
    clearSearchTerm={[Function]}
    disableMyAnalyzerBtn={[Function]}
    getRegAnalyzerDetails={[Function]}
  />
</ErrorBoundary>
```

#### ``should render RegistryAnalyzer correctly if `regAnalyzerSwitchConfig` is true as string``

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <RegistryAnalyzer
    disableMyAnalyzerBtn={[Function]}
    getRegAnalyzerDetails={[Function]}
    regAnalyzerSwitchConfig="true"
  />
</ErrorBoundary>
```

#### ``should render RegistryAnalyzer null if `regAnalyzerSwitchConfig` is false``

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <RegistryAnalyzer
    disableMyAnalyzerBtn={[Function]}
    getRegAnalyzerDetails={[Function]}
    regAnalyzerSwitchConfig="false"
  />
</ErrorBoundary>
```

#### ``should render RegistryAnalyzer null if `regAnalyzerSwitchConfig` is false as boolean``

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <RegistryAnalyzer
    disableMyAnalyzerBtn={[Function]}
    getRegAnalyzerDetails={[Function]}
    regAnalyzerSwitchConfig={false}
  />
</ErrorBoundary>
```

