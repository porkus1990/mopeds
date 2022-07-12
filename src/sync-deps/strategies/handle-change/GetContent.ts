import { IPackageType } from '../packge.type';
import { IHandleContent } from './handle-content.interface';

class GetContent implements IHandleContent {
  public handle(oldFile: IPackageType, newFile: IPackageType): string {
    if (oldFile !== newFile) {
      return JSON.stringify(newFile, null, 2);
    }

    return '';
  }
}

export { GetContent };