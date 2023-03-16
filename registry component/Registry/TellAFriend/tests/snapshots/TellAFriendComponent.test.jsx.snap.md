# `app/components/Pages/Registry/TellAFriend/tests/TellAFriendComponent.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ModalDialog
    closeIconShow={true}
    customCloseIcon={
      <Icon
        focusable="false"
        height="16px"
        type="close-icon"
        width="16px"
      />
    }
    initialFocus=".rclCloseBtnWrapper"
    scrollDisabled={true}
    titleAriaLabel="Edit My Registry Details"
    underlayClickExits={false}
    variation="large"
    verticallyCenter={true}
  >
    <TellAFriendForm
      error="Something Went wrong"
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
      identifier="tellAFried"
    />
  </ModalDialog>
</ErrorBoundary>
```

