import * as path from 'path';
import { ReadJson } from '../../src/read.json/ReadJson';

const testFilePath = path.join(__dirname, 'packages');

test('it should read all package.json files', async () => {
  const ReadJsonRunner = new ReadJson(testFilePath);

  const paths =  await ReadJsonRunner.run();

  expect(paths?.length).toBeGreaterThan(0);
});