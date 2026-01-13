import fs from 'fs';
import xmlValidator from 'xsd-schema-validator';
import path from 'path';
import chalk from 'chalk';


function validateJSON (extractPath) {
    const reduceExtractPath = () => {
            const filename = path.basename(extractPath);
            const dirName = path.dirname(extractPath).split(path.sep).pop();
            return `${dirName}/${filename}`;
        }
    try {
        JSON.parse(fs.readFileSync(extractPath));
        console.log(`${chalk.green(reduceExtractPath())} is valid json`)
    } catch(err) {console.error(`${chalk.red(reduceExtractPath())} has ${err.message}`) }
}

async function validateXML (extractPath, xsdName) {
    const reduceExtractPath = () => {
            const filename = path.basename(extractPath);
            const dirName = path.dirname(extractPath).split(path.sep).pop();
            return `${dirName}/${filename}`;
        }
    try {
        let xsdPath
        
        switch(xsdName) {
        default: xsdPath = `xsd/${xsdName}`
            break;
        case 'case value 1 was here': xsdPath = 'some path'
            break; 
        case 'case value 2 was here': xsdPath = 'some path'
            break;
        case 'case value 3 was here': xsdPath = 'some path'
            break;
        case 'case value 4 was here': xsdPath = 'some path'
            break;
        case 'case value 5 was here': xsdPath = 'some path'
            break;
        case 'case value 6 was here': xsdPath = 'some path'
            break;
        }
        
        const result = await xmlValidator.validateXML({file: extractPath}, xsdPath)
            if(result.valid) console.log(`${chalk.green(reduceExtractPath())} valid against ${chalk.cyan(xsdName)}`)
            
    } catch (err) {
        console.error(`${chalk.red(reduceExtractPath())} ${err.messages} against ${chalk.cyan(xsdName)}`)
    }
}

function emptyTagFinder(extractPath) {
    const xmlString = Buffer.from(fs.readFileSync(extractPath)).toString()
    const regexPattern1 = /<([\w:-]+)\/>/g;
    const regexPattern2 = /<([\w:-]+)>(?:\s*)<\/\\1>/g;
    const reduceExtractPath = () => {
                const filename = path.basename(extractPath);
                const dirName = path.dirname(extractPath).split(path.sep).pop();
                return `${dirName}/${filename}`;
            }
    
    const hits = [];
    if(xmlString.match(regexPattern1) != null) hits.push(xmlString.match(regexPattern1));
    if(xmlString.match(regexPattern2) != null) hits.push(xmlString.match(regexPattern2));
    const uniqueHits = new Set(...hits);
    
    uniqueHits.size > 0 ? 
    console.log(`${chalk.red(reduceExtractPath())} empty tags found: ${chalk.cyan(...uniqueHits)}`) : 
    console.log(`${chalk.green(reduceExtractPath())} No empty tags found`);
}

export default { validateJSON, validateXML, emptyTagFinder } 