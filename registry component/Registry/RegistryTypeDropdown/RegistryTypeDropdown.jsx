import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import allRegTypes from '@bbb-app/registry-type/registryTypes';

import CustomSelect from '@bbb-app/custom-select/CustomSelect';

import Styles from './RegistryTypeDropdown.css';
const propTypes = {
  changeRegistryType: PropTypes.func,
  requestPath: PropTypes.string,
  className: PropTypes.string,
  overwrites: PropTypes.object,
};

export default class RegistryTypeDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.requestPath || '',
    };
    this.data = this.getRegTypeData();
  }
  getRegTypeData = () => {
    return [].concat(
      ...Object.keys(allRegTypes).map(regCategory => {
        return allRegTypes[regCategory].map(x => {
          return {
            key: x.registryCode,
            label: x.registryName,
            props: {
              value: `/store/gift-registry/${x.registryName
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, '-')}`,
            },
          };
        });
      })
    );
  };

  overwriteRegistryRoute = rules => {
    return this.data.map(registryType => {
      if (rules[registryType.label.toLowerCase()]) {
        return Object.assign(registryType, {
          props: { value: rules[registryType.label.toLowerCase()] },
        });
      }
      return registryType;
    });
  };

  selectOption = requestPath => {
    this.setState({
      selected: requestPath,
    });
    if (this.props.changeRegistryType) {
      this.props.changeRegistryType(requestPath);
    }
  };

  render() {
    const { className, overwrites } = this.props;
    const dataWithOverwrite =
      Object.keys(overwrites).length > 0
        ? this.overwriteRegistryRoute(overwrites)
        : this.data;
    return (
      <div className={'center'}>
        <div className={classnames(Styles.registryLink)}>
          <PrimaryLink
            itemProp="item"
            title={'The Registry'}
            href={'/store/page/Registry'}
            className="paragraph"
          >
            <span itemProp="name">The Registry</span>
          </PrimaryLink>
        </div>
        <CustomSelect
          wrapperClassName={classnames('mt2', className)}
          optionSet={dataWithOverwrite}
          selectOption={this.selectOption}
          defaultValue={this.state.selected}
          variationName={'selectBreadcrumbNoUnderline'}
        />
      </div>
    );
  }
}

RegistryTypeDropdown.propTypes = propTypes;
