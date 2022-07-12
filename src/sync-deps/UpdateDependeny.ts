import { compareVersions } from '../compare-versions';

class UpdateDependency {
  public update({ currentDependencies, currentPeerDependencies = {}, peerDepsToCheck,  pdKey }): void {
    if (currentDependencies[pdKey] === undefined) {
      currentDependencies[pdKey] = peerDepsToCheck[pdKey];
      if (currentPeerDependencies[pdKey] !== undefined) {
        currentPeerDependencies[pdKey] = peerDepsToCheck[pdKey];
      }
    } else {
      const versionToUse = compareVersions(currentDependencies[pdKey], peerDepsToCheck[pdKey]);
      currentDependencies[pdKey] = versionToUse;
      if (currentPeerDependencies[pdKey] !== undefined) {
        currentPeerDependencies[pdKey] = versionToUse;
      }
    }
  }
}

export { UpdateDependency };