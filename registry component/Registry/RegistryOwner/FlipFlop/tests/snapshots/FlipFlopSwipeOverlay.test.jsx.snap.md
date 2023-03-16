# `app/components/Pages/Registry/RegistryOwner/FlipFlop/tests/FlipFlopSwipeOverlay.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="flipFLopCSSDisplayNone"
    style={
      Object {
        "opacity": 0,
      }
    }
  >
    <div
      className="flipFlopSwipeTile pt03"
    >
      <Icon
        className="flipFlopRight pt03"
        focusable="false"
        height={200}
        width={200}
      />
      <div
        className="flipFlopSwipeTileMsg pt3"
      >
        flipFlopNotAccesibleMsg
      </div>
    </div>
  </div>
</ErrorBoundary>
```

#### `should render correctly when props got changed`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="flipFlopChoice absolute"
    style={
      Object {
        "opacity": 10,
      }
    }
  >
    <div
      className="flipFlopSwipeTile pt03"
    >
      <Icon
        className="flipFlopRight pt03"
        focusable="false"
        height={200}
        width={200}
      />
      <div
        className="flipFlopSwipeTileMsg pt3"
      >
        flipFlopNotAccesibleMsg
      </div>
    </div>
  </div>
</ErrorBoundary>
```

