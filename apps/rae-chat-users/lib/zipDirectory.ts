import * as zl from 'zip-lib';
import { existsSync } from 'fs';

/**
 * Compress contents of directory into a zip file
 *
 * @param folderPathToZip path to contents you want to compress.
 * @param zippedFileName path to output file including output file name.
 *
 * @returns path to output file including output file name.
 */
const zipDirectory = async (
    folderPathToZip: string,
    zippedFileName: string,
) => {
    return new Promise((resolve, reject) => {
        const cwd = process.cwd();
        const pathToZippedFile = `${cwd}/${zippedFileName}`;
        const sourceDirExists = existsSync(folderPathToZip);

        if (sourceDirExists) {
            zl.archiveFolder(
                folderPathToZip,
                pathToZippedFile,
            ).then(
                () => {
                    resolve(pathToZippedFile);
                },
                (err) => {
                    console.error(
                        'Error caught zipping file ->',
                        err,
                    );
                    reject(false);
                },
            );
        } else {
            console.error(
                'folderPathToZip directory does not exist, please check your path.',
            );
            reject(false);
        }
    });
};

export default zipDirectory;
