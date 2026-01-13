import { Client } from 'pg';
import config from './config.js';


const fbpsClient = new Client(config.getStand().PostgreSQLcreds);
if (!fbpsClient._connected) await fbpsClient.connect()

async function getTaskId(requestId) {
    try {
        const result = await fbpsClient.query(`select task_id from "valid table name was here" where request_id = '${requestId}'`)
        return result.rows[0].task_id
    } catch(err){ console.error('Fetching from DB error:', err)} 
};

async function getExtractBuildingStatus(requestId) {
    try {
        const result = await fbpsClient.query(`select current_state from "valid table name was here" where request_id = '${requestId}'`)
        return result.rows[0]?.current_state
    } catch(err){ console.error('Fetching from DB error:', err) }   
};

async function closePgConnection() { 
    fbpsClient.end()
}
export default { getTaskId, getExtractBuildingStatus, closePgConnection }
