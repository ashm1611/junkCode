import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import { makeSelectLabels } from '@bbb-app/selectors/configSelector';
import ReplaceItem from '../../../../components/Pages/Registry/ReplaceItem/ReplaceItem';

export const mapStateToProps = createStructuredSelector({
  labels: makeSelectLabels(['Registry']),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect, withSiteSpectTracker)(toJS(ReplaceItem));
