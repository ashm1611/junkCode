/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryDashboardRecommendation = universal(
  import(
    /* webpackChunkName: "registry-dashboard-recommendations" */ './RegistryDashboardRecommendation'
  ),
  options
);

export default RegistryDashboardRecommendation;

/* eslint-enable extra-rules/no-commented-out-code */
