import { UpdateDependency } from '../src/sync-deps/UpdateDependeny';

test.each([
  [
    { a: '^1.0.0' },
    {},
    { a: '^1.1.0' },
    'a',
    { a: '^1.1.0' },
    {},
  ],
  [
    { a: '^1.0.0' },
    {},
    { b: '^1.1.0' },
    'b',
    {
      a: '^1.0.0',
      b: '^1.1.0',
    },
    {},
  ],
  [
    { a: '^1.0.0' },
    { b: '1.2.3' },
    { b: '^1.1.0' },
    'b',
    { 
      a: '^1.0.0',
      b: '^1.1.0',
    },
    { b: '^1.1.0' },
  ],
  [
    { 
      a: '^1.0.0',
      b: '^1.1.0',
    },
    { b: '1.2.3' },
    { b: '^1.0.0' },
    'b',
    { 
      a: '^1.0.0',
      b: '^1.1.0',
    },
    { b: '^1.1.0' },
  ],
  [
    { 
      a: '^1.0.0',
      b: '^1.1.0',
    },
    { b: '1.2.3' },
    { a: '^2.0.0' },
    'a',
    { 
      a: '^2.0.0',
      b: '^1.1.0',
    },
    { b: '1.2.3' },
  ],
])('should update dependencies in the right way', (
  currentDependencies,
  currentPeerDependencies,
  peerDepsToCheck,
  pdKey,
  expectedDeps,
  expetedPeerDeps,
) => {
  const updateDependency = new UpdateDependency();
  updateDependency.update(
    {
      currentDependencies,
      currentPeerDependencies,
      peerDepsToCheck,
      pdKey,
    },
  );

  expect(currentDependencies).toEqual(expectedDeps);
  expect(currentPeerDependencies).toEqual(expetedPeerDeps);
});