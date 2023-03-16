import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Button from '@bbb-app/core-ui/button';
import { validateAll } from '@bbb-app/forms/validations/validator';
import { getSiteId } from '@bbb-app/utils/common';
import styles from '../../CreateRegistryFormStyles.css';
import RenderInput from './RenderInput';
import {
  NOT_SELECTED_STORE_LBL,
  SEARCH_BUTTON_LBL,
  STORE_API_ERROR_LBL,
  ENTER_CITY_US_LBL,
} from './constants';

const ENTER_CITY_LBL =
  getSiteId() === 'BedBathCanada'
    ? 'Enter city, state or postal code'
    : ENTER_CITY_US_LBL;

class FavoriteStoreInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleStoreSearch = this.handleStoreSearch.bind(this);
    this.updateComponentState = this.updateComponentState.bind(this);
    this.state = {
      favStoreSearch: '',
      favStoreSearchError: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isStoreFetching, showFavStoreInputErr } = nextProps;
    /* istanbul ignore else */
    if (
      this.props.isStoreFetching &&
      !isStoreFetching &&
      showFavStoreInputErr
    ) {
      const errorMsg = STORE_API_ERROR_LBL;

      this.setState({
        favStoreSearchError: errorMsg,
      });
    }
  }
  /**
   * @param {event} event
   * Handles search stores form submission
   */
  handleStoreSearch(event) {
    /* istanbul ignore else */
    if (event) {
      event.preventDefault();
    }
    const { onSearchStore } = this.props;
    const { favStoreSearch } = this.state;
    const rule = {
      favStoreSearch: {
        rule: 'required',
        value: favStoreSearch,
      },
    };
    const errors = validateAll(rule);
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      this.setState(errors);
    } else {
      onSearchStore(favStoreSearch.trim());
    }
  }

  updateComponentState(value) {
    this.setState(value);
  }

  render() {
    const { dataLocator } = this.props;
    return (
      <ErrorBoundary>
        <Paragraph
          className={classnames(
            styles.formText,
            styles.findStoreLabel,
            'mt0 mb2'
          )}
        >
          {NOT_SELECTED_STORE_LBL}
        </Paragraph>

        <GridX className={'grid-margin-x'}>
          <RenderInput
            fieldName="favStoreSearch"
            label={ENTER_CITY_LBL}
            classes={classnames('large-6 small-12 pb1')}
            type="text"
            dataLocator={dataLocator.registryEnterZipCodeTextField}
            favStoreSearchError={this.state.favStoreSearchError}
            updateState={this.updateComponentState}
            value={this.state.favStoreSearch}
            maxLength={30}
          />
          <Cell className={classnames('large-2 small-12 pb1')}>
            <Button
              theme="primary"
              data-locator={dataLocator.registryZipCodeSearchButton}
              variation="fullWidth"
              onClick={this.handleStoreSearch}
            >
              {SEARCH_BUTTON_LBL}
            </Button>
          </Cell>
        </GridX>
      </ErrorBoundary>
    );
  }
}
FavoriteStoreInput.propTypes = {
  onSearchStore: PropTypes.func,
  dataLocator: PropTypes.object,
  isStoreFetching: PropTypes.bool,
  showFavStoreInputErr: PropTypes.bool,
};

export default FavoriteStoreInput;
