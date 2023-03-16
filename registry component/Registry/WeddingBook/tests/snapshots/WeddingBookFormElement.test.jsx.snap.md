# `app/components/Pages/Registry/WeddingBook/tests/WeddingBookFormElement.test.jsx`

#### `should render the "FormElement" component`

```
<div
  className="relative"
>
  <Connect(wrapper)
    aria-label="weddingBook-firstName"
    firstNameError=""
    id="firstName"
    identifier=""
    isRequired={true}
    label=""
    labelPosition="append"
    name="firstName"
    type="text"
    value="abc"
  />
</div>
```

#### `should render the "FormElement" component when formWrapperData is null`

```
<div
  className="relative"
>
  <Connect(wrapper)
    aria-label="weddingBook-"
    id=""
    identifier=""
    isRequired={true}
    label=""
    labelPosition="append"
    name=""
    type="text"
    value=""
  />
</div>
```

