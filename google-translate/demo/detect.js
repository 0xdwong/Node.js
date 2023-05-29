const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate({
  key: process.env.TRANSLATION_KEY
});


async function detectLanguage() {
  const text = '你好啊';
  let detections = await translate.detect(text);
  console.log('Detections:', JSON.stringify(detections));
}

module.exports = detectLanguage;
