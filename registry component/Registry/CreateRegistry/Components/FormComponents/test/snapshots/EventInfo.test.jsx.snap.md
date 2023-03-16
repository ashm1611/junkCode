# `app/components/Pages/Registry/CreateRegistry/Components/FormComponents/test/EventInfo.test.jsx`

#### `EventInfo should be rendered correctly with all the props`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-12 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Select a Date (mm/dd/yyyy)"
        eventDateError=""
        eventType="Wedding"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-6 small-12"
    >
      <Connect(withReducer(withSaga(wrapper)))
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
        eventType="Wedding"
        isNewCreateRegForm={true}
        labels={
          Object {
            "brideOption": "Bride",
            "createRegistry": Object {
              "referredContent": Array [
                Object {
                  "id": "9882",
                  "key": "coRegistrantProfileExist",
                },
                Object {
                  "id": "9883",
                  "key": "coRegistrantExtendedProfile",
                },
              ],
            },
            "groomOption": "Groom",
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
            "coLastName": "",
            "coLastNameError": "",
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
            "isLoggedIn": false,
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
            "registryType": "Baby",
            "shippingApartment": "",
            "shippingApartmentError": "",
            "shippingPhone": "9999999999",
            "shippingPhoneError": "",
            "shippingStreet": "",
            "shippingStreetError": "",
            "showMoveInInfo": true,
            "showShippingInfo": true,
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
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `EventInfo should be rendered correctly with all the props for mobile`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-12 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Select a Date (mm/dd/yyyy)"
        eventDateError=""
        eventType="Wedding"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        isMobile="true"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
</div>
```

#### `EventInfo should be rendered correctly with all the props for Canada Env`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-12 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Select a Date (mm/dd/yyyy)"
        eventDateError=""
        eventType="Wedding"
        format="dd/mm/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
        required={true}
        validation="eventDateCanada"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
</div>
```

#### `EventInfo should be rendered correctly with showerDate field true`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-12 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Select a Date (mm/dd/yyyy)"
        eventDateError=""
        eventType="Wedding"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
</div>
```

#### `EventInfo should be rendered correctly with event type baby registry in US env`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Due Date"
        eventDateError=""
        eventType="Baby"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="Number Of Guests (Approximate)"
      required={true}
      type="number"
      validation="guestNumber"
      value=""
    />
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="large-6 small-12 rowStyle"
      >
        <DateInput
          autocomplete="off"
          dataLocator="registry-eventInfoEventDate"
          dateLabel="Due Date"
          eventDateError=""
          eventType="Baby"
          format="mm/dd/yyyy"
          futureYearToDisplay={5}
          id="eventDate"
          name="eventDate"
          pastYearToDisplay={0}
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
              "college": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "college",
                "id": "DC1500014",
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
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
                "displayOnForm": true,
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
          required={false}
          validation="eventDate"
          value=""
        />
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <Heading
      className="mb2 formQuestion"
      level={6}
    >
      Do you know the gender yet?
    </Heading>
    <ul
      className="radiowrapper inline-block pb2"
    >
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={false}
          id="babyGenderBoy"
          labelClass="labelButton"
          labelContent="Boy"
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
          defaultChecked={false}
          id="babyGenderGirl"
          labelClass="labelButton"
          labelContent="Girl"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="G"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={true}
          id="babyGenderSurprise"
          labelClass="labelButton"
          labelContent="It's a Surprise"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="S"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
    </ul>
  </ErrorBoundary>
</div>
```

#### `EventInfo should be rendered correctly with event type baby registry in US env when enableBabyMultiples key enabled`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Due Date"
        eventDateError=""
        eventType="Baby"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="Number Of Guests (Approximate)"
      required={true}
      type="number"
      validation="guestNumber"
      value=""
    />
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="large-6 small-12 rowStyle"
      >
        <DateInput
          autocomplete="off"
          dataLocator="registry-eventInfoEventDate"
          dateLabel="Due Date"
          eventDateError=""
          eventType="Baby"
          format="mm/dd/yyyy"
          futureYearToDisplay={5}
          id="eventDate"
          name="eventDate"
          pastYearToDisplay={0}
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
              "college": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "college",
                "id": "DC1500014",
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
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
                "displayOnForm": true,
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
          required={false}
          validation="eventDate"
          value=""
        />
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <Heading
      className="mb2 formQuestion"
      level={6}
    >
      Do you know the gender yet?
    </Heading>
    <ul
      className="radiowrapper inline-block pb2"
    >
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={false}
          id="babyGenderBoy"
          labelClass="labelButton"
          labelContent="Boy"
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
          defaultChecked={false}
          id="babyGenderGirl"
          labelClass="labelButton"
          labelContent="Girl"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="G"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={true}
          id="babyGenderSurprise"
          labelClass="labelButton"
          labelContent="It's a Surprise"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="S"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
    </ul>
  </ErrorBoundary>
</div>
```

#### `EventInfo should be rendered correctly `

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Due Date"
        eventDateError=""
        eventType="Baby"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="Number Of Guests (Approximate)"
      required={true}
      type="number"
      validation="guestNumber"
      value=""
    />
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="large-6 small-12 rowStyle"
      >
        <DateInput
          autocomplete="off"
          dataLocator="registry-eventInfoEventDate"
          dateLabel="Due Date"
          eventDateError=""
          eventType="Baby"
          format="mm/dd/yyyy"
          futureYearToDisplay={5}
          id="eventDate"
          name="eventDate"
          pastYearToDisplay={0}
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
              "college": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "college",
                "id": "DC1500014",
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
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
                "displayOnForm": true,
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
          required={false}
          validation="eventDate"
          value=""
        />
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <Heading
      className="mb2 formQuestion"
      level={6}
    >
      Do you know the gender yet?
    </Heading>
    <ul
      className="radiowrapper inline-block pb2"
    >
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={false}
          id="babyGenderBoy"
          labelClass="labelButton"
          labelContent="Boy"
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
          defaultChecked={false}
          id="babyGenderGirl"
          labelClass="labelButton"
          labelContent="Girl"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="G"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={true}
          id="babyGenderSurprise"
          labelClass="labelButton"
          labelContent="It's a Surprise"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="S"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
    </ul>
  </ErrorBoundary>
</div>
```

#### `EventInfo should be rendered correctly with event type baby registry in CA`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Due Date"
        eventDateError=""
        eventType="Baby"
        format="dd/mm/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDateCanada"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="Number Of Guests (Approximate)"
      required={true}
      type="number"
      validation="guestNumber"
      value=""
    />
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="large-6 small-12 rowStyle"
      >
        <DateInput
          autocomplete="off"
          dataLocator="registry-eventInfoEventDate"
          dateLabel="Due Date"
          eventDateError=""
          eventType="Baby"
          format="dd/mm/yyyy"
          futureYearToDisplay={5}
          id="eventDate"
          name="eventDate"
          pastYearToDisplay={0}
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
              "college": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "college",
                "id": "DC1500014",
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
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
                "displayOnForm": true,
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
          required={false}
          validation="eventDateCanada"
          value=""
        />
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <Heading
      className="mb2 formQuestion"
      level={6}
    >
      Do you know the gender yet?
    </Heading>
    <ul
      className="radiowrapper inline-block pb2"
    >
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={false}
          id="babyGenderBoy"
          labelClass="labelButton"
          labelContent="Boy"
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
          defaultChecked={false}
          id="babyGenderGirl"
          labelClass="labelButton"
          labelContent="Girl"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="G"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={true}
          id="babyGenderSurprise"
          labelClass="labelButton"
          labelContent="It's a Surprise"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="S"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
    </ul>
  </ErrorBoundary>
</div>
```

#### `EventInfo should be rendered correctly with event type baby registry`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Due Date"
        eventDateError=""
        eventType="Baby"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="Number Of Guests (Approximate)"
      required={true}
      type="number"
      validation="guestNumber"
      value=""
    />
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="large-12 small-12 rowStyle"
      >
        <DateInput
          autocomplete="off"
          dataLocator="registry-eventInfoEventDate"
          dateLabel="Due Date"
          eventDateError=""
          eventType="Baby"
          format="mm/dd/yyyy"
          futureYearToDisplay={5}
          id="eventDate"
          name="eventDate"
          pastYearToDisplay={0}
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
              "college": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "college",
                "id": "DC1500014",
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
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
                "displayOnForm": true,
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
          required={false}
          validation="eventDate"
          value=""
        />
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </ErrorBoundary>
</div>
```

#### `EventInfo should be rendered correctly with event type wedding registry`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-12 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Select a Date (mm/dd/yyyy)"
        eventDateError=""
        eventType="Wedding"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "9882",
                "key": "coRegistrantProfileExist",
              },
              Object {
                "id": "9883",
                "key": "coRegistrantExtendedProfile",
              },
            ],
          }
        }
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
</div>
```

#### `render BabyMultiples Component Correctly`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="Due Date"
        eventDateError=""
        eventType="Baby"
        format="mm/dd/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        name="eventDate"
        pastYearToDisplay={0}
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
            "college": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "college",
              "id": "DC1500014",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
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
              "displayOnForm": true,
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
        required={true}
        validation="eventDate"
        value=""
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="Number Of Guests (Approximate)"
      required={true}
      type="number"
      validation="guestNumber"
      value=""
    />
  </PureComponent(GridX)>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <RenderInput
      classes="large-6 small-12"
      dataLocator="registry-collegetextfield"
      fieldName="college"
      label="College"
      required={true}
      type="text"
      validation="college"
    />
  </PureComponent(GridX)>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="large-6 small-12 rowStyle"
      >
        <DateInput
          autocomplete="off"
          dataLocator="registry-eventInfoEventDate"
          dateLabel="Due Date"
          eventDateError=""
          eventType="Baby"
          format="mm/dd/yyyy"
          futureYearToDisplay={5}
          id="eventDate"
          name="eventDate"
          pastYearToDisplay={0}
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
              "college": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "college",
                "id": "DC1500014",
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
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
                "displayOnForm": true,
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
          required={false}
          validation="eventDate"
          value=""
        />
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <Heading
      className="mb2 formQuestion"
      level={6}
    >
      Do you know the gender yet?
    </Heading>
    <ul
      className="radiowrapper inline-block pb2"
    >
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={false}
          id="babyGenderBoy"
          labelClass="labelButton"
          labelContent="Boy"
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
          defaultChecked={false}
          id="babyGenderGirl"
          labelClass="labelButton"
          labelContent="Girl"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="G"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
      <li
        className="radiowrapper inline-block"
      >
        <InputRadio
          className="genderStyle inline-block"
          defaultChecked={true}
          id="babyGenderSurprise"
          labelClass="labelButton"
          labelContent="It's a Surprise"
          labelProps={Object {}}
          name="genderOption"
          onClick={[Function]}
          sendLabelProps={true}
          value="S"
          variation="button"
          wrapperProps={Object {}}
        />
      </li>
    </ul>
  </ErrorBoundary>
</div>
```

