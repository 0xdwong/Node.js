// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate({
    key: process.env.TRANSLATION_KEY
});

// 单文本
const text = 'The text to translate, e.g. Hello, world!';
// 数组
const text2 = ['hello', 'world'];

const target = 'zh-CN';

async function translateText() {
  let [translations] = await translate.translate(text2, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:', translations);
}


module.exports = translateText