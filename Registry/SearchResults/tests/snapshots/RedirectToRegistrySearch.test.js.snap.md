# `app/containers/Pages/Registry/SearchResults/tests/RedirectToRegistrySearch.test.js`

#### `should redirect to new url when old site registry search is fired on new site`

```
<Redirect
  push={false}
  to={
    Object {
      "pathname": "/store/giftregistry/registry-search-guest",
      "search": "q=irina%20lee%20lee&searchMode=byName&reset=true",
    }
  }
/>
```

#### `should redirect to new url when old site registry search is fired on new site only first name`

```
<Redirect
  push={false}
  to={
    Object {
      "pathname": "/store/giftregistry/registry-search-guest",
      "search": "q=irina&searchMode=byName&reset=true",
    }
  }
/>
```

#### `should redirect to new url when old site registry search with registryID is fired on new site`

```
<Redirect
  push={false}
  to={
    Object {
      "pathname": "/store/giftregistry/registry-search-guest",
      "search": "q=544606605&searchMode=byRegistryId&reset=true",
    }
  }
/>
```

#### `should not give error if hash is not provided`

```
<Redirect
  push={false}
  to={
    Object {
      "pathname": "/store/giftregistry/registry-search-guest",
      "search": undefined,
    }
  }
/>
```

#### `should not give error if hash provided but value is undefined when searchById`

```
<Redirect
  push={false}
  to={
    Object {
      "pathname": "/store/giftregistry/registry-search-guest",
      "search": undefined,
    }
  }
/>
```

#### `should not give error if hash provided but value is undefined when searchByName`

```
<Redirect
  push={false}
  to={
    Object {
      "pathname": "/store/giftregistry/registry-search-guest",
      "search": undefined,
    }
  }
/>
```

