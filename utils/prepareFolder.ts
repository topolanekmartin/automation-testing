import { ensureDir } from 'fs-extra';
import fs from 'fs';

export const prepareFolder = async (folderPath: string) => {
    await ensureDir(folderPath);

    console.log(`Setting permissions for ${folderPath}`);
    fs.chmod(folderPath, 0o777, (err) => {
        if (err) {
            throw err;
        }
    });

    console.log(`Cleaning ${folderPath}`);
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            throw err;
        }

        for (const file of files) {
            const filePath = `${folderPath}/${file}`;
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                fs.unlink(filePath, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            } else {
                fs.rm(filePath, { force: true, recursive: true }, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            }
        }
    });
};
