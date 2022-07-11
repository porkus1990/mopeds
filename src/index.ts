import * as readline from 'readline';
import { ReadJson } from './read.json/ReadJson';
import { SyncDeps } from './sync-deps/SyncDepsByPath';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

console.log('\x1b[36m%s\x1b[0m', 'specify path to packages folder and optional a prefix like @myPackage/ < slash is required. e.g. /full-path/packages @prefix/');

rl.on('line', async function (line) {
  const [path, prefix] = line.split(' ');
  const readJson = new ReadJson(path);
  const paths = await readJson.run();
    
  const syncDeps = new SyncDeps(paths, prefix ?? '');
  let changedSomething = false;
  while (!changedSomething) {
    changedSomething = await syncDeps.run();
  }
  process.exit(0);
});