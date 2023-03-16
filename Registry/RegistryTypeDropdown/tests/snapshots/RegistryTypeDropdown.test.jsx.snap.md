# `app/containers/Pages/Registry/RegistryTypeDropdown/tests/RegistryTypeDropdown.test.jsx`

#### `should render the "RegistryTypeDropdown" component container`

```
<MemoryRouter
  initialEntries={
    Array [
      Object {
        "key": "testKey",
        "pathname": "/url/to/lorem/ipsum",
      },
    ]
  }
  initialIndex={0}
>
  <Router
    history={
      Object {
        "action": "POP",
        "block": [Function],
        "canGo": [Function],
        "createHref": [Function],
        "entries": Array [
          Object {
            "hash": "",
            "key": "testKey",
            "pathname": "/url/to/lorem/ipsum",
            "search": "",
          },
        ],
        "go": [Function],
        "goBack": [Function],
        "goForward": [Function],
        "index": 0,
        "length": 1,
        "listen": [Function],
        "location": Object {
          "hash": "",
          "key": "testKey",
          "pathname": "/url/to/lorem/ipsum",
          "search": "",
        },
        "push": [Function],
        "replace": [Function],
      }
    }
  >
    <HeaderDropdown
      data={Object {}}
      isAuthor={false}
      onComponentMount={[Function]}
      onDataReceived={[Function]}
      onToNewUrl={[Function]}
      params={Object {}}
      router={
        Object {
          "location": Object {
            "pathname": "/test",
          },
        }
      }
      viewPortConfig={Object {}}
    >
      <lifecycle(Component)
        data={Object {}}
        isAuthor={false}
        onComponentMount={[Function]}
        onDataReceived={[Function]}
        onToNewUrl={[Function]}
        params={Object {}}
        router={
          Object {
            "location": Object {
              "pathname": "/test",
            },
          }
        }
        viewPortConfig={Object {}}
      >
        <Component
          data={Object {}}
          isAuthor={false}
          onComponentMount={[Function]}
          onDataReceived={[Function]}
          onToNewUrl={[Function]}
          params={Object {}}
          router={
            Object {
              "location": Object {
                "pathname": "/test",
              },
            }
          }
          viewPortConfig={Object {}}
        >
          <ErrorBoundary
            fallback={null}
            routeToSystemErrorPage={false}
          >
            <PureComponent(GridContainer)>
              <GridContainer
                Component={null}
                className={null}
              >
                <DefaultComponent
                  className="grid-container"
                >
                  <div
                    className="grid-container"
                  >
                    <PureComponent(GridX)>
                      <GridX
                        Component={null}
                        className={null}
                      >
                        <DefaultComponent
                          className="grid-x"
                        >
                          <div
                            className="grid-x"
                          >
                            <PureComponent(Cell)
                              className="mt15"
                            >
                              <Cell
                                Component={null}
                                className="mt15"
                              >
                                <DefaultComponent
                                  className="cell mt15"
                                >
                                  <div
                                    className="cell mt15"
                                  >
                                    <RegistryTypeDropdown
                                      changeRegistryType={[Function]}
                                      onComponentMount={[Function]}
                                      overwrites={Object {}}
                                      requestPath="/test"
                                    >
                                      <div
                                        className="center"
                                      >
                                        <div
                                          className="registryLink"
                                        >
                                          <PrimaryLink
                                            className="paragraph"
                                            href="/store/page/Registry"
                                            itemProp="item"
                                            title="The Registry"
                                          >
                                            <Link
                                              className="primaryLink inline-block paragraph"
                                              itemProp="item"
                                              replace={false}
                                              title="The Registry"
                                              to="/store/page/Registry"
                                            >
                                              <a
                                                className="primaryLink inline-block paragraph"
                                                href="/store/page/Registry"
                                                itemProp="item"
                                                onClick={[Function]}
                                                title="The Registry"
                                              >
                                                <span
                                                  itemProp="name"
                                                >
                                                  The Registry
                                                </span>
                                              </a>
                                            </Link>
                                          </PrimaryLink>
                                        </div>
                                        <CustomSelect
                                          buttonClassName="rclCustomSelectBtn"
                                          defaultValue="/test"
                                          dropdownDescription=""
                                          iconClassName=""
                                          modalIconProps={
                                            Object {
                                              "height": "15px",
                                              "type": "close",
                                              "width": "15px",
                                            }
                                          }
                                          optionSet={
                                            Array [
                                              Object {
                                                "key": "BRD",
                                                "label": "Wedding",
                                                "props": Object {
                                                  "value": "/store/gift-registry/wedding",
                                                },
                                              },
                                              Object {
                                                "key": "BA1",
                                                "label": "Baby",
                                                "props": Object {
                                                  "value": "/store/gift-registry/baby",
                                                },
                                              },
                                              Object {
                                                "key": "COL",
                                                "label": "College/University",
                                                "props": Object {
                                                  "value": "/store/gift-registry/college-university",
                                                },
                                              },
                                              Object {
                                                "key": "HSW",
                                                "label": "Housewarming",
                                                "props": Object {
                                                  "value": "/store/gift-registry/housewarming",
                                                },
                                              },
                                              Object {
                                                "key": "ANN",
                                                "label": "Anniversary",
                                                "props": Object {
                                                  "value": "/store/gift-registry/anniversary",
                                                },
                                              },
                                              Object {
                                                "key": "BIR",
                                                "label": "Birthday",
                                                "props": Object {
                                                  "value": "/store/gift-registry/birthday",
                                                },
                                              },
                                              Object {
                                                "key": "COM",
                                                "label": "Commitment Ceremony",
                                                "props": Object {
                                                  "value": "/store/gift-registry/commitment-ceremony",
                                                },
                                              },
                                              Object {
                                                "key": "OTH",
                                                "label": "Other",
                                                "props": Object {
                                                  "value": "/store/gift-registry/other",
                                                },
                                              },
                                              Object {
                                                "key": "RET",
                                                "label": "Retirement",
                                                "props": Object {
                                                  "value": "/store/gift-registry/retirement",
                                                },
                                              },
                                            ]
                                          }
                                          selectOption={[Function]}
                                          variationName="selectBreadcrumbNoUnderline"
                                          wrapperClassName="mt2"
                                        >
                                          <CustomSelect
                                            buttonClassName="rclCustomSelectBtn"
                                            className="select selectBreadcrumbNoUnderline mt2"
                                            customIcon={
                                              <Icon
                                                focusable="false"
                                                height="8"
                                                type="caret"
                                                width="16"
                                              />
                                            }
                                            defaultAdditonalPrependClass="defaultPrepend"
                                            defaultDropdownHeading={null}
                                            defaultSelectedClass="selected"
                                            defaultSelectionIndex={0}
                                            defaultValue="/test"
                                            disableSelectedOption={false}
                                            disabled={false}
                                            displayH1Option={false}
                                            dropdownDescription=""
                                            iconClassName="iconWrapperDefault"
                                            indexforCascadeList={
                                              Object {
                                                "child": 0,
                                                "parent": 0,
                                              }
                                            }
                                            isHeading={false}
                                            isRouteCaseSensitive={false}
                                            labelClassName="selectLabel undefined"
                                            liClassName={null}
                                            maxNumberOfElementsToShow={5}
                                            modalBreakpoint={1024}
                                            modalIcon={
                                              <Icon
                                                className=""
                                                focusable="false"
                                                height="15px"
                                                type="close"
                                                width="15px"
                                              />
                                            }
                                            modalSelectionDesktop={false}
                                            modalSelectionMobile={false}
                                            optionSet={
                                              Array [
                                                Object {
                                                  "key": "BRD",
                                                  "label": "Wedding",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/wedding",
                                                  },
                                                },
                                                Object {
                                                  "key": "BA1",
                                                  "label": "Baby",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/baby",
                                                  },
                                                },
                                                Object {
                                                  "key": "COL",
                                                  "label": "College/University",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/college-university",
                                                  },
                                                },
                                                Object {
                                                  "key": "HSW",
                                                  "label": "Housewarming",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/housewarming",
                                                  },
                                                },
                                                Object {
                                                  "key": "ANN",
                                                  "label": "Anniversary",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/anniversary",
                                                  },
                                                },
                                                Object {
                                                  "key": "BIR",
                                                  "label": "Birthday",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/birthday",
                                                  },
                                                },
                                                Object {
                                                  "key": "COM",
                                                  "label": "Commitment Ceremony",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/commitment-ceremony",
                                                  },
                                                },
                                                Object {
                                                  "key": "OTH",
                                                  "label": "Other",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/other",
                                                  },
                                                },
                                                Object {
                                                  "key": "RET",
                                                  "label": "Retirement",
                                                  "props": Object {
                                                    "value": "/store/gift-registry/retirement",
                                                  },
                                                },
                                              ]
                                            }
                                            position=""
                                            selectOption={[Function]}
                                            selectedInDropDown={true}
                                            showSelectedLabel={true}
                                            sortEnabled={false}
                                            stringSearchDelay={1000}
                                            stringSearchEnabled={true}
                                            tilesLength={-1}
                                            ulClassName="selectItems undefined"
                                            wrapNavigation={true}
                                          >
                                            <div
                                              className="rclCustomSelectWrapper select selectBreadcrumbNoUnderline mt2"
                                              isRouteCaseSensitive={false}
                                              modalBreakpoint={1024}
                                              modalSelectionDesktop={false}
                                              modalSelectionMobile={false}
                                              position=""
                                            >
                                              <Button
                                                aria-expanded={false}
                                                aria-haspopup={true}
                                                aria-label=""
                                                aria-labelledby="main-heading"
                                                className="rclCustomSelectBtn hideOnPrint rclCustomSelectBtn"
                                                data-locator="pagesortby_/store/gift-registry/wedding"
                                                disabled={false}
                                                inputRef={null}
                                                onClick={[Function]}
                                                onKeyDown={[Function]}
                                                title={null}
                                                type="button"
                                                value="/store/gift-registry/wedding"
                                              >
                                                <button
                                                  aria-expanded={false}
                                                  aria-haspopup={true}
                                                  aria-label=""
                                                  aria-labelledby="main-heading"
                                                  className="input-button rclCustomSelectBtn hideOnPrint rclCustomSelectBtn"
                                                  data-locator="pagesortby_/store/gift-registry/wedding"
                                                  onClick={[Function]}
                                                  onKeyDown={[Function]}
                                                  title={null}
                                                  type="button"
                                                  value="/store/gift-registry/wedding"
                                                >
                                                  <span
                                                    className="selectLabel undefined defaultLabel"
                                                  >
                                                    Wedding
                                                  </span>
                                                  <span
                                                    className="iconWrapperDefault"
                                                  >
                                                    <Icon
                                                      focusable="false"
                                                      height="8"
                                                      type="caret"
                                                      width="16"
                                                    >
                                                      <svg
                                                        aria-disabled={true}
                                                        aria-hidden={true}
                                                        className="icon"
                                                        data-locator="caret_icon"
                                                        focusable="false"
                                                        height="8"
                                                        tabIndex={-1}
                                                        width="16"
                                                      >
                                                        <use
                                                          xlinkHref="#caret"
                                                        />
                                                      </svg>
                                                    </Icon>
                                                  </span>
                                                </button>
                                              </Button>
                                              <div
                                                className="rclCustomSelectListWrapper display-none"
                                              >
                                                <ul
                                                  aria-label="options"
                                                  className="rclCustomSelectList selectItems undefined"
                                                  data-locator=""
                                                  onFocus={[Function]}
                                                  role="listbox"
                                                >
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={0}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "BRD",
                                                        "label": "Wedding",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/wedding",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem0"
                                                      key="0"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={0}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/wedding"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={0}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/wedding"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={0}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/wedding"
                                                          >
                                                            Wedding
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={1}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "BA1",
                                                        "label": "Baby",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/baby",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem1"
                                                      key="1"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={1}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/baby"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={1}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/baby"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={1}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/baby"
                                                          >
                                                            Baby
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={2}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "COL",
                                                        "label": "College/University",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/college-university",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem2"
                                                      key="2"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={2}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/college-university"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={2}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/college-university"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={2}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/college-university"
                                                          >
                                                            College/University
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={3}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "HSW",
                                                        "label": "Housewarming",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/housewarming",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem3"
                                                      key="3"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={3}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/housewarming"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={3}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/housewarming"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={3}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/housewarming"
                                                          >
                                                            Housewarming
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={4}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "ANN",
                                                        "label": "Anniversary",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/anniversary",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem4"
                                                      key="4"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={4}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/anniversary"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={4}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/anniversary"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={4}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/anniversary"
                                                          >
                                                            Anniversary
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={5}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "BIR",
                                                        "label": "Birthday",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/birthday",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem5"
                                                      key="5"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={5}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/birthday"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={5}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/birthday"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={5}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/birthday"
                                                          >
                                                            Birthday
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={6}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "COM",
                                                        "label": "Commitment Ceremony",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/commitment-ceremony",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem6"
                                                      key="6"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={6}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/commitment-ceremony"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={6}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/commitment-ceremony"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={6}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/commitment-ceremony"
                                                          >
                                                            Commitment Ceremony
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={7}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "OTH",
                                                        "label": "Other",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/other",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem7"
                                                      key="7"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={7}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/other"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={7}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/other"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={7}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/other"
                                                          >
                                                            Other
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                  <CustomSelectOptions
                                                    closeDropdown={[Function]}
                                                    disableOptionIconProps={
                                                      Object {
                                                        "height": "12px",
                                                        "type": "notificationError",
                                                        "width": "12px",
                                                      }
                                                    }
                                                    index={8}
                                                    isRouteCaseSensitive={false}
                                                    liClassName={null}
                                                    option={
                                                      Object {
                                                        "key": "RET",
                                                        "label": "Retirement",
                                                        "props": Object {
                                                          "value": "/store/gift-registry/retirement",
                                                        },
                                                      }
                                                    }
                                                    selectedClassName=""
                                                    selectedItemDisabled={false}
                                                    selectionHandler={[Function]}
                                                    tilesEnabled={false}
                                                  >
                                                    <li
                                                      aria-selected={false}
                                                      className="rclCustomItem8"
                                                      key="8"
                                                      role="option"
                                                    >
                                                      <CustomSelectItem
                                                        ariaControls={
                                                          Object {
                                                            "aria-current": null,
                                                          }
                                                        }
                                                        className=""
                                                        closeDropdown={[Function]}
                                                        disabled={false}
                                                        iconProps={null}
                                                        index={8}
                                                        isRouteCaseSensitive={false}
                                                        selectionHandler={[Function]}
                                                        tilesEnabled={false}
                                                        value="/store/gift-registry/retirement"
                                                      >
                                                        <Button
                                                          aria-current={null}
                                                          className=""
                                                          disabled={false}
                                                          index={8}
                                                          inputRef={null}
                                                          isRouteCaseSensitive={false}
                                                          onBlur={[Function]}
                                                          onClick={[Function]}
                                                          onFocus={[Function]}
                                                          onKeyDown={[Function]}
                                                          onMouseOut={[Function]}
                                                          onMouseOver={[Function]}
                                                          title={null}
                                                          type="button"
                                                          value="/store/gift-registry/retirement"
                                                        >
                                                          <button
                                                            aria-current={null}
                                                            aria-label=""
                                                            className="input-button"
                                                            index={8}
                                                            isRouteCaseSensitive={false}
                                                            onBlur={[Function]}
                                                            onClick={[Function]}
                                                            onFocus={[Function]}
                                                            onKeyDown={[Function]}
                                                            onMouseOut={[Function]}
                                                            onMouseOver={[Function]}
                                                            title={null}
                                                            type="button"
                                                            value="/store/gift-registry/retirement"
                                                          >
                                                            Retirement
                                                          </button>
                                                        </Button>
                                                      </CustomSelectItem>
                                                    </li>
                                                  </CustomSelectOptions>
                                                </ul>
                                              </div>
                                            </div>
                                          </CustomSelect>
                                        </CustomSelect>
                                      </div>
                                    </RegistryTypeDropdown>
                                  </div>
                                </DefaultComponent>
                              </Cell>
                            </PureComponent(Cell)>
                          </div>
                        </DefaultComponent>
                      </GridX>
                    </PureComponent(GridX)>
                  </div>
                </DefaultComponent>
              </GridContainer>
            </PureComponent(GridContainer)>
          </ErrorBoundary>
        </Component>
      </lifecycle(Component)>
    </HeaderDropdown>
  </Router>
</MemoryRouter>
```

