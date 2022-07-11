import { readFileSync, writeFileSync } from 'fs';
import { IPackageType } from './packge.type';

abstract class Base {
  protected readonly packagePrefix: string;

  protected readonly packagePaths: string[];

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

  protected writeContent(oldFile: IPackageType, newFile: IPackageType): boolean {
    if (oldFile !== newFile) {
      const pathToWrite = this.packagePaths.filter(p => p.includes(oldFile?.name.replace(this.packagePrefix, '')));
      writeFileSync(`${pathToWrite[0]}/${this.PACKAGEJSON}`, JSON.stringify(newFile));
      return true;
    }

    return false;
  } 
}

export { Base };