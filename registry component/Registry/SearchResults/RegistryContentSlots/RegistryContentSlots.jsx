import React from 'react';
import { object, element } from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import GridContainer from '@bbb-app/core-ui/grid-container';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import GoogleDfp from '@bbb-app/google-dfp/containers/GoogleDfp.async';

/* eslint-disable react/prop-types */
export const dynamicComponents = {
  GoogleDFP: ({ item }) => <GoogleDfp {...item} pageName="REGISTRY_SEARCH" />,
};

/**
 * This is used as an array map callback to render the Experience
 * components for a given region.
 *
 * @param {object} item the current component element
 * @param {number} index the current component index
 */
const renderDynamicComponents = (item, index, labels, wrapperId) => {
  const { name, data, params } = item;

  if (params.id && (!data || Object.keys(data).length === 0)) {
    return null;
  }
  const Component = dynamicComponents[name];
  return (
    Component && (
      <Component
        key={index}
        item={item}
        labels={labels}
        wrapperId={wrapperId}
      />
    )
  );
};

/**
 * Wrapper component for rendering dynamic component regions
 *
 * @param {array} components the Experience region's list of components
 * @param {string} id the HTML id attribute for the containing element
 * @param {object} labels dynamic content from cms
 */
// eslint-disable-next-line
export const RegionBoundary = ({ components, id, labels }) => {
  return (
    <ErrorBoundary>
      <GridContainer>
        <GridX>
          <Cell>
            {Array.isArray(components) && (
              <div className="my0" id={id}>
                {components.map((item, index) =>
                  renderDynamicComponents(item, index, labels, id)
                )}
              </div>
            )}
          </Cell>
        </GridX>
      </GridContainer>
    </ErrorBoundary>
  );
};

dynamicComponents.propTypes = {
  data: object,
  Component: element,
  labels: object,
};
