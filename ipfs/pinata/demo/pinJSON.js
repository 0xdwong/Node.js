const pinataSDK = require('@pinata/sdk');
require('dotenv').config();

async function main() {
  const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

  const content = {
    foo: 'bar'
  }

  const filename = String(Math.ceil(Math.random() * 100000000));

  const options = {
    pinataMetadata: {
      name: filename,
    },
    pinataOptions: {
      cidVersion: 1
    }
  };

  try {
    const res = await pinata.pinJSONToIPFS(content, options);
    cid = res.IpfsHash;
    console.log('cid:', cid);
  } catch (err) {
    console.error(err);
  }
}


main();