import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import toJS from '@bbb-app/hoc/toJS';
import { makeSelectThirdPartyConfig } from '@bbb-app/selectors/configSelector';

import ReplaceModalForNandDComponent from '../../../../components/Pages/Registry/ReplaceModalForNandD/ReplaceModalForNandD';

export const mapStateToProps = createStructuredSelector({
  certonaConfig: makeSelectThirdPartyConfig('certona'),
});
export const mapDispatchToProps = dispatch => {
  return {
    fireTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ReplaceModalForNandDComponent));
