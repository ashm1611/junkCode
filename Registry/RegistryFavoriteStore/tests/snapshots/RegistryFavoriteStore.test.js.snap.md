# `app/containers/Pages/Registry/RegistryFavoriteStore/tests/RegistryFavoriteStore.test.js`

#### `should render correctly without any props`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <FavouriteStoreInfo
    onChangeStore={[Function]}
    onSearchStore={[Function]}
    showFavStoreInputErr={false}
    storeId={null}
  />
</ErrorBoundary>
```

#### `should render correctly for profile favorite store`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <FavouriteStoreInfo
    clearProfileStoreData={[Function]}
    fetchStore={[Function]}
    onChangeStore={[Function]}
    onSearchStore={[Function]}
    onStoreUpdate={[Function]}
    profileFavoriteStore={
      Object {
        "userSiteItems": Object {
          "bpMembershipId": null,
          "directMailOptin": null,
          "emailId": null,
          "emailoptin": 0,
          "errorCode": null,
          "favouriteStoreId": "1194",
          "ipaddress": null,
          "lastModifiedDate": Object {
            "time": "04/28/2018 19:55:09",
          },
          "memberId": null,
          "newOrderId": null,
          "orderProcessedDate": null,
          "renewalDate": null,
          "repositoryId": "DC2bbUSA1823246",
          "site": null,
          "siteId": "BedBathUS",
          "status": null,
          "timeStamp": null,
          "token": null,
        },
      }
    }
    showFavStoreInputErr={false}
    storeDetails={Object {}}
    storeInfo={
      Object {
        "BW": 0,
        "FRI_CLOSE": 2200,
        "FRI_OPEN": 900,
        "FTG": 0,
        "GeoCodeQuality": "",
        "HBC": 0,
        "HD": 1,
        "Lat": 40.7154146,
        "Lng": -74.0113388,
        "MON_CLOSE": 2200,
        "MON_OPEN": 900,
        "N": "TriBeca",
        "Phone": "(212) 233-8450",
        "RecordId": undefined,
        "SAT_CLOSE": 2200,
        "SAT_OPEN": 900,
        "SPECIAL_MSG": "",
        "STUDIO": 0,
        "SUN_CLOSE": 2100,
        "SUN_OPEN": 900,
        "T": "3100",
        "THURS_CLOSE": 2200,
        "THURS_OPEN": 900,
        "TUES_CLOSE": 2200,
        "TUES_OPEN": 900,
        "VERDI": 0,
        "WED_CLOSE": 2200,
        "WED_OPEN": 900,
        "WM": 0,
        "address": "270 Greenwich St btw Warren & Murray St",
        "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
        "city": "New York",
        "city_phonetic": "",
        "country": "USA",
        "display_online": "Y",
        "facade_store_type": 10,
        "hiring_ind": "N",
        "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
        "latlong_src": 4,
        "lc": "0",
        "mqap_geography": Object {
          "latLng": Object {
            "lat": 40.715415,
            "lng": -74.011339,
          },
        },
        "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
        "mqap_quality": "U1XXX",
        "name_phonetic": "",
        "postal": "10007",
        "provinceName": "New York",
        "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
        "row_xng_dt": "04/04/2018",
        "row_xng_usr": "STOREOPS",
        "specialty_shops_cd": 4,
        "state": "NY",
        "store_type": 10,
      }
    }
    storeListById={
      Array [
        Object {
          "BW": 0,
          "FRI_CLOSE": 2200,
          "FRI_OPEN": 900,
          "FTG": 0,
          "GeoCodeQuality": "",
          "HBC": 0,
          "HD": 1,
          "Lat": 40.7154146,
          "Lng": -74.0113388,
          "MON_CLOSE": 2200,
          "MON_OPEN": 900,
          "N": "TriBeca",
          "Phone": "(212) 233-8450",
          "RecordId": "1194",
          "SAT_CLOSE": 2200,
          "SAT_OPEN": 900,
          "SPECIAL_MSG": "",
          "STUDIO": 0,
          "SUN_CLOSE": 2100,
          "SUN_OPEN": 900,
          "T": "3100",
          "THURS_CLOSE": 2200,
          "THURS_OPEN": 900,
          "TUES_CLOSE": 2200,
          "TUES_OPEN": 900,
          "VERDI": 0,
          "WED_CLOSE": 2200,
          "WED_OPEN": 900,
          "WM": 0,
          "address": "270 Greenwich St btw Warren & Murray St",
          "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
          "city": "New York",
          "city_phonetic": "",
          "country": "USA",
          "display_online": "Y",
          "facade_store_type": 10,
          "hiring_ind": "N",
          "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
          "latlong_src": 4,
          "lc": "0",
          "mqap_geography": Object {
            "latLng": Object {
              "lat": 40.715415,
              "lng": -74.011339,
            },
          },
          "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
          "mqap_quality": "U1XXX",
          "name_phonetic": "",
          "postal": "10007",
          "provinceName": "New York",
          "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
          "row_xng_dt": "04/04/2018",
          "row_xng_usr": "STOREOPS",
          "specialty_shops_cd": 4,
          "state": "NY",
          "store_type": 10,
        },
      ]
    }
  />
</ErrorBoundary>
```

