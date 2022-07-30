import { readFileSync } from 'fs';
import { UpdateDependency } from '../UpdateDependeny';
import { IPackageType } from './packge.type';

abstract class Base {
  protected readonly packagePrefix: string;

  protected packagePaths: string[];

  protected readonly PACKAGEJSON = 'package.json';

  protected readonly updateDependency = new UpdateDependency();

  constructor(packagePaths: string[], packagePrefix: string = '') {
    this.packagePrefix = packagePrefix;
    this.packagePaths = packagePaths;   
  }

  protected getAllFiles(): IPackageType[] {
    const allFiles: Array<IPackageType> = [];
    this.packagePaths.forEach((path) => {
      const currentFile = JSON.parse(readFileSync(`${path}/${this.PACKAGEJSON}`).toString());
      allFiles.push(currentFile);
    });

    return allFiles;
  }

  protected sortDeps(deps: Record<string, string> | undefined) {
    if (!deps) return deps;

    return Object.keys(deps)
      .sort()
      .reduce((acc, key) => {
        acc[key] = deps[key];
  
        return acc;
      }, {});
  }
}

export { Base };