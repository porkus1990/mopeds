import { Base } from './strategies/Base';
import { IStrategy } from './strategies/stretegy.interface';
import { IPackageType } from './strategies/packge.type';
import { IHandleContent } from './strategies/handle-change/handle-content.interface';

class SyncDepsByPath extends Base implements IStrategy {
  public async run(handleContent: IHandleContent): Promise<boolean> {
    let changed = false;
    const allFiles = this.getAllFiles();

    allFiles.forEach(((file: any) => {
      const clonedFile = JSON.parse(JSON.stringify(file));
      const { dependencies = {}, peerDependencies = {} } = clonedFile;
      const depKeys = Object.keys(dependencies);

      depKeys.forEach((dep: string) => {
        const clearedDep = dep.replace(this.packagePrefix, '');
        if (this.packagePaths.some(path => path.includes(clearedDep))) {

          const fileToCheck = allFiles.filter((depFile: IPackageType) => depFile?.name === dep)[0];
          if (fileToCheck && fileToCheck?.peerDependencies !== undefined) {
            const peerDepsToCheck = fileToCheck?.peerDependencies;
            Object.keys(peerDepsToCheck).forEach(pd => {
              this.updateDependency.update(
                {
                  currentDependencies: dependencies,
                  currentPeerDependencies: peerDependencies,
                  peerDepsToCheck,
                  pdKey: pd,
                },
              );
            });
          }
        }
      });
      const fileToWrite = { ...file, dependencies, peerDependencies };
      if (Object.keys(fileToWrite.dependencies).length === 0) delete fileToWrite.dependencies;
      if (Object.keys(fileToWrite.peerDependencies).length === 0) delete fileToWrite.peerDependencies;

      handleContent.handle(file, fileToWrite, this.packagePaths);

      changed = JSON.stringify(file) === JSON.stringify(fileToWrite);
    }));

    return changed;
  }
}

export { SyncDepsByPath };