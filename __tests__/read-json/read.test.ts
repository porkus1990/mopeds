import * as path from 'path';
import { ReadJson } from '../../src';

test('it should read all package.json files', () => {
    const ReadJsonRunner = new ReadJson(path.join(__dirname, 'packages'));
    
    expect(() => ReadJsonRunner.run()).not.toThrow();
});