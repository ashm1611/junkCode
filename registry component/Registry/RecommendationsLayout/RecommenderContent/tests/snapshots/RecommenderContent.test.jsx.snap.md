# `app/components/Pages/Registry/RecommendationsLayout/RecommenderContent/tests/RecommenderContent.test.jsx`

#### `should render mobile view with default props`

```
<div
  className="container pt03"
>
  <PureComponent(GridContainer)>
    <div
      className="recommenderContentMob"
    >
      <h3
        className="heading"
      >
        Manage Your Recommenders
      </h3>
      <ul
        className="content p15"
        key="0"
      >
        <li
          className="name"
        >
          Karan M
        </li>
        <li
          className="list"
        >
          Recommended
          <span
            className="values blocked"
          >
            1
          </span>
        </li>
        <li
          className="list"
        >
          Accepted
          <span
            className="values blocked"
          >
            0
          </span>
        </li>
        <li
          className="list"
        >
          Declined
          <span
            className="values blocked"
          >
            10
          </span>
        </li>
        <li
          className="list block"
        >
          <PrimaryLink
            className="link"
            data-requestedFlag="unblock"
            href="#"
            onClick={[Function]}
          >
            Unblock
          </PrimaryLink>
        </li>
      </ul>
      <ul
        className="content p15"
        key="1"
      >
        <li
          className="name"
        >
          Karan M
        </li>
        <li
          className="list"
        >
          Recommended
          <span
            className="values"
          >
            1
          </span>
        </li>
        <li
          className="list"
        >
          Accepted
          <span
            className="values"
          >
            0
          </span>
        </li>
        <li
          className="list"
        >
          Declined
          <span
            className="values"
          >
            10
          </span>
        </li>
        <li
          className="list block"
        >
          <PrimaryLink
            className="link"
            data-requestedFlag="block"
            href="#"
            onClick={[Function]}
          >
            Block
          </PrimaryLink>
        </li>
      </ul>
    </div>
  </PureComponent(GridContainer)>
</div>
```

#### `should render desktop view with default props`

```
<div
  className="container pt03"
>
  <PureComponent(GridContainer)>
    <div
      className="p03 recommenderContent"
    >
      <h3
        className="header"
      >
        Manage Your Recommenders
      </h3>
      <table
        className="table"
        id="table"
      >
        <thead>
          <th
            className="tableHeaders pt15 pb1"
            column="Name"
          >
            Name
          </th>
          <th
            className="tableHeaders pt15 pb1"
            column="Recommended"
          >
            Recommended
          </th>
          <th
            className="tableHeaders pt15 pb1"
            column="Accepted"
          >
            Accepted
          </th>
          <th
            className="tableHeaders pt15 pb1"
            column="Declined"
          >
            Declined
          </th>
          <th
            className="tableHeaders pt15 pb1"
            column="Block"
          />
        </thead>
        <tr
          className="tableRows"
          key="0"
        >
          <td
            className="recommenders py1"
            column="Name"
          >
            Karan M
          </td>
          <td
            className="blocked py1"
            column="Recommended"
          >
            1
          </td>
          <td
            className="blocked py1"
            column="Accepted"
          >
            0
          </td>
          <td
            className="blocked py1"
            column="Declined"
          >
            10
          </td>
          <td
            className="blockedContent"
            column="Block"
          >
            <PrimaryLink
              className="link"
              data-locator="rg-rl-blck-unblck-link"
              data-requestedFlag="unblock"
              href="#"
              onClick={[Function]}
            >
              Unblock
            </PrimaryLink>
          </td>
        </tr>
        <tr
          className="tableRows"
          key="1"
        >
          <td
            className="recommenders py1"
            column="Name"
          >
            Karan M
          </td>
          <td
            className="py1"
            column="Recommended"
          >
            1
          </td>
          <td
            className="py1"
            column="Accepted"
          >
            0
          </td>
          <td
            className="py1"
            column="Declined"
          >
            10
          </td>
          <td
            className="blockedContent"
            column="Block"
          >
            <PrimaryLink
              className="link"
              data-locator="rg-rl-blck-unblck-link"
              data-requestedFlag="block"
              href="#"
              onClick={[Function]}
            >
              Block
            </PrimaryLink>
          </td>
        </tr>
      </table>
    </div>
  </PureComponent(GridContainer)>
</div>
```

