"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadJson = void 0;
const fs_1 = require("fs");
class ReadJson {
    baseFolder;
    constructor(baseFolder) {
        this.baseFolder = baseFolder;
    }
    async run() {
        await this.readDirectories();
    }
    async readDirectories() {
        const paths = [];
        await (0, fs_1.readdir)(this.baseFolder, (e, dirs) => {
            dirs.filter(async (dir) => {
                const stat = await (0, fs_1.lstat)(dir, (_, stats) => {
                    return stats.isDirectory();
                });
                return stat;
            })
                .map(dir => paths.push(`${this.baseFolder}/${dir}`));
        });
        return paths;
    }
}
exports.ReadJson = ReadJson;

