const sodium = require('libsodium-wrappers');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
    await sodium.ready;
    const apiKey = process.env.API_KEY;

    console.log("API Key: ", apiKey);

    if (!apiKey) {
        throw new Error("API Key is not defined. Check your env file.")
    }

    const key = sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);
    const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)

    const encryptedKey = sodium.crypto_secretbox_easy(apiKey, nonce, key);

    console.log({
        encryptedKey: sodium.to_base64(encryptedKey),
        nonce: sodium.to_base64(nonce),
        key: sodium.to_base64(key),
    });
})();