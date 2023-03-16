import { addToRegistryQuickPicks } from '../util';

describe(__filename, () => {
  it('should call addToRegistryQuickPicks', () => {
    const registry = {
      ownAndRecommendedRegistries: { profileRegistryList: {} },
    };
    const wrapper = addToRegistryQuickPicks(registry);
    expect(wrapper).to.equal(undefined);
  });
});
