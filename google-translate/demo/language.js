const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate({
  key: process.env.TRANSLATION_KEY
});

async function listLanguage() {
  const languages = await translate.getLanguages();

  console.log('Languages:', JSON.stringify(languages) );
}


module.exports = listLanguage;
