import { readFileSync, writeFileSync } from 'fs';
import { Runnable } from '../runnable-interface';
import { compareVersions } from '../compare-versions';

interface Dependency {
  name: String,
  version: String,
}

class SyncDeps implements Runnable {
  private readonly packagePrefix: string;

  private readonly packagePaths: string[];

  private readonly PACKAGEJSON = 'package.json';

  constructor(packagePaths: string[], packagePrefix: string = '') {
    this.packagePrefix = packagePrefix;
    this.packagePaths = packagePaths;   
  }

  public async run(): Promise<any> {
    const allFiles: Array<Object> = [];
    this.packagePaths.forEach((path) => {
      const currentFile = JSON.parse(readFileSync(`${path}/${this.PACKAGEJSON}`).toString());
      allFiles.push(currentFile);
    });

    allFiles.forEach((file => {
      const { dependencies, peerDependencies }: { dependencies: Dependency[]; peerDependencies: Dependency[] } = file;
      const depKeys = Object.keys(dependencies);
      depKeys.forEach(dep => {
        const clearedDep = dep.replace(this.packagePrefix, '');
        if (this.packagePaths.some(path => path.includes(clearedDep))) {
          const fileToCheck = allFiles.filter(depFile => depFile.name === dep)[0];
          if (fileToCheck && fileToCheck?.peerDependencies !== undefined) {
            const peerDepsToCheck = fileToCheck.peerDependencies;
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
      const fileToWrite = { ...file, ...dependencies, ...peerDependencies };
      const pathToWrite = this.packagePaths.filter(p => p.includes(file.name.replace(this.packagePrefix, '')));
      writeFileSync(`${pathToWrite[0]}/${this.PACKAGEJSON}`, JSON.stringify(fileToWrite));
    }));
  }
}

export { SyncDeps };