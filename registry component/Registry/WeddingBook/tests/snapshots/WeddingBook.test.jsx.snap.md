# `app/components/Pages/Registry/WeddingBook/tests/WeddingBook.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <WeddingBookForm
    error={Object {}}
    formWrapperData={
      Object {
        "firstName": Object {
          "firstNameError": "",
          "value": "abc",
        },
        "lastName": Object {
          "firstNameError": "",
          "value": "bcc",
        },
      }
    }
    identifier="weddingBook"
    resetFormDataFields={[Function]}
    result={true}
    submitWeddingBook={[Function]}
  />
</ErrorBoundary>
```

#### `should render correctly when isMoile is passed`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <WeddingBookForm
    error={Object {}}
    formWrapperData={
      Object {
        "firstName": Object {
          "firstNameError": "",
          "value": "abc",
        },
        "lastName": Object {
          "firstNameError": "",
          "value": "bcc",
        },
      }
    }
    identifier="weddingBook"
    isMobile={true}
    resetFormDataFields={[Function]}
    result={true}
    submitWeddingBook={[Function]}
  />
</ErrorBoundary>
```

