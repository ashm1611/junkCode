# `app/components/Pages/Registry/ThankYouManagerLayout/TYMList/EmailList/tests/TymEmail.test.jsx`

#### `tym email should render correctly`

```
<Fragment>
  <PrimaryLink
    className="downloadTYM"
    href="/"
    iconProps={
      Object {
        "height": 23,
        "type": "share-registry",
        "width": 23,
      }
    }
    onClick={[Function]}
    type="bold"
  >
    Email
  </PrimaryLink>
  <ModalDialog
    closeModal={[Function]}
    mountedState={false}
    scrollDisabled={true}
    titleAriaLabel="Email Thank You List Modal"
    toggleModalState={[Function]}
    underlayClickExits={false}
    variation="small"
    verticallyCenter={true}
  >
    <UniversalComponent
      checkBoxChecked={false}
      closeModal={[Function]}
      handleCheckBox={[Function]}
      labels={
        Object {
          "cartContinueShopping": "OK",
          "emailSubject": "tese",
          "emailTitle": "sent mail",
          "savedItemsHeadingLabel": "Thank You List",
          "toEmailLabel": "Send to Email",
          "tymSavedItemsHeadingLabel": "tym list",
          "tymToEmailLabel": "to email",
        }
      }
      submitForm={[Function]}
      variation="emailRegistry"
    />
  </ModalDialog>
</Fragment>
```

#### `tym list email submit call func`

```
<Fragment>
  <PrimaryLink
    className="downloadTYM"
    href="/"
    iconProps={
      Object {
        "height": 23,
        "type": "share-registry",
        "width": 23,
      }
    }
    onClick={[Function]}
    type="bold"
  >
    Email
  </PrimaryLink>
  <ModalDialog
    closeModal={[Function]}
    mountedState={false}
    scrollDisabled={true}
    titleAriaLabel="Email Thank You List Modal"
    toggleModalState={[Function]}
    underlayClickExits={false}
    variation="small"
    verticallyCenter={true}
  >
    <UniversalComponent
      checkBoxChecked={false}
      closeModal={[Function]}
      handleCheckBox={[Function]}
      labels={
        Object {
          "cartContinueShopping": "OK",
          "emailSubject": "tese",
          "emailTitle": "sent mail",
          "savedItemsHeadingLabel": "Thank You List",
          "toEmailLabel": "Send to Email",
          "tymSavedItemsHeadingLabel": "tym list",
          "tymToEmailLabel": "to email",
        }
      }
      submitForm={[Function]}
      variation="emailRegistry"
    />
  </ModalDialog>
</Fragment>
```

#### `should call openModal func`

```
<Fragment>
  <PrimaryLink
    className="downloadTYM"
    href="/"
    iconProps={
      Object {
        "height": 23,
        "type": "share-registry",
        "width": 23,
      }
    }
    onClick={[Function]}
    type="bold"
  >
    Email
  </PrimaryLink>
  <ModalDialog
    closeModal={[Function]}
    mountedState={true}
    scrollDisabled={true}
    titleAriaLabel="Email Thank You List Modal"
    toggleModalState={[Function]}
    underlayClickExits={false}
    variation="small"
    verticallyCenter={true}
  >
    <UniversalComponent
      checkBoxChecked={false}
      closeModal={[Function]}
      emailSentResponse={null}
      handleCheckBox={[Function]}
      labels={
        Object {
          "cartContinueShopping": "OK",
          "emailSubject": "tese",
          "emailTitle": "sent mail",
          "savedItemsHeadingLabel": "Thank You List",
          "toEmailLabel": "Send to Email",
          "tymSavedItemsHeadingLabel": "tym list",
          "tymToEmailLabel": "to email",
        }
      }
      submitForm={[Function]}
      variation="emailRegistry"
    />
  </ModalDialog>
</Fragment>
```

