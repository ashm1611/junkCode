/**
 * In case registry is not active registry and a College/Mover/Pack & Hold list is active.
 * On using QuickPicks functionality to add items to registry, ensure that item is added to Registry, not NRIC.
 * @param {*} registry
 */

export const addToRegistryQuickPicks = registry => {
  let activeRegistryObj = registry.activeRegistry;
  let registryIsActive = false;
  const profileRegistryList =
    registry.ownAndRecommendedRegistries.profileRegistryList;
  if (profileRegistryList.length > 0) {
    for (let i = 0; i <= profileRegistryList.length - 1; i += 1) {
      if (
        registry.activeRegistry.registryId === profileRegistryList[i].registryId
      ) {
        activeRegistryObj = registry.activeRegistry;
        registryIsActive = true;
        break;
      }
    }
    if (!registryIsActive) {
      activeRegistryObj = registry.soonestRegistry;
    }
  }
  return activeRegistryObj;
};
