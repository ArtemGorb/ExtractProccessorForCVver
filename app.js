import readline from 'readline';
import XMLtoJSONconverter from './XMLtoJSONconverter.js';
import FileNameCollector from './FileNameCollector.js';
import path from 'path';
import S3operator from './S3operator.js';
import ExtractProducer from './ExtractProducer.js';
import config from './config.js';
import fileSysOperator from './FileSysOperator.js';
import ExtractsValidator from './ExtractsValidator.js'
import ExtractXSDdeterminer from './ExtractXSDdeterminer.js';
import chalk from 'chalk';
import PostresqlDBoperator from './PostresqlDBoperator.js';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let userChoice = null;

async function operationChoice() {
    let filenames;
    
    while(userChoice !== '0') {
        console.log(chalk.gray(`Выберите требуемую операцию: 
            1 - Конвертировать XML реквеста в JSON; 
            2 - Добавить файлы в S3; 
            3 - Отправить запросы на выписки
            4 - Выкачать сформированные выписки из S3
            5 - Валидировать синтаксис json полученных выписок
            6 - Валидировать xml полученных выписок по xsd схемам
            7 - Проверить xml выписок на пустые теги
            8 - Очистить папку Extracts
            9 - Очистить папку Requests
            0 - Выход`));
        
        userChoice = await new Promise(resolve => {
            rl.question("Ваш выбор?:", resolve);
        });
        
        switch (userChoice) {
            case '1':
                {
                    filenames = await FileNameCollector.returnFilenames(config.getRootDir(), '.xml');
                    await Promise.all( 
                        filenames.map(element => {
                            XMLtoJSONconverter.sendRequest(element)
                        })
                    )
                };
            break;
            case '2':
                {
                    filenames = await FileNameCollector.returnFilenames(config.getRootDir(), '.json');
                    console.log(filenames);
                    await Promise.all( 
                        filenames.map(async element => {
                            await S3operator.addFiles(element, config.getExtractConf().S3FolderName);
                        })
                   )
                }
            break;
            case '3':   
                {
                    fileSysOperator.deleteFile('requests.txt')
                    filenames = await FileNameCollector.returnFilenames(config.getRootDir(), '.json');
                    //console.log(filenames);
                    const allRequestsDoneUuids = await Promise.all(
                        filenames.map(element => {
                        return ExtractProducer.sendRequestForExtract(path.basename(element));
                        })
                    )
                    Promise.all(allRequestsDoneUuids)
                        .then((uuids) => fileSysOperator.writeFile('requests.txt', './', JSON.stringify(uuids),
                            'UUIDs saved'))
                };
            break;
            case '4':
                {
                    const extractMetaData = JSON.parse(fileSysOperator.readFileAndStore('./requests.txt'));
                    await Promise.all( 
                        extractMetaData.map(async extractMetaDataObj => {
                            await S3operator.getExtracts(extractMetaDataObj)
                        })
                    )
                };
            break;
            case '5':
                {
                    filenames = await FileNameCollector.returnFilenames(config.getExDir(), '.json'); 
                    filenames.forEach(element => {
                        ExtractsValidator.validateJSON(element);
                    })
                };
            break;
            case '6':
                {
                        filenames = await FileNameCollector.returnFilenames(config.getExDir(), '.xml');
                    await Promise.all( 
                        filenames.map(async element => {
                            const xsdName = ExtractXSDdeterminer.determineXSDname(element);
                            await ExtractsValidator.validateXML(element, xsdName);
                        })
                    )
                }
            break;
            case '7':
                {
                    filenames = await FileNameCollector.returnFilenames(config.getExDir(), '.xml');
                    filenames.forEach(async element => {
                        ExtractsValidator.emptyTagFinder(element);
                    })
                };
            break;
            case '8': {
                const content = fs.readdirSync('./Extracts')
                content.forEach((dir) => fs.rmSync(`./Extracts/${dir}`, { recursive: true, force: true }))
                console.log(chalk.green('Extracts folder cleaned'))
            };
            break;
            case '9': {
                const content = fs.readdirSync('./Requests')
                content.forEach((entry) => fs.rmSync(`./Requests/${entry}`, { recursive: true, force: true }))
                console.log(chalk.green('Requests folder cleaned'))
            };
            break; 
            case '0': {
                await PostresqlDBoperator.closePgConnection()
                process.exit()
            };
        };
    };
};
operationChoice().then(() => {
    rl.close();
});