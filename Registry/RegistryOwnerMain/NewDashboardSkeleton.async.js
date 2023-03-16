/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const NewDashboardSkeleton = universal(
  import(
    /* webpackChunkName: "lazy-NewDashboardSkeleton" */ './NewDashboardSkeleton'
  ),
  options
);

export default NewDashboardSkeleton;
/* eslint-enable extra-rules/no-commented-out-code */
