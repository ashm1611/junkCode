# `app/components/Pages/Registry/QuickPicks/LeavePageConfirmationModal/tests/LeavePageConfirmationModal.test.jsx`

#### `should render correctly with default props`

```
<ModalDialog
  mountedState={true}
  onModalClose={[Function]}
  scrollDisabled={true}
  titleAriaLabel="Quick Picks Collection Confirmation Dialog"
  toggleModalState={[Function]}
  underlayStyle={
    Object {
      "zIndex": 10100,
    }
  }
  variation="small"
  verticallyCenter={true}
>
  <section
    className="base flex justify-center flex-column p2"
  >
    <div
      className="leavePageConfirmationMessage center mx3 mb3"
    >
      Are you sure you want to leave this page?
    </div>
    <div
      className="buttonPanel flex justify-center nowrap p2"
    >
      <Button
        className="button flex-auto mx1 buttonStayPage"
        onClick={[Function]}
        theme="primary"
        variation="primary"
      >
        Stay on Page
      </Button>
      <Button
        className="button flex-auto mx1 buttonLeavePage"
        onClick={[Function]}
        theme="primary"
        variation="secondary"
      >
        Keep Shopping
      </Button>
    </div>
  </section>
</ModalDialog>
```

#### `should render correctly on desktop`

```
<ModalDialog
  mountedState={true}
  onModalClose={[Function]}
  scrollDisabled={true}
  titleAriaLabel="Quick Picks Collection Confirmation Dialog"
  toggleModalState={[Function]}
  underlayStyle={
    Object {
      "zIndex": 10100,
    }
  }
  variation="small"
  verticallyCenter={true}
>
  <section
    className="base flex justify-center flex-column p2"
  >
    <div
      className="leavePageConfirmationMessage center mx3 mb3"
    >
      Are you sure you want to leave this page?
    </div>
    <div
      className="buttonPanel flex justify-center nowrap p2"
    >
      <Button
        className="button flex-auto mx1 buttonStayPage"
        onClick={[Function]}
        theme="primary"
        variation="primary"
      >
        Stay on Page
      </Button>
      <Button
        className="button flex-auto mx1 buttonLeavePage"
        onClick={[Function]}
        theme="primary"
        variation="secondary"
      >
        Leave Page
      </Button>
    </div>
  </section>
</ModalDialog>
```

