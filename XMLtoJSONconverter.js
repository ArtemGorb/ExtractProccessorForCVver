import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

function sendRequest(filename) {
    let xml = new FormData();
    xml.append('xml', fs.createReadStream(filename));

    const requestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'valid url was here',
        headers: {
            'accept': 'application/octet-stream',
            ...xml.getHeaders()
        },
        data: xml
    }
    console.log(`XML converting ${filename}`);
    axios.request(requestConfig)
        .then((response) => {
            fs.writeFile(`${path.dirname(filename)}/${path.basename(filename, '.xml')}.json`, JSON.stringify(response.data), () => console.log('XML converted'))})
        }

export default {sendRequest}