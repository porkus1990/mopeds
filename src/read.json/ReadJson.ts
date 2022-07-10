import { readdirSync, statSync, readFileSync  } from 'fs';
import * as semver from 'semver';

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
    return paths;
  }

  private async readDirectories(): Promise<string[]> {
    const paths: string[] = [];

    const files = readdirSync(this.baseFolder);
    files.filter((dir) => statSync(`${this.baseFolder}/${dir}`)?.isDirectory())
      .map(dir => paths.push(`${this.baseFolder}/${dir}`));
            

    return paths;
  }
}

export { ReadJson };