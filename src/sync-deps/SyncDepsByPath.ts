import { compareVersions } from '../compare-versions';
import { Base } from './strategies/Base';
import { IStrategy } from './strategies/stretegy.interface';
import { IPackageType } from './strategies/packge.type';

class SyncDepsByPath extends Base implements IStrategy {
  public async run(): Promise<boolean> {
    let changed = false;
    const allFiles = this.getAllFiles();

    allFiles.forEach(((file: any) => {
      const { dependencies = {}, peerDependencies = {} } = file;
      const depKeys = Object.keys(dependencies);

      depKeys.forEach((dep: string) => {
        const clearedDep = dep.replace(this.packagePrefix, '');
        if (this.packagePaths.some(path => path.includes(clearedDep))) {
          const fileToCheck = allFiles.filter((depFile: IPackageType) => depFile?.name === dep)[0];
          if (fileToCheck && fileToCheck?.peerDependencies !== undefined) {
            const peerDepsToCheck = fileToCheck?.peerDependencies;
            Object.keys(peerDepsToCheck).forEach(pd => {
              if (dependencies[pd] === undefined) {
                dependencies[pd] = peerDepsToCheck[pd];
                if (peerDependencies[pd] !== undefined) {
                  peerDependencies[pd] = peerDepsToCheck[pd];
                }
              } else {
                const versionToUse = compareVersions(dependencies[pd], peerDepsToCheck[pd]);
                dependencies[pd] = versionToUse;
                if (peerDependencies[pd] !== undefined) {
                  peerDependencies[pd] = versionToUse;
                }
              }
            });
          }
        }
      });
      const fileToWrite = { ...file, dependencies, peerDependencies };

      changed = this.writeContent(file, fileToWrite);
    }));

    return changed;
  }
}

export { SyncDepsByPath };