import config from "./config.js";
import S3operator from "./S3operator.js";

async function addBusinessCheck() {
  switch(config.getExtractConf().ExtractKind) {
    case 'some int':
    case 'another int': 
      S3operator.addFiles('./BusinessCheckMocks/some.json', config.getExtractConf().S3FolderName)
    break 
  }
}

export default { addBusinessCheck }