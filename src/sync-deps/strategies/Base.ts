import { readFileSync } from 'fs';
import { IPackageType } from './packge.type';

abstract class Base {
  protected readonly packagePrefix: string;

  protected packagePaths: string[];

  protected readonly PACKAGEJSON = 'package.json';

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
}

export { Base };