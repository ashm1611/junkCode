# `app/components/Pages/Registry/ManageNotificationModal/tests/ManageNotificationModal.test.js`

#### `should render the "ManageNotificationModal" component`

```
<PureComponent(GridX)
  className="large-12 small-12 pl1 pr2"
>
  <PureComponent(Cell)
    className="mt2 ml2"
  >
    <Heading
      className="notificationModalHeading mb2 sm-mb2"
      level={3}
    >
      Registry Notification Settings
    </Heading>
    <Paragraph
      className="notificationModalText mb2 sm-mb2"
      theme="base"
      weight=""
    >
      Select alerts you want. You will be notified on products that are discontinued or we no longer carry.
    </Paragraph>
    <div
      className="notificationModalCheckboxText mb4 mt1 pr4 pb2"
    >
      <Checkbox
        checked={false}
        islablevisible={true}
        label=" "
        name="giftalerts"
        onSelect={[Function]}
        pointer={false}
        type="checkbox"
      />
       
      gift alerts
      <span
        className="notificationModalcheckbox mb2 sm-mb2"
      >
        Get Alerts on all gifts purchased
      </span>
    </div>
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="saveButtonContainer pb1"
  >
    <Button
      className="saveButton"
      data-locator="registryNotifications-manageNotifications"
      disabled={true}
      onClick={[Function]}
      theme="primary"
    >
      save and close
    </Button>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render the "ManageNotificationModal" component returns false`

```
<PureComponent(GridX)
  className="large-12 small-12 pl1 pr2"
>
  <PureComponent(Cell)
    className="mt2"
  >
    <Heading
      className="notificationModalHeading mb2 sm-mb2"
      level={3}
    >
      Registry Notification Settings
    </Heading>
    <Paragraph
      className="notificationModalText mb2 sm-mb2"
      theme="base"
      weight=""
    >
      Select alerts you want. You will be notified on products that are discontinued or we no longer carry.
    </Paragraph>
    <div
      className="notificationModalCheckboxText mb4 mt1 pr4 pb2"
    >
      <Checkbox
        checked={false}
        islablevisible={true}
        label=" "
        name="giftalerts"
        onSelect={[Function]}
        pointer={false}
        type="checkbox"
      />
       
      gift alerts
      <span
        className="notificationModalcheckbox mb2 sm-mb2"
      >
        Get Alerts on all gifts purchased
      </span>
    </div>
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="pb1"
  >
    <Button
      className="saveButton"
      data-locator="registryNotifications-manageNotifications"
      disabled={true}
      onClick={[Function]}
      theme="primary"
    >
      Save Settings
    </Button>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

