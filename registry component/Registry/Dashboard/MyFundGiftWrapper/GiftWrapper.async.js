/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const MyFundGiftWrapper = universal(
  import(/* webpackChunkName: "MyFundGiftWrapper-async" */ './GiftWrapper'),
  options
);

export default MyFundGiftWrapper;

/* eslint-enable extra-rules/no-commented-out-code */
