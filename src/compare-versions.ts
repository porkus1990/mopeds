import * as semver from 'semver';

export const compareVersions = (versionA: string, versionB: string) => {
  const operator = Array.from(versionA)[0];
            
  if (isNaN(operator)) {
    const newDepCleaned = versionA.replace(operator, '');
    const oldDepCleaned = versionB.replace(operator, '');
    return semver.lt(newDepCleaned, oldDepCleaned) ? versionB : versionA;
  } else {
    return semver.lt(versionA, versionB) ? versionB : versionA;
  }
};