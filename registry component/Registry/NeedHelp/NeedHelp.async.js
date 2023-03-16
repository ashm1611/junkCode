/* eslint-disable extra-rules/no-commented-out-code */

import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const NeedHelp = universal(
  import(/* webpackChunkName: "lazy-NeedHelp-component" */ './NeedHelp'),
  options
);

export default NeedHelp;
/* eslint-enable extra-rules/no-commented-out-code */
