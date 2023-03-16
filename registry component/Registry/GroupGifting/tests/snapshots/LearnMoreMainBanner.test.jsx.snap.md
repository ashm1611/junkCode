# `app/components/Pages/Registry/GroupGifting/tests/LearnMoreMainBanner.test.jsx`

#### `should render component `

```
<Fragment>
  <PureComponent(GridContainer)>
    <PureComponent(Cell)
      className="mb1"
    >
      <div
        className="blueWidget relative relative"
      >
        <Paragraph
          className="mb0"
          theme="mediumLight"
          weight=""
        >
          Group Gifting enables your friends and family to contribute any amount of their choosing towards your registry item(s).
           
          <PrimaryLink
            className="mb1"
            href="#"
            onClick={[Function]}
            type="bold"
            variation="primary"
          >
            Learn more
          </PrimaryLink>
           
          <LearnMoreModal
            mountedState={false}
            toggleModalState={[Function]}
          />
           
          <span>
            or
          </span>
           
          <Connect(wrapper)
            LearnMoreModalGG={true}
            customLabel="edit your Group Gifting settings."
            eventDate=""
            signInDetails={
              Object {
                "isLoggedIn": undefined,
              }
            }
          />
        </Paragraph>
        <IconButton
          aria-label="close"
          className="closeBtn"
          size="small"
          title="close"
        >
          <Icon
            focusable="false"
            height="16px"
            type="close-icon"
            width="16px"
          />
        </IconButton>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridContainer)>
</Fragment>
```

