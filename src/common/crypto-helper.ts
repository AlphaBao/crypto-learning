import CryptoJS from 'crypto-js';

// https://github.com/brix/crypto-js/blob/develop/docs/QuickStartGuide.wiki
const config = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
    // padding: CryptoJS.pad.NoPadding
};

function genKey(key: string) {
    const bits = key.split('');

    for (let i = 0; i < 64; i++) {
        bits[i] = bits[i] || '0';
    }

    return bits.join('');
}

export const aesUtil = {
    aesEncrypt(oriText: string, key: string) {
        const cipherObj = CryptoJS.AES.encrypt(oriText, CryptoJS.enc.Hex.parse(key), config);
        return CryptoJS.enc.Hex.stringify(cipherObj.ciphertext);
    },

    aesDecrypt(hexCipherText: string, key: string) {
        const decryptObj = CryptoJS.AES.decrypt(
            CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hexCipherText)),
            CryptoJS.enc.Hex.parse(key),
            config
        );
        return CryptoJS.enc.Utf8.stringify(decryptObj);
    }
};

window.CryptoJS = CryptoJS;
window.aesUtil = aesUtil;

console.log('====== CryptoJS ======');

const oriText = '{"a":1}';
console.log('oriText', oriText);

const enText = aesUtil.aesEncrypt(oriText, genKey('shared_key'));
console.log('enText', enText);

const deText = aesUtil.aesDecrypt(enText, genKey('shared_key'));
console.log('deText', deText);

console.log('====== CryptoJS ======');