# `app/components/Pages/Registry/WeddingBook/tests/WeddingBookForm.test.jsx`

#### `should render the "WeddingBookForm" component`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <PureComponent(GridX)>
    <div
      className="large-12 small-12"
    >
      <Connect(wrapper)
        formWrapperData={
          Object {
            "apartment": Object {
              "apartmentError": "",
              "value": "abc",
            },
            "city": Object {
              "cityError": "",
              "value": "abc",
            },
            "emailAddr": Object {
              "emailAddrError": "",
              "value": "abc@d.com",
            },
            "firstName": Object {
              "firstNameError": "",
              "value": "abc",
            },
            "lastName": Object {
              "lastNameError": "",
              "value": "bcc",
            },
            "phoneNumber": Object {
              "phoneNumberError": "",
              "value": "1111111111",
            },
            "streetAddress": Object {
              "streetAddressError": "",
              "value": "abc",
            },
            "zipcode": Object {
              "value": "11111",
              "zipcodeError": "",
            },
          }
        }
        id="weddingBook"
        identifier="weddingBook"
        method="post"
        name="weddingBookForm"
        onSubmit={[Function]}
      >
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="large-6 small-12 mt2 "
          >
            <WeddingBookFormElement
              data-locator="rgbook-fnamebox"
              fieldName="firstName"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              identifier="weddingBook"
              isRequired={true}
              label="MeraNAme"
              type="text"
              validation="firstName"
            />
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="large-6 small-12 mt2 "
          >
            <WeddingBookFormElement
              data-locator="rgbook-lnamebox"
              fieldName="lastName"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              identifier="weddingBook"
              isRequired={true}
              label="Last Name"
              type="text"
              validation="lastName"
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="mt2 "
          >
            <WeddingBookFormElement
              data-locator="rgbook-addressbox"
              fieldName="streetAddress"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              identifier="weddingBook"
              isRequired={true}
              label="Street Address"
              type="text"
              validation="required"
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="mt2 "
          >
            <WeddingBookFormElement
              data-locator="rgbook-aptbox"
              fieldName="apartment"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              identifier="weddingBook"
              isRequired={true}
              label="Apartment"
              type="text"
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="mt2 "
          >
            <WeddingBookFormElement
              data-locator="rgbook-citybox"
              fieldName="city"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              identifier="weddingBook"
              isRequired={true}
              label="City"
              type="text"
              validation="city"
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="large-6 small-6 mt2 "
          >
            <Connect(wrapper)
              data-locator="rgbook-stateBox"
              defaultValue=""
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              id="state"
              identifier="weddingBook"
              isRequired={true}
              name="state"
              optionSet={
                Array [
                  Object {
                    "label": "AK",
                    "name": "Alaska",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "AK",
                    },
                  },
                  Object {
                    "label": "AL",
                    "name": "Alabama",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "AL",
                    },
                  },
                  Object {
                    "label": "AR",
                    "name": "Arkansas",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "AR",
                    },
                  },
                  Object {
                    "label": "AZ",
                    "name": "Arizona",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "AZ",
                    },
                  },
                  Object {
                    "label": "CA",
                    "name": "California",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "CA",
                    },
                  },
                  Object {
                    "label": "CO",
                    "name": "Colorado",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "CO",
                    },
                  },
                  Object {
                    "label": "CT",
                    "name": "Connecticut",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "CT",
                    },
                  },
                  Object {
                    "label": "DC",
                    "name": "District of Columbia",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "DC",
                    },
                  },
                  Object {
                    "label": "DE",
                    "name": "Delaware",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "DE",
                    },
                  },
                  Object {
                    "label": "FL",
                    "name": "Florida",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "FL",
                    },
                  },
                  Object {
                    "label": "GA",
                    "name": "Georgia",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "GA",
                    },
                  },
                  Object {
                    "label": "HI",
                    "name": "Hawaii",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "HI",
                    },
                  },
                  Object {
                    "label": "IA",
                    "name": "Iowa",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "IA",
                    },
                  },
                  Object {
                    "label": "ID",
                    "name": "Idaho",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "ID",
                    },
                  },
                  Object {
                    "label": "IL",
                    "name": "Illinois",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "IL",
                    },
                  },
                  Object {
                    "label": "IN",
                    "name": "Indiana",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "IN",
                    },
                  },
                  Object {
                    "label": "KS",
                    "name": "Kansas",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "KS",
                    },
                  },
                  Object {
                    "label": "KY",
                    "name": "Kentucky",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "KY",
                    },
                  },
                  Object {
                    "label": "LA",
                    "name": "Louisiana",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "LA",
                    },
                  },
                  Object {
                    "label": "MA",
                    "name": "Massachusetts",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "MA",
                    },
                  },
                  Object {
                    "label": "MD",
                    "name": "Maryland",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "MD",
                    },
                  },
                  Object {
                    "label": "ME",
                    "name": "Maine",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "ME",
                    },
                  },
                  Object {
                    "label": "MI",
                    "name": "Michigan",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "MI",
                    },
                  },
                  Object {
                    "label": "MN",
                    "name": "Minnesota",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "MN",
                    },
                  },
                  Object {
                    "label": "MO",
                    "name": "Missouri",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "MO",
                    },
                  },
                  Object {
                    "label": "MS",
                    "name": "Mississippi",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "MS",
                    },
                  },
                  Object {
                    "label": "MT",
                    "name": "Montana",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "MT",
                    },
                  },
                  Object {
                    "label": "NC",
                    "name": "North Carolina",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "NC",
                    },
                  },
                  Object {
                    "label": "ND",
                    "name": "North Dakota",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "ND",
                    },
                  },
                  Object {
                    "label": "NE",
                    "name": "Nebraska",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "NE",
                    },
                  },
                  Object {
                    "label": "NH",
                    "name": "New Hampshire",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "NH",
                    },
                  },
                  Object {
                    "label": "NJ",
                    "name": "New Jersey",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "NJ",
                    },
                  },
                  Object {
                    "label": "NM",
                    "name": "New Mexico",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "NM",
                    },
                  },
                  Object {
                    "label": "NV",
                    "name": "Nevada",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "NV",
                    },
                  },
                  Object {
                    "label": "NY",
                    "name": "New York",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "NY",
                    },
                  },
                  Object {
                    "label": "OH",
                    "name": "Ohio",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "OH",
                    },
                  },
                  Object {
                    "label": "OK",
                    "name": "Oklahoma",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "OK",
                    },
                  },
                  Object {
                    "label": "OR",
                    "name": "Oregon",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "OR",
                    },
                  },
                  Object {
                    "label": "PA",
                    "name": "Pennsylvania",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "PA",
                    },
                  },
                  Object {
                    "label": "PR",
                    "name": "Puerto Rico",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "PR",
                    },
                  },
                  Object {
                    "label": "RI",
                    "name": "Rhode Island",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "RI",
                    },
                  },
                  Object {
                    "label": "SC",
                    "name": "South Carolina",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "SC",
                    },
                  },
                  Object {
                    "label": "SD",
                    "name": "South Dakota",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "SD",
                    },
                  },
                  Object {
                    "label": "TN",
                    "name": "Tennessee",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "TN",
                    },
                  },
                  Object {
                    "label": "TX",
                    "name": "Texas",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "TX",
                    },
                  },
                  Object {
                    "label": "UT",
                    "name": "Utah",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "UT",
                    },
                  },
                  Object {
                    "label": "VA",
                    "name": "Virginia",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "VA",
                    },
                  },
                  Object {
                    "label": "VI",
                    "name": "Virgin Islands",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": false,
                      "showOnShipping": true,
                      "value": "VI",
                    },
                  },
                  Object {
                    "label": "VT",
                    "name": "Vermont",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "VT",
                    },
                  },
                  Object {
                    "label": "WA",
                    "name": "Washington",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "WA",
                    },
                  },
                  Object {
                    "label": "WI",
                    "name": "Wisconsin",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "WI",
                    },
                  },
                  Object {
                    "label": "WV",
                    "name": "West Virginia",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "WV",
                    },
                  },
                  Object {
                    "label": "WY",
                    "name": "Wyoming",
                    "props": Object {
                      "militaryState": false,
                      "nexusState": false,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "WY",
                    },
                  },
                  Object {
                    "label": "State",
                    "props": Object {
                      "militaryState": true,
                      "nexusState": true,
                      "showOnBilling": true,
                      "showOnReg": true,
                      "showOnShipping": true,
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                  Object {
                    "label": "Select State",
                    "props": Object {
                      "key": "",
                      "value": "",
                    },
                  },
                ]
              }
              position="top"
              required={true}
              selectOption={[Function]}
              stateError=""
              type="select"
              validation="state"
            />
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="large-6 small-6 mt2 "
          >
            <WeddingBookFormElement
              data-locator="rgbook-zipbox"
              fieldName="zipcode"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              identifier="weddingBook"
              isRequired={true}
              label="Zip"
              type="text"
              validation="postalCodeCA"
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="large-6 small-12 mt2 "
          >
            <WeddingBookFormElement
              data-locator="rgbook-phonenumber"
              fieldName="phoneNumber"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              id="phoneNumber"
              identifier="weddingBook"
              isRequired={true}
              label="Phone Number"
              labelPosition="append"
              maxLength="10"
              name="phoneNumber"
              type="tel"
              validation="phoneRequired"
            />
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="large-6 small-12 mt2 mb2"
          >
            <WeddingBookFormElement
              data-locator="rgbook-emailbox"
              fieldName="emailAddr"
              formWrapperData={
                Object {
                  "apartment": Object {
                    "apartmentError": "",
                    "value": "abc",
                  },
                  "city": Object {
                    "cityError": "",
                    "value": "abc",
                  },
                  "emailAddr": Object {
                    "emailAddrError": "",
                    "value": "abc@d.com",
                  },
                  "firstName": Object {
                    "firstNameError": "",
                    "value": "abc",
                  },
                  "lastName": Object {
                    "lastNameError": "",
                    "value": "bcc",
                  },
                  "phoneNumber": Object {
                    "phoneNumberError": "",
                    "value": "1111111111",
                  },
                  "streetAddress": Object {
                    "streetAddressError": "",
                    "value": "abc",
                  },
                  "zipcode": Object {
                    "value": "11111",
                    "zipcodeError": "",
                  },
                }
              }
              identifier="weddingBook"
              isRequired={true}
              label="Email"
              type="email"
              validation="email"
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)
          className="grid-margin-x"
        >
          <PureComponent(Cell)
            className="large-6 small-12 mb2 dateInput"
          >
            <DatePicker
              className=""
              data-locator="rgbook-date"
              format="dd/mm/yyyy"
              futureYearToDisplay={5}
              hideOnDayClick={true}
              id="startDate"
              identifier="weddingBook"
              inputProps={
                Object {
                  "className": "",
                  "data-locator": "weddingDate",
                  "onChange": [Function],
                }
              }
              label="Wedding Date"
              labels={
                Object {
                  "cancelButton": "Cancel",
                  "nextButton": "Go to next month",
                  "okButton": "OK",
                  "prevButton": "Go to previous month",
                }
              }
              longYearsList={false}
              name="startDate"
              onBlur={[Function]}
              onDayChange={[Function]}
              pastYearToDisplay={1}
              placeholder=""
              required={true}
              validation="required"
              value=""
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
        <PureComponent(GridX)
          className="mt2 mb2 emailCheckox"
        >
          <Checkbox
            checked={false}
            className="emailCheck"
            data-locator="rgbook-offercheckbox"
            id="emailCheck"
            identifier="weddingBook"
            islablevisible={true}
            label="Yes I would like to receive offers and promotions from Bed Bath and Beyond. For more info, visit our Privacy Policy"
            name="emailCheck"
            onSelect={[Function]}
            pointer={false}
            type="checkbox"
          />
        </PureComponent(GridX)>
        <PureComponent(GridX)>
          <Button
            className="mb2 sm-mb3 mt1 large-6 small-12"
            data-locator="rgbook-submitcta"
            id="weddingBookSubmit"
            theme="primary"
            type="submit"
          >
            Submit
          </Button>
        </PureComponent(GridX)>
        <PureComponent(GridX)
          data-locator="rgbook-note"
        >
          <span
            className="noteText inline large-8"
          >
            <span
              className="note mr1"
            >
              NOTE
              :
            </span>
            We currently mail our howbook to addresses within the United States (including APO/FPO address)
          </span>
        </PureComponent(GridX)>
      </Connect(wrapper)>
    </div>
  </PureComponent(GridX)>
  <RenderThankyouModal
    mountedState={false}
    toggleModalState={[Function]}
  />
</ErrorBoundary>
```

