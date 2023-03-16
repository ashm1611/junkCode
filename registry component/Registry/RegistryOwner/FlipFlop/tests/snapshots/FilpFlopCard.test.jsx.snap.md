# `app/components/Pages/Registry/RegistryOwner/FlipFlop/tests/FilpFlopCard.test.jsx`

#### `should render correctly with componentDidMount`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="mt4 flipFlopCard absolute"
    data-locator="hit-miss-real-block"
    style={
      Object {
        "0": "m",
        "1": "s",
        "10": "m",
        "11": ":",
        "12": " ",
        "13": "t",
        "14": "r",
        "15": "a",
        "16": "n",
        "17": "s",
        "18": "l",
        "19": "a",
        "2": "T",
        "20": "t",
        "21": "e",
        "22": "(",
        "23": "5",
        "24": "0",
        "25": "p",
        "26": "x",
        "27": ",",
        "28": " ",
        "29": "1",
        "3": "r",
        "30": "0",
        "31": "0",
        "32": "p",
        "33": "x",
        "34": ")",
        "4": "a",
        "5": "n",
        "6": "s",
        "7": "f",
        "8": "o",
        "9": "r",
        "WebkitTransform": "translate3d(0px,0px,0px)",
        "msTransform": "translate3d(0px,0px,0px)",
        "transform": "translate3d(0px,0px,0px)",
        "zIndex": 10001,
      }
    }
  >
    <div
      className="paper relative"
    >
      <FlipFlopTile
        fireTealiumAction={[Function]}
        price={
          Object {
            "highPriceValueMX": 827,
            "low": "$6.99 - $9.99 Each",
            "lowPriceValueMX": 597,
            "lowValue": 21.99,
            "normal": "FULL $21.99 - KING $43.99",
            "normalValue": 43.99,
            "priceLabelCodeMX": "WAS",
            "priceRangeDescription": "FULL $%L - KING $%H",
            "pricingLabelCode": "WAS",
            "wasLowPriceMX": "269.0",
          }
        }
        prodId="22222222"
        rating={0.8}
        reviews={60}
        scene7imageID="56518543233533p"
        title="A wonderful day"
        url="/product/b-smith-reg-multi-purpose-server-with-tray/1043233533"
      />
    </div>
    <HyperLink
      className="skipLink"
      onClick={[Function]}
      variation=""
    >
      No thanks
    </HyperLink>
    <HyperLink
      className="skipLink"
      onClick={[Function]}
      variation=""
    >
      I want it!
    </HyperLink>
    <FlipFLopSwipeOverlay
      height={150}
      iconType="flipFlopGift"
      labelMsg="Added to Registry"
      swipeClass="flipFlopRightSwipe"
      width={150}
    />
    <FlipFLopSwipeOverlay
      height={150}
      iconType="flipFlopWasteBin"
      labelMsg="Skipped"
      opacity={NaN}
      swipeClass="flipFlopLeftSwipe"
      width={110}
    />
  </div>
</ErrorBoundary>
```

#### `should render Tutorial for the firsttime user`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="flipFLopTutorial absolute"
    data-locator="hit-miss-default-block"
    id="flipFlopTutorial"
  >
    <Button
      aria-label="Close Tutorial"
      className="closeButton"
      data-locator="hit-miss-default-block-cross-icon"
      iconProps={
        Object {
          "height": "16px",
          "type": "CloseIcon",
          "width": "16px",
        }
      }
      onClick="closeBanner"
      theme="primary"
      variation="skipLink"
    />
    <div
      className="TinderImage"
      dangerouslySetInnerHTML={
        Object {
          "__html": undefined,
        }
      }
    />
    <div
      className="flipFLopLabel"
    >
      A quick and easy way to add things to your registry!
    </div>
  </div>
</ErrorBoundary>
```

