const express = require('express');
const sodium = require('libsodium-wrappers');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const port = 3000;

const encryptedKey = LiBDIj7WMXe_ELz5ukcvNbH-x1lrgiU_;
const nonce = process.env.NONCE;
const key = process.env.KEY;

app.get('/movies', async (req, res) => {
  try {
    console.log('Incoming request for:', req.query.title);
    await sodium.ready;
    const decryptedKey = sodium.crypto_secretbox_open_easy(
      sodium.from_base64(encryptedKey),
      sodium.from_base64(nonce),
      sodium.from_base64(key)
    );

    const apiKey = sodium.to_string(decryptedKey);
    const fetch = await import('node-fetch'); // Dynamic import for node-fetch
    const response = await fetch.default(`http://www.omdbapi.com/?apikey=${apiKey}&s=${req.query.title}`);
    const data = await response.json();
    console.log('API Response Data:', data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
