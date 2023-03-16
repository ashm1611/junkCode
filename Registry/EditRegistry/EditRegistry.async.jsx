/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const EditRegistry = universal(
  import(/* webpackChunkName: "lazy-edit-registry" */ './EditRegistry'),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default EditRegistry;
