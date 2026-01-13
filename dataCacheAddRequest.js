import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import config from './config.js';

const PROTO_PATH = 'some.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH,
    { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const InsertTulpeService = protoDescriptor; //service path was here
const insertTuple = new InsertTulpeService(`${config.getStand().grpcHOST}:${config.getExtractSource().grpcPORT()}`,
    grpc.credentials.createInsecure());

function insertTupleRequest(request) {
    return new Promise((resolve, reject) => {
        insertTuple.insert(request, (err, response) => {
            if (err) reject(err);
            else if (response) resolve(`Data cache succesfully updated for ${request.requestId}`);
            else reject('gRPC no response or error got');
        });
    })
};
async function insertDataCache(requestId) {
    const request = {
        "requestId": requestId,
        "tuples": [
            {
                "key": "parentId",
                "value": config.getParentId()
            }
        ]
    };
    return await insertTupleRequest(request);
};

export default { insertDataCache }