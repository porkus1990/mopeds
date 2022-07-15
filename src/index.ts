import { ReadJson } from './read.json/ReadJson';
import { Log } from './sync-deps/strategies/handle-change/Log';
import { SyncDepsByPath } from './sync-deps/SyncDepsByPath';

import { program } from 'commander';
import { IStrategy } from './sync-deps/strategies/stretegy.interface';
import { Lerna } from './sync-deps/strategies/Lerna';
import { Workspace } from './sync-deps/strategies/Workspace';
import { Write } from './sync-deps/strategies/handle-change/Write';

program
  .option('-p, --path <path>', 'path to the folder where the packages live in', '')
  .option('-pf, --prefix <prefix>', 'package prefix like @name/ (slash is required, if set)', '')
  .option('-m, --mode <mode>', 'set lerna or workspace')
  .option('-dry, --dryRun', 'use dryRun and see what woulb be changed', false)
;

program
  .command('mopeds')
  .description('automatically fix peerDependency conflicts in monorepos or workspaces')
  .action(async () => {
    let strategy: IStrategy;
    switch (program.opts().mode) {
      case 'lerna':
        strategy = new Lerna(program.opts().prefix ?? '');
        break;
      case 'workspace':
        strategy = new Workspace(program.opts().prefix ?? '');
        break;
      default:
        const readJson = new ReadJson(program.opts().path ?? '');
        const paths = await readJson.run();
        strategy = new SyncDepsByPath(paths, program.opts().prefix ?? '');
        break;
    }

    const handleContent = program.opts().dryRun ? new Log : new Write;
    let changedSomething = false;
    while (!changedSomething) {
      changedSomething = await strategy.run(handleContent);
    }
  });

program.parse(process.argv);
