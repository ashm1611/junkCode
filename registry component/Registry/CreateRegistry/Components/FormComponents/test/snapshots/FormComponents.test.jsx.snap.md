# `app/components/Pages/Registry/CreateRegistry/Components/FormComponents/test/FormComponents.test.jsx`

#### `PersonInfo should be rendered correctly with all the props`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-8 small-12"
    >
      <Paragraph
        className="mt0"
        theme="largeLight"
        weight=""
      >
        Modifying your name or email address on your registry will also update your account information.
      </Paragraph>
    </PureComponent(Cell)>
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registery-editregistery-firstname"
      disabled={true}
      fieldName="firstName"
      firstNameError=""
      label="Your First Name"
      maxLength={30}
      required={true}
      type="text"
      updateState={[Function]}
      validation="registrationFirstName"
      value="abc"
    />
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registery-editregistery-lastname"
      disabled={true}
      fieldName="lastName"
      label="Last Name"
      lastNameError=""
      maxLength={30}
      required={true}
      type="text"
      updateState={[Function]}
      validation="lastName"
      value="abc"
    />
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="pb2"
  >
    <PureComponent(Cell)
      className="large-6 small-12"
    >
      <div
        className="textStyle inline-block mr1"
        data-locator="registry-iamlabel"
      >
        I'm the
      </div>
      <ul
        className="radiowrapper inline-block"
      >
        <li
          className="radiowrapper inline-block"
        >
          <InputRadio
            className="genderStyle inline-block"
            data-locator="registery-editregistery-imbride"
            defaultChecked={false}
            id="brideOption"
            labelClass="labelButton"
            labelContent="Bride"
            labelProps={Object {}}
            name="genderOption"
            onClick={[Function]}
            sendLabelProps={true}
            value="B"
            variation="button"
            wrapperProps={Object {}}
          />
        </li>
        <li
          className="radiowrapper inline-block"
        >
          <InputRadio
            className="genderStyle inline-block"
            data-locator="registery-editregistery-imgroom"
            defaultChecked={false}
            id="groomOption"
            labelClass="labelButton"
            labelContent="Groom"
            labelProps={Object {}}
            name="genderOption"
            onClick={[Function]}
            sendLabelProps={true}
            value="G"
            variation="button"
            wrapperProps={Object {}}
          />
        </li>
      </ul>
      <div
        className="textStyle inline-block"
        data-locator="registry-optionallink"
      >
        (Optional)
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      afterValidation={[Function]}
      classes="large-12"
      dataLocator="registery-editregistery-email"
      disabled={false}
      emailError=""
      fieldName="email"
      isRegistryEmail={true}
      label="Email"
      required={true}
      type="text"
      updateState={[Function]}
      validation="signinEmail"
      value="abc@gmail.com"
    />
    <PureComponent(Cell)
      className="small-12 large-12"
    >
      <RecognizedUserVerification
        closeHandler={[Function]}
        emailId="abc@gmail.com"
        hideCloseIcon={false}
        lifestagesMessage={true}
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="large-12 small-12"
    >
      <PureComponent(Cell)>
        <PasswordValidation
          confirmPasswordClassName="formError"
          confirmPasswordRequired={false}
          dataLocator="registry-passwordtextfield"
          disableConfirmPassword={false}
          disabledPassword="Qq137$729"
          errorStyle="errorColor"
          firstName="abc"
          firstNameRequired={true}
          formWrapperIdentifier=""
          hidePasswordValidationMessages={true}
          isDisplayPasswordShowBtn={false}
          isProfileExist={true}
          labels={Object {}}
          lastName="abc"
          layout="2x1"
          newPasswordFieldClassName="formError"
          passwordErrorPresent={[Function]}
          removePasswordSpaceBottom={false}
          uniqueId=""
          updatePasswordData={[Function]}
          validationToCheck=""
          variation="emptyPasswordValidation"
        />
      </PureComponent(Cell)>
    </PureComponent(Cell)>
    <PureComponent(Cell)>
      <UniversalComponent
        checkProfileStatus={[Function]}
        coRegOwner={true}
        coRegProfileStatus={
          Object {
            "atgResponse": "true",
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
        editRegistrySubHeading={true}
        emailId="abc@gmail.com"
        eventType="Wedding"
        fetchCoRegistrantProfileStatus={[Function]}
        handleCoGenderChange={[Function]}
        handleGenderChange={[Function]}
        isModalOpen={false}
        labels={
          Object {
            "brideOption": "Bride",
            "groomOption": "Groom",
          }
        }
        listenProfileStatusChange={[Function]}
        loginType="registry"
        passwordErrorPresent={[Function]}
        personalisedLables={Object {}}
        reCaptchaActivationCount={3}
        referredContent={
          Object {
            "content": Object {
              "9279": Object {
                "body": "hi",
              },
              "9280": Object {
                "body": "hi",
              },
              "9882": Object {
                "body": "Hello",
              },
            },
          }
        }
        registryInputFields={
          Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          }
        }
        resetCoRegistrantProfileStatus={[Function]}
        shouldReCaptchaRender={
          Object {
            "checkReCaptchaCount": [Function],
            "deleteFailedLoginAttemptCookies": [Function],
            "setFailedLoginAttemptCookies": [Function],
            "shouldReCaptchaRender": [Function],
          }
        }
        stateObj={
          Object {
            "addressOne": "xyz",
            "addressOneError": "",
            "addressTwo": "xyz",
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
            "city": "delhi",
            "cityError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coGenderIndex": null,
            "coLastName": "abc",
            "coLastNameError": "abc",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "abc@gmail.com",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "abc",
            "firstNameError": "",
            "gender": "",
            "genderIndex": null,
            "guests": "",
            "guestsError": "",
            "isLoggedIn": true,
            "isProfileExist": true,
            "isRecognized": true,
            "isRegistryTypeOpen": false,
            "lastName": "abc",
            "lastNameError": "",
            "mobilePh": "12345",
            "mobilePhError": "",
            "moveInApartment": "",
            "moveInApartmentError": "",
            "moveInStreet": "",
            "moveInStreetError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "12345",
            "primaryPhError": "",
            "shippingApartment": "",
            "shippingApartmentError": "",
            "shippingPhone": "9999999999",
            "shippingPhoneError": "",
            "shippingStreet": "",
            "shippingStreetError": "",
            "showMoveInInfo": true,
            "showShippingInfo": true,
            "showVerMsg": true,
            "showerDate": "",
            "showerDateError": "",
            "state": "xyz",
            "stateError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updatePasswordData={[Function]}
        updateState={[Function]}
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="recaptchaElement large-12 small-12 mb3 pt1"
    >
      <UniversalComponent
        elementID="createRegistry-recaptcha"
        onResetRecaptcha={[Function]}
        onValidation={[Function]}
        reset={false}
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsSubHeading"
            level={2}
          >
            Co-Registrant
             
            <Button
              aria-label="Your names will help gift givers identify your registry."
              className="tooltip-bottom"
              data-tooltip="Your names will help gift givers identify your registry."
              iconProps={
                Object {
                  "height": "14px",
                  "type": "infoIcon",
                  "width": "14px",
                }
              }
              theme="ghost"
              variation="noPadding"
            />
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <PureComponent(GridX)
        className="grid-margin-x"
      >
        <RenderInput
          classes="large-6 small-12"
          coFirstNameError=""
          dataLocator="registery-editregistery-coregfirstname"
          fieldName="coFirstName"
          label="Your Partner's First Name"
          maxLength={30}
          required={true}
          type="text"
          updateState={[Function]}
          validation="registrationFirstName"
          value=""
        />
        <RenderInput
          classes="large-6 small-12"
          coLastNameError="abc"
          dataLocator="registery-editregistery-coreglastname"
          fieldName="coLastName"
          label="Last Name"
          maxLength={30}
          required={true}
          type="text"
          updateState={[Function]}
          validation="lastName"
          value="abc"
        />
      </PureComponent(GridX)>
      <PureComponent(GridX)>
        <PureComponent(Cell)
          className="large-6 small-12 rowStyle"
        >
          <ul
            className="radiowrapper inline-block"
          >
            <li
              className="radiowrapper inline-block"
            >
              <InputRadio
                className="genderStyle inline-block"
                data-locator="registery-editregistery-coregimbride"
                defaultChecked={false}
                id="coBrideOption"
                labelClass="labelButton"
                labelContent="Bride"
                labelProps={Object {}}
                name="coGenderOption"
                onClick={[Function]}
                sendLabelProps={true}
                value="B"
                variation="button"
                wrapperProps={Object {}}
              />
            </li>
            <li
              className="radiowrapper inline-block"
            >
              <InputRadio
                className="genderStyle inline-block"
                data-locator="registery-editregistery-coregimgroom"
                defaultChecked={false}
                id="coGroomOption"
                labelClass="labelButton"
                labelContent="Groom"
                labelProps={Object {}}
                name="coGenderOption"
                onClick={[Function]}
                sendLabelProps={true}
                value="G"
                variation="button"
                wrapperProps={Object {}}
              />
            </li>
          </ul>
        </PureComponent(Cell)>
      </PureComponent(GridX)>
      <CoRegistrantEmail
        coRegEmailFlag={[Function]}
        coRegProfileStatus={
          Object {
            "atgResponse": "true",
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
        fetchCoRegistrantProfileStatus={[Function]}
        labels={
          Object {
            "brideOption": "Bride",
            "groomOption": "Groom",
          }
        }
        referredContent={
          Object {
            "content": Object {
              "9279": Object {
                "body": "hi",
              },
              "9280": Object {
                "body": "hi",
              },
              "9882": Object {
                "body": "Hello",
              },
            },
          }
        }
        registryInputFields={
          Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          }
        }
        resetCoRegistrantProfileStatus={[Function]}
        stateObj={
          Object {
            "addressOne": "xyz",
            "addressOneError": "",
            "addressTwo": "xyz",
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
            "city": "delhi",
            "cityError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coGenderIndex": null,
            "coLastName": "abc",
            "coLastNameError": "abc",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "abc@gmail.com",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "abc",
            "firstNameError": "",
            "gender": "",
            "genderIndex": null,
            "guests": "",
            "guestsError": "",
            "isLoggedIn": true,
            "isProfileExist": true,
            "isRecognized": true,
            "isRegistryTypeOpen": false,
            "lastName": "abc",
            "lastNameError": "",
            "mobilePh": "12345",
            "mobilePhError": "",
            "moveInApartment": "",
            "moveInApartmentError": "",
            "moveInStreet": "",
            "moveInStreetError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "12345",
            "primaryPhError": "",
            "shippingApartment": "",
            "shippingApartmentError": "",
            "shippingPhone": "9999999999",
            "shippingPhoneError": "",
            "shippingStreet": "",
            "shippingStreetError": "",
            "showMoveInInfo": true,
            "showShippingInfo": true,
            "showVerMsg": true,
            "showerDate": "",
            "showerDateError": "",
            "state": "xyz",
            "stateError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updateState={[Function]}
      />
    </fieldset>
  </ErrorBoundary>
</ErrorBoundary>
```

