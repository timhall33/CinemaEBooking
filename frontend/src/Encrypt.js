<<<<<<< HEAD
const CryptoJS = require('crypto-js');

export const encryptWithAES = (text) => {
  const passphrase = '123';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (ciphertext) => {
  const passphrase = '123';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
=======
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
>>>>>>> 30a6ceacbde59cd24036d15d9aa24aaec6814b03
