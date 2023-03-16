# `app/containers/Pages/Registry/RegistryOwnerHome/tests/confettiScript.test.jsx`

#### `should check the render of RegistryOwnerHome`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <UniversalComponent
      RBYRAlreadyOptIn={false}
      eventType="Wedding"
      handleLearnMoreClick={[Function]}
      loginModalVisibility={false}
      onDeviceModalClose={[Function]}
      onDeviceVerificationModalOpen={[Function]}
      onModalClose={[Function]}
      openRBYRModal={true}
      path="/store/giftRegistry/viewRegistryOwner/home/1234"
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryId="1234"
      showModal={false}
      toggleLoginModalState={[Function]}
    />
    <div
      className="registryActionButtonContainer"
    >
      <div
        className="registryActionButton justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2"
      >
        <Heading
          className="registryHeading mr-auto pt1"
          data-locator="registery-registerymyitems-heading"
          level={2}
          styleVariation="h3-sans"
        >
          Wedding Registry Home
        </Heading>
        <RegistryActionButtons
          activeRegistry={
            Object {
              "coRegEmail": "mail",
              "coRegistrantFirstName": "asd",
              "coRegistrantLastName": "asd",
              "eventDate": "data",
              "favStoreId": "asd",
              "primaryRegistrantEmail": "email",
              "primaryRegistrantFirstName": "abc",
              "primaryRegistrantLastName": "xyz",
              "primaryRegistrantPrimaryPhoneNum": "1234567890",
              "registryId": "1234",
            }
          }
          displayLoginModal={[Function]}
          dynamicContentState={
            Object {
              "content": Object {
                "1": Object {
                  "body": "hoorayModalWedding",
                },
                "2": Object {
                  "body": "hoorayModalBaby",
                },
                "3": Object {
                  "body": "hoorayModalBirthday",
                },
                "4": Object {
                  "body": "hoorayModalRetirement",
                },
                "5": Object {
                  "body": "hoorayModalAnniversary",
                },
                "6": Object {
                  "body": "hoorayModalHouseWarming",
                },
                "7": Object {
                  "body": "hoorayModalCollege",
                },
                "8": Object {
                  "body": "hoorayModalCommitment",
                },
                "9": Object {
                  "body": "hoorayModalOther",
                },
              },
            }
          }
          enabledVendors={
            Object {
              "gru_tri": true,
            }
          }
          fetchContentStack={[Function]}
          isGoodyBoxModalOpen={true}
          isLoggedIn={true}
          isPreviewYrReg={false}
          labels={
            Object {
              "createRegistry": Object {
                "referredContent": Array [
                  Object {
                    "id": "1",
                    "key": "hoorayModalWedding",
                  },
                  Object {
                    "id": "2",
                    "key": "hoorayModalBaby",
                  },
                  Object {
                    "id": "3",
                    "key": "hoorayModalBirthday",
                  },
                  Object {
                    "id": "4",
                    "key": "hoorayModalRetirement",
                  },
                  Object {
                    "id": "5",
                    "key": "hoorayModalAnniversary",
                  },
                  Object {
                    "id": "6",
                    "key": "hoorayModalHouseWarming",
                  },
                  Object {
                    "id": "7",
                    "key": "hoorayModalCollege",
                  },
                  Object {
                    "id": "8",
                    "key": "hoorayModalCommitment",
                  },
                  Object {
                    "id": "9",
                    "key": "hoorayModalOther",
                  },
                ],
              },
            }
          }
          mPulseSiteConfig={
            Object {
              "pageLevelConfig": Object {
                "RegistryOwnerHome": Object {
                  "ConditionalMarksFlag": Object {
                    "ux-destination-verified": Array [],
                    "ux-primary-action-available": Array [],
                    "ux-primary-content-displayed": Array [],
                    "ux-secondary-content-displayed": Array [],
                  },
                  "PageSpecificMarks": Object {
                    "ux-destination-verified": Array [
                      "ux-text-registrant-name",
                      "ux-text-registry-home",
                    ],
                    "ux-primary-action-available": Array [
                      "ux-link-registry-tabs",
                    ],
                    "ux-primary-content-displayed": Array [
                      "ux-text-registry-home-content",
                    ],
                    "ux-secondary-content-displayed": Array [
                      "ux-text-item-requested",
                      "ux-text-item-purchased",
                    ],
                  },
                  "PageViewMarks": Object {
                    "ux-destination-verified": Array [
                      "ux-image-inline-logo",
                    ],
                    "ux-primary-action-available": Array [],
                    "ux-primary-content-displayed": Array [],
                    "ux-secondary-content-displayed": Array [],
                  },
                  "enabled": true,
                },
              },
            }
          }
          matchParamId="2345"
          pageConfigGlobal={
            Object {
              "defaultBabyStore": 2,
              "defaultBedbathStore": 1,
              "defaultCanadaStore": 3,
              "refID_ANN": "refID_ANN",
              "refID_BA1": "refID_BA1",
              "refID_BIR": "refID_BIR",
              "refID_BRD": "refID_BRD",
              "refID_COL": "refID_COL",
              "refID_COM": "refID_COM",
              "refID_HSW": "refID_HSW",
              "refID_OTH": "refID_OTH",
              "refID_RET": "refID_RET",
            }
          }
          regTemplate={
            Object {
              "layout": Object {},
              "regions": Object {},
            }
          }
          registryDetailsData={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "Wedding",
                  "registryState": "inprogress",
                },
              },
            }
          }
          registryId="2345"
          registryLabel={null}
          registryResVO={
            Object {
              "registrySummaryVO": Object {
                "registryState": "COM",
              },
            }
          }
          resetFirstCategoryCallFired={[Function]}
          route={
            Object {
              "routeData": Object {
                "pageName": "RegistryOwnerHome",
              },
            }
          }
          router={
            Object {
              "location": Object {
                "pathname": "",
                "search": "",
              },
            }
          }
          siteConfig={
            Object {
              "thirdPartyDataConfig": Object {
                "bookingBug": Object {
                  "appointmentsUrl": "baseUrl",
                },
              },
            }
          }
          switchConfig={
            Object {
              "enableMPulse": true,
            }
          }
          switchConfigGlobal={
            Object {
              "globalMPulseEnable": true,
            }
          }
        />
      </div>
    </div>
    <RegistryOwnerHome
      activeRegistry={
        Object {
          "coRegEmail": "mail",
          "coRegistrantFirstName": "asd",
          "coRegistrantLastName": "asd",
          "eventDate": "data",
          "favStoreId": "asd",
          "primaryRegistrantEmail": "email",
          "primaryRegistrantFirstName": "abc",
          "primaryRegistrantLastName": "xyz",
          "primaryRegistrantPrimaryPhoneNum": "1234567890",
          "registryId": "1234",
        }
      }
      childrens={null}
      displayLoginModal={[Function]}
      dynamicContentState={
        Object {
          "content": Object {
            "1": Object {
              "body": "hoorayModalWedding",
            },
            "2": Object {
              "body": "hoorayModalBaby",
            },
            "3": Object {
              "body": "hoorayModalBirthday",
            },
            "4": Object {
              "body": "hoorayModalRetirement",
            },
            "5": Object {
              "body": "hoorayModalAnniversary",
            },
            "6": Object {
              "body": "hoorayModalHouseWarming",
            },
            "7": Object {
              "body": "hoorayModalCollege",
            },
            "8": Object {
              "body": "hoorayModalCommitment",
            },
            "9": Object {
              "body": "hoorayModalOther",
            },
          },
        }
      }
      enableLearnMoreGGModal={false}
      enabledVendors={
        Object {
          "gru_tri": true,
        }
      }
      fetchContentStack={[Function]}
      groupGiftOptIn={false}
      groupGiftingEnable={false}
      isGoodyBoxModalOpen={true}
      isLoggedIn={true}
      labels={
        Object {
          "createRegistry": Object {
            "referredContent": Array [
              Object {
                "id": "1",
                "key": "hoorayModalWedding",
              },
              Object {
                "id": "2",
                "key": "hoorayModalBaby",
              },
              Object {
                "id": "3",
                "key": "hoorayModalBirthday",
              },
              Object {
                "id": "4",
                "key": "hoorayModalRetirement",
              },
              Object {
                "id": "5",
                "key": "hoorayModalAnniversary",
              },
              Object {
                "id": "6",
                "key": "hoorayModalHouseWarming",
              },
              Object {
                "id": "7",
                "key": "hoorayModalCollege",
              },
              Object {
                "id": "8",
                "key": "hoorayModalCommitment",
              },
              Object {
                "id": "9",
                "key": "hoorayModalOther",
              },
            ],
          },
        }
      }
      mPulseSiteConfig={
        Object {
          "pageLevelConfig": Object {
            "RegistryOwnerHome": Object {
              "ConditionalMarksFlag": Object {
                "ux-destination-verified": Array [],
                "ux-primary-action-available": Array [],
                "ux-primary-content-displayed": Array [],
                "ux-secondary-content-displayed": Array [],
              },
              "PageSpecificMarks": Object {
                "ux-destination-verified": Array [
                  "ux-text-registrant-name",
                  "ux-text-registry-home",
                ],
                "ux-primary-action-available": Array [
                  "ux-link-registry-tabs",
                ],
                "ux-primary-content-displayed": Array [
                  "ux-text-registry-home-content",
                ],
                "ux-secondary-content-displayed": Array [
                  "ux-text-item-requested",
                  "ux-text-item-purchased",
                ],
              },
              "PageViewMarks": Object {
                "ux-destination-verified": Array [
                  "ux-image-inline-logo",
                ],
                "ux-primary-action-available": Array [],
                "ux-primary-content-displayed": Array [],
                "ux-secondary-content-displayed": Array [],
              },
              "enabled": true,
            },
          },
        }
      }
      matchParamId="2345"
      pageConfigGlobal={
        Object {
          "defaultBabyStore": 2,
          "defaultBedbathStore": 1,
          "defaultCanadaStore": 3,
          "refID_ANN": "refID_ANN",
          "refID_BA1": "refID_BA1",
          "refID_BIR": "refID_BIR",
          "refID_BRD": "refID_BRD",
          "refID_COL": "refID_COL",
          "refID_COM": "refID_COM",
          "refID_HSW": "refID_HSW",
          "refID_OTH": "refID_OTH",
          "refID_RET": "refID_RET",
        }
      }
      regTemplate={
        Object {
          "layout": Object {},
          "regions": Object {},
        }
      }
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryID="2345"
      registryResVO={
        Object {
          "registrySummaryVO": Object {
            "registryState": "COM",
          },
        }
      }
      resetFirstCategoryCallFired={[Function]}
      route={
        Object {
          "routeData": Object {
            "pageName": "RegistryOwnerHome",
          },
        }
      }
      router={
        Object {
          "location": Object {
            "pathname": "",
            "search": "",
          },
        }
      }
      siteConfig={
        Object {
          "thirdPartyDataConfig": Object {
            "bookingBug": Object {
              "appointmentsUrl": "baseUrl",
            },
          },
        }
      }
      switchConfig={
        Object {
          "enableMPulse": true,
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
    />
    <div />
    <UniversalComponent
      hideParent={[Function]}
      isGoodyBoxModalOpen={true}
      openGoodyBoxModalOpen={[Function]}
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryId="1234"
    />
  </ErrorBoundary>
</Fragment>
```

## `showConfetti for RegistryReimagine feature`

####   `should show confetti on baby registry create for BuyBuyBaby`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <UniversalComponent
      RBYRAlreadyOptIn={false}
      eventType="Wedding"
      eventTypeCode="BA1"
      handleLearnMoreClick={[Function]}
      loginModalVisibility={false}
      onDeviceModalClose={[Function]}
      onDeviceVerificationModalOpen={[Function]}
      onModalClose={[Function]}
      openRBYRModal={true}
      path="/store/giftRegistry/viewRegistryOwner/home/1234"
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryId="1234"
      showModal={false}
      toggleLoginModalState={[Function]}
    />
    <div
      className="registryActionButtonContainer"
    >
      <div
        className="registryAddInfoSection justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2"
      >
        <Heading
          className="welcomeText__wedding mr-auto welComeTextMargin"
          data-locator="registery-registerymyitems-heading"
          id="registrymyitems"
          level={1}
          styleVariation={false}
        >
          Welcome abc!
        </Heading>
        <div
          className="moreInfoSection"
        >
          <div
            className="welcomeSubText welcomeSubTextSize"
            styleVariation="h6-sans"
          >
            Do you want to complete your profile? 
          </div>
          <PrimaryLink
            className="editRegistryButton mr3 sm-mr2 xs-mr2"
            href="#"
            onClick={[Function]}
            textDecoration="textDecorationNone"
            variation="primary"
          >
            Add Information
          </PrimaryLink>
        </div>
      </div>
    </div>
    <canvas
      id="canvas"
    />
    <UniversalComponent
      activeRegistry={
        Object {
          "coRegEmail": "mail",
          "coRegistrantFirstName": "asd",
          "coRegistrantLastName": "asd",
          "eventDate": "data",
          "favStoreId": "asd",
          "primaryRegistrantEmail": "email",
          "primaryRegistrantFirstName": "abc",
          "primaryRegistrantLastName": "xyz",
          "primaryRegistrantPrimaryPhoneNum": "1234567890",
          "registryId": "1234",
        }
      }
      childrens={null}
      clearCreateRegistryState={
        Object {
          "clearCreateRegistryState": [Function],
        }
      }
      clearCreateRegistryVerTypeState={
        Object {
          "clearCreateRegistryVerTypeState": [Function],
        }
      }
      displayLoginModal={[Function]}
      dynamicContentState={
        Object {
          "content": Object {
            "1": Object {
              "body": "hoorayModalWedding",
            },
            "2": Object {
              "body": "hoorayModalBaby",
            },
          },
        }
      }
      enabledVendors={
        Object {
          "enabledVendors": Object {
            "gru_tri": true,
          },
        }
      }
      eventTypeCode="BA1"
      fetchContentStack={[Function]}
      getElm={[Function]}
      groupGiftOptIn={false}
      groupGiftingEnable={false}
      history={
        Object {
          "history": Array [],
        }
      }
      isLoggedIn={true}
      isNewCreateRegForm="true"
      labels={
        Object {
          "createRegistry": Object {
            "referredContent": Array [
              Object {
                "id": "1",
                "key": "hoorayModalWedding",
              },
              Object {
                "id": "2",
                "key": "hoorayModalBaby",
              },
            ],
          },
        }
      }
      matchParamId="1234"
      openGoodyBoxModalOpen={
        Object {
          "openGoodyBoxModalOpen": [Function],
        }
      }
      pageConfigGlobal={
        Object {
          "defaultBabyStore": 2,
          "defaultBedbathStore": 1,
          "defaultCanadaStore": 3,
          "refID_BA1": "refID_BA1",
          "refID_BRD": "refID_BRD",
        }
      }
      previousRoute="/store/giftregistry/createRegistryForm"
      regTemplate={
        Object {
          "template": Object {
            "layout": Object {},
            "regions": Object {},
          },
        }
      }
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryID="1234"
      route={
        Object {
          "route": Object {
            "routeData": Object {
              "pageName": "RegistryOwnerHome",
            },
          },
        }
      }
      router={
        Object {
          "location": Object {
            "pathname": "",
            "search": "?hoorayModal=true",
          },
        }
      }
      setCheckListTooltip={[Function]}
      siteConfig={
        Object {
          "thirdPartyDataConfig": Object {
            "bookingBug": Object {
              "appointmentsUrl": "baseUrl",
            },
          },
        }
      }
      siteId="BuyBuyBaby"
      switchConfig={
        Object {
          "switchConfig": Object {
            "enableMPulse": true,
          },
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
      tealiumConfirmationInfo={[Function]}
      toggleMode={
        Object {
          "toggleMode": [Function],
        }
      }
    />
    <div />
  </ErrorBoundary>
</Fragment>
```

####   `should show confetti on wedding registry create for BedBathUS`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <UniversalComponent
      RBYRAlreadyOptIn={false}
      eventType="Wedding"
      eventTypeCode="BRD"
      handleLearnMoreClick={[Function]}
      loginModalVisibility={false}
      onDeviceModalClose={[Function]}
      onDeviceVerificationModalOpen={[Function]}
      onModalClose={[Function]}
      openRBYRModal={true}
      path="/store/giftRegistry/viewRegistryOwner/home/1234"
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryId="1234"
      showModal={false}
      toggleLoginModalState={[Function]}
    />
    <div
      className="registryActionButtonContainer"
    >
      <div
        className="registryAddInfoSection justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2"
      >
        <Heading
          className="welcomeText__wedding mr-auto welComeTextMargin"
          data-locator="registery-registerymyitems-heading"
          id="registrymyitems"
          level={1}
          styleVariation={false}
        >
          Welcome abc!
        </Heading>
        <div
          className="moreInfoSection"
        >
          <div
            className="welcomeSubText welcomeSubTextSize"
            styleVariation="h6-sans"
          >
            Do you want to complete your profile? 
          </div>
          <PrimaryLink
            className="editRegistryButton mr3 sm-mr2 xs-mr2"
            href="#"
            onClick={[Function]}
            textDecoration="textDecorationNone"
            variation="primary"
          >
            Add Information
          </PrimaryLink>
        </div>
      </div>
    </div>
    <canvas
      id="canvas"
    />
    <UniversalComponent
      activeRegistry={
        Object {
          "coRegEmail": "mail",
          "coRegistrantFirstName": "asd",
          "coRegistrantLastName": "asd",
          "eventDate": "data",
          "favStoreId": "asd",
          "primaryRegistrantEmail": "email",
          "primaryRegistrantFirstName": "abc",
          "primaryRegistrantLastName": "xyz",
          "primaryRegistrantPrimaryPhoneNum": "1234567890",
          "registryId": "1234",
        }
      }
      childrens={null}
      clearCreateRegistryState={
        Object {
          "clearCreateRegistryState": [Function],
        }
      }
      clearCreateRegistryVerTypeState={
        Object {
          "clearCreateRegistryVerTypeState": [Function],
        }
      }
      displayLoginModal={[Function]}
      dynamicContentState={
        Object {
          "content": Object {
            "1": Object {
              "body": "hoorayModalWedding",
            },
            "2": Object {
              "body": "hoorayModalBaby",
            },
          },
        }
      }
      enabledVendors={
        Object {
          "enabledVendors": Object {
            "gru_tri": true,
          },
        }
      }
      eventTypeCode="BRD"
      fetchContentStack={[Function]}
      groupGiftOptIn={false}
      groupGiftingEnable={false}
      history={
        Object {
          "history": Array [],
        }
      }
      isLoggedIn={true}
      labels={
        Object {
          "createRegistry": Object {
            "referredContent": Array [
              Object {
                "id": "1",
                "key": "hoorayModalWedding",
              },
              Object {
                "id": "2",
                "key": "hoorayModalBaby",
              },
            ],
          },
        }
      }
      matchParamId="1234"
      openGoodyBoxModalOpen={
        Object {
          "openGoodyBoxModalOpen": [Function],
        }
      }
      pageConfigGlobal={
        Object {
          "defaultBabyStore": 2,
          "defaultBedbathStore": 1,
          "defaultCanadaStore": 3,
          "refID_BA1": "refID_BA1",
          "refID_BRD": "refID_BRD",
        }
      }
      previousRoute="/store/giftregistry/createRegistryForm"
      regTemplate={
        Object {
          "template": Object {
            "layout": Object {},
            "regions": Object {},
          },
        }
      }
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryID="1234"
      route={
        Object {
          "route": Object {
            "routeData": Object {
              "pageName": "RegistryOwnerHome",
            },
          },
        }
      }
      router={
        Object {
          "location": Object {
            "pathname": "",
            "search": "?hoorayModal=true",
          },
        }
      }
      setCheckListTooltip={[Function]}
      siteConfig={
        Object {
          "thirdPartyDataConfig": Object {
            "bookingBug": Object {
              "appointmentsUrl": "baseUrl",
            },
          },
        }
      }
      siteId="BedBathUS"
      switchConfig={
        Object {
          "switchConfig": Object {
            "enableMPulse": true,
          },
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
      tealiumConfirmationInfo={[Function]}
      toggleMode={
        Object {
          "toggleMode": [Function],
        }
      }
    />
    <div />
  </ErrorBoundary>
</Fragment>
```

####   `should show confetti on wedding registry create for BedBathCA`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <UniversalComponent
      RBYRAlreadyOptIn={false}
      eventType="Wedding"
      eventTypeCode="BRD"
      handleLearnMoreClick={[Function]}
      loginModalVisibility={false}
      onDeviceModalClose={[Function]}
      onDeviceVerificationModalOpen={[Function]}
      onModalClose={[Function]}
      openRBYRModal={true}
      path="/store/giftRegistry/viewRegistryOwner/home/1234"
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryId="1234"
      showModal={false}
      toggleLoginModalState={[Function]}
    />
    <div
      className="registryActionButtonContainer"
    >
      <div
        className="registryAddInfoSection justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2"
      >
        <Heading
          className="welcomeText__wedding mr-auto welComeTextMargin"
          data-locator="registery-registerymyitems-heading"
          id="registrymyitems"
          level={1}
          styleVariation={false}
        >
          Welcome abc!
        </Heading>
        <div
          className="moreInfoSection"
        >
          <div
            className="welcomeSubText welcomeSubTextSize"
            styleVariation="h6-sans"
          >
            Do you want to complete your profile? 
          </div>
          <PrimaryLink
            className="editRegistryButton mr3 sm-mr2 xs-mr2"
            href="#"
            onClick={[Function]}
            textDecoration="textDecorationNone"
            variation="primary"
          >
            Add Information
          </PrimaryLink>
        </div>
      </div>
    </div>
    <canvas
      id="canvas"
    />
    <UniversalComponent
      activeRegistry={
        Object {
          "coRegEmail": "mail",
          "coRegistrantFirstName": "asd",
          "coRegistrantLastName": "asd",
          "eventDate": "data",
          "favStoreId": "asd",
          "primaryRegistrantEmail": "email",
          "primaryRegistrantFirstName": "abc",
          "primaryRegistrantLastName": "xyz",
          "primaryRegistrantPrimaryPhoneNum": "1234567890",
          "registryId": "1234",
        }
      }
      childrens={null}
      clearCreateRegistryState={
        Object {
          "clearCreateRegistryState": [Function],
        }
      }
      clearCreateRegistryVerTypeState={
        Object {
          "clearCreateRegistryVerTypeState": [Function],
        }
      }
      displayLoginModal={[Function]}
      dynamicContentState={
        Object {
          "content": Object {
            "1": Object {
              "body": "hoorayModalWedding",
            },
            "2": Object {
              "body": "hoorayModalBaby",
            },
          },
        }
      }
      enabledVendors={
        Object {
          "enabledVendors": Object {
            "gru_tri": true,
          },
        }
      }
      eventTypeCode="BRD"
      fetchContentStack={[Function]}
      groupGiftOptIn={false}
      groupGiftingEnable={false}
      history={
        Object {
          "history": Array [],
        }
      }
      isLoggedIn={true}
      isNewCreateRegForm="true"
      labels={
        Object {
          "createRegistry": Object {
            "referredContent": Array [
              Object {
                "id": "1",
                "key": "hoorayModalWedding",
              },
              Object {
                "id": "2",
                "key": "hoorayModalBaby",
              },
            ],
          },
        }
      }
      matchParamId="1234"
      openGoodyBoxModalOpen={
        Object {
          "openGoodyBoxModalOpen": [Function],
        }
      }
      pageConfigGlobal={
        Object {
          "defaultBabyStore": 2,
          "defaultBedbathStore": 1,
          "defaultCanadaStore": 3,
          "refID_BA1": "refID_BA1",
          "refID_BRD": "refID_BRD",
        }
      }
      previousRoute="/store/giftregistry/createRegistryForm"
      regTemplate={
        Object {
          "template": Object {
            "layout": Object {},
            "regions": Object {},
          },
        }
      }
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryID="1234"
      route={
        Object {
          "route": Object {
            "routeData": Object {
              "pageName": "RegistryOwnerHome",
            },
          },
        }
      }
      router={
        Object {
          "location": Object {
            "pathname": "",
            "search": "?hoorayModal=true",
          },
        }
      }
      setCheckListTooltip={[Function]}
      siteConfig={
        Object {
          "thirdPartyDataConfig": Object {
            "bookingBug": Object {
              "appointmentsUrl": "baseUrl",
            },
          },
        }
      }
      siteId="BedBathCA"
      switchConfig={
        Object {
          "switchConfig": Object {
            "enableMPulse": true,
          },
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
      tealiumConfirmationInfo={[Function]}
      toggleMode={
        Object {
          "toggleMode": [Function],
        }
      }
    />
    <div />
  </ErrorBoundary>
</Fragment>
```

####   `should not show confetti on wedding registry create if enableRegWedCreate is false `

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <UniversalComponent
      RBYRAlreadyOptIn={false}
      eventType="Wedding"
      eventTypeCode="BRD"
      handleLearnMoreClick={[Function]}
      loginModalVisibility={false}
      onDeviceModalClose={[Function]}
      onDeviceVerificationModalOpen={[Function]}
      onModalClose={[Function]}
      openRBYRModal={true}
      path="/store/giftRegistry/viewRegistryOwner/home/1234"
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryId="1234"
      showModal={false}
      toggleLoginModalState={[Function]}
    />
    <div
      className="registryActionButtonContainer"
    >
      <div
        className="registryAddInfoSection justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2"
      >
        <Heading
          className="welcomeText__wedding mr-auto welComeTextMargin"
          data-locator="registery-registerymyitems-heading"
          id="registrymyitems"
          level={1}
          styleVariation={false}
        >
          Welcome abc!
        </Heading>
        <div
          className="moreInfoSection"
        >
          <div
            className="welcomeSubText welcomeSubTextSize"
            styleVariation="h6-sans"
          >
            Do you want to complete your profile? 
          </div>
          <PrimaryLink
            className="editRegistryButton mr3 sm-mr2 xs-mr2"
            href="#"
            onClick={[Function]}
            textDecoration="textDecorationNone"
            variation="primary"
          >
            Add Information
          </PrimaryLink>
        </div>
      </div>
    </div>
    <canvas
      id="canvas"
    />
    <UniversalComponent
      activeRegistry={
        Object {
          "coRegEmail": "mail",
          "coRegistrantFirstName": "asd",
          "coRegistrantLastName": "asd",
          "eventDate": "data",
          "favStoreId": "asd",
          "primaryRegistrantEmail": "email",
          "primaryRegistrantFirstName": "abc",
          "primaryRegistrantLastName": "xyz",
          "primaryRegistrantPrimaryPhoneNum": "1234567890",
          "registryId": "1234",
        }
      }
      childrens={null}
      clearCreateRegistryState={
        Object {
          "clearCreateRegistryState": [Function],
        }
      }
      clearCreateRegistryVerTypeState={
        Object {
          "clearCreateRegistryVerTypeState": [Function],
        }
      }
      displayLoginModal={[Function]}
      dynamicContentState={
        Object {
          "content": Object {
            "1": Object {
              "body": "hoorayModalWedding",
            },
            "2": Object {
              "body": "hoorayModalBaby",
            },
          },
        }
      }
      enabledVendors={
        Object {
          "enabledVendors": Object {
            "gru_tri": true,
          },
        }
      }
      eventTypeCode="BRD"
      fetchContentStack={[Function]}
      groupGiftOptIn={false}
      groupGiftingEnable={false}
      history={
        Object {
          "history": Array [],
        }
      }
      isLoggedIn={true}
      labels={
        Object {
          "createRegistry": Object {
            "referredContent": Array [
              Object {
                "id": "1",
                "key": "hoorayModalWedding",
              },
              Object {
                "id": "2",
                "key": "hoorayModalBaby",
              },
            ],
          },
        }
      }
      matchParamId="1234"
      openGoodyBoxModalOpen={
        Object {
          "openGoodyBoxModalOpen": [Function],
        }
      }
      pageConfigGlobal={
        Object {
          "defaultBabyStore": 2,
          "defaultBedbathStore": 1,
          "defaultCanadaStore": 3,
          "refID_BA1": "refID_BA1",
          "refID_BRD": "refID_BRD",
        }
      }
      previousRoute="/store/giftregistry/createRegistryForm"
      regTemplate={
        Object {
          "template": Object {
            "layout": Object {},
            "regions": Object {},
          },
        }
      }
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryID="1234"
      route={
        Object {
          "route": Object {
            "routeData": Object {
              "pageName": "RegistryOwnerHome",
            },
          },
        }
      }
      router={
        Object {
          "location": Object {
            "pathname": "",
            "search": "?hoorayModal=true",
          },
        }
      }
      setCheckListTooltip={[Function]}
      siteConfig={
        Object {
          "thirdPartyDataConfig": Object {
            "bookingBug": Object {
              "appointmentsUrl": "baseUrl",
            },
          },
        }
      }
      siteId="BedBathCA"
      switchConfig={
        Object {
          "switchConfig": Object {
            "enableMPulse": true,
          },
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
      tealiumConfirmationInfo={[Function]}
      toggleMode={
        Object {
          "toggleMode": [Function],
        }
      }
    />
    <div />
  </ErrorBoundary>
</Fragment>
```

####   `should show confetti on wedding registry create for BedBathUS & BedBathCA`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <UniversalComponent
      RBYRAlreadyOptIn={false}
      eventType="Wedding"
      eventTypeCode="BRD"
      handleLearnMoreClick={[Function]}
      loginModalVisibility={false}
      onDeviceModalClose={[Function]}
      onDeviceVerificationModalOpen={[Function]}
      onModalClose={[Function]}
      openRBYRModal={true}
      path="/store/giftRegistry/viewRegistryOwner/home/1234"
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryId="1234"
      showModal={false}
      toggleLoginModalState={[Function]}
    />
    <div
      className="registryActionButtonContainer"
    >
      <div
        className="registryActionButton justify-start grid-container md-pt15 md-pb1875 sm-pt2 sm-pb2"
      >
        <Heading
          className="registryHeading mr-auto pt1"
          data-locator="registery-registerymyitems-heading"
          level={2}
          styleVariation="h3-sans"
        >
          Wedding Registry Home
        </Heading>
        <RegistryActionButtons
          activeRegistry={
            Object {
              "coRegEmail": "mail",
              "coRegistrantFirstName": "asd",
              "coRegistrantLastName": "asd",
              "eventDate": "data",
              "favStoreId": "asd",
              "primaryRegistrantEmail": "email",
              "primaryRegistrantFirstName": "abc",
              "primaryRegistrantLastName": "xyz",
              "primaryRegistrantPrimaryPhoneNum": "1234567890",
              "registryId": "1234",
            }
          }
          clearCreateRegistryState={
            Object {
              "clearCreateRegistryState": [Function],
            }
          }
          clearCreateRegistryVerTypeState={
            Object {
              "clearCreateRegistryVerTypeState": [Function],
            }
          }
          displayLoginModal={[Function]}
          dynamicContentState={
            Object {
              "content": Object {
                "1": Object {
                  "body": "hoorayModalWedding",
                },
                "2": Object {
                  "body": "hoorayModalBaby",
                },
              },
            }
          }
          enableRegBabyCreate={true}
          enabledVendors={
            Object {
              "enabledVendors": Object {
                "gru_tri": true,
              },
            }
          }
          eventTypeCode="BRD"
          fetchContentStack={[Function]}
          history={
            Object {
              "history": Array [],
            }
          }
          isLoggedIn={true}
          isPreviewYrReg={false}
          labels={
            Object {
              "createRegistry": Object {
                "referredContent": Array [
                  Object {
                    "id": "1",
                    "key": "hoorayModalWedding",
                  },
                  Object {
                    "id": "2",
                    "key": "hoorayModalBaby",
                  },
                ],
              },
            }
          }
          matchParamId="1234"
          openGoodyBoxModalOpen={
            Object {
              "openGoodyBoxModalOpen": [Function],
            }
          }
          pageConfigGlobal={
            Object {
              "defaultBabyStore": 2,
              "defaultBedbathStore": 1,
              "defaultCanadaStore": 3,
              "refID_BA1": "refID_BA1",
              "refID_BRD": "refID_BRD",
            }
          }
          previousRoute="/store/giftregistry/createRegistryForm"
          regTemplate={
            Object {
              "template": Object {
                "layout": Object {},
                "regions": Object {},
              },
            }
          }
          registryDetailsData={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "Wedding",
                  "registryState": "inprogress",
                },
              },
            }
          }
          registryId="1234"
          registryLabel={null}
          route={
            Object {
              "route": Object {
                "routeData": Object {
                  "pageName": "RegistryOwnerHome",
                },
              },
            }
          }
          router={
            Object {
              "router": Object {
                "location": Object {
                  "pathname": "",
                  "search": "",
                },
              },
            }
          }
          siteConfig={
            Object {
              "thirdPartyDataConfig": Object {
                "bookingBug": Object {
                  "appointmentsUrl": "baseUrl",
                },
              },
            }
          }
          siteId="BedBathUS"
          switchConfig={
            Object {
              "switchConfig": Object {
                "enableMPulse": true,
              },
            }
          }
          switchConfigGlobal={
            Object {
              "globalMPulseEnable": true,
            }
          }
          toggleMode={
            Object {
              "toggleMode": [Function],
            }
          }
        />
      </div>
    </div>
    <canvas
      id="canvas"
    />
    <RegistryOwnerHome
      activeRegistry={
        Object {
          "coRegEmail": "mail",
          "coRegistrantFirstName": "asd",
          "coRegistrantLastName": "asd",
          "eventDate": "data",
          "favStoreId": "asd",
          "primaryRegistrantEmail": "email",
          "primaryRegistrantFirstName": "abc",
          "primaryRegistrantLastName": "xyz",
          "primaryRegistrantPrimaryPhoneNum": "1234567890",
          "registryId": "1234",
        }
      }
      childrens={null}
      clearCreateRegistryState={
        Object {
          "clearCreateRegistryState": [Function],
        }
      }
      clearCreateRegistryVerTypeState={
        Object {
          "clearCreateRegistryVerTypeState": [Function],
        }
      }
      displayLoginModal={[Function]}
      dynamicContentState={
        Object {
          "content": Object {
            "1": Object {
              "body": "hoorayModalWedding",
            },
            "2": Object {
              "body": "hoorayModalBaby",
            },
          },
        }
      }
      enableLearnMoreGGModal={false}
      enableRegBabyCreate={true}
      enabledVendors={
        Object {
          "enabledVendors": Object {
            "gru_tri": true,
          },
        }
      }
      eventTypeCode="BRD"
      fetchContentStack={[Function]}
      groupGiftOptIn={false}
      groupGiftingEnable={false}
      history={
        Object {
          "history": Array [],
        }
      }
      isLoggedIn={true}
      labels={
        Object {
          "createRegistry": Object {
            "referredContent": Array [
              Object {
                "id": "1",
                "key": "hoorayModalWedding",
              },
              Object {
                "id": "2",
                "key": "hoorayModalBaby",
              },
            ],
          },
        }
      }
      matchParamId="1234"
      openGoodyBoxModalOpen={
        Object {
          "openGoodyBoxModalOpen": [Function],
        }
      }
      pageConfigGlobal={
        Object {
          "defaultBabyStore": 2,
          "defaultBedbathStore": 1,
          "defaultCanadaStore": 3,
          "refID_BA1": "refID_BA1",
          "refID_BRD": "refID_BRD",
        }
      }
      previousRoute="/store/giftregistry/createRegistryForm"
      regTemplate={
        Object {
          "template": Object {
            "layout": Object {},
            "regions": Object {},
          },
        }
      }
      registryDetailsData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
              "registryState": "inprogress",
            },
          },
        }
      }
      registryID="1234"
      route={
        Object {
          "route": Object {
            "routeData": Object {
              "pageName": "RegistryOwnerHome",
            },
          },
        }
      }
      router={
        Object {
          "router": Object {
            "location": Object {
              "pathname": "",
              "search": "",
            },
          },
        }
      }
      siteConfig={
        Object {
          "thirdPartyDataConfig": Object {
            "bookingBug": Object {
              "appointmentsUrl": "baseUrl",
            },
          },
        }
      }
      siteId="BedBathUS"
      switchConfig={
        Object {
          "switchConfig": Object {
            "enableMPulse": true,
          },
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
      toggleMode={
        Object {
          "toggleMode": [Function],
        }
      }
    />
    <div />
  </ErrorBoundary>
</Fragment>
```

