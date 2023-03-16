/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const QuizQnAComponent = universal(
  import(
    /* webpackChunkName: "QuizQnAComponent-component" */ './QuizQnAComponent'
  ),
  options
);

export default QuizQnAComponent;
/* eslint-enable extra-rules/no-commented-out-code */
