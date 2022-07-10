import { readdir, statSync, writeFileSync  } from 'fs';

interface Runnable {
    run(): Promise<void>;
}

class ReadJson implements Runnable {
    private baseFolder: string;

    constructor(baseFolder: string) {
        this.baseFolder = baseFolder;
    }

    public async run(): Promise<void> {
        await this.readDirectories();
    }

    private async readDirectories(): Promise<string[]> {
        const paths: string[] = [];

        await readdir(this.baseFolder, (e, dirs) => {
            return dirs.filter((dir) => statSync(`${this.baseFolder}/${dir}`)?.isDirectory())
            .map(dir => paths.push(`${this.baseFolder}/${dir}`));
        });
            

        return paths;
    }
};

export { ReadJson };