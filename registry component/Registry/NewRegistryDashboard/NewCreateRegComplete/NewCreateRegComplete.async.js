/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const NewCreateRegComplete = universal(
  import(
    /* webpackChunkName: "lazy-personalized-questionnare" */ './NewCreateRegComplete'
  ),
  options
);

export default NewCreateRegComplete;
/* eslint-enable extra-rules/no-commented-out-code */
