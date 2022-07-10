import { ReadJson } from '../../src';

test('it should read all package.json files', () => {
    const ReadJsonRunner = new ReadJson('packages');

    expect(ReadJsonRunner.run()).not.toThrow
});