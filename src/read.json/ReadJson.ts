import { readdirSync, statSync  } from 'fs';

class ReadJson {
  private baseFolder: string;

  constructor(baseFolder: string) {
    this.baseFolder = baseFolder;
  }

  public async run(): Promise<Array<string>> {
    const paths  = await this.readDirectories();
    return paths?.length ? paths : [];
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