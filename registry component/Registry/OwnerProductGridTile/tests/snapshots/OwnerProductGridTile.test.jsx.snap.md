# `app/components/Pages/Registry/OwnerProductGridTile/tests/OwnerProductGridTile.test.jsx`

#### `should render regular item properly for buybuybaby site and mobile screen`

```
<Fragment>
  <Connect(wrapper)
    minWidth={640}
  >
    <PrimaryLink
      className="base hoverTile RLVOwnerTile"
      href="#"
      onClick={[Function]}
      type="noUnderline"
    >
      <article
        className="wrapper"
        data-sku={69934769}
      >
        <div
          className="relative imageMainContainer"
          data-locator="OwnerViewItemTile"
        >
          <div
            className="absolute topButtonSection"
          >
            <div
              className="ellipsescontainer"
              data-locator="ellipseslayout"
              onMouseEnter={[Function]}
              onMouseLeave={[Function]}
              role="button"
              tabIndex="0"
            >
              <Button
                aria-label="Edit Product details"
                className="relative fol pb1 ellipsesicon"
                onClick={[Function]}
                theme=""
                variation=""
              >
                <Icon
                  className=""
                  focusable="false"
                  height="6px"
                  type="ellipsis"
                  width="21px"
                />
              </Button>
            </div>
            <div
              className="favoriteBanner markedAsFav markedAsFavBaby"
            >
              <span
                className="absolute"
                role="button"
                tabIndex="0"
              >
                <Button
                  aria-label="favorite"
                  className="favButton fol"
                  data-locator="registry-createdregistry-landingpage-product-fav"
                  iconProps={
                    Object {
                      "className": "favIcon",
                      "height": "18",
                      "type": "star-double",
                      "width": "18",
                    }
                  }
                  marked="true"
                  onClick={[Function]}
                  theme="link"
                  variation="noPadding"
                />
              </span>
            </div>
          </div>
          <div
            className="imageContainer mb2"
          >
            <PrimaryLink
              className="imgWrapper mobWasPrice fol"
              data-locator="registry-createdregistry-landingpage-product-image"
              disabledLink={false}
              href="undefinedundefined?skuId=111&registryId=undefined"
              onClick={[Function]}
            >
              <LazyLoad
                onInViewPortChange={[Function]}
                placeholder={
                  <img
                    alt=""
                    src="/static/assets/images/product-image-placeholder.png"
                  />
                }
                shouldCallbackonInit={false}
                threshold={1500}
                useDebounce={false}
                useEvent={false}
                waitValue={80}
              >
                <img
                  alt=""
                  className="fol"
                />
              </LazyLoad>
            </PrimaryLink>
          </div>
        </div>
        <div
          className="mb1"
          data-locator="itemDetails"
        >
          <Price
            dataLocator="registry-createdregistry-landingpage-product-price"
            displayDiscountedPrice={false}
            mobWasPrice="mobWasPrice"
            personalizationType="AB"
            priceColor="babyFontColor"
            priceStyle="priceStyleCashFund"
          />
          <header
            className="mt1"
            data-locator="registry-createdregistry-landingpage-product-title"
            title=""
          >
            <PrimaryLink
              className="mobFont titleTiles"
              href="#"
              type="noUnderline"
            >
              <span
                dangerouslySetInnerHTML={
                  Object {
                    "__html": "",
                  }
                }
              />
            </PrimaryLink>
          </header>
          <div
            className="mb1 pr2 storeAvailabiliyMessage"
            data-locator="bopisDetails"
          >
            <span
              className="twoHoursMessage"
              data-locator="bopisAvailabilityLabel"
            >
              Available 
            </span>
            at , undefined
          </div>
        </div>
        <div
          className="productDetailSectionCHF"
        >
          <UniversalComponent
            commonStyle="commonAmount"
            description="Contribute any amount you'd like. Even if an item isn't fully funded, the registrant will still receive your contribution. And we'll let them know you contributed to their gift, so they can properly send thanks."
            heading="Cash Funds"
            iconProps={
              Object {
                "height": "12px",
                "width": "12px",
              }
            }
            isCashFund={true}
            showFulfilledAmount={true}
            title="Cash Funds"
            toolTipAlign="outerTooltipGG"
            toolTipOnMob="toolTipAlign"
          />
          <ContributionProgressBar
            commonStyle="commonAmount"
            isCashFund={true}
          />
        </div>
      </article>
    </PrimaryLink>
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={639}
  >
    <div
      className="p1 mobileBaseCashFund"
      data-sku={69934769}
    >
      <div
        className="relative"
      >
        <div
          className="favoriteBanner markedAsFav markedAsFavBaby"
        >
          <span
            className="absolute"
            role="button"
            tabIndex="0"
          >
            <Button
              aria-label="favorite"
              className="favButton fol"
              data-locator="registry-createdregistry-landingpage-product-fav"
              iconProps={
                Object {
                  "className": "favIcon",
                  "height": "18",
                  "type": "star-double",
                  "width": "18",
                }
              }
              marked="true"
              onClick={[Function]}
              theme="link"
              variation="noPadding"
            />
          </span>
        </div>
      </div>
      <div
        className="ellipsesallign"
      >
        <div
          className="ellipsescontainer"
          data-locator="ellipseslayout"
          onMouseEnter={[Function]}
          onMouseLeave={[Function]}
          role="button"
          tabIndex="0"
        >
          <Button
            aria-label="Edit Product details"
            className="relative fol pb1 ellipsesicon"
            onClick={[Function]}
            theme=""
            variation=""
          >
            <Icon
              className=""
              focusable="false"
              height="6px"
              type="ellipsis"
              width="21px"
            />
          </Button>
        </div>
      </div>
      <PrimaryLink
        className="contentBase"
        href="#"
        onClick={[Function]}
        type="noUnderline"
      >
        <div
          className="mobAlign"
          data-locator="OwnerViewItemTile"
        >
          <div
            className="imageBase"
          >
            <div
              className="imageContainer"
            >
              <PrimaryLink
                className="imgWrapper mobWasPrice fol"
                data-locator="registry-createdregistry-landingpage-product-image"
                disabledLink={false}
                href="undefinedundefined?skuId=111&registryId=undefined"
                onClick={[Function]}
              >
                <LazyLoad
                  onInViewPortChange={[Function]}
                  placeholder={
                    <img
                      alt=""
                      src="/static/assets/images/product-image-placeholder.png"
                    />
                  }
                  shouldCallbackonInit={false}
                  threshold={1500}
                  useDebounce={false}
                  useEvent={false}
                  waitValue={80}
                >
                  <img
                    alt=""
                    className="fol"
                  />
                </LazyLoad>
              </PrimaryLink>
            </div>
          </div>
          <div
            className="pl1 pr1 contentBase"
            data-locator="ProductDetailsSection"
          >
            <header
              className="mt1"
              data-locator="registry-createdregistry-landingpage-product-title"
              title=""
            >
              <PrimaryLink
                className="mobFont titleTiles"
                href="#"
                type="noUnderline"
              >
                <span
                  dangerouslySetInnerHTML={
                    Object {
                      "__html": "",
                    }
                  }
                />
              </PrimaryLink>
            </header>
            <Price
              dataLocator="registry-createdregistry-landingpage-product-price"
              displayDiscountedPrice={false}
              mobWasPrice="mobWasPrice"
              personalizationType="AB"
              priceColor="babyFontColor"
              priceStyle="priceStyleCashFund"
            />
            <div
              className="mb1 pr2 storeAvailabiliyMessage"
              data-locator="bopisDetails"
            >
              <span
                className="twoHoursMessage"
                data-locator="bopisAvailabilityLabel"
              >
                Available 
              </span>
              at , undefined
            </div>
            <UniversalComponent
              commonStyle="commonAmount"
              description="Contribute any amount you'd like. Even if an item isn't fully funded, the registrant will still receive your contribution. And we'll let them know you contributed to their gift, so they can properly send thanks."
              heading="Cash Funds"
              iconProps={
                Object {
                  "height": "12px",
                  "width": "12px",
                }
              }
              isCashFund={true}
              showFulfilledAmount={true}
              title="Cash Funds"
              toolTipAlign="outerTooltipGG"
              toolTipOnMob="toolTipAlign"
            />
            <ContributionProgressBar
              commonStyle="commonAmount"
              isCashFund={true}
            />
          </div>
        </div>
      </PrimaryLink>
    </div>
  </Connect(wrapper)>
</Fragment>
```

