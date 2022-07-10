import * as path from 'path';
import { ReadJson } from '../../src';

const testFilePath = path.join(__dirname, 'packages');

test('it should read all package.json files', async () => {
  const ReadJsonRunner = new ReadJson(testFilePath);

  expect(() => ReadJsonRunner.run()).not.toThrow();
});