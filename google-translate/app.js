require('dotenv').config();
const translateText = require('./translation');
const listLanguage = require('./language');
const detectLanguage = require('./detect');


async function main(){
    // await translateText();
    // await listLanguage();
    await detectLanguage();
}

main();