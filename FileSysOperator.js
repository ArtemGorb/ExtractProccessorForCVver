import fs from 'fs'

function readFileAndStore(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, {encoding: "utf-8"});
    return fileContent;
  } catch (err) {
    console.error('Error reading the file:', err);
  }
};

function writeFile(fileName = "result.txt", dir, content, messageText) {
  try {
      fs.appendFileSync(`${dir}/${fileName}`, content, () => console.log(messageText));
  } catch (err) {
    console.error('Error writing result to file:', err);
  }
};

function deleteFile(fileName = "result.txt") {
  try {
    if (fs.existsSync(fileName)) {
      fs.rmSync(fileName);
    }
  } catch (err) {
    console.error('Error while deleting result.txt file:', err);
  };
};

export default {readFileAndStore, writeFile, deleteFile}