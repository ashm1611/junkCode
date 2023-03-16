/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const ShareRegistry = universal(
  import(/* webpackChunkName: "ShareRegistry" */ './ShareRegistry'),
  options
);

export default ShareRegistry;
/* eslint-enable extra-rules/no-commented-out-code */
