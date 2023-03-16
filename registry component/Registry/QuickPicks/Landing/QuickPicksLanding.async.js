/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { compile } from 'path-to-regexp';
import { options } from '@bbb-app/universal-component/options';
import { ROUTE_REGISTRY_QUICK_PICKS_LANDING } from '@bbb-app/constants/route/route';
export const toPath = compile(ROUTE_REGISTRY_QUICK_PICKS_LANDING);
const QuickPicksLanding = universal(
  import(/* webpackChunkName: "QuickPicksLanding" */ './QuickPicksLanding'),
  options
);
export default QuickPicksLanding;
/* eslint-enable extra-rules/no-commented-out-code */
