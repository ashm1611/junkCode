# `app/components/Pages/Registry/CreateRegistry/Components/ProfileExtendModal/test/ProfileExtendModal.test.jsx`

#### `should render correctly`

```
<ReferredContentModal
  contentClassName="accountDetectedBodyText"
  heading="Account Creation"
  headingClassName="accountDetectedHeading mb3"
  headingLevel={2}
  modalProps={
    Object {
      "closeDataLocator": "registry-modalcloseicon",
      "contentWrapperClass": "accountDetectedBodyText",
      "dialogClass": "hide",
      "modalDataLocator": "registry-modaloverlay",
      "mountedState": true,
      "scrollDisabled": false,
      "titleAriaLabel": "Account Creation",
      "toggleModalState": undefined,
      "variation": "medium",
      "verticallyCenter": true,
    }
  }
>
  <PureComponent(GridX)
    className="sm-mt2"
  >
    <PureComponent(Cell)>
      <Connect(wrapper)
        id="extendPassword"
        name="extendPasswordForm"
        noValidate={true}
        onSubmit={[Function]}
      >
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="cell large-8 small-12 my2"
          >
            <PasswordValidation
              confirmPasswordClassName=""
              confirmPasswordRequired={false}
              disableConfirmPassword={false}
              disabledPassword=""
              firstName=""
              firstNameRequired={false}
              formWrapperIdentifier=""
              hidePasswordValidationMessages={true}
              isDisplayPasswordShowBtn={true}
              isProfileExist={false}
              labels={Object {}}
              lastName=""
              layout="1x2"
              newPasswordFieldClassName=""
              passwordErrorPresent={[Function]}
              removePasswordSpaceBottom={false}
              uniqueId="RegistryForm"
              validationToCheck="required"
            />
          </PureComponent(Cell)>
          <UniversalComponent />
          <PureComponent(Cell)
            className="small-12 large-12 marb40 inline-block"
          >
            <Checkbox
              checked={false}
              islablevisible={true}
              label="Opt in to Buy Buy Baby emails"
              name="signUp"
              onSelect={[Function]}
              pointer={false}
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="small-12 large-6 marb40"
          >
            <Button
              aria-label="extend-password-submit"
              className="mb0"
              id="extendPasswordSubmit"
              theme="primary"
              type="submit"
              variation="fullWidth"
            >
              Extend Account
            </Button>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PrimaryLink
          href="#"
          id="cancel"
          onClick={[Function]}
          type="bold"
          variation="primary"
        >
          Cancel
        </PrimaryLink>
      </Connect(wrapper)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</ReferredContentModal>
```

#### `should render captcha on account detected modal when global and page switch added for captcha.`

```
<ReferredContentModal
  content="I Should Rendered"
  contentClassName="accountDetectedBodyText"
  heading="Account Creation"
  headingClassName="accountDetectedHeading mb3"
  headingLevel={2}
  modalProps={
    Object {
      "closeDataLocator": "registry-modalcloseicon",
      "contentWrapperClass": "accountDetectedBodyText",
      "dialogClass": undefined,
      "modalDataLocator": "registry-modaloverlay",
      "mountedState": undefined,
      "scrollDisabled": false,
      "titleAriaLabel": "Account Creation",
      "toggleModalState": undefined,
      "variation": "medium",
      "verticallyCenter": true,
    }
  }
>
  <PureComponent(GridX)
    className="sm-mt2"
  >
    <PureComponent(Cell)>
      <Connect(wrapper)
        id="extendPassword"
        name="extendPasswordForm"
        noValidate={true}
        onSubmit={[Function]}
      >
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="cell large-8 small-12 my2"
          >
            <PasswordValidation
              confirmPasswordClassName=""
              confirmPasswordRequired={false}
              disableConfirmPassword={false}
              disabledPassword=""
              firstName=""
              firstNameRequired={false}
              formWrapperIdentifier=""
              hidePasswordValidationMessages={true}
              isDisplayPasswordShowBtn={true}
              isProfileExist={false}
              labels={Object {}}
              lastName=""
              layout="1x2"
              newPasswordFieldClassName=""
              passwordErrorPresent={[Function]}
              removePasswordSpaceBottom={false}
              uniqueId=""
              validationToCheck="required"
            />
          </PureComponent(Cell)>
          <UniversalComponent />
          <PureComponent(Cell)
            className="small-12 large-12 marb40 inline-block"
          >
            <Checkbox
              checked={false}
              islablevisible={true}
              label="Opt in to Bed Bath & Beyond emails"
              name="signUp"
              onSelect={[Function]}
              pointer={false}
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="small-12 large-6 marb40"
          >
            <Button
              aria-label="extend-password-submit"
              className="mb0"
              id="extendPasswordSubmit"
              theme="primary"
              type="submit"
              variation="fullWidth"
            >
              Extend Account
            </Button>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PrimaryLink
          href="#"
          id="cancel"
          onClick={[Function]}
          type="bold"
          variation="primary"
        >
          Cancel
        </PrimaryLink>
      </Connect(wrapper)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</ReferredContentModal>
```