#### `should render correctly for profile favorite store address`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <FavouriteStoreInfo
    clearStoreData={[Function]}
    onChangeStore={[Function]}
    onSearchStore={[Function]}
    onStoreUpdate={[Function]}
    profileAddress="Fulton Street, New York, NY, 12345"
    searchStore={[Function]}
    showFavStoreInputErr={false}
    siteId="BuyBuyBaby"
    storeDetails={Object {}}
    storeId="1194"
    storeInfo={
      Object {
        "BW": 0,
        "FRI_CLOSE": 2200,
        "FRI_OPEN": 900,
        "FTG": 0,
        "GeoCodeQuality": "",
        "HBC": 0,
        "HD": 1,
        "Lat": 40.7154146,
        "Lng": -74.0113388,
        "MON_CLOSE": 2200,
        "MON_OPEN": 900,
        "N": "TriBeca",
        "Phone": "(212) 233-8450",
        "RecordId": "1194",
        "SAT_CLOSE": 2200,
        "SAT_OPEN": 900,
        "SPECIAL_MSG": "",
        "STUDIO": 0,
        "SUN_CLOSE": 2100,
        "SUN_OPEN": 900,
        "T": "3100",
        "THURS_CLOSE": 2200,
        "THURS_OPEN": 900,
        "TUES_CLOSE": 2200,
        "TUES_OPEN": 900,
        "VERDI": 0,
        "WED_CLOSE": 2200,
        "WED_OPEN": 900,
        "WM": 0,
        "address": "270 Greenwich St btw Warren & Murray St",
        "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
        "city": "New York",
        "city_phonetic": "",
        "country": "USA",
        "display_online": "Y",
        "facade_store_type": 10,
        "hiring_ind": "N",
        "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
        "latlong_src": 4,
        "lc": "0",
        "mqap_geography": Object {
          "latLng": Object {
            "lat": 40.715415,
            "lng": -74.011339,
          },
        },
        "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
        "mqap_quality": "U1XXX",
        "name_phonetic": "",
        "postal": "10007",
        "provinceName": "New York",
        "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
        "row_xng_dt": "04/04/2018",
        "row_xng_usr": "STOREOPS",
        "specialty_shops_cd": 4,
        "state": "NY",
        "store_type": 10,
      }
    }
    storeListByAddress={
      Array [
        Object {
          "BW": 0,
          "FRI_CLOSE": 2200,
          "FRI_OPEN": 900,
          "FTG": 0,
          "GeoCodeQuality": "",
          "HBC": 0,
          "HD": 1,
          "Lat": 40.7154146,
          "Lng": -74.0113388,
          "MON_CLOSE": 2200,
          "MON_OPEN": 900,
          "N": "TriBeca",
          "Phone": "(212) 233-8450",
          "RecordId": "1194",
          "SAT_CLOSE": 2200,
          "SAT_OPEN": 900,
          "SPECIAL_MSG": "",
          "STUDIO": 0,
          "SUN_CLOSE": 2100,
          "SUN_OPEN": 900,
          "T": "3100",
          "THURS_CLOSE": 2200,
          "THURS_OPEN": 900,
          "TUES_CLOSE": 2200,
          "TUES_OPEN": 900,
          "VERDI": 0,
          "WED_CLOSE": 2200,
          "WED_OPEN": 900,
          "WM": 0,
          "address": "270 Greenwich St btw Warren & Murray St",
          "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
          "city": "New York",
          "city_phonetic": "",
          "country": "USA",
          "display_online": "Y",
          "facade_store_type": 10,
          "hiring_ind": "N",
          "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
          "latlong_src": 4,
          "lc": "0",
          "mqap_geography": Object {
            "latLng": Object {
              "lat": 40.715415,
              "lng": -74.011339,
            },
          },
          "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
          "mqap_quality": "U1XXX",
          "name_phonetic": "",
          "postal": "10007",
          "provinceName": "New York",
          "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
          "row_xng_dt": "04/04/2018",
          "row_xng_usr": "STOREOPS",
          "specialty_shops_cd": 4,
          "state": "NY",
          "store_type": 10,
        },
      ]
    }
    storesConfig={
      Array [
        Object {
          "color": "003BDE",
          "iconCircleClass": "darkBlue",
          "key": "store-10",
          "label": "Bed Bath & Beyond",
          "selected": true,
          "siteId": "BedBathUS",
          "storeDomain": "https://stores.bedbathandbeyond.com",
        },
        Object {
          "color": "2ABBF3",
          "iconCircleClass": "lightBlue",
          "key": "store-40",
          "label": "buy buy Baby",
          "selected": false,
          "siteId": "BuyBuyBaby",
          "storeDomain": "https://stores.buybuybaby.com",
        },
        Object {
          "color": "E20177",
          "iconCircleClass": "pink",
          "key": "store-30",
          "label": "Harmon",
          "selected": false,
          "siteId": null,
          "storeDomain": "",
        },
      ]
    }
  />
