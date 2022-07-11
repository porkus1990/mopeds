import * as path from 'path';
import { SyncDeps } from '../../src/sync-deps/SyncDeps';

test('should write correct json', () => {
  const paths = [
    path.join(__dirname, '../read-json/packages/package-a'),
    path.join(__dirname, '../read-json/packages/package-b'),
    path.join(__dirname, '../read-json/packages/package-c'),
  ];
  const sync = new SyncDeps(
    paths,
    '',
  );

  expect(() => sync.run()).not.toThrow();
});