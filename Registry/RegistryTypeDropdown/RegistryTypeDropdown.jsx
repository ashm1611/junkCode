import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import pathOr from 'lodash/fp/pathOr';
import toJS from '@bbb-app/hoc/toJS';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import GridContainer from '@bbb-app/core-ui/grid-container';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import { selectSiteConfig } from '@bbb-app/selectors/pageSelectors';
import { selectRouterLocation } from '@bbb-app/selectors/appSelectors';
import withPreview from '@bbb-app/hoc/withPreview';
import RegistryTypeDropdownComponent from '../../../../components/Pages/Registry/RegistryTypeDropdown/';

const hoc = compose(setDisplayName('HeaderDropdown'), withPreview);

export const RegistryTypeDropdownContainer = hoc(
  ({ onToNewUrl, onComponentMount, router, viewPortConfig }) => (
    <ErrorBoundary>
      <GridContainer>
        <GridX>
          <Cell className="mt15">
            <RegistryTypeDropdownComponent
              changeRegistryType={onToNewUrl}
              onComponentMount={onComponentMount}
              overwrites={pathOr(
                {},
                'pageConfig.HeaderDropdownRouteOverwrites',
                viewPortConfig
              )}
              requestPath={pathOr(null, 'location.pathname', router)}
            />
          </Cell>
        </GridX>
      </GridContainer>
    </ErrorBoundary>
  )
);

RegistryTypeDropdownContainer.propTypes = {
  onToNewUrl: PropTypes.func,
  onComponentMount: PropTypes.func,
  callRegistryTypes: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      props: PropTypes.shape({
        value: PropTypes.string,
      }),
    })
  ),
  isFetching: PropTypes.bool,
  viewPortConfig: PropTypes.object,
};

export const mapDispatchToProps = dispatch => ({
  onToNewUrl: url => dispatch(push(url)),
});

export const mapStateToProps = () =>
  createStructuredSelector({
    router: selectRouterLocation(),
    viewPortConfig: selectSiteConfig,
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(RegistryTypeDropdownContainer));