</ErrorBoundary>
```

#### `should render correctly on address change`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <FavouriteStoreInfo
    clearStoreData={[Function]}
    currentAddress="Fulton Street, New York, NY, 12345"
    onChangeStore={[Function]}
    onSearchStore={[Function]}
    onStoreUpdate={[Function]}
    searchStore={[Function]}
    showFavStoreInputErr={false}
    siteId="BuyBuyBaby"
    storeDetails={Object {}}
    storeId="1194"
    storeInfo={
      Object {
        "BW": 0,
        "FRI_CLOSE": 2200,
        "FRI_OPEN": 900,
        "FTG": 0,
        "GeoCodeQuality": "",
        "HBC": 0,
        "HD": 1,
        "Lat": 40.7154146,
        "Lng": -74.0113388,
        "MON_CLOSE": 2200,
        "MON_OPEN": 900,
        "N": "TriBeca",
        "Phone": "(212) 233-8450",
        "RecordId": "1194",
        "SAT_CLOSE": 2200,
        "SAT_OPEN": 900,
        "SPECIAL_MSG": "",
        "STUDIO": 0,
        "SUN_CLOSE": 2100,
        "SUN_OPEN": 900,
        "T": "3100",
        "THURS_CLOSE": 2200,
        "THURS_OPEN": 900,
        "TUES_CLOSE": 2200,
        "TUES_OPEN": 900,
        "VERDI": 0,
        "WED_CLOSE": 2200,
        "WED_OPEN": 900,
        "WM": 0,
        "address": "270 Greenwich St btw Warren & Murray St",
        "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
        "city": "New York",
        "city_phonetic": "",
        "country": "USA",
        "display_online": "Y",
        "facade_store_type": 10,
        "hiring_ind": "N",
        "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
        "latlong_src": 4,
        "lc": "0",
        "mqap_geography": Object {
          "latLng": Object {
            "lat": 40.715415,
            "lng": -74.011339,
          },
        },
        "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
        "mqap_quality": "U1XXX",
        "name_phonetic": "",
        "postal": "10007",
        "provinceName": "New York",
        "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
        "row_xng_dt": "04/04/2018",
        "row_xng_usr": "STOREOPS",
        "specialty_shops_cd": 4,
        "state": "NY",
        "store_type": 10,
      }
    }
    storeListByAddress={
      Array [
        Object {
          "BW": 0,
          "FRI_CLOSE": 2200,
          "FRI_OPEN": 900,
          "FTG": 0,
          "GeoCodeQuality": "",
          "HBC": 0,
          "HD": 1,
          "Lat": 40.7154146,
          "Lng": -74.0113388,
          "MON_CLOSE": 2200,
          "MON_OPEN": 900,
          "N": "TriBeca",
          "Phone": "(212) 233-8450",
          "RecordId": "1194",
          "SAT_CLOSE": 2200,
          "SAT_OPEN": 900,
          "SPECIAL_MSG": "",
          "STUDIO": 0,
          "SUN_CLOSE": 2100,
          "SUN_OPEN": 900,
          "T": "3100",
          "THURS_CLOSE": 2200,
          "THURS_OPEN": 900,
          "TUES_CLOSE": 2200,
          "TUES_OPEN": 900,
          "VERDI": 0,
          "WED_CLOSE": 2200,
          "WED_OPEN": 900,
          "WM": 0,
          "address": "270 Greenwich St btw Warren & Murray St",
          "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
          "city": "New York",
          "city_phonetic": "",
          "country": "USA",
          "display_online": "Y",
          "facade_store_type": 10,
          "hiring_ind": "N",
          "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
          "latlong_src": 4,
          "lc": "0",
          "mqap_geography": Object {
            "latLng": Object {
              "lat": 40.715415,
              "lng": -74.011339,
            },
          },
          "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
          "mqap_quality": "U1XXX",
          "name_phonetic": "",
          "postal": "10007",
          "provinceName": "New York",
          "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
          "row_xng_dt": "04/04/2018",
          "row_xng_usr": "STOREOPS",
          "specialty_shops_cd": 4,
          "state": "NY",
          "store_type": 10,
        },
      ]
    }
    storesConfig={
      Array [
        Object {
          "color": "003BDE",
          "iconCircleClass": "darkBlue",
          "key": "store-10",
          "label": "Bed Bath & Beyond",
          "selected": true,
          "siteId": "BedBathUS",
          "storeDomain": "https://stores.bedbathandbeyond.com",
        },
        Object {
          "color": "2ABBF3",
          "iconCircleClass": "lightBlue",
          "key": "store-40",
          "label": "buy buy Baby",
          "selected": false,
          "siteId": "BuyBuyBaby",
          "storeDomain": "https://stores.buybuybaby.com",
        },
        Object {
          "color": "E20177",
          "iconCircleClass": "pink",
          "key": "store-30",
          "label": "Harmon",
          "selected": false,
          "siteId": null,
          "storeDomain": "",
        },
      ]
    }
  />
</ErrorBoundary>
```

