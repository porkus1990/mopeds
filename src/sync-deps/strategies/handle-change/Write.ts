import { writeFileSync } from 'fs';
import { IPackageType } from '../packge.type';
import { IHandleContent } from './handle-content.interface';

class Write implements IHandleContent {
  public handle(oldFile: IPackageType, newFile: IPackageType, paths: string[]): boolean {
    const oldFileStringified = JSON.stringify(oldFile, null, 2);
    const newFileStringified = JSON.stringify(newFile, null, 2);
    if (oldFileStringified !== newFileStringified) {
      let prefix = oldFile.name.split('/')[0] ?? '';
      if (prefix !== '') {
        prefix = `${prefix}/`;
      }

      const pathToWrite = paths.filter(p => p.includes(oldFile?.name.replace(prefix, '')));
          
      writeFileSync(`${pathToWrite[0]}/package.json`, JSON.stringify(newFile, null, 2));
          
      return true;
    }
    
    return false;
  } 
}

export { Write };