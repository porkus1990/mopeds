import { readFileSync } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { ReadJson } from '../../read.json/ReadJson';
import { SyncDepsByPath } from '../SyncDepsByPath';
import { IHandleContent } from './handle-change/handle-content.interface';
import { IStrategy } from './stretegy.interface';

class Lerna implements IStrategy {

  private readonly runFor: string[];

  private readonly packagePrefix: string;

  constructor(packagePrefix: string = '') {
    this.packagePrefix = packagePrefix;
    const lernaConfig = JSON.parse(readFileSync(
      path.resolve(process.cwd(), './package.json'),
    ).toString());

    const runFor = lernaConfig.packages ?? [];
    this.runFor = runFor.map(rfor => rfor.replace('/*', ''));
  }

  public run(handleContent: IHandleContent): Promise<boolean> {
    if (this.runFor.length === 0) {
      console.error(
        chalk.red.bold('invalid config given - could not find any packages to sync'),
      );
      process.exit(1);
    }
    let changedSomething = false;
    this.runFor.forEach(async (rfor: string) => {
      const packages = await (new ReadJson(rfor)).run();
      const syncDeps = new SyncDepsByPath(packages, this.packagePrefix);
      changedSomething = await syncDeps.run(handleContent);
    });

    return Promise.resolve(changedSomething);
  }
}

export { Lerna };