# `app/components/Pages/Registry/GoodyBoxModal/tests/GoodyBoxModal.test.jsx`

#### `should render GoodyBoxModal Properly`

```
<Fragment>
  <div
    className="heading center"
    data-locator="goodybox-status-model-heading"
  >
    Get your Registry Box!
  </div>
  <div
    className="twoColumnLayout"
    data-locator="goodybox-status-model-desc"
  >
    <img
      alt="Goody Box"
      className="fol goodyBoxImage"
      data-locator="Goody-Box-image"
      src="https://s7d9.scene7.com/is/image/buybuybaby/US-LP-FW46-FY20-0115-WEB-REGISTRY-BOX-A?$content$"
    />
    <div
      className="detailWrapper"
      data-locator="goodybox-status-model-desc-box"
    >
      <div
        className="subHeading"
        data-locator="goodybox-status-model-desc-title"
      >
        Add 15 or more items to your registry to qualify.
      </div>
      <div
        className="text"
        data-locator="goodybox-status-model-desc-text"
      >
        Our Registry Box includes samples of our favorite baby buys worth up to $40, but you can get it for just $10 when you add 15 or more items to your registry! Items in each Registry Box vary. Available Only Online. *while supplies last
      </div>
    </div>
  </div>
  <GoodyBoxProgressBar
    labels={Object {}}
  />
  <div
    className="faqContent"
    data-locator="goodybox-status-model-faq"
  >
    <OpenContainer
      isAuthor={true}
      params={
        Object {
          "id": undefined,
        }
      }
    />
  </div>
</Fragment>
```

#### `should render GoodyBoxModal Properly when enableCSLabels is true`

```
<Fragment>
  <div
    className="heading center"
    data-locator="goodybox-status-model-heading"
  >
    Get your Registry Box!
  </div>
  <div
    className="twoColumnLayout"
    data-locator="goodybox-status-model-desc"
  >
    <img
      alt="Goody Box"
      className="fol goodyBoxImage"
      data-locator="Goody-Box-image"
      src="https://s7d9.scene7.com/is/image/buybuybaby/US-LP-FW46-FY20-0115-WEB-REGISTRY-BOX-A?$content$"
    />
    <div
      className="detailWrapper"
      data-locator="goodybox-status-model-desc-box"
    >
      <div
        className="subHeading"
        data-locator="goodybox-status-model-desc-title"
      >
        Add 15 or more items to your registry to qualify.
      </div>
      <div
        className="text"
        data-locator="goodybox-status-model-desc-text"
      >
        Our Registry Box includes samples of our favorite baby buys worth up to $40, but you can get it for just $10 when you add 15 or more items to your registry! Items in each Registry Box vary. Available Only Online. *while supplies last
      </div>
    </div>
  </div>
  <GoodyBoxProgressBar
    enableCSLabels={true}
    labelsRef={
      Object {
        "referredContent": Array [
          Object {
            "id": "22666",
            "key": "faqReferredContentID",
          },
        ],
      }
    }
  />
  <div
    className="faqContent"
    data-locator="goodybox-status-model-faq"
  >
    <OpenContainer
      isAuthor={true}
      params={
        Object {
          "id": "22666",
        }
      }
    />
  </div>
</Fragment>
```

