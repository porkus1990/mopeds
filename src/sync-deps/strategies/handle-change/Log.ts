import { IPackageType } from '../packge.type';
import { IHandleContent } from './handle-content.interface';

class Log implements IHandleContent {
  public handle(oldFile: IPackageType, newFile: IPackageType): boolean {
    if (oldFile !== newFile) {
      console.info(
        'would have replaced \n',
        JSON.stringify(oldFile, null, 2),
        '\n with \n',
        JSON.stringify(newFile, null, 2),
      );

      return true;
    }

    return false;
  }
}

export { Log };