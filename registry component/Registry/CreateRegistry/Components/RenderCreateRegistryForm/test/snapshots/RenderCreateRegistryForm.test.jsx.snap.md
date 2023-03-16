# `app/components/Pages/Registry/CreateRegistry/Components/RenderCreateRegistryForm/test/RenderCreateRegistryForm.test.jsx`

#### `form render with event wedding`

```
<div
  className="grid-container"
>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="small-12 mx-auto mt3  large-8"
    >
      <Connect(wrapper)
        autoComplete="off"
        className="pt3"
        formWrapperData={Object {}}
        id="createRegistry-formWrapper"
        name="createRegistry"
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
        <OtherRegistryForm
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registry-floortextfield",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registry-bridelink",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registry-emailtextfield",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFavStoreChange": "registry-favstore-section-changerefresh",
              "registryFavStoreCity": "registry-favstore-section-city",
              "registryFavStoreDirection": "registry-favstore-section-directions",
              "registryFavStoreSection": "registry-favstore-section-header",
              "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
              "registryFirstName": "registry-firstnametextfield",
              "registryGroomOption": "registry-groomlink",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registery-editregistery-heading",
              "registryLastName": "registry-lastnametextfield",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registry-phonenumbertextfield",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
              "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
              "registryRegTypePublic": "registery-editregistery-regtypepublic",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registry-bridelink",
              "registrycoEmail": "registry-coregisterantemailtextfield",
              "registrycoFirstName": "registry-coregisterantfirstnametextfield",
              "registrycoGroomOption": "registry-groomlink",
              "registrycoLastName": "registry-coregisterantlastnametextfield",
            }
          }
          error={null}
          fromCreateRegistryPage={true}
          isBabyRegistry={true}
          labels={Object {}}
          registryInputs={
            Object {
              "eventType": "Wedding",
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
              "babyGenderIndex": null,
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
              "coGenderIndex": null,
              "coLastName": "",
              "coLastNameError": "",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "flagOptional": false,
              "gender": "",
              "genderIndex": null,
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
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
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="pt1 large-6 small-12"
          >
            <Button
              aria-label="createRegistry-submit"
              className={null}
              data-locator="registry-startmyregistrybtn"
              id="createRegistry-submitBtn"
              onSubmit={[Function]}
              theme="primary"
              type="submit"
              variation="fullWidth"
            >
              create registry
            </Button>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </Connect(wrapper)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `form render with event wedding Signup flow`

```
<div
  className="grid-container"
>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="small-12 mx-auto mt3  large-4"
    >
      <PureComponent(Cell)
        className="flex"
      >
        <withMultiReducers(withSaga(Connect(withSaga(wrapper))))
          changeRegistryFormTypeId={[Function]}
          enableNewSignUp={true}
          signUpFromWedRegistry={true}
        />
      </PureComponent(Cell)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `form render with event baby`

```
<div
  className="grid-container"
>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="small-12 mx-auto mt3  large-8"
    >
      <Connect(wrapper)
        autoComplete="off"
        className="pt3"
        formWrapperData={Object {}}
        id="createRegistry-formWrapper"
        name="createRegistry"
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
        <BabyRegistryForm
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registry-floortextfield",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registry-bridelink",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registry-emailtextfield",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFavStoreChange": "registry-favstore-section-changerefresh",
              "registryFavStoreCity": "registry-favstore-section-city",
              "registryFavStoreDirection": "registry-favstore-section-directions",
              "registryFavStoreSection": "registry-favstore-section-header",
              "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
              "registryFirstName": "registry-firstnametextfield",
              "registryGroomOption": "registry-groomlink",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registery-editregistery-heading",
              "registryLastName": "registry-lastnametextfield",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registry-phonenumbertextfield",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
              "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
              "registryRegTypePublic": "registery-editregistery-regtypepublic",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registry-bridelink",
              "registrycoEmail": "registry-coregisterantemailtextfield",
              "registrycoFirstName": "registry-coregisterantfirstnametextfield",
              "registrycoGroomOption": "registry-groomlink",
              "registrycoLastName": "registry-coregisterantlastnametextfield",
            }
          }
          error={null}
          isBabyRegistry={true}
          labels={Object {}}
          registryInputs={
            Object {
              "eventType": "Baby",
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
              "babyGenderIndex": null,
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
              "coGenderIndex": null,
              "coLastName": "",
              "coLastNameError": "",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "flagOptional": false,
              "gender": "",
              "genderIndex": null,
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
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
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="pt1 large-6 small-12"
          >
            <Button
              aria-label="createRegistry-submit"
              className={null}
              data-locator="registry-startmyregistrybtn"
              id="createRegistry-submitBtn"
              onSubmit={[Function]}
              theme="primary"
              type="submit"
              variation="fullWidth"
            >
              create registry
            </Button>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </Connect(wrapper)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `form render with error message`

```
<div
  className="grid-container"
