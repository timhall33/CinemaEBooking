const CryptoJS = require('crypto-js')

export const encryptWithAES = (text) => {
    const passphase = '123';
    console.log(CryptoJS.AES.encrypt(text, passphase).toString());
    return CryptoJS.AES.encrypt(text, passphase).toString()
}

export const decryptWithAES = (cipher) => {
    const passphase = '123'
    const bytes = CryptoJS.AES.decrypt(cipher, passphase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}