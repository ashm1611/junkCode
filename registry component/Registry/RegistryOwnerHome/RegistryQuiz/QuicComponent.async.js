/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const QuizComponent = universal(
  import(
    /* webpackChunkName: "QuizComponent-questionnare" */ './QuizComponent'
  ),
  options
);

export default QuizComponent;
/* eslint-enable extra-rules/no-commented-out-code */
