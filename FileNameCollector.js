import fs from 'fs';
import path from 'path';

async function collectFilenames(dir, extension, filenames = []) {
    try {
        const entries = await fs.promises.readdir(dir);
        for (const entry of entries) {
            let fullPath = path.join(dir, entry);
            let fileStat = await fs.promises.stat(fullPath);
            if (fileStat.isDirectory()) {
                await collectFilenames(fullPath, extension, filenames);
            } else if (path.extname(entry) == extension) {
                filenames.push(fullPath);
            }
        }
    } catch (err) {
        console.error(err);
    }
   return filenames
}
async function returnFilenames(dir, extension) {
    const filenames = await collectFilenames(dir, extension);
    return filenames
}

export default { returnFilenames }