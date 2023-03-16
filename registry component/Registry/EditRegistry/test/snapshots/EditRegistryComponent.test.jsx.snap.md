# `app/components/Pages/Registry/EditRegistry/test/EditRegistryComponent.test.jsx`

#### `renderBabyOrOtherForm: should render Baby registry correctly`

```
<Fragment>
  <div
    aria-hidden="true"
    className="clickable"
  >
    <Icon
      focusable="false"
      height="42px"
      type="undefined-gear"
      width="42px"
    />
  </div>
  <div>
    <PrimaryLink
      className="details inline-block"
      data-locator="registry-editlink"
      href="#"
      textDecoration="textDecorationNone"
      variation="primary"
    >
      Complete your profile
    </PrimaryLink>
    <span
      className="detailsValue"
    >
      to share your profile with friends and family
    </span>
  </div>
  <ModalDialog
    closeIconShow={true}
    contentWrapperClass="paddingMobile py3"
    dialogClass="editRegistryModal"
    mountedState={true}
    scrollDisabled={true}
    titleAriaLabel="Edit My Registry Details"
    underlayClickExits={false}
    variation="large"
  >
    <form
      autoComplete="off"
      method="post"
      name="editRegistry"
      noValidate={true}
      onSubmit={[Function]}
    >
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakefirstName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakefirstName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeLastName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeLastName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakepassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakepassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeconfirmpassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeconfirmpassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FocusableComponent
        keyForTriggeringFocus={0}
        wrapperClassName=""
      >
        <Notification
          content=" Some message"
          height="18px"
          iconPosition="mr2"
          spaceClass="py1 px2"
          status="error"
          theme=""
          width="18px"
          wrapperClass="p1 mb2"
        />
      </FocusableComponent>
      <Notification
        content="<b>Oh, snap!</b> Something went wrong and we couldn't get your information. Please try refreshing the page or coming back later."
        height="18px"
        iconPosition="mr2"
        spaceClass="py1 px2"
        status="error"
        theme=""
        width="18px"
        wrapperClass="p1 mb2"
      />
      <Heading
        className="editModalHeading mb15"
        data-locator="registry-editregistry-popup-header"
        level={1}
      >
        Edit My Registry Details
      </Heading>
      <fieldset
        className="fieldsetMinWidth"
        disabled={true}
      >
        <EditOtherRegistry
          babyRecommendations="Baby"
          coRegOwner={null}
          createRegistryLabels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "deleteRegistry",
                },
              ],
              "test": "key",
            }
          }
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registery-editregistery-aptnumber",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registery-editregistery-imbride",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registery-editregistery-email",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFirstName": "registery-editregistery-firstname",
              "registryGroomOption": "registery-editregistery-imgroom",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registry-editregistry-popup-header",
              "registryLastName": "registery-editregistery-lastname",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registery-editregistery-phonenumber",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registry-editregistry-save-button",
              "registryRegTypePrivate": "registry-editregistry-private-radiobutton",
              "registryRegTypePublic": "registry-editregistry-public-radiobutton",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registery-editregistery-coregimbride",
              "registrycoEmail": "registery-editregistery-coregemail",
              "registrycoFirstName": "registery-editregistery-coregfirstname",
              "registrycoGroomOption": "registery-editregistery-coregimgroom",
              "registrycoLastName": "registery-editregistery-coreglastname",
            }
          }
          dynamicContentState={
            Object {
              "content": Object {
                "body": "test body data",
                "id": "12441",
              },
            }
          }
          editModalError={true}
          getContent={[Function]}
          labels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "davidBridalEditModalContent",
                },
              ],
              "test": "key",
            }
          }
          registryDetails={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "Wedding",
                },
              },
              "test": "value",
            }
          }
          registryID="123456"
          setRegistryFavStoreSearchFlag={[Function]}
          signInDetails={
            Object {
              "editText": "Edit",
            }
          }
          stateObj={
            Object {
              "addressOne": "",
              "addressOneError": "",
              "addressTwo": "",
              "addressTwoError": "",
              "apartment": "",
              "apartmentError": "",
              "babyExpectedArivalDate": "",
              "babyExpectedArivalDateError": "",
              "babyGender": "",
              "babyMaidenName": "",
              "babyMaidenNameError": "",
              "babyNurseryTheme": "",
              "city": "",
              "cityError": "",
              "coEmail": "",
              "coEmailError": "",
              "coFirstName": "",
              "coFirstNameError": "",
              "coGender": "",
              "coLastName": "",
              "coLastNameError": "",
              "coRegProfileStatus": "false",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "errorMessages": Object {
                "message": "An error occurred : Some message",
              },
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "gender": "",
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
              "modalMountedState": true,
              "moveInApartment": "",
              "moveInApartmentError": "",
              "moveInStreet": "",
              "moveInStreetError": "",
              "password": "",
              "passwordError": true,
              "primaryPh": "",
              "primaryPhError": "",
              "shippingApartment": "",
              "shippingApartmentError": "",
              "shippingPhone": "",
              "shippingPhoneError": "",
              "shippingStreet": "",
              "shippingStreetError": "",
              "showMoveInInfo": false,
              "showShippingInfo": false,
              "showerDate": "",
              "showerDateError": "",
              "state": "",
              "stateError": "",
              "street": "",
              "streetError": "",
              "subscribeSelected": false,
              "thirdPartySelected": false,
              "zip": "",
              "zipError": "",
            }
          }
          switchConfigGlobal={
            Object {
              "enableCSLabels": true,
            }
          }
        />
      </fieldset>
      <Button
        aria-label="editRegistry-submit"
        className="buttonClass"
        data-locator="registry-editregistry-save-button"
        disabled={true}
        id="editRegistry-submit"
        onSubmit={[Function]}
        theme="primary"
        type="submit"
      >
        Save Changes
      </Button>
    </form>
    <UniversalComponent
      changeStore={true}
      findAStoreModal={true}
      setPickUpInStoreModalOpen={[Function]}
      setRegistryFavStoreSearchFlag={[Function]}
    />
  </ModalDialog>
</Fragment>
```

