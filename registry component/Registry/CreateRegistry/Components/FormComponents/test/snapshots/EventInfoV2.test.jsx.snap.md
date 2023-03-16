# `app/components/Pages/Registry/CreateRegistry/Components/FormComponents/test/EventInfoV2.test.jsx`

#### `EventInfo should be rendered correctly with all the props`

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
        dateLabel="WeddingDateLabel"
        eventDateError=""
        eventType="Wedding"
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
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="guestApproximate"
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
      label="college"
      required={true}
      type="text"
      validation="college"
    />
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
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="WeddingDateLabel"
        eventDateError=""
        eventType="Wedding"
        format="dd/mm/yyyy"
        futureYearToDisplay={5}
        id="eventDate"
        isMobile="true"
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
      dataLocator="registry-numberofguesttextfield"
      fieldName="guests"
      guestsError=""
      label="guestApproximate"
      required={true}
      showNumericKeypadOnMobile={true}
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
      label="college"
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
      className="large-6 small-12 pb2"
    >
      <DateInput
        autocomplete="off"
        dataLocator="registry-weddingdatetextfield"
        dateLabel="WeddingDateLabel"
        eventDateError=""
        eventType="Wedding"
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
      label="guestApproximate"
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
      label="college"
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
        dateLabel="BabyDateLabel"
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
      label="guestApproximate"
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
      label="college"
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
          dateLabel="BabyDateLabel"
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
        dateLabel="BabyDateLabel"
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
      label="guestApproximate"
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
      label="college"
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
          dateLabel="BabyDateLabel"
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
  </ErrorBoundary>
</div>
```

