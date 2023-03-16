# `app/components/Pages/Registry/ErrorMessage/tests/ErrorMessage.test.js`

#### `should render correctly with default props`

```
<PureComponent(GridContainer)>
  <PureComponent(GridX)>
    <section
      className="ErrorMessage flex flex-column items-center justify-center pr1 pb1 mt4"
    >
      <header
        className="header flex flex-column items-center justify-center"
      >
        <Heading
          level={3}
          styleVariation="eyebrow"
        />
        <Heading
          className="title mb2"
          level={1}
          styleVariation="h1-serif"
        />
      </header>
      <Paragraph
        className="description mb2"
        theme="base"
        type="primary"
        weight=""
      />
      <Button
        className={null}
        href=""
        theme="primary"
      />
    </section>
  </PureComponent(GridX)>
</PureComponent(GridContainer)>
```

#### `should render correctly`

```
<PureComponent(GridContainer)>
  <PureComponent(GridX)>
    <section
      className="ErrorMessage flex flex-column items-center justify-center pr1 pb1 mt4"
    >
      <header
        className="header flex flex-column items-center justify-center"
      >
        <Heading
          level={3}
          styleVariation="eyebrow"
        >
          404
        </Heading>
        <Heading
          className="title mb2"
          level={1}
          styleVariation="h1-serif"
        >
          Oops!
        </Heading>
      </header>
      <Paragraph
        className="description mb2"
        theme="base"
        type="primary"
        weight=""
      >
        We can’t find the page you’re looking for, but we can at least get you back to your registry.
      </Paragraph>
      <Button
        className={null}
        href=""
        theme="primary"
      />
    </section>
  </PureComponent(GridX)>
</PureComponent(GridContainer)>
```

