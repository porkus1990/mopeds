import * as fs from 'fs';
import * as path from 'path';
import { ReadJson } from '../../src';

const testFilePath = path.join(__dirname, 'packages');

test('it should read all package.json files', async () => {
  const ReadJsonRunner = new ReadJson(testFilePath);
  const deps = await ReadJsonRunner.run();
    
  const expected = JSON.parse(fs.readFileSync(path.join(__dirname, 'mergeDep.result.json')).toString());

  expect(deps).toEqual(expected);
});