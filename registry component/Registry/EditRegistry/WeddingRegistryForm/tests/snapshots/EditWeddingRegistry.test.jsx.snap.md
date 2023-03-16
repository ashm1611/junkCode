# `app/components/Pages/Registry/EditRegistry/WeddingRegistryForm/tests/EditWeddingRegistry.test.jsx`

#### `should render correctly`

```
<Fragment>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb1"
            >
              <PersonalInfo
                coRegEmailFlag={undefined}
                coRegOwner={undefined}
                coRegProfileStatus={undefined}
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
                editWedRegistry={true}
                eventType={undefined}
                fetchCoRegistrantProfileStatus={undefined}
                globalSwitchConfig={undefined}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                listenProfileStatusChange={[Function]}
                profileData={undefined}
                referredContent={undefined}
                registryInputFields={
                  Object {
                    "CoRegistrantEmail": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantEmail",
                      "id": "DC1400016",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "CoRegistrantFirstName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantFirstName ",
                      "id": "DC1200001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "CoRegistrantLastName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantLastName",
                      "id": "DC1400015",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "MobileNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "MobileNumber",
                      "id": "DC1500001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "PhoneNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "PhoneNumber",
                      "id": "DC1300001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "confirmPassword": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "confirmPassword",
                      "id": "DC1500013",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "eventDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "eventDate",
                      "id": "Wedding_eventDate",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "favoriteStore": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "favoriteStore",
                      "id": "DC1500012",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "futureShippingDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "futureShippingDate",
                      "id": "DC1500011",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "networkAffiliation": Object {
                      "autoCheck": true,
                      "displayOnForm": true,
                      "fieldName": "networkAffiliation",
                      "id": "DC1300006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "numberOfGuests": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "numberOfGuests",
                      "id": "DC1500005",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showContactAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showContactAddress",
                      "id": "DC1500007",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showFutureShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showFutureShippingAddr",
                      "id": "DC1500009",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "showShippingAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showShippingAddress",
                      "id": "DC1500008",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showerDate": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "showerDate",
                      "id": "DC1500006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "useContactAddrAsShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "useContactAddrAsShippingAddr",
                      "id": "DC1500010",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                  }
                }
                resetCoRegistrantProfileStatus={undefined}
                stateObj={Object {}}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Who's the lucky couple?
              <Button
                aria-label="Your names will help gift givers identify your registry."
                className="iconStyle absolute tooltip-bottom"
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
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb1"
            >
              <EventInfo
                atDateFlag={undefined}
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
                editWedRegistry={true}
                eventType={undefined}
                isMobile={undefined}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                registryInputFields={
                  Object {
                    "CoRegistrantEmail": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantEmail",
                      "id": "DC1400016",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "CoRegistrantFirstName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantFirstName ",
                      "id": "DC1200001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "CoRegistrantLastName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantLastName",
                      "id": "DC1400015",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "MobileNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "MobileNumber",
                      "id": "DC1500001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "PhoneNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "PhoneNumber",
                      "id": "DC1300001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "confirmPassword": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "confirmPassword",
                      "id": "DC1500013",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "eventDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "eventDate",
                      "id": "Wedding_eventDate",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "favoriteStore": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "favoriteStore",
                      "id": "DC1500012",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "futureShippingDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "futureShippingDate",
                      "id": "DC1500011",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "networkAffiliation": Object {
                      "autoCheck": true,
                      "displayOnForm": true,
                      "fieldName": "networkAffiliation",
                      "id": "DC1300006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "numberOfGuests": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "numberOfGuests",
                      "id": "DC1500005",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showContactAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showContactAddress",
                      "id": "DC1500007",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showFutureShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showFutureShippingAddr",
                      "id": "DC1500009",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "showShippingAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showShippingAddress",
                      "id": "DC1500008",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showerDate": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "showerDate",
                      "id": "DC1500006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "useContactAddrAsShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "useContactAddrAsShippingAddr",
                      "id": "DC1500010",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                  }
                }
                setFocusOnNextElement={true}
                stateObj={Object {}}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              When is the big day?
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb2 sm-pb1"
            >
              <ContactInfo
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
                editWedRegistry={true}
                eventType={undefined}
                hideMoveInfo={undefined}
                hideShippingInfo={undefined}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                registryDetails={
                  Object {
                    "registryResVO": Object {
                      "registrySummaryVO": Object {
                        "groupGiftingEnable": true,
                      },
                    },
                    "test": "value",
                  }
                }
                registryInputFields={
                  Object {
                    "CoRegistrantEmail": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantEmail",
                      "id": "DC1400016",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "CoRegistrantFirstName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantFirstName ",
                      "id": "DC1200001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "CoRegistrantLastName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantLastName",
                      "id": "DC1400015",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "MobileNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "MobileNumber",
                      "id": "DC1500001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "PhoneNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "PhoneNumber",
                      "id": "DC1300001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "confirmPassword": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "confirmPassword",
                      "id": "DC1500013",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "eventDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "eventDate",
                      "id": "Wedding_eventDate",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "favoriteStore": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "favoriteStore",
                      "id": "DC1500012",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "futureShippingDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "futureShippingDate",
                      "id": "DC1500011",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "networkAffiliation": Object {
                      "autoCheck": true,
                      "displayOnForm": true,
                      "fieldName": "networkAffiliation",
                      "id": "DC1300006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "numberOfGuests": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "numberOfGuests",
                      "id": "DC1500005",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showContactAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showContactAddress",
                      "id": "DC1500007",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showFutureShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showFutureShippingAddr",
                      "id": "DC1500009",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "showShippingAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showShippingAddress",
                      "id": "DC1500008",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showerDate": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "showerDate",
                      "id": "DC1500006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "useContactAddrAsShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "useContactAddrAsShippingAddr",
                      "id": "DC1500010",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                  }
                }
                registrySiteConfig={
                  Object {
                    "enableDeleteRegistryFeature": true,
                  }
                }
                showMoveInfo={undefined}
                showShippingInfo={undefined}
                stateObj={Object {}}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Your Contact Address
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="pb1"
            >
              <PrivacySettings
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
                deactivateRegistryContentId={undefined}
                dynamicContentState={undefined}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                stateObj={Object {}}
                toggleModalState={undefined}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Registry Visibility
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <UniversalComponent
    labels={
      Object {
        "test": "value",
      }
    }
    shipOrSwap={true}
  />
  <UniversalComponent
    labels={
      Object {
        "test": "value",
      }
    }
  />
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb2"
            >
              <UNDEFINED
                currentAddress={undefined}
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
                defaultStoreId={undefined}
                onStoreUpdate={[Function]}
                profileAddress={undefined}
                setRegistryFavStoreSearchFlag={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Your Favorite Store
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="pb3 sm-pb15"
  >
    <NetworkInfo
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
      enableRBYRFeatureConfig={true}
      isRegistryRBYRIncluded={true}
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "false",
          "enableAutoFill": "true",
          "enableEmailOptIn": false,
        }
      }
      registryInputFields={
        Object {
          "CoRegistrantEmail": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "CoRegistrantEmail",
            "id": "DC1400016",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "CoRegistrantFirstName": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "CoRegistrantFirstName ",
            "id": "DC1200001",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "CoRegistrantLastName": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "CoRegistrantLastName",
            "id": "DC1400015",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "MobileNumber": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "MobileNumber",
            "id": "DC1500001",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "PhoneNumber": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "PhoneNumber",
            "id": "DC1300001",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": false,
          },
          "confirmPassword": Object {
            "autoCheck": false,
            "displayOnForm": false,
            "fieldName": "confirmPassword",
            "id": "DC1500013",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": false,
          },
          "eventDate": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "eventDate",
            "id": "Wedding_eventDate",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "favoriteStore": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "favoriteStore",
            "id": "DC1500012",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "futureShippingDate": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "futureShippingDate",
            "id": "DC1500011",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "networkAffiliation": Object {
            "autoCheck": true,
            "displayOnForm": true,
            "fieldName": "networkAffiliation",
            "id": "DC1300006",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "numberOfGuests": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "numberOfGuests",
            "id": "DC1500005",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "showContactAddress": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "showContactAddress",
            "id": "DC1500007",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "showFutureShippingAddr": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "showFutureShippingAddr",
            "id": "DC1500009",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": false,
          },
          "showShippingAddress": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "showShippingAddress",
            "id": "DC1500008",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "showerDate": Object {
            "autoCheck": false,
            "displayOnForm": false,
            "fieldName": "showerDate",
            "id": "DC1500006",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "useContactAddrAsShippingAddr": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "useContactAddrAsShippingAddr",
            "id": "DC1500010",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
        }
      }
    />
  </div>
</Fragment>
```

