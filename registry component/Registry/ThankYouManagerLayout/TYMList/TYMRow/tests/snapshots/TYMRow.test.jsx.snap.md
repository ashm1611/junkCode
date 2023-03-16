# `app/components/Pages/Registry/ThankYouManagerLayout/TYMList/TYMRow/tests/TYMRow.test.jsx`

#### `should render tym list component correctly when `

```
<Fragment>
  <li
    className="listContainer"
    data-sku="47046481"
  >
    <PureComponent(GridX)
      className="mb3 TymList container greenBorder"
    >
      <PureComponent(Cell)
        className="pt3 pb3 large-1"
      >
        <div
          className="pt3 pb1 mb2 customTymCB"
        >
          <Checkbox
            aria-label="MARK AS SENT"
            checked={true}
            className="tymTickMarkAsSent"
            data-locator="registry-networkInfoCheck2"
            id="giftSent_1"
            islablevisible={true}
            label=" "
            name="giftSent_1"
            onSelect={[Function]}
            pointer={false}
            type="checkbox"
            variation="circular"
          />
        </div>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-4"
      >
        <PureComponent(GridX)
          className="fullHeight"
        >
          <PureComponent(Cell)
            className="large-11 giftGiverWrapper pt3 pb3 pl1 pr1 showBorder"
          >
            <GiftGiverInfo
              classToggle="show"
              handleAddEditModal={[Function]}
              isCashFund={false}
              labels={
                Object {
                  "giftGiver": Object {
                    "quickViewLabel": "quick view",
                  },
                  "giftReceivedLbl": "Gift received",
                  "giftReturnedLbl": "Gift returned",
                  "markAsSentLbl": "MARK AS SENT",
                  "tymRBYRlabel": "Received in My Funds",
                }
              }
              listItem={
                Object {
                  "address1": "1234 5th Avenue ",
                  "address2": "Manhattan",
                  "city": "New York",
                  "country": "US",
                  "displayName": "PRoduct name",
                  "email": "asdfads@fsadf.sadf",
                  "firstName": "mohit",
                  "formattedPriceVal": "INR 167",
                  "giftReceived": true,
                  "lastName": "kumar",
                  "ltlDeliveryServices": "white glove",
                  "price": 2.99,
                  "purchaseDate": "February 28, 2018",
                  "purchaseQty": 2,
                  "registryId": 520588833,
                  "skuDetails": Object {
                    "displayName": "PRoduct name",
                    "ltlItem": true,
                    "personalizationType": "PB",
                    "skuId": "47046481",
                    "skuImages": Object {
                      "smallImage": "9291514310568p?$146$",
                    },
                    "skuInStock": true,
                  },
                  "skuId": "47046481",
                  "state": "NY ",
                  "thankYouSent": true,
                  "totalDeliveryCharges": 23,
                  "transactionType": "SV",
                  "wasReturned": true,
                  "zipCode": "10029",
                }
              }
            />
            <div
              className="mt3 errorMsg pb1"
            >
              giftSent_error
            </div>
            <Connect(wrapper)
              escapeExits={true}
              initialFocus="#firstName"
              mountedState={false}
              titleAriaLabel="Edit Address"
              toggleModalState={[Function]}
              variation="medium"
              verticallyCenter={true}
            >
              <AddEditAddress
                addEditTym={true}
                addressLine1="1234 5th Avenue "
                apartment="Manhattan"
                city="New York"
                company=""
                customerId=""
                email="asdfads@fsadf.sadf"
                enableAutoFill={true}
                firstName="mohit"
                giftReceived={true}
                identifier="accountAddressBook"
                isPreferredMailingAddress={false}
                isPreferredShippingAddress={false}
                lastName="kumar"
                mode="edit"
                onAutoFill={[Function]}
                onCancelLinkClick={[Function]}
                registryId={520588833}
                repositoryId=""
                state="NY"
                thankYouSent={true}
                wasReturned={true}
                zip="10029"
              />
            </Connect(wrapper)>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="pt3 pb3 large-4 showBorder"
      >
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="large-3 sm-ml1 imageContainer relative small-3"
          >
            <LazyLoad
              onInViewPortChange={[Function]}
              placeholder={<div />}
              shouldCallbackonInit={false}
              threshold={100}
              useDebounce={false}
              useEvent={false}
              waitValue={80}
            >
              <PrimaryLink
                className="imgWrapper"
                href="undefinedundefined?skuId=47046481&registryId=520588833&sopt=white glove"
                onClick={[Function]}
              >
                <img
                  alt="PRoduct name"
                  src="undefined9291514310568p?$146$"
                />
              </PrimaryLink>
              <div
                className="absolute quickViewButton"
              >
                <Button
                  className="smallButtonQV"
                  onClick={[Function]}
                  theme="ghostSecondary"
                  tooltip="Quickview"
                >
                  Quickview
                </Button>
              </div>
            </LazyLoad>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="ml2 large-8 small-8 show printProductTitle"
          >
            <span
              className="fundedLabel"
            >
              <Icon
                focusable="false"
                height="9"
                type="checkmarkwhite"
                width="11"
              />
              Funded
            </span>
            <wrapper
              headingClass="productTitle"
              headingLevel={4}
              tabindex="0"
              theme="mediumLight"
            >
              PRoduct name
            </wrapper>
            <div>
              <Paragraph
                className="m0 inline-block"
                tabindex="0"
                theme="smallLight"
                weight=""
              >
                <span>
                  Qty 2
                </span>
              </Paragraph>
              <Paragraph
                className="m0 pl1 pr1 inline-block price"
                tabindex="0"
                theme="smallLight"
                weight=""
              >
                <span>
                   INR 167
                </span>
              </Paragraph>
              <Paragraph
                className="m0 listDisplay inline-block"
                tabindex="0"
                theme="smallLight"
                weight="bold"
              >
                <span>
                  Ship or Swap Funds
                   
                </span>
              </Paragraph>
              <Paragraph
                className="m0 bold"
                tabindex="0"
                theme="smallLight"
                weight=""
              >
                <span>
                  on February 28, 2018
                </span>
              </Paragraph>
            </div>
            <div />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="pl3 pt3 pb1 large-3 medium-6 small-12 atcContainer"
      >
        <UniversalComponent
          buttonProps={
            Object {
              "attr": Object {
                "className": "fullWidth",
                "data-locator": "addtocartbutton",
                "theme": "primary",
              },
              "children": "Ship It",
              "disabled": false,
            }
          }
          className="addtocart"
          parentProductId=""
          qty={2}
          registryATCTealiumInfo={Object {}}
          registryId={520588833}
          skuId="47046481"
          tealiumLinkLocation=""
        />
        <span
          className="shippingLabel"
        >
          Not in Love with this Item? Use Your My Funds to Shop and Ship it.
        </span>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </li>
</Fragment>
```