#### `when isbabytbs is true `

```
<Fragment>
  <div
    aria-hidden="true"
    className="clickable"
  >
    <Icon
      focusable="false"
      height="42px"
      type="undefined-gear"
      width="42px"
    />
  </div>
  <div>
    <PrimaryLink
      className="details inline-block"
      data-locator="registry-editlink"
      href="#"
      textDecoration="textDecorationNone"
      variation="primary"
    >
      Edit/ Change your Privacy Setting
    </PrimaryLink>
    <span
      className="detailsValue"
    >
      to share your profile with friends and family
    </span>
  </div>
  <ModalDialog
    closeIconShow={true}
    contentWrapperClass="paddingMobile py3"
    dialogClass="editRegistryModal"
    mountedState={true}
    scrollDisabled={true}
    titleAriaLabel="Edit My Registry Details"
    underlayClickExits={false}
    variation="large"
  >
    <form
      autoComplete="off"
      method="post"
      name="editRegistry"
      noValidate={true}
      onSubmit={[Function]}
    >
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakefirstName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakefirstName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeLastName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeLastName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakepassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakepassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeconfirmpassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeconfirmpassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FocusableComponent
        keyForTriggeringFocus={0}
        wrapperClassName=""
      >
        <Notification
          content=" Some message"
          height="18px"
          iconPosition="mr2"
          spaceClass="py1 px2"
          status="error"
          theme=""
          width="18px"
          wrapperClass="p1 mb2"
        />
      </FocusableComponent>
      <Notification
        content="<b>Oh, snap!</b> Something went wrong and we couldn't get your information. Please try refreshing the page or coming back later."
        height="18px"
        iconPosition="mr2"
        spaceClass="py1 px2"
        status="error"
        theme=""
        width="18px"
        wrapperClass="p1 mb2"
      />
      <Heading
        className="editModalHeading mb15"
        data-locator="registry-editregistry-popup-header"
        level={1}
      >
        Edit My Registry Details
      </Heading>
      <fieldset
        className="fieldsetMinWidth"
        disabled={true}
      >
        <EditOtherRegistry
          babyRecommendations="Baby"
          coRegOwner={null}
          createRegistryLabels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "deleteRegistry",
                },
              ],
              "test": "key",
            }
          }
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registery-editregistery-aptnumber",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registery-editregistery-imbride",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registery-editregistery-email",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFirstName": "registery-editregistery-firstname",
              "registryGroomOption": "registery-editregistery-imgroom",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registry-editregistry-popup-header",
              "registryLastName": "registery-editregistery-lastname",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registery-editregistery-phonenumber",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registry-editregistry-save-button",
              "registryRegTypePrivate": "registry-editregistry-private-radiobutton",
              "registryRegTypePublic": "registry-editregistry-public-radiobutton",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registery-editregistery-coregimbride",
              "registrycoEmail": "registery-editregistery-coregemail",
              "registrycoFirstName": "registery-editregistery-coregfirstname",
              "registrycoGroomOption": "registery-editregistery-coregimgroom",
              "registrycoLastName": "registery-editregistery-coreglastname",
            }
          }
          dynamicContentState={
            Object {
              "content": Object {
                "body": "test body data",
                "id": "12441",
              },
            }
          }
          editModalError={true}
          getContent={[Function]}
          labels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "davidBridalEditModalContent",
                },
              ],
              "test": "key",
            }
          }
          registryDetails={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "Wedding",
                },
              },
              "test": "value",
            }
          }
          registryID="123456"
          setRegistryFavStoreSearchFlag={[Function]}
          signInDetails={
            Object {
              "editText": "Edit",
            }
          }
          stateObj={
            Object {
              "addressOne": "",
              "addressOneError": "",
              "addressTwo": "",
              "addressTwoError": "",
              "apartment": "",
              "apartmentError": "",
              "babyExpectedArivalDate": "",
              "babyExpectedArivalDateError": "",
              "babyGender": "",
              "babyMaidenName": "",
              "babyMaidenNameError": "",
              "babyNurseryTheme": "",
              "city": "",
              "cityError": "",
              "coEmail": "",
              "coEmailError": "",
              "coFirstName": "",
              "coFirstNameError": "",
              "coGender": "",
              "coLastName": "",
              "coLastNameError": "",
              "coRegProfileStatus": "false",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "errorMessages": Object {
                "message": "An error occurred : Some message",
              },
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "gender": "",
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
              "modalMountedState": true,
              "moveInApartment": "",
              "moveInApartmentError": "",
              "moveInStreet": "",
              "moveInStreetError": "",
              "password": "",
              "passwordError": true,
              "primaryPh": "",
              "primaryPhError": "",
              "shippingApartment": "",
              "shippingApartmentError": "",
              "shippingPhone": "",
              "shippingPhoneError": "",
              "shippingStreet": "",
              "shippingStreetError": "",
              "showMoveInInfo": false,
              "showShippingInfo": false,
              "showerDate": "",
              "showerDateError": "",
              "state": "",
              "stateError": "",
              "street": "",
              "streetError": "",
              "subscribeSelected": false,
              "thirdPartySelected": false,
              "zip": "",
              "zipError": "",
            }
          }
          switchConfigGlobal={
            Object {
              "enableCSLabels": true,
            }
          }
        />
      </fieldset>
      <Button
        aria-label="editRegistry-submit"
        className="buttonClass"
        data-locator="registry-editregistry-save-button"
        disabled={true}
        id="editRegistry-submit"
        onSubmit={[Function]}
        theme="primary"
        type="submit"
      >
        Save Changes
      </Button>
    </form>
    <UniversalComponent
      changeStore={true}
      findAStoreModal={true}
      setPickUpInStoreModalOpen={[Function]}
      setRegistryFavStoreSearchFlag={[Function]}
    />
  </ModalDialog>
</Fragment>
```