#### `should render correctly on user store change`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <FavouriteStoreInfo
    clearProfileStoreData={[Function]}
    fetchStore={[Function]}
    onChangeStore={[Function]}
    onSearchStore={[Function]}
    onStoreUpdate={[Function]}
    showFavStoreInputErr={false}
    siteId="BuyBuyBaby"
    storeInfo={
      Object {
        "BW": 0,
        "FRI_CLOSE": 2200,
        "FRI_OPEN": 900,
        "FTG": 0,
        "GeoCodeQuality": "",
        "HBC": 0,
        "HD": 1,
        "Lat": 40.7154146,
        "Lng": -74.0113388,
        "MON_CLOSE": 2200,
        "MON_OPEN": 900,
        "N": "TriBeca",
        "Phone": "(212) 233-8450",
        "RecordId": undefined,
        "SAT_CLOSE": 2200,
        "SAT_OPEN": 900,
        "SPECIAL_MSG": "",
        "STUDIO": 0,
        "SUN_CLOSE": 2100,
        "SUN_OPEN": 900,
        "T": "3100",
        "THURS_CLOSE": 2200,
        "THURS_OPEN": 900,
        "TUES_CLOSE": 2200,
        "TUES_OPEN": 900,
        "VERDI": 0,
        "WED_CLOSE": 2200,
        "WED_OPEN": 900,
        "WM": 0,
        "address": "270 Greenwich St btw Warren & Murray St",
        "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
        "city": "New York",
        "city_phonetic": "",
        "country": "USA",
        "display_online": "Y",
        "facade_store_type": 10,
        "hiring_ind": "N",
        "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
        "latlong_src": 4,
        "lc": "0",
        "mqap_geography": Object {
          "latLng": Object {
            "lat": 40.715415,
            "lng": -74.011339,
          },
        },
        "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
        "mqap_quality": "U1XXX",
        "name_phonetic": "",
        "postal": "10007",
        "provinceName": "New York",
        "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
        "row_xng_dt": "04/04/2018",
        "row_xng_usr": "STOREOPS",
        "specialty_shops_cd": 4,
        "state": "NY",
        "store_type": 10,
      }
    }
    storeListById={
      Array [
        Object {
          "BW": 0,
          "FRI_CLOSE": 2200,
          "FRI_OPEN": 900,
          "FTG": 0,
          "GeoCodeQuality": "",
          "HBC": 0,
          "HD": 1,
          "Lat": 40.7154146,
          "Lng": -74.0113388,
          "MON_CLOSE": 2200,
          "MON_OPEN": 900,
          "N": "TriBeca",
          "Phone": "(212) 233-8450",
          "RecordId": "1194",
          "SAT_CLOSE": 2200,
          "SAT_OPEN": 900,
          "SPECIAL_MSG": "",
          "STUDIO": 0,
          "SUN_CLOSE": 2100,
          "SUN_OPEN": 900,
          "T": "3100",
          "THURS_CLOSE": 2200,
          "THURS_OPEN": 900,
          "TUES_CLOSE": 2200,
          "TUES_OPEN": 900,
          "VERDI": 0,
          "WED_CLOSE": 2200,
          "WED_OPEN": 900,
          "WM": 0,
          "address": "270 Greenwich St btw Warren & Murray St",
          "address_phonetic": "270 Greenwich Street between Warren and Murray Street",
          "city": "New York",
          "city_phonetic": "",
          "country": "USA",
          "display_online": "Y",
          "facade_store_type": 10,
          "hiring_ind": "N",
          "hours": "Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm",
          "latlong_src": 4,
          "lc": "0",
          "mqap_geography": Object {
            "latLng": Object {
              "lat": 40.715415,
              "lng": -74.011339,
            },
          },
          "mqap_id": "ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2",
          "mqap_quality": "U1XXX",
          "name_phonetic": "",
          "postal": "10007",
          "provinceName": "New York",
          "rollingStoreHours": "{ \"rolling_store_hours\": [ { \"day\": \"Sun\", \"date\": \"Apr 29\", \"hours\": \"9:00 AM - 9:00 PM\", \"msg\": \"\" }, { \"day\": \"Mon\", \"date\": \"Apr 30\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Tue\", \"date\": \"May 01\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Wed\", \"date\": \"May 02\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Thu\", \"date\": \"May 03\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Fri\", \"date\": \"May 04\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\" }, { \"day\": \"Sat\", \"date\": \"May 05\", \"hours\": \"9:00 AM - 10:00 PM\", \"msg\": \"\"} ] }",
          "row_xng_dt": "04/04/2018",
          "row_xng_usr": "STOREOPS",
          "specialty_shops_cd": 4,
          "state": "NY",
          "store_type": 10,
        },
      ]
    }
    storesConfig={
      Array [
        Object {
          "color": "003BDE",
          "iconCircleClass": "darkBlue",
          "key": "store-10",
          "label": "Bed Bath & Beyond",
          "selected": true,
          "siteId": "BedBathUS",
          "storeDomain": "https://stores.bedbathandbeyond.com",
        },
        Object {
          "color": "2ABBF3",
          "iconCircleClass": "lightBlue",
          "key": "store-40",
          "label": "buy buy Baby",
          "selected": false,
          "siteId": "BuyBuyBaby",
          "storeDomain": "https://stores.buybuybaby.com",
        },
        Object {
          "color": "E20177",
          "iconCircleClass": "pink",
          "key": "store-30",
          "label": "Harmon",
          "selected": false,
          "siteId": null,
          "storeDomain": "",
        },
      ]
    }
    userPickedStoreId="1194"
  />
</ErrorBoundary>
```

