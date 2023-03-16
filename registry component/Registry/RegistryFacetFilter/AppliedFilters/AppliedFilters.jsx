import React from 'react';
import { any, func, object } from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash/fp';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Button from '@bbb-app/core-ui/button/CoreButton';
import styles from './AppliedFilters.css';
import { CLEAR_ALL_FILTER_BTN_LBL } from '../../constants';

const DEPARTMENT_FACETS_REGEX = /(\d+)\/(?:.*(?=(_)))_/;

const DIMENTIONAL_FILTERS = {
  ASSEMBLEDPRODUCTDIAMETERIN: 'Diameter',
  ASSEMBLEDPRODUCTLENGTHIN: 'Length',
  ASSEMBLEDPRODUCTWIDTHIN: 'Width',
  ASSEMBLEDPRODUCTHEIGHTIN: 'Height',
};

const AppliedFilters = ({
  appliedFiltersOrderedSet,
  clearSelectedFilters,
  updateSelectedFilters,
  labels,
  enableCSLabels,
  isNewDashboard,
}) => {
  const handleButtonFocus = e => {
    const element = e.target.parentNode.parentNode;
    element.classList.add(styles.focused);
  };

  const handleButtonBlur = e => {
    const element = e.target.parentNode.parentNode;
    element.classList.remove(styles.focused);
  };

  const getClearAllButton = () =>
    appliedFiltersArray.length > 2 && (
      <Button
        className={classnames(
          styles.clearAll,
          '_test_AppliedFiltersComponent_btn_clearAll'
        )}
        role="button"
        onClick={() => clearSelectedFilters()}
        data-locator="clearAll_link"
      >
        {CLEAR_ALL_FILTER_BTN_LBL}
      </Button>
    );

  const applyLabel = item => item.label.replace(DEPARTMENT_FACETS_REGEX, '');

  const generateFilterValue = val => {
    const obj = DIMENTIONAL_FILTERS;
    if (obj[val.id]) {
      const filterType = obj[val.id];
      const fieldValue = val.value.split('-');
      const inchTo = LabelsUtil.getLabel(
        labels,
        enableCSLabels ? 'inchTo' : 'gridFilters.inchTo'
      );
      const inch = LabelsUtil.getLabel(
        labels,
        enableCSLabels ? 'inch' : 'gridFilters.inch'
      );
      const selectedLabel = `${filterType}: ${fieldValue[0]} ${inchTo} ${fieldValue[1]} ${inch}`;
      const data = val;
      data.label = selectedLabel;
      return (
        <span
          id={`applied-filters-label-${val.key}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: applyLabel(val) }}
        />
      );
    }
    return (
      <span
        id={`applied-filters-label-${val.key}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: applyLabel(val) }}
      />
    );
  };

  const appliedFiltersArray =
    appliedFiltersOrderedSet &&
    appliedFiltersOrderedSet
      .toJS()
      .sort((a, b) => (a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1));
  return (
    !isEmpty(appliedFiltersArray) && (
      <section
        className={classnames(styles.base, 'AppliedFiltersComponentDiv')}
      >
        {appliedFiltersArray.map((val, key) => {
          if (val.id === 'sort') {
            return null;
          }
          return (
            <div
              className={classnames(
                isNewDashboard
                  ? styles.newAppliedFilters
                  : [
                      styles.wrapper,
                      key === appliedFiltersOrderedSet.count() - 1
                        ? styles.last
                        : '',
                      key === 0 ? styles.first : '',
                    ]
              )}
              key={`applied-filters-${key}`}
            >
              {generateFilterValue(val)}
              <span>
                <Button
                  aria-labelledby={`applied-filters-label-${val.key}`}
                  className={classnames(
                    styles.close,
                    '_test_AppliedFiltersComponent_btn_appliedFilters'
                  )}
                  onClick={() => updateSelectedFilters(val)}
                  onFocus={e => {
                    handleButtonFocus(e);
                  }}
                  onBlur={e => {
                    handleButtonBlur(e);
                  }}
                >
                  +
                </Button>
              </span>
            </div>
          );
        })}
        {!isNewDashboard && getClearAllButton()}
      </section>
    )
  );
};

AppliedFilters.propTypes = {
  appliedFiltersOrderedSet: any.isRequired,
  clearSelectedFilters: func.isRequired,
  updateSelectedFilters: func.isRequired,
  labels: object.isRequired,
};

export default AppliedFilters;
