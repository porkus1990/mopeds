import * as path from 'path';
import { Log } from '../../src/sync-deps/strategies/handle-change/Log';
import { SyncDepsByPath } from '../../src/sync-deps/SyncDepsByPath';

test('should write correct json', () => {
  const paths = [
    path.join(__dirname, '../read-json/packages/package-a'),
    path.join(__dirname, '../read-json/packages/package-b'),
    path.join(__dirname, '../read-json/packages/package-c'),
  ];
  const sync = new SyncDepsByPath(
    paths,
    '',
  );

  expect(() => sync.run(new Log)).not.toThrow();
});