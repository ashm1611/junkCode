/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const GiftWrapper = universal(
  import(/* webpackChunkName: "GiftWrapper-async" */ './GiftWrapper'),
  options
);

export default GiftWrapper;

/* eslint-enable extra-rules/no-commented-out-code */
