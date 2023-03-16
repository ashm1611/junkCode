# `app/components/Pages/Registry/DiaperFundModal/tests/AddDFModal.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <h1
    className="pt2 diaperFundHeading"
  >
    What's a Diaper Fund?
  </h1>
  <PureComponent(GridX)>
    <div
      className="large-6 small-12 pt2 imageStyle"
    >
      <img
        alt="Diaper Fund name"
        className="imageContainer"
        data-locator="diaper_productImage"
        src="https://b3h2.scene7.com/is/image/BedBathandBeyond/CA-FW45-FY21-0106-WEB-AD-MODAL-IMG-A?$content$"
      />
    </div>
    <div
      className="large-6"
    >
      <p
        className="description"
      >
        <wrapper>
          &lt;div&gt;&lt;p&gt;hello world&lt;/p&gt;&lt;/div&gt;
        </wrapper>
      </p>
    </div>
  </PureComponent(GridX)>
  <section />
  <div>
    <h1
      className="mb3 mt3 diaperFundHeading"
    >
      Choose your Diaper Fund
    </h1>
  </div>
  <DiaperFundQuickAddSection
    diaperFundProducts={
      Array [
        Object {},
        Object {},
        Object {},
      ]
    }
    enableQuickAdd={true}
    isFetching={false}
    isMobile={false}
    labels={
      Object {
        "referredContent": Array [
          Object {
            "id": "123",
            "key": "123",
          },
          Object {
            "id": "123",
            "key": "diaperFundModalDescription",
          },
        ],
      }
    }
    referredContentData={
      Object {
        "body": "<div>&lt;p&gt;hello world&lt;/p&gt;</div>",
      }
    }
  />
  <div
    className=""
  >
    <Connect(OpenContainer)
      isAuthor={true}
      isDpfclassName="faqlabel"
      isfromDpf={true}
      params={
        Object {
          "id": undefined,
        }
      }
    />
  </div>
</ErrorBoundary>
```

