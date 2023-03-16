# `app/containers/Pages/Registry/QuickPicks/Landing/tests/sagas.test.js`

#### `should fetchRegistryType without data`

```
Object {}
```

#### `should transformAllCategory to consistent contract structure.`

```
Array [
  Object {
    "collections": Array [
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_beddiingbasics.jpg",
        "label": "Test Quick_Picks",
        "quickPickID": "10030",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/newborn_essentials.jpg",
        "label": "newborn essentials",
        "quickPickID": "10742",
      },
      Object {
        "image": "https://www.intlpantry.com/media/wysiwyg/wedding_registry.jpg",
        "label": "Quick Pick testing",
        "quickPickID": "10021",
        "url": "www.google.com",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/kickstarters_loveyourkitchen.jpg",
        "label": "love your kitchen ",
        "quickPickID": "10754",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/kickstarters_buildingyourbar.jpg",
        "label": "build your bar! BedBathUS",
        "quickPickID": "10756",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
        "label": "Quick Picks headline BedBathUS",
        "quickPickID": "10031",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/breastfeeding.jpg",
        "label": "breastfeeding must-haves",
        "quickPickID": "10743",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
        "label": "Quick Picks headline BedBathUS",
        "quickPickID": "10031",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
        "label": "Quick Picks headline BedBathUS",
        "quickPickID": "10031",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
    ],
    "image": Object {
      "alt": "Foobar",
      "url": "http://google",
    },
    "label": "All Cat Title",
  },
  Object {
    "collections": Array [
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_beddiingbasics.jpg",
        "label": "Test Quick_Picks",
        "quickPickID": "10030",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/newborn_essentials.jpg",
        "label": "newborn essentials",
        "quickPickID": "10742",
      },
    ],
    "image": "//www.mgmgrand.com/content/dam/MGM/mgm-grand/dining/in-room-dining/food-and-drink/mgm-grand-restraurant-in-room-dining-signature-dish-dinner-steak-lobster-@2x.jpg",
    "label": "BabyAccesories",
  },
  Object {
    "collections": Array [
      Object {
        "image": "https://www.intlpantry.com/media/wysiwyg/wedding_registry.jpg",
        "label": "Quick Pick testing",
        "quickPickID": "10021",
        "url": "www.google.com",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/kickstarters_loveyourkitchen.jpg",
        "label": "love your kitchen ",
        "quickPickID": "10754",
      },
    ],
    "image": "//www.mgmgrand.com/content/dam/MGM/mgm-grand/dining/in-room-dining/food-and-drink/mgm-grand-restraurant-in-room-dining-signature-dish-dinner-steak-lobster-@2x.jpg",
    "label": "Furniture",
  },
  Object {
    "collections": Array [
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/kickstarters_buildingyourbar.jpg",
        "label": "build your bar! BedBathUS",
        "quickPickID": "10756",
      },
    ],
    "image": "",
    "label": "Dinnerware",
  },
  Object {
    "collections": Array [
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
        "label": "Quick Picks headline BedBathUS",
        "quickPickID": "10031",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/breastfeeding.jpg",
        "label": "breastfeeding must-haves",
        "quickPickID": "10743",
      },
    ],
    "image": "//www.mgmgrand.com/content/dam/MGM/mgm-grand/dining/in-room-dining/food-and-drink/mgm-grand-restraurant-in-room-dining-signature-dish-dinner-steak-lobster-@2x.jpg",
    "label": "Dining",
  },
  Object {
    "collections": Array [
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
        "label": "Quick Picks headline BedBathUS",
        "quickPickID": "10031",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
    ],
    "image": "",
    "label": "Bakeware",
  },
  Object {
    "collections": Array [
      Object {
        "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
        "label": "Quick Picks headline BedBathUS",
        "quickPickID": "10031",
        "url": "quickpicks/appliance/alyssa-d/pub3900073",
      },
    ],
    "image": "//www.mgmgrand.com/content/dam/MGM/mgm-grand/dining/in-room-dining/food-and-drink/mgm-grand-restraurant-in-room-dining-signature-dish-dinner-steak-lobster-@2x.jpg",
    "label": "Appliance",
  },
]
```

#### `should fetchRegistryType with data`

```
Object {}
```

#### `should fetchRegistryTypes without data`

```
Array []
```

#### `should fetchRegistryTypes with data`

```
Object {}
```

#### `watch sagas`

```
Object {
  "@@redux-saga/IO": true,
  "FORK": Object {
    "args": Array [
      "BBB/Registry/QuickPicksLanding/Landing/FETCH_QUICK_PICKS",
      [Function],
    ],
    "context": null,
    "fn": [Function],
  },
}
```

## `#fetchQuickPicks`

####   `should fetch Quick Picks with data in store`

