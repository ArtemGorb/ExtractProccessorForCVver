import path from 'path';
import { Client } from 'minio';
import config from './config.js';
import chalk from 'chalk';

const minioClient = new Client({
    endPoint: config.getStand().S3URL,
    port: config.getStand().S3Port,
    useSSL: false,
    accessKey: config.getStand().S3creds.accessKey,
    secretKey: config.getStand().S3creds.secretKey
})

async function addFiles(filename, folderName) {
    const res = await minioClient.fPutObject('', `${folderName}/${path.basename(filename)}`, filename);
    console.log(`${path.basename(filename)} added to S3 to smFolder/${folderName}, ${res.etag}`);
};

async function getExtracts(extractMetaDataObj) {
    const extractFilesNames = [config.getExtractSource().extractJsonName, 'validName.xml']
    await Promise.all(
        extractFilesNames.map(async (extractFilename) => {
            try{
                await minioClient.fGetObject('', `${extractMetaDataObj.extractUUID}/${extractFilename}`, 
                                                                    `${config.getExDir()}/${extractMetaDataObj.extractName}_${extractMetaDataObj.extractUUID}/${extractFilename}`);
                console.log(`${extractMetaDataObj.extractName}/${chalk.green(extractFilename)} downloaded succesfully`);
            } catch(err) {
                console.error(`${extractMetaDataObj.extractName}/${chalk.red(extractFilename)} download attempt failed: ${err}`)
            }
        })
    )
}

export default { addFiles, getExtracts }