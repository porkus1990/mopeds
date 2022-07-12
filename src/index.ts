import * as readline from 'readline';
import { ReadJson } from './read.json/ReadJson';
import { Log } from './sync-deps/strategies/handle-change/Log';
import { Write } from './sync-deps/strategies/handle-change/Write';
import { SyncDepsByPath } from './sync-deps/SyncDepsByPath';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

console.log('\x1b[36m%s\x1b[0m', 'specify path to packages folder and optional a prefix like @myPackage/ < slash is required. e.g. /full-path/packages @prefix/');

rl.on('line', async function (line) {
  let contentDealing = new Write;
  const [path, prefix, dryRun] = line.split(' ');
  
  if (dryRun) {
    contentDealing = new Log;
  }

  const readJson = new ReadJson(path);
  const paths = await readJson.run();
    
  const syncDeps = new SyncDepsByPath(paths, prefix ?? '');
  let changedSomething = false;
  while (!changedSomething) {
    changedSomething = await syncDeps.run(contentDealing);
  }
  process.exit(0);
});