#### `should render `

```
<Fragment>
  <li
    className="listContainer"
    data-sku={69934769}
  >
    <PureComponent(GridX)
      className="mb3 TymList container"
    >
      <PureComponent(Cell)
        className="pt3 pb3 large-1"
      >
        <div
          className="pt3 pb1 mb2 customTymCB"
        >
          <Checkbox
            aria-label="MARK AS SENT"
            checked={false}
            className="tymTickMarkAsSent"
            data-locator="registry-networkInfoCheck2"
            id="giftSent_1"
            islablevisible={true}
            label="<span aria-hidden='true' class='markAsSent'>MARK AS SENT</span>"
            name="giftSent_1"
            onSelect={[Function]}
            pointer={false}
            type="checkbox"
            variation="circular"
          />
        </div>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-4"
      >
        <PureComponent(GridX)
          className="fullHeight"
        >
          <PureComponent(Cell)
            className="large-11 giftGiverWrapper pt3 pb3 pl1 pr1 showBorder"
          >
            <GiftGiverInfo
              classToggle="show"
              handleAddEditModal={[Function]}
              labels={
                Object {
                  "giftGiver": Object {
                    "quickViewLabel": "quick view",
                  },
                  "giftReceivedLbl": "Gift received",
                  "giftReturnedLbl": "Gift returned",
                  "markAsSentLbl": "MARK AS SENT",
                  "tymRBYRlabel": "Received in My Funds",
                }
              }
              listItem={
                Object {
                  "address1": null,
                  "address2": null,
                  "addressSelection": null,
                  "cfCode": "abcd",
                  "cfDisplayName": "TestContribute",
                  "cfImage": "//b3h2.scene7.com/is/image/BedBathandBeyond/Mask_group_082722_1?$contentFlat$",
                  "city": null,
                  "contributionPrice": null,
                  "country": null,
                  "email": "shaambhavi.s@gmail.com",
                  "firstName": "Shaambhavi",
                  "formattedPriceVal": null,
                  "giftReceived": false,
                  "lastName": "S",
                  "ltlDeliveryService": null,
                  "price": 0,
                  "productURL": null,
                  "purchaseDate": "September 06, 2022",
                  "purchaseQty": 0,
                  "referenceId": "52076187920220828105326247",
                  "registryId": 520761879,
                  "ropisOrder": false,
                  "rowId": null,
                  "skuDetails": null,
                  "skuId": 69934769,
                  "state": null,
                  "thankYouSent": false,
                  "transactionType": null,
                  "wasReturned": false,
                  "zipCode": null,
                }
              }
            />
            <Connect(wrapper)
              escapeExits={true}
              initialFocus="#firstName"
              mountedState={false}
              titleAriaLabel="Edit Address"
              toggleModalState={[Function]}
              variation="medium"
              verticallyCenter={true}
            >
              <AddEditAddress
                addEditTym={true}
                addressLine1={null}
                apartment={null}
                city={null}
                company=""
                customerId=""
                email="shaambhavi.s@gmail.com"
                enableAutoFill={true}
                firstName="Shaambhavi"
                giftReceived={false}
                identifier="accountAddressBook"
                isPreferredMailingAddress={false}
                isPreferredShippingAddress={false}
                lastName="S"
                mode="edit"
                onAutoFill={[Function]}
                onCancelLinkClick={[Function]}
                registryId={520761879}
                repositoryId=""
                rowId={null}
                state={null}
                thankYouSent={false}
                wasReturned={false}
                zip={null}
              />
            </Connect(wrapper)>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="pt3 pb3 large-4 showBorder"
      >
        <PureComponent(GridX)>
          <PureComponent(Cell)
            className="large-3 sm-ml1 imageContainer relative small-3"
          >
            <LazyLoad
              onInViewPortChange={[Function]}
              placeholder={<div />}
              shouldCallbackonInit={false}
              threshold={100}
              useDebounce={false}
              useEvent={false}
              waitValue={80}
            >
              <PrimaryLink
                className="imgWrapper"
                disabled={true}
                href="undefinednull?skuId=69934769&registryId=520761879"
                onClick={[Function]}
              >
                <img
                  alt="TestContribute"
                  src=""
                />
              </PrimaryLink>
            </LazyLoad>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="ml2 large-8 small-8 show printProductTitle"
          >
            <wrapper
              headingClass="productTitle"
              headingLevel={4}
              tabindex="0"
              theme="mediumLight"
            >
              TestContribute
            </wrapper>
            <div>
              <Paragraph
                className="m0 inline-block"
                tabindex="0"
                theme="smallLight"
                weight=""
              >
                <span>
                  Qty 0
                </span>
              </Paragraph>
              <Paragraph
                className="m0 pl1 pr1 inline-block price"
                tabindex="0"
                theme="smallLight"
                weight=""
              >
                <span />
              </Paragraph>
              <Paragraph
                className="m0 boldCf"
                tabindex="0"
                theme="smallLight"
                weight=""
              >
                <span>
                  Purchased September 06, 2022
                </span>
              </Paragraph>
            </div>
            <div />
            <div>
              <Paragraph
                className="m0"
                tabindex="0"
                theme="smallLight"
                weight=""
              >
                Funds sent to your Venmo
                <PrimaryLink
                  className="venmoLogin"
                  href="https://account.venmo.com/u/|https://account.venmo.com/u/abcd"
                  isHardSpaReq={true}
                  target="_blank"
                  variation="primary"
                >
                  log in
                </PrimaryLink>
              </Paragraph>
            </div>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="pl3 pt3 pb1 large-3 medium-6 small-9 show"
      >
        <div
          className="pb2 mr2 giftCheckbox"
        >
          <Checkbox
            checked={false}
            data-locator="registry-networkInfoCheck1"
            id="giftReceived_1"
            islablevisible={true}
            label="Mark as Received"
            name="giftReceived_1"
            onSelect={[Function]}
            pointer={false}
            type="checkbox"
            variation="verticalCenter"
          />
        </div>
        <div
          className="pb2 mr2 giftCheckbox"
        >
          <Checkbox
            checked={false}
            data-locator="registry-networkInfoCheck1"
            id="giftReturned_1"
            islablevisible={true}
            label="Mark as returned"
            name="giftReturned_1"
            onSelect={[Function]}
            pointer={false}
            type="checkbox"
            variation="verticalCenter"
          />
        </div>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </li>
</Fragment>
```

