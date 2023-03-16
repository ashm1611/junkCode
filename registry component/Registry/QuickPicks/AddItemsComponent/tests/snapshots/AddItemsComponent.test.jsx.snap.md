# `app/components/Pages/Registry/QuickPicks/AddItemsComponent/tests/AddItemsComponent.test.jsx`

#### `should render correctly with default props`

```
<Fragment>
  <section
    className="base"
  >
    <div
      className="dockedWrapper flex items-center grid-container"
    >
      <div
        className="justify-end flex"
      >
        <div
          className="selectAllWrapper flex nowrap items-center"
        >
          <Checkbox
            checked={false}
            disabled={false}
            islablevisible={true}
            label=" "
            onSelect={[Function]}
            pointer={false}
          />
          <div
            className="selectAllLabel ml0 mr3"
          >
            Select all
          </div>
        </div>
        <Button
          className="addSelectedItemsCTA"
          disabled={true}
          onClick={[Function]}
          theme="deactivated"
        >
          Add Selected to Registry
        </Button>
      </div>
    </div>
  </section>
  <LazyLoad
    onInViewPortChange={[Function]}
    placeholder={<div />}
    repeatOnInView={true}
    shouldCallbackonInit={true}
    threshold={0}
    useDebounce={false}
    useEvent={true}
    waitValue={80}
  >
    <div />
  </LazyLoad>
</Fragment>
```

#### `should render correctly with no selected items`

```
<Fragment>
  <section
    className="base"
  >
    <div
      className="dockedWrapper flex items-center grid-container"
    >
      <div
        className="justify-end flex"
      >
        <div
          className="selectAllWrapper flex nowrap items-center"
        >
          <Checkbox
            checked={false}
            disabled={false}
            islablevisible={true}
            label=" "
            onSelect={[Function]}
            pointer={false}
          />
          <div
            className="selectAllLabel ml0 mr3"
          >
            Select all
          </div>
        </div>
        <Button
          className="addSelectedItemsCTA"
          disabled={true}
          onClick={[Function]}
          theme="deactivated"
        >
          Add Selected to Registry
        </Button>
      </div>
    </div>
  </section>
  <LazyLoad
    onInViewPortChange={[Function]}
    placeholder={<div />}
    repeatOnInView={true}
    shouldCallbackonInit={true}
    threshold={0}
    useDebounce={false}
    useEvent={true}
    waitValue={80}
  >
    <div />
  </LazyLoad>
</Fragment>
```

#### `should render correctly with selected items`

```
<Fragment>
  <section
    className="base"
  >
    <div
      className="dockedWrapper flex items-center grid-container"
    >
      <div
        className="justify-end flex"
      >
        <div
          className="selectAllWrapper flex nowrap items-center"
        >
          <Checkbox
            checked={false}
            disabled={false}
            islablevisible={true}
            label=" "
            onSelect={[Function]}
            pointer={false}
          />
          <div
            className="selectAllLabel ml0 mr3"
          >
            Select all
          </div>
        </div>
        <Button
          className="addSelectedItemsCTA"
          disabled={false}
          onClick={[Function]}
          theme="primary"
        >
          Add Selected to Registry (1)
        </Button>
      </div>
    </div>
  </section>
  <LazyLoad
    onInViewPortChange={[Function]}
    placeholder={<div />}
    repeatOnInView={true}
    shouldCallbackonInit={true}
    threshold={0}
    useDebounce={false}
    useEvent={true}
    waitValue={80}
  >
    <div />
  </LazyLoad>
</Fragment>
```

#### `should render correctly Quiz Results Layout`

```
<Fragment>
  <section
    className="base"
  >
    <div
      className="dockedWrapper flex items-center grid-container"
    >
      <PureComponent(GridX)
        className="fullWidth"
      >
        <Heading
          className="quickPicksTitle"
          level={1}
        >
          QUIZ_RESULTS_LBL
        </Heading>
        <PureComponent(Cell)
          className="pb15 quizSubHeading"
        >
          <span>
            RETAKE_QUIZ_SUBCOPY_LBL
          </span>
          <PrimaryLink
            className="ml025 sm-pt2"
            data-locator="retakeQuizCta"
            href="#"
            type="bold"
            variation="primary"
          >
            RETAKE_QUIZ_LBL
          </PrimaryLink>
        </PureComponent(Cell)>
      </PureComponent(GridX)>
      <div
        className="recDockedWrapper justify-end"
      >
        <div
          className="selectAllWrapper flex nowrap items-center recSelectAllWrapper"
        >
          <Checkbox
            checked={false}
            disabled={false}
            islablevisible={true}
            label=" "
            onSelect={[Function]}
            pointer={false}
          />
          <div
            className="selectAllLabel ml0 mr2"
          >
            Select all
          </div>
        </div>
        <Button
          className="addSelectedItemsCTA"
          disabled={true}
          onClick={[Function]}
          theme="deactivated"
        >
          Add Selected to Registry
        </Button>
      </div>
    </div>
  </section>
  <LazyLoad
    onInViewPortChange={[Function]}
    placeholder={<div />}
    repeatOnInView={true}
    shouldCallbackonInit={true}
    threshold={0}
    useDebounce={false}
    useEvent={true}
    waitValue={80}
  >
    <div />
  </LazyLoad>
</Fragment>
```

#### `should render floating state`

```
""
```

#### `should render static state`

```
""
```

#### `should render change to floating state`

```
<Fragment>
  <section
    className="base fixedToViewPort flex fixed justify-center mb3 registryFooterOpen"
  >
    <div
      className="dockedWrapper flex items-center grid-container floatingWrapper p2"
    >
      <div
        className="justify-end flex"
      >
        <div
          className="selectAllWrapper flex nowrap items-center"
        >
          <Checkbox
            checked={false}
            disabled={false}
            islablevisible={true}
            label=" "
            onSelect={[Function]}
            pointer={false}
          />
          <div
            className="selectAllLabel ml0 mr3"
          >
            Select all
          </div>
        </div>
        <Button
          className="addSelectedItemsCTA"
          disabled={true}
          onClick={[Function]}
          theme="deactivated"
        >
          Add Selected to Registry
        </Button>
      </div>
    </div>
  </section>
  <LazyLoad
    onInViewPortChange={[Function]}
    placeholder={<div />}
    repeatOnInView={true}
    shouldCallbackonInit={true}
    threshold={0}
    useDebounce={false}
    useEvent={true}
    waitValue={80}
  >
    <div />
  </LazyLoad>
</Fragment>
```

#### `should render recSelectAllWrapper div when fromRecomendation props is true`

```
<Fragment>
  <section
    className="base"
  >
    <div
      className="dockedWrapper flex items-center recDockedWrapper"
    >
      <div
        className="selectAllWrapper flex nowrap items-center recSelectAllWrapper"
      >
        <Checkbox
          checked={false}
          disabled={false}
          islablevisible={true}
          label=" "
          onSelect={[Function]}
          pointer={false}
        />
        <div
          className="selectAllLabel ml0 mr2"
        >
          Select all
        </div>
      </div>
      <Button
        className="addSelectedItemsCTA"
        disabled={false}
        onClick={[Function]}
        theme="primary"
      >
        Add Selected to Registry (1)
      </Button>
    </div>
  </section>
  <LazyLoad
    onInViewPortChange={[Function]}
    placeholder={<div />}
    repeatOnInView={true}
    shouldCallbackonInit={true}
    threshold={0}
    useDebounce={false}
    useEvent={true}
    waitValue={80}
  >
    <div />
  </LazyLoad>
</Fragment>
```

