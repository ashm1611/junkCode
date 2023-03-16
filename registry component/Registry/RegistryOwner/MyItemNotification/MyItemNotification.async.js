/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const MyItemNotification = universal(
  import(
    /* webpackChunkName: "async-my-item-notification" */ './MyItemNotification'
  ),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default MyItemNotification;
