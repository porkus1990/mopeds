import { readFileSync } from 'fs';
import { ReadJson } from '../../read.json/ReadJson';
import { SyncDepsByPath } from '../SyncDepsByPath';
import { IHandleContent } from './handle-change/handle-content.interface';
import { IStrategy } from './stretegy.interface';

class Workspace implements IStrategy {
  private readonly runFor: string[];

  private readonly packagePrefix: string;
    
  constructor(packagePrefix: string = '') {
    this.packagePrefix = packagePrefix;

    const packageJsonFile = JSON.parse(readFileSync('./package.json').toString());

    this.runFor = packageJsonFile.workspaces;
  }

  public run(handleContent: IHandleContent): Promise<boolean> {
    let changedSomething = false;
    this.runFor.forEach(async (rfor: string) => {
      const packages = await (new ReadJson(rfor)).run();
      const syncDeps = new SyncDepsByPath(packages, this.packagePrefix);
      changedSomething = await syncDeps.run(handleContent);
    });

    return Promise.resolve(changedSomething);
  }
}

export { Workspace };