#### `isbabytbs `

```
<Fragment>
  <div
    aria-hidden="true"
    className="clickable"
  >
    <Icon
      focusable="false"
      height="42px"
      type="undefined-gear"
      width="42px"
    />
  </div>
  <div>
    <PrimaryLink
      className="details inline-block"
      data-locator="registry-editlink"
      href="#"
      textDecoration="textDecorationNone"
      variation="primary"
    >
      Edit/ Change your Privacy Setting
    </PrimaryLink>
    <span
      className="detailsValue"
    >
      to share your profile with friends and family
    </span>
  </div>
  <ModalDialog
    closeIconShow={true}
    contentWrapperClass="paddingMobile py3"
    dialogClass="editRegistryModal"
    mountedState={true}
    scrollDisabled={true}
    titleAriaLabel="Edit My Registry Details"
    underlayClickExits={false}
    variation="large"
  >
    <form
      autoComplete="off"
      method="post"
      name="editRegistry"
      noValidate={true}
      onSubmit={[Function]}
    >
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakefirstName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakefirstName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeLastName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeLastName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakepassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakepassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeconfirmpassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeconfirmpassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FocusableComponent
        keyForTriggeringFocus={0}
        wrapperClassName=""
      >
        <Notification
          content=" Some message"
          height="18px"
          iconPosition="mr2"
          spaceClass="py1 px2"
          status="error"
          theme=""
          width="18px"
          wrapperClass="p1 mb2"
        />
      </FocusableComponent>
      <Notification
        content="<b>Oh, snap!</b> Something went wrong and we couldn't get your information. Please try refreshing the page or coming back later."
        height="18px"
        iconPosition="mr2"
        spaceClass="py1 px2"
        status="error"
        theme=""
        width="18px"
        wrapperClass="p1 mb2"
      />
      <Heading
        className="editModalHeading mb15"
        data-locator="registry-editregistry-popup-header"
        level={1}
      >
        Edit My Registry Details
      </Heading>
      <fieldset
        className="fieldsetMinWidth"
        disabled={true}
      >
        <EditOtherRegistry
          babyRecommendations="Baby"
          coRegOwner={null}
          createRegistryLabels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "deleteRegistry",
                },
              ],
              "test": "key",
            }
          }
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registery-editregistery-aptnumber",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registery-editregistery-imbride",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registery-editregistery-email",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFirstName": "registery-editregistery-firstname",
              "registryGroomOption": "registery-editregistery-imgroom",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registry-editregistry-popup-header",
              "registryLastName": "registery-editregistery-lastname",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registery-editregistery-phonenumber",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registry-editregistry-save-button",
              "registryRegTypePrivate": "registry-editregistry-private-radiobutton",
              "registryRegTypePublic": "registry-editregistry-public-radiobutton",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registery-editregistery-coregimbride",
              "registrycoEmail": "registery-editregistery-coregemail",
              "registrycoFirstName": "registery-editregistery-coregfirstname",
              "registrycoGroomOption": "registery-editregistery-coregimgroom",
              "registrycoLastName": "registery-editregistery-coreglastname",
            }
          }
          dynamicContentState={
            Object {
              "content": Object {
                "body": "test body data",
                "id": "12441",
              },
            }
          }
          editModalError={true}
          getContent={[Function]}
          labels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "davidBridalEditModalContent",
                },
              ],
              "test": "key",
            }
          }
          registryDetails={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "Wedding",
                },
              },
              "test": "value",
            }
          }
          registryID="123456"
          setRegistryFavStoreSearchFlag={[Function]}
          signInDetails={
            Object {
              "editText": "Edit",
            }
          }
          stateObj={
            Object {
              "addressOne": "",
              "addressOneError": "",
              "addressTwo": "",
              "addressTwoError": "",
              "apartment": "",
              "apartmentError": "",
              "babyExpectedArivalDate": "",
              "babyExpectedArivalDateError": "",
              "babyGender": "",
              "babyMaidenName": "",
              "babyMaidenNameError": "",
              "babyNurseryTheme": "",
              "city": "",
              "cityError": "",
              "coEmail": "",
              "coEmailError": "",
              "coFirstName": "",
              "coFirstNameError": "",
              "coGender": "",
              "coLastName": "",
              "coLastNameError": "",
              "coRegProfileStatus": "false",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "errorMessages": Object {
                "message": "An error occurred : Some message",
              },
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "gender": "",
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
              "modalMountedState": true,
              "moveInApartment": "",
              "moveInApartmentError": "",
              "moveInStreet": "",
              "moveInStreetError": "",
              "password": "",
              "passwordError": true,
              "primaryPh": "",
              "primaryPhError": "",
              "shippingApartment": "",
              "shippingApartmentError": "",
              "shippingPhone": "",
              "shippingPhoneError": "",
              "shippingStreet": "",
              "shippingStreetError": "",
              "showMoveInInfo": false,
              "showShippingInfo": false,
              "showerDate": "",
              "showerDateError": "",
              "state": "",
              "stateError": "",
              "street": "",
              "streetError": "",
              "subscribeSelected": false,
              "thirdPartySelected": false,
              "zip": "",
              "zipError": "",
            }
          }
          switchConfigGlobal={
            Object {
              "enableCSLabels": true,
            }
          }
        />
      </fieldset>
      <Button
        aria-label="editRegistry-submit"
        className="buttonClass"
        data-locator="registry-editregistry-save-button"
        disabled={true}
        id="editRegistry-submit"
        onSubmit={[Function]}
        theme="primary"
        type="submit"
      >
        Save Changes
      </Button>
    </form>
    <UniversalComponent
      changeStore={true}
      findAStoreModal={true}
      setPickUpInStoreModalOpen={[Function]}
      setRegistryFavStoreSearchFlag={[Function]}
    />
  </ModalDialog>
</Fragment>
```

