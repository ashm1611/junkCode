/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RenderListItems = universal(
  import(
    /* webpackChunkName: "async-registry-facet-filters" */ './RegistryFacetFilter'
  ),
  options
);

export default RenderListItems;

/* eslint-enable extra-rules/no-commented-out-code */
