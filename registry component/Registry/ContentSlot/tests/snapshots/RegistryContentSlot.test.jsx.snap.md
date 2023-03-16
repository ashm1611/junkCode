# `app/components/Pages/Registry/ContentSlot/tests/RegistryContentSlot.test.jsx`

#### `should render correctly`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-guest-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/presents2xDayN?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regBabyTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptionsbaby"
      tabIndex="0"
    >
      Need More Options?
    </div>
    <div
      className="exploreCommon exploreBaby pl15 pr15"
      tabIndex="0"
    >
      A gift card is always the perfect gift.
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="babyCTA"
          data-locator="registry-guest-content-slot-link"
          href="/store/static/GiftCardHomePage?registryId=&isRegistry=true"
          theme="secondaryTransparent"
        >
          Shop Now
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should call giftGiverLabel when siteId is BuyBuyBaby`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-guest-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/presents2xDayN?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regBabyTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptionsbaby"
      tabIndex="0"
    >
      Need More Options?
    </div>
    <div
      className="exploreCommon exploreBaby pl15 pr15"
      tabIndex="0"
    >
      A gift card is always the perfect gift.
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="babyCTA"
          data-locator="registry-guest-content-slot-link"
          href="/store/static/GiftCardHomePage?registryId=&isRegistry=true"
          theme="secondaryTransparent"
        >
          Shop Now
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should call giftGiverLabel when siteId is BedBathCanada`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-guest-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/presents2xDayN?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptions p1 pb2 pt2"
      tabIndex="0"
    >
      Need More Options?
    </div>
    <div
      className="exploreCommon explore pr2 pl2"
      tabIndex="0"
    >
      A gift card is always the perfect gift.
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="showAllCTA"
          data-locator="registry-guest-content-slot-link"
          href="/store/static/GiftCardHomePage?registryId=&isRegistry=true"
          theme="secondaryTransparent"
        >
          Shop Now
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should call giftGiverLabel when siteId is BedBathCanada When eventType is not baby`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-guest-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/Wedding%20Icons%5FMore%20Gifts%20BG?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptions p1 pb2 pt2"
      tabIndex="0"
    >
      Need More Options?
    </div>
    <div
      className="exploreCommon explore pr2 pl2"
      tabIndex="0"
    >
      A gift card is always the perfect gift.
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="showAllCTA"
          data-locator="registry-guest-content-slot-link"
          href="/store/static/GiftCardHomePage?registryId=&isRegistry=true"
          theme="secondaryTransparent"
        >
          Shop Now
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `giftgiver is false ,when siteId is BedBathCanada`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-owner-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/Wedding%20Icons%5FMore%20Gifts%20BG?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptions p1 pb2 pt2"
      tabIndex="0"
    >
      Let's Get Adding
    </div>
    <div
      className="exploreCommon explore pr2 pl2"
      tabIndex="0"
    >
      We have recommendations for you!
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="showAllCTA"
          data-locator="registry-owner-content-slot-link"
          href="/store/category/gifts/wedding-registry-favorites/25434/?icid=CA_fly_registryloggedout_static_registry_favourites"
          theme="secondaryTransparent"
        >
          Start Adding
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should call GetBabyRegistryUrl when siteId is BuyBuyBaby`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-owner-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/presents2xDayN?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regBabyTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptionsbaby"
      tabIndex="0"
    >
      Let's Get Adding
    </div>
    <div
      className="exploreCommon exploreBaby pl15 pr15"
      tabIndex="0"
    >
      We have recommendations for you!
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="babyCTA"
          data-locator="registry-owner-content-slot-link"
          href="/store/category/gifts-more/baby-registry-favorites/32689"
          theme="secondaryTransparent"
        >
          Start Adding
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should call GetBabyRegistryUrl when siteId is BedBathCanada`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-owner-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/presents2xDayN?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptions p1 pb2 pt2"
      tabIndex="0"
    >
      Let's Get Adding
    </div>
    <div
      className="exploreCommon explore pr2 pl2"
      tabIndex="0"
    >
      We have recommendations for you!
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="showAllCTA"
          data-locator="registry-owner-content-slot-link"
          href="/store/category/gifts/baby-registry-favorites/25433/?icid=CA_fly_registryloggedout_static_registry_favourites"
          theme="secondaryTransparent"
        >
          Start Adding
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should call giftGiverLabel when siteId is BedBathCanada , when giftgiver is false`

```
<PureComponent(GridX)
  className="article"
  data-locator="registry-owner-content-slot-complete-div"
>
  <PureComponent(Cell)
    className="imageContainer small-3 large-12 medium-12 common"
  >
    <Img
      alt="gift Image"
      className="icon"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/Wedding%20Icons%5FMore%20Gifts%20BG?$content$"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-9 large-12 medium-12 common"
  >
    <div
      className="regTitle"
      tabIndex="0"
    >
      REGISTRY
    </div>
    <div
      className="NeedMoreOptions p1 pb2 pt2"
      tabIndex="0"
    >
      Let's Get Adding
    </div>
    <div
      className="exploreCommon explore pr2 pl2"
      tabIndex="0"
    >
      We have recommendations for you!
    </div>
    <div
      className="buttonContainer"
    >
      <PureComponent(Cell)>
        <Button
          className="showAllCTA"
          data-locator="registry-owner-content-slot-link"
          href="/store/category/gifts/wedding-registry-favorites/25434/?icid=CA_fly_registryloggedout_static_registry_favourites"
          theme="secondaryTransparent"
        >
          Start Adding
        </Button>
      </PureComponent(Cell)>
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

