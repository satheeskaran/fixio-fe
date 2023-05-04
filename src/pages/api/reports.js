import { readdir } from 'fs/promises';
import path from "path";
import { promises as fs } from 'fs';

//get all damage reports' UUIDs
export const getReports = async () => {
    const directoryPath = path.join(process.cwd(), "public/db");
    const fileNames = [];  

    const files = await readdir(directoryPath);
    files.forEach(function (file) {
        const extention = file.substring(file.indexOf(".") + 1, file.length);
        if(extention === 'json'){
            fileNames.push(file.substring(0, file.indexOf(".")));
        }
    })
    return {uuids: fileNames};
}

//get damage report by UUID
export const getReportByUUID = async (uuid) => {
    const jsonDirectory = path.join(process.cwd(), 'public/db');
    const fileContents = await fs.readFile(jsonDirectory + `/${uuid}.json`, 'utf8');
    return fileContents;
}
