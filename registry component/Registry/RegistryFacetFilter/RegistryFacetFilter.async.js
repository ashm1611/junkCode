/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryFacetFilterComponent = universal(
  import(/* webpackChunkName: "lazy-FacetFilter" */ './RegistryFacetFilter'),
  options
);

export default RegistryFacetFilterComponent;
/* eslint-enable extra-rules/no-commented-out-code */
