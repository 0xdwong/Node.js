const pinataSDK = require('@pinata/sdk');
require('dotenv').config();

async function main(){
    const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);
    const hash = 'bafybeihwpm6bxyks2e35tgx64pa6p6cqdzdhmo7lckorzibhdlnot2qf4e';

    const options = {
        pinataMetadata: {
            name: hash,
            keyvalues: {
                // customKey: 'customValue',
                // customKey2: 'customValue2'
            }
        },
        pinataOptions: {
            hostNodes: [
                // '/ip4/hostNode1ExternalIP/tcp/4001/ipfs/hostNode1PeerId',
                // '/ip4/hostNode2ExternalIP/tcp/4001/ipfs/hostNode2PeerId'
            ]
        }
    };


    let cid = '';
    try {
        const res = await pinata.pinByHash(hash, options)
        cid = res.IpfsHash;
        console.log('cid:', cid);
    } catch (err) {
        console.error(err)
    }

}


main();