#### `should render blanck when registryDetails are not present correctly`

```
<Fragment>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb1"
            >
              <PersonalInfo
                coRegEmailFlag={undefined}
                coRegOwner={undefined}
                coRegProfileStatus={undefined}
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
                editWedRegistry={true}
                eventType={undefined}
                fetchCoRegistrantProfileStatus={undefined}
                globalSwitchConfig={undefined}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                listenProfileStatusChange={[Function]}
                profileData={undefined}
                referredContent={undefined}
                registryInputFields={
                  Object {
                    "CoRegistrantEmail": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantEmail",
                      "id": "DC1400016",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "CoRegistrantFirstName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantFirstName ",
                      "id": "DC1200001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "CoRegistrantLastName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantLastName",
                      "id": "DC1400015",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "MobileNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "MobileNumber",
                      "id": "DC1500001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "PhoneNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "PhoneNumber",
                      "id": "DC1300001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "confirmPassword": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "confirmPassword",
                      "id": "DC1500013",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "eventDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "eventDate",
                      "id": "Wedding_eventDate",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "favoriteStore": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "favoriteStore",
                      "id": "DC1500012",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "futureShippingDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "futureShippingDate",
                      "id": "DC1500011",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "networkAffiliation": Object {
                      "autoCheck": true,
                      "displayOnForm": true,
                      "fieldName": "networkAffiliation",
                      "id": "DC1300006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "numberOfGuests": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "numberOfGuests",
                      "id": "DC1500005",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showContactAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showContactAddress",
                      "id": "DC1500007",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showFutureShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showFutureShippingAddr",
                      "id": "DC1500009",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "showShippingAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showShippingAddress",
                      "id": "DC1500008",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showerDate": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "showerDate",
                      "id": "DC1500006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "useContactAddrAsShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "useContactAddrAsShippingAddr",
                      "id": "DC1500010",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                  }
                }
                resetCoRegistrantProfileStatus={undefined}
                stateObj={Object {}}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Who's the lucky couple?
              <Button
                aria-label="Your names will help gift givers identify your registry."
                className="iconStyle absolute tooltip-bottom"
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
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb1"
            >
              <EventInfo
                atDateFlag={undefined}
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
                editWedRegistry={true}
                eventType={undefined}
                isMobile={true}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                registryInputFields={
                  Object {
                    "CoRegistrantEmail": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantEmail",
                      "id": "DC1400016",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "CoRegistrantFirstName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantFirstName ",
                      "id": "DC1200001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "CoRegistrantLastName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantLastName",
                      "id": "DC1400015",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "MobileNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "MobileNumber",
                      "id": "DC1500001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "PhoneNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "PhoneNumber",
                      "id": "DC1300001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "confirmPassword": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "confirmPassword",
                      "id": "DC1500013",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "eventDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "eventDate",
                      "id": "Wedding_eventDate",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "favoriteStore": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "favoriteStore",
                      "id": "DC1500012",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "futureShippingDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "futureShippingDate",
                      "id": "DC1500011",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "networkAffiliation": Object {
                      "autoCheck": true,
                      "displayOnForm": true,
                      "fieldName": "networkAffiliation",
                      "id": "DC1300006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "numberOfGuests": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "numberOfGuests",
                      "id": "DC1500005",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showContactAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showContactAddress",
                      "id": "DC1500007",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showFutureShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showFutureShippingAddr",
                      "id": "DC1500009",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "showShippingAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showShippingAddress",
                      "id": "DC1500008",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showerDate": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "showerDate",
                      "id": "DC1500006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "useContactAddrAsShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "useContactAddrAsShippingAddr",
                      "id": "DC1500010",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                  }
                }
                setFocusOnNextElement={true}
                stateObj={Object {}}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              When is the big day?
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb2 sm-pb1"
            >
              <ContactInfo
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
                editWedRegistry={true}
                eventType={undefined}
                hideMoveInfo={undefined}
                hideShippingInfo={undefined}
                isMobile={true}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                registryInputFields={
                  Object {
                    "CoRegistrantEmail": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantEmail",
                      "id": "DC1400016",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "CoRegistrantFirstName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantFirstName ",
                      "id": "DC1200001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "CoRegistrantLastName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantLastName",
                      "id": "DC1400015",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "MobileNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "MobileNumber",
                      "id": "DC1500001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "PhoneNumber": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "PhoneNumber",
                      "id": "DC1300001",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "confirmPassword": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "confirmPassword",
                      "id": "DC1500013",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "eventDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "eventDate",
                      "id": "Wedding_eventDate",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "favoriteStore": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "favoriteStore",
                      "id": "DC1500012",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "futureShippingDate": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "futureShippingDate",
                      "id": "DC1500011",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "networkAffiliation": Object {
                      "autoCheck": true,
                      "displayOnForm": true,
                      "fieldName": "networkAffiliation",
                      "id": "DC1300006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "numberOfGuests": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "numberOfGuests",
                      "id": "DC1500005",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showContactAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showContactAddress",
                      "id": "DC1500007",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showFutureShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showFutureShippingAddr",
                      "id": "DC1500009",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": false,
                    },
                    "showShippingAddress": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "showShippingAddress",
                      "id": "DC1500008",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "showerDate": Object {
                      "autoCheck": false,
                      "displayOnForm": false,
                      "fieldName": "showerDate",
                      "id": "DC1500006",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                    "useContactAddrAsShippingAddr": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "useContactAddrAsShippingAddr",
                      "id": "DC1500010",
                      "inputType": "FreeForm",
                      "registryOptionVO": Array [],
                      "requiredForListCreate": false,
                      "requiredInputCreate": false,
                      "requiredInputUpdate": false,
                      "requiredToMakeRegPublic": false,
                    },
                  }
                }
                registrySiteConfig={
                  Object {
                    "enableDeleteRegistryFeature": true,
                  }
                }
                showMoveInfo={undefined}
                showShippingInfo={undefined}
                stateObj={Object {}}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Your Contact Address
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="pb1"
            >
              <PrivacySettings
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
                deactivateRegistryContentId={undefined}
                dynamicContentState={undefined}
                labels={
                  Object {
                    "test": "value",
                  }
                }
                stateObj={Object {}}
                toggleModalState={undefined}
                updateState={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Registry Visibility
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <UniversalComponent
    labels={
      Object {
        "test": "value",
      }
    }
    shipOrSwap={true}
  />
  <div
    className="editFormAccordionWrapper mb2 sm-px2 pt2"
  >
    <Accordion
      accordion={false}
      className="editFormAccordion"
      data={
        Array [
          Object {
            "body": <div
              className="editFormSection fieldStyle pb2"
            >
              <UNDEFINED
                currentAddress={undefined}
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
                defaultStoreId={undefined}
                onStoreUpdate={[Function]}
                profileAddress={undefined}
                setRegistryFavStoreSearchFlag={undefined}
              />
            </div>,
            "expanded": true,
            "title": <Button
              className="fieldsHeading relative"
              theme="default"
              variation="noPadding"
            >
              Your Favorite Store
            </Button>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      noBorder={true}
      showExpandCollapseIcon={false}
      showExpanded={true}
    />
  </div>
  <div
    className="pb3 sm-pb15"
  >
    <NetworkInfo
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
      enableRBYRFeatureConfig={true}
      isRegistryRBYRIncluded={true}
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "false",
          "enableAutoFill": "true",
          "enableEmailOptIn": false,
        }
      }
      registryInputFields={
        Object {
          "CoRegistrantEmail": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "CoRegistrantEmail",
            "id": "DC1400016",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "CoRegistrantFirstName": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "CoRegistrantFirstName ",
            "id": "DC1200001",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "CoRegistrantLastName": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "CoRegistrantLastName",
            "id": "DC1400015",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "MobileNumber": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "MobileNumber",
            "id": "DC1500001",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "PhoneNumber": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "PhoneNumber",
            "id": "DC1300001",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": false,
          },
          "confirmPassword": Object {
            "autoCheck": false,
            "displayOnForm": false,
            "fieldName": "confirmPassword",
            "id": "DC1500013",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": false,
          },
          "eventDate": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "eventDate",
            "id": "Wedding_eventDate",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "favoriteStore": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "favoriteStore",
            "id": "DC1500012",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "futureShippingDate": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "futureShippingDate",
            "id": "DC1500011",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "networkAffiliation": Object {
            "autoCheck": true,
            "displayOnForm": true,
            "fieldName": "networkAffiliation",
            "id": "DC1300006",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "numberOfGuests": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "numberOfGuests",
            "id": "DC1500005",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "showContactAddress": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "showContactAddress",
            "id": "DC1500007",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "showFutureShippingAddr": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "showFutureShippingAddr",
            "id": "DC1500009",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": false,
          },
          "showShippingAddress": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "showShippingAddress",
            "id": "DC1500008",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": true,
            "requiredInputUpdate": true,
            "requiredToMakeRegPublic": true,
          },
          "showerDate": Object {
            "autoCheck": false,
            "displayOnForm": false,
            "fieldName": "showerDate",
            "id": "DC1500006",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
          "useContactAddrAsShippingAddr": Object {
            "autoCheck": false,
            "displayOnForm": true,
            "fieldName": "useContactAddrAsShippingAddr",
            "id": "DC1500010",
            "inputType": "FreeForm",
            "registryOptionVO": Array [],
            "requiredForListCreate": false,
            "requiredInputCreate": false,
            "requiredInputUpdate": false,
            "requiredToMakeRegPublic": false,
          },
        }
      }
    />
  </div>
</Fragment>
```

