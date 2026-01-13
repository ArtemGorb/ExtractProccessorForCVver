import axios from 'axios';
import { v4 as uuid } from 'uuid';
import dataCacheAddRequest from './dataCacheAddRequest.js';
import config from './config.js';
import PostresqlDBoperator from './PostresqlDBoperator.js';
import ARMoperator from './ARMoperator.js';
import BusinessCheckMocker from './BusinessChecksMocker.js';
import chalk from 'chalk';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendRequestForExtract(fileName) {
    const requestId = uuid();
    const insertDataCacheResult = await dataCacheAddRequest.insertDataCache(requestId);
    console.log(insertDataCacheResult);
    await BusinessCheckMocker.addBusinessCheck(requestId)
    await sleep(1000)
    let requestConfig = {}
    switch (config.getExtractConf().ExtractKind) {
        case '104': {
            requestConfig = {} //axios request config for RabbitMQ was here
            await axios.request(requestConfig);
            await sleep(1500);
            const taskId = await PostresqlDBoperator.getTaskId(requestId);
            await ARMoperator.submitExtract6(taskId);
        };
        break;
        case '118':
        case '121': {
            requestConfig = {} //axios request config for RabbitMQ was here
            axios.request(requestConfig)
        };
        break;
        default: {
            requestConfig = {} //axios request config for RabbitMQ was here
            axios.request(requestConfig)
            };
        break;
    };
    console.log(`${requestId} - ${fileName}`);
    console.log(requestConfig.data.payload);
    checkExtractStatus(requestId, fileName)
    return {
        "extractName": fileName.slice(0, -5),
        "extractUUID": requestId
    };
};

async function checkExtractStatus(uuid, fileName) {
    let isExtractMonitorFinish = false;
    setTimeout(() => {
        if(!isExtractMonitorFinish) {
            console.log('Extract building takes too long. Monitor out')
            isExtractMonitorFinish = true
        }
    }, 600000);
    await sleep(4000)
    try {
        while (!isExtractMonitorFinish) {
                const extractStatus = await PostresqlDBoperator.getExtractBuildingStatus(uuid); 
                switch (extractStatus) {
                    case 'RESPONSE_PUBLISHED': {
                        isExtractMonitorFinish = true
                        console.log(chalk.green(`Extract built: ${fileName.slice(0, -5)} - ${uuid}`))
                    }
                        break;
                    case 'SYSTEM_ERR_FIN': {
                        isExtractMonitorFinish = true
                        console.log(chalk.red(`Extract failed: ${fileName.slice(0, -5)} - ${uuid}`))
                    }
                        break;
                }
                await sleep(10000)
        }
    } catch(err) { console.error(err)};
}

export default { sendRequestForExtract }