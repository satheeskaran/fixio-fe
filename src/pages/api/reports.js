import { readdir } from 'fs/promises';
import path from "path";
import { promises as fs } from 'fs';

export const getReports = async () => {
    const directoryPath = path.join(__dirname, "../../../../public/db");
    const fileNames = [];  

    const files = await readdir(directoryPath);
    files.forEach(function (file) {
        fileNames.push(file.substring(0, file.indexOf(".")));
    })
    return {uuids: fileNames};
}

export const getReportByUUID = async (uuid) => {
    const jsonDirectory = path.join(process.cwd(), 'public/db');
    const fileContents = await fs.readFile(jsonDirectory + `/${uuid}.json`, 'utf8');
    return fileContents;
}
