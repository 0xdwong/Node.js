const pinataSDK = require('@pinata/sdk');
const axios = require('axios');
require('dotenv').config();


async function getByHash(hash) {
  let content = null;

  const gateway = 'https://ipfs.decert.me/';
  const fullUrl = gateway + hash;

  try {
    const res = await axios.get(fullUrl);
    content = res.data;
  } catch (err) {
    console.error('getByHash failed', err);
  }
  return content;
}


async function fetchAndPin(hash) {
  const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

  let content = await getByHash(hash);

  if (!content) {
    console.log('no content', hash);
    return;
  }

  try {
    const options = {
      pinataMetadata: {
        name: hash,
      },
      pinataOptions: {
        cidVersion: 1
      }
    };

    const res = await pinata.pinJSONToIPFS(content, options);
    console.log('cid', res.IpfsHash);

  } catch (err) {
    console.error(err);
  }
}



async function main() {
  const hashs = [
    "bafkreiae3yrzwnduc7ohvt5oanndof2zrgvldegkki7r4vvj6447nntsiq",
    "bafkreih2vn2sudfdpqh5bezzdjplkulgv3nneet3os3qmguywoabtlkzpa",
  ]
  for (let hash of hashs) {
    await fetchAndPin(hash);
  }
}


main();