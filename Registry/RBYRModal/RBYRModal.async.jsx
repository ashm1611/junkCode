/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RBYRModal = universal(
  import(/* webpackChunkName: "RBYRModal" */ './RBYRModal'),
  options
);

export default RBYRModal;
/* eslint-enable extra-rules/no-commented-out-code */
