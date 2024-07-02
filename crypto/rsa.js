const crypto = require('crypto');



function generateKeyPair() {
    // 生成 RSA 密钥对
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    return keyPair;
}


function signAndVerify(keyPair) {
    const { privateKey, publicKey } = keyPair;
    // 要签名的数据
    const data = 'Hello, world!';

    // 使用私钥进行签名
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    const signature = sign.sign(privateKey, 'base64');

    console.log('Signature:', signature);

    // 使用公钥进行验证
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    const isValid = verify.verify(publicKey, signature, 'base64');

    console.log('\nSignature is valid:', isValid);
}

function main() {
    const keyPair = generateKeyPair();
    // console.log(keyPair)
    signAndVerify(keyPair);
}

main();