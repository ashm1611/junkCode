/* eslint-disable extra-rules/no-commented-out-code */

import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const FilterItems = universal(
  import(/* webpackChunkName: "lazy-FilterItems-component" */ './FilterItems'),
  options
);

export default FilterItems;
/* eslint-enable extra-rules/no-commented-out-code */
