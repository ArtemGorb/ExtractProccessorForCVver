import xml2js from 'xml2js';
import fs from 'fs';
import config from './config.js';
import chalk from 'chalk';

function determineXSDname(extractPath) {
    try {
        const parser = new xml2js.Parser();
        let xsdName = null;
        const xmldata = fs.readFileSync(extractPath);
        parser.parseString(xmldata, function(err, result){
            xsdName = `${Object.keys(result)[0]}_${config.getXsdVer()}.xsd`
        });
        return xsdName;
    } catch(err) { console.log(chalk.red(`Couldn't determine xsd in ${extractPath} error: ${err}`)) }
}
export default { determineXSDname };