#### `comp did mount renderBabyOrOtherForm: should render Baby registry correctly`

```
<Fragment>
  <div
    aria-hidden="true"
    className="clickable"
  >
    <Icon
      focusable="false"
      height="42px"
      type="undefined-gear"
      width="42px"
    />
  </div>
  <div>
    <PrimaryLink
      className="details inline-block"
      data-locator="registry-editlink"
      href="#"
      textDecoration="textDecorationNone"
      variation="primary"
    >
      Complete your profile
    </PrimaryLink>
    <span
      className="detailsValue"
    >
      to share your profile with friends and family
    </span>
  </div>
  <ModalDialog
    closeIconShow={true}
    contentWrapperClass="paddingMobile py3"
    dialogClass="editRegistryModal"
    mountedState={true}
    scrollDisabled={true}
    titleAriaLabel="Edit My Registry Details"
    underlayClickExits={false}
    variation="large"
  >
    <form
      autoComplete="off"
      method="post"
      name="editRegistry"
      noValidate={true}
      onSubmit={[Function]}
    >
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakefirstName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakefirstName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeLastName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeLastName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakepassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakepassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeconfirmpassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeconfirmpassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FocusableComponent
        keyForTriggeringFocus={0}
        wrapperClassName=""
      >
        <Notification
          content=" Some message"
          height="18px"
          iconPosition="mr2"
          spaceClass="py1 px2"
          status="error"
          theme=""
          width="18px"
          wrapperClass="p1 mb2"
        />
      </FocusableComponent>
      <Notification
        content="<b>Oh, snap!</b> Something went wrong and we couldn't get your information. Please try refreshing the page or coming back later."
        height="18px"
        iconPosition="mr2"
        spaceClass="py1 px2"
        status="error"
        theme=""
        width="18px"
        wrapperClass="p1 mb2"
      />
      <Heading
        className="editModalHeading mb15"
        data-locator="registry-editregistry-popup-header"
        level={1}
      >
        Edit My Registry Details
      </Heading>
      <fieldset
        className="fieldsetMinWidth"
        disabled={true}
      >
        <EditOtherRegistry
          babyRecommendations="Baby"
          coRegOwner={null}
          createRegistryLabels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "deleteRegistry",
                },
              ],
              "test": "key",
            }
          }
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registery-editregistery-aptnumber",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registery-editregistery-imbride",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registery-editregistery-email",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFirstName": "registery-editregistery-firstname",
              "registryGroomOption": "registery-editregistery-imgroom",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registry-editregistry-popup-header",
              "registryLastName": "registery-editregistery-lastname",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registery-editregistery-phonenumber",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registry-editregistry-save-button",
              "registryRegTypePrivate": "registry-editregistry-private-radiobutton",
              "registryRegTypePublic": "registry-editregistry-public-radiobutton",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registery-editregistery-coregimbride",
              "registrycoEmail": "registery-editregistery-coregemail",
              "registrycoFirstName": "registery-editregistery-coregfirstname",
              "registrycoGroomOption": "registery-editregistery-coregimgroom",
              "registrycoLastName": "registery-editregistery-coreglastname",
            }
          }
          dynamicContentState={
            Object {
              "content": Object {
                "body": "test body data",
                "id": "12441",
              },
            }
          }
          editModalError={true}
          getContent={[Function]}
          labels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "davidBridalEditModalContent",
                },
              ],
              "test": "key",
            }
          }
          registryDetails={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "Wedding",
                },
              },
              "test": "value",
            }
          }
          registryID="123456"
          setRegistryFavStoreSearchFlag={[Function]}
          signInDetails={
            Object {
              "editText": "Edit",
            }
          }
          stateObj={
            Object {
              "addressOne": "",
              "addressOneError": "",
              "addressTwo": "",
              "addressTwoError": "",
              "apartment": "",
              "apartmentError": "",
              "babyExpectedArivalDate": "",
              "babyExpectedArivalDateError": "",
              "babyGender": "",
              "babyMaidenName": "",
              "babyMaidenNameError": "",
              "babyNurseryTheme": "",
              "city": "",
              "cityError": "",
              "coEmail": "",
              "coEmailError": "",
              "coFirstName": "",
              "coFirstNameError": "",
              "coGender": "",
              "coLastName": "",
              "coLastNameError": "",
              "coRegProfileStatus": "false",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "errorMessages": Object {
                "message": "An error occurred : Some message",
              },
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "gender": "",
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
              "modalMountedState": true,
              "moveInApartment": "",
              "moveInApartmentError": "",
              "moveInStreet": "",
              "moveInStreetError": "",
              "password": "",
              "passwordError": true,
              "primaryPh": "",
              "primaryPhError": "",
              "shippingApartment": "",
              "shippingApartmentError": "",
              "shippingPhone": "",
              "shippingPhoneError": "",
              "shippingStreet": "",
              "shippingStreetError": "",
              "showMoveInInfo": false,
              "showShippingInfo": false,
              "showerDate": "",
              "showerDateError": "",
              "state": "",
              "stateError": "",
              "street": "",
              "streetError": "",
              "subscribeSelected": false,
              "thirdPartySelected": false,
              "zip": "",
              "zipError": "",
            }
          }
          switchConfigGlobal={
            Object {
              "enableCSLabels": true,
            }
          }
        />
      </fieldset>
      <Button
        aria-label="editRegistry-submit"
        className="buttonClass"
        data-locator="registry-editregistry-save-button"
        disabled={true}
        id="editRegistry-submit"
        onSubmit={[Function]}
        theme="primary"
        type="submit"
      >
        Save Changes
      </Button>
    </form>
    <UniversalComponent
      changeStore={true}
      findAStoreModal={true}
      setPickUpInStoreModalOpen={[Function]}
      setRegistryFavStoreSearchFlag={[Function]}
    />
  </ModalDialog>
</Fragment>
```

