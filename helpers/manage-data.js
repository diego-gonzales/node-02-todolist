const fs = require('fs');

const path = './database/data.json';

const saveDataOnDB = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
};

const readDataFromDB = () => {
    if (!fs.existsSync(path)) return null;

    const data = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(data);
};

module.exports = {
    saveDataOnDB,
    readDataFromDB
}