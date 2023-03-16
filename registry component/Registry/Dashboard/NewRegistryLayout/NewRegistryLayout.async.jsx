/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const NewRegistryHeaderLayout = universal(
  import(
    /* webpackChunkName: "lazy-new-registry-layout" */ './NewRegistryHeaderLayout'
  ),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default NewRegistryHeaderLayout;
