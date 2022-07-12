import { ReadJson } from './read.json/ReadJson';
import { Log } from './sync-deps/strategies/handle-change/Log';
import { SyncDepsByPath } from './sync-deps/SyncDepsByPath';

import { program } from 'commander';

program
  .option('-p, --path <path>', 'path to the folder where the packages live in')
  .option('-pf, --prefix <prefix>', 'package prefix like @name/ (slash is required)');

program
  .command('mopeds')
  .description('automatically fix peerDependency conflicts in monorepos or workspaces')
  .action(async () => {
    const readJson = new ReadJson(program.opts().path ?? '');
    const paths = await readJson.run();
      
    const syncDeps = new SyncDepsByPath(paths, program.opts().prefix ?? '');
    let changedSomething = false;
    while (!changedSomething) {
      changedSomething = await syncDeps.run(new Log);
    }
  });

program.parse(process.argv);
