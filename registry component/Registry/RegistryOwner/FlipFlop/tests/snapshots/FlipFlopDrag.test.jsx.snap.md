# `app/components/Pages/Registry/RegistryOwner/FlipFlop/tests/FlipFlopDrag.test.jsx`

#### `should render correctly with componentDidMount`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <TinderCard
    cardId="1"
    className={
      Object {
        "animate": null,
      }
    }
    handlePan={
      Object {
        "animate": null,
      }
    }
    isFlipFlopEnabled={true}
    style={
      Object {
        "WebkitTransform": "translate3d(0px,0px,0px) rotate(0deg)",
        "msTransform": "translate3d(0px,0px,0px) rotate(0deg)",
        "transform": "translate3d(0px,0px,0px) rotate(0deg)",
      }
    }
  />
</ErrorBoundary>
```

#### `should render correctly with panStart`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <TinderCard
    className={
      Object {
        "animate": null,
      }
    }
    isFlipFlopEnabled={true}
    style={
      Object {
        "WebkitTransform": "translate3d(0px,0px,0px) rotate(0deg)",
        "msTransform": "translate3d(0px,0px,0px) rotate(0deg)",
        "transform": "translate3d(0px,0px,0px) rotate(0deg)",
      }
    }
  />
</ErrorBoundary>
```

#### `should call panmove from handlePan when isFlipFlopEnabled is true`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <TinderCard
    className={
      Object {
        "animate": null,
      }
    }
    isFlipFlopEnabled={true}
    opacity={0.05}
    style={
      Object {
        "WebkitTransform": "translate3d(10px,0px,0px) rotate(1deg)",
        "msTransform": "translate3d(10px,0px,0px) rotate(1deg)",
        "transform": "translate3d(10px,0px,0px) rotate(1deg)",
      }
    }
  />
</ErrorBoundary>
```

#### `should call panmove from handlePan when isFlipFlopEnabled is VARIANT-B`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <TinderCard
    className={
      Object {
        "animate": null,
      }
    }
    props={
      Object {
        "isFlipFlopEnabled": "VARIANT-C",
      }
    }
    style={
      Object {
        "WebkitTransform": "translate3d(180px,0px,0px) rotate(18deg)",
        "msTransform": "translate3d(180px,0px,0px) rotate(18deg)",
        "transform": "translate3d(180px,0px,0px) rotate(18deg)",
      }
    }
  />
</ErrorBoundary>
```

#### `should call panmove from handlePan when isFlipFlopEnabled is VARIANT-C`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <TinderCard
    className={
      Object {
        "animate": null,
      }
    }
    props={
      Object {
        "isFlipFlopEnabled": "VARIANT-B",
      }
    }
    style={
      Object {
        "WebkitTransform": "translate3d(11px,0px,0px) rotate(1.1deg)",
        "msTransform": "translate3d(11px,0px,0px) rotate(1.1deg)",
        "transform": "translate3d(11px,0px,0px) rotate(1.1deg)",
      }
    }
  />
</ErrorBoundary>
```

#### `should call panmove from handlePan when isFlipFlopEnabled is true and deltaX negative`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <TinderCard
    className={
      Object {
        "animate": null,
      }
    }
    props={
      Object {
        "isFlipFlopEnabled": true,
      }
    }
    style={
      Object {
        "WebkitTransform": "translate3d(-180px,0px,0px) rotate(-18deg)",
        "msTransform": "translate3d(-180px,0px,0px) rotate(-18deg)",
        "transform": "translate3d(-180px,0px,0px) rotate(-18deg)",
      }
    }
  />
</ErrorBoundary>
```

#### `should call panmove from handlePan when isFlipFlopEnabled is false`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <TinderCard
    className={
      Object {
        "animate": null,
      }
    }
    props={
      Object {
        "isFlipFlopEnabled": false,
      }
    }
    style={
      Object {
        "WebkitTransform": "translate3d(-180px,0px,0px) rotate(-18deg)",
        "msTransform": "translate3d(-180px,0px,0px) rotate(-18deg)",
        "transform": "translate3d(-180px,0px,0px) rotate(-18deg)",
      }
    }
  />
</ErrorBoundary>
```

