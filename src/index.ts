import { ReadJson } from './read.json/ReadJson';
import { Log } from './sync-deps/strategies/handle-change/Log';
import { SyncDepsByPath } from './sync-deps/SyncDepsByPath';

import { program } from 'commander';

program
  .command('mopeds')
  .description('automatically fix peerDependency conflicts in monorepos or workspaces')
  .argument('[path]', 'path to the folder where the packages live in', '')
  .argument('[prefix]', 'package prefix like @name/ (slash is required)', '')
  .action(async (path, prefix) => {
    const readJson = new ReadJson(path);
    const paths = await readJson.run();
      
    const syncDeps = new SyncDepsByPath(paths, prefix ?? '');
    let changedSomething = false;
    while (!changedSomething) {
      changedSomething = await syncDeps.run(new Log);
    }
  });

program.parse();
