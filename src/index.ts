import * as readline from 'readline';
import { ReadJson } from './read.json/ReadJson';
import { SyncDeps } from './sync-deps/SyncDeps';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

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