const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const path = require('path');

async function main() {
    const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

    const filename = 'hello-world.txt';
    let fpath = path.join(__dirname, `../${filename}`);

    const readableStreamForFile = fs.createReadStream(fpath);
    const options = {
        pinataMetadata: {
            name: filename,
            // keyvalues: {
            //     customKey: 'customValue',
            //     customKey2: 'customValue2'
            // }
        },
        pinataOptions: {
            cidVersion: 1
        }
    };

    let cid = '';
    try {
        const res = await pinata.pinFileToIPFS(readableStreamForFile, options);
        cid = res.IpfsHash;
        console.log('cid:', cid);
    } catch (err) {
        console.error(err)
    }
}


main();
