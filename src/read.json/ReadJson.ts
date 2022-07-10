import { readdirSync, statSync, readFileSync  } from 'fs';

interface Runnable {
  run(): Promise<Object>;
}

class ReadJson implements Runnable {
  private baseFolder: string;

  constructor(baseFolder: string) {
    this.baseFolder = baseFolder;
  }

  public async run(): Promise<Object> {
    const paths  = await this.readDirectories();
    return Promise.resolve(this.mergePackageJson(paths));
  }

  private mergePackageJson(paths: string[]) {
    const peerDeps: Object = {};

    paths.forEach(path => {
      const jsonFile =  JSON.parse(readFileSync(path).toString());
      const keys = Object.keys(jsonFile?.peerDependencies);
      keys.forEach((dep) => {
        if (peerDeps[dep] === undefined) {
          peerDeps[dep] = jsonFile.peerDependencies[dep];
        }
      });
    });

    return peerDeps;
  }

  private async readDirectories(): Promise<string[]> {
    const paths: string[] = [];

    const files = readdirSync(this.baseFolder);
    files.filter((dir) => statSync(`${this.baseFolder}/${dir}`)?.isDirectory())
      .map(dir => paths.push(`${this.baseFolder}/${dir}/package.json`));
            

    return paths;
  }
}

export { ReadJson };