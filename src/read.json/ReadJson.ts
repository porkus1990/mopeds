import { readdir, lstat  } from 'fs';

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
            dirs.filter(async (dir) => {
                const stat = await lstat(dir, (_, stats) => {
                    return stats.isDirectory()
                });
                
                return stat;
            })
            .map(dir => paths.push(`${this.baseFolder}/${dir}`));
        });
            

        return paths;
    }
};

export { ReadJson };