```
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": Object {
        "cacheKey": "",
        "categories": Array [
          Object {
            "collections": Array [
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
                "label": "Quick Picks headline BedBathUS",
                "quickPickID": "10031",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_beddiingbasics.jpg",
                "label": "Test Quick_Picks",
                "quickPickID": "10030",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/newborn_essentials.jpg",
                "label": "newborn essentials",
                "quickPickID": "10742",
              },
            ],
            "image": Object {
              "alt": "All",
              "url": "//s7d9.scene7.com/is/image/BedBathandBeyond/BBD_30230_03_Logged_Out_Banner_976X248_V2_FA_R1%5B1%5D?$other$",
            },
            "label": "All",
          },
          Object {
            "collections": Array [
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
                "label": "Quick Picks headline BedBathUS",
                "quickPickID": "10031",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
            ],
            "image": Object {
              "alt": "",
              "url": "",
            },
            "label": "Bakeware",
          },
          Object {
            "collections": Array [
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_beddiingbasics.jpg",
                "label": "Test Quick_Picks",
                "quickPickID": "10030",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/newborn_essentials.jpg",
                "label": "newborn essentials",
                "quickPickID": "10742",
              },
            ],
            "image": Object {
              "alt": "",
              "url": "//www.mgmgrand.com/content/dam/MGM/mgm-grand/dining/in-room-dining/food-and-drink/mgm-grand-restraurant-in-room-dining-signature-dish-dinner-steak-lobster-@2x.jpg",
            },
            "label": "BabyAccesories",
          },
        ],
        "error": false,
        "hero": Array [
          Object {
            "description": Object {
              "displayName": "Hero module 1",
            },
            "image": Object {
              "alt": "Test",
              "url": "internal://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_bakingbasics2.jpg",
            },
            "title": Object {
              "displayName": "Hero module 1",
            },
          },
        ],
        "registryTypes": Array [
          Object {
            "id": "200006",
            "label": "Wedding Registry Quick Picks",
            "url": "/store/registry/kickstarters/wedding",
          },
          Object {
            "id": "200009",
            "label": "Baby Registry Quick Picks",
            "url": "/store/registry/kickstarters/baby",
          },
        ],
        "selectedCategory": "all",
        "selectedRegistryType": "123456789",
      },
      "type": "BBB/Registry/QuickPicksLanding/Landing/SET_QUICK_PICKS",
    },
    "channel": null,
  },
}
```

####   `should fetch Quick Picks`

```
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": Object {
        "cacheKey": "",
        "categories": Array [
          Object {
            "collections": Array [
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
                "label": "Quick Picks headline BedBathUS",
                "quickPickID": "10031",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_beddiingbasics.jpg",
                "label": "Test Quick_Picks",
                "quickPickID": "10030",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/newborn_essentials.jpg",
                "label": "newborn essentials",
                "quickPickID": "10742",
              },
            ],
            "image": Object {
              "alt": "All",
              "url": "//s7d9.scene7.com/is/image/BedBathandBeyond/BBD_30230_03_Logged_Out_Banner_976X248_V2_FA_R1%5B1%5D?$other$",
            },
            "label": "All",
          },
          Object {
            "collections": Array [
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_organizationalcloset.jpg",
                "label": "Quick Picks headline BedBathUS",
                "quickPickID": "10031",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
            ],
            "image": Object {
              "alt": "",
              "url": "",
            },
            "label": "Bakeware",
          },
          Object {
            "collections": Array [
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_beddiingbasics.jpg",
                "label": "Test Quick_Picks",
                "quickPickID": "10030",
                "url": "quickpicks/appliance/alyssa-d/pub3900073",
              },
              Object {
                "image": "https://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/newborn_essentials.jpg",
                "label": "newborn essentials",
                "quickPickID": "10742",
              },
            ],
            "image": Object {
              "alt": "",
              "url": "//www.mgmgrand.com/content/dam/MGM/mgm-grand/dining/in-room-dining/food-and-drink/mgm-grand-restraurant-in-room-dining-signature-dish-dinner-steak-lobster-@2x.jpg",
            },
            "label": "BabyAccesories",
          },
        ],
        "error": false,
        "hero": Array [
          Object {
            "description": Object {
              "displayName": "Hero module 1",
            },
            "image": Object {
              "alt": "Test",
              "url": "internal://s7d9.scene7.com/is/image/BedBathandBeyond/images/registry/kickstarters/topconsultants/bedbath_tc_bakingbasics2.jpg",
            },
            "title": Object {
              "displayName": "Hero module 1",
            },
          },
        ],
        "registryTypes": Object {
          "registryTypes": Array [
            Object {
              "id": "200006",
              "label": "Wedding Registry Quick Picks",
              "url": "/store/registry/kickstarters/wedding",
            },
            Object {
              "id": "200009",
              "label": "Baby Registry Quick Picks",
              "url": "/store/registry/kickstarters/baby",
            },
          ],
        },
        "selectedCategory": "all",
        "selectedRegistryType": "123456789",
      },
      "type": "BBB/Registry/QuickPicksLanding/Landing/SET_QUICK_PICKS",
    },
    "channel": null,
  },
}
```

