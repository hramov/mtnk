import {appendFile, FileHandle, mkdir, open, readFile, stat, writeFile,} from 'fs/promises';
import {join} from 'path';
import {IFileSystem} from "../../Core/ICore";

let instance: FileHelper;

export class FileHelper implements IFileSystem {
	private readonly basePath: string = process.env.FILE_BASE_PATH;
	private readonly logsBasePath: string = process.env.LOGS_PATH;

	constructor() {
		if (instance) return instance;
		this.checkDirs(this.logsBasePath).catch((err: unknown) => console.error(err));
		instance = this;
	}

	async checkDirs(dir?: string) {
		try {
			await stat(join(this.basePath, dir));
		} catch (err) {
			await mkdir(join(this.basePath, dir), {
				recursive: true,
			});
		}
	}

	async open(filename: string): Promise<FileHandle | Error> {
		try {
			return open(join(this.basePath, filename));
		} catch (err) {
			return err;
		}
	}

	async read(filename: string): Promise<string | Error> {
		try {
			return readFile(join(this.basePath, filename), {
				encoding: 'utf-8',
			});
		} catch (err) {
			return err;
		}
	}

	async write(filename: string, data: string): Promise<void | Error> {
		try {
			await writeFile(join(this.basePath, filename), data, {
				encoding: 'utf-8',
			});
		} catch (err) {
			return err;
		}
	}

	async append(filename: string, data: string): Promise<void | Error> {
		try {
			await appendFile(join(this.basePath, filename), data, {
				encoding: 'utf-8',
			});
		} catch (err) {
			return err;
		}
	}
}
