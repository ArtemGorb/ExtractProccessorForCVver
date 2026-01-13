import path from 'path';

//Конфиги тестовых стендов
const HFTest = {
    standName: "",
    rabbitURL: '',
    S3URL: '',
    S3Port: '',
    grpcHOST: '',
    armBackUrl: '',
    armToken: '',
    S3creds: {
        accessKey: "",
        secretKey: ""
    },
    PostgreSQLcreds: {
        host: '',
        port: null,
        database: '',
        user: '',
        password: ''
    }
};
const HF = {
    standName: "",
    rabbitURL: '',
    S3URL: '',
    grpcHOST: '',
    armBackUrl: '',
    armToken: '',
    S3creds: {
        accessKey: "",
        secretKey: ""
    },
    PostgreSQLcreds: {
        host: '',
        port: null,
        database: '',
        user: '',
        password: ''
    }
};

//Конфиги атрибутов выписок
const Ex0 = { //18 Уведомление для Выписки 0
    S3FolderName: "Extract0",
    ExtractKind: ""
};
const Ex1 = {
    S3FolderName: "Extract1",
    ExtractKind: ""
};
const Ex2 = {
    S3FolderName: "Extract2",
    ExtractKind: ""
};
const Ex3 = {
    S3FolderName: "Extract3",
    ExtractKind: ""
};
const Ex4 = {
    S3FolderName: "Extract4",
    ExtractKind: ""
};
const Ex5 = {
    S3FolderName: "Extract5",
    ExtractKind: ""
};
const Ex6 = {
    S3FolderName: "Extract6",
    ExtractKind: ""
};
const Ex7 = {
    S3FolderName: "Extract7",
    ExtractKind: ""
};
const Ex8 = {
    S3FolderName: "Extract8",
    ExtractKind: ""
};
const Ex9 = {
    S3FolderName: "Extract9",
    ExtractKind: ""
};
const Ex10 = {
    S3FolderName: "Extract10",
    ExtractKind: ""
};
const Ex11 = {
    S3FolderName: "Extract11",
    ExtractKind: ""
};
const Ex12 = {
    S3FolderName: "Extract12",
    ExtractKind: ""
};
const Ex14 = {
    S3FolderName: "Extract14",
    ExtractKind: ""
};
const Ex16 = {
    S3FolderName: "Extract16",
    ExtractKind: ""
};
const Ex20 = {
    S3FolderName: "Extract20",
    ExtractKind: ""
};
const Ex21 = {
    S3FolderName: "Extract21",
    ExtractKind: ""
};
//Конфиги источников выписки
const nsud = {
    routingKey: () => {
        if (getExtractConf().ExtractKind == '') return 'valid rabbit query was here'
        else return 'another valid rabbit query was here'
    },
    vhost: '',
    extractJsonName: '',
    grpcPORT: () => {
        switch(getStand().standName) {
            case 'HFTest': return 'int';
            case 'HF': return 'another int';
        }
    }
};
const fbhd = {
    routingKey: () => {
        if (getExtractConf().ExtractKind == '') { return 'valid rabbit query was here' } 
        else { return 'another valid rabbit query was here' }
    },
    vhost: () => {
        if (getExtractConf().ExtractKind == '') { return 'valid vhost' } else { return 'another valid vhost' }
    },
    extractJsonName: '',
    grpcPORT: () => {
        switch(getStand().standName) {
            case 'HFTest': return 'sm int';
            case 'HF': return 'another int';
        }
    }  
}

//User Config
//Номер получаемой выписки
    const extractConf = Ex14
//Тестовый стенд
    const stand = HFTest;
//Источник выписки
    const extractSource = fbhd

//Указать папку в корне где лежат выписки(не менять без лишней надобности)
    const rootDir = path.resolve("Requests");
//Папка где находятся скачанные выписки
    const exDir = path.resolve("Extracts");
//Parent UUID for data cache
    const parentId = '4d0c268b-6134-46b4-8f33-3e90aa15adc1'
//Версия XSD схем
    const xsdVer = 3

const getRootDir = () => rootDir;
const getExtractConf = () => extractConf
const getStand = () => stand;
const getParentId = () => parentId;
const getExDir = () => exDir;
const getXsdVer = () => {
    if(xsdVer == 2) return 'v02'
    else if(xsdVer == 3) return 'v03' ;
}
const getExtractSource = () => extractSource
export default { getRootDir, getExtractConf, getStand, getParentId, getExDir, getXsdVer, getExtractSource }