#### `renderBabyOrOtherForm: should render Baby registry correctly enableCSLabels`

```
<Fragment>
  <div
    aria-hidden="true"
    className="clickable"
  >
    <Icon
      focusable="false"
      height="42px"
      type="undefined-gear"
      width="42px"
    />
  </div>
  <div>
    <PrimaryLink
      className="details inline-block"
      data-locator="registry-editlink"
      href="#"
      textDecoration="textDecorationNone"
      variation="primary"
    >
      Complete your profile
    </PrimaryLink>
    <span
      className="detailsValue"
    >
      to share your profile with friends and family
    </span>
  </div>
  <ModalDialog
    closeIconShow={true}
    contentWrapperClass="paddingMobile py3"
    dialogClass="editRegistryModal"
    mountedState={true}
    scrollDisabled={true}
    titleAriaLabel="Edit My Registry Details"
    underlayClickExits={false}
    variation="large"
  >
    <form
      autoComplete="off"
      method="post"
      name="editRegistry"
      noValidate={true}
      onSubmit={[Function]}
    >
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakefirstName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakefirstName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeLastName"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeLastName"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="text"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakepassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakepassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FormInput
        aria-hidden="true"
        blurHandler={[Function]}
        className="hide"
        hideAriaLabelText={false}
        hideFieldLevelErrorMessage={false}
        id="somefakeconfirmpassword"
        isChangedOnce={false}
        isRequired={false}
        labelPosition="prepend"
        name="somefakeconfirmpassword"
        onFocus={[Function]}
        selectOption={null}
        showNumericKeypadOnMobile={false}
        tabIndex="-1"
        tilesLength={-1}
        type="password"
        wrapperProps={Object {}}
      />
      <FocusableComponent
        keyForTriggeringFocus={0}
        wrapperClassName=""
      >
        <Notification
          content=" Some message"
          height="18px"
          iconPosition="mr2"
          spaceClass="py1 px2"
          status="error"
          theme=""
          width="18px"
          wrapperClass="p1 mb2"
        />
      </FocusableComponent>
      <Notification
        content="<b>Oh, snap!</b> Something went wrong and we couldn't get your information. Please try refreshing the page or coming back later."
        height="18px"
        iconPosition="mr2"
        spaceClass="py1 px2"
        status="error"
        theme=""
        width="18px"
        wrapperClass="p1 mb2"
      />
      <Heading
        className="editModalHeading mb15"
        data-locator="registry-editregistry-popup-header"
        level={1}
      >
        Edit My Registry Details
      </Heading>
      <fieldset
        className="fieldsetMinWidth"
        disabled={true}
      >
        <EditWeddingRegistry
          babyRecommendations="Baby"
          coRegOwner={null}
          createRegistryLabels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "deleteRegistry",
                },
              ],
              "test": "key",
            }
          }
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registery-editregistery-aptnumber",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registery-editregistery-imbride",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registery-editregistery-email",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFirstName": "registery-editregistery-firstname",
              "registryGroomOption": "registery-editregistery-imgroom",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registry-editregistry-popup-header",
              "registryLastName": "registery-editregistery-lastname",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registery-editregistery-phonenumber",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registry-editregistry-save-button",
              "registryRegTypePrivate": "registry-editregistry-private-radiobutton",
              "registryRegTypePublic": "registry-editregistry-public-radiobutton",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registery-editregistery-coregimbride",
              "registrycoEmail": "registery-editregistery-coregemail",
              "registrycoFirstName": "registery-editregistery-coregfirstname",
              "registrycoGroomOption": "registery-editregistery-coregimgroom",
              "registrycoLastName": "registery-editregistery-coreglastname",
            }
          }
          dynamicContentState={
            Object {
              "content": Object {
                "body": "test body data",
                "id": "12441",
              },
            }
          }
          editModalError={true}
          enableCSLabels={true}
          eventType="Wedding"
          labels={
            Object {
              "referredContent": Array [
                Object {
                  "id": "123",
                  "key": "davidBridalEditModalContent",
                },
              ],
              "test": "key",
            }
          }
          registryDetails={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "Wedding",
                },
              },
              "test": "value",
            }
          }
          registryID="123456"
          setRegistryFavStoreSearchFlag={[Function]}
          signInDetails={
            Object {
              "editText": "Edit",
            }
          }
          stateObj={
            Object {
              "addressOne": "",
              "addressOneError": "",
              "addressTwo": "",
              "addressTwoError": "",
              "apartment": "",
              "apartmentError": "",
              "babyExpectedArivalDate": "",
              "babyExpectedArivalDateError": "",
              "babyGender": "",
              "babyMaidenName": "",
              "babyMaidenNameError": "",
              "babyNurseryTheme": "",
              "city": "",
              "cityError": "",
              "coEmail": "",
              "coEmailError": "",
              "coFirstName": "",
              "coFirstNameError": "",
              "coGender": "",
              "coLastName": "",
              "coLastNameError": "",
              "coRegProfileStatus": "false",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "errorMessages": Object {
                "message": "An error occurred : Some message",
              },
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "gender": "",
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
              "modalMountedState": true,
              "moveInApartment": "",
              "moveInApartmentError": "",
              "moveInStreet": "",
              "moveInStreetError": "",
              "password": "",
              "passwordError": true,
              "primaryPh": "",
              "primaryPhError": "",
              "shippingApartment": "",
              "shippingApartmentError": "",
              "shippingPhone": "",
              "shippingPhoneError": "",
              "shippingStreet": "",
              "shippingStreetError": "",
              "showMoveInInfo": false,
              "showShippingInfo": false,
              "showerDate": "",
              "showerDateError": "",
              "state": "",
              "stateError": "",
              "street": "",
              "streetError": "",
              "subscribeSelected": false,
              "thirdPartySelected": false,
              "zip": "",
              "zipError": "",
            }
          }
        />
      </fieldset>
      <Button
        aria-label="editRegistry-submit"
        className="buttonClass"
        data-locator="registry-editregistry-save-button"
        disabled={true}
        id="editRegistry-submit"
        onSubmit={[Function]}
        theme="primary"
        type="submit"
      >
        Save Changes
      </Button>
    </form>
    <UniversalComponent
      changeStore={true}
      findAStoreModal={true}
      setPickUpInStoreModalOpen={[Function]}
      setRegistryFavStoreSearchFlag={[Function]}
    />
  </ModalDialog>
</Fragment>
```

