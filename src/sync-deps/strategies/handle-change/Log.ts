import chalk from 'chalk';
import { IPackageType } from '../packge.type';
import { IHandleContent } from './handle-content.interface';

class Log implements IHandleContent {
  public handle(oldFile: IPackageType, newFile: IPackageType): boolean {
    const oldFileStringified = JSON.stringify(oldFile, null, 2);
    const newFileStringified = JSON.stringify(newFile, null, 2);
    if (oldFileStringified !== newFileStringified) {
      console.info(
        'would have replaced \n\n',
        chalk.red.bold(oldFileStringified),
        '\n\n with \n\n',
        chalk.green.bold(newFileStringified),
        '\n',
      );

      return true;
    }

    return false;
  }
}

export { Log };