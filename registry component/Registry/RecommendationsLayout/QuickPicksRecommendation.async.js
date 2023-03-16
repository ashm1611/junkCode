/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const QuickPicksRecommendation = universal(
  import(
    /* webpackChunkName: "registry-quickpicks" */ '../../../../containers/Pages/Registry/QuickPicks/Collection/QuickPicksCollection'
  ),
  options
);

export default QuickPicksRecommendation;
