import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';
import { isBedBathCanada } from '@bbb-app/utils/common';
import RenderInput from '../CreateRegistry/Components/FormComponents/RenderInput';
import styles from './CollegeInputField.css';

class CollegeInputFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCollegeList: false,
    };
  }

  handleClickOutside() {
    this.setState({ showCollegeList: false });
  }

  handleDropDownClick = value => {
    this.props.updateState({ college: value });
    this.setState({ showCollegeList: false });
  };

  debounce = func => {
    let setTimoutInstance;
    return (...args) => {
      if (setTimoutInstance) clearTimeout(setTimoutInstance);
      /* istanbul ignore next */
      setTimoutInstance = setTimeout(() => func(args[0]), 500);
    };
  };
  clgListApi = this.debounce(value => {
    this.props.fetchCollegeList({ searchTerm: value.college });
  });

  myCallback = this.clgListApi.bind(this);
  handleUpdateState = value => {
    this.props.updateState(value);
    this.myCallback(value);
    this.setState({ showCollegeList: true });
  };

  render() {
    const {
      stateObj,
      collegeList,
      dataLocator,
      registryInputFields,
    } = this.props;
    return (
      <div className="relative">
        <RenderInput
          id="college"
          fieldName="college"
          validation="college"
          label={`${isBedBathCanada() ? 'University' : 'College'} Name`}
          classes={styles.collegeInput}
          type="text"
          required
          registryInputFields={registryInputFields.college}
          dataLocator={dataLocator.registryCollegeField}
          collegeError={stateObj.collegeError}
          updateState={value => this.handleUpdateState(value)}
          value={stateObj.college}
        />
        {collegeList && collegeList.length > 0 && this.state.showCollegeList && (
          <div
            className={classnames(
              collegeList.length && styles.border,
              collegeList.length && styles.collegeDropDownClass
            )}
          >
            {collegeList.map(college => (
              <button
                className={classnames(styles.letfAlignDropdown, 'py1 block')}
                type="button"
                onClick={() => {
                  this.handleDropDownClick(college.school_name);
                }}
              >
                {college.college_name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

CollegeInputFieldComponent.propTypes = {
  stateObj: PropTypes.object,
  collegeList: PropTypes.array,
  dataLocator: PropTypes.object,
  registryInputFields: PropTypes.object,
  fetchCollegeList: PropTypes.func,
  updateState: PropTypes.func,
};

export { CollegeInputFieldComponent };
export default onClickOutside(CollegeInputFieldComponent);
