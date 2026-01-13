import axios from "axios";
import config from "./config.js";
import chalk from "chalk";
    
async function submitExtract6(taskId) {
    const updateDocDetailsRequestConfig = {
        method: 'put',
        url: `valid url was here`,
        headers: {
            accept: 'application/json, text/plain, */*',
            authorization: `Bearer ${config.getStand().armToken}`
        },
        data: {} //valid data was here
    };
    const saveExtractionRequestConfig = {
        method: 'post',
        url: `valid url was here`,
        headers: {
            accept: 'application/json, text/plain, */*',
            authorization: `Bearer ${config.getStand().armToken}`
        },
        data: { } //valid data was here
    };
    const submitRequestConfig = {
        method: 'get',
        url: `valid url was here`,
        headers: {
            accept: 'application/json, text/plain, */*',
            authorization: `Bearer ${config.getStand().armToken}`
        }
    };
    try {
        await axios.request(updateDocDetailsRequestConfig);
        await axios.request(saveExtractionRequestConfig);
        await axios.request(submitRequestConfig);
    } catch(err) {console.error('Extract submit in ARM failed:', chalk.red(err.message))}
    
}

export default { submitExtract6 }