>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="large-8 small-12 mx-auto"
    >
      <FocusableComponent
        keyForTriggeringFocus={0}
        wrapperClassName=""
      >
        <Notification
          content="this is an error"
          height="18px"
          iconPosition="mr2"
          spaceClass="py1 px2"
          status="error"
          theme=""
          width="18px"
          wrapperClass="p1 mb2 large-8 small-12 mx-auto"
        />
      </FocusableComponent>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 mx-auto mt3  large-8"
    >
      <Connect(wrapper)
        autoComplete="off"
        className="pt3"
        formWrapperData={Object {}}
        id="createRegistry-formWrapper"
        name="createRegistry"
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
        <BabyRegistryForm
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registry-floortextfield",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registry-bridelink",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registry-emailtextfield",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFavStoreChange": "registry-favstore-section-changerefresh",
              "registryFavStoreCity": "registry-favstore-section-city",
              "registryFavStoreDirection": "registry-favstore-section-directions",
              "registryFavStoreSection": "registry-favstore-section-header",
              "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
              "registryFirstName": "registry-firstnametextfield",
              "registryGroomOption": "registry-groomlink",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registery-editregistery-heading",
              "registryLastName": "registry-lastnametextfield",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registry-phonenumbertextfield",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
              "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
              "registryRegTypePublic": "registery-editregistery-regtypepublic",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registry-bridelink",
              "registrycoEmail": "registry-coregisterantemailtextfield",
              "registrycoFirstName": "registry-coregisterantfirstnametextfield",
              "registrycoGroomOption": "registry-groomlink",
              "registrycoLastName": "registry-coregisterantlastnametextfield",
            }
          }
          error={
            Array [
              Object {
                "message": "error:this is an error",
              },
            ]
          }
          isBabyRegistry={true}
          labels={Object {}}
          registryInputs={
            Object {
              "eventType": "Baby",
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
              "babyGenderIndex": null,
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
              "coGenderIndex": null,
              "coLastName": "",
              "coLastNameError": "",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "flagOptional": false,
              "gender": "",
              "genderIndex": null,
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
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
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="pt1 large-6 small-12"
          >
            <Button
              aria-label="createRegistry-submit"
              className={null}
              data-locator="registry-startmyregistrybtn"
              id="createRegistry-submitBtn"
              onSubmit={[Function]}
              theme="primary"
              type="submit"
              variation="fullWidth"
            >
              create registry
            </Button>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </Connect(wrapper)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `form render with error messag when errormessage is nulle`

```
<div
  className="grid-container"
>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="large-8 small-12 mx-auto"
    >
      <FocusableComponent
        keyForTriggeringFocus={0}
        wrapperClassName=""
      >
        <Notification
          content=""
          height="18px"
          iconPosition="mr2"
          spaceClass="py1 px2"
          status="error"
          theme=""
          width="18px"
          wrapperClass="p1 mb2 large-8 small-12 mx-auto"
        />
      </FocusableComponent>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 mx-auto mt3  large-8"
    >
      <Connect(wrapper)
        autoComplete="off"
        className="pt3"
        formWrapperData={Object {}}
        id="createRegistry-formWrapper"
        name="createRegistry"
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
        <BabyRegistryForm
          dataLocator={
            Object {
              "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
              "registryAptNo": "registry-floortextfield",
              "registryBabyMaidenName": "registry-maidanName",
              "registryBrideOption": "registry-bridelink",
              "registryCollegeField": "registry-collegetextfield",
              "registryContactInfoMobile": "registry-contactInfoMobile",
              "registryDifferentAddLink": "registry-adddeifferentaddresslink",
              "registryEmail": "registry-emailtextfield",
              "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
              "registryEventInfoDate": "registry-eventInfoEventDate",
              "registryFavStoreChange": "registry-favstore-section-changerefresh",
              "registryFavStoreCity": "registry-favstore-section-city",
              "registryFavStoreDirection": "registry-favstore-section-directions",
              "registryFavStoreSection": "registry-favstore-section-header",
              "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
              "registryFirstName": "registry-firstnametextfield",
              "registryGroomOption": "registry-groomlink",
              "registryGuestsField": "registry-numberofguesttextfield",
              "registryHeading": "registery-editregistery-heading",
              "registryLastName": "registry-lastnametextfield",
              "registryMovingSoonLink": "registry-movingsoonlink",
              "registryNurseryDecorTheme": "registery-decortheme",
              "registryOptionalLink": "registry-optionallink",
              "registryPasswordTextField": "registry-passwordtextfield",
              "registryPhoneNumber": "registry-phonenumbertextfield",
              "registryRBYRLearnMore": "registry-rbyr-learnmore",
              "registryRBYROption": "registry-rbyr-checkbox",
              "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
              "registryRegFavStore": "registery-editregistery-regfavstore",
              "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
              "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
              "registryRegTypePublic": "registery-editregistery-regtypepublic",
              "registryShowerDateLink": "registry-addshowerdatelink",
              "registryStreetAddress": "registery-editregistery-streetaddress",
              "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
              "registryWeddingDateTextField": "registry-weddingdatetextfield",
              "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
              "registrycoBrideOption": "registry-bridelink",
              "registrycoEmail": "registry-coregisterantemailtextfield",
              "registrycoFirstName": "registry-coregisterantfirstnametextfield",
              "registrycoGroomOption": "registry-groomlink",
              "registrycoLastName": "registry-coregisterantlastnametextfield",
            }
          }
          error={
            Array [
              Object {
                "message": "",
              },
            ]
          }
          isBabyRegistry={true}
          labels={Object {}}
          registryInputs={
            Object {
              "eventType": "Baby",
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
              "babyGenderIndex": null,
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
              "coGenderIndex": null,
              "coLastName": "",
              "coLastNameError": "",
              "confirmPassword": "",
              "confirmPasswordError": true,
              "email": "",
              "emailError": "",
              "eventDate": "",
              "eventDateError": "",
              "firstName": "",
              "firstNameError": "",
              "flagOptional": false,
              "gender": "",
              "genderIndex": null,
              "guests": "",
              "guestsError": "",
              "isRegistryTypeOpen": false,
              "lastName": "",
              "lastNameError": "",
              "mobilePh": "",
              "mobilePhError": "",
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
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="pt1 large-6 small-12"
          >
            <Button
              aria-label="createRegistry-submit"
              className={null}
              data-locator="registry-startmyregistrybtn"
              id="createRegistry-submitBtn"
              onSubmit={[Function]}
              theme="primary"
              type="submit"
              variation="fullWidth"
            >
              create registry
            </Button>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </Connect(wrapper)>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

