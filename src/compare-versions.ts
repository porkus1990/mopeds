import * as semver from 'semver';

export const compareVersions = (versionA: string, versionB: string) => {
  try {
    let operator: any = Array.from(versionA)[0];
    if (operator !== '^' && operator !== '~') {
      operator = Array.from(versionB)[0];
    }
            
    if (isNaN(operator)) {
      const newDepCleaned = versionA.replace(operator, '');
      const oldDepCleaned = versionB.replace(operator, '');
      return semver.lt(newDepCleaned, oldDepCleaned) ? versionB : versionA;
    } else {
      return semver.lt(versionA, versionB) ? versionB : versionA;
    }
  } catch {
    return versionA;
  }
};