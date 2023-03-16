# `app/containers/Pages/Registry/QuickPicks/Collection/tests/sagas.test.js`

#### `should watch sagas`

```
Object {
  "@@redux-saga/IO": true,
  "FORK": Object {
    "args": Array [
      "BBB/Registry/QuickPicksLanding/Collection/FETCH_QUICK_PICKS_COLLECTION",
      [Function],
    ],
    "context": null,
    "fn": [Function],
  },
}
```

```
Object {
  "@@redux-saga/IO": true,
  "FORK": Object {
    "args": Array [
      "BBB/Registry/QuickPicksLanding/Collection/ADD_ITEM_ACTIVE_REGISTRY",
      [Function],
    ],
    "context": null,
    "fn": [Function],
  },
}
```

```
Object {
  "@@redux-saga/IO": true,
  "FORK": Object {
    "args": Array [
      "BBB/Registry/QuickPicksLanding/Collection/ADD_SELECTED_ITEMS_TO_REGISTRY",
      [Function],
    ],
    "context": null,
    "fn": [Function],
  },
}
```

```
Object {
  "@@redux-saga/IO": true,
  "FORK": Object {
    "args": Array [
      "BBB/Registry/QuickPicksLanding/Collection/DISPATCH_TOAST_NOTIFICATION",
      [Function],
    ],
    "context": null,
    "fn": [Function],
  },
}
```

#### `should getCollectionById from endpoint`

```
Object {
  "errorMessages": undefined,
  "responseData": Object {},
  "serviceStatus": undefined,
}
```

#### `should callAddItemsToGiftRegistryApi from endpoint`

```
Object {
  "errorMessages": undefined,
  "responseData": Object {},
  "serviceStatus": undefined,
}
```

#### `should fetchQuickPicksCollection Error from API`

```
undefined
```

#### `should fetchQuickPicksCollection with error thrown`

```
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "error": Object {
        "error": Object {
          "body": [Error: some error],
        },
      },
      "type": "BBB/Registry/QuickPicksLanding/Collection/FETCH_QUICK_PICKS_COLLECTION_ERROR",
    },
    "channel": null,
  },
}
```

#### `should handleDisplayToastNotification with configured duration`

```
Object {
  "@@redux-saga/IO": true,
  "CALL": Object {
    "args": Array [
      5000,
    ],
    "context": null,
    "fn": [Function],
  },
}
```

#### `should do nothing is user is logged out`

```
undefined
```

#### `should add selected item without price`

```
Object {
  "@@redux-saga/IO": true,
  "SELECT": Object {
    "args": Array [],
    "selector": [Function],
  },
}
```

#### `should addSelectedItemsToRegistry with error thrown`

```
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "error": Object {
        "body": [Error: some error],
      },
      "type": "BBB/Registry/QuickPicksLanding/Collection/FETCH_QUICK_PICKS_COLLECTION_ERROR",
    },
    "channel": null,
  },
}
```

#### `should addItemToActiveRegistry with error thrown`

```
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "error": Object {
        "body": [Error: some error],
      },
      "type": "BBB/Registry/QuickPicksLanding/Collection/FETCH_QUICK_PICKS_COLLECTION_ERROR",
    },
    "channel": null,
  },
}
```

