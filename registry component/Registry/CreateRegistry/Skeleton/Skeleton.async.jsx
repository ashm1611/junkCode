/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const Skeleton = universal(
  import(/* webpackChunkName: "lazy-Skeleton" */ './Skeleton'),
  options
);

export default Skeleton;
/* eslint-enable extra-rules/no-commented-out-code */
