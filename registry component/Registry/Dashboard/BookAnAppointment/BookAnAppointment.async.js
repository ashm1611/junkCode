/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const BookAnAppointment = universal(
  import(
    /* webpackChunkName: "BookAnAppointment-async" */ './BookAnAppointment'
  ),
  options
);

export default BookAnAppointment;

/* eslint-enable extra-rules/no-commented-out-code */
