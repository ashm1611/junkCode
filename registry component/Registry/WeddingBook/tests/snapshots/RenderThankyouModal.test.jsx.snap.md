# `app/components/Pages/Registry/WeddingBook/tests/RenderThankyouModal.test.jsx`

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
    mountedState={true}
    onModalDidClose={[Function]}
    scrollDisabled={true}
    titleAriaLabel="Thankyou For Your Request!"
    toggleModalState={[Function]}
    underlayClickExits={false}
    variation="medium"
    verticallyCenter={true}
  >
    <div>
      <h2
        className="heading mb2"
      >
        Thankyou For Your Request!
      </h2>
      <p
        className="description mb2"
      >
        You will receive a copy of the howbook in the mail shortly. Why not to tell a friend how to get their own copy
      </p>
      <Button
        className="mb2 mr1 sm-mr0 large-5 small-12"
        data-locator="thankyoumodal-cancel"
        onClick={[Function]}
        theme="primary"
      >
        Cancel
      </Button>
    </div>
  </ModalDialog>
</ErrorBoundary>
```

