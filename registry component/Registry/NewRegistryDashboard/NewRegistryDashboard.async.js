/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const NewRegistryDashboard = universal(
  import(
    /* webpackChunkName: "lazy-new-registry-dashboard" */ './NewRegistryDashboard'
  ),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default NewRegistryDashboard;
