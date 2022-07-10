import { compareVersions } from '../src/compare-versions';

test.each([
  ['2.0.0', '2.0.1', '2.0.1'],
  ['^2.0.0', '^2.0.1', '^2.0.1'],
  ['~2.0.0', '~2.0.1', '~2.0.1'],
])('should return correct version', (versionA, versionB, expectedResult) => {
  expect(compareVersions(versionA, versionB)).toEqual(expectedResult);
});