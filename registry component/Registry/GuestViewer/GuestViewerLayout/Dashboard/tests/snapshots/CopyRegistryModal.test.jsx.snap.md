# `app/components/Pages/Registry/GuestViewer/GuestViewerLayout/Dashboard/tests/CopyRegistryModal.test.jsx`

#### `should render correctly`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="small-12"
    >
      <Heading
        className="mb3"
        level={2}
      >
         
        Items have been added to your registry!
      </Heading>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 large-8"
    >
      <Button
        className={null}
        onClick={[Function]}
        theme="primary"
        variation="fullWidth"
      >
        View & Manage Your Registry
      </Button>
      <PrimaryLink
        className="mt3"
        href="/"
        onClick={[Function]}
        type="bold"
        variation="primary"
      >
        Close
      </PrimaryLink>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

#### `should render correctly on NOSUCCESS`

```
<div>
  <PureComponent(GridX)
    className="grid-margin-x"
  >
    <PureComponent(Cell)
      className="small-12"
    >
      <Heading
        className="mb3"
        level={2}
      >
         
        Items will be added to your registry
      </Heading>
      <Paragraph
        className="mb35"
        theme="primary"
        weight=""
      >
        By copying this registry, all non-personalized items will be added to your registry.
      </Paragraph>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 large-6"
    >
      <Button
        className={null}
        onClick={[Function]}
        theme="primary"
        variation="fullWidth"
      >
        Copy Registry
      </Button>
      <PrimaryLink
        className="mt3"
        href="/"
        onClick={[Function]}
        type="bold"
        variation="primary"
      >
        Cancel
      </PrimaryLink>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

