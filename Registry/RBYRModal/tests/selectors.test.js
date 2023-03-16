import { fromJS } from 'immutable';
import {
  makeSelectRBYRLabels,
  makeSelectLabelsRegistry,
  selectSiteConfig,
} from '../selectors';

describe('makeSelectRBYRLabels', () => {
  const selector = makeSelectRBYRLabels();
  it('should select an object RBYRLabels', () => {
    const RBYRLabels = { labels: { Registry: { RBYR: {} } } };
    const mockedState = fromJS(RBYRLabels);
    expect(selector(mockedState)).to.deep.equal(
      fromJS(RBYRLabels.labels.Registry.RBYR)
    );
  });

  const selectLabelRegistry = makeSelectLabelsRegistry();
  it('should select an object for registryLabels', () => {
    const RBYRLabels = { labels: { Registry: {} } };
    const mockedState = fromJS(RBYRLabels);
    expect(selectLabelRegistry(mockedState)).to.deep.equal(
      fromJS(RBYRLabels.labels.Registry)
    );
  });

  it('should select an object siteconfig', () => {
    const state = fromJS({ viewportConfig: {} });
    const selectorSiteConfig = selectSiteConfig(state);
    expect(selectSiteConfig(state)).to.deep.equal(fromJS(selectorSiteConfig